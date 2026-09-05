const { db } = require('../lib/db');
const { nowIso, normalizeUrl } = require('../lib/utils');
const { latestImport, latestGa4PagesImport } = require('./analyticsService');
const { aggregateGa4Rows } = require('./analyticsMetricsService');

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
  const engagement = ga4 ? aggregateGa4Rows(db.prepare('SELECT * FROM ga4_pages WHERE import_id=? AND guide_slug=?').all(ga4.id, slug)) : null;
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
      views: engagement?.rows ? engagement.views : null, activeUsers: engagement?.activeUsers ?? null,
      events: engagement?.rows ? engagement.events : null, bounceRate: engagement?.bounceRate ?? null,
    } : null,
  };
}

function recordBaseline(generationId, slug, snapshot, appliedAt = nowIso()) {
  const generation = db.prepare('SELECT kind,input_json FROM generations WHERE id=?').get(generationId);
  const input = JSON.parse(generation?.input_json || '{}');
  const recorded = { ...snapshot, contentChange: {
    kind: generation?.kind || 'update', fields: input.updatePolicy?.scope?.fields || null,
    selectionMode: input.topicDecision?.selectionMode || null,
    editorialJustification: input.topicDecision?.editorialJustification || null,
  } };
  db.prepare(`
    INSERT INTO content_baselines (generation_id, guide_slug, snapshot_json, applied_at, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(generation_id) DO UPDATE SET guide_slug=excluded.guide_slug,
      snapshot_json=excluded.snapshot_json, applied_at=excluded.applied_at, created_at=excluded.created_at,
      deployed_at=NULL, deployment_commit=NULL
  `).run(generationId, slug, JSON.stringify(recorded), appliedAt, nowIso());
}

function importRows(type) {
  const types = Array.isArray(type) ? type : [type];
  return db.prepare(`
    SELECT id, source_type AS sourceType, period_start AS periodStart, period_end AS periodEnd,
      imported_at AS importedAt FROM analytics_imports WHERE source_type IN (${types.map(() => '?').join(',')})
      AND (source_type <> 'gsc_performance' OR json_extract(summary_json, '$.sitewideEligible') = 1)
    ORDER BY period_end DESC, imported_at DESC, id DESC
  `).all(...types);
}

function gscBaselineIssue(base) {
  const id = Number(base?.importId);
  const source = Number.isSafeInteger(id) && id > 0 ? db.prepare(`
    SELECT source_type, period_start, period_end, json_extract(summary_json, '$.sitewideEligible') AS eligible
    FROM analytics_imports WHERE id=?
  `).get(id) : null;
  if (!source || source.source_type !== 'gsc_performance' || source.eligible !== 1) {
    return 'GSC 비교 보류: 변경 전 기준 자료의 속성·필터·수집 범위가 확인되지 않았습니다. 보존된 원본 파일을 다시 가져와 검증해 주세요.';
  }
  if (source.period_start !== base.periodStart || source.period_end !== base.periodEnd
    || daysInclusive(source.period_start, source.period_end) !== base.periodDays) {
    return 'GSC 비교 보류: 변경 전 스냅샷의 측정 기간이 원본 자료와 일치하지 않습니다. 기존 스냅샷을 보존하고 기준 자료를 검토해 주세요.';
  }
  return null;
}

function eligibleImport(base, type, appliedAt) {
  if (!base || !appliedAt || !base.periodDays || base.periodDays < 1) return null;
  if ((Array.isArray(type) ? type : [type]).includes('gsc_performance') && gscBaselineIssue(base)) return null;
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

function eligibleObservation(type, deployedAt) {
  if (!deployedAt) return null;
  const day = new Date(Date.parse(deployedAt) + 9 * 3600000).toISOString().slice(0, 10);
  return importRows(type).filter(row => row.periodStart > day
    && daysInclusive(row.periodStart, row.periodEnd) >= 7
    && daysInclusive(row.periodStart, row.periodEnd) <= 35
    && Date.parse(row.periodEnd + 'T23:59:59+09:00') < Date.now())
    .sort((a,b) => String(b.periodEnd).localeCompare(String(a.periodEnd)) || b.id-a.id)[0] || null;
}

function observationReadyAt(deployedAt, days) {
  if (!deployedAt) return null;
  const day = new Date(Date.parse(deployedAt) + 9 * 3600000).toISOString().slice(0, 10);
  return new Date(Date.parse(day + 'T00:00:00+09:00') + (days + 1) * 86400000).toISOString();
}

function listComparisons() {
  return db.prepare(`
    SELECT b.id, b.generation_id AS generationId, b.guide_slug AS guideSlug, b.snapshot_json AS snapshotJson,
      b.applied_at AS appliedAt, b.deployed_at AS deployedAt, b.deployment_commit AS deploymentCommit, g.topic, g.kind FROM content_baselines b JOIN generations g ON g.id=b.generation_id
    ORDER BY b.applied_at DESC
  `).all().map((row) => {
    const before = JSON.parse(row.snapshotJson);
    const isNew = row.kind === 'new';
    const gscComparisonIssue = isNew ? null : gscBaselineIssue(before.gsc);
    const performance = isNew ? eligibleObservation('gsc_performance', row.deployedAt) : eligibleImport(before.gsc, 'gsc_performance', row.deployedAt);
    const ga4 = isNew ? eligibleObservation(['ga4_path_device','ga4_overview'], row.deployedAt) : eligibleImport(before.ga4, ['ga4_path_device', 'ga4_overview'], row.deployedAt);
    const after = performance || ga4 ? metricSnapshot(row.guideSlug, { performance, ga4 }) : null;
    return {
      id: row.id, generationId: row.generationId, guideSlug: row.guideSlug, topic: row.topic, kind: row.kind,
      appliedAt: row.appliedAt, deployedAt: row.deployedAt, deploymentCommit: row.deploymentCommit,
      readyAt: observationReadyAt(row.deployedAt, isNew ? 28 : Math.max(before.gsc?.periodDays || 0, before.ga4?.periodDays || 0, 28)),
      status: !row.deployedAt ? 'awaiting_deployment' : after ? (isNew ? 'observed' : 'comparable') : 'waiting', before, after, gscComparisonIssue,
      changes: after && !isNew ? {
        clicks: delta(before.gsc, after.gsc, 'clicks'), impressions: delta(before.gsc, after.gsc, 'impressions'),
        ctr: delta(before.gsc, after.gsc, 'ctr'), position: delta(before.gsc, after.gsc, 'position'),
        views: delta(before.ga4, after.ga4, 'views'), activeUsers: delta(before.ga4, after.ga4, 'activeUsers'),
        bounceRate: delta(before.ga4, after.ga4, 'bounceRate'),
      } : null,
      note: isNew
        ? '새 글은 기존 성과를 0으로 가정하지 않습니다. 배포 다음 날 이후 완료된 7~35일 자료의 노출·클릭·방문을 관찰하며, 기본 점검 시점은 28일입니다. 목록에 없는 행은 미확인입니다.'
        : ['배포 다음 날부터의 전체 측정 기간만 비교합니다. 누락 행은 0이 아닙니다. 동일 길이 측정 기간의 참고 변화이며, 콘텐츠 수정의 인과효과로 해석하지 않습니다.', gscComparisonIssue].filter(Boolean).join(' '),
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

module.exports = { recordDeployment, daysInclusive, metricSnapshot, recordBaseline, listComparisons, eligibleImport, eligibleObservation, observationReadyAt };
