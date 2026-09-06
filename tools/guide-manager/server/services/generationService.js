const fs = require('fs');
const path = require('path');
const { db, getSetting } = require('../lib/db');
const { config } = require('../lib/config');
const { nowIso, koreaDate, fileHash, slugify, sha256 } = require('../lib/utils');
const { guideDraftResponseSchema, evidenceSchema, validateEvidence, schemaErrors } = require('./draftSchema');
const { completeJson } = require('./openaiService');
const { lintDraft } = require('./lintService');
const { getGuide, guideIndexPath, listGuides, siteRoot, parseGuidePosts } = require('./inventoryService');
const { jaccard } = require('./opportunityService');
const { stripSectionNumbering, stripDraftSectionNumbering } = require('../lib/sectionTitle');
const { assertUniqueIntent } = require('./intentService');
const { assertCreateUpdatePolicy, assertUpdatePolicy, enforceDraftScope, policyFor, PAGE_QUERY_CHANGE_ID } = require('./updatePolicyService');
const jobs = require('./jobService');
const { researchInput } = require('./researchPrompt');

function parseGeneration(row) {
  if (!row) return null;
  const parsed = {
    ...row,
    input: JSON.parse(row.input_json || '{}'),
    research: JSON.parse(row.research_json || 'null'),
    draft: stripDraftSectionNumbering(JSON.parse(row.draft_json || 'null')),
    humanized: stripDraftSectionNumbering(JSON.parse(row.humanized_json || 'null')),
    lint: JSON.parse(row.lint_json || 'null'),
  };
  for (const key of ['input_json', 'research_json', 'draft_json', 'humanized_json', 'lint_json']) delete parsed[key];
  if (parsed.research?.official) parsed.research = { ...parsed.research, official: reclassifySources(parsed.research.official) };
  parsed.sourceReviewContexts = sourceReviewContexts(parsed);
  parsed.draft = reclassifySources(parsed.draft);
  parsed.humanized = reclassifySources(parsed.humanized);
  parsed.modelRuns = db.prepare(`
    SELECT id, stage, requested_model AS requestedModel, effective_model AS effectiveModel,
      reasoning_effort AS reasoningEffort, fallback_reason AS fallbackReason, status, usage_json AS usageJson,
      latency_ms AS latencyMs, error, created_at AS createdAt
    FROM model_runs WHERE generation_id = ? ORDER BY id
  `).all(row.id).map((run) => ({ ...run, usage: JSON.parse(run.usageJson || 'null'), usageJson: undefined }));
  parsed.images = db.prepare(`
    SELECT id, slot, section_index AS sectionIndex, prompt, alt_text AS altText, caption, public_path AS publicPath,
      archetype, content_hash AS contentHash, width, height, status, model, error, created_at AS createdAt, updated_at AS updatedAt
    FROM image_assets WHERE generation_id = ? ORDER BY id
  `).all(row.id);
  parsed.humanizeRuns = db.prepare(`
    SELECT id, engine_profile AS engineProfile, engine_version AS engineVersion, status,
      before_text AS beforeText, after_text AS afterText, facts_json AS factsJson, error, created_at AS createdAt
    FROM humanize_runs WHERE generation_id=? ORDER BY id DESC
  `).all(row.id).map((run) => ({ ...run, facts: JSON.parse(run.factsJson || 'null'), factsJson: undefined }));
  return parsed;
}

function getGeneration(id) {
  return parseGeneration(db.prepare('SELECT * FROM generations WHERE id = ?').get(id));
}

function sourceReviewContexts(generation) {
  const evidence = generation.research?.official;
  return (evidence?.sources || []).map(source => {
    const claims = (evidence.claims || []).filter(claim => String(claim.claim || '').trim() && (claim.sourceUrls || []).includes(source.url));
    const fingerprint = sha256(JSON.stringify({ source: { url: source.url, label: source.label, reason: source.reason || '', note: source.note || '', official: officialDomain(source.url) }, claims }));
    const saved = (generation.research?.sourceReviews || []).find(review => review.url === source.url);
    const current = saved?.fingerprint === fingerprint;
    return { url: source.url, fingerprint, claims, status: current ? saved.status : saved ? 'review_expired' : 'unreviewed', review: current ? saved : null };
  });
}

function assertSourceReview(generation, url, { requireOperatorReview = false } = {}) {
  if (generation.input?.sourceReviewVersion !== 1) return;
  const context = sourceReviewContexts(generation).find(item => item.url === url);
  if (!context || !['operator_reviewed', 'automatic_research'].includes(context.status)) throw Object.assign(new Error(`출처 또는 조사 주장이 변경되었습니다. 최신 문서를 대조한 확인 위치와 메모를 저장해 주세요: ${url}`), { status: 422, code: 'SOURCE_REVIEW_REQUIRED' });
  if (requireOperatorReview && context.status !== 'operator_reviewed') throw Object.assign(new Error(`자동 조사 출처는 아직 운영자가 검토하지 않았습니다. 출처 탭에서 실제 문서의 확인 위치와 메모를 저장한 뒤 승인해 주세요: ${url}`), { status: 422, code: 'SOURCE_REVIEW_REQUIRED' });
}

