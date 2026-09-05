const { db } = require('../lib/db');
const { validateDraft, schemaErrors } = require('./draftSchema');
const { jaccard } = require('./opportunityService');
const { hasSectionNumbering } = require('../lib/sectionTitle');

const BANNED = ['무조건', '100%', '최고', '최저', '완벽 보장', '반드시 가능합니다'];
const STATIC_PATHS = new Set(['/guide', '/contact', '/repair', '/wedding', '/buy-gold', '/baby-gold', '/custom', '/wholesale', '/faq', '/gallery']);
const HAN_SEQUENCE = /\p{Script=Han}+/gu;
const KOREAN_SEQUENCE = /[가-힣]/u;

// 렌더러를 거쳐 실제 페이지나 문의 UI에 노출되는 문자열만 모은다.
// 이미지 생성용 영문 prompt와 URL은 검사 대상에서 제외한다.
function visibleTextEntries(draft) {
  const entries = [];
  const add = (path, value) => {
    if (typeof value === 'string' && value.trim()) entries.push({ path, text: value });
  };
  add('title', draft?.title);
  add('description', draft?.description);
  add('lead', draft?.lead);
  add('category', draft?.category);
  add('keyword', draft?.keyword);
  add('inquiryTopic', draft?.inquiryTopic);
  add('heroImage.alt', draft?.heroImage?.alt);
  add('heroImage.caption', draft?.heroImage?.caption);
  (draft?.quickAnswers || []).forEach((value, index) => add(`quickAnswers.${index}`, value));
  (draft?.sections || []).forEach((section, sectionIndex) => {
    add(`sections.${sectionIndex}.title`, section?.title);
    (section?.paragraphs || []).forEach((value, index) => add(`sections.${sectionIndex}.paragraphs.${index}`, value));
    (section?.bullets || []).forEach((value, index) => add(`sections.${sectionIndex}.bullets.${index}`, value));
    add(`sections.${sectionIndex}.image.alt`, section?.image?.alt);
    add(`sections.${sectionIndex}.image.caption`, section?.image?.caption);
  });
  (draft?.cautions || []).forEach((value, index) => add(`cautions.${index}`, value));
  (draft?.faqItems || []).forEach((item, index) => {
    add(`faqItems.${index}.question`, item?.question);
    add(`faqItems.${index}.answer`, item?.answer);
  });
  (draft?.relatedLinks || []).forEach((item, index) => {
    add(`relatedLinks.${index}.label`, item?.label);
    add(`relatedLinks.${index}.description`, item?.description);
  });
  add('sourceNote', draft?.sourceNote);
  (draft?.sources || []).forEach((source, index) => {
    add(`sources.${index}.label`, source?.label);
    add(`sources.${index}.note`, source?.note);
  });
  return entries;
}

function findUnexpectedHan(text) {
  return [...new Set(String(text || '').match(HAN_SEQUENCE) || [])];
}

function allText(draft) {
  return [
    draft.title, draft.description, draft.lead,
    ...(draft.quickAnswers || []),
    ...(draft.sections || []).flatMap((section) => [section.title, ...(section.paragraphs || []), ...(section.bullets || [])]),
    ...(draft.cautions || []),
    ...(draft.faqItems || []).flatMap((item) => [item.question, item.answer]),
  ].filter(Boolean).join('\n');
}

