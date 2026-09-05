const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { parse } = require('csv-parse/sync');
const { db } = require('../lib/db');
const { config } = require('../lib/config');
const { sha256, nowIso, normalizeUrl, parseNumber } = require('../lib/utils');
const log = require('../lib/logger');

const PARSER_VERSION = 'noblesse-analytics-v6';

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
      if (start) {
        periodStart = `${start[1].slice(0, 4)}-${start[1].slice(4, 6)}-${start[1].slice(6, 8)}`;
        periodEnd = null;
      }
      if (end) periodEnd = `${end[1].slice(0, 4)}-${end[1].slice(4, 6)}-${end[1].slice(6, 8)}`;
      continue;
    }
    if (!pendingHeader) pendingHeader = rawLine;
    else dataLines.push(rawLine);
  }
  flush();
  return blocks;
}

const GA4_BLOCK_HEADERS = {
  organic: '방문 페이지 + 쿼리 문자열,',
  overview: '활성 사용자,',
  pages: '페이지 제목 및 화면 클래스,',
  pathDevice: '페이지 경로 및 화면 클래스,',
  firstSource: '첫 사용자 소스 / 매체,',
  sessionSource: '세션 소스/매체,',
  retention: 'N일,',
};

function ga4BlockKind(block) {
  return Object.keys(GA4_BLOCK_HEADERS).find((key) => block.header.startsWith(GA4_BLOCK_HEADERS[key]));
}

function invalidGa4(message) {
  throw Object.assign(new Error(`GA4 자료 확인 필요: ${message}`), { status: 422 });
}

function unsupportedGa4(blocks) {
  const unsupported = [
    ['방문 페이지,', '전체 유입 방문 페이지 보고서는 세션 지표이며 Google 검색 클릭·노출 또는 페이지 조회수가 아닙니다. Google 검색 분석에는 「Google 자연 검색 트래픽: 방문 페이지 + 쿼리 문자열」 CSV를 사용해 주세요.'],
    ['기기 카테고리,', '기기 카테고리 보고서에는 페이지 경로가 없어 글별 성과를 연결할 수 없습니다. 「페이지 및 화면: 페이지 경로 및 화면 클래스」 CSV를 사용해 주세요.'],
    ['세션 소스/매체,', '독립 트래픽 획득 보고서에는 페이지 차원이 없어 글별 성과로 가져오지 않습니다. 사이트 전체 개요에는 「보고서 개요」 CSV, 글별 조회에는 「페이지 및 화면: 페이지 경로 및 화면 클래스」 CSV를 사용해 주세요.'],
    ['이벤트 이름,', '이벤트 이름 보고서에는 페이지 차원이 없고 이벤트별 사용자도 중복될 수 있어 글별 성과로 가져오지 않습니다. 「페이지 및 화면: 페이지 경로 및 화면 클래스」 CSV를 사용해 주세요.'],
  ];
  const match = unsupported.find(([header]) => blocks.some((block) => block.header.startsWith(header)));
  invalidGa4(match?.[1] || '지원하는 보고서 머리글을 찾지 못했습니다. 「보고서 개요」, 「페이지 및 화면: 페이지 경로 및 화면 클래스」 또는 「Google 자연 검색 트래픽: 방문 페이지 + 쿼리 문자열」 CSV를 사용해 주세요.');
}

function ga4OverviewMetrics(block) {
  const row = block?.rows?.[0] || {};
  const metric = (key) => row[key] == null || String(row[key]).trim() === '' ? null : parseNumber(row[key]);
  return {
    activeUsers: metric('활성 사용자'),
    newUsers: metric('새 사용자 수'),
    avgEngagementSeconds: metric('활성 사용자당 평균 참여 시간'),
    events: metric('이벤트 수'),
  };
}

