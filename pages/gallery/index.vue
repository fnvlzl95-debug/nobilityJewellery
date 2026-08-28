<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { galleryItems, categories, getItemsByCategory, type GalleryItem } from '~/data/gallery-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { trackPageInquiryClick, trackEvent, trackMetaEvent } = useGtag()

const categoryLinkMap: Record<string, { to: string; label: string }> = {
  ring: { to: '/couple-ring', label: '커플링/반지 안내' },
  necklace: { to: '/custom', label: '목걸이 주문제작' },
  bracelet: { to: '/custom', label: '팔찌 주문제작' },
  set: { to: '/wedding', label: '예물 세트 안내' },
}

const availableCategoryData = categories.filter((category) => getItemsByCategory(category.id).length > 0)

const consultationChecks = [
  '원하시는 카테고리와 비슷한 디자인 사진',
  '14K·18K 등 희망 소재와 색상',
  '선물용인지, 데일리용인지 같은 착용 목적',
  '희망 수령일과 예산 범위',
]

const buildGalleryInquiryLink = (topic?: string) => ({
  path: '/contact',
  query: {
    type: 'custom',
    source: 'gallery',
    ...(topic ? { topic } : {}),
  },
})

const handleInquiryAction = (placement = 'section_cta', topic?: string) => {
  trackPageInquiryClick('gallery', {
    placement,
    intent: 'custom',
    topic,
  })
}

useHead({
  title: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/gallery` }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 도매 귀족 갤러리. 반지, 목걸이, 팔찌, 예물 세트를 카테고리별로 보고 주문제작·상담 포인트까지 한 번에 확인하실 수 있습니다.' },
    // Open Graph
    { property: 'og:title', content: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족' },
    { property: 'og:description', content: '반지, 목걸이, 팔찌, 세트 컬렉션과 주문제작 상담 포인트를 함께 볼 수 있는 귀족 갤러리입니다.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/gallery` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NN0101.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족' },
    { name: 'twitter:description', content: '반지, 목걸이, 팔찌, 세트 컬렉션과 주문제작 상담 포인트를 함께 볼 수 있는 귀족 갤러리입니다.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NN0101.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: '귀족 귀금속 갤러리',
        description: '반지, 목걸이, 팔찌, 예물 세트를 카테고리별로 모아둔 귀족 귀금속 컬렉션 페이지입니다.',
        url: `${siteConfig.url}/gallery`,
        hasPart: availableCategoryData.map((category) => ({
          '@type': 'ItemList',
          name: `${category.label} 컬렉션`,
          numberOfItems: getItemsByCategory(category.id).length,
        })),
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: '귀족 귀금속 갤러리',
        description: '종로 귀금속 전문점 귀족의 작품 갤러리. 반지, 목걸이, 팔찌, 세트 컬렉션.',
        url: `${siteConfig.url}/gallery`,
        numberOfItems: galleryItems.length,
        itemListElement: galleryItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/gallery/${item.slug}#webpage`,
            name: item.title,
            description: item.description,
            url: `${siteConfig.url}/gallery/${item.slug}`,
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: `${siteConfig.url}${item.images[0]}`,
              caption: item.imageAlts[0] ?? item.title,
            },
          }
        }))
      })
    }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '갤러리', path: '/gallery' },
      ]))
    }
  ]
})

let lenis: Lenis | null = null
let rafId: number | null = null
let revealObserver: IntersectionObserver | null = null
let fallbackScrollHandler: (() => void) | null = null

const isScrolled = ref(false)
const availableCategories = computed(() => availableCategoryData)
const categorySections = computed(() => availableCategories.value.map((category) => ({
  ...category,
  items: getItemsByCategory(category.id),
  cta: categoryLinkMap[category.id] ?? { to: '/contact', label: '상담 문의' },
})))
const categorySectionId = (categoryId: string) => `category-${categoryId}`

// 카드는 /gallery/<slug> 상세 페이지로 이동한다. 이미지 확대·문의는 상세 페이지가 담당.
const handleCardClick = (item: GalleryItem) => {
  trackEvent('gallery_item_view', {
    item_id: String(item.id),
    item_name: item.title,
    item_category: item.category,
  })
  trackMetaEvent('ViewContent', {
    content_name: item.title,
    content_category: `gallery_${item.category}`,
    content_id: String(item.id),
  })
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      isScrolled.value = scroll > 80
    })
  } else {
    fallbackScrollHandler = () => { isScrolled.value = window.scrollY > 80 }
    window.addEventListener('scroll', fallbackScrollHandler, { passive: true })
    fallbackScrollHandler()
  }

  // Reveal animations
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver!.observe(el))
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  revealObserver?.disconnect()
  revealObserver = null
  if (fallbackScrollHandler) {
    window.removeEventListener('scroll', fallbackScrollHandler)
    fallbackScrollHandler = null
  }
})
</script>

