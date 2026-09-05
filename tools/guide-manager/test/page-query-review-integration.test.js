const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { execFileSync } = require('node:child_process');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-page-query-review-'));
const { db, getSetting, setSetting } = require('../server/lib/db');
const { config } = require('../server/lib/config');
const { fileHash, sha256 } = require('../server/lib/utils');
const { makeDraft } = require('./fixture');
const { renderNewGuide, renderGuideSummary } = require('../server/services/rendererService');
const { extractGuideContent, dataArray } = require('../server/services/contentExtractorService');
const analytics = require('../server/services/analyticsService');
const { buildQueryEvidence } = require('../server/services/queryEvidenceService');
const policy = require('../server/services/updatePolicyService');
const generations = require('../server/services/generationService');
const audits = require('../server/services/contentAuditService');
const { apply } = require('../server/services/applyService');
test.after(() => db.close());

const date = offset => new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);
const period = { periodStart: date(-28), periodEnd: date(-1) };
const property = 'https://noblessegold.com/';
let sequence = 0;
function importRow(type, summary, dates = period) {
  const id = Number(db.prepare(`INSERT INTO analytics_imports(source_type,file_name,file_hash,period_start,period_end,parser_version,summary_json,imported_at) VALUES(?,?,?,?,?,'review-test',?,?)`)
    .run(type, `fixture-${++sequence}.zip`, sha256(`review-${sequence}`), dates.periodStart, dates.periodEnd, JSON.stringify(summary), new Date().toISOString()).lastInsertRowid);
  return id;
}

function fixture(t, { siteRoot = null, draftOverrides = {} } = {}) {
  const slug = `page-query-review-${++sequence}`;
  const draft = makeDraft({ slug, title: '검증 전용 흑요석 장식 보관 기준', keyword: '검증 전용 흑요석 장식 보관', publishedAt: '2024-01-01', ...draftOverrides });
  const sourcePath = siteRoot ? path.join(siteRoot, 'pages', 'guide', `${slug}.vue`) : path.join(config.dataDir, `${slug}.vue`);
  fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
  fs.writeFileSync(sourcePath, renderNewGuide(draft));
  const guidePath = `/guide/${slug}`, pageUrl = `https://noblessegold.com${guidePath}`, stamp = new Date().toISOString();
  db.prepare(`INSERT INTO guides (slug,path,title,page_title,description,keyword,image,category,published_at,updated_at,source_path,source_hash,is_custom,source_json,scanned_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0,'{}',?)`)
    .run(slug, guidePath, draft.title, `${draft.title} | 귀족`, draft.description, draft.keyword, draft.heroImage.path, draft.category, draft.publishedAt, '', sourcePath, fileHash(sourcePath), stamp);
  const gscId = importRow('gsc_performance', { sitewideEligible: true, property, searchType: 'web' });
  const scope = { property, searchType: 'web', pageFilterType: 'equals', pageFilterUrl: pageUrl, ...period, complete: true, metricIntegrity: true, pageClicks: 5, pageImpressions: 120, queryRows: 1 };
  const summary = { sitewideEligible: false, pageQueryEligible: true, pageQueryScopeVersion: 1, pageQueryScope: scope };
  const addPageImport = () => {
    const id = importRow('gsc_performance_scoped', summary);
    db.prepare('INSERT INTO gsc_pages(import_id,original_url,normalized_url,clicks,impressions,ctr,position) VALUES(?,?,?,?,?,?,?)').run(id, pageUrl, pageUrl, 5, 120, 5 / 120, 7);
    db.prepare('INSERT INTO gsc_queries(import_id,query,clicks,impressions,ctr,position) VALUES(?,?,?,?,?,?)').run(id, draft.keyword, 3, 60, 0.05, 7);
    return id;
  };
  const pageImportId = addPageImport();
  const guide = { slug, path: guidePath, sourcePath, source: fs.readFileSync(sourcePath, 'utf8'), category: draft.category, title: draft.title, keyword: draft.keyword, image: draft.heroImage.path, publishedAt: draft.publishedAt };
  const content = extractGuideContent(guide, guide.source);
  const performance = analytics.latestImport('gsc_performance');
  const bundle = analytics.selectPageQueryEvidence(pageUrl, performance);
  assert.equal(bundle.importId, pageImportId);
  const evidence = buildQueryEvidence({ content, performance, pageUrl, pageQueryBundle: bundle });
  assert.equal(evidence.queryEvidence.canRecommendTitleKeywords, true);
  const snapshot = { guide: { ...guide, sourceHash: fileHash(sourcePath) }, content, ...evidence,
    periods: { gsc: { start: period.periodStart, end: period.periodEnd, importId: gscId } },
    guards: { keepSnippet: false, keepNaverSnippet: false, recentObservationHold: false }, contextFingerprint: sha256(`audit-context-${slug}`) };
  const plan = { proposedTitle: draft.title, proposedDescription: `${draft.description} 제품 상태에 따른 보관 조건을 확인하세요.`, preserve: ['기존 본문 전체 유지'], changes: [{ id: policy.PAGE_QUERY_CHANGE_ID, area: '제목·설명', enabled: true, action: '페이지 검색어와 원문 불일치 수정', proposedState: '확인한 내용에 맞게 제목의 표현 범위만 조정합니다.' }],
    pageQueryReview: { confirmed: true, mismatch: '현재 설명에 보관 조건이 생략되어 실제 본문에 설명한 조건부 관리 범위와 일치하지 않습니다.', selectedQueries: [draft.keyword], evidence: policy.pageQueryIdentity(evidence.queryEvidence), contextFingerprint: snapshot.contextFingerprint } };
  const auditId = Number(db.prepare(`INSERT INTO content_audits(guide_slug,source_hash,gsc_import_id,ga4_import_id,coverage_import_id,snapshot_json,plan_json,status,created_at,updated_at) VALUES(?,?,?,0,0,?,?,'ready',?,?)`)
    .run(slug, fileHash(sourcePath), gscId, JSON.stringify(snapshot), JSON.stringify(plan), stamp, stamp).lastInsertRowid);
  t.after(() => {
    db.prepare('DELETE FROM content_baselines WHERE generation_id IN (SELECT id FROM generations WHERE target_slug=?)').run(slug);
    db.prepare('DELETE FROM applies WHERE generation_id IN (SELECT id FROM generations WHERE target_slug=?)').run(slug);
    db.prepare('DELETE FROM generations WHERE target_slug=?').run(slug);
    db.prepare('DELETE FROM content_audits WHERE guide_slug=?').run(slug);
    db.prepare('DELETE FROM guides WHERE slug=?').run(slug);
    db.prepare('DELETE FROM analytics_imports').run();
    fs.unlinkSync(sourcePath);
  });
  return { slug, draft, sourcePath, pageUrl, gscId, pageImportId, snapshot, plan, summary, addPageImport,
    input: { targetSlug: slug, auditId, auditPlan: plan, reviewedContextFingerprint: snapshot.contextFingerprint } };
}

