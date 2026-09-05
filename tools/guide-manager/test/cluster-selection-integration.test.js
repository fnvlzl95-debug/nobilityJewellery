const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-cluster-selection-db-'));
const { db } = require('../server/lib/db');
const generations = require('../server/services/generationService');
const applies = require('../server/services/applyService');
const jobs = require('../server/services/jobService');
const { makeDraft } = require('./fixture');

function fixture({ kind = 'new', status = 'draft', cluster = null } = {}) {
  const draft = makeDraft({ slug: 'cluster-selection-fixture', title: 'zzqqxxvv 선택 기준', keyword: 'zzqqxxvv', category: '선택' });
  const sources = draft.sources.map(source => ({ ...source, selected: true }));
  const research = { official: { sources, claims: sources.map(source => ({ claim: '검증 원고의 소재와 처리 기준', sourceUrls: [source.url] })) } };
  const stamp = new Date().toISOString();
  const id = Number(db.prepare(`INSERT INTO generations(kind,topic,status,input_json,draft_json,research_json,approved_at,created_at,updated_at)
    VALUES(?,?,?,?,?,?,?,?,?)`).run(kind, draft.keyword, status, JSON.stringify({ topicDecision: { cluster } }), JSON.stringify(draft), JSON.stringify(research), status === 'approved' ? stamp : null, stamp, stamp).lastInsertRowid);
  return { id, draft };
}

test.after(() => db.close());

test('invalid explicit cluster is rejected before a generation or provider run is created', () => {
  const before = db.prepare('SELECT COUNT(*) AS count FROM generations').get().count;
  assert.throws(() => generations.createGeneration({ topic: 'zzqqvv 생성 전 잘못된 연결 검사', topicDecision: { cluster: 'repira' } }), { status: 422, code: 'INVALID_CLUSTER' });
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM generations').get().count, before);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM model_runs').get().count, 0);
});

test('new article approval and final apply both reject an absent inbound connection before files change', async () => {
  const { id } = fixture({ status: 'approved' });
  const before = db.prepare('SELECT COUNT(*) AS count FROM applies').get().count;
  const state = generations.generationConnection(id);
  assert.equal(state.ready, false);
  assert.equal(state.code, 'CLUSTER_REQUIRED');
  assert.throws(() => generations.approveGeneration(id), { status: 422, code: 'CLUSTER_REQUIRED' });
  await assert.rejects(applies.apply(id), { status: 422, code: 'CLUSTER_REQUIRED' });
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM applies').get().count, before);
  assert.equal(generations.getGeneration(id).status, 'approved');
  db.prepare('DELETE FROM generations WHERE id=?').run(id);
});

test('cluster endpoint preserves the draft, revokes approval, and rejects stale or locked writes', async () => {
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message, code: error.code }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + server.address().port + '/api';
  const token = (await (await fetch(base + '/session')).json()).token;
  const { id } = fixture({ status: 'approved', cluster: 'other' });
  const before = db.prepare('SELECT draft_json,research_json FROM generations WHERE id=?').get(id);
  const request = (clusterId, revision) => fetch(`${base}/generations/${id}/cluster`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token, 'If-Match': String(revision) },
    body: JSON.stringify({ clusterId }),
  });
  try {
    const saved = await request('repair', 0);
    assert.equal(saved.status, 200);
    const value = await saved.json();
    assert.equal(value.input.topicDecision.cluster, 'repair');
    assert.equal(value.status, 'review');
    assert.equal(value.approved_at, null);
    assert.equal(value.revision, 1);
    assert.deepEqual(db.prepare('SELECT draft_json,research_json FROM generations WHERE id=?').get(id), before);
    const connection = await (await fetch(`${base}/generations/${id}/connection`)).json();
    assert.equal(connection.ready, true);
    assert.equal(connection.proposal.clusterId, 'repair');
    assert.ok(connection.proposal.inboundPaths.includes('/repair'));
    const stale = await request('custom', 0);
    assert.equal(stale.status, 409);
    assert.equal((await stale.json()).code, 'STALE_REVISION');
    assert.equal(generations.getGeneration(id).input.topicDecision.cluster, 'repair');
    const release = jobs.acquire(['generation:' + id]);
    try {
      const locked = await request('custom', 1);
      assert.equal(locked.status, 409);
      assert.equal((await locked.json()).code, 'WORK_IN_PROGRESS');
    } finally { release(); }
    const invalid = await request('repira', 1);
    assert.equal(invalid.status, 422);
    assert.equal((await invalid.json()).code, 'INVALID_CLUSTER');
    assert.equal(generations.getGeneration(id).revision, 1);
    db.prepare("UPDATE generations SET status='applied' WHERE id=?").run(id);
    const applied = await request('custom', 1);
    assert.equal(applied.status, 409);
    assert.equal((await applied.json()).code, 'CLUSTER_SELECTION_LOCKED');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    db.prepare('DELETE FROM generations WHERE id=?').run(id);
  }
});

