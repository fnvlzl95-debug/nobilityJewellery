import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import { webcrypto } from 'node:crypto'
import { shouldTrackAnalytics, cleanPath, sanitizeAcquisition, analyticsEventVersion } from '../utils/analytics-policy.ts'

// Exercise the actual TS source with browser/provider boundaries replaced by in-memory fakes.
function sourceModule(file, bindings) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    .replace(/^import [^\r\n]*\r?\n/gm, '')
    .replaceAll('import.meta.env.PROD', 'true')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const exports = {}
  vm.runInNewContext(js, { exports, console, URLSearchParams, URL, AbortSignal, setTimeout, ...bindings })
  return exports
}

assert.equal(shouldTrackAnalytics(true, 'noblessegold.com'), true)
for (const host of ['localhost', '127.0.0.1', 'nobilityjewellery.pages.dev', 'noblessegold.com.evil.example']) assert.equal(shouldTrackAnalytics(true, host), false)
assert.equal(shouldTrackAnalytics(false, 'noblessegold.com'), false)
assert.equal(shouldTrackAnalytics(true, 'noblessegold.com', '?analytics=off'), false)
assert.equal(cleanPath('/custom?phone=01012345678'), '')
assert.equal(cleanPath('//external.example'), '')
assert.equal(sanitizeAcquisition({utmSource:'person@example.com',utmCampaign:'01012345678',landingPath:'/repair'}).utmSource, '')

const ga = [], meta = []
const window = { location: { hostname:'noblessegold.com', pathname:'/custom',search:'' }, gtag: (...args)=>ga.push(args), fbq: (...args)=>meta.push(args) }
const siteConfig = { phone:'02-747-2635',social:{kakaoOpenChat:'https://open.kakao.com/example'},mail:{from:'test@example.com'},name:'Test' }
const {useGtag} = sourceModule('../composables/useGtag.ts', {window,siteConfig,shouldTrackAnalytics,analyticsEventVersion,cleanPath})
const gtag = useGtag()
gtag.trackKakaoClick('custom'); gtag.trackPhoneClick('custom'); gtag.trackPageInquiryClick('custom')
for (const name of ['kakao_click','phone_click','inquiry_click']) assert.equal(ga.filter(e=>e[1]===name).length, 1)
assert.equal(ga.some(e=>['click_kakao','click_phone','custom_inquiry_click'].includes(e[1])), false)
gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-001')
gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-001')
gtag.trackLeadSubmitted('custom')
assert.equal(ga.filter(e=>e[1]==='generate_lead').length, 1)
assert.equal(meta.filter(e=>e[0]==='track'&&e[1]==='Lead').length, 1)
const count = ga.length, metaCount=meta.length
window.location.hostname='nobilityjewellery.pages.dev'
gtag.trackKakaoClick('custom'); gtag.trackLeadSubmitted('custom','service','제작','NG-TEST-002')
assert.equal(ga.length,count); assert.equal(meta.length,metaCount)

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
