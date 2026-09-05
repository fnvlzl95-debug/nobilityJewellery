const { db, getSetting } = require('../lib/db');
const { getCredentials, ALLOWED_MODELS } = require('./settingsService');
const { config } = require('../lib/config');
const { nowIso } = require('../lib/utils');
const log = require('../lib/logger');
const jobs = require('./jobService');

const TEXT_TIMEOUT_MS = 120000;
const IMAGE_TIMEOUT_MS = 180000;
const MAX_RETRIES = 2;

function extractText(data) {
  if (typeof data.output_text === 'string' && data.output_text) return data.output_text;
  for (const item of data.output || []) {
    if (item.type !== 'message') continue;
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) return content.text;
      if (content.type === 'refusal') {
        const error = new Error(`모델이 요청을 거부했습니다: ${content.refusal || '사유 없음'}`);
        error.code = 'MODEL_REFUSAL';
        throw error;
      }
    }
  }
  throw new Error('OpenAI 응답에서 텍스트를 찾지 못했습니다');
}

async function fetchWithTimeout(url, options, timeoutMs) {
  jobs.throwIfCancelled();
  const controller = new AbortController();
  const parent = jobs.getJobSignal();
  const abort = () => controller.abort(parent.reason);
  parent?.addEventListener('abort', abort, { once: true });
  if (parent?.aborted) abort();
  const timer = setTimeout(() => controller.abort(Object.assign(new Error('OpenAI 응답 본문 수신 시간 초과'), { name: 'AbortError' })), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    // The deadline includes reading the complete response body, not just its headers.
    const text = await response.text();
    jobs.throwIfCancelled();
    return { ok: response.ok, status: response.status, text: async () => text, json: async () => JSON.parse(text) };
  } finally { clearTimeout(timer); parent?.removeEventListener('abort', abort); }
}

function classifyError(status, text) {
  const message = String(text || '').slice(0, 700);
  const error = new Error(`OpenAI ${status}: ${message || '요청 실패'}`);
  error.status = status;
  error.retryable = status === 429 || status >= 500;
  error.transportFailure = [401, 403, 429].includes(status) || status >= 500;
  return error;
}

function modelConfig(model) {
  if (!ALLOWED_MODELS.has(model)) throw new Error(`허용되지 않은 원고 모델입니다: ${model}`);
  return { model, effort: model === 'gpt-5.6-terra' ? 'medium' : 'low' };
}

function assertStrictJsonSchema(schema, schemaName = 'response') {
  const visit = (node, path = '$') => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if (node.type === 'object' && node.properties) {
      const keys = Object.keys(node.properties);
      const required = Array.isArray(node.required) ? node.required : [];
      const missing = keys.filter((key) => !required.includes(key));
      const unknown = required.filter((key) => !keys.includes(key));
      if (missing.length || unknown.length) {
        const details = [
          missing.length ? `required 누락: ${missing.join(', ')}` : '',
          unknown.length ? `properties에 없는 required: ${unknown.join(', ')}` : '',
        ].filter(Boolean).join(' / ');
        throw new Error(`OpenAI Structured Outputs 스키마 오류 (${schemaName} ${path}): ${details}`);
      }
      for (const [key, child] of Object.entries(node.properties)) visit(child, `${path}.properties.${key}`);
    }
    if (node.items) visit(node.items, `${path}.items`);
    for (const keyword of ['anyOf', 'oneOf', 'allOf']) {
      for (const [index, child] of (node[keyword] || []).entries()) visit(child, `${path}.${keyword}[${index}]`);
    }
    for (const keyword of ['$defs', 'definitions']) {
      for (const [key, child] of Object.entries(node[keyword] || {})) visit(child, `${path}.${keyword}.${key}`);
    }
  };
  visit(schema);
  return true;
}

