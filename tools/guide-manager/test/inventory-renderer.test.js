const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { parseGuidePosts, scanInventory, listClusters } = require('../server/services/inventoryService');
const { renderNewGuide, patchExistingGuide, patchGuideIndex } = require('../server/services/rendererService');
const { proposeCluster, patchGuideClusters } = require('../server/services/clusterService');
const { makeDraft } = require('./fixture');

const siteRoot = require('../server/lib/config').config.siteRoot;
const indexPath = path.join(siteRoot, 'data', 'guide-posts.ts');

// 가이드 개수는 저장소가 늘어날 때마다 바뀌므로 guide-posts.ts를 기준으로 검증한다.
test('가이드 목록 전부와 보호 페이지 2개를 인식한다', () => {
  const posts = parseGuidePosts(fs.readFileSync(indexPath, 'utf8'));
  const result = scanInventory();
  assert.ok(posts.length > 0, 'guide-posts.ts에서 가이드를 읽지 못했습니다');
  assert.deepEqual(
    { total: result.total, standard: result.standard, custom: result.custom },
    { total: posts.length, standard: posts.length - 2, custom: 2 },
  );
});

test('저장소에 실제 선언된 콘텐츠 클러스터를 모두 동적으로 인식한다', () => {
  const clusters = listClusters();
  assert.deepEqual(clusters.map((item) => item.id), ['repair', 'wedding', 'gold-weight', 'gemstone', 'couple-ring', 'baby-gold', 'custom']);
  assert.ok(clusters.every((item) => item.linkCount >= 7));
});

test('신규 글은 0.5 이상인 클러스터에 승인 가능한 diff로 한 번만 편입된다', () => {
  const source = fs.readFileSync(path.join(siteRoot, 'data', 'guide-clusters.ts'), 'utf8');
  const draft = makeDraft({ slug: 'custom-ring-finish-check', title: '주문제작 반지 마감 확인', keyword: '주문제작 반지 마감' });
  const proposal = proposeCluster(draft, { cluster: 'custom' });
  assert.equal(proposal.clusterId, 'custom');
  assert.ok(proposal.similarity >= 0.5);
  const once = patchGuideClusters(source, proposal);
  const twice = patchGuideClusters(once, proposal);
  assert.equal(once, twice);
  assert.match(once, /\/guide\/custom-ring-finish-check/);
});

test('신규 가이드 Vue와 JSON-LD를 결정적으로 렌더링한다', () => {
  const output = renderNewGuide(makeDraft());
  assert.match(output, /<GuideArticleView/);
  assert.match(output, /'@type': 'FAQPage'/);
  assert.match(output, /const gmArticleTitle/);
  assert.match(output, /const articleImages/);
  assert.match(output, /sections\.flatMap\(\(\{ image \}\)/);
  assert.match(output, /reviewedBy/);
  assert.match(output, /#organization/);
  assert.equal((output.match(/const quickAnswers/g) || []).length, 1);
  assert.equal((output.match(/const sections/g) || []).length, 1);
});

test('렌더러는 소제목의 중복 번호 접두사를 제거한다', () => {
  const draft = makeDraft({
    sections: [
      { title: '01. 현재 상태를 먼저 확인하세요', paragraphs: ['제품 상태를 확인합니다.'], bullets: [], image: null },
      { title: '② 원하는 마감을 구분하세요', paragraphs: ['마감을 구분합니다.'], bullets: [], image: null },
      { title: '3.75g 기준을 확인하세요', paragraphs: ['수치는 제목 내용입니다.'], bullets: [], image: null },
    ],
  });
  const output = renderNewGuide(draft);
  assert.doesNotMatch(output, /01\. 현재 상태/);
  assert.doesNotMatch(output, /② 원하는 마감/);
  assert.match(output, /현재 상태를 먼저 확인하세요/);
  assert.match(output, /3\.75g 기준을 확인하세요/);
});

test('일반 가이드는 알려진 필드만 교체하고 변수 충돌을 만들지 않는다', () => {
  const source = fs.readFileSync(path.join(siteRoot, 'pages', 'guide', 'jongno-ring-polishing-cost.vue'), 'utf8');
  const draft = makeDraft({
    slug: 'jongno-ring-polishing-cost',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
  });
  const output = patchExistingGuide(source, draft);
  for (const name of ['quickAnswers', 'sections', 'cautions', 'relatedLinks', 'faqItems']) {
    assert.equal((output.match(new RegExp(`const ${name}`, 'g')) || []).length, 1, `${name} 중복`);
  }
  assert.match(output, /const updatedAt = '2026-08-05'/);
  assert.match(output, /:title="gmArticleTitle"/);
});

test('커스텀 가이드 수정은 차단한다', () => {
  const source = fs.readFileSync(path.join(siteRoot, 'pages', 'guide', 'gold-one-don-gram.vue'), 'utf8');
  assert.throws(() => patchExistingGuide(source, makeDraft({ slug: 'gold-one-don-gram' })), /커스텀 가이드/);
});

test('신규 목록 항목은 TypeScript 타입 표기가 아닌 실제 배열에 삽입한다', () => {
  const source = fs.readFileSync(indexPath, 'utf8');
  const before = parseGuidePosts(source).length;
  const output = patchGuideIndex(source, makeDraft(), { isNew: true });
  const rows = parseGuidePosts(output);
  assert.equal(rows.length, before + 1);
  assert.equal(rows[0].slug, 'gold-ring-polishing-guide');
  assert.match(output, /export const guidePosts: GuidePostSummary\[\] = \[/);
});
