const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('esbuild');

const file = path.resolve(__dirname, '../client/src/ui.jsx');
const compiled = transformSync(fs.readFileSync(file, 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
function load(react = React, runtime = require('react/jsx-runtime')) {
  const loaded = new Module(file, module);
  loaded.filename = file; loaded.paths = Module._nodeModulePaths(path.dirname(file));
  loaded.require = name => name === 'react' ? react : name === 'react/jsx-runtime' ? runtime : require(name);
  loaded._compile(compiled, file);
  return loaded.exports.Modal;
}

test('actual Modal markup names the dialog and its close button without changing the diff wrapper', () => {
  const html = renderToStaticMarkup(React.createElement(load(), { title: '파일 변경 미리보기', eyebrow: 'CHANGESET', onClose() {} }, React.createElement('pre', {}, '변경 원문')));
  assert.match(html, /class="modal-backdrop"/);
  assert.match(html, /class="diff-modal" role="dialog" aria-modal="true"/);
  const labelId = html.match(/aria-labelledby="([^"]+)"/)[1];
  assert.ok(html.includes(`<h2 id="${labelId}">파일 변경 미리보기</h2>`));
  assert.match(html, /<button type="button" aria-label="대화상자 닫기"/);
  assert.match(html, /<svg[^>]*aria-hidden="true"/);
  assert.match(html, /<pre>변경 원문<\/pre>/);
});

// Exercise the compiled component's effects and callbacks against a small DOM
// fixture. No operational API, browser session, or database is involved.
function harness({ children = [], onClose = () => {}, returnFocusTo, openingFocusLost = false } = {}) {
  const listeners = new Map();
  const doc = {
    activeElement: null,
    defaultView: { getComputedStyle: element => ({ visibility: element.props.style?.visibility || 'visible' }) },
    addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
  };
  function dispatch(name, overrides = {}) {
    const event = { target: doc.activeElement, defaultPrevented: false, stopped: false, shiftKey: false,
      preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this.stopped = true; }, ...overrides };
    for (const listener of [...(listeners.get(name) || [])]) listener(event);
    return event;
  }
  function element(type, props = {}, parent = null) {
    return {
      type, props, parent, children: [], ownerDocument: doc, isConnected: true,
      get tabIndex() { return props.tabIndex ?? (['button', 'input', 'select', 'textarea'].includes(type) || (type === 'a' && props.href) || props.contentEditable === true ? 0 : -1); },
      matches(selector) { assert.equal(selector, ':disabled'); return Boolean(props.disabled); },
      closest() { for (let node = this; node; node = node.parent) if (node.props.hidden || node.props.inert || node.props['aria-hidden'] === 'true') return node; return null; },
      getClientRects() { return props.style?.display === 'none' ? [] : [{}]; },
      contains(target) { for (let node = target; node; node = node.parent) if (node === this) return true; return false; },
      querySelectorAll() {
        const all = this.children.flatMap(child => [child, ...child.querySelectorAll()]);
        return all.filter(child => ['button', 'input', 'select', 'textarea'].includes(child.type) || (child.type === 'a' && child.props.href) || child.props.tabIndex !== undefined || child.props.contentEditable === true);
      },
      focus() { doc.activeElement = this; dispatch('focusin', { target: this }); },
    };
  }
  const trigger = element('button', { name: '미리보기 열기' });
  doc.activeElement = openingFocusLost ? element('body') : trigger;
  const hooks = [], effects = [], cleanups = [];
  let cursor = 0;
  const react = {
    useId() { const index = cursor++; return hooks[index] ||= `modal-${index}`; },
    useRef(initial) { const index = cursor++; return hooks[index] ||= { current: initial }; },
    useEffect(fn) { const index = cursor++; if (!hooks[index]) { hooks[index] = true; effects.push(fn); } },
  };
  const jsx = (type, props) => ({ type, props });
  const Modal = load(react, { jsx, jsxs: jsx, Fragment: 'fragment' });
  let tree, backdrop, props = { title: '파일 변경 미리보기', eyebrow: 'CHANGESET', children, onClose, returnFocusTo };
  function mount(node, parent = null) {
    if (!node || typeof node !== 'object') return null;
    if (typeof node.type !== 'string') return null; // Icons do not participate in keyboard focus.
    const dom = element(node.type, node.props, parent);
    for (const child of [node.props.children].flat(Infinity)) {
      const next = mount(child, dom);
      if (next) dom.children.push(next);
    }
    if (node.props.ref) node.props.ref.current = dom;
    return dom;
  }
  function render(next = {}) {
    props = { ...props, ...next }; cursor = 0;
    tree = Modal(props);
    if (!backdrop) backdrop = mount(tree);
    effects.splice(0).forEach(fn => cleanups.push(fn()));
  }
  render();
  const dialog = backdrop.children[0];
  const close = dialog.querySelectorAll().find(node => node.props['aria-label'] === '대화상자 닫기');
  return { doc, dialog, close, trigger, dispatch, listeners, render, element, jsx,
    tree: () => tree, unmount() { cleanups.splice(0).forEach(fn => fn?.()); } };
}

