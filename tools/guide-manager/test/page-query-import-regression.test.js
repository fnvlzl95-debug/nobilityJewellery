const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const AdmZip = require('adm-zip');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-page-query-'));
const { db } = require('../server/lib/db');
const analytics = require('../server/services/analyticsService');
const { eligibleImport } = require('../server/services/baselineService');
const PAGE = 'https://noblessegold.com/guide/necklace-length';
const csv = rows => rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
test.beforeEach(() => db.prepare('DELETE FROM analytics_imports').run());
test.after(() => db.close());

function fixture(options = {}) {
  const { page = PAGE, start = '2024-01-01', end = '2024-01-02', sitewide = false } = options;
  const queries = options.queries || [['금 목걸이 길이', 2, 20, '10%', 4], ['목걸이 길이', 0, 5, '0%', 6]];
  const pages = options.pages || [[page, 3, 30, '10%', 4.5]];
  const daily = options.daily || [[start, 1, 10, '10%', 4], [end, 2, 20, '10%', 5]];
  const manifest = {
    source: 'google-search-console', collection_method: 'google-sheets-export', property: 'https://noblessegold.com/', search_type: options.searchType || 'web',
    range_start: start, range_end: end, active_filters: JSON.stringify(sitewide ? [] : [{ dimension: 'page', operator: 'equals', expression: page }]),
    ...(!sitewide ? { page_filter_operator: 'equals', page_filter_url: page } : {}),
    daily_complete: 'true', daily_total_rows: String(daily.length), pages_complete: 'true', pages_total_rows: String(pages.length),
    queries_complete: 'true', queries_total_rows: String(queries.length),
    ...options.manifest,
  };
  for (const key of options.omitManifest || []) delete manifest[key];
  const entries = {
    '필터.csv': csv([['필터', '값', '연산자'], ['검색 유형', options.searchType || '웹'], ['날짜', options.dateFilter || `${start} - ${end}`], ...(!sitewide ? [['페이지', options.filterPage || page, options.csvOperator || '']] : []), ...(options.filters || [])]),
    '차트.csv': csv([['날짜', '클릭수', '노출', 'CTR', '게재 순위'], ...daily]),
    '페이지.csv': csv([['인기 페이지', '클릭수', '노출', 'CTR', '게재 순위'], ...pages]),
    '검색어 수.csv': csv([['인기 검색어', '클릭수', '노출', 'CTR', '게재 순위'], ...queries]),
    'manifest.csv': csv([['key', 'value'], ...Object.entries(manifest)]),
  };
  const zip = new AdmZip();
  for (const [name, content] of Object.entries(entries)) if (!(options.omit || []).includes(name)) zip.addFile(name, Buffer.from(content));
  return zip.toBuffer();
}

function imported(options = {}) { return analytics.importBuffer(fixture(options), 'page-query-sheets.zip'); }
function current() {
  imported({ sitewide: true });
  return analytics.latestImport('gsc_performance');
}

