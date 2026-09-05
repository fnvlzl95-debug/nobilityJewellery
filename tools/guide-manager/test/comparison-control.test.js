const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { randomUUID } = require('node:crypto');

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-control-comparison-'));
process.env.GUIDE_MANAGER_DATA_DIR = path.join(tempRoot, 'data');
process.env.SITE_ROOT = path.join(tempRoot, 'site');
const { db, setSetting } = require('../server/lib/db');
const { gitExecutable } = require('../server/lib/executables');
const { sha256 } = require('../server/lib/utils');
const baseline = require('../server/services/baselineService');
const controls = require('../server/services/comparisonControlService');
const DEPLOYED = '2024-02-01T10:00:00.000Z';
const REGISTERED = '2024-02-01T11:00:00.000Z';
const AFTER_READY = '2024-05-01T00:00:00.000Z';
const SLUG = 'fixture-treatment', CONTROL = 'fixture-control';
const ALL_SLUGS = [SLUG, CONTROL, 'fixture-unrelated'];
let root, commit, baselineId, baseGsc, baseGa4, originalBaseline;
const git = (args, at = '2024-02-15T10:00:00.000Z') => execFileSync(gitExecutable(), args, { cwd: root, windowsHide: true, encoding: 'utf8',
  env: { ...process.env, GIT_AUTHOR_DATE: at, GIT_COMMITTER_DATE: at }, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const sourcePath = slug => path.join(root, 'pages', 'guide', `${slug}.vue`);
const indexPath = () => path.join(root, 'data', 'guide-posts.ts');

function report(type, start, end, rows, summary = {}) {
  const id = Number(db.prepare(`INSERT INTO analytics_imports(source_type,file_name,file_hash,period_start,period_end,parser_version,summary_json,imported_at)
    VALUES(?,'fixture.csv',?,?,?,'fixture',?,?)`).run(type, randomUUID(), start, end, JSON.stringify(type === 'gsc_performance'
    ? { sitewideEligible: true, property: 'https://noblessegold.com/', searchType: 'web', ...summary } : summary), REGISTERED).lastInsertRowid);
  for (const [slug, clicks, impressions] of rows) {
    if (type === 'gsc_performance') db.prepare(`INSERT INTO gsc_pages(import_id,original_url,normalized_url,clicks,impressions,ctr,position) VALUES(?,?,?,?,?,?,5)`)
      .run(id, `https://noblessegold.com/guide/${slug}`, `https://noblessegold.com/guide/${slug}`, clicks, impressions, impressions ? clicks / impressions : 0);
    else db.prepare(`INSERT INTO ga4_pages(import_id,page_title,guide_slug,views,active_users,events,bounce_rate) VALUES(?,?,?,?,?,?,?)`)
      .run(id, slug, slug, clicks, impressions, clicks * 2, 0.2);
  }
  return { id, sourceType: type, periodStart: start, periodEnd: end };
}
function saveBaseline(kind = 'update', deployed = DEPLOYED, snapshot = null) {
  const generationId = Number(db.prepare(`INSERT INTO generations(kind,topic,status,created_at,updated_at) VALUES(?,'fixture','applied',?,?)`).run(kind, DEPLOYED, DEPLOYED).lastInsertRowid);
  const before = snapshot || baseline.metricSnapshot(SLUG, { performance: baseGsc, ga4: baseGa4 });
  return Number(db.prepare(`INSERT INTO content_baselines(generation_id,guide_slug,snapshot_json,applied_at,created_at,deployed_at,deployment_commit)
    VALUES(?,?,?,?,?,?,?)`).run(generationId, SLUG, JSON.stringify(before), DEPLOYED, DEPLOYED, deployed, commit).lastInsertRowid);
}
function register(extra = {}) {
  const preview = controls.previewControl(baselineId, CONTROL);
  return controls.registerControl(baselineId, { controlSlug: CONTROL, selectionReason: '같은 기간의 비슷한 가이드이며 질문과 링크 수 차이를 별도로 기록합니다.',
    expectedSourceHash: preview.control.sourceHash, expectedIndexEntryHash: preview.control.indexEntryHash, ...extra });
}
function afterReports({ missingControl = false } = {}) {
  const gsc = report('gsc_performance', '2024-02-02', '2024-02-29', [[SLUG, 8, 160], ...(missingControl ? [] : [[CONTROL, 3, 80]])]);
  const ga4 = report('ga4_overview', '2024-02-02', '2024-02-29', [[SLUG, 50, 10], [CONTROL, 30, 8]]);
  return { gsc, ga4 };
}

test.beforeEach(t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date(REGISTERED) });
  for (const table of ['comparison_controls', 'content_baselines', 'generations', 'analytics_imports', 'guides']) db.prepare(`DELETE FROM ${table}`).run();
  root = fs.mkdtempSync(path.join(tempRoot, 'site-'));
  setSetting('site_root', root);
  fs.mkdirSync(path.join(root, 'pages', 'guide'), { recursive: true });
  fs.mkdirSync(path.join(root, 'data'));
  for (const slug of ALL_SLUGS) {
    const source = `<template><main><h1>${slug}</h1><p>원문과 조건을 유지합니다.</p></main></template>\n`;
    fs.writeFileSync(sourcePath(slug), source);
    db.prepare(`INSERT INTO guides(slug,path,title,source_path,source_hash,scanned_at) VALUES(?,?,?,?,?,?)`)
      .run(slug, `/guide/${slug}`, slug, sourcePath(slug), sha256(source), REGISTERED);
  }
  fs.writeFileSync(indexPath(), `export const guidePosts = [\n${ALL_SLUGS.map(slug => `  { slug: '${slug}', path: '/guide/${slug}', title: '${slug}', description: '목록 설명을 보존합니다.' }`).join(',\n')}\n]\n`);
  git(['init', '-q']);
  git(['config', 'user.email', 'fixture@invalid.test']);
  git(['config', 'user.name', 'Fixture']);
  git(['config', 'core.autocrlf', 'false']);
  git(['add', '.']);
  git(['commit', '-qm', 'fixture deployment'], '2024-02-01T09:00:00.000Z');
  commit = git(['rev-parse', 'HEAD']);
  baseGsc = report('gsc_performance', '2024-01-01', '2024-01-28', [[SLUG, 5, 100], [CONTROL, 2, 50]]);
  baseGa4 = report('ga4_overview', '2024-01-01', '2024-01-28', [[SLUG, 20, 6], [CONTROL, 12, 4]]);
  baselineId = saveBaseline();
  originalBaseline = db.prepare('SELECT * FROM content_baselines WHERE id=?').get(baselineId);
});
test.after(() => db.close());

