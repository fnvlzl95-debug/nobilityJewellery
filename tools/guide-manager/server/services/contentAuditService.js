const { db } = require('../lib/db');
const { nowIso, koreaDate, normalizeUrl, sha256, clamp } = require('../lib/utils');
const inventory = require('./inventoryService');
const analytics = require('./analyticsService');
const { extractGuideContent } = require('./contentExtractorService');
const { expectedCtr, jaccard, businessScore } = require('./opportunityService');
const { completeJson } = require('./openaiService');
const generations = require('./generationService');
const { loadGa4Metrics, groupGa4BySlug } = require('./analyticsMetricsService');
const { buildQueryEvidence } = require('./queryEvidenceService');

const ANALYSIS_VERSION = 'noblesse-content-audit-v7';
const PAGE_QUERY_CHANGE_ID = 'reviewed-page-query-snippet';
const CLASSIFICATIONS = ['기술 우선', 'CTR 개선', '출처 백필', '본문 보강', '내부링크 강화', '통합 검토', '유지'];
const CHANGE_AREAS = ['기술', '제목·설명', '첫 화면', '본문', '내부링크', '출처', '통합'];
const EVIDENCE_KEYS = new Set(['gsc', 'ga4', 'naver', 'content', 'technical', 'duplicate', 'coverage']);
const BATCH_SIZE = 2;
let activeJob = null;

const round = (value, digits = 0) => {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
};
const parseJson = (value, fallback = null) => {
  try { return value ? JSON.parse(value) : fallback; } catch (_) { return fallback; }
};
const pathOnly = (value) => String(value || '').split('?')[0].replace(/\/$/, '') || '/';

function observationWindow(guide, today = koreaDate()) {
  const changedAt = [guide?.publishedAt, guide?.updatedAt, guide?.repositoryChangedAt]
    .map((value) => String(value || '').slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort()
    .at(-1) || '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(changedAt)) {
    return { recentObservationHold: false, changeDate: null, observeUntil: null, daysSinceChange: null };
  }
  const changed = Date.parse(`${changedAt}T00:00:00Z`);
  const current = Date.parse(`${today}T00:00:00Z`);
  const daysSinceChange = Math.max(0, Math.floor((current - changed) / 86400000));
  const observeUntil = new Date(changed + 31 * 86400000).toISOString().slice(0, 10);
  return { recentObservationHold: daysSinceChange < 31, changeDate: changedAt, observeUntil, daysSinceChange };
}

function tokens(value) {
  return new Set(String(value || '').toLowerCase().replace(/[^a-z0-9가-힣]+/g, ' ').split(/\s+/).filter((item) => item.length > 1));
}

function coverageRatio(query, target) {
  const left = tokens(query);
  const right = tokens(target);
  if (!left.size) return 0;
  let common = 0;
  for (const item of left) if (right.has(item)) common++;
  return common / left.size;
}

function latestRankMap() {
  const rows = db.prepare(`
    SELECT rk.guide_slug AS slug, rk.keyword, rs.available, rs.found, rs.rank,
      rs.total_results AS totalResults, rs.trend_ratio AS trendRatio,
      rs.trend_direction AS trendDirection, rs.checked_at AS checkedAt,
      rs.competing_rank AS competingRank, rs.competing_url AS competingUrl
    FROM rank_keywords rk
    JOIN rank_snapshots rs ON rs.id = (
      SELECT id FROM rank_snapshots WHERE keyword_id=rk.id ORDER BY checked_at DESC, id DESC LIMIT 1
    )
  `).all();
  return new Map(rows.map((row) => [row.slug, { ...row, available: row.available !== 0, found: !!row.found }]));
}

function latestAuditRow(slug) {
  return db.prepare(`
    SELECT * FROM content_audits WHERE guide_slug=? ORDER BY updated_at DESC, id DESC LIMIT 1
  `).get(slug);
}

function parseAuditRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    guideSlug: row.guide_slug,
    sourceHash: row.source_hash,
    gscImportId: row.gsc_import_id,
    ga4ImportId: row.ga4_import_id,
    coverageImportId: row.coverage_import_id,
    snapshot: parseJson(row.snapshot_json, {}),
    aiAnalysis: parseJson(row.ai_analysis_json),
    plan: normalizeObservationPlan(parseJson(row.plan_json), parseJson(row.snapshot_json, {})),
    planStatus: row.plan_status,
    status: row.status,
    model: row.model,
    error: row.error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function currentAuditRows() {
  return db.prepare(`
    SELECT ca.* FROM content_audits ca
    WHERE ca.id=(SELECT id FROM content_audits newer WHERE newer.guide_slug=ca.guide_slug ORDER BY newer.updated_at DESC, newer.id DESC LIMIT 1)
    ORDER BY ca.id
  `).all().map(parseAuditRow);
}

function scoreContent(content, inboundCount, cluster) {
  const title = String(content.title || '');
  const description = String(content.description || '');
  const keyword = String(content.keyword || '');
  const keywordCoverage = coverageRatio(keyword, `${title} ${description}`);
  const snippet = clamp(
    (title.length >= 15 && title.length <= 27 ? 30 : title.length >= 10 && title.length <= 31 ? 18 : 6)
      + (description.length >= 55 && description.length <= 175 ? 30 : description.length >= 35 ? 16 : 5)
      + keywordCoverage * 30
      + (/\?|차이|방법|기준|가격|비용|기간|몇|환산|순위|종류/.test(title) ? 10 : 4),
    0, 100,
  );
  const structure = content.structure;
  const answerCoverage = clamp(
    (structure.quickAnswerCount === 3 ? 18 : structure.quickAnswerCount ? 9 : 0)
      + (structure.sectionCount >= 4 ? 22 : structure.sectionCount >= 3 ? 16 : structure.sectionCount * 4)
      + (content.characterCount >= 1800 ? 28 : content.characterCount >= 1200 ? 22 : content.characterCount >= 800 ? 15 : content.characterCount >= 500 ? 9 : 3)
      + (structure.faqCount >= 3 ? 17 : structure.faqCount * 4)
      + (structure.cautionCount >= 2 ? 7 : structure.cautionCount * 3)
      + (content.lead.length >= 70 ? 8 : content.lead.length >= 35 ? 4 : 0),
    0, 100,
  );
  const trust = clamp(
    (structure.officialSourceCount >= 2 ? 72 : structure.officialSourceCount === 1 ? 55 : structure.sourceCount ? 20 : 0)
      + (content.technical.articleSchema ? 18 : 0),
    0, 100,
  );
  const internalLinks = clamp(
    (structure.relatedLinkCount >= 3 ? 48 : structure.relatedLinkCount * 14)
      + (inboundCount >= 3 ? 32 : inboundCount * 10)
      + (cluster ? 20 : 5),
    0, 100,
  );
  return { snippet: round(snippet), answerCoverage: round(answerCoverage), trust: round(trust), internalLinks: round(internalLinks) };
}

function technicalFindings(content, gsc, coverage) {
  const rows = [];
  const add = (code, severity, title, evidence, state = 'current') => rows.push({ code, severity, title, evidence, state });
  if (!content.technical.selfCanonical) add('canonical_source', 'error', '소스의 self-canonical 정합성 확인 필요', `pagePath ${content.technical.pagePath || '없음'} · canonical ${content.technical.canonicalDeclared ? '선언됨' : '없음'}`);
  if (!content.technical.hasPageTitle) add('page_title_missing', 'error', 'SEO 페이지 제목 없음', 'pageTitle 상수를 찾지 못했습니다.');
  if (!content.technical.hasDescription) add('description_missing', 'error', '검색 설명 없음', 'pageDescription 상수를 찾지 못했습니다.');
  if (!content.technical.articleSchema) add('article_schema', 'warning', 'Article 구조화 데이터 확인 필요', 'Article JSON-LD를 찾지 못했습니다.');
  if (gsc.variants > 1) add(
    'slash_variants', 'warning', '측정기간에 슬래시 URL 변형이 함께 집계됨',
    `GSC 원본 URL ${gsc.variants}개가 같은 무슬래시 URL로 묶였습니다. 현재 소스는 ${content.technical.selfCanonical ? '무슬래시 self-canonical과 일치' : '추가 확인 필요'}합니다.`, 'historical',
  );
  if (coverage?.notIndexed > 0) add('coverage_sitewide', 'info', '사이트 전체 미색인 신호가 있음', `Coverage ZIP은 URL 목록 없이 미색인 ${coverage.notIndexed}개만 제공하므로 이 페이지 원인으로 단정하지 않습니다.`, 'sitewide');
  return rows;
}

function change(id, area, priority, action, currentState, proposedState, evidenceKeys, targetMetric, requiresOfficialSource = false) {
  return { id, area, priority, enabled: true, action, currentState, proposedState, evidenceKeys, targetMetric, requiresOfficialSource };
}

