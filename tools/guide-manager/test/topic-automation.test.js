const test = require('node:test');
const assert = require('node:assert/strict');
const { db } = require('../server/lib/db');
const { nowIso } = require('../server/lib/utils');
const {
  semanticSimilarity, candidateGuideSimilarity, reconciledAnalysisSummary, scoreTopicCandidates,
  dynamicTopicStrategySchema, clusterKey,
} = require('../server/services/topicService');
const { planDraftImages, prepareBest } = require('../server/services/automationService');
const generations = require('../server/services/generationService');
const inventory = require('../server/services/inventoryService');
const { makeDraft } = require('./fixture');

function imageStub(slots) {
  return (id, slotInput) => {
    slots.push(slotInput.slot);
    const current = generations.getGeneration(id);
    const draft = JSON.parse(JSON.stringify(current.humanized || current.draft));
    const publicPath = `/Image/guide/${draft.slug}-${slotInput.slot}.webp`;
    if (slotInput.slot === 'hero') draft.heroImage.path = publicPath;
    else draft.sections[slotInput.sectionIndex].image.path = publicPath;
    generations.updateGeneration(id, { [current.humanized ? 'humanized_json' : 'draft_json']: JSON.stringify(draft) });
    db.prepare(`INSERT INTO image_assets (generation_id, slot, section_index, prompt, alt_text, caption, local_path, public_path, model, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'gpt-image-2', 'active', ?, ?)`)
      .run(id, slotInput.slot, slotInput.sectionIndex ?? null, slotInput.prompt, slotInput.altText, slotInput.caption, 'mock.webp', publicPath, nowIso(), nowIso());
  };
}

// 기존 글 수정에서 대표 이미지를 유지하더라도 본문 이미지 계획까지 사라지면 안 된다.
test('대표 이미지를 유지하는 수정 작업도 본문 이미지는 생성한다', async () => {
  const guide = inventory.listGuides().find((item) => !item.isCustom && item.image);
  assert.ok(guide, '이미지가 있는 일반 가이드를 찾지 못했습니다');
  const created = generations.createGeneration({ targetSlug: guide.slug, topic: guide.keyword || guide.title });
  const slots = [];
  try {
    const result = await prepareBest({ generationId: created.id, imagePolicy: 'reuse' }, {
      researchOfficial: (id) => generations.updateGeneration(id, {
        research_json: JSON.stringify({
          official: {
            topic: 'test', summary: '공식 근거',
            sources: [{ label: 'GIA', url: 'https://www.gia.edu/example', domain: 'gia.edu', official: true, reason: '교육 자료', selected: false }],
            claims: [{ claim: '검토 항목', sourceUrls: ['https://www.gia.edu/example'], confidence: 'high' }],
          },
        }),
        status: 'researched',
      }),
      generateDraft: (id) => generations.updateGeneration(id, {
        draft_json: JSON.stringify(makeDraft({ slug: guide.slug })),
        lint_json: JSON.stringify({ blocking: false, score: 94, findings: [] }), status: 'draft',
      }),
      generateSlot: imageStub(slots),
      humanizeGeneration: (id) => {
        const current = generations.getGeneration(id);
        return generations.updateGeneration(id, { humanized_json: JSON.stringify(current.draft), status: 'humanized' });
      },
      lintGeneration: (id) => generations.updateGeneration(id, { lint_json: JSON.stringify({ blocking: false, score: 97, findings: [] }) }),
      preview: () => ({ files: [{ path: `pages/guide/${guide.slug}.vue` }], images: [] }),
    });
    assert.ok(!slots.includes('hero'), '기존 대표 이미지는 다시 생성하지 않아야 합니다');
    assert.ok(slots.some((slot) => slot.startsWith('section-')), `본문 이미지를 생성해야 합니다 (생성된 슬롯: ${slots.join(', ') || '없음'})`);
    const draft = result.humanized || result.draft;
    assert.equal(draft.heroImage.path, guide.image, '대표 이미지는 기존 경로를 유지해야 합니다');
    assert.equal(result.readiness.checks.bodyImages, true);
    assert.equal(result.readiness.ready, true);
  } finally {
    db.prepare('DELETE FROM generations WHERE id=?').run(created.id);
  }
});

