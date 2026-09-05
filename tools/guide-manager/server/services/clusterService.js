const fs = require('fs');
const path = require('path');
const { listClusters, siteRoot, extractObjectBlocks } = require('./inventoryService');
const { semanticSimilarity } = require('./topicService');

function clusterFilePath() {
  return path.join(siteRoot(), 'data', 'guide-clusters.ts');
}

function clusterRepresentative(cluster) {
  return [
    cluster.id, cluster.title, cluster.description, cluster.hubLabel,
    ...(cluster.links || []).flatMap((link) => [link.label, link.description]),
  ].filter(Boolean).join(' ');
}

function proposeCluster(draft, topicDecision = null, clusters = listClusters()) {
  if (!draft || !clusters.length) return null;
  const requestedId = topicDecision?.cluster;
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

module.exports = { clusterFilePath, clusterRepresentative, proposeCluster, patchGuideClusters, buildClusterChange };