<template>
  <div class="page">

    <div class="main">
      <div class="gallery-container">
        <header class="gallery-header reveal">
          <div>
            <p class="gallery-label">Collection</p>
            <h1 class="gallery-title">귀금속 갤러리</h1>
          </div>
          <div class="gallery-header-meta">
            <span class="gallery-count">{{ galleryItems.length }} Items</span>
            <span class="gallery-count-copy">반지 · 목걸이 · 팔찌 · 세트</span>
          </div>
        </header>

        <nav class="tab-bar reveal" aria-label="갤러리 카테고리">
          <a
            v-for="category in availableCategories"
            :key="category.id"
            class="tab-btn"
            :href="`#${categorySectionId(category.id)}`"
          >
            <span>{{ category.label }}</span>
            <strong>{{ getItemsByCategory(category.id).length }}</strong>
          </a>
        </nav>

        <section
          v-for="section in categorySections"
          :id="categorySectionId(section.id)"
          :key="section.id"
          class="category-section reveal"
        >
          <div class="category-header">
            <div>
              <h2 class="category-title">{{ section.label }}</h2>
            </div>
            <NuxtLink :to="section.cta.to" class="category-link">
              {{ section.cta.label }}
            </NuxtLink>
          </div>

          <p class="category-description">{{ section.description }}</p>

          <div class="category-meta">
            <span>{{ section.items.length }}개 디자인</span>
            <span>상담 전 비교용 대표 컬렉션</span>
          </div>

          <div class="product-grid">
            <article
              v-for="item in section.items"
              :key="item.id"
              class="product-card"
            >
              <NuxtLink
                class="product-card-button"
                :to="`/gallery/${item.slug}`"
                @click="handleCardClick(item)"
              >
                <div class="card-image">
                  <img
                    :src="item.images[0]"
                    :alt="item.imageAlts[0] ?? item.title"
                    loading="lazy"
                  />
                  <span v-if="item.images.length > 1" class="card-badge">+{{ item.images.length - 1 }}</span>
                </div>
                <div class="card-body">
                  <div class="card-info">
                    <span class="card-title">{{ item.title }}</span>
                    <span class="card-material">{{ item.colorOptions.length ? item.colorOptions.join(' · ') : item.material }}</span>
                  </div>
                  <p class="card-description">{{ item.description }}</p>
                  <dl class="card-meta-list">
                    <div>
                      <dt>제작</dt>
                      <dd>{{ item.workType }}</dd>
                    </div>
                    <div>
                      <dt>기간</dt>
                      <dd>{{ item.delivery }}</dd>
                    </div>
                  </dl>
                </div>
              </NuxtLink>
            </article>
          </div>

          <div class="category-actions">
            <NuxtLink
              :to="buildGalleryInquiryLink(section.label)"
              class="category-inquiry"
              @click="handleInquiryAction('section_cta', section.label)"
            >
              이 카테고리로 문의하기
            </NuxtLink>
          </div>
        </section>

        <section class="gallery-help reveal">
          <div class="gallery-help-card">
            <h2>상담 전에 알려주시면 좋은 내용</h2>
            <ul>
              <li v-for="check in consultationChecks" :key="check">{{ check }}</li>
            </ul>
          </div>
          <div class="gallery-help-card">
            <h2>갤러리 다음 단계</h2>
            <p>마음에 드는 스타일을 2~3개 정도 고른 뒤 예산과 수령일을 알려주시면 비교 상담이 훨씬 빨라집니다.</p>
            <div class="gallery-help-links">
              <NuxtLink to="/custom">주문제작 안내</NuxtLink>
              <NuxtLink to="/wedding">예물 안내</NuxtLink>
              <NuxtLink :to="buildGalleryInquiryLink()" @click="handleInquiryAction('section_cta', '갤러리 상담')">문의하기</NuxtLink>
            </div>
          </div>
        </section>

        <div class="gallery-footer reveal">
          <p class="footer-note">
            모든 제품은 도매가로 제공됩니다.<br>
            상세 문의는 전화 또는 방문 상담을 이용해주세요.
          </p>
          <NuxtLink :to="buildGalleryInquiryLink()" class="footer-cta" @click="handleInquiryAction('footer_cta', '갤러리 상담')">
            <span>문의하기</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  background: #0a0a0a;
  color: #fafafa;
  min-height: 100vh;
  font-family: var(--font-body);
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}

.main {
  min-height: 100vh;
  padding-top: 100px;
}

/* ===== Container ===== */
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px 120px;
}

/* ===== Header ===== */
.gallery-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.gallery-label {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a227;
}

.gallery-title {
  font-family: var(--font-body);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 300;
  color: #fafafa;
  margin: 0;
}

.gallery-header-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.gallery-count {
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.16em;
  color: rgba(250, 250, 250, 0.7);
  text-transform: uppercase;
}

.gallery-count-copy {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.62);
}

/* ===== Tab Bar ===== */
.tab-bar {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  margin-bottom: 32px;
  padding-bottom: 18px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 12px 18px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #fafafa;
  border-color: rgba(201, 162, 39, 0.45);
  background: rgba(201, 162, 39, 0.08);
}

.tab-btn strong {
  color: #c9a227;
  font-size: 12px;
  font-weight: 700;
}

