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
// These are conservative application review thresholds, not Google ranking rules
// or a test of statistical significance.
const TITLE_REVIEW_POLICY = { minImpressions: 20, minClicks: 3, maxAgeDays: 7 };
const GSC_LIMITATIONS = [
  '검색어 표는 익명 검색어와 내보내기 행 제한 때문에 전체 검색어를 포함하지 않을 수 있습니다. 누락된 검색어를 노출 0회로 해석하지 않습니다.',
  '검색어 행 합계와 페이지 합계는 집계·필터·익명화 때문에 다를 수 있습니다. 서로 대체하거나 합계 비율로 누락 검색어를 추정하지 않습니다.',
  'GSC 날짜는 태평양 시간(PT) 기준입니다. 표시된 기간을 그대로 비교하며 GA4 날짜·사용자 수와 합산하지 않습니다.',
  '실제 검색어와 적은 표본은 검토 자료입니다. 제목 불일치, 변경 필요성, 순위·클릭 개선 효과 또는 통계적 유의성을 증명하지 않습니다.',
];

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
const contentBody = content => [content.title, content.description, content.lead,
  ...(content.sections || []).flatMap(section => [section.title, ...(section.paragraphs || [])])].filter(Boolean).join(' ');
const supportedKeyword = content => compact(content.keyword).length >= 4 && compact(contentBody(content)).includes(compact(content.keyword));

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

function relatedPageQuery(query, content) {
  const queryTerms = terms(query);
  if (queryTerms.length < 3 && !queryTerms.some(word => !GENERIC_TERMS.has(word))) return { excluded: 'generic' };
  const relation = relatedReference(query, content);
  if (!relation.excluded) return relation;
  // A verified page query may match the actual title even when a configured
  // keyword is narrower (e.g. 금목걸이 길이 vs 남자 목걸이 길이). This proves
  // topic relevance only; it does not prove that the existing title is wrong.
  const titleTerms = new Set(terms(content.title));
  const matchedTerms = queryTerms.filter(word => titleTerms.has(word));
  return queryTerms.length >= 2 && matchedTerms.length >= 2 && matchedTerms.length / queryTerms.length >= 0.75
    ? { matchType: 'actual_title_overlap', matchedTerms } : relation;
}

function exactPageUrl(value) {
  if (typeof value !== 'string' || value.trim() !== value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'noblessegold.com' && !url.port
      && !url.username && !url.password && !url.hash && url.href === value;
  } catch (_) { return false; }
}

function sameProperty(left, right) {
  const allowed = ['https://noblessegold.com', 'https://noblessegold.com/', 'sc-domain:noblessegold.com'];
  return allowed.includes(left) && allowed.includes(right) && left.replace(/\/$/, '') === right.replace(/\/$/, '');
}