function classify(snapshot) {
  const { gsc } = snapshot.metrics;
  const currentTechnical = snapshot.technicalFindings.some((item) => item.severity === 'error');
  const ctrWeak = gsc.impressions >= 40 && gsc.position >= 3 && gsc.position <= 20 && gsc.ctr < gsc.expectedCtr * 0.7;
  // 페이지 조회수와 이탈률은 본문 결함의 원인을 입증하지 않는다.
  const bodyWeak = snapshot.scores.dimensions.answerCoverage < 62 || snapshot.scores.dimensions.trust < 45;
  const duplicateRisk = snapshot.duplicates[0]?.similarity >= 0.72 && gsc.impressions < 40;
  if (currentTechnical) return '기술 우선';
  if (ctrWeak) return 'CTR 개선';
  if (duplicateRisk) return '통합 검토';
  if (snapshot.content.structure.officialSourceCount === 0) return '출처 백필';
  if (bodyWeak) return '본문 보강';
  if (snapshot.links.inboundCount < 2 || snapshot.content.structure.relatedLinkCount < 3) return '내부링크 강화';
  return '유지';
}

function deterministicChanges(snapshot) {
  const changes = [];
  const { content, metrics, links, scores } = snapshot;
  // slash_variants는 배포 전 측정기간의 과거 신호다. 현재 소스가
  // self-canonical이면 수정 작업으로 만들지 않고 기술 근거에만 보존한다.
  if (metrics.gsc.impressions >= 40 && metrics.gsc.position >= 3 && metrics.gsc.position <= 20 && metrics.gsc.ctr < metrics.gsc.expectedCtr * 0.7) changes.push(change(
    'improve-snippet', '제목·설명', 'P1', '검색 의도와 즉답을 제목·설명 앞부분에 배치',
    `“${content.pageTitle}” · 노출 ${metrics.gsc.impressions}회 · CTR ${(metrics.gsc.ctr * 100).toFixed(2)}% · 평균 ${metrics.gsc.position.toFixed(1)}위`,
    'CTR은 검토 신호입니다. 이 페이지에 실제 연결된 검색어와 현재 제목·본문의 불일치를 확인한 뒤 수정 여부를 판단합니다. 사이트 전체 검색어를 제목에 삽입하지 않습니다.',
    ['gsc', 'content'], 'GSC CTR', false,
  ));
  if (content.structure.quickAnswerCount !== 3 || content.characterCount < 1200 || scores.dimensions.answerCoverage < 62) changes.push(change(
    'strengthen-first-screen', '첫 화면', 'P1', '첫 화면 즉답과 본문 범위를 보강',
    `빠른 답변 ${content.structure.quickAnswerCount}개 · 본문 ${content.characterCount}자 · 섹션 ${content.structure.sectionCount}개`,
    '첫 문단 직후에 질문에 바로 답하는 3개 요약을 유지·보강하고, 검색자가 비교할 조건·확인 순서·주의점을 섹션 제목만 봐도 파악하도록 재배치합니다.',
    ['content', 'ga4'], '검색 순위·GA4 참여', true,
  ));
  if (content.structure.officialSourceCount === 0) changes.push(change(
    'add-official-evidence', '출처', 'P1', '핵심 사실마다 공식·권위 출처 연결',
    `본문에 확인된 공식 출처가 ${content.structure.officialSourceCount}개입니다.`,
    '정부·표준기관·보석 교육기관·제조사 1차 자료를 조사한 뒤 숫자·순도·처리·관리 기준을 연결하고, 확인되지 않은 가격·기간·가능 여부는 넣지 않습니다.',
    ['content'], '신뢰성·사실성', true,
  ));
  // 이 글의 발신 링크를 늘려도 다른 글에서 들어오는 링크 부족은 해결되지 않는다.
  if (content.structure.relatedLinkCount < 3 && links.recommended.length) changes.push(change(
    'strengthen-internal-links', '내부링크', 'P2', '이 글의 관련 링크를 검색 여정에 맞게 보강',
    `관련 링크 ${content.structure.relatedLinkCount}개 · 다른 가이드에서 들어오는 링크 ${links.inboundCount}개`,
    `이 글에서 다음 질문에 답하는 관련 글로 연결합니다. 실제 존재 경로 ${links.recommended.slice(0, 4).map((item) => item.to).join(', ') || '후보 조사 필요'} 안에서 관련 링크를 선택하고 링크 설명에 이 글 다음에 읽을 이유를 씁니다. 클러스터 편입은 별도 검토 항목입니다.`,
    ['content'], '크롤링·노출', false,
  ));
  return normalizeObservationPlan({ changes }, snapshot).changes;
}

function observationNotes(snapshot) {
  const notes = [];
  const ga4 = snapshot?.metrics?.ga4;
  if (ga4?.mapped && ga4.views >= 5 && ga4.bounceRate >= 0.45) notes.push(`GA4 조회 ${ga4.views}회·이탈률 ${(ga4.bounceRate * 100).toFixed(1)}%는 참여 확인 신호입니다. 유입 의도·세션과 실제 본문 결함을 확인하기 전에는 이 수치만으로 본문을 재작성하지 않습니다.`);
  if (snapshot?.links?.inboundCount < 2) notes.push(`다른 글에서 들어오는 링크가 ${snapshot.links.inboundCount}개입니다. 이 글의 관련 링크 수정으로는 유입 연결이 늘어나지 않으므로 공유 클러스터·기존 글의 연결을 별도로 검토합니다.`);
  if (snapshot?.metrics?.gsc?.impressions < 40) notes.push(`GSC 노출 ${snapshot.metrics.gsc.impressions}회만으로 링크 부족이나 본문 결함을 판단하지 않습니다. 현재 연결과 내용을 유지하고 다음 동일 길이의 측정기간을 비교합니다.`);
  if (!notes.length) notes.push('자동 편집할 구체적인 변경 사항이 없습니다. 현재 원문을 유지하고 다음 동일 길이의 측정기간에서 성과를 확인합니다.');
  return notes;
}

function normalizeObservationPlan(plan, snapshot = {}) {
  if (!plan) return plan;
  const observations = [...(plan.observations || [])];
  const changes = (plan.changes || []).filter(entry => {
    if (entry.id !== 'preserve-and-monitor' && entry.action !== '현재 구조 유지 후 다음 동일 기간 측정') return true;
    observations.push(entry.proposedState || '현재 원문을 유지하고 다음 동일 기간의 성과를 관찰합니다.');
    return false;
  });
  const pageQueryReady = snapshot.queryEvidence?.canRecommendTitleKeywords === true;
  if (pageQueryReady && !changes.some(entry => entry.id === PAGE_QUERY_CHANGE_ID)) changes.push({
    ...change(PAGE_QUERY_CHANGE_ID, '제목·설명', 'P2', '페이지 검색어와 현재 제목·본문의 불일치 검토',
      '페이지·기간이 확인된 검색어 자료가 있습니다. 자료의 존재만으로 제목 결함이나 개선 효과가 입증되지는 않습니다.',
      '실제 검색어와 원문을 대조해 확인한 불일치를 기록하고, 그 범위 안에서 제목·설명 수정 여부를 판단합니다.', ['gsc', 'content'], '검토 후 GSC CTR 비교'),
    enabled: false,
  });
  const executableChanges = changes.map(entry => {
    if (entry.id === PAGE_QUERY_CHANGE_ID) {
      const { lockedReason, ...candidate } = entry;
      return pageQueryReady ? candidate : { ...candidate, enabled: false, lockedReason: '현재 페이지·기간과 일치하는 충분한 관련 검색어 근거를 먼저 확인해 주세요.' };
    }
    if (entry.area !== '제목·설명') return entry;
    if (entry.id !== 'improve-snippet' && !/추정 관련 검색어|사이트 전체 검색어|sitewide|inferredQueries/i.test(`${entry.action || ''} ${entry.proposedState || ''}`)) return entry;
    const lockedReason = pageQueryReady ? '이전 사이트 전체 검색어 기반 제안은 사용할 수 없습니다. 현재 페이지 검색어와 원문을 대조하는 새 항목에서 검토해 주세요.' : '페이지별 검색어 근거가 없습니다. CTR만으로 제목을 변경하지 않고 실제 검색어와 제목·본문의 불일치를 먼저 확인합니다.';
    observations.push(lockedReason);
    return { ...entry, enabled: false, lockedReason };
  });
  if (!executableChanges.some(entry => entry.enabled)) observations.push(...observationNotes(snapshot));
  const evidence = snapshot.queryEvidence || {};
  const pageQueryReview = plan.pageQueryReview || (pageQueryReady ? {
    confirmed: false, mismatch: '', selectedQueries: [], contextFingerprint: snapshot.contextFingerprint || null,
    evidence: Object.fromEntries(['importId', 'pageUrl', 'periodStart', 'periodEnd', 'fingerprint'].map(key => [key, evidence[key] ?? null])),
  } : null);
  return { ...plan, changes: executableChanges, observations: [...new Set(observations)], pageQueryReview };
}

