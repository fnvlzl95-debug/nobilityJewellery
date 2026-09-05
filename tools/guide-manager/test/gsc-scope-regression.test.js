const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const AdmZip = require('adm-zip');

// This file always owns an empty temporary database, including when run directly.
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-gsc-scope-'));
const { db } = require('../server/lib/db');
const { importBuffer, latestImport, listImports } = require('../server/services/analyticsService');
const { eligibleImport } = require('../server/services/baselineService');

test.beforeEach(() => db.prepare('DELETE FROM analytics_imports').run());
test.after(() => db.close());

const officialName = 'https___noblessegold.com_-Performance-on-Search-2024-01-05.zip';
const csv = rows => rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');

function fixture({ start = '2024-01-01', end = '2024-01-02', filters = [], manifest, daily, pages, queries, omit = [] } = {}) {
  const zip = new AdmZip();
  const entries = {
    '차트.csv': csv([['날짜', '클릭수', '노출', 'CTR', '게재 순위'], ...(daily || [[start, 1, 10, '10%', 3], [end, 2, 20, '10%', 5]])]),
    '검색어 수.csv': csv([['인기 검색어', '클릭수', '노출', 'CTR', '게재 순위'], ...(queries || [['금반지', 1, 20, '5%', 4]])]),
    '페이지.csv': csv([['인기 페이지', '클릭수', '노출', 'CTR', '게재 순위'], ...(pages || [['https://noblessegold.com/guide/example', 3, 30, '10%', 4.5]])]),
    '필터.csv': csv([['필터', '값'], ['검색 유형', '웹'], ['날짜', `${start} - ${end}`], ...filters]),
  };
  if (manifest) entries['manifest.csv'] = csv([['key', 'value'], ...Object.entries(manifest)]);
  for (const [name, content] of Object.entries(entries)) if (!omit.includes(name)) zip.addFile(name, Buffer.from(content));
  return zip.toBuffer();
}

function manifest(overrides = {}) {
  return {
    source: 'google-search-console', collection_method: 'dom-table',
    property: 'https://noblessegold.com/', search_type: 'web', active_filters: '[]',
    range_start: '2024-01-01', range_end: '2024-01-02',
    daily_complete: 'true', daily_total_rows: '2', queries_complete: 'true', queries_total_rows: '1',
    pages_complete: 'true', pages_total_rows: '1', captured_at: '2024-01-05T10:00:00Z',
    source_url: 'https://search.google.com/search-console/performance/search-analytics', ...overrides,
  };
}

test('official GSC ZIP preserves filters and remains eligible without changing measured totals', () => {
  const result = importBuffer(fixture(), officialName);
  assert.equal(result.sourceType, 'gsc_performance');
  assert.equal(result.summary.clicks, 3);
  assert.equal(result.summary.impressions, 30);
  assert.equal(result.summary.property, 'https://noblessegold.com/');
  assert.equal(result.summary.propertySource, 'export-filename');
  assert.equal(result.summary.collectionMethod, 'official-export');
  assert.equal(result.summary.searchType, 'web');
  assert.deepEqual(result.summary.filters, [{ filter: '검색 유형', value: '웹' }, { filter: '날짜', value: '2024-01-01 - 2024-01-02' }]);
  assert.equal(result.summary.completeness.daily.complete, true);
});

test('a newer filtered report is retained but cannot replace sitewide recommendations or baseline imports', () => {
  const prior = importBuffer(fixture({ start: '2023-12-14', end: '2023-12-15' }), officialName);
  const full = importBuffer(fixture(), officialName);
  const restricted = importBuffer(fixture({ start: '2024-01-03', end: '2024-01-04', filters: [['페이지', 'https://noblessegold.com/guide/example']] }), officialName);
  assert.equal(restricted.sourceType, 'gsc_performance_scoped');
  assert.equal(listImports().length, 3);
  assert.equal(latestImport('gsc_performance').id, full.id);
  assert.equal(eligibleImport({ importId: prior.id, periodDays: 2, periodStart: '2023-12-14', periodEnd: '2023-12-15' }, 'gsc_performance', '2023-12-20T00:00:00Z').id, full.id);
  assert.deepEqual(restricted.summary.activeFilters, [{ filter: '페이지', value: 'https://noblessegold.com/guide/example' }]);
});

test('missing provenance or filters remains scoped, including renamed reconstructed files', () => {
  const unknown = importBuffer(fixture(), 'reconstructed.zip');
  assert.equal(unknown.sourceType, 'gsc_performance_scoped');
  assert.equal(unknown.summary.collectionMethod, 'unknown');
  const missingFilters = importBuffer(fixture({ omit: ['필터.csv'] }), officialName);
  assert.equal(missingFilters.sourceType, 'gsc_performance_scoped');
  assert.equal(latestImport('gsc_performance'), null);
});

