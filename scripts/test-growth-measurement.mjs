import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import { webcrypto } from 'node:crypto'
import { createRouter, createMemoryHistory } from 'vue-router'
import * as policy from '../utils/analytics-policy.ts'
const { shouldTrackAnalytics, cleanPath, sanitizeAcquisition, analyticsEventVersion } = policy

// Exercise the actual TS source with browser/provider boundaries replaced by in-memory fakes.
function sourceModule(file, bindings) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    .replace(/^import [^\r\n]*\r?\n/gm, '')
    .replaceAll('import.meta.env.PROD', 'true').replaceAll('import.meta.server', 'false')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const exports = {}
  vm.runInNewContext(js, { exports, console, URLSearchParams, URL, AbortSignal, setTimeout, ...bindings })
  return exports
}

assert.equal(shouldTrackAnalytics(true, 'noblessegold.com'), true)
for (const host of ['localhost', '127.0.0.1', 'nobilityjewellery.pages.dev', 'noblessegold.com.evil.example']) assert.equal(shouldTrackAnalytics(true, host), false)
assert.equal(shouldTrackAnalytics(false, 'noblessegold.com'), false)
assert.equal(shouldTrackAnalytics(true, 'noblessegold.com', '?analytics=off'), false)
const realRouter = createRouter({history:createMemoryHistory(),routes:['order','quote','admin'].map(name=>({path:'/'+name+'/:token?',name,component:{}}))})
for (const path of ['/ORDER/SYNTHETIC','/Quote/SYNTHETIC','/ADMIN','/order/SYNTHETIC%2FOTHER']) {
  assert.ok(realRouter.resolve(path).matched.length)
  assert.equal(policy.isPrivatePath(path),true)
}
for (const path of ['/%6Frder/SYNTHETIC','/ord%65r/SYNTHETIC','/order%2FSYNTHETIC','/%256Frder/SYNTHETIC','//order/SYNTHETIC','/custom/../order/SYNTHETIC']) assert.equal(policy.isPrivatePath(path),true)
for (const path of ['/orderly','/quote-guide','/guide/order-help','/gallery']) assert.equal(policy.isPrivatePath(path),false)
assert.equal(cleanPath('/custom?phone=01012345678'), '')
assert.equal(cleanPath('//external.example'), '')
assert.equal(sanitizeAcquisition({utmSource:'person@example.com',utmCampaign:'01012345678',landingPath:'/repair'}).utmSource, '')

const ga = [], meta = [], naver = []
const window = { location: { hostname:'noblessegold.com', pathname:'/custom',search:'' }, gtag: (...args)=>ga.push(args), fbq: (...args)=>meta.push(args), ngTrackNaverEvent: name=>naver.push(name) }
const siteConfig = { url:'https://noblessegold.com',domain:'noblessegold.com',analytics:{ga4:'G-TEST',metaPixel:'TEST',naver:'TEST'},phone:'02-747-2635',social:{kakaoOpenChat:'https://open.kakao.com/example'},mail:{from:'test@example.com'},name:'Test' }
const {useGtag} = sourceModule('../composables/useGtag.ts', {window,siteConfig,...policy})
const gtag = useGtag()
gtag.trackKakaoClick('custom'); gtag.trackPhoneClick('custom'); gtag.trackPageInquiryClick('custom')
for (const name of ['kakao_click','phone_click','inquiry_click']) assert.equal(ga.filter(e=>e[1]===name).length, 1)
for (const name of ['kakao_click','phone_click','inquiry_click','cta_click']) {
  assert.ok(ga.filter(e=>e[1]===name).every(e=>e[2].source_path==='/custom'))
}
window.location.pathname='/gallery/pure-gold-snake-baby-ring'
gtag.trackKakaoClick('gallery_detail', {placement:'gallery_detail_cta'})
assert.equal(ga.filter(e=>e[1]==='kakao_click').at(-1)[2].source_path, '/gallery/pure-gold-snake-baby-ring')
window.location.pathname='/custom'
assert.equal(ga.some(e=>['click_kakao','click_phone','custom_inquiry_click'].includes(e[1])), false)
gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-001')
gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-001')
gtag.trackLeadSubmitted('custom')
assert.equal(ga.filter(e=>e[1]==='generate_lead').length, 1)
assert.equal(meta.filter(e=>e[0]==='track'&&e[1]==='Lead').length, 1)
assert.equal(naver.filter(name=>name==='LeadAccepted').length,1)
assert.equal(naver.filter(name=>name==='KakaoClick').length,2)
gtag.trackKakaoClick('contact', {topic:'PII_SENTINEL_01012345678'})
gtag.trackLeadSubmitted('custom','service','PII_SENTINEL_01012345678','NG-TEST-003','/order/SECRET_TOKEN')
gtag.trackFormError('contact','PII_SENTINEL_01012345678')
assert.equal(JSON.stringify([...ga,...meta]).includes('PII_SENTINEL'),false)
assert.equal(JSON.stringify([...ga,...meta]).includes('SECRET_TOKEN'),false)
const count = ga.length, metaCount=meta.length
window.location.hostname='nobilityjewellery.pages.dev'
gtag.trackKakaoClick('custom'); gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-002')
assert.equal(ga.length,count); assert.equal(meta.length,metaCount)

