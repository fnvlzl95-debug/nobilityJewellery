const { db } = require('../lib/db');
const { clamp } = require('../lib/utils');

const DUPLICATE_THRESHOLD = 0.78;
const WARNING_THRESHOLD = 0.65;
function jaccard(a, b) {
  const left = tokenSet(a); const right = tokenSet(b);
  if (!left.size || !right.size) return 0;
  const common = [...left].filter(token => right.has(token)).length;
  return common / new Set([...left, ...right]).size;
}

function intentCandidate(value = {}) {
  return { ...value, topic: value.topic || value.title || value.workingTitle || value.keyword || value.primaryKeyword || '',
    primaryKeyword: value.primaryKeyword || value.keyword || value.topic || '',
    keyword: value.keyword || value.primaryKeyword || value.topic || '',
    title: value.title || value.workingTitle || value.topic || '',
    workingTitle: value.workingTitle || value.title || value.topic || '' };
}

// A broad price guide can link to a separate couple-ring price guide. A shared
// generic phrase alone must not merge different products or different tasks.
function differentScope(a, b) {
  const text = v => compactText([v.topic, v.title, v.workingTitle, v.keyword, v.primaryKeyword].filter(Boolean).join(' '));
  const left = text(a), right = text(b);
  const products = ['커플링','돌반지','귀걸이','목걸이','팔찌','티스푼'];
  const pLeft = products.filter(word => left.includes(word));
  const pRight = products.filter(word => right.includes(word));
  if (pLeft.length || pRight.length) {
    if (!pLeft.some(word => pRight.includes(word))) return true;
  }
  const materials = ['진주','루비','사파이어','오팔','에메랄드','다이아','옐로골드','화이트골드'];
  const mLeft = materials.filter(word => left.includes(word));
  const mRight = materials.filter(word => right.includes(word));
  return mLeft.length > 0 && mRight.length > 0 && !mLeft.some(word => mRight.includes(word));
}

const genericTokens = new Set([
  '금', '귀금속', '주얼리', '쥬얼리', '가이드', '총정리', '정리', '기준', '확인', '방법', '추천',
  '보는법', '알아보기', '전', '할', '것', '반지', '목걸이', '팔찌', '귀걸이', '종로',
]);

