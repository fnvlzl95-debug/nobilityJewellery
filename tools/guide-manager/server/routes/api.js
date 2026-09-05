const express = require('express');
const multer = require('multer');
const { db } = require('../lib/db');
const { config } = require('../lib/config');
const inventory = require('../services/inventoryService');
const analytics = require('../services/analyticsService');
const opportunities = require('../services/opportunityService');
const settings = require('../services/settingsService');
const naver = require('../services/naverService');
const generations = require('../services/generationService');
const humanizer = require('../services/humanizerService');
const images = require('../services/imageService');
const applies = require('../services/applyService');
const baselines = require('../services/baselineService');
const evaluations = require('../services/evaluationService');
const topics = require('../services/topicService');
const automation = require('../services/automationService');
const audits = require('../services/contentAuditService');
const measurement = require('../services/measurementService');
const { nowIso } = require('../lib/utils');

const router = express.Router();
// Serialize mutations across tabs so delayed AI results cannot overwrite a newer edit.
let mutation = null;
router.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (audits.jobStatus().state === 'running') return res.status(409).json({ error: '기존 글 분석이 진행 중입니다. 완료 후 수정해 주세요' });
  if (mutation) return res.status(409).json({ error: '다른 작업이 진행 중입니다. 완료 후 다시 시도해 주세요', code: 'WORK_IN_PROGRESS' });
  const generationId = req.path.match(/^\/generations\/(\d+)\//)?.[1];
  if (generationId) {
    const row = db.prepare('SELECT revision FROM generations WHERE id=?').get(Number(generationId));
    if (!row) return res.status(404).json({ error: '작업을 찾을 수 없습니다' });
    if (req.headers['if-match'] !== String(row.revision)) return res.status(409).json({ error: '다른 화면에서 작업이 변경됐습니다. 새로고침 후 내용을 확인해 주세요', code: 'STALE_REVISION' });
  }
  const marker = Symbol(); mutation = marker;
  // Release on response finish, not socket close: disconnected AI calls still run.
  res.once('finish', () => { if (mutation === marker) mutation = null; });
  req.releaseMutation = () => { if (mutation === marker) mutation = null; };
  next();
});
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 30 * 1024 * 1024, files: 1 } });

function route(handler) {
  return async (req, res, next) => {
    try { res.json(await handler(req, res)); }
    catch (error) { next(error); }
    finally { req.releaseMutation?.(); }
  };
}

function freshness() {
  return {
    fetchedAt: nowIso(),
    inventoryScannedAt: db.prepare('SELECT MAX(scanned_at) AS value FROM guides').get()?.value || null,
    analyticsImportedAt: db.prepare('SELECT MAX(imported_at) AS value FROM analytics_imports').get()?.value || null,
    rankMeasuredAt: db.prepare('SELECT MAX(checked_at) AS value FROM rank_snapshots').get()?.value || null,
  };
}

router.get('/health', route(async () => ({
  app: 'noblesse-guide-manager',
  ok: true,
  localOnly: true,
  time: new Date().toISOString(),
  inventory: db.prepare('SELECT COUNT(*) AS total, SUM(is_custom) AS custom FROM guides').get(),
  credentials: settings.settingsStatus(),
  humanizer: await humanizer.health(),
})));

router.get('/dashboard', route(async () => {
  const guideCounts = db.prepare(`
    SELECT COUNT(*) AS total, SUM(CASE WHEN is_custom=0 THEN 1 ELSE 0 END) AS standard,
      SUM(CASE WHEN is_custom=1 THEN 1 ELSE 0 END) AS custom FROM guides
  `).get();
  const imports = analytics.listImports();
  const opportunity = opportunities.summary();
  return {
    guides: guideCounts,
    dataQuality: measurement.dataQuality(),
    clusters: inventory.listClusters(),
    imports,
    latest: {
      ga4: analytics.latestGa4PagesImport(),
      organic: analytics.latestImport('ga4_organic_landing'),
      naver: analytics.latestImport('naver_web_performance'),
      performance: analytics.latestImport('gsc_performance'),
      coverage: analytics.latestImport('gsc_coverage'),
    },
    opportunityCounts: opportunity.counts,
    topOpportunities: opportunity.pageRows.slice(0, 8),
    dueKeywords: naver.dueKeywords(7).slice(0, 10),
    quota: naver.quotaState(),
    recentGenerations: generations.listGenerations().slice(0, 6),
    freshness: freshness(),
  };
}));

router.post('/inventory/refresh', route(() => {
  const result = inventory.scanInventory();
  return { ...result, ga4Mappings: analytics.reconcileGa4Mappings(), organicMappings: analytics.reconcileGa4OrganicMappings() };
}));
router.get('/guides', route(() => inventory.listGuides()));
router.get('/clusters', route(() => inventory.listClusters()));
router.get('/guides/:slug', route((req) => {
  const guide = inventory.getGuide(req.params.slug, { includeSource: req.query.source === '1' });
  if (!guide) throw Object.assign(new Error('가이드를 찾을 수 없습니다'), { status: 404 });
  return guide;
}));

