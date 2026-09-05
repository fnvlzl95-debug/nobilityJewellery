const test = require('node:test');
const assert = require('node:assert/strict');
const { validateDraft } = require('../server/services/draftSchema');
const { lintDraft, compareProtectedFacts, findUnexpectedHan } = require('../server/services/lintService');
const { buildDesiredFiles, validateHashes } = require('../server/services/applyService');
const { stripDraftSectionNumbering } = require('../server/lib/sectionTitle');
const { officialDomain } = require('../server/services/generationService');
const { koreaDate } = require('../server/lib/utils');
const { makeDraft } = require('./fixture');

test('콘텐츠 날짜는 자정 이후에도 한국시간 날짜를 사용한다', () => {
  assert.equal(koreaDate(new Date('2026-08-06T16:00:00.000Z')), '2026-08-07');
});

test('공식 출처 판정은 국가코드가 붙은 정부·학술 도메인과 국제 기관을 인정한다', () => {
  for (const url of [
    'https://www.gov.uk/government/publications/hallmarking-guidance-notes',
    'https://assets.publishing.service.gov.uk/media/report.pdf',
    'https://www.kca.go.kr/down/cou_08_01.pdf',
    'https://consumer.ftc.gov/articles/buying-gold-jewelry',
    'https://4cs.gia.edu/en-us/how-to-buy-a-diamond/',
    'https://www.iso.org/standard/90827.html',
    'https://www.ox.ac.uk/research',
    'https://www.jewelers.org/buying-jewelry/jewelry-repair-and-care/jewelry-repair',
  ]) assert.equal(officialDomain(url), true, url);
  for (const url of [
    'https://blog.naver.com/someone/223',
    'https://chicago.uk/shop',
    'https://example.com/gov',
    '알 수 없는 주소',
  ]) assert.equal(officialDomain(url), false, url);
});

// 원고 생성 → 이미지 생성 순서라서, 원고 단계에서 이미지 경로로 차단하면 파이프라인이 영원히 막힌다.
test('이미지 경로는 원고 단계에서 차단하지 않고 승인 검사에서만 차단한다', () => {
  const draft = makeDraft();
  draft.heroImage = { ...draft.heroImage, path: '' };
  draft.sections = draft.sections.map((section, index) => (
    index === 1 ? { ...section, image: { path: '', alt: '예시', caption: '설명', prompt: 'a ring' } } : section
  ));

  const atDraft = lintDraft(draft);
  assert.equal(atDraft.blocking, false, JSON.stringify(atDraft.findings));
  assert.ok(atDraft.findings.some((item) => item.code === 'section_image_missing' && item.severity === 'warning'));

  const atApprove = lintDraft(draft, { requireImage: true });
  assert.equal(atApprove.blocking, true);
  assert.ok(atApprove.findings.some((item) => item.code === 'section_image_missing' && item.severity === 'error'));
  assert.ok(atApprove.findings.some((item) => item.code === 'hero_image_required'));

  const withImages = JSON.parse(JSON.stringify(draft));
  withImages.heroImage.path = '/Image/guide/gold-ring-polishing-guide-hero.webp';
  withImages.sections[1].image.path = '/Image/guide/gold-ring-polishing-guide-section-2.webp';
  const finished = lintDraft(withImages, { requireImage: true });
  assert.equal(finished.blocking, false, JSON.stringify(finished.findings));
});

test('공식 출처가 없으면 차단하지만 운영자가 확정하면 경고로만 남긴다', () => {
  const supporting = makeDraft({
    sources: [{ label: 'Jewelry care', url: 'https://example.com/care', note: '보조 참고', official: false }],
  });
  const blocked = lintDraft(supporting);
  assert.equal(blocked.blocking, true);
  assert.ok(blocked.findings.some((item) => item.code === 'official_source' && item.severity === 'error'));

  const allowed = lintDraft(supporting, { allowWithoutOfficial: true });
  assert.equal(allowed.blocking, false, JSON.stringify(allowed.findings));
  assert.ok(allowed.findings.some((item) => item.code === 'official_source' && item.severity === 'warning'));

  const noSource = lintDraft(makeDraft({ sources: [] }), { allowWithoutOfficial: true });
  assert.equal(noSource.blocking, true, '출처가 아예 없으면 확정 여부와 무관하게 막아야 한다');
});

test('GuideDraft 구조화 계약과 공식 근거를 검사한다', () => {
  const draft = makeDraft();
  assert.equal(validateDraft(draft), true);
  const lint = lintDraft(draft);
  assert.equal(lint.blocking, false, JSON.stringify(lint.findings));
});

