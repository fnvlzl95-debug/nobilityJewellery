const test = require('node:test');
const assert = require('node:assert/strict');
const { db } = require('../server/lib/db');
const inventory = require('../server/services/inventoryService');
const { extractGuideContent, parseLiteral } = require('../server/services/contentExtractorService');
const audits = require('../server/services/contentAuditService');
const { resultMatchesTarget } = require('../server/services/naverService');

test('Vue 데이터 리터럴만 안전하게 읽고 동적 식별자는 실행하지 않는다', () => {
  assert.deepEqual(parseLiteral("[{ title: '기준', bullets: ['14K', '18K'], image: null }]"), [
    { title: '기준', bullets: ['14K', '18K'], image: null },
  ]);
  assert.equal(parseLiteral('[process.exit()]', 'blocked'), 'blocked');
});

test('기존 GuideArticleView에서 본문·FAQ·내부링크·기술 신호를 추출한다', () => {
  const guide = inventory.getGuide('baby-ring-price', { includeSource: true });
  const content = extractGuideContent(guide, guide.source);
  assert.equal(content.structure.quickAnswerCount, 3);
  assert.equal(content.structure.sectionCount, 3);
  assert.equal(content.structure.faqCount, 3);
  assert.equal(content.structure.relatedLinkCount, 3);
  assert.equal(content.technical.selfCanonical, true);
  assert.ok(content.characterCount > 700);
});

