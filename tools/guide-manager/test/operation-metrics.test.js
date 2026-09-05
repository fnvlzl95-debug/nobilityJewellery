const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-operation-metrics-'));
const { db } = require('../server/lib/db');
const metrics = require('../server/services/operationMetricsService');
require('../server/services/jobService');
const NOW = new Date('2026-09-06T03:00:00.000Z');
const INSIDE = '2026-09-05T03:00:00.000Z';
const OUTSIDE = '2026-08-01T03:00:00.000Z';
const FUTURE = '2026-09-07T03:00:00.000Z';
const report = () => metrics.qualityReport({ days: 7, now: NOW });

function generation(topic = '목걸이 길이 선택') {
  return Number(db.prepare(`INSERT INTO generations(topic,status,created_at,updated_at) VALUES(?,'idea',?,?)`).run(topic, INSIDE, INSIDE).lastInsertRowid);
}
function job(id, state, { action = 'prepare', created = INSIDE, started = INSIDE, finished = null } = {}) {
  db.prepare(`INSERT INTO background_jobs(id,action,state,payload_json,options_json,created_at,started_at,finished_at)
    VALUES(?,?,?,'{}','{}',?,?,?)`).run(id, action, state, created, started, finished);
}
function modelRun(id, stage, created = INSIDE) {
  db.prepare(`INSERT INTO model_runs(generation_id,stage,requested_model,status,created_at) VALUES(?,?,'fixture','done',?)`).run(id, stage, created);
}
function applyRun(id, state, created = INSIDE) {
  db.prepare('INSERT INTO applies(generation_id,state,created_at) VALUES(?,?,?)').run(id, state, created);
}

let server, base, token, externalRequests = 0;
const originalFetch = global.fetch;
test.before(async () => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message, code: error.code }));
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
  global.fetch = (...args) => {
    if (!String(args[0]).startsWith(`${base}/`)) { externalRequests++; throw new Error('External requests forbidden'); }
    return originalFetch(...args);
  };
  token = (await (await fetch(`${base}/session`)).json()).token;
});
test.beforeEach(() => {
  for (const table of ['operation_decisions', 'background_jobs', 'applies', 'model_runs', 'generations']) db.prepare(`DELETE FROM ${table}`).run();
});
test.after(async () => {
  global.fetch = originalFetch;
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  db.close();
  assert.equal(externalRequests, 0);
});

test('unobserved operational rates and inquiry cost remain unknown, with the actual tracking start exposed', () => {
  const result = report();
  assert.deepEqual(result.window, { days: 7, from: '2026-08-30T03:00:00.000Z', to: NOW.toISOString() });
  assert.ok(Number.isFinite(Date.parse(result.decisionTrackingStartedAt)));
  assert.deepEqual(result.durations, []);
  for (const name of ['repair', 'duplicates', 'scopeRejections', 'applyFailures']) {
    assert.equal(result[name].numerator, 0, name);
    assert.equal(result[name].denominator, 0, name);
    assert.equal(result[name].rate, null, `${name} must not manufacture a historical zero rate`);
  }
  assert.equal(result.costPerQualifiedInquiry.value, null);
  assert.equal(result.costPerQualifiedInquiry.currency, null);
  assert.match(result.note, /순위|노출/);
  for (const days of [0, 1, 8, 29, 365, 'invalid']) assert.throws(() => metrics.qualityReport({ days, now: NOW }), error => error.status === 422);
});

test('timing uses completed valid durations only, keeps separate states, and excludes jobs created outside the window', () => {
  [1000, 2000, 3000, 4000].forEach((duration, index) => job(`done-${index}`, 'done', { finished: new Date(Date.parse(INSIDE) + duration).toISOString() }));
  job('no-start', 'done', { started: null, finished: INSIDE });
  job('no-finish', 'done');
  job('negative', 'done', { finished: new Date(Date.parse(INSIDE) - 1000).toISOString() });
  job('pending', 'queued', { started: null });
  job('running', 'running');
  job('cancelling', 'cancelling');
  job('cancelled', 'cancelled', { finished: INSIDE });
  job('error', 'error', { finished: INSIDE });
  job('interrupted', 'interrupted', { finished: INSIDE });
  job('old', 'done', { created: OUTSIDE, finished: NOW.toISOString() });
  job('future', 'done', { created: FUTURE, finished: FUTURE });
  job('only-active', 'queued', { action: 'image', started: null });
  const rows = report().durations;
  assert.deepEqual(rows.find(row => row.action === 'prepare'), {
    action: 'prepare', requested: 13, completed: 7, failed: 2, cancelled: 1, active: 3,
    durationSamples: 4, p50Ms: 2500, p95Ms: 3850,
  });
  assert.equal(rows.find(row => row.action === 'image').p95Ms, null);
  assert.equal(rows.find(row => row.action === 'image').durationSamples, 0);
});

test('automatic repairs count distinct generations instead of model attempts or unrelated stages', () => {
  const a = generation(), b = generation(), c = generation(), d = generation(), e = generation();
  for (const stage of ['draft_luna', 'repair_luna', 'repair_luna', 'fallback_terra']) modelRun(a, stage);
  modelRun(b, 'draft_luna');
  modelRun(b, 'draft_luna');
  modelRun(c, 'draft_luna', OUTSIDE);
  modelRun(c, 'repair_luna');
  modelRun(d, 'official_research');
  modelRun(d, 'humanize');
  modelRun(e, 'repair_luna', OUTSIDE);
  modelRun(e, 'repair_luna', FUTURE);
  modelRun(null, 'repair_luna');
  const value = report().repair;
  assert.equal(value.numerator, 2);
  assert.equal(value.denominator, 3);
  assert.equal(value.rate, 2 / 3);
  assert.match(value.definition, /수동 수정률과 다릅니다/);
});

