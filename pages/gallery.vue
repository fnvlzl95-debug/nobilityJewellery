<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { galleryItems, categories, getItemsByCategory, type GalleryItem } from '~/data/gallery-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

useHead({
  title: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/gallery` }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 도매 귀족 갤러리. 금반지, 돌반지, 순금 돌반지, 커플링, 결혼예물 도매. 14K 18K 24K 순금 반지·목걸이·귀걸이·팔찌. 종로3가 금은방 주얼리 컬렉션.' },
    { name: 'keywords', content: '금반지 갤러리, 귀금속 작품, 주문제작 반지, 커플링, 돌반지, 결혼예물, 금목걸이, 금팔찌, 종로 금은방' },
    // Open Graph
    { property: 'og:title', content: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족' },
    { property: 'og:description', content: '종로 귀금속 도매 귀족 갤러리. 금반지, 돌반지, 커플링, 결혼예물 도매. 14K 18K 24K 순금.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/gallery` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NN0101.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '귀금속 갤러리 | 돌반지·커플링·예물 | 귀족' },
    { name: 'twitter:description', content: '종로 귀금속 도매 귀족 갤러리. 금반지, 돌반지, 커플링, 결혼예물 도매. 14K 18K 24K 순금.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NN0101.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: '귀족 귀금속 갤러리',
        description: '종로 귀금속 전문점 귀족의 작품 갤러리. 금반지, 커플링, 돌반지, 결혼예물 컬렉션.',
        url: `${siteConfig.url}/gallery`,
        numberOfItems: galleryItems.length,
        itemListElement: galleryItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.title,
            description: item.description,
            image: `${siteConfig.url}${item.images[0]}`,
            material: item.material,
            brand: {
              '@type': 'Brand',
              name: siteConfig.name
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'KRW',
              seller: {
                '@type': 'LocalBusiness',
                name: siteConfig.name,
                telephone: siteConfig.phoneFormatted
              }
            }
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
const availableCategories = computed(() => categories.filter((category) => getItemsByCategory(category.id).length > 0))

const activeItem = ref<GalleryItem>(galleryItems[0])
const activeTab = ref<string>(categories.filter(c => getItemsByCategory(c.id).length > 0)[0]?.id || '')
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
        <!-- Header -->
        <header class="gallery-header reveal">
          <h1 class="gallery-title">갤러리</h1>
          <span class="gallery-count">{{ galleryItems.length }} Items</span>
        </header>

        <!-- Tab Bar -->
        <div class="tab-bar reveal">
          <button
            v-for="category in availableCategories"
            :key="category.id"
            class="tab-btn"
            :class="{ active: activeTab === category.id }"
            @click="activeTab = category.id"
          >
            {{ category.label }}
          </button>
        </div>

        <!-- Product Grid -->
        <div class="product-grid">
          <article
            v-for="item in getItemsByCategory(activeTab)"
            :key="item.id"
            class="product-card"
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
            <div class="card-info">
              <h3 class="card-title">{{ item.title }}</h3>
              <span class="card-material">{{ item.material }}</span>
            </div>
          </article>
        </div>

        <!-- Footer -->
        <div class="gallery-footer reveal">
          <p class="footer-note">
            모든 제품은 도매가로 제공됩니다.<br>
            상세 문의는 전화 또는 방문 상담을 이용해주세요.
          </p>
          <NuxtLink to="/contact" class="footer-cta">
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
  font-family: 'JeonjuCraftMyungjo';
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
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
}

.gallery-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 28px;
  font-weight: 300;
  color: #fafafa;
}

.gallery-count {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.45);
}

/* ===== Tab Bar ===== */
.tab-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  margin-bottom: 32px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  flex-shrink: 0;
  padding: 14px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'JeonjuCraftMyungjo';
  font-size: 15px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.5);
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: rgba(250, 250, 250, 0.8);
}

.tab-btn.active {
  color: #c9a227;
  border-bottom-color: #c9a227;
}

/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(250, 250, 250, 0.06);
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
  padding: 10px 2px 0;
}

.card-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 13px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.85);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-material {
  font-size: 11px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.45);
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

  .gallery-title {
    font-size: 22px;
  }

  .gallery-header {
    margin-bottom: 16px;
  }

  .tab-btn {
    padding: 12px 16px;
    font-size: 14px;
  }

  .tab-bar {
    margin-bottom: 20px;
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .card-title {
    font-size: 12px;
  }

  .card-material {
    font-size: 10px;
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

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .card-info {
    padding: 8px 2px 0;
  }

  .card-title {
    font-size: 11px;
  }

  .card-material {
    font-size: 9px;
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
  font-family: 'JeonjuCraftMyungjo';
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
