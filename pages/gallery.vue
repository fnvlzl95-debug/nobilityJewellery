<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

useHead({
  title: '갤러리 | 귀족',
  meta: [
    { name: 'description', content: '귀족 귀금속 갤러리 - 반지, 목걸이, 귀걸이, 팔찌' }
  ]
})

let lenis: Lenis | null = null
let rafId: number | null = null

const isScrolled = ref(false)

interface GalleryItem {
  id: number
  category: string
  title: string
  titleEn: string
  material: string
  workType: string
  delivery: string
  src: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'ring', title: '18K 골드 웨딩밴드', titleEn: 'Wedding Band', material: '18K 골드', workType: '주문제작 가능', delivery: '2-3주', src: '/Image/pexels-pixabay-265856.jpg' },
  { id: 2, category: 'ring', title: '다이아몬드 솔리테어', titleEn: 'Diamond Solitaire', material: '18K 화이트골드 / 다이아', workType: '주문제작 가능', delivery: '3-4주', src: '/Image/pexels-pixabay-266621.jpg' },
  { id: 3, category: 'ring', title: '커스텀 시그넷 링', titleEn: 'Signet Ring', material: '14K 골드', workType: '각인 가능', delivery: '2주', src: '/Image/pexels-gdtography-277628-6563393.jpg' },
  { id: 4, category: 'ring', title: '골드 레이어드 링', titleEn: 'Layered Ring', material: '14K / 18K 골드', workType: '사이즈 조절', delivery: '즉시', src: '/Image/pexels-fox-58267-998521.jpg' },
  { id: 5, category: 'ring', title: '핸드메이드 실버 링', titleEn: 'Handmade Silver', material: '925 실버', workType: '주문제작', delivery: '1-2주', src: '/Image/pexels-leah-newhouse-50725-691046.jpg' },
  { id: 6, category: 'necklace', title: '14K 체인 네크리스', titleEn: 'Chain Necklace', material: '14K 골드', workType: '길이 조절 가능', delivery: '즉시', src: '/Image/pexels-pixabay-248077.jpg' },
  { id: 7, category: 'necklace', title: '럭셔리 주얼리 세트', titleEn: 'Luxury Set', material: '18K 골드 / 진주', workType: '세트 구성', delivery: '1주', src: '/Image/pexels-wendelmoretti-1730877.jpg' },
  { id: 8, category: 'bracelet', title: '순금 뱅글 브레이슬릿', titleEn: 'Gold Bangle', material: '24K 순금', workType: '사이즈 주문', delivery: '2-3주', src: '/Image/pexels-pixabay-265906.jpg' },
  { id: 9, category: 'earring', title: '진주 드롭 이어링', titleEn: 'Pearl Drop', material: '14K 골드 / 담수진주', workType: '피어싱/클립', delivery: '즉시', src: '/Image/pexels-git-stephen-gitau-302905-1670723.jpg' },
  { id: 10, category: 'set', title: '웨딩 주얼리 컬렉션', titleEn: 'Wedding Collection', material: '18K 골드', workType: '맞춤 제작', delivery: '상담 후 결정', src: '/Image/pexels-jeremy-wong-382920-1043902.jpg' },
]

const categories = [
  { id: 'ring', label: '반지', labelEn: 'Rings' },
  { id: 'necklace', label: '목걸이', labelEn: 'Necklaces' },
  { id: 'bracelet', label: '팔찌', labelEn: 'Bracelets' },
  { id: 'earring', label: '귀걸이', labelEn: 'Earrings' },
  { id: 'set', label: '세트', labelEn: 'Sets' },
]

const getItemsByCategory = (categoryId: string) => {
  return galleryItems.filter(item => item.category === categoryId)
}

// Preview state
const activeItem = ref<GalleryItem>(galleryItems[0])
const expandedCategory = ref<string | null>(null)

const setActiveItem = (item: GalleryItem) => {
  activeItem.value = item
}

const toggleCategory = (categoryId: string) => {
  if (expandedCategory.value === categoryId) {
    expandedCategory.value = null
  } else {
    expandedCategory.value = categoryId
    // Set first item of category as active
    const items = getItemsByCategory(categoryId)
    if (items.length > 0) {
      activeItem.value = items[0]
    }
  }
}

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
})
</script>

