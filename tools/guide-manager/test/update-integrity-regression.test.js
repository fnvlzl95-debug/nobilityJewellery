const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { db } = require('../server/lib/db');
const { config } = require('../server/lib/config');
const { koreaDate, fileHash } = require('../server/lib/utils');
const { makeDraft } = require('./fixture');
const { renderNewGuide, patchExistingGuide } = require('../server/services/rendererService');
const { constExpression } = require('../server/services/contentExtractorService');
const { deriveScope, enforceDraftScope, readOriginalDraft, validatePlanCapabilities, assertUpdatePolicy, assertCreateUpdatePolicy, needsHumanizer } = require('../server/services/updatePolicyService');
const { validateHumanizedChunk, humanizeGeneration } = require('../server/services/humanizerService');
const generations = require('../server/services/generationService');
const { validateDraft, guideDraftResponseSchema } = require('../server/services/draftSchema');
const automation = require('../server/services/automationService');
const jobs = require('../server/services/jobService');
const images = require('../server/services/imageService');

async function reviewSelectedSources(generation) {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ code: error.code, error: error.message }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  try {
    const token = (await (await fetch(`${base}/session`)).json()).token;
    const current = await (await fetch(`${base}/generations/${generation.id}`)).json();
    const selectedUrls = current.research.official.sources.filter(source => source.selected).map(source => source.url);
    const sourceReviews = selectedUrls.map(url => {
      const context = current.sourceReviewContexts.find(item => item.url === url);
      assert.ok(context.claims.length, '성공 fixture도 선택 출처와 연결된 주장이 있어야 합니다');
      return { url, fingerprint: context.fingerprint, location: '격리 검증 문서 · 관리 기준 확인 문단',
        note: 'fixture의 관리 기준 주장과 출처 문단을 대조했습니다. 가격·기간 보증으로 확대하지 않습니다.', confirmed: true };
    });
    const response = await fetch(`${base}/generations/${generation.id}/sources`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token, 'If-Match': String(current.revision) },
      body: JSON.stringify({ selectedUrls, sourceReviews }),
    });
    const reviewed = await response.json();
    assert.equal(response.status, 200, JSON.stringify(reviewed));
    assert.equal(reviewed.input.sourceReviewVersion, 1);
    assert.ok(reviewed.sourceReviewContexts.filter(item => selectedUrls.includes(item.url)).every(item => item.status === 'operator_reviewed'));
    return reviewed;
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}