function selectGa4Period(blocks) {
  const primaryKinds = new Set(['organic', 'overview', 'pages', 'pathDevice']);
  const supported = blocks.filter((block) => ga4BlockKind(block));
  const primary = supported.filter((block) => primaryKinds.has(ga4BlockKind(block)));
  if (!primary.length) unsupportedGa4(blocks);
  const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '')
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  for (const block of supported) {
    if (!validDate(block.periodStart) || !validDate(block.periodEnd) || block.periodStart > block.periodEnd) {
      invalidGa4('각 보고서 블록의 시작일·종료일이 필요하며 실제 날짜여야 합니다. 기간을 포함한 원본 CSV를 다시 내보내 주세요.');
    }
  }
  const latest = [...primary].sort((a, b) => b.periodEnd.localeCompare(a.periodEnd) || b.periodStart.localeCompare(a.periodStart))[0];
  const selected = supported.filter((block) => block.periodStart === latest.periodStart && block.periodEnd === latest.periodEnd);
  const kinds = new Set();
  for (const block of selected) {
    const kind = ga4BlockKind(block);
    if (kinds.has(kind)) invalidGa4('같은 기간·차원의 보고서가 여러 개 있어 비교 그룹을 구분할 수 없습니다. 비교 그룹을 해제한 CSV를 사용해 주세요.');
    kinds.add(kind);
  }
  const comparison = new Map();
  for (const block of supported) {
    if (selected.includes(block)) continue;
    const key = `${block.periodStart}/${block.periodEnd}`;
    if (!comparison.has(key)) comparison.set(key, { periodStart: block.periodStart, periodEnd: block.periodEnd, blockCount: 0, overview: null });
    const period = comparison.get(key);
    period.blockCount++;
    if (ga4BlockKind(block) === 'overview') period.overview = ga4OverviewMetrics(block);
  }
  return {
    blocks: selected,
    metadata: {
      selectedPeriod: { periodStart: latest.periodStart, periodEnd: latest.periodEnd },
      periodSelection: 'latest_period_end',
      comparisonPeriods: [...comparison.values()].sort((a, b) => b.periodEnd.localeCompare(a.periodEnd) || b.periodStart.localeCompare(a.periodStart)),
      comparisonNote: '비교 기간은 별도 메타로 보관하며 선택 기간의 페이지·사용자·이벤트 지표에 합산하지 않습니다.',
    },
  };
}

