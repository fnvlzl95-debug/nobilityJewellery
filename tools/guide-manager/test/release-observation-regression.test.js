const test = require('node:test');
const assert = require('node:assert/strict');
const { db } = require('../server/lib/db');
const baseline = require('../server/services/baselineService');

test('신규 글 관찰은 배포일을 제외한 완료된 기간만 쓰며 뒤늦은 옛 자료를 제외한다', () => {
  const ids = [];
  const insert = db.prepare(`INSERT INTO analytics_imports (source_type,file_name,file_hash,period_start,period_end,parser_version,summary_json,imported_at)
    VALUES ('release_observation','fixture.csv',?,?,?,'test','{}',?)`);
  try {
    for (const [name,start,end] of [
      ['valid','2025-02-02','2025-03-01'], ['overlap','2025-02-01','2025-02-28'],
      ['late-old','2025-01-01','2025-01-28'], ['too-short','2025-03-02','2025-03-04'],
      ['unfinished','2999-01-01','2999-01-28'],
    ]) ids.push(Number(insert.run('release-'+name,start,end,new Date().toISOString()).lastInsertRowid));
    assert.equal(baseline.eligibleObservation('release_observation',null),null);
    assert.equal(baseline.eligibleObservation('release_observation','2025-02-01T10:00:00Z').id,ids[0]);
    assert.equal(baseline.observationReadyAt('2025-02-01T16:00:00Z',28),'2025-03-02T15:00:00.000Z');
  } finally { for (const id of ids) db.prepare('DELETE FROM analytics_imports WHERE id=?').run(id); }
});

test('누락된 페이지 행은 조회·클릭 0이나 성과 증가로 만들지 않는다', () => {
  const snapshot = baseline.metricSnapshot('release-missing-guide');
  assert.equal(snapshot.gsc.hasData,false);
  assert.equal(snapshot.gsc.clicks,null);
  assert.equal(snapshot.gsc.impressions,null);
  assert.equal(snapshot.ga4.hasData,false);
  assert.equal(snapshot.ga4.views,null);
  assert.equal(snapshot.ga4.activeUsers,null);
});

test('재반영은 이전 배포 완료 표시를 지우고 신규 글의 편집 선정 사유를 보존한다', () => {
  const stamp='2025-01-01T00:00:00.000Z';
  const input={topicDecision:{selectionMode:'editorial',editorialJustification:'기존 글이 다루지 않은 별도의 구매 질문을 해결합니다.'}};
  const id=Number(db.prepare(`INSERT INTO generations (kind,topic,status,input_json,created_at,updated_at) VALUES ('new','release observation fixture','applied',?,?,?)`).run(JSON.stringify(input),stamp,stamp).lastInsertRowid);
  try {
    const snapshot=baseline.metricSnapshot('release-missing-guide');
    baseline.recordBaseline(id,'release-missing-guide',snapshot,stamp);
    const row=db.prepare('SELECT id FROM content_baselines WHERE generation_id=?').get(id);
    baseline.recordDeployment(row.id,{deployedAt:'2025-01-02T00:00:00Z',commit:'abcdef1234567'});
    assert.ok(baseline.listComparisons().find(item=>item.generationId===id).deployedAt);
    baseline.recordBaseline(id,'release-missing-guide',snapshot,'2025-01-03T00:00:00Z');
    const comparison=baseline.listComparisons().find(item=>item.generationId===id);
    assert.equal(comparison.status,'awaiting_deployment');
    assert.equal(comparison.deploymentCommit,null);
    assert.equal(comparison.changes,null);
    assert.equal(comparison.before.contentChange.selectionMode,'editorial');
  } finally {
    db.prepare('DELETE FROM content_baselines WHERE generation_id=?').run(id);
    db.prepare('DELETE FROM generations WHERE id=?').run(id);
  }
});
