const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const { db } = require('../lib/db');
const { config } = require('../lib/config');
const { nowIso } = require('../lib/utils');
const { generateImage } = require('./openaiService');
const { getGeneration, updateGeneration } = require('./generationService');
const { assertUpdatePolicy } = require('./updatePolicyService');

function safeSlug(value) {
  return String(value || '').replace(/[^a-z0-9-]/g, '');
}

function bufferHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 8);
}

function hashedFileName(slug, slot, buffer) {
  return `${safeSlug(slug)}-${slot}-${bufferHash(buffer)}.webp`;
}

const IMAGE_ARCHETYPES = [
  { id: 'product-closeup', scene: 'A precise macro product close-up with shallow depth of field', palette: 'charcoal stone with restrained warm highlights' },
  { id: 'comparison-layout', scene: 'A clear side-by-side comparison of two or three jewelry pieces at the same scale', palette: 'light neutral linen with soft daylight' },
  { id: 'measurement-tools', scene: 'A practical measurement scene with a jeweler gauge, ruler, caliper, or scale', palette: 'brushed metal work surface with neutral task lighting' },
  { id: 'craft-process', scene: 'An authentic jewelry making process close-up with skilled hands and real bench tools', palette: 'warm oak jeweler workbench with directional workshop light' },
  { id: 'wear-context', scene: 'A natural wearing-context detail showing proportion and fit without revealing a face', palette: 'soft warm-gray background with natural skin tones' },
];

function preferredArchetype(text, slot = 'section') {
  const value = String(text || '');
  if (/(가격|비용|차이|비교|14K|18K|종류|등급|선택)/i.test(value)) return 'comparison-layout';
  if (/(사이즈|길이|무게|중량|측정|재는|각인|확인)/i.test(value)) return 'measurement-tools';
  if (/(제작|수리|과정|세팅|도금|광택|세척|교체|방법|순서)/i.test(value)) return 'craft-process';
  if (/(착용|선물|스타일|어울|피부|손가락|목선)/i.test(value)) return 'wear-context';
  return slot === 'hero' ? 'product-closeup' : null;
}

function recentArchetypeCounts(limit = 10) {
  const counts = new Map(IMAGE_ARCHETYPES.map((item) => [item.id, 0]));
  const rows = db.prepare(`
    SELECT ia.archetype FROM image_assets ia
    JOIN applies a ON a.generation_id=ia.generation_id AND a.state='done'
    WHERE ia.status='active' AND ia.archetype IS NOT NULL
    ORDER BY COALESCE(a.finished_at, a.created_at) DESC, ia.id DESC LIMIT ?
  `).all(limit);
  for (const row of rows) if (counts.has(row.archetype)) counts.set(row.archetype, counts.get(row.archetype) + 1);
  return counts;
}

function chooseArchetype({ generationId = null, slot = 'section', context = '', requested = '' } = {}) {
  const valid = new Set(IMAGE_ARCHETYPES.map((item) => item.id));
  // Content intent outranks visual variety. A second close-up must not silently
  // turn into a comparison scene just because the first slot used the same style.
  if (valid.has(requested)) return requested;
  const used = generationId ? new Set(db.prepare(`
    SELECT archetype FROM image_assets
    WHERE generation_id=? AND status='active' AND archetype IS NOT NULL AND slot<>?
  `).all(generationId, slot).map((row) => row.archetype)) : new Set();
  const preferred = preferredArchetype(context, slot);
  const counts = recentArchetypeCounts();
  return IMAGE_ARCHETYPES
    .map((item, index) => ({
      ...item,
      score: (used.has(item.id) ? 100 : 0) + (counts.get(item.id) || 0) * 10 + (item.id === preferred ? -25 : 0) + index * 0.01,
    }))
    .sort((a, b) => a.score - b.score)[0].id;
}

function archetypePrompt(archetype) {
  const item = IMAGE_ARCHETYPES.find((entry) => entry.id === archetype) || IMAGE_ARCHETYPES[0];
  return `${item.scene}. Surface and lighting: ${item.palette}.`;
}

function composeImagePrompt(basePrompt, archetype) {
  let base = String(basePrompt || '').trim();
  // Old planned/regenerated prompts may already contain one or several scene
  // additions. Replace only known generated additions, preserving authored text.
  for (const item of IMAGE_ARCHETYPES) {
    for (const fragment of [archetypePrompt(item.id), `${item.scene}.`, `Surface and lighting: ${item.palette}.`]) {
      base = base.split(fragment).join(' ');
    }
  }
  const quality = 'Premium editorial jewelry photography for a Korean jewelry knowledge guide with accurate, realistic materials.';
  const exclusions = 'No logos, no text, no letters, no watermark, no collage, and no UI frame.';
  base = base.split(quality).join(' ').split(exclusions).join(' ').replace(/\s+/g, ' ').trim();
  return [base, archetypePrompt(archetype), quality, exclusions].join(' ');
}

async function optimizeWebp(buffer, targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const info = await sharp(buffer).rotate().webp({ quality: 86, effort: 5 }).toFile(targetPath);
  if (info.format !== 'webp') throw new Error('WebP 최적화 결과를 확인할 수 없습니다');
  return { path: targetPath, format: info.format, width: info.width, height: info.height };
}