test('exact-page Sheets import is a separate eligible source and keeps anonymized query totals distinct', () => {
  const performance = current();
  const result = imported();
  assert.equal(result.sourceType, 'gsc_performance_scoped');
  assert.equal(result.summary.sitewideEligible, false);
  assert.equal(result.summary.pageQueryEligible, true);
  assert.equal(result.summary.scope, '단일 페이지 웹검색');
  assert.equal(result.summary.clicks, 3);
  assert.equal(result.summary.queryClicks, 2);
  assert.equal(result.summary.impressions, 30);
  assert.equal(result.summary.queryImpressions, 25);
  const evidence = analytics.selectPageQueryEvidence(PAGE, performance);
  assert.equal(evidence.importId, result.id);
  assert.equal(evidence.verified, true);
  assert.equal(evidence.scope.pageFilterType, 'equals');
  assert.equal(evidence.scope.pageImpressions, 30);
  assert.equal(evidence.queryRows.length, 2);
  assert.match(evidence.fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(analytics.latestImport('gsc_performance').id, performance.id);
  assert.equal(eligibleImport({ importId: 0, periodDays: 2 }, 'gsc_performance', '2024-01-03T00:00:00Z'), null, '페이지 수입을 배포 후 사이트 전체 비교에 사용하지 않음');
});

test('header-only query export is verified as empty, while a missing query table is not', () => {
  const performance = current();
  const result = imported({ queries: [] });
  assert.equal(result.summary.pageQueryEligible, true);
  assert.equal(result.summary.queryRows, 0);
  assert.equal(result.summary.queryClicks, null);
  assert.equal(result.summary.impressions, 30);
  assert.deepEqual(analytics.selectPageQueryEvidence(PAGE, performance).queryRows, []);
  assert.throws(() => imported({ queries: [], omit: ['검색어 수.csv'] }), error => error.status === 422);
});

test('bare URLs never imply equals and contains/regex/extra/mismatched filters remain ineligible', () => {
  const performance = current();
  const invalid = [
    { omitManifest: ['page_filter_operator'] },
    { manifest: { page_filter_operator: 'contains' } },
    { manifest: { page_filter_operator: 'includingRegex' } },
    { csvOperator: 'contains' },
    { filterPage: `${PAGE}/` },
    { manifest: { page_filter_url: `${PAGE}/` } },
    { manifest: { active_filters: '[]' } },
    { manifest: { active_filters: JSON.stringify([{ dimension: 'page', operator: 'equals', expression: PAGE }, { dimension: 'query', operator: 'contains', expression: '반지' }]) } },
    ...['기기', '국가', '검색어', '검색 노출', '비교'].map(filter => ({ filters: [[filter, '추가 조건']] })),
    { filters: [['페이지', `${PAGE}/second`]] },
    { filters: [['날짜', '2023-12-01 - 2023-12-02']] },
    { pages: [[`${PAGE}/`, 3, 30, '10%', 4.5]] },
    { pages: [[PAGE, 1, 10, '10%', 4.5], [`${PAGE}/`, 2, 20, '10%', 4.5]] },
    { manifest: { property: 'https://example.com/' } },
    { manifest: { property: 'https://noblessegold.com/guide/' } },
    { searchType: 'image' },
  ];
  for (const options of invalid) {
    const result = imported(options);
    assert.equal(result.summary.pageQueryEligible, false, JSON.stringify(options));
    assert.ok(result.summary.pageQueryReasons.length);
    assert.equal(result.summary.sitewideEligible, false);
  }
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance), null);
  assert.equal(analytics.latestImport('gsc_performance').id, performance.id);
  assert.equal(imported({ omitManifest: ['page_filter_operator'], csvOperator: 'equals' }).summary.pageQueryEligible, true, '명시한 CSV 연산자는 사용 가능');
});

test('partial counts, metric gaps and impossible metric relationships cannot supply page queries', () => {
  const performance = current();
  for (const options of [
    { manifest: { queries_complete: 'false', queries_total_rows: '100' } },
    { omitManifest: ['queries_total_rows', 'queries_complete'] },
    { queries: [['금 목걸이 길이', '', 20, '', 4]] },
    { queries: [['금 목걸이 길이', 2, 20, '', 4]] },
    { queries: [['금 목걸이 길이', 2, 20, '90%', 4]] },
    { queries: [['금 목걸이 길이', 2, 3, '1', 4]] },
    { queries: [['금 목걸이 길이', 2, 20, '10%', '']] },
    { queries: [['금 목걸이 길이', 2, 1, '100%', 4]] },
    { queries: [['금 목걸이 길이', 0, 40, '0%', 4]] },
    { queries: [['금 목걸이 길이', 2, 20, '10%', 0]] },
    { pages: [[PAGE, 4, 40, '10%', 4]] },
  ]) {
    const result = imported(options);
    assert.equal(result.summary.pageQueryEligible, false, JSON.stringify(options));
  }
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance), null);
  const count = db.prepare('SELECT COUNT(*) AS n FROM analytics_imports').get().n;
  for (const options of [{ manifest: { queries_total_rows: '99' } }, { omit: ['차트.csv'] }, { manifest: { range_end: '2024-01-03' } }]) {
    assert.throws(() => imported(options), error => error.status === 422);
  }
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM analytics_imports').get().n, count);
});

test('selector matches exact URL/property/current period, and chooses import time then ID within that period', () => {
  const performance = current();
  const first = imported();
  const second = imported({ manifest: { capture_note: 'second' } });
  const newest = imported({ manifest: { capture_note: 'third' } });
  const olderPeriod = imported({ start: '2023-12-01', end: '2023-12-02' });
  const otherProperty = imported({ manifest: { property: 'sc-domain:noblessegold.com' } });
  db.prepare('UPDATE analytics_imports SET imported_at=? WHERE id IN (?,?,?,?)').run('2024-01-06T00:00:00Z', first.id, second.id, olderPeriod.id, otherProperty.id);
  db.prepare('UPDATE analytics_imports SET imported_at=? WHERE id=?').run('2024-01-05T00:00:00Z', newest.id);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).importId, second.id);
  db.prepare('UPDATE analytics_imports SET imported_at=? WHERE id=?').run('2024-01-07T00:00:00Z', newest.id);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).importId, newest.id);
  for (const url of [`${PAGE}/`, PAGE.replace('necklace', 'Necklace'), `${PAGE}?device=mobile`, PAGE.replace('https:', 'http:'), PAGE.replace('necklace', '%6eecklace')]) assert.equal(analytics.selectPageQueryEvidence(url, performance), null, url);
  const staleMap = analytics.pageQueryEvidenceMap(performance);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, { ...performance, periodEnd: '2024-01-03' }, staleMap), null);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, { ...performance, summary: { ...performance.summary, sitewideEligible: false } }, staleMap), null);
});

