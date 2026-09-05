const test = require('node:test');
const assert = require('node:assert/strict');
const { assertStrictJsonSchema } = require('../server/services/openaiService');
const { guideDraftResponseSchema, evidenceSchema, validateDraft } = require('../server/services/draftSchema');
const { dynamicTopicStrategySchema } = require('../server/services/topicService');
const { auditSchema } = require('../server/services/contentAuditService');
const { evaluationSchema } = require('../server/services/evaluationService');
const { makeDraft } = require('./fixture');

test('OpenAI에 보내는 모든 Structured Outputs 스키마는 strict required 계약을 지킨다', () => {
  const schemas = {
    noblesse_guide_draft: guideDraftResponseSchema,
    noblesse_official_evidence: evidenceSchema,
    noblesse_topic_strategy: dynamicTopicStrategySchema(),
    noblesse_existing_content_audits: auditSchema,
    noblesse_model_evaluation: evaluationSchema,
  };
  for (const [name, schema] of Object.entries(schemas)) {
    assert.equal(assertStrictJsonSchema(schema, name), true, name);
  }
});

test('이미지 응답 메타 필드는 필수·nullable이고 기존 저장 원고는 계속 유효하다', () => {
  const hero = guideDraftResponseSchema.properties.heroImage;
  assert.deepEqual(hero.required, ['path', 'alt', 'caption', 'prompt', 'archetype', 'width', 'height']);
  assert.deepEqual(hero.properties.archetype.type, ['string', 'null']);
  assert.deepEqual(hero.properties.width.type, ['integer', 'null']);
  assert.deepEqual(hero.properties.height.type, ['integer', 'null']);
  assert.equal(validateDraft(makeDraft()), true);
});

test('required가 빠진 스키마는 API 호출 전에 로컬에서 차단한다', () => {
  assert.throws(() => assertStrictJsonSchema({
    type: 'object', additionalProperties: false,
    properties: { title: { type: 'string' } },
  }, 'broken'), /required 누락: title/);
});