// 진단 대상 수는 저장소 가이드 수를 따라가므로 고정값 대신 인벤토리를 기준으로 검증한다.
test('가이드 전부를 기간 분리 상태로 진단하고 재스캔 시 같은 스냅샷을 재사용한다', () => {
  const first = audits.scanAll();
  const before = audits.detail('baby-ring-price');
  const second = audits.scanAll();
  const after = audits.detail('baby-ring-price');
  const expected = inventory.listGuides().length;
  assert.ok(expected > 0, '저장소에서 가이드를 읽지 못했습니다');
  assert.equal(first.total, expected);
  assert.equal(second.total, expected);
  const report = audits.report();
  assert.equal(report.summary.total, expected);
  assert.match(report.refreshedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.match(report.calculatedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(before.id, after.id);
  assert.deepEqual(after.snapshot.periods.gsc, report.periods.gsc);
  assert.deepEqual(after.snapshot.periods.ga4, report.periods.ga4);
  assert.notEqual(after.snapshot.periods.gsc.importId, after.snapshot.periods.ga4.importId);
});

test('GSC 검색어 연결은 페이지별 실측이 아닌 추정값으로 표시한다', () => {
  const rows = audits.report().rows;
  const withHint = rows.map((row) => audits.detail(row.slug)).find((item) => item.snapshot.queryHints.length);
  assert.ok(withHint);
  assert.ok(withHint.snapshot.queryHints.every((item) => item.inferred === true));
  assert.match(withHint.snapshot.caveats.join(' '), /추정/);
});

test('과거 슬래시 URL 변형만으로 현재 기술 우선 판정을 하지 않는다', () => {
  const row = audits.report().rows.find((item) => item.technicalFindings.some((finding) => finding.code === 'slash_variants'));
  assert.ok(row, '과거 슬래시 변형 표본을 찾지 못했습니다');
  assert.notEqual(row.classification, '기술 우선');
  assert.ok(row.technicalFindings.some((finding) => finding.code === 'slash_variants' && finding.state === 'historical'));
});

test('Naver 순위는 도메인이 아니라 목표 가이드 경로 정확 일치로 판정한다', () => {
  assert.equal(resultMatchesTarget('https://noblessegold.com/guide', '/guide/baby-ring-price'), false);
  assert.equal(resultMatchesTarget('https://noblessegold.com/guide/baby-ring-price/', '/guide/baby-ring-price'), true);
  assert.equal(resultMatchesTarget('https://example.com/guide/baby-ring-price', '/guide/baby-ring-price'), false);
});

test('보호 가이드 2개는 진단되지만 수정 작업 생성은 차단한다', () => {
  const protectedAudit = audits.detail('gold-one-don-gram');
  assert.equal(protectedAudit.snapshot.guide.isCustom, true);
  assert.throws(() => audits.createUpdate('gold-one-don-gram'), /보호 가이드/);
});

test('사용자 수정 계획은 존재하는 내부 링크와 활성 변경만 저장한다', () => {
  const slug = 'baby-ring-price';
  const item = audits.detail(slug);
  const saved = audits.savePlan(slug, {
    ...item.plan,
    goal: 'CTR과 첫 화면 응답을 순서대로 개선',
    changes: item.plan.changes.map((entry, index) => ({ ...entry, enabled: index === 0 })),
    internalLinks: [{ to: '/guide/gold-one-don-gram', reason: '중량 기준 연결' }, { to: '/missing', reason: '없는 링크' }],
  });
  assert.equal(saved.plan.goal, 'CTR과 첫 화면 응답을 순서대로 개선');
  assert.equal(saved.plan.internalLinks.length, 1);
  assert.equal(saved.planStatus, 'edited');
});

test('성과가 강한 스니펫은 Terra 제안이 있어도 제목 변경을 기본 비활성화한다', () => {
  const item = audits.detail('baby-ring-price');
  const mock = structuredClone(item);
  // 이 테스트는 관찰기간 보호가 아니라 검색 스니펫 보호만 격리해 검증한다.
  mock.snapshot.guards.recentObservationHold = false;
  mock.snapshot.guards.keepSnippet = true;
  mock.snapshot.content.title = '현재 성과 제목';
  const guarded = audits.applyServerGuards({
    proposedTitle: '새 제목', risks: [], changes: [{ area: '제목·설명', enabled: true }, { area: '본문', enabled: true }],
  }, mock);
  assert.equal(guarded.changes[0].enabled, false);
  assert.equal(guarded.changes[1].enabled, true);
  assert.match(guarded.risks[0], /서버 보호/);
});

test('네이버 1~3위 페이지는 Google CTR과 별개로 제목 변경을 보호한다', () => {
  const item = audits.detail('gold-necklace-repair-time');
  const mock = structuredClone(item);
  mock.snapshot.guards.keepSnippet = false;
  mock.snapshot.guards.keepNaverSnippet = true;
  mock.snapshot.guards.naverRank = 1;
  mock.snapshot.content.title = '현재 제목';
  const guarded = audits.applyServerGuards({
    proposedTitle: '새 제목', risks: [], changes: [{ area: '제목·설명', enabled: true }, { area: '본문', enabled: true }],
  }, mock);
  assert.equal(guarded.changes[0].enabled, false);
  assert.equal(guarded.changes[1].enabled, true);
  assert.match(guarded.risks[0], /네이버 웹검색 1위/);
  const repeated = audits.applyServerGuards(guarded, mock);
  assert.equal(repeated.risks.filter((value) => /네이버 웹검색 1위/.test(value)).length, 1);
});

test('최근 변경 글은 D+31 전까지 자동 수정 항목을 모두 비활성화한다', () => {
  assert.deepEqual(audits.observationWindow({ publishedAt: '2026-08-01', updatedAt: '' }, '2026-08-25'), {
    recentObservationHold: true,
    changeDate: '2026-08-01',
    observeUntil: '2026-09-01',
    daysSinceChange: 24,
  });
  assert.equal(audits.observationWindow({ publishedAt: '2026-07-25' }, '2026-08-25').recentObservationHold, false);
  assert.deepEqual(audits.observationWindow({ publishedAt: '2026-06-01', updatedAt: '2026-07-01', repositoryChangedAt: '2026-08-20' }, '2026-08-25'), {
    recentObservationHold: true,
    changeDate: '2026-08-20',
    observeUntil: '2026-09-20',
    daysSinceChange: 5,
  });
  const item = structuredClone(audits.detail('baby-ring-price'));
  item.snapshot.guards.recentObservationHold = true;
  item.snapshot.guards.changeDate = '2026-08-09';
  item.snapshot.guards.observeUntil = '2026-09-09';
  const guarded = audits.applyServerGuards({
    proposedTitle: item.snapshot.content.title,
    risks: [],
    changes: [{ area: '본문', enabled: true }, { area: '내부링크', enabled: true }],
  }, item);
  assert.ok(guarded.changes.every((entry) => entry.enabled === false));
  assert.match(guarded.risks[0], /D\+31/);
});

test('FAQ JSON-LD는 현재 노출 준비도 신뢰 점수에 가산하지 않는다', () => {
  const content = {
    title: '충분한 길이의 가이드 제목입니다', description: '검색 설명을 충분한 길이로 구성한 테스트 문장입니다. 사용자의 질문과 선택 기준을 한 문장에 정리합니다.', keyword: '테스트 가이드', lead: '검색 질문에 바로 답하는 충분한 길이의 도입 문장입니다.', characterCount: 1500,
    structure: { quickAnswerCount: 3, sectionCount: 4, faqCount: 3, cautionCount: 2, officialSourceCount: 0, sourceCount: 0, relatedLinkCount: 3 },
    technical: { articleSchema: true, faqSchema: true },
  };
  const withFaq = audits.scoreContent(content, 3, { id: 'test' });
  content.technical.faqSchema = false;
  const withoutFaq = audits.scoreContent(content, 3, { id: 'test' });
  assert.equal(withFaq.trust, withoutFaq.trust);
});

test('공식 출처가 없는 기존 글은 본문 보강과 분리해 출처 백필로 진단한다', () => {
  const snapshot = {
    metrics: { gsc: { impressions: 0, position: null, ctr: 0, expectedCtr: null }, ga4: { mapped: false, views: 0 } },
    technicalFindings: [], duplicates: [], links: { inboundCount: 3 },
    scores: { dimensions: { answerCoverage: 80, trust: 20 } },
    content: { structure: { officialSourceCount: 0 } },
  };
  assert.equal(audits.classify(snapshot), '출처 백필');
});

test('확정 계획으로 기존 글 수정 작업을 만들고 진단 지시를 전달한다', (t) => {
  const candidate = audits.report().rows
    .map((row) => audits.detail(row.slug))
    .find((item) => !item.snapshot.guide.isCustom
      && !item.snapshot.guards.recentObservationHold
      && item.plan.changes.some((entry) => entry.enabled));
  assert.ok(candidate, '현재 수정 가능한 비보호 가이드가 필요합니다');
  const slug = candidate.guideSlug;
  const generation = audits.createUpdate(slug);
  t.after(() => db.prepare('DELETE FROM generations WHERE id=?').run(generation.id));
  assert.equal(generation.kind, 'update');
  assert.equal(generation.target_slug, slug);
  assert.ok(generation.input.auditId);
  assert.ok(generation.input.auditPlan.changes.some((entry) => entry.enabled));
});
