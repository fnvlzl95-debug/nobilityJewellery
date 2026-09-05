const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { optimizeWebp, preferredArchetype, IMAGE_ARCHETYPES, hashedFileName } = require('../server/services/imageService');
const { daysInclusive, metricSnapshot } = require('../server/services/baselineService');

test('생성 이미지 버퍼를 WebP로 최적화한다', async (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'noblesse-image-test-'));
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const input = await sharp({ create: { width: 48, height: 32, channels: 3, background: '#c9a227' } }).png().toBuffer();
  const output = path.join(tempDir, 'hero.webp');
  const result = await optimizeWebp(input, output);
  assert.equal(result.format, 'webp');
  assert.equal(result.width, 48);
  assert.ok(fs.statSync(output).size > 0);
});

test('이미지 장면은 내용에 따라 5개 아키타입으로 분류한다', () => {
  assert.equal(IMAGE_ARCHETYPES.length, 5);
  assert.equal(preferredArchetype('반지 사이즈 재는 방법'), 'measurement-tools');
  assert.equal(preferredArchetype('14K 18K 가격 차이'), 'comparison-layout');
  assert.equal(preferredArchetype('목걸이 수리 과정'), 'craft-process');
});

test('재생성 이미지는 내용 해시 8자를 파일명에 넣어 캐시를 분리한다', () => {
  const first = hashedFileName('ring-guide', 'hero', Buffer.from('first image'));
  const second = hashedFileName('ring-guide', 'hero', Buffer.from('second image'));
  assert.match(first, /^ring-guide-hero-[a-f0-9]{8}\.webp$/);
  assert.notEqual(first, second);
});

test('콘텐츠 기준선은 GA4와 GSC 측정 기간을 섞지 않고 보존한다', () => {
  assert.equal(daysInclusive('2026-07-01', '2026-07-31'), 31);
  assert.equal(daysInclusive('2026-07-08', '2026-08-04'), 28);
  const snapshot = metricSnapshot('gold-one-don-gram');
  assert.equal(snapshot.gsc.periodDays, daysInclusive(snapshot.gsc.periodStart, snapshot.gsc.periodEnd));
  assert.equal(snapshot.ga4.periodDays, daysInclusive(snapshot.ga4.periodStart, snapshot.ga4.periodEnd));
  assert.ok(snapshot.gsc.periodDays > 0);
  assert.ok(snapshot.ga4.periodDays > 0);
  assert.notEqual(snapshot.gsc.importId, snapshot.ga4.importId);
});
