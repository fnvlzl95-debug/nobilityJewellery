const test = require('node:test');
const assert = require('node:assert/strict');
const { db, getSetting, setSetting } = require('../server/lib/db');
const { nowIso } = require('../server/lib/utils');
const intent = require('../server/services/intentService');
const topics = require('../server/services/topicService');
const metrics = require('../server/services/analyticsMetricsService');
const { lintDraft } = require('../server/services/lintService');
const { makeDraft } = require('./fixture');

const date = offset => new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);
const period = () => ({ start: date(-28), end: date(-1) });
function candidate(overrides = {}) {
  return { id: 'silver-spoon', topic: '은도금 티스푼 세척', primaryKeyword: '은도금 티스푼 세척', workingTitle: '은도금 티스푼 세척 전 확인할 점',
    slug: 'silver-plated-spoon-cleaning', category: '관리', cluster: 'care', evidenceQueries: ['은도금 티스푼 세척'], supportingKeywords: ['은도금 티스푼 관리'], ...overrides };
}
function scored(overrides = {}) {
  return topics.scoreTopicCandidates({ candidates: [candidate()], guides: [], queries: [{ query: '은도금 티스푼 세척', impressions: 120, clicks: 1, position: 8 }], evidencePeriod: period(), ...overrides });
}

test('공백·동의어 제목과 같은 진행 작업은 생성 전 공통 검사에서 차단한다', () => {
  const guide = { slug: 'existing', title: '종로 커플링 가격 상담 전 정할 것', keyword: '종로 커플링 가격' };
  const conflict = intent.findIntentConflicts({ slug: 'alternate', title: guide.title.replaceAll(' ', ''), keyword: '종로 커플 반지 가격' }, { guides: [guide], activeGenerations: [] });
  assert.equal(conflict[0].blocking, true);
  assert.throws(() => intent.assertUniqueIntent({ topic: '은도금 티스푼 세척' }, { guides: [], activeGenerations: [{ id: 7, topic: '은도금티스푼세척', title: '은도금티스푼세척' }] }), error => error.status === 409 && error.code === 'DUPLICATE_INTENT');
  assert.doesNotThrow(() => intent.assertUniqueIntent({ slug: guide.slug, title: guide.title, keyword: guide.keyword }, { targetSlug: guide.slug, generationId: 7, guides: [guide], activeGenerations: [{ id: 7, slug: guide.slug, title: guide.title }] }));
});

test('일반 주얼리와 커플링의 구체적 범위는 무조건 합치지 않는다', () => {
  const broad = { title: '14K·18K 주얼리 가격 차이 기준', keyword: '14K 18K 주얼리 가격 차이' };
  const narrow = { title: '14K·18K 커플링 가격 차이', keyword: '14K 18K 커플링 가격 차이' };
  assert.equal(intent.findIntentConflicts(narrow, { guides: [broad], activeGenerations: [] }).some(row => row.blocking), false);
});

test('최종 린트도 제목 공백 제거와 진행 작업 중복을 같은 기준으로 막는다', () => {
  const guide = db.prepare('SELECT slug, title, keyword FROM guides WHERE length(title) > 10 LIMIT 1').get();
  if (guide) {
    const result = lintDraft(makeDraft({ slug: 'quality-space-check', title: guide.title.replaceAll(' ', ''), keyword: guide.keyword.replaceAll(' ', '') }));
    assert.ok(result.findings.some(row => row.code === 'cannibalization' && row.severity === 'error'));
  }
  const stamp = nowIso();
  const row = db.prepare("INSERT INTO generations(kind,topic,status,input_json,created_at,updated_at) VALUES ('new',?,'idea',?,?,?)")
    .run('시험 전용 티스푼 중복 예약', JSON.stringify({ desiredSlug: 'test-spoon-intent', topicDecision: { primaryKeyword: '은도금 티스푼 세척 선택', workingTitle: '실제 선택된 티스푼 제목' } }), stamp, stamp);
  try {
    assert.equal(intent.findIntentConflicts({ slug: 'test-spoon-intent', topic: '시험 전용 티스푼 중복 예약' }).find(item => item.generationId === Number(row.lastInsertRowid)).blocking, true);
    const reservation = intent.activeIntents().find(item => item.id === Number(row.lastInsertRowid));
    assert.equal(reservation.primaryKeyword, '은도금 티스푼 세척 선택');
    assert.equal(reservation.title, '실제 선택된 티스푼 제목');
    assert.throws(() => intent.assertUniqueIntent({ slug: 'other-spoon-path', title: '실제 선택된 티스푼 제목' }), error => error.code === 'DUPLICATE_INTENT');
    assert.throws(() => intent.assertUniqueIntent({ slug: 'third-spoon-path', topic: '시험전용티스푼중복예약', primaryKeyword: '다른 검색어', workingTitle: '다른 제목' }), error => error.code === 'DUPLICATE_INTENT');
  } finally { db.prepare('DELETE FROM generations WHERE id=?').run(Number(row.lastInsertRowid)); }
});