function verifiedPageEvidence({ pageQueryBundle, pageUrl, performance, content, now, limit }) {
  const bundle = pageQueryBundle;
  const scope = bundle?.scope;
  const validPeriod = validDate(bundle?.periodStart) && validDate(bundle?.periodEnd) && bundle.periodStart <= bundle.periodEnd;
  const identityVerified = Number.isSafeInteger(bundle?.importId) && bundle.importId > 0 && /^[a-f0-9]{64}$/i.test(bundle?.fingerprint || '');
  const matchingScope = value => value?.searchType === 'web' && value.pageFilterType === 'equals'
    && value.pageFilterUrl === pageUrl && value.periodStart === bundle?.periodStart && value.periodEnd === bundle?.periodEnd
    && value.complete === true && value.metricIntegrity === true && sameProperty(value.property, performance?.summary?.property);
  const scopeVerified = bundle?.verified === true && identityVerified && exactPageUrl(pageUrl) && bundle.pageUrl === pageUrl
    && validPeriod && matchingScope(scope) && bundle.sourceSummary?.pageQueryEligible === true
    && bundle.sourceSummary.sitewideEligible === false && bundle.sourceSummary.pageQueryScopeVersion === 1
    && matchingScope(bundle.sourceSummary?.pageQueryScope) && Array.isArray(bundle.queryRows);
  const periodMatchesCurrent = validPeriod && performance?.summary?.sitewideEligible === true
    && performance.summary.searchType === 'web'
    && bundle.periodStart === performance.periodStart && bundle.periodEnd === performance.periodEnd;
  const timestamp = now instanceof Date ? now.getTime() : typeof now === 'string' ? Date.parse(now) : Number(now);
  const ageDays = validPeriod && Number.isFinite(timestamp) ? Math.floor((timestamp - Date.parse(`${bundle.periodEnd}T00:00:00Z`)) / 86400000) : null;
  const periodFresh = ageDays != null && ageDays >= 0 && ageDays <= TITLE_REVIEW_POLICY.maxAgeDays;
  const pageQueryAvailable = scopeVerified && periodMatchesCurrent;
  const rows = [];
  const seen = new Set();
  let invalidRows = 0, duplicateRows = 0;
  if (pageQueryAvailable) for (const row of bundle.queryRows) {
    const query = typeof row?.query === 'string' ? row.query.trim() : '';
    const clicks = metric(row?.clicks), impressions = metric(row?.impressions);
    if (!query || !Number.isSafeInteger(clicks) || !Number.isSafeInteger(impressions) || clicks > impressions) { invalidRows++; continue; }
    // Preserve different reported spellings; normalized variants are different GSC
    // rows. Exact duplicate rows are never summed or promoted to demand evidence.
    if (seen.has(query)) { duplicateRows++; continue; }
    seen.add(query);
    const relation = relatedPageQuery(query, content);
    const sufficientSignal = impressions >= TITLE_REVIEW_POLICY.minImpressions || clicks >= TITLE_REVIEW_POLICY.minClicks;
    // Configuration alone cannot establish what the actual article discusses.
    const unsupportedConfiguredKeyword = relation.matchType === 'existing_keyword' && !supportedKeyword(content);
    const contentRelated = !relation.excluded && !unsupportedConfiguredKeyword;
    rows.push({ query, clicks, impressions, ctr: impressions ? clicks / impressions : 0,
      position: impressions && metric(row.position) > 0 ? metric(row.position) : null,
      evidenceScope: 'exact_page', pageAttribution: 'verified', inferred: false,
      contentRelated, sufficientSignal, matchType: relation.matchType || null, matchedTerms: relation.matchedTerms || [],
      reviewExclusion: relation.excluded || (unsupportedConfiguredKeyword ? 'unsupported_content_keyword' : !sufficientSignal ? 'insufficient_signal' : !periodFresh ? 'stale_period' : null),
      usableForTitle: contentRelated && sufficientSignal && periodFresh,
    });
  }
  if (invalidRows || duplicateRows) for (const row of rows) { row.usableForTitle = false; row.reviewExclusion ||= 'invalid_source_rows'; }
  rows.sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks || a.query.localeCompare(b.query));
  const allCandidates = rows.filter(row => row.usableForTitle);
  const titleKeywordCandidates = allCandidates.slice(0, 20);
  const canRecommendTitleKeywords = pageQueryAvailable && periodFresh && titleKeywordCandidates.length > 0;
  const reason = !bundle ? '현재 페이지와 현재 측정 기간이 정확히 일치하는 검증된 검색어 자료가 없습니다.'
    : !scopeVerified ? '페이지 URL·정확히 일치 필터·원본 식별자·수집 범위가 검증되지 않아 페이지 검색어로 연결하지 않습니다.'
      : !periodMatchesCurrent ? '페이지 검색어 자료와 현재 진단의 GSC 측정 기간이 달라 연결하지 않습니다.'
        : invalidRows || duplicateRows ? '자료의 누락·중복 수치가 확인되어 제목 검토 후보를 보류합니다.'
          : !rows.length ? '정확한 페이지 보고서를 확인했지만 검색어 표시행은 0개입니다. 익명화·보고서 누락 가능성이 있어 검색 수요가 0이라는 뜻이 아니며 제목 후보를 만들지 않습니다.'
            : !periodFresh ? '해당 기간의 실제 페이지 검색어입니다. 측정 종료 후 7일을 넘긴 자료 또는 미래 기간은 현재 제목 검토 후보로 사용하지 않습니다.'
            : !titleKeywordCandidates.length ? '해당 페이지의 실제 검색어를 확인했습니다. 구체적인 관련성·검토 최소 표본을 만족하는 제목 후보는 없습니다.'
              : '현재 기간의 정확한 페이지 검색어 중 내용과 관련된 검토 후보가 있습니다. 제목과 본문의 실제 불일치는 사람이 별도로 확인해야 합니다.';
  return {
    queryHints: rows.slice(0, limit), titleKeywordCandidates,
    metadata: {
      scope: pageQueryAvailable ? 'exact_page_queries' : 'sitewide_reference_only',
      scopeVerified: !!scopeVerified, identityVerified, periodMatchesCurrent: !!periodMatchesCurrent, periodFresh,
      pageQueryAvailable: !!pageQueryAvailable, pageQueryCount: pageQueryAvailable ? rows.length : null,
      pageQueryCountMeaning: '검증된 보고서의 유효 검색어 표시행 수이며 전체 검색 수요가 아닙니다.',
      displayedPageQueryCount: Math.min(rows.length, limit), canRecommendTitleKeywords,
      titleMismatchVerified: false, seoEffectVerified: false,
      importId: identityVerified ? bundle.importId : null, fingerprint: identityVerified ? bundle.fingerprint : null,
      pageUrl: scopeVerified ? bundle.pageUrl : null,
      periodStart: validPeriod ? bundle.periodStart : null, periodEnd: validPeriod ? bundle.periodEnd : null,
      sourceIdentity: scopeVerified ? { importId: bundle.importId, fingerprint: bundle.fingerprint, pageUrl: bundle.pageUrl, periodStart: bundle.periodStart, periodEnd: bundle.periodEnd } : null,
      ageDays, relevantCandidateCount: allCandidates.length, invalidRows, duplicateRows,
      observedQueryTotals: pageQueryAvailable && !invalidRows && !duplicateRows
        ? { clicks: rows.reduce((sum, row) => sum + row.clicks, 0), impressions: rows.reduce((sum, row) => sum + row.impressions, 0) } : null,
      // The sitewide diagnosis can merge normalized URL variants. Those totals
      // cannot replace the exact URL report's denominator or missing metrics.
      pageTotals: scopeVerified ? { clicks: metric(scope.pageClicks), impressions: metric(scope.pageImpressions) } : null,
      pageTotalsScope: scopeVerified ? 'exact_page_report' : null,
      queryTotalsArePageTotals: false, missingQueryCount: null,
      titleReviewPolicy: { ...TITLE_REVIEW_POLICY, note: '앱의 검토 후보 선별 기준이며 Google 기준이나 통계적 유의성 판정이 아닙니다.' },
      limitations: [...GSC_LIMITATIONS], reason,
      requiredEvidence: '현재 GSC 진단과 같은 기간·속성·웹검색에서 해당 URL만 정확히 일치로 필터한 검색어 CSV ZIP을 가져오세요. 다른 검색어·국가·기기 필터나 비교 기간이 섞인 자료는 자동 연결하지 않습니다. 검증된 자료도 실제 제목·본문과 대조한 뒤 수동으로 수정안을 확정해야 합니다.',
    },
  };
}