test('verified page queries stay disabled until an actual mismatch and matching source are reviewed', t => {
  const f = fixture(t);
  const seeded = audits.normalizeObservationPlan({ changes: [] }, f.snapshot);
  assert.equal(seeded.changes.length, 1);
  assert.equal(seeded.changes[0].id, policy.PAGE_QUERY_CHANGE_ID);
  assert.equal(seeded.changes[0].enabled, false);
  assert.equal(seeded.pageQueryReview.confirmed, false);
  const generation = generations.createGeneration(f.input);
  assert.deepEqual(generation.input.updatePolicy.scope.fields, ['title', 'description']);
  const original = generation.input.updatePolicy.baselineDraft;
  const merged = policy.enforceDraftScope(generation, { ...original, title: '검토 후 제목', sections: [{ title: '원치 않은 본문', paragraphs: ['덮어쓰기 시도'] }] });
  assert.equal(merged.title, '검토 후 제목');
  assert.deepEqual(merged.sections, original.sections);
  assert.deepEqual(merged.heroImage, original.heroImage);
  assert.equal(policy.needsHumanizer(generation), false);
  assert.throws(() => policy.assertUpdatePolicy(generation, { draft: { ...original, updatedAt: date(0) }, phase: 'approve' }), { code: 'NO_SNIPPET_CHANGE' });
  assert.doesNotThrow(() => policy.assertUpdatePolicy(generation, { draft: merged, phase: 'approve' }));
});