function listGenerations({ includeArchived = false } = {}) {
  return db.prepare(`
    SELECT id, target_slug AS targetSlug, kind, topic, status, error, approved_at AS approvedAt,
      archived_at AS archivedAt, created_at AS createdAt, updated_at AS updatedAt
    FROM generations ${includeArchived ? '' : 'WHERE archived_at IS NULL'} ORDER BY updated_at DESC, id DESC LIMIT 300
  `).all();
}

// applies·content_baselines는 CASCADE가 아니므로 반영 이력이 있으면 지우지 않고 보관 처리한다.
function deleteGeneration(id) {
  const generation = db.prepare('SELECT id, topic FROM generations WHERE id = ?').get(id);
  if (!generation) throw Object.assign(new Error('삭제할 작업을 찾을 수 없습니다'), { status: 404 });
  const applied = db.prepare('SELECT COUNT(*) AS total FROM applies WHERE generation_id = ?').get(id).total
    + db.prepare('SELECT COUNT(*) AS total FROM content_baselines WHERE generation_id = ?').get(id).total;
  if (applied) {
    const stamp = nowIso();
    db.prepare('UPDATE generations SET archived_at = ?, updated_at = ? WHERE id = ?').run(stamp, stamp, id);
    return { id, mode: 'archived', message: '저장소 반영 이력이 있어 기록은 남기고 목록에서만 숨겼습니다.' };
  }
  db.prepare('DELETE FROM generations WHERE id = ?').run(id);
  try { fs.rmSync(path.join(config.dataDir, 'images', String(id)), { recursive: true, force: true }); } catch (_) { /* 이미지 폴더가 없어도 삭제는 성공으로 본다. */ }
  return { id, mode: 'deleted', message: '작업과 생성 이미지를 삭제했습니다.' };
}

function deleteGenerations(ids) {
  const list = (Array.isArray(ids) ? ids : []).map(Number).filter((value) => Number.isInteger(value) && value > 0);
  if (!list.length) throw Object.assign(new Error('삭제할 작업을 선택해 주세요'), { status: 422 });
  const results = [];
  for (const id of list) {
    try { results.push(deleteGeneration(id)); }
    catch (error) { results.push({ id, mode: 'error', message: error.message }); }
  }
  return {
    results,
    deleted: results.filter((item) => item.mode === 'deleted').length,
    archived: results.filter((item) => item.mode === 'archived').length,
    failed: results.filter((item) => item.mode === 'error').length,
  };
}