async function generateSlot(generationId, { slot = 'hero', sectionIndex = null, prompt = '', altText = '', caption = '', archetype = '' } = {}) {
  const generation = getGeneration(generationId);
  const draft = JSON.parse(JSON.stringify(generation?.humanized || generation?.draft || null));
  if (!draft) throw new Error('이미지를 연결할 원고가 없습니다');
  const policy = assertUpdatePolicy(generation, { draft, phase: 'image' });
  if (policy && (slot === 'hero' ? policy.scope.preserveHero ?? policy.scope.preserveImages : policy.scope.preserveBodyImages ?? policy.scope.preserveImages)) {
    throw Object.assign(new Error('이 수정 범위는 기존 이미지를 보존합니다. 이미지 변경을 포함한 새 계획을 확정한 뒤 생성해 주세요.'), { status: 422, code: 'IMAGE_SCOPE_PROTECTED' });
  }
  if (slot !== 'hero' && !/^section-\d+$/.test(slot)) throw new Error('이미지 슬롯 형식이 올바르지 않습니다');
  if (slot !== 'hero') {
    sectionIndex = Number(sectionIndex);
    if (!Number.isInteger(sectionIndex) || !draft.sections?.[sectionIndex]) throw new Error('본문 섹션을 찾을 수 없습니다');
  }
  const plan = slot === 'hero' ? draft.heroImage : (draft.sections[sectionIndex].image || {});
  const basePrompt = String(prompt || plan.prompt || '').trim();
  if (!basePrompt) throw new Error('이미지 프롬프트가 필요합니다');
  const selectedArchetype = chooseArchetype({
    generationId, slot, context: `${generation.topic} ${slot === 'hero' ? draft.title : draft.sections[sectionIndex]?.title}`, requested: archetype || plan.archetype,
  });
  const finalPrompt = composeImagePrompt(basePrompt, selectedArchetype);
  const stamp = nowIso();
  const insert = db.prepare(`
    INSERT INTO image_assets (generation_id, slot, section_index, prompt, alt_text, caption, archetype, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'generating', ?, ?)
  `).run(generationId, slot, slot === 'hero' ? null : sectionIndex, finalPrompt, altText || plan.alt || draft.title, caption || plan.caption || '', selectedArchetype, stamp, stamp);
  const imageId = Number(insert.lastInsertRowid);
  try {
    const requestedSize = slot === 'hero' ? '1536x1024' : '1024x1024';
    const generated = await generateImage({ generationId, prompt: finalPrompt, quality: 'medium', size: requestedSize });
    const dir = path.join(config.dataDir, 'images', String(generationId));
    fs.mkdirSync(dir, { recursive: true });
    const slug = safeSlug(draft.slug);
    const contentHash = bufferHash(generated.buffer);
    const fileName = hashedFileName(slug, slot, generated.buffer);
    const localPath = path.join(dir, fileName);
    const optimized = await optimizeWebp(generated.buffer, localPath);
    const publicPath = `/Image/guide/${fileName}`;
    db.prepare(`UPDATE image_assets SET status='active', local_path=?, public_path=?, model=?, usage_json=?, content_hash=?, width=?, height=?, updated_at=? WHERE id=?`)
      .run(localPath, publicPath, generated.model, JSON.stringify(generated.usage || null), contentHash, optimized.width, optimized.height, nowIso(), imageId);
    db.prepare(`UPDATE image_assets SET status='superseded', updated_at=? WHERE generation_id=? AND slot=? AND id<>? AND status='active'`)
      .run(nowIso(), generationId, slot, imageId);
    const imageValue = {
      path: publicPath, alt: altText || plan.alt || draft.title, caption: caption || plan.caption || '', prompt: finalPrompt,
      archetype: selectedArchetype, width: optimized.width, height: optimized.height,
    };
    if (slot === 'hero') draft.heroImage = imageValue;
    else draft.sections[sectionIndex].image = imageValue;
    const field = generation.humanized ? 'humanized_json' : 'draft_json';
    updateGeneration(generationId, { [field]: JSON.stringify(draft), status: generation.status === 'approved' ? 'review' : generation.status, approved_at: null });
    return { ...db.prepare('SELECT * FROM image_assets WHERE id=?').get(imageId), previewUrl: `/generated-images/${generationId}/${fileName}` };
  } catch (error) {
    db.prepare(`UPDATE image_assets SET status='error', error=?, updated_at=? WHERE id=?`).run(error.message, nowIso(), imageId);
    throw error;
  }
}

function listImages(generationId) {
  return db.prepare(`
    SELECT id, slot, section_index AS sectionIndex, prompt, alt_text AS altText, caption,
      public_path AS publicPath, archetype, content_hash AS contentHash, width, height,
      status, model, error, created_at AS createdAt, updated_at AS updatedAt
    FROM image_assets WHERE generation_id=? ORDER BY id DESC
  `).all(generationId).map((row) => ({
    ...row,
    previewUrl: row.publicPath && row.status === 'active'
      ? `/generated-images/${generationId}/${path.basename(row.publicPath)}` : null,
  }));
}

module.exports = {
  IMAGE_ARCHETYPES, preferredArchetype, recentArchetypeCounts, chooseArchetype, archetypePrompt, composeImagePrompt,
  bufferHash, hashedFileName, generateSlot, listImages, optimizeWebp,
};