test('registration freezes the control before metrics from the treatment report IDs and preserves the original baseline byte-for-byte', () => {
  report('gsc_performance', '2024-01-02', '2024-01-29', [[SLUG, 900, 9000], [CONTROL, 800, 8000]]);
  const result = register();
  assert.equal(result.control.before.gsc.importId, baseGsc.id);
  assert.equal(result.control.before.gsc.clicks, 2);
  assert.equal(result.control.before.ga4.importId, baseGa4.id);
  assert.equal(result.control.before.ga4.views, 12);
  assert.equal(result.registrationTiming, 'before_window');
  assert.equal(result.registeredAt, REGISTERED);
  assert.equal(result.status, 'waiting');
  assert.equal(result.changes, null);
  assert.deepEqual(result.expectedPeriods.gsc, { periodStart: '2024-02-02', periodEnd: '2024-02-29', periodDays: 28, timeZone: 'America/Los_Angeles', timeZoneAssumed: false });
  assert.deepEqual(db.prepare('SELECT * FROM content_baselines WHERE id=?').get(baselineId), originalBaseline);
  assert.throws(() => register(), error => error.code === 'CONTROL_ALREADY_REGISTERED');
  assert.equal(controls.listControls().length, 1);
});

test('fixed first window uses the identical after report per platform for both pages and leaves legacy latest-window selection unchanged', t => {
  register();
  const exact = afterReports();
  const later = report('gsc_performance', '2024-03-01', '2024-03-28', [[SLUG, 999, 9999], [CONTROL, 999, 9999]]);
  report('ga4_overview', '2024-03-01', '2024-03-28', [[SLUG, 999, 999], [CONTROL, 999, 999]]);
  t.mock.timers.setTime(Date.parse(AFTER_READY));
  const result = controls.getControl(baselineId);
  assert.equal(result.status, 'comparable');
  for (const side of ['treatment', 'control']) {
    assert.equal(result[side].after.gsc.importId, exact.gsc.id);
    assert.equal(result[side].after.ga4.importId, exact.ga4.id);
  }
  assert.deepEqual(result.changes.treatment.clicks, { before: 5, after: 8, change: 3, rate: 0.6 });
  assert.deepEqual(result.changes.control.clicks, { before: 2, after: 3, change: 1, rate: 0.5 });
  assert.equal(baseline.listComparisons().find(row => row.id === baselineId).after.gsc.importId, later.id);
  assert.deepEqual(db.prepare('SELECT * FROM content_baselines WHERE id=?').get(baselineId), originalBaseline);
});