test('신규·수정 제목은 27자 권장과 31자 차단 경계를 적용한다', () => {
  const safe = lintDraft(makeDraft({ title: '가'.repeat(27) }));
  assert.ok(!safe.findings.some((item) => item.code.startsWith('title_length')));
  const warning = lintDraft(makeDraft({ title: '가'.repeat(28) }));
  assert.ok(warning.findings.some((item) => item.code === 'title_length_warning' && item.severity === 'warning'));
  const error = lintDraft(makeDraft({ title: '가'.repeat(32) }));
  assert.equal(error.blocking, true);
  assert.ok(error.findings.some((item) => item.code === 'title_length_error' && item.severity === 'error'));
});

test('기존 성과 제목을 그대로 둔 본문 수정은 새 제목 길이 게이트로 막지 않는다', () => {
  const target = require('../server/services/inventoryService').listGuides().find((guide) => guide.title.length >= 32 && !guide.isCustom);
  assert.ok(target, '32자 이상 기존 가이드가 필요합니다');
  const lint = lintDraft(makeDraft({ title: target.title }), { targetSlug: target.slug });
  assert.ok(!lint.findings.some((item) => item.code === 'title_length_error'));
});

test('이미지 프롬프트 한글과 제목을 복사한 alt를 경고한다', () => {
  const draft = makeDraft();
  draft.heroImage.prompt = '검은 작업대 위 금반지';
  draft.heroImage.alt = draft.title;
  const lint = lintDraft(draft);
  assert.ok(lint.findings.some((item) => item.code === 'image_prompt_korean' && item.path === 'heroImage.prompt'));
  assert.ok(lint.findings.some((item) => item.code === 'hero_alt_matches_title'));
});

test('소제목 번호 접두사는 중복 표시 방지를 위해 승인을 차단한다', () => {
  const draft = makeDraft({
    sections: makeDraft().sections.map((section, index) => (
      index === 0 ? { ...section, title: '1. 현재 상태를 먼저 확인하세요' } : section
    )),
  });
  const lint = lintDraft(draft);
  assert.equal(lint.blocking, true);
  assert.ok(lint.findings.some((finding) => finding.code === 'section_title_numbering'));
});

test('출처 설명에 섞인 중국어·비정상 한자는 차단 오류로 처리한다', () => {
  const draft = makeDraft({
    sources: [{
      label: 'Jewelers of America — Jewelry Repair',
      url: 'https://www.jewelers.org/buying-jewelry/jewelry-repair-and-care/jewelry-repair',
      note: '미국 보석行业 협회의 공식 수리 안내입니다.',
      official: true,
    }],
  });
  const lint = lintDraft(draft);
  assert.equal(lint.blocking, true);
  assert.ok(lint.findings.some((finding) => (
    finding.code === 'unexpected_han_script'
      && finding.path === 'sources.0.note'
      && finding.message.includes('行业')
  )), JSON.stringify(lint.findings));
});

test('한글·영문 기관명·귀금속 수치는 허용하고 한자 스크립트만 찾는다', () => {
  assert.deepEqual(findUnexpectedHan('미국 보석상 협회 GIA, 14K·18K와 3.75g 기준'), []);
  assert.deepEqual(findUnexpectedHan('미국 보석行业 협회'), ['行业']);
});

test('저장된 예전 초안도 편집 화면에 불러올 때 소제목 번호를 정리한다', () => {
  const cleaned = stripDraftSectionNumbering(makeDraft({
    sections: [
      { title: '01. 현재 상태를 확인하세요', paragraphs: [], image: null },
      { title: '3.75g 기준을 확인하세요', paragraphs: [], image: null },
    ],
  }));
  assert.equal(cleaned.sections[0].title, '현재 상태를 확인하세요');
  assert.equal(cleaned.sections[1].title, '3.75g 기준을 확인하세요');
});

test('Humanizer 사실 잠금은 수치·등급·날짜·URL 변경을 감지한다', () => {
  const before = '14K 반지 3.75g, 2026-08-05 검토. https://www.gia.edu/example';
  assert.equal(compareProtectedFacts(before, before.replace('검토', '확인')).pass, true);
  assert.equal(compareProtectedFacts(before, before.replace('3.75g', '4g')).pass, false);
});

test('보호된 커스텀 가이드는 저장소 반영 단계에서도 차단한다', () => {
  assert.throws(() => buildDesiredFiles({
    id: -1,
    kind: 'update',
    target_slug: 'gold-one-don-gram',
    draft: makeDraft({ slug: 'gold-one-don-gram' }),
    humanized: null,
  }), /커스텀 가이드/);
});

test('작업 시작 이후 guide-posts 해시가 바뀌면 반영을 거부한다', () => {
  assert.throws(() => validateHashes({ input: { baseIndexHash: 'wrong' } }, { isNew: true, textFiles: [] }), /가이드 목록이 작업 시작 후 변경/);
});
