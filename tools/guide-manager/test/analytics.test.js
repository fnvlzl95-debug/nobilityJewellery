const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { PARSER_VERSION, parseGa4Blocks, importBuffer, zipEntries, cleanGscPageUrl, cleanGa4PagePath, reconcileGscPageUrls, reconcileGa4Mappings, reconcileGa4OrganicMappings, listImports } = require('../server/services/analyticsService');
const { normalizeUrl } = require('../server/lib/utils');
const { scanInventory } = require('../server/services/inventoryService');
const { db } = require('../server/lib/db');

const downloads = require('../server/lib/config').config.downloadsDir;

test('GA4 복합 CSV의 기간과 기준선을 분리해 읽는다', () => {
  const file = path.join(downloads, '보고서_개요.csv');
  const buffer = fs.readFileSync(file);
  const blocks = parseGa4Blocks(buffer.toString('utf8'));
  assert.ok(blocks.length >= 5);
  const result = importBuffer(buffer, path.basename(file));
  assert.deepEqual(result.summary, {
    activeUsers: 562,
    newUsers: 558,
    avgEngagementSeconds: 39.186832740213525,
    events: 3489,
    pageRows: 96,
  });
});

test('GSC Performance ZIP 기준선과 슬래시 중복군을 계산한다', () => {
  const file = path.join(downloads, 'https___noblessegold.com_-Performance-on-Search-2026-08-05.zip');
  const buffer = fs.readFileSync(file);
  const entries = zipEntries(buffer);
  assert.ok(entries.has('검색어 수.csv'));
  assert.ok(entries.has('페이지.csv'));
  const result = importBuffer(buffer, path.basename(file));
  assert.deepEqual(result.summary, {
    clicks: 146,
    impressions: 5673,
    pageRows: 126,
    queryRows: 205,
    duplicateGroups: 54,
    duplicateImpressions: 5257,
  });
  assert.equal(normalizeUrl('https://noblessegold.com/guide/example/'), 'https://noblessegold.com/guide/example');
});

test('GSC 페이지 URL 뒤의 Search Console 동작 문구를 제거한다', () => {
  assert.equal(
    cleanGscPageUrl('https://noblessegold.com/guide/example/ 클립보드에 URL 복사 새 탭에서 열기 URL 검사'),
    'https://noblessegold.com/guide/example/',
  );
  const result = reconcileGscPageUrls();
  assert.ok(result.rows > 0);
  const polluted = db.prepare("SELECT COUNT(*) AS count FROM gsc_pages WHERE original_url LIKE '%클립보드에 URL 복사%'").get();
  assert.equal(polluted.count, 0);
});

test('GSC Coverage ZIP은 사이트 전체 상태로 읽는다', () => {
  const file = path.join(downloads, 'https___noblessegold.com_-Coverage-2026-08-05.zip');
  const result = importBuffer(fs.readFileSync(file), path.basename(file));
  assert.equal(result.summary.indexed, 98);
  assert.equal(result.summary.notIndexed, 37);
  assert.equal(result.summary.issues['리디렉션이 포함된 페이지'], 31);
  assert.equal(result.summary.issues['적절한 표준 태그가 포함된 대체 페이지'], 3);
});

test('GSC 최신 화면 감사 스냅샷에서 정상 제외와 실제 미색인을 구분한다', () => {
  const file = path.join(require('../server/lib/config').config.dataDir, 'manual-imports', 'gsc-indexing-2026-08-21.csv');
  const result = importBuffer(fs.readFileSync(file), path.basename(file));
  assert.equal(result.sourceType, 'gsc_coverage');
  assert.equal(result.summary.indexed, 119);
  assert.equal(result.summary.notIndexed, 110);
  assert.equal(result.summary.issues['리디렉션이 포함된 페이지'], 86);
  assert.equal(result.summary.issues['적절한 표준 태그가 포함된 대체 페이지'], 24);
  assert.equal(result.summary.issues['발견됨 - 현재 색인이 생성되지 않음'], 0);
  assert.equal(result.summary.issues['크롤링됨 - 현재 색인이 생성되지 않음'], 0);
});

