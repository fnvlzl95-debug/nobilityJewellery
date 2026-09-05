const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const AdmZip = require('adm-zip');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-baseline-selection-'));
const { db } = require('../server/lib/db');
const baseline = require('../server/services/baselineService');
const { importBuffer } = require('../server/services/analyticsService');

test.beforeEach(() => {
  db.prepare('DELETE FROM content_baselines').run();
  db.prepare('DELETE FROM generations').run();
  db.prepare('DELETE FROM analytics_imports').run();
  before = { gsc: { importId: report({ start: '2024-01-01', end: '2024-01-28', clicks: 5, impressions: 100, position: 7 }),
    periodStart: '2024-01-01', periodEnd: '2024-01-28', periodDays: 28, clicks: 5, impressions: 100, ctr: 0.05, position: 7 }, ga4: null };
});
test.after(() => db.close());

const deployedAt = '2024-02-01T10:00:00Z';
let before;

function report({ type = 'gsc_performance', start = '2024-03-01', end = '2024-03-28', summary = { sitewideEligible: true, property: 'https://noblessegold.com/', searchType: 'web' }, importedAt = '2024-06-01T00:00:00Z', clicks = 20, impressions = 200, position = 4 } = {}) {
  const id = Number(db.prepare(`INSERT INTO analytics_imports (source_type,file_name,file_hash,period_start,period_end,parser_version,summary_json,imported_at)
    VALUES (?,'synthetic.csv',?,?,?,'test',?,?)`).run(type, randomUUID(), start, end, JSON.stringify(summary), importedAt).lastInsertRowid);
  if (type.startsWith('gsc_performance')) db.prepare(`INSERT INTO gsc_pages (import_id,original_url,normalized_url,clicks,impressions,ctr,position)
    VALUES (?,'https://noblessegold.com/guide/fixture','https://noblessegold.com/guide/fixture',?,?,?,?)`).run(id, clicks, impressions, clicks / impressions, position);
  return id;
}

function storedBaseline(kind = 'update') {
  const id = Number(db.prepare(`INSERT INTO generations (kind,topic,status,input_json,created_at,updated_at)
    VALUES (?,'baseline fixture','applied','{}',?,?)`).run(kind, deployedAt, deployedAt).lastInsertRowid);
  const snapshotJson = JSON.stringify({ ...before, contentChange: { kind, fields: ['sources'] } });
  db.prepare(`INSERT INTO content_baselines (generation_id,guide_slug,snapshot_json,applied_at,created_at,deployed_at,deployment_commit)
    VALUES (?,'fixture',?,?,?,?,?)`).run(id, snapshotJson, deployedAt, deployedAt, deployedAt, 'abcdef1234567');
  return { id, snapshotJson };
}

test('update comparison selects the latest measured eligible period despite a later upload of older data', () => {
  const saved = storedBaseline();
  const latestPeriod = report({ importedAt: '2024-04-01T00:00:00Z', clicks: 20 });
  const laterUpload = report({ start: '2024-02-02', end: '2024-02-29', importedAt: '2024-05-01T00:00:00Z', clicks: 8 });
  assert.ok(laterUpload > latestPeriod, 'the older measured report really has a newer database ID');
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt).id, latestPeriod);
  const comparison = baseline.listComparisons().find(row => row.generationId === saved.id);
  assert.equal(comparison.after.gsc.importId, latestPeriod);
  assert.deepEqual(comparison.changes.clicks, { before: 5, after: 20, change: 15, rate: 3 });
  assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
});

test('legacy and explicitly unverified GSC evidence cannot supply either update comparisons or new observations', () => {
  const update = storedBaseline();
  const created = storedBaseline('new');
  report({ summary: {} });
  report({ summary: { sitewideEligible: false } });
  report({ type: 'gsc_performance_scoped', summary: { sitewideEligible: false } });
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt), null);
  assert.equal(baseline.eligibleObservation('gsc_performance', deployedAt), null);
  for (const comparison of baseline.listComparisons()) {
    assert.equal(comparison.status, 'waiting');
    assert.equal(comparison.after, null);
  }
  const verified = report({ start: '2024-02-02', end: '2024-02-29' });
  const results = baseline.listComparisons();
  assert.equal(results.find(row => row.generationId === update.id).after.gsc.importId, verified);
  assert.equal(results.find(row => row.generationId === created.id).status, 'observed');
  assert.equal(results.find(row => row.generationId === created.id).changes, null);
  assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(created.id).snapshot_json, created.snapshotJson);
});