function assertExecutablePlan(plan) {
  if ((plan?.changes || []).some(entry => entry.enabled)) return;
  if (plan?.observations?.length) throw Object.assign(new Error('관찰 전용 계획은 원고를 변경하지 않습니다. 실제 수정할 문제가 확인되면 새 계획을 검토해 주세요.'), { status: 422, code: 'MONITOR_ONLY_PLAN' });
  throw Object.assign(new Error('적용할 수정 항목을 최소 1개 선택해 주세요'), { status: 422 });
}

function seedPlan(snapshot) {
  const keepSnippet = snapshot.guards.keepSnippet;
  return normalizeObservationPlan({
    classification: snapshot.classification,
    goal: snapshot.rationale.join(' '),
    proposedTitle: snapshot.content.title,
    proposedDescription: snapshot.content.description,
    quickAnswers: snapshot.content.quickAnswers.slice(0, 3),
    changes: snapshot.deterministicChanges,
    observations: snapshot.deterministicChanges.length ? [] : observationNotes(snapshot),
    sectionPlan: [],
    internalLinks: snapshot.links.recommended.slice(0, 4).map((item) => ({ to: item.to, reason: item.reason })),
    preserve: [
      ...(keepSnippet ? ['현재 제목·설명은 기대 CTR에 근접하므로 명확한 근거 없이 바꾸지 않습니다.'] : []),
      '확인된 수치·단위·등급·날짜와 출처 URL',
      '가격·제작기간·수리 가능 여부에 대한 조건부 표현',
    ],
    risks: [
      'GSC 검색어와 페이지 CSV는 직접 연결되지 않습니다. 사이트 전체 검색어는 참고 자료이며 이 글의 유입이나 제목 변경 근거로 사용하지 않습니다.',
      'Coverage ZIP의 문제 수는 사이트 전체 값이며 이 페이지의 개별 오류로 단정하지 않습니다.',
    ],
    confidence: snapshot.metrics.gsc.impressions || snapshot.metrics.ga4.mapped ? 'medium' : 'low',
  }, snapshot);
}