test('existing article work cannot change its cluster through the new-article endpoint', () => {
  const { id } = fixture({ kind: 'update' });
  assert.deepEqual(generations.generationConnection(id), { required: false, ready: true, proposal: null });
  assert.throws(() => generations.selectGenerationCluster(id, 'repair', { expectedRevision: 0 }), { code: 'CLUSTER_SELECTION_LOCKED' });
  db.prepare('DELETE FROM generations WHERE id=?').run(id);
});

test('approval pins a reviewed automatic cluster while retaining a valid approval timestamp', () => {
  const { setSetting } = require('../server/lib/db');
  const { siteRoot } = require('../server/services/inventoryService');
  const originalRoot = siteRoot();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-cluster-auto-approval-'));
  fs.mkdirSync(path.join(root, 'data'), { recursive: true });
  fs.mkdirSync(path.join(root, 'pages/guide'), { recursive: true });
  fs.mkdirSync(path.join(root, 'components'), { recursive: true });
  fs.mkdirSync(path.join(root, 'public/Image/guide'), { recursive: true });
  fs.copyFileSync(path.join(originalRoot, 'components/GuideArticleView.vue'), path.join(root, 'components/GuideArticleView.vue'));
  fs.writeFileSync(path.join(root, 'pages/guide/existing.vue'), '<template><GuideArticleView /></template>');
  const { id } = fixture();
  const draft = generations.getGeneration(id).draft;
  draft.relatedLinks = ['/repair', '/custom', '/wedding'].map(to => ({ to, label: '상담 안내', description: '작업과 상담 기준을 확인합니다.' }));
  const representative = [draft.title, draft.keyword, draft.category, draft.inquiryTopic].join(' ');
  fs.writeFileSync(path.join(root, 'data/guide-clusters.ts'), 'export const guideClusters = ' + JSON.stringify([
    { id: 'fixture-cluster', title: representative, description: representative, hubPath: '/fixture', links: [{ to: '/guide/existing', label: representative }] },
  ]));
  fs.writeFileSync(path.join(root, 'public', draft.heroImage.path.slice(1)), 'fixture-image');
  db.prepare('UPDATE generations SET draft_json=? WHERE id=?').run(JSON.stringify(draft), id);
  setSetting('site_root', root);
  try {
    assert.equal(generations.generationConnection(id).proposal.clusterId, 'fixture-cluster');
    assert.equal(generations.getGeneration(id).input.topicDecision.cluster, null);
    const approved = generations.approveGeneration(id);
    assert.equal(approved.input.topicDecision.cluster, 'fixture-cluster');
    assert.equal(approved.status, 'approved');
    assert.ok(approved.approved_at);
    assert.deepEqual(approved.draft, draft);
  } finally {
    setSetting('site_root', originalRoot);
    db.prepare('DELETE FROM generations WHERE id=?').run(id);
  }
});
