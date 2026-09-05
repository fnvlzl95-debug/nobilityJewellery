const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-source-review-'));
const { db } = require('../server/lib/db');
const generations = require('../server/services/generationService');
const applies = require('../server/services/applyService');
const { makeDraft } = require('./fixture');
test.after(() => db.close());

let sequence = 0;
function fixture(t) {
  const unique = `source-review-${++sequence}`;
  let generation = generations.createGeneration({ topic: unique, sourceReviewVersion: 0 });
  const draft = makeDraft({ slug: unique, keyword: unique, title: `검토 회귀 ${unique}` });
  const evidence = { official: { sources: draft.sources.map(source => ({ ...source, selected: false, reason: '제작·마감 교육의 적용 범위' })), claims: [{ claim: '제작과 마감 공정의 적용 범위를 확인합니다.', sourceUrls: draft.sources.map(source => source.url), confidence: 'high' }] } };
  generation = generations.updateGeneration(generation.id, { research_json: JSON.stringify(evidence), draft_json: JSON.stringify(draft) });
  t.after(() => db.prepare('DELETE FROM generations WHERE id=?').run(generation.id));
  return { generation, draft, url: draft.sources[0].url };
}
function review(generation, url) {
  return { url, fingerprint: generation.sourceReviewContexts.find(item => item.url === url).fingerprint, location: 'GIA Jewelry Manufacturing Arts · 과정 설명 문단', note: '제작·마감 교육 범위를 확인했으며 특정 제품의 가격이나 기간을 보증하는 자료로 사용하지 않습니다.', confirmed: true };
}

test('new work gets a server review policy and manual selection requires the current document review', t => {
  const { generation, url } = fixture(t);
  assert.equal(generation.input.sourceReviewVersion, 1);
  assert.throws(() => generations.selectSources(generation.id, [url]), { code: 'SOURCE_REVIEW_REQUIRED' });
  assert.throws(() => generations.selectSources(generation.id, [url], { sourceReviews: [{ ...review(generation, url), location: '', note: '' }] }), { code: 'SOURCE_REVIEW_REQUIRED' });
  assert.equal(generations.getGeneration(generation.id).revision, generation.revision);
  const selected = generations.selectSources(generation.id, [url], { sourceReviews: [review(generation, url)] });
  assert.equal(selected.sourceReviewContexts[0].status, 'operator_reviewed');
  assert.ok(selected.research.sourceReviews[0].reviewedAt);
  assert.equal(selected.research.sourceReviews[0].location, review(generation, url).location);
});

test('automatic research can prepare a draft but cannot approve or apply it as an operator review', async t => {
  const { generation, draft, url } = fixture(t);
  const selected = generations.selectSources(generation.id, [url], { selectionMode: 'automatic' });
  assert.equal(selected.sourceReviewContexts[0].status, 'automatic_research');
  assert.equal(selected.research.sourceReviews[0].reviewedAt, undefined);
  const output = await generations.executeWriterPolicy({ generation: selected, write: async () => draft, inspect: () => ({ blocking: false, score: 100, findings: [] }) });
  assert.equal(output.draft.title, draft.title);
  assert.throws(() => generations.approveGeneration(generation.id), { code: 'SOURCE_REVIEW_REQUIRED' });
  db.prepare("UPDATE generations SET status='approved', approved_at=? WHERE id=?").run(new Date().toISOString(), generation.id);
  await assert.rejects(applies.apply(generation.id), { code: 'SOURCE_REVIEW_REQUIRED' });
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM applies WHERE generation_id=?').get(generation.id).n, 0);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM model_runs').get().n, 0);
  const reviewed = generations.selectSources(generation.id, [url], { sourceReviews: [review(selected, url)] });
  assert.equal(reviewed.approved_at, null);
  assert.equal(generations.assertSelectedEvidence(reviewed, draft, { requireOperatorReview: true }).checked, true);
});

