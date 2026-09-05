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
  const freshFrame = () => ({ hooks: [], effectDeps: [], cursor: 0, pendingEffects: [] });
  const parentFrame = freshFrame();
  const draftFrames = new Map();
  let frame = parentFrame;
  const react = {
    useState(initial) {
      const owner = frame, index = owner.cursor++;
      if (!(index in owner.hooks)) owner.hooks[index] = typeof initial === 'function' ? initial() : initial;
      return [owner.hooks[index], value => { owner.hooks[index] = typeof value === 'function' ? value(owner.hooks[index]) : value; }];
    },
    useRef(initial) { const index = frame.cursor++; return frame.hooks[index] ||= { current: initial }; },
    useMemo(fn) { frame.cursor++; return fn(); },
    useEffect(fn, deps) {
      const index = frame.cursor++;
      if (!frame.effectDeps[index] || deps.some((value, i) => value !== frame.effectDeps[index][i])) {
        frame.effectDeps[index] = deps;
        frame.pendingEffects.push(fn);
      }
    },
  };
  const stored = new Map();
  const listeners = new Map();
  const globals = {
    localStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value), removeItem: key => stored.delete(key) },
    window: { addEventListener(name, callback) { listeners.set(name, callback); }, removeEventListener(name) { listeners.delete(name); }, location: { search: '' } },
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
    frame = parentFrame; frame.cursor = 0;
    tree = loaded.exports.Editor({ seed: null, clearSeed() {} });
    const effects = frame.pendingEffects;
    frame.pendingEffects = [];
    effects.forEach(fn => fn());
    return tree;
  };
  const nodes = (root = tree) => {
    const output = [];
    function visit(node) {
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (!node || typeof node !== 'object') return;
      output.push(node);
      visit(node.props?.children);
    }
    visit(root);
    return output;
  };
  const draft = () => nodes().find(node => typeof node.type === 'function' && node.type.name === 'DraftTab');
  const renderDraft = () => {
    const node = draft();
    assert.ok(node, 'open the draft tab first');
    if (!draftFrames.has(node.props.generationId)) draftFrames.set(node.props.generationId, freshFrame());
    frame = draftFrames.get(node.props.generationId); frame.cursor = 0;
    const result = node.type(node.props);
    const effects = frame.pendingEffects; frame.pendingEffects = [];
    effects.forEach(fn => fn());
    return result;
  };
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
  return { render, renderDraft, nodes, draft, openDraft, select, takeRequest, generation, initialDraft, stored, mutations, listeners };
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

function editRaw(editor, text) {
  editor.openDraft();
  editor.renderDraft();
  let tree = editor.renderDraft();
  const open = editor.nodes(tree).find(node => node.type === 'button' && node.props.children === '구조 JSON 편집');
  if (open) { open.props.onClick(); tree = editor.renderDraft(); }
  editor.nodes(tree).find(node => node.type === 'textarea' && node.props.className === 'json-editor').props.onChange({ target: { value: text } });
  editor.render();
}

test('미완성 JSON도 상위 미저장 상태와 새로고침 보호에 포함하고 승인·반영을 막는다', async t => {
  const editor = await editorHarness(t);
  editRaw(editor, '{ "title": ');
  assert.equal(editor.draft().props.hasRawDraft, true);
  let protectedUnload = false;
  editor.listeners.get('beforeunload')({ preventDefault() { protectedUnload = true; } });
  assert.equal(protectedUnload, true);
  const rail = editor.nodes().find(node => node.type?.name === 'StepRail');
  await rail.props.onStep({ key: 'approve' });
  await rail.props.onStep({ key: 'apply' });
  assert.equal(editor.mutations.length, 0);
  assert.equal(JSON.parse(editor.stored.get('guide-manager-raw-draft-v1:1')).raw, '{ "title": ');
});

test('일반 원고 저장은 다른 고급 JSON 임시본을 지우지 않고 최신 버전과 비교하도록 보관한다', async t => {
  const editor = await editorHarness(t);
  const raw = JSON.stringify({ ...editor.generation(1).draft, title: 'JSON에만 남긴 수정' });
  editRaw(editor, raw);
  const before = editor.stored.get('guide-manager-raw-draft-v1:1');
  const save = editor.draft().props.onSave({ ...editor.generation(1).draft, description: '기본 화면에서만 수정한 설명' });
  await tick(); editor.takeRequest(1).resolve({ ...editor.generation(1), revision: 2 }); await save;
  editor.render();
  assert.equal(editor.stored.get('guide-manager-raw-draft-v1:1'), before);
  assert.equal(editor.draft().props.hasRawDraft, true);
  editor.renderDraft();
  assert.ok(editor.nodes(editor.renderDraft()).some(node => node.type === 'strong' && node.props.children === '임시 JSON의 기준 원고와 서버 버전이 다릅니다.'));
  assert.equal(editor.mutations[0][1].draft.title, '원고 1');
});

test('작업 전환 뒤 JSON을 복원하고 서버가 바뀐 경우 전송 전에 원고 비교로 연결한다', async t => {
  const editor = await editorHarness(t);
  editRaw(editor, JSON.stringify({ ...editor.generation(1).draft, title: '복원할 JSON 제목' }));
  let change = editor.select(2); editor.takeRequest(2).resolve(editor.generation(2)); await change;
  editor.render(); assert.equal(editor.openDraft().props.hasRawDraft, false);
  change = editor.select(1); editor.takeRequest(1).resolve({ ...editor.generation(1), revision: 2 }); await change;
  editor.render(); assert.equal(editor.openDraft().props.hasRawDraft, true);
  editor.renderDraft();
  const tree = editor.renderDraft();
  assert.equal(editor.nodes(tree).find(node => node.props.className === 'json-editor').props.value.includes('복원할 JSON 제목'), true);
  await editor.nodes(tree).find(node => node.type === 'button' && Array.isArray(node.props.children) && node.props.children.includes('JSON 비교·확인')).props.onClick();
  editor.render();
  assert.equal(editor.mutations.length, 0);
  assert.equal(editor.draft().props.draft.title, '복원할 JSON 제목');
  assert.ok(editor.nodes().some(node => node.type === 'button' && node.props.children === '최신 원고 확인 · 내 편집 유지'));
  assert.ok(editor.stored.has('guide-manager-raw-draft-v1:1'));
});

test('JSON 저장 성공은 전송한 버퍼만 지우며 명시 폐기는 상위 미저장 상태도 해제한다', async t => {
  const editor = await editorHarness(t);
  const edited = { ...editor.generation(1).draft, title: 'JSON 저장한 제목' };
  editRaw(editor, JSON.stringify(edited));
  const tree = editor.renderDraft();
  const save = editor.nodes(tree).find(node => node.type === 'button' && Array.isArray(node.props.children) && node.props.children.includes('JSON 저장·재검사')).props.onClick();
  await tick(); editor.takeRequest(1).resolve({ ...editor.generation(1), draft: edited, revision: 2 }); await save;
  editor.render();
  assert.equal(editor.mutations[0][1].draft.title, edited.title);
  assert.equal(editor.stored.has('guide-manager-raw-draft-v1:1'), false);
  assert.equal(editor.draft().props.hasRawDraft, false);
  editRaw(editor, '{ unfinished');
  editor.nodes(editor.renderDraft()).find(node => node.type === 'button' && node.props.children === 'JSON 입력 폐기').props.onClick();
  editor.render();
  assert.equal(editor.stored.has('guide-manager-raw-draft-v1:1'), false);
  assert.equal(editor.draft().props.hasRawDraft, false);
});
