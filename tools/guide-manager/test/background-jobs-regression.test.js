const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
if (!process.env.GUIDE_MANAGER_DATA_DIR) process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-jobs-test-'));
const { db } = require('../server/lib/db');
const jobs = require('../server/services/jobService');
const { makeDraft } = require('./fixture');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(predicate) {
  for (let i = 0; i < 300; i++) { if (predicate()) return; await sleep(10); }
  throw new Error('Test execution did not settle');
}
function generation(topic) {
  const stamp = new Date().toISOString();
  const sources = makeDraft().sources.map(source => ({ ...source, selected: true }));
  const research = { official: { sources, claims: sources.map(source => ({ claim: '테스트 원고의 제작·마감 기준을 다루는 고정 조사 근거', sourceUrls: [source.url] })) } };
  return Number(db.prepare('INSERT INTO generations(topic,created_at,updated_at,research_json) VALUES(?,?,?,?)').run(topic, stamp, stamp, JSON.stringify(research)).lastInsertRowid);
}
test('background HTTP generation returns 202 immediately and permits an independent actual draft save', async () => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message, code: error.code }));
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  jobs.register('generate', async payload => { await gate; return { id: Number(payload.params.id), completed: true }; });
  const first = generation('작업 잠금 회귀 검증 첫째');
  const second = generation('작업 잠금 회귀 검증 둘째');
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + server.address().port + '/api';
  const token = (await (await fetch(base + '/session')).json()).token;
  const request = (target, method, body, revision = 0) => fetch(base + target, { method, headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token, 'If-Match': String(revision) }, body: JSON.stringify(body) });
  let job;
  try {
    const start = Date.now();
    const response = await request(`/generations/${first}/generate`, 'POST', {});
    assert.equal(response.status, 202);
    assert.ok(Date.now() - start < 1000, 'long provider must not hold the response open');
    job = (await response.json()).job;
    await until(() => jobs.get(job.id).state === 'running');
    const draft = makeDraft({ slug: 'background-save-isolated', title: '백그라운드 독립 편집 검증', keyword: '백그라운드 독립 편집 검증' });
    const save = await request(`/generations/${second}/draft`, 'PUT', { draft });
    assert.equal(save.status, 200, await save.text());
    assert.ok(db.prepare('SELECT revision FROM generations WHERE id=?').get(second).revision > 0);
    const collision = await request(`/generations/${first}/draft`, 'PUT', { draft });
    assert.equal(collision.status, 409);
    assert.equal((await collision.json()).code, 'WORK_IN_PROGRESS');
    release();
    await until(() => jobs.get(job.id).state === 'done');
    assert.deepEqual(jobs.get(job.id).result, { id: first, completed: true });
    assert.equal(jobs.list().find(row => row.id === job.id).result, null, 'polling list excludes large drafts');
  } finally {
    release();
    if (job) await until(() => !jobs.ACTIVE.includes(jobs.get(job.id).state));
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
    db.prepare('DELETE FROM generations WHERE id IN (?,?)').run(first, second);
  }
});
test('only two jobs run concurrently and a queued cancellation never invokes its handler', async () => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const called = [];
  jobs.register('parallel-regression', async payload => { called.push(payload.number); await gate; return payload.number; });
  const rows = [1, 2, 3].map(number => jobs.submit('parallel-regression', { number }, { keys: ['parallel:' + number] }));
  await until(() => called.length === 2);
  assert.equal(jobs.get(rows[2].id).state, 'queued');
  jobs.cancel(rows[2].id); release();
  await until(() => rows.every(row => !jobs.ACTIVE.includes(jobs.get(row.id).state)));
  assert.deepEqual(called, [1, 2]);
});
test('cancellation keeps the shared lock until outstanding work has actually settled', async () => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  jobs.register('cancel-regression', async () => { await gate; return 'finished'; });
  const row = jobs.submit('cancel-regression', {}, { keys: ['cancel-scope'] });
  await until(() => jobs.get(row.id).state === 'running');
  assert.equal(jobs.cancel(row.id).state, 'cancelling');
  assert.throws(() => jobs.acquire(['cancel-scope']), { code: 'WORK_IN_PROGRESS' });
  release(); await until(() => jobs.get(row.id).state === 'cancelled');
  jobs.acquire(['cancel-scope'])();
});
test('job call budget is enforced and attempts are recorded before provider work', async () => {
  jobs.register('budget-regression', async () => { jobs.consumeCall('first'); jobs.consumeCall('second'); });
  const row = jobs.submit('budget-regression', {}, { maxCalls: 1 });
  await until(() => jobs.get(row.id).state === 'error');
  const result = jobs.get(row.id);
  assert.equal(result.code, 'JOB_BUDGET_EXCEEDED'); assert.equal(result.calls, 1);
  assert.equal(result.events[0].providerStage, 'first');
});
test('provider timeout covers a stalled response body after successful headers', async () => {
  const server = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.flushHeaders(); res.write('{'); });
  server.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  try {
    const { fetchWithTimeout } = require('../server/services/openaiService');
    const started = Date.now();
    await assert.rejects(fetchWithTimeout('http://127.0.0.1:' + server.address().port, {}, 50));
    assert.ok(Date.now() - started < 1000);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
test('restart records interrupted jobs and explicit retry reuses their saved generation', async () => {
  const id = generation('실행 재개 회귀 검증');
  const options = { keys: [`generation:${id}`], generationId: id, expectedRevision: 0, retryMode: 'resume', maxCalls: 3, maxTokens: 1000, timeoutMs: 1000 };
  db.prepare("INSERT INTO background_jobs(id,action,generation_id,state,payload_json,options_json,created_at) VALUES('restart-regression','resume-regression',?,'running',?,?,?)").run(id, JSON.stringify({ body: { candidateId: 'old-candidate' } }), JSON.stringify(options), new Date().toISOString());
  jobs.recoverInterrupted();
  assert.equal(jobs.get('restart-regression').state, 'interrupted');
  jobs.register('resume-regression', async payload => payload.body.generationId);
  const retried = jobs.retry('restart-regression');
  await until(() => jobs.get(retried.id).state === 'done');
  assert.equal(jobs.get(retried.id).result, id);
  db.prepare('DELETE FROM generations WHERE id=?').run(id);
});
