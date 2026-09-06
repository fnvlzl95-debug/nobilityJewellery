const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('esbuild');

const file = path.resolve(__dirname, '../client/src/PublicCheckStatus.jsx');
const compiled = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
const jsx = (type, props) => ({ type, props });
const runtime = { jsx, jsxs: jsx, Fragment: 'fragment' };
const ui = {
  Badge: ({ tone, children }) => React.createElement('span', { className: `badge-${tone}` }, children),
  Spinner: ({ label }) => React.createElement('span', {}, label), refreshDateTime: String,
};
function load({ react = React, api = {}, jsxRuntime = require('react/jsx-runtime') } = {}) {
  const loaded = new Module(file, module); loaded.filename = file; loaded.paths = Module._nodeModulePaths(path.dirname(file));
  loaded.require = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return jsxRuntime;
    if (name === './api') return { api };
    if (name === './ui') return ui;
    throw new Error(`Unexpected public check dependency: ${name}`);
  };
  loaded._compile(compiled, file);
  return loaded.exports;
}
const components = load();
const record = (guideSlug = 'pearl-value-factors', overrides = {}) => ({
  id: 1, guideSlug, url: `https://noblessegold.com/guide/${guideSlug}`, checkedAt: '2026-09-06T05:00:00.000Z',
  state: 'pass', sourceHash: 'source-a', stale: false,
  checks: [{ key: 'http', label: 'HTTP 응답', status: 'pass', detail: 'HTTP 200' },
    { key: 'indexing', label: '검색 차단', status: 'pass', detail: 'Googlebot noindex 없음' }],
  note: '현재 시점의 응답 검사이며 전체 본문 일치를 증명하지 않습니다.', ...overrides,
});
const html = props => renderToStaticMarkup(React.createElement(components.PublicCheckStatus, { guideSlug: 'pearl-value-factors', onCheck() {}, ...props }));

test('public status is explicitly separate from deployment dates, observation data, Google indexing and ranking', () => {
  const empty = html({});
  assert.match(empty, /현재 공개 상태/); assert.match(empty, /미확인/); assert.match(empty, /확인 기록 없음/);
  assert.match(empty, /배포일 기록·28일 관찰과 별도/);
  assert.match(empty, /Google 웹검색 기준의 공개 HTTP 응답·검색 차단 점검/);
  assert.match(empty, /Google 색인·순위나 과거 배포 완료를 증명하지 않습니다/);
  assert.ok(!empty.includes('badge-success'));
  const passed = html({ result: record() });
  assert.match(passed, /점검 통과/); assert.match(passed, /dateTime="2026-09-06T05:00:00.000Z"/i);
  assert.match(passed, /<details><summary>점검 항목 2개<\/summary>/);
  assert.ok(!passed.includes('<details open'));
  assert.match(passed, /다시 확인/);
});

test('stale records and failed or running checks never display the previous pass as current success', () => {
  for (const props of [
    { result: record('pearl-value-factors', { stale: true }) },
    { result: record(), error: { message: '요청 연결 실패', attemptedAt: '2026-09-06T05:03:00Z' } },
    { result: record(), busy: true },
  ]) {
    const output = html(props);
    assert.ok(!output.includes('점검 통과'));
    assert.ok(!output.includes('badge-success'), 'previous check items use neutral styling too');
    assert.match(output, /이전 확인/); assert.match(output, /이전 저장 점검 항목/);
  }
  assert.match(html({ result: record('pearl-value-factors', { stale: true }) }), /원고 변경 또는 확인 시간이 오래되어 다시 확인/);
  assert.match(html({ result: record(), error: { message: '요청 연결 실패' } }), /role="alert">요청 연결 실패/);
  assert.match(html({ result: record(), busy: true }), /disabled=""/);
});

test('unreachable, unknown checks and results belonging to another guide are not treated as pass', () => {
  assert.match(html({ result: record('pearl-value-factors', { state: 'unreachable' }) }), /연결 확인 불가/);
  const unknown = html({ result: record('pearl-value-factors', { state: 'attention', checks: [{ key: 'robots', label: 'robots 규칙', status: 'unknown', detail: '읽기 실패' }] }) });
  assert.match(unknown, /확인 필요/); assert.match(unknown, /미확인/); assert.ok(!unknown.includes('badge-success'));
  const other = html({ result: record('zircon-vs-cubic-zirconia') });
  assert.match(other, /확인 기록 없음/); assert.ok(!other.includes('점검 통과'));
});