test('a newer incomplete or wrong-property first-window report cannot contaminate the paired comparison', t => {
  register();
  const exact = afterReports();
  report('gsc_performance', '2024-02-02', '2024-02-29', [[SLUG, 900, 9000], [CONTROL, 900, 9000]], { property: 'sc-domain:noblessegold.com' });
  t.mock.timers.setTime(Date.parse('2024-02-29T23:59:00Z'));
  assert.equal(controls.getControl(baselineId).status, 'waiting');
  t.mock.timers.setTime(Date.parse(AFTER_READY));
  const result = controls.getControl(baselineId);
  assert.equal(result.treatment.after.gsc.importId, exact.gsc.id);
  assert.equal(result.control.after.gsc.importId, exact.gsc.id);
});

test('missing control rows remain null and block paired changes instead of using another report or assuming zero', t => {
  register();
  const exact = afterReports({ missingControl: true });
  report('gsc_performance', '2024-03-01', '2024-03-28', [[SLUG, 50, 500], [CONTROL, 40, 400]]);
  t.mock.timers.setTime(Date.parse(AFTER_READY));
  const result = controls.getControl(baselineId);
  assert.equal(result.control.after.gsc.importId, exact.gsc.id);
  assert.equal(result.control.after.gsc.hasData, false);
  assert.equal(result.control.after.gsc.clicks, null);
  assert.equal(result.control.after.gsc.impressions, null);
  assert.equal(result.status, 'waiting');
  assert.equal(result.changes, null);
  assert.equal(result.dataIssues[0].code, 'CONTROL_ROWS_MISSING');
});

test('control source and its own index entry changes stop comparison even without an inventory refresh', t => {
  register(); afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  const original = fs.readFileSync(sourcePath(CONTROL), 'utf8');
  fs.writeFileSync(sourcePath(CONTROL), original.replace('원문', '수정문'));
  let result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.equal(result.changes, null);
  assert.ok(result.issues.some(row => row.code === 'CONTROL_UNCOMMITTED_CHANGE'));
  fs.writeFileSync(sourcePath(CONTROL), original);
  fs.writeFileSync(indexPath(), fs.readFileSync(indexPath(), 'utf8').replace(`title: '${CONTROL}'`, "title: '변경된 대조 제목'"));
  result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.equal(result.changes, null);
});

test('a committed-and-reverted control edit still contaminates history, while other guide edits and CRLF do not', t => {
  register(); afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  const originalSource = fs.readFileSync(sourcePath(CONTROL), 'utf8');
  fs.writeFileSync(sourcePath(CONTROL), originalSource.replace(/\n/g, '\r\n'));
  fs.writeFileSync(indexPath(), fs.readFileSync(indexPath(), 'utf8').replace("title: 'fixture-unrelated'", "title: '다른 글의 제목'"));
  git(['add', '.']); git(['commit', '-qm', 'unrelated entry and newline only']);
  assert.equal(controls.getControl(baselineId).status, 'comparable');
  fs.writeFileSync(sourcePath(CONTROL), originalSource.replace('원문', '변경'));
  git(['add', '.']); git(['commit', '-qm', 'changed control']);
  fs.writeFileSync(sourcePath(CONTROL), originalSource);
  git(['add', '.']); git(['commit', '-qm', 'restored control']);
  const result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.ok(result.issues.some(row => row.code === 'CONTROL_CHANGED_IN_HISTORY'));
});

