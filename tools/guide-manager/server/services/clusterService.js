const fs = require('fs');
const path = require('path');
const { listClusters, siteRoot, extractObjectBlocks } = require('./inventoryService');
const { semanticSimilarity } = require('./intentService');

function clusterFilePath() {
  return path.join(siteRoot(), 'data', 'guide-clusters.ts');
}

function clusterRepresentative(cluster) {
  return [
    cluster.id, cluster.title, cluster.description, cluster.hubLabel,
    ...(cluster.links || []).flatMap((link) => [link.label, link.description]),
  ].filter(Boolean).join(' ');
}

function clusterError(code, message) {
  return Object.assign(new Error(message), { status: 422, code });
}

function validateClusterSelection(id, clusters = listClusters()) {
  // Older topic decisions used "other" for no selected cluster.
  if (id == null || id === '' || id === 'other') return null;
  const selected = typeof id === 'string' ? clusters.find(cluster => cluster.id === id) : null;
  if (!selected) throw clusterError('INVALID_CLUSTER', '선택한 클러스터가 존재하지 않습니다. 현재 목록에서 다시 선택해 주세요.');
  return selected;
}

function proposeCluster(draft, topicDecision = null, clusters = listClusters()) {
  const requested = validateClusterSelection(topicDecision?.cluster, clusters);
  if (!draft || !clusters.length) return null;
  const requestedId = requested?.id;
  const input = [draft.title, draft.keyword, draft.category, draft.inquiryTopic].filter(Boolean).join(' ');
  const candidates = clusters.map((cluster) => ({
    cluster,
    similarity: requestedId === cluster.id ? 1 : semanticSimilarity(input, clusterRepresentative(cluster)),
  })).sort((a, b) => b.similarity - a.similarity);
  const best = candidates[0];
  if (!best || best.similarity < 0.5) return null;
  return {
    clusterId: best.cluster.id,
    clusterTitle: best.cluster.title,
    similarity: Number(best.similarity.toFixed(3)),
    link: {
      to: `/guide/${draft.slug}`,
      label: draft.title,
      description: String(draft.description || '').split(/[.!?。]/)[0].trim().slice(0, 54) || draft.keyword,
    },
  };
}

const pathOnly = value => String(value || '').split('?')[0].replace(/\/$/, '') || '/';

function pageSource(root, pagePath) {
  const pathname = pathOnly(pagePath);
  if (!/^\/[a-z0-9/-]*$/.test(pathname) || pathname.includes('//')) return '';
  const relative = pathname.slice(1);
  const candidates = relative ? [`${relative}.vue`, `${relative}/index.vue`] : ['index.vue'];
  const file = candidates.map(value => path.join(root, 'pages', value)).find(value => fs.existsSync(value));
  return file ? fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '') : '';
}

