const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { localSecurity } = require('../server/lib/localSecurity');
const { db } = require('../server/lib/db');
const analytics = require('../server/services/analyticsService');
const { eligibleImport } = require('../server/services/baselineService');
const { lintDraft } = require('../server/services/lintService');
const { makeDraft } = require('./fixture');
const { buildDesiredFiles } = require('../server/services/applyService');

test('외부 Origin·위조 Host·토큰 없는 변경을 차단하고 정상 화면 요청만 허용한다', async () => {
  const app = express(); app.use(localSecurity()); app.post('/api/write', (req, res) => res.json({ ok: true }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await fetch(url + '/api/session', { headers: { Origin: 'https://evil.example' } })).status, 403);
    const hostileHost = await new Promise(resolve => { require('http').get(url + '/api/session', { headers: { Host: 'evil.example' } }, response => { response.resume(); resolve(response.statusCode); }); });
    assert.equal(hostileHost, 403);
    assert.equal((await fetch(url + '/api/write', { method: 'POST' })).status, 403);
    const session = await (await fetch(url + '/api/session')).json();
    assert.equal((await fetch(url + '/api/write', { method: 'POST', headers: { Origin: url, 'X-Guide-Manager-Token': session.token } })).status, 200);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('늦게 가져온 옛 자료와 겹치는 측정 기간은 배포 후 성과로 선택하지 않는다', () => {
  const stamp = new Date().toISOString();
  const insert = db.prepare(`INSERT INTO analytics_imports (source_type,file_name,file_hash,period_start,period_end,parser_version,summary_json,imported_at)
    VALUES ('regression_report','synthetic.csv',?,?,?,'test','{}',?)`);
  const ids = [];
  try {
    for (const [key, start, end] of [['old','2025-01-01','2025-01-28'], ['overlap','2025-01-15','2025-02-11'], ['new','2025-02-02','2025-03-01']]) {
      ids.push(Number(insert.run(`regression-${key}`, start, end, stamp).lastInsertRowid));
    }
    const base = { importId: ids[0], periodStart: '2025-01-01', periodEnd: '2025-01-28', periodDays: 28 };
    assert.equal(eligibleImport(base, 'regression_report', null), null);
    assert.equal(eligibleImport(base, 'regression_report', '2025-02-01T03:00:00Z').id, ids[2]);
    db.prepare('DELETE FROM analytics_imports WHERE id=?').run(ids[2]);
    assert.equal(eligibleImport(base, 'regression_report', '2025-02-01T03:00:00Z'), null);
  } finally { for (const id of ids) db.prepare('DELETE FROM analytics_imports WHERE id=?').run(id); }
});

test('손상된 원고는 예외 대신 차단 결과를 반환하고 코드·경로 주입을 거부한다', () => {
  assert.equal(lintDraft({ sections: 'invalid' }).blocking, true);
  const draft = makeDraft(); draft.heroImage.path = '/Image/`);process.exit();//.webp';
  assert.equal(lintDraft(draft).blocking, true);
  assert.throws(() => buildDesiredFiles({ kind: 'new', draft: makeDraft({ slug: '../outside' }) }), /slug/);
  assert.throws(() => buildDesiredFiles({ kind: 'update', target_slug: 'original', draft: makeDraft({ slug: 'different' }) }), /slug/);
});

test('알 수 없는 CSV를 빈 정상 보고서로 저장하지 않는다', () => {
  const before = db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count;
  assert.throws(() => analytics.importBuffer(Buffer.from('unknown,value\nhello,1'), 'invalid.csv'), /GA4/);
  assert.equal(db.prepare('SELECT COUNT(*) AS count FROM analytics_imports').get().count, before);
});

test('ZIP 폭탄의 선언된 압축 해제 크기를 실제 해제 전에 제한한다', () => {
  const AdmZip = require('adm-zip'); const zip = new AdmZip();
  for (let i = 0; i < 101; i++) zip.addFile(`${i}.csv`, Buffer.from('x,y'));
  assert.throws(() => analytics.zipEntries(zip.toBuffer()), /100/);
});

test('외부에서 수정한 파일은 백업 복구가 덮어쓰지 않는다', () => {
  const fs = require('fs'); const path = require('path'); const os = require('os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-restore-'));
  const file = path.join(dir, 'page.vue'); const backupPath = path.join(dir, 'backup.vue');
  const { sha256 } = require('../server/lib/utils'); const { restore } = require('../server/services/applyService');
  fs.writeFileSync(backupPath, 'before'); fs.writeFileSync(file, 'external edit');
  const manifest = [{ file, relative: 'page.vue', existed: true, backupPath, beforeHash: sha256('before'), writtenHash: sha256('applied') }];
  assert.throws(() => restore(manifest), /외부에서 변경/);
  assert.equal(fs.readFileSync(file, 'utf8'), 'external edit');
  fs.writeFileSync(file, 'applied'); restore(manifest);
  assert.equal(fs.readFileSync(file, 'utf8'), 'before');
  fs.unlinkSync(file); fs.unlinkSync(backupPath); fs.rmdirSync(dir);
});

test('상담 단계 수정은 중복 계약을 만들지 않고 없는 가이드·미래 날짜를 거부한다', () => {
  const measurement = require('../server/services/measurementService');
  const reference = 'test-outcome-regression'; const guideSlug = db.prepare('SELECT slug FROM guides LIMIT 1').get().slug;
  const input = { reference, guideSlug, occurredOn: '2026-01-01', stage: 'inquiry' };
  try {
    measurement.saveOutcome(input); measurement.saveOutcome({ ...input, stage: 'contract' });
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM guide_outcomes WHERE reference=?').get(reference).count, 1);
    assert.throws(() => measurement.saveOutcome({ ...input, guideSlug: 'not-present' }), /가이드/);
    assert.throws(() => measurement.saveOutcome({ ...input, occurredOn: '2999-01-01' }), /상담일/);
  } finally { db.prepare('DELETE FROM guide_outcomes WHERE reference=?').run(reference); }
});