test('original control metrics and baseline deployment identity are preserved and revalidated instead of silently rewritten', t => {
  register(); afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  const frozen = db.prepare('SELECT snapshot_json FROM comparison_controls WHERE baseline_id=?').get(baselineId).snapshot_json;
  db.prepare('UPDATE gsc_pages SET clicks=100 WHERE import_id=? AND normalized_url=?').run(baseGsc.id, `https://noblessegold.com/guide/${CONTROL}`);
  let result = controls.getControl(baselineId);
  assert.equal(result.status, 'source_mismatch');
  assert.equal(result.control.before.gsc.clicks, 2);
  assert.equal(result.changes, null);
  db.prepare('UPDATE gsc_pages SET clicks=2 WHERE import_id=? AND normalized_url=?').run(baseGsc.id, `https://noblessegold.com/guide/${CONTROL}`);
  db.prepare('UPDATE content_baselines SET deployed_at=? WHERE id=?').run('2024-02-02T10:00:00Z', baselineId);
  result = controls.getControl(baselineId);
  assert.equal(result.status, 'source_mismatch');
  assert.ok(result.issues.some(row => row.code === 'CONTROL_BASELINE_CHANGED'));
  assert.equal(db.prepare('SELECT snapshot_json FROM comparison_controls WHERE baseline_id=?').get(baselineId).snapshot_json, frozen);
});

test('new baselines, self controls, missing reports, and stale preview hashes are rejected before permanent registration', () => {
  assert.throws(() => controls.previewControl(saveBaseline('new'), CONTROL), error => error.code === 'CONTROL_UPDATE_ONLY');
  assert.throws(() => controls.previewControl(baselineId, SLUG), error => error.code === 'CONTROL_SELF');
  assert.throws(() => controls.previewControl(saveBaseline('update', null), CONTROL), error => error.code === 'CONTROL_DEPLOYMENT_REQUIRED');
  assert.throws(() => register({ selectionReason: '짧음' }), error => error.code === 'CONTROL_REASON_REQUIRED');
  assert.throws(() => register({ expectedSourceHash: '0'.repeat(64) }), error => error.code === 'CONTROL_STALE_PREVIEW');
  db.prepare('DELETE FROM gsc_pages WHERE import_id=? AND normalized_url=?').run(baseGsc.id, `https://noblessegold.com/guide/${CONTROL}`);
  const preview = controls.previewControl(baselineId, CONTROL);
  assert.equal(preview.control.before.gsc.clicks, null);
  assert.equal(preview.canRegister, false);
  assert.ok(preview.issues.some(row => row.code === 'CONTROL_BEFORE_ROWS_MISSING'));
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM comparison_controls').get().n, 0);
});

test('registration after observation begins remains explicitly retrospective and does not produce automated comparative claims', t => {
  t.mock.timers.setTime(Date.parse('2024-02-10T12:00:00Z'));
  const saved = register();
  assert.equal(saved.registrationTiming, 'during_window');
  assert.equal(saved.status, 'confounded');
  assert.equal(saved.changes, null);
  assert.ok(saved.issues.some(row => row.code === 'CONTROL_LATE_REGISTRATION'));
  afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  assert.equal(controls.getControl(baselineId).changes, null);
});

test('an unavailable deployment commit or already changed control is conservatively ineligible', () => {
  fs.writeFileSync(sourcePath(CONTROL), '<template><h1>변경</h1></template>');
  assert.equal(controls.previewControl(baselineId, CONTROL).canRegister, false);
  db.prepare('UPDATE content_baselines SET deployment_commit=? WHERE id=?').run('0'.repeat(40), baselineId);
  const result = controls.previewControl(baselineId, CONTROL);
  assert.equal(result.canRegister, false);
  assert.ok(result.issues.some(row => row.code === 'CONTROL_HISTORY_UNVERIFIED'));
});

test('Pacific/Korean first windows differ correctly for the actual pilot deployment instant', () => {
  const deployed = '2026-09-05T20:21:37.559Z';
  assert.deepEqual(baseline.firstObservationPeriod(deployed, 28, 'gsc'), { periodStart: '2026-09-06', periodEnd: '2026-10-03', periodDays: 28, timeZone: 'America/Los_Angeles', timeZoneAssumed: false });
  assert.deepEqual(baseline.firstObservationPeriod(deployed, 28, 'ga4'), { periodStart: '2026-09-07', periodEnd: '2026-10-04', periodDays: 28, timeZone: 'Asia/Seoul', timeZoneAssumed: true });
});