test('the explicitly corrected snippet opens as a preserved draft and regeneration makes no paid call', async t => {
  const f = fixture(t);
  const fetchBefore = global.fetch;
  let paid = 0;
  global.fetch = async () => { paid++; throw new Error('External calls forbidden'); };
  try {
    const generation = generations.createGeneration(f.input);
    const baseline = generation.input.updatePolicy.baselineDraft;
    assert.equal(generation.input.draftMode, 'reviewed_page_query_snippet');
    assert.equal(generation.draft.title, f.plan.proposedTitle);
    assert.equal(generation.draft.description, f.plan.proposedDescription);
    for (const key of Object.keys(baseline).filter(key => !['title', 'description', 'updatedAt'].includes(key))) assert.deepEqual(generation.draft[key], baseline[key], key);
    assert.ok(generation.lint, 'normal lint still runs on the preserved draft');
    await assert.rejects(() => require('../server/services/automationService').prepareBest({ generationId: generation.id }), { code: 'MANUAL_DRAFT_MODE', status: 422 });
    await assert.rejects(() => generations.researchOfficial(generation.id), { code: 'MANUAL_DRAFT_MODE', status: 422 });
    const regenerated = await generations.generateDraft(generation.id, { forceModel: 'gpt-5.6-terra' });
    assert.equal(regenerated.draft.description, f.plan.proposedDescription);
    assert.equal(regenerated.revision, generation.revision);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM model_runs WHERE generation_id=?').get(generation.id).n, 0);
  } finally { global.fetch = fetchBefore; }
  assert.equal(paid, 0);
});

test('manual correction reaches approved apply and preserves public body, images and sources in an isolated site', async t => {
  const site = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-page-query-apply-site-'));
  const previousSite = getSetting('site_root', config.siteRoot);
  setSetting('site_root', site);
  t.after(() => setSetting('site_root', previousSite));
  const example = makeDraft();
  const f = fixture(t, { siteRoot: site, draftOverrides: {
    heroImage: { ...example.heroImage, path: '/Image/guide/preserved-hero.png' },
    sections: example.sections.map((section, index) => index === 1 ? {
      ...section, table: { headers: ['구분', '확인'], rows: [['유광', '표면 상태'], ['무광', '마감 방향']] },
      image: { ...example.heroImage, path: '/Image/guide/preserved-body.png', alt: '기존 마감 도구와 표면 상태' },
    } : section),
    relatedLinks: [
      { to: '/guide', label: '가이드', description: '다른 관리 기준' },
      { to: '/repair', label: '수리', description: '실물 수리 상담' },
      { to: '/contact', label: '문의', description: '조건 확인' },
    ],
  } });
  f.plan.proposedTitle = '검증 전용 흑요석 장식 보관 전 확인';
  f.plan.pageQueryReview.mismatch = '현재 제목과 설명에 보관 전 확인 조건이 생략되어 본문의 조건부 관리 범위와 일치하도록 표현을 교정합니다.';
  const indexPath = path.join(site, 'data', 'guide-posts.ts');
  const clusterPath = path.join(site, 'data', 'guide-clusters.ts');
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, `export const guidePosts = [${renderGuideSummary(f.draft)}];\n`);
  fs.writeFileSync(clusterPath, 'export const guideClusters = [];\n');
  fs.writeFileSync(path.join(site, 'nuxt.config.ts'), 'export default {};\n');
  const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZ1sAAAAASUVORK5CYII=', 'base64');
  const imagePaths = [f.draft.heroImage.path, f.draft.sections[1].image.path].map(url => path.join(site, 'public', url.slice(1)));
  for (const imagePath of imagePaths) { fs.mkdirSync(path.dirname(imagePath), { recursive: true }); fs.writeFileSync(imagePath, pixel); }
  const { gitExecutable } = require('../server/lib/executables');
  const git = args => execFileSync(gitExecutable(), args, { cwd: site, windowsHide: true, stdio: 'pipe' });
  git(['init']); git(['add', '.']); git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'isolated fixture']);
  const originalSource = fs.readFileSync(f.sourcePath, 'utf8');
  const originalIndex = fs.readFileSync(indexPath, 'utf8');
  const originalCluster = fs.readFileSync(clusterPath, 'utf8');
  const imageHashes = imagePaths.map(fileHash);
  const parser = require(path.join(config.siteRoot, 'node_modules', '@vue', 'compiler-sfc'));
  const validateOutput = () => {
    const source = fs.readFileSync(f.sourcePath, 'utf8');
    const content = extractGuideContent({ slug: f.slug, path: `/guide/${f.slug}`, image: f.draft.heroImage.path }, source);
    assert.equal(content.title, f.plan.proposedTitle);
    assert.equal(content.description, f.plan.proposedDescription);
    assert.equal(content.technical.selfCanonical, true);
    for (const name of ['gmSections', 'sections', 'quickAnswers', 'cautions', 'faqItems', 'relatedLinks', 'sources']) assert.deepEqual(dataArray(source, name), dataArray(originalSource, name), name);
    assert.deepEqual(content.sources, f.snapshot.content.sources);
    assert.equal(content.heroCaption, f.snapshot.content.heroCaption);
    assert.deepEqual(imagePaths.map(fileHash), imageHashes);
    assert.equal(fs.readFileSync(clusterPath, 'utf8'), originalCluster);
    const parsed = parser.parse(source);
    assert.deepEqual(parsed.errors, []);
    parser.compileScript(parsed.descriptor, { id: 'isolated-page-query-apply' });
    const entry = require('../server/services/inventoryService').parseGuidePosts(fs.readFileSync(indexPath, 'utf8'))[0];
    assert.equal(entry.title, f.plan.proposedTitle);
    assert.equal(entry.description, f.plan.proposedDescription);
    assert.equal(entry.image, f.draft.heroImage.path);
    assert.equal(entry.publishedAt, f.draft.publishedAt);
  };
  const applyPath = require.resolve('../server/services/applyService');
  const checked = [];
  const sandbox = { module: { exports: {} }, require: createRequire(applyPath), process, Buffer, setTimeout, clearTimeout,
    validateFixture: async command => { validateOutput(); checked.push(command); return { command, ok: true, validationMode: 'fixture Vue syntax, metadata and preservation assertions; full Nuxt build excluded' }; } };
  vm.runInNewContext(`${fs.readFileSync(applyPath, 'utf8')}\nrunValidation = validateFixture;`, sandbox, { filename: applyPath });
  const fetchBefore = global.fetch;
  let paid = 0;
  global.fetch = async () => { paid++; throw new Error('External calls forbidden'); };
  try {
    const generation = generations.createGeneration(f.input);
    assert.notEqual(generation.draft.title, f.snapshot.content.title);
    assert.notEqual(generation.draft.description, f.snapshot.content.description);
    assert.equal(generation.lint.blocking, false, JSON.stringify(generation.lint.findings));
    const linted = generations.lintGeneration(generation.id, { requireImage: true });
    assert.equal(linted.lint.blocking, false);
    const diff = sandbox.module.exports.preview(generation.id);
    assert.equal(diff.files.length, 2);
    assert.equal(diff.images.length, 0);
    assert.ok(diff.files[0].changes.some(part => part.added && part.value.includes(f.plan.proposedDescription)));
    assert.equal(fs.readFileSync(f.sourcePath, 'utf8'), originalSource);
    assert.equal(fs.readFileSync(indexPath, 'utf8'), originalIndex);
    const approved = generations.approveGeneration(generation.id);
    assert.equal(approved.status, 'approved');
    const result = await sandbox.module.exports.apply(generation.id);
    assert.equal(result.state, 'done');
    assert.deepEqual(checked, ['typecheck', 'build', 'verify:seo']);
    assert.equal(generations.getGeneration(generation.id).status, 'applied');
    assert.equal(db.prepare('SELECT state FROM applies WHERE id=?').get(result.applyId).state, 'done');
    validateOutput();
  } finally { global.fetch = fetchBefore; }
  assert.equal(paid, 0);
});

