const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');

// Always isolate the database, including when this file is run directly.
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-source-preserve-'));
const { db } = require('../server/lib/db');
const { config } = require('../server/lib/config');
const { fileHash } = require('../server/lib/utils');
const policy = require('../server/services/updatePolicyService');
const generations = require('../server/services/generationService');
const { humanizeGeneration } = require('../server/services/humanizerService');
const { generateSlot } = require('../server/services/imageService');
const { renderNewGuide, patchExistingGuide } = require('../server/services/rendererService');
const { constExpression, dataArray } = require('../server/services/contentExtractorService');
const { makeDraft } = require('./fixture');

test.after(() => db.close());
const preserve = ['확인된 수치·단위·등급·날짜와 출처 URL'];
const sourcePlan = (instructions = preserve) => ({
  preserve: instructions,
  changes: [{ id: 'add-official-evidence', enabled: true, area: '출처', action: '핵심 사실마다 공식·권위 출처 연결' }],
});
const added = { label: '추가 검토 자료', url: 'https://www.gia.edu/source-preservation-check', note: '선택한 공식 문서의 확인 기준', official: true };

function syntheticGuide(t, plan = sourcePlan()) {
  const slug = `source-preservation-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const draft = makeDraft({ slug, title: '검증 전용 흑요석 장식 보관 기준', keyword: '검증 전용 흑요석 장식 보관', publishedAt: '2024-01-01' });
  const sourcePath = path.join(config.dataDir, `${slug}.vue`);
  fs.writeFileSync(sourcePath, renderNewGuide(draft));
  const stamp = new Date().toISOString();
  db.prepare(`INSERT INTO guides (slug,path,title,page_title,description,keyword,image,category,published_at,updated_at,source_path,source_hash,is_custom,source_json,scanned_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,'{}',?)`)
    .run(slug, `/guide/${slug}`, draft.title, `${draft.title} | 귀족`, draft.description, draft.keyword, draft.heroImage.path, draft.category, draft.publishedAt, '', sourcePath, fileHash(sourcePath), stamp);
  const auditId = Number(db.prepare(`INSERT INTO content_audits (guide_slug,source_hash,gsc_import_id,ga4_import_id,coverage_import_id,snapshot_json,plan_json,status,created_at,updated_at) VALUES (?,?,0,0,0,'{}',?,'ready',?,?)`)
    .run(slug, fileHash(sourcePath), JSON.stringify(plan), stamp, stamp).lastInsertRowid);
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    db.prepare('DELETE FROM generations WHERE target_slug=?').run(slug);
    db.prepare('DELETE FROM content_audits WHERE guide_slug=?').run(slug);
    db.prepare('DELETE FROM guides WHERE slug=?').run(slug);
    fs.unlinkSync(sourcePath);
    cleaned = true;
  };
  t.after(cleanup);
  return { slug, draft, sourcePath, cleanup, input: { targetSlug: slug, auditId, auditPlan: plan } };
}

function addResearch(generation, { selected = true, linked = true } = {}) {
  return generations.updateGeneration(generation.id, { research_json: JSON.stringify({ official: {
    sources: [{ ...added, selected }],
    claims: linked ? [{ claim: '새 출처에서 기존 관리 기준을 확인했습니다.', sourceUrls: [added.url] }] : [],
  } }) });
}

test('기존 출처 URL 보존은 추가를 허용하고 명시한 출처 필드 전체 보존은 계속 잠근다', () => {
  for (const instruction of [...preserve, '기존 출처 URL 보존', '기존 출처 주소 유지', 'Preserve existing source URLs']) {
    const scope = policy.deriveScope({ auditPlan: sourcePlan([instruction]) });
    assert.deepEqual(scope.fields, ['sourceNote', 'sources'], instruction);
    assert.equal(scope.preserveSourceUrls, true);
    assert.ok(scope.reviewNotes.some(note => note.includes('새 출처만 추가')));
  }
  for (const instructions of [['sources'], ['기존 출처 유지'], ['공식 출처 유지'], ['sources 전체 보존'], [...preserve, '출처 전체 보존'], ['출처 URL과 sources 전체 보존']]) {
    const scope = policy.deriveScope({ auditPlan: sourcePlan(instructions) });
    assert.deepEqual(scope.fields, ['sourceNote'], instructions.join(', '));
    const baseline = makeDraft();
    const merged = policy.enforceDraftScope({ kind: 'update', input: { updatePolicy: { scope, baselineDraft: baseline } } }, { sources: [added] });
    assert.deepEqual(merged.sources, baseline.sources);
  }
  assert.equal(policy.deriveScope({ updateScope: 'sources' }).preserveSourceUrls, false, '명시 보존 지시가 없는 수동 출처 수정 계약은 유지');
});

test('새 출처 병합은 기존 순서·URL·표시 내용을 고정하고 추가 URL은 중복하지 않는다', () => {
  const baseline = makeDraft();
  baseline.sources.push({ ...baseline.sources[0], label: '동일 URL의 기존 보충 설명' });
  const generation = { kind: 'update', input: { updatePolicy: { scope: policy.deriveScope({ auditPlan: sourcePlan() }), baselineDraft: baseline } } };
  const proposed = { sources: [{ ...baseline.sources[0], label: '바꾸면 안 되는 이름', note: '바꾸면 안 되는 설명' }, added, { ...added }] };
  const merged = policy.enforceDraftScope(generation, proposed);
  assert.deepEqual(merged.sources, [...baseline.sources, added]);
  assert.deepEqual(policy.enforceDraftScope(generation, {}).sources, baseline.sources);
  assert.deepEqual(policy.enforceDraftScope(generation, { sources: [] }).sources, baseline.sources);
  assert.throws(() => policy.enforceDraftScope(generation, { sources: null }), { code: 'UPDATE_POLICY', status: 422 });
});

test('실제 저장·승인·반영 검사는 기존 출처 삭제·URL·설명 변경을 거부한다', t => {
  const guide = syntheticGuide(t);
  const generation = addResearch(generations.createGeneration(guide.input));
  const baseline = generation.input.updatePolicy.baselineDraft;
  for (const sources of [[], [added], [{ ...baseline.sources[0], url: added.url }], [{ ...baseline.sources[0], label: '변경한 이름' }], [{ ...baseline.sources[0], note: '변경한 설명' }]]) {
    const changed = { ...structuredClone(baseline), sources };
    assert.throws(() => generations.saveDraft(generation.id, changed), { code: 'UPDATE_SCOPE_DRIFT' });
    generations.updateGeneration(generation.id, { draft_json: JSON.stringify(changed) });
    assert.throws(() => generations.approveGeneration(generation.id), { code: 'UPDATE_SCOPE_DRIFT' });
    assert.throws(() => policy.assertUpdatePolicy(generation, { draft: changed, phase: 'apply' }), { code: 'UPDATE_SCOPE_DRIFT' });
  }
  const valid = policy.enforceDraftScope(generation, { sources: [added] });
  assert.equal(generations.saveDraft(generation.id, valid).draft.sources.length, 2);
  assert.equal(policy.assertUpdatePolicy(generation, { draft: valid, phase: 'apply' }).scope.preserveSourceUrls, true);
});

test('새 출처는 기존 출처와 병합해도 선택 및 비어 있지 않은 조사 주장 연결이 필수다', t => {
  const guide = syntheticGuide(t);
  let generation = generations.createGeneration(guide.input);
  const valid = policy.enforceDraftScope(generation, { sources: [added] });
  assert.throws(() => generations.saveDraft(generation.id, valid), { code: 'SOURCE_NOT_SELECTED' });
  generation = addResearch(generation, { linked: false });
  assert.throws(() => generations.saveDraft(generation.id, valid), { code: 'SOURCE_CLAIM_REQUIRED' });
  generation = addResearch(generation, { selected: false });
  assert.throws(() => generations.saveDraft(generation.id, valid), { code: 'SOURCE_NOT_SELECTED' });
  generation = addResearch(generation);
  assert.deepEqual(generations.saveDraft(generation.id, valid).draft.sources, [...generation.input.updatePolicy.baselineDraft.sources, added]);
});

test('출처 전용 생성은 writer 호출 없이 보존·추가하고 실제 공개 템플릿의 링크까지 렌더링한다', async t => {
  const guide = syntheticGuide(t);
  const generation = addResearch(generations.createGeneration(guide.input));
  let writerCalls = 0;
  const result = await generations.executeWriterPolicy({ generation, write: async () => { writerCalls++; throw new Error('paid writer must not run'); }, inspect: () => ({ blocking: false, findings: [] }) });
  assert.equal(writerCalls, 0);
  assert.equal(policy.needsHumanizer(generation), false);
  assert.deepEqual(result.draft.sources, [...generation.input.updatePolicy.baselineDraft.sources, added]);
  generations.assertSelectedEvidence(generation, result.draft);
  const before = fs.readFileSync(guide.sourcePath, 'utf8');
  const after = patchExistingGuide(before, result.draft, { policy: generation.input.updatePolicy });
  for (const name of ['pageTitle', 'pageDescription', 'gmArticleLead', 'gmHeroCaption', 'quickAnswers', 'sections', 'faqItems', 'cautions', 'relatedLinks']) assert.equal(constExpression(after, name), constExpression(before, name), name);
  assert.match(after, /:sources="gmSources"/);
  const publicSources = dataArray(after, 'gmSources');
  assert.deepEqual(publicSources.map(source => source.url), result.draft.sources.map(source => source.url));

  // Compile the real public sources template, rather than a test copy of it.
  const siteRequire = createRequire(path.join(config.siteRoot, 'package.json'));
  const fragment = fs.readFileSync(path.join(config.siteRoot, 'components/GuideArticleView.vue'), 'utf8').match(/<section class="guide-sources"[\s\S]*?<\/section>/)[0];
  const { compile } = siteRequire('@vue/compiler-ssr');
  const ssrRender = new Function('require', compile(fragment, { mode: 'function' }).code)(siteRequire);
  const html = await siteRequire('vue/server-renderer').renderToString(siteRequire('vue').createSSRApp({ setup: () => ({ props: { sources: publicSources, sourceNote: result.draft.sourceNote } }), ssrRender }));
  for (const source of publicSources) {
    assert.ok(html.includes(`href="${source.url}"`));
    assert.ok(html.includes(source.label));
    assert.ok(html.includes(source.note));
  }
});

test('관찰 전용 legacy 계획은 생성 미등록 및 기존 작업의 유료 단계 진입 전에 거부한다', async t => {
  const monitorPlan = { changes: [{ id: 'preserve-and-monitor', enabled: true, area: '본문', action: '현재 구조 유지 후 다음 동일 기간 측정' }] };
  const guide = syntheticGuide(t, monitorPlan);
  const count = () => db.prepare('SELECT COUNT(*) AS n FROM generations').get().n;
  const before = count();
  assert.throws(() => generations.createGeneration(guide.input), { code: 'MONITOR_ONLY_PLAN', status: 422 });
  assert.equal(count(), before);
  assert.throws(() => policy.deriveScope({ auditPlan: monitorPlan }), { code: 'MONITOR_ONLY_PLAN' });
  assert.doesNotThrow(() => policy.validatePlanCapabilities({ changes: [{ ...monitorPlan.changes[0], enabled: false }] }));

  let generation = generations.createGeneration({ targetSlug: guide.slug, updateScope: 'body' });
  const draft = generation.input.updatePolicy.baselineDraft;
  generation = generations.updateGeneration(generation.id, { input_json: JSON.stringify({ ...generation.input, auditId: guide.input.auditId, auditPlan: monitorPlan }), draft_json: JSON.stringify(draft) });
  const originalFetch = global.fetch;
  let requests = 0;
  global.fetch = async () => { requests++; throw new Error('external request must not run'); };
  try {
    await assert.rejects(() => generations.generateDraft(generation.id), { code: 'MONITOR_ONLY_PLAN' });
    await assert.rejects(() => humanizeGeneration(generation.id), { code: 'MONITOR_ONLY_PLAN' });
    await assert.rejects(() => generateSlot(generation.id), { code: 'MONITOR_ONLY_PLAN' });
    assert.throws(() => generations.approveGeneration(generation.id), { code: 'MONITOR_ONLY_PLAN' });
    assert.throws(() => policy.assertUpdatePolicy(generation, { draft, phase: 'apply' }), { code: 'MONITOR_ONLY_PLAN' });
  } finally { global.fetch = originalFetch; }
  assert.equal(requests, 0);
  assert.equal(generations.getGeneration(generation.id).revision, generation.revision);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM image_assets WHERE generation_id=?').get(generation.id).n, 0);
});

test('페이지별 검색어 근거가 없던 자동 CTR 계획은 기존 작업에서도 차단하고 구체적인 별도 수정은 허용한다', async t => {
  const plan = { changes: [{ id: 'improve-snippet', enabled: true, area: '제목·설명', action: '검색어를 제목에 맞춰 CTR 개선' }] };
  const guide = syntheticGuide(t, plan);
  assert.throws(() => generations.createGeneration(guide.input), { code: 'PAGE_QUERY_EVIDENCE_REQUIRED', status: 422 });
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM generations WHERE target_slug=?').get(guide.slug).n, 0);
  let generation = generations.createGeneration({ targetSlug: guide.slug, updateScope: 'snippet' });
  generation = generations.updateGeneration(generation.id, { input_json: JSON.stringify({ ...generation.input, auditId: guide.input.auditId, auditPlan: plan }), draft_json: JSON.stringify(generation.input.updatePolicy.baselineDraft) });
  const originalFetch = global.fetch;
  let requests = 0;
  global.fetch = async () => { requests++; throw new Error('external request must not run'); };
  try {
    await assert.rejects(() => generations.generateDraft(generation.id), { code: 'PAGE_QUERY_EVIDENCE_REQUIRED' });
    assert.throws(() => generations.approveGeneration(generation.id), { code: 'PAGE_QUERY_EVIDENCE_REQUIRED' });
    assert.throws(() => policy.assertUpdatePolicy(generation, { draft: generation.draft, phase: 'apply' }), { code: 'PAGE_QUERY_EVIDENCE_REQUIRED' });
  } finally { global.fetch = originalFetch; }
  assert.equal(requests, 0);
  assert.deepEqual(policy.deriveScope({ auditPlan: { changes: [{ id: 'verified-description-correction', enabled: true, area: '제목·설명', action: '원문과 다른 메타 설명의 날짜를 수정' }] } }).fields, ['title', 'description']);
  assert.doesNotThrow(() => policy.validatePlanCapabilities({ changes: [{ ...plan.changes[0], enabled: false }] }));
});

const renamedUnsafeChanges = [
  { code: 'MONITOR_ONLY_PLAN', change: { id: 'renamed-monitor', area: '본문', action: '현재 구조 유지 후 다음 동일 기간 측정' } },
  { code: 'MONITOR_ONLY_PLAN', change: { area: '본문', action: '현재 구조 유지 후 다음 동일 기간 측정', proposedState: '다음 기간 측정' } },
  ...['추정 관련 검색어', '사이트 전체 검색어', 'SITEWIDE', 'inferredQueries'].flatMap(phrase => [
    { code: 'PAGE_QUERY_EVIDENCE_REQUIRED', change: { id: 'change-1', area: '제목·설명', action: `${phrase}를 제목에 배치` } },
    { code: 'PAGE_QUERY_EVIDENCE_REQUIRED', change: { area: '제목·설명', action: '제목 개선', proposedState: `${phrase}를 제목 앞부분에 배치` } },
  ]),
];

test('ID를 바꾸거나 생략해도 진단 정규화와 실행 정책이 같은 관찰·검색어 의미를 차단한다', () => {
  const { normalizeObservationPlan } = require('../server/services/contentAuditService');
  for (const { change, code } of renamedUnsafeChanges) {
    const plan = { changes: [{ ...change, enabled: true }] };
    assert.ok(!normalizeObservationPlan(plan).changes.some(item => item.enabled));
    assert.throws(() => policy.validatePlanCapabilities(plan), { code, status: 422 });
    assert.doesNotThrow(() => policy.validatePlanCapabilities({ changes: [{ ...change, enabled: false }] }));
  }
  assert.doesNotThrow(() => policy.validatePlanCapabilities({ changes: [{ id: 'source-reference', enabled: true, area: '출처', action: '사이트 전체 검색어 자료의 한계와 출처를 설명' }] }));
  assert.doesNotThrow(() => policy.validatePlanCapabilities({ changes: [{ id: 'correct-title-fact', enabled: true, area: '제목·설명', action: '본문에 없는 무조건 보장 표현을 조건부 표현으로 수정' }] }));
});

test('직접 생성 POST도 최신 auditId가 있어도 ID를 바꾼 실행 불가 계획을 등록하지 않는다', async t => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ code: error.code, error: error.message }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const originalFetch = global.fetch;
  let externalRequests = 0;
  global.fetch = (...args) => {
    if (!String(args[0]).startsWith(`${base}/`)) { externalRequests++; throw new Error('External requests forbidden'); }
    return originalFetch(...args);
  };
  try {
    const token = (await (await fetch(`${base}/session`)).json()).token;
    for (const { change, code } of renamedUnsafeChanges) {
      const guide = syntheticGuide(t, { changes: [{ ...change, enabled: true }] });
      const response = await fetch(`${base}/generations`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token }, body: JSON.stringify(guide.input) });
      assert.equal(response.status, 422);
      assert.equal((await response.json()).code, code);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM generations WHERE target_slug=?').get(guide.slug).n, 0);
      guide.cleanup();
    }
  } finally {
    global.fetch = originalFetch;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
  assert.equal(externalRequests, 0);
});

test('ID를 바꾼 구작업도 생성·저장·승인·실제 반영 진입을 파일 변경 전에 모두 차단한다', async t => {
  const { apply } = require('../server/services/applyService');
  const originalFetch = global.fetch;
  let requests = 0;
  global.fetch = async () => { requests++; throw new Error('External requests forbidden'); };
  try {
    for (const { change, code } of renamedUnsafeChanges) {
      const plan = { changes: [{ ...change, enabled: true }] };
      const guide = syntheticGuide(t, plan);
      const sourceHash = fileHash(guide.sourcePath);
      let generation = generations.createGeneration({ targetSlug: guide.slug, updateScope: change.area === '본문' ? 'body' : 'snippet' });
      const draft = generation.input.updatePolicy.baselineDraft;
      generation = generations.updateGeneration(generation.id, { input_json: JSON.stringify({ ...generation.input, auditId: guide.input.auditId, auditPlan: plan }), draft_json: JSON.stringify(draft), status: 'approved' });
      await assert.rejects(() => generations.generateDraft(generation.id), { code });
      assert.throws(() => generations.saveDraft(generation.id, draft), { code });
      assert.throws(() => generations.approveGeneration(generation.id), { code });
      await assert.rejects(() => humanizeGeneration(generation.id), { code });
      await assert.rejects(() => generateSlot(generation.id), { code });
      await assert.rejects(() => apply(generation.id), { code });
      assert.equal(generations.getGeneration(generation.id).revision, generation.revision);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM applies WHERE generation_id=?').get(generation.id).n, 0);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM image_assets WHERE generation_id=?').get(generation.id).n, 0);
      assert.equal(fileHash(guide.sourcePath), sourceHash);
      // Each case finishes before another guide with the same fixture intent exists.
      guide.cleanup();
    }
  } finally { global.fetch = originalFetch; }
  assert.equal(requests, 0);
});