test('treatment edits outside the original generation also hold the paired observation, including a Git revert', t => {
  register(); afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  const original = fs.readFileSync(sourcePath(SLUG), 'utf8');
  fs.writeFileSync(sourcePath(SLUG), original.replace('원문', '재수정'));
  let result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.ok(result.issues.some(row => row.code === 'TREATMENT_UNCOMMITTED_CHANGE'));
  assert.equal(result.changes, null);
  git(['add', '.']); git(['commit', '-qm', 'second treatment edit']);
  fs.writeFileSync(sourcePath(SLUG), original);
  git(['add', '.']); git(['commit', '-qm', 'restored treatment']);
  result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.ok(result.issues.some(row => row.code === 'TREATMENT_CHANGED_IN_HISTORY'));
  assert.deepEqual(db.prepare('SELECT * FROM content_baselines WHERE id=?').get(baselineId), originalBaseline);
});

test('many unrelated index commits use one byte-safe Git blob batch and unchanged repeated reads spawn no Git processes', t => {
  register(); afterReports(); t.mock.timers.setTime(Date.parse(AFTER_READY));
  let text = fs.readFileSync(indexPath(), 'utf8');
  for (let index = 0; index < 20; index++) {
    text = text.replace(/title: 'fixture-unrelated[^']*'/, `title: 'fixture-unrelated 한글 ${index}'`);
    fs.writeFileSync(indexPath(), text);
    git(['add', '.']); git(['commit', '-qm', `unrelated ${index}`]);
  }
  const childProcess = require('node:child_process');
  const original = childProcess.execFileSync;
  const calls = [];
  t.mock.method(childProcess, 'execFileSync', (...args) => { calls.push(args[1]); return original(...args); });
  const started = performance.now();
  assert.equal(controls.getControl(baselineId).status, 'comparable');
  const firstMs = performance.now() - started;
  assert.equal(calls.filter(args => args[0] === 'cat-file' && args[1] === '--batch').length, 1);
  assert.equal(calls.length, 3, 'ancestry + revision list + all blobs, independent of commit count');
  const cachedStarted = performance.now();
  for (let count = 0; count < 5; count++) assert.equal(controls.getControl(baselineId).status, 'comparable');
  assert.equal(calls.length, 3, 'current HEAD and content unchanged: repeated reads use cached history');
  t.diagnostic(`20-commit first read ${firstMs.toFixed(2)}ms; five cached reads ${(performance.now() - cachedStarted).toFixed(2)}ms; Git calls first=3, repeated=0`);
  fs.writeFileSync(sourcePath(CONTROL), fs.readFileSync(sourcePath(CONTROL), 'utf8').replace('원문', '변경'));
  assert.equal(controls.getControl(baselineId).status, 'confounded', 'dirty worktree invalidates cached result without inventory refresh');
  assert.equal(calls.length, 6);
});

test('actual local HTTP preview and registration expose one immutable pair while leaving original baseline records unchanged', async () => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message, code: error.code }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const origin = `http://127.0.0.1:${server.address().port}/api`;
  const originalFetch = global.fetch;
  let externalRequests = 0;
  global.fetch = (...args) => {
    if (!String(args[0]).startsWith(origin + '/')) { externalRequests++; throw new Error('External requests forbidden'); }
    return originalFetch(...args);
  };
  try {
    const token = (await (await fetch(`${origin}/session`)).json()).token;
    const endpoint = `${origin}/analytics/comparisons/${baselineId}/control`;
    const response = await fetch(`${endpoint}?slug=${CONTROL}`);
    assert.equal(response.status, 200);
    const preview = await response.json();
    assert.equal(preview.canRegister, true);
    const request = { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token },
      body: JSON.stringify({ controlSlug: CONTROL, selectionReason: '같은 기간의 저노출 글이며 주제와 유입 링크 차이를 따로 기록합니다.',
        expectedSourceHash: preview.control.sourceHash, expectedIndexEntryHash: preview.control.indexEntryHash }) };
    const saved = await fetch(endpoint, request);
    assert.equal(saved.status, 200);
    assert.equal((await saved.json()).registered, true);
    assert.equal((await fetch(endpoint, request)).status, 409);
    const list = await (await fetch(`${origin}/analytics/comparison-controls`)).json();
    assert.equal(list.length, 1);
    assert.equal(list[0].control.before.gsc.importId, baseGsc.id);
    assert.equal(list[0].changes, null);
    assert.deepEqual(db.prepare('SELECT * FROM content_baselines WHERE id=?').get(baselineId), originalBaseline);
  } finally {
    global.fetch = originalFetch;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
  assert.equal(externalRequests, 0);
});

