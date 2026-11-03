import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as Vue from 'vue'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { renderToString } from '@vue/server-renderer'
import { getGuideCluster, normalizeGuidePath } from '../data/guide-clusters.ts'
import { getItemBySlug } from '../data/gallery-items.ts'
import { siteConfig } from '../config/site.ts'
import { cleanPublicPath, rememberInquiryTopic, takeInquiryTopic } from '../utils/analytics-policy.ts'

const text = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const transpile = source => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText
const withoutImports = source => source.replace(/^import [^\r\n]*\r?\n/gm, '')
const descriptors = {}
for (const filename of ['pages/contact.vue', 'pages/custom.vue', 'components/GuideClusterLinks.vue']) {
  const { descriptor, errors } = parse(text(filename), { filename })
  assert.deepEqual(errors, [])
  descriptors[filename] = descriptor
  const script = compileScript(descriptor, { id: filename })
  const template = compileTemplate({
    source: descriptor.template.content, filename, id: filename,
    compilerOptions: { bindingMetadata: script.bindings },
  })
  assert.deepEqual(template.errors, [], filename)
}

// Real SSR output must keep every guide link crawlable, with only the first six
// outside a closed, keyboard-native disclosure. Other callers stay unchanged.
const guideExports = {}
const guideCode = compileScript(descriptors['components/GuideClusterLinks.vue'], {
  id: 'guide-cluster-ux-test', inlineTemplate: true,
}).content.replace(/^import .* from ['"]~\/data\/guide-clusters['"]\r?\n/gm, '')
vm.runInNewContext(transpile(guideCode), {
  exports: guideExports, require: name => { assert.equal(name, 'vue'); return Vue },
  computed: Vue.computed, getGuideCluster, normalizeGuidePath,
  useRoute: () => ({ fullPath: '/custom' }),
})
const renderGuides = async props => {
  const app = Vue.createSSRApp(guideExports.default, props)
  app.component('NuxtLink', {
    props: ['to'], setup: (props, { slots }) => () => Vue.h('a', { href: props.to }, slots.default?.()),
  })
  return renderToString(app)
}
const cluster = getGuideCluster('custom')
const collapsed = await renderGuides({ clusterId: 'custom', initialVisible: 6 })
assert.equal((collapsed.split('<details')[0].match(/<li>/g) || []).length, 6)
assert.match(collapsed, /<details class="guide-cluster-more"><summary>/)
assert.doesNotMatch(collapsed, /<details[^>]*\sopen(?:[\s=>])/)
for (const link of cluster.links) {
  assert.equal(collapsed.split(`href="${link.to}"`).length - 1, 1, link.to)
}
const expandedByDefault = await renderGuides({ clusterId: 'custom' })
assert.doesNotMatch(expandedByDefault, /<details/)
assert.equal((expandedByDefault.match(/<li>/g) || []).length, cluster.links.length)
const currentArticle = cluster.links[0].to
const article = await renderGuides({ clusterId: 'custom', currentPath: currentArticle, initialVisible: 6 })
assert.ok(!article.includes(`href="${currentArticle}"`))
assert.equal((article.match(/<li>/g) || []).length, cluster.links.length - 1)
const smallCluster = await renderGuides({ clusterId: 'custom', initialVisible: cluster.links.length + 1 })
assert.doesNotMatch(smallCluster, /<details/)

const custom = text('pages/custom.vue')
assert.equal((custom.match(/<ConsultationNextStep /g) || []).length, 1)
assert.ok(custom.indexOf('<!-- Gallery -->') < custom.indexOf('<ConsultationNextStep'))
assert.ok(custom.indexOf('<ConsultationNextStep') < custom.indexOf('<ServiceQuestions'))
assert.ok(custom.indexOf('<ConsultationNextStep') < custom.indexOf('<GuideClusterLinks'))
assert.match(custom, /<GuideClusterLinks cluster-id="custom" :initial-visible="6"/)

// Execute the real contact setup with reactive route state, no network or form
// submission. Hash-only navigation must preserve the customer's in-progress form.
const productPath = '/gallery/promise-couple-ring'
const productTitle = getItemBySlug('promise-couple-ring').title
const route = Vue.reactive({
  path: '/contact', hash: '',
  query: { type: 'custom', source: 'gallery', topic: 'custom', from: productPath },
  fullPath: `/contact?type=custom&source=gallery&topic=custom&from=${encodeURIComponent(productPath)}`,
})
const values = new Map()
const storage = {
  getItem: key => values.get(key) || null,
  setItem: (key, value) => values.set(key, value),
  removeItem: key => values.delete(key),
}
rememberInquiryTopic(`/contact?type=custom&source=gallery&topic=${encodeURIComponent(productTitle)}&from=${encodeURIComponent(productPath)}`, storage)
const mounted = [], events = []
const contactSource = withoutImports(descriptors['pages/contact.vue'].scriptSetup.content)
  .replaceAll('import.meta.server', 'false')
  + '\nexports.state = { formData, inquiryProduct, inquiryContext, inquiryFormRef, focusInquiryForm, isSubmitted };'
const contactExports = {}
const scope = Vue.effectScope()
scope.run(() => vm.runInNewContext(transpile(contactSource), {
  ...Vue, exports: contactExports, siteConfig, cleanPublicPath, takeInquiryTopic, getItemBySlug,
  useRoute: () => route, useHead: () => {}, buildBreadcrumbJsonLd: () => ({}),
  useGtag: () => new Proxy({}, { get: (_, name) => (...args) => events.push([name, ...args]) }),
  onMounted: fn => mounted.push(fn), onUnmounted: () => {},
  window: { sessionStorage: storage, scrollY: 0, addEventListener: () => {}, removeEventListener: () => {} },
  $fetch: () => { throw new Error('Real inquiry submission is forbidden in this test') },
}))
for (const mount of mounted) mount()
const state = contactExports.state
assert.equal(state.formData.value.topic, productTitle)
assert.equal(state.inquiryProduct.value.slug, 'promise-couple-ring')
Object.assign(state.formData.value, {
  name: 'TEST_ONLY', phone: 'TEST_ONLY', message: 'TEST_ONLY', consent: true, discoverySource: 'other',
})
const draft = JSON.stringify(state.formData.value)
let focused = 0
state.inquiryFormRef.value = { focus: options => { assert.equal(options.preventScroll, true); focused++ } }
route.query = { ...route.query } // Vue Router may produce a fresh query object for a hash change.
route.hash = '#inquiry-form'
route.fullPath += '#inquiry-form'
await Vue.nextTick()
await Vue.nextTick()
assert.equal(JSON.stringify(state.formData.value), draft)
assert.equal(focused, 1)
state.focusInquiryForm()
assert.equal(focused, 2)
assert.deepEqual(events, [], 'An in-page shortcut must not create another inquiry or form-start conversion')
route.hash = ''
route.fullPath = route.fullPath.split('#')[0]
await Vue.nextTick()
assert.equal(JSON.stringify(state.formData.value), draft, 'Back from the form anchor preserves the draft')
state.isSubmitted.value = true
route.hash = '#inquiry-form'
await Vue.nextTick()
assert.equal(state.isSubmitted.value, true, 'Anchor navigation does not clear a successful submission')

// Links are derived only from an existing, public catalogue slug.
for (const from of ['https://evil.example', '//evil.example', '/order/SECRET', '/quote/SECRET', '/gallery/not-a-product', '/gallery/../admin', '/gallery/promise-couple-ring?private=1']) {
  route.query = { type: 'custom', source: 'gallery', topic: 'custom', from }
  await Vue.nextTick()
  assert.equal(state.inquiryProduct.value, undefined, from)
}
route.query = { type: 'repair', source: 'service', topic: 'repair', from: '/repair' }
await Vue.nextTick()
assert.equal(state.formData.value.name, '')
assert.equal(state.formData.value.type, 'repair')
assert.equal(state.formData.value.topic, '수리/세공')
assert.equal(state.isSubmitted.value, false)
scope.stop()

const contact = text('pages/contact.vue')
assert.match(contact, /href="#inquiry-form" class="form-shortcut" @click="focusInquiryForm"/)
assert.match(contact, /id="inquiry-form"[^>]*tabindex="-1"[^>]*aria-label="문의 양식"/)
assert.match(contact, /scroll-margin-top: 112px/)
assert.ok(contact.indexOf('class="kakao-cta"') < contact.indexOf('class="form-shortcut"'))
assert.ok(contact.indexOf('class="form-shortcut"') < contact.indexOf('class="prep-block"'))
assert.match(contact, /@focusin.once="trackEvent\('form_start'/)

// FAQ UI and structured data consume the same consultation-only wording.
const faqExports = {}
vm.runInNewContext(transpile(withoutImports(text('data/faq-items.ts'))), { exports: faqExports, siteConfig })
const orderFAQ = faqExports.faqItems.find(item => item.id === 1)
assert.match(orderFAQ.answer, /카카오톡.*상담을 시작/)
assert.match(orderFAQ.answer, /주문 확정 및 진행 절차를 안내/)
assert.doesNotMatch(orderFAQ.answer, /카카오톡.*주문하실 수/)
assert.equal(faqExports.generateFAQSchema().mainEntity[0].acceptedAnswer.text, orderFAQ.answer)
console.log(`Consultation UX checks passed: ${cluster.links.length} preserved guide links, native disclosure, CTA order, anchor focus, draft retention, safe product returns and FAQ schema.`)
