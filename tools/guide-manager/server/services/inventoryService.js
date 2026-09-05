const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { db, getSetting } = require('../lib/db');
const { config } = require('../lib/config');
const { fileHash, nowIso, koreaDate } = require('../lib/utils');
const { gitExecutable } = require('../lib/executables');
const { parseLiteral } = require('./contentExtractorService');

const PROTECTED_SLUGS = new Set(['gold-one-don-gram', 'platinum-vs-white-gold-difference']);

function siteRoot() {
  return path.resolve(getSetting('site_root', config.siteRoot));
}

function decodeSingleQuoted(value) {
  return String(value || '').replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
}

function field(block, name) {
  const value = parseLiteral(block, {})[name];
  return typeof value === 'string' ? value : '';
}

function extractObjectBlocks(source, marker = 'export const guidePosts') {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error('guidePosts 배열을 찾지 못했습니다');
  // TypeScript 선언의 `GuidePostSummary[]`가 아니라 대입식 우측 배열을 찾는다.
  const assignmentIndex = source.indexOf('=', markerIndex + marker.length);
  const arrayStart = assignmentIndex >= 0 ? source.indexOf('[', assignmentIndex + 1) : -1;
  if (arrayStart < 0) throw new Error('guidePosts 배열 시작을 찾지 못했습니다');
  const blocks = [];
  let depth = 0;
  let start = -1;
  let quote = null;
  let escaped = false;
  for (let i = arrayStart + 1; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue; }
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        blocks.push({ start, end: i + 1, text: source.slice(start, i + 1) });
        start = -1;
      }
    } else if (ch === ']' && depth === 0) break;
  }
  return blocks;
}

function parseGuidePosts(source) {
  return extractObjectBlocks(source).map(({ text }) => ({
    slug: field(text, 'slug'),
    path: field(text, 'path'),
    title: field(text, 'title'),
    description: field(text, 'description'),
    keyword: field(text, 'keyword'),
    image: field(text, 'image'),
    publishedAt: field(text, 'publishedAt'),
    updatedAt: field(text, 'updatedAt'),
    category: field(text, 'category'),
    block: text,
  })).filter((row) => row.slug && row.path);
}

function pageMeta(source) {
  const getConst = (name) => {
    const match = source.match(new RegExp(`const\\s+${name}\\s*=\\s*'((?:\\\\.|[^'])*)'`));
    return match ? decodeSingleQuoted(match[1]) : '';
  };
  return {
    pageTitle: getConst('pageTitle'),
    pageDescription: getConst('pageDescription'),
    publishedAt: getConst('publishedAt'),
    updatedAt: getConst('updatedAt'),
  };
}