function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
function hooks() {
  const values = [], effects = [], cleanups = [];
  let cursor = 0;
  const react = {
    useState(initial) { const index = cursor++; if (!(index in values)) values[index] = typeof initial === 'function' ? initial() : initial;
      return [values[index], value => { values[index] = typeof value === 'function' ? value(values[index]) : value; }]; },
    useRef(initial) { const index = cursor++; return values[index] ||= { current: initial }; },
    useEffect(fn) { const index = cursor++; if (!values[index]) { values[index] = true; effects.push(fn); } },
  };
  return { react, render(fn) { cursor = 0; const result = fn(); effects.splice(0).forEach(fn => cleanups.push(fn())); return result; },
    unmount() { cleanups.splice(0).forEach(fn => fn?.()); } };
}
function harness() {
  const frame = hooks(), gets = [], posts = [];
  const api = { get(target) { const request = deferred(); gets.push({ target, ...request }); return request.promise; },
    post(target) { const request = deferred(); posts.push({ target, ...request }); return request.promise; } };
  const component = load({ react: frame.react, api, jsxRuntime: runtime });
  let value;
  const render = () => { value = frame.render(component.usePublicChecks); return value; };
  render();
  return { api, gets, posts, render, value: () => value, unmount: frame.unmount };
}

test('checks start only on demand, lock duplicate slugs synchronously and allow other guides independently', async () => {
  const state = harness();
  assert.equal(state.gets.length, 0); assert.equal(state.posts.length, 0);
  const saved = state.value().loadSaved();
  assert.deepEqual(state.gets.map(item => item.target), ['/public-checks']);
  state.gets[0].resolve([record()]); await saved; state.render();
  assert.equal(state.posts.length, 0, 'reading saved results does not recheck pages');
  const capturedCheck = state.value().check;
  const first = capturedCheck('pearl-value-factors');
  const duplicate = capturedCheck('pearl-value-factors');
  const second = capturedCheck('zircon-vs-cubic-zirconia');
  assert.equal(state.posts.length, 2, 'duplicate clicks are rejected before another render');
  assert.deepEqual([...state.render().busy].sort(), ['pearl-value-factors', 'zircon-vs-cubic-zirconia']);
  state.posts[1].resolve(record('zircon-vs-cubic-zirconia', { id: 2 })); await second;
  assert.equal(state.render().results.get('zircon-vs-cubic-zirconia').id, 2);
  assert.equal(state.value().busy.has('pearl-value-factors'), true);
  state.posts[0].resolve(record('pearl-value-factors', { id: 3 })); await first; await duplicate;
  assert.equal(state.render().results.get('pearl-value-factors').id, 3);
  assert.equal(state.value().busy.size, 0);
});

test('request failure overrides old pass locally, releases the lock and clears only on a successful retry', async () => {
  const state = harness();
  const saved = state.value().loadSaved(); state.gets[0].resolve([record()]); await saved; state.render();
  const failed = state.value().check('pearl-value-factors');
  state.posts[0].reject(new Error('동시 확인 한도를 초과했습니다. 다시 시도해 주세요.')); await failed;
  const value = state.render();
  assert.equal(value.results.get('pearl-value-factors').id, 1);
  assert.equal(value.busy.size, 0); assert.match(value.errors.get('pearl-value-factors').message, /다시 시도/);
  const output = html({ result: value.results.get('pearl-value-factors'), error: value.errors.get('pearl-value-factors') });
  assert.ok(!output.includes('점검 통과'));
  const retry = value.check('pearl-value-factors'); state.posts[1].resolve(record('pearl-value-factors', { id: 4, state: 'attention' })); await retry;
  assert.equal(state.render().errors.has('pearl-value-factors'), false);
  assert.equal(state.value().results.get('pearl-value-factors').state, 'attention');
});

test('a delayed saved-list response cannot overwrite a newer explicit page check', async () => {
  for (const checkStartedFirst of [false, true]) {
    const state = harness();
    const firstCheck = checkStartedFirst ? state.value().check('pearl-value-factors') : null;
    const saved = state.value().loadSaved();
    const checked = firstCheck || state.value().check('pearl-value-factors');
    state.posts[0].resolve(record('pearl-value-factors', { id: 8, state: 'unreachable' })); await checked; state.render();
    state.gets[0].resolve([record()]); await saved;
    assert.equal(state.render().results.get('pearl-value-factors').id, 8, `checkStartedFirst=${checkStartedFirst}`);
    assert.equal(state.value().results.get('pearl-value-factors').state, 'unreachable');
  }
});