function candidate(overrides = {}) {
  return {
    id: 'wedding-budget-1',
    topic: '결혼예물 예산 항목과 준비 순서',
    primaryKeyword: '결혼예물 예산 준비',
    slug: 'wedding-jewelry-budget-checklist',
    workingTitle: '결혼예물 예산 준비, 항목별 체크 순서',
    category: '선택',
    inquiryType: 'custom',
    intent: '구매 준비',
    cluster: 'wedding',
    evidenceQueries: ['예물'],
    supportingKeywords: ['예물 준비', '결혼예물 예산'],
    reason: '자사 노출이 있는 예물 주제군의 다음 하위 의도입니다.',
    contentGap: '현재 글에는 세트 구성은 있지만 예산 항목을 정하는 독립 순서가 없습니다.',
    cannibalizationNote: '세트 품목 설명이 아니라 예산 의사결정 순서에 집중합니다.',
    accepted: true,
    score: 82,
    ...overrides,
  };
}

test('숫자 각인처럼 표현만 다른 기존 검색 의도를 중복으로 판정한다', () => {
  const similarity = semanticSimilarity('금 585 뜻', '귀금속 각인 585·750·925 뜻, 금·은·백금 숫자 읽는 법');
  assert.ok(similarity >= 0.72, similarity);
});

test('주제 클러스터 계약은 저장소 선언을 동적으로 따르고 신설 주제를 분리한다', () => {
  const ids = inventory.listClusters().map((item) => item.id);
  const schema = dynamicTopicStrategySchema(inventory.listClusters());
  assert.deepEqual(schema.properties.candidates.items.properties.cluster.enum, [...ids, 'other']);
  assert.equal(clusterKey('커플링 각인 문구 선택'), 'couple-ring');
  assert.equal(clusterKey('돌반지 제작 기간'), 'baby-gold');
  assert.equal(clusterKey('목걸이 주문제작 상담'), 'custom');
});

test('짧은 핵심어 하나만 겹치는 하위 의도를 기존 글 중복으로 과대평가하지 않는다', () => {
  const goldCandidate = candidate({
    topic: '옐로골드 금반지가 검게 보일 때 원인 구분과 관리 순서',
    primaryKeyword: '금반지 변색',
    workingTitle: '금반지 변색, 14K·18K 옐로골드 원인 구분',
  });
  const goldGuide = {
    title: '금반지·화이트골드 도금 수리, 변색·광택 상담 전 기준',
    keyword: '금 도금 수리',
  };
  const customCandidate = candidate({
    topic: '반지 주문제작 견적 문의 전 준비할 디자인 자료',
    primaryKeyword: '반지 주문제작',
    workingTitle: '반지 주문제작 견적 문의 전 준비할 것',
  });
  const earringsGuide = {
    title: '귀걸이 주문제작 기간, 디자인 확정부터 한쌍 수령까지',
    keyword: '귀걸이 주문제작 기간',
  };
  assert.ok(candidateGuideSimilarity(goldCandidate, goldGuide) < 0.72);
  assert.ok(candidateGuideSimilarity(customCandidate, earringsGuide) < 0.72);
});

test('대표 검색어와 전체 제목이 함께 겹치는 기존 의도는 계속 중복으로 판정한다', () => {
  const hallmarkCandidate = candidate({
    topic: '금 585 뜻', primaryKeyword: '금 585 뜻', workingTitle: '금 585 뜻 알아보기',
  });
  const hallmarkGuide = {
    title: '귀금속 각인 585·750·925 뜻, 금·은·백금 숫자 읽는 법',
    keyword: '귀금속 각인 숫자 뜻',
  };
  assert.ok(candidateGuideSimilarity(hallmarkCandidate, hallmarkGuide) >= 0.72);
});

test('통과 후보가 없으면 모델 설명 대신 서버 판정과 일치하는 요약을 반환한다', () => {
  const rejected = [{ rejectionReasons: ['기존 글과 검색 의도가 겹칩니다.'] }];
  const summary = reconciledAnalysisSummary('남은 기회는 금반지 변색입니다.', [], rejected);
  assert.match(summary, /통과한 주제가 없습니다/);
  assert.doesNotMatch(summary, /남은 기회/);
});

test('주제 점수는 실제 검색 신호가 있는 비중복 후보를 우선하고 중복 후보를 제외한다', () => {
  const guides = [{ slug: 'hallmark', title: '귀금속 각인 585·750·925 뜻', keyword: '귀금속 각인 숫자 뜻', category: '소재·보석' }];
  const queries = [{ query: '예물', clicks: 0, impressions: 167, ctr: 0, position: 6.88 }];
  const rows = scoreTopicCandidates({
    guides,
    queries,
    candidates: [
      candidate(),
      candidate({ id: 'dup', topic: '금 585 뜻', primaryKeyword: '금 585 뜻', slug: 'gold-585-meaning', workingTitle: '금 585 뜻 알아보기', evidenceQueries: ['예물'] }),
    ],
    naverTrends: { 'wedding-budget-1': { ratio: 80 }, dup: { ratio: 100 } },
  });
  assert.equal(rows[0].id, 'wedding-budget-1');
  assert.equal(rows[0].accepted, true);
  assert.equal(rows.find((row) => row.id === 'dup').accepted, false);
});