function importGa4(buffer, fileName) {
  const text = decode(buffer);
  const selection = selectGa4Period(parseGa4Blocks(text));
  const blocks = selection.blocks;
  const organicLandingBlock = blocks.find((b) => b.header.startsWith('방문 페이지 + 쿼리 문자열,'));
  const overviewBlock = blocks.find((b) => b.header.startsWith('활성 사용자,'));
  const pagesBlock = blocks.find((b) => b.header.startsWith('페이지 제목 및 화면 클래스,'));
  const pathDeviceBlock = blocks.find((b) => b.header.startsWith('페이지 경로 및 화면 클래스,'));
  const firstSourceBlock = blocks.find((b) => b.header.startsWith('첫 사용자 소스 / 매체,'));
  const sessionSourceBlock = blocks.find((b) => b.header.startsWith('세션 소스/매체,'));
  const retentionBlock = blocks.find((b) => b.header.startsWith('N일,'));
  if (organicLandingBlock) {
    const rows = organicLandingBlock.rows || [];
    const rawActiveUsers = rows.length === 1 ? rows[0]['활성 사용자'] : null;
    const parsedActiveUsers = rawActiveUsers == null || String(rawActiveUsers).trim() === '' ? null : parseNumber(rawActiveUsers);
    const activeUsers = Number.isInteger(parsedActiveUsers) && parsedActiveUsers >= 0 ? parsedActiveUsers : null;
    const guides = db.prepare('SELECT slug, path FROM guides').all();
    const byPath = new Map();
    for (const guide of guides) {
      const key = cleanGa4PagePath(guide.path);
      if (!byPath.has(key)) byPath.set(key, []);
      byPath.get(key).push(guide.slug);
    }
    const summary = {
      ...selection.metadata,
      clicks: rows.reduce((sum, row) => sum + (parseNumber(row['자연 Google 검색 클릭수']) || 0), 0),
      impressions: rows.reduce((sum, row) => sum + (parseNumber(row['자연 Google 검색 노출수']) || 0), 0),
      activeUsers,
      activeUsersAggregation: activeUsers == null ? 'unavailable' : 'single_page_row',
      activeUsersNote: rows.length > 1
        ? '페이지 간 사용자 중복을 확인할 수 없어 고유 활성 사용자는 합산하지 않습니다.'
        : activeUsers == null ? '유효한 단일 페이지 활성 사용자 값이 없어 집계할 수 없습니다.'
          : '단일 페이지 행의 활성 사용자이며 사이트 전체 고유 사용자 수를 뜻하지 않습니다.',
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
      ...selection.metadata,
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
  const guidesByTitle = new Map();
  for (const guide of db.prepare('SELECT slug, page_title FROM guides').all()) {
    if (!guidesByTitle.has(guide.page_title)) guidesByTitle.set(guide.page_title, []);
    guidesByTitle.get(guide.page_title).push(guide.slug);
  }
  const pageMappings = (pagesBlock?.rows || []).map((row) => {
    const matches = guidesByTitle.get(row['페이지 제목 및 화면 클래스']) || [];
    return { row, slug: matches.length === 1 ? matches[0] : null, state: matches.length === 1 ? 'mapped' : matches.length > 1 ? 'ambiguous' : 'unmatched' };
  });
  const summary = {
    ...selection.metadata,
    ...ga4OverviewMetrics(overviewBlock),
    pageRows: pageMappings.length,
    mappedRows: pageMappings.filter((item) => item.state === 'mapped').length,
    unmatchedRows: pageMappings.filter((item) => item.state === 'unmatched').length,
    ambiguousRows: pageMappings.filter((item) => item.state === 'ambiguous').length,
    unmappedRows: pageMappings.filter((item) => item.state !== 'mapped').length,
    mappingMethod: 'exact_page_title',
    mappingScope: 'guide_inventory_at_import',
    mappingLimitations: [
      '가져오기 당시 가이드 제목과 완전히 일치한 행만 연결합니다. 제목이 바뀐 글의 이전 제목 행은 누락될 수 있으며 유사 제목을 자동 병합하지 않습니다.',
      '미연결 행에는 홈·서비스·갤러리 등 가이드가 아닌 페이지도 포함됩니다. 글별 전체 조회를 확인하려면 「페이지 및 화면: 페이지 경로 및 화면 클래스」 CSV를 사용해 주세요.',
    ],
    unmappedExamples: pageMappings.filter((item) => item.state !== 'mapped' && parseNumber(item.row['조회수']) > 0)
      .sort((a, b) => parseNumber(b.row['조회수']) - parseNumber(a.row['조회수'])).slice(0, 5)
      .map((item) => ({ pageTitle: item.row['페이지 제목 및 화면 클래스'], views: parseNumber(item.row['조회수']), mappingState: item.state })),
  };
  const meta = createImport({
    sourceType: 'ga4_overview', fileName, buffer,
    periodStart: selection.metadata.selectedPeriod.periodStart, periodEnd: selection.metadata.selectedPeriod.periodEnd, summary,
  });
  if (meta.duplicate) return meta;
  const insertPage = db.prepare(`
    INSERT INTO ga4_pages (import_id, page_title, page_path, device, guide_slug, views, active_users, events, bounce_rate, mapping_state)
    VALUES (?, ?, NULL, NULL, ?, ?, ?, ?, ?, ?)
  `);
  const insertSource = db.prepare('INSERT INTO ga4_sources (import_id, dimension, source_medium, value) VALUES (?, ?, ?, ?)');
  const insertRetention = db.prepare('INSERT INTO ga4_retention (import_id, day_index, new_users, returning_users) VALUES (?, ?, ?, ?)');
  db.transaction(() => {
    for (const { row, slug, state } of pageMappings) {
      const title = row['페이지 제목 및 화면 클래스'];
      insertPage.run(meta.id, title, slug,
        parseNumber(row['조회수']) || 0, parseNumber(row['활성 사용자']) || 0, parseNumber(row['이벤트 수']) || 0,
        ratio(row['이탈률']), state);
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

function invalidGsc(message) {
  throw Object.assign(new Error(`GSC 자료 확인 필요: ${message}`), { status: 422 });
}

function gscDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '') || !Number.isFinite(Date.parse(value))
    || new Date(value).toISOString().slice(0, 10) !== value) invalidGsc(`${label} 날짜가 올바르지 않습니다`);
  return value;
}

function gscNumber(value, label, isRatio = false) {
  if (value == null || String(value).trim() === '' || /^[-—–]$/.test(String(value).trim())) return null;
  const result = isRatio ? ratio(value) : parseNumber(value);
  if (result == null || result < 0 || (isRatio && result > 1)) invalidGsc(`${label} 수치가 올바르지 않습니다`);
  return result;
}

function sumGsc(rows, key) {
  return rows.length && rows.every(row => row[key] != null) ? rows.reduce((total, row) => total + row[key], 0) : null;
}

function gscScope(entries, fileName, tables) {
  const filterRows = parseCsvText(entries.get('필터.csv') || '');
  const filters = filterRows.map(row => ({ filter: row['필터'] || row.Filter || '', value: row['값'] || row.Value || '' }));
  if (filterRows.some((row, i) => !filters[i].filter)) invalidGsc('필터.csv 머리글을 확인해 주세요');
  const manifestRows = parseCsvText(entries.get('manifest.csv') || '');
  const manifest = Object.fromEntries(manifestRows.map(row => [row.key || row.field, row.value]));
  if (manifestRows.some(row => !(row.key || row.field) || row.value == null)) invalidGsc('manifest.csv는 key,value 형식이어야 합니다');
  if (Object.keys(manifest).length !== manifestRows.length) invalidGsc('manifest에 중복 항목이 있습니다');
  if (Boolean(manifest.range_start) !== Boolean(manifest.range_end)) invalidGsc('manifest의 시작일과 종료일을 함께 입력해 주세요');
  const filterValue = pattern => filters.find(row => pattern.test(row.filter))?.value;
  const dateFilter = filterValue(/^(날짜|Date)$/i);
  const dateTokens = dateFilter?.match(/\d{4}[.\-/]\s*\d{1,2}[.\-/]\s*\d{1,2}/g) || [];
  const normalizeDate = value => value.trim().split(/[.\-/]\s*/).map((part, i) => i ? part.padStart(2, '0') : part).join('-');
  const filterPeriod = dateTokens.length === 2 ? dateTokens.map(normalizeDate) : null;
  const dates = tables.daily.map(row => gscDate(row.dimension, '일별')).sort();
  if (manifest.range_start && filterPeriod && manifest.range_start !== filterPeriod[0]
    || manifest.range_end && filterPeriod && manifest.range_end !== filterPeriod[1]) invalidGsc('manifest와 날짜 필터의 기간이 다릅니다');
  const periodStart = manifest.range_start || filterPeriod?.[0] || dates[0] || null;
  const periodEnd = manifest.range_end || filterPeriod?.[1] || dates.at(-1) || null;
  let periodDays = null;
  if (periodStart || periodEnd) {
    gscDate(periodStart, '시작'); gscDate(periodEnd, '종료');
    periodDays = Math.round((Date.parse(periodEnd) - Date.parse(periodStart)) / 86400000) + 1;
    if (periodDays < 1 || periodEnd > new Date().toISOString().slice(0, 10)) invalidGsc('측정 기간이 역전되었거나 미래입니다');
    if (dates.some(date => date < periodStart || date > periodEnd)) invalidGsc('일별 행이 선언한 측정 기간을 벗어납니다');
  }
  const declaredMethod = manifest.collection_method;
  if (declaredMethod && !['dom-table', 'google-sheets-export', 'official-export'].includes(declaredMethod)) invalidGsc('알 수 없는 collection_method입니다');
  // An unlabelled reconstructed ZIP must never acquire official-export provenance.
  const officialName = /^https___noblessegold\.com_(?:_|-).*Performance-on-Search-/i.test(fileName);
  const collectionMethod = declaredMethod || (officialName && entries.has('필터.csv') ? 'official-export' : 'unknown');
  const reconstructed = ['dom-table', 'google-sheets-export'].includes(collectionMethod);
  const property = manifest.property || filterValue(/^(속성|Property)$/i) || (officialName ? 'https://noblessegold.com/' : null);
  if (manifest.property && filterValue(/^(속성|Property)$/i) && manifest.property.replace(/\/$/, '') !== filterValue(/^(속성|Property)$/i).replace(/\/$/, '')) invalidGsc('manifest와 속성 필터가 다릅니다');
  const propertySource = manifest.property ? 'manifest' : filterValue(/^(속성|Property)$/i) ? 'filters' : officialName ? 'export-filename' : null;
  const filterSearch = filterValue(/^(검색 유형|Search type)$/i);
  const normalizeSearch = value => /^(웹|web)$/i.test(value || '') ? 'web' : String(value || '').toLowerCase() || null;
  if (manifest.search_type && filterSearch && normalizeSearch(manifest.search_type) !== normalizeSearch(filterSearch)) invalidGsc('manifest와 검색 유형 필터가 다릅니다');
  const searchType = normalizeSearch(manifest.search_type || filterSearch);
  const activeFilters = filters.filter(row => !/^(날짜|Date|검색 유형|Search type|속성|Property)$/i.test(row.filter) && row.value);
  let declaredFilters = null;
  if (manifest.active_filters != null) {
    try { declaredFilters = JSON.parse(manifest.active_filters); } catch (_) { invalidGsc('active_filters는 JSON 배열이어야 합니다'); }
    if (!Array.isArray(declaredFilters)) invalidGsc('active_filters는 JSON 배열이어야 합니다');
  }
  const completeness = {};
  for (const dimension of ['daily', 'queries', 'pages']) {
    const actualRows = tables[dimension].length;
    const declaredRows = manifest[`${dimension}_total_rows`];
    const declaredComplete = manifest[`${dimension}_complete`];
    if (declaredRows != null && !/^\d+$/.test(declaredRows)) invalidGsc(`${dimension}_total_rows는 0 이상의 정수여야 합니다`);
    if (declaredComplete != null && !['true', 'false'].includes(declaredComplete)) invalidGsc(`${dimension}_complete는 true 또는 false여야 합니다`);
    if (declaredRows != null && actualRows > Number(declaredRows)) invalidGsc(`${dimension} 행 수가 선언한 전체 행 수보다 큽니다`);
    if (declaredComplete === 'true' && (declaredRows == null || actualRows !== Number(declaredRows))) invalidGsc(`${dimension} 전체 수집 선언과 실제 행 수가 다릅니다`);
    const tablePresent = entries.has({ daily: '차트.csv', queries: '검색어 수.csv', pages: '페이지.csv' }[dimension]);
    const complete = reconstructed
      ? declaredComplete === 'true' && declaredRows != null && actualRows === Number(declaredRows)
      : collectionMethod === 'official-export' && tablePresent && declaredComplete !== 'false';
    completeness[dimension] = { rows: actualRows, totalRows: declaredRows == null ? null : Number(declaredRows), complete };
  }
  if (completeness.daily.complete && dates.length !== periodDays) {
    if (reconstructed) invalidGsc('일별 전체 수집 선언과 측정 기간 길이가 다릅니다');
    completeness.daily.complete = false;
  }
  const reasons = [];
  if (!['https://noblessegold.com', 'https://noblessegold.com/', 'sc-domain:noblessegold.com'].includes(property)) reasons.push('대상 사이트 전체 속성 확인 필요');
  if (searchType !== 'web') reasons.push('웹검색 전체 보고서가 아님');
  if (activeFilters.length || declaredFilters?.length) reasons.push('검색어·페이지·국가·기기 등의 필터 적용');
  if (collectionMethod === 'unknown' || (reconstructed ? declaredFilters == null : !entries.has('필터.csv'))) reasons.push('필터와 수집 방식 확인 필요');
  if (!periodDays || !Object.values(completeness).every(item => item.complete)) reasons.push('기간 또는 표의 전체 수집 확인 필요');
  if (tables.pages.some(row => { try { return new URL(row.dimension).hostname !== 'noblessegold.com'; } catch (_) { return true; } })) reasons.push('대상 속성 외 페이지 포함');
  if (Object.values(tables).some(rows => rows.some(row => row.clicks == null || row.impressions == null))) reasons.push('클릭·노출 수치 누락');
  return { periodStart, periodEnd, sitewide: reasons.length === 0, metadata: {
    sitewideEligible: reasons.length === 0,
    scope: reasons.length ? '범위 제한·미확인 자료' : '사이트 전체 웹검색',
    property, propertySource, searchType, filters, activeFilters: [...activeFilters, ...(declaredFilters || [])],
    collectionMethod, completeness, scopeReasons: reasons, manifest,
    coverageNote: {
      'official-export': '공식 내보내기 범위이며 익명 검색어·내보내기 행 제한으로 차원별 합계는 전체 합계와 다를 수 있습니다.',
      'google-sheets-export': 'GSC 공식 Google Sheets 내보내기를 XLSX를 거쳐 CSV로 변환한 자료입니다. 익명 검색어·내보내기 행 제한으로 차원별 합계는 전체 합계와 다를 수 있습니다.',
      'dom-table': '브라우저 표에서 수집해 CSV로 재구성한 자료입니다. Google 원본 내보내기 파일이 아닙니다.',
      unknown: '수집 방식이 확인되지 않아 사이트 전체 분석에 자동 사용하지 않습니다.',
    }[collectionMethod],
  } };
}

function importGscPerformance(buffer, fileName, entries) {
  const readTable = (file, dimension) => {
    if (!entries.has(file)) return [];
    const text = entries.get(file);
    const records = parse(text, { skip_empty_lines: true, trim: true });
    if (!records[0] || ![dimension, '클릭수', '노출'].every(key => records[0].includes(key))) invalidGsc(`${file} 머리글을 확인해 주세요`);
    const rows = parseCsvText(text).map(row => ({
      dimension: dimension === '인기 페이지' ? cleanGscPageUrl(row[dimension]) : row[dimension],
      clicks: gscNumber(row['클릭수'], `${file} 클릭수`), impressions: gscNumber(row['노출'], `${file} 노출`),
      ctr: gscNumber(row.CTR, `${file} CTR`, true), position: gscNumber(row['게재 순위'], `${file} 게재 순위`),
    }));
    if (rows.some(row => !row.dimension)) invalidGsc(`${file}에 빈 ${dimension} 행이 있습니다`);
    if (new Set(rows.map(row => row.dimension)).size !== rows.length) invalidGsc(`${file}에 중복 ${dimension} 행이 있습니다`);
    if (rows.some(row => row.clicks != null && !Number.isInteger(row.clicks) || row.impressions != null && !Number.isInteger(row.impressions))) invalidGsc(`${file} 클릭·노출은 정수여야 합니다`);
    return rows;
  };
  const daily = readTable('차트.csv', '날짜');
  const queries = readTable('검색어 수.csv', '인기 검색어');
  const pages = readTable('페이지.csv', '인기 페이지');
  const devices = readTable('기기.csv', '기기');
  const scope = gscScope(entries, fileName, { daily, queries, pages, devices });
  const normalizedGroups = new Map();
  for (const row of pages) {
    const url = normalizeUrl(row.dimension);
    if (!normalizedGroups.has(url)) normalizedGroups.set(url, []);
    normalizedGroups.get(url).push(row);
  }
  const duplicates = [...normalizedGroups.values()].filter((rows) => rows.length > 1);
  const summary = {
    clicks: sumGsc(daily, 'clicks'),
    impressions: sumGsc(daily, 'impressions'),
    pageRows: pages.length,
    queryRows: queries.length,
    duplicateGroups: duplicates.length,
    duplicateImpressions: duplicates.length ? sumGsc(duplicates.flat(), 'impressions') : 0,
    ...scope.metadata,
  };
  const sourceType = scope.sitewide ? 'gsc_performance' : 'gsc_performance_scoped';
  const existing = db.prepare('SELECT id, source_type, summary_json FROM analytics_imports WHERE file_hash=?').get(sha256(buffer));
  const revalidate = existing && ['gsc_performance', 'gsc_performance_scoped'].includes(existing.source_type)
    && typeof JSON.parse(existing.summary_json || '{}').sitewideEligible !== 'boolean';
  let meta;
  if (revalidate) {
    // Explicitly re-uploading a retained original may validate legacy evidence.
    // Keep its import ID and original file; replace old parser rows atomically.
    db.prepare('UPDATE analytics_imports SET source_type=?, period_start=?, period_end=?, parser_version=?, summary_json=? WHERE id=?')
      .run(sourceType, scope.periodStart, scope.periodEnd, PARSER_VERSION, JSON.stringify(summary), existing.id);
    for (const table of ['gsc_daily', 'gsc_queries', 'gsc_pages', 'gsc_devices']) db.prepare(`DELETE FROM ${table} WHERE import_id=?`).run(existing.id);
    meta = { id: existing.id, duplicate: true, revalidated: true, sourceType, summary };
  } else {
    meta = createImport({ sourceType, fileName, buffer, periodStart: scope.periodStart, periodEnd: scope.periodEnd, summary });
    if (meta.duplicate) return meta;
  }
  const dailyStmt = db.prepare('INSERT INTO gsc_daily (import_id, date, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  const queryStmt = db.prepare('INSERT INTO gsc_queries (import_id, query, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  const pageStmt = db.prepare('INSERT INTO gsc_pages (import_id, original_url, normalized_url, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const deviceStmt = db.prepare('INSERT INTO gsc_devices (import_id, device, clicks, impressions, ctr, position) VALUES (?, ?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const row of daily) dailyStmt.run(meta.id, row.dimension, row.clicks, row.impressions, row.ctr, row.position);
    for (const row of queries) queryStmt.run(meta.id, row.dimension, row.clicks, row.impressions, row.ctr, row.position);
    for (const row of pages) {
      const originalUrl = row.dimension;
      pageStmt.run(meta.id, originalUrl, normalizeUrl(originalUrl), row.clicks, row.impressions, row.ctr, row.position);
    }
    for (const row of devices) deviceStmt.run(meta.id, row.dimension, row.clicks, row.impressions, row.ctr, row.position);
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
  `).all().map((row) => {
    const summary = JSON.parse(row.summaryJson || '{}');
    if (row.sourceType === 'gsc_performance' && summary.sitewideEligible !== true) {
      Object.assign(summary, { sitewideEligible: false, scope: '범위 검증 이전 자료',
        scopeReasons: ['원본 파일을 다시 가져와 속성·필터·수집 범위를 확인하기 전에는 사이트 전체 분석에 사용하지 않습니다.'] });
    }
    return { ...row, summary, summaryJson: undefined };
  });
}

function latestImport(sourceType) {
  const row = db.prepare(`
    SELECT id, source_type AS sourceType, file_name AS fileName, period_start AS periodStart,
      period_end AS periodEnd, parser_version AS parserVersion, file_hash AS fileHash,
      summary_json AS summaryJson, imported_at AS importedAt
    FROM analytics_imports WHERE source_type = ?
      AND (source_type <> 'gsc_performance' OR json_extract(summary_json, '$.sitewideEligible') = 1)
    ORDER BY period_end DESC, imported_at DESC, id DESC LIMIT 1
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