function normalizeText(value) {
  return String(value || '').toLowerCase()
    .replace(/화이트\s*골드/g, '화이트골드')
    .replace(/랩\s*그로운/g, '랩그로운')
    .replace(/다이아몬드/g, '다이아')
    .replace(/커플\s*(?:반지|링)/g, '커플링')
    .replace(/결혼\s*예물/g, '예물')
    .replace(/주문\s*제작|맞춤\s*제작|커스텀/g, '주문제작')
    .replace(/옐로우\s*골드|옐로\s*골드/g, '옐로골드')
    .replace(/캐럿/g, 'ct')
    .replace(/[^a-z0-9가-힣]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactText(value) {
  return normalizeText(value).replace(/\s+/g, '');
}

function tokenSet(value, { core = false } = {}) {
  const tokens = normalizeText(value).split(' ').filter(Boolean);
  return new Set(core ? tokens.filter((token) => !genericTokens.has(token)) : tokens);
}

function diceCoefficient(a, b) {
  const left = compactText(a);
  const right = compactText(b);
  if (!left && !right) return 0;
  if (left.length < 2 || right.length < 2) return left === right ? 1 : 0;
  const grams = (value) => {
    const result = [];
    for (let i = 0; i < value.length - 1; i++) result.push(value.slice(i, i + 2));
    return result;
  };
  const rightCounts = new Map();
  for (const gram of grams(right)) rightCounts.set(gram, (rightCounts.get(gram) || 0) + 1);
  let common = 0;
  const leftGrams = grams(left);
  for (const gram of leftGrams) {
    const count = rightCounts.get(gram) || 0;
    if (count) { common++; rightCounts.set(gram, count - 1); }
  }
  return (2 * common) / (leftGrams.length + Math.max(1, right.length - 1));
}

function coreCoverage(a, b) {
  const left = tokenSet(a, { core: true });
  const right = tokenSet(b, { core: true });
  if (!left.size || !right.size) return 0;
  let common = 0;
  for (const token of left) if (right.has(token)) common++;
  if (common === 1 && (left.size > 1 || right.size > 1)) {
    return common / Math.max(left.size, right.size);
  }
  return common / Math.min(left.size, right.size);
}

function semanticSimilarity(a, b) {
  const left = compactText(a);
  const right = compactText(b);
  const containment = left.length >= 4 && right.length >= 4 && (left.includes(right) || right.includes(left))
    ? Math.min(left.length, right.length) / Math.max(left.length, right.length)
    : 0;
  const coverage = coreCoverage(a, b);
  return clamp(Math.max(
    jaccard(a, b),
    diceCoefficient(a, b) * 0.9,
    containment >= 0.45 ? 0.72 + containment * 0.22 : containment,
    coverage >= 0.66 ? coverage * 0.9 : coverage * 0.72,
  ), 0, 1);
}

function candidateGuideSimilarity(candidate, guide) {
  candidate = intentCandidate(candidate);
  guide = intentCandidate(guide);
  const primaryToKeyword = semanticSimilarity(candidate.primaryKeyword, guide.keyword);
  const primaryToTitle = semanticSimilarity(candidate.primaryKeyword, guide.title);
  const topicToTitle = semanticSimilarity(candidate.topic, guide.title);
  const titleToTitle = semanticSimilarity(candidate.workingTitle, guide.title);
  const samePrimaryKeyword = Boolean(compactText(candidate.primaryKeyword)) && compactText(candidate.primaryKeyword) === compactText(guide.keyword);
  const sameWorkingTitle = Boolean(compactText(candidate.workingTitle)) && compactText(candidate.workingTitle) === compactText(guide.title);
  const sameTopic = Boolean(compactText(candidate.topic)) && compactText(candidate.topic) === compactText(guide.topic);
  if (samePrimaryKeyword || sameWorkingTitle || sameTopic) return 1;

  // 짧은 대표 검색어가 긴 기존 제목에 포함된 것만으로 중복을 확정하지 않는다.
  // 대표 검색어·전체 주제·작업 제목이 같은 의도를 가리킬 때만 높은 점수를 준다.
  const titleConsensus = primaryToTitle * 0.4 + topicToTitle * 0.3 + titleToTitle * 0.3;
  const keywordTitleAgreement = primaryToKeyword * 0.55 + titleToTitle * 0.45;
  const similarity = clamp(Math.max(titleConsensus, keywordTitleAgreement), 0, 1);
  return differentScope(candidate, guide) ? Math.min(similarity, 0.69) : similarity;
}

function parseJson(value) { try { return typeof value === 'object' ? value || {} : JSON.parse(value || '{}'); } catch (_) { return {}; } }

function activeIntents() {
  return db.prepare("SELECT id, kind, target_slug, topic, status, input_json, draft_json, humanized_json, revision, updated_at FROM generations WHERE archived_at IS NULL AND status NOT IN ('applied', 'cancelled', 'discarded')").all().map(row => {
    const input = parseJson(row.input_json), draft = parseJson(row.humanized_json || row.draft_json);
    const decision = input.topicDecision?.candidate || input.topicDecision || {};
    return { ...row, slug: draft.slug || input.desiredSlug || row.target_slug || '',
      primaryKeyword: draft.keyword || decision.primaryKeyword || row.topic,
      title: draft.title || decision.workingTitle || row.topic,
      workingTitle: draft.title || decision.workingTitle || row.topic,
      targetSlug: row.target_slug, generationId: row.id, kind: 'active' };
  });
}

function findIntentConflicts(candidate, { targetSlug = null, generationId = null, guides, activeGenerations } = {}) {
  const published = guides || db.prepare('SELECT slug, title, keyword FROM guides').all();
  const active = activeGenerations || activeIntents();
  return [...published.map(row => ({ ...row, kind: 'published' })), ...active.map(row => ({ ...row, kind: 'active' }))]
    .filter(row => !(row.kind === 'published' && targetSlug && row.slug === targetSlug))
    .filter(row => !(row.kind === 'active' && generationId != null && Number(row.generationId || row.id) === Number(generationId)))
    .map(row => {
      const sameSlug = Boolean(candidate.slug) && candidate.slug === row.slug;
      const sameTarget = row.kind === 'active' && targetSlug && targetSlug === (row.targetSlug || row.target_slug);
      const similarity = sameSlug || sameTarget ? 1 : candidateGuideSimilarity(candidate, row);
      return { slug: row.slug, title: row.title || row.topic, kind: row.kind, generationId: row.generationId || row.id || null, similarity,
        blocking: similarity >= DUPLICATE_THRESHOLD,
        reason: sameSlug || sameTarget ? '같은 글 경로를 이미 사용 중입니다.' : '검색 의도가 겹칩니다.' };
    }).filter(row => row.similarity >= WARNING_THRESHOLD).sort((a, b) => b.similarity - a.similarity);
}

function assertUniqueIntent(candidate, options = {}) {
  const conflicts = findIntentConflicts(candidate, options).filter(row => row.blocking);
  if (conflicts.length) throw Object.assign(new Error(`기존 글 또는 진행 작업 “${conflicts[0].title}”과 중복됩니다. 기존 작업을 열거나 검색 의도를 구분해 주세요.`), { status: 409, code: 'DUPLICATE_INTENT', conflicts });
}

module.exports = { DUPLICATE_THRESHOLD, WARNING_THRESHOLD, normalizeText, compactText, jaccard, semanticSimilarity, candidateGuideSimilarity, intentCandidate, differentScope, activeIntents, findIntentConflicts, assertUniqueIntent };
