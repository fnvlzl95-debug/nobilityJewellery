<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: '돌반지 | 순금 돌반지 주문제작 - 귀족 종로 금은방',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/baby-gold' }
  ],
  meta: [
    { name: 'description', content: '순금 돌반지 주문제작 전문 귀족. 24K 순금 돌반지, 백일반지, 아기반지. 띠별 디자인(말띠, 용띠, 뱀띠) 맞춤제작. 이름 각인 가능. 종로3가 금은방 도매가 제공. 돌잔치 선물 추천.' },
    { name: 'keywords', content: '돌반지, 순금 돌반지, 돌반지 주문제작, 백일반지, 아기반지, 돌잔치 반지, 24K 돌반지, 순금 아기반지, 띠별 돌반지, 말띠 돌반지, 용띠 돌반지, 종로 돌반지, 금은방 돌반지' },
    // Open Graph
    { property: 'og:title', content: '돌반지 | 순금 돌반지 주문제작 - 귀족 종로 금은방' },
    { property: 'og:description', content: '24K 순금 돌반지 주문제작. 백일반지, 아기반지, 띠별 디자인 맞춤제작. 종로3가 금은방 도매가.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/baby-gold' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/SB0101.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '돌반지 | 순금 돌반지 주문제작 - 귀족' },
    { name: 'twitter:description', content: '24K 순금 돌반지 주문제작. 백일반지, 아기반지, 띠별 디자인 맞춤제작.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/SB0101.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: '순금 돌반지',
        description: '24K 순금으로 제작하는 돌반지, 백일반지, 아기반지. 띠별 디자인 주문제작 가능.',
        brand: {
          '@type': 'Brand',
          name: '귀족'
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KRW',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'LocalBusiness',
            name: '귀족',
            telephone: '+82-2-766-4789',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '종로 173 종묘귀금속백화점 101호',
              addressLocality: '종로구',
              addressRegion: '서울',
              addressCountry: 'KR'
            }
          }
        },
        image: 'https://noblessegold.com/Image/ring/SB0101.webp'
      })
    }
  ]
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const products = [
  {
    title: '순금 돌반지',
    material: '24K 순금 (99.9%)',
    description: '첫 돌을 축하하는 전통 순금 반지. 순도 99.9% 순금으로 제작하여 아이의 건강과 행복을 기원합니다.',
    features: ['순도 99.9%', '이름 각인', '띠별 디자인', '크기 맞춤']
  },
  {
    title: '백일반지',
    material: '24K 순금',
    description: '백일을 기념하는 소중한 선물. 작은 손가락에 맞는 정교한 사이즈로 제작합니다.',
    features: ['소형 사이즈', '가벼운 무게', '섬세한 디자인', '보관함 포함']
  },
  {
    title: '띠별 아기반지',
    material: '24K 순금',
    description: '태어난 해의 띠를 새긴 특별한 반지. 용띠, 뱀띠, 말띠 등 모든 띠 디자인 제작 가능합니다.',
    features: ['12간지 디자인', '년도 각인', '맞춤 사이즈', '품질보증서']
  }
]

const zodiacSigns = [
  { year: '2024', sign: '용띠', emoji: '🐉' },
  { year: '2025', sign: '뱀띠', emoji: '🐍' },
  { year: '2026', sign: '말띠', emoji: '🐴' },
  { year: '2027', sign: '양띠', emoji: '🐑' }
]

