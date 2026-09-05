const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { db, getSetting } = require('../lib/db');
const { config } = require('../lib/config');
const { nowIso } = require('../lib/utils');
const { compareProtectedFacts, findUnexpectedHan } = require('./lintService');
const { getGeneration, updateGeneration } = require('./generationService');
const { policyFor, needsHumanizer, assertUpdatePolicy } = require('./updatePolicyService');
const jobs = require('./jobService');
const log = require('../lib/logger');

const PROFILE = 'v6_engine';
const TARGET_VERSION = 'humanizing-engine-v9-registerlock';
const CHUNK_LIMIT = 650;
let starting = null;
function requestSignal(timeoutMs) { return AbortSignal.any([AbortSignal.timeout(timeoutMs), jobs.getJobSignal()].filter(Boolean)); }

function baseUrl() {
  return getSetting('humanizer_url', config.humanizerUrl).replace(/\/$/, '');
}

function backendDir() {
  return path.resolve(getSetting('humanizer_dir', config.humanizerDir));
}

async function health() {
  try {
    const response = await fetch(`${baseUrl()}/healthz`, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return { up: false, url: baseUrl(), profile: PROFILE, targetVersion: TARGET_VERSION };
    return { up: true, url: baseUrl(), profile: PROFILE, targetVersion: TARGET_VERSION, detail: await response.json() };
  } catch (_) {
    return { up: false, url: baseUrl(), profile: PROFILE, targetVersion: TARGET_VERSION };
  }
}

async function startBackend() {
  jobs.throwIfCancelled();
  if (starting) return starting;
  starting = (async () => {
    const dir = backendDir();
    const entry = path.join(dir, 'server.js');
    if (!fs.existsSync(entry)) throw new Error(`Humanizing Engine 경로가 올바르지 않습니다: ${entry}`);
    const url = new URL(baseUrl());
    const logPath = path.join(config.dataDir, 'logs', 'humanizer.log');
    const output = fs.openSync(logPath, 'a');
    const child = spawn(process.execPath, ['server.js'], {
      cwd: dir,
      env: { ...process.env, PORT: url.port || '5055', DEV_NO_AUTH: '1', FIREBASE_SERVICE_ACCOUNT: '', LLM_BACKEND: '' },
      detached: true,
      stdio: ['ignore', output, output],
      windowsHide: true,
    });
    child.unref();
    for (let i = 0; i < 15; i++) {
      await jobs.wait(2000);
      const state = await health();
      if (state.up) return state;
    }
    throw new Error('Humanizing Engine이 30초 안에 시작되지 않았습니다');
  })();
  try { return await starting; }
  finally { starting = null; }
}

async function ensureUp() {
  const state = await health();
  return state.up ? state : startBackend();
}

function chunksFromDraft(draft, { includeEntry = () => true } = {}) {
  const entries = [{ key: 'lead', text: draft.lead }];
  (draft.sections || []).forEach((section, sectionIndex) => {
    (section.paragraphs || []).forEach((text, paragraphIndex) => entries.push({ key: `section:${sectionIndex}:${paragraphIndex}`, text }));
  });
  const groups = [];
  let current = [];
  let length = 0;
  for (const entry of entries) {
    if (!entry.text || !includeEntry(entry)) continue;
    const nextLength = length + (current.length ? 2 : 0) + entry.text.length;
    if (current.length && nextLength > CHUNK_LIMIT) {
      groups.push(current);
      current = [];
      length = 0;
    }
    current.push(entry);
    length += (current.length > 1 ? 2 : 0) + entry.text.length;
  }
  if (current.length) groups.push(current);
  return groups;
}

// A conservative edit gate, not a semantic proof. Sentences making material,
// treatment, safety or conditional claims stay verbatim until source review.
const CLAIM_RISK = /\d|https?:|진주|산호|오팔|에메랄드|터키석|호박|다이아|루비|사파이어|도금|백금|합금|니켈|순금|은\s*제품|초음파|세척|세정|연마|표백|스팀|열처리|알레르기|금지|않|없|아니|불가|가능|해야|경우|조건|따라|(?:하면|해도|할\s*때)|\b(?:안|못)\s/;
function claimSentences(text) {
  return String(text || '').split(/(?<=[.!?。])\s+|\n+/).map(value => value.trim().replace(/\s+/g, ' ')).filter(value => value && CLAIM_RISK.test(value));
}
function validateHumanizedChunk(before, after) {
  const facts = compareProtectedFacts(before, after);
  const priorClaims = claimSentences(before);
  const nextClaims = claimSentences(after);
  const claimPass = JSON.stringify(priorClaims) === JSON.stringify(nextClaims);
  return { ...facts, pass: facts.pass && claimPass, tokenPass: facts.pass, claimPass,
    conservativeClaimGate: true, limitation: '보호 문장 변경을 거부하는 보수적 검사이며 일반 문장의 의미·출처 일치를 증명하지 않습니다.',
    changedClaimCount: claimPass ? 0 : Math.max(priorClaims.length, nextClaims.length) };
}

async function submit(text, memo) {
  jobs.throwIfCancelled();
  const response = await fetch(`${baseUrl()}/transform`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      adminLabProfile: PROFILE,
      mode: 'formal',
      lang: 'ko',
      memo,
      adminHumanizeLab: true,
      humanizeExperiment: true,
      niklQualityTest: false,
      layoutNlpTest: false,
      evidence: false,
      length: 'keep',
    }),
    signal: requestSignal(15000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok || !data.jobId) throw new Error(`Humanizer 제출 실패 (${response.status}): ${data.error || 'unknown'}`);
  return { jobId: data.jobId, estSec: data.estSec || 60 };
}

