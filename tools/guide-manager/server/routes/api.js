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
const jobs = require('../services/jobService');
const { nowIso } = require('../lib/utils');

const router = express.Router();
// Writes lock only the generation they change; shared site operations retain exclusivity.
function mutationKeys(req) {
  const keys = [];
  const generationId = req.path.match(/^\/generations\/(\d+)(?:\/|$)/)?.[1] || (req.path === '/automation/prepare' ? req.body?.generationId : null);
  if (generationId) keys.push('generation:' + Number(generationId));
  if (req.path === '/generations/bulk-delete') for (const id of req.body.ids || []) keys.push('generation:' + Number(id));
  if (req.path === '/generations' || /\/create-update$/.test(req.path)) keys.push('generation-create');
  if (req.path === '/automation/prepare' && !generationId) keys.push('candidate:' + (req.body.candidateId || 'automatic'));
  if (/\/apply$/.test(req.path) || /^\/applies\/.*\/recover$/.test(req.path) || req.path === '/inventory/refresh' || req.path === '/settings') keys.push('site');
  if (req.path.startsWith('/audits/')) keys.push('audits');
  if (req.path === '/automation/topics') keys.push('topics');
  return [...new Set(keys)];
}
router.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  try {
    if (req.path === '/audits/analyze/start' && audits.jobStatus().state === 'running') return res.json({ ...audits.jobStatus(), alreadyRunning: true });
    if (req.path.startsWith('/audits/') && audits.jobStatus().state === 'running') throw Object.assign(new Error('기존 글 분석이 진행 중입니다. 해당 분석이 끝나면 계획을 저장해 주세요'), { status: 409, code: 'AUDIT_IN_PROGRESS' });
    const generationId = req.path.match(/^\/generations\/(\d+)\//)?.[1];
    if (generationId) {
      const row = db.prepare('SELECT revision FROM generations WHERE id=?').get(Number(generationId));
      if (!row) return res.status(404).json({ error: '작업을 찾을 수 없습니다' });
      if (req.headers['if-match'] !== String(row.revision)) return res.status(409).json({ error: '다른 화면에서 작업이 변경됐습니다. 내 편집은 보관됩니다. 최신 원고를 확인해 주세요', code: 'STALE_REVISION' });
    }
    req.mutationKeys = mutationKeys(req);
    req.releaseMutation = jobs.acquire(req.mutationKeys);
    res.once('finish', req.releaseMutation);
    res.once('close', () => { if (!req.handlerStarted) req.releaseMutation?.(); });
    next();
  } catch (error) { next(error); }
});
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 30 * 1024 * 1024, files: 1 } });

function route(handler) {
  return async (req, res, next) => {
    try { req.handlerStarted = true; res.json(await handler(req, res)); }
    catch (error) { next(error); }
    finally { req.releaseMutation?.(); }
  };
}

