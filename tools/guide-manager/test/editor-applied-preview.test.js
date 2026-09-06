const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('esbuild');

const file = path.resolve(__dirname, '../client/src/Editor.jsx');
const compiled = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
const tick = () => new Promise(resolve => setImmediate(resolve));

function load({ react = React, api = {} } = {}) {
  const dummy = () => null;
  const ui = new Proxy({
    useListState: ({ rows }) => ({ view: rows, total: rows.length, filter: 'all' }),
    dateTime: String, shortDate: String, fmt: String,
    Badge: ({ children }) => React.createElement('span', null, children),
  }, { get: (target, key) => target[key] || dummy });
  const loaded = new Module(file, module);
  loaded.filename = file; loaded.paths = Module._nodeModulePaths(path.dirname(file));
  loaded.require = name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return require('react/jsx-runtime');
    if (name === './api') return { api };
    if (name === './ui') return ui;
    if (name === 'lucide-react') return new Proxy({}, { get: () => dummy });
    throw new Error(`Unexpected Editor dependency: ${name}`);
  };
  loaded._compile(compiled, file);
  return loaded.exports;
}

// Same shape as an applied source-only update: preserved public paths, no paid
// image assets, no humanized draft, and no automation history. No live data reads.
function fixture() {
  return {
    id: 218, kind: 'update', status: 'applied', revision: 7, topic: '보존 이미지가 있는 수정',
    target_slug: 'preserved-guide', updated_at: '2026-09-06T00:00:00Z',
    input: { sourceReviewVersion: 1, updatePolicy: { scope: { fields: ['sourceNote', 'sources'], preserveImages: true } } },
    research: { official: { sources: [{ url: 'https://example.org/evidence', selected: true }] } },
    sourceReviewContexts: [], images: [], humanized: null, lint: { blocking: false, findings: [] },
    draft: {
      title: '보존 이미지와 출처 보강', publishedAt: '2026-08-01', category: '주얼리 관리',
      heroImage: { path: '/Image/guide/preserved-hero.webp', alt: '보존된 대표 이미지 설명', caption: '대표 이미지의 원래 캡션' },
      sections: [{ title: '기존 본문', paragraphs: ['원래 문장을 유지합니다.'],
        image: { path: '/Image/guide/preserved-section.webp', alt: '보존된 본문 이미지 설명', caption: '본문 이미지의 원래 캡션' } }],
    },
  };
}

const components = load();
const preview = generation => renderToStaticMarkup(React.createElement(components.GuidePreview, { generation, draft: generation.draft }));

function nodes(root) {
  const output = [];
  const visit = node => {
    if (Array.isArray(node)) { node.forEach(visit); return; }
    if (!node || typeof node !== 'object') return;
    output.push(node); visit(node.props?.children);
  };
  visit(root); return output;
}

async function editorHarness(t, generation) {
  const hooks = [], dependencies = [];
  let cursor = 0, effects = [];
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
      if (!dependencies[index] || deps.some((value, i) => value !== dependencies[index][i])) {
        dependencies[index] = deps; effects.push(fn);
      }
    },
  };
  const stored = new Map();
  const globals = {
    localStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value), removeItem: key => stored.delete(key) },
    window: { addEventListener() {}, removeEventListener() {}, location: { search: '' } },
  };
  for (const [name, value] of Object.entries(globals)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    t.after(() => { if (previous) Object.defineProperty(globalThis, name, previous); else delete globalThis[name]; });
  }
  const mutations = [];
  const api = {
    async get(target) {
      if (target === '/generations') return [{ id: generation.id, kind: generation.kind, status: generation.status, topic: generation.topic }];
      if (target === '/guides' || target === '/clusters') return [];
      assert.equal(target, `/generations/${generation.id}`);
      return generation;
    },
    async post(...args) { mutations.push(args); }, async put(...args) { mutations.push(args); },
  };
  const { Editor } = load({ react, api });
  const render = () => {
    cursor = 0;
    const tree = Editor({ seed: null, clearSeed() {} });
    const pending = effects; effects = []; pending.forEach(fn => fn());
    return tree;
  };
  render(); await tick(); render(); await tick();
  return { tree: render(), render, mutations, stored };
}

test('applied records are complete without claiming optional polishing or image generation ran', () => {
  for (const overrides of [{}, { kind: 'new' }, { input: { draftMode: 'reviewed_page_query_snippet' }, lint: null }]) {
    const generation = { ...fixture(), ...overrides };
    const steps = components.guideSteps(generation, generation.draft);
    assert.deepEqual(steps.map(step => step.key), ['approve', 'apply']);
    assert.ok(steps.every(step => step.done));
  }
});