test('GA4 keeps source and equal-length requirements while choosing by measurement period', () => {
  const latest = report({ type: 'ga4_path_device', importedAt: '2024-04-01T00:00:00Z', summary: {} });
  report({ type: 'ga4_path_device', start: '2024-02-02', end: '2024-02-29', summary: {} });
  report({ type: 'ga4_overview', start: '2024-04-01', end: '2024-04-28', summary: {} });
  report({ type: 'ga4_path_device', start: '2024-05-01', end: '2024-05-07', summary: {} });
  report({ type: 'ga4_path_device', start: '2999-01-01', end: '2999-01-28', summary: {} });
  const base = { ...before.gsc, sourceType: 'ga4_path_device' };
  assert.equal(baseline.eligibleImport(base, ['ga4_path_device', 'ga4_overview'], deployedAt).id, latest);
});

test('same measured period uses the latest imported revision with deterministic ID tie breaking', () => {
  const newerImport = report({ importedAt: '2024-05-01T00:00:00Z' });
  report({ importedAt: '2024-04-01T00:00:00Z' });
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt).id, newerImport);
  assert.equal(baseline.eligibleObservation('gsc_performance', deployedAt).id, newerImport);
  const sameStampLaterId = report({ importedAt: '2024-05-01T00:00:00Z' });
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt).id, sameStampLaterId);
  assert.equal(baseline.eligibleObservation('gsc_performance', deployedAt).id, sameStampLaterId);
});

test('GSC comparisons keep the same verified property and search type, accepting only the root URL alias', () => {
  const saved = storedBaseline();
  report({ summary: { sitewideEligible: true, property: 'sc-domain:noblessegold.com', searchType: 'web' } });
  report({ summary: { sitewideEligible: true, property: 'https://noblessegold.com/', searchType: 'image' } });
  report({ summary: { sitewideEligible: true } });
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt, 'fixture'), null);
  const waiting = baseline.listComparisons().find(row => row.generationId === saved.id);
  assert.equal(waiting.status, 'waiting');
  assert.match(waiting.gscComparisonIssue, /전과 후의 속성·검색 유형/);
  const alias = report({ summary: { sitewideEligible: true, property: 'https://noblessegold.com', searchType: 'web' } });
  const result = baseline.listComparisons().find(row => row.generationId === saved.id);
  assert.equal(result.after.gsc.importId, alias);
  assert.deepEqual(result.after.gsc.sourceScope, { property: 'https://noblessegold.com/', searchType: 'web' });
  assert.equal(result.gscComparisonIssue, null);
});

test('legacy before metrics must match the original aggregate and are never rewritten to make comparison pass', () => {
  report();
  const original = structuredClone(before);
  for (const mismatch of [{ clicks: 999 }, { impressions: 999 }, { ctr: 0.8 }, { position: 1 }, { clicks: null }]) {
    before = { ...original, gsc: { ...original.gsc, ...mismatch } };
    const saved = storedBaseline();
    const comparison = baseline.listComparisons().find(row => row.generationId === saved.id);
    assert.equal(comparison.status, 'waiting');
    assert.equal(comparison.changes, null);
    assert.match(comparison.gscComparisonIssue, /수치.*재집계.*일치하지/);
    assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
  }
});

test('new snapshots bind the original hash, aggregate fingerprint and source scope independently', () => {
  before = baseline.metricSnapshot('fixture', { performance: { id: before.gsc.importId, periodStart: before.gsc.periodStart, periodEnd: before.gsc.periodEnd }, ga4: null });
  const original = structuredClone(before);
  assert.match(before.gsc.metricFingerprint, /^[a-f0-9]{64}$/);
  assert.equal(before.gsc.timeZone, 'America/Los_Angeles');
  assert.equal(before.gsc.timeZoneAssumed, false);
  report();
  for (const mismatch of [{ fileHash: 'different original' }, { sourceScope: { property: 'sc-domain:noblessegold.com', searchType: 'web' } }, { metricFingerprint: '0'.repeat(64) }]) {
    before = { ...original, gsc: { ...original.gsc, ...mismatch } };
    const saved = storedBaseline();
    const comparison = baseline.listComparisons().find(row => row.generationId === saved.id);
    assert.equal(comparison.after, null);
    assert.ok(comparison.gscComparisonIssue);
    assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
  }
});