function buildSnapshots() {
  inventory.scanInventory();
  analytics.reconcileGscPageUrls();
  analytics.reconcileGa4Mappings();
  analytics.reconcileGa4OrganicMappings();
  const guides = inventory.listGuides().map((guide) => inventory.getGuide(guide.slug, { includeSource: true }));
  const contents = new Map(guides.map((guide) => [guide.slug, extractGuideContent(guide, guide.source)]));
  const performance = analytics.latestImport('gsc_performance');
  const pageQueryMap = analytics.pageQueryEvidenceMap(performance);
  const ga4Import = analytics.latestGa4PagesImport();
  const naverWebImport = analytics.latestImport('naver_web_performance');
  const organicImport = analytics.latestImport('ga4_organic_landing');
  const coverageImport = analytics.latestImport('gsc_coverage');
  const gscRows = performance ? db.prepare(`
    SELECT normalized_url AS normalizedUrl, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE 0 END AS ctr,
      CASE WHEN SUM(impressions)>0 THEN SUM(position*impressions)/SUM(impressions) ELSE AVG(position) END AS position,
      COUNT(DISTINCT original_url) AS variants, GROUP_CONCAT(DISTINCT original_url) AS originalUrls
    FROM gsc_pages WHERE import_id=? GROUP BY normalized_url
  `).all(performance.id) : [];
  const gscMap = new Map(gscRows.map((row) => [row.normalizedUrl, row]));
  const queryRows = performance ? db.prepare(`
    SELECT query, clicks, impressions, ctr, position FROM gsc_queries WHERE import_id=? ORDER BY impressions DESC
  `).all(performance.id) : [];
  const ga4Map = loadGa4Metrics(ga4Import?.id);
  const ga4Rows = [...ga4Map.values()];
  const organicRows = organicImport ? db.prepare(`
    SELECT guide_slug AS slug, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE 0 END AS ctr,
      CASE WHEN SUM(impressions)>0 THEN SUM(position*impressions)/SUM(impressions) ELSE AVG(position) END AS position,
      SUM(active_users) AS activeUsers, SUM(engaged_sessions) AS engagedSessions,
      CASE WHEN SUM(active_users)>0 THEN SUM(engagement_rate*active_users)/SUM(active_users) ELSE AVG(engagement_rate) END AS engagementRate,
      CASE WHEN SUM(active_users)>0 THEN SUM(avg_engagement_seconds*active_users)/SUM(active_users) ELSE AVG(avg_engagement_seconds) END AS avgEngagementSeconds,
      SUM(events) AS events, SUM(key_events) AS keyEvents
    FROM ga4_organic_pages WHERE import_id=? AND guide_slug IS NOT NULL GROUP BY guide_slug
  `).all(organicImport.id) : [];
  const organicMap = new Map(organicRows.map((row) => [row.slug, row]));
  const safeOrganic = groupGa4BySlug(organicImport ? db.prepare('SELECT * FROM ga4_organic_pages WHERE import_id=? AND guide_slug IS NOT NULL').all(organicImport.id) : []);
  for (const [slug, row] of organicMap) Object.assign(row, safeOrganic.get(slug));
  const naverWebRows = naverWebImport ? db.prepare(`
    SELECT normalized_url AS normalizedUrl, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE AVG(ctr) END AS ctr
    FROM naver_web_pages WHERE import_id=? GROUP BY normalized_url
  `).all(naverWebImport.id) : [];
  const naverWebMap = new Map(naverWebRows.map((row) => [row.normalizedUrl, row]));
  const rankMap = latestRankMap();
  const coverage = coverageImport?.summary || null;
  const clusters = inventory.listClusters();
  const clusterByPath = new Map();
  for (const cluster of clusters) {
    // Public findGuideClusterForPath uses the first matching cluster.
    for (const value of [cluster.hubPath, ...(cluster.links || []).map(link => link.to)]) {
      const key = pathOnly(value);
      if (!clusterByPath.has(key)) clusterByPath.set(key, cluster);
    }
  }
  const inbound = new Map(guides.map((guide) => [guide.path, []]));
  for (const guide of guides) {
    const cluster = /GuideArticleView/.test(guide.source) ? clusterByPath.get(guide.path) : null;
    const visibleLinks = [...contents.get(guide.slug).relatedLinks,
      ...(cluster ? [{ to: cluster.hubPath }, ...cluster.links] : [])];
    const seen = new Set();
    for (const link of visibleLinks) {
      const target = pathOnly(link.to);
      if (target !== guide.path && !seen.has(target) && inbound.has(target)) inbound.get(target).push({ from: guide.path, title: guide.title });
      seen.add(target);
    }
  }
  const maxImpressions = Math.max(1, ...gscRows.map((row) => row.impressions || 0));
  const maxViews = Math.max(1, ...ga4Rows.map((row) => row.views || 0));
  const inventoryFingerprint = sha256(guides.map((guide) => `${guide.slug}:${guide.sourceHash}`).sort().join('|'));

  return guides.map((guide) => {
    const content = contents.get(guide.slug);
    const normalized = normalizeUrl(`https://noblessegold.com${guide.path}`);
    const rawGsc = gscMap.get(normalized) || {};
    const gsc = {
      clicks: Number(rawGsc.clicks || 0), impressions: Number(rawGsc.impressions || 0), ctr: Number(rawGsc.ctr || 0),
      position: rawGsc.position == null ? null : Number(rawGsc.position), variants: Number(rawGsc.variants || 0),
      originalUrls: String(rawGsc.originalUrls || '').split(',').filter(Boolean),
      expectedCtr: rawGsc.position == null ? null : expectedCtr(rawGsc.position),
    };
    gsc.ctrGap = gsc.expectedCtr == null ? null : Math.max(0, gsc.expectedCtr - gsc.ctr);
    gsc.arithmeticClickGap = gsc.expectedCtr == null ? null : Math.max(0, Math.round(gsc.impressions * gsc.expectedCtr - gsc.clicks));
    const rawGa4 = ga4Map.get(guide.slug);
    const ga4 = rawGa4 ? {
      mapped: true, views: Number(rawGa4.views || 0), activeUsers: rawGa4.activeUsers ?? null,
      events: Number(rawGa4.events || 0), bounceRate: rawGa4.bounceRate == null ? null : Number(rawGa4.bounceRate),
      eventsPerView: rawGa4.views ? round(rawGa4.events / rawGa4.views, 2) : null,
    } : { mapped: false, views: 0, activeUsers: 0, events: 0, bounceRate: null, eventsPerView: null };
    const rawOrganic = organicMap.get(guide.slug);
    const googleOrganic = rawOrganic ? {
      mapped: true, clicks: Number(rawOrganic.clicks || 0), impressions: Number(rawOrganic.impressions || 0),
      ctr: Number(rawOrganic.ctr || 0), position: rawOrganic.position == null ? null : Number(rawOrganic.position),
      activeUsers: rawOrganic.activeUsers ?? null, engagedSessions: Number(rawOrganic.engagedSessions || 0),
      engagementRate: rawOrganic.engagementRate == null ? null : Number(rawOrganic.engagementRate),
      avgEngagementSeconds: rawOrganic.avgEngagementSeconds == null ? null : Number(rawOrganic.avgEngagementSeconds),
      events: Number(rawOrganic.events || 0), keyEvents: Number(rawOrganic.keyEvents || 0),
    } : { mapped: false, clicks: 0, impressions: 0, ctr: 0, position: null, activeUsers: 0, engagedSessions: 0, engagementRate: null, avgEngagementSeconds: null, events: 0, keyEvents: 0 };
    const naver = rankMap.get(guide.slug) || { measured: false, available: null, found: false, rank: null, trendRatio: null, trendDirection: 'no_data', checkedAt: null };
    if (rankMap.has(guide.slug)) naver.measured = true;
    const rawNaverWeb = naverWebMap.get(normalized);
    const naverWeb = {
      listed: !!rawNaverWeb,
      top30Only: true,
      clicks: Number(rawNaverWeb?.clicks || 0),
      impressions: Number(rawNaverWeb?.impressions || 0),
      ctr: Number(rawNaverWeb?.ctr || 0),
      overallCtr: Number(naverWebImport?.summary?.overallCtr || 0),
      reportUpdatedAt: naverWebImport?.summary?.reportUpdatedAt || null,
    };
    const intentText = `${content.title} ${content.keyword} ${content.sections.map((item) => item.title).join(' ')}`;
    const pageUrl = `https://noblessegold.com${guide.path}`;
    const pageQueryBundle = analytics.selectPageQueryEvidence(pageUrl, performance, pageQueryMap);
    const { queryHints, sitewideQueryHints, queryEvidence, titleKeywordCandidates } = buildQueryEvidence({ content, queryRows, performance, pageQueryBundle, pageUrl, pageMetrics: gsc });
    const duplicates = guides.filter((item) => item.slug !== guide.slug).map((item) => {
      const other = contents.get(item.slug);
      return { slug: item.slug, path: item.path, title: item.title, similarity: Math.max(jaccard(content.keyword, other.keyword), jaccard(content.title, other.title), jaccard(intentText, `${other.title} ${other.keyword} ${other.sections.map((section) => section.title).join(' ')}`)) };
    }).sort((a, b) => b.similarity - a.similarity).slice(0, 3).map((item) => ({ ...item, similarity: round(item.similarity, 2) }));
    const cluster = clusterByPath.get(pathOnly(guide.path));
    const inboundRows = inbound.get(guide.path) || [];
    const knownPaths = new Set(guides.map((item) => item.path));
    const recommended = [];
    for (const link of cluster?.links || []) {
      if (pathOnly(link.to) === guide.path || !knownPaths.has(pathOnly(link.to))) continue;
      recommended.push({ to: pathOnly(link.to), label: link.label, reason: `${cluster.title}의 같은 검색 여정` });
    }
    for (const item of duplicates) if (knownPaths.has(item.path) && !recommended.some((link) => link.to === item.path)) recommended.push({ to: item.path, label: item.title, reason: `검색 의도 유사도 ${Math.round(item.similarity * 100)}%` });
    const dimension = scoreContent(content, inboundRows.length, cluster);
    const technical = technicalFindings(content, gsc, coverage);
    const technicalScore = clamp((content.technical.selfCanonical ? 55 : 0) + (content.technical.hasPageTitle ? 15 : 0) + (content.technical.hasDescription ? 15 : 0) + (content.technical.articleSchema ? 15 : 0), 0, 100);
    const measurement = (gsc.impressions || gsc.clicks ? 40 : 0) + (ga4.mapped ? 30 : 0) + (naver.measured && naver.available !== false ? 30 : 0);
    const demand = Math.log1p(gsc.impressions) / Math.log1p(maxImpressions) * 100;
    const ctrOpportunity = gsc.expectedCtr ? clamp((gsc.expectedCtr - gsc.ctr) / gsc.expectedCtr, 0, 1) : 0;
    const gscOpportunity = clamp(demand * (0.4 + 0.6 * ctrOpportunity), 0, 100);
    const rankOpportunity = gsc.position == null ? 0 : gsc.position >= 3 && gsc.position <= 10 ? 100 : gsc.position <= 20 ? 70 : 25;
    const viewScale = Math.log1p(ga4.views) / Math.log1p(maxViews) * 100;
    const ga4Opportunity = ga4.mapped ? clamp(viewScale * (0.4 + 0.6 * (ga4.bounceRate == null ? 0.4 : ga4.bounceRate)), 0, 100) : 0;
    const naverOpportunity = !naver.measured || naver.available === false ? 50 : naver.found ? clamp(110 - Number(naver.rank || 100) * 5, 0, 100) : 70;
    const business = businessScore(content.keyword, content.category);
    const priority = round(gscOpportunity * 0.45 + rankOpportunity * 0.2 + ga4Opportunity * 0.15 + naverOpportunity * 0.1 + business * 0.1);
    const readiness = round(dimension.snippet * 0.25 + dimension.answerCoverage * 0.3 + dimension.trust * 0.2 + dimension.internalLinks * 0.15 + technicalScore * 0.1);
    const keepSnippet = gsc.impressions >= 80 && gsc.position != null && gsc.position <= 10 && gsc.expectedCtr && gsc.ctr >= gsc.expectedCtr * 0.8;
    const keepNaverRankSnippet = naver.measured && naver.available !== false && naver.found && Number(naver.rank || 100) <= 3;
    const keepNaverWebSnippet = naverWeb.listed && naverWeb.impressions >= 100
      && naverWeb.overallCtr > 0 && naverWeb.ctr >= naverWeb.overallCtr;
    const keepNaverSnippet = keepNaverRankSnippet || keepNaverWebSnippet;
    const observation = observationWindow(guide);
    const snapshot = {
      analysisVersion: ANALYSIS_VERSION, inventoryFingerprint,
      guide: { slug: guide.slug, path: guide.path, title: guide.title, keyword: guide.keyword, category: guide.category, isCustom: guide.isCustom, sourceHash: guide.sourceHash, publishedAt: guide.publishedAt, updatedAt: guide.updatedAt, repositoryChangedAt: guide.repositoryChangedAt },
      periods: {
        gsc: performance ? { start: performance.periodStart, end: performance.periodEnd, importId: performance.id } : null,
        ga4: ga4Import ? { start: ga4Import.periodStart, end: ga4Import.periodEnd, importId: ga4Import.id } : null,
        googleOrganic: organicImport ? { start: organicImport.periodStart, end: organicImport.periodEnd, importId: organicImport.id } : null,
        naverWeb: naverWebImport ? { start: naverWebImport.periodStart, end: naverWebImport.periodEnd, importId: naverWebImport.id, reportUpdatedAt: naverWebImport.summary?.reportUpdatedAt || null } : null,
        coverage: coverageImport ? { start: coverageImport.periodStart, end: coverageImport.periodEnd, importId: coverageImport.id } : null,
      },
      metrics: { gsc, ga4, googleOrganic, naver, naverWeb, coverage }, content, queryHints, sitewideQueryHints, queryEvidence, titleKeywordCandidates, duplicates,
      links: { cluster: cluster ? { id: cluster.id, title: cluster.title, hubPath: cluster.hubPath } : null, inboundCount: inboundRows.length, inboundFrom: inboundRows, recommended: recommended.slice(0, 8) },
      technicalFindings: technical,
      scores: { priority, readiness, dimensions: { ...dimension, technical: round(technicalScore), measurement: round(measurement) }, weights: { gscCtr: 45, rank: 20, ga4: 15, naver: 10, business: 10 } },
      guards: {
        keepSnippet,
        keepNaverSnippet,
        naverRank: keepNaverRankSnippet ? Number(naver.rank) : null,
        naverWebProtected: keepNaverWebSnippet,
        readOnly: guide.isCustom,
        ...observation,
      },
      caveats: [
        'GA4·GSC·Naver는 측정기간과 정의가 달라 절대값을 합산하지 않습니다.',
        'Google 자연 검색 방문 페이지 보고서는 GSC 유입 뒤 GA4 참여를 같은 경로에서 연결하며 기기 차원은 포함하지 않습니다.',
        queryEvidence.reason,
        'Naver 트렌드는 절대 검색량이 아닌 동일 요청 안의 상대 지수입니다.',
        'Naver 웹검색 리포트는 전체 검색영역이 아니라 웹검색의 TOP 30 검색어·URL만 포함합니다. 목록 밖 URL을 0으로 해석하지 않습니다.',
        'Coverage는 개별 오류 URL이 없어 사이트 전체 기술 상태로만 사용합니다.',
        '슬래시 URL 변형은 배포 전 GSC의 과거 신호이며 현재 self-canonical이 정상이면 기술 오류로 분류하지 않습니다.',
        ...(observation.recentObservationHold
          ? [`최근 콘텐츠 변경일 ${observation.changeDate} 기준 D+31 관찰 종료일 ${observation.observeUntil} 전에는 자동 수정하지 않습니다.`]
          : []),
      ],
    };
    snapshot.classification = classify(snapshot);
    snapshot.rationale = [
      `우선순위 ${priority}점 · 노출 준비도 ${readiness}점`,
      gsc.impressions ? `GSC 노출 ${gsc.impressions}회, CTR ${(gsc.ctr * 100).toFixed(2)}%, 평균 ${gsc.position?.toFixed(1) || '—'}위` : 'GSC 페이지 성과 신호 없음',
      ga4.mapped ? `GA4 조회 ${ga4.views}회, 이탈률 ${ga4.bounceRate == null ? '자료 없음' : `${(ga4.bounceRate * 100).toFixed(1)}%`}` : 'GA4 페이지 제목 정확 일치 매핑 없음',
      googleOrganic.mapped ? `Google 자연 검색 ${googleOrganic.activeUsers == null ? '고유 사용자 합계 자료 없음' : `활성 사용자 ${googleOrganic.activeUsers}명`}, 참여율 ${googleOrganic.engagementRate == null ? '자료 없음' : `${(googleOrganic.engagementRate * 100).toFixed(1)}%`}` : 'Google 자연 검색 방문 페이지 연결 없음',
      naver.measured ? (naver.available === false ? 'Naver 웹문서 순위 API 비활성' : naver.found ? `Naver ${naver.rank}위` : `Naver ${naver.depth || 100}위 밖`) : 'Naver 순위·트렌드 미측정',
      naverWeb.listed ? `Naver 웹검색 TOP 30 노출 ${naverWeb.impressions}회, CTR ${(naverWeb.ctr * 100).toFixed(1)}%` : 'Naver 웹검색 TOP 30 URL 목록 밖',
    ];
    snapshot.deterministicChanges = deterministicChanges(snapshot);
    snapshot.contextFingerprint = sha256(JSON.stringify({
      analysisVersion: snapshot.analysisVersion, sourceHash: snapshot.guide.sourceHash,
      // 전수 Terra 분석은 기존 기준선으로 유지하고, 검색 후 참여 자료는 확정 후보만 force 재분석한다.
      periods: { gsc: snapshot.periods.gsc, ga4: snapshot.periods.ga4, naverWeb: snapshot.periods.naverWeb, coverage: snapshot.periods.coverage, googleOrganic: snapshot.periods.googleOrganic },
      gsc: snapshot.metrics.gsc, ga4: snapshot.metrics.ga4, googleOrganic: snapshot.metrics.googleOrganic, naver: snapshot.metrics.naver, naverWeb: snapshot.metrics.naverWeb,
      content: { title: snapshot.content.title, description: snapshot.content.description, structure: snapshot.content.structure, characterCount: snapshot.content.characterCount },
      // 원본·적격 여부가 같으면 단순 경과 일수만으로 검토를 무효화하지 않는다.
      queryHints: snapshot.queryHints, queryEvidence: { ...snapshot.queryEvidence, ageDays: undefined }, titleKeywordCandidates: snapshot.titleKeywordCandidates, sitewideQueryHints: snapshot.sitewideQueryHints, duplicates: snapshot.duplicates, links: snapshot.links,
    }));
    return snapshot;
  });
}

