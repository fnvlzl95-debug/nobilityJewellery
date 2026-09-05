const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { parse } = require('csv-parse/sync');
const { db } = require('../lib/db');
const { config } = require('../lib/config');
const { sha256, nowIso, normalizeUrl, parseNumber } = require('../lib/utils');
const log = require('../lib/logger');

const PARSER_VERSION = 'noblesse-analytics-v4';

// Search Console의 화면 내보내기에는 접근성용 동작 문구가 URL 뒤에
// 공백으로 붙는 경우가 있다. 원본 ZIP은 별도 보존하므로 분석 테이블에는
// 실제 URL 토큰만 저장해 가이드 canonical과 안정적으로 연결한다.
function cleanGscPageUrl(value) {
  const raw = String(value || '').trim();
  const absolute = raw.match(/^https?:\/\/[^\s]+/i);
  return absolute ? absolute[0] : raw;
}

function cleanGa4PagePath(value) {
  let raw = String(value || '').trim();
  if (!raw) return '';
  try {
    if (/^https?:\/\//i.test(raw)) raw = new URL(raw).pathname;
  } catch (_) { /* 원문 경로를 계속 정규화한다. */ }
  raw = raw.split(/[?#]/)[0].replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (!raw.startsWith('/')) raw = `/${raw}`;
  return raw === '/' ? '/' : raw.replace(/\/+$/, '');
}

function decode(buffer) {
  return Buffer.from(buffer).toString('utf8').replace(/^\uFEFF/, '');
}

function parseCsvText(text) {
  return parse(String(text || '').replace(/^\uFEFF/, ''), {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });
}

function ratio(value) {
  const number = parseNumber(value);
  if (number == null) return null;
  return String(value).includes('%') ? number / 100 : number;
}

function safeFileName(name) {
  return String(name || 'import').replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').slice(0, 160);
}

function persistRaw(buffer, hash, fileName) {
  const target = path.join(config.dataDir, 'imports', `${hash.slice(0, 12)}-${safeFileName(fileName)}`);
  if (!fs.existsSync(target)) fs.writeFileSync(target, buffer);
  return target;
}

function createImport({ sourceType, fileName, buffer, periodStart, periodEnd, summary }) {
  const hash = sha256(buffer);
  const existing = db.prepare('SELECT * FROM analytics_imports WHERE file_hash = ?').get(hash);
  if (existing) return { id: existing.id, duplicate: true, sourceType: existing.source_type, summary: JSON.parse(existing.summary_json || '{}') };
  const rawPath = persistRaw(buffer, hash, fileName);
  const result = db.prepare(`
    INSERT INTO analytics_imports (source_type, file_name, file_hash, period_start, period_end, parser_version, raw_path, summary_json, imported_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(sourceType, fileName, hash, periodStart || null, periodEnd || null, PARSER_VERSION, rawPath, JSON.stringify(summary || {}), nowIso());
  return { id: Number(result.lastInsertRowid), duplicate: false, sourceType, summary };
}

function parseGa4Blocks(text) {
  const lines = String(text || '').replace(/^\uFEFF/, '').split(/\r?\n/);
  const blocks = [];
  let periodStart = null;
  let periodEnd = null;
  let pendingHeader = null;
  let dataLines = [];
  const flush = () => {
    if (!pendingHeader) return;
    const csv = [pendingHeader, ...dataLines].join('\n');
    let rows = [];
    try { rows = parseCsvText(csv); } catch (_) { rows = []; }
    blocks.push({ periodStart, periodEnd, header: pendingHeader, rows });
    pendingHeader = null;
    dataLines = [];
  };
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith('#')) {
      flush();
      const start = line.match(/^#\s*시작일:\s*(\d{8})/);
      const end = line.match(/^#\s*종료일:\s*(\d{8})/);
      if (start) periodStart = `${start[1].slice(0, 4)}-${start[1].slice(4, 6)}-${start[1].slice(6, 8)}`;
      if (end) periodEnd = `${end[1].slice(0, 4)}-${end[1].slice(4, 6)}-${end[1].slice(6, 8)}`;
      continue;
    }
    if (!pendingHeader) pendingHeader = rawLine;
    else dataLines.push(rawLine);
  }
  flush();
  return blocks;
}

function importGa4(buffer, fileName) {
  const text = decode(buffer);
  const blocks = parseGa4Blocks(text);
  const organicLandingBlock = blocks.find((b) => b.header.startsWith('방문 페이지 + 쿼리 문자열,'));
  const overviewBlock = blocks.find((b) => b.header.startsWith('활성 사용자,'));
  const pagesBlock = blocks.find((b) => b.header.startsWith('페이지 제목 및 화면 클래스,'));
  const pathDeviceBlock = blocks.find((b) => b.header.startsWith('페이지 경로 및 화면 클래스,'));
  const firstSourceBlock = blocks.find((b) => b.header.startsWith('첫 사용자 소스 / 매체,'));
  const sessionSourceBlock = blocks.find((b) => b.header.startsWith('세션 소스/매체,'));
  const retentionBlock = blocks.find((b) => b.header.startsWith('N일,'));
  if (organicLandingBlock) {
    const rows = organicLandingBlock.rows || [];
    const guides = db.prepare('SELECT slug, path FROM guides').all();
    const byPath = new Map();
    for (const guide of guides) {
      const key = cleanGa4PagePath(guide.path);
      if (!byPath.has(key)) byPath.set(key, []);
      byPath.get(key).push(guide.slug);
    }
    const summary = {
      clicks: rows.reduce((sum, row) => sum + (parseNumber(row['자연 Google 검색 클릭수']) || 0), 0),
      impressions: rows.reduce((sum, row) => sum + (parseNumber(row['자연 Google 검색 노출수']) || 0), 0),
      activeUsers: rows.reduce((sum, row) => sum + (parseNumber(row['활성 사용자']) || 0), 0),
      engagedSessions: rows.reduce((sum, row) => sum + (parseNumber(row['참여 세션수']) || 0), 0),
      keyEvents: rows.reduce((sum, row) => sum + (parseNumber(row['주요 이벤트']) || 0), 0),
      pageRows: rows.length,
      mappedRows: rows.filter((row) => (byPath.get(cleanGa4PagePath(row['방문 페이지 + 쿼리 문자열'])) || []).length === 1).length,
    };
    const meta = createImport({
      sourceType: 'ga4_organic_landing', fileName, buffer,
      periodStart: organicLandingBlock.periodStart, periodEnd: organicLandingBlock.periodEnd, summary,
    });
    if (meta.duplicate) return meta;
    const insert = db.prepare(`
      INSERT INTO ga4_organic_pages (import_id, page_path, guide_slug, clicks, impressions, ctr, position,
        active_users, engaged_sessions, engagement_rate, avg_engagement_seconds, events, key_events, mapping_state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    db.transaction(() => {
      for (const row of rows) {
        const pagePath = String(row['방문 페이지 + 쿼리 문자열'] || '').trim();
        const matches = byPath.get(cleanGa4PagePath(pagePath)) || [];
        insert.run(meta.id, pagePath, matches.length === 1 ? matches[0] : null,
          parseNumber(row['자연 Google 검색 클릭수']) || 0,
          parseNumber(row['자연 Google 검색 노출수']) || 0,
          ratio(row['자연 Google 검색 클릭률']) || 0,
          parseNumber(row['자연 Google 검색 평균 게재순위']),
          parseNumber(row['활성 사용자']) || 0,
          parseNumber(row['참여 세션수']) || 0,
          ratio(row['참여율']),
          parseNumber(row['활성 사용자당 평균 참여 시간']),
          parseNumber(row['이벤트 수']) || 0,
          parseNumber(row['주요 이벤트']) || 0,
          matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched');
      }
    })();
    return meta;
  }
  if (pathDeviceBlock) {
    const rows = pathDeviceBlock.rows || [];
    const guides = db.prepare('SELECT slug, path FROM guides').all();
    const byPath = new Map();
    for (const guide of guides) {
      const key = cleanGa4PagePath(guide.path);
      if (!byPath.has(key)) byPath.set(key, []);
      byPath.get(key).push(guide.slug);
    }
    const mappedRows = rows.filter((row) => (byPath.get(cleanGa4PagePath(row['페이지 경로 및 화면 클래스'])) || []).length === 1).length;
    const summary = {
      views: rows.reduce((sum, row) => sum + (parseNumber(row['조회수']) || 0), 0),
      events: rows.reduce((sum, row) => sum + (parseNumber(row['이벤트 수']) || 0), 0),
      keyEvents: rows.reduce((sum, row) => sum + (parseNumber(row['주요 이벤트']) || 0), 0),
      pageRows: rows.length,
      uniquePaths: new Set(rows.map((row) => cleanGa4PagePath(row['페이지 경로 및 화면 클래스'])).filter(Boolean)).size,
      mappedRows,
    };
    const meta = createImport({
      sourceType: 'ga4_path_device', fileName, buffer,
      periodStart: pathDeviceBlock.periodStart, periodEnd: pathDeviceBlock.periodEnd, summary,
    });
    if (meta.duplicate) return meta;
    const insertPage = db.prepare(`
      INSERT INTO ga4_pages (import_id, page_title, page_path, device, guide_slug, views, active_users, events, bounce_rate, mapping_state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    db.transaction(() => {
      for (const row of rows) {
        const originalPath = String(row['페이지 경로 및 화면 클래스'] || '').trim();
        const matches = byPath.get(cleanGa4PagePath(originalPath)) || [];
        insertPage.run(meta.id, originalPath || '(not set)', originalPath || null, row['기기 카테고리'] || null,
          matches.length === 1 ? matches[0] : null, parseNumber(row['조회수']) || 0,
          parseNumber(row['활성 사용자']) || 0, parseNumber(row['이벤트 수']) || 0, null,
          matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched');
      }
    })();
    return meta;
  }
  if (!overviewBlock && !pagesBlock) throw Object.assign(new Error('지원하는 GA4 보고서 머리글을 찾지 못했습니다. 페이지 경로·기기 또는 보고서 개요 CSV를 사용해 주세요'), { status: 422 });
  const overview = overviewBlock?.rows?.[0] || {};
  const summary = {
    activeUsers: parseNumber(overview['활성 사용자']) || 0,
    newUsers: parseNumber(overview['새 사용자 수']) || 0,
    avgEngagementSeconds: parseNumber(overview['활성 사용자당 평균 참여 시간']) || 0,
    events: parseNumber(overview['이벤트 수']) || 0,
    pageRows: pagesBlock?.rows?.length || 0,
  };
  const meta = createImport({
    sourceType: 'ga4_overview', fileName, buffer,
    periodStart: overviewBlock?.periodStart, periodEnd: overviewBlock?.periodEnd, summary,
  });
  if (meta.duplicate) return meta;
  const insertPage = db.prepare(`
    INSERT INTO ga4_pages (import_id, page_title, page_path, device, guide_slug, views, active_users, events, bounce_rate, mapping_state)
    VALUES (?, ?, NULL, NULL, ?, ?, ?, ?, ?, ?)
  `);
  const insertSource = db.prepare('INSERT INTO ga4_sources (import_id, dimension, source_medium, value) VALUES (?, ?, ?, ?)');
  const insertRetention = db.prepare('INSERT INTO ga4_retention (import_id, day_index, new_users, returning_users) VALUES (?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of pagesBlock?.rows || []) {
      const title = row['페이지 제목 및 화면 클래스'];
      const matches = db.prepare('SELECT slug FROM guides WHERE page_title = ?').all(title);
      insertPage.run(meta.id, title, matches.length === 1 ? matches[0].slug : null,
        parseNumber(row['조회수']) || 0, parseNumber(row['활성 사용자']) || 0, parseNumber(row['이벤트 수']) || 0,
        ratio(row['이탈률']), matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched');
    }
    for (const [dimension, block, key, valueKey] of [
      ['first_user', firstSourceBlock, '첫 사용자 소스 / 매체', '활성 사용자'],
      ['session', sessionSourceBlock, '세션 소스/매체', '세션수'],
    ]) {
      for (const row of block?.rows || []) insertSource.run(meta.id, dimension, row[key], parseNumber(row[valueKey]) || 0);
    }
    for (const row of retentionBlock?.rows || []) {
      insertRetention.run(meta.id, parseInt(row['N일'], 10) || 0, parseNumber(row.new) || 0, parseNumber(row.returning) || 0);
    }
  })();
  return meta;
}

function zipEntries(buffer) {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries().filter(entry => !entry.isDirectory);
  if (entries.length > 100 || entries.reduce((sum, entry) => sum + entry.header.size, 0) > 64 * 1024 * 1024) throw Object.assign(new Error('ZIP은 파일 100개, 압축 해제 후 64MB 이하만 가져올 수 있습니다'), { status: 413 });
  const result = new Map(); let total = 0;
  for (const entry of entries) {
    if (!/\.csv$/i.test(entry.entryName) || entry.entryName.includes('..')) throw Object.assign(new Error('CSV 분석 파일만 포함한 ZIP을 선택해 주세요'), { status: 422 });
    if (entry.header.flags & 1) throw new Error('암호화된 ZIP은 가져올 수 없습니다');
    const compressed = entry.getCompressedData();
    const limit = Math.min(64 * 1024 * 1024 - total, entry.header.size + 1);
    const data = entry.header.method === 0 ? compressed : entry.header.method === 8
      ? require('zlib').inflateRawSync(compressed, { maxOutputLength: Math.max(1, limit) }) : null;
    if (!data || data.length !== entry.header.size) throw new Error('ZIP 파일 크기 또는 압축 방식이 올바르지 않습니다');
    total += data.length;
    if (total > 64 * 1024 * 1024) throw Object.assign(new Error('압축 해제 용량을 초과했습니다'), { status: 413 });
    result.set(entry.entryName, decode(data));
  }
  return result;
}

function importGscPerformance(buffer, fileName, entries) {
  const daily = parseCsvText(entries.get('차트.csv') || '');
  const queries = parseCsvText(entries.get('검색어 수.csv') || '');
  const pages = parseCsvText(entries.get('페이지.csv') || '');
  const devices = parseCsvText(entries.get('기기.csv') || '');
  const dates = daily.map((row) => row['날짜']).filter(Boolean).sort();
  const normalizedGroups = new Map();
  for (const row of pages) {
    const url = normalizeUrl(cleanGscPageUrl(row['인기 페이지']));
    if (!normalizedGroups.has(url)) normalizedGroups.set(url, []);
    normalizedGroups.get(url).push(row);
  }
  const duplicates = [...normalizedGroups.values()].filter((rows) => rows.length > 1);
  const summary = {
    clicks: daily.reduce((sum, row) => sum + (parseNumber(row['클릭수']) || 0), 0),
    impressions: daily.reduce((sum, row) => sum + (parseNumber(row['노출']) || 0), 0),
    pageRows: pages.length,
    queryRows: queries.length,
    duplicateGroups: duplicates.length,
    duplicateImpressions: duplicates.reduce((sum, rows) => sum + rows.reduce((s, row) => s + (parseNumber(row['노출']) || 0), 0), 0),
  };
  const meta = createImport({ sourceType: 'gsc_performance', fileName, buffer, periodStart: dates[0], periodEnd: dates.at(-1), summary });
  if (meta.duplicate) return meta;
  const dailyStmt = db.prepare('INSERT INTO gsc_daily (import_id, date, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  const queryStmt = db.prepare('INSERT INTO gsc_queries (import_id, query, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  const pageStmt = db.prepare('INSERT INTO gsc_pages (import_id, original_url, normalized_url, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const deviceStmt = db.prepare('INSERT INTO gsc_devices (import_id, device, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of daily) dailyStmt.run(meta.id, row['날짜'], parseNumber(row['클릭수']) || 0, parseNumber(row['노출']) || 0, ratio(row.CTR) || 0, parseNumber(row['게재 순위']));
    for (const row of queries) queryStmt.run(meta.id, row['인기 검색어'], parseNumber(row['클릭수']) || 0, parseNumber(row['노출']) || 0, ratio(row.CTR) || 0, parseNumber(row['게재 순위']));
    for (const row of pages) {
      const originalUrl = cleanGscPageUrl(row['인기 페이지']);
      pageStmt.run(meta.id, originalUrl, normalizeUrl(originalUrl), parseNumber(row['클릭수']) || 0, parseNumber(row['노출']) || 0, ratio(row.CTR) || 0, parseNumber(row['게재 순위']));
    }
    for (const row of devices) deviceStmt.run(meta.id, row['기기'], parseNumber(row['클릭수']) || 0, parseNumber(row['노출']) || 0, ratio(row.CTR) || 0, parseNumber(row['게재 순위']));
  })();
  return meta;
}

function importGscCoverage(buffer, fileName, entries) {
  const chart = parseCsvText(entries.get('차트.csv') || '');
  const issues = parseCsvText(entries.get('심각한 문제.csv') || '');
  const dates = chart.map((row) => row['날짜']).filter(Boolean).sort();
  const latest = chart.at(-1) || {};
  const summary = {
    indexed: parseNumber(latest['색인 생성됨']) || 0,
    notIndexed: parseNumber(latest['색인이 생성되지 않은 페이지']) || 0,
    impressions: parseNumber(latest['노출']) || 0,
    issues: Object.fromEntries(issues.map((row) => [row['사유'], parseNumber(row['페이지']) || 0])),
  };
  const meta = createImport({ sourceType: 'gsc_coverage', fileName, buffer, periodStart: dates[0], periodEnd: dates.at(-1), summary });
  if (meta.duplicate) return meta;
  const stmt = db.prepare('INSERT INTO gsc_coverage (import_id, reason, source, validation, page_count) VALUES (?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of issues) stmt.run(meta.id, row['사유'], row['소스'] || null, row['유효성 검사'] || null, parseNumber(row['페이지']) || 0);
  })();
  return meta;
}

function importGscIndexingSnapshot(buffer, fileName) {
  const text = decode(buffer);
  const metadata = {};
  const dataLines = [];
  for (const line of text.split(/\r?\n/)) {
    const meta = line.match(/^#\s*([^:]+):\s*(.+?)\s*$/);
    if (meta) metadata[meta[1].trim()] = meta[2].trim();
    else if (line.trim()) dataLines.push(line);
  }
  const rows = parseCsvText(dataLines.join('\n'));
  const issues = Object.fromEntries(rows.map((row) => [row['사유'], parseNumber(row['페이지']) || 0]));
  const rawDate = String(metadata['최종 업데이트'] || '');
  const reportUpdatedAt = /^\d{8}$/.test(rawDate)
    ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}` : null;
  const summary = {
    indexed: parseNumber(metadata['색인 생성됨']) || 0,
    notIndexed: parseNumber(metadata['색인 제외됨']) || 0,
    impressions: 0,
    issues,
    reportUpdatedAt,
    scope: metadata['범위'] || null,
    observedAt: metadata['확인 시각'] || null,
  };
  const meta = createImport({
    sourceType: 'gsc_coverage', fileName, buffer, periodStart: null, periodEnd: reportUpdatedAt, summary,
  });
  if (meta.duplicate) return meta;
  const stmt = db.prepare('INSERT INTO gsc_coverage (import_id, reason, source, validation, page_count) VALUES (?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of rows) stmt.run(meta.id, row['사유'], row['소스'] || null, row['유효성 검사'] || null, parseNumber(row['페이지']) || 0);
  })();
  return meta;
}

function importNaverWebPerformance(buffer, fileName, entries) {
  const queries = parseCsvText(entries.get('검색 키워드.csv') || '');
  const pages = parseCsvText(entries.get('검색 웹문서.csv') || '');
  const manifestRows = parseCsvText(entries.get('manifest.csv') || '');
  const manifest = Object.fromEntries(manifestRows.map((row) => [row.field, row.value]));
  const summary = {
    overallCtr: ratio(manifest.overall_ctr) || 0,
    queryRows: queries.length,
    pageRows: pages.length,
    topQueryClicks: queries.reduce((sum, row) => sum + (parseNumber(row['클릭']) || 0), 0),
    topQueryImpressions: queries.reduce((sum, row) => sum + (parseNumber(row['노출']) || 0), 0),
    topPageClicks: pages.reduce((sum, row) => sum + (parseNumber(row['클릭']) || 0), 0),
    topPageImpressions: pages.reduce((sum, row) => sum + (parseNumber(row['노출']) || 0), 0),
    reportUpdatedAt: manifest.report_updated_at || null,
    scope: manifest.scope || 'TOP 30 only',
    deviceFilter: manifest.device_filter || null,
  };
  const meta = createImport({
    sourceType: 'naver_web_performance', fileName, buffer,
    periodStart: manifest.range_start, periodEnd: manifest.range_end, summary,
  });
  if (meta.duplicate) return meta;
  const queryStmt = db.prepare('INSERT INTO naver_web_queries (import_id, query, clicks, impressions, ctr) VALUES (?, ?, ?, ?, ?)');
  const pageStmt = db.prepare('INSERT INTO naver_web_pages (import_id, original_url, normalized_url, clicks, impressions, ctr) VALUES (?, ?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of queries) queryStmt.run(meta.id, row['검색 키워드'], parseNumber(row['클릭']) || 0, parseNumber(row['노출']) || 0, (parseNumber(row['CTR(%)']) || 0) / 100);
    for (const row of pages) {
      const originalUrl = String(row['검색 웹문서'] || '').trim();
      pageStmt.run(meta.id, originalUrl, normalizeUrl(originalUrl), parseNumber(row['클릭']) || 0, parseNumber(row['노출']) || 0, (parseNumber(row['CTR(%)']) || 0) / 100);
    }
  })();
  return meta;
}

function importBufferUnchecked(buffer, fileName) {
  if (/\.zip$/i.test(fileName)) {
    const entries = zipEntries(buffer);
    if (entries.has('검색 키워드.csv') && entries.has('검색 웹문서.csv')) return importNaverWebPerformance(buffer, fileName, entries);
    if (entries.has('검색어 수.csv') && entries.has('페이지.csv')) return importGscPerformance(buffer, fileName, entries);
    if (entries.has('심각한 문제.csv')) return importGscCoverage(buffer, fileName, entries);
    throw new Error('지원하는 Search Console ZIP 형식이 아닙니다');
  }
  if (/\.csv$/i.test(fileName)) {
    const text = decode(buffer);
    if (/^사유,소스,유효성 검사,페이지\r?$/m.test(text)) return importGscIndexingSnapshot(buffer, fileName);
    return importGa4(buffer, fileName);
  }
  throw new Error('CSV 또는 ZIP 파일만 가져올 수 있습니다');
}

function importBuffer(buffer, fileName) {
  return db.transaction(() => importBufferUnchecked(buffer, fileName))();
}

function initialImport() {
  const candidates = [
    '보고서_개요.csv',
    'https___noblessegold.com_-Performance-on-Search-2026-08-05.zip',
    'https___noblessegold.com_-Coverage-2026-08-05.zip',
  ];
  const results = [];
  for (const name of candidates) {
    const filePath = path.join(config.downloadsDir, name);
    if (!fs.existsSync(filePath)) continue;
    try { results.push(importBuffer(fs.readFileSync(filePath), name)); }
    catch (error) { log.warn('analytics', `${name} 초기 가져오기 실패`, error); }
  }
  return results;
}

function listImports() {
  return db.prepare(`
    SELECT id, source_type AS sourceType, file_name AS fileName, period_start AS periodStart,
      period_end AS periodEnd, parser_version AS parserVersion, file_hash AS fileHash,
      summary_json AS summaryJson, imported_at AS importedAt
    FROM analytics_imports ORDER BY imported_at DESC, id DESC
  `).all().map((row) => ({ ...row, summary: JSON.parse(row.summaryJson || '{}'), summaryJson: undefined }));
}

function latestImport(sourceType) {
  const row = db.prepare(`
    SELECT id, source_type AS sourceType, file_name AS fileName, period_start AS periodStart,
      period_end AS periodEnd, parser_version AS parserVersion, file_hash AS fileHash,
      summary_json AS summaryJson, imported_at AS importedAt
    FROM analytics_imports WHERE source_type = ? ORDER BY period_end DESC, imported_at DESC, id DESC LIMIT 1
  `).get(sourceType);
  return row ? { ...row, summary: JSON.parse(row.summaryJson || '{}'), summaryJson: undefined } : null;
}

function latestGa4PagesImport() {
  const row = db.prepare(`
    SELECT id, source_type AS sourceType, file_name AS fileName, period_start AS periodStart,
      period_end AS periodEnd, parser_version AS parserVersion, file_hash AS fileHash,
      summary_json AS summaryJson, imported_at AS importedAt
    FROM analytics_imports WHERE source_type IN ('ga4_path_device', 'ga4_overview')
    ORDER BY period_end DESC, imported_at DESC, id DESC LIMIT 1
  `).get();
  return row ? { ...row, summary: JSON.parse(row.summaryJson || '{}'), summaryJson: undefined } : null;
}

function reconcileGa4Mappings() {
  const rows = db.prepare('SELECT rowid AS rowId, page_title AS pageTitle, page_path AS pagePath FROM ga4_pages').all();
  const guides = db.prepare('SELECT slug, path, page_title AS pageTitle FROM guides').all();
  const byTitle = new Map();
  const byPath = new Map();
  for (const guide of guides) {
    if (!byTitle.has(guide.pageTitle)) byTitle.set(guide.pageTitle, []);
    byTitle.get(guide.pageTitle).push(guide.slug);
    const key = cleanGa4PagePath(guide.path);
    if (!byPath.has(key)) byPath.set(key, []);
    byPath.get(key).push(guide.slug);
  }
  const update = db.prepare('UPDATE ga4_pages SET guide_slug=?, mapping_state=? WHERE rowid=?');
  const counts = { mapped: 0, ambiguous: 0, unmatched: 0 };
  db.transaction(() => {
    for (const row of rows) {
      const matches = row.pagePath
        ? (byPath.get(cleanGa4PagePath(row.pagePath)) || [])
        : (byTitle.get(row.pageTitle) || []);
      const state = matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched';
      update.run(matches.length === 1 ? matches[0] : null, state, row.rowId);
      counts[state]++;
    }
  })();
  return counts;
}

function reconcileGa4OrganicMappings() {
  const rows = db.prepare('SELECT rowid AS rowId, page_path AS pagePath FROM ga4_organic_pages').all();
  const guides = db.prepare('SELECT slug, path FROM guides').all();
  const byPath = new Map();
  for (const guide of guides) {
    const key = cleanGa4PagePath(guide.path);
    if (!byPath.has(key)) byPath.set(key, []);
    byPath.get(key).push(guide.slug);
  }
  const update = db.prepare('UPDATE ga4_organic_pages SET guide_slug=?, mapping_state=? WHERE rowid=?');
  const counts = { mapped: 0, ambiguous: 0, unmatched: 0 };
  db.transaction(() => {
    for (const row of rows) {
      const matches = byPath.get(cleanGa4PagePath(row.pagePath)) || [];
      const state = matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched';
      update.run(matches.length === 1 ? matches[0] : null, state, row.rowId);
      counts[state]++;
    }
  })();
  return counts;
}

function reconcileGscPageUrls() {
  const rows = db.prepare('SELECT rowid AS rowId, original_url AS originalUrl, normalized_url AS normalizedUrl FROM gsc_pages').all();
  const update = db.prepare('UPDATE gsc_pages SET original_url=?, normalized_url=? WHERE rowid=?');
  let updated = 0;
  db.transaction(() => {
    for (const row of rows) {
      const originalUrl = cleanGscPageUrl(row.originalUrl);
      const normalizedUrl = normalizeUrl(originalUrl);
      if (originalUrl === row.originalUrl && normalizedUrl === row.normalizedUrl) continue;
      update.run(originalUrl, normalizedUrl, row.rowId);
      updated++;
    }
  })();

  const imports = db.prepare("SELECT id, summary_json AS summaryJson FROM analytics_imports WHERE source_type='gsc_performance'").all();
  const duplicateSummary = db.prepare(`
    SELECT COUNT(*) AS duplicateGroups, COALESCE(SUM(groupImpressions), 0) AS duplicateImpressions
    FROM (
      SELECT normalized_url, SUM(impressions) AS groupImpressions
      FROM gsc_pages WHERE import_id=? GROUP BY normalized_url HAVING COUNT(*) > 1
    )
  `);
  const updateSummary = db.prepare('UPDATE analytics_imports SET summary_json=?, parser_version=? WHERE id=?');
  db.transaction(() => {
    for (const item of imports) {
      const summary = JSON.parse(item.summaryJson || '{}');
      const duplicate = duplicateSummary.get(item.id);
      summary.duplicateGroups = Number(duplicate.duplicateGroups || 0);
      summary.duplicateImpressions = Number(duplicate.duplicateImpressions || 0);
      updateSummary.run(JSON.stringify(summary), PARSER_VERSION, item.id);
    }
  })();
  return { rows: rows.length, updated, imports: imports.length };
}

module.exports = {
  PARSER_VERSION, parseCsvText, parseGa4Blocks, importBuffer, initialImport,
  listImports, latestImport, latestGa4PagesImport, zipEntries, cleanGscPageUrl, cleanGa4PagePath,
  reconcileGscPageUrls, reconcileGa4Mappings, reconcileGa4OrganicMappings, importNaverWebPerformance, importGscIndexingSnapshot,
};