test('Escape follows the close callback, and unmount restores opening focus and removes listeners', () => {
  let calls = 0;
  const ui = harness({ onClose: () => calls++ });
  assert.equal(ui.doc.activeElement, ui.close, 'opening focus is inside the dialog');
  const escape = ui.dispatch('keydown', { key: 'Escape' });
  assert.equal(calls, 1);
  assert.equal(escape.defaultPrevented, true);
  assert.equal(escape.stopped, true);
  ui.unmount();
  assert.equal(ui.doc.activeElement, ui.trigger);
  assert.equal([...ui.listeners.values()].reduce((sum, set) => sum + set.size, 0), 0);
  ui.dispatch('keydown', { key: 'Escape' });
  assert.equal(calls, 1, 'a closed dialog cannot intercept later Escape presses');
});

function editorDiffActions(dependencies) {
  const editorFile = path.resolve(__dirname, '../client/src/Editor.jsx');
  const source = fs.readFileSync(editorFile, 'utf8');
  const start = source.indexOf('  const diffReturnFocus =');
  const end = source.indexOf('  const removeWork =', start);
  assert.ok(start >= 0 && end > start);
  const loaded = new Module(editorFile, module);
  loaded._compile(`module.exports = ({ diffTriggerRef, editorRef, selectedId, generation, selectedRef, run, api, setDiff, setComparedDraft }) => {
    ${source.slice(start, end)}
    return { previewDiff, diffReturnFocus };
  }`, editorFile);
  return loaded.exports(dependencies);
}

test('Editor captures the clicked opener before busy loses focus and Modal returns to it after the async preview', async () => {
  let focused, storedDiff;
  const opener = { isConnected: true, focus() { focused = this; } };
  const diffTriggerRef = { current: null };
  const result = { files: [] };
  const actions = editorDiffActions({
    diffTriggerRef, editorRef: { current: null }, selectedId: 218, generation: { revision: 4 }, selectedRef: { current: 218 },
    run: async (label, fn) => {
      assert.equal(label, 'diff');
      assert.equal(diffTriggerRef.current, opener, 'capture precedes run, which disables the clicked button');
      return fn();
    },
    api: { get: async target => { assert.equal(target, '/generations/218/diff'); return result; } },
    setDiff(value) { storedDiff = value; }, setComparedDraft() {},
  });
  await actions.previewDiff({ currentTarget: opener });
  assert.equal(storedDiff, result);
  const ui = harness({ returnFocusTo: actions.diffReturnFocus, openingFocusLost: true });
  assert.equal(ui.doc.activeElement, ui.close);
  ui.unmount();
  assert.equal(focused, opener, 'explicit opener wins over the body that was active when the Modal mounted');
});

test('a completed compare step returns focus to the current step when its opening button has been removed', () => {
  let focused;
  const opener = { isConnected: true, focus() { focused = this; } };
  const nextStep = { isConnected: true, focus() { focused = this; } };
  const actions = editorDiffActions({ diffTriggerRef: { current: opener },
    editorRef: { current: { querySelector: () => nextStep } } });
  const ui = harness({ returnFocusTo: actions.diffReturnFocus, openingFocusLost: true });
  opener.isConnected = false;
  ui.unmount();
  assert.equal(focused, nextStep, 'the completed workflow retains a usable keyboard position');
});

test('Tab and Shift+Tab wrap inside the dialog and skip unavailable controls', () => {
  const button = props => ({ type: 'button', props });
  const ui = harness({ children: [button({ disabled: true }), button({ hidden: true }), button({ tabIndex: -1 }),
    button({ style: { display: 'none' } }), button({ style: { visibility: 'hidden' } }), button({ name: '마지막 버튼' })] });
  const last = ui.dialog.querySelectorAll().find(node => node.props.name === '마지막 버튼');
  assert.equal(ui.dispatch('keydown', { key: 'Tab', shiftKey: true }).defaultPrevented, true);
  assert.equal(ui.doc.activeElement, last);
  assert.equal(ui.dispatch('keydown', { key: 'Tab' }).defaultPrevented, true);
  assert.equal(ui.doc.activeElement, ui.close);
  assert.equal(ui.dispatch('keydown', { key: 'Tab' }).defaultPrevented, false, 'normal in-dialog movement uses native Tab order');
  ui.unmount();
});

