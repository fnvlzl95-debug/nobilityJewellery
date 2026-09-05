const test = require('node:test');
const assert = require('node:assert/strict');
const { executeWriterPolicy } = require('../server/services/generationService');
const { modelConfig, classifyError } = require('../server/services/openaiService');
const { lintDraft } = require('../server/services/lintService');
const { makeDraft } = require('./fixture');

const generation = { id: 1, target_slug: null };
const blocking = (message = '차단') => ({ blocking: true, findings: [{ severity: 'error', message }] });
const pass = { blocking: false, findings: [] };

test('Luna low가 기본이고 Terra medium만 보완 모델로 허용된다', () => {
  assert.deepEqual(modelConfig('gpt-5.6-luna'), { model: 'gpt-5.6-luna', effort: 'low' });
  assert.deepEqual(modelConfig('gpt-5.6-terra'), { model: 'gpt-5.6-terra', effort: 'medium' });
  assert.throws(() => modelConfig('gpt-5.6-sol'), /허용되지 않은/);
});

test('Luna 초안과 1회 수정이 모두 차단되면 Terra를 정확히 한 번 호출한다', async () => {
  const calls = [];
  const lints = [blocking('첫 오류'), blocking('같은 오류'), pass];
  const result = await executeWriterPolicy({
    generation,
    write: async (_, options) => { calls.push(options); return { attempt: calls.length }; },
    inspect: () => lints.shift(),
  });
  assert.equal(result.lint.blocking, false);
  assert.deepEqual(calls.map((call) => call.model), ['gpt-5.6-luna', 'gpt-5.6-luna', 'gpt-5.6-terra']);
  assert.equal(calls[2].fallbackReason, 'luna_blocking_after_repair');
});

test('인증·할당량·네트워크 계열 오류는 Terra fallback으로 넘기지 않는다', async () => {
  const calls = [];
  const authError = classifyError(401, 'invalid key');
  await assert.rejects(() => executeWriterPolicy({
    generation,
    write: async (_, options) => { calls.push(options); throw authError; },
    inspect: () => pass,
  }), /OpenAI 401/);
  assert.deepEqual(calls.map((call) => call.model), ['gpt-5.6-luna']);
});

test('사용자가 Terra 재생성을 선택하면 Terra만 한 번 호출한다', async () => {
  const calls = [];
  await executeWriterPolicy({
    generation,
    forceModel: 'gpt-5.6-terra',
    write: async (_, options) => { calls.push(options); return {}; },
    inspect: () => pass,
  });
  assert.deepEqual(calls.map((call) => call.model), ['gpt-5.6-terra']);
});

test('중국어 혼입 차단 오류는 Luna 자동 수정 요청에 전달된다', async () => {
  const calls = [];
  const clean = makeDraft();
  const mixed = makeDraft({
    sources: clean.sources.map((source) => ({ ...source, note: `미국 보석\u884c\u4e1a 협회의 공식 안내입니다.` })),
  });
  const result = await executeWriterPolicy({
    generation,
    write: async (_, options) => {
      calls.push(options);
      return calls.length === 1 ? mixed : clean;
    },
    inspect: lintDraft,
  });
  assert.equal(result.lint.blocking, false);
  assert.deepEqual(calls.map((call) => call.model), ['gpt-5.6-luna', 'gpt-5.6-luna']);
  assert.ok(calls[1].errors.some((message) => message.includes('\u884c\u4e1a')));
});