test('wrong-guide responses and responses after leaving the page cannot update another guide or remounted state', async () => {
  const state = harness();
  const wrong = state.value().check('pearl-value-factors'); state.posts[0].resolve(record('zircon-vs-cubic-zirconia')); await wrong;
  assert.equal(state.render().results.size, 0); assert.match(state.value().errors.get('pearl-value-factors').message, /일치하지 않습니다/);
  const late = state.value().check('pearl-value-factors');
  state.unmount();
  state.posts[1].resolve(record()); await late;
  assert.equal(state.render().results.size, 0);
});

test('failed saved-record refresh marks existing pass unavailable while a later explicit check remains usable', async () => {
  const state = harness();
  const first = state.value().loadSaved(); state.gets[0].resolve([record()]); await first; state.render();
  const reload = state.value().loadSaved(); state.gets[1].reject(new Error('기록 조회 연결 실패')); await reload;
  assert.match(state.render().errors.get('pearl-value-factors').message, /기록 조회 연결 실패/);
  const retry = state.value().check('pearl-value-factors'); state.posts[0].resolve(record('pearl-value-factors', { id: 2 })); await retry;
  const value = state.render();
  assert.equal(value.errors.has('pearl-value-factors'), false);
  assert.match(html({ result: value.results.get('pearl-value-factors'), loadError: value.loadError }), /점검 통과/);
});

test('a successful saved-list reload clears its read error but preserves a failed explicit-check error', async () => {
  const state = harness();
  const first = state.value().loadSaved(); state.gets[0].resolve([record()]); await first; state.render();
  const failedLoad = state.value().loadSaved(); state.gets[1].reject(new Error('저장 기록 읽기 실패')); await failedLoad; state.render();
  const recoveredLoad = state.value().loadSaved(); state.gets[2].resolve([record()]); await recoveredLoad;
  assert.equal(state.render().errors.size, 0); assert.equal(state.value().loadError, '');
  const failedCheck = state.value().check('pearl-value-factors'); state.posts[0].reject(new Error('현재 공개 응답 확인 실패')); await failedCheck; state.render();
  const reread = state.value().loadSaved(); state.gets[3].resolve([record()]); await reread;
  assert.match(state.render().errors.get('pearl-value-factors').message, /현재 공개 응답 확인 실패/);
});

test('actual History loads one saved-result list alongside its two existing reads for 65 comparison cards', async () => {
  const frame = hooks(), gets = [], posts = [];
  const comparisons = Array.from({ length: 65 }, (_, index) => ({ id: index + 1, guideSlug: `guide-${index % 20}`, topic: `글 ${index}`,
    status: 'waiting', readyAt: '2026-10-05T00:00:00Z', deployedAt: '2026-09-06T00:00:00Z', measurementPeriods: {} }));
  const api = { get: async target => { gets.push(target); return target === '/analytics/comparisons' ? comparisons : []; },
    post: async (...args) => { posts.push(args); return {}; } };
  const publicComponents = load({ react: frame.react, api, jsxRuntime: runtime });
  const appFile = path.resolve(__dirname, '../client/src/App.jsx');
  const code = transformSync(`${fs.readFileSync(appFile, 'utf8')}\nexport { HistoryPage };`, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
  const dummy = () => null;
  const loaded = new Module(appFile, module); loaded.filename = appFile; loaded.paths = Module._nodeModulePaths(path.dirname(appFile));
  loaded.require = name => {
    if (name === 'react') return frame.react;
    if (name === 'react/jsx-runtime') return runtime;
    if (name === './api') return { api };
    if (name === './PublicCheckStatus') return publicComponents;
    if (name === './ui') return new Proxy({ useListState: ({ rows }) => ({ view: rows }), dateTime: String, fmt: String }, { get: (target, key) => target[key] || dummy });
    return new Proxy({}, { get: () => dummy });
  };
  loaded._compile(code, appFile);
  frame.render(loaded.exports.HistoryPage);
  await new Promise(resolve => setImmediate(resolve));
  const tree = frame.render(loaded.exports.HistoryPage);
  function nodes(value) { return Array.isArray(value) ? value.flatMap(nodes) : value && typeof value === 'object' ? [value, ...nodes(value.props?.children)] : []; }
  assert.deepEqual(gets.sort(), ['/analytics/comparisons', '/applies', '/public-checks']);
  assert.equal(posts.length, 0);
  assert.equal(nodes(tree).filter(node => node.type === publicComponents.PublicCheckStatus).length, 65);
  frame.unmount();
});
