const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const Module = require('module');
const { transformSync } = require('esbuild');

const editorFile = path.resolve(__dirname, '../client/src/Editor.jsx');
const compiled = transformSync(fs.readFileSync(editorFile, 'utf8'), {
  loader: 'jsx', format: 'cjs', jsx: 'automatic',
}).code;
const tick = () => new Promise(resolve => setImmediate(resolve));

// Run the real Editor component and its event-handler closures without a browser,
// database, or network. State changes are rendered explicitly to control request order.
async function editorHarness(t) {
  const hooks = [];
  const effectDeps = [];
  let cursor = 0;
  let pendingEffects = [];
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in hooks)) hooks[index] = typeof initial === 'function' ? initial() : initial;
      return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; return hooks[index] ||= { current: initial }; },
    useMemo(fn) { cursor++; return fn(); },
    useEffect(fn, deps) {
      const index = cursor++;
      if (!effectDeps[index] || deps.some((value, i) => value !== effectDeps[index][i])) {
        effectDeps[index] = deps;
        pendingEffects.push(fn);
      }
    },
  };
  const stored = new Map();
  const globals = {
    localStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value), removeItem: key => stored.delete(key) },
    window: { addEventListener() {}, removeEventListener() {}, location: { search: '' } },
    confirm: () => true,
  };
  for (const [name, value] of Object.entries(globals)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    t.after(() => { if (previous) Object.defineProperty(globalThis, name, previous); else delete globalThis[name]; });
  }
  const requests = [];
  const mutations = [];
  const rows = [
    { id: 1, kind: 'new', status: 'draft', topic: '첫 번째 글' },
    { id: 2, kind: 'new', status: 'draft', topic: '두 번째 글' },
  ];
  const generation = id => ({
    id, kind: 'new', topic: rows[id - 1].topic, status: 'draft', revision: 1,
    input: {}, research: {}, images: [], draft: { title: `원고 ${id}`, slug: `article-${id}`, sections: [] },
  });
  const api = {
    get(target) {
      if (target === '/generations') return Promise.resolve(rows);
      if (target === '/guides' || target === '/clusters') return Promise.resolve([]);
      if (/^\/generations\/\d+\/diff$/.test(target)) return Promise.resolve({ files: [], images: [] });
      assert.match(target, /^\/generations\/\d+$/);
      return new Promise((resolve, reject) => requests.push({ target, resolve, reject }));
    },
    put: async (...args) => { mutations.push(args); return {}; },
    post: async (...args) => { mutations.push(args); return {}; },
  };
  const dummy = () => null;
  const ui = new Proxy({
    useListState: ({ rows }) => ({ view: rows, total: rows.length, filter: 'all' }),
    dateTime: () => '', shortDate: () => '', fmt: String,
  }, { get: (target, key) => target[key] || dummy });
  const jsx = (type, props, key) => ({ type, props: { ...props, key } });
  const loaded = new Module(editorFile, module);
  loaded.filename = editorFile;
  loaded.paths = Module._nodeModulePaths(path.dirname(editorFile));
  loaded.require = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
    if (name === './api') return { api };
    if (name === './ui') return ui;
    if (name === 'lucide-react') return new Proxy({}, { get: () => dummy });
    throw new Error(`Unexpected Editor dependency: ${name}`);
  };
  loaded._compile(compiled, editorFile);
  let tree;
  const render = () => {
    cursor = 0;
    tree = loaded.exports.Editor({ seed: null, clearSeed() {} });
    const effects = pendingEffects;
    pendingEffects = [];
    effects.forEach(fn => fn());
    return tree;
  };
  const nodes = () => {
    const output = [];
    function visit(node) {
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (!node || typeof node !== 'object') return;
      output.push(node);
      visit(node.props?.children);
    }
    visit(tree);
    return output;
  };
  const draft = () => nodes().find(node => typeof node.type === 'function' && node.type.name === 'DraftTab');
  const openDraft = () => {
    nodes().find(node => node.type === 'button' && node.props.role === 'tab' && node.props.children === '원고 편집').props.onClick();
    render();
    return draft();
  };
  const select = id => {
    const pending = nodes().find(node => node.props.className?.startsWith('work-item ') && node.props.key === id).props.onClick();
    render();
    return pending;
  };
  const takeRequest = id => {
    const request = requests.shift();
    assert.equal(request?.target, `/generations/${id}`);
    return request;
  };
  render();
  await tick();
  render();
  takeRequest(1).resolve(generation(1));
  await tick();
  render();
  const initialDraft = openDraft();
  assert.equal(initialDraft.props.generationId, 1);
  return { render, nodes, draft, openDraft, select, takeRequest, generation, initialDraft, stored, mutations };
}

