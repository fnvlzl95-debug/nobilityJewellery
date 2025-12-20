<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

useHead({
  title: '갤러리 | 귀족',
  meta: [
    { name: 'description', content: '귀족 귀금속 갤러리 - 반지, 목걸이, 귀걸이, 팔찌' }
  ]
})

let lenis: Lenis | null = null
let rafId: number | null = null

const categories = [
  { id: 'all', label: '전체' },
  { id: 'ring', label: '반지' },
  { id: 'necklace', label: '목걸이' },
  { id: 'bracelet', label: '팔찌' },
  { id: 'earring', label: '귀걸이' },
]

const activeCategory = ref('all')

const galleryItems = [
  { id: 1, category: 'ring', title: '18K 골드 웨딩밴드', src: '/Image/pexels-pixabay-265856.jpg' },
  { id: 2, category: 'ring', title: '다이아몬드 솔리테어', src: '/Image/pexels-pixabay-266621.jpg' },
  { id: 3, category: 'necklace', title: '14K 체인 네크리스', src: '/Image/pexels-pixabay-248077.jpg' },
  { id: 4, category: 'bracelet', title: '순금 뱅글 브레이슬릿', src: '/Image/pexels-pixabay-265906.jpg' },
  { id: 5, category: 'earring', title: '진주 드롭 이어링', src: '/Image/pexels-git-stephen-gitau-302905-1670723.jpg' },
  { id: 6, category: 'ring', title: '커스텀 시그넷 링', src: '/Image/pexels-gdtography-277628-6563393.jpg' },
  { id: 7, category: 'ring', title: '골드 레이어드 링', src: '/Image/pexels-fox-58267-998521.jpg' },
  { id: 8, category: 'necklace', title: '럭셔리 주얼리 세트', src: '/Image/pexels-wendelmoretti-1730877.jpg' },
  { id: 9, category: 'ring', title: '핸드메이드 실버 링', src: '/Image/pexels-leah-newhouse-50725-691046.jpg' },
  { id: 10, category: 'ring', title: '웨딩 주얼리 컬렉션', src: '/Image/pexels-jeremy-wong-382920-1043902.jpg' },
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return galleryItems
  return galleryItems.filter(item => item.category === activeCategory.value)
})

const selectedImage = ref<string | null>(null)
const selectedTitle = ref('')

const openLightbox = (src: string, title: string) => {
  selectedImage.value = src
  selectedTitle.value = title
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedImage.value = null
  selectedTitle.value = ''
  document.body.style.overflow = ''
}

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
  }
  window.addEventListener('keydown', handleKeydown)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
})
</script>

<template>
  <div class="page">
    <!-- Navigation -->
    <nav class="nav">
      <NuxtLink to="/" class="nav-brand">귀족</NuxtLink>
      <div class="nav-menu">
        <NuxtLink to="/" class="nav-link">홈</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link active">갤러리</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Header -->
    <header class="header">
      <div class="container">
        <span class="label">Gallery</span>
        <h1 class="page-title">귀금속 갤러리</h1>
        <p class="page-desc">20년 전통의 장인 정신으로 만든 귀금속을 만나보세요</p>
      </div>
    </header>

    <!-- Category Filter -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-btns">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="filter-btn"
            :class="{ active: activeCategory === cat.id }"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="gallery-section">
      <div class="container">
        <div class="gallery-grid">
          <div
            v-for="(item, index) in filteredItems"
            :key="item.id"
            class="gallery-item fade-in"
            :class="{ 'gallery-item--large': index === 0 }"
            @click="openLightbox(item.src, item.title)"
          >
            <img :src="item.src" :alt="item.title">
            <div class="gallery-info">
              <span class="gallery-cat">{{ categories.find(c => c.id === item.category)?.label }}</span>
              <h3 class="gallery-title">{{ item.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <h2 class="cta-title fade-in">마음에 드는 제품이 있으신가요?</h2>
        <p class="cta-desc fade-in">도매 문의는 언제든 환영합니다</p>
        <div class="cta-btns fade-in">
          <a href="tel:02-XXX-XXXX" class="btn btn--white">전화 상담</a>
          <NuxtLink to="/contact" class="btn btn--outline">온라인 문의</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-brand">귀족</span>
        <div class="footer-links">
          <NuxtLink to="/">홈</NuxtLink>
          <NuxtLink to="/gallery">갤러리</NuxtLink>
          <NuxtLink to="/contact">문의하기</NuxtLink>
        </div>
        <span class="footer-copy">© 2024 귀족</span>
      </div>
    </footer>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedImage" class="lightbox" @click="closeLightbox">
          <button class="lightbox-close" @click="closeLightbox">&times;</button>
          <img :src="selectedImage" :alt="selectedTitle" class="lightbox-img" @click.stop>
          <p class="lightbox-title">{{ selectedTitle }}</p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.page {
  background: #f8f6f3;
  color: #1a1a1a;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: #f8f6f3;
  border-bottom: 1px solid #efece7;
}

.nav-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: #1a1a1a;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.nav-menu {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 13px;
  color: #666666;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #1a1a1a;
}

/* Header */
.header {
  padding: 140px 0 40px;
  text-align: center;
}

.label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 16px;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 400;
  margin-bottom: 16px;
}

.page-desc {
  font-size: 15px;
  color: #666666;
}

/* Filter */
.filter-section {
  padding: 20px 0 40px;
}

.filter-btns {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  font-size: 13px;
  background: transparent;
  border: 1px solid #efece7;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.filter-btn.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #ffffff;
}

/* Gallery */
.gallery-section {
  padding: 0 0 100px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
}

.gallery-item--large {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.gallery-item:hover img {
  transform: scale(1.08);
}

.gallery-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #ffffff;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
}

.gallery-item:hover .gallery-info {
  opacity: 1;
  transform: translateY(0);
}

.gallery-cat {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #b8860b;
}

.gallery-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  margin-top: 8px;
}

/* CTA */
.cta {
  background: #1a1a1a;
  color: #ffffff;
  padding: 100px 0;
  text-align: center;
}

.cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  margin-bottom: 12px;
}

.cta-desc {
  font-size: 15px;
  color: #999999;
  margin-bottom: 32px;
}

.cta-btns {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--white {
  background: #ffffff;
  color: #1a1a1a;
}

.btn--white:hover {
  background: #b8860b;
  color: #ffffff;
}

.btn--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.4);
}

.btn--outline:hover {
  background: rgba(255,255,255,0.1);
}

/* Footer */
.footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  font-size: 13px;
  color: #999999;
  text-decoration: none;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-copy {
  font-size: 12px;
  color: #999999;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 40px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.lightbox-close:hover {
  opacity: 1;
}

.lightbox-img {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-title {
  margin-top: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: #ffffff;
}

/* Fade In */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