test('actual Editor diff regions are named Tab stops and keep native scrolling keys available inside the trap', () => {
  // Compile the actual, self-contained preview JSX so removing tabIndex from
  // Editor fails this regression even if a hand-written Modal fixture still works.
  const editorFile = path.resolve(__dirname, '../client/src/Editor.jsx');
  const source = fs.readFileSync(editorFile, 'utf8');
  const start = source.indexOf('<Modal title="파일 변경 미리보기"');
  const end = source.indexOf('</Modal>', start);
  assert.ok(start >= 0 && end > start, 'Editor renders its preview through the shared Modal');
  const previewCode = transformSync(`module.exports = (diff, setDiff) => (${source.slice(start, end + '</Modal>'.length)})`,
    { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code;
  const loaded = new Module(editorFile, module);
  loaded.filename = editorFile; loaded.paths = Module._nodeModulePaths(path.dirname(editorFile));
  loaded._compile(`const Modal = () => null; const diffReturnFocus = () => null;\n${previewCode}`, editorFile);
  const files = ['pages/guide/pearl-value-factors.vue', 'data/guide-posts.ts'].map(filePath => ({
    path: filePath, changes: [{ added: true, value: '긴 변경 원문\n'.repeat(100) }],
  }));
  const preview = loaded.exports({ files }, () => {});
  assert.equal(typeof preview.props.returnFocusTo, 'function', 'Editor passes its captured opener resolver to Modal');
  const ui = harness({ children: preview.props.children });
  const regions = ui.dialog.querySelectorAll().filter(node => node.type === 'pre');
  assert.equal(regions.length, 2, 'every file diff is reachable through the keyboard');
  assert.deepEqual(regions.map(node => node.tabIndex), [0, 0]);
  assert.deepEqual(regions.map(node => node.props['aria-label']), files.map(file => `${file.path} 파일 변경 내용`));
  assert.equal(ui.dispatch('keydown', { key: 'Tab' }).defaultPrevented, false, 'Tab can leave the close button for the first diff');
  regions[0].focus();
  assert.equal(ui.doc.activeElement, regions[0]);
  for (const key of ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ']) {
    const event = ui.dispatch('keydown', { key });
    assert.equal(event.defaultPrevented, false, `${key} remains available for native diff scrolling`);
    assert.equal(event.stopped, false);
  }
  assert.equal(ui.dispatch('keydown', { key: 'Tab' }).defaultPrevented, false, 'Tab can reach the next file');
  regions[1].focus();
  assert.equal(ui.dispatch('keydown', { key: 'Tab' }).defaultPrevented, true);
  assert.equal(ui.doc.activeElement, ui.close);
  ui.dispatch('keydown', { key: 'Tab', shiftKey: true });
  assert.equal(ui.doc.activeElement, regions[1], 'reverse Tab reaches the last diff rather than trapping focus on X');
  ui.unmount();
});

test('a dialog with only the close button retains focus in both Tab directions and blocks background focus', () => {
  const ui = harness();
  for (const shiftKey of [false, true]) {
    assert.equal(ui.dispatch('keydown', { key: 'Tab', shiftKey }).defaultPrevented, true);
    assert.equal(ui.doc.activeElement, ui.close);
  }
  ui.trigger.focus();
  assert.equal(ui.doc.activeElement, ui.close);
  ui.unmount();
  ui.trigger.focus();
  assert.equal(ui.doc.activeElement, ui.trigger, 'background is usable again after close');
});

test('Escape uses the latest callback without resetting focus and respects handled keys and IME composition', () => {
  let oldCalls = 0, newCalls = 0;
  const ui = harness({ onClose: () => oldCalls++ });
  ui.render({ onClose: () => newCalls++ });
  assert.equal(ui.doc.activeElement, ui.close);
  ui.dispatch('keydown', { key: 'Escape', defaultPrevented: true });
  ui.dispatch('keydown', { key: 'Escape', isComposing: true });
  assert.equal(newCalls, 0);
  ui.dispatch('keydown', { key: 'Escape' });
  assert.equal(oldCalls, 0); assert.equal(newCalls, 1);
  ui.unmount();
});

test('close button and backdrop retain the same callback while clicks inside do not dismiss the preview', () => {
  let calls = 0;
  const ui = harness({ onClose: () => calls++ });
  const backdrop = ui.tree();
  const dialog = backdrop.props.children;
  const button = dialog.props.children[0].props.children[1];
  button.props.onClick();
  backdrop.props.onClick({ target: backdrop, currentTarget: backdrop });
  backdrop.props.onClick({ target: dialog, currentTarget: backdrop });
  let stopped = false;
  dialog.props.onClick({ stopPropagation() { stopped = true; } });
  assert.equal(calls, 2); assert.equal(stopped, true);
  ui.trigger.isConnected = false;
  ui.unmount();
  assert.notEqual(ui.doc.activeElement, ui.trigger, 'removed opening controls are not focused');
});