function engineMeta(result) {
  const meta = result?.v6Engine || result?.humanizeMeta || null;
  const version = meta?.version || null;
  const match = String(version || '').match(/^humanizing-engine-v(\d+)/);
  if (!match || Number(match[1]) < 9) throw new Error(`Humanizer V9 확인 실패: ${version || '버전 없음'}`);
  return { version, meta };
}

async function poll(jobId, estSec) {
  const deadline = Date.now() + Math.max(300000, Number(estSec || 60) * 3000);
  while (Date.now() < deadline) {
    await jobs.wait(3000);
    const response = await fetch(`${baseUrl()}/transform/${jobId}`, { signal: requestSignal(10000) });
    const data = await response.json().catch(() => ({}));
    if (response.status === 404) throw new Error('Humanizer 작업이 유실됐습니다');
    if (data.status === 'done') {
      const result = data.result || {};
      if (!result.outputText) throw new Error('Humanizer 결과 텍스트가 없습니다');
      return { outputText: result.outputText, ...engineMeta(result) };
    }
    if (['blocked', 'error', 'cancelled'].includes(data.status)) throw new Error(`Humanizer ${data.status}: ${data.error || JSON.stringify(data.gateDetail || {})}`);
  }
  throw new Error('Humanizer 처리 시간이 초과됐습니다');
}

function applyChunk(draft, group, output) {
  const paragraphs = String(output || '').split(/\n\n+/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length !== group.length) return false;
  group.forEach((entry, index) => {
    if (entry.key === 'lead') draft.lead = paragraphs[index];
    else {
      const [, sectionIndex, paragraphIndex] = entry.key.split(':').map(Number);
      draft.sections[sectionIndex].paragraphs[paragraphIndex] = paragraphs[index];
    }
  });
  return true;
}

