// Exact page filters are case-sensitive in GSC. Keep paths, escapes, queries and
// trailing slashes intact; a normalized inventory URL is not evidence of equality.
function canonicalPageUrl(value) {
  const raw = String(value || '').trim();
  if (!/^https:\/\/noblessegold\.com\//.test(raw) || /\s/.test(raw)) return null;
  try {
    const url = new URL(raw);
    return url.username || url.password || url.hash || url.href !== raw ? null : raw;
  } catch (_) { return null; }
}

function propertyKey(value) {
  const raw = String(value || '').trim();
  return ['https://noblessegold.com', 'https://noblessegold.com/'].includes(raw) ? 'https://noblessegold.com/'
    : raw === 'sc-domain:noblessegold.com' ? raw : null;
}

function validPeriod(start, end) {
  const valid = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  return valid(start) && valid(end) && start <= end;
}

function metricIntegrity(rows) {
  return rows.every(row => {
    if (!Number.isSafeInteger(row.clicks) || !Number.isSafeInteger(row.impressions) || row.clicks < 0 || row.impressions < row.clicks) return false;
    if (row.impressions === 0) return row.clicks === 0 && (row.ctr == null || row.ctr === 0) && (row.position == null || row.position === 0);
    if (!Number.isFinite(row.ctr) || row.ctr < 0 || row.ctr > 1 || !Number.isFinite(row.position) || row.position < 1) return false;
    // GSC CSV percentages can be rounded to whole percent. Import-time rows carry
    // their exact displayed precision; retained SQL values use the safe upper bound.
    return Math.abs(row.ctr - row.clicks / row.impressions) <= (row.ctrTolerance ?? 0.005000001);
  });
}

const pageLabel = value => /^(페이지|page)$/i.test(String(value || '').trim());
const baseLabel = value => /^(날짜|Date|검색 유형|Search type|속성|Property)$/i.test(String(value || '').trim());

function filterPage(row) {
  if (!pageLabel(row?.dimension || row?.filter)) return null;
  const value = String(row.expression ?? row.value ?? '').trim();
  const exact = value.match(/^(?:equals|exact(?:ly)?(?:\s+matches?)?|정확히\s*일치|정확한\s*URL|URL\s*일치)\s*[:=]\s*(https:\/\/\S+)$/i);
  return { url: canonicalPageUrl(exact?.[1] || value), operator: String(row.operator || (exact ? 'equals' : '')).toLowerCase() || null };
}

function inspectPageQueryScope({ manifest, filters, declaredFilters, property, searchType, collectionMethod, completeness, periodStart, periodEnd, periodDays, tables }) {
  const reasons = [];
  const add = reason => { if (!reasons.includes(reason)) reasons.push(reason); };
  const pageFilters = filters.filter(row => pageLabel(row.filter));
  const csvPage = pageFilters.length === 1 ? filterPage(pageFilters[0]) : null;
  const operator = String(manifest.page_filter_operator || csvPage?.operator || '').toLowerCase();
  const pageUrl = canonicalPageUrl(manifest.page_filter_url || csvPage?.url);
  if (!propertyKey(property)) add('대상 사이트 속성 확인 필요');
  if (searchType !== 'web') add('웹검색 자료가 아님');
  if (!['official-export', 'google-sheets-export', 'dom-table'].includes(collectionMethod)) add('수집 방식 확인 필요');
  if (operator !== 'equals' || !pageUrl) add('정확히 일치하는 단일 페이지 URL과 필터 연산자 확인 필요');
  if (pageFilters.length !== 1 || !csvPage?.url || csvPage.url !== pageUrl || (csvPage.operator && csvPage.operator !== operator)) add('페이지 필터와 manifest URL·연산자가 일치하지 않음');
  if (filters.some(row => !baseLabel(row.filter) && !pageLabel(row.filter))) add('페이지 외 추가 필터가 있음');
  for (const pattern of [/^(날짜|Date)$/i, /^(검색 유형|Search type)$/i, /^(속성|Property)$/i]) {
    if (filters.filter(row => pattern.test(row.filter)).length > 1) add('중복 기본 필터 또는 비교 범위가 있음');
  }
  const date = filters.find(row => /^(날짜|Date)$/i.test(row.filter));
  if (!date || /비교|compare|versus|\bvs\b/i.test(date.value) || (String(date.value).match(/\d{4}[.\-/]\s*\d{1,2}[.\-/]\s*\d{1,2}/g) || []).length > 2) add('단일 측정 기간 필터 확인 필요');
  if (!filters.some(row => /^(검색 유형|Search type)$/i.test(row.filter))) add('웹검색 필터 확인 필요');
  if (declaredFilters != null) {
    if (declaredFilters.length !== 1) add('manifest에는 정확한 페이지 필터 하나만 있어야 함');
    for (const row of declaredFilters) {
      const declared = filterPage(row);
      if (!declared || declared.url !== pageUrl || (declared.operator && declared.operator !== operator)) add('manifest 활성 필터가 페이지 URL·연산자와 다르거나 추가 필터를 포함함');
    }
  } else if (collectionMethod !== 'official-export') add('재구성 자료의 전체 활성 필터 확인 필요');
  if (!validPeriod(periodStart, periodEnd) || !periodDays) add('측정 기간 확인 필요');
  // A count declaration is required even for a reconstructed official export:
  // it distinguishes all available rows from a first screen or partial selection.
  const complete = ['daily', 'queries', 'pages'].every(dimension => completeness[dimension]?.complete
    && manifest[`${dimension}_complete`] === 'true'
    && Number(manifest[`${dimension}_total_rows`]) === tables[dimension].length);
  if (!complete) add('일별·검색어·페이지 표 전체 행 수 확인 필요');
  if (tables.daily.length !== periodDays) add('측정 기간의 일별 행 누락');
  const page = tables.pages.length === 1 ? tables.pages[0] : null;
  if (!page || page.dimension !== pageUrl) add('페이지 표가 정확한 URL 한 행과 일치하지 않음');
  let integrity = Object.values(tables).every(metricIntegrity);
  const total = (rows, key) => rows.reduce((sum, row) => sum + (row[key] ?? NaN), 0);
  if (page && ['clicks', 'impressions'].some(key => total(tables.daily, key) !== page[key]
    || total(tables.queries, key) > page[key] || total(tables.devices, key) > page[key])) integrity = false;
  if (!integrity) add('클릭·노출·CTR·순위 또는 차원별 합계 무결성 확인 필요');
  return {
    pageQueryEligible: reasons.length === 0,
    pageQueryScopeVersion: 1,
    pageQueryReasons: reasons,
    pageQueryScope: {
      property, searchType, pageFilterType: operator || null, pageFilterUrl: pageUrl,
      periodStart, periodEnd, complete, metricIntegrity: integrity,
      pageClicks: page?.clicks ?? null, pageImpressions: page?.impressions ?? null,
      queryRows: tables.queries.length,
      filterEvidence: manifest.page_filter_operator ? 'manifest-and-export-filters' : 'export-filter-operator',
    },
  };
}

function eligibleSummary(summary, performance) {
  const scope = summary?.pageQueryScope;
  return !!(summary?.pageQueryEligible === true && summary.sitewideEligible === false && summary.pageQueryScopeVersion === 1
    && scope?.pageFilterType === 'equals' && canonicalPageUrl(scope.pageFilterUrl)
    && scope.complete === true && scope.metricIntegrity === true && scope.searchType === 'web'
    && validPeriod(scope.periodStart, scope.periodEnd)
    && performance?.summary?.sitewideEligible === true && performance.summary.searchType === 'web'
    && propertyKey(scope.property) && propertyKey(scope.property) === propertyKey(performance.summary.property)
    && scope.periodStart === performance.periodStart && scope.periodEnd === performance.periodEnd);
}

module.exports = { canonicalPageUrl, propertyKey, validPeriod, metricIntegrity, inspectPageQueryScope, eligibleSummary, filterPage };
