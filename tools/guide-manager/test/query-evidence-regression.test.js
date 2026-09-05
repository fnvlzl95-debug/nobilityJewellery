const test = require('node:test');
const assert = require('node:assert/strict');
const { buildQueryEvidence } = require('../server/services/queryEvidenceService');

const performance = { id: 13, periodStart: '2026-08-07', periodEnd: '2026-09-03', summary: { sitewideEligible: true } };
const weddingContent = {
  title: '결혼반지 제작 기간, 촬영·예식 날짜 맞추는 주문 시점', keyword: '결혼반지 제작 기간',
  description: '결혼반지 제작 기간을 디자인 확정, CAD·모형, 주조, 세팅, 각인, 검수 단계로 나눕니다.',
  sections: [
    { title: '제작 기간은 주문일이 아니라 사양 확정일에서 시작합니다', paragraphs: ['주문서에 디자인 번호, 소재, 색, 폭, 호수, 보석과 마감을 기록합니다.'] },
    { title: '기성·주문 제작·맞춤 제작은 필요한 공정이 다릅니다', paragraphs: [] },
    { title: '보석 수급과 디자인 변경이 가장 큰 일정 변수입니다', paragraphs: [] },
  ],
};

test('the actual 122-impression wedding article cannot acquire a title keyword from the one-impression sitewide query 보석', () => {
  const pageMetrics = { clicks: 1, impressions: 122, ctr: 1 / 122, position: 7.7 };
  const rows = [
    { query: '보석', clicks: 0, impressions: 1, position: 1 },
    { query: '목걸이 주문 제작', clicks: 0, impressions: 1, position: 30 },
    { query: '종로 반지 주문 제작', clicks: 2, impressions: 34, position: 7.68 },
    { query: '보석 경도', clicks: 0, impressions: 16, position: 6 },
    { query: '돌반지 디자인', clicks: 0, impressions: 12, position: 9.42 },
    { query: '결혼반지 끼는 손', clicks: 0, impressions: 3, position: 2 },
  ];
  // This noun was an exact heading token, causing the old coverage score .85.
  assert.ok(weddingContent.sections.some(section => section.title.split(' ').includes(rows[0].query)));
  const result = buildQueryEvidence({ content: weddingContent, queryRows: rows, performance, pageMetrics });
  assert.deepEqual(result.queryHints, []);
  assert.deepEqual(result.sitewideQueryHints, []);
  assert.equal(result.queryEvidence.pageQueryCount, null);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
  assert.equal(result.queryEvidence.contentKeyword, '결혼반지 제작 기간');
  assert.equal(result.queryEvidence.contentKeywordSupported, true);
  assert.match(result.queryEvidence.reason, /정확히 일치하는 검증된 검색어 자료가 없/);
  assert.match(result.queryEvidence.requiredEvidence, /정확히 일치로 필터/);
  assert.match(result.queryEvidence.requiredEvidence, /다른 검색어·국가·기기 필터나 비교 기간/);
  assert.match(result.queryEvidence.requiredEvidence, /수동으로 수정안을 확정/);
  assert.equal(pageMetrics.impressions, 122);
});

test('even an exact existing keyword with large sitewide demand remains reference-only and cannot authorize title changes', () => {
  const result = buildQueryEvidence({ content: weddingContent, performance, queryRows: [
    { query: '결혼반지 제작 기간', clicks: 99, impressions: 12000, position: 3, pageAttribution: 'verified', usableForTitle: true, similarity: 1 },
  ] });
  assert.deepEqual(result.queryHints, []);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
  assert.equal(result.sitewideQueryHints.length, 1);
  const reference = result.sitewideQueryHints[0];
  assert.equal(reference.sitewideImpressions, 12000);
  assert.equal(reference.evidenceScope, 'sitewide');
  assert.equal(reference.pageAttribution, 'unverified');
  assert.equal(reference.usableForTitle, false);
  assert.equal(Object.hasOwn(reference, 'impressions'), false);
  assert.equal(Object.hasOwn(reference, 'similarity'), false);
});