function scanAll() {
  const snapshots = buildSnapshots();
  const stamp = nowIso();
  const find = db.prepare(`
    SELECT * FROM content_audits WHERE guide_slug=? AND source_hash=? AND gsc_import_id=? AND ga4_import_id=? AND coverage_import_id=?
  `);
  const findSamePageBaseline = db.prepare(`
    SELECT * FROM content_audits WHERE guide_slug=? AND source_hash=? AND gsc_import_id=? AND ga4_import_id=?
    ORDER BY updated_at DESC, id DESC LIMIT 1
  `);
  const insert = db.prepare(`
    INSERT INTO content_audits (guide_slug, source_hash, gsc_import_id, ga4_import_id, coverage_import_id, snapshot_json, plan_json, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'measured', ?, ?)
  `);
  const update = db.prepare(`
    UPDATE content_audits SET snapshot_json=?, plan_json=?, status=?, error=NULL, updated_at=? WHERE id=?
  `);
  const updateSitewideCoverage = db.prepare(`
    UPDATE content_audits SET coverage_import_id=?, snapshot_json=?, plan_json=?, status=?, error=NULL, updated_at=? WHERE id=?
  `);
  db.transaction(() => {
    for (const snapshot of snapshots) {
      const ids = [snapshot.periods.gsc?.importId || 0, snapshot.periods.ga4?.importId || 0, snapshot.periods.coverage?.importId || 0];
      const existing = find.get(snapshot.guide.slug, snapshot.guide.sourceHash || '', ...ids);
      if (!existing) {
        // Coverage는 URL별 원인이 없는 사이트 전체 참고 자료다. 최신 화면 스냅샷만 바뀐 경우
        // 이미 끝난 페이지별 Terra 판단을 버리지 않고 같은 감사 행에 최신 기술 상태를 교체한다.
        const previous = findSamePageBaseline.get(snapshot.guide.slug, snapshot.guide.sourceHash || '', ids[0], ids[1]);
        if (previous) {
          const preservedStatus = previous.status === 'analyzing'
            ? (previous.ai_analysis_json ? 'ready' : 'measured') : previous.status;
          updateSitewideCoverage.run(ids[2], JSON.stringify(snapshot), previous.plan_json || JSON.stringify(seedPlan(snapshot)), preservedStatus, stamp, previous.id);
          continue;
        }
        insert.run(snapshot.guide.slug, snapshot.guide.sourceHash || '', ...ids, JSON.stringify(snapshot), JSON.stringify(seedPlan(snapshot)), stamp, stamp);
        continue;
      }
      const before = parseJson(existing.snapshot_json, {});
      const contextChanged = before.contextFingerprint !== snapshot.contextFingerprint;
      const nextStatus = existing.ai_analysis_json && contextChanged ? 'stale' : existing.status === 'analyzing' ? 'measured' : existing.status;
      const refreshSeedPlan = !existing.ai_analysis_json && existing.plan_status === 'suggested' && contextChanged;
      const nextPlan = refreshSeedPlan ? seedPlan(snapshot) : parseJson(existing.plan_json, seedPlan(snapshot));
      update.run(JSON.stringify(snapshot), JSON.stringify(nextPlan), nextStatus, stamp, existing.id);
    }
  })();
  return { total: snapshots.length, scannedAt: stamp };
}

function ensureCurrentAudits() {
  const guideCount = db.prepare('SELECT COUNT(*) AS count FROM guides').get().count;
  const auditCount = new Set(currentAuditRows().map((row) => row.guideSlug)).size;
  if (!guideCount || auditCount !== guideCount) scanAll();
}

// 진단 화면에서 글별 편집 작업 진행·반영 상태를 구분해 보여주기 위한 조회.
function workStates() {
  const map = new Map();
  const rows = db.prepare(`
    SELECT g.id, g.target_slug AS slug, g.status, g.updated_at AS updatedAt
    FROM generations g WHERE g.target_slug IS NOT NULL ORDER BY g.id DESC
  `).all();
  for (const row of rows) {
    const entry = map.get(row.slug) || {};
    if (!entry.latest) entry.latest = { generationId: row.id, status: row.status, updatedAt: row.updatedAt };
    if (row.status === 'applied' && !entry.appliedAt) { entry.appliedAt = row.updatedAt; entry.appliedGenerationId = row.id; }
    map.set(row.slug, entry);
  }
  return map;
}

function listRow(item, workMap = null) {
  const snapshot = item.snapshot;
  return {
    work: (workMap ? workMap.get(snapshot.guide.slug) : null) || null,
    id: item.id, slug: snapshot.guide.slug, path: snapshot.guide.path, title: snapshot.guide.title,
    keyword: snapshot.guide.keyword, category: snapshot.guide.category, isCustom: snapshot.guide.isCustom,
    classification: item.status === 'ready' && item.plan?.classification ? item.plan.classification : snapshot.classification,
    metrics: snapshot.metrics, periods: snapshot.periods, guards: snapshot.guards, technicalFindings: snapshot.technicalFindings,
    scores: snapshot.scores, rationale: snapshot.rationale, caveats: snapshot.caveats,
    contentSummary: { ...snapshot.content.structure, characterCount: snapshot.content.characterCount, wordCount: snapshot.content.wordCount },
    links: { cluster: snapshot.links.cluster, inboundCount: snapshot.links.inboundCount },
    aiSummary: item.aiAnalysis ? { summary: item.aiAnalysis.summary, confidence: item.aiAnalysis.confidence, strengths: item.aiAnalysis.currentStrengths, problems: item.aiAnalysis.currentProblems } : null,
    auditStatus: item.status, planStatus: item.planStatus, model: item.model, error: item.error, updatedAt: item.updatedAt,
  };
}

