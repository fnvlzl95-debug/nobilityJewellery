const { db } = require('../lib/db');
const { nowIso, normalizeUrl, sha256 } = require('../lib/utils');
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

const GSC_ZONE = 'America/Los_Angeles';
const GA4_ZONE = 'Asia/Seoul'; // The imported GA4 exports do not declare their reporting time zone.
const dayFormatters = new Map();

function dateInZone(value, zone) {
  if (!dayFormatters.has(zone)) dayFormatters.set(zone, new Intl.DateTimeFormat('en-CA', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
  }));
  const parts = Object.fromEntries(dayFormatters.get(zone).formatToParts(new Date(value)).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function reportZone(type) { return type === 'gsc_performance' ? GSC_ZONE : GA4_ZONE; }

function scopeOf(source) {
  const summary = source?.summary || {};
  const property = summary.property === 'https://noblessegold.com' ? 'https://noblessegold.com/' : summary.property;
  const searchType = String(summary.searchType || '').trim().toLowerCase();
  return source?.sourceType === 'gsc_performance' && summary.sitewideEligible === true
    && ['https://noblessegold.com/', 'sc-domain:noblessegold.com'].includes(property) && searchType === 'web'
    ? { property, searchType } : null;
}

function sameScope(left, right) {
  const property = value => value === 'https://noblessegold.com' ? 'https://noblessegold.com/' : value;
  return Boolean(left && right && property(left.property) === property(right.property) && left.searchType === right.searchType);
}

function importById(id) {
  const row = db.prepare(`SELECT id, source_type AS sourceType, period_start AS periodStart,
    period_end AS periodEnd, file_hash AS fileHash, summary_json AS summaryJson FROM analytics_imports WHERE id=?`).get(id);
  return row ? { ...row, summary: JSON.parse(row.summaryJson || '{}') } : null;
}

function gscMetrics(importId, normalized) {
  const gsc = db.prepare(`
    SELECT SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE 0 END AS ctr,
      CASE WHEN SUM(impressions)>0 THEN SUM(position*impressions)/SUM(impressions) ELSE AVG(position) END AS position,
      COUNT(*) AS variants
    FROM gsc_pages WHERE import_id=? AND normalized_url=?
  `).get(importId, normalized);
  return { hasData: Number(gsc?.variants || 0) > 0,
    clicks: gsc?.clicks ?? null, impressions: gsc?.impressions ?? null, ctr: gsc?.variants ? Number(gsc.ctr) : null,
    position: gsc?.position == null ? null : Number(gsc.position), variants: Number(gsc?.variants || 0) };
}

function metricsFingerprint(normalizedUrl, metrics) { return sha256(JSON.stringify({ normalizedUrl, ...metrics })); }

function metricSnapshot(slug, { performance = latestImport('gsc_performance'), ga4 = latestGa4PagesImport() } = {}) {
  const normalized = normalizeUrl(`https://noblessegold.com${guidePath(slug)}`);
  const gsc = performance ? gscMetrics(performance.id, normalized) : null;
  const gscSource = performance ? importById(performance.id) : null;
  const ga4Source = ga4 ? importById(ga4.id) : null;
  const engagement = ga4 ? aggregateGa4Rows(db.prepare('SELECT * FROM ga4_pages WHERE import_id=? AND guide_slug=?').all(ga4.id, slug)) : null;
  return {
    capturedAt: nowIso(),
    gsc: performance ? {
      importId: performance.id, periodStart: performance.periodStart, periodEnd: performance.periodEnd,
      periodDays: daysInclusive(performance.periodStart, performance.periodEnd),
      sourceType: 'gsc_performance', sourceScope: scopeOf(gscSource), fileHash: gscSource?.fileHash || null,
      normalizedUrl: normalized, metricFingerprint: metricsFingerprint(normalized, gsc),
      timeZone: GSC_ZONE, timeZoneAssumed: false, ...gsc,
    } : null,
    ga4: ga4 ? {
      importId: ga4.id, sourceType: ga4.sourceType, periodStart: ga4.periodStart, periodEnd: ga4.periodEnd,
      periodDays: daysInclusive(ga4.periodStart, ga4.periodEnd),
      fileHash: ga4Source?.fileHash || null, timeZone: GA4_ZONE, timeZoneAssumed: true,
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
      imported_at AS importedAt, file_hash AS fileHash, summary_json AS summaryJson FROM analytics_imports WHERE source_type IN (${types.map(() => '?').join(',')})
      AND (source_type <> 'gsc_performance' OR json_extract(summary_json, '$.sitewideEligible') = 1)
    ORDER BY period_end DESC, imported_at DESC, id DESC
  `).all(...types).map(row => ({ ...row, summary: JSON.parse(row.summaryJson || '{}') }))
    .filter(row => row.sourceType !== 'gsc_performance' || scopeOf(row));
}

function gscBaselineIssue(base, slug) {
  const id = Number(base?.importId);
  const source = Number.isSafeInteger(id) && id > 0 ? importById(id) : null;
  if (!scopeOf(source)) {
    return 'GSC 비교 보류: 변경 전 기준 자료의 속성·필터·수집 범위가 확인되지 않았습니다. 보존된 원본 파일을 다시 가져와 검증해 주세요.';
  }
  if (source.periodStart !== base.periodStart || source.periodEnd !== base.periodEnd
    || daysInclusive(source.periodStart, source.periodEnd) !== base.periodDays) {
    return 'GSC 비교 보류: 변경 전 스냅샷의 측정 기간이 원본 자료와 일치하지 않습니다. 기존 스냅샷을 보존하고 기준 자료를 검토해 주세요.';
  }
  if ((base.sourceScope && !sameScope(base.sourceScope, scopeOf(source))) || (base.fileHash && base.fileHash !== source.fileHash)) {
    return 'GSC 비교 보류: 변경 전 스냅샷의 속성·검색 유형 또는 원본 식별자가 현재 기준 자료와 다릅니다. 보존된 스냅샷과 원본을 검토해 주세요.';
  }
  const normalized = slug ? normalizeUrl(`https://noblessegold.com${guidePath(slug)}`) : base.normalizedUrl;
  if (normalized) {
    const actual = gscMetrics(id, normalized);
    const mismatch = ['clicks', 'impressions', 'ctr', 'position', 'hasData', 'variants'].some(key => {
      if (!Object.hasOwn(base, key)) return false; // Legacy snapshots can lack the row-presence fields.
      if (base[key] == null || actual[key] == null || typeof base[key] === 'boolean') return base[key] !== actual[key];
      return !Number.isFinite(Number(base[key])) || Math.abs(Number(base[key]) - actual[key]) > 1e-10 * Math.max(1, Math.abs(actual[key]));
    });
    if (mismatch || (base.normalizedUrl && base.normalizedUrl !== normalized)
      || (base.metricFingerprint && base.metricFingerprint !== metricsFingerprint(normalized, actual))) {
      return 'GSC 비교 보류: 변경 전 스냅샷의 수치가 보존된 원본의 현재 재집계와 일치하지 않습니다. 스냅샷은 변경하지 않았으며 기준 자료 검토가 필요합니다.';
    }
  }
  return null;
}

function eligibleImport(base, type, appliedAt, slug, { expectedPeriod = null } = {}) {
  if (!base || !appliedAt || !base.periodDays || base.periodDays < 1) return null;
  const isGsc = (Array.isArray(type) ? type : [type]).includes('gsc_performance');
  if (isGsc && gscBaselineIssue(base, slug)) return null;
  const baseScope = isGsc ? scopeOf(importById(base.importId)) : null;
  return postDeploymentImports(base, type, appliedAt).find(row => (!isGsc || sameScope(baseScope, scopeOf(row)))
    && (!expectedPeriod || (row.periodStart === expectedPeriod.periodStart && row.periodEnd === expectedPeriod.periodEnd))) || null;
}

function firstObservationPeriod(deployedAt, periodDays, platform = 'gsc') {
  if (!deployedAt || !Number.isInteger(periodDays) || periodDays < 1) return null;
  const timeZone = platform === 'gsc' ? GSC_ZONE : GA4_ZONE;
  const day = dateInZone(deployedAt, timeZone);
  const start = Date.parse(`${day}T00:00:00Z`) + 86400000;
  return { periodStart: new Date(start).toISOString().slice(0, 10),
    periodEnd: new Date(start + (periodDays - 1) * 86400000).toISOString().slice(0, 10),
    periodDays, timeZone, timeZoneAssumed: platform !== 'gsc' };
}

function postDeploymentImports(base, type, appliedAt) {
  const zone = (Array.isArray(type) ? type : [type]).includes('gsc_performance') ? GSC_ZONE : GA4_ZONE;
  const deployedDay = dateInZone(appliedAt, zone);
  if (!base.periodEnd || base.periodEnd >= deployedDay) return [];
  return importRows(type).filter((row) => row.id !== base.importId
    && daysInclusive(row.periodStart, row.periodEnd) === base.periodDays
    && (!base.sourceType || row.sourceType === base.sourceType)
    && row.periodStart > deployedDay
    && row.periodStart > base.periodEnd
    && row.periodEnd < dateInZone(Date.now(), zone));
}

function delta(before, after, key) {
  const left = before?.[key];
  const right = after?.[key];
  if (left == null || right == null) return null;
  return { before: left, after: right, change: right - left, rate: left === 0 ? null : (right - left) / Math.abs(left) };
}

function eligibleObservation(type, deployedAt) {
  if (!deployedAt) return null;
  return importRows(type).find(row => row.periodStart > dateInZone(deployedAt, reportZone(row.sourceType))
    && daysInclusive(row.periodStart, row.periodEnd) >= 7
    && daysInclusive(row.periodStart, row.periodEnd) <= 35
    && row.periodEnd < dateInZone(Date.now(), reportZone(row.sourceType))) || null;
}

function observationReadyAt(deployedAt, days, timeZone = GA4_ZONE) {
  if (!deployedAt) return null;
  const day = dateInZone(deployedAt, timeZone);
  const utc = Date.parse(day + 'T00:00:00Z') + (days + 1) * 86400000;
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' });
  let instant = utc;
  // Solve local midnight using the zone's offset at that instant, including DST transition days.
  for (let i = 0; i < 3; i += 1) {
    const name = formatter.formatToParts(new Date(instant)).find(part => part.type === 'timeZoneName').value;
    const offset = /^GMT([+-])(\d{2}):(\d{2})$/.exec(name);
    instant = utc - (offset ? (offset[1] === '+' ? 1 : -1) * (Number(offset[2]) * 60 + Number(offset[3])) * 60000 : 0);
  }
  return new Date(instant).toISOString();
}

function measurementPeriod(snapshot, platform) {
  if (!snapshot) return null;
  const source = importById(snapshot.importId);
  const scope = snapshot.sourceScope || scopeOf(source);
  return { importId: snapshot.importId, sourceType: snapshot.sourceType || source?.sourceType || null,
    periodStart: snapshot.periodStart, periodEnd: snapshot.periodEnd, periodDays: snapshot.periodDays,
    timeZone: platform === 'gsc' ? GSC_ZONE : GA4_ZONE, timeZoneAssumed: platform !== 'gsc',
    property: scope?.property || null, searchType: scope?.searchType || null };
}

function listComparisons() {
  return db.prepare(`
    SELECT b.id, b.generation_id AS generationId, b.guide_slug AS guideSlug, b.snapshot_json AS snapshotJson,
      b.applied_at AS appliedAt, b.deployed_at AS deployedAt, b.deployment_commit AS deploymentCommit, g.topic, g.kind FROM content_baselines b JOIN generations g ON g.id=b.generation_id
    ORDER BY b.applied_at DESC
  `).all().map((row) => {
    const before = JSON.parse(row.snapshotJson);
    const isNew = row.kind === 'new';
    let gscComparisonIssue = isNew ? null : gscBaselineIssue(before.gsc, row.guideSlug);
    const performance = isNew ? eligibleObservation('gsc_performance', row.deployedAt) : eligibleImport(before.gsc, 'gsc_performance', row.deployedAt, row.guideSlug);
    if (!isNew && !gscComparisonIssue && !performance && row.deployedAt
      && postDeploymentImports(before.gsc, 'gsc_performance', row.deployedAt).length) {
      gscComparisonIssue = 'GSC 비교 보류: 변경 전과 후의 속성·검색 유형이 다릅니다. 같은 검색 속성의 전체 보고서를 가져와 주세요.';
    }
    const ga4 = isNew ? eligibleObservation(['ga4_path_device','ga4_overview'], row.deployedAt) : eligibleImport(before.ga4, ['ga4_path_device', 'ga4_overview'], row.deployedAt);
    const after = performance || ga4 ? metricSnapshot(row.guideSlug, { performance, ga4 }) : null;
    return {
      id: row.id, generationId: row.generationId, guideSlug: row.guideSlug, topic: row.topic, kind: row.kind,
      appliedAt: row.appliedAt, deployedAt: row.deployedAt, deploymentCommit: row.deploymentCommit,
      readyAt: row.deployedAt ? [observationReadyAt(row.deployedAt, isNew ? 28 : Math.max(before.gsc?.periodDays || 0, 28), GSC_ZONE),
        observationReadyAt(row.deployedAt, isNew ? 28 : Math.max(before.ga4?.periodDays || 0, 28), GA4_ZONE)].sort().at(-1) : null,
      status: !row.deployedAt ? 'awaiting_deployment' : after ? (isNew ? 'observed' : 'comparable') : 'waiting', before, after, gscComparisonIssue,
      changes: after && !isNew ? {
        clicks: delta(before.gsc, after.gsc, 'clicks'), impressions: delta(before.gsc, after.gsc, 'impressions'),
        ctr: delta(before.gsc, after.gsc, 'ctr'), position: delta(before.gsc, after.gsc, 'position'),
        views: delta(before.ga4, after.ga4, 'views'), activeUsers: delta(before.ga4, after.ga4, 'activeUsers'),
        bounceRate: delta(before.ga4, after.ga4, 'bounceRate'),
      } : null,
      measurementPeriods: {
        gsc: { before: measurementPeriod(before.gsc, 'gsc'), after: measurementPeriod(after?.gsc, 'gsc') },
        ga4: { before: measurementPeriod(before.ga4, 'ga4'), after: measurementPeriod(after?.ga4, 'ga4') },
      },
      note: isNew
        ? '새 글은 기존 성과를 0으로 가정하지 않습니다. 배포 다음 날 이후 완료된 7~35일 자료의 노출·클릭·방문을 관찰하며, 기본 점검 시점은 28일입니다. 목록에 없는 행은 미확인입니다. GSC는 태평양 시간 기준이며 GA4는 시간대 메타가 없어 한국 시간을 가정합니다. 플랫폼별 측정 기간을 각각 확인하세요.'
        : ['배포 다음 날부터의 전체 측정 기간만 비교합니다. 누락 행은 0이 아닙니다. 동일 길이 측정 기간의 참고 변화이며, 콘텐츠 수정의 인과효과로 해석하지 않습니다. GSC는 태평양 시간 기준이며 GA4는 시간대 메타가 없어 한국 시간을 가정합니다.', gscComparisonIssue].filter(Boolean).join(' '),
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

module.exports = { recordDeployment, daysInclusive, metricSnapshot, recordBaseline, listComparisons, eligibleImport, eligibleObservation, observationReadyAt, firstObservationPeriod };
