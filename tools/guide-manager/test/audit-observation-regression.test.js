const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the real plan and creation boundary without opening the operator DB or calling AI.
function harness() {
  const calls = { writes: 0, generations: 0, paid: 0 };
  const sandbox = {
    module: { exports: {} }, structuredClone, console,
    require(name) {
      if (name === '../lib/db') return { db: { prepare: () => ({ run: () => { calls.writes++; } }) } };
      if (name === '../lib/utils') return { nowIso: () => '2026-09-06T00:00:00Z', koreaDate: () => '2026-09-06' };
      if (name === './inventoryService') return { listGuides: () => [{ path: '/guide/example' }, { path: '/guide/next' }] };
      if (name === './generationService') return { createGeneration: () => { calls.generations++; return { id: 1 }; } };
      if (name === './openaiService') return { completeJson: async () => { calls.paid++; throw new Error('Paid calls forbidden'); } };
      if (name === './jobService') return { register() {}, throwIfCancelled() {} };
      if (name === './updatePolicyService') return { validatePlanCapabilities: value => value, validatePageQueryReview: () => null };
      if (name === './queryEvidenceService') return require('../server/services/queryEvidenceService');
      if (['./analyticsService', './contentExtractorService', './opportunityService', './analyticsMetricsService'].includes(name)) return {};
      throw new Error(`Unexpected dependency: ${name}`);
    },
  };
  const source = fs.readFileSync(path.join(__dirname, '../server/services/contentAuditService.js'), 'utf8');
  vm.runInNewContext(`${source}\nmodule.exports.useFixture = item => { scanAll = () => ({}); detail = () => item; currentAuditRows = () => [item]; };`, sandbox);
  return { audits: sandbox.module.exports, calls };
}

function snapshot() {
  return {
    guide: { slug: 'example', path: '/guide/example', isCustom: false },
    content: { title: '결혼예물 상담 체크리스트', description: '기존 검토 내용', keyword: '결혼예물 상담', quickAnswers: ['예산', '사양', '증빙'], characterCount: 2000,
      structure: { officialSourceCount: 2, quickAnswerCount: 3, sectionCount: 4, relatedLinkCount: 4 } },
    metrics: { gsc: { impressions: 23, ctr: 0, position: 6.48, expectedCtr: 0.03 }, ga4: { mapped: true, views: 1, bounceRate: 0 } },
    scores: { dimensions: { answerCoverage: 100, trust: 100 } },
    guards: { recentObservationHold: false, keepSnippet: false, keepNaverSnippet: false },
    links: { inboundCount: 4, recommended: [{ to: '/guide/next' }] },
    queryHints: [], technicalFindings: [], duplicates: [], rationale: [], contextFingerprint: 'reviewed-current',
  };
}

function itemFor(audits, s = snapshot()) {
  s.classification = audits.classify(s);
  s.deterministicChanges = audits.deterministicChanges(s);
  return { id: 1, guideSlug: 'example', snapshot: s, status: 'measured', plan: audits.seedPlan(s) };
}

test('low impressions do not label adequately connected articles as link defects', () => {
  const { audits } = harness();
  for (const impressions of [0, 3, 23, 39]) {
    const s = snapshot(); s.metrics.gsc.impressions = impressions;
    assert.equal(audits.classify(s), '유지');
    assert.equal(audits.deterministicChanges(s).length, 0);
  }
});

test('real incoming link deficiency is diagnosed without pretending an outgoing edit repairs it', () => {
  const { audits } = harness();
  const s = snapshot(); s.links.inboundCount = 1;
  const item = itemFor(audits, s);
  assert.equal(s.classification, '내부링크 강화');
  assert.equal(item.plan.changes.length, 0);
  assert.match(item.plan.observations.join(' '), /공유 클러스터/);
  s.content.structure.relatedLinkCount = 1;
  const changes = audits.deterministicChanges(s);
  assert.equal(changes.length, 1);
  assert.equal(changes[0].area, '내부링크');
});

test('seven page views and high bounce rate alone are an observation signal, not a body rewrite diagnosis', () => {
  const { audits } = harness();
  const s = snapshot();
  s.metrics.gsc = { impressions: 124, ctr: 0.0645, position: 10.15, expectedCtr: 0.015 };
  s.metrics.ga4 = { mapped: true, views: 7, bounceRate: 6 / 7 };
  s.content.structure.officialSourceCount = 4;
  const item = itemFor(audits, s);
  assert.equal(s.classification, '유지');
  assert.equal(item.plan.changes.length, 0);
  assert.match(item.plan.observations.join(' '), /조회 7회·이탈률 85.7%/);
  assert.match(item.plan.observations.join(' '), /재작성하지 않습니다/);
});

test('an observation plan cannot create a generation after the D31 hold expires', () => {
  const { audits, calls } = harness();
  const item = itemFor(audits);
  assert.equal(item.plan.changes.length, 0);
  assert.ok(item.plan.observations.length);
  audits.useFixture(item);
  assert.throws(() => audits.createUpdate('example', { confirmCurrent: true, contextFingerprint: 'reviewed-current' }), { code: 'MONITOR_ONLY_PLAN', status: 422 });
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});

