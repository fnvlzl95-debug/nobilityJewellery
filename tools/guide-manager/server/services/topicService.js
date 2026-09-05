const { db, getSetting, setSetting } = require('../lib/db');
const { clamp, nowIso, sha256 } = require('../lib/utils');
const { latestImport, latestGa4PagesImport } = require('./analyticsService');
const { listGuides, listClusters } = require('./inventoryService');
const { completeJson } = require('./openaiService');
const { businessScore, jaccard } = require('./opportunityService');
const naver = require('./naverService');

const CACHE_KEY = 'topic_strategy_cache_v2';
const CACHE_MAX_AGE_MS = 12 * 60 * 60 * 1000;
const TOPIC_MODEL = 'gpt-5.6-terra';
const SCORING_VERSION = 4;
const METHODOLOGY = 'Google 수요 30% + 순위 상승 여지 15% + Naver 상대 수요 15% + 사업 연관성 10% + GA4 주제군 반응 10% + 중복 회피 15% + 내부링크 적합도 5%';

const topicStrategySchema = {
  type: 'object',
  additionalProperties: false,
  required: ['analysisSummary', 'candidates'],
  properties: {
    analysisSummary: { type: 'string', minLength: 1 },
    candidates: {
      type: 'array', minItems: 6, maxItems: 10,
      items: {
        type: 'object', additionalProperties: false,
        required: [
          'topic', 'primaryKeyword', 'slug', 'workingTitle', 'category', 'inquiryType',
          'intent', 'cluster', 'evidenceQueries', 'supportingKeywords', 'reason',
          'contentGap', 'cannibalizationNote',
        ],
        properties: {
          topic: { type: 'string', minLength: 2 },
          primaryKeyword: { type: 'string', minLength: 2 },
          slug: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
          workingTitle: { type: 'string', minLength: 4 },
          category: { enum: ['가격', '비용', '기간', '수리', '관리', '선택', '소재·보석', '주문'] },
          inquiryType: { enum: ['custom', 'repair', 'wholesale', 'other'] },
          intent: { enum: ['정보 탐색', '비교 선택', '문제 해결', '구매 준비', '방문 상담'] },
          cluster: { enum: ['wedding', 'repair', 'gold-weight', 'gemstone', 'selection', 'care', 'local-commerce', 'other'] },
          evidenceQueries: { type: 'array', minItems: 1, maxItems: 10, items: { type: 'string', minLength: 1 } },
          supportingKeywords: { type: 'array', minItems: 2, maxItems: 8, items: { type: 'string', minLength: 1 } },
          reason: { type: 'string', minLength: 1 },
          contentGap: { type: 'string', minLength: 1 },
          cannibalizationNote: { type: 'string', minLength: 1 },
        },
      },
    },
  },
};

function dynamicTopicStrategySchema(clusters = listClusters()) {
  const schema = structuredClone(topicStrategySchema);
  const ids = clusters.map((cluster) => cluster.id).filter(Boolean);
  schema.properties.candidates.items.properties.cluster.enum = [...new Set([...ids, 'other'])];
  return schema;
}

const genericTokens = new Set([
  '금', '귀금속', '주얼리', '쥬얼리', '가이드', '총정리', '정리', '기준', '확인', '방법', '추천',
  '보는법', '알아보기', '전', '할', '것', '반지', '목걸이', '팔찌', '귀걸이', '종로',
]);