function createGeneration(input) {
  const target = input.targetSlug ? getGuide(input.targetSlug, { includeSource: true }) : null;
  if (target?.isCustom) throw new Error('커스텀 가이드 2개는 읽기 전용입니다');
  if (input.targetSlug && !target) throw Object.assign(new Error('수정할 가이드를 찾을 수 없습니다'), { status: 404 });
  const topic = String(input.topic || target?.keyword || '').trim();
  if (!topic) throw new Error('주제를 입력해 주세요');
  const updatePolicy = target ? assertCreateUpdatePolicy(target.slug, input) : null;
  const selectedCluster = target ? null : require('./clusterService').validateClusterSelection(input.topicDecision?.cluster ?? input.cluster);
  assertUniqueIntent({ topic, primaryKeyword: input.topicDecision?.primaryKeyword || topic, slug: input.slug || target?.slug, workingTitle: input.topicDecision?.workingTitle }, { targetSlug: target?.slug });
  const stamp = nowIso();
  const payload = {
    category: input.category || target?.category || '선택',
    inquiryType: input.inquiryType || (target?.category === '수리' ? 'repair' : 'custom'),
    businessFacts: String(input.businessFacts || '').trim(),
    desiredSlug: String(input.slug || target?.slug || '').trim(),
    baseIndexHash: fileHash(guideIndexPath()),
    baseIndexEntryHash: target ? sha256(parseGuidePosts(fs.readFileSync(guideIndexPath(), 'utf8')).find(post => post.slug === target.slug)?.block || '') : null,
    baseClusterHash: fileHash(path.join(siteRoot(), 'data', 'guide-clusters.ts')),
    existingSource: target?.source || '',
    topicDecision: target ? input.topicDecision || null : { ...(input.topicDecision || {}), cluster: selectedCluster?.id || null },
    auditId: input.auditId ? Number(input.auditId) : null,
    auditPlan: input.auditPlan && typeof input.auditPlan === 'object' ? input.auditPlan : null,
    reviewedContextFingerprint: input.reviewedContextFingerprint || null,
    updateScope: input.updateScope || (target && !input.auditPlan ? 'sources' : null),
    updatePolicy,
    automationRequested: !!input.automationRequested,
  };
  const manualSnippet = !!target && payload.auditPlan?.changes?.some(change => change.enabled && change.id === PAGE_QUERY_CHANGE_ID);
  payload.sourceReviewVersion = 1;
  if (manualSnippet) payload.draftMode = 'reviewed_page_query_snippet';
  const preview = { kind: target ? 'update' : 'new', target_slug: target?.slug || null, topic, input: payload };
  const initialDraft = manualSnippet ? reviewedSnippetDraft(preview) : null;
  const initialLint = initialDraft ? lintDraft(initialDraft, lintOptions(preview)) : null;
  const result = db.prepare(`
    INSERT INTO generations (target_slug, kind, topic, status, input_json, base_source_hash, draft_json, lint_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(target?.slug || null, target ? 'update' : 'new', topic, initialDraft ? initialLint.blocking ? 'review' : 'draft' : 'idea', JSON.stringify(payload), updatePolicy?.sourceHash || target?.sourceHash || null, initialDraft ? JSON.stringify(initialDraft) : null, initialLint ? JSON.stringify(initialLint) : null, stamp, stamp);
  const id = Number(result.lastInsertRowid);
  jobs.claimGeneration(id);
  return getGeneration(id);
}

function updateGeneration(id, fields) {
  if (['draft_json','humanized_json','research_json','input_json'].some(key => Object.hasOwn(fields, key))) {
    fields = { ...fields, approved_at: null };
    if (!fields.status && getGeneration(id)?.status === 'approved') fields.status = 'review';
  }
  const allowed = new Set(['status', 'input_json', 'research_json', 'draft_json', 'humanized_json', 'lint_json', 'error', 'approved_at']);
  const entries = Object.entries(fields).filter(([key]) => allowed.has(key));
  if (!entries.length) return getGeneration(id);
  db.prepare(`UPDATE generations SET ${entries.map(([key]) => `${key} = ?`).join(', ')}, revision = revision + 1, updated_at = ? WHERE id = ?`)
    .run(...entries.map(([, value]) => value), nowIso(), id);
  return getGeneration(id);
}

function generationConnection(id) {
  const generation = getGeneration(id);
  if (!generation) throw Object.assign(new Error('생성 작업을 찾을 수 없습니다'), { status: 404 });
  if (generation.kind !== 'new') return { required: false, ready: true, proposal: null };
  const draft = generation.humanized || generation.draft;
  try {
    const proposal = require('./clusterService').assertNewGuideConnection(generation, draft || {
      title: generation.topic, keyword: generation.topic, category: generation.input.category,
      slug: generation.input.desiredSlug || 'new-guide',
    });
    return { required: true, ready: true, provisional: !draft, proposal };
  } catch (error) {
    if (!['CLUSTER_REQUIRED', 'INVALID_CLUSTER', 'CLUSTER_CONFLICT'].includes(error.code)) throw error;
    return { required: true, ready: false, provisional: !draft, proposal: null, error: error.message, code: error.code };
  }
}

function selectGenerationCluster(id, clusterId, { expectedRevision } = {}) {
  return db.transaction(() => {
    const generation = getGeneration(id);
    if (!generation) throw Object.assign(new Error('생성 작업을 찾을 수 없습니다'), { status: 404 });
    if (!Number.isInteger(expectedRevision) || generation.revision !== expectedRevision) throw Object.assign(new Error('작업이 변경됐습니다. 최신 연결 정보를 확인한 뒤 다시 저장해 주세요'), { status: 409, code: 'STALE_REVISION' });
    if (generation.kind !== 'new' || generation.status === 'applied' || generation.archived_at) throw Object.assign(new Error('반영 전 새 글에서만 가이드 묶음을 변경할 수 있습니다'), { status: 409, code: 'CLUSTER_SELECTION_LOCKED' });
    const cluster = require('./clusterService').validateClusterSelection(clusterId);
    const nextId = cluster?.id || null;
    const currentId = generation.input?.topicDecision?.cluster;
    if (nextId === (currentId === 'other' ? null : currentId || null)) return generation;
    return updateGeneration(id, {
      input_json: JSON.stringify({ ...generation.input, topicDecision: { ...(generation.input.topicDecision || {}), cluster: nextId } }),
      error: null,
    });
  })();
}

// 정부·공공 도메인. gov.uk·gov.au처럼 국가코드가 뒤에 붙는 형태까지 포함한다.
const PUBLIC_HOST = /(?:^|\.)(?:gov|gob|govt|gouv|go|mil)\.[a-z]{2,3}$/;
// 교육·연구 도메인. ac.kr·ac.uk·ac.jp를 함께 인식한다.
const ACADEMIC_HOST = /(?:^|\.)(?:ac|re|edu)\.[a-z]{2,3}$/;
const PUBLIC_SUFFIXES = ['.gov', '.edu', '.int'];
// 원고 지시문이 허용하는 "국제 표준·감정·협회" 축을 서버 판정에도 맞춘다.
const AUTHORITY_DOMAINS = [
  'gia.edu', 'igi.org', 'cibjo.org', 'iso.org', 'iec.ch', 'astm.org', 'ansi.org',
  'ags.org', 'agta.org', 'gem-a.com', 'ssef.ch', 'gubelingemlab.ch',
  'jewelers.org', 'responsiblejewellery.com', 'hallmarkingconvention.org',
  'lbma.org.uk', 'gold.org', 'assayofficelondon.co.uk', 'theassayoffice.co.uk',
  // 제조사 관리 지침과 의학 안전 문구를 위한 1차 출처.
  'tiffany.com', 'aad.org',
];

function officialDomain(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    if (PUBLIC_HOST.test(host) || ACADEMIC_HOST.test(host)) return true;
    if (PUBLIC_SUFFIXES.some((suffix) => host === suffix.slice(1) || host.endsWith(suffix))) return true;
    return AUTHORITY_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
  } catch (_) { return false; }
}

// 저장된 근거도 항상 현재 판정 기준으로 다시 분류해, 기준이 넓어지면 예전 작업도 함께 풀린다.
function reclassifySources(bundle) {
  if (!bundle || !Array.isArray(bundle.sources)) return bundle;
  return { ...bundle, sources: bundle.sources.map((source) => ({ ...source, official: officialDomain(source.url) })) };
}

async function researchOfficial(id, { emphasizeOfficial = false } = {}) {
  const generation = getGeneration(id);
  if (!generation) throw new Error('생성 작업을 찾을 수 없습니다');
  if (generation.input?.draftMode === 'reviewed_page_query_snippet') throw Object.assign(new Error('페이지 검색어를 검토해 입력한 제목·설명 교정안입니다. 출처 재조사 없이 원고 검사·변경 비교·최종 승인으로 진행해 주세요.'), { status: 422, code: 'MANUAL_DRAFT_MODE' });
  assertUpdatePolicy(generation);
  const result = await completeJson({
    generationId: id,
    stage: emphasizeOfficial ? 'official_research_retry' : 'official_research',
    model: 'gpt-5.6-luna',
    effort: 'low',
    tools: [{ type: 'web_search_preview' }],
    schemaName: 'noblesse_evidence_bundle',
    schema: evidenceSchema,
    instructions: [
      '귀금속 가이드의 사실 근거를 조사합니다.',
      '정부·공공기관·표준기관·교육기관·국제 보석 협회·원 제조사처럼 1차 또는 공식 출처를 우선하세요.',
      '검색 결과 스니펫이나 블로그를 사실 근거로 사용하지 마세요.',
      '가격, 재고, 제작 기간, 수리 가능 여부는 사용자 제공 사실이 없으면 주장하지 마세요.',
      '각 claim에는 직접 뒷받침하는 sourceUrls를 연결하세요.',
      '공식 도메인이라는 이유만으로 주제와 무관한 문서를 추가하지 마세요. 자료의 재질·제품·공정 적용 범위를 명시하고 확인되지 않은 주장은 제외하세요.',
      '한국어 요약·출처 설명에는 중국어 간체·번체나 일본어 한자를 섞지 마세요. 기관명은 공식 영문명 또는 자연스러운 한국어로 적으세요.',
      '출처 선택은 운영자가 검토하므로 selected는 모두 false로 반환하세요.',
      emphasizeOfficial
        ? '지난 조사에서 승인 가능한 권위 출처가 없었습니다. 기존 주장의 범위 안에서 관련 1차 문서를 다시 찾으세요. 개수를 채우려고 주제를 넓히지 말고, 근거가 없으면 해당 주장과 출처를 제외하세요.'
        : '',
    ].filter(Boolean).join('\n'),
    input: researchInput(generation),
    maxOutputTokens: 7000,
  });
  const evidence = result.parsed;
  if (!validateEvidence(evidence)) throw new Error(`근거 구조가 올바르지 않습니다: ${schemaErrors(validateEvidence).join('; ')}`);
  evidence.sources = evidence.sources.map((source) => ({ ...source, official: officialDomain(source.url), selected: false }));
  const research = { ...(generation.research || {}), official: evidence, researchedAt: nowIso() };
  return updateGeneration(id, { research_json: JSON.stringify(research), input_json: JSON.stringify({ ...generation.input, sourceReviewVersion: 1 }), status: 'researched', error: null });
}

function selectSources(id, selectedUrls, { allowWithoutOfficial = null, sourceReviews = [], selectionMode = 'operator' } = {}) {
  const generation = getGeneration(id);
  if (!generation?.research?.official) throw new Error('먼저 공식 출처 조사를 실행해 주세요');
  if (generation.status === 'applied' || generation.archived_at) throw Object.assign(new Error('반영이 끝난 작업의 출처 검토 기록은 바꾸지 않습니다. 새 수정 작업에서 검토해 주세요.'), { status: 409, code: 'SOURCE_REVIEW_LOCKED' });
  assertUpdatePolicy(generation);
  if (!Array.isArray(selectedUrls) || !selectedUrls.length) throw Object.assign(new Error('원고 근거로 쓸 출처를 최소 1개 선택해 주세요'), { status: 422, code: 'SOURCE_SELECTION_REQUIRED' });
  const available = new Set(generation.research.official.sources.map(source => source.url));
  if (selectedUrls.some(url => typeof url !== 'string' || !available.has(url))) throw Object.assign(new Error('조사 결과에 없는 출처 URL입니다. 최신 출처 목록에서 다시 선택해 주세요.'), { status: 422, code: 'SOURCE_NOT_FOUND' });
  if (!Array.isArray(sourceReviews)) throw Object.assign(new Error('출처 검토 기록 형식을 확인해 주세요.'), { status: 422, code: 'SOURCE_REVIEW_REQUIRED' });
  const contexts = sourceReviewContexts(generation);
  const reviews = selectedUrls.map(url => {
    const context = contexts.find(item => item.url === url);
    if (!context.claims.length) throw Object.assign(new Error(`출처와 연결된 조사 주장이 없습니다: ${url}`), { status: 422, code: 'SOURCE_CLAIM_REQUIRED' });
    const provided = sourceReviews.find(review => review?.url === url);
    if (!provided && context.status === 'operator_reviewed') return context.review;
    if (selectionMode === 'automatic') return { url, fingerprint: context.fingerprint, status: 'automatic_research', selectedAt: nowIso() };
    if (!provided || provided.fingerprint !== context.fingerprint) throw Object.assign(new Error(`최신 출처와 조사 주장을 확인한 뒤 검토를 저장해 주세요: ${url}`), { status: 422, code: 'SOURCE_REVIEW_REQUIRED' });
    const location = String(provided.location || '').trim();
    const note = String(provided.note || '').trim();
    if (provided.confirmed !== true || location.length < 4 || location.length > 500 || note.length < 10 || note.length > 2000) throw Object.assign(new Error('선택 출처마다 문서 제목·절·문단 등 확인 위치(4자 이상), 대조 메모(10자 이상)와 직접 확인 표시가 필요합니다.'), { status: 422, code: 'SOURCE_REVIEW_REQUIRED' });
    return { url, fingerprint: context.fingerprint, status: 'operator_reviewed', location, note, reviewedAt: nowIso() };
  });
  const selected = new Set(selectedUrls || []);
  generation.research.official.sources = generation.research.official.sources.map((source) => ({ ...source, selected: selected.has(source.url) }));
  generation.research.sourceReviews = reviews;
  const fields = { research_json: JSON.stringify(generation.research), status: generation.draft ? 'review' : 'researched', input_json: JSON.stringify({ ...generation.input, sourceReviewVersion: 1, ...(allowWithoutOfficial === null ? {} : { allowWithoutOfficial: !!allowWithoutOfficial }) }) };
  return updateGeneration(id, fields);
}

function relatedCandidates(generation) {
  return listGuides().filter((guide) => guide.slug !== generation.target_slug)
    .map((guide) => ({ ...guide, similarity: Math.max(jaccard(generation.topic, guide.keyword), jaccard(generation.topic, guide.title)) }))
    .sort((a, b) => b.similarity - a.similarity).slice(0, 8)
    .map((guide) => ({ to: guide.path, label: guide.title, description: guide.description.slice(0, 70) }));
}

// 어떤 검사에 걸렸는지 화면에서 바로 보이도록 차단 항목을 요약한다.
function blockingSummary(lint) {
  const errors = (lint?.findings || []).filter((finding) => finding.severity === 'error');
  if (!errors.length) return '차단 항목 정보 없음';
  return errors.slice(0, 3).map((finding) => finding.message).join(' / ') + (errors.length > 3 ? ` 외 ${errors.length - 3}건` : '');
}

function lintOptions(generation) {
  return { targetSlug: generation.target_slug, generationId: generation.id, allowWithoutOfficial: !!generation.input?.allowWithoutOfficial };
}

function sourceBundle(generation) {
  const official = generation.research?.official;
  const selected = (official?.sources || []).filter((source) => source.selected);
  if (!selected.length) throw new Error('원고 근거로 쓸 출처를 최소 1개 선택해 주세요');
  if (!selected.some((source) => source.official) && !generation.input?.allowWithoutOfficial) {
    throw new Error('선택한 출처 중 공식·권위 출처가 없습니다. ‘출처’ 탭에서 다시 조사하거나, 보조 출처로 진행하도록 확정해 주세요.');
  }
  const selectedUrls = new Set(selected.map((source) => source.url));
  for (const source of selected) {
    if (!(official.claims || []).some(claim => String(claim.claim || '').trim() && (claim.sourceUrls || []).includes(source.url))) throw Object.assign(new Error(`선택한 출처에 연결된 조사 근거가 없습니다. 근거가 있는 출처를 다시 선택해 주세요: ${source.url}`), { status: 422, code: 'SOURCE_CLAIM_REQUIRED' });
    assertSourceReview(generation, source.url);
  }
  return {
    sources: selected,
    claims: (official.claims || []).map(claim => ({ ...claim, sourceUrls: (claim.sourceUrls || []).filter(url => selectedUrls.has(url)) })).filter(claim => claim.sourceUrls.length),
    reviewStatus: sourceReviewContexts(generation).filter(item => selectedUrls.has(item.url)).map(({ url, status }) => ({ url, status })),
  };
}

function assertSelectedEvidence(generation, draft, options = {}) {
  const original = policyFor(generation)?.baselineDraft.sources || [];
  const selected = new Set((generation.research?.official?.sources || []).filter(source => source.selected).map(source => source.url));
  const claims = generation.research?.official?.claims || [];
  const publicIdentity = source => JSON.stringify({ label: source.label, url: source.url, note: source.note });
  for (const source of draft.sources || []) {
    if (original.some(prior => publicIdentity(prior) === publicIdentity(source))) continue;
    if (!selected.has(source.url)) throw Object.assign(new Error(`신규·변경 출처를 출처 탭에서 먼저 선택해 주세요: ${source.url}`), { status: 422, code: 'SOURCE_NOT_SELECTED' });
    if (!claims.some(claim => String(claim.claim || '').trim() && (claim.sourceUrls || []).includes(source.url))) throw Object.assign(new Error(`출처와 연결된 확인 근거가 없습니다. 해당 문서에서 뒷받침하는 내용을 확인한 뒤 조사 자료를 보완해 주세요: ${source.url}`), { status: 422, code: 'SOURCE_CLAIM_REQUIRED' });
    assertSourceReview(generation, source.url, options);
  }
  return { checked: true, limitation: '선택한 문서와 조사 주장 사이 연결 검사이며 본문 주장의 의미·정확성을 자동으로 증명하지 않습니다.' };
}

function generationPrompt(generation, evidence, { repairDraft = null, errors = [] } = {}) {
  const existing = generation.kind === 'update' ? generation.input.existingSource.slice(0, 24000) : '';
  return [
    `주제: ${generation.topic}`,
    `작업: ${generation.kind === 'update' ? '기존 일반 가이드 수정' : '신규 가이드 작성'}`,
    `카테고리: ${generation.input.category}`,
    `문의 유형: ${generation.input.inquiryType}`,
    `희망 slug: ${generation.input.desiredSlug || '(영문 SEO slug 생성)'}`,
    `사업자 제공 사실:\n${generation.input.businessFacts || '없음'}`,
    `선택한 조사 출처와 주장(automatic_research는 운영자 검토 전이며 사실 정확성을 승인한 결과가 아닙니다):\n${JSON.stringify(evidence, null, 2)}`,
    `실제로 존재하는 관련 링크 후보:\n${JSON.stringify(relatedCandidates(generation), null, 2)}`,
    generation.input.auditPlan ? `사용자가 진단 화면에서 확정한 수정 계획(활성 항목만 구현하고 보존 항목은 유지):\n${JSON.stringify(generation.input.auditPlan, null, 2)}` : '',
    generation.input.updatePolicy ? `서버가 허용한 변경 필드(나머지는 원문에서 보존):\n${JSON.stringify(generation.input.updatePolicy.scope)}` : '',
    existing ? `현재 페이지 원문(구조와 유효 사실을 보존):\n${existing}` : '',
    repairDraft ? `수정할 이전 초안:\n${JSON.stringify(repairDraft, null, 2)}` : '',
    errors.length ? `반드시 해결할 검사 오류:\n${errors.join('\n')}` : '',
  ].filter(Boolean).join('\n\n');
}

const writerInstructions = [
  '귀족 종로 귀금속 웹사이트의 정보형 가이드 원고를 작성합니다.',
  'Vue 코드를 쓰지 말고 제공된 JSON 스키마만 반환하세요.',
  '승인된 출처와 사업자 제공 사실 밖의 가격·기간·수리 가능성·재고·등급·인증을 만들지 마세요.',
  'Naver 검색 데이터는 검색 의도에만 사용하며 사실 근거로 인용하지 마세요.',
  '제목은 직접적인 답을 앞에 두고 “| 귀족” 접미사를 넣지 마세요. 제목은 27자 이하를 목표로 하고 절대 31자를 넘기지 마세요.',
  '제목·본문·FAQ·출처 설명·이미지 대체텍스트 등 사용자에게 보이는 한국어 문장에는 중국어 간체·번체나 일본어 한자를 한 글자도 섞지 마세요. 기관명은 공식 영문명 또는 자연스러운 한국어로 쓰세요.',
  'sections[].title에는 01, 1., 1), ① 같은 번호·순번 접두사를 넣지 마세요. 화면 컴포넌트가 섹션 번호를 따로 표시합니다.',
  'quickAnswers는 정확히 3개, sections는 3~7개, cautions는 2개 이상, FAQ는 3~5개로 만드세요.',
  '관련 링크는 후보에서만 고르고 최소 3개를 넣으세요.',
  '기존 글 수정 작업에 확정 수정 계획이 있으면 enabled=true 항목을 우선 구현하고 preserve 항목은 유지하세요.',
  '비교표가 필요한 본문은 sections[].table에 headers와 rows로 작성하세요. 최대 6열·10행이고 각 행 셀 수는 제목 열 수와 같아야 합니다. 표가 없으면 table은 null입니다.',
  '과장, 보장, 단정 대신 제품 상태와 상담 시점에 따른 조건을 분명히 쓰세요.',
  'heroImage.path와 본문 image.path는 빈 문자열로 두고, 실제 귀금속 사진을 만들 수 있는 구체적인 영문 prompt를 작성하세요. prompt에는 한글을 넣지 마세요.',
  '이미지 alt는 제목을 복사하지 말고 실제로 보이는 귀금속 종류·도구·배치·상황을 한국어로 구체적으로 묘사하세요.',
  'sources는 승인된 출처만 복사하고 official 값도 그대로 유지하세요.',
].join('\n');

function isoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')) ? String(value) : null;
}

function normalizeDraft(generation, draft, evidence) {
  const existing = generation.target_slug ? getGuide(generation.target_slug) : null;
  const today = koreaDate();
  const selectedByUrl = new Map(evidence.sources.map((source) => [source.url, source]));
  draft.slug = existing?.slug || generation.input.desiredSlug || draft.slug || slugify(generation.topic);
  draft.category = generation.input.category || existing?.category || draft.category;
  draft.inquiryType = generation.input.inquiryType || draft.inquiryType;
  // 모델이 학습 시점 기준(예: 2025년) 날짜를 만들어 내므로 새 글 작성일은 신뢰하지 않고 항상 오늘로 고정한다.
  draft.publishedAt = isoDate(existing?.publishedAt) || today;
  draft.updatedAt = existing ? today : '';
  draft.heroImage = { ...(draft.heroImage || {}), path: '' };
  draft.sections = (draft.sections || []).map((section) => ({
    ...section,
    title: stripSectionNumbering(section.title),
    image: section.image ? { ...section.image, path: '' } : null,
  }));
  draft.sources = (draft.sources || []).filter((source) => selectedByUrl.has(source.url)).map((source) => ({
    label: source.label || selectedByUrl.get(source.url).label,
    url: source.url,
    note: source.note || selectedByUrl.get(source.url).reason || '',
    official: !!selectedByUrl.get(source.url).official,
  }));
  for (const source of evidence.sources) {
    if (!draft.sources.some((item) => item.url === source.url)) draft.sources.push({ label: source.label, url: source.url, note: source.reason, official: !!source.official });
  }
  return enforceDraftScope(generation, draft);
}

async function callWriter(generation, { model, stage, fallbackReason = null, repairDraft = null, errors = [] }) {
  const evidence = sourceBundle(generation);
  const result = await completeJson({
    generationId: generation.id,
    stage,
    model,
    effort: model === 'gpt-5.6-terra' ? 'medium' : 'low',
    fallbackReason,
    schemaName: 'noblesse_guide_draft',
    schema: guideDraftResponseSchema,
    instructions: writerInstructions,
    input: generationPrompt(generation, evidence, { repairDraft, errors }),
  });
  return normalizeDraft(generation, result.parsed, evidence);
}

function reviewedSnippetDraft(generation) {
  return enforceDraftScope(generation, {
    title: generation.input.auditPlan.proposedTitle.trim(),
    description: generation.input.auditPlan.proposedDescription.trim(),
  });
}

async function executeWriterPolicy({ generation, forceModel = null, write = callWriter, inspect = lintDraft }) {
  const scope = generation.input?.updatePolicy?.scope;
  if (generation.kind === 'update' && generation.input.draftMode === 'reviewed_page_query_snippet') {
    const draft = reviewedSnippetDraft(generation);
    return { draft, lint: inspect(draft, lintOptions(generation)) };
  }
  if (generation.kind === 'update' && scope?.fields.every(field => ['sources', 'sourceNote'].includes(field))) {
    const evidence = sourceBundle(generation);
    const draft = enforceDraftScope(generation, {
      sources: evidence.sources.map(source => ({ label: source.label, url: source.url, note: source.reason || source.note || '', official: !!source.official })),
      sourceNote: generation.input.updatePolicy.baselineDraft.sourceNote || '소재와 관리 기준을 확인할 때 참고할 자료입니다. 제품 상태에 따라 적용 범위가 달라질 수 있습니다.',
    });
    return { draft, lint: inspect(draft, lintOptions(generation)) };
  }
  if (forceModel === 'gpt-5.6-terra') {
    const draft = await write(generation, { model: 'gpt-5.6-terra', stage: 'manual_terra' });
    return { draft, lint: inspect(draft, lintOptions(generation)) };
  }
  let draft = await write(generation, { model: 'gpt-5.6-luna', stage: 'draft_luna' });
  let lint = inspect(draft, lintOptions(generation));
  if (lint.blocking) {
    draft = await write(generation, {
      model: 'gpt-5.6-luna', stage: 'repair_luna', fallbackReason: 'blocking_lint', repairDraft: draft,
      errors: lint.findings.filter((item) => item.severity === 'error').map((item) => item.message),
    });
    lint = inspect(draft, lintOptions(generation));
  }
  if (lint.blocking) {
    draft = await write(generation, {
      model: 'gpt-5.6-terra', stage: 'fallback_terra', fallbackReason: 'luna_blocking_after_repair', repairDraft: draft,
      errors: lint.findings.filter((item) => item.severity === 'error').map((item) => item.message),
    });
    lint = inspect(draft, lintOptions(generation));
  }
  return { draft, lint };
}

async function generateDraft(id, { forceModel = null } = {}) {
  let generation = getGeneration(id);
  if (!generation) throw new Error('생성 작업을 찾을 수 없습니다');
  assertUpdatePolicy(generation);
  assertUniqueIntent({ topic: generation.topic, primaryKeyword: generation.input?.topicDecision?.primaryKeyword || generation.topic, slug: generation.input?.desiredSlug }, { targetSlug: generation.target_slug, generationId: generation.id });
  if (generation.input.draftMode === 'reviewed_page_query_snippet') {
    const { draft, lint } = await executeWriterPolicy({ generation });
    if (!generation.humanized && JSON.stringify(generation.draft) === JSON.stringify(draft) && JSON.stringify(generation.lint) === JSON.stringify(lint)) return generation;
    return updateGeneration(id, { draft_json: JSON.stringify(draft), humanized_json: null, lint_json: JSON.stringify(lint), status: lint.blocking ? 'review' : 'draft', error: lint.blocking ? `수동 교정안의 차단 검사를 확인해 주세요 — ${blockingSummary(lint)}` : null });
  }
  updateGeneration(id, { status: 'generating', error: null });
  try {
    const { draft, lint } = await executeWriterPolicy({ generation, forceModel });
    return updateGeneration(id, {
      draft_json: JSON.stringify(draft), humanized_json: null, lint_json: JSON.stringify(lint),
      status: lint.blocking ? 'review' : 'draft',
      error: lint.blocking ? `자동 보완 후에도 차단 검사가 남아 있습니다 — ${blockingSummary(lint)}` : null,
    });
  } catch (error) {
    updateGeneration(id, { status: 'review', error: error.message });
    throw error;
  }
}

function saveDraft(id, draft) {
  const generation = getGeneration(id);
  if (!generation) throw new Error('생성 작업을 찾을 수 없습니다');
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) throw Object.assign(new Error('원고 객체가 필요합니다'), { status: 422 });
  const normalizedDraft = stripDraftSectionNumbering(draft);
  assertUpdatePolicy(generation, { draft: normalizedDraft, phase: 'save' });
  assertSelectedEvidence(generation, normalizedDraft);
  const existing = generation.target_slug ? getGuide(generation.target_slug) : null;
  normalizedDraft.publishedAt = isoDate(normalizedDraft.publishedAt) || isoDate(existing?.publishedAt) || koreaDate();
  normalizedDraft.updatedAt = isoDate(normalizedDraft.updatedAt) || '';
  const lint = lintDraft(normalizedDraft, lintOptions(generation));
  return updateGeneration(id, { draft_json: JSON.stringify(normalizedDraft), humanized_json: null, lint_json: JSON.stringify(lint), status: 'draft', approved_at: null, error: null });
}

function lintGeneration(id, { requireImage = false } = {}) {
  const generation = getGeneration(id);
  const draft = generation?.humanized || generation?.draft;
  if (!draft) throw new Error('검사할 원고가 없습니다');
  assertUpdatePolicy(generation, { draft, phase: 'lint' });
  assertSelectedEvidence(generation, draft);
  const lint = lintDraft(draft, { ...lintOptions(generation), requireImage });
  return updateGeneration(id, { lint_json: JSON.stringify(lint), status: lint.blocking ? 'review' : generation.status, error: lint.blocking ? '차단 검사를 확인하세요' : null });
}

function assertDraftImages(generation) {
  const draft = generation?.humanized || generation?.draft;
  for (const image of [draft?.heroImage, ...(draft?.sections || []).map(section => section.image)].filter(Boolean)) {
    if (!image.path || !/^\/Image\/[a-zA-Z0-9_/-]+\.(?:webp|png|jpe?g|avif)$/i.test(image.path) || image.path.split('/').includes('..')) throw Object.assign(new Error('이미지 파일 경로를 확인해 주세요'), { status: 422 });
    const local = db.prepare("SELECT local_path FROM image_assets WHERE generation_id=? AND public_path=? AND status='active'").get(generation.id, image.path)?.local_path;
    if (!fs.existsSync(path.join(siteRoot(), 'public', image.path.slice(1))) && (!local || !fs.existsSync(local))) throw Object.assign(new Error('이미지 파일이 없습니다: ' + image.path), { status: 422 });
  }
}

function approveGeneration(id) {
  const generation = getGeneration(id);
  const draft = generation?.humanized || generation?.draft;
  if (!draft) throw new Error('승인할 원고가 없습니다');
  assertUpdatePolicy(generation, { draft, phase: 'approve' });
  assertSelectedEvidence(generation, draft, { requireOperatorReview: true });
  const connection = require('./clusterService').assertNewGuideConnection(generation, draft);
  assertUniqueIntent({ topic: generation.topic, primaryKeyword: draft.keyword, slug: draft.slug, workingTitle: draft.title }, { targetSlug: generation.target_slug, generationId: generation.id });
  const lint = lintDraft(draft, { ...lintOptions(generation), requireImage: true });
  if (lint.blocking) {
    updateGeneration(id, { lint_json: JSON.stringify(lint), status: 'review', error: '차단 검사 또는 대표 이미지를 먼저 해결해 주세요' });
    const error = new Error('차단 검사 또는 대표 이미지를 먼저 해결해 주세요');
    error.status = 422;
    throw error;
  }
  assertDraftImages(generation);
  return db.transaction(() => {
    // Pin the reviewed automatic proposal so later publications cannot silently
    // change the group chosen between approval and final application.
    if (connection && generation.input?.topicDecision?.cluster !== connection.clusterId) {
      updateGeneration(id, { input_json: JSON.stringify({ ...generation.input, topicDecision: { ...(generation.input.topicDecision || {}), cluster: connection.clusterId } }) });
    }
    return updateGeneration(id, { lint_json: JSON.stringify(lint), status: 'approved', approved_at: nowIso(), error: null });
  })();
}

module.exports = {
  assertDraftImages, assertSelectedEvidence, parseGeneration, getGeneration, listGenerations, createGeneration, updateGeneration,
  generationConnection, selectGenerationCluster,
  deleteGeneration, deleteGenerations,
  researchOfficial, selectSources, generateDraft, saveDraft, lintGeneration, approveGeneration,
  officialDomain, writerInstructions, normalizeDraft, executeWriterPolicy,
};
