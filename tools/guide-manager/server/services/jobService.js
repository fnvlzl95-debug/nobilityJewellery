const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');
const { setTimeout: delay } = require('timers/promises');
const { db } = require('../lib/db');
const log = require('../lib/logger');

const context = new AsyncLocalStorage();
const handlers = new Map();
const running = new Map();
const locks = new Map();
const MAX_CONCURRENT = 2;
const ACTIVE = ['queued', 'running', 'cancelling'];
db.exec(`CREATE TABLE IF NOT EXISTS background_jobs (
  id TEXT PRIMARY KEY, action TEXT NOT NULL, generation_id INTEGER,
  state TEXT NOT NULL, payload_json TEXT NOT NULL, options_json TEXT NOT NULL,
  result_json TEXT, error TEXT, error_code TEXT, events_json TEXT NOT NULL DEFAULT '[]',
  calls INTEGER NOT NULL DEFAULT 0, tokens INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL, started_at TEXT, finished_at TEXT, final_revision INTEGER
)`);

function failure(message, code, status = 409) { return Object.assign(new Error(message), { code, status }); }
function getJobSignal() { return context.getStore()?.controller.signal; }
function throwIfCancelled() {
  const signal = getJobSignal();
  if (signal?.aborted) throw signal.reason || failure('작업이 중단됐습니다', 'JOB_CANCELLED');
}
function get(id, { summary = false } = {}) {
  const row = db.prepare('SELECT * FROM background_jobs WHERE id=?').get(id);
  if (!row) throw failure('실행 기록을 찾을 수 없습니다', 'JOB_NOT_FOUND', 404);
  const options = JSON.parse(row.options_json);
  return {
    id: row.id, action: row.action, generationId: row.generation_id, state: row.state,
    result: !summary && row.result_json ? JSON.parse(row.result_json) : null,
    error: row.error, code: row.error_code, events: JSON.parse(row.events_json).slice(summary ? -5 : -100),
    calls: row.calls, tokens: row.tokens, maxCalls: options.maxCalls, maxTokens: options.maxTokens,
    createdAt: row.created_at, startedAt: row.started_at, finishedAt: row.finished_at,
    deadlineAt: row.started_at ? new Date(Date.parse(row.started_at) + options.timeoutMs).toISOString() : null,
    cancellable: options.cancellable !== false, retryMode: options.retryMode || 'retry',
  };
}
function list({ active = false } = {}) {
  const rows = active
    ? db.prepare("SELECT id FROM background_jobs WHERE state IN ('queued','running','cancelling') ORDER BY created_at").all()
    : db.prepare("SELECT id FROM background_jobs ORDER BY CASE WHEN state IN ('queued','running','cancelling') THEN 0 ELSE 1 END, created_at DESC LIMIT 60").all();
  return rows.map(row => get(row.id, { summary: true }));
}
function event(stage, detail = {}) {
  const current = context.getStore();
  if (!current) return;
  const row = db.prepare('SELECT events_json FROM background_jobs WHERE id=?').get(current.id);
  const events = JSON.parse(row.events_json);
  events.push({ at: new Date().toISOString(), stage, ...detail });
  db.prepare('UPDATE background_jobs SET events_json=? WHERE id=?').run(JSON.stringify(events.slice(-100)), current.id);
}
function consumeCall(stage, type = 'text') {
  throwIfCancelled();
  const current = context.getStore();
  if (!current) return;
  const row = db.prepare('SELECT calls,tokens FROM background_jobs WHERE id=?').get(current.id);
  if (row.calls >= current.options.maxCalls || row.tokens >= current.options.maxTokens) {
    throw failure('이 실행의 API 호출·토큰 한도에 도달했습니다. 저장된 결과를 확인한 뒤 남은 단계를 실행해 주세요', 'JOB_BUDGET_EXCEEDED');
  }
  db.prepare('UPDATE background_jobs SET calls=calls+1 WHERE id=?').run(current.id);
  event('provider-request', { providerStage: stage, type, attemptInJob: row.calls + 1 });
}
function recordUsage(usage) {
  const current = context.getStore();
  if (!current || !usage) return;
  const tokens = Number(usage.total_tokens ?? (Number(usage.input_tokens || 0) + Number(usage.output_tokens || 0)));
  if (Number.isFinite(tokens) && tokens > 0) db.prepare('UPDATE background_jobs SET tokens=tokens+? WHERE id=?').run(tokens, current.id);
}
function assertUnlocked(keys, owner = null) {
  for (const key of keys) {
    const held = locks.get(key);
    const queued = db.prepare("SELECT id,options_json FROM background_jobs WHERE state='queued'").all().find(row => JSON.parse(row.options_json).keys.includes(key));
    if ((held && held !== owner) || (queued && queued.id !== owner)) throw failure('이 글 또는 공유 파일을 처리하는 실행이 있습니다. 실행 상태에서 완료·취소 여부를 확인해 주세요', 'WORK_IN_PROGRESS');
  }
}
function acquire(keys, owner = Symbol()) {
  assertUnlocked(keys, owner);
  for (const key of keys) locks.set(key, owner);
  return () => { for (const key of keys) if (locks.get(key) === owner) locks.delete(key); };
}
function claimGeneration(id) {
  const current = context.getStore();
  if (!current) return;
  const key = `generation:${Number(id)}`;
  if (!current.options.keys.includes(key)) {
    assertUnlocked([key], current.id);
    locks.set(key, current.id);
    current.options.keys.push(key);
  }
  db.prepare('UPDATE background_jobs SET generation_id=?, options_json=? WHERE id=?').run(Number(id), JSON.stringify(current.options), current.id);
}
function register(action, handler) { handlers.set(action, handler); }
function submit(action, payload = {}, inputOptions = {}) {
  if (!handlers.has(action)) throw failure('지원하지 않는 실행입니다', 'JOB_ACTION_UNKNOWN', 400);
  const options = {
    keys: [], timeoutMs: 15 * 60 * 1000, maxCalls: 18, maxTokens: 200000,
    cancellable: true, retryMode: 'retry', ...inputOptions,
  };
  options.keys = [...new Set(options.keys)];
  assertUnlocked(options.keys);
  if (list({ active: true }).length >= 30) throw failure('실행 대기열이 가득 찼습니다', 'JOB_QUEUE_FULL', 429);
  const id = randomUUID();
  db.prepare(`INSERT INTO background_jobs(id,action,generation_id,state,payload_json,options_json,created_at)
    VALUES(?,?,?,'queued',?,?,?)`).run(id, action, options.generationId || null, JSON.stringify(payload), JSON.stringify(options), new Date().toISOString());
  setImmediate(pump);
  return get(id);
}
function pump() {
  if (running.size >= MAX_CONCURRENT) return;
  const queued = db.prepare("SELECT * FROM background_jobs WHERE state='queued' ORDER BY created_at").all();
  for (const row of queued) {
    if (running.size >= MAX_CONCURRENT) break;
    const options = JSON.parse(row.options_json);
    if (!handlers.has(row.action) || options.keys.some(key => locks.has(key))) continue;
    for (const key of options.keys) locks.set(key, row.id);
    const controller = new AbortController();
    const current = { id: row.id, options, controller };
    running.set(row.id, current);
    db.prepare("UPDATE background_jobs SET state='running',started_at=? WHERE id=?").run(new Date().toISOString(), row.id);
    const timer = setTimeout(() => {
      // Do not release the lock until the handler actually settles (including rollback).
      // Apply owns subprocess deadlines and rollback; do not label a committed apply cancelled.
      if (options.cancellable === false) return;
      controller.abort(failure('전체 실행 시간 한도에 도달했습니다. 완료된 단계는 보관했습니다', 'JOB_DEADLINE'));
      db.prepare("UPDATE background_jobs SET state='cancelling' WHERE id=?").run(row.id);
    }, options.timeoutMs);
    timer.unref?.();
    context.run(current, async () => {
      try {
        throwIfCancelled();
        if (options.generationId && options.expectedRevision != null) {
          const generation = db.prepare('SELECT revision FROM generations WHERE id=?').get(options.generationId);
          if (!generation || generation.revision !== options.expectedRevision) throw failure('대기 중 원고가 변경됐습니다. 최신 원고를 확인한 뒤 실행해 주세요', 'STALE_REVISION');
        }
        const result = await handlers.get(row.action)(JSON.parse(row.payload_json));
        throwIfCancelled();
        db.prepare("UPDATE background_jobs SET state='done',result_json=? WHERE id=?").run(JSON.stringify(result ?? null), row.id);
      } catch (error) {
        const reason = controller.signal.aborted ? controller.signal.reason : error;
        const state = reason?.code === 'JOB_CANCELLED' ? 'cancelled' : 'error';
        db.prepare('UPDATE background_jobs SET state=?,error=?,error_code=? WHERE id=?').run(state, log.sanitize(reason?.message || String(reason)), reason?.code || 'JOB_FAILED', row.id);
      } finally {
        clearTimeout(timer);
        const job = get(row.id);
        const revision = job.generationId ? db.prepare('SELECT revision FROM generations WHERE id=?').get(job.generationId)?.revision : null;
        db.prepare('UPDATE background_jobs SET finished_at=?,final_revision=? WHERE id=?').run(new Date().toISOString(), revision ?? null, row.id);
        for (const key of options.keys) if (locks.get(key) === row.id) locks.delete(key);
        running.delete(row.id);
        setImmediate(pump);
      }
    });
  }
}
function cancel(id) {
  const job = get(id);
  if (!job.cancellable) throw failure('파일 반영은 검사와 복원이 끝날 때까지 안전하게 완료해야 합니다', 'JOB_NOT_CANCELLABLE');
  if (job.state === 'queued') db.prepare("UPDATE background_jobs SET state='cancelled',finished_at=?,error_code='JOB_CANCELLED',error='실행 전에 취소했습니다' WHERE id=?").run(new Date().toISOString(), id);
  else if (job.state === 'running') {
    running.get(id)?.controller.abort(failure('운영자가 실행을 취소했습니다. 완료된 단계는 보관했습니다', 'JOB_CANCELLED'));
    db.prepare("UPDATE background_jobs SET state='cancelling' WHERE id=?").run(id);
  }
  return get(id);
}
function retry(id) {
  const row = db.prepare('SELECT * FROM background_jobs WHERE id=?').get(id);
  const job = get(id);
  if (!['error', 'cancelled', 'interrupted'].includes(job.state)) throw failure('중단·실패한 실행만 다시 시작할 수 있습니다', 'JOB_NOT_RETRYABLE');
  const options = JSON.parse(row.options_json);
  if (row.generation_id) {
    const revision = db.prepare('SELECT revision FROM generations WHERE id=?').get(row.generation_id)?.revision;
    if (revision == null || (row.final_revision != null && revision !== row.final_revision)) throw failure('실행 종료 후 원고가 변경됐습니다. 편집 화면에서 최신 내용을 확인하고 실행해 주세요', 'STALE_REVISION');
    options.generationId = row.generation_id;
    options.expectedRevision = revision;
  }
  const payload = JSON.parse(row.payload_json);
  // Automation resumes saved stages for the same generation; it never creates a second article.
  if (options.retryMode === 'resume' && row.generation_id) payload.body.generationId = row.generation_id;
  return submit(row.action, payload, options);
}
function recoverInterrupted() {
  db.prepare("UPDATE background_jobs SET state='interrupted',finished_at=?,error_code='JOB_INTERRUPTED',error='서버 재시작으로 실행이 중단됐습니다. 저장된 결과를 확인한 뒤 재개해 주세요' WHERE state IN ('queued','running','cancelling')").run(new Date().toISOString());
}
async function wait(ms) { throwIfCancelled(); await delay(ms, null, { signal: getJobSignal() }); throwIfCancelled(); }

module.exports = { get, list, submit, register, cancel, retry, acquire, assertUnlocked, claimGeneration, recoverInterrupted, getJobSignal, throwIfCancelled, consumeCall, recordUsage, event, wait, MAX_CONCURRENT, ACTIVE };
