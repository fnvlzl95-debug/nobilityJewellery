const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('esbuild');

const file = path.resolve(__dirname, '../client/src/ComparisonControls.jsx');
const compiled = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
const tick = () => new Promise(resolve => setImmediate(resolve));

function load({ react = React, api = {}, runtime } = {}) {
  const jsx = (type, props) => React.createElement(type, props);
  const ui = { Badge: ({ children }) => jsx('span', { children }), ErrorNotice: ({ message }) => jsx('div', { children: message }),
    SuccessNotice: ({ message }) => jsx('div', { children: message }), Spinner: ({ label }) => jsx('span', { children: label }),
    fmt: value => Number(value).toLocaleString('en-US'), pct: (value, digits) => `${(Number(value) * 100).toFixed(digits)}%`, dateTime: String };
  const loaded = new Module(file, module); loaded.filename = file; loaded.paths = Module._nodeModulePaths(path.dirname(file));
  loaded.require = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return runtime || require('react/jsx-runtime');
    if (name === './api') return { api };
    if (name === './ui') return ui;
    if (name === 'lucide-react') return { RefreshCcw: () => null };
    throw new Error(`Unexpected comparison UI dependency: ${name}`);
  };
  loaded._compile(compiled, file);
  return loaded.exports;
}

function fixture(overrides = {}) {
  return {
    id: 1, baselineId: 65, status: 'comparable', registeredAt: '2026-09-06T00:00:00Z', registrationTiming: 'before_window',
    selectionReason: '같은 관리 질문을 다루며 기존 노출과 문서 구조가 비슷한 글입니다.',
    treatment: { title: '변경 글', before: { gsc: { impressions: null, clicks: 0, ctr: 0, position: null }, ga4: { views: null, activeUsers: 0, bounceRate: 0 } },
      after: { gsc: { impressions: 0, clicks: null, ctr: null, position: 0 }, ga4: { views: 0, activeUsers: null, bounceRate: null } } },
    control: { title: '대조 글', slug: 'control-a', sourceHash: 'source-a', indexEntryHash: 'index-a', before: { gsc: { impressions: 100, clicks: 2 } }, after: { gsc: { impressions: 200, clicks: 4 } } },
    changes: { treatment: { impressions: null, clicks: null, ctr: null }, control: { impressions: { change: 100 }, clicks: { change: 2 } } },
    expectedPeriods: { gsc: { periodStart: '2026-09-07', periodEnd: '2026-10-04', periodDays: 28, timeZone: 'America/Los_Angeles', timeZoneAssumed: false },
      ga4: { periodStart: '2026-09-08', periodEnd: '2026-10-05', periodDays: 28, timeZone: 'Asia/Seoul', timeZoneAssumed: true } },
    measurementPeriods: { gsc: { before: { importId: 13, periodStart: '2026-08-07', periodEnd: '2026-09-03', property: 'https://noblessegold.com/' }, after: { importId: 21, periodStart: '2026-09-07', periodEnd: '2026-10-04', property: 'https://noblessegold.com/' } },
      ga4: { before: { importId: 14, periodStart: '2026-08-08', periodEnd: '2026-09-04' }, after: null } },
    issues: [], limitations: ['계절성과 검색어 구성을 완전히 맞출 수 없습니다.'], ...overrides,
  };
}