const processSteps = [
  { num: '01', title: '상담', desc: '디자인, 무게, 각인 내용 결정' },
  { num: '02', title: '제작', desc: '장인이 직접 순금 세공' },
  { num: '03', title: '검수', desc: '순도 검사 및 품질 확인' },
  { num: '04', title: '전달', desc: '보관함과 품질보증서 함께 제공' }
]
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
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <NuxtLink to="/baby-gold" class="nav-link active">돌반지</NuxtLink>
        <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Header -->
        <div class="page-header">
          <span class="label">Baby Gold Ring</span>
          <h1 class="title">순금 돌반지</h1>
          <p class="desc">
            아이의 첫 돌을 축하하는 24K 순금 반지.<br>
            30년 경력 장인이 정성껏 제작합니다.
          </p>
        </div>

        <!-- Hero Image -->
        <div class="hero-image">
          <img src="/Image/ring/SB0101.webp" alt="순금 돌반지 - 24K 순금 아기반지" loading="eager" />
        </div>

        <!-- Why Choose -->
        <div class="why-section">
          <h2 class="section-title">왜 귀족 돌반지인가요?</h2>
          <div class="why-grid">
            <div class="why-item">
              <span class="why-number">01</span>
              <h3>99.9% 순금</h3>
              <p>순도 99.9% 24K 순금만 사용합니다</p>
            </div>
            <div class="why-item">
              <span class="why-number">02</span>
              <h3>직접 제작</h3>
              <p>30년 경력 장인이 매장에서 직접 세공</p>
            </div>
            <div class="why-item">
              <span class="why-number">03</span>
              <h3>도매가 제공</h3>
              <p>종로 도매상가 가격으로 합리적 구매</p>
            </div>
            <div class="why-item">
              <span class="why-number">04</span>
              <h3>품질보증</h3>
              <p>품질보증서 제공, A/S 가능</p>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div class="products-section">
          <h2 class="section-title">돌반지 종류</h2>
          <div class="products-grid">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="product-card"
            >
              <div class="product-header">
                <h3 class="product-title">{{ product.title }}</h3>
                <span class="product-material">{{ product.material }}</span>
              </div>
              <p class="product-desc">{{ product.description }}</p>
              <ul class="product-features">
                <li v-for="(feature, i) in product.features" :key="i">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Zodiac Signs -->
        <div class="zodiac-section">
          <h2 class="section-title">띠별 돌반지</h2>
          <p class="section-desc">태어난 해의 띠를 새긴 특별한 돌반지</p>
          <div class="zodiac-grid">
            <div
              v-for="zodiac in zodiacSigns"
              :key="zodiac.year"
              class="zodiac-card"
            >
              <span class="zodiac-emoji">{{ zodiac.emoji }}</span>
              <span class="zodiac-year">{{ zodiac.year }}년생</span>
              <span class="zodiac-sign">{{ zodiac.sign }}</span>
            </div>
          </div>
          <p class="zodiac-note">* 모든 12간지 디자인 주문제작 가능합니다</p>
        </div>

        <!-- Process -->
        <div class="process-section">
          <h2 class="section-title">주문 과정</h2>
          <div class="process-grid">
            <div
              v-for="step in processSteps"
              :key="step.num"
              class="process-step"
            >
              <span class="step-num">{{ step.num }}</span>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Gallery Preview -->
        <div class="gallery-section">
          <h2 class="section-title">제품 갤러리</h2>
          <div class="gallery-grid">
            <img src="/Image/ring/SB0101.webp" alt="순금 말띠 돌반지" loading="lazy" />
            <img src="/Image/ring/SB0102.webp" alt="순금 돌반지 디자인" loading="lazy" />
            <img src="/Image/ring/SB0103.webp" alt="24K 순금 아기반지" loading="lazy" />
            <img src="/Image/ring/SB0104.webp" alt="백일반지" loading="lazy" />
          </div>
          <div class="gallery-cta">
            <NuxtLink to="/gallery" class="btn-text">
              <span>더 많은 제품 보기</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h3>돌반지 상담</h3>
          <p>아이의 첫 돌을 위한 특별한 순금 반지.<br>전화 또는 방문하시면 상세히 안내해드립니다.</p>
          <div class="cta-buttons">
            <a href="tel:02-766-4789" class="btn-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>02-766-4789</span>
            </a>
            <NuxtLink to="/contact" class="btn-outline">
              <span>온라인 문의</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Location -->
        <div class="location-info">
          <h4>방문 안내</h4>
          <p class="address">서울 종로구 종로 173 종묘귀금속백화점 101호</p>
          <p class="hours">영업시간: 평일/토요일 10:00~19:00 (일요일·공휴일 휴무)</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-top">
          <NuxtLink to="/" class="footer-brand">귀족</NuxtLink>
          <div class="footer-nav">
            <NuxtLink to="/">홈</NuxtLink>
            <NuxtLink to="/gallery">갤러리</NuxtLink>
            <NuxtLink to="/baby-gold">돌반지</NuxtLink>
            <NuxtLink to="/couple-ring">커플링</NuxtLink>
            <NuxtLink to="/wedding">결혼예물</NuxtLink>
            <NuxtLink to="/buy-gold">금 매입</NuxtLink>
            <NuxtLink to="/wholesale">도매 안내</NuxtLink>
            <NuxtLink to="/custom">주문제작</NuxtLink>
            <NuxtLink to="/repair">수리/AS</NuxtLink>
            <NuxtLink to="/faq">FAQ</NuxtLink>
            <NuxtLink to="/contact">문의하기</NuxtLink>
          </div>
        </div>
        <div class="footer-info">
          <span>대표: 박승태 | 사업자등록번호: 101-09-26010</span>
        </div>
        <div class="footer-bottom">
          <span class="copyright">© 2024 귀족. All rights reserved.</span>
          <NuxtLink to="/privacy" class="privacy-link">개인정보처리방침</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
  min-height: 100vh;
}

