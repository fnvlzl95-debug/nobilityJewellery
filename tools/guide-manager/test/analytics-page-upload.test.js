const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const AdmZip = require('adm-zip');

// The actual multipart route runs against a process-owned empty DB and loopback
// server. Operator data, credentials, and external providers are never used.
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-analytics-page-upload-'));
const { db } = require('../server/lib/db');
const { config } = require('../server/lib/config');
const analytics = require('../server/services/analyticsService');
const PAGE = 'https://noblessegold.com/guide/upload-necklace-length';
const PERIOD = { periodStart: '2024-01-01', periodEnd: '2024-01-02' };
const FILE_NAME = 'https___noblessegold.com_-Performance-on-Search-2024-01-05.zip';
const confirmation = () => ({ pageUrl: PAGE, exactMatch: true, ...PERIOD, completeExport: true });
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const csv = rows => rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');

function rawExport({ sitewide = false } = {}) {
  const zip = new AdmZip();
  const entries = {
    '필터.csv': csv([['필터', '값'], ['검색 유형', '웹'], ['날짜', `${PERIOD.periodStart} - ${PERIOD.periodEnd}`], ...(!sitewide ? [['페이지', PAGE]] : [])]),
    '차트.csv': csv([['날짜', '클릭수', '노출', 'CTR', '게재 순위'], [PERIOD.periodStart, 1, 10, '10%', 4], [PERIOD.periodEnd, 2, 20, '10%', 5]]),
    '페이지.csv': csv([['인기 페이지', '클릭수', '노출', 'CTR', '게재 순위'], [PAGE, 3, 30, '10%', 4.5]]),
    '검색어 수.csv': csv([['인기 검색어', '클릭수', '노출', 'CTR', '게재 순위'], ['목걸이 길이', 2, 20, '10%', 4]]),
  };
  // Official raw exports have no application manifest. The operator's verified
  // filter confirmation must remain separate from these original bytes.
  for (const [name, text] of Object.entries(entries)) zip.addFile(name, Buffer.from(text));
  return zip.toBuffer();
}