// Run the production plugin against a browser/router double: no network requests.
const makeStorage = () => { const values = new Map(); return { getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k) } }
const locationRouter = createRouter({history:createMemoryHistory(),routes:[{path:'/:pathMatch(.*)*',component:{}}]})
function browserHarness(path='/', referrer='', storage=makeStorage(), suppliedRouter) {
  const url = new URL(path,siteConfig.url), scripts=[], metas=[], redirects=[], naverViews=[], naverEvents=[], callbacks=[], hooks={}
  const route = p => locationRouter.resolve(p)
  const location={hostname:url.hostname,pathname:url.pathname,search:url.search,hash:url.hash,assign:p=>redirects.push(['assign',p]),replace:p=>redirects.push(['replace',p])}
  const win={location,sessionStorage:storage,setTimeout:fn=>callbacks.push(fn),wcs:{inflow:()=>{},event:(...v)=>naverEvents.push(v)},wcs_do:()=>naverViews.push(location.pathname)}
  const doc={title:'Test',referrer,querySelector:()=>metas[0]||null,createElement:tag=>({tag}),head:{appendChild:element=>(element.tag==='script'?scripts:metas).push(element)}}
  const router=suppliedRouter || {currentRoute:{value:route(path)},resolve:route,beforeEach:fn=>hooks.before=fn,afterEach:fn=>hooks.after=fn}
  sourceModule('../plugins/analytics.client.ts',{...policy,siteConfig,window:win,document:doc,defineNuxtPlugin:fn=>fn({hook:(name,fn)=>hooks[name]=fn}),useRouter:()=>router,useInquiryContext:()=>({capture:()=>{}}),nextTick:async()=>{}})
  const mount=()=>hooks['app:mounted']?.()
  const load=()=>{for(const cb of callbacks.splice(0))cb();for(const s of scripts)s.onload?.()}
  const move=async p=>{
    const to=route(p),from=router.currentRoute.value,result=hooks.before?.(to,from)
    if(result===false)return false
    if(result?.path)return move(result)
    const u=new URL(to.fullPath,siteConfig.url);Object.assign(location,{pathname:u.pathname,search:u.search,hash:u.hash});router.currentRoute.value=to
    await hooks.after?.(to,from)
    return true
  }
  const pageviews=()=>Array.from(win.dataLayer||[],args=>Array.from(args)).filter(args=>args[0]==='event'&&args[1]==='page_view')
  return {win,doc,scripts,metas,redirects,naverViews,naverEvents,router,mount,load,move,pageviews}
}
const browser=browserHarness('/?utm_source=google&utm_medium=organic','https://www.google.com/search?q=PRIVATE_SEARCH')
browser.mount();browser.load()
assert.equal(browser.pageviews().length,1)
assert.equal(browser.pageviews()[0][2].page_referrer,'https://www.google.com/')
assert.equal(browser.pageviews()[0][2].page_location,siteConfig.url+'/?utm_source=google&utm_medium=organic')
await browser.move('/custom');await browser.move('/custom?utm_source=test');await browser.move('/custom#section')
assert.equal(browser.pageviews().length,2)
assert.equal(browser.naverViews.length,2)
assert.equal(browser.pageviews()[1][2].page_referrer,siteConfig.url+'/')
assert.equal(browser.pageviews()[1][2].page_location,siteConfig.url+'/custom')
assert.equal(await browser.move('/order/SECRET_TOKEN'),false)
assert.equal(browser.pageviews().length,2)
assert.equal(browser.metas.at(-1).content,'no-referrer')
assert.equal(JSON.stringify(browser.win.dataLayer).includes('SECRET_TOKEN'),false)
for(const path of ['/order/SECRET_TOKEN','/quote/SECRET_TOKEN','/admin?key=SECRET_TOKEN','/ORDER/SECRET_TOKEN','/Quote/SECRET_TOKEN','/ADMIN?key=SECRET_TOKEN','/%6Frder/SECRET_TOKEN','/order%2FSECRET_TOKEN']) {
  const privateBrowser=browserHarness(path);privateBrowser.mount();privateBrowser.load()
  assert.equal(privateBrowser.scripts.length,0)
  assert.equal(await privateBrowser.move('/custom'),false)
  assert.equal(privateBrowser.metas.at(-1).content,'no-referrer')
}
const leakedReferrer=browserHarness('/','https://noblessegold.com/order/SECRET_TOKEN')
leakedReferrer.mount();leakedReferrer.load();assert.equal(leakedReferrer.scripts.length,0);assert.equal(leakedReferrer.redirects.length,1)
const storage=makeStorage(), opted=browserHarness('/?analytics=off','',storage)
opted.mount();await opted.move('/custom');opted.load();assert.equal(opted.scripts.length,0)
const optedReload=browserHarness('/repair','',storage);optedReload.mount();optedReload.load();assert.equal(optedReload.scripts.length,0)
const switchOff=browserHarness('/');switchOff.mount();assert.equal(await switchOff.move('/repair?analytics=off'),false);switchOff.load();assert.equal(switchOff.scripts.length,0)
const delayed=browserHarness('/');delayed.mount();delayed.win.ngTrackNaverEvent('KakaoClick');delayed.win.ngTrackNaverEvent('PII_SENTINEL');delayed.load()
assert.equal(delayed.naverEvents.length,1);assert.deepEqual(delayed.naverEvents[0],['Consultation','KakaoClick']);assert.equal(delayed.naverViews.length,1)
const rawContext=browserHarness('/contact?type=custom&topic=PII_SENTINEL&from=/custom')
rawContext.mount();rawContext.load();assert.equal(rawContext.scripts.length,0)
assert.equal(rawContext.redirects[0][1],'/contact?type=custom&topic=custom&from=%2Fcustom')
assert.equal(policy.takeInquiryTopic('custom','/custom',rawContext.win.sessionStorage),'PII_SENTINEL')
const redirectContext=makeStorage(), rawContact='/contact?type=custom&topic=ORIGINAL_CATALOG_TITLE&from=/custom'
policy.rememberInquiryTopic(rawContact,redirectContext)
assert.equal(policy.takeInquiryTopic('custom','/custom',redirectContext,rawContact),'')
assert.equal(policy.takeInquiryTopic('custom','/custom',redirectContext,policy.normalizeAnalyticsContactUrl(rawContact)),'ORIGINAL_CATALOG_TITLE')
// Real Vue Router must preserve query/hash when the production guard redirects an SPA CTA.
// A redirect object with a query embedded only in `path` silently loses that query.
const spaRouter=createRouter({history:createMemoryHistory(),routes:[{path:'/gallery/:slug',component:{}},{path:'/contact',component:{}}]})
const productPath='/gallery/diamond-solitaire-couple-ring'
await spaRouter.push(productPath)
const spa=browserHarness(productPath,'',makeStorage(),spaRouter)
spaRouter.afterEach(to=>{const url=new URL(to.fullPath,siteConfig.url);Object.assign(spa.win.location,{pathname:url.pathname,search:url.search,hash:url.hash})})
spa.mount();spa.load()
await spaRouter.push('/contact?type=custom&source=gallery&topic=SPA_ORIGINAL_CATALOG_TITLE&from='+encodeURIComponent(productPath)+'#inquiry-form')
await Promise.resolve()
const spaRoute=spaRouter.currentRoute.value
assert.equal(spaRoute.query.type,'custom');assert.equal(spaRoute.query.source,'gallery')
assert.equal(spaRoute.query.topic,'custom');assert.equal(spaRoute.query.from,productPath);assert.equal(spaRoute.hash,'#inquiry-form')
assert.equal(policy.takeInquiryTopic('custom',productPath,spa.win.sessionStorage,spaRoute.fullPath),'SPA_ORIGINAL_CATALOG_TITLE')
assert.equal(spa.redirects.length,0)
assert.equal(spa.pageviews().filter(args=>args[2].page_location===siteConfig.url+'/contact').length,1)
assert.equal(JSON.stringify(spa.win.dataLayer).includes('SPA_ORIGINAL_CATALOG_TITLE'),false)
assert.equal(policy.hasSafeAnalyticsQuery('?q=PII_SENTINEL'),false)
for (const category of ['전체','가격','비용','기간','수리','관리','선택','소재·보석','주문']) assert.equal(policy.hasSafeAnalyticsQuery('?category='+encodeURIComponent(category)),true)
const guide=browserHarness('/guide');guide.mount();guide.load();await guide.move('/guide?category='+encodeURIComponent('소재·보석'));assert.equal(guide.redirects.length,0);assert.equal(guide.pageviews().length,1)
for (const key of ['gclid','dclid','gbraid','wbraid','fbclid','msclkid','n_ad']) assert.equal(policy.hasSafeAnalyticsQuery('?'+key+'=Ad-123_valid'),true)
assert.equal(policy.cleanPublicPath('/order/SECRET_TOKEN'),'')
assert.equal(policy.analyticsPageLocation('/custom','?gclid=Valid-Id&topic=PII_SENTINEL&phone=01012345678',siteConfig.url),siteConfig.url+'/custom?gclid=Valid-Id')
assert.ok(Array.from(browser.win.dataLayer,args=>Array.from(args)).filter(args=>args[0]==='config').every(args=>args[2].send_page_view===false))
const contextOff=sourceModule('../composables/useInquiryContext.ts',{...policy,window:optedReload.win,document:{referrer:''},sessionStorage:storage}).useInquiryContext().capture()
assert.equal(contextOff.landingPath,'')