<template>
  <div class="page">
    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Navigation -->
    <nav class="nav-luxury" :class="{ scrolled: isScrolled }">
      <NuxtLink to="/" class="nav-logo">
        <span class="logo-text">귀족</span>
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">홈</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link active">갤러리</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <!-- Desktop Layout -->
      <div class="editorial-layout">
        <!-- Left: Index -->
        <aside class="index-column">
          <header class="index-header reveal">
            <span class="index-label">Collection</span>
            <h1 class="index-title">갤러리</h1>
            <p class="index-count">{{ galleryItems.length }} Items</p>
          </header>

          <div class="index-list">
            <div
              v-for="category in categories"
              :key="category.id"
              class="category-group reveal"
            >
              <button
                class="category-header"
                :class="{ expanded: expandedCategory === category.id }"
                @click="toggleCategory(category.id)"
              >
                <div class="category-info">
                  <span class="category-label">{{ category.label }}</span>
                  <span class="category-label-en">{{ category.labelEn }}</span>
                </div>
                <span class="category-count">{{ getItemsByCategory(category.id).length }}</span>
              </button>

              <!-- Desktop: Always visible items -->
              <ul class="item-list desktop-only">
                <li
                  v-for="item in getItemsByCategory(category.id)"
                  :key="item.id"
                  class="item-row"
                  :class="{ active: activeItem.id === item.id }"
                  @mouseenter="setActiveItem(item)"
                  @focus="setActiveItem(item)"
                  @click="setActiveItem(item)"
                  tabindex="0"
                >
                  <span class="item-number">{{ String(item.id).padStart(2, '0') }}</span>
                  <span class="item-title">{{ item.title }}</span>
                  <span class="item-material">{{ item.material }}</span>
                </li>
              </ul>

              <!-- Mobile: Accordion -->
              <div
                class="accordion-content mobile-only"
                :class="{ open: expandedCategory === category.id }"
              >
                <ul class="item-list">
                  <li
                    v-for="item in getItemsByCategory(category.id)"
                    :key="item.id"
                    class="item-row"
                    :class="{ active: activeItem.id === item.id }"
                    @click="setActiveItem(item)"
                  >
                    <span class="item-number">{{ String(item.id).padStart(2, '0') }}</span>
                    <span class="item-title">{{ item.title }}</span>
                  </li>
                </ul>

                <!-- Mobile Preview -->
                <div
                  v-if="expandedCategory === category.id"
                  class="mobile-preview"
                >
                  <div class="preview-image">
                    <img :src="activeItem.src" :alt="activeItem.title">
                  </div>
                  <div class="preview-meta">
                    <h3 class="preview-title">{{ activeItem.title }}</h3>
                    <span class="preview-title-en">{{ activeItem.titleEn }}</span>
                    <div class="meta-grid">
                      <div class="meta-item">
                        <span class="meta-label">소재</span>
                        <span class="meta-value">{{ activeItem.material }}</span>
                      </div>
                      <div class="meta-item">
                        <span class="meta-label">작업</span>
                        <span class="meta-value">{{ activeItem.workType }}</span>
                      </div>
                      <div class="meta-item">
                        <span class="meta-label">납기</span>
                        <span class="meta-value">{{ activeItem.delivery }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="index-footer reveal">
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
        </aside>

        <!-- Right: Macro Preview (Desktop) -->
        <section class="preview-column desktop-only">
          <div class="preview-frame reveal">
              <div class="preview-image-wrap">
                <img
                  :src="activeItem.src"
                  :alt="activeItem.title"
                  :key="activeItem.id"
                  class="preview-img"
                >
              </div>
              <div class="preview-caption">
                <div class="caption-left">
                  <span class="caption-number">No. {{ String(activeItem.id).padStart(2, '0') }}</span>
                  <h2 class="caption-title">{{ activeItem.title }}</h2>
                  <span class="caption-title-en">{{ activeItem.titleEn }}</span>
                </div>
                <div class="caption-right">
                  <div class="meta-row">
                    <span class="meta-label">소재</span>
                    <span class="meta-value">{{ activeItem.material }}</span>
                  </div>
                  <div class="meta-row">
                    <span class="meta-label">작업</span>
                    <span class="meta-value">{{ activeItem.workType }}</span>
                  </div>
                  <div class="meta-row">
                    <span class="meta-label">납기</span>
                    <span class="meta-value">{{ activeItem.delivery }}</span>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-name">귀족</span>
        </div>
        <div class="footer-links">
          <NuxtLink to="/">홈</NuxtLink>
          <NuxtLink to="/gallery">갤러리</NuxtLink>
          <NuxtLink to="/contact">문의하기</NuxtLink>
        </div>
      </div>
      <div class="footer-copy">
        © 2024 귀족. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  background: #0a0a0a;
  color: #fafafa;
  min-height: 100vh;
  font-family: 'Outfit', -apple-system, sans-serif;
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}

