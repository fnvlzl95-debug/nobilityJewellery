<script setup lang="ts">
import { consultationPaths } from '~/data/consultation-paths'
import { getItemBySlug } from '~/data/gallery-items'
import { siteConfig } from '~/config/site'
const props = defineProps<{ path: string; inquiryType?: 'custom' | 'repair' | 'wholesale' | 'other'; topic?: string }>()
const context = computed(() => {
  const existing = consultationPaths[props.path]
  if (existing) return { ...existing, type: props.inquiryType || existing.type }
  if (!props.path.startsWith('/guide/')) return null
  return { title: props.topic ? props.topic + ' 상담 준비' : '상담 전에 준비해 주세요', description: '제품 상태와 원하는 작업을 알려주시면 확인할 사항을 안내합니다.', type: props.inquiryType || 'other', prompts: ['제품 전체 사진과 소재·각인', '궁금한 점 또는 원하는 작업', '희망 방문일이나 수령일'], gallerySlugs: [], links: [] }
})
const items = computed(() => context.value?.gallerySlugs.map(getItemBySlug).filter(item => !!item) || [])
const { trackKakaoClick, trackInquiryClick, trackEvent } = useGtag()
const source = computed(() => props.path.startsWith('/guide/') ? 'guide_article' : 'service')
const contactLink = computed(() => ({ path: '/contact', query: { source: source.value, type: context.value?.type, topic: context.value?.title, from: props.path } }))
const brief = computed(() => context.value ? `${context.value.title}\n${siteConfig.url}${props.path}\n\n${context.value.prompts.map(p => `${p}: `).join('\n')}` : '')
const copied = ref(false)
const copyError = ref(false)
const copyBrief = async () => {
  try { await navigator.clipboard.writeText(brief.value); copied.value = true; copyError.value = false; trackEvent('consultation_brief_copy', { source_path: props.path }) }
  catch { copyError.value = true }
}
</script>

<template>
  <section v-if="context" class="consultation-next" aria-label="관련 디자인과 상담 준비">
    <p class="eyebrow">상담 준비</p>
    <h2>{{ context.title }}</h2>
    <p>{{ context.description }}</p>
    <div v-if="items.length" class="designs">
      <NuxtLink v-for="item in items" :key="item.slug" :to="`/gallery/${item.slug}`" @click="trackEvent('consultation_case_click', { source_path: path, item_id: String(item.id), target_path: `/gallery/${item.slug}` })">
        <NuxtImg :src="item.images[0]" :alt="item.imageAlts[0]" width="480" height="480" sizes="sm:45vw md:35vw lg:360px" loading="lazy" />
        <strong>{{ item.title }}</strong><span>디자인 자세히 보기 →</span>
      </NuxtLink>
    </div>
    <ul><li v-for="prompt in context.prompts" :key="prompt">{{ prompt }}</li></ul>
    <nav v-if="context.links?.length" class="context-links" aria-label="상담 목적 선택">
      <NuxtLink v-for="link in context.links" :key="link.to" :to="link.to" @click="trackEvent('consultation_path_click', { source_path: path, target_path: link.to })">{{ link.label }} →</NuxtLink>
    </nav>
    <div class="actions">
      <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="primary" @click="trackKakaoClick(source, { placement: 'consultation_next', intent: context.type, topic: context.title })">사진으로 카톡 상담</a>
      <NuxtLink :to="contactLink" @click="trackInquiryClick(source, { placement: 'consultation_next', intent: context.type, topic: context.title })">문의 남기기</NuxtLink>
      <button type="button" @click="copyBrief">{{ copied ? '상담 내용 복사됨' : '상담 내용 복사' }}</button>
    </div>
    <p v-if="copied || copyError" class="copy-note" role="status">{{ copyError ? '복사하지 못했습니다. 위 항목을 카톡에 함께 보내주세요.' : '복사한 내용을 카톡에 붙여넣고 작성해주세요.' }}</p>
  </section>
</template>

<style scoped>
.consultation-next { color:#fafafa; margin:40px 0; padding:28px 0; border-top:1px solid rgba(201,162,39,.5); border-bottom:1px solid rgba(201,162,39,.25); text-align:left; }
.eyebrow { color:#d4b44a; font-size:12px; letter-spacing:.08em; margin:0 0 10px; }
h2 { font-size:clamp(22px,3.3vw,30px); line-height:1.45; margin:0 0 12px; word-break:keep-all; }
p,li { color:rgba(250,250,250,.8); line-height:1.8; font-size:15px; }
ul { padding-left:20px; list-style:disc; margin:20px 0; }
.designs { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; margin:24px 0; }
.designs a { display:flex; flex-direction:column; gap:8px; color:inherit; text-decoration:none; }
.designs img { width:100%; aspect-ratio:1; height:auto; object-fit:cover; }
.designs span { font-size:13px; color:#d4b44a; }
.context-links { display:flex; gap:14px; flex-wrap:wrap; margin:18px 0; }
.context-links a { color:#d4b44a; text-underline-offset:4px; font-size:14px; padding:8px 0; }
.actions { display:flex; gap:10px; flex-wrap:wrap; }
.actions a,.actions button { min-height:44px; padding:11px 16px; border:1px solid rgba(201,162,39,.45); background:transparent; color:#fafafa; text-decoration:none; font:inherit; font-size:14px; cursor:pointer; }
.actions .primary { color:#0a0a0a; background:#c9a227; font-weight:700; }
.actions :focus-visible,.designs a:focus-visible { outline:2px solid #d4b44a; outline-offset:4px; }
.copy-note { font-size:13px; margin-bottom:0; }
@media(max-width:400px) { .designs { gap:10px; } .designs strong { font-size:14px; } }
</style>