/* Navigation */
.nav-luxury {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px clamp(20px, 5vw, 60px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-luxury.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px clamp(20px, 5vw, 60px);
}

.nav-logo {
  text-decoration: none;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: 0.1em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(250, 250, 250, 0.7);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #fafafa;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}

/* Main */
.main {
  padding-top: 120px;
  padding-bottom: 80px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 16px;
}

.title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 20px;
}

.desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.6);
}

/* Hero Image */
.hero-image {
  margin-bottom: 80px;
  aspect-ratio: 16/9;
  overflow: hidden;
  border: 1px solid rgba(250, 250, 250, 0.1);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Section Title */
.section-title {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  text-align: center;
  margin-bottom: 16px;
}

.section-desc {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  text-align: center;
  margin-bottom: 40px;
}

/* Why Section */
.why-section {
  margin-bottom: 80px;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .why-grid {
    grid-template-columns: 1fr;
  }
}

.why-item {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.why-number {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #c9a227;
  margin-bottom: 16px;
}

.why-item h3 {
  font-size: 18px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.why-item p {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  line-height: 1.5;
}

/* Products */
.products-section {
  margin-bottom: 80px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  padding: 32px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  transition: all 0.3s;
}

.product-card:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.product-header {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
}

.product-title {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 4px;
}

.product-material {
  font-size: 12px;
  color: #c9a227;
}

.product-desc {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  line-height: 1.7;
  margin-bottom: 20px;
}

.product-features {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-features li {
  font-size: 11px;
  color: #c9a227;
  padding: 6px 12px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

/* Zodiac Section */
.zodiac-section {
  margin-bottom: 80px;
}

.zodiac-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
}

@media (max-width: 600px) {
  .zodiac-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.zodiac-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  transition: all 0.3s;
}

.zodiac-card:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.zodiac-emoji {
  font-size: 32px;
  margin-bottom: 12px;
}

.zodiac-year {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 4px;
}

.zodiac-sign {
  font-size: 16px;
  font-weight: 700;
  color: #fafafa;
}

.zodiac-note {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
  text-align: center;
  margin-top: 24px;
}

/* Process */
.process-section {
  margin-bottom: 80px;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .process-grid {
    grid-template-columns: 1fr;
  }
}

.process-step {
  text-align: center;
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

.step-num {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: #c9a227;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.step-title {
  font-size: 16px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
  line-height: 1.5;
}

/* Gallery */
.gallery-section {
  margin-bottom: 80px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
}

@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.gallery-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid rgba(250, 250, 250, 0.1);
  transition: all 0.3s;
}

.gallery-grid img:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.gallery-cta {
  text-align: center;
  margin-top: 32px;
}

.btn-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #c9a227;
  text-decoration: none;
  transition: gap 0.3s;
}

.btn-text:hover {
  gap: 12px;
}

/* CTA */
.cta-section {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.cta-section h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.cta-section p {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 32px;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #fafafa;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.3);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-outline:hover {
  border-color: #c9a227;
  color: #c9a227;
}

/* Location */
.location-info {
  text-align: center;
  padding: 32px;
  border-top: 1px solid rgba(250, 250, 250, 0.06);
}

.location-info h4 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #c9a227;
  margin-bottom: 16px;
}

.location-info .address {
  font-size: 16px;
  color: #fafafa;
  margin-bottom: 8px;
}

.location-info .hours {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
}

/* Footer */
.footer {
  background: #050505;
  padding: 48px clamp(20px, 5vw, 60px);
  border-top: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-brand {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.footer-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-nav a {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-nav a:hover {
  color: #fafafa;
}

.footer-info {
  margin-bottom: 16px;
}

.footer-info span {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
}

.privacy-link {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
  text-decoration: none;
}

.privacy-link:hover {
  color: #fafafa;
}
</style>
