const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-route-alias-'));
const { db } = require('../server/lib/db');
const jobs = require('../server/services/jobService');
const { makeDraft } = require('./fixture');
let server, base, token;
const encoded = id => [...String(id)].map(char => '%' + char.charCodeAt(0).toString(16)).join('');
const revision = id => db.prepare('SELECT revision FROM generations WHERE id=?').get(id)?.revision;

function generation() {
  const stamp = new Date().toISOString();
  const sources = makeDraft().sources.map(source => ({ ...source, selected: true }));
  const research = { official: { sources, claims: sources.map(source => ({ claim: '작업 전 공식 문서에 연결한 마감과 제작 기준을 확인합니다.', sourceUrls: [source.url] })) } };
  return Number(db.prepare('INSERT INTO generations(topic,created_at,updated_at,research_json) VALUES(?,?,?,?)')
    .run('경로 잠금 회귀용 임시 원고', stamp, stamp, JSON.stringify(research)).lastInsertRowid);
}
async function request(url, method = 'POST', body = {}, match) {
  const headers = { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token };
  if (match != null) headers['If-Match'] = String(match);
  const response = await fetch(base + url, { method, headers, body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(body) });
  return { status: response.status, body: await response.json() };
}
async function until(predicate) {
  for (let attempt = 0; attempt < 300; attempt++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error('Fixture job did not settle');
}
function gated(action) {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const calls = [];
  jobs.register(action, async payload => { calls.push(payload); await gate; return { generationId: Number(payload.params?.id || payload.body?.generationId) }; });
  return { release, calls };
}

test.before(async () => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => { res.locals.operationErrorCode = error.code; res.status(error.status || 500).json({ error: error.message, code: error.code }); });
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = 'http://127.0.0.1:' + server.address().port + '/api';
  token = (await (await fetch(base + '/session')).json()).token;
});
test.after(async () => {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  db.close();
});

test('case, slash and decoded numeric aliases retain If-Match and the same generation lock while another draft saves', async () => {
  const id = generation(), other = generation(), gate = gated('generate');
  const aliases = [String(id), '0' + id, '+' + id, id + '.0', id + 'e0', '0x' + id.toString(16), encoded(id), '%2b' + id];
  const draft = makeDraft({ slug: 'alias-independent-draft', title: '별도 작업 원고 저장 회귀', keyword: '별도 작업 원고 저장 회귀' });
  let job;
  try {
    const started = await request(`/Generations/${encoded(id)}/Generate/`, 'POST', {}, revision(id));
    assert.equal(started.status, 202);
    job = started.body.job;
    assert.equal(job.generationId, id);
    await until(() => jobs.get(job.id).state === 'running');
    for (const alias of aliases) {
      const url = `/Generations/${alias}/Draft/`;
      assert.equal((await request(url, 'PUT', { draft })).body.code, 'STALE_REVISION', url + ' requires If-Match');
      assert.equal((await request(url, 'PUT', { draft }, -1)).body.code, 'STALE_REVISION', url + ' rejects older revision');
      assert.equal((await request(url, 'PUT', { draft }, revision(id))).body.code, 'WORK_IN_PROGRESS', url + ' retains same generation lock');
    }
    const saved = await request(`/generations/${other}/draft`, 'PUT', { draft }, revision(other));
    assert.equal(saved.status, 200, saved.body.error);
    assert.equal(saved.body.id, other);
    assert.ok(revision(other) > 0);
    assert.equal(revision(id), 0);
    assert.equal(gate.calls.length, 1);
  } finally {
    gate.release();
    if (job) await until(() => !jobs.ACTIVE.includes(jobs.get(job.id).state));
  }
});