test('generic, unrelated, zero, missing and tiny sitewide signals do not become useful article query evidence', () => {
  const result = buildQueryEvidence({ content: weddingContent, performance, queryRows: [
    { query: '보석', clicks: 100, impressions: 99999 },
    { query: '목걸이 주문제작', clicks: 100, impressions: 99999 },
    { query: '보석 경도', clicks: 100, impressions: 99999 },
    { query: '결혼반지 제작 기간', clicks: 0, impressions: 0 },
    { query: '결혼반지 제작 기간', clicks: null, impressions: null },
    { query: '결혼반지 제작 기간', clicks: 0, impressions: 1 },
  ] });
  assert.equal(result.sitewideQueryHints.length, 0);
  assert.equal(result.queryEvidence.excludedRows.generic, 1);
  assert.equal(result.queryEvidence.excludedRows.unrelated, 2);
  assert.equal(result.queryEvidence.excludedRows.insufficientSignal, 2);
  assert.equal(result.queryEvidence.excludedRows.invalid, 1);
});

test('spacing variations of a specific existing subject stay recognizable without summing query variants', () => {
  const result = buildQueryEvidence({ content: weddingContent, performance, queryRows: [
    { query: '결혼 반지 제작 기간', clicks: 1, impressions: 12 },
    { query: '결혼반지제작기간', clicks: 2, impressions: 15 },
    { query: '반지', clicks: 20, impressions: 100 },
  ] });
  assert.equal(result.sitewideQueryHints.length, 1);
  assert.equal(result.sitewideQueryHints[0].sitewideImpressions, 15);
  assert.equal(result.queryEvidence.excludedRows.duplicate, 1);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
});

test('a related descriptive query can be shown without promoting overlap to a probability or page attribution', () => {
  const result = buildQueryEvidence({ performance, content: {
    keyword: '화이트골드 변색', title: '화이트골드 변색 원인과 도금 관리', description: '변색 원인을 확인합니다.', sections: [],
  }, queryRows: [{ query: '화이트 골드 변색 원인', clicks: null, impressions: 40, position: 4 }] });
  assert.equal(result.sitewideQueryHints.length, 1);
  assert.equal(result.sitewideQueryHints[0].matchType, 'content_topic_overlap');
  assert.equal(result.sitewideQueryHints[0].sitewideClicks, null);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
});

test('missing scope or measurement period cannot make sitewide references look verified', () => {
  for (const meta of [null, { ...performance, summary: {} }, { ...performance, periodEnd: null }]) {
    const result = buildQueryEvidence({ content: weddingContent, performance: meta, queryRows: [{ query: '결혼반지 제작 기간', impressions: 100 }] });
    assert.equal(result.sitewideQueryHints.length, 0);
    assert.equal(result.queryEvidence.sitewideReferenceAvailable, false);
    assert.equal(result.queryEvidence.referencePeriod, null);
    assert.equal(result.queryEvidence.pageQueryAvailable, false);
  }
});

test('a configured keyword absent from the actual content is not described as a supported content focus', () => {
  const result = buildQueryEvidence({ content: { ...weddingContent, keyword: '목걸이 수리 비용' }, performance });
  assert.equal(result.queryEvidence.contentKeywordSupported, false);
  assert.match(result.queryEvidence.contentReviewNote, /원문부터 확인/);
});

const pageUrl = 'https://noblessegold.com/guide/wedding-ring-production-time';
const currentPerformance = { ...performance, summary: { ...performance.summary, property: 'https://noblessegold.com/', searchType: 'web' } };
const now = Date.parse('2026-09-06T03:00:00Z');
function bundle(queryRows = [{ query: '결혼반지 제작 기간', clicks: 2, impressions: 40, ctr: 0.05, position: 7.7 }]) {
  const scope = { property: 'https://noblessegold.com/', searchType: 'web', pageFilterType: 'equals', pageFilterUrl: pageUrl,
    periodStart: performance.periodStart, periodEnd: performance.periodEnd, complete: true, metricIntegrity: true };
  return { verified: true, pageUrl, periodStart: performance.periodStart, periodEnd: performance.periodEnd, importId: 22,
    fingerprint: 'a'.repeat(64), scope, sourceSummary: { pageQueryEligible: true, sitewideEligible: false, pageQueryScopeVersion: 1, pageQueryScope: { ...scope } }, queryRows };
}
const pageEvidence = (pageQueryBundle = bundle(), extra = {}) => buildQueryEvidence({ content: weddingContent,
  performance: currentPerformance, pageUrl, pageQueryBundle, now, ...extra });

