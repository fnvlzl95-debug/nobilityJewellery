const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// A direct run must never open the operator's database or import directory.
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-ga4-period-'));
const { db } = require('../server/lib/db');
const { config } = require('../server/lib/config');
const { importBuffer } = require('../server/services/analyticsService');

test.beforeEach(() => {
  db.prepare('DELETE FROM analytics_imports').run();
  db.prepare('DELETE FROM guides').run();
});
test.after(() => db.close());

const current = ['20260808', '20260904'];
const previous = ['20260711', '20260807'];
const overviewHeader = ['활성 사용자', '새 사용자 수', '활성 사용자당 평균 참여 시간', '이벤트 수'];
const pagesHeader = ['페이지 제목 및 화면 클래스', '조회수', '활성 사용자', '이벤트 수', '이탈률'];
const csv = rows => rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
const block = (period, header, rows) => `# 시작일: ${period[0]}\n# 종료일: ${period[1]}\n${header.join(',')}\n${csv(rows)}\n`;
const ingest = (blocks, name = 'ga4-regression.csv') => importBuffer(Buffer.from(blocks.join('\n')), name);
function guide(slug, pageTitle) {
  db.prepare('INSERT INTO guides(slug,path,title,page_title,source_path,scanned_at) VALUES (?,?,?,?,?,?)')
    .run(slug, `/guide/${slug}`, pageTitle, pageTitle, `/unused/${slug}.vue`, '2026-09-06T00:00:00Z');
}

test('GA4 comparison block order cannot mix old overview, page, acquisition, or retention metrics into the newest period', () => {
  guide('example', '현재 글 | 귀족');
  const result = ingest([
    block(previous, overviewHeader, [[654, 648, 51, 4118]]),
    block(current, pagesHeader, [['현재 글 | 귀족', 48, 45, 168, 0.4]]),
    block(previous, pagesHeader, [['현재 글 | 귀족', 999, 999, 999, 0.9]]),
    block(previous, ['세션 소스/매체', '세션수'], [['google / organic', 999]]),
    block(current, overviewHeader, [[1478, 1462, 44.14, 9981]]),
    block(current, ['세션 소스/매체', '세션수'], [['google / organic', 415]]),
    block(previous, ['N일', 'new', 'returning'], [[0, 999, 999]]),
    block(current, ['N일', 'new', 'returning'], [[0, 12, 2]]),
  ]);
  assert.deepEqual(result.summary.selectedPeriod, { periodStart: '2026-08-08', periodEnd: '2026-09-04' });
  assert.equal(result.summary.activeUsers, 1478);
  assert.equal(result.summary.events, 9981);
  assert.equal(result.summary.pageRows, 1);
  assert.equal(result.summary.comparisonPeriods.length, 1);
  assert.equal(result.summary.comparisonPeriods[0].overview.activeUsers, 654);
  assert.equal(result.summary.comparisonPeriods[0].periodEnd, '2026-08-07');
  const meta = db.prepare('SELECT period_start,period_end FROM analytics_imports WHERE id=?').get(result.id);
  assert.equal(meta.period_start, '2026-08-08');
  assert.equal(meta.period_end, '2026-09-04');
  assert.deepEqual(db.prepare('SELECT views FROM ga4_pages WHERE import_id=?').all(result.id).map(row => row.views), [48]);
  assert.deepEqual(db.prepare('SELECT value FROM ga4_sources WHERE import_id=?').all(result.id).map(row => row.value), [415]);
  assert.equal(db.prepare('SELECT new_users FROM ga4_retention WHERE import_id=?').get(result.id).new_users, 12);
});

test('GA4 overview does not silently borrow page rows from a different reporting period', () => {
  const result = ingest([
    block(previous, pagesHeader, [['지난 기간의 글', 999, 999, 999, 0.5]]),
    block(current, overviewHeader, [[1478, 1462, 44.14, 9981]]),
  ]);
  assert.equal(result.summary.pageRows, 0);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM ga4_pages WHERE import_id=?').get(result.id).count, 0);
  assert.equal(result.summary.comparisonPeriods[0].periodEnd, '2026-08-07');
});