function buildQueryEvidence({ content = {}, queryRows = [], performance = null, limit = 8, pageUrl = null, pageQueryBundle = null, now = Date.now() } = {}) {
  limit = Math.max(0, Math.min(20, Number.isFinite(Number(limit)) ? Math.floor(Number(limit)) : 8));
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
  const contentKeyword = String(content.keyword || '').trim();
  const contentKeywordSupported = supportedKeyword(content);
  const sitewideQueryHints = [...references.values()].sort((a, b) => b.sitewideImpressions - a.sitewideImpressions || a.query.localeCompare(b.query))
    .slice(0, limit);
  const pageEvidence = verifiedPageEvidence({ pageQueryBundle, pageUrl, performance, content, now, limit });
  return {
    queryHints: pageEvidence.queryHints,
    titleKeywordCandidates: pageEvidence.titleKeywordCandidates,
    sitewideQueryHints,
    queryEvidence: {
      ...pageEvidence.metadata, contentKeyword, contentKeywordSupported,
      referencePeriod: verifiedSitewide ? { periodStart: performance.periodStart, periodEnd: performance.periodEnd } : null,
      sitewideReferenceAvailable: verifiedSitewide, referenceRows: sitewideQueryHints.length, excludedRows,
      contentReviewNote: contentKeywordSupported
        ? '기존 대표 검색어와 원문에 근거한 내용·출처 검토는 가능하지만 검색어 성과가 확인된 제목 수정으로 표시하지 않습니다.'
        : '대표 검색어가 실제 글의 주제와 일치하는지 원문부터 확인해야 합니다.',
    },
  };
}

module.exports = { buildQueryEvidence };