test('GA4 제목은 저장소 pageTitle 완전 일치만 자동 연결한다', () => {
  const inventory = scanInventory();
  assert.match(inventory.scannedAt, /^\d{4}-\d{2}-\d{2}T/);
  const counts = reconcileGa4Mappings();
  assert.ok(counts.mapped > 0);
  const bad = db.prepare("SELECT COUNT(*) AS count FROM ga4_pages p JOIN guides g ON p.guide_slug=g.slug WHERE p.page_path IS NULL AND p.page_title<>g.page_title").get();
  assert.equal(bad.count, 0);
});

test('GA4 페이지 경로×기기 CSV를 canonical 가이드 경로에 연결한다', () => {
  const file = path.join(downloads, '페이지_및_화면_페이지_경로_및_화면_클래스.csv');
  const result = importBuffer(fs.readFileSync(file), path.basename(file));
  assert.equal(result.sourceType, 'ga4_path_device');
  assert.equal(result.summary.pageRows, 258);
  assert.ok(result.summary.uniquePaths > 100);
  assert.ok(result.summary.mappedRows > 0);
  assert.equal(cleanGa4PagePath('/guide/gold-one-don-gram/'), '/guide/gold-one-don-gram');
  const mapped = db.prepare("SELECT COUNT(*) AS count FROM ga4_pages WHERE import_id=? AND guide_slug IS NOT NULL").get(result.id);
  assert.ok(mapped.count > 0);
});

test('Naver 웹검색 TOP 30 리포트의 기준일과 페이지 성과를 분리해 읽는다', () => {
  const file = path.join(downloads, 'noblessegold-naver-web-performance-2026-07-26_2026-08-24.zip');
  const result = importBuffer(fs.readFileSync(file), path.basename(file));
  assert.equal(result.sourceType, 'naver_web_performance');
  assert.ok(Math.abs(result.summary.overallCtr - 0.014) < 1e-9);
  assert.equal(result.summary.queryRows, 30);
  assert.equal(result.summary.pageRows, 30);
  assert.equal(result.summary.reportUpdatedAt, '2026-08-24');
  const oneDon = db.prepare("SELECT clicks, impressions, ctr FROM naver_web_pages WHERE import_id=? AND normalized_url='https://noblessegold.com/guide/gold-one-don-gram'").get(result.id);
  assert.deepEqual(oneDon, { clicks: 56, impressions: 11318, ctr: 0.005 });
});

test('Google 자연 검색 방문 페이지와 GA4 참여를 같은 canonical 가이드에 연결한다', () => {
  const file = path.join(downloads, 'Google_자연_검색_트래픽_방문_페이지_+_쿼리_문자열.csv');
  const result = importBuffer(fs.readFileSync(file), path.basename(file));
  assert.equal(result.sourceType, 'ga4_organic_landing');
  // GA4 화면의 195개 URL 행에 경로가 없는 `(not set)` 행 1개가 함께 들어온다.
  assert.equal(result.summary.pageRows, 196);
  assert.ok(result.summary.impressions > 12000);
  assert.ok(result.summary.mappedRows > 0);
  const counts = reconcileGa4OrganicMappings();
  assert.ok(counts.mapped > 0);
  const whiteGold = db.prepare("SELECT active_users AS activeUsers, engaged_sessions AS engagedSessions FROM ga4_organic_pages WHERE import_id=? AND guide_slug='white-gold-discoloration-care'").get(result.id);
  assert.deepEqual(whiteGold, { activeUsers: 7, engagedSessions: 4 });
});

test('분석 원본의 SHA-256과 파서 버전을 가져오기 이력에 공개한다', () => {
  const rows = listImports();
  assert.ok(rows.length >= 3);
  assert.match(rows[0].fileHash, /^[a-f0-9]{64}$/);
  const performance = rows.find((row) => row.sourceType === 'gsc_performance');
  assert.equal(performance.parserVersion, PARSER_VERSION);
});
