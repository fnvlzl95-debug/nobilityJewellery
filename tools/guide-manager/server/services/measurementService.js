const { db } = require('../lib/db');
const { latestImport, latestGa4PagesImport } = require('./analyticsService');
const { nowIso, koreaDate } = require('../lib/utils');

db.exec(`CREATE TABLE IF NOT EXISTS guide_outcomes (
  reference TEXT PRIMARY KEY, guide_slug TEXT NOT NULL REFERENCES guides(slug),
  stage TEXT NOT NULL, occurred_on TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
)`);

function dataQuality() {
  const reports = [latestImport('gsc_performance'), latestGa4PagesImport(), latestImport('ga4_organic_landing'), latestImport('naver_web_performance')];
  return reports.map((row, index) => {
    const ageDays = row?.periodEnd ? Math.floor((Date.parse(koreaDate()) - Date.parse(row.periodEnd)) / 86400000) : null;
    return { label: ['GSC 검색', 'GA4 페이지', 'Google 검색 후 참여', 'Naver 웹검색'][index],
      periodStart: row?.periodStart || null, periodEnd: row?.periodEnd || null,
      ageDays, state: ageDays == null ? 'missing' : ageDays < 0 ? 'invalid' : ageDays > 7 ? 'stale' : 'current' };
  });
}

function listOutcomes() {
  const rows = db.prepare(`SELECT o.reference, o.guide_slug AS guideSlug, g.title, o.stage,
    o.occurred_on AS occurredOn, o.updated_at AS updatedAt FROM guide_outcomes o JOIN guides g ON g.slug=o.guide_slug
    ORDER BY o.occurred_on DESC, o.updated_at DESC LIMIT 500`).all();
  const totals = db.prepare(`SELECT COUNT(*) AS inquiries,
    COALESCE(SUM(CASE WHEN stage IN ('qualified','contract') THEN 1 ELSE 0 END),0) AS qualified,
    COALESCE(SUM(CASE WHEN stage='contract' THEN 1 ELSE 0 END),0) AS contracts FROM guide_outcomes`).get();
  return { rows, totals, dataQuality: dataQuality() };
}

function saveOutcome(input = {}) {
  const { reference, guideSlug, stage, occurredOn, mode } = input;
  if (mode != null && !['create', 'update'].includes(mode)) throw Object.assign(new Error('상담 등록·수정 방식을 확인해 주세요'), { status: 422 });
  if (!/^[a-zA-Z0-9_-]{6,64}$/.test(reference || '') || !['inquiry', 'qualified', 'contract', 'closed'].includes(stage)) throw Object.assign(new Error('식별번호와 상담 단계를 확인해 주세요'), { status: 422 });
  if (!db.prepare('SELECT slug FROM guides WHERE slug=?').get(guideSlug)) throw Object.assign(new Error('유입 가이드를 선택해 주세요'), { status: 422 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(occurredOn || '') || !Number.isFinite(Date.parse(occurredOn)) || new Date(occurredOn).toISOString().slice(0, 10) !== occurredOn || occurredOn > koreaDate()) throw Object.assign(new Error('오늘까지의 유효한 상담일을 입력해 주세요'), { status: 422 });
  const existing = db.prepare('SELECT guide_slug,stage,occurred_on FROM guide_outcomes WHERE reference=?').get(reference);
  if (mode === 'create' && existing) {
    if (existing.guide_slug === guideSlug && existing.stage === stage && existing.occurred_on === occurredOn) return listOutcomes();
    throw Object.assign(new Error('이미 등록된 접수번호입니다. 기존 상담 항목을 선택해 확인한 뒤 수정해 주세요.'), { status: 409, code: 'OUTCOME_EXISTS' });
  }
  if (mode === 'update' && !existing) throw Object.assign(new Error('수정할 상담 기록이 없습니다. 목록을 새로고침해 주세요.'), { status: 404, code: 'OUTCOME_NOT_FOUND' });
  db.prepare(`INSERT INTO guide_outcomes VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(reference)
    DO UPDATE SET guide_slug=excluded.guide_slug, stage=excluded.stage, occurred_on=excluded.occurred_on, updated_at=excluded.updated_at`)
    .run(reference, guideSlug, stage, occurredOn, nowIso(), nowIso());
  return listOutcomes();
}

module.exports = { dataQuality, listOutcomes, saveOutcome };
