const { db } = require('../lib/db');
const { nowIso, normalizeUrl } = require('../lib/utils');
const { latestImport, latestGa4PagesImport } = require('./analyticsService');

function daysInclusive(start, end) {
  if (!start || !end) return null;
  const left = Date.parse(`${start}T00:00:00Z`);
  const right = Date.parse(`${end}T00:00:00Z`);
  return Number.isFinite(left) && Number.isFinite(right) ? Math.round((right - left) / 86400000) + 1 : null;
}

function guidePath(slug) {
  return db.prepare('SELECT path FROM guides WHERE slug=?').get(slug)?.path || `/guide/${slug}`;
}

function metricSnapshot(slug, { performance = latestImport('gsc_performance'), ga4 = latestGa4PagesImport() } = {}) {
  const normalized = normalizeUrl(`https://noblessegold.com${guidePath(slug)}`);
  const gsc = performance ? db.prepare(`
    SELECT SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE 0 END AS ctr,
      CASE WHEN SUM(impressions)>0 THEN SUM(position*impressions)/SUM(impressions) ELSE AVG(position) END AS position,
      COUNT(*) AS variants
    FROM gsc_pages WHERE import_id=? AND normalized_url=?
  `).get(performance.id, normalized) : null;
  const engagement = ga4 ? db.prepare(`
    SELECT SUM(views) AS views, SUM(active_users) AS activeUsers, SUM(events) AS events,
      CASE WHEN COUNT(*)=1 THEN MAX(bounce_rate) ELSE NULL END AS bounceRate, COUNT(*) AS rows FROM ga4_pages WHERE import_id=? AND guide_slug=?
  `).get(ga4.id, slug) : null;
  return {
    capturedAt: nowIso(),
    gsc: performance ? {
      importId: performance.id, periodStart: performance.periodStart, periodEnd: performance.periodEnd,
      periodDays: daysInclusive(performance.periodStart, performance.periodEnd),
      hasData: Number(gsc?.variants || 0) > 0,
      clicks: gsc?.clicks ?? null, impressions: gsc?.impressions ?? null, ctr: gsc?.variants ? Number(gsc.ctr) : null,
      position: gsc?.position == null ? null : Number(gsc.position), variants: Number(gsc?.variants || 0),
    } : null,
    ga4: ga4 ? {
      importId: ga4.id, sourceType: ga4.sourceType, periodStart: ga4.periodStart, periodEnd: ga4.periodEnd,
      periodDays: daysInclusive(ga4.periodStart, ga4.periodEnd),
      hasData: Number(engagement?.rows || 0) > 0,
      views: engagement?.views ?? null, activeUsers: engagement?.rows === 1 ? engagement.activeUsers : null,
      events: Number(engagement?.events || 0), bounceRate: engagement?.bounceRate == null ? null : Number(engagement.bounceRate),
    } : null,
  };
}

function recordBaseline(generationId, slug, snapshot, appliedAt = nowIso()) {
  db.prepare(`
    INSERT INTO content_baselines (generation_id, guide_slug, snapshot_json, applied_at, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(generation_id) DO UPDATE SET guide_slug=excluded.guide_slug,
      snapshot_json=excluded.snapshot_json, applied_at=excluded.applied_at, created_at=excluded.created_at
  `).run(generationId, slug, JSON.stringify(snapshot), appliedAt, nowIso());
}

function importRows(type) {
  const types = Array.isArray(type) ? type : [type];
  return db.prepare(`
    SELECT id, source_type AS sourceType, period_start AS periodStart, period_end AS periodEnd,
      imported_at AS importedAt FROM analytics_imports WHERE source_type IN (${types.map(() => '?').join(',')}) ORDER BY id DESC
  `).all(...types);
}

