const Ajv = require('ajv');

const string = { type: 'string' };
const nonEmpty = { type: 'string', minLength: 1 };
const tableSchema = {
  type: 'object', additionalProperties: false, required: ['headers', 'rows'],
  properties: {
    headers: { type: 'array', minItems: 2, maxItems: 6, items: nonEmpty },
    rows: { type: 'array', minItems: 1, maxItems: 10, items: { type: 'array', minItems: 2, maxItems: 6, items: nonEmpty } },
  },
};

const imageSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['path', 'alt', 'caption', 'prompt'],
  properties: {
    path: string, alt: nonEmpty, caption: string, prompt: nonEmpty,
    archetype: { type: 'string' }, width: { type: 'integer', minimum: 1 }, height: { type: 'integer', minimum: 1 },
  },
};

// Structured Outputs의 strict 모드는 properties에 선언한 모든 키를 required에
// 포함해야 한다. 내부 저장 원고는 이전 버전과 호환되도록 메타 필드를 선택값으로
// 두고, 모델 응답 계약에서만 null 허용 필수값으로 받는다.
const responseImageSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['path', 'alt', 'caption', 'prompt', 'archetype', 'width', 'height'],
  properties: {
    path: string, alt: nonEmpty, caption: string, prompt: nonEmpty,
    archetype: { type: ['string', 'null'] },
    width: { type: ['integer', 'null'], minimum: 1 },
    height: { type: ['integer', 'null'], minimum: 1 },
  },
};

const guideDraftSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'slug', 'title', 'description', 'lead', 'category', 'keyword', 'inquiryType', 'inquiryTopic',
    'publishedAt', 'updatedAt', 'heroImage', 'quickAnswers', 'sections', 'cautions', 'faqItems',
    'relatedLinks', 'sourceNote', 'sources',
  ],
  properties: {
    slug: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
    title: nonEmpty,
    description: nonEmpty,
    lead: nonEmpty,
    category: { enum: ['가격', '비용', '기간', '수리', '관리', '선택', '소재·보석', '주문'] },
    keyword: nonEmpty,
    inquiryType: { enum: ['custom', 'repair', 'wholesale', 'other'] },
    inquiryTopic: nonEmpty,
    publishedAt: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    updatedAt: { type: 'string', pattern: '^(?:|\\d{4}-\\d{2}-\\d{2})$' },
    heroImage: imageSchema,
    quickAnswers: { type: 'array', minItems: 3, maxItems: 3, items: nonEmpty },
    sections: {
      type: 'array', minItems: 3, maxItems: 7,
      items: {
        type: 'object', additionalProperties: false, required: ['title', 'paragraphs', 'bullets', 'image'],
        properties: {
          title: nonEmpty,
          paragraphs: { type: 'array', minItems: 1, maxItems: 5, items: nonEmpty },
          // Existing birthstone guides legitimately enumerate all twelve months.
          bullets: { type: 'array', maxItems: 12, items: nonEmpty },
          image: { anyOf: [{ type: 'null' }, imageSchema] },
          table: { anyOf: [{ type: 'null' }, tableSchema] },
        },
      },
    },
    cautions: { type: 'array', minItems: 2, maxItems: 6, items: nonEmpty },
    faqItems: {
      type: 'array', minItems: 3, maxItems: 5,
      items: {
        type: 'object', additionalProperties: false, required: ['question', 'answer'],
        properties: { question: nonEmpty, answer: nonEmpty },
      },
    },
    relatedLinks: {
      type: 'array', minItems: 3, maxItems: 8,
      items: {
        type: 'object', additionalProperties: false, required: ['to', 'label', 'description'],
        properties: { to: { type: 'string', pattern: '^/' }, label: nonEmpty, description: nonEmpty },
      },
    },
    sourceNote: nonEmpty,
    sources: {
      type: 'array', minItems: 1, maxItems: 12,
      items: {
        type: 'object', additionalProperties: false, required: ['label', 'url', 'note', 'official'],
        properties: { label: nonEmpty, url: { type: 'string', pattern: '^https://' }, note: string, official: { type: 'boolean' } },
      },
    },
  },
};

const guideDraftResponseSchema = structuredClone(guideDraftSchema);
guideDraftResponseSchema.properties.heroImage = responseImageSchema;
guideDraftResponseSchema.properties.sections.items.properties.image = {
  anyOf: [{ type: 'null' }, responseImageSchema],
};
guideDraftResponseSchema.properties.sections.items.required.push('table');

const evidenceSchema = {
  type: 'object', additionalProperties: false, required: ['topic', 'summary', 'sources', 'claims'],
  properties: {
    topic: nonEmpty,
    summary: nonEmpty,
    sources: {
      type: 'array', minItems: 1, maxItems: 10,
      items: {
        type: 'object', additionalProperties: false,
        required: ['label', 'url', 'domain', 'official', 'reason', 'selected'],
        properties: { label: nonEmpty, url: { type: 'string', pattern: '^https://' }, domain: nonEmpty, official: { type: 'boolean' }, reason: nonEmpty, selected: { type: 'boolean' } },
      },
    },
    claims: {
      type: 'array', minItems: 1, maxItems: 20,
      items: {
        type: 'object', additionalProperties: false,
        required: ['claim', 'sourceUrls', 'confidence'],
        properties: { claim: nonEmpty, sourceUrls: { type: 'array', minItems: 1, items: { type: 'string', pattern: '^https://' } }, confidence: { enum: ['high', 'medium', 'low'] } },
      },
    },
  },
};

const ajv = new Ajv({ allErrors: true, strict: false });
const validateDraftShape = ajv.compile(guideDraftSchema);
function validateDraft(draft) {
  const valid = validateDraftShape(draft);
  validateDraft.errors = [...(validateDraftShape.errors || [])];
  if (valid) (draft.sections || []).forEach((section, index) => {
    if (section.table && section.table.rows.some(row => row.length !== section.table.headers.length)) validateDraft.errors.push({ instancePath: `/sections/${index}/table/rows`, message: '각 행의 셀 수가 표 제목 열 수와 같아야 합니다' });
  });
  return valid && !validateDraft.errors.length;
}
const validateEvidence = ajv.compile(evidenceSchema);

function schemaErrors(validate) {
  return (validate.errors || []).map((error) => `${error.instancePath || '/'} ${error.message}`);
}

module.exports = {
  guideDraftSchema, guideDraftResponseSchema, evidenceSchema,
  validateDraft, validateEvidence, schemaErrors,
};