test('GA4 overview exposes unmatched and ambiguous titles without fuzzy merging historical titles', () => {
  guide('gold-one-don-gram', '금 1돈은 몇 g? 3.75g·2돈·3돈 무게 환산표 | 귀족');
  guide('same-title-one', '같은 제목 | 귀족');
  guide('same-title-two', '같은 제목 | 귀족');
  const result = ingest([
    block(current, overviewHeader, [[1478, 1462, 44.14, 9981]]),
    block(current, pagesHeader, [
      ['금 1돈은 몇 g? 3.75g·2돈·3돈 무게 환산표 | 귀족', 48, 45, 168, 0.4],
      ['금 1돈 몇 g? 3.75g 환산·순도별 무게 계산 | 귀족', 60, 58, 212, 0.49],
      ['홈 | 귀족', 700, 425, 1995, 0.23],
      ['같은 제목 | 귀족', 8, 6, 10, 0.1],
    ]),
  ]);
  assert.equal(result.summary.mappingMethod, 'exact_page_title');
  assert.equal(result.summary.mappingScope, 'guide_inventory_at_import');
  assert.deepEqual(Object.fromEntries(['mappedRows', 'unmatchedRows', 'ambiguousRows', 'unmappedRows'].map(key => [key, result.summary[key]])), {
    mappedRows: 1, unmatchedRows: 2, ambiguousRows: 1, unmappedRows: 3,
  });
  assert.ok(result.summary.mappingLimitations.some(text => text.includes('이전 제목')));
  assert.ok(result.summary.mappingLimitations.some(text => text.includes('가이드가 아닌')));
  assert.equal(result.summary.unmappedExamples.find(row => row.pageTitle.startsWith('금 1돈 몇')).views, 60);
  const mapped = db.prepare('SELECT views FROM ga4_pages WHERE import_id=? AND guide_slug=?').all(result.id, 'gold-one-don-gram');
  assert.deepEqual(mapped.map(row => row.views), [48]);
  assert.equal(db.prepare("SELECT COUNT(*) AS count FROM ga4_pages WHERE import_id=? AND mapping_state='ambiguous' AND guide_slug IS NULL").get(result.id).count, 1);
});

test('standalone GA4 landing, devices, acquisition and events explain why their metrics cannot be imported as page or search data', () => {
  const fixtures = [
    [['방문 페이지', '세션수', '활성 사용자', '주요 이벤트'], [['/guide/example', 26, 24, 3]], /전체 유입.*Google 검색.*Google 자연 검색 트래픽/],
    [['기기 카테고리', '활성 사용자', '참여 세션수'], [['mobile', 1115, 790]], /기기 카테고리.*페이지 경로.*페이지 및 화면/],
    [['세션 소스/매체', '세션수', '주요 이벤트'], [['google / organic', 415, 14]], /독립 트래픽 획득.*보고서 개요.*페이지 및 화면/],
    [['이벤트 이름', '이벤트 수', '총 사용자'], [['generate_lead', 0, 0]], /이벤트 이름.*사용자.*중복.*페이지 및 화면/],
  ];
  const rawBefore = fs.readdirSync(path.join(config.dataDir, 'imports')).length;
  for (const [header, rows, reason] of fixtures) {
    assert.throws(() => ingest([block(current, header, rows)]), error => error.status === 422 && reason.test(error.message));
  }
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, 0);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM ga4_pages').get().count, 0);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM ga4_organic_pages').get().count, 0);
  assert.equal(fs.readdirSync(path.join(config.dataDir, 'imports')).length, rawBefore);
});