async function humanizeGeneration(id) {
  jobs.throwIfCancelled();
  const generation = getGeneration(id);
  if (!generation?.draft) throw new Error('휴먼라이징할 초안이 없습니다');
  assertUpdatePolicy(generation, { draft: generation.draft, phase: 'humanize' });
  if (!needsHumanizer(generation)) {
    const next = updateGeneration(id, { humanized_json: JSON.stringify(generation.draft), status: 'humanized', error: null });
    return { ...next, humanizeWarnings: [], humanizeSkipped: '선택 범위에 문장 변경이 없어 기존 원문을 유지했습니다.' };
  }
  const policy = policyFor(generation);
  const groups = chunksFromDraft(generation.draft, { includeEntry: entry => {
    if (!policy) return true;
    if (entry.key === 'lead') return policy.scope.fields.includes('lead') && entry.text !== policy.baselineDraft.lead;
    const [, sectionIndex, paragraphIndex] = entry.key.split(':').map(Number);
    return policy.scope.fields.includes('sections') && entry.text !== policy.baselineDraft.sections[sectionIndex]?.paragraphs[paragraphIndex];
  } });
  if (!groups.length) {
    const next = updateGeneration(id, { humanized_json: JSON.stringify(generation.draft), status: 'humanized', error: null });
    return { ...next, humanizeWarnings: [], humanizeSkipped: '변경된 설명 문단이 없어 원문을 유지했습니다.' };
  }
  await ensureUp();
  updateGeneration(id, { status: 'humanizing', error: null });
  const resultDraft = JSON.parse(JSON.stringify(generation.draft));
  const memo = [
    '귀족 귀금속 웹사이트의 격식 있는 정보형 가이드입니다.',
    '원문에 없는 저희·제가·우리 같은 화자를 만들지 마세요.',
    '숫자, 가격, 날짜, 14K·18K·24K, 3.75g, 보석 등급, 소재명, 출처 URL은 절대 변경하거나 추가하지 마세요.',
    '한국어 문장에 중국어 간체·번체나 일본어 한자를 섞지 마세요.',
    '문단 수와 사실 범위를 유지하고 문장 연결과 표현만 자연스럽게 다듬으세요.',
    '가격·제작 기간·수리 가능 여부를 새로 단정하지 마세요.',
  ].join(' ');
  const warnings = [];
  try {
    for (const group of groups) {
      jobs.throwIfCancelled();
      const before = group.map((entry) => entry.text).join('\n\n');
      if (before.length < 200) {
        warnings.push('V9 최소 길이 미만 문단은 원문을 유지했습니다.');
        continue;
      }
      const stamp = nowIso();
      const run = db.prepare(`
        INSERT INTO humanize_runs (generation_id, engine_profile, status, before_text, created_at)
        VALUES (?, ?, 'running', ?, ?)
      `).run(id, PROFILE, before, stamp);
      try {
        const job = await submit(before, memo);
        const transformed = await poll(job.jobId, job.estSec);
        const facts = validateHumanizedChunk(before, transformed.outputText);
        const countPass = transformed.outputText.split(/\n\n+/).filter((x) => x.trim()).length === group.length;
        const unexpectedHan = findUnexpectedHan(transformed.outputText);
        const validation = { ...facts, paragraphCountPass: countPass, scriptPass: unexpectedHan.length === 0, unexpectedHan };
        if (!facts.pass || unexpectedHan.length || !countPass || !applyChunk(resultDraft, group, transformed.outputText)) {
          const reason = !facts.pass
            ? '수치·소재·관리 방법·금지·조건을 포함한 보호 문장 변경을 감지해 원문으로 복원했습니다. 의미를 승인한 결과가 아니므로 표현 변경은 출처와 함께 직접 검토해 주세요.'
            : unexpectedHan.length
              ? `중국어·비정상 한자 혼입(${unexpectedHan.slice(0, 3).join(', ')})을 감지해 해당 문단을 원문으로 복원했습니다.`
              : '문단 구조 변경을 감지해 해당 문단을 원문으로 복원했습니다.';
          warnings.push(reason);
          db.prepare(`UPDATE humanize_runs SET status='reverted', engine_version=?, after_text=?, facts_json=?, error=? WHERE id=?`)
            .run(transformed.version, transformed.outputText, JSON.stringify(validation), warnings.at(-1), run.lastInsertRowid);
          continue;
        }
        db.prepare(`UPDATE humanize_runs SET status='done', engine_version=?, after_text=?, facts_json=? WHERE id=?`)
          .run(transformed.version, transformed.outputText, JSON.stringify(validation), run.lastInsertRowid);
      } catch (error) {
        db.prepare(`UPDATE humanize_runs SET status='error', error=? WHERE id=?`).run(error.message, run.lastInsertRowid);
        jobs.throwIfCancelled();
        warnings.push(`일부 문단 Humanizer 실패로 원문 유지: ${error.message}`);
      }
    }
    jobs.throwIfCancelled();
    assertUpdatePolicy(generation, { draft: resultDraft, phase: 'humanize' });
    const next = updateGeneration(id, { humanized_json: JSON.stringify(resultDraft), status: 'humanized', error: warnings.length ? warnings.join(' ') : null });
    return { ...next, humanizeWarnings: warnings };
  } catch (error) {
    updateGeneration(id, { status: 'draft', error: `Humanizer 실패: ${error.message}` });
    throw error;
  }
}

module.exports = { PROFILE, TARGET_VERSION, health, startBackend, ensureUp, chunksFromDraft, compareProtectedFacts, validateHumanizedChunk, humanizeGeneration };