function normalizeText(value) {
  return String(value || '').toLowerCase()
    .replace(/화이트\s*골드/g, '화이트골드')
    .replace(/랩\s*그로운/g, '랩그로운')
    .replace(/다이아몬드/g, '다이아')
    .replace(/캐럿/g, 'ct')
    .replace(/[^a-z0-9가-힣]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactText(value) {
  return normalizeText(value).replace(/\s+/g, '');
}

function tokenSet(value, { core = false } = {}) {
  const tokens = normalizeText(value).split(' ').filter(Boolean);
  return new Set(core ? tokens.filter((token) => !genericTokens.has(token)) : tokens);
}

function diceCoefficient(a, b) {
  const left = compactText(a);
  const right = compactText(b);
  if (!left && !right) return 1;
  if (left.length < 2 || right.length < 2) return left === right ? 1 : 0;
  const grams = (value) => {
    const result = [];
    for (let i = 0; i < value.length - 1; i++) result.push(value.slice(i, i + 2));
    return result;
  };
  const rightCounts = new Map();
  for (const gram of grams(right)) rightCounts.set(gram, (rightCounts.get(gram) || 0) + 1);
  let common = 0;
  const leftGrams = grams(left);
  for (const gram of leftGrams) {
    const count = rightCounts.get(gram) || 0;
    if (count) { common++; rightCounts.set(gram, count - 1); }
  }
  return (2 * common) / (leftGrams.length + Math.max(1, right.length - 1));
}

function coreCoverage(a, b) {
  const left = tokenSet(a, { core: true });
  const right = tokenSet(b, { core: true });
  if (!left.size || !right.size) return 0;
  let common = 0;
  for (const token of left) if (right.has(token)) common++;
  if (common === 1 && (left.size > 1 || right.size > 1)) {
    return common / Math.max(left.size, right.size);
  }
  return common / Math.min(left.size, right.size);
}

function semanticSimilarity(a, b) {
  const left = compactText(a);
  const right = compactText(b);
  const containment = left.length >= 4 && right.length >= 4 && (left.includes(right) || right.includes(left))
    ? Math.min(left.length, right.length) / Math.max(left.length, right.length)
    : 0;
  const coverage = coreCoverage(a, b);
  return clamp(Math.max(
    jaccard(a, b),
    diceCoefficient(a, b) * 0.9,
    containment >= 0.45 ? 0.72 + containment * 0.22 : containment,
    coverage >= 0.66 ? coverage * 0.9 : coverage * 0.72,
  ), 0, 1);
}

function candidateGuideSimilarity(candidate, guide) {
  const primaryToKeyword = semanticSimilarity(candidate.primaryKeyword, guide.keyword);
  const primaryToTitle = semanticSimilarity(candidate.primaryKeyword, guide.title);
  const topicToTitle = semanticSimilarity(candidate.topic, guide.title);
  const titleToTitle = semanticSimilarity(candidate.workingTitle, guide.title);
  const samePrimaryKeyword = compactText(candidate.primaryKeyword) === compactText(guide.keyword);
  const sameWorkingTitle = compactText(candidate.workingTitle) === compactText(guide.title);
  if (samePrimaryKeyword || sameWorkingTitle) return 1;

  // 짧은 대표 검색어가 긴 기존 제목에 포함된 것만으로 중복을 확정하지 않는다.
  // 대표 검색어·전체 주제·작업 제목이 같은 의도를 가리킬 때만 높은 점수를 준다.
  const titleConsensus = primaryToTitle * 0.4 + topicToTitle * 0.3 + titleToTitle * 0.3;
  const keywordTitleAgreement = primaryToKeyword * 0.55 + titleToTitle * 0.45;
  return clamp(Math.max(titleConsensus, keywordTitleAgreement), 0, 1);
}

function closestGuides(candidate, guides, limit = 3) {
  return guides.map((guide) => {
    const similarity = candidateGuideSimilarity(candidate, guide);
    return { slug: guide.slug, title: guide.title, keyword: guide.keyword, similarity: Number(similarity.toFixed(3)) };
  }).sort((a, b) => b.similarity - a.similarity).slice(0, limit);
}

function reconciledAnalysisSummary(summary, accepted, rejected) {
  if (accepted.length) return summary;
  const counts = new Map();
  for (const candidate of rejected) {
    for (const reason of candidate.rejectionReasons || []) counts.set(reason, (counts.get(reason) || 0) + 1);
  }
  const topReasons = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([reason]) => reason);
  return [
    `신규 후보 ${rejected.length}개를 검토했지만 서버 중복·수요 검증을 통과한 주제가 없습니다.`,
    topReasons.length ? `주요 보류 사유는 ${topReasons.join(' ')}입니다.` : '',
  ].filter(Boolean).join(' ');
}

function clusterKey(value) {
  const text = normalizeText(value);
  if (/(돌반지|돌잔치|백일반지)/.test(text)) return 'baby-gold';
  if (/(커플링|커플 반지)/.test(text)) return 'couple-ring';
  if (/(주문제작|맞춤제작|커스텀)/.test(text)) return 'custom';
  if (/(예물|웨딩|결혼|혼주)/.test(text)) return 'wedding';
  if (/(수리|끊어|휘어|부러|빠짐|리세팅|사이즈 줄|사이즈 늘)/.test(text)) return 'repair';
  if (/(한돈|1돈|무게|그램|함량|순도|각인|585|750|925|시세)/.test(text)) return 'gold-weight';
  if (/(다이아|보석|루비|사파이어|에메랄드|오팔|진주|가넷|탄생석)/.test(text)) return 'gemstone';
  if (/(세척|보관|관리|변색|광택)/.test(text)) return 'repair';
  if (/(종로|도매|매입|방문|예약)/.test(text)) return 'custom';
  if (/(종류|길이|사이즈|고르는|선택|차이|스타일)/.test(text)) return 'custom';
  return 'other';
}

function matchedQueryRows(candidate, queries) {
  const evidence = new Set((candidate.evidenceQueries || []).map(normalizeText));
  const exact = queries.filter((row) => evidence.has(normalizeText(row.query)));
  if (exact.length) return exact;
  const comparison = [candidate.primaryKeyword, candidate.topic, ...(candidate.supportingKeywords || [])];
  return queries.filter((row) => Math.max(...comparison.map((value) => semanticSimilarity(value, row.query))) >= 0.72);
}

function weightedPosition(rows) {
  const impressions = rows.reduce((sum, row) => sum + Number(row.impressions || 0), 0);
  if (!impressions) return null;
  return rows.reduce((sum, row) => sum + Number(row.position || 0) * Number(row.impressions || 0), 0) / impressions;
}

function opportunityFromPosition(position) {
  if (position == null) return 25;
  if (position <= 3) return 68;
  if (position <= 10) return 100;
  if (position <= 20) return 82;
  if (position <= 35) return 58;
  if (position <= 60) return 32;
  return 15;
}

function scoreTopicCandidates({ candidates, guides, queries, ga4BySlug = new Map(), naverTrends = {}, naverWeb = {}, requireDemandEvidence = true }) {
  const clusterCounts = new Map();
  for (const guide of guides) {
    const key = clusterKey(`${guide.title} ${guide.keyword} ${guide.category}`);
    clusterCounts.set(key, (clusterCounts.get(key) || 0) + 1);
  }
  const prepared = candidates.map((candidate, index) => {
    const id = candidate.id || `${candidate.slug || 'candidate'}-${index + 1}`;
    const nearestGuides = closestGuides(candidate, guides);
    const matches = matchedQueryRows(candidate, queries);
    const googleImpressions = matches.reduce((sum, row) => sum + Number(row.impressions || 0), 0);
    const googleClicks = matches.reduce((sum, row) => sum + Number(row.clicks || 0), 0);
    const googlePosition = weightedPosition(matches);
    const key = candidate.cluster && candidate.cluster !== 'other' ? candidate.cluster : clusterKey(`${candidate.topic} ${candidate.primaryKeyword}`);
    const relatedCount = guides.filter((guide) => Math.max(
      semanticSimilarity(candidate.primaryKeyword, guide.keyword),
      semanticSimilarity(candidate.topic, guide.title),
    ) >= 0.22).length;
    const relatedGuides = guides.filter((guide) => Math.max(
      semanticSimilarity(candidate.primaryKeyword, guide.keyword),
      semanticSimilarity(candidate.topic, guide.title),
    ) >= 0.22);
    const relatedGa4Views = relatedGuides.reduce((sum, guide) => sum + Number(ga4BySlug.get(guide.slug)?.views || 0), 0);
    const rejectionReasons = [];
    const compact = compactText(candidate.primaryKeyword);
    if (compact.length < 3) rejectionReasons.push('대표 검색어가 너무 넓어 단일 검색 의도를 만들기 어렵습니다.');
    if (guides.some((guide) => guide.slug === candidate.slug)) rejectionReasons.push('이미 사용 중인 slug입니다.');
    if (nearestGuides[0]?.similarity >= 0.72) rejectionReasons.push(`기존 글 “${nearestGuides[0].title}”과 검색 의도가 겹칠 가능성이 높습니다.`);
    return {
      ...candidate,
      id,
      cluster: key,
      nearestGuides,
      rejectionReasons,
      matchedQueries: matches.slice(0, 12).map((row) => ({
        query: row.query, clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position,
      })),
      metrics: { googleImpressions, googleClicks, googlePosition, relatedGuideCount: relatedCount, relatedGa4Views, clusterGuideCount: clusterCounts.get(key) || 0 },
    };
  });
  const maxImpressions = Math.max(1, ...prepared.map((candidate) => candidate.metrics.googleImpressions));
  const maxGa4Views = Math.max(0, ...prepared.map((candidate) => candidate.metrics.relatedGa4Views));
  const maxNaverRatio = Math.max(0, ...prepared.map((candidate) => Number(naverTrends[candidate.id]?.ratio || 0)));
  return prepared.map((candidate) => {
    const trend = naverTrends[candidate.id] || null;
    const web = naverWeb[candidate.id] || null;
    const googleDemand = candidate.metrics.googleImpressions
      ? Math.log1p(candidate.metrics.googleImpressions) / Math.log1p(maxImpressions) * 100 : 12;
    const rankOpportunity = opportunityFromPosition(candidate.metrics.googlePosition);
    const naverDemand = trend?.ratio != null && maxNaverRatio > 0 ? trend.ratio / maxNaverRatio * 100 : 42;
    const business = businessScore(candidate.primaryKeyword, candidate.category);
    const audienceFit = candidate.metrics.relatedGa4Views && maxGa4Views > 0
      ? Math.log1p(candidate.metrics.relatedGa4Views) / Math.log1p(maxGa4Views) * 100 : 42;
    const novelty = (1 - (candidate.nearestGuides[0]?.similarity || 0)) * 100;
    const clusterOpportunity = clamp(42 + candidate.metrics.relatedGuideCount * 9 - candidate.metrics.clusterGuideCount * 1.4, 35, 96);
    const score = Math.round(
      googleDemand * 0.30
      + rankOpportunity * 0.15
      + naverDemand * 0.15
      + business * 0.10
      + audienceFit * 0.10
      + novelty * 0.15
      + clusterOpportunity * 0.05,
    );
    const rejectionReasons = [...candidate.rejectionReasons];
    if (requireDemandEvidence && !candidate.metrics.googleImpressions && trend?.ratio == null) rejectionReasons.push('현재 Google·Naver 자료에서 검색 수요 신호를 확인하지 못했습니다.');
    return {
      ...candidate,
      accepted: rejectionReasons.length === 0,
      rejectionReasons,
      score,
      scoreLabel: score >= 78 ? '우선 제작' : score >= 65 ? '강한 후보' : score >= 52 ? '검토 후보' : '보류',
      breakdown: {
        googleDemand: Math.round(googleDemand),
        rankOpportunity: Math.round(rankOpportunity),
        naverDemand: Math.round(naverDemand),
        business: Math.round(business),
        audienceFit: Math.round(audienceFit),
        novelty: Math.round(novelty),
        clusterOpportunity: Math.round(clusterOpportunity),
      },
      metrics: { ...candidate.metrics, naverTrend: trend, naverResults: web?.total ?? null, naverSource: web?.source || null },
      researchSignals: {
        naverTrend: trend,
        naverWeb: web ? {
          keyword: web.keyword,
          source: web.source,
          warning: web.warning,
          total: web.total,
          items: (web.items || []).slice(0, 5),
        } : null,
      },
    };
  }).sort((a, b) => Number(b.accepted) - Number(a.accepted) || b.score - a.score || b.metrics.googleImpressions - a.metrics.googleImpressions);
}

function analyticsContext() {
  const performance = latestImport('gsc_performance');
  if (!performance) throw new Error('먼저 GSC Performance 자료를 가져와 주세요');
  const queries = db.prepare(`
    SELECT query, clicks, impressions, ctr, position FROM gsc_queries
    WHERE import_id=? AND impressions >= 2 ORDER BY impressions DESC, position ASC LIMIT 120
  `).all(performance.id);
  const guides = listGuides();
  const clusters = listClusters();
  const ga4 = latestGa4PagesImport();
  const ga4Rows = ga4 ? db.prepare(`
    SELECT guide_slug AS slug, SUM(views) AS views, SUM(active_users) AS activeUsers,
      SUM(events) AS events, AVG(bounce_rate) AS bounceRate
    FROM ga4_pages WHERE import_id=? AND guide_slug IS NOT NULL GROUP BY guide_slug
  `).all(ga4.id) : [];
  const ga4BySlug = new Map(ga4Rows.map((row) => [row.slug, row]));
  return { performance, ga4, queries, guides, clusters, ga4Rows, ga4BySlug };
}

function strategySignature(context) {
  return sha256(JSON.stringify({
    importId: context.performance.id,
    period: [context.performance.periodStart, context.performance.periodEnd],
    guides: context.guides.map((guide) => [guide.slug, guide.title, guide.keyword, guide.updatedAt]),
  }));
}

function cachedReport(signature, context, limit) {
  try {
    const cached = JSON.parse(getSetting(CACHE_KEY, 'null'));
    if (!cached || cached.signature !== signature) return null;
    if (Date.now() - new Date(cached.generatedAt).getTime() > CACHE_MAX_AGE_MS) return null;
    if (cached.report.scoringVersion === SCORING_VERSION) return { ...cached.report, cached: true };
    const candidates = [...(cached.report.accepted || []), ...(cached.report.rejected || [])];
    if (!candidates.length) return null;
    const trends = Object.fromEntries(candidates.filter((item) => item.researchSignals?.naverTrend).map((item) => [item.id, item.researchSignals.naverTrend]));
    const web = Object.fromEntries(candidates.filter((item) => item.researchSignals?.naverWeb).map((item) => [item.id, item.researchSignals.naverWeb]));
    const rescored = scoreTopicCandidates({ candidates, guides: context.guides, queries: context.queries, ga4BySlug: context.ga4BySlug, naverTrends: trends, naverWeb: web });
    const accepted = rescored.filter((candidate) => candidate.accepted).slice(0, Math.max(1, Math.min(8, Number(limit) || 5)));
    const rejected = rescored.filter((candidate) => !candidate.accepted);
    const report = {
      ...cached.report,
      scoringVersion: SCORING_VERSION,
      methodology: METHODOLOGY,
      analysisSummary: reconciledAnalysisSummary(cached.report.analysisSummary, accepted, rejected),
      recommended: accepted[0] || null,
      accepted,
      rejected,
    };
    setSetting(CACHE_KEY, JSON.stringify({ signature, generatedAt: cached.generatedAt, report }));
    return { ...report, cached: true };
  } catch (_) { return null; }
}

function modelInput(context) {
  return [
    `GSC 측정 기간: ${context.performance.periodStart}~${context.performance.periodEnd}`,
    'GSC 검색어(익명화 때문에 전체 합계와 다를 수 있으며, 아래 행만 수요 단서로 사용):',
    JSON.stringify(context.queries.map((row) => ({
      query: row.query, impressions: row.impressions, clicks: row.clicks, ctr: row.ctr, position: row.position,
    }))),
    '현재 가이드 인벤토리(이들과 같은 검색 의도는 후보로 내지 말 것):',
    JSON.stringify(context.guides.map((guide) => ({ slug: guide.slug, title: guide.title, keyword: guide.keyword, category: guide.category }))),
    '현재 내부링크 클러스터:',
    JSON.stringify(context.clusters),
    context.ga4 ? `GA4 측정 기간(검색 노출과 합산하지 말고 기존 주제군의 이용 신호로만 사용): ${context.ga4.periodStart}~${context.ga4.periodEnd}` : '',
    context.ga4 ? JSON.stringify(context.ga4Rows.sort((a, b) => b.views - a.views).slice(0, 30)) : '',
  ].join('\n\n');
}

async function suggestTopics({ limit = 5, force = false, complete = completeJson, naverClient = naver } = {}) {
  const context = analyticsContext();
  const signature = strategySignature(context);
  if (!force) {
    const cached = cachedReport(signature, context, limit);
    if (cached) return cached;
  }
  const result = await complete({
    generationId: null,
    stage: 'topic_strategy_terra',
    model: TOPIC_MODEL,
    effort: 'medium',
    schemaName: 'noblesse_topic_strategy',
    schema: dynamicTopicStrategySchema(context.clusters),
    instructions: [
      '귀족 종로 귀금속 사이트의 다음 신규 가이드 주제를 고르는 선임 검색 전략가입니다.',
      '목표는 글 수가 아니라 실제 검색 노출 가능성, 명확한 검색 의도, 상담과의 자연스러운 연결입니다.',
      '현재 가이드의 제목·대표 검색어·검색 의도와 겹치는 후보는 절대 제안하지 마세요. 표현만 다른 동의 주제도 제외하세요.',
      'GSC 검색어는 자사 도메인이 이미 반응한 주제군을 보여주는 수요 단서입니다. evidenceQueries에는 입력에 실제 있는 검색어만 정확히 복사하세요.',
      '단일 검색어를 그대로 반복하지 말고, 여러 관련 검색어가 가리키지만 아직 독립 문서가 없는 하위 의도를 찾으세요.',
      '검색량을 지어내지 마세요. Naver 검색 결과나 블로그는 사실 근거가 아니라 수요·의도 판단에만 사용됩니다.',
      '가격·제작 기간·수리 가능 여부 같은 영업 사실을 임의로 단정하지 않아도 완성할 수 있는 주제를 우선하세요.',
      '후보마다 기존 글과 왜 겹치지 않는지, 어떤 콘텐츠 공백을 채우는지 구체적으로 적으세요.',
      '광범위한 한 단어 주제보다 한 페이지로 답할 수 있는 구체적 롱테일 의도를 선택하세요.',
      'slug는 영어 소문자와 하이픈만 사용하세요.',
      `cluster는 현재 저장소에서 읽은 다음 id 중 가장 가까운 값을 고르세요: ${context.clusters.map((cluster) => cluster.id).join(', ')}. 해당 항목이 없을 때만 other를 쓰세요.`,
      '최종 순위는 서버가 실제 지표와 중복도를 다시 계산하므로 서로 다른 의도의 강한 후보 6~10개를 반환하세요.',
    ].join('\n'),
    input: modelInput(context),
    maxOutputTokens: 9000,
  });
  let preliminary = scoreTopicCandidates({ candidates: result.parsed.candidates, guides: context.guides, queries: context.queries, ga4BySlug: context.ga4BySlug, requireDemandEvidence: false });
  const naverTargets = preliminary.filter((candidate) => candidate.rejectionReasons.length === 0).slice(0, 5);
  const warnings = [];
  let trends = {};
  let web = {};
  if (naverTargets.length) {
    try {
      trends = await naverClient.trendCompare(naverTargets.map((candidate) => ({
        id: candidate.id, keyword: candidate.primaryKeyword, supportingKeywords: candidate.supportingKeywords,
      })));
    } catch (error) { warnings.push(`Naver 트렌드 비교 실패: ${error.message}`); }
    const webRows = await Promise.all(naverTargets.map(async (candidate) => {
      try { return [candidate.id, await naverClient.searchWeb(candidate.primaryKeyword, { display: 5 })]; }
      catch (error) { warnings.push(`Naver 웹문서 조사 실패 (${candidate.primaryKeyword}): ${error.message}`); return [candidate.id, null]; }
    }));
    web = Object.fromEntries(webRows.filter(([, value]) => value));
  }
  const scored = scoreTopicCandidates({ candidates: result.parsed.candidates, guides: context.guides, queries: context.queries, ga4BySlug: context.ga4BySlug, naverTrends: trends, naverWeb: web });
  const accepted = scored.filter((candidate) => candidate.accepted).slice(0, Math.max(1, Math.min(8, Number(limit) || 5)));
  const rejected = scored.filter((candidate) => !candidate.accepted);
  const report = {
    generatedAt: nowIso(),
    cached: false,
    scoringVersion: SCORING_VERSION,
    model: { requested: TOPIC_MODEL, effective: result.model || TOPIC_MODEL, reasoningEffort: 'medium', usage: result.usage || null },
    period: { source: 'GSC', start: context.performance.periodStart, end: context.performance.periodEnd, importId: context.performance.id },
    periods: {
      gsc: { start: context.performance.periodStart, end: context.performance.periodEnd, importId: context.performance.id },
      ga4: context.ga4 ? { start: context.ga4.periodStart, end: context.ga4.periodEnd, importId: context.ga4.id } : null,
    },
    inventory: { guides: context.guides.length, clusters: context.clusters.length },
    methodology: METHODOLOGY,
    caveat: '점수는 노출을 보장하는 예측이 아니라 현재 데이터로 후보를 비교하는 우선순위입니다.',
    analysisSummary: reconciledAnalysisSummary(result.parsed.analysisSummary, accepted, rejected),
    recommended: accepted[0] || null,
    accepted,
    rejected,
    warnings,
  };
  setSetting(CACHE_KEY, JSON.stringify({ signature, generatedAt: report.generatedAt, report }));
  return report;
}

module.exports = {
  TOPIC_MODEL, topicStrategySchema, dynamicTopicStrategySchema, normalizeText, semanticSimilarity, closestGuides, clusterKey,
  candidateGuideSimilarity, reconciledAnalysisSummary, matchedQueryRows,
  scoreTopicCandidates, analyticsContext, suggestTopics,
};
