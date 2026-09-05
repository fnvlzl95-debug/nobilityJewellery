const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { execFileSync } = require('node:child_process');
const site = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-audit-refresh-site-'));
process.env.SITE_ROOT = site;
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-audit-refresh-db-'));
const { db } = require('../server/lib/db');
const { koreaDate, fileHash } = require('../server/lib/utils');
const { gitExecutable } = require('../server/lib/executables');
const { makeDraft } = require('./fixture');
const { renderNewGuide, renderGuideSummary } = require('../server/services/rendererService');
const inventory = require('../server/services/inventoryService');
const audits = require('../server/services/contentAuditService');
const generations = require('../server/services/generationService');
const { enforceDraftScope } = require('../server/services/updatePolicyService');
test.after(() => db.close());
fs.mkdirSync(path.join(site, 'data'), { recursive: true });
fs.mkdirSync(path.join(site, 'pages', 'guide'), { recursive: true });
fs.writeFileSync(path.join(site, 'data', 'guide-clusters.ts'), 'export const guideClusters = [];\n');
const drafts = new Map();
const git = args => execFileSync(gitExecutable(), args, { cwd: site, windowsHide: true, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: '2024-01-01T00:00:00Z', GIT_COMMITTER_DATE: '2024-01-01T00:00:00Z' } });
git(['init']);
git(['config', 'core.excludesfile', path.join(site, '.git', 'info', 'exclude')]);
git(['config', 'core.autocrlf', 'false']);
function writeGuide(draft) {
  drafts.set(draft.slug, draft);
  const file = path.join(site, 'pages', 'guide', `${draft.slug}.vue`);
  fs.writeFileSync(file, renderNewGuide(draft));
  fs.writeFileSync(path.join(site, 'data', 'guide-posts.ts'), `export const guidePosts = [${[...drafts.values()].map(renderGuideSummary).join(',\n')}];\n`);
  return file;
}

test('same-count existing guide edits refresh audit sources, D31 and context on the next read, then reuse the cache', () => {
  const beforeDraft = makeDraft({ slug: 'audit-refresh-first', publishedAt: '2024-01-01', sources: [], sourceNote: '' });
  writeGuide(beforeDraft);
  git(['add', '.']); git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'initial audit fixture']);
  audits.scanAll();
  const before = audits.detail(beforeDraft.slug);
  assert.equal(before.snapshot.content.sources.length, 0);
  assert.equal(before.snapshot.guards.recentObservationHold, false);
  const afterDraft = { ...beforeDraft, sources: makeDraft().sources, updatedAt: koreaDate() };
  const page = writeGuide(afterDraft);
  inventory.scanInventory(); // This is the inventory refresh performed by successful apply.
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM guides').get().n, 1);
  const scan = inventory.scanInventory;
  const originalFetch = global.fetch;
  let scans = 0, providerRequests = 0;
  inventory.scanInventory = (...args) => { scans++; return scan(...args); };
  global.fetch = async () => { providerRequests++; throw new Error('external request forbidden'); };
  try {
    const report = audits.report();
    const after = audits.detail(beforeDraft.slug);
    assert.equal(report.rows[0].guards.recentObservationHold, true);
    assert.equal(after.snapshot.content.sources.length, 1);
    assert.equal(after.sourceHash, fileHash(page));
    assert.notEqual(after.snapshot.contextFingerprint, before.snapshot.contextFingerprint);
    assert.equal(after.plan.changes.some(item => item.id === 'add-official-evidence' && item.enabled), false);
    assert.equal(scans, 1);
    audits.report(); audits.detail(beforeDraft.slug);
    assert.equal(scans, 1, 'unchanged follow-up reads must not rescan the whole site');
    assert.equal(providerRequests, 0);
  } finally { inventory.scanInventory = scan; global.fetch = originalFetch; }
});

test('audit invalidation failure cannot roll back a validated apply, and the next read detects the new source independently', async () => {
  const draft = makeDraft({ slug: 'cache-failure-boundary', keyword: '독립 캐시 완료 경계', title: '독립 캐시 완료 경계 점검', publishedAt: '2024-01-01', relatedLinks: [
    { to: '/repair', label: '수리 안내', description: '제품 수리 범위' },
    { to: '/custom', label: '제작 안내', description: '맞춤 제작 범위' },
    { to: '/guide', label: '가이드 목록', description: '관련 주제 확인' },
  ] });
  const page = writeGuide(draft);
  const image = path.join(site, 'public', draft.heroImage.path.slice(1));
  fs.mkdirSync(path.dirname(image), { recursive: true }); fs.writeFileSync(image, 'isolated existing image bytes');
  git(['add', '.']); git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'isolated audit refresh fixture']);
  inventory.scanInventory(); audits.scanAll();
  const before = audits.detail(draft.slug);
  let generation = generations.createGeneration({ targetSlug: draft.slug, updateScope: 'snippet' });
  const changed = enforceDraftScope(generation, { description: '제품의 현재 상태와 확인할 순서를 설명하고, 직접 확인한 문서와 상담 내용을 나누어 기록하는 점검 기준을 정리했습니다.' });
  generation = generations.saveDraft(generation.id, changed);
  assert.equal(generation.lint.blocking, false, JSON.stringify(generation.lint.findings));
  generation = generations.approveGeneration(generation.id);
  const file = require.resolve('../server/services/applyService');
  const nativeRequire = createRequire(file);
  const validations = [];
  const sandbox = { module: { exports: {} }, process, Buffer, setTimeout, clearTimeout,
    require: name => name === './contentAuditService' ? { invalidateAudits() { throw new Error('fixture audit cache unavailable'); } } : nativeRequire(name),
    validateFixture: async command => { assert.ok(fs.readFileSync(page, 'utf8').includes(changed.description)); validations.push(command); return { command, ok: true, validationMode: 'fixture content check; full Nuxt build excluded' }; },
  };
  vm.runInNewContext(`${fs.readFileSync(file, 'utf8')}\nrunValidation = validateFixture;`, sandbox, { filename: file });
  const result = await sandbox.module.exports.apply(generation.id);
  assert.equal(result.state, 'done');
  assert.equal(result.warnings.length, 1);
  assert.match(result.warnings[0], /파일 반영은 완료/);
  assert.deepEqual(validations, ['typecheck', 'build', 'verify:seo']);
  assert.equal(generations.getGeneration(generation.id).status, 'applied');
  assert.equal(db.prepare('SELECT state FROM applies WHERE id=?').get(result.applyId).state, 'done');
  assert.ok(fs.readFileSync(page, 'utf8').includes(changed.description));
  const after = audits.detail(draft.slug);
  assert.notEqual(after.sourceHash, before.sourceHash);
  assert.equal(after.snapshot.content.description, changed.description);
  assert.equal(after.snapshot.guards.recentObservationHold, true);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM model_runs').get().n, 0);
});