/* ===== Navigation ===== */
.nav-luxury {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(250, 250, 250, 0.04);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-luxury.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px 32px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.1);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  gap: 2px;
}

.logo-text {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 500;
  color: #fafafa;
  letter-spacing: 0.15em;
}


.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s;
  padding: 8px 4px;
  position: relative;
  z-index: 10;
}

.nav-link:hover,
.nav-link.active {
  color: #fafafa;
}

/* ===== Main Layout ===== */
.main {
  min-height: 100vh;
  padding-top: 100px;
}

.editorial-layout {
  display: flex;
  align-items: stretch;
}

/* ===== Index Column ===== */
.index-column {
  width: 100%;
  padding: 40px 24px 80px;
  border-right: 1px solid rgba(250, 250, 250, 0.06);
}

@media (min-width: 1024px) {
  .index-column {
    width: 25%;
    padding: 24px 32px 120px;
  }
}

.index-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.index-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 12px;
}

.index-title {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 42px;
  font-weight: 400;
  color: #fafafa;
  margin-bottom: 8px;
}

.index-count {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.4);
}

/* ===== Category Groups ===== */
.index-list {
  display: flex;
  flex-direction: column;
}

.category-group {
  border-bottom: 1px solid rgba(250, 250, 250, 0.06);
}

.category-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: none;
  transition: all 0.3s;
}

.category-header:hover .category-label {
  color: #c9a227;
}

.category-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.category-label {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 400;
  color: #fafafa;
  transition: color 0.3s;
}

.category-label-en {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.3);
}

.category-count {
  font-size: 11px;
  font-weight: 500;
  color: rgba(250, 250, 250, 0.3);
  min-width: 20px;
  text-align: right;
}

/* ===== Item List ===== */
.item-list {
  list-style: none;
  margin: 0;
  padding: 0 0 16px;
}

.item-row {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 12px 0;
  cursor: none;
  transition: all 0.3s;
  border-left: 2px solid transparent;
  padding-left: 16px;
  margin-left: -16px;
}

.item-row:hover,
.item-row.active {
  border-left-color: #c9a227;
}

.item-row.active .item-title {
  color: #c9a227;
}

.item-number {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.25);
}

.item-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(250, 250, 250, 0.8);
  transition: color 0.3s;
}

.item-material {
  font-size: 11px;
  font-weight: 400;
  color: rgba(250, 250, 250, 0.35);
  text-align: right;
}

/* ===== Desktop/Mobile Visibility ===== */
.desktop-only {
  display: none !important;
}

.mobile-only {
  display: block !important;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: flex !important;
  }

  .desktop-only.item-list {
    display: block !important;
  }

  .mobile-only {
    display: none !important;
  }
}

/* ===== Mobile Accordion ===== */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.accordion-content.open {
  max-height: 1000px;
}

.mobile-preview {
  padding: 24px 0;
  border-top: 1px solid rgba(250, 250, 250, 0.06);
  margin-top: 16px;
}

.mobile-preview .preview-image {
  aspect-ratio: 4/3;
  overflow: hidden;
  margin-bottom: 20px;
}

.mobile-preview .preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-preview .preview-title {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 400;
  color: #fafafa;
  margin-bottom: 4px;
}

.mobile-preview .preview-title-en {
  display: block;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.4);
  margin-bottom: 20px;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.35);
}

.meta-value {
  font-size: 12px;
  font-weight: 400;
  color: rgba(250, 250, 250, 0.8);
}

/* ===== Index Footer ===== */
.index-footer {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.footer-note {
  font-size: 13px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.4);
  margin-bottom: 24px;
}

.footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a227;
  text-decoration: none;
  transition: gap 0.3s;
}

.footer-cta:hover {
  gap: 12px;
}

/* ===== Preview Column (Desktop) ===== */
.preview-column {
  position: fixed;
  top: 0;
  left: 37%;
  right: 0;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 40px;
  padding-top: 124px;
}

.preview-frame {
  width: 100%;
  max-width: 720px;
}

.preview-image-wrap {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #111;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-caption {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.caption-left {
  flex: 1;
}

.caption-number {
  display: block;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #c9a227;
  margin-bottom: 8px;
}

.caption-title {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 400;
  color: #fafafa;
  margin-bottom: 4px;
}

.caption-title-en {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.4);
}

.caption-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
  padding-left: 32px;
}

.meta-row {
  display: flex;
  gap: 12px;
  align-items: baseline;
  justify-content: flex-end;
}

.meta-row .meta-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.3);
}

.meta-row .meta-value {
  font-size: 12px;
  font-weight: 400;
  color: rgba(250, 250, 250, 0.7);
  min-width: 100px;
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

/* ===== Footer ===== */
.footer {
  border-top: 1px solid rgba(250, 250, 250, 0.06);
  padding: 48px 32px 32px;
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  font-family: 'JeonjuCraftMyungjo', 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #c9a227;
}

.brand-sub {
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.4);
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  font-size: 12px;
  font-weight: 400;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fafafa;
}

.footer-copy {
  text-align: center;
  font-size: 11px;
  color: rgba(250, 250, 250, 0.25);
}

/* ===== Mobile Adjustments ===== */
@media (max-width: 1023px) {
  .nav-luxury {
    padding: 16px 20px;
  }

  .nav-luxury.scrolled {
    padding: 12px 20px;
  }

  .nav-links {
    gap: 16px;
  }

  .nav-link {
    font-size: 11px;
    padding: 6px 2px;
  }

  .main {
    padding-top: 70px;
  }

  .index-column {
    width: 100%;
    padding: 20px 20px 100px;
    border-right: none;
  }

  .index-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }

  .index-title {
    font-size: 28px;
  }

  .index-label {
    font-size: 9px;
    margin-bottom: 8px;
  }

  .index-count {
    font-size: 11px;
  }

  .category-header {
    padding: 16px 0;
  }

  .category-label {
    font-size: 16px;
  }

  .category-label-en {
    font-size: 10px;
  }

  .item-row {
    grid-template-columns: 24px 1fr;
    gap: 12px;
    padding: 10px 0;
    padding-left: 12px;
    margin-left: -12px;
  }

  .item-number {
    font-size: 9px;
  }

  .item-title {
    font-size: 13px;
  }

  .item-material {
    display: none;
  }

  .mobile-preview {
    padding: 20px 0;
    margin-top: 12px;
  }

  .mobile-preview .preview-image {
    aspect-ratio: 16/10;
    margin-bottom: 16px;
    border-radius: 4px;
    overflow: hidden;
  }

  .mobile-preview .preview-title {
    font-size: 20px;
  }

  .mobile-preview .preview-title-en {
    font-size: 10px;
    margin-bottom: 16px;
  }

  .meta-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .meta-label {
    font-size: 8px;
  }

  .meta-value {
    font-size: 11px;
  }

  .index-footer {
    margin-top: 32px;
    padding-top: 24px;
  }

  .footer-note {
    font-size: 12px;
    margin-bottom: 16px;
  }

  .footer-cta {
    font-size: 11px;
  }

  .footer {
    padding: 32px 20px 24px;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .footer-links {
    gap: 16px;
  }

  .footer-links a {
    font-size: 11px;
  }

  .footer-copy {
    text-align: left;
    font-size: 10px;
  }
}

/* ===== Small Mobile ===== */
@media (max-width: 480px) {
  .nav-links {
    gap: 12px;
  }

  .nav-link {
    font-size: 10px;
  }

  .index-column {
    padding: 16px 16px 80px;
  }

  .index-title {
    font-size: 24px;
  }

  .category-label {
    font-size: 15px;
  }

  .meta-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .meta-grid .meta-item:last-child {
    grid-column: span 2;
  }
}
</style>