function gitLines(root, args) {
  try {
    return execFileSync(gitExecutable(), args, {
      cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024,
    }).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch (_) {
    return [];
  }
}

function repositoryChangeDates(root = siteRoot()) {
  const dates = new Map();
  let commitDate = null;
  for (const line of gitLines(root, ['log', '--format=@@%cs', '--name-only', '--diff-filter=ACMRT', '--', 'pages/guide'])) {
    if (line.startsWith('@@')) {
      commitDate = line.slice(2, 12);
      continue;
    }
    if (!commitDate || !/^pages\/guide\/.+\.vue$/i.test(line)) continue;
    const absolute = path.resolve(root, line).toLowerCase();
    if (!dates.has(absolute)) dates.set(absolute, commitDate);
  }
  const dirty = new Set([
    ...gitLines(root, ['diff', '--name-only', '--', 'pages/guide']),
    ...gitLines(root, ['diff', '--cached', '--name-only', '--', 'pages/guide']),
    ...gitLines(root, ['ls-files', '--others', '--exclude-standard', '--', 'pages/guide']),
  ]);
  for (const relative of dirty) {
    if (/^pages\/guide\/.+\.vue$/i.test(relative)) dates.set(path.resolve(root, relative).toLowerCase(), koreaDate());
  }
  return dates;
}

function scanInventory() {
  const root = siteRoot();
  const indexPath = path.join(root, 'data', 'guide-posts.ts');
  if (!fs.existsSync(indexPath)) throw new Error(`귀족 가이드 목록을 찾을 수 없습니다: ${indexPath}`);
  const indexSource = fs.readFileSync(indexPath, 'utf8');
  const posts = parseGuidePosts(indexSource);
  if (!posts.length || new Set(posts.map(post => post.slug)).size !== posts.length) throw new Error('가이드 목록이 비어 있거나 slug가 중복됐습니다. 기존 인벤토리를 유지합니다');
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || post.path !== '/guide/' + post.slug || !post.title || !fs.existsSync(path.join(root, 'pages', 'guide', post.slug + '.vue'))) throw new Error('목록과 페이지 원본이 일치하지 않습니다: ' + post.slug);
  }
  const repositoryDates = repositoryChangeDates(root);
  const scannedAt = nowIso();
  const upsert = db.prepare(`
    INSERT INTO guides (slug, path, title, page_title, description, keyword, image, category, published_at, updated_at, repository_changed_at, source_path, source_hash, is_custom, source_json, scanned_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET path=excluded.path, title=excluded.title, page_title=excluded.page_title,
      description=excluded.description, keyword=excluded.keyword, image=excluded.image, category=excluded.category,
      published_at=excluded.published_at, updated_at=excluded.updated_at, repository_changed_at=excluded.repository_changed_at, source_path=excluded.source_path,
      source_hash=excluded.source_hash, is_custom=excluded.is_custom, source_json=excluded.source_json, scanned_at=excluded.scanned_at
  `);
  const touchFile = db.prepare(`
    INSERT INTO file_states (file_path, observed_hash, observed_at) VALUES (?, ?, ?)
    ON CONFLICT(file_path) DO UPDATE SET observed_hash=excluded.observed_hash, observed_at=excluded.observed_at
  `);
  const seen = [];
  const transaction = db.transaction(() => {
    for (const post of posts) {
      const sourcePath = path.join(root, 'pages', 'guide', `${post.slug}.vue`);
      const source = fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, 'utf8') : '';
      const meta = pageMeta(source);
      const isCustom = PROTECTED_SLUGS.has(post.slug) || /#hero-summary|GoldWeightCalculator/.test(source);
      const hash = fileHash(sourcePath);
      const repositoryChangedAt = repositoryDates.get(sourcePath.toLowerCase()) || null;
      upsert.run(
        post.slug, post.path, post.title, meta.pageTitle || `${post.title} | 귀족`, post.description, post.keyword,
        post.image, post.category, post.publishedAt, post.updatedAt || null, repositoryChangedAt, sourcePath, hash, isCustom ? 1 : 0,
        JSON.stringify({ ...post, block: undefined }), scannedAt,
      );
      touchFile.run(sourcePath, hash, scannedAt);
      db.prepare(`
        INSERT INTO rank_keywords (guide_slug, keyword, created_at) VALUES (?, ?, ?)
        ON CONFLICT(guide_slug, keyword) DO NOTHING
      `).run(post.slug, post.keyword, scannedAt);
      seen.push(post.slug);
    }
    touchFile.run(indexPath, fileHash(indexPath), scannedAt);
    if (seen.length) {
      const placeholders = seen.map(() => '?').join(',');
      db.prepare(`DELETE FROM guides WHERE slug NOT IN (${placeholders})`).run(...seen);
    }
  });
  transaction();
  const clusters = listClusters();
  return { total: posts.length, standard: posts.length - posts.filter((p) => PROTECTED_SLUGS.has(p.slug)).length, custom: posts.filter((p) => PROTECTED_SLUGS.has(p.slug)).length, clusters: clusters.length, indexHash: fileHash(indexPath), root, scannedAt };
}

function listClusters() {
  const filePath = path.join(siteRoot(), 'data', 'guide-clusters.ts');
  if (!fs.existsSync(filePath)) return [];
  const source = fs.readFileSync(filePath, 'utf8');
  return extractObjectBlocks(source, 'export const guideClusters').map(({ text }) => {
    const parsed = parseLiteral(text, {});
    const links = Array.isArray(parsed.links) ? parsed.links.map((link) => ({
      to: String(link?.to || ''), label: String(link?.label || ''), description: String(link?.description || ''),
    })).filter((link) => link.to) : [];
    return {
      id: field(text, 'id'),
      title: field(text, 'title'),
      description: field(text, 'description'),
      hubPath: field(text, 'hubPath'),
      hubLabel: field(text, 'hubLabel'),
      links,
      linkCount: links.length,
    };
  }).filter((cluster) => cluster.id && cluster.title);
}

function listGuides() {
  return db.prepare(`
    SELECT slug, path, title, page_title AS pageTitle, description, keyword, image, category,
      published_at AS publishedAt, updated_at AS updatedAt, repository_changed_at AS repositoryChangedAt,
      source_hash AS sourceHash, is_custom AS isCustom
    FROM guides ORDER BY published_at DESC, slug
  `).all().map((row) => ({ ...row, isCustom: !!row.isCustom }));
}

function getGuide(slug, { includeSource = false } = {}) {
  const row = db.prepare(`
    SELECT slug, path, title, page_title AS pageTitle, description, keyword, image, category,
      published_at AS publishedAt, updated_at AS updatedAt, repository_changed_at AS repositoryChangedAt, source_path AS sourcePath,
      source_hash AS sourceHash, is_custom AS isCustom, source_json AS sourceJson
    FROM guides WHERE slug = ?
  `).get(slug);
  if (!row) return null;
  row.isCustom = !!row.isCustom;
  row.sourceJson = JSON.parse(row.sourceJson || '{}');
  if (includeSource) row.source = fs.existsSync(row.sourcePath) ? fs.readFileSync(row.sourcePath, 'utf8') : '';
  return row;
}

function guideIndexPath() {
  return path.join(siteRoot(), 'data', 'guide-posts.ts');
}

module.exports = { PROTECTED_SLUGS, siteRoot, scanInventory, listGuides, listClusters, getGuide, guideIndexPath, parseGuidePosts, extractObjectBlocks, pageMeta, repositoryChangeDates };