test('an old scoped original is revalidated only on explicit upload, preserving its ID and rows', () => {
  const performance = current();
  const original = fixture();
  const first = analytics.importBuffer(original, 'page-query-sheets.zip');
  const old = structuredClone(first.summary);
  delete old.pageQueryEligible; delete old.pageQueryScopeVersion; delete old.pageQueryScope; delete old.pageQueryReasons;
  db.prepare('UPDATE analytics_imports SET parser_version=?,summary_json=? WHERE id=?').run('noblesse-analytics-v6', JSON.stringify(old), first.id);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance), null);
  assert.deepEqual(JSON.parse(db.prepare('SELECT summary_json FROM analytics_imports WHERE id=?').get(first.id).summary_json), old);
  const again = analytics.importBuffer(original, 'page-query-sheets.zip');
  assert.equal(again.id, first.id);
  assert.equal(again.revalidated, true);
  assert.equal(again.duplicate, true);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).importId, first.id);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM gsc_queries WHERE import_id=?').get(first.id).n, 2);
});

test('all pages load with two queries and retained row changes alter the evidence identity or invalidate it', () => {
  const performance = current();
  const pages = Array.from({ length: 12 }, (_, index) => `${PAGE}-${index}`);
  for (const page of pages) imported({ page });
  const prepare = db.prepare;
  let queries = 0;
  db.prepare = function (...args) { queries++; return prepare.apply(this, args); };
  let map;
  try {
    map = analytics.pageQueryEvidenceMap(performance);
    for (const page of pages) assert.ok(analytics.selectPageQueryEvidence(page, performance, map));
  } finally { db.prepare = prepare; }
  assert.equal(map.size, pages.length);
  assert.equal(queries, 2);
  const before = map.get(pages[0]);
  db.prepare('UPDATE gsc_queries SET query=? WHERE import_id=? AND query=?').run('목걸이 적정 길이', before.importId, '금 목걸이 길이');
  const after = analytics.selectPageQueryEvidence(pages[0], performance);
  assert.equal(after.importId, before.importId);
  assert.notEqual(after.fingerprint, before.fingerprint);
  db.prepare('UPDATE gsc_queries SET clicks=99 WHERE import_id=?').run(before.importId);
  assert.equal(analytics.selectPageQueryEvidence(pages[0], performance), null);
  db.prepare('UPDATE gsc_pages SET original_url=? WHERE import_id=?').run(`${pages[1]}/`, map.get(pages[1]).importId);
  assert.equal(analytics.selectPageQueryEvidence(pages[1], performance), null);
});

test('official zero-impression rows may omit trailing CTR and position, but required or extra columns fail', () => {
  const result = imported({ daily: [['2024-01-01', 0, 0], ['2024-01-02', 1, 10, '10%', 4]], pages: [[PAGE, 1, 10, '10%', 4]], queries: [['금 목걸이 길이', 0, 5, '0%', 4]] });
  assert.equal(result.summary.pageQueryEligible, true);
  assert.deepEqual(db.prepare('SELECT ctr,position FROM gsc_daily WHERE import_id=? AND date=?').get(result.id, '2024-01-01'), { ctr: null, position: null });
  for (const row of [['2024-01-01', 0], ['2024-01-01', 0, 0, '0%', 0, 'extra']]) {
    assert.throws(() => imported({ daily: [row, ['2024-01-02', 2, 20, '10%', 5]] }), error => error.status === 422);
  }
});

const officialName = 'https___noblessegold.com_-Performance-on-Search-2024-01-05.zip';
const confirmation = () => ({ pageUrl: PAGE, exactMatch: true, completeExport: true, periodStart: '2024-01-01', periodEnd: '2024-01-02' });

