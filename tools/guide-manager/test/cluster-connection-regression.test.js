const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-cluster-connection-db-'));
const { db } = require('../server/lib/db');
const { listClusters, siteRoot } = require('../server/services/inventoryService');
const { validateClusterSelection, proposeCluster, assertNewGuideConnection, patchGuideClusters } = require('../server/services/clusterService');
const articleComponent = fs.readFileSync(path.join(siteRoot(), 'components/GuideArticleView.vue'), 'utf8');
let root;
test.beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-cluster-connection-site-'));
  fs.mkdirSync(path.join(root, 'components'), { recursive: true });
  fs.writeFileSync(path.join(root, 'components/GuideArticleView.vue'), articleComponent);
});
test.after(() => db.close());

const draft = { slug: 'new-guide', title: '보석 특성 비교', keyword: '보석 특성 비교', description: '보석의 특성을 비교합니다.' };
const group = (overrides = {}) => ({ id: 'gemstone', title: '보석 특성 비교', hubPath: '/gemstones', links: [{ to: '/guide/existing', label: '보석 특성 비교' }], ...overrides });
const generation = cluster => ({ kind: 'new', input: { topicDecision: { cluster } } });
const rejected = code => error => error.status === 422 && error.code === code;
function page(route, source = '<template><GuideArticleView /></template>') {
  const target = path.join(root, 'pages', `${route.replace(/^\//, '')}.vue`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, source);
}

test('explicit invalid cluster values cannot silently become a different automatic selection', () => {
  const clusters = [group()];
  for (const value of ['gemstnoe', '../gemstone', 1, {}, []]) {
    assert.throws(() => validateClusterSelection(value, clusters), rejected('INVALID_CLUSTER'));
    assert.throws(() => proposeCluster(draft, { cluster: value }, clusters), rejected('INVALID_CLUSTER'));
  }
  for (const value of [undefined, null, '', 'other']) assert.equal(validateClusterSelection(value, clusters), null);
  assert.equal(validateClusterSelection('gemstone', clusters), clusters[0]);
});

test('a selected cluster returns existing pages that really render its inbound links', () => {
  page('/guide/existing');
  const result = assertNewGuideConnection(generation('gemstone'), draft, { clusters: [group()], root });
  assert.equal(result.clusterId, 'gemstone');
  assert.deepEqual(result.inboundPaths, ['/guide/existing']);
  assert.equal(result.link.to, '/guide/new-guide');
});

test('missing pages, self-only membership, and non-rendering pages cannot pass as inbound support', () => {
  assert.throws(() => assertNewGuideConnection(generation('gemstone'), draft, { clusters: [group()], root }), rejected('CLUSTER_REQUIRED'));
  page('/guide/existing', '<template><article>정적 본문</article></template>');
  assert.throws(() => assertNewGuideConnection(generation('gemstone'), draft, { clusters: [group()], root }), rejected('CLUSTER_REQUIRED'));
  page('/guide/new-guide');
  assert.throws(() => assertNewGuideConnection(generation('gemstone'), draft, { clusters: [group({ links: [{ to: '/guide/new-guide' }] })], root }), rejected('CLUSTER_REQUIRED'));
});

test('a real hub with the exact cluster renderer supports a new guide even without existing members', () => {
  const clusters = [group({ links: [] })];
  page('/gemstones', '<template><GuideClusterLinks cluster-id="repair" /></template>');
  assert.throws(() => assertNewGuideConnection(generation('gemstone'), draft, { clusters, root }), rejected('CLUSTER_REQUIRED'));
  page('/gemstones', '<template><GuideClusterLinks cluster-id="gemstone" /></template>');
  assert.deepEqual(assertNewGuideConnection(generation('gemstone'), draft, { clusters, root }).inboundPaths, ['/gemstones']);
});

test('members shadowed by an earlier cluster do not claim inbound links for a later cluster', () => {
  page('/guide/existing');
  const clusters = [group({ id: 'earlier' }), group({ id: 'later', hubPath: '/later' })];
  assert.throws(() => assertNewGuideConnection(generation('later'), draft, { clusters, root }), rejected('CLUSTER_REQUIRED'));
  assert.deepEqual(assertNewGuideConnection(generation('earlier'), draft, { clusters, root }).inboundPaths, ['/guide/existing']);
});

test('pre-registered target membership cannot be overridden while the duplicate patch remains a no-op', () => {
  page('/guide/existing');
  const clusters = [group({ id: 'earlier', links: [{ to: '/guide/new-guide' }, { to: '/guide/existing' }] }), group({ id: 'later' })];
  assert.throws(() => assertNewGuideConnection(generation('later'), draft, { clusters, root }), rejected('INVALID_CLUSTER'));
  const source = "export const guideClusters = [{ id: 'earlier', links: [{ to: '/guide/new-guide', label: '기존 글' }] }]";
  assert.equal(patchGuideClusters(source, proposeCluster(draft, { cluster: 'later' }, clusters)), source);
});

test('automatic confident matches still require rendered inbound support and legacy other remains unselected', () => {
  const clusters = [group()];
  page('/guide/existing');
  const automatic = assertNewGuideConnection(generation('other'), draft, { clusters, root });
  assert.equal(automatic.clusterId, 'gemstone');
  assert.ok(automatic.similarity >= 0.5);
  assert.throws(() => assertNewGuideConnection(generation(null), { slug: 'unknown', title: 'zzqqxx' }, { clusters, root }), rejected('CLUSTER_REQUIRED'));
  assert.equal(assertNewGuideConnection({ kind: 'update', input: { topicDecision: { cluster: 'invalid' } } }, draft), null);
});

test('every currently selectable repository cluster has actual rendered inbound support', () => {
  const clusters = listClusters();
  assert.ok(clusters.length > 0);
  for (const cluster of clusters) {
    const result = assertNewGuideConnection(generation(cluster.id), { ...draft, slug: 'cluster-connection-regression-fixture' });
    assert.equal(result.clusterId, cluster.id);
    assert.ok(result.inboundPaths.length > 0, `${cluster.id} has no rendered inbound support`);
  }
});
