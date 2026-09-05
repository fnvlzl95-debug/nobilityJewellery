<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getItemBySlug, getRelatedItems, getLandingLinkForItem, categories } from '~/data/gallery-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'
import { galleryConsultation } from '~/data/gallery-consultation'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const item = getItemBySlug(slug.value)
if (!item) {
  throw createError({
    statusCode: 404,
    statusMessage: '요청하신 제품을 찾을 수 없습니다.',
    fatal: true,
  })
}

const product = item
const consultation = galleryConsultation[product.slug]
const contactLink = { path: '/contact', query: { type: 'custom', source: 'gallery', topic: product.title, from: `/gallery/${product.slug}` } }
const category = categories.find((c) => c.id === product.category)
const categoryLabel = category?.label ?? '컬렉션'
const relatedItems = getRelatedItems(product, 3)
const landingLink = getLandingLinkForItem(product)

const { trackKakaoClick, trackPhoneClick, trackInquiryClick, trackEvent, trackMetaEvent } = useGtag()

const pageUrl = `${siteConfig.url}/gallery/${product.slug}`
const heroImageUrl = `${siteConfig.url}${product.images[0]}`
const sampleSpec = product.specs?.find((spec) => spec.label === '사진 제품 기준')?.value
const orderText = product.colorOptions.length
  ? `${product.material} 소재, ${product.colorOptions.join('·')} 색상으로 주문제작할 수 있습니다.`
  : `${product.material} 소재로 주문제작합니다.`
const metaDescription = `${product.title}. ${product.description} ${orderText}${sampleSpec ? ` 사진 제품은 ${sampleSpec} 기준입니다.` : ''} 제작 기간은 ${product.delivery}입니다.`

const altFor = (index: number) => product.imageAlts[index] ?? `${product.title} ${index + 1}번째 이미지`

useHead({
  title: `${product.title} 주문제작 | 귀족`,
  link: [{ rel: 'canonical', href: pageUrl }],
  meta: [
    { name: 'description', content: metaDescription },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { property: 'og:title', content: `${product.title} | 귀족` },
    { property: 'og:description', content: product.description },
    { property: 'og:type', content: 'product' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: heroImageUrl },
    { property: 'og:image:alt', content: altFor(0) },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${product.title} | 귀족` },
    { name: 'twitter:description', content: product.description },
    { name: 'twitter:image', content: heroImageUrl },
    { name: 'twitter:image:alt', content: altFor(0) },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${product.title} | 귀족`,
        description: metaDescription,
        inLanguage: 'ko-KR',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: heroImageUrl,
          caption: altFor(0),
        },
        // 공개 판매가나 실제 리뷰가 없는 작품 안내 페이지이므로 Product 리치결과를 선언하지 않는다.
        // 가격·소재·색상·제작 기간은 화면에 보이는 상담 정보로 제공한다.
        mainEntity: {
          '@type': 'Thing',
          '@id': `${pageUrl}#design`,
          name: product.title,
          description: product.description,
          image: product.images.map((src) => `${siteConfig.url}${src}`),
          url: pageUrl,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        buildBreadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '갤러리', path: '/gallery' },
          { name: product.title, path: `/gallery/${product.slug}` },
        ])
      ),
    },
  ],
})

const handleKakao = () => {
  // trackKakaoClick이 내부에서 Meta 표준 Contact를 전송하므로 여기서 다시 보내지 않는다 (중복 학습 방지)
  trackKakaoClick('gallery_detail', { placement: 'product_cta', intent: 'custom', topic: product.title })
}
const handlePhone = () => {
  trackPhoneClick('gallery_detail', { placement: 'product_cta', intent: 'custom', topic: product.title })
}
const handleLanding = () => {
  trackEvent('gallery_landing_click', {
    item_id: String(product.id),
    item_name: product.title,
    item_category: product.category,
    destination: landingLink.to,
  })
}

const handleRelated = (target: { id: number; title: string; category: string }) => {
  trackEvent('gallery_related_click', {
    item_id: String(target.id),
    item_name: target.title,
    item_category: target.category,
    from_item: product.title,
  })
}

// ── 이미지 뷰어 ────────────────────────────────────────────────────
const activeIndex = ref(0)
const hasMultiple = product.images.length > 1

const selectImage = (index: number) => {
  activeIndex.value = index
}
const nextImage = () => {
  if (hasMultiple) activeIndex.value = (activeIndex.value + 1) % product.images.length
}
const prevImage = () => {
  if (hasMultiple) {
    activeIndex.value = activeIndex.value === 0 ? product.images.length - 1 : activeIndex.value - 1
  }
}