test('GSC reports wait for Pacific midnight even when Korea has already entered the next day', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-09-13T15:30:00Z') });
  const id = report({ start: '2026-09-07', end: '2026-09-13', importedAt: '2026-09-13T15:00:00Z' });
  const deployed = '2026-09-05T17:55:00Z';
  assert.equal(baseline.eligibleObservation('gsc_performance', deployed), null);
  t.mock.timers.setTime(Date.parse('2026-09-14T06:59:59Z'));
  assert.equal(baseline.eligibleObservation('gsc_performance', deployed), null);
  t.mock.timers.setTime(Date.parse('2026-09-14T07:00:00Z'));
  assert.equal(baseline.eligibleObservation('gsc_performance', deployed).id, id);
});

test('update comparisons also require the last Pacific day to finish and preserve the 28-day contract', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-04T15:30:00Z') });
  before = { gsc: { importId: report({ start: '2026-08-07', end: '2026-09-03', clicks: 5, impressions: 100, position: 7 }),
    periodStart: '2026-08-07', periodEnd: '2026-09-03', periodDays: 28, clicks: 5, impressions: 100, ctr: 0.05, position: 7 }, ga4: null };
  const after = report({ start: '2026-09-07', end: '2026-10-04' });
  const deployed = '2026-09-05T17:55:00Z';
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployed, 'fixture'), null);
  t.mock.timers.setTime(Date.parse('2026-10-05T07:00:00Z'));
  assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployed, 'fixture').id, after);
});

test('Pacific deployment dates and both daylight-saving boundaries select complete days correctly', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-09-14T07:00:00Z') });
  const nextPacificDay = report({ start: '2026-09-06', end: '2026-09-12' });
  assert.equal(baseline.eligibleObservation('gsc_performance', '2026-09-05T17:55:00Z').id, nextPacificDay, 'September 6 is the first full Pacific day after the actual September 5 deployment');
  for (const [deployed, start, end, midnight] of [
    ['2026-03-01T20:00:00Z', '2026-03-02', '2026-03-08', '2026-03-09T07:00:00Z'],
    ['2026-10-25T20:00:00Z', '2026-10-26', '2026-11-01', '2026-11-02T08:00:00Z'],
  ]) {
    db.prepare('DELETE FROM analytics_imports').run();
    const id = report({ start, end });
    t.mock.timers.setTime(Date.parse(midnight) - 1);
    assert.equal(baseline.eligibleObservation('gsc_performance', deployed), null);
    t.mock.timers.setTime(Date.parse(midnight));
    assert.equal(baseline.eligibleObservation('gsc_performance', deployed).id, id);
    assert.equal(baseline.observationReadyAt(deployed, 7, 'America/Los_Angeles'), new Date(midnight).toISOString());
  }
});

test('new observations expose each platform period and the unknown GA4 time-zone assumption separately', () => {
  const saved = storedBaseline('new');
  const gscId = report({ start: '2024-03-22', end: '2024-03-28' });
  const ga4Id = report({ type: 'ga4_overview', start: '2024-03-01', end: '2024-03-28', summary: {} });
  const result = baseline.listComparisons().find(row => row.generationId === saved.id);
  assert.equal(result.status, 'observed');
  assert.equal(result.changes, null);
  assert.deepEqual(result.measurementPeriods.gsc.after, { importId: gscId, sourceType: 'gsc_performance', periodStart: '2024-03-22', periodEnd: '2024-03-28', periodDays: 7, timeZone: 'America/Los_Angeles', timeZoneAssumed: false, property: 'https://noblessegold.com/', searchType: 'web' });
  assert.deepEqual(result.measurementPeriods.ga4.after, { importId: ga4Id, sourceType: 'ga4_overview', periodStart: '2024-03-01', periodEnd: '2024-03-28', periodDays: 28, timeZone: 'Asia/Seoul', timeZoneAssumed: true, property: null, searchType: null });
  assert.match(result.note, /GA4는 시간대 메타가 없어 한국 시간을 가정/);
  assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
});

