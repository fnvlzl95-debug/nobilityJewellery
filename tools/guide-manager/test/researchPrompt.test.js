const test = require('node:test');
const assert = require('node:assert/strict');
const { researchInput } = require('../server/services/researchPrompt');

test('repair cost research receives existing technical context without inventing business facts', () => {
  const prompt = researchInput({ kind: 'update', topic: '반지 광택 비용', input: {
    updatePolicy: { scope: { fields: ['sources', 'sourceNote'] }, baselineDraft: {
      title: '광택 비용', sections: [{ title: '백금 마감', paragraphs: ['형상과 금속 두께를 확인합니다.'], image: 'private-asset' }],
    } },
  } });
  assert.match(prompt, /형상과 금속 두께/);
  assert.match(prompt, /sources/);
  assert.match(prompt, /사업자 제공 사실: 없음/);
  assert.match(prompt, /검증된 사실로 간주하지/);
  assert.doesNotMatch(prompt, /private-asset/);
});

test('new article research does not borrow an unrelated baseline and input is bounded', () => {
  const input = { businessFacts: '실물 확인 후 안내', updatePolicy: { baselineDraft: { title: 'unrelated' } } };
  assert.doesNotMatch(researchInput({ kind: 'new', topic: '귀걸이', input }), /unrelated/);
  const prompt = researchInput({ kind: 'update', topic: '귀걸이', input: {
    updatePolicy: { baselineDraft: { sections: [{ paragraphs: ['가'.repeat(50000)] }] } },
  } });
  assert.ok(prompt.length < 25000);
});
