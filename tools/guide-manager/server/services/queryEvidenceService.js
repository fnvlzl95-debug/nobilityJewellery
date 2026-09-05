// Sitewide query rows and page rows are different GSC dimensions, not joined
// evidence. See https://support.google.com/webmasters/answer/7576553?hl=en
// Titles must describe the page: https://developers.google.com/search/docs/appearance/title-link
// This module deliberately has no database or provider dependencies.
const GENERIC_TERMS = new Set([
  '보석', '귀금속', '주얼리', '쥬얼리', '금', '은', '반지', '목걸이', '팔찌', '귀걸이',
  '가격', '비용', '기간', '제작', '주문제작', '수리', '관리', '방법', '추천', 'jewelry',
]);
const FILLER_TERMS = new Set(['종로', '서울', '가이드', '정리', '총정리', '추천', '방법', '기준', '확인']);
const MIN_REFERENCE_IMPRESSIONS = 5;

function normalized(value) {
  return String(value || '').normalize('NFKC').toLowerCase()
    .replace(/결혼\s*반지/g, '결혼반지')
    .replace(/화이트\s*골드/g, '화이트골드')
    .replace(/랩\s*그로운/g, '랩그로운')
    .replace(/다이아몬드/g, '다이아')
    .replace(/주문\s*제작|맞춤\s*제작/g, '주문제작')
    .replace(/[^a-z0-9가-힣]+/g, ' ').replace(/\s+/g, ' ').trim();
}
const compact = value => normalized(value).replace(/\s/g, '');
const terms = value => [...new Set(normalized(value).split(' ').filter(word => word.length > 1 && !FILLER_TERMS.has(word)))];
const metric = value => value == null || String(value).trim() === '' || !Number.isFinite(Number(value)) || Number(value) < 0 ? null : Number(value);
const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function relatedReference(query, content) {
  const queryText = compact(query);
  const keyword = compact(content.keyword);
  const queryTerms = terms(query);
  if (!queryText || GENERIC_TERMS.has(queryText)) return { excluded: 'generic' };
  // A compound query written without spaces can still be the exact existing
  // subject. A lone general noun occurring in a paragraph is never sufficient.
  if (queryText === keyword && keyword.length >= 6) return { matchType: 'existing_keyword', matchedTerms: terms(content.keyword) };
  if (queryTerms.length < 2) return { excluded: 'generic' };
  const focusTerms = terms(content.keyword);
  const focusMatches = queryTerms.filter(word => focusTerms.includes(word));
  if (focusTerms.length < 2 || focusMatches.length < 2) return { excluded: 'unrelated' };
  const headingText = [content.title, content.description, ...(content.sections || []).map(section => section.title)].filter(Boolean).join(' ');
  const headingTerms = new Set(terms(headingText));
  const matchedTerms = queryTerms.filter(word => headingTerms.has(word));
  if (matchedTerms.length / queryTerms.length < 0.75 && !compact(headingText).includes(queryText)) return { excluded: 'unrelated' };
  return { matchType: 'content_topic_overlap', matchedTerms };
}

function buildQueryEvidence({ content = {}, queryRows = [], performance = null, limit = 8 } = {}) {
  const hasPeriod = validDate(performance?.periodStart) && validDate(performance?.periodEnd) && performance.periodStart <= performance.periodEnd;
  const verifiedSitewide = hasPeriod && performance?.summary?.sitewideEligible === true;
  const excludedRows = { generic: 0, unrelated: 0, insufficientSignal: 0, invalid: 0, unverifiedSource: 0, duplicate: 0 };
  const references = new Map();
  for (const row of queryRows) {
    if (!verifiedSitewide) { excludedRows.unverifiedSource++; continue; }
    const query = String(row.query || '').trim();
    const impressions = metric(row.impressions), clicks = metric(row.clicks);
    if (!query || impressions == null || !Number.isInteger(impressions) || (clicks != null && !Number.isInteger(clicks))) { excludedRows.invalid++; continue; }
    const relevance = relatedReference(query, content);
    if (relevance.excluded) { excludedRows[relevance.excluded]++; continue; }
    if (impressions < MIN_REFERENCE_IMPRESSIONS && !(clicks > 0)) { excludedRows.insufficientSignal++; continue; }
    const item = {
      query, sitewideClicks: clicks, sitewideImpressions: impressions, sitewidePosition: metric(row.position),
      matchType: relevance.matchType, matchedTerms: relevance.matchedTerms,
      evidenceScope: 'sitewide', pageAttribution: 'unverified', usableForTitle: false,
    };
    const key = compact(query);
    if (references.has(key)) {
      excludedRows.duplicate++;
      if (references.get(key).sitewideImpressions >= impressions) continue;
    }
    references.set(key, item);
  }
  const bodyText = [content.title, content.description, content.lead,
    ...(content.sections || []).flatMap(section => [section.title, ...(section.paragraphs || [])])].filter(Boolean).join(' ');
  const contentKeyword = String(content.keyword || '').trim();
  const contentKeywordSupported = compact(contentKeyword).length >= 4 && compact(bodyText).includes(compact(contentKeyword));
  const sitewideQueryHints = [...references.values()].sort((a, b) => b.sitewideImpressions - a.sitewideImpressions || a.query.localeCompare(b.query))
    .slice(0, Math.max(0, Math.min(20, Number.isFinite(Number(limit)) ? Math.floor(Number(limit)) : 8)));
  return {
    // None of the current imports contains a verified page × query relation.
    // An empty list means unavailable evidence, not zero search demand.
    queryHints: [],
    sitewideQueryHints,
    queryEvidence: {
      scope: 'sitewide_reference_only', pageQueryAvailable: false, pageQueryCount: null,
      canRecommendTitleKeywords: false, contentKeyword, contentKeywordSupported,
      referencePeriod: verifiedSitewide ? { periodStart: performance.periodStart, periodEnd: performance.periodEnd } : null,
      sitewideReferenceAvailable: verifiedSitewide, referenceRows: sitewideQueryHints.length, excludedRows,
      reason: '현재 진단에 사용하는 GSC 검색어 표는 사이트 전체 자료이며 이 페이지와 검색어의 연결은 확인되지 않았습니다. 현재 앱은 페이지로 필터한 자료의 자동 연결도 지원하지 않으므로, 이 글의 상위 검색어·검색어별 성과 또는 자동 제목 변경 근거로 사용할 수 없습니다.',
      requiredEvidence: 'Search Console에서 해당 URL을 정확히 필터하고 검색어와 측정 기간을 사람이 확인하세요. 현재 앱에 자료를 올려도 페이지별 검색어로 자동 연결되지는 않습니다. 확인한 내용은 기존 수동 수정 경로에서 원문과 대조해 검토할 수 있습니다.',
      contentReviewNote: contentKeywordSupported
        ? '기존 대표 검색어와 원문에 근거한 내용·출처 검토는 가능하지만 검색어 성과가 확인된 제목 수정으로 표시하지 않습니다.'
        : '대표 검색어가 실제 글의 주제와 일치하는지 원문부터 확인해야 합니다.',
    },
  };
}

module.exports = { buildQueryEvidence };