function eligibleImport(base, type, appliedAt) {
  if (!base || !appliedAt || !base.periodDays || base.periodDays < 1) return null;
  const deployedDay = new Date(Date.parse(appliedAt) + 9 * 3600000).toISOString().slice(0, 10);
  if (!base.periodEnd || base.periodEnd >= deployedDay) return null;
  return importRows(type).find((row) => row.id !== base.importId
    && daysInclusive(row.periodStart, row.periodEnd) === base.periodDays
    && (!base.sourceType || row.sourceType === base.sourceType)
    && row.periodStart > deployedDay
    && row.periodStart > base.periodEnd
    && Date.parse(row.periodEnd + 'T23:59:59+09:00') < Date.now()) || null;
}

function delta(before, after, key) {
  const left = before?.[key];
  const right = after?.[key];
  if (left == null || right == null) return null;
  return { before: left, after: right, change: right - left, rate: left === 0 ? null : (right - left) / Math.abs(left) };
}

function listComparisons() {
  return db.prepare(`
    SELECT b.id, b.generation_id AS generationId, b.guide_slug AS guideSlug, b.snapshot_json AS snapshotJson,
      b.applied_at AS appliedAt, b.deployed_at AS deployedAt, b.deployment_commit AS deploymentCommit, g.topic FROM content_baselines b JOIN generations g ON g.id=b.generation_id
    ORDER BY b.applied_at DESC
  `).all().map((row) => {
    const before = JSON.parse(row.snapshotJson);
    const performance = eligibleImport(before.gsc, 'gsc_performance', row.deployedAt);
    const ga4 = eligibleImport(before.ga4, ['ga4_path_device', 'ga4_overview'], row.deployedAt);
    const after = performance || ga4 ? metricSnapshot(row.guideSlug, { performance, ga4 }) : null;
    return {
      id: row.id, generationId: row.generationId, guideSlug: row.guideSlug, topic: row.topic,
      appliedAt: row.appliedAt, deployedAt: row.deployedAt, deploymentCommit: row.deploymentCommit,
      readyAt: row.deployedAt ? new Date(Date.parse(row.deployedAt) + Math.max(before.gsc?.periodDays || 0, before.ga4?.periodDays || 0, 28) * 86400000).toISOString() : null,
      status: !row.deployedAt ? 'awaiting_deployment' : after ? 'comparable' : 'waiting', before, after,
      changes: after ? {
        clicks: delta(before.gsc, after.gsc, 'clicks'), impressions: delta(before.gsc, after.gsc, 'impressions'),
        ctr: delta(before.gsc, after.gsc, 'ctr'), position: delta(before.gsc, after.gsc, 'position'),
        views: delta(before.ga4, after.ga4, 'views'), activeUsers: delta(before.ga4, after.ga4, 'activeUsers'),
        bounceRate: delta(before.ga4, after.ga4, 'bounceRate'),
      } : null,
      note: '배포 다음 날부터의 전체 측정 기간만 비교합니다. 누락 행은 0이 아닙니다. 동일 길이 측정 기간의 참고 변화이며, 콘텐츠 수정의 인과효과로 해석하지 않습니다.',
    };
  });
}

function recordDeployment(id, { deployedAt, commit } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}T/.test(deployedAt || '') || !Number.isFinite(Date.parse(deployedAt)) || Date.parse(deployedAt) > Date.now()) throw Object.assign(new Error('실제 배포 완료 시각을 입력해 주세요'), { status: 422 });
  if (!/^[a-f0-9]{7,40}$/i.test(commit || '')) throw Object.assign(new Error('배포된 Git 커밋을 입력해 주세요'), { status: 422 });
  const row = db.prepare('SELECT applied_at FROM content_baselines WHERE id=?').get(id);
  if (!row || Date.parse(deployedAt) < Date.parse(row.applied_at)) throw Object.assign(new Error('로컬 반영 이후의 배포 시각이어야 합니다'), { status: 422 });
  db.prepare('UPDATE content_baselines SET deployed_at=?, deployment_commit=? WHERE id=?').run(new Date(deployedAt).toISOString(), commit.toLowerCase(), id);
  return { ok: true };
}

module.exports = { recordDeployment, daysInclusive, metricSnapshot, recordBaseline, listComparisons, eligibleImport };
