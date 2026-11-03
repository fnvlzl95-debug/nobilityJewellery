import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const text = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const source = ts.transpileModule(text('data/consultation-paths.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const exports = {}
vm.runInNewContext(source, { exports })
const paths = exports.consultationPaths
for (const path of ['/couple-ring', '/guide/couple-ring-finger-placement', '/guide/couple-ring-14k-18k-price-difference']) {
  const context = paths[path]
  assert.equal(context.type, 'custom')
  assert.ok(context.prompts.some(prompt => prompt.includes('예산')))
  assert.ok(context.prompts.some(prompt => prompt.includes('호수')))
  assert.ok(context.kakaoLabel.includes('예산'))
  assert.equal(context.gallerySlugs.length, 2)
  assert.ok(context.priceGuidance.some(note => note.includes('개별 상담')))
  assert.equal(context.prompts.some(prompt => prompt.includes('제품 전체 사진')), false)
}
const repair = paths['/guide/ring-spinning-fit-balance-guide']
assert.equal(repair.type, 'repair')
assert.equal(repair.gallerySlugs.length, 0)
assert.ok(repair.prompts.some(prompt => prompt.includes('언제 돌아가는지')))
for (const context of Object.values(paths)) {
  assert.ok(!context.title.includes('상담 상담'))
  for (const slug of context.gallerySlugs) assert.ok(text('data/gallery-items.ts').includes(`slug: '${slug}'`), slug)
  for (const { to } of context.links || []) assert.ok(existsSync(new URL('../pages' + to + '.vue', import.meta.url)), to)
}
for (const page of ['couple-ring-finger-placement', 'ring-spinning-fit-balance-guide']) {
  assert.ok(text('pages/guide/' + page + '.vue').includes(':consultation-after-section="1"'))
}
const guide = text('components/GuideArticleView.vue')
assert.ok(guide.includes('props.consultationAfterSection === index + 1'))
assert.ok(guide.includes('props.consultationAfterSection < 1 || props.consultationAfterSection > props.sections.length'))
const service = text('pages/couple-ring.vue')
assert.equal(service.match(/<ConsultationNextStep/g).length, 1)
assert.ok(service.indexOf('<ConsultationNextStep') < service.indexOf('<!-- Why Choose -->'))
assert.ok(!service.includes('내구성 우수'))
assert.ok(service.includes('주문제작 시 무료로 각인해드립니다.'))
assert.ok(service.includes('무료 각인 제공.'))
const component = text('components/ConsultationNextStep.vue')
assert.ok(component.includes("trackEvent('consultation_case_click'"))
assert.ok(component.includes('trackKakaoClick(source'))
assert.ok(component.includes('watch(sourcePath'))
assert.ok(text('pages/guide/ring-spinning-fit-balance-guide.vue').includes(':show-guide-cluster="false"'))
assert.ok(guide.includes("effectiveType === 'repair'"))
assert.ok(text('components/MobileConversionBar.vue').includes('if (consultation) return consultation.type'))
console.log('Consultation intent, price privacy, gallery links, placement and tracking regression checks passed.')