router.get('/measurement', route(() => measurement.listOutcomes()));
router.post('/measurement/outcomes', route(req => measurement.saveOutcome(req.body)));
router.get('/analytics/imports', route(() => analytics.listImports()));
router.post('/analytics/comparisons/:id/deployment', route(req => baselines.recordDeployment(Number(req.params.id), req.body)));
router.get('/analytics/comparisons', route(() => baselines.listComparisons()));
router.post('/analytics/import', upload.single('file'), route((req) => {
  if (!req.file) throw new Error('가져올 파일을 선택해 주세요');
  return analytics.importBuffer(req.file.buffer, req.file.originalname);
}));
router.get('/opportunities', route(() => ({ ...opportunities.summary(), freshness: freshness() })));
router.get('/audits', route(() => audits.report()));
router.post('/audits/scan', route(() => ({ scan: audits.scanAll(), report: audits.report() })));
router.post('/audits/analyze', route((req) => audits.analyze({
  slugs: req.body.slugs || null,
  limit: req.body.limit || 10,
  all: !!req.body.all,
  force: !!req.body.force,
})));
router.post('/audits/analyze/start', route((req) => audits.startAnalyze({
  slugs: req.body.slugs || null,
  limit: req.body.limit || 10,
  all: !!req.body.all,
  force: !!req.body.force,
})));
router.get('/audits/analyze/status', route(() => audits.jobStatus()));
router.get('/audits/:slug', route((req) => {
  const item = audits.detail(req.params.slug);
  if (!item) throw Object.assign(new Error('가이드 진단을 찾을 수 없습니다'), { status: 404 });
  return item;
}));
router.put('/audits/:slug/plan', route((req) => audits.savePlan(req.params.slug, req.body.plan || req.body)));
router.post('/audits/:slug/create-update', route((req) => audits.createUpdate(req.params.slug, req.body || {})));
router.post('/automation/topics', route((req) => topics.suggestTopics({
  limit: req.body.limit || 5,
  force: !!req.body.force,
})));
router.post('/automation/prepare', route((req) => automation.prepareBest({
  candidateId: req.body.candidateId || null,
  generationId: req.body.generationId || null,
  businessFacts: req.body.businessFacts || '',
  forceTopics: !!req.body.forceTopics,
  imagePolicy: req.body.imagePolicy || null,
})));

router.post('/naver/research', route((req) => naver.researchKeyword(req.body.keyword, { depth: req.body.depth || 100 })));
router.get('/naver/due', route(() => ({ rows: naver.dueKeywords(7), quota: naver.quotaState() })));
router.post('/naver/scan', route((req) => naver.scanDue({ ids: req.body.ids || null, depth: req.body.depth || 100, force: !!req.body.force })));

router.get('/generations', route((req) => generations.listGenerations({ includeArchived: req.query.archived === '1' })));
router.post('/generations', route((req) => generations.createGeneration(req.body)));
router.post('/generations/bulk-delete', route((req) => generations.deleteGenerations(req.body.ids || [])));
router.delete('/generations/:id', route((req) => generations.deleteGeneration(Number(req.params.id))));
router.get('/generations/:id', route((req) => {
  const item = generations.getGeneration(Number(req.params.id));
  if (!item) throw Object.assign(new Error('생성 작업을 찾을 수 없습니다'), { status: 404 });
  return item;
}));
router.put('/generations/:id/draft', route((req) => generations.saveDraft(Number(req.params.id), req.body.draft)));
router.post('/generations/:id/research/official', route((req) => generations.researchOfficial(Number(req.params.id), {
  emphasizeOfficial: !!req.body.emphasizeOfficial,
})));
router.post('/generations/:id/research/naver', route(async (req) => {
  const id = Number(req.params.id);
  const generation = generations.getGeneration(id);
  if (!generation) throw Object.assign(new Error('생성 작업을 찾을 수 없습니다'), { status: 404 });
  const result = await naver.researchKeyword(req.body.keyword || generation.topic, { depth: req.body.depth || 100 });
  const research = { ...(generation.research || {}), naver: result, naverResearchedAt: new Date().toISOString() };
  return generations.updateGeneration(id, { research_json: JSON.stringify(research), status: generation.status === 'idea' ? 'researched' : generation.status });
}));
router.put('/generations/:id/sources', route((req) => generations.selectSources(Number(req.params.id), req.body.selectedUrls || [], {
  allowWithoutOfficial: typeof req.body.allowWithoutOfficial === 'boolean' ? req.body.allowWithoutOfficial : null,
})));
router.post('/generations/:id/generate', route((req) => generations.generateDraft(Number(req.params.id), { forceModel: req.body.model || null })));
router.post('/generations/:id/humanize', route((req) => humanizer.humanizeGeneration(Number(req.params.id))));
router.post('/generations/:id/lint', route((req) => generations.lintGeneration(Number(req.params.id), { requireImage: !!req.body.requireImage })));
router.post('/generations/:id/images', route((req) => images.generateSlot(Number(req.params.id), req.body)));
router.get('/generations/:id/images', route((req) => images.listImages(Number(req.params.id))));
router.post('/generations/:id/approve', route((req) => generations.approveGeneration(Number(req.params.id))));
router.get('/generations/:id/diff', route((req) => applies.preview(Number(req.params.id))));
router.post('/generations/:id/apply', route((req) => applies.apply(Number(req.params.id))));

router.post('/applies/:id/recover', route(req => applies.recoverApply(Number(req.params.id))));
router.get('/applies', route(() => applies.listApplies()));
router.get('/settings', route(() => settings.settingsStatus()));
router.get('/settings/evaluations', route(() => evaluations.batchSummary()));
router.post('/settings/evaluations', route(() => evaluations.runBenchmark()));
router.put('/settings', route((req) => settings.updateSettings(req.body)));
router.post('/settings/import-reference', route(() => settings.importReferenceCredentials({ force: true })));
router.get('/humanizer/health', route(() => humanizer.health()));
router.post('/humanizer/start', route(() => humanizer.startBackend()));

module.exports = router;