function report() {
  ensureCurrentAudits();
  const workMap = workStates();
  const rows = currentAuditRows().map((item) => listRow(item, workMap)).sort((a, b) => b.scores.priority - a.scores.priority || b.metrics.gsc.impressions - a.metrics.gsc.impressions);
  const count = (predicate) => rows.filter(predicate).length;
  return {
    refreshedAt: nowIso(),
    calculatedAt: rows.reduce((latest, row) => !latest || row.updatedAt > latest ? row.updatedAt : latest, null),
    summary: {
      total: rows.length, analyzed: count((row) => row.auditStatus === 'ready'), stale: count((row) => row.auditStatus === 'stale'),
      protected: count((row) => row.isCustom), ga4Mapped: count((row) => row.metrics.ga4.mapped),
      naverMeasured: count((row) => row.metrics.naver.measured),
      naverWebListed: count((row) => row.metrics.naverWeb?.listed),
      recentHold: count((row) => row.guards?.recentObservationHold),
      applied: count((row) => !!row.work?.appliedAt),
      inProgress: count((row) => row.work?.latest && row.work.latest.status !== 'applied'),
      classifications: Object.fromEntries(CLASSIFICATIONS.map((item) => [item, count((row) => row.classification === item)])),
    },
    periods: rows[0]?.periods || {},
    methodology: '우선순위는 GSC 노출·CTR 45%, 순위 상승 여지 20%, GA4 참여 15%, Naver 보조 10%, 사업 연관성 10%로 계산합니다. 노출 준비도는 본문·출처·내부링크·기술 구조를 별도로 평가합니다.',
    caveat: '점수와 AI 진단은 노출을 보장하지 않습니다. GSC 검색어-페이지 연결과 Coverage URL 원인은 추정하지 않으며 Naver 웹검색은 TOP 30 범위로 표시합니다.',
    rows,
  };
}

function detail(slug) {
  ensureCurrentAudits();
  const item = parseAuditRow(latestAuditRow(slug));
  if (!item) return null;
  const knownPaths = new Set(inventory.listGuides().map((guide) => guide.path));
  return { ...item, work: workStates().get(slug) || null, allowedInternalLinks: item.snapshot.links.recommended.filter((link) => knownPaths.has(pathOnly(link.to))) };
}

const auditSchema = {
  type: 'object', additionalProperties: false, required: ['analyses'],
  properties: {
    analyses: {
      type: 'array', minItems: 1, maxItems: BATCH_SIZE,
      items: {
        type: 'object', additionalProperties: false,
        required: ['slug', 'classification', 'summary', 'searchIntent', 'currentStrengths', 'currentProblems', 'plan', 'confidence', 'caveats'],
        properties: {
          slug: { type: 'string' }, classification: { enum: CLASSIFICATIONS }, summary: { type: 'string' }, searchIntent: { type: 'string' },
          currentStrengths: { type: 'array', maxItems: 6, items: { type: 'string' } },
          currentProblems: { type: 'array', maxItems: 8, items: { type: 'string' } },
          plan: {
            type: 'object', additionalProperties: false,
            required: ['goal', 'proposedTitle', 'proposedDescription', 'quickAnswers', 'changes', 'sectionPlan', 'internalLinks', 'preserve', 'risks'],
            properties: {
              goal: { type: 'string' }, proposedTitle: { type: 'string' }, proposedDescription: { type: 'string' },
              quickAnswers: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string' } },
              changes: {
                type: 'array', minItems: 0, maxItems: 10,
                items: {
                  type: 'object', additionalProperties: false,
                  required: ['area', 'priority', 'enabled', 'action', 'currentState', 'proposedState', 'evidenceKeys', 'targetMetric', 'requiresOfficialSource'],
                  properties: {
                    area: { enum: CHANGE_AREAS }, priority: { enum: ['P0', 'P1', 'P2'] }, enabled: { type: 'boolean' },
                    action: { type: 'string' }, currentState: { type: 'string' }, proposedState: { type: 'string' },
                    evidenceKeys: { type: 'array', minItems: 1, maxItems: 5, items: { enum: [...EVIDENCE_KEYS] } },
                    targetMetric: { type: 'string' }, requiresOfficialSource: { type: 'boolean' },
                  },
                },
              },
              sectionPlan: {
                type: 'array', maxItems: 8,
                items: { type: 'object', additionalProperties: false, required: ['action', 'heading', 'detail'], properties: { action: { enum: ['유지', '추가', '수정', '삭제'] }, heading: { type: 'string' }, detail: { type: 'string' } } },
              },
              internalLinks: {
                type: 'array', maxItems: 6,
                items: { type: 'object', additionalProperties: false, required: ['to', 'reason'], properties: { to: { type: 'string' }, reason: { type: 'string' } } },
              },
              preserve: { type: 'array', maxItems: 8, items: { type: 'string' } }, risks: { type: 'array', maxItems: 8, items: { type: 'string' } },
            },
          },
          confidence: { enum: ['high', 'medium', 'low'] }, caveats: { type: 'array', maxItems: 6, items: { type: 'string' } },
        },
      },
    },
  },
};

function aiContext(item) {
  const s = item.snapshot;
  return {
    slug: s.guide.slug, path: s.guide.path, protectedReadOnly: s.guide.isCustom,
    title: s.content.title, pageTitle: s.content.pageTitle, description: s.content.description, keyword: s.content.keyword, category: s.content.category,
    body: s.content.bodyText, structure: s.content.structure,
    metrics: s.metrics, periods: s.periods, pageQueryEvidence: s.queryEvidence, pageQueries: s.queryHints || [], titleKeywordCandidates: s.titleKeywordCandidates || [], sitewideQueryReferences: s.sitewideQueryHints || [], nearestGuides: s.duplicates,
    internalLinks: s.links, technicalFindings: s.technicalFindings, scores: s.scores,
    deterministicClassification: s.classification, deterministicChanges: s.deterministicChanges,
    serverGuards: s.guards, allowedInternalLinks: s.links.recommended,
  };
}

function sanitizeStrings(items, max = 8, length = 700) {
  return (Array.isArray(items) ? items : []).slice(0, max).map((item) => String(item || '').trim().slice(0, length)).filter(Boolean);
}

function sanitizePlan(input, item) {
  const fallback = seedPlan(item.snapshot);
  const value = input && typeof input === 'object' ? input : {};
  const knownPaths = new Set(inventory.listGuides().map((guide) => guide.path));
  const changes = (Array.isArray(value.changes) ? value.changes : fallback.changes).slice(0, 10).map((entry, index) => ({
    id: String(entry.id || `change-${index + 1}`).replace(/[^a-z0-9-]/gi, '-').slice(0, 60),
    area: CHANGE_AREAS.includes(entry.area) ? entry.area : '본문', priority: ['P0', 'P1', 'P2'].includes(entry.priority) ? entry.priority : 'P1',
    enabled: entry.enabled !== false, action: String(entry.action || '').trim().slice(0, 500),
    currentState: String(entry.currentState || '').trim().slice(0, 900), proposedState: String(entry.proposedState || '').trim().slice(0, 1800),
    evidenceKeys: [...new Set((entry.evidenceKeys || ['content']).filter((key) => EVIDENCE_KEYS.has(key)))].slice(0, 5),
    targetMetric: String(entry.targetMetric || '').trim().slice(0, 160), requiresOfficialSource: !!entry.requiresOfficialSource,
  })).filter((entry) => entry.action && entry.proposedState);
  const internalLinks = (Array.isArray(value.internalLinks) ? value.internalLinks : fallback.internalLinks).slice(0, 6)
    .map((link) => ({ to: pathOnly(link?.to), reason: String(link?.reason || '').trim().slice(0, 400) }))
    .filter((link) => knownPaths.has(link.to) && link.to !== item.snapshot.guide.path);
  return normalizeObservationPlan({
    classification: CLASSIFICATIONS.includes(value.classification) ? value.classification : fallback.classification,
    goal: String(value.goal || fallback.goal || '').trim().slice(0, 1200),
    proposedTitle: String(value.proposedTitle || fallback.proposedTitle || '').trim().replace(/\s*\|\s*귀족\s*$/, '').slice(0, 90),
    proposedDescription: String(value.proposedDescription || fallback.proposedDescription || '').trim().slice(0, 240),
    quickAnswers: sanitizeStrings(value.quickAnswers?.length ? value.quickAnswers : fallback.quickAnswers, 3, 260),
    changes, sectionPlan: (Array.isArray(value.sectionPlan) ? value.sectionPlan : fallback.sectionPlan).slice(0, 8).map((section) => ({
      action: ['유지', '추가', '수정', '삭제'].includes(section?.action) ? section.action : '수정',
      heading: String(section?.heading || '').trim().slice(0, 160), detail: String(section?.detail || '').trim().slice(0, 1400),
    })).filter((section) => section.heading && section.detail),
    internalLinks, preserve: sanitizeStrings(value.preserve?.length ? value.preserve : fallback.preserve),
    observations: sanitizeStrings(value.observations?.length ? value.observations : fallback.observations),
    pageQueryReview: value.pageQueryReview && typeof value.pageQueryReview === 'object' ? {
      confirmed: value.pageQueryReview.confirmed === true,
      mismatch: String(value.pageQueryReview.mismatch || '').trim().slice(0, 1400),
      selectedQueries: sanitizeStrings(value.pageQueryReview.selectedQueries, 5, 500),
      contextFingerprint: String(value.pageQueryReview.contextFingerprint || ''),
      evidence: require('./updatePolicyService').pageQueryIdentity(value.pageQueryReview.evidence),
    } : fallback.pageQueryReview,
    risks: sanitizeStrings(value.risks?.length ? value.risks : fallback.risks), confidence: ['high', 'medium', 'low'].includes(value.confidence) ? value.confidence : fallback.confidence,
  }, item.snapshot);
}

