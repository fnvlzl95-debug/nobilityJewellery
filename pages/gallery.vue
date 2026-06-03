<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { galleryItems, categories, getItemsByCategory, type GalleryItem } from '~/data/gallery-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { trackPageInquiryClick } = useGtag()

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
    { name: 'keywords', content: '금반지 갤러리, 귀금속 작품, 주문제작 반지, 커플링, 돌반지, 결혼예물, 금목걸이, 금팔찌, 종로 금은방' },
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
            '@type': 'Thing',
            name: item.title,
            description: item.description,
            image: `${siteConfig.url}${item.images[0]}`,
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

const isScrolled = ref(false)
const availableCategories = computed(() => availableCategoryData)
const categorySections = computed(() => availableCategories.value.map((category) => ({
  ...category,
  items: getItemsByCategory(category.id),
  cta: categoryLinkMap[category.id] ?? { to: '/contact', label: '상담 문의' },
})))
const categorySectionId = (categoryId: string) => `category-${categoryId}`

const activeItem = ref<GalleryItem>(galleryItems[0])
const currentImageIndex = ref(0)

const setActiveItem = (item: GalleryItem) => {
  activeItem.value = item
  currentImageIndex.value = 0
}

const handleCardClick = (item: GalleryItem) => {
  setActiveItem(item)
  openLightbox()
}

// 이미지 슬라이드 함수
const nextImage = () => {
  if (activeItem.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % activeItem.value.images.length
  }
}

const prevImage = () => {
  if (activeItem.value.images.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0
      ? activeItem.value.images.length - 1
      : currentImageIndex.value - 1
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

// 라이트박스
const isLightboxOpen = ref(false)

const openLightbox = () => {
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}

// ESC 키로 닫기
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onMounted(() => {
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

  // Reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="page">
    <CustomCursor />

    <main class="main">
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
              <p class="category-label">{{ section.labelEn }}</p>
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
              <button
                type="button"
                class="product-card-button"
                @click="handleCardClick(item)"
              >
                <div class="card-image">
                  <img
                    :src="item.images[0]"
                    :alt="item.title"
                    loading="lazy"
                  />
                  <span v-if="item.images.length > 1" class="card-badge">+{{ item.images.length - 1 }}</span>
                </div>
                <div class="card-body">
                  <div class="card-info">
                    <span class="card-title">{{ item.title }}</span>
                    <span class="card-material">{{ item.material }}</span>
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
              </button>
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
    </main>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div v-if="isLightboxOpen" class="lightbox" @click.self="closeLightbox">
          <button class="lightbox-close" @click="closeLightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="lightbox-content">
            <Transition name="image-fade" mode="out-in">
              <img
                :src="activeItem.images[currentImageIndex]"
                :alt="activeItem.title"
                :key="`lightbox-${activeItem.id}-${currentImageIndex}`"
                class="lightbox-img"
              />
            </Transition>
          </div>

          <template v-if="activeItem.images.length > 1">
            <button class="lightbox-arrow lightbox-prev" @click="prevImage">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button class="lightbox-arrow lightbox-next" @click="nextImage">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </template>

          <div v-if="activeItem.images.length > 1" class="lightbox-indicators">
            <button
              v-for="(img, idx) in activeItem.images"
              :key="idx"
              class="lightbox-dot"
              :class="{ active: currentImageIndex === idx }"
              @click="goToImage(idx)"
            ></button>
          </div>

          <div class="lightbox-info">
            <span class="lightbox-counter">{{ currentImageIndex + 1 }} / {{ activeItem.images.length }}</span>
            <h3 class="lightbox-title">{{ activeItem.title }}</h3>
            <span class="lightbox-material">{{ activeItem.material }}</span>
            <div class="lightbox-actions">
              <NuxtLink
                :to="buildGalleryInquiryLink(activeItem.title)"
                class="lightbox-contact"
                @click="handleInquiryAction('lightbox', activeItem.title)"
              >
                이 스타일로 문의하기
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.category-label {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a227;
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
  background: rgba(0, 0, 0, 0.6);
  color: rgba(250, 250, 250, 0.8);
  font-size: 10px;
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
  font-size: 17px;
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
  color: rgba(250, 250, 250, 0.42);
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
  font-size: 21px;
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

  .card-material {
    font-size: 10px;
  }

  .card-description {
    font-size: 11px;
  }

  .card-meta-list {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
/* ===== Lightbox (Global styles for Teleport) ===== */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(5, 5, 5, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.15);
  color: rgba(250, 250, 250, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.lightbox-close:hover {
  border-color: #c9a227;
  color: #c9a227;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  color: #fafafa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.5));
}

.lightbox-arrow:hover {
  color: #c9a227;
}

.lightbox-prev {
  left: 24px;
}

.lightbox-next {
  right: 24px;
}

.lightbox-indicators {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}

.lightbox-dot {
  width: 24px;
  height: 1px;
  background: rgba(250, 250, 250, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.lightbox-dot:hover {
  background: rgba(250, 250, 250, 0.6);
}

.lightbox-dot.active {
  background: #c9a227;
  width: 40px;
}

.lightbox-info {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.lightbox-counter {
  display: block;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 8px;
}

.lightbox-title {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 4px;
}

.lightbox-material {
  font-size: 12px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.5);
}

.lightbox-actions {
  margin-top: 18px;
}

.lightbox-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 16px;
  color: #0a0a0a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  background: #c9a227;
  border: 1px solid #c9a227;
}

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
.lightbox-fade-enter-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Mobile Lightbox */
@media (max-width: 768px) {
  .lightbox-close {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }

  .lightbox-arrow {
    width: 44px;
    height: 44px;
  }

  .lightbox-arrow svg {
    width: 24px;
    height: 24px;
  }

  .lightbox-prev {
    left: 8px;
  }

  .lightbox-next {
    right: 8px;
  }

  .lightbox-info {
    bottom: 20px;
  }

  .lightbox-indicators {
    bottom: 85px;
  }
}
</style>