test('unchanged text and mixed scopes do not create a generation or refresh the guide date', t => {
  const f = fixture(t);
  const originalHash = fileHash(f.sourcePath);
  const unchanged = structuredClone(f.input);
  unchanged.auditPlan.proposedTitle = f.snapshot.content.title;
  unchanged.auditPlan.proposedDescription = f.snapshot.content.description;
  assert.throws(() => generations.createGeneration(unchanged), { code: 'NO_SNIPPET_CHANGE' });
  const mixed = structuredClone(f.input);
  mixed.auditPlan.changes.push({ id: 'source-task', area: '출처', enabled: true, action: '공식 출처 추가' });
  assert.throws(() => generations.createGeneration(mixed), { code: 'PAGE_QUERY_SCOPE_CONFLICT' });
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM generations WHERE target_slug=?').get(f.slug).n, 0);
  assert.equal(db.prepare('SELECT updated_at FROM guides WHERE slug=?').get(f.slug).updated_at, '');
  assert.equal(fileHash(f.sourcePath), originalHash);
});

test('a forged eligibility flag, missing review, wrong query or stale fingerprint cannot register a generation', t => {
  const f = fixture(t);
  for (const alter of [
    input => { input.auditPlan.pageQueryReview.confirmed = false; },
    input => { input.auditPlan.pageQueryReview.selectedQueries = ['보석']; },
    input => { input.auditPlan.pageQueryReview.evidence.importId += 1; },
    input => { input.auditPlan.pageQueryReview.contextFingerprint = 'forged'; },
    input => { input.auditPlan.pageQueryReview.mismatch = '수정'; },
  ]) {
    const input = structuredClone(f.input); alter(input);
    assert.throws(() => generations.createGeneration(input), error => ['PAGE_QUERY_REVIEW_REQUIRED', 'STALE_PAGE_QUERY_EVIDENCE'].includes(error.code));
  }
  db.prepare('DELETE FROM analytics_imports WHERE id=?').run(f.pageImportId);
  const forged = structuredClone(f.input);
  forged.canRecommendTitleKeywords = true;
  forged.auditPlan.pageQueryReview.canRecommendTitleKeywords = true;
  assert.throws(() => generations.createGeneration(forged), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM generations WHERE target_slug=?').get(f.slug).n, 0);
});

test('swapping the page import blocks generate, draft save, approval and apply before paid requests or file writes', async t => {
  const f = fixture(t);
  let generation = generations.createGeneration(f.input);
  const draft = generation.input.updatePolicy.baselineDraft;
  generation = generations.updateGeneration(generation.id, { draft_json: JSON.stringify(draft), status: 'approved' });
  const sourceHash = fileHash(f.sourcePath);
  f.addPageImport();
  let paid = 0;
  const fetchBefore = global.fetch;
  global.fetch = async () => { paid++; throw new Error('External calls forbidden'); };
  try {
    await assert.rejects(() => generations.generateDraft(generation.id), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
    assert.throws(() => generations.saveDraft(generation.id, draft), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
    assert.throws(() => generations.approveGeneration(generation.id), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
    await assert.rejects(() => apply(generation.id), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
  } finally { global.fetch = fetchBefore; }
  assert.equal(paid, 0);
  assert.equal(generations.getGeneration(generation.id).revision, generation.revision);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM applies WHERE generation_id=?').get(generation.id).n, 0);
  assert.equal(fileHash(f.sourcePath), sourceHash);
});

test('changing rows inside the same import, the exact URL, or the current period invalidates review', t => {
  const f = fixture(t);
  const generation = generations.createGeneration(f.input);
  db.prepare('UPDATE gsc_queries SET impressions=75,ctr=? WHERE import_id=?').run(3 / 75, f.pageImportId);
  assert.throws(() => policy.assertUpdatePolicy(generation), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
  db.prepare('UPDATE gsc_queries SET impressions=60,ctr=0.05 WHERE import_id=?').run(f.pageImportId);
  assert.doesNotThrow(() => policy.assertUpdatePolicy(generation));
  const wrongScope = structuredClone(f.summary);
  wrongScope.pageQueryScope.pageFilterUrl += '/';
  db.prepare('UPDATE analytics_imports SET summary_json=? WHERE id=?').run(JSON.stringify(wrongScope), f.pageImportId);
  assert.throws(() => policy.assertUpdatePolicy(generation), { code: 'STALE_PAGE_QUERY_EVIDENCE' });
  db.prepare('UPDATE analytics_imports SET summary_json=? WHERE id=?').run(JSON.stringify(f.summary), f.pageImportId);
  importRow('gsc_performance', { sitewideEligible: true, property, searchType: 'web' }, { periodStart: date(-27), periodEnd: date(0) });
  assert.throws(() => policy.assertUpdatePolicy(generation), { code: 'STALE_AUDIT' });
});

test('verified search evidence cannot override D31, protected titles, or original-source changes', t => {
  const f = fixture(t);
  db.prepare('UPDATE guides SET updated_at=? WHERE slug=?').run(date(0), f.slug);
  assert.throws(() => generations.createGeneration(f.input), { code: 'OBSERVATION_HOLD' });
  db.prepare("UPDATE guides SET updated_at='' WHERE slug=?").run(f.slug);
  const protectedSnapshot = structuredClone(f.snapshot); protectedSnapshot.guards.keepNaverSnippet = true;
  db.prepare('UPDATE content_audits SET snapshot_json=? WHERE id=?').run(JSON.stringify(protectedSnapshot), f.input.auditId);
  assert.throws(() => generations.createGeneration(f.input), { code: 'SNIPPET_PROTECTED' });
  db.prepare('UPDATE content_audits SET snapshot_json=? WHERE id=?').run(JSON.stringify(f.snapshot), f.input.auditId);
  const generation = generations.createGeneration(f.input);
  fs.appendFileSync(f.sourcePath, '\n<!-- source changed after review -->\n');
  assert.throws(() => policy.assertUpdatePolicy(generation), { code: 'STALE_AUDIT' });
});