test('legacy metadata is not auto-trusted and explicit re-import validates its original without duplicate rows', () => {
  const buffer = fixture();
  const first = importBuffer(buffer, officialName);
  const legacySummary = { clicks: 3, impressions: 30, pageRows: 1, queryRows: 1 };
  db.prepare('UPDATE analytics_imports SET summary_json=?, parser_version=? WHERE id=?').run(JSON.stringify(legacySummary), 'noblesse-analytics-v4', first.id);
  assert.equal(latestImport('gsc_performance'), null);
  assert.equal(listImports()[0].summary.scope, '범위 검증 이전 자료');
  assert.equal(listImports()[0].summary.sitewideEligible, false);
  // A read must not silently migrate or authorize retained evidence.
  assert.deepEqual(JSON.parse(db.prepare('SELECT summary_json FROM analytics_imports WHERE id=?').get(first.id).summary_json), legacySummary);
  const again = importBuffer(buffer, officialName);
  assert.equal(again.id, first.id);
  assert.equal(again.duplicate, true);
  assert.equal(again.revalidated, true);
  assert.equal(latestImport('gsc_performance').id, first.id);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM gsc_daily').get().count, 2);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, 1);
});

test('complete DOM and official Sheets conversions retain their distinct provenance and exact row counts', () => {
  for (const method of ['dom-table', 'google-sheets-export']) {
    const metadata = manifest({ collection_method: method });
    const result = importBuffer(fixture({ manifest: metadata }), `${method}.zip`);
    assert.equal(result.sourceType, 'gsc_performance');
    assert.equal(result.summary.collectionMethod, method);
    assert.deepEqual(result.summary.manifest, metadata);
    assert.deepEqual(result.summary.completeness.pages, { rows: 1, totalRows: 1, complete: true });
    assert.match(result.summary.coverageNote, method === 'dom-table' ? /원본 내보내기 파일이 아닙니다/ : /Google Sheets.*XLSX/);
  }
});

test('partial table exports cannot replace complete data even when the property and date are valid', () => {
  const result = importBuffer(fixture({ manifest: manifest({ pages_complete: 'false', pages_total_rows: '100' }) }), 'partial.zip');
  assert.equal(result.sourceType, 'gsc_performance_scoped');
  assert.equal(result.summary.completeness.pages.complete, false);
  assert.equal(result.summary.completeness.pages.totalRows, 100);
  assert.equal(latestImport('gsc_performance'), null);
});

test('count mismatches, impossible dates, duplicate days, and inconsistent periods fail atomically', () => {
  const bad = [
    fixture({ manifest: manifest({ pages_total_rows: '2' }) }),
    fixture({ manifest: manifest({ daily_total_rows: '1' }) }),
    fixture({ start: '2024-02-30', end: '2024-03-01' }),
    fixture({ start: '2024-01-03', end: '2024-01-02' }),
    fixture({ daily: [['2024-01-01', 1, 10, '10%', 3], ['2024-01-01', 2, 20, '10%', 5]] }),
    fixture({ daily: [['2024-01-03', 1, 10, '10%', 3]] }),
    fixture({ manifest: manifest({ range_end: '2024-01-03' }) }),
    fixture({ manifest: manifest({ search_type: 'image' }) }),
  ];
  for (const buffer of bad) assert.throws(() => importBuffer(buffer, officialName), error => error.status === 422);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, 0);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM gsc_daily').get().count, 0);
});

test('missing metrics and missing daily tables stay null instead of manufacturing zero performance', () => {
  const result = importBuffer(fixture({ daily: [['2024-01-01', '', 10, '', ''], ['2024-01-02', 0, 0, '0%', '']] }), officialName);
  assert.equal(result.sourceType, 'gsc_performance_scoped');
  assert.equal(result.summary.clicks, null);
  assert.equal(result.summary.impressions, 10);
  assert.deepEqual(db.prepare('SELECT clicks,ctr,position FROM gsc_daily WHERE import_id=? AND date=?').get(result.id, '2024-01-01'), { clicks: null, ctr: null, position: null });
  const absent = importBuffer(fixture({ omit: ['차트.csv'] }), officialName);
  assert.equal(absent.sourceType, 'gsc_performance_scoped');
  assert.equal(absent.summary.clicks, null);
  assert.equal(absent.summary.impressions, null);
});

test('other properties, URL-prefix subpaths, manifest filters, and foreign page rows remain scoped', () => {
  for (const options of [
    { manifest: manifest({ property: 'https://example.com/' }) },
    { manifest: manifest({ property: 'https://noblessegold.com/guide/' }) },
    { manifest: manifest({ active_filters: '[{"device":"mobile"}]' }) },
    { pages: [['https://example.com/guide/example', 3, 30, '10%', 4.5]] },
  ]) assert.equal(importBuffer(fixture(options), officialName).sourceType, 'gsc_performance_scoped');
  assert.equal(latestImport('gsc_performance'), null);
});
