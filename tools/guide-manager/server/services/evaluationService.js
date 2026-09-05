const { db } = require('../lib/db');
const { nowIso } = require('../lib/utils');
const { completeJson } = require('./openaiService');
const { getGuide } = require('./inventoryService');

const SAMPLE_SLUGS = [
  'gold-one-don-gram',
  'platinum-vs-white-gold-difference',
  'necklace-bracelet-chain-repair',
  'wedding-jewelry-set-composition',
  'gemstone-mohs-hardness-guide',
];

const evaluationSchema = {
  type: 'object', additionalProperties: false,
  required: ['title', 'description', 'quickAnswers', 'outline', 'caution'],
  properties: {
    title: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    quickAnswers: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string', minLength: 1 } },
    outline: { type: 'array', minItems: 3, maxItems: 6, items: { type: 'string', minLength: 1 } },
    caution: { type: 'string', minLength: 1 },
  },
};

function score(output, keyword) {
  let value = 0;
  if (output.title.length >= 15 && output.title.length <= 62) value += 20;
  if (output.title.includes(keyword) || keyword.split(/\s+/).some((token) => token.length > 1 && output.title.includes(token))) value += 15;
  if (output.description.length >= 55 && output.description.length <= 175) value += 20;
  if (output.quickAnswers.length === 3) value += 15;
  if (output.outline.length >= 3 && output.outline.length <= 6) value += 15;
  if (/(확인|상태|경우|따라|주의)/.test(output.caution)) value += 15;
  return value;
}

function batchSummary(batchId = null) {
  const selected = batchId || db.prepare('SELECT batch_id AS batchId FROM model_evaluations ORDER BY id DESC LIMIT 1').get()?.batchId;
  if (!selected) return { batchId: null, rows: [], models: [] };
  const rows = db.prepare(`
    SELECT id, batch_id AS batchId, guide_slug AS guideSlug, topic, model, schema_ok AS schemaOk,
      quality_score AS qualityScore, usage_json AS usageJson, latency_ms AS latencyMs, error, created_at AS createdAt
    FROM model_evaluations WHERE batch_id=? ORDER BY guide_slug, model
  `).all(selected).map((row) => ({ ...row, schemaOk: !!row.schemaOk, usage: JSON.parse(row.usageJson || 'null'), usageJson: undefined }));
  const models = ['gpt-5.6-luna', 'gpt-5.6-terra'].map((model) => {
    const group = rows.filter((row) => row.model === model);
    const done = group.filter((row) => row.schemaOk);
    const average = (key) => done.length ? done.reduce((sum, row) => sum + Number(row[key] || 0), 0) / done.length : null;
    const inputTokens = done.reduce((sum, row) => sum + Number(row.usage?.input_tokens || 0), 0);
    const outputTokens = done.reduce((sum, row) => sum + Number(row.usage?.output_tokens || 0), 0);
    return { model, total: group.length, success: done.length, schemaSuccessRate: group.length ? done.length / group.length : 0, avgQuality: average('qualityScore'), avgLatencyMs: average('latencyMs'), inputTokens, outputTokens };
  });
  return { batchId: selected, rows, models, note: '자동 구조·안전 휴리스틱 비교이며 최종 문체와 사실성은 운영자가 직접 검토합니다.' };
}

async function runBenchmark() {
  const batchId = `benchmark-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  for (const slug of SAMPLE_SLUGS) {
    const guide = getGuide(slug);
    if (!guide) continue;
    for (const model of ['gpt-5.6-luna', 'gpt-5.6-terra']) {
      const started = Date.now();
      try {
        const result = await completeJson({
          stage: `benchmark_${slug}`,
          model,
          effort: model === 'gpt-5.6-terra' ? 'medium' : 'low',
          schemaName: 'noblesse_model_evaluation',
          schema: evaluationSchema,
          maxOutputTokens: 2500,
          instructions: [
            '귀족 귀금속 정보 가이드의 제목·설명·빠른 답변·목차 후보를 만듭니다.',
            '제공된 기존 메타 정보 밖의 가격, 기간, 수리 가능성, 인증, 보석 등급을 새로 만들지 마세요.',
            'quickAnswers는 정확히 3개이며 과장·보장 표현을 쓰지 마세요.',
            '이 결과는 모델 비교용이며 실제 게시에는 사용하지 않습니다.',
          ].join('\n'),
          input: `기존 제목: ${guide.title}\n대표 검색어: ${guide.keyword}\n기존 설명: ${guide.description}\n같은 검색 의도를 유지하되 더 직접적이고 읽기 쉬운 후보를 제안하세요.`,
        });
        db.prepare(`
          INSERT INTO model_evaluations (batch_id, guide_slug, topic, model, schema_ok, quality_score, response_json, usage_json, latency_ms, created_at)
          VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?)
        `).run(batchId, slug, guide.keyword, model, score(result.parsed, guide.keyword), JSON.stringify(result.parsed), JSON.stringify(result.usage || null), Date.now() - started, nowIso());
      } catch (error) {
        db.prepare(`
          INSERT INTO model_evaluations (batch_id, guide_slug, topic, model, schema_ok, quality_score, latency_ms, error, created_at)
          VALUES (?, ?, ?, ?, 0, 0, ?, ?, ?)
        `).run(batchId, slug, guide.keyword, model, Date.now() - started, error.message, nowIso());
      }
    }
  }
  return batchSummary(batchId);
}

module.exports = { SAMPLE_SLUGS, evaluationSchema, score, runBenchmark, batchSummary };