test('the before reference must itself be a verified GSC import and must not borrow another report trust', () => {
  const saved = storedBaseline();
  report();
  for (const [type, summary] of [['gsc_performance', {}], ['gsc_performance', { sitewideEligible: false }], ['ga4_path_device', { sitewideEligible: true }]]) {
    db.prepare('UPDATE analytics_imports SET source_type=?,summary_json=? WHERE id=?').run(type, JSON.stringify(summary), before.gsc.importId);
    assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt), null);
    const comparison = baseline.listComparisons().find(row => row.generationId === saved.id);
    assert.equal(comparison.after, null);
    assert.equal(comparison.changes, null);
    assert.match(comparison.gscComparisonIssue, /변경 전 기준 자료.*범위/);
    assert.ok(comparison.note.includes(comparison.gscComparisonIssue));
  }
  assert.equal(baseline.eligibleImport({ ...before.gsc, importId: 999999 }, 'gsc_performance', deployedAt), null);
  assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
});

test('a trusted import with a mismatched saved period stays blocked without rewriting its snapshot', () => {
  report();
  const original = structuredClone(before);
  for (const mismatch of [{ periodStart: '2023-12-31' }, { periodEnd: '2024-01-27' }, { periodDays: 27 }]) {
    before = { ...original, gsc: { ...original.gsc, ...mismatch } };
    const saved = storedBaseline();
    assert.equal(baseline.eligibleImport(before.gsc, 'gsc_performance', deployedAt), null);
    const comparison = baseline.listComparisons().find(row => row.generationId === saved.id);
    assert.equal(comparison.after, null);
    assert.match(comparison.gscComparisonIssue, /측정 기간.*일치하지/);
    assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
  }
});

test('explicit re-upload validates the same legacy original and opens update comparison while preserving both snapshots', () => {
  const zip = new AdmZip();
  const daily = Array.from({ length: 28 }, (_, index) => `2024-01-${String(index + 1).padStart(2, '0')},1,10,10%,7`).join('\n');
  for (const [name, csv] of Object.entries({
    '차트.csv': '날짜,클릭수,노출,CTR,게재 순위\n' + daily,
    '검색어 수.csv': '인기 검색어,클릭수,노출,CTR,게재 순위\nfixture,5,100,5%,7',
    '페이지.csv': '인기 페이지,클릭수,노출,CTR,게재 순위\nhttps://noblessegold.com/guide/fixture,5,100,5%,7',
    '필터.csv': '필터,값\n검색 유형,웹\n날짜,2024-01-01 - 2024-01-28',
  })) zip.addFile(name, Buffer.from(csv));
  const buffer = zip.toBuffer();
  const name = 'https___noblessegold.com_-Performance-on-Search-2024-01-29.zip';
  const imported = importBuffer(buffer, name);
  before = baseline.metricSnapshot('fixture', { performance: { id: imported.id, periodStart: '2024-01-01', periodEnd: '2024-01-28' }, ga4: null });
  db.prepare('UPDATE analytics_imports SET summary_json=?,parser_version=? WHERE id=?').run('{}', 'noblesse-analytics-v4', imported.id);
  const update = storedBaseline();
  const created = storedBaseline('new');
  const unchangedBefore = before;
  before = { ...before, gsc: { ...before.gsc, clicks: 999 } };
  const mismatched = storedBaseline();
  before = unchangedBefore;
  const after = report();
  let comparisons = baseline.listComparisons();
  assert.equal(comparisons.find(row => row.generationId === update.id).status, 'waiting');
  const observation = comparisons.find(row => row.generationId === created.id);
  assert.equal(observation.status, 'observed');
  assert.equal(observation.gscComparisonIssue, null);
  assert.equal(observation.after.gsc.importId, after);
  assert.equal(observation.changes, null);
  const revalidated = importBuffer(buffer, name);
  assert.equal(revalidated.id, imported.id);
  assert.equal(revalidated.revalidated, true);
  comparisons = baseline.listComparisons();
  const comparison = comparisons.find(row => row.generationId === update.id);
  assert.equal(comparison.status, 'comparable');
  assert.equal(comparison.gscComparisonIssue, null);
  assert.deepEqual(comparison.changes.clicks, { before: 5, after: 20, change: 15, rate: 3 });
  const stillBlocked = comparisons.find(row => row.generationId === mismatched.id);
  assert.equal(stillBlocked.status, 'waiting', 're-import cannot bless a snapshot with different preserved metrics');
  assert.equal(stillBlocked.changes, null);
  assert.match(stillBlocked.gscComparisonIssue, /수치.*재집계.*일치하지/);
  for (const saved of [update, created, mismatched]) assert.equal(db.prepare('SELECT snapshot_json FROM content_baselines WHERE generation_id=?').get(saved.id).snapshot_json, saved.snapshotJson);
});
