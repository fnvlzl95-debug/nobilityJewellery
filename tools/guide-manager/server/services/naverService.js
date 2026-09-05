const { db, getSetting, setSetting } = require('../lib/db');
const { getCredentials } = require('./settingsService');
const { normalizeUrl, stripHtml, nowIso } = require('../lib/utils');

const HUB_BASE = 'https://naverapihub.apigw.ntruss.com';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function resultMatchesTarget(url, expectedPath) {
  try {
    const parsed = new URL(url);
    const target = new URL(String(expectedPath || '/'), 'https://noblessegold.com');
    return parsed.hostname.replace(/^www\./, '') === 'noblessegold.com'
      && (parsed.pathname.replace(/\/$/, '') || '/') === (target.pathname.replace(/\/$/, '') || '/');
  } catch (_) { return false; }
}

function quotaState() {
  const date = todayKey();
  return { date, calls: Number(getSetting(`naver_calls_${date}`, '0')) || 0, dailyLimit: 25000 };
}

function markCall() {
  const state = quotaState();
  setSetting(`naver_calls_${state.date}`, state.calls + 1);
  return { ...state, calls: state.calls + 1 };
}

function headers() {
  const credentials = getCredentials();
  if (!credentials.naverId || !credentials.naverSecret) {
    const error = new Error('NAVER API HUB Client ID와 Client Secret이 필요합니다');
    error.code = 'NAVER_CREDENTIALS_REQUIRED';
    throw error;
  }
  return {
    'X-NCP-APIGW-API-KEY-ID': credentials.naverId,
    'X-NCP-APIGW-API-KEY': credentials.naverSecret,
  };
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    markCall();
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let payload = null;
    try { payload = JSON.parse(text); } catch (_) { /* 오류 본문은 아래에서 사용 */ }
    if (!response.ok) {
      const error = new Error(`네이버 API ${response.status}: ${payload?.error?.message || payload?.message || text.slice(0, 300) || '요청 실패'}`);
      error.status = response.status;
      error.stopBatch = [401, 403, 429].includes(response.status);
      throw error;
    }
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

async function searchEndpoint(keyword, { display = 30, start = 1, endpoint = 'webkr' } = {}) {
  const query = String(keyword || '').trim();
  if (!query) throw new Error('검색어를 입력해 주세요');
  const url = new URL(`${HUB_BASE}/search/v1/${endpoint}`);
  url.searchParams.set('query', query);
  url.searchParams.set('display', String(Math.max(1, Math.min(100, Number(display) || 30))));
  url.searchParams.set('start', String(Math.max(1, Math.min(1000, Number(start) || 1))));
  url.searchParams.set('sort', 'sim');
  url.searchParams.set('format', 'json');
  const data = await fetchJson(url, { headers: headers() });
  return {
    keyword: query,
    source: endpoint === 'webkr' ? 'naver_webkr' : 'naver_blog_fallback',
    warning: endpoint === 'webkr' ? null : '현재 API Application에서 웹문서 검색이 비활성화되어 블로그 검색 결과로 검색 의도만 보조합니다. 자사 웹사이트 순위에는 사용하지 않습니다.',
    total: Number(data.total || 0),
    items: (data.items || []).map((item, index) => ({
      rank: start + index,
      title: stripHtml(item.title),
      description: stripHtml(item.description),
      url: normalizeUrl(item.link),
    })),
  };
}

async function searchWeb(keyword, options = {}) {
  try { return await searchEndpoint(keyword, { ...options, endpoint: 'webkr' }); }
  catch (error) {
    if (error.status !== 401 || !/활성화되어 있지 않습니다/.test(error.message)) throw error;
    return searchEndpoint(keyword, { ...options, endpoint: 'blog' });
  }
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

function trendWindow(rows) {
  const avg = (values) => values.length ? values.reduce((sum, row) => sum + Number(row.ratio || 0), 0) / values.length : null;
  const recent = avg(rows.slice(-4));
  const previous = avg(rows.slice(-8, -4));
  const momentum = recent == null || previous == null ? null : previous > 0 ? ((recent - previous) / previous) * 100 : recent > 0 ? 100 : 0;
  return {
    ratio: recent == null ? null : Number(recent.toFixed(2)),
    previousRatio: previous == null ? null : Number(previous.toFixed(2)),
    momentumPercent: momentum == null ? null : Number(momentum.toFixed(1)),
    direction: momentum == null ? 'no_data' : momentum >= 12 ? 'rising' : momentum <= -12 ? 'falling' : 'steady',
    dataPoints: rows.length,
    latestPeriod: rows.at(-1)?.period || null,
    note: '검색어 트렌드 값은 절대 검색량이 아닌 동일 요청 안의 상대 지수입니다.',
  };
}

async function trend(keyword) {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - 90);
  const payload = await fetchJson(`${HUB_BASE}/search-trend/v1/search`, {
    method: 'POST',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: ymd(start),
      endDate: ymd(end),
      timeUnit: 'week',
      keywordGroups: [{ groupName: 'keyword', keywords: [keyword] }],
    }),
  });
  const rows = payload?.results?.[0]?.data || [];
  return trendWindow(rows);
}

