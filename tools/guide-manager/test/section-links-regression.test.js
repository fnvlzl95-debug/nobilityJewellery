const test = require('node:test');
const assert = require('node:assert/strict');
const { makeDraft } = require('./fixture');
const { validateDraft, schemaErrors, guideDraftResponseSchema } = require('../server/services/draftSchema');
const { renderNewGuide, patchExistingGuide } = require('../server/services/rendererService');
const { extractGuideContent } = require('../server/services/contentExtractorService');

test('contextual section links survive schema validation, Vue rendering and source re-extraction', () => {
  const draft = makeDraft();
  const links = [{ to: '/gallery/rose-gold-heart-pave-eternity-ring', label: '에타니티 반지의 공개 사진' }];
  draft.sections[0].links = links;
  assert.equal(validateDraft(draft), true, schemaErrors(validateDraft).join('\n'));
  const rendered = renderNewGuide(draft);
  assert.match(rendered, /links\?: \{ to: string; label: string \}\[\]/);
  const patched = patchExistingGuide(rendered, { ...draft, description: '상담 전 확인할 세팅 범위를 안내합니다.' });
  assert.deepEqual(extractGuideContent({ slug: draft.slug }, patched).sections[0].links, links);
  assert.ok(guideDraftResponseSchema.properties.sections.items.required.includes('links'));
});

test('old drafts remain valid and new section links cannot become external protocol-relative URLs', () => {
  const draft = makeDraft();
  assert.equal(validateDraft(draft), true);
  draft.sections[0].links = [{ to: '//example.com', label: '외부 링크' }];
  assert.equal(validateDraft(draft), false);
});