function applyServerGuards(plan, item) {
  plan = normalizeObservationPlan(plan, item.snapshot);
  const addRisk = (message) => {
    if (!plan.risks.includes(message)) plan.risks.unshift(message);
  };
  const snippetChanged = plan.proposedTitle !== item.snapshot.content.title || plan.proposedDescription !== item.snapshot.content.description;
  if (item.snapshot.guards.keepSnippet && snippetChanged) {
    addRisk('서버 보호: 현재 CTR이 기대치에 근접해 제목 변경은 기본 비활성 검토 대상입니다. 변경 전후를 별도 기간으로 측정하세요.');
    for (const entry of plan.changes) if (entry.area === '제목·설명') entry.enabled = false;
  }
  if (item.snapshot.guards.keepNaverSnippet && snippetChanged) {
    const reason = item.snapshot.guards.naverRank
      ? `현재 네이버 웹검색 ${item.snapshot.guards.naverRank}위 페이지`
      : '현재 Naver 웹검색 TOP 30에서 전체 평균 이상 CTR을 기록한 페이지';
    addRisk(`서버 보호: ${reason}이므로 제목·설명 변경을 기본 비활성화합니다. 본문과 내부링크만 최소 수정하세요.`);
    for (const entry of plan.changes) if (entry.area === '제목·설명') entry.enabled = false;
  }
  if (item.snapshot.guide.isCustom) {
    addRisk('보호 페이지: 진단 결과는 참고용이며 자동 수정 작업을 만들 수 없습니다.');
    for (const entry of plan.changes) entry.enabled = false;
  }
  if (item.snapshot.guards.keepSnippet || item.snapshot.guards.keepNaverSnippet) {
    plan.proposedTitle = item.snapshot.content.title;
    plan.proposedDescription = item.snapshot.content.description;
    for (const entry of plan.changes) if (entry.area === '제목·설명') entry.enabled = false;
  }
  if (item.snapshot.guards.recentObservationHold) {
    addRisk(`관찰 보호: 최근 콘텐츠 변경일 ${item.snapshot.guards.changeDate} 기준 D+31인 ${item.snapshot.guards.observeUntil}까지 자동 수정을 보류합니다.`);
    for (const entry of plan.changes) entry.enabled = false;
  }
  return plan;
}

function reconcileServerGuards() {
  const rows = currentAuditRows().filter((item) => item.aiAnalysis && item.plan);
  const update = db.prepare('UPDATE content_audits SET plan_json=?, updated_at=? WHERE id=?');
  let updated = 0;
  db.transaction(() => {
    for (const item of rows) {
      const before = JSON.stringify(item.plan);
      const plan = applyServerGuards(structuredClone(item.plan), item);
      const after = JSON.stringify(plan);
      if (before === after) continue;
      update.run(after, nowIso(), item.id);
      updated++;
    }
  })();
  return { checked: rows.length, updated };
}

function storeAnalysis(item, analysis) {
  const safe = {
    slug: item.guideSlug,
    classification: CLASSIFICATIONS.includes(analysis.classification) ? analysis.classification : item.snapshot.classification,
    summary: String(analysis.summary || '').trim().slice(0, 1400), searchIntent: String(analysis.searchIntent || '').trim().slice(0, 900),
    currentStrengths: sanitizeStrings(analysis.currentStrengths, 6), currentProblems: sanitizeStrings(analysis.currentProblems, 8),
    confidence: ['high', 'medium', 'low'].includes(analysis.confidence) ? analysis.confidence : 'medium', caveats: sanitizeStrings(analysis.caveats, 6),
  };
  let changes = analysis.plan?.changes;
  if (item.snapshot.queryEvidence?.canRecommendTitleKeywords && Array.isArray(changes)) {
    let keptTitle = false;
    changes = changes.filter(entry => {
      if (entry.area !== '제목·설명') return true;
      if (keptTitle) return false;
      keptTitle = true;
      return true;
    })
      .map(entry => entry.area === '제목·설명' ? { ...entry, id: PAGE_QUERY_CHANGE_ID, enabled: false } : entry);
  }
  const plan = applyServerGuards(sanitizePlan({ ...analysis.plan, changes, classification: safe.classification, confidence: safe.confidence }, item), item);
  db.prepare(`
    UPDATE content_audits SET ai_analysis_json=?, plan_json=?, plan_status='suggested', status='ready', model='gpt-5.6-terra', error=NULL, updated_at=? WHERE id=?
  `).run(JSON.stringify(safe), JSON.stringify(plan), nowIso(), item.id);
}

async function analyze({ slugs = null, limit = 10, all = false, force = false, onProgress = null } = {}) {
  scanAll();
  let rows = currentAuditRows().sort((a, b) => b.snapshot.scores.priority - a.snapshot.scores.priority);
  if (Array.isArray(slugs) && slugs.length) {
    const selected = new Set(slugs.map(String));
    rows = rows.filter((row) => selected.has(row.guideSlug));
  } else {
    // Observation-held and read-only pages do not need paid rewriting plans by default.
    rows = rows.filter(row => !row.snapshot.guide.isCustom && !row.snapshot.guards.recentObservationHold && seedPlan(row.snapshot).changes.some(entry => entry.enabled));
    if (!all) rows = rows.filter((row) => force || row.status !== 'ready').slice(0, Math.max(1, Math.min(30, Number(limit) || 10)));
  }
  if (!force) rows = rows.filter((row) => row.status !== 'ready');
  if (!rows.length) {
    onProgress?.({ phase: 'complete', requested: 0, completed: 0, analyzed: 0, failed: 0 });
    return { requested: 0, analyzed: 0, failed: 0, skipped: true };
  }
  const requested = rows.length;
  let analyzed = 0;
  let failed = 0;
  let completed = 0;
  onProgress?.({ phase: 'running', requested, completed, analyzed, failed });
  for (let offset = 0; offset < rows.length; offset += BATCH_SIZE) {
    require('./jobService').throwIfCancelled();
    const batch = rows.slice(offset, offset + BATCH_SIZE);
    const ids = batch.map((item) => item.id);
    db.prepare(`UPDATE content_audits SET status='analyzing', error=NULL, updated_at=? WHERE id IN (${ids.map(() => '?').join(',')})`).run(nowIso(), ...ids);
    try {
      const result = await completeJson({
        generationId: null, stage: 'existing_content_audit', model: 'gpt-5.6-terra', effort: 'medium',
        schemaName: 'noblesse_existing_content_audits', schema: auditSchema,
        instructions: [
          '귀족 종로 귀금속 사이트의 기존 가이드 노출 가능성을 정밀 진단합니다.',
          '입력의 숫자는 서버가 계산한 사실입니다. 숫자를 새로 만들거나 서로 다른 플랫폼 수치를 합산하지 마세요.',
          'pageQueryEvidence.pageQueryAvailable=false이면 이 페이지의 검색어가 확인되지 않았습니다. sitewideQueryReferences는 사이트 전체 참고 자료이며 이 페이지의 유입·노출이나 제목 변경 근거로 사용하지 마세요. CTR 저하만으로 키워드 삽입·제목 재작성을 지시하지 말고 필요한 근거를 caveats에 남기세요.',
          'pageQueryEvidence.pageQueryAvailable=true인 pageQueries만 해당 URL·기간에서 보고서에 표시된 실제 검색어입니다. 표시행 수가 0이어도 익명화·누락이 가능하므로 검색 수요가 0이라고 단정하지 마세요. 제목 수정은 검색어와 원문의 실제 불일치가 확인될 때만 검토하고, 사용자 검토 전에는 제목·설명 변경을 enabled=false로 제안하세요.',
          'Coverage는 개별 URL 정보가 없으므로 페이지 오류로 단정하지 마세요.',
          'technicalFindings의 state가 historical이면 과거 측정 신호입니다. 현재 오류로 분류하거나 기술 수정 작업을 제안하지 마세요.',
          'Naver 트렌드는 상대 지수이고 미측정·API 비활성은 성과 부진으로 간주하지 마세요.',
          'Naver metrics.naverWeb은 서치어드바이저 웹검색 TOP 30 URL 실측입니다. listed=false를 노출 0으로 해석하지 말고, listed=true일 때만 클릭·노출·CTR 근거로 사용하세요.',
      '제목·설명, 첫 화면, 본문 섹션, 내부링크, 출처를 실제로 어떻게 고칠지 문장 수준으로 제안하세요.',
      '공식 출처가 0개인 페이지는 출처 백필을 독립 작업으로 다루고, 기존 성과 제목과 본문은 유지한 채 출처·검토 신호만 보강하세요.',
          '각 항목은 실행에 필요한 구체성을 유지하되 같은 근거와 주의를 반복하지 말고 밀도 있게 작성하세요.',
          '관찰·측정·현상 유지 자체는 원고 변경 항목이 아닙니다. 구체적인 수정이 필요하지 않으면 changes를 빈 배열로 반환하고 이유를 caveats에 기록하세요.',
          '가격·제작 기간·수리 가능성·보석 등급·인증은 입력 근거 없이 만들지 말고 requiresOfficialSource를 true로 표시하세요.',
          'allowedInternalLinks에 없는 내부 링크를 제안하지 마세요.',
          '자동 편집은 이 글의 제목·설명, 첫 화면, 본문(비교표 포함), 출처, 관련 링크만 바꿀 수 있습니다. 다른 글에서 들어오는 링크, URL 통합·리디렉션·서버 설정 수정은 자동 변경 항목으로 만들지 말고 caveats에 별도 검토로 남기세요.',
          'serverGuards.keepSnippet 또는 keepNaverSnippet이 true면 성과 제목을 보존하고 변경이 꼭 필요할 때만 위험을 명시하세요.',
          '보호 페이지도 진단하되 자동 수정 대상으로 지시하지 마세요.',
          '각 분석은 입력 slug를 정확히 한 번 반환하세요.',
        ].join('\n'),
        input: JSON.stringify({ pages: batch.map(aiContext) }), maxOutputTokens: 16000,
      });
      const bySlug = new Map((result.parsed.analyses || []).map((analysis) => [analysis.slug, analysis]));
      require('./jobService').throwIfCancelled();
      for (const item of batch) {
        const analysis = bySlug.get(item.guideSlug);
        if (!analysis) {
          db.prepare(`UPDATE content_audits SET status='error', error=?, updated_at=? WHERE id=?`).run('Terra 응답에서 이 페이지 분석이 누락됐습니다.', nowIso(), item.id);
          failed++;
        } else { storeAnalysis(item, analysis); analyzed++; }
      }
    } catch (error) {
      for (const item of batch) db.prepare(`UPDATE content_audits SET status='error', error=?, updated_at=? WHERE id=?`).run(error.message, nowIso(), item.id);
      failed += batch.length;
      if (error.transportFailure || ['JOB_CANCELLED','JOB_DEADLINE','JOB_BUDGET_EXCEEDED'].includes(error.code) || error.name === 'AbortError' || [401, 403, 429].includes(error.status)) throw error;
    }
    completed += batch.length;
    onProgress?.({ phase: 'running', requested, completed, analyzed, failed });
  }
  const result = { requested, analyzed, failed, model: 'gpt-5.6-terra', reasoningEffort: 'medium' };
  onProgress?.({ phase: 'complete', requested, completed, analyzed, failed });
  return result;
}