const isLightboxOpen = ref(false)
let lastFocusedElement: HTMLElement | null = null

const openLightbox = () => {
  lastFocusedElement = document.activeElement as HTMLElement | null
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  trackEvent('gallery_detail_zoom', { item_name: product.title, image_index: activeIndex.value + 1 })
  nextTick(() => {
    document.querySelector<HTMLElement>('.lightbox-close')?.focus()
  })
}
const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
  lastFocusedElement?.focus()
  lastFocusedElement = null
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  trackEvent('gallery_detail_view', {
    item_id: String(product.id),
    item_name: product.title,
    item_category: product.category,
  })
  trackMetaEvent('ViewContent', {
    content_name: product.title,
    content_category: `gallery_${product.category}`,
    content_id: String(product.id),
  })

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed')
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver!.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  revealObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="page">
    <div class="detail-container">
      <nav class="breadcrumb" aria-label="현재 위치">
        <ol>
          <li class="breadcrumb-home"><NuxtLink to="/">홈</NuxtLink></li>
          <li><NuxtLink to="/gallery">갤러리</NuxtLink></li>
          <li class="breadcrumb-current">
            <NuxtLink :to="`/gallery#category-${product.category}`" aria-current="location">{{ categoryLabel }}</NuxtLink>
          </li>
        </ol>
      </nav>

      <div class="detail-layout">
        <!-- 이미지 -->
        <section class="media" aria-label="제품 이미지">
          <button
            type="button"
            class="media-stage"
            :aria-label="`${product.title} 이미지 확대해서 보기`"
            @click="openLightbox"
          >
            <img
              :src="product.images[activeIndex]"
              :alt="altFor(activeIndex)"
              width="1024"
              height="1024"
              loading="eager"
              fetchpriority="high"
            />
            <span class="media-zoom" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
              </svg>
            </span>
          </button>

          <div v-if="hasMultiple" class="thumbs" role="tablist" aria-label="제품 이미지 선택">
            <button
              v-for="(image, index) in product.images"
              :key="image"
              type="button"
              role="tab"
              class="thumb"
              :class="{ 'thumb-active': index === activeIndex }"
              :aria-selected="index === activeIndex"
              :aria-label="altFor(index)"
              @click="selectImage(index)"
            >
              <img :src="image" :alt="''" width="200" height="200" loading="lazy" />
            </button>
          </div>
        </section>

        <!-- 정보 -->
        <section class="info">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-description">{{ product.description }}</p>

          <dl class="facts">
            <div class="fact">
              <dt>소재</dt>
              <dd>{{ product.material }}</dd>
            </div>
            <div class="fact">
              <dt>제작</dt>
              <dd>{{ product.workType }}</dd>
            </div>
            <div class="fact">
              <dt>기간</dt>
              <dd>{{ product.delivery }}</dd>
            </div>
            <div v-if="product.colorOptions.length" class="fact fact-colors">
              <dt>주문 가능 색상</dt>
              <dd class="color-options">
                <span v-for="color in product.colorOptions" :key="color" class="color-option">{{ color }}</span>
              </dd>
            </div>
          </dl>

          <div v-if="product.specs?.length" class="specs">
            <h2 class="specs-title">디자인 상세</h2>
            <dl class="specs-list">
              <div v-for="spec in product.specs" :key="spec.label" class="spec">
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            </dl>
          </div>

          <section v-if="consultation" class="design-consultation" aria-label="디자인 상담 안내">
            <h2>{{ consultation.title }}</h2>
            <ul><li v-for="point in consultation.points" :key="point">{{ point }}</li></ul>
          </section>

          <div class="cta">
            <a
              :href="siteConfig.social.kakaoOpenChat"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-primary"
              @click="handleKakao"
            >
              <span>카톡 문의</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <div class="cta-actions">
              <NuxtLink :to="contactLink" class="cta-secondary" @click="trackInquiryClick('gallery_detail', { placement: 'product_cta', intent: 'custom', topic: product.title })">이 디자인으로 문의 남기기</NuxtLink>
              <a :href="`tel:${siteConfig.phone}`" class="cta-secondary" @click="handlePhone">
                전화 문의
              </a>
            </div>
            <p class="cta-note">
              가격은 금시세에 따라 달라져 상담으로 안내드립니다.<br>
              원하시는 사이즈·소재·각인을 함께 알려주시면 더 빠릅니다.
            </p>
            <NuxtLink :to="landingLink.to" class="cta-guide-link" @click="handleLanding">
              {{ landingLink.label }} 보기
            </NuxtLink>
          </div>
        </section>
      </div>

      <!-- 관련 제품 -->
      <section v-if="relatedItems.length" class="related reveal" aria-labelledby="related-title">
        <h2 id="related-title" class="related-title">같은 {{ categoryLabel }} 다른 디자인</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="related in relatedItems"
            :key="related.id"
            :to="`/gallery/${related.slug}`"
            class="related-card"
            @click="handleRelated(related)"
          >
            <div class="related-image">
              <img :src="related.images[0]" :alt="related.imageAlts[0] ?? related.title" width="400" height="400" loading="lazy" />
            </div>
            <div class="related-body">
              <span class="related-name">{{ related.title }}</span>
              <span class="related-material">{{ related.colorOptions.length ? related.colorOptions.join(' · ') : related.material }}</span>
            </div>
          </NuxtLink>
        </div>
        <NuxtLink to="/gallery" class="related-all">갤러리 전체 보기</NuxtLink>
      </section>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="isLightboxOpen"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${product.title} 이미지 보기`"
          @click.self="closeLightbox"
        >
          <button class="lightbox-close" aria-label="닫기" @click="closeLightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="lightbox-content">
            <img :src="product.images[activeIndex]" :alt="altFor(activeIndex)" class="lightbox-img" />
          </div>

          <template v-if="hasMultiple">
            <button class="lightbox-arrow lightbox-prev" aria-label="이전 이미지" @click="prevImage">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button class="lightbox-arrow lightbox-next" aria-label="다음 이미지" @click="nextImage">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.design-consultation { margin:24px 0; padding:22px 0; border-top:1px solid rgba(201,162,39,.35); }
.design-consultation h2 { font-size:19px; line-height:1.55; color:#e4cf8d; margin-bottom:12px; }
.design-consultation ul { padding-left:19px; list-style:disc; }
.design-consultation li { color:rgba(250,250,250,.8); font-size:14px; line-height:1.8; margin:8px 0; }
.page {
  background: var(--black);
  min-height: 100vh;
}

.detail-container {
  max-width: 1400px;
  margin: 0 auto;
  /* 상단 여백은 고정 네비게이션(.nav-luxury) 높이를 비켜간다 — 갤러리 인덱스의 .main과 동일 기준 */
  padding: 140px 40px 120px;
}

/* ── Breadcrumb ─────────────────────────────────────────────── */
.breadcrumb {
  font-size: 13px;
  color: var(--gray);
  margin-bottom: 40px;
}

.breadcrumb ol {
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb li {
  display: inline-flex;
  align-items: center;
  height: 44px;
  min-width: 0;
}

.breadcrumb li + li::before {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin: 0 12px;
  color: rgba(250, 250, 250, 0.32);
  content: '/';
  line-height: 1;
}

.breadcrumb a {
  display: inline-flex;
  align-items: center;
  height: 44px;
  min-height: 44px;
  color: var(--gray);
  line-height: 1;
  text-decoration: none;
  transition: color 0.2s var(--ease-out-quart);
}

.breadcrumb a:hover {
  color: var(--gold);
}

.breadcrumb a[aria-current] {
  color: var(--gold);
  font-weight: 600;
}

/* ── Layout ─────────────────────────────────────────────────── */
.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

/* 그리드 자식의 기본 min-width:auto를 풀어야 긴 한글 어절이 컨테이너를 밀지 않는다 */
.media,
.info {
  min-width: 0;
}

/* ── Media ──────────────────────────────────────────────────── */
.media-stage {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: var(--black-light);
  cursor: zoom-in;
  transition: border-color 0.3s var(--ease-out-quart);
}

.media-stage:hover {
  border-color: rgba(201, 162, 39, 0.35);
}

.media-stage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.media-stage:hover img {
  transform: scale(1.03);
}

.media-zoom {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: var(--white);
  background: rgba(10, 10, 10, 0.62);
  border: 1px solid rgba(250, 250, 250, 0.14);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s var(--ease-out-quart), transform 0.3s var(--ease-out-quart);
}

.media-stage:hover .media-zoom,
.media-stage:focus-visible .media-zoom {
  opacity: 1;
  transform: none;
}

.thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.thumb {
  width: 84px;
  height: 84px;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: var(--black-light);
  cursor: pointer;
  transition: border-color 0.25s var(--ease-out-quart), opacity 0.25s var(--ease-out-quart);
  opacity: 0.6;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb:hover {
  opacity: 1;
  border-color: rgba(250, 250, 250, 0.24);
}

.thumb-active {
  opacity: 1;
  border-color: var(--gold);
}

/* ── Info ───────────────────────────────────────────────────── */
.product-title {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--white);
  margin: 0;
}

.product-description {
  margin: 24px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.78);
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 32px 0 0;
  background: rgba(250, 250, 250, 0.08);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.fact {
  padding: 16px;
  background: var(--black);
}

.fact dt {
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--gray);
}

.fact dd {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--white);
}

.fact-colors {
  grid-column: 1 / -1;
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-option {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid rgba(250, 250, 250, 0.12);
  background: rgba(250, 250, 250, 0.02);
  color: var(--white);
  font-size: 13px;
  line-height: 1.4;
}

.specs {
  margin-top: 32px;
}

.specs-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--gray);
  margin: 0 0 12px;
}

.specs-list {
  margin: 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.spec {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.spec dt {
  font-size: 14px;
  color: var(--gray);
}

.spec dd {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--white);
}

/* ── CTA ────────────────────────────────────────────────────── */
.cta {
  margin-top: 40px;
}

.cta-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  background: var(--gold);
  border: 1px solid var(--gold);
  color: var(--black);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out-quart), border-color 0.25s var(--ease-out-quart);
}

.cta-primary:hover {
  background: var(--gold-light);
  border-color: var(--gold-light);
}

.cta-primary svg {
  transition: transform 0.3s var(--ease-out-expo);
}

.cta-primary:hover svg {
  transform: translateX(4px);
}

.cta-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 10px;
}

.cta-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 8px 12px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  color: var(--gold);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out-quart), color 0.25s var(--ease-out-quart);
}
.cta-secondary:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.cta-secondary:hover {
  background: rgba(201, 162, 39, 0.1);
  color: var(--gold-light);
}

.cta-note {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

.cta-guide-link {
  display: inline-block;
  margin-top: 12px;
  color: var(--gold);
  font-size: 13px;
  font-weight: 600;
  text-underline-offset: 4px;
}

.cta-guide-link:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

/* ── Related ────────────────────────────────────────────────── */
.related {
  margin-top: 120px;
  padding-top: 40px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.related-title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--white);
  margin: 0 0 24px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.related-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: rgba(250, 250, 250, 0.02);
  text-decoration: none;
  transition: border-color 0.3s var(--ease-out-quart);
}

.related-card:hover {
  border-color: rgba(201, 162, 39, 0.35);
}

.related-image {
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--black-light);
  border-bottom: 1px solid rgba(250, 250, 250, 0.06);
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s var(--ease-out-expo);
}

.related-card:hover .related-image img {
  transform: scale(1.05);
}

.related-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
}

.related-name {
  font-size: 15px;
  color: var(--white);
}

.related-material {
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--gray);
}

.related-all {
  display: inline-flex;
  align-items: center;
  margin-top: 24px;
  padding: 10px 14px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  color: var(--gold);
  font-size: 13px;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out-quart);
}

.related-all:hover {
  background: rgba(201, 162, 39, 0.1);
}

/* ── Lightbox ───────────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 40px;
  background: rgba(10, 10, 10, 0.94);
}

.lightbox-content {
  max-width: min(1100px, 92vw);
  max-height: 86vh;
}

.lightbox-img {
  display: block;
  max-width: 100%;
  max-height: 86vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--white);
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.14);
  cursor: pointer;
  transition: border-color 0.25s var(--ease-out-quart), color 0.25s var(--ease-out-quart);
}

.lightbox-close:hover {
  color: var(--gold);
  border-color: var(--gold);
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  color: var(--white);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.25s var(--ease-out-quart);
}

.lightbox-arrow:hover {
  color: var(--gold);
}

.lightbox-prev { left: 16px; }
.lightbox-next { right: 16px; }

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s var(--ease-out-quart);
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* ── Reveal ─────────────────────────────────────────────────── */
.js-enabled .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
}

.js-enabled .reveal.revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .js-enabled .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .media-stage img,
  .related-image img,
  .cta-primary svg {
    transition: none;
  }

  .media-stage:hover img,
  .related-card:hover .related-image img,
  .cta-primary:hover svg {
    transform: none;
  }
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .detail-container {
    padding-top: 112px;
  }

  .breadcrumb {
    margin-bottom: 32px;
  }

  .detail-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .detail-container {
    padding: 96px 20px 100px;
  }

  .breadcrumb {
    margin-bottom: 24px;
    font-size: 12px;
  }

  .breadcrumb .breadcrumb-home {
    display: none;
  }

  .breadcrumb-home + li::before {
    display: none;
  }

  .facts {
    grid-template-columns: 1fr;
  }

  .spec {
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 12px;
  }

  .related {
    margin-top: 80px;
  }

  .related-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .lightbox {
    padding: 20px;
  }

  .lightbox-arrow {
    width: 44px;
    height: 44px;
  }
}
</style>
