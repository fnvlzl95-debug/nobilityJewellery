const fs = require('fs');
const { db } = require('../lib/db');
const { fileHash, koreaDate, sha256 } = require('../lib/utils');
const inventory = require('./inventoryService');
const { dataArray, constExpression, parseLiteral, extractGuideContent } = require('./contentExtractorService');

const AREA_FIELDS = {
  '제목·설명': ['title', 'description'], '첫 화면': ['lead', 'quickAnswers'],
  '본문': ['sections', 'cautions', 'faqItems'], '내부링크': ['relatedLinks'],
  '출처': ['sourceNote', 'sources'], '이미지': ['heroImage'],
};
const MANUAL_SCOPES = { sources: '출처', snippet: '제목·설명', intro: '첫 화면', body: '본문', links: '내부링크' };
const clone = (value) => structuredClone(value);
const fail = (message, code = 'UPDATE_POLICY') => { throw Object.assign(new Error(message), { status: 422, code }); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function validatePlanCapabilities(plan) {
  for (const change of plan?.changes || []) {
    if (!change.enabled) continue;
    // Match normalizeObservationPlan's semantic guards too: submitted or legacy IDs are not trusted.
    if (change.id === 'preserve-and-monitor' || change.action === '현재 구조 유지 후 다음 동일 기간 측정') fail('관찰 전용 계획은 원고를 변경하지 않습니다. 실제 수정 항목이 있을 때만 새 계획을 확정해 주세요.', 'MONITOR_ONLY_PLAN');
    if (change.id === 'improve-snippet' || change.area === '제목·설명' && /추정 관련 검색어|사이트 전체 검색어|sitewide|inferredQueries/i.test(`${change.action || ''} ${change.proposedState || ''}`)) fail('이 자동 CTR 제안에는 해당 페이지와 검색어를 함께 확인한 근거가 없습니다. 페이지별 검색어 자료를 확인한 뒤 구체적인 수정 계획을 확정해 주세요.', 'PAGE_QUERY_EVIDENCE_REQUIRED');
    if (!AREA_FIELDS[change.area]) fail(`“${change.area}” 작업은 원고 필드로 반영할 수 없습니다. 해당 항목은 별도 코드 작업으로 처리하고 이 계획에서는 해제해 주세요.`, 'UNSUPPORTED_PLAN');
    if (/역링크|인바운드|backlink|다른\s*(?:글|페이지).*링크|형제\s*(?:글|페이지).*링크|다중\s*파일/i.test(`${change.action} ${change.proposedState}`)) {
      fail('다른 페이지에서 들어오는 링크 수정은 이 단일 글 편집에서 지원하지 않습니다. 이 글의 관련 링크만 선택해 주세요.', 'UNSUPPORTED_PLAN');
    }
  }
  return plan;
}

function deriveScope(input = {}) {
  const plan = input.auditPlan;
  validatePlanCapabilities(plan);
  const enabled = plan ? (plan.changes || []).filter(item => item.enabled) : [{ area: MANUAL_SCOPES[input.updateScope || 'sources'] }];
  if (!enabled.length || enabled.some(item => !AREA_FIELDS[item.area])) fail('지원되는 수정 범위를 선택해 주세요. 기본 범위는 출처만 수정입니다.');
  let fields = [...new Set(enabled.flatMap(item => {
    if (!plan || item.area !== '본문') return AREA_FIELDS[item.area];
    const text = `${item.action || ''} ${item.proposedState || ''}`;
    return ['sections', ...(/FAQ|자주\s*묻는|질문\s*답변/i.test(text) ? ['faqItems'] : []), ...(/주의|금지|caution/i.test(text) ? ['cautions'] : [])];
  }))];
  const preserve = (plan?.preserve || []).map(String);
  // A reference to existing source URLs protects those entries; it does not forbid
  // adding evidence. Any separate reference to the sources field still locks it.
  const sourceUrlReference = /출처\s*(?:URLs?\b|주소)|\bsources?\s+URLs?\b/gi;
  const preserveSourceUrls = preserve.some(text => text.replace(sourceUrlReference, '') !== text);
  const explicitPreserve = [
    ['title', /제목|\btitle\b/i], ['description', /메타\s*설명|검색\s*설명|\bdescription\b/i],
    ['lead', /첫\s*문단|도입\s*문단|\blead\b/i], ['quickAnswers', /빠른\s*답변|핵심\s*답변|quickAnswers/i],
    ['sections', /(?:기존|전체)\s*본문(?:\s*전체)?(?:을|은)?\s*(?:유지|보존|그대로)|^\s*sections\s*$/i],
    ['faqItems', /FAQ|자주\s*묻는|faqItems/i], ['cautions', /주의\s*사항|cautions/i],
    ['relatedLinks', /관련\s*링크|relatedLinks/i],
  ].filter(([, pattern]) => preserve.some(text => pattern.test(text))).map(([field]) => field);
  if (preserve.some(text => /출처(?:\s|$)|\bsources\b/i.test(text.replace(sourceUrlReference, '')))) explicitPreserve.push('sources');
  fields = fields.filter(field => !explicitPreserve.includes(field));
  const visualText = enabled.filter(item => item.area === '본문' || item.area === '이미지').map(item => `${item.action || ''} ${item.proposedState || ''}`).join(' ');
  const visualChange = /(?:이미지|사진|image|비주얼)/i.test(visualText) && /추가|교체|생성|새로|보강|개선|replace|generate/i.test(visualText);
  const keepImages = preserve.some(text => /이미지|사진|image/i.test(text));
  const heroChange = !keepImages && (enabled.some(item => item.area === '이미지') || visualChange && /대표|hero/i.test(visualText));
  const bodyChange = !keepImages && fields.includes('sections') && visualChange && (/본문|섹션|section/i.test(visualText) || !heroChange);
  if (heroChange && !fields.includes('heroImage')) fields.push('heroImage');
  if (!fields.length) fail('활성 수정 항목이 보존 지시와 모두 겹칩니다. 변경할 범위를 다시 선택해 주세요.');
  return {
    fields, sectionPlan: fields.includes('sections') ? clone(plan?.sectionPlan || []) : [],
    preserveImages: !heroChange && !bodyChange, preserveHero: !heroChange, preserveBodyImages: !bodyChange,
    preserveFields: explicitPreserve,
    preserveSourceUrls,
    reviewNotes: [
      ...(preserve.length ? ['보존 지시의 명시 필드는 서버가 잠급니다. 사실·의도 등 자유 문장 조건은 원문과 근거를 함께 최종 검토해야 합니다.'] : []),
      ...(preserveSourceUrls && fields.includes('sources') ? ['기존 출처 항목은 그대로 보존하고 선택·검토한 새 출처만 추가합니다.'] : []),
    ],
    mode: plan ? 'audit' : input.updateScope || 'sources',
  };
}

function readOriginalDraft(guide, source = guide.source || fs.readFileSync(guide.sourcePath, 'utf8')) {
  const content = extractGuideContent(guide, source);
  const literal = (name, fallback = '') => parseLiteral(constExpression(source, name) || source.match(new RegExp(`\\bconst\\s+${name}\\s*=\\s*(\\d+)`))?.[1], fallback);
  const attr = (name) => source.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`))?.[1] || '';
  const image = (item) => item ? {
    path: item.src || item.path || '', alt: item.alt || '', caption: item.caption || '',
    prompt: item.prompt || 'Preserve the existing verified image without generating a replacement.',
    ...(item.width ? { width: item.width } : {}), ...(item.height ? { height: item.height } : {}),
  } : null;
  const sections = dataArray(source, 'sections').length ? dataArray(source, 'sections') : dataArray(source, 'gmSections');
  if (!content.title || !content.lead || !sections.length) fail('현재 글을 안전하게 구조화할 수 없습니다. 자동 수정 대신 소스 검토가 필요합니다.');
  return {
    slug: guide.slug, title: content.title, description: content.description, lead: content.lead,
    category: content.category, keyword: content.keyword,
    inquiryType: literal('gmInquiryType') || attr('inquiry-type') || (content.category === '수리' ? 'repair' : 'custom'),
    inquiryTopic: literal('gmInquiryTopic') || attr('inquiry-topic') || content.keyword,
    publishedAt: literal('publishedAt') || guide.publishedAt, updatedAt: literal('updatedAt') || guide.updatedAt || '',
    heroImage: image({ src: guide.image, alt: literal('gmHeroAlt') || attr('hero-alt') || content.title, caption: content.heroCaption || '', width: literal('gmHeroWidth', null), height: literal('gmHeroHeight', null) }),
    quickAnswers: dataArray(source, 'quickAnswers'),
    sections: sections.map(section => ({ ...section, bullets: section.bullets || [], image: image(section.image) })),
    cautions: dataArray(source, 'cautions'), faqItems: dataArray(source, 'faqItems'), relatedLinks: dataArray(source, 'relatedLinks'),
    sourceNote: content.sourceNote || attr('source-note') || '',
    sources: content.sources.map(source => ({ ...source, official: require('./generationService').officialDomain(source.url) })),
  };
}

function observationGuard(guide) {
  const latest = [guide.publishedAt, guide.updatedAt, guide.repositoryChangedAt].map(value => String(value || '').slice(0, 10)).filter(value => /^\d{4}-\d{2}-\d{2}$/.test(value)).sort().at(-1);
  if (!latest) return;
  const end = new Date(Date.parse(`${latest}T00:00:00Z`) + 31 * 86400000).toISOString().slice(0, 10);
  if (koreaDate() < end) fail(`최근 수정 가이드는 ${end}까지 D+31 관찰 후 수정할 수 있습니다`, 'OBSERVATION_HOLD');
}

function assertCreateUpdatePolicy(targetSlug, input = {}) {
  if (!targetSlug) return null;
  const guide = inventory.getGuide(targetSlug, { includeSource: true });
  if (!guide) fail('수정할 가이드를 찾을 수 없습니다');
  if (guide.isCustom || inventory.PROTECTED_SLUGS.has(targetSlug)) fail('보호 가이드는 자동 수정할 수 없습니다');
  observationGuard(guide);
  const scope = deriveScope(input);
  const audit = input.auditId ? db.prepare('SELECT * FROM content_audits WHERE id=? AND guide_slug=?').get(input.auditId, targetSlug) : null;
  const latestAudit = db.prepare('SELECT * FROM content_audits WHERE guide_slug=? ORDER BY updated_at DESC,id DESC LIMIT 1').get(targetSlug);
  const guards = JSON.parse((audit || latestAudit)?.snapshot_json || '{}').guards || {};
  if (scope.fields.includes('title') && (guards.keepSnippet || guards.keepNaverSnippet)) fail('검색 성과 보호 중인 제목·설명은 수정할 수 없습니다. 다른 범위를 선택해 주세요.', 'SNIPPET_PROTECTED');
  if (input.auditPlan) {
    const reviewed = audit && ['reviewed_current', 'generation_started'].includes(audit.plan_status)
      && input.reviewedContextFingerprint && input.reviewedContextFingerprint === JSON.parse(audit.snapshot_json || '{}').contextFingerprint;
    if (!audit || (audit.status !== 'ready' && !reviewed) || audit.source_hash !== fileHash(guide.sourcePath)) fail('최신 진단을 다시 확인한 뒤 수정 계획을 확정해 주세요.', 'STALE_AUDIT');
    const periods = JSON.parse(audit.snapshot_json || '{}').periods || {};
    const analytics = require('./analyticsService');
    const current = { gsc: analytics.latestImport('gsc_performance'), ga4: analytics.latestGa4PagesImport(), googleOrganic: analytics.latestImport('ga4_organic_landing'), naverWeb: analytics.latestImport('naver_web_performance'), coverage: analytics.latestImport('gsc_coverage') };
    for (const key of Object.keys(current)) if ((periods[key]?.importId || 0) !== (current[key]?.id || 0)) fail('분석 자료가 바뀌었습니다. 최신 자료로 재진단한 뒤 계획을 확정해 주세요.', 'STALE_AUDIT');
  }
  const baselineDraft = readOriginalDraft(guide);
  return { version: 1, scope, baselineDraft, baselineHash: sha256(JSON.stringify(baselineDraft)), sourceHash: fileHash(guide.sourcePath) };
}

function sectionKey(value) { return String(value || '').normalize('NFKC').replace(/[\s\p{P}\p{S}]+/gu, '').toLowerCase(); }
function mergeSections(baseline, draft, scope) {
  const keepImages = scope.preserveBodyImages ?? scope.preserveImages;
  if (!scope.sectionPlan.length) return draft.map((section, index) => ({ ...section, ...(keepImages ? { image: clone(baseline[index]?.image || null) } : {}) }));
  const next = clone(baseline);
  for (const task of scope.sectionPlan) {
    if (task.action === '유지') continue;
    const index = next.findIndex(section => sectionKey(section.title) === sectionKey(task.heading));
    const candidate = draft.find(section => sectionKey(section.title) === sectionKey(task.heading));
    if (task.action === '삭제') {
      if (index < 0) fail(`삭제할 본문 구간을 찾을 수 없습니다: ${task.heading}`);
      next.splice(index, 1); continue;
    }
    if (!candidate) fail(`계획한 본문 구간이 원고에 없습니다: ${task.heading}`);
    if (task.action === '추가') {
      if (index >= 0) fail(`추가 구간이 기존 제목과 중복됩니다: ${task.heading}`);
      next.push({ ...clone(candidate), ...(keepImages ? { image: null } : {}) });
    } else {
      if (index < 0) fail(`수정할 본문 구간을 정확한 기존 제목으로 지정해 주세요: ${task.heading}`);
      next[index] = { ...clone(candidate), ...(keepImages ? { image: clone(next[index].image) } : {}) };
    }
  }
  return next;
}

function policyFor(generation) {
  if (generation.kind !== 'update') return null;
  return generation.input?.updatePolicy || assertCreateUpdatePolicy(generation.target_slug, generation.input);
}

function appendSources(baseline, proposed) {
  if (!Array.isArray(baseline) || !Array.isArray(proposed)) fail('출처는 기존 항목을 보존한 배열로 제출해 주세요.');
  const result = clone(baseline);
  const urls = new Set(baseline.map(source => source.url));
  for (const source of proposed) {
    if (!source || typeof source.url !== 'string') fail('출처 항목에는 URL이 필요합니다.');
    if (urls.has(source.url)) continue;
    urls.add(source.url);
    result.push(clone(source));
  }
  return result;
}

function enforceDraftScope(generation, proposed) {
  const policy = policyFor(generation);
  if (!policy) return proposed;
  const { baselineDraft: baseline, scope } = policy;
  const result = clone(baseline);
  for (const field of scope.fields) if (Object.hasOwn(proposed, field)) result[field] = clone(proposed[field]);
  if (scope.preserveSourceUrls && scope.fields.includes('sources')) result.sources = appendSources(baseline.sources, result.sources);
  if (scope.fields.includes('sections')) result.sections = mergeSections(baseline.sections, proposed.sections || baseline.sections, scope);
  if (scope.preserveHero ?? scope.preserveImages) result.heroImage = clone(baseline.heroImage);
  result.updatedAt = koreaDate();
  return result;
}

function assertUpdatePolicy(generation, { draft = null, phase = 'review' } = {}) {
  if (generation.kind !== 'update') return null;
  const current = assertCreateUpdatePolicy(generation.target_slug, generation.input);
  const policy = policyFor(generation);
  if (policy.sourceHash !== current.sourceHash || generation.base_source_hash && generation.base_source_hash !== current.sourceHash) fail('수정 시작 뒤 원문이 바뀌었습니다. 새 원문으로 계획을 다시 확인해 주세요.', 'STALE_SOURCE');
  if (draft) {
    const merged = enforceDraftScope(generation, draft);
    const changed = Object.keys(policy.baselineDraft).filter(key => key !== 'updatedAt' && !same(draft[key], merged[key]));
    if (changed.length) fail(`선택하지 않은 영역이 변경됐습니다 (${changed.join(', ')}). 원문을 복원한 뒤 ${phase === 'apply' ? '반영' : '승인'}해 주세요.`, 'UPDATE_SCOPE_DRIFT');
  }
  return policy;
}

function needsHumanizer(generation) {
  const policy = policyFor(generation);
  return !policy || policy.scope.fields.includes('lead') || policy.scope.fields.includes('sections');
}

module.exports = { AREA_FIELDS, MANUAL_SCOPES, deriveScope, validatePlanCapabilities, readOriginalDraft, assertCreateUpdatePolicy, assertUpdatePolicy, enforceDraftScope, policyFor, needsHumanizer };