test('upload confirmation validates a manifest-free official original in place and preserves its bytes and provenance', async () => {
  const performance = current();
  const original = fixture({ omit: ['manifest.csv'], dateFilter: '지난 2일' });
  const before = analytics.importBuffer(original, officialName);
  assert.equal(before.summary.pageQueryEligible, false);
  const saved = db.prepare('SELECT file_hash,raw_path FROM analytics_imports WHERE id=?').get(before.id);
  const result = analytics.importBuffer(original, officialName, { pageQueryConfirmation: confirmation() });
  assert.equal(result.id, before.id);
  assert.equal(result.revalidated, true);
  assert.equal(result.summary.pageQueryEligible, true);
  assert.equal(result.summary.sitewideEligible, false);
  assert.deepEqual(result.summary.manifest, {}, '사용자 확인을 원본 manifest인 것처럼 기록하지 않음');
  assert.equal(result.summary.operatorConfirmation.source, 'operator-upload-confirmation');
  assert.match(result.summary.operatorConfirmation.confirmedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(result.summary.pageQueryScope.filterEvidence, 'operator-confirmation-and-export-filters');
  assert.deepEqual(db.prepare('SELECT file_hash,raw_path FROM analytics_imports WHERE id=?').get(result.id), saved);
  assert.deepEqual(fs.readFileSync(saved.raw_path), original);
  const evidence = analytics.selectPageQueryEvidence(PAGE, performance);
  const duplicate = analytics.importBuffer(original, officialName);
  assert.equal(duplicate.id, result.id);
  assert.equal(duplicate.summary.operatorConfirmation.confirmedAt, result.summary.operatorConfirmation.confirmedAt);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).fingerprint, evidence.fingerprint);
  await new Promise(resolve => setTimeout(resolve, 5));
  const reconfirmed = analytics.importBuffer(original, officialName, { pageQueryConfirmation: confirmation() });
  assert.equal(reconfirmed.id, result.id);
  assert.notEqual(reconfirmed.summary.operatorConfirmation.confirmedAt, result.summary.operatorConfirmation.confirmedAt);
  assert.notEqual(analytics.selectPageQueryEvidence(PAGE, performance).fingerprint, evidence.fingerprint);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM gsc_queries WHERE import_id=?').get(result.id).n, 2);
});

test('confirmation cannot override original filters, periods, partial flags, missing numbers, or retained confirmations', () => {
  const performance = current();
  const original = fixture({ omit: ['manifest.csv'], dateFilter: '지난 2일' });
  const first = analytics.importBuffer(original, officialName, { pageQueryConfirmation: confirmation() });
  const before = db.prepare('SELECT summary_json,file_hash FROM analytics_imports WHERE id=?').get(first.id);
  for (const patch of [{ pageUrl: `${PAGE}/` }, { periodStart: '2023-12-31' }, { periodEnd: '2024-01-03' }, { exactMatch: false }, { completeExport: false }]) {
    assert.throws(() => analytics.importBuffer(original, officialName, { pageQueryConfirmation: { ...confirmation(), ...patch } }), error => error.status === 422);
    assert.deepEqual(db.prepare('SELECT summary_json,file_hash FROM analytics_imports WHERE id=?').get(first.id), before);
  }
  for (const options of [
    { csvOperator: 'contains' }, { filterPage: `${PAGE}/` }, { manifest: { page_filter_operator: 'contains' } },
    { manifest: { queries_complete: 'false', queries_total_rows: '100' } }, { omit: ['차트.csv'] },
  ]) assert.throws(() => analytics.importBuffer(fixture(options), officialName, { pageQueryConfirmation: confirmation() }), error => error.status === 422);
  assert.throws(() => analytics.importBuffer(fixture({ omit: ['manifest.csv'], dateFilter: '지난 2일' }), officialName, { pageQueryConfirmation: { ...confirmation(), periodStart: '2023-12-30' } }), error => error.status === 422);
  const missing = analytics.importBuffer(fixture({ omit: ['manifest.csv'], queries: [['금 목걸이 길이', '', 20, '', 4]] }), officialName, { pageQueryConfirmation: confirmation() });
  assert.equal(missing.summary.pageQueryEligible, false);
  assert.equal(missing.summary.queryClicks, null);
  const extra = analytics.importBuffer(fixture({ omit: ['manifest.csv'], filters: [['기기', '모바일']] }), officialName, { pageQueryConfirmation: confirmation() });
  assert.equal(extra.summary.pageQueryEligible, false);
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).importId, first.id);
  assert.throws(() => analytics.importBuffer(Buffer.from('not a report'), 'example.csv', { pageQueryConfirmation: confirmation() }), error => error.status === 422);
});