test('verified exact-page current-period evidence exposes review candidates and source identity without declaring title mismatch or SEO effect', () => {
  const result = pageEvidence();
  assert.equal(result.queryEvidence.pageQueryAvailable, true);
  assert.equal(result.queryEvidence.scopeVerified, true);
  assert.equal(result.queryEvidence.periodMatchesCurrent, true);
  assert.equal(result.queryEvidence.periodFresh, true);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, true);
  assert.equal(result.queryEvidence.titleMismatchVerified, false);
  assert.equal(result.queryEvidence.seoEffectVerified, false);
  assert.equal(result.queryHints[0].evidenceScope, 'exact_page');
  assert.equal(result.queryHints[0].inferred, false);
  assert.equal(result.queryHints[0].ctr, 2 / 40);
  assert.equal(result.titleKeywordCandidates[0].query, '결혼반지 제작 기간');
  assert.deepEqual(result.queryEvidence.sourceIdentity, { importId: 22, fingerprint: 'a'.repeat(64), pageUrl,
    periodStart: performance.periodStart, periodEnd: performance.periodEnd });
  assert.match(result.queryEvidence.titleReviewPolicy.note, /통계적 유의성 판정이 아닙니다/);
});

test('one-impression generic and unrelated actual page queries remain rows but never become title review candidates', () => {
  const result = pageEvidence(bundle([
    { query: '보석', clicks: 0, impressions: 1, position: 1 },
    { query: '목걸이 수리 비용', clicks: 9, impressions: 1000, position: 3 },
    { query: '결혼반지 제작 기간', clicks: 0, impressions: 19, position: 8 },
  ]));
  assert.equal(result.queryEvidence.pageQueryCount, 3);
  assert.equal(result.queryHints.length, 3);
  assert.equal(result.queryHints.find(row => row.query === '보석').impressions, 1);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
  assert.deepEqual(result.titleKeywordCandidates, []);
});

test('the real 122-impression page with an empty query table records zero visible rows rather than zero demand', () => {
  const source = bundle([]);
  Object.assign(source.scope, { pageClicks: 1, pageImpressions: 122 });
  Object.assign(source.sourceSummary.pageQueryScope, source.scope);
  const result = pageEvidence(source, { pageMetrics: { clicks: 1, impressions: 122 } });
  assert.equal(result.queryEvidence.pageQueryAvailable, true);
  assert.equal(result.queryEvidence.pageQueryCount, 0);
  assert.equal(result.queryEvidence.missingQueryCount, null);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
  assert.deepEqual(result.queryEvidence.observedQueryTotals, { clicks: 0, impressions: 0 });
  assert.deepEqual(result.queryEvidence.pageTotals, { clicks: 1, impressions: 122 });
  assert.equal(result.queryEvidence.queryTotalsArePageTotals, false);
  assert.match(result.queryEvidence.reason, /표시행은 0개/);
  assert.match(result.queryEvidence.reason, /검색 수요가 0이라는 뜻이 아니/);
  assert.match(result.queryEvidence.limitations.join(' '), /익명 검색어/);
});