function jobStatus() {
  const jobs = require('./jobService');
  const id = db.prepare("SELECT id FROM background_jobs WHERE action='audits' ORDER BY created_at DESC, rowid DESC LIMIT 1").get()?.id || activeJob?.backgroundJobId;
  if (!id) return { id: null, state: 'idle', requested: 0, completed: 0, analyzed: 0, failed: 0 };
  const job = jobs.get(id);
  const progress = job.events.filter(event => event.stage === 'audit-progress').at(-1) || {};
  return { id, backgroundJobId: id, requested: 0, completed: 0, analyzed: 0, failed: 0,
    ...(activeJob?.backgroundJobId === id ? activeJob : {}), ...progress, ...(job.result || {}), id, backgroundJobId: id,
    state: ['queued','running','cancelling'].includes(job.state) ? 'running' : job.state,
    phase: job.state === 'done' ? 'complete' : job.state,
    startedAt: job.startedAt, finishedAt: job.finishedAt, error: job.error,
  };
}

function startAnalyze(options = {}) {
  const current = jobStatus();
  if (current.state === 'running') return { ...current, alreadyRunning: true };
  const stamp = nowIso();
  activeJob = {
    id: `audit-${Date.now()}`,
    state: 'running', phase: 'starting', requested: 0, completed: 0, analyzed: 0, failed: 0,
    options: { all: !!options.all, limit: Number(options.limit || 10), slugs: Array.isArray(options.slugs) ? options.slugs : null, force: !!options.force },
    model: 'gpt-5.6-terra', reasoningEffort: 'medium', startedAt: stamp, updatedAt: stamp, finishedAt: null, error: null,
  };
  const job = require('./jobService').submit('audits', { body: activeJob.options }, {
    keys: ['audits'], timeoutMs: 60 * 60 * 1000, maxCalls: 70, maxTokens: 900000, retryMode: 'resume',
  });
  activeJob.backgroundJobId = job.id;
  return jobStatus();
}

require('./jobService').register('audits', ({ body }) => analyze({ ...body,
  onProgress(progress) {
    activeJob = { ...activeJob, ...progress, updatedAt: nowIso() };
    require('./jobService').event('audit-progress', progress);
  },
}));

function savePlan(slug, input) {
  scanAll();
  const item = detail(slug);
  if (!item) throw Object.assign(new Error('진단할 가이드를 찾을 수 없습니다'), { status: 404 });
  const plan = applyServerGuards(sanitizePlan(input, item), item);
  require('./updatePolicyService').validatePlanCapabilities(plan);
  require('./updatePolicyService').validatePageQueryReview(plan, { ...item.snapshot, contextFingerprint: item.snapshot.contextFingerprint });
  assertExecutablePlan(plan);
  db.prepare(`UPDATE content_audits SET plan_json=?, plan_status='edited', updated_at=? WHERE id=?`).run(JSON.stringify(plan), nowIso(), item.id);
  return detail(slug);
}

function createUpdate(slug, input = {}) {
  scanAll();
  let item = detail(slug);
  if (!item) throw Object.assign(new Error('진단할 가이드를 찾을 수 없습니다'), { status: 404 });
  if (item.snapshot.guide.isCustom) throw Object.assign(new Error('보호 가이드는 진단만 가능하고 자동 수정할 수 없습니다'), { status: 422 });
  if (item.snapshot.guards.recentObservationHold) {
    throw Object.assign(new Error(`최근 수정 가이드는 ${item.snapshot.guards.observeUntil}까지 D+31 관찰 후 수정할 수 있습니다`), { status: 422 });
  }
  if (input.plan) item = savePlan(slug, input.plan);
  const fingerprint = item.snapshot.contextFingerprint;
  const explicitlyReviewed = input.confirmCurrent === true && input.contextFingerprint === fingerprint;
  if (item.status !== 'ready' && !explicitlyReviewed) throw Object.assign(new Error('현재 원문과 지표를 확인한 뒤 검토 확인을 선택하거나 최신 AI 분석을 실행해 주세요'), { status: 409, code: 'AUDIT_REVIEW_REQUIRED' });
  const plan = applyServerGuards(structuredClone(item.plan), item);
  require('./updatePolicyService').validatePlanCapabilities(plan);
  require('./updatePolicyService').validatePageQueryReview(plan, { ...item.snapshot, contextFingerprint: item.snapshot.contextFingerprint });
  assertExecutablePlan(plan);
  db.prepare(`UPDATE content_audits SET plan_status=?, plan_json=?, updated_at=? WHERE id=?`).run(explicitlyReviewed ? 'reviewed_current' : 'confirmed', JSON.stringify(plan), nowIso(), item.id);
  const generation = generations.createGeneration({
    targetSlug: slug, topic: item.snapshot.content.keyword || item.snapshot.guide.keyword,
    category: item.snapshot.content.category || item.snapshot.guide.category,
    inquiryType: item.snapshot.content.category === '수리' ? 'repair' : 'custom',
    auditId: item.id, auditPlan: plan, reviewedContextFingerprint: fingerprint,
  });
  db.prepare(`UPDATE content_audits SET plan_status='generation_started', updated_at=? WHERE id=?`).run(nowIso(), item.id);
  return generation;
}

module.exports = {
  ANALYSIS_VERSION, CLASSIFICATIONS, auditSchema, buildSnapshots, scanAll, report, detail, analyze, startAnalyze, jobStatus, savePlan, createUpdate,
  sanitizePlan, applyServerGuards, reconcileServerGuards, scoreContent, deterministicChanges, observationWindow,
  classify, seedPlan, normalizeObservationPlan,
};