test('legacy enabled monitor entries cannot be re-enabled by save or reused directly for creation', () => {
  const { audits, calls } = harness();
  const item = itemFor(audits);
  item.plan.changes = [{ id: 'preserve-and-monitor', enabled: true, area: '본문', action: '현재 구조 유지 후 다음 동일 기간 측정', proposedState: '성과를 측정합니다.' }];
  audits.useFixture(item);
  assert.throws(() => audits.savePlan('example', item.plan), { code: 'MONITOR_ONLY_PLAN' });
  assert.throws(() => audits.createUpdate('example', { confirmCurrent: true, contextFingerprint: 'reviewed-current' }), { code: 'MONITOR_ONLY_PLAN' });
  item.plan.changes[0].id = 'renamed-monitor';
  assert.throws(() => audits.savePlan('example', item.plan), { code: 'MONITOR_ONLY_PLAN' });
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});

test('legacy sitewide-query title plans cannot be re-enabled, while a verified content correction can be saved', () => {
  const { audits, calls } = harness();
  const item = itemFor(audits);
  item.plan.changes = [{ id: 'improve-snippet', enabled: true, area: '제목·설명', action: '검색 의도와 즉답을 제목 앞부분에 배치', proposedState: '추정 관련 검색어 “보석”을 제목 앞 20자에 배치합니다.' }];
  audits.useFixture(item);
  assert.throws(() => audits.savePlan('example', item.plan), { code: 'MONITOR_ONLY_PLAN' });
  assert.throws(() => audits.createUpdate('example', { confirmCurrent: true, contextFingerprint: 'reviewed-current' }), { code: 'MONITOR_ONLY_PLAN' });
  const guarded = audits.applyServerGuards(structuredClone(item.plan), item);
  assert.equal(guarded.changes[0].enabled, false);
  assert.match(guarded.changes[0].lockedReason, /페이지별 검색어/);
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
  item.plan.changes = [{ id: 'correct-title-fact', enabled: true, area: '제목·설명', action: '본문에 없는 보장 표현 수정', proposedState: '본문에서 조건부라고 설명한 사실에 맞게 제목의 무조건 표현을 수정합니다.' }];
  audits.savePlan('example', item.plan);
  assert.equal(calls.writes, 1);
});

test('a real correction remains executable alongside an observation note', () => {
  const { audits, calls } = harness();
  const item = itemFor(audits);
  item.plan.changes = [{ id: 'source-correction', enabled: true, area: '출처', action: '현재 사실에 해당하는 공식 출처 추가', proposedState: '관리 기준을 검증한 공식 출처 URL을 추가합니다.' }];
  audits.useFixture(item);
  audits.createUpdate('example', { confirmCurrent: true, contextFingerprint: 'reviewed-current' });
  assert.equal(calls.generations, 1);
  assert.equal(calls.paid, 0);
});

test('D31 protection still takes precedence over explicitly confirmed plans', () => {
  const { audits, calls } = harness();
  const item = itemFor(audits);
  item.snapshot.guards = { recentObservationHold: true, observeUntil: '2026-10-07' };
  audits.useFixture(item);
  assert.throws(() => audits.createUpdate('example', { confirmCurrent: true, contextFingerprint: 'reviewed-current' }), /D\+31/);
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});

test('default paid analysis excludes observation-only pages', async () => {
  const { audits, calls } = harness();
  audits.useFixture(itemFor(audits));
  const result = await audits.analyze({ all: true });
  assert.equal(result.skipped, true);
  assert.equal(result.requested, 0);
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});

test('default analysis makes no paid request for CTR-only plans, including legacy enabled snapshots', async () => {
  const { audits, calls } = harness();
  const s = snapshot();
  s.metrics.gsc.impressions = 122;
  s.queryHints = [{ query: '보석', impressions: 1, similarity: 0.85, inferred: true }];
  const item = itemFor(audits, s);
  assert.equal(s.classification, 'CTR 개선');
  assert.equal(s.deterministicChanges.length, 1);
  assert.equal(s.deterministicChanges[0].enabled, false);
  // The default filter must also normalize saved snapshots from the old policy.
  s.deterministicChanges[0].enabled = true;
  audits.useFixture(item);
  const result = await audits.analyze({ all: true });
  assert.equal(result.skipped, true);
  assert.equal(result.requested, 0);
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});

test('verified page evidence adds a manual review option without activating paid analysis', async () => {
  const { audits, calls } = harness();
  const s = snapshot();
  s.metrics.gsc.impressions = 122;
  s.queryEvidence = { pageQueryAvailable: true, canRecommendTitleKeywords: true, importId: 12, pageUrl: 'https://noblessegold.com/guide/example', periodStart: '2026-08-07', periodEnd: '2026-09-03', fingerprint: 'a'.repeat(64) };
  const item = itemFor(audits, s);
  assert.ok(item.plan.changes.some(entry => entry.id === 'reviewed-page-query-snippet'));
  assert.ok(item.plan.changes.every(entry => !entry.enabled));
  assert.equal(item.plan.pageQueryReview.confirmed, false);
  audits.useFixture(item);
  const result = await audits.analyze({ all: true });
  assert.equal(result.skipped, true);
  assert.deepEqual(calls, { writes: 0, generations: 0, paid: 0 });
});