test('수동 검색어 교정안은 유료 작업 대신 검사·비교·승인으로 안내하고 기존 버튼 콜백도 요청하지 않는다', async t => {
  const editor = await editorHarness(t);
  const manual = { ...editor.generation(1), kind: 'update', input: { draftMode: 'reviewed_page_query_snippet' }, lint: { blocking: false, findings: [] } };
  const pending = editor.select(1);
  editor.takeRequest(1).resolve(manual);
  await pending;
  editor.render();
  const rail = () => editor.nodes().find(node => typeof node.type === 'function' && node.type.name === 'StepRail');
  assert.deepEqual(rail().props.steps.map(step => step.key), ['lint', 'compare', 'approve', 'apply']);
  assert.equal(rail().props.steps[rail().props.currentIndex].key, 'compare');
  const tabs = editor.nodes().filter(node => node.props.role === 'tab').map(node => node.props.children);
  assert.deepEqual(tabs, ['미리보기', '원고 편집', '검사·반영']);
  for (const key of ['official', 'draft', 'polish', 'image']) await rail().props.onStep({ key });
  assert.equal(editor.mutations.length, 0, '남아 있는 재작성·조사 콜백도 유료 요청을 만들지 않음');

  const compare = rail().props.onStep({ key: 'compare' });
  await tick();
  editor.takeRequest(1).resolve(manual);
  await compare;
  editor.render();
  assert.equal(rail().props.steps[rail().props.currentIndex].key, 'approve');
  editor.openDraft().props.onChange({ ...manual.draft, description: '비교 뒤 수정한 설명' });
  editor.render();
  assert.equal(rail().props.steps[rail().props.currentIndex].key, 'compare', '비교 뒤 편집하면 최신 원고를 다시 비교하도록 안내');
  assert.equal(editor.mutations.length, 0);
});

test('글 전환 응답 대기 중 이전 글의 편집 폼을 표시하지 않는다', async t => {
  const editor = await editorHarness(t);
  const pending = editor.select(2);
  assert.equal(editor.draft(), undefined);
  editor.takeRequest(2).resolve(editor.generation(2));
  await pending;
  editor.render();
  assert.equal(editor.openDraft().props.generationId, 2);
});

test('이전 화면의 저장 콜백은 새로 선택한 글에 원고를 전송하지 않는다', async t => {
  const editor = await editorHarness(t);
  const pending = editor.select(2);
  await editor.initialDraft.props.onSave({ title: '이전 글에서 남은 원고' });
  assert.equal(editor.mutations.length, 0);
  editor.takeRequest(2).resolve(editor.generation(2));
  await pending;
});

test('이전 화면의 편집 콜백은 새 글의 임시 보관 원고를 오염시키지 않는다', async t => {
  const editor = await editorHarness(t);
  const pending = editor.select(2);
  editor.initialDraft.props.onChange({ title: '이전 글에서 남은 편집' });
  assert.equal(editor.stored.has('guide-manager-draft-v1:2'), false);
  assert.equal(editor.mutations.length, 0);
  editor.takeRequest(2).resolve(editor.generation(2));
  await pending;
});

test('응답 순서가 역전돼도 마지막에 선택한 글만 표시한다', async t => {
  const editor = await editorHarness(t);
  const oldSelection = editor.select(2);
  const delayed = editor.takeRequest(2);
  const latestSelection = editor.select(1);
  editor.takeRequest(1).resolve(editor.generation(1));
  await latestSelection;
  delayed.resolve(editor.generation(2));
  await oldSelection;
  editor.render();
  assert.equal(editor.openDraft().props.generationId, 1);
});

test('새 글 요청이 실패해도 이전 글을 새 ID로 편집할 수 없고 재시도를 제공한다', async t => {
  const editor = await editorHarness(t);
  const pending = editor.select(2);
  editor.takeRequest(2).reject(new Error('연결 실패'));
  await pending;
  editor.render();
  assert.equal(editor.draft(), undefined);
  assert.ok(editor.nodes().some(node => node.type === 'button' && node.props.children === '다시 불러오기'));
  await editor.initialDraft.props.onSave({ title: '실패 후 남은 이전 원고' });
  assert.equal(editor.mutations.length, 0);
});