test('apply aliases share the site lock across different articles and keep the non-cancellable job contract', async () => {
  const id = generation(), other = generation(), gate = gated('apply');
  let job;
  try {
    const started = await request(`/generations/0${id}/apply/`, 'POST', {}, revision(id));
    assert.equal(started.status, 202);
    job = started.body.job;
    assert.equal(job.generationId, id);
    assert.equal(job.cancellable, false);
    await until(() => jobs.get(job.id).state === 'running');
    for (const url of [`/generations/${other}/apply`, `/GENERATIONS/${encoded(other)}/APPLY/`]) {
      assert.equal((await request(url, 'POST', {}, revision(other))).body.code, 'WORK_IN_PROGRESS');
    }
    for (const [url, method] of [['/Applies/%39/Recover/', 'POST'], ['/Inventory/Refresh/', 'POST'], ['/Settings/', 'PUT']]) {
      assert.equal((await request(url, method)).body.code, 'WORK_IN_PROGRESS', url);
    }
    assert.equal((await request(`/jobs/${job.id}/cancel`)).body.code, 'JOB_NOT_CANCELLABLE');
    assert.equal(gate.calls.length, 1);
  } finally {
    gate.release();
    if (job) await until(() => !jobs.ACTIVE.includes(jobs.get(job.id).state));
  }
});

test('creation, delete and bulk-delete aliases reserve their original resources without changing delete revision requirements', async () => {
  const id = generation();
  const releaseCreate = jobs.acquire(['generation-create']);
  try {
    for (const url of ['/Generations/', '/Audits/fixture/Create-Update/']) {
      assert.equal((await request(url)).body.code, 'WORK_IN_PROGRESS', url);
    }
  } finally { releaseCreate(); }
  const releaseGeneration = jobs.acquire(['generation:' + id]);
  try {
    assert.equal((await request(`/Generations/%2b${id}/`, 'DELETE')).body.code, 'WORK_IN_PROGRESS');
    assert.equal((await request('/Generations/Bulk-Delete/', 'POST', { ids: ['0' + id] })).body.code, 'WORK_IN_PROGRESS');
  } finally { releaseGeneration(); }
  assert.equal((await request(`/Generations/${encoded(id)}/`, 'DELETE')).status, 200);
  assert.equal(revision(id), undefined);
});

test('automation body IDs use the same lock and UUID job reads remain intact without adding an If-Match requirement', async () => {
  const id = generation(), gate = gated('prepare');
  let job;
  try {
    const started = await request('/Automation/Prepare/', 'POST', { generationId: '0' + id });
    assert.equal(started.status, 202);
    job = started.body.job;
    assert.equal(job.generationId, id);
    await until(() => jobs.get(job.id).state === 'running');
    assert.equal((await request(`/jobs/${job.id}`, 'GET')).body.id, job.id);
    assert.equal((await request('/automation/prepare', 'POST', { generationId: '+' + id })).body.code, 'WORK_IN_PROGRESS');
    assert.equal(gate.calls.length, 1);
  } finally {
    gate.release();
    if (job) await until(() => !jobs.ACTIVE.includes(jobs.get(job.id).state));
  }
});

test('invalid generation identities are rejected before jobs or mutations while successful encoded draft saves are measured', async () => {
  const id = generation(), count = db.prepare('SELECT COUNT(*) AS n FROM background_jobs').get().n;
  for (const alias of ['0', '-1', '1.5', 'NaN', 'Infinity', '9007199254740993', '%2539', '%39%2fextra', '%zz']) {
    const result = await request(`/generations/${alias}/generate`, 'POST', {}, revision(id));
    assert.ok([400, 422].includes(result.status), alias);
    assert.equal(result.body.code, 'INVALID_GENERATION_ID');
  }
  assert.equal((await request('/Automation/Prepare/', 'POST', { generationId: 'bad-id' })).body.code, 'INVALID_GENERATION_ID');
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM background_jobs').get().n, count);
  const before = db.prepare("SELECT COUNT(*) AS n FROM operation_decisions WHERE action='save' AND status=200").get().n;
  const draft = makeDraft({ slug: 'encoded-id-save', title: '인코딩 작업 번호 저장 검사', keyword: '인코딩 작업 번호 저장 검사' });
  const saved = await request(`/Generations/${encoded(id)}/Draft/`, 'PUT', { draft }, revision(id));
  assert.equal(saved.status, 200, saved.body.error);
  assert.equal(saved.body.id, id);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM operation_decisions WHERE action='save' AND status=200").get().n, before + 1);
});
