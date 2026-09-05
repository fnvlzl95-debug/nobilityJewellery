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
  assert.match(result.queryEvidence.reason, /페이지로 필터한 자료의 자동 연결도 지원하지 않/);
  assert.match(result.queryEvidence.requiredEvidence, /사람이 확인/);
  assert.match(result.queryEvidence.requiredEvidence, /올려도 페이지별 검색어로 자동 연결되지는 않/);
  assert.match(result.queryEvidence.requiredEvidence, /기존 수동 수정 경로/);
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