// 운영자가 보조 출처로 진행하기로 확정하면 공식 출처 관련 규칙만 경고로 낮춘다. 나머지 안전 규칙은 그대로다.
function lintDraft(draft, { targetSlug = null, requireImage = false, allowWithoutOfficial = false } = {}) {
  const sourceSeverity = allowWithoutOfficial ? 'warning' : 'error';
  const findings = [];
  const add = (severity, code, message, path = '') => findings.push({ severity, code, message, path });
  if (!validateDraft(draft)) {
    for (const message of schemaErrors(validateDraft)) add('error', 'schema', message);
    return { blocking: true, errors: findings.length, warnings: 0, score: 0, findings };
  }
  if (!draft || typeof draft !== 'object') return { blocking: true, score: 0, findings };
  const existingTarget = targetSlug ? db.prepare('SELECT title FROM guides WHERE slug=?').get(targetSlug) : null;
  const titleChanged = !existingTarget || String(existingTarget.title || '').trim() !== String(draft.title || '').trim();
  const titleLength = String(draft.title || '').length;
  if (titleChanged) {
    if (titleLength < 15) add('warning', 'title_length_short', '제목은 검색 의도가 드러나도록 15자 이상을 권장합니다.', 'title');
    else if (titleLength >= 32) add('error', 'title_length_error', `제목이 ${titleLength}자입니다. “| 귀족” 접미사를 제외하고 31자 이하로 줄이고 핵심 답은 앞 27자 안에 두세요.`, 'title');
    else if (titleLength >= 28) add('warning', 'title_length_warning', `제목이 ${titleLength}자입니다. 검색결과에서 뒷부분이 잘릴 수 있으니 27자 이하를 권장합니다.`, 'title');
  }
  if ((draft.description || '').length < 55 || (draft.description || '').length > 175) add('warning', 'description_length', '설명은 55~175자 범위를 권장합니다.', 'description');
  if (String(draft.title || '').includes('| 귀족')) add('error', 'title_brand_suffix', '본문 title에는 “| 귀족” 접미사를 넣지 않습니다.', 'title');
  for (const entry of visibleTextEntries(draft)) {
    const sequences = findUnexpectedHan(entry.text);
    if (sequences.length) {
      add(
        'error',
        'unexpected_han_script',
        `한국어 원고에 중국어·비정상 한자가 섞였습니다: “${sequences.slice(0, 3).join(', ')}”. 공식 영문명이나 자연스러운 한국어로 바꾸세요.`,
        entry.path,
      );
    }
  }
  const duplicate = db.prepare('SELECT slug, title, keyword FROM guides WHERE slug <> COALESCE(?, \'\')').all(targetSlug)
    .map((row) => ({ ...row, similarity: Math.max(jaccard(draft.title, row.title), jaccard(draft.keyword, row.keyword)) }))
    .sort((a, b) => b.similarity - a.similarity)[0];
  if (duplicate?.similarity >= 0.78) add('error', 'cannibalization', `기존 “${duplicate.title}”과 주제가 매우 유사합니다 (${duplicate.similarity.toFixed(2)}).`, 'keyword');
  else if (duplicate?.similarity >= 0.65) add('warning', 'cannibalization_warning', `기존 “${duplicate.title}”과 검색 의도가 겹칠 수 있습니다 (${duplicate.similarity.toFixed(2)}).`, 'keyword');
  const similarDescription = db.prepare('SELECT slug, title, description FROM guides WHERE slug <> COALESCE(?, \'\') AND description IS NOT NULL').all(targetSlug)
    .map((row) => ({ ...row, similarity: jaccard(draft.description, row.description) }))
    .sort((a, b) => b.similarity - a.similarity)[0];
  if (similarDescription?.similarity >= 0.7) add('warning', 'description_similarity', `검색 설명이 기존 “${similarDescription.title}”과 비슷합니다 (${similarDescription.similarity.toFixed(2)}). 이 글만의 답과 구분 기준을 앞부분에 넣으세요.`, 'description');
  const text = allText(draft);
  for (const word of BANNED) if (text.includes(word)) add('error', 'banned_claim', `과장·보장 표현 “${word}”을 제거하거나 근거 있는 조건형으로 바꾸세요.`);
  const exactPriceOrTime = /(?:\d[\d,]*\s*원|\d+\s*(?:일|시간)\s*(?:이면|만에|소요|완료))/g;
  const risky = text.match(exactPriceOrTime) || [];
  const hasOfficial = (draft.sources || []).some(source => source.official && require('./generationService').officialDomain(source.url));
  for (const image of [draft.heroImage, ...(draft.sections || []).map(section => section.image)].filter(Boolean)) {
    if (image.path && !/^\/Image\/[a-zA-Z0-9_/-]+\.(?:webp|png|jpe?g|avif)$/i.test(image.path)) add('error', 'unsafe_image_path', '이미지는 사이트 /Image/ 아래의 파일 경로여야 합니다.');
    if (image.path?.split('/').includes('..')) add('error', 'unsafe_image_path', '상위 폴더를 참조하는 이미지 경로는 사용할 수 없습니다.');
  }
  if (risky.length && !hasOfficial) add(sourceSeverity, 'unsupported_exact_claim', `정확한 가격·기간 표현(${[...new Set(risky)].slice(0, 3).join(', ')})에 공식 근거가 없습니다.`);
  if (!hasOfficial) {
    if (!(draft.sources || []).length) add('error', 'no_source', '근거 출처가 하나도 없습니다.', 'sources');
    else add(sourceSeverity, 'official_source', allowWithoutOfficial
      ? '공식·권위 출처 없이 보조 출처만으로 진행하기로 확정한 원고입니다.'
      : '최소 1개의 공식·권위 출처가 필요합니다.', 'sources');
  }
  const knownGuidePaths = new Set(db.prepare('SELECT path FROM guides').all().map((row) => row.path));
  for (const link of draft.relatedLinks || []) {
    const pathOnly = String(link.to || '').split('?')[0].replace(/\/$/, '') || '/';
    if (!knownGuidePaths.has(pathOnly) && !STATIC_PATHS.has(pathOnly)) add('error', 'unknown_link', `존재하지 않는 관련 링크입니다: ${link.to}`, 'relatedLinks');
  }
  const linkSet = new Set((draft.relatedLinks || []).map((link) => link.to));
  if (linkSet.size !== (draft.relatedLinks || []).length) add('warning', 'duplicate_links', '관련 링크가 중복됐습니다.', 'relatedLinks');
  if (requireImage && !draft.heroImage?.path) add('error', 'hero_image_required', '승인 전에 대표 이미지를 생성해 선택해야 합니다.', 'heroImage.path');
  if (draft.heroImage?.alt?.trim() === draft.title?.trim()) add('warning', 'hero_alt_matches_title', '대표 이미지 대체텍스트가 제목과 같습니다. 보이는 장면과 소재를 구체적으로 묘사하세요.', 'heroImage.alt');
  if (KOREAN_SEQUENCE.test(String(draft.heroImage?.prompt || ''))) add('warning', 'image_prompt_korean', '대표 이미지 프롬프트에 한글이 포함됐습니다. 피사체·장면·조명을 구체적인 영문으로 다시 작성하세요.', 'heroImage.prompt');
  (draft.sections || []).forEach((section, index) => {
    if (hasSectionNumbering(section.title)) add('error', 'section_title_numbering', `${index + 1}번 소제목의 번호 접두사를 제거하세요. 화면에서 번호를 자동 표시합니다.`, `sections.${index}.title`);
    // 원고 생성 시점에는 이미지 경로가 비어 있는 것이 정상이다. 이미지 단계를 거친 뒤(requireImage)에만 차단한다.
    if (section.image && !section.image.path) {
      add(requireImage ? 'error' : 'warning', 'section_image_missing', requireImage
        ? `${index + 1}번 본문 이미지 파일이 없습니다.`
        : `${index + 1}번 본문 이미지가 아직 생성되지 않았습니다.`, `sections.${index}.image.path`);
    }
    if (section.image?.alt?.trim() === draft.title?.trim() || section.image?.alt?.trim() === section.title?.trim()) {
      add('warning', 'section_alt_duplicate', `${index + 1}번 본문 이미지 대체텍스트가 제목과 같습니다. 해당 장면의 도구·배치·소재를 묘사하세요.`, `sections.${index}.image.alt`);
    }
    if (KOREAN_SEQUENCE.test(String(section.image?.prompt || ''))) add('warning', 'image_prompt_korean', `${index + 1}번 본문 이미지 프롬프트에 한글이 포함됐습니다. 영문 장면 설명으로 다시 작성하세요.`, `sections.${index}.image.prompt`);
  });
  const errors = findings.filter((finding) => finding.severity === 'error').length;
  const warnings = findings.filter((finding) => finding.severity === 'warning').length;
  return { blocking: errors > 0, errors, warnings, score: Math.max(0, 100 - errors * 18 - warnings * 5), findings };
}

function extractProtectedFacts(text) {
  const patterns = [
    /https?:\/\/[^\s)]+/gi,
    /\b(?:14K|18K|24K|585|750|925)\b/gi,
    /\b\d+(?:\.\d+)?\s*(?:g|kg|mm|cm|캐럿|ct|돈|푼|원|만원|%|일|시간)\b/gi,
    /\b\d{4}[-./]\d{1,2}[-./]\d{1,2}\b/g,
    /\b(?:FL|IF|VVS1?|VS1?|SI1?|Excellent|Very Good|Good)\b/gi,
  ];
  return patterns.flatMap((pattern) => String(text || '').match(pattern) || []).map((item) => item.toLowerCase()).sort();
}

function compareProtectedFacts(before, after) {
  const left = extractProtectedFacts(before);
  const right = extractProtectedFacts(after);
  return { pass: JSON.stringify(left) === JSON.stringify(right), before: left, after: right };
}

module.exports = {
  BANNED,
  lintDraft,
  allText,
  visibleTextEntries,
  findUnexpectedHan,
  extractProtectedFacts,
  compareProtectedFacts,
};