async function trendCompare(candidates) {
  const groups = (candidates || []).slice(0, 5).map((candidate, index) => ({
    id: String(candidate.id || index),
    groupName: `candidate-${index + 1}`,
    keywords: [...new Set([candidate.keyword, ...(candidate.supportingKeywords || [])]
      .map((value) => String(value || '').trim()).filter(Boolean))].slice(0, 5),
  })).filter((group) => group.keywords.length);
  if (!groups.length) return {};
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - 90);
  const payload = await fetchJson(`${HUB_BASE}/search-trend/v1/search`, {
    method: 'POST',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: ymd(start),
      endDate: ymd(end),
      timeUnit: 'week',
      keywordGroups: groups.map(({ groupName, keywords }) => ({ groupName, keywords })),
    }),
  });
  const byName = new Map((payload?.results || []).map((result) => [result.title, result.data || []]));
  return Object.fromEntries(groups.map((group) => [group.id, {
    ...trendWindow(byName.get(group.groupName) || []),
    keywords: group.keywords,
  }]));
}

async function rank(keyword, depth = 100, expectedPath = null) {
  const maxDepth = Math.max(10, Math.min(300, Number(depth) || 100));
  let total = null;
  let competing = null;
  const targetPath = expectedPath ? new URL(String(expectedPath), 'https://noblessegold.com').pathname.replace(/\/$/, '') || '/' : null;
  for (let start = 1; start <= maxDepth; start += 100) {
    const result = await searchWeb(keyword, { display: Math.min(100, maxDepth - start + 1), start });
    total = result.total;
    if (result.source !== 'naver_webkr') return { available: false, found: false, rank: null, totalResults: total, resultTitle: null, resultUrl: null, depth: maxDepth, reason: result.warning };
    const ownPages = result.items.filter((item) => {
      try { return new URL(item.url).hostname.replace(/^www\./, '') === 'noblessegold.com'; } catch (_) { return false; }
    });
    if (!competing && ownPages.length) competing = ownPages[0];
    const own = targetPath ? ownPages.find((item) => resultMatchesTarget(item.url, targetPath)) : ownPages[0];
    if (own) return {
      available: true, found: true, rank: own.rank, totalResults: total, resultTitle: own.title, resultUrl: own.url, depth: maxDepth,
      competingRank: competing && competing.url !== own.url ? competing.rank : null,
      competingUrl: competing && competing.url !== own.url ? competing.url : null,
    };
    if (!result.items.length || start + result.items.length > total) break;
  }
  return { available: true, found: false, rank: null, totalResults: total, resultTitle: null, resultUrl: null, depth: maxDepth, competingRank: competing?.rank || null, competingUrl: competing?.url || null };
}

async function researchKeyword(keyword, { depth = 100 } = {}) {
  const [web, trendData] = await Promise.all([searchWeb(keyword, { display: 30 }), trend(keyword)]);
  const own = web.source === 'naver_webkr' && web.items.find((item) => {
    try { return new URL(item.url).hostname.replace(/^www\./, '') === 'noblessegold.com'; } catch (_) { return false; }
  });
  return {
    keyword,
    web,
    trend: trendData,
    ownRank: web.source !== 'naver_webkr'
      ? { available: false, found: false, rank: null, resultTitle: null, resultUrl: null, depth, reason: web.warning }
      : own ? { available: true, found: true, rank: own.rank, resultTitle: own.title, resultUrl: own.url, depth: 30 } : await rank(keyword, depth),
    quota: quotaState(),
  };
}

function dueKeywords(days = 7) {
  return db.prepare(`
    SELECT rk.id, rk.guide_slug AS guideSlug, rk.keyword, rk.last_checked_at AS lastCheckedAt,
      g.title, g.path
    FROM rank_keywords rk LEFT JOIN guides g ON g.slug = rk.guide_slug
    WHERE rk.active = 1 AND (rk.last_checked_at IS NULL OR julianday('now') - julianday(rk.last_checked_at) >= ?)
    ORDER BY COALESCE(rk.last_checked_at, '1900-01-01'), rk.id
  `).all(days);
}

async function scanKeywordRow(row, depth = 100) {
  const result = await rank(row.keyword, depth, row.path || null);
  let trendData = { ratio: null, direction: 'no_data' };
  try { trendData = await trend(row.keyword); } catch (error) { if (error.stopBatch) throw error; }
  const stamp = nowIso();
  db.prepare(`
    INSERT INTO rank_snapshots (keyword_id, checked_at, available, found, rank, total_results, result_title, result_url, competing_rank, competing_url, depth, trend_ratio, trend_direction)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(row.id, stamp, result.available === false ? 0 : 1, result.found ? 1 : 0, result.rank, result.totalResults, result.resultTitle, result.resultUrl, result.competingRank, result.competingUrl, result.depth, trendData.ratio, trendData.direction);
  db.prepare('UPDATE rank_keywords SET last_checked_at = ? WHERE id = ?').run(stamp, row.id);
  return { id: row.id, keyword: row.keyword, ...result, trend: trendData };
}

async function scanDue({ ids = null, depth = 100, force = false } = {}) {
  let rows = force ? db.prepare(`
    SELECT rk.id, rk.guide_slug AS guideSlug, rk.keyword, rk.last_checked_at AS lastCheckedAt,
      g.title, g.path FROM rank_keywords rk LEFT JOIN guides g ON g.slug=rk.guide_slug
    WHERE rk.active=1 ORDER BY rk.id
  `).all() : dueKeywords(7);
  if (Array.isArray(ids) && ids.length) rows = rows.filter((row) => ids.includes(row.id));
  const results = [];
  for (const row of rows) {
    try { results.push(await scanKeywordRow(row, depth)); }
    catch (error) {
      results.push({ id: row.id, keyword: row.keyword, error: error.message });
      if (error.stopBatch) break;
    }
  }
  return { requested: rows.length, completed: results.length, results, quota: quotaState() };
}

module.exports = { quotaState, searchEndpoint, searchWeb, trend, trendCompare, trendWindow, rank, researchKeyword, dueKeywords, scanDue, resultMatchesTarget };