function syntheticGuide(t, overrides = {}) {
  const slug = `integrity-check-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const draft = makeDraft({ slug, title: '검증 전용 흑요석 장식 보관 기준', keyword: '검증 전용 흑요석 장식 보관', publishedAt: '2025-01-01', ...overrides });
  draft.sections[1].image = { ...draft.heroImage, path: '/Image/guide/existing-body-image.webp' };
  const sourcePath = path.join(config.dataDir, `${slug}.vue`);
  fs.writeFileSync(sourcePath, renderNewGuide(draft));
  db.prepare(`INSERT INTO guides (slug,path,title,page_title,description,keyword,image,category,published_at,updated_at,source_path,source_hash,is_custom,source_json,scanned_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,'{}',?)`)
    .run(slug, `/guide/${slug}`, draft.title, `${draft.title} | 귀족`, draft.description, draft.keyword, draft.heroImage.path, draft.category, draft.publishedAt, draft.updatedAt, sourcePath, fileHash(sourcePath), new Date().toISOString());
  t.after(() => {
    db.prepare('DELETE FROM generations WHERE target_slug=?').run(slug);
    db.prepare('DELETE FROM content_audits WHERE guide_slug=?').run(slug);
    db.prepare('DELETE FROM guides WHERE slug=?').run(slug);
    fs.unlinkSync(sourcePath);
  });
  return { slug, draft, sourcePath };
}

test('출처만 선택하면 모델이 제목·문단·이미지를 바꿔도 원문으로 병합하고 저장·승인 drift는 거부한다', t => {
  const guide = syntheticGuide(t);
  const generation = generations.createGeneration({ targetSlug: guide.slug, updateScope: 'sources' });
  const baseline = generation.input.updatePolicy.baselineDraft;
  const malicious = { ...structuredClone(baseline), title: '몰래 바꾼 제목', lead: '몰래 바꾼 첫 문장', heroImage: { ...baseline.heroImage, path: '' }, sources: [{ ...baseline.sources[0], note: '새 출처 설명' }] };
  malicious.sections[0].paragraphs = ['몰래 바꾼 본문'];
  const merged = enforceDraftScope(generation, malicious);
  for (const key of ['title', 'description', 'lead', 'sections', 'heroImage']) assert.deepEqual(merged[key], baseline[key], key);
  assert.equal(merged.sources[0].note, '새 출처 설명');
  assert.throws(() => generations.saveDraft(generation.id, malicious), { code: 'UPDATE_SCOPE_DRIFT' });
  generations.updateGeneration(generation.id, { draft_json: JSON.stringify(malicious) });
  assert.throws(() => generations.approveGeneration(generation.id), { code: 'UPDATE_SCOPE_DRIFT' });
  const before = fs.readFileSync(guide.sourcePath, 'utf8');
  const after = patchExistingGuide(before, merged, { policy: generation.input.updatePolicy });
  for (const name of ['pageTitle', 'pageDescription', 'gmArticleLead', 'gmHeroCaption', 'quickAnswers', 'sections', 'faqItems', 'cautions']) assert.equal(constExpression(after, name), constExpression(before, name), name);
  assert.match(after, /새 출처 설명/);
  assertUpdatePolicy(generation, { draft: merged, phase: 'apply' });
});

test('일반 수정 생성도 관찰 보호를 적용하고 승인 직전 최근 변경을 재검사한다', t => {
  const guide = syntheticGuide(t);
  const generation = generations.createGeneration({ targetSlug: guide.slug });
  db.prepare('UPDATE guides SET updated_at=? WHERE slug=?').run(koreaDate(), guide.slug);
  assert.throws(() => generations.createGeneration({ targetSlug: guide.slug }), { code: 'OBSERVATION_HOLD' });
  assert.throws(() => assertUpdatePolicy(generation), { code: 'OBSERVATION_HOLD' });
});

test('작업 도중 외부 원문 변경은 보존 초안이 있어도 승인·반영을 차단한다', t => {
  const guide = syntheticGuide(t);
  const generation = generations.createGeneration({ targetSlug: guide.slug });
  fs.appendFileSync(guide.sourcePath, '\n<!-- external edit -->');
  assert.throws(() => assertUpdatePolicy(generation), { code: 'STALE_SOURCE' });
});

test('stale 진단은 최신 문맥을 명시 재확인하기 전 일반 생성 API에서도 거부한다', t => {
  const guide = syntheticGuide(t);
  const plan = { changes: [{ enabled: true, area: '출처', action: '출처 추가', proposedState: '확인 자료 추가' }] };
  const stamp = new Date().toISOString();
  const id = Number(db.prepare(`INSERT INTO content_audits (guide_slug,source_hash,gsc_import_id,ga4_import_id,coverage_import_id,snapshot_json,plan_json,status,created_at,updated_at) VALUES (?,?,0,0,0,'{}',?,'stale',?,?)`).run(guide.slug, fileHash(guide.sourcePath), JSON.stringify(plan), stamp, stamp).lastInsertRowid);
  assert.throws(() => assertCreateUpdatePolicy(guide.slug, { auditId: id, auditPlan: plan }), { code: 'STALE_AUDIT' });
});

test('출처 수정은 writer·Humanizer 외부 요청 없이 구조화 원고를 만든다', async t => {
  const guide = syntheticGuide(t);
  let generation = generations.createGeneration({ targetSlug: guide.slug });
  const source = { ...guide.draft.sources[0], selected: true, reason: '공식 교육 자료', domain: 'gia.edu' };
  generation = generations.updateGeneration(generation.id, { research_json: JSON.stringify({ official: { sources: [source], claims: [{ claim: '기존 본문 확인', sourceUrls: [source.url] }] } }) });
  generation = await reviewSelectedSources(generation);
  let called = 0;
  const result = await generations.executeWriterPolicy({ generation, write: async () => { called++; throw new Error('writer must not run'); }, inspect: () => ({ blocking: false, findings: [] }) });
  assert.equal(called, 0);
  assert.equal(needsHumanizer(generation), false);
  assert.deepEqual(result.draft.sections, generation.input.updatePolicy.baselineDraft.sections);
  generations.updateGeneration(generation.id, { draft_json: JSON.stringify(result.draft) });
  const originalFetch = global.fetch;
  global.fetch = async () => { throw new Error('humanizer must not run'); };
  try {
    const humanized = await humanizeGeneration(generation.id);
    assert.match(humanized.humanizeSkipped, /선택 범위/);
    assert.deepEqual(humanized.humanized.sections, result.draft.sections);
    const calls = [];
    const ready = await automation.prepareBest({ generationId: generation.id, imagePolicy: 'new' }, {
      generateSlot: async () => { calls.push('image'); throw new Error('image must not run'); },
      humanizeGeneration: async () => { calls.push('humanize'); throw new Error('humanize must not run'); },
      lintGeneration: id => generations.updateGeneration(id, { lint_json: JSON.stringify({ blocking: false, score: 100, findings: [] }) }),
      preview: () => ({ files: [{ path: `pages/guide/${guide.slug}.vue` }], images: [] }),
    });
    assert.deepEqual(calls, []);
    assert.deepEqual((ready.humanized || ready.draft).heroImage, result.draft.heroImage);
    assert.deepEqual((ready.humanized || ready.draft).sections, result.draft.sections);
  } finally { global.fetch = originalFetch; }
});

test('본문 계획의 유지 구간·이미지는 고정하고 지정한 구간만 교체한다', () => {
  const baseline = makeDraft();
  const scope = deriveScope({ auditPlan: { changes: [{ area: '본문', enabled: true }], sectionPlan: [{ action: '수정', heading: baseline.sections[1].title }, { action: '유지', heading: baseline.sections[0].title }] } });
  const generation = { kind: 'update', input: { updatePolicy: { scope, baselineDraft: baseline } } };
  const proposed = structuredClone(baseline);
  proposed.sections[0].paragraphs = ['바꾸면 안 되는 원문'];
  proposed.sections[1].paragraphs = ['선택한 구간의 새로운 설명'];
  const merged = enforceDraftScope(generation, proposed);
  assert.deepEqual(merged.sections[0], baseline.sections[0]);
  assert.equal(merged.sections[1].paragraphs[0], '선택한 구간의 새로운 설명');
  assert.deepEqual(merged.sections[2], baseline.sections[2]);
  assert.deepEqual(merged.faqItems, baseline.faqItems);
  assert.equal(scope.fields.includes('faqItems'), false);
  assert.equal(scope.fields.includes('cautions'), false);
  const preserved = deriveScope({ auditPlan: { changes: [{ area: '제목·설명', enabled: true }, { area: '출처', enabled: true }], preserve: ['기존 제목은 유지'] } });
  assert.equal(preserved.fields.includes('title'), false);
  assert.ok(preserved.reviewNotes.length);
  const bodyImages = deriveScope({ auditPlan: { changes: [{ area: '본문', enabled: true, action: '본문 이미지 추가', proposedState: '상태를 보여주는 본문 이미지 생성' }] } });
  assert.equal(bodyImages.preserveHero, true);
  assert.equal(bodyImages.preserveBodyImages, false);
  assert.equal(bodyImages.fields.includes('heroImage'), false);
});

test('비교표 열·행 제한을 검증하고 렌더링하며 구현 못 하는 계획은 명시 거부한다', () => {
  const draft = makeDraft();
  draft.sections[0].table = { headers: ['확인 항목', '비교 기준'], rows: [['표면', '광택 상태']] };
  assert.equal(validateDraft(draft), true);
  assert.match(renderNewGuide(draft), /"headers"/);
  assert.ok(guideDraftResponseSchema.properties.sections.items.required.includes('table'));
  draft.sections[0].table.rows[0].push('열 수 불일치');
  assert.equal(validateDraft(draft), false);
  assert.match(validateDraft.errors[0].message, /셀 수/);
  assert.throws(() => validatePlanCapabilities({ changes: [{ enabled: true, area: '통합' }] }), { code: 'UNSUPPORTED_PLAN' });
  assert.throws(() => validatePlanCapabilities({ changes: [{ enabled: true, area: '내부링크', action: '형제 글에 링크 추가' }] }), { code: 'UNSUPPORTED_PLAN' });
  assert.equal(validatePlanCapabilities({ changes: [{ enabled: false, area: '기술' }] }).changes[0].enabled, false);
});

test('숫자가 없는 금지·허용 반전과 소재·조건 변경도 Humanizer 결과를 거부한다', () => {
  for (const [before, after] of [
    ['진주는 초음파 세척을 하면 안 됩니다.', '진주는 초음파 세척을 해도 됩니다.'],
    ['제품 상태에 따라 수리가 가능합니다.', '제품 수리가 가능합니다.'],
    ['진주는 부드러운 천으로 닦습니다.', '오팔은 부드러운 천으로 닦습니다.'],
    ['표백제 사용은 금지입니다.', '표백제 사용은 권장합니다.'],
  ]) assert.equal(validateHumanizedChunk(before, after).pass, false, before);
  const unchanged = '진주는 초음파 세척을 하면 안 됩니다.';
  assert.equal(validateHumanizedChunk(unchanged, unchanged).pass, true);
  assert.equal(validateHumanizedChunk('순서대로 살펴봅니다.', '차근차근 살펴봅니다.').pass, true);
});

async function until(predicate) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error('test job did not settle');
}

test('자동 작업에서 생성된 글 ID를 실행에 기록하고 동일 글 잠금과 재개 대상을 유지한다', async t => {
  let created;
  const action = `integrity-claim-${Date.now()}`;
  jobs.register(action, async () => {
    created = generations.createGeneration({ topic: `검증만을 위한 운모 장식-${Date.now()}`, slug: `mica-check-${Date.now()}` });
    await jobs.wait(10000);
  });
  const job = jobs.submit(action, {}, { keys: ['integrity-claim-test'], retryMode: 'resume' });
  t.after(() => { if (created) db.prepare('DELETE FROM generations WHERE id=?').run(created.id); db.prepare('DELETE FROM background_jobs WHERE id=?').run(job.id); });
  await until(() => created);
  assert.equal(jobs.get(job.id).generationId, created.id);
  assert.throws(() => jobs.acquire([`generation:${created.id}`]), { code: 'WORK_IN_PROGRESS' });
  jobs.cancel(job.id);
  await until(() => jobs.get(job.id).state === 'cancelled');
  const release = jobs.acquire([`generation:${created.id}`]);
  release();
});

test('이미지 생성 중 취소는 자동 준비의 다음 이미지·Humanizer·최종 검사로 진행하지 않는다', async t => {
  const slug = `cancel-image-${Date.now()}`;
  const created = generations.createGeneration({ topic: `검증 취소 청옥 장식-${Date.now()}`, slug });
  const draft = makeDraft({ slug });
  draft.heroImage.path = '';
  generations.updateGeneration(created.id, { draft_json: JSON.stringify(draft), lint_json: JSON.stringify({ blocking: false, findings: [] }), research_json: JSON.stringify({ official: { sources: [{ label: 'GIA', url: 'https://www.gia.edu/example', official: true, selected: true }], claims: [{ claim: '검증 기준', sourceUrls: ['https://www.gia.edu/example'] }] } }) });
  let images = 0;
  let later = 0;
  const action = `integrity-cancel-${Date.now()}`;
  jobs.register(action, () => automation.prepareBest({ generationId: created.id }, {
    generateSlot: async () => { images++; await jobs.wait(10000); },
    humanizeGeneration: async () => { later++; }, lintGeneration: () => { later++; }, preview: () => { later++; },
  }));
  const job = jobs.submit(action, {}, { keys: [] });
  t.after(() => { db.prepare('DELETE FROM generations WHERE id=?').run(created.id); db.prepare('DELETE FROM background_jobs WHERE id=?').run(job.id); });
  await until(() => images > 0);
  jobs.cancel(job.id);
  await until(() => jobs.get(job.id).state === 'cancelled');
  assert.equal(images, 1);
  assert.equal(later, 0);
  assert.notEqual(generations.getGeneration(created.id).status, 'ready');
});

test('수동 이미지 API도 보호 범위를 유료 호출·실행 기록 생성 전에 거부한다', async t => {
  const guide = syntheticGuide(t);
  let generation = generations.createGeneration({ targetSlug: guide.slug });
  const draft = enforceDraftScope(generation, generation.input.updatePolicy.baselineDraft);
  generation = generations.updateGeneration(generation.id, { draft_json: JSON.stringify(draft) });
  const before = db.prepare('SELECT COUNT(*) AS count FROM image_assets WHERE generation_id=?').get(generation.id).count;
  const fetch = global.fetch;
  global.fetch = async () => { throw new Error('paid image must not run'); };
  try {
    await assert.rejects(() => images.generateSlot(generation.id, { slot: 'hero' }), { code: 'IMAGE_SCOPE_PROTECTED' });
    await assert.rejects(() => images.generateSlot(generation.id, { slot: 'section-2', sectionIndex: 1 }), { code: 'IMAGE_SCOPE_PROTECTED' });
  } finally { global.fetch = fetch; }
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM image_assets WHERE generation_id=?').get(generation.id).count, before);
});

test('새 출처는 선택과 조사 주장 연결이 필요하며 그대로 둔 기존 출처는 허용한다', async t => {
  const guide = syntheticGuide(t);
  let generation = generations.createGeneration({ targetSlug: guide.slug });
  const unchanged = enforceDraftScope(generation, generation.input.updatePolicy.baselineDraft);
  assert.equal(generations.assertSelectedEvidence(generation, unchanged).checked, true);
  const added = { label: 'GIA Care', url: 'https://www.gia.edu/new-source', note: '추가한 공식 문서', official: true };
  const changed = { ...structuredClone(unchanged), sources: [added] };
  assert.throws(() => generations.saveDraft(generation.id, changed), { code: 'SOURCE_NOT_SELECTED' });
  generations.updateGeneration(generation.id, { draft_json: JSON.stringify(changed) });
  assert.throws(() => generations.approveGeneration(generation.id), { code: 'SOURCE_NOT_SELECTED' });
  generation = generations.updateGeneration(generation.id, { research_json: JSON.stringify({ official: { sources: [{ ...added, selected: true }], claims: [] } }) });
  assert.throws(() => generations.saveDraft(generation.id, changed), { code: 'SOURCE_CLAIM_REQUIRED' });
  generation = generations.updateGeneration(generation.id, { research_json: JSON.stringify({ official: { sources: [{ ...added, selected: true }], claims: [{ claim: '선택 문서의 관리 기준 확인', sourceUrls: [added.url] }] } }) });
  generation = await reviewSelectedSources(generation);
  assert.equal(generations.assertSelectedEvidence(generation, changed).checked, true);
  assert.equal(generations.saveDraft(generation.id, changed).draft.sources[0].url, added.url);
  assert.throws(() => generations.selectSources(generation.id, ['https://www.gia.edu/unknown']), { code: 'SOURCE_NOT_FOUND' });
  assert.throws(() => generations.selectSources(generation.id, added.url), { code: 'SOURCE_SELECTION_REQUIRED' });
  assert.deepEqual(generations.getGeneration(generation.id).research.official.sources.filter(source => source.selected).map(source => source.url), [added.url]);
});

test('자동 출처 선택은 조사 주장에 연결된 공식 자료만 선택한다', async t => {
  const guide = syntheticGuide(t);
  let generation = generations.createGeneration({ targetSlug: guide.slug });
  const supported = { ...guide.draft.sources[0], selected: false, reason: '확인된 관리 기준' };
  const unsupported = { label: 'Official but unrelated', url: 'https://www.gia.edu/unreferenced', official: true, selected: false, reason: '연결 근거 없음' };
  generation = generations.updateGeneration(generation.id, { research_json: JSON.stringify({ official: { sources: [supported, unsupported], claims: [{ claim: '확인된 관리 기준', sourceUrls: [supported.url] }] } }) });
  const calls = [];
  await automation.prepareBest({ generationId: generation.id }, {
    researchOfficial: async () => { calls.push('research'); throw new Error('must not research'); },
    generateDraft: async id => {
      const result = await generations.executeWriterPolicy({ generation: generations.getGeneration(id), write: async () => { throw new Error('writer must not run'); }, inspect: () => ({ blocking: false, score: 100, findings: [] }) });
      return generations.updateGeneration(id, { draft_json: JSON.stringify(result.draft), lint_json: JSON.stringify(result.lint) });
    },
    generateSlot: async () => { calls.push('image'); throw new Error('must not image'); },
    humanizeGeneration: async () => { calls.push('humanize'); throw new Error('must not humanize'); },
    lintGeneration: id => generations.updateGeneration(id, { lint_json: JSON.stringify({ blocking: false, score: 100, findings: [] }) }),
    preview: () => ({ files: [{ path: 'test.vue' }], images: [] }),
  });
  assert.deepEqual(calls, []);
  const result = generations.getGeneration(generation.id);
  assert.deepEqual(result.research.official.sources.filter(source => source.selected).map(source => source.url), [supported.url]);
  assert.deepEqual(result.draft.sources.map(source => source.url), [supported.url]);
});

test('루비·지르콘 글에 임의 본문 이미지와 무관한 장면을 추가하지 않는다', t => {
  const noBodyImages = makeDraft();
  for (const topic of ['루비 처리 확인', '지르콘과 큐빅 지르코니아 차이']) {
    const planned = automation.planDraftImages(noBodyImages, topic);
    assert.deepEqual(planned.placements.map(item => item.slot), ['hero']);
    assert.ok(planned.draft.sections.every(section => section.image === null));
  }
  const plannedDraft = makeDraft();
  const rubyPrompt = 'A macro photograph of a single deep red ruby specimen with realistic corundum facets.';
  plannedDraft.sections[0].image = { path: '', alt: '붉은 루비 표면', caption: '', prompt: rubyPrompt, archetype: 'product-closeup' };
  plannedDraft.sections[1].image = { path: '', alt: '부적절한 계획', caption: '', prompt: '루비 사진을 보여 주세요' };
  plannedDraft.sections[2].image = { path: '/Image/guide/verified-ruby.webp', alt: '기존 루비', caption: '', prompt: '' };
  const plan = automation.planDraftImages(plannedDraft, '루비 처리 확인');
  assert.deepEqual(plan.placements.map(item => item.slot), ['hero', 'section-1', 'section-3']);
  assert.equal(plan.draft.sections[0].image.prompt, rubyPrompt);
  assert.equal(plan.draft.sections[1].image, null);
  assert.equal(plan.placements.find(item => item.slot === 'section-3').reused, true);

  const guide = syntheticGuide(t);
  const generation = generations.createGeneration({ targetSlug: guide.slug });
  const stamp = new Date().toISOString();
  db.prepare(`INSERT INTO image_assets (generation_id,slot,prompt,alt_text,caption,archetype,status,created_at,updated_at) VALUES (?,'hero','test','test','','product-closeup','active',?,?)`).run(generation.id, stamp, stamp);
  assert.equal(images.chooseArchetype({ generationId: generation.id, slot: 'section-1', requested: 'product-closeup', context: '루비 차이' }), 'product-closeup');
  const legacy = `${rubyPrompt} ${images.archetypePrompt('product-closeup')} ${images.archetypePrompt('comparison-layout')}`;
  const final = images.composeImagePrompt(legacy, 'product-closeup');
  assert.equal(final.split(images.archetypePrompt('product-closeup')).length - 1, 1);
  assert.ok(!final.includes(images.archetypePrompt('comparison-layout')));
  assert.ok(final.includes(rubyPrompt));
  assert.equal(images.composeImagePrompt(final, 'product-closeup'), final);
  assert.match(automation.jewelrySubject('루비 처리 확인'), /red ruby/);
  assert.match(automation.jewelrySubject('지르콘과 큐빅 지르코니아'), /zircon and cubic zirconia/);
});

test('본문 이미지가 하나도 없는 신규 글도 표 혼합 여부와 관계없이 실제 TypeScript 검사를 통과한다', () => {
  const ts = require(require.resolve('typescript', { paths: [config.siteRoot] }));
  const options = { strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, types: [] };
  const file = path.join(config.dataDir, 'no-body-image-render.ts');
  function check(script) {
    const prelude = 'declare const siteConfig: { url: string; name: string }; declare function useHead(value: unknown): void; declare function buildBreadcrumbJsonLd(rows: { name: string; path: string }[]): unknown;\n';
    const source = prelude + script.replace(/^import\s+.*$/gm, '');
    const host = ts.createCompilerHost(options);
    const original = host.getSourceFile.bind(host);
    host.getSourceFile = (name, languageVersion, onError, shouldCreateNewSourceFile) => path.resolve(name) === path.resolve(file)
      ? ts.createSourceFile(file, source, languageVersion, true, ts.ScriptKind.TS)
      : original(name, languageVersion, onError, shouldCreateNewSourceFile);
    return ts.getPreEmitDiagnostics(ts.createProgram([file], options, host));
  }
  for (const hasTable of [false, true]) {
    const draft = makeDraft();
    draft.sections.forEach(section => { section.image = null; section.table = null; });
    if (hasTable) draft.sections[1].table = { headers: ['구분', '확인 내용'], rows: [['루비', '처리 정보 확인']] };
    const page = renderNewGuide(draft);
    const script = page.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1];
    assert.deepEqual(check(script).map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), []);
    assert.equal(require('../server/services/contentExtractorService').dataArray(page, 'sections').length, 3);
    const oldInference = script.replace(/const sections: Array<\{[\s\S]*?\n\}> =/, 'const sections =');
    assert.ok(check(oldInference).some(item => item.code === 2339), '타입 회귀 검사가 기존 image 속성 추론 실패를 실제로 포착해야 합니다');
  }
});

test('대표 이미지 설명을 렌더링 계약으로 전달하고 기존 글 수정에서도 보존한다', t => {
  const caption = '이해를 돕기 위한 AI 생성 예시 이미지입니다. 실제 판매 제품이 아닙니다.';
  const guide = syntheticGuide(t, { heroImage: { ...makeDraft().heroImage, caption } });
  const source = fs.readFileSync(guide.sourcePath, 'utf8');
  assert.match(source, /:hero-caption="gmHeroCaption"/);
  assert.ok(source.includes(caption));
  const inventory = require('../server/services/inventoryService');
  const extraction = require('../server/services/contentExtractorService').extractGuideContent(inventory.getGuide(guide.slug), source);
  assert.equal(extraction.heroCaption, caption);
  assert.equal(readOriginalDraft(inventory.getGuide(guide.slug, { includeSource: true })).heroImage.caption, caption);
  const generation = generations.createGeneration({ targetSlug: guide.slug, updateScope: 'sources' });
  const changed = enforceDraftScope(generation, { sources: guide.draft.sources, sourceNote: '검토 자료 추가', heroImage: { ...guide.draft.heroImage, caption: '' } });
  assert.equal(changed.heroImage.caption, caption);
  const patched = patchExistingGuide(source, changed, { policy: generation.input.updatePolicy });
  assert.equal(constExpression(patched, 'gmHeroCaption'), constExpression(source, 'gmHeroCaption'));
});