test('the actual applied Editor shows completion and cannot launch its suggested paid next step', async t => {
  const editor = await editorHarness(t, fixture());
  const html = renderToStaticMarkup(editor.tree);
  assert.match(html, /모든 단계가 끝났습니다/);
  assert.doesNotMatch(html, /다음 할 일은|여기부터 자동 진행|step-action/);
  assert.match(html, /원고 편집/, 'the existing explicit re-edit path stays available');
  const rail = nodes(editor.tree).find(node => node.type?.name === 'StepRail');
  assert.equal(rail.props.currentIndex, -1);
  for (const key of ['official', 'draft', 'image', 'polish', 'approve', 'apply']) await rail.props.onStep({ key });
  assert.equal(editor.mutations.length, 0);
  assert.equal(editor.stored.has('guide-manager-draft-v1:218'), false);
  assert.equal(editor.stored.has('guide-manager-raw-draft-v1:218'), false);
});

test('reopened draft and approved-but-unapplied work keep their original workflow', () => {
  const generation = fixture();
  generation.status = 'draft';
  let steps = components.guideSteps(generation, generation.draft);
  assert.ok(steps.some(step => step.key === 'polish' && !step.done));
  assert.equal(steps.find(step => step.key === 'apply').done, false);
  generation.status = 'approved';
  steps = components.guideSteps(generation, generation.draft);
  assert.equal(steps.find(step => step.key === 'approve').done, true);
  assert.equal(steps.find(step => step.key === 'apply').done, false);
});

test('preserved hero and body images render their exact public paths, alt text and captions', () => {
  const html = preview(fixture());
  assert.match(html, /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-hero\.webp"/);
  assert.match(html, /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-section\.webp"/);
  for (const text of ['보존된 대표 이미지 설명', '대표 이미지의 원래 캡션', '보존된 본문 이미지 설명', '본문 이미지의 원래 캡션']) assert.ok(html.includes(text));
  assert.doesNotMatch(html, /대표 이미지 생성 대기|image-placeholder/);
});

test('only active generated assets matching the exact draft path use the local preview', () => {
  const generation = fixture();
  generation.images = [
    { slot: 'hero', status: 'superseded', publicPath: '/Image/old.webp' },
    { slot: 'hero', status: 'active', publicPath: generation.draft.heroImage.path },
    { slot: 'section-1', status: 'active', publicPath: generation.draft.sections[0].image.path },
  ];
  let html = preview(generation);
  assert.match(html, /src="\/generated-images\/218\/preserved-hero\.webp"/);
  assert.match(html, /src="\/generated-images\/218\/preserved-section\.webp"/);
  assert.doesNotMatch(html, /old\.webp|src="https:/);
  generation.images = generation.images.filter(asset => asset.status !== 'active');
  html = preview(generation);
  assert.match(html, /noblessegold\.com\/Image\/guide\/preserved-hero\.webp/);
});

test('an unreferenced active asset cannot override a replacement path or restore a removed section image', () => {
  const generation = fixture();
  generation.images = [
    { slot: 'hero', status: 'active', publicPath: '/Image/guide/old-hero.webp' },
    { slot: 'section-1', status: 'active', publicPath: '/Image/guide/removed-section.webp' },
  ];
  generation.draft.sections[0].image = null;
  let html = preview(generation);
  assert.match(html, /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-hero\.webp"/);
  assert.equal((html.match(/<img /g) || []).length, 1);
  assert.doesNotMatch(html, /old-hero|removed-section|generated-images/);
  generation.draft.heroImage.path = '';
  html = preview(generation);
  assert.doesNotMatch(html, /<img /);
  generation.status = 'draft';
  assert.equal(components.guideSteps(generation, generation.draft).find(step => step.key === 'image').done, false);
});

test('moving a section still resolves its referenced active image regardless of the original slot', () => {
  const generation = fixture();
  generation.images = [{ slot: 'section-6', status: 'active', publicPath: generation.draft.sections[0].image.path }];
  assert.match(preview(generation), /src="\/generated-images\/218\/preserved-section\.webp"/);
  generation.images[0].publicPath = '/image/guide/preserved-section.webp';
  assert.match(preview(generation), /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-section\.webp"/);
});

test('image management also displays preserved images without changing regeneration controls', async t => {
  const editor = await editorHarness(t, fixture());
  const tab = nodes(editor.tree).find(node => node.props?.role === 'tab' && String(node.props.children).startsWith('이미지'));
  tab.props.onClick();
  const html = renderToStaticMarkup(editor.render());
  assert.match(html, /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-hero\.webp"/);
  assert.match(html, /src="https:\/\/noblessegold\.com\/Image\/guide\/preserved-section\.webp"/);
  assert.match(html, /다시 생성/);
  assert.equal(editor.mutations.length, 0);
});

test('missing or non-site image paths cannot create an external preserved-image request', () => {
  for (const savedPath of ['', '//other.example/image.webp', '/\\other.example/image.webp', '/\t/other.example/image.webp', 'https://other.example/image.webp', 'javascript:alert(1)']) {
    const generation = fixture();
    generation.draft.heroImage.path = savedPath;
    generation.draft.sections = [];
    const html = preview(generation);
    assert.doesNotMatch(html, /<img/);
    assert.match(html, /대표 이미지 생성 대기/);
  }
});
