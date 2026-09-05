const { db } = require('../lib/db');

db.exec(`CREATE TABLE IF NOT EXISTS operation_measurement_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS operation_decisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL,
    status INTEGER NOT NULL, code TEXT, recorded_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS operation_decisions_recorded ON operation_decisions(recorded_at);`);
db.prepare("INSERT OR IGNORE INTO operation_measurement_meta(key,value) VALUES('started_at',?)").run(new Date().toISOString());

function decisionAction(method, route) {
  route = String(route || '').toLowerCase().replace(/\/+$/, '') || '/';
  if (method === 'POST' && (route === '/generations' || /^\/audits\/[^/]+\/create-update$/.test(route))) return 'create';
  if (method === 'PUT' && /^\/generations\/\d+\/draft$/.test(route)) return 'save';
  if (method === 'POST' && /^\/generations\/\d+\/approve$/.test(route)) return 'approve';
  return null;
}

function recordDecision(action, status, code = null, now = new Date()) {
  if (!['create', 'save', 'approve'].includes(action)) return;
  // Only a fixed action, status and machine code are retained: no body, URL,
  // topic, customer data, token, error message or source-review text.
  const safeCode = /^[A-Z][A-Z0-9_]{0,63}$/.test(code || '') ? code : null;
  db.prepare('INSERT INTO operation_decisions(action,status,code,recorded_at) VALUES(?,?,?,?)')
    .run(action, status, safeCode, now.toISOString());
}

function percentile(values, p) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (sorted.length - 1) * p, low = Math.floor(rank), high = Math.ceil(rank);
  return Math.round(sorted[low] + (sorted[high] - sorted[low]) * (rank - low));
}
const rate = (numerator, denominator) => ({ numerator, denominator, rate: denominator ? numerator / denominator : null });
const hasTable = name => !!db.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name);

function qualityReport({ days = 28, now = new Date() } = {}) {
  if (![7, 28, 90].includes(Number(days))) throw Object.assign(new Error('측정 기간은 최근 7일·28일·90일 중에서 선택해 주세요.'), { status: 422 });
  days = Number(days);
  const to = now.toISOString(), from = new Date(now.getTime() - days * 86400000).toISOString();
  const decisions = db.prepare('SELECT action,status,code,COUNT(*) AS n FROM operation_decisions WHERE recorded_at>=? AND recorded_at<=? GROUP BY action,status,code').all(from, to);
  const count = predicate => decisions.filter(predicate).reduce((sum, row) => sum + row.n, 0);
  const jobs = hasTable('background_jobs') ? db.prepare(`SELECT action,state,created_at,started_at,finished_at FROM background_jobs
    WHERE created_at>=? AND created_at<=?`).all(from, to) : [];
  const actions = [...new Set(jobs.map(row => row.action))].sort().map(action => {
    const group = jobs.filter(row => row.action === action);
    const completed = group.filter(row => row.state === 'done');
    const durations = completed.map(row => Date.parse(row.finished_at) - Date.parse(row.started_at)).filter(value => Number.isFinite(value) && value >= 0);
    return { action, requested: group.length, completed: completed.length, failed: group.filter(row => ['error', 'interrupted'].includes(row.state)).length,
      cancelled: group.filter(row => row.state === 'cancelled').length, active: group.filter(row => ['queued', 'running', 'cancelling'].includes(row.state)).length,
      durationSamples: durations.length, p50Ms: percentile(durations, 0.5), p95Ms: percentile(durations, 0.95) };
  });
  const drafts = db.prepare(`SELECT generation_id AS id,
    MAX(CASE WHEN stage IN ('repair_luna','fallback_terra') THEN 1 ELSE 0 END) AS repaired
    FROM model_runs WHERE generation_id IS NOT NULL AND created_at>=? AND created_at<=?
      AND stage IN ('draft_luna','repair_luna','fallback_terra') GROUP BY generation_id`).all(from, to);
  const applyCounts = db.prepare(`SELECT state,COUNT(*) AS n FROM applies WHERE created_at>=? AND created_at<=? GROUP BY state`).all(from, to);
  const doneApplies = applyCounts.filter(row => ['done', 'rolled_back', 'recovery_required'].includes(row.state));
  const failedApplies = doneApplies.filter(row => row.state !== 'done').reduce((sum, row) => sum + row.n, 0);
  return {
    version: 1, generatedAt: to, window: { days, from, to },
    decisionTrackingStartedAt: db.prepare("SELECT value FROM operation_measurement_meta WHERE key='started_at'").get().value,
    durations: actions,
    repair: { ...rate(drafts.filter(row => row.repaired).length, drafts.length), definition: '해당 기간에 자동 초안 또는 자동 보완 호출이 기록된 작업 중 Luna 보완·Terra 대체 호출이 한 번 이상 있었던 작업. 수동 수정률과 다릅니다.' },
    duplicates: { ...rate(count(row => row.action === 'create' && row.code === 'DUPLICATE_INTENT' && row.status >= 400), count(row => row.action === 'create')),
      definition: '계측 시작 이후 직접 생성·기존 글 수정 생성 API 요청 중 동일 의도로 거절된 요청. 자동 준비 내부 생성은 제외합니다. 재시도는 별도 요청이며 과거 기록을 0건으로 소급하지 않습니다.' },
    scopeRejections: { ...rate(count(row => ['save', 'approve'].includes(row.action) && row.code === 'UPDATE_SCOPE_DRIFT' && row.status >= 400), count(row => ['save', 'approve'].includes(row.action))),
      definition: '계측 시작 이후 저장·승인 요청 중 선택하지 않은 필드 변경으로 거절된 요청. 승인 후 실제 범위 이탈률을 뜻하지 않습니다.' },
    applyFailures: { ...rate(failedApplies, doneApplies.reduce((sum, row) => sum + row.n, 0)), pending: applyCounts.filter(row => row.state === 'running').reduce((sum, row) => sum + row.n, 0),
      definition: '실제 파일 반영 시도 중 완료·자동 복원·복구 필요로 종료된 실행을 분모로 합니다. 승인 이후 경과한 모든 작업을 분모로 삼지 않습니다.' },
    costPerQualifiedInquiry: { value: null, currency: null, reason: '작업별 실제 청구 비용·통화와 같은 기간의 유효 상담을 연결한 자료가 없어 계산하지 않습니다. 토큰 수나 클릭을 비용·상담으로 환산하지 않습니다.' },
    note: '제작 운영 지표입니다. 순위·노출 상승이나 콘텐츠 사실 정확성을 증명하지 않습니다. 작업 시간은 성공한 백그라운드 실행의 시작~종료이며 대기열·사람의 검토 시간은 제외합니다. p50·p95는 표본 분위수입니다.',
  };
}

module.exports = { decisionAction, recordDecision, qualityReport, percentile };