let server, base, token;
let externalRequests = 0;
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
  const response = await fetch(`${base}/session`);
  assert.equal(response.status, 200);
  token = (await response.json()).token;
});
test.beforeEach(() => db.prepare('DELETE FROM analytics_imports').run());
test.after(async () => {
  global.fetch = originalFetch;
  if (server) {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
  db.close();
  assert.equal(externalRequests, 0);
});

async function upload(buffer, { confirmationText, fileName = FILE_NAME } = {}) {
  const form = new FormData();
  form.append('file', new Blob([buffer], { type: /\.zip$/i.test(fileName) ? 'application/zip' : 'text/csv' }), fileName);
  if (confirmationText !== undefined) form.append('pageQueryConfirmation', confirmationText);
  const response = await fetch(`${base}/analytics/import`, { method: 'POST', headers: { 'X-Guide-Manager-Token': token }, body: form });
  return { status: response.status, body: await response.json() };
}

function storedFiles() { return fs.readdirSync(path.join(config.dataDir, 'imports')).sort(); }
function rowCounts() {
  return Object.fromEntries(['analytics_imports', 'gsc_daily', 'gsc_queries', 'gsc_pages'].map(table => [table, db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n]));
}

test('multipart raw official ZIP plus confirmation supplies exact-page evidence while preserving original bytes and hash', async () => {
  const buffer = rawExport();
  const result = await upload(buffer, { confirmationText: JSON.stringify(confirmation()) });
  assert.equal(result.status, 200, result.body.error);
  assert.equal(result.body.sourceType, 'gsc_performance_scoped');
  assert.equal(result.body.summary.sitewideEligible, false);
  assert.equal(result.body.summary.pageQueryEligible, true);
  assert.equal(result.body.summary.pageQueryScope.filterEvidence, 'operator-confirmation-and-export-filters');
  assert.equal(result.body.summary.operatorConfirmation.source, 'operator-upload-confirmation');
  assert.deepEqual(result.body.summary.manifest, {});
  assert.equal(result.body.summary.queryImpressions, 20);
  assert.equal(result.body.summary.impressions, 30);
  const row = db.prepare('SELECT file_hash AS fileHash, raw_path AS rawPath FROM analytics_imports WHERE id=?').get(result.body.id);
  assert.equal(row.fileHash, hash(buffer));
  assert.deepEqual(fs.readFileSync(row.rawPath), buffer);
  assert.equal(new AdmZip(fs.readFileSync(row.rawPath)).getEntry('manifest.csv'), null);
  const performance = { id: 999, ...PERIOD, summary: { sitewideEligible: true, property: 'https://noblessegold.com/', searchType: 'web' } };
  assert.equal(analytics.selectPageQueryEvidence(PAGE, performance).importId, result.body.id);
});

test('malformed JSON, wrong page or period, and unchecked confirmations return 422 without DB rows or raw-file copies', async () => {
  const buffer = rawExport();
  const invalid = [
    '{', '', 'null', 'false', '[]',
    JSON.stringify({ ...confirmation(), pageUrl: `${PAGE}/` }),
    JSON.stringify({ ...confirmation(), pageUrl: 'https://example.com/guide/upload-necklace-length' }),
    JSON.stringify({ ...confirmation(), periodStart: '2024-01-02' }),
    JSON.stringify({ ...confirmation(), periodEnd: '2024-01-03' }),
    JSON.stringify({ ...confirmation(), periodEnd: '2024-02-30' }),
    JSON.stringify({ ...confirmation(), exactMatch: false }),
    JSON.stringify({ ...confirmation(), completeExport: false }),
    JSON.stringify({ ...confirmation(), exactMatch: 'true' }),
  ];
  const files = storedFiles();
  for (const confirmationText of invalid) {
    const result = await upload(buffer, { confirmationText });
    assert.equal(result.status, 422, `${confirmationText}: ${JSON.stringify(result.body)}`);
    assert.deepEqual(rowCounts(), { analytics_imports: 0, gsc_daily: 0, gsc_queries: 0, gsc_pages: 0 });
    assert.deepEqual(storedFiles(), files);
  }
});

test('ordinary multipart uploads without confirmation preserve sitewide ZIP and CSV import behavior', async () => {
  const result = await upload(rawExport({ sitewide: true }));
  assert.equal(result.status, 200, result.body.error);
  assert.equal(result.body.sourceType, 'gsc_performance');
  assert.equal(result.body.summary.sitewideEligible, true);
  assert.equal(result.body.summary.operatorConfirmation ?? null, null);
  const buffer = fs.readFileSync(path.join(__dirname, 'fixtures/gsc-indexing-2026-08-21.csv'));
  const indexed = await upload(buffer, { fileName: 'gsc-indexing.csv' });
  assert.equal(indexed.status, 200, indexed.body.error);
  assert.equal(indexed.body.sourceType, 'gsc_coverage');
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM analytics_imports').get().n, 2);
});

test('confirming an already uploaded raw ZIP upgrades the same import and repeated multipart confirmations do not duplicate data', async () => {
  const buffer = rawExport();
  const first = await upload(buffer);
  assert.equal(first.status, 200, first.body.error);
  assert.equal(first.body.summary.pageQueryEligible, false);
  const original = db.prepare('SELECT raw_path AS rawPath, file_hash AS fileHash FROM analytics_imports WHERE id=?').get(first.body.id);
  const next = await upload(buffer, { confirmationText: JSON.stringify(confirmation()) });
  assert.equal(next.status, 200, next.body.error);
  assert.equal(next.body.id, first.body.id);
  assert.equal(next.body.duplicate, true);
  assert.equal(next.body.summary.pageQueryEligible, true);
  assert.ok(Number.isFinite(Date.parse(next.body.summary.operatorConfirmation.confirmedAt)));
  const again = await upload(buffer, { confirmationText: JSON.stringify(confirmation()) });
  assert.equal(again.status, 200, again.body.error);
  assert.equal(again.body.id, first.body.id);
  assert.equal(again.body.duplicate, true);
  assert.ok(Number.isFinite(Date.parse(again.body.summary.operatorConfirmation.confirmedAt)));
  const withoutForm = await upload(buffer);
  assert.equal(withoutForm.status, 200, withoutForm.body.error);
  assert.equal(withoutForm.body.id, first.body.id);
  assert.equal(withoutForm.body.summary.pageQueryEligible, true);
  assert.equal(withoutForm.body.summary.operatorConfirmation.confirmedAt, again.body.summary.operatorConfirmation.confirmedAt);
  assert.deepEqual(rowCounts(), { analytics_imports: 1, gsc_daily: 2, gsc_queries: 1, gsc_pages: 1 });
  assert.deepEqual(db.prepare('SELECT raw_path AS rawPath, file_hash AS fileHash FROM analytics_imports WHERE id=?').get(first.body.id), original);
  assert.equal(original.fileHash, hash(buffer));
  assert.deepEqual(fs.readFileSync(original.rawPath), buffer);
});
