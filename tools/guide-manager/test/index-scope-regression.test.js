const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { diffLines } = require('diff');
const repo = path.resolve(__dirname, '../../..');
const site = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-index-scope-site-'));
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-index-scope-db-'));
process.env.SITE_ROOT = site;
const { db } = require('../server/lib/db');
const { patchGuideIndex, renderGuideSummary } = require('../server/services/rendererService');
const { parseGuidePosts } = require('../server/services/inventoryService');
const { constExpression } = require('../server/services/contentExtractorService');
const { buildDesiredFiles } = require('../server/services/applyService');
const { makeDraft } = require('./fixture');
test.after(() => db.close());
const policy = fields => ({ scope: { fields, preserveImages: true, preserveHero: true } });

test('actual pearl source-only apply preview preserves independently written card copy and every other index byte', () => {
  const slug = 'pearl-value-factors';
  const originalPage = fs.readFileSync(path.join(repo, 'pages', 'guide', `${slug}.vue`), 'utf8');
  const originalIndex = fs.readFileSync(path.join(repo, 'data', 'guide-posts.ts'), 'utf8');
  const entry = parseGuidePosts(originalIndex).find(row => row.slug === slug);
  const pageDescription = constExpression(originalPage, 'pageDescription');
  const updatedAt = entry.updatedAt === '2026-09-06' ? '2026-09-07' : '2026-09-06';
  const draft = makeDraft({ slug, description: pageDescription, updatedAt });
  assert.notEqual(entry.description, draft.description, 'fixture must distinguish card copy from page metadata');
  fs.mkdirSync(path.join(site, 'pages', 'guide'), { recursive: true });
  fs.mkdirSync(path.join(site, 'data'), { recursive: true });
  fs.writeFileSync(path.join(site, 'pages', 'guide', `${slug}.vue`), originalPage);
  fs.writeFileSync(path.join(site, 'data', 'guide-posts.ts'), originalIndex);
  const desired = buildDesiredFiles({ id: -1, kind: 'update', target_slug: slug, input: { updatePolicy: policy(['sources', 'sourceNote']) }, draft });
  const index = desired.textFiles.find(file => file.path.endsWith('guide-posts.ts'));
  const after = parseGuidePosts(index.after).find(row => row.slug === slug);
  for (const key of ['slug', 'path', 'title', 'description', 'keyword', 'image', 'publishedAt', 'category']) assert.equal(after[key], entry[key], key);
  assert.equal(after.updatedAt, updatedAt);
  const changes = diffLines(index.before, index.after).filter(part => part.added || part.removed);
  assert.equal(changes.filter(part => part.added).length, 1);
  assert.equal(changes.filter(part => part.removed).length, entry.updatedAt ? 1 : 0);
  for (const change of changes) assert.match(change.value, /^ +updatedAt: '\d{4}-\d{2}-\d{2}',\r?\n$/);
  const withoutDate = block => block.replace(/^[\t ]*updatedAt: '[^']*',\r?\n/m, '');
  assert.equal(withoutDate(after.block), withoutDate(entry.block));
  assert.equal(index.after, index.before.replace(entry.block, after.block));
  assert.equal(fs.readFileSync(index.path, 'utf8'), originalIndex, 'preview must not write files');
  assert.equal(constExpression(desired.textFiles[0].after, 'pageDescription'), pageDescription);
});

test('a selected title or description changes only that card field while retaining comments, quotes and other metadata', () => {
  const draft = makeDraft({ updatedAt: '2026-09-06' });
  const source = `export const guidePosts = [\r\n  {\r\n    slug: '${draft.slug}',\r\n    path: '/guide/${draft.slug}',\r\n    title: "카드 전용 제목", // retain this note\r\n    description: '카드 전용 설명',\r\n    keyword: '기존 카드 키워드',\r\n    image: '/Image/card.webp',\r\n    publishedAt: '2024-01-01',\r\n    updatedAt: '2026-09-06',\r\n    category: '선택',\r\n  },\r\n];\r\n`;
  const title = patchGuideIndex(source, draft, { isNew: false, policy: policy(['title']) });
  assert.equal(title, source.replace('"카드 전용 제목"', JSON.stringify(draft.title)));
  const description = patchGuideIndex(source, draft, { isNew: false, policy: policy(['description']) });
  assert.equal(description, source.replace("'카드 전용 설명'", `'${draft.description}'`));
});

test('a compact card without a final comma receives a valid date without losing its fields', () => {
  const draft = makeDraft({ updatedAt: '2026-09-06' });
  const source = `export const guidePosts = [{slug:'${draft.slug}',path:'/guide/${draft.slug}',title:'카드',description:'설명'}];`;
  const after = patchGuideIndex(source, draft, { isNew: false, policy: policy(['sources']) });
  const row = parseGuidePosts(after)[0];
  assert.equal(row.description, '설명');
  assert.equal(row.updatedAt, '2026-09-06');
});

test('legacy whole-summary updates and new article insertion retain their existing renderer contract', () => {
  const old = makeDraft({ title: '기존 전체 카드', description: '이전 카드 설명' });
  const source = `export const guidePosts = [${renderGuideSummary(old)}];`;
  const draft = makeDraft({ title: '새 전체 카드', description: '수정한 카드 설명' });
  const legacy = patchGuideIndex(source, draft, { isNew: false });
  assert.equal(legacy, source.replace(renderGuideSummary(old), renderGuideSummary(draft)));
  const added = makeDraft({ slug: 'new-insertion-check' });
  const inserted = patchGuideIndex(source, added, { isNew: true });
  assert.equal(parseGuidePosts(inserted).length, 2);
  assert.equal(parseGuidePosts(inserted)[0].slug, added.slug);
  assert.ok(inserted.includes(renderGuideSummary(old)));
});