/* ===== Category Section ===== */
.category-section {
  margin-bottom: 42px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.category-title {
  margin: 0;
  font-size: 28px;
  font-weight: 300;
}

.category-link {
  color: #fafafa;
  text-decoration: none;
  border: 1px solid rgba(201, 162, 39, 0.35);
  padding: 10px 14px;
  font-size: 13px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.category-link:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.1);
}

.category-description {
  margin: 0 0 12px;
  max-width: 900px;
  font-size: 15px;
  line-height: 1.9;
  color: rgba(250, 250, 250, 0.78);
}

.category-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.category-inquiry {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  color: #0a0a0a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  background: #c9a227;
  border: 1px solid #c9a227;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-inquiry:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(201, 162, 39, 0.22);
}

.category-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-meta span {
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: rgba(250, 250, 250, 0.02);
  padding: 6px 10px;
  font-size: 12px;
  color: rgba(250, 250, 250, 0.64);
}

/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  display: flex;
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: rgba(250, 250, 250, 0.02);
  transition: transform 0.3s, border-color 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 162, 39, 0.35);
}

.product-card-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  color: inherit;
  text-align: left;
}

.card-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;
  border-bottom: 1px solid rgba(250, 250, 250, 0.06);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}

.card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(10, 10, 10, 0.62); /* scrim — --black 기반, 상세 페이지 .media-zoom과 동일 */
  color: rgba(250, 250, 250, 0.8);
  font-size: 12px;
  font-weight: 300;
  padding: 3px 7px;
  letter-spacing: 0.05em;
}

.card-info {
  padding: 0;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.35em * 2); /* 1~2줄 제목 모두 같은 높이 확보 */
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;             /* 제목을 굵게 — 아래 텍스트와 위계 분리 */
  line-height: 1.35;
  color: #fafafa;               /* 가장 밝게 */
  margin: 0 0 4px;
}

.card-material {
  display: block;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(250, 250, 250, 0.5);
  margin: 0 0 12px;
}

.card-description {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.7em * 2);  /* 설명도 항상 2줄 높이 */
}

.card-meta-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
  margin-top: auto;             /* 제작/기간을 카드 하단에 고정 정렬 */
}

.card-meta-list div {
  padding-top: 10px;
  border-top: 1px solid rgba(250, 250, 250, 0.06);
}

.card-meta-list dt {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.65);
}

.card-meta-list dd {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(250, 250, 250, 0.82);
}

/* ===== Help ===== */
.gallery-help {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 10px;
  margin-bottom: 32px;
}

.gallery-help-card {
  padding: 20px;
  border: 1px solid rgba(201, 162, 39, 0.25);
  background: rgba(201, 162, 39, 0.05);
}

.gallery-help-card h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.gallery-help-card p,
.gallery-help-card li {
  font-size: 14px;
  line-height: 1.85;
  color: rgba(250, 250, 250, 0.8);
}

.gallery-help-card ul {
  margin: 0;
  padding-left: 18px;
}

.gallery-help-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.gallery-help-links a {
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.35);
  padding: 10px 14px;
  font-size: 13px;
}

.gallery-help-links a:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.08);
}

/* ===== Footer ===== */
.gallery-footer {
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.footer-note {
  font-size: 13px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 24px;
}

.footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a227;
  text-decoration: none;
  transition: gap 0.3s;
}

.footer-cta:hover {
  gap: 12px;
}

/* ===== Reveal Animation ===== */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Tablet ===== */
@media (max-width: 1023px) {
  .main {
    padding-top: 70px;
  }

  .gallery-container {
    padding: 24px 20px 100px;
  }

  .gallery-help {
    grid-template-columns: 1fr;
  }

  .gallery-header {
    margin-bottom: 16px;
  }

  .tab-btn {
    padding: 12px 14px;
    font-size: 14px;
  }

  .tab-bar {
    margin-bottom: 20px;
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .card-info {
    padding: 0;
  }

  .card-title {
    font-size: 15px;
  }

  .card-material {
    font-size: 11px;
  }

  .card-description {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
}

/* ===== Small Mobile ===== */
@media (max-width: 480px) {
  .gallery-container {
    padding: 16px 16px 80px;
  }

  .gallery-title {
    font-size: 20px;
  }

  .gallery-header-meta {
    align-items: flex-start;
  }

  .category-title {
    font-size: 24px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-size: 14px;
  }

  /* 모바일에서도 12px(fine) 아래로 내려가지 않게 한다.
     크기가 같아져도 위계는 순서와 명도(0.5 vs 0.7)가 계속 지탱한다. */
  .card-material {
    font-size: 12px;
  }

  .card-description {
    font-size: 12px;
  }

  .card-meta-list {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
/* ===== Lightbox (Global styles for Teleport) ===== */
/* Image Transition */
.image-fade-enter-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.image-fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.image-fade-enter-from {
  opacity: 0;
}

.image-fade-leave-to {
  opacity: 0;
}

/* Lightbox Transition */
/* Mobile Lightbox */
@media (max-width: 768px) {
}
</style>