function renderedInboundPaths(cluster, draft, clusters, root) {
  const target = pathOnly(`/guide/${draft.slug}`);
  const componentFile = path.join(root, 'components', 'GuideArticleView.vue');
  const component = fs.existsSync(componentFile) ? fs.readFileSync(componentFile, 'utf8').replace(/<!--[\s\S]*?-->/g, '') : '';
  const automaticClusterRenderer = /findGuideClusterForPath\s*\(/.test(component)
    && /<GuideClusterLinks\b[^>]*:cluster-id\s*=\s*["']guideCluster\.id["']/.test(component);
  const escapedId = cluster.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const explicitRenderer = new RegExp(`<GuideClusterLinks\\b[^>]*\\scluster-id\\s*=\\s*["']${escapedId}["']`);
  const candidates = [...new Set([cluster.hubPath, ...(cluster.links || []).map(link => link.to)].filter(Boolean).map(pathOnly))];
  return candidates.filter(candidate => {
    if (candidate === target) return false;
    const source = pageSource(root, candidate);
    if (!source) return false;
    if (explicitRenderer.test(source)) return true;
    // Match the public component's first-cluster rule. A member shadowed by an
    // earlier cluster does not render this cluster's links and is not inbound.
    const effective = clusters.find(item => pathOnly(item.hubPath) === candidate
      || (item.links || []).some(link => pathOnly(link.to) === candidate));
    return effective?.id === cluster.id && automaticClusterRenderer && /<GuideArticleView\b/.test(source);
  });
}

function assertNewGuideConnection(generation, draft, options = {}) {
  if (generation?.kind !== 'new') return null;
  const clusters = options.clusters || listClusters();
  const proposal = proposeCluster(draft, generation.input?.topicDecision, clusters);
  if (!proposal || !draft?.slug) throw clusterError('CLUSTER_REQUIRED', '신규 글로 들어오는 내부 링크가 필요합니다. 현재 목록에서 관련 클러스터를 선택해 주세요.');
  const existing = clusters.find(cluster => (cluster.links || []).some(link => pathOnly(link.to) === proposal.link.to));
  if (existing && existing.id !== proposal.clusterId) throw clusterError('INVALID_CLUSTER', '이 글의 경로가 이미 다른 클러스터에 연결되어 있습니다. 기존 클러스터를 선택해 주세요.');
  const selected = clusters.find(cluster => cluster.id === proposal.clusterId);
  const inboundPaths = renderedInboundPaths(selected, draft, clusters, options.root || siteRoot());
  if (!inboundPaths.length) throw clusterError('CLUSTER_REQUIRED', '선택한 클러스터에 신규 글 링크를 표시할 기존 가이드나 허브가 없습니다. 연결 가능한 다른 클러스터를 선택해 주세요.');
  return { ...proposal, inboundPaths };
}

function quote(value) {
  return `'${String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}'`;
}

function patchGuideClusters(source, proposal) {
  if (!proposal) return source;
  if (new RegExp(`\\bto\\s*:\\s*['\"]${proposal.link.to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]`).test(source)) return source;
  const blocks = extractObjectBlocks(source, 'export const guideClusters');
  const block = blocks.find((item) => new RegExp(`\\bid\\s*:\\s*['\"]${proposal.clusterId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]`).test(item.text));
  if (!block) throw new Error(`클러스터를 찾지 못했습니다: ${proposal.clusterId}`);
  const linksAt = block.text.indexOf('links:');
  const arrayOpen = linksAt >= 0 ? block.text.indexOf('[', linksAt) : -1;
  if (arrayOpen < 0) throw new Error(`클러스터 links 배열을 찾지 못했습니다: ${proposal.clusterId}`);
  let depth = 0;
  let arrayClose = -1;
  let quoteChar = null;
  let escaped = false;
  for (let index = arrayOpen; index < block.text.length; index++) {
    const char = block.text[index];
    if (quoteChar) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quoteChar) quoteChar = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') { quoteChar = char; continue; }
    if (char === '[') depth++;
    if (char === ']' && --depth === 0) { arrayClose = index; break; }
  }
  if (arrayClose < 0) throw new Error(`클러스터 links 배열 끝을 찾지 못했습니다: ${proposal.clusterId}`);
  const absoluteClose = block.start + arrayClose;
  const link = `      { to: ${quote(proposal.link.to)}, label: ${quote(proposal.link.label)}, description: ${quote(proposal.link.description)} },\n`;
  return `${source.slice(0, absoluteClose)}${link}${source.slice(absoluteClose)}`;
}

function buildClusterChange(draft, topicDecision = null) {
  const filePath = clusterFilePath();
  if (!fs.existsSync(filePath)) return null;
  const before = fs.readFileSync(filePath, 'utf8');
  const proposal = proposeCluster(draft, topicDecision);
  if (!proposal) return null;
  const after = patchGuideClusters(before, proposal);
  return after === before ? null : { path: filePath, before, after, proposal };
}

module.exports = { clusterFilePath, clusterRepresentative, validateClusterSelection, proposeCluster, assertNewGuideConnection, patchGuideClusters, buildClusterChange };