test('exact page, source identity, matching declared scope and original metadata are all required', () => {
  const mutations = [
    value => { value.verified = false; }, value => { value.importId = null; }, value => { value.fingerprint = ''; },
    value => { value.pageUrl += '/'; }, value => { value.pageUrl = value.pageUrl.replace('/guide/', '/Guide/'); },
    value => { value.scope.pageFilterType = 'contains'; }, value => { value.scope.pageFilterUrl += '?source=other'; },
    value => { value.scope.searchType = 'image'; }, value => { value.scope.property = 'https://another-site.com/'; },
    value => { value.scope.complete = false; }, value => { value.scope.metricIntegrity = false; },
    value => { value.sourceSummary.sitewideEligible = true; }, value => { value.sourceSummary.pageQueryScopeVersion = 0; },
    value => { value.sourceSummary.pageQueryEligible = false; }, value => { value.sourceSummary.pageQueryScope.pageFilterType = 'includingRegex'; },
  ];
  for (const mutate of mutations) {
    const value = bundle(); mutate(value);
    const result = pageEvidence(value);
    assert.equal(result.queryEvidence.scopeVerified, false);
    assert.equal(result.queryEvidence.pageQueryAvailable, false);
    assert.equal(result.queryEvidence.pageQueryCount, null);
    assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
    assert.deepEqual(result.queryHints, []);
  }
});

test('a different property, period, or unavailable current GSC report cannot join page evidence into the current diagnosis', () => {
  for (const changed of [
    { ...currentPerformance, periodStart: '2026-08-08' },
    { ...currentPerformance, periodEnd: '2026-09-04' },
    { ...currentPerformance, summary: { ...currentPerformance.summary, searchType: 'image' } },
    { ...currentPerformance, summary: { sitewideEligible: false, property: currentPerformance.summary.property } },
    { ...currentPerformance, summary: { sitewideEligible: true, property: 'sc-domain:noblessegold.com' } },
    null,
  ]) {
    const result = pageEvidence(bundle(), { performance: changed });
    assert.equal(result.queryEvidence.pageQueryAvailable, false);
    assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
    assert.deepEqual(result.queryHints, []);
  }
});

test('historical exact-period rows stay available but cannot authorize current title candidates', () => {
  const result = pageEvidence(bundle(), { now: '2026-10-06T00:00:00Z' });
  assert.equal(result.queryEvidence.scopeVerified, true);
  assert.equal(result.queryEvidence.periodMatchesCurrent, true);
  assert.equal(result.queryEvidence.pageQueryAvailable, true);
  assert.equal(result.queryEvidence.periodFresh, false);
  assert.equal(result.queryHints.length, 1);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
  assert.equal(result.queryHints[0].reviewExclusion, 'stale_period');
});

test('page rows preserve reported spelling variants and their metrics without aggregating them', () => {
  const result = pageEvidence(bundle([
    { query: '결혼 반지 제작 기간', clicks: 3, impressions: 9, ctr: 0.99 },
    { query: '결혼반지제작기간', clicks: 0, impressions: 20 },
  ]));
  assert.equal(result.queryHints.length, 2);
  assert.equal(result.titleKeywordCandidates.length, 2);
  assert.equal(result.queryHints.find(row => row.clicks === 3).ctr, 1 / 3);
  assert.deepEqual(result.queryEvidence.observedQueryTotals, { clicks: 3, impressions: 29 });
});

test('duplicate, missing and impossible metric rows cannot authorize title changes or create trustworthy totals', () => {
  for (const invalid of [
    { query: '결혼반지 제작 기간', clicks: 2, impressions: 40 },
    { query: '결혼반지 제작 기간 얼마', clicks: null, impressions: 40 },
    { query: '결혼반지 제작 기간 얼마', clicks: 9, impressions: 2 },
    { query: '결혼반지 제작 기간 얼마', clicks: 1, impressions: 2.2 },
  ]) {
    const value = bundle(); value.queryRows.push(invalid);
    const result = pageEvidence(value);
    assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
    assert.equal(result.queryEvidence.observedQueryTotals, null);
    assert.equal(result.titleKeywordCandidates.length, 0);
  }
});

test('sitewide demand remains separate from page rows and cannot rescue an insufficient actual page signal', () => {
  const result = pageEvidence(bundle([{ query: '결혼반지 제작 기간', clicks: 0, impressions: 1 }]), {
    queryRows: [{ query: '결혼반지 제작 기간', clicks: 99, impressions: 12000 }],
  });
  assert.equal(result.queryHints[0].impressions, 1);
  assert.equal(result.sitewideQueryHints[0].sitewideImpressions, 12000);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
});

