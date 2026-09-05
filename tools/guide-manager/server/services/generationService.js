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
    topicDecision: input.topicDecision || null,
    auditId: input.auditId ? Number(input.auditId) : null,
    auditPlan: input.auditPlan && typeof input.auditPlan === 'object' ? input.auditPlan : null,
    automationRequested: !!input.automationRequested,
  };
  const result = db.prepare(`
    INSERT INTO generations (target_slug, kind, topic, status, input_json, base_source_hash, created_at, updated_at)
    VALUES (?, ?, ?, 'idea', ?, ?, ?, ?)
  `).run(target?.slug || null, target ? 'update' : 'new', topic, JSON.stringify(payload), target?.sourceHash || null, stamp, stamp);
  return getGeneration(Number(result.lastInsertRowid));
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
      '한국어 요약·출처 설명에는 중국어 간체·번체나 일본어 한자를 섞지 마세요. 기관명은 공식 영문명 또는 자연스러운 한국어로 적으세요.',
      '출처 선택은 운영자가 검토하므로 selected는 모두 false로 반환하세요.',
      emphasizeOfficial
        ? '지난 조사에서 승인 가능한 권위 출처가 없었습니다. 이번에는 정부(.go.kr, .gov, gov.uk), 표준기관(ISO, KATS), 교육기관(.edu, .ac.kr), 국제 보석 협회(GIA, IGI, CIBJO) 도메인의 문서를 최소 2개 이상 반드시 포함하세요. 해당 도메인에서 근거를 찾지 못하면 주제 범위를 넓혀서라도 찾으세요.'
        : '',
    ].filter(Boolean).join('\n'),
    input: `주제: ${generation.topic}\n사업자 제공 사실: ${generation.input.businessFacts || '없음'}\n한국어 가이드에 필요한 최소 사실만 조사하세요.`,
    maxOutputTokens: 7000,
  });
  const evidence = result.parsed;
  if (!validateEvidence(evidence)) throw new Error(`근거 구조가 올바르지 않습니다: ${schemaErrors(validateEvidence).join('; ')}`);
  evidence.sources = evidence.sources.map((source) => ({ ...source, official: officialDomain(source.url), selected: false }));
  const research = { ...(generation.research || {}), official: evidence, researchedAt: nowIso() };
  return updateGeneration(id, { research_json: JSON.stringify(research), status: 'researched', error: null });
}

function selectSources(id, selectedUrls, { allowWithoutOfficial = null } = {}) {
  const generation = getGeneration(id);
  if (!generation?.research?.official) throw new Error('먼저 공식 출처 조사를 실행해 주세요');
  if (!(selectedUrls || []).length) throw new Error('원고 근거로 쓸 출처를 최소 1개 선택해 주세요');
  const selected = new Set(selectedUrls || []);
  generation.research.official.sources = generation.research.official.sources.map((source) => ({ ...source, selected: selected.has(source.url) }));
  const fields = { research_json: JSON.stringify(generation.research), status: 'researched' };
  if (allowWithoutOfficial !== null) {
    fields.input_json = JSON.stringify({ ...generation.input, allowWithoutOfficial: !!allowWithoutOfficial });
  }
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
  return { targetSlug: generation.target_slug, allowWithoutOfficial: !!generation.input?.allowWithoutOfficial };
}

function sourceBundle(generation) {
  const official = generation.research?.official;
  const selected = (official?.sources || []).filter((source) => source.selected);
  if (!selected.length) throw new Error('원고 근거로 쓸 출처를 최소 1개 선택해 주세요');
  if (!selected.some((source) => source.official) && !generation.input?.allowWithoutOfficial) {
    throw new Error('선택한 출처 중 공식·권위 출처가 없습니다. ‘출처’ 탭에서 다시 조사하거나, 보조 출처로 진행하도록 확정해 주세요.');
  }
  const selectedUrls = new Set(selected.map((source) => source.url));
  return {
    sources: selected,
    claims: (official.claims || []).filter((claim) => claim.sourceUrls.some((url) => selectedUrls.has(url))),
  };
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
    `승인 출처와 근거:\n${JSON.stringify(evidence, null, 2)}`,
    `실제로 존재하는 관련 링크 후보:\n${JSON.stringify(relatedCandidates(generation), null, 2)}`,
    generation.input.auditPlan ? `사용자가 진단 화면에서 확정한 수정 계획(활성 항목만 구현하고 보존 항목은 유지):\n${JSON.stringify(generation.input.auditPlan, null, 2)}` : '',
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
  return draft;
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

async function executeWriterPolicy({ generation, forceModel = null, write = callWriter, inspect = lintDraft }) {
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
  const lint = lintDraft(draft, { ...lintOptions(generation), requireImage: true });
  if (lint.blocking) {
    updateGeneration(id, { lint_json: JSON.stringify(lint), status: 'review', error: '차단 검사 또는 대표 이미지를 먼저 해결해 주세요' });
    const error = new Error('차단 검사 또는 대표 이미지를 먼저 해결해 주세요');
    error.status = 422;
    throw error;
  }
  assertDraftImages(generation);
  return updateGeneration(id, { lint_json: JSON.stringify(lint), status: 'approved', approved_at: nowIso(), error: null });
}

module.exports = {
  assertDraftImages, parseGeneration, getGeneration, listGenerations, createGeneration, updateGeneration,
  deleteGeneration, deleteGenerations,
  researchOfficial, selectSources, generateDraft, saveDraft, lintGeneration, approveGeneration,
  officialDomain, writerInstructions, normalizeDraft, executeWriterPolicy,
};