test('changing a claim or source detail invalidates prior review before writing, saving or approving', async t => {
  const { generation, draft, url } = fixture(t);
  const originalReview = review(generation, url);
  let current = generations.selectSources(generation.id, [url], { sourceReviews: [originalReview] });
  const changed = structuredClone(current.research);
  changed.official.claims[0].claim = '이 문서는 모든 제품의 제작 기간을 보증한다고 변경한 주장';
  current = generations.updateGeneration(generation.id, { research_json: JSON.stringify(changed) });
  assert.equal(current.sourceReviewContexts[0].status, 'review_expired');
  assert.throws(() => generations.selectSources(generation.id, [url], { sourceReviews: [originalReview] }), { code: 'SOURCE_REVIEW_REQUIRED' });
  let providerRequests = 0;
  const originalFetch = global.fetch;
  global.fetch = async () => { providerRequests++; throw new Error('external requests must not run'); };
  try { await assert.rejects(generations.generateDraft(current.id), { code: 'SOURCE_REVIEW_REQUIRED' }); }
  finally { global.fetch = originalFetch; }
  assert.equal(providerRequests, 0);
  assert.throws(() => generations.saveDraft(current.id, draft), { code: 'SOURCE_REVIEW_REQUIRED' });
  assert.throws(() => generations.approveGeneration(current.id), { code: 'SOURCE_REVIEW_REQUIRED' });
  current = generations.selectSources(current.id, [url], { sourceReviews: [review(current, url)] });
  const changedSource = structuredClone(current.research);
  changedSource.official.sources[0].reason = '문서 설명 변경';
  current = generations.updateGeneration(current.id, { research_json: JSON.stringify(changedSource) });
  assert.equal(current.sourceReviewContexts[0].status, 'review_expired');
});

test('published legacy work is not rewritten or falsely marked as reviewed', t => {
  const { generation, url } = fixture(t);
  const legacy = { ...generation.input }; delete legacy.sourceReviewVersion;
  db.prepare("UPDATE generations SET input_json=?, status='applied' WHERE id=?").run(JSON.stringify(legacy), generation.id);
  const before = db.prepare('SELECT * FROM generations WHERE id=?').get(generation.id);
  assert.equal(generations.getGeneration(generation.id).sourceReviewContexts[0].status, 'unreviewed');
  assert.throws(() => generations.selectSources(generation.id, [url], { sourceReviews: [review(generation, url)] }), { code: 'SOURCE_REVIEW_LOCKED' });
  assert.deepEqual(db.prepare('SELECT * FROM generations WHERE id=?').get(generation.id), before);
});

test('sources HTTP cannot forge automatic review, accepts a real review and rejects stale revisions', async t => {
  const { generation, url } = fixture(t);
  const express = require('express');
  const app = express(); app.use(express.json()); app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ code: error.code, error: error.message }));
  const server = app.listen(0, '127.0.0.1');
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  await new Promise(resolve => server.once('listening', resolve));
  const send = body => fetch(`http://127.0.0.1:${server.address().port}/api/generations/${generation.id}/sources`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'If-Match': String(generation.revision) }, body: JSON.stringify(body) });
  let response = await send({ selectedUrls: [url], selectionMode: 'automatic' });
  assert.equal(response.status, 422); assert.equal((await response.json()).code, 'SOURCE_REVIEW_REQUIRED');
  response = await send({ selectedUrls: [url], sourceReviews: [review(generation, url)] });
  assert.equal(response.status, 200); assert.equal((await response.json()).sourceReviewContexts[0].status, 'operator_reviewed');
  response = await send({ selectedUrls: [url], sourceReviews: [review(generation, url)] });
  assert.equal(response.status, 409); assert.equal((await response.json()).code, 'STALE_REVISION');
});

test('the real source review UI exposes the document, exact claims, limits and operator fields', () => {
  const { transformSync } = require('esbuild');
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const file = path.resolve(__dirname, '../client/src/Editor.jsx');
  const compiled = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
  const loaded = new Module(file, module); loaded.filename = file; loaded.paths = Module._nodeModulePaths(path.dirname(file));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = id => id === './api' ? { api: {} } : id === './ui' ? { Spinner: () => null } : originalRequire(id);
  loaded._compile(compiled + '\nmodule.exports.SourceReviewTab = SourcesTab;', file);
  const source = { label: 'GIA 문서', url: 'https://www.gia.edu/document', official: true };
  const claim = { claim: '초음파 세척은 사용할 수 없습니다.', sourceUrls: [source.url], confidence: 'high' };
  const html = renderToStaticMarkup(React.createElement(loaded.exports.SourceReviewTab, { rows: [source], claims: [claim], contexts: [{ url: source.url, fingerprint: 'abc', status: 'automatic_research' }], reviews: {}, selected: [source.url], setSelected() {}, setReviews() {}, onSave() {}, onResearch() {} }));
  assert.match(html, /href="https:\/\/www.gia.edu\/document"/);
  assert.match(html, /초음파 세척은 사용할 수 없습니다/);
  assert.match(html, /자동 조사 선택 · 운영자 문서 대조 전/);
  assert.match(html, /문서 내 확인 위치/); assert.match(html, /주장과 대조한 메모/);
  assert.match(html, /모델의 확신도는 사실 검증을 대신하지 않습니다/);
});