test('GA4 invalid, reversed, or missing period metadata cannot inherit a previous block end date', () => {
  const invalid = [
    block(['20260230', '20260301'], overviewHeader, [[1, 1, 1, 1]]),
    block(['20260905', '20260904'], overviewHeader, [[1, 1, 1, 1]]),
    `${overviewHeader.join(',')}\n1,1,1,1\n`,
    block(previous, overviewHeader, [[1, 1, 1, 1]]) + `\n# 시작일: 20260808\n${overviewHeader.join(',')}\n2,2,2,2\n`,
  ];
  for (const source of invalid) assert.throws(() => ingest([source]), error => error.status === 422 && /시작일·종료일/.test(error.message));
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, 0);
});

test('GA4 latest period selection also protects path-device and organic landing imports', () => {
  guide('example', '예제 | 귀족');
  const cases = [
    { header: ['페이지 경로 및 화면 클래스', '기기 카테고리', '조회수', '활성 사용자', '이벤트 수'], old: ['/guide/example', 'mobile', 999, 999, 999], fresh: ['/guide/example', 'mobile', 17, 12, 31], type: 'ga4_path_device', table: 'ga4_pages', metric: 'views', expected: 17 },
    { header: ['방문 페이지 + 쿼리 문자열', '자연 Google 검색 클릭수', '자연 Google 검색 노출수', '활성 사용자', '참여 세션수'], old: ['/guide/example', 999, 999, 999, 999], fresh: ['/guide/example', 3, 30, 2, 2], type: 'ga4_organic_landing', table: 'ga4_organic_pages', metric: 'clicks', expected: 3 },
  ];
  for (const item of cases) {
    const result = ingest([block(previous, item.header, [item.old]), block(current, item.header, [item.fresh])]);
    assert.equal(result.sourceType, item.type);
    assert.equal(result.summary.selectedPeriod.periodEnd, '2026-09-04');
    assert.deepEqual(db.prepare(`SELECT ${item.metric} AS metric FROM ${item.table} WHERE import_id=?`).all(result.id).map(row => row.metric), [item.expected]);
    assert.equal(result.summary.comparisonPeriods[0].periodEnd, '2026-08-07');
  }
});

test('same-period duplicate GA4 groups are rejected instead of silently selecting the first group', () => {
  assert.throws(() => ingest([
    block(current, overviewHeader, [[1, 1, 1, 1]]),
    block(current, overviewHeader, [[2, 2, 2, 2]]),
  ]), error => error.status === 422 && /비교 그룹/.test(error.message));
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, 0);
});

test('a pages-only report retains its actual period and leaves unavailable sitewide users null', () => {
  const result = ingest([block(current, pagesHeader, [['단독 페이지', 48, 45, 168, 0.4]])]);
  assert.equal(result.summary.activeUsers, null);
  assert.equal(result.summary.events, null);
  assert.equal(result.summary.pageRows, 1);
  assert.equal(db.prepare('SELECT period_end FROM analytics_imports WHERE id=?').get(result.id).period_end, '2026-09-04');
});

test('organic landing users remain unavailable across pages and preserve only a valid single-page count', () => {
  const header = ['방문 페이지 + 쿼리 문자열', '자연 Google 검색 클릭수', '자연 Google 검색 노출수', '활성 사용자', '참여 세션수'];
  const multiple = ingest([block(current, header, [
    ['/guide/one', 1, 10, 7, 4], ['/guide/two', 2, 20, 7, 5],
  ])]);
  assert.equal(multiple.summary.activeUsers, null);
  assert.equal(multiple.summary.activeUsersAggregation, 'unavailable');
  assert.match(multiple.summary.activeUsersNote, /페이지 간 사용자 중복/);
  assert.equal(multiple.summary.engagedSessions, 9);
  assert.deepEqual(db.prepare('SELECT active_users FROM ga4_organic_pages WHERE import_id=?').all(multiple.id).map(row => row.active_users), [7, 7]);
  for (const [value, expected] of [[7, 7], [0, 0], ['', null], ['invalid', null], [-1, null], [1.5, null]]) {
    const single = ingest([block(current, header, [['/guide/single', 1, 10, value, 4]])]);
    assert.equal(single.summary.activeUsers, expected);
    assert.equal(single.summary.activeUsersAggregation, expected == null ? 'unavailable' : 'single_page_row');
  }
});
