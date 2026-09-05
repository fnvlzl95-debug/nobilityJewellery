const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const { transformSync } = require('esbuild');

process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-outcome-regression-'));
const { db } = require('../server/lib/db');
const measurement = require('../server/services/measurementService');
let server, base, token;
const day = '2024-01-02';
const receipt = 'NG-00000000000040008000000000000001';

test.before(async () => {
  for (const slug of ['fixture-a', 'fixture-b']) db.prepare('INSERT INTO guides(slug,path,title,source_path,scanned_at) VALUES(?,?,?,?,?)')
    .run(slug, `/guide/${slug}`, `격리 검증 ${slug}`, path.join(process.env.GUIDE_MANAGER_DATA_DIR, `${slug}.vue`), new Date().toISOString());
  const express = require('express');
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ code: error.code, error: error.message }));
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
  token = (await (await fetch(`${base}/session`)).json()).token;
});
test.beforeEach(() => db.prepare('DELETE FROM guide_outcomes').run());
test.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); db.close(); });

async function post(body) {
  const response = await fetch(`${base}/measurement/outcomes`, { method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': token }, body: JSON.stringify(body) });
  return { status: response.status, body: await response.json() };
}

const componentFile = path.resolve(__dirname, '../client/src/Measurement.jsx');
const compiled = transformSync(fs.readFileSync(componentFile, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
const tick = () => new Promise(resolve => setImmediate(resolve));

// Execute actual component handlers, real HTTP routes and an isolated SQLite database.
async function harness({ afterCommit, beforePost } = {}) {
  const hooks = [];
  let cursor = 0, effectQueued = false, tree;
  const pending = [];
  const calls = [];
  const gets = [];
  const react = {
    useState(initial) { const i = cursor++; if (!(i in hooks)) hooks[i] = typeof initial === 'function' ? initial() : initial;
      return [hooks[i], value => { hooks[i] = typeof value === 'function' ? value(hooks[i]) : value; }]; },
    useRef(initial) { const i = cursor++; return hooks[i] ||= { current: initial }; },
    useEffect(fn) { cursor++; if (!effectQueued) { effectQueued = true; pending.push(fn); } },
  };
  const api = {
    get: async endpoint => { gets.push(endpoint); return endpoint === '/measurement' ? measurement.listOutcomes() : [{ slug: 'fixture-a', title: '검증 A' }, { slug: 'fixture-b', title: '검증 B' }]; },
    post: async (endpoint, body) => {
      assert.equal(endpoint, '/measurement/outcomes'); calls.push(body);
      await beforePost?.(calls.length);
      const result = await post(body);
      if (result.status !== 200) throw new Error(result.body.error);
      await afterCommit?.(calls.length);
      return result.body;
    },
  };
  const jsx = (type, props) => ({ type, props });
  const loaded = new Module(componentFile, module);
  loaded.filename = componentFile; loaded.paths = Module._nodeModulePaths(path.dirname(componentFile));
  loaded.require = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
    if (name === './api') return { api };
    if (name === './ui') return { ErrorNotice: () => null, SuccessNotice: () => null, fmt: String };
    throw new Error(`Unexpected dependency: ${name}`);
  };
  loaded._compile(compiled, componentFile);
  function render() { cursor = 0; tree = loaded.exports.MeasurementPage(); pending.splice(0).forEach(fn => fn()); }
  function nodes(value = tree) { return Array.isArray(value) ? value.flatMap(item => nodes(item ?? null)) : value && typeof value === 'object' ? [value, ...nodes(value.props?.children ?? null)] : []; }
  function text(value) { return Array.isArray(value) ? value.map(text).join('') : value && typeof value === 'object' ? text(value.props?.children) : String(value ?? ''); }
  function field(label) { const node = nodes().find(node => node.type === 'label' && text(node).startsWith(label)); return nodes(node).find(node => ['input', 'select'].includes(node.type)); }
  function change(label, value) { field(label).props.onChange({ target: { value } }); render(); }
  async function submit() { await nodes().find(node => node.type === 'form').props.onSubmit({ preventDefault() {} }); render(); }
  render(); await tick(); render();
  change('유입 가이드', 'fixture-a'); change('상담일', day);
  return { calls, gets, change, submit, render, nodes, field, text };
}

test('online receipt ID survives the real form/API and stage edits retain one linked consultation', async () => {
  const ui = await harness();
  ui.change('접수번호', receipt);
  await ui.submit();
  assert.equal(ui.calls[0].reference, receipt);
  assert.equal(ui.calls[0].mode, 'create');
  assert.equal(measurement.listOutcomes().rows[0].reference, receipt);
  assert.ok(ui.nodes().some(node => node.type === 'p' && ui.text(node).includes(receipt)), 'full receipt remains identifiable');
  ui.nodes().find(node => node.type === 'button' && ui.text(node) === '상담 단계 수정').props.onClick(); ui.render();
  assert.equal(ui.field('접수번호').props.readOnly, true);
  ui.change('현재 단계', 'contract'); await ui.submit();
  assert.equal(ui.calls[1].mode, 'update');
  assert.equal(ui.calls[1].reference, receipt);
  assert.deepEqual(measurement.listOutcomes().totals, { inquiries: 1, qualified: 1, contracts: 1 });
  assert.equal(ui.field('현재 단계').props.value, 'inquiry', 'new consultations do not inherit the prior contract stage');
});

test('a lost response after commit retries the same generated ID and counts the consultation once', async () => {
  const ui = await harness({ afterCommit: count => { if (count === 1) throw new Error('response lost after server commit'); } });
  await ui.submit();
  const stored = db.prepare('SELECT * FROM guide_outcomes').get();
  await ui.submit();
  assert.equal(ui.calls.length, 2);
  assert.equal(ui.calls[0].reference, ui.calls[1].reference);
  assert.deepEqual(db.prepare('SELECT * FROM guide_outcomes').get(), stored, 'an identical retry does not mutate the saved receipt');
  assert.equal(measurement.listOutcomes().totals.inquiries, 1);
  ui.change('유입 가이드', 'fixture-a'); await ui.submit();
  assert.notEqual(ui.calls[2].reference, ui.calls[0].reference, 'a confirmed save releases the generated ID for a genuinely new consultation');
  assert.equal(measurement.listOutcomes().totals.inquiries, 2);
});

test('two submit handlers cannot send concurrent requests for one form', async () => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const ui = await harness({ beforePost: () => gate });
  const first = ui.submit(); const second = ui.submit();
  assert.equal(ui.calls.length, 1);
  release(); await Promise.all([first, second]);
  assert.equal(measurement.listOutcomes().totals.inquiries, 1);
});

test('a response failure refreshes saved rows and lets the operator resolve changed input using the same receipt', async () => {
  const ui = await harness({ afterCommit: count => { if (count === 1) throw new Error('response lost after server commit'); } });
  await ui.submit();
  const reference = ui.calls[0].reference;
  assert.equal(ui.gets.filter(endpoint => endpoint === '/measurement').length, 2, 'recover the committed row after the initial response failed');
  assert.ok(ui.nodes().some(node => node.props.role === 'status' && ui.text(node).includes(reference)));
  ui.change('유입 가이드', 'fixture-b');
  await ui.submit();
  assert.equal(ui.calls[1].reference, reference);
  assert.equal(measurement.listOutcomes().rows[0].guideSlug, 'fixture-a', 'new-mode conflict does not overwrite the original attribution');
  assert.ok(ui.nodes().some(node => node.type === 'button' && ui.text(node) === '상담 단계 수정'));
  assert.equal(ui.field('유입 가이드').props.value, 'fixture-b', 'failed input stays available for review');
  ui.nodes().find(node => node.type === 'button' && ui.text(node) === '상담 단계 수정').props.onClick(); ui.render();
  ui.change('현재 단계', 'qualified'); await ui.submit();
  assert.equal(ui.calls[2].mode, 'update');
  assert.equal(ui.calls[2].reference, reference);
  assert.deepEqual(measurement.listOutcomes().totals, { inquiries: 1, qualified: 1, contracts: 0 });
});

test('an explicit new-consultation action clears a failed pending ID and requires selecting its guide again', async () => {
  const ui = await harness({ beforePost: count => { if (count === 1) throw new Error('connection unavailable before submission'); } });
  await ui.submit();
  assert.equal(measurement.listOutcomes().totals.inquiries, 0);
  const firstReference = ui.calls[0].reference;
  ui.nodes().find(node => node.type === 'button' && ui.text(node) === '다른 새 상담으로 전환').props.onClick(); ui.render();
  assert.equal(ui.field('유입 가이드').props.value, '');
  assert.equal(ui.field('접수번호').props.value, '');
  assert.ok(!ui.nodes().some(node => node.props.role === 'status' && ui.text(node).includes(firstReference)));
  ui.change('유입 가이드', 'fixture-b'); await ui.submit();
  assert.notEqual(ui.calls[1].reference, firstReference);
  assert.equal(measurement.listOutcomes().totals.inquiries, 1);
  assert.equal(measurement.listOutcomes().rows[0].guideSlug, 'fixture-b');
});

test('a new registration with an existing receipt cannot silently overwrite a different guide or stage', async () => {
  const original = { reference: receipt, guideSlug: 'fixture-a', stage: 'inquiry', occurredOn: day, mode: 'create' };
  assert.equal((await post(original)).status, 200);
  const stored = db.prepare('SELECT * FROM guide_outcomes').get();
  for (const changed of [{ guideSlug: 'fixture-b' }, { stage: 'contract' }, { occurredOn: '2024-01-03' }]) {
    const result = await post({ ...original, ...changed });
    assert.equal(result.status, 409); assert.equal(result.body.code, 'OUTCOME_EXISTS');
    assert.deepEqual(db.prepare('SELECT * FROM guide_outcomes').get(), stored);
  }
});

test('editing requires an existing receipt while legacy manual reference upserts stay compatible', async () => {
  const body = { reference: 'legacy-manual-123', guideSlug: 'fixture-a', stage: 'inquiry', occurredOn: day };
  assert.equal((await post({ ...body, mode: 'update' })).status, 404);
  assert.equal(measurement.listOutcomes().totals.inquiries, 0);
  assert.equal((await post(body)).status, 200);
  assert.equal((await post({ ...body, stage: 'qualified' })).status, 200);
  assert.deepEqual(measurement.listOutcomes().totals, { inquiries: 1, qualified: 1, contracts: 0 });
});