const components = load();
const html = value => renderToStaticMarkup(React.createElement(components.ControlComparison, { value }));
function rows(markup) {
  return [...markup.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].filter(match => match[1].includes('scope="row"')).map(match => {
    const cells = [...match[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(cell => cell[1].replace(/<[^>]*>/g, ''));
    return { label: cells[0], values: cells.slice(1) };
  });
}

test('real rendered metric tables distinguish missing values from measured zero', () => {
  const rendered = html(fixture());
  const byLabel = new Map(rows(rendered).map(row => [row.label, row.values]));
  assert.deepEqual(byLabel.get('노출'), ['미확인', '0', '—', '100', '200', '+100']);
  assert.deepEqual(byLabel.get('클릭').slice(0, 3), ['0', '미확인', '—']);
  assert.deepEqual(byLabel.get('CTR').slice(0, 3), ['0.00%', '미확인', '—']);
  assert.deepEqual(byLabel.get('평균 게재 순위').slice(0, 3), ['미확인', '0.00', '—']);
  assert.deepEqual(byLabel.get('조회').slice(0, 3), ['미확인', '0', '—']);
  assert.match(rendered, /누락된 행은 0으로 채우지 않습니다/);
  assert.match(rendered, /scope="colgroup"/);
  assert.match(rendered, /role="region"/);
});

test('confounded, source-mismatch and reported issues hide every numeric change', () => {
  for (const override of [{ status: 'confounded' }, { status: 'source_mismatch' }, { issues: [{ code: 'SOURCE_CHANGED', message: '원본이 변경되었습니다.' }] }]) {
    const rendered = html(fixture(override));
    for (const row of rows(rendered)) {
      assert.equal(row.values[2], '비교 보류'); assert.equal(row.values[5], '비교 보류');
    }
    assert.ok(!rendered.includes('+100'));
  }
  assert.match(html(fixture({ status: 'source_mismatch' })), /기준 자료 확인 · 비교 보류/);
});

test('fixed windows and actually used originals have distinct visible dates, IDs and time-zone assumptions', () => {
  const rendered = html(fixture());
  assert.match(rendered, /고정 사후 기간: 2026-09-07 ~ 2026-10-04 \(28일\) · America\/Los_Angeles/);
  assert.match(rendered, /고정 사후 기간: 2026-09-08 ~ 2026-10-05 \(28일\) · Asia\/Seoul 가정/);
  assert.match(rendered, /변경 전 원본: #13 · 2026-08-07 ~ 2026-09-03 · https:\/\/noblessegold\.com\//);
  assert.match(rendered, /배포 후 원본: #21 · 2026-09-07 ~ 2026-10-04/);
  assert.match(rendered, /변경 전 원본: #14 · 2026-08-08 ~ 2026-09-04/);
  assert.match(rendered, /배포 후 원본: 사용 가능한 자료 없음/);
  assert.match(rendered, /인과효과나 통계적으로 입증된 상승으로 해석하지 않습니다/);
});

function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }

async function harness() {
  const hooks = [], effects = [];
  let cursor = 0, effectRegistered = false, tree;
  const react = {
    useState(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = typeof initial === 'function' ? initial() : initial;
      return [hooks[i], value => { hooks[i] = typeof value === 'function' ? value(hooks[i]) : value; }]; },
    useRef(initial) { const i = cursor++; return hooks[i] ||= { current: initial }; },
    useEffect(fn) { cursor++; if (!effectRegistered) { effectRegistered = true; effects.push(fn); } },
  };
  const gets = [], posts = [];
  const baselines = [{ id: 65, kind: 'update', deployedAt: '2026-09-06T00:00:00Z', guideSlug: 'treatment', topic: '변경 글' },
    { id: 66, kind: 'update', deployedAt: null, guideSlug: 'undeployed', topic: '미배포' }, { id: 67, kind: 'new', deployedAt: '2026-09-06T00:00:00Z', guideSlug: 'new-guide', topic: '신규' }];
  const api = {
    get: target => {
      if (target === '/analytics/comparisons') return Promise.resolve(baselines);
      if (target === '/analytics/comparison-controls') return Promise.resolve([]);
      if (target === '/guides') return Promise.resolve(['treatment', 'control-a', 'control-b'].map(slug => ({ slug, title: slug })));
      assert.match(target, /^\/analytics\/comparisons\/65\/control\?slug=/);
      const request = deferred(); gets.push({ target, ...request }); return request.promise;
    },
    post: (target, body) => { const request = deferred(); posts.push({ target, body, ...request }); return request.promise; },
  };
  const jsx = (type, props) => ({ type, props });
  const component = load({ react, api, runtime: { jsx, jsxs: jsx, Fragment: 'fragment' } });
  function render() { cursor = 0; tree = component.ComparisonControlsPage(); effects.splice(0).forEach(fn => fn()); }
  function nodes(value = tree) { return Array.isArray(value) ? value.flatMap(item => nodes(item ?? null)) : value && typeof value === 'object' ? [value, ...nodes(value.props?.children ?? null)] : []; }
  const text = value => Array.isArray(value) ? value.map(text).join('') : value && typeof value === 'object' ? text(value.props?.children) : String(value ?? '');
  const field = label => nodes(nodes().find(node => node.type === 'label' && text(node).startsWith(label))).find(node => ['select', 'textarea'].includes(node.type));
  function change(label, value) { field(label).props.onChange({ target: { value } }); render(); }
  function inspect() { const promise = nodes().find(node => node.type === 'button' && ['원문과 비교 조건 확인', '확인 중…'].includes(text(node))).props.onClick(); render(); return promise; }
  const submitHandler = () => nodes().find(node => node.type === 'form').props.onSubmit;
  function save() { const promise = submitHandler()({ preventDefault() {} }); render(); return promise; }
  const preview = slug => ({ ...fixture(), canRegister: true, control: { ...fixture().control, slug, sourceHash: `source-${slug}`, indexEntryHash: `index-${slug}` } });
  render(); await tick(); render();
  change('그대로 둘 가이드', 'control-a'); change('선정 이유와 비교의 한계', '같은 주제의 가이드로 노출 규모와 자료 범위가 비슷하지만 검색어 구성은 다릅니다.');
  return { render, nodes, field, text, change, inspect, save, submitHandler, gets, posts, preview };
}

test('only deployed updates are offered and changing control clears old preview before registration', async () => {
  const ui = await harness();
  assert.deepEqual(ui.nodes(ui.field('배포한 기존 글')).filter(node => node.type === 'option').map(node => String(node.props.value)), ['', '65']);
  assert.ok(!ui.nodes(ui.field('그대로 둘 가이드')).some(node => node.type === 'option' && node.props.value === 'treatment'));
  const first = ui.inspect(); ui.gets[0].resolve(ui.preview('control-a')); await first; ui.render();
  ui.change('그대로 둘 가이드', 'control-b'); await ui.save();
  assert.equal(ui.posts.length, 0, 'cleared preview cannot authorize the newly selected control');
  const second = ui.inspect(); ui.gets[1].resolve(ui.preview('control-b')); await second; ui.render();
  const saved = ui.save();
  assert.equal(ui.posts.length, 1);
  assert.equal(ui.posts[0].body.controlSlug, 'control-b');
  assert.equal(ui.posts[0].body.expectedSourceHash, 'source-control-b');
  assert.equal(ui.posts[0].body.expectedIndexEntryHash, 'index-control-b');
  ui.posts[0].resolve(fixture({ control: { ...fixture().control, slug: 'control-b' } })); await saved;
});

test('a late preview after selection changes cannot register stale data or leave the new selection locked', async () => {
  const ui = await harness();
  const first = ui.inspect();
  // Exercise an already captured selection callback at an async boundary.
  ui.change('그대로 둘 가이드', 'control-b');
  ui.gets[0].resolve(ui.preview('control-a')); await first; ui.render();
  await ui.save(); assert.equal(ui.posts.length, 0);
  assert.equal(ui.field('그대로 둘 가이드').props.disabled, false, 'discarding an obsolete response must also release its busy state');
});

test('a previous render save callback cannot register its old preview after a different control is selected', async () => {
  const ui = await harness();
  const first = ui.inspect(); ui.gets[0].resolve(ui.preview('control-a')); await first; ui.render();
  const oldSave = ui.submitHandler();
  ui.change('그대로 둘 가이드', 'control-b');
  const saved = oldSave({ preventDefault() {} });
  // Settle an unexpected mutation as well, so a failing regression leaves no pending promise.
  if (ui.posts.length) ui.posts[0].resolve(fixture());
  await saved;
  assert.equal(ui.posts.length, 0, 'registration must check the latest selected control, including already captured event handlers');
});

test('two registration submissions send one POST and the returned row becomes the registered comparison', async () => {
  const ui = await harness();
  const previewing = ui.inspect(); ui.gets[0].resolve(ui.preview('control-a')); await previewing; ui.render();
  const handler = ui.submitHandler();
  const first = handler({ preventDefault() {} }); const second = handler({ preventDefault() {} });
  assert.equal(ui.posts.length, 1);
  ui.posts[0].resolve(fixture()); await Promise.all([first, second]); ui.render();
  assert.ok(ui.nodes().some(node => typeof node.type === 'function' && node.type.name === 'ControlComparison' && node.props.value.baselineId === 65));
  assert.ok(!ui.nodes().some(node => node.type === 'form'), 'a registered comparison does not offer duplicate registration');
});