test('apply failure denominator includes only finished apply attempts, including recovered failures, and separates pending work', () => {
  const id = generation();
  for (const state of ['done', 'done', 'rolled_back', 'recovery_required', 'running', 'running']) applyRun(id, state);
  applyRun(id, 'rolled_back', OUTSIDE);
  applyRun(id, 'recovery_required', FUTURE);
  generation('승인되었지만 파일 반영을 하지 않은 작업');
  const value = report().applyFailures;
  assert.equal(value.numerator, 2);
  assert.equal(value.denominator, 4);
  assert.equal(value.rate, 0.5);
  assert.equal(value.pending, 2);
});

test('rejection rates use classified server errors and separate action denominators without inventing missing codes', () => {
  for (const [action, status, code] of [
    ['create', 200, null], ['create', 409, 'DUPLICATE_INTENT'], ['create', 422, null], ['create', 200, 'DUPLICATE_INTENT'],
    ['save', 200, null], ['save', 409, 'UPDATE_SCOPE_DRIFT'], ['save', 409, 'DUPLICATE_INTENT'],
    ['approve', 409, 'UPDATE_SCOPE_DRIFT'], ['approve', 409, null],
  ]) metrics.recordDecision(action, status, code, new Date(INSIDE));
  metrics.recordDecision('create', 409, 'DUPLICATE_INTENT', new Date(OUTSIDE));
  metrics.recordDecision('approve', 409, 'UPDATE_SCOPE_DRIFT', new Date(FUTURE));
  const result = report();
  assert.equal(result.duplicates.numerator, 1);
  assert.equal(result.duplicates.denominator, 4);
  assert.equal(result.duplicates.rate, 0.25);
  assert.equal(result.scopeRejections.numerator, 2);
  assert.equal(result.scopeRejections.denominator, 5);
  assert.equal(result.scopeRejections.rate, 0.4);
  assert.equal(db.prepare('SELECT code FROM operation_decisions WHERE action=? AND status=?').get('create', 422).code, null);
});

test('decision storage has only fixed measurement columns and discards arbitrary messages, URLs, and customer details', () => {
  const privateValue = '홍길동 customer@example.com 010-1234-5678 https://private.invalid/token=SECRET';
  metrics.recordDecision('create', 422, privateValue, new Date(INSIDE));
  metrics.recordDecision('save', 422, { message: privateValue }, new Date(INSIDE));
  metrics.recordDecision(privateValue, 422, 'DUPLICATE_INTENT', new Date(INSIDE));
  metrics.recordDecision('approve', 409, 'UPDATE_SCOPE_DRIFT', new Date(INSIDE));
  assert.deepEqual(db.prepare('PRAGMA table_info(operation_decisions)').all().map(row => row.name), ['id', 'action', 'status', 'code', 'recorded_at']);
  const rows = db.prepare('SELECT * FROM operation_decisions ORDER BY id').all();
  assert.equal(rows.length, 3);
  assert.deepEqual(rows.map(row => row.code), [null, null, 'UPDATE_SCOPE_DRIFT']);
  assert.doesNotMatch(JSON.stringify(rows), /customer@example|홍길동|010-1234|SECRET/);
  assert.doesNotMatch(JSON.stringify(report()), /customer@example|홍길동|010-1234|SECRET/);
});

test('real router records one rejected duplicate create without request content, and quality reads do not increase request counts', async () => {
  const topic = '목걸이 길이 선택';
  generation(topic);
  const response = await fetch(`${base}/generations`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token },
    body: JSON.stringify({ topic, businessFacts: 'private@example.com 010-9876-5432', errorCode: 'UPDATE_SCOPE_DRIFT' }),
  });
  assert.equal(response.status, 409);
  assert.equal((await response.json()).code, 'DUPLICATE_INTENT');
  const rows = db.prepare('SELECT action,status,code FROM operation_decisions').all();
  assert.deepEqual(rows.map(row => ({ ...row })), [{ action: 'create', status: 409, code: 'DUPLICATE_INTENT' }]);
  const quality = await fetch(`${base}/operations/quality?days=7`);
  assert.equal(quality.status, 200);
  const data = await quality.json();
  assert.equal(data.duplicates.numerator, 1);
  assert.equal(data.duplicates.denominator, 1);
  assert.equal(data.scopeRejections.rate, null);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM operation_decisions').get().n, 1);
  assert.doesNotMatch(JSON.stringify(data), /private@example|010-9876/);
  assert.equal((await fetch(`${base}/operations/quality?days=365`)).status, 422);
});

test('router path variants accepted by Express retain duplicate rejection accounting', async () => {
  const topic = '목걸이 길이 선택';
  generation(topic);
  for (const route of ['/generations/', '/Generations']) {
    const response = await fetch(`${base}${route}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token }, body: JSON.stringify({ topic }),
    });
    assert.equal(response.status, 409, route);
    assert.equal((await response.json()).code, 'DUPLICATE_INTENT', route);
  }
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM operation_decisions WHERE action='create' AND code='DUPLICATE_INTENT'").get().n, 2);
});