test('모델이 적은 무관한 고노출 검색어와 0인 Naver 지수는 수요가 아니다', () => {
  const result = scored({ candidates: [candidate({ evidenceQueries: ['다이아 반지 가격'], supportingKeywords: ['다이아 반지 가격'] })], queries: [{ query: '다이아 반지 가격', impressions: 12000, clicks: 8, position: 9 }], naverTrends: { 'silver-spoon': { ratio: 0, dataPoints: 12, latestPeriod: date(-2), keywords: ['은도금 티스푼 세척'] } } })[0];
  assert.equal(result.metrics.googleImpressions, 0);
  assert.equal(result.matchedQueries.length, 0);
  assert.equal(result.accepted, false);
  assert.equal(result.automaticEligible, false);
});

test('최신 양의 관련 수요만 자동 채택하고 부족한 표본·기간은 보류한다', () => {
  assert.equal(scored()[0].accepted, true);
  assert.equal(scored({ evidencePeriod: { start: date(-50), end: date(-20) } })[0].accepted, false);
  assert.equal(scored({ evidencePeriod: null })[0].accepted, false);
  assert.equal(scored({ queries: [{ query: '은도금 티스푼 세척', impressions: 1 }] })[0].accepted, false);
  assert.equal(topics.periodQuality({ start: 'invalid', end: 'invalid' }).usable, false);
  const editorial = scored({ evidencePeriod: null, candidates: [candidate({ editorialJustification: '상담에서 반복된 은도금 세척 질문을 안전한 관리 순서로 정리합니다.' })] })[0];
  assert.equal(editorial.accepted, false);
  assert.equal(editorial.editorialEligible, true);
  assert.equal(editorial.decisionStatus, 'editorial_review');
});

test('동일 추천 배치와 진행 작업을 포함해 한 의도에는 한 후보만 허용한다', () => {
  const pair = scored({ candidates: [candidate(), candidate({ id: 'other-spelling', slug: 'second-slug', primaryKeyword: '은도금티스푼세척' })] });
  assert.equal(pair.filter(row => row.accepted).length, 1);
  assert.ok(pair.find(row => !row.accepted).rejectionReasons.some(value => value.includes('이번 추천')));
  const active = scored({ activeGenerations: [{ id: 19, topic: '은도금티스푼세척', title: '은도금 티스푼 세척 전 확인할 점', slug: 'another-draft' }] });
  assert.equal(active[0].accepted, false);
});

test('GA4 집계는 사용자·비율의 중복 합산을 숨기고 조회·이벤트만 합한다', () => {
  const rows = [{ guide_slug: 'a', views: 10, events: 15, active_users: 6, bounce_rate: 0.2 }, { guide_slug: 'a', views: 30, events: 40, active_users: 7, bounce_rate: 0.6 }];
  const result = metrics.groupGa4BySlug(rows).get('a');
  assert.equal(result.views, 40); assert.equal(result.events, 55);
  assert.equal(result.activeUsers, null); assert.equal(result.bounceRate, null);
  assert.equal(metrics.aggregateGa4Rows([rows[0]]).activeUsers, 6);
  assert.equal(metrics.aggregateGa4Rows([rows[0]]).bounceRate, 0.2);
});

test('추천 캐시는 GA4·클러스터·원문·진행 작업을 반영하고 전체 후보에 limit을 나중에 적용한다', () => {
  const context = { performance: { id: 1, ...period() }, ga4: { id: 1 }, guides: [{ slug: 'a', title: '원문', keyword: '검색어', sourceHash: 'before' }], clusters: [{ id: 'a' }], activeGenerations: [] };
  const signature = topics.strategySignature(context);
  for (const changes of [{ ga4: { id: 2 } }, { clusters: [{ id: 'b' }] }, { guides: [{ ...context.guides[0], sourceHash: 'after' }] }, { activeGenerations: [{ id: 1, revision: 2, topic: '진행 중' }] }]) {
    assert.notEqual(topics.strategySignature({ ...context, ...changes }), signature);
  }
  const previous = getSetting(topics.CACHE_KEY, 'null');
  try {
    const report = { scoringVersion: topics.SCORING_VERSION, accepted: [candidate(), candidate({ id: 'second', slug: 'second' })], rejected: [] };
    setSetting(topics.CACHE_KEY, JSON.stringify({ signature, generatedAt: nowIso(), report }));
    assert.equal(topics.cachedReport(signature, context, 1).accepted.length, 1);
    assert.equal(topics.cachedReport(signature, context, 8).accepted.length, 2);
  } finally { setSetting(topics.CACHE_KEY, previous); }
});