async function completeJson({ generationId = null, stage, model, effort, instructions, input, schemaName, schema, tools = [], fallbackReason = null, maxOutputTokens = 16000 }) {
  assertStrictJsonSchema(schema, schemaName);
  const credentials = getCredentials();
  if (!credentials.openaiKey) throw new Error('OpenAI API 키가 설정되지 않았습니다');
  const selected = modelConfig(model || getSetting('openai_model', config.defaultModel));
  const reasoningEffort = effort || selected.effort;
  const body = {
    model: selected.model,
    instructions,
    input,
    max_output_tokens: maxOutputTokens,
    reasoning: { effort: reasoningEffort },
    text: { verbosity: 'medium', format: { type: 'json_schema', name: schemaName, schema, strict: true } },
    store: false,
  };
  if (tools.length) {
    body.tools = tools;
    body.tool_choice = 'auto';
  }
  const started = Date.now();
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      jobs.consumeCall(stage, 'text');
      jobs.event('provider-attempt', { providerStage: stage, model: selected.model, attempt, maxAttempts: MAX_RETRIES });
      const response = await fetchWithTimeout(`${credentials.openaiBase.replace(/\/$/, '')}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${credentials.openaiKey}` },
        body: JSON.stringify(body),
      }, TEXT_TIMEOUT_MS);
      if (!response.ok) throw classifyError(response.status, await response.text().catch(() => ''));
      const data = await response.json();
      if (data.status === 'incomplete') {
        const error = new Error(`OpenAI 응답이 불완전합니다: ${data.incomplete_details?.reason || 'unknown'}`);
        error.retryable = data.incomplete_details?.reason !== 'max_output_tokens';
        throw error;
      }
      jobs.recordUsage(data.usage);
      const raw = extractText(data);
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch (error) {
        const parseError = new Error(`구조화 응답 JSON 파싱 실패: ${error.message}`);
        parseError.raw = raw;
        throw parseError;
      }
      db.prepare(`
        INSERT INTO model_runs (generation_id, stage, requested_model, effective_model, reasoning_effort, fallback_reason, status, usage_json, latency_ms, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'done', ?, ?, ?)
      `).run(generationId, stage, selected.model, data.model || selected.model, reasoningEffort, fallbackReason, JSON.stringify(data.usage || null), Date.now() - started, nowIso());
      return { parsed, raw, usage: data.usage || null, model: data.model || selected.model };
    } catch (error) {
      lastError = error;
      jobs.event('provider-error', { attempt, message: log.sanitize(error.message), code: error.code || error.name });
      if (jobs.getJobSignal()?.aborted || ['JOB_BUDGET_EXCEEDED', 'JOB_CANCELLED', 'JOB_DEADLINE'].includes(error.code)) break;
      const retryable = error.retryable || error.name === 'AbortError' || /fetch failed|ECONNRESET|ETIMEDOUT/i.test(error.message);
      if (!retryable || attempt === MAX_RETRIES) break;
      const delay = 1200 * attempt;
      log.warn('openai', `${stage} ${selected.model} 호출 재시도 ${attempt}/${MAX_RETRIES}: ${error.message}`);
      jobs.event('provider-retry', { providerStage: stage, attempt, delayMs: delay });
      await jobs.wait(delay);
    }
  }
  db.prepare(`
    INSERT INTO model_runs (generation_id, stage, requested_model, reasoning_effort, fallback_reason, status, latency_ms, error, created_at)
    VALUES (?, ?, ?, ?, ?, 'error', ?, ?, ?)
  `).run(generationId, stage, selected.model, reasoningEffort, fallbackReason, Date.now() - started, lastError?.message || 'unknown', nowIso());
  if (lastError && /fetch failed|ECONNRESET|ETIMEDOUT/i.test(lastError.message || '')) {
    lastError.transportFailure = true;
  }
  throw lastError;
}

async function generateImage({ generationId, prompt, quality = 'medium', size = '1536x1024' }) {
  const credentials = getCredentials();
  if (!credentials.openaiKey) throw new Error('OpenAI API 키가 설정되지 않았습니다');
  const model = getSetting('openai_image_model', config.imageModel);
  const body = {
    model,
    prompt,
    n: 1,
    quality: ['low', 'medium', 'high', 'auto'].includes(quality) ? quality : 'medium',
    size: ['1024x1024', '1536x1024', '1024x1536', 'auto'].includes(size) ? size : '1536x1024',
    output_format: 'jpeg',
    output_compression: 88,
  };
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      jobs.consumeCall('image', 'image');
      jobs.event('provider-attempt', { providerStage: 'image', model, attempt, maxAttempts: MAX_RETRIES });
      const response = await fetchWithTimeout(`${credentials.openaiBase.replace(/\/$/, '')}/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${credentials.openaiKey}` },
        body: JSON.stringify(body),
      }, IMAGE_TIMEOUT_MS);
      if (!response.ok) throw classifyError(response.status, await response.text().catch(() => ''));
      const data = await response.json();
      jobs.recordUsage(data.usage);
      const image = data?.data?.[0]?.b64_json;
      if (!image) throw new Error('이미지 응답에 파일 데이터가 없습니다');
      return { buffer: Buffer.from(image, 'base64'), model, usage: data.usage || null };
    } catch (error) {
      lastError = error;
      jobs.event('provider-error', { attempt, message: log.sanitize(error.message), code: error.code || error.name });
      if (jobs.getJobSignal()?.aborted || ['JOB_BUDGET_EXCEEDED', 'JOB_CANCELLED', 'JOB_DEADLINE'].includes(error.code)) break;
      const retryable = error.retryable || error.name === 'AbortError' || /fetch failed|ECONNRESET|ETIMEDOUT/i.test(error.message);
      if (!retryable || attempt === MAX_RETRIES) break;
      jobs.event('provider-retry', { providerStage: 'image', attempt, delayMs: 2000 * attempt });
      await jobs.wait(2000 * attempt);
    }
  }
  throw lastError;
}

module.exports = { fetchWithTimeout, completeJson, generateImage, extractText, modelConfig, classifyError, assertStrictJsonSchema };