test('이미지 계획은 대표 1장과 본문 최대 2장을 실제 섹션 위치에 고정한다', () => {
  const draft = makeDraft({ sections: [
    ...makeDraft().sections,
    { title: '마지막 확인', paragraphs: ['최종 조건을 확인합니다.'], bullets: [], image: null },
    { title: '상담 준비', paragraphs: ['문의할 내용을 적습니다.'], bullets: [], image: null },
  ] });
  const result = planDraftImages(draft, '결혼예물 예산 준비');
  assert.deepEqual(result.placements.map((item) => item.slot), ['hero', 'section-2', 'section-4']);
  assert.equal(result.draft.sections.filter((section) => section.image).length, 2);
  assert.ok(result.placements.every((item) => item.location));
  assert.ok(!/[가-힣]/.test(result.draft.heroImage.prompt));
});

test('자동 준비는 승인·반영 없이 ready 상태와 완전한 변경 묶음까지만 만든다', async () => {
  let createdId = null;
  const report = {
    generatedAt: nowIso(), model: { requested: 'gpt-5.6-terra' }, methodology: 'test', period: {},
    recommended: candidate(), accepted: [candidate()],
  };
  try {
    const result = await prepareBest({ report }, {
      createGeneration: (input) => {
        const row = generations.createGeneration(input);
        createdId = row.id;
        return row;
      },
      researchOfficial: (id) => {
        const current = generations.getGeneration(id);
        const research = { ...(current.research || {}), official: {
          topic: current.topic,
          summary: '공식 근거',
          sources: [{ label: 'GIA', url: 'https://www.gia.edu/example', domain: 'gia.edu', official: true, reason: '교육 자료', selected: false }],
          claims: [{ claim: '검토 항목', sourceUrls: ['https://www.gia.edu/example'], confidence: 'high' }],
        } };
        return generations.updateGeneration(id, { research_json: JSON.stringify(research), status: 'researched' });
      },
      generateDraft: (id) => generations.updateGeneration(id, { draft_json: JSON.stringify(makeDraft({ slug: candidate().slug })), lint_json: JSON.stringify({ blocking: false, score: 94, findings: [] }), status: 'draft' }),
      generateSlot: (id, slotInput) => {
        const current = generations.getGeneration(id);
        const draft = JSON.parse(JSON.stringify(current.draft));
        const publicPath = `/Image/guide/${draft.slug}-${slotInput.slot}.webp`;
        if (slotInput.slot === 'hero') draft.heroImage.path = publicPath;
        else draft.sections[slotInput.sectionIndex].image.path = publicPath;
        generations.updateGeneration(id, { draft_json: JSON.stringify(draft) });
        db.prepare(`INSERT INTO image_assets (generation_id, slot, section_index, prompt, alt_text, caption, local_path, public_path, model, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'gpt-image-2', 'active', ?, ?)`)
          .run(id, slotInput.slot, slotInput.sectionIndex, slotInput.prompt, slotInput.altText, slotInput.caption, 'mock.webp', publicPath, nowIso(), nowIso());
      },
      humanizeGeneration: (id) => {
        const current = generations.getGeneration(id);
        return generations.updateGeneration(id, { humanized_json: JSON.stringify(current.draft), status: 'humanized' });
      },
      lintGeneration: (id) => generations.updateGeneration(id, { lint_json: JSON.stringify({ blocking: false, score: 97, findings: [] }) }),
      preview: () => ({ files: [{ path: 'pages/guide/wedding-jewelry-budget-checklist.vue' }, { path: 'data/guide-posts.ts' }], images: [{ slot: 'hero', path: 'public/Image/guide/hero.webp' }] }),
    });
    assert.equal(result.status, 'ready');
    assert.equal(result.approved_at, null);
    assert.equal(result.readiness.ready, true);
    assert.equal(result.research.automation.state, 'ready');
  } finally {
    if (createdId) db.prepare('DELETE FROM generations WHERE id=?').run(createdId);
  }
});