function background(action, handler, options = {}) {
  jobs.register(action, payload => handler({ ...payload, query: payload.query || {} }));
  return route((req, res) => {
    const generationId = Number(req.params.id || req.body.generationId) || null;
    const expectedRevision = generationId ? db.prepare('SELECT revision FROM generations WHERE id=?').get(generationId)?.revision : null;
    req.releaseMutation?.();
    const job = jobs.submit(action, { params: req.params, body: req.body, query: req.query }, {
      keys: req.mutationKeys, generationId, expectedRevision, ...options,
    });
    res.status(202);
    return { jobId: job.id, job };
  });
}
router.get('/jobs', route(req => jobs.list({ active: req.query.active === '1' })));
router.get('/jobs/:id', route(req => jobs.get(req.params.id)));
router.post('/jobs/:id/cancel', route(req => jobs.cancel(req.params.id)));
router.post('/jobs/:id/retry', route((req, res) => { const job = jobs.retry(req.params.id); res.status(202); return { jobId: job.id, job }; }));

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
  const opportunity = opportunities.summary({ includeNewTopics: false });
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
router.post('/audits/analyze', background('audit-detail', (req) => audits.analyze({
  slugs: req.body.slugs || null,
  limit: req.body.limit || 10,
  all: !!req.body.all,
  force: !!req.body.force,
}), { timeoutMs: 60 * 60 * 1000, maxCalls: 70, maxTokens: 900000 }));
router.post('/audits/analyze/start', route((req) => { req.releaseMutation?.(); return audits.startAnalyze({
  slugs: req.body.slugs || null,
  limit: req.body.limit || 10,
  all: !!req.body.all,
  force: !!req.body.force,
}); }));
router.get('/audits/analyze/status', route(() => audits.jobStatus()));
router.get('/audits/:slug', route((req) => {
  const item = audits.detail(req.params.slug);
  if (!item) throw Object.assign(new Error('가이드 진단을 찾을 수 없습니다'), { status: 404 });
  return item;
}));
router.put('/audits/:slug/plan', route((req) => audits.savePlan(req.params.slug, req.body.plan || req.body)));
router.post('/audits/:slug/create-update', route((req) => audits.createUpdate(req.params.slug, req.body || {})));
router.post('/automation/topics', background('topics', (req) => topics.suggestTopics({
  limit: req.body.limit || 5,
  force: !!req.body.force,
})));
router.post('/automation/prepare', background('prepare', (req) => automation.prepareBest({
  candidateId: req.body.candidateId || null,
  generationId: req.body.generationId || null,
  businessFacts: req.body.businessFacts || '',
  forceTopics: !!req.body.forceTopics,
  imagePolicy: req.body.imagePolicy || null,
}), { retryMode: 'resume' }));

router.post('/naver/research', background('naver-research', (req) => naver.researchKeyword(req.body.keyword, { depth: req.body.depth || 100 })));
router.get('/naver/due', route(() => ({ rows: naver.dueKeywords(7), quota: naver.quotaState() })));
router.post('/naver/scan', background('naver-scan', (req) => naver.scanDue({ ids: req.body.ids || null, depth: req.body.depth || 100, force: !!req.body.force })));

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
router.post('/generations/:id/research/official', background('official', (req) => generations.researchOfficial(Number(req.params.id), {
  emphasizeOfficial: !!req.body.emphasizeOfficial,
})));
router.post('/generations/:id/research/naver', background('generation-naver', async (req) => {
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
router.post('/generations/:id/generate', background('generate', (req) => generations.generateDraft(Number(req.params.id), { forceModel: req.body.model || null })));
router.post('/generations/:id/humanize', background('humanize', (req) => humanizer.humanizeGeneration(Number(req.params.id))));
router.post('/generations/:id/lint', route((req) => generations.lintGeneration(Number(req.params.id), { requireImage: !!req.body.requireImage })));
router.post('/generations/:id/images', background('image', (req) => images.generateSlot(Number(req.params.id), req.body)));
router.get('/generations/:id/images', route((req) => images.listImages(Number(req.params.id))));
router.post('/generations/:id/approve', route((req) => generations.approveGeneration(Number(req.params.id))));
router.get('/generations/:id/diff', route((req) => applies.preview(Number(req.params.id))));
router.post('/generations/:id/apply', background('apply', req => applies.apply(Number(req.params.id)), { cancellable: false, timeoutMs: 45 * 60 * 1000, retryMode: 'retry' }));

router.post('/applies/:id/recover', route(req => applies.recoverApply(Number(req.params.id))));
router.get('/applies', route(() => applies.listApplies()));
router.get('/settings', route(() => settings.settingsStatus()));
router.get('/settings/evaluations', route(() => evaluations.batchSummary()));
router.post('/settings/evaluations', background('evaluation', () => evaluations.runBenchmark()));
router.put('/settings', route((req) => settings.updateSettings(req.body)));
router.post('/settings/import-reference', route(() => settings.importReferenceCredentials({ force: true })));
router.get('/humanizer/health', route(() => humanizer.health()));
router.post('/humanizer/start', route(() => humanizer.startBackend()));

module.exports = router;