test('committed edits after the fixed window do not invalidate its results, but dirty files still hold comparison', t => {
  register(); afterReports();
  t.mock.timers.setTime(Date.parse(AFTER_READY));
  fs.writeFileSync(sourcePath(SLUG), fs.readFileSync(sourcePath(SLUG), 'utf8').replace('원문', '후속 편집'));
  git(['add', '.']); git(['commit', '-qm', 'after-window update'], '2024-03-05T10:00:00Z');
  let result = controls.getControl(baselineId);
  assert.equal(result.status, 'comparable');
  assert.equal(result.history.windowClosed, true);
  assert.ok(result.history.postWindowChanges.some(item => item.role === 'treatment'));
  assert.equal(result.changes.treatment.clicks.after, 8);
  fs.writeFileSync(sourcePath(CONTROL), fs.readFileSync(sourcePath(CONTROL), 'utf8').replace('원문', '시각 불명 편집'));
  result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.ok(result.issues.some(item => item.code === 'CONTROL_UNCOMMITTED_CHANGE'));
});

test('an in-window edit followed by an after-window revert stays contaminated', t => {
  register(); afterReports();
  const original = fs.readFileSync(sourcePath(CONTROL), 'utf8');
  fs.writeFileSync(sourcePath(CONTROL), original.replace('원문', '관찰 중 변경'));
  git(['add', '.']); git(['commit', '-qm', 'inside window'], '2024-02-15T10:00:00Z');
  fs.writeFileSync(sourcePath(CONTROL), original);
  git(['add', '.']); git(['commit', '-qm', 'outside-window revert'], '2024-03-05T10:00:00Z');
  t.mock.timers.setTime(Date.parse(AFTER_READY));
  const result = controls.getControl(baselineId);
  assert.equal(result.status, 'confounded');
  assert.ok(result.issues.some(item => item.code === 'CONTROL_CHANGED_IN_HISTORY'));
  assert.equal(result.changes, null);
});

test('history cache includes window completion and uses the later platform-local midnight', t => {
  register(); afterReports();
  // This commit is later than the complete first window; while the window is
  // still open its future timestamp cannot prove the currently changed file safe.
  fs.writeFileSync(sourcePath(SLUG), fs.readFileSync(sourcePath(SLUG), 'utf8').replace('원문', '다음 창 편집'));
  git(['add', '.']); git(['commit', '-qm', 'after complete window'], '2024-03-05T10:00:00Z');
  t.mock.timers.setTime(Date.parse('2024-03-01T07:59:59Z'));
  const pending = controls.getControl(baselineId);
  assert.equal(pending.history.windowEndsAt, '2024-03-01T08:00:00.000Z');
  assert.equal(pending.status, 'confounded');
  t.mock.timers.setTime(Date.parse('2024-03-01T08:00:00Z'));
  const completed = controls.getControl(baselineId);
  assert.equal(completed.status, 'comparable', 'same HEAD/current hashes require a different cache entry after the fixed window completes');
});

test('an absent treatment baseline row cannot be registered as a pair that will never become comparable', () => {
  db.prepare('DELETE FROM gsc_pages WHERE import_id=? AND normalized_url=?').run(baseGsc.id, `https://noblessegold.com/guide/${SLUG}`);
  baselineId = saveBaseline();
  const result = controls.previewControl(baselineId, CONTROL);
  assert.equal(result.canRegister, false);
  assert.ok(result.issues.some(item => item.code === 'TREATMENT_BEFORE_ROWS_MISSING'));
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM comparison_controls').get().n, 0);
});

test('registration is already retrospective when the GA4 window has started even if the Pacific window has not', t => {
  baselineId = saveBaseline('update', '2026-09-06T09:00:00.000Z'); // 18:00 KST / 02:00 PT
  t.mock.timers.setTime(Date.parse('2026-09-07T01:00:00.000Z')); // 10:00 KST; first GSC day starts at 16:00 KST
  const result = register();
  assert.equal(result.expectedPeriods.gsc.periodStart, '2026-09-07');
  assert.equal(result.expectedPeriods.ga4.periodStart, '2026-09-07');
  assert.equal(result.registrationTiming, 'during_window');
  assert.equal(result.status, 'confounded');
});