let response = {ok:true,json:async()=>({id:'test-provider-id'})}, calls=0
const {sendMail} = sourceModule('../server/utils/mail.ts', {siteConfig,fetch:async()=>{calls++;return response}})
const mail = {apiKey:'fake-test-key',to:'test@example.com',subject:'Test',html:'Test'}
assert.equal((await sendMail(mail)).id,'test-provider-id')
response = {ok:true,json:async()=>({})}
await assert.rejects(()=>sendMail(mail), /confirm receipt/)
response = {ok:false,status:429,json:async()=>({message:'rate limited'})}
await assert.rejects(()=>sendMail(mail), /rate limited/)
await assert.rejects(()=>sendMail({...mail,apiKey:''}), /not configured/)
assert.equal(calls,3)

let body, delivered = [], rejectMail=false, nextIp=0, capturedLogs=[]
const {default: submit} = sourceModule('../server/api/inquiry.post.ts', {
  defineEventHandler:fn=>fn, readBody:async()=>body, createError:obj=>Object.assign(new Error(obj.message),obj),
  useRuntimeConfig:()=>({resendApiKey:'fake-test-key',inquiryTo:'test@example.com'}),
  getRequestHeader:()=>undefined, getRequestIP:()=>`192.0.2.${++nextIp}`,
  sendMail:async opts=>{if(rejectMail)throw Error('provider down');delivered.push(opts);return {id:'mock-id'}},
  cleanPath,sanitizeAcquisition,crypto:webcrypto,
  console:{log:(...v)=>capturedLogs.push(v),error:(...v)=>capturedLogs.push(v)}
})
const request={context:{}}
const valid={name:'테스트',phone:'010-0000-0000',type:'custom',message:'테스트용 문의 내용입니다.',consent:true,sourcePath:'/custom',acquisition:{landingPath:'/guide/gold-one-don-gram',utmSource:'google'}}
for(const invalid of [null, {...valid,type:'unknown'},{...valid,consent:'true'},{...valid,name:'  '},{...valid,message:'          '}]) {
  body=invalid; await assert.rejects(()=>submit(request),err=>err.statusCode===400)
}
body={...valid,message:'<script>alert("private")</script> 테스트 문의입니다.'}
const result=await submit(request)
assert.equal(result.ok,true); assert.match(result.inquiryId,/^NG-\d{8}-[A-F0-9]{8}$/)
assert.equal(delivered.length,1); assert.ok(delivered[0].html.includes('&lt;script&gt;'))
assert.ok(delivered[0].html.includes('/guide/gold-one-don-gram'))
assert.equal(JSON.stringify(capturedLogs).includes(valid.phone),false)
rejectMail=true;body=valid;await assert.rejects(()=>submit(request),err=>err.statusCode===502)
console.log('Host isolation, canonical click counts, lead deduplication, acquisition filtering, and inquiry/mail success/failure validation passed. All mail providers mocked; no external mail sent.')