test('display limits do not remove source counts or title evidence beyond the visible rows', () => {
  const result = pageEvidence(bundle([
    { query: '목걸이 수리', clicks: 10, impressions: 100 },
    { query: '결혼반지 제작 기간', clicks: 2, impressions: 40 },
  ]), { limit: 1 });
  assert.equal(result.queryHints.length, 1);
  assert.equal(result.queryEvidence.pageQueryCount, 2);
  assert.equal(result.queryEvidence.displayedPageQueryCount, 1);
  assert.equal(result.titleKeywordCandidates[0].query, '결혼반지 제작 기간');
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, true);
});

test('an exact configured keyword absent from actual content cannot become a page-based title candidate', () => {
  const result = pageEvidence(bundle([{ query: '목걸이 수리 비용', clicks: 10, impressions: 1000 }]), {
    content: { ...weddingContent, keyword: '목걸이 수리 비용' },
  });
  assert.equal(result.queryEvidence.pageQueryAvailable, true);
  assert.equal(result.queryHints.length, 1);
  assert.equal(result.queryHints[0].reviewExclusion, 'unsupported_content_keyword');
  assert.equal(result.queryEvidence.contentKeywordSupported, false);
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, false);
});

test('actual necklace queries can match the existing title despite a narrower gold-necklace configured keyword', () => {
  const result = pageEvidence(bundle([
    { query: '목걸이 길이', clicks: 0, impressions: 149 },
    { query: '남자 목걸이 길이', clicks: 2, impressions: 143 },
    { query: '목걸이 수리 비용', clicks: 10, impressions: 200 },
  ]), { content: { title: '남자·여자 목걸이 길이 추천: 42·45·50cm 비교', keyword: '금목걸이 길이 추천',
    description: '목둘레와 길이별 착용 위치를 확인합니다.', sections: [] } });
  assert.deepEqual(result.titleKeywordCandidates.map(row => row.query), ['목걸이 길이', '남자 목걸이 길이']);
  assert.equal(result.titleKeywordCandidates[0].matchType, 'actual_title_overlap');
  assert.equal(result.queryEvidence.canRecommendTitleKeywords, true);
  assert.equal(result.queryEvidence.titleMismatchVerified, false);
  assert.equal(result.queryEvidence.seoEffectVerified, false);
});

test('the exact 1389-impression necklace report is not replaced by the 1433-impression normalized URL total', () => {
  const source = bundle([
    { query: '목걸이 길이', clicks: 0, impressions: 149 },
    { query: '남자 목걸이 길이', clicks: 2, impressions: 143 },
  ]);
  Object.assign(source.scope, { pageClicks: 24, pageImpressions: 1389 });
  Object.assign(source.sourceSummary.pageQueryScope, source.scope);
  const normalizedMetrics = { clicks: 25, impressions: 1433, variants: 2 };
  const result = pageEvidence(source, { pageMetrics: normalizedMetrics });
  assert.deepEqual(result.queryEvidence.pageTotals, { clicks: 24, impressions: 1389 });
  assert.equal(result.queryEvidence.pageTotalsScope, 'exact_page_report');
  assert.deepEqual(result.queryEvidence.observedQueryTotals, { clicks: 2, impressions: 292 });
  assert.equal(normalizedMetrics.impressions, 1433);
  assert.equal(result.queryEvidence.queryTotalsArePageTotals, false);

  source.scope.pageClicks = null;
  source.scope.pageImpressions = null;
  Object.assign(source.sourceSummary.pageQueryScope, source.scope);
  assert.deepEqual(pageEvidence(source, { pageMetrics: normalizedMetrics }).queryEvidence.pageTotals, { clicks: null, impressions: null });
  assert.equal(pageEvidence(null, { pageMetrics: normalizedMetrics }).queryEvidence.pageTotals, null);
});
