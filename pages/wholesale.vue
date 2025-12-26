<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: '도매 안내 | 귀족 - 종로 귀금속 도매상',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/wholesale' }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 도매 전문 귀족. 금반지 도매, 결혼예물 도매, 14K 18K 24K 순금 도매. 소량 도매 가능, 대량 주문 할인. 소매상, 온라인 셀러, 기업 납품. 종로3가 귀금속 도매상.' },
    // Open Graph
    { property: 'og:title', content: '도매 안내 | 귀족 - 종로 귀금속 도매상' },
    { property: 'og:description', content: '종로 귀금속 도매 전문. 금반지 도매, 결혼예물 도매. 소량 도매 가능, 대량 주문 할인. 종로3가 귀금속 도매상.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/wholesale' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '도매 안내 | 귀족 - 종로 귀금속 도매상' },
    { name: 'twitter:description', content: '종로 귀금속 도매 전문. 금반지 도매, 결혼예물 도매. 소량 도매 가능. 종로3가 귀금속 도매상.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WholesaleStore',
        name: '귀족',
        description: '종로 귀금속 도매 전문점. 금반지, 목걸이, 귀걸이, 팔찌 도매.',
        telephone: '+82-2-766-4789',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '종로 173 종묘귀금속백화점 101호',
          addressLocality: '종로구',
          addressRegion: '서울',
          addressCountry: 'KR'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00'
          }
        ],
        priceRange: '$$',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer'
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

const highlights = [
  {
    title: '도매가 직거래',
    description: '종로 귀금속 도매상가에서 30년 이상 직접 운영. 중간 마진 없이 최저가로 공급합니다.',
    icon: 'price'
  },
  {
    title: '직접 주문제작',
    description: '자체 세공 기술로 원하시는 디자인을 직접 제작해드립니다. 외주 없이 빠르고 정확하게.',
    icon: 'craft'
  }
]

const products = [
  { category: '반지', items: ['커플링', '결혼반지', '약혼반지', '돌반지', '패션링'] },
  { category: '목걸이', items: ['골드 체인', '펜던트', '진주 목걸이', '초커'] },
  { category: '귀걸이', items: ['스터드', '드롭 이어링', '후프', '진주 귀걸이'] },
  { category: '팔찌', items: ['뱅글', '체인 팔찌', '커프', '테니스 팔찌'] },
  { category: '세트', items: ['웨딩 세트', '예물 세트', '주얼리 세트'] }
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
        <NuxtLink to="/buy-gold" class="nav-link">금 매입</NuxtLink>
        <NuxtLink to="/wholesale" class="nav-link active">도매 안내</NuxtLink>
        <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="wholesale-container">
        <!-- Header -->
        <div class="wholesale-header">
          <span class="label">Wholesale</span>
          <h1 class="title">도매 안내</h1>
          <p class="desc">
            30년 전통 종로 귀금속 도매 전문점 귀족입니다.<br>
            소매상, 온라인 셀러, 기업 납품 모두 환영합니다.
          </p>
        </div>

        <!-- Highlights - 가격과 주문제작 강조 -->
        <div class="highlights-section">
          <div class="highlights-grid">
            <div
              v-for="(highlight, index) in highlights"
              :key="index"
              class="highlight-card"
            >
              <div class="highlight-icon">
                <svg v-if="highlight.icon === 'price'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 class="highlight-title">{{ highlight.title }}</h3>
              <p class="highlight-desc">{{ highlight.description }}</p>
            </div>
          </div>
        </div>

        <!-- Custom Work CTA -->
        <div class="custom-cta">
          <NuxtLink to="/custom" class="custom-link">
            <span class="custom-label">주문제작 안내</span>
            <span class="custom-text">원하시는 디자인으로 직접 제작해드립니다</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <!-- Products -->
        <div class="products-section">
          <h2 class="section-title">취급 품목</h2>
          <p class="section-desc">14K, 18K, 24K 순금 / 화이트골드 / 로즈골드 / 다이아몬드 / 진주</p>
          <div class="products-grid">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="product-card"
            >
              <h3 class="product-category">{{ product.category }}</h3>
              <ul class="product-items">
                <li v-for="(item, i) in product.items" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
          <div class="products-cta">
            <NuxtLink to="/gallery" class="btn-text">
              <span>갤러리에서 제품 보기</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Process -->
        <div class="process-section">
          <h2 class="section-title">거래 절차</h2>
          <div class="process-steps">
            <div class="step">
              <span class="step-num">01</span>
              <h3 class="step-title">전화/방문 상담</h3>
              <p class="step-desc">필요한 품목과 수량을 말씀해주세요</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">02</span>
              <h3 class="step-title">견적 확인</h3>
              <p class="step-desc">수량과 품목에 따른 견적 안내</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">03</span>
              <h3 class="step-title">주문/결제</h3>
              <p class="step-desc">현금, 카드, 계좌이체 가능</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">04</span>
              <h3 class="step-title">납품</h3>
              <p class="step-desc">재고: 당일 / 주문제작: 1-2주</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="wholesale-cta">
          <h3>도매 상담 문의</h3>
          <p>도매 거래에 관심이 있으시면 전화 또는 방문해주세요.</p>
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

        <!-- Location Info -->
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

.wholesale-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* Header */
.wholesale-header {
  text-align: center;
  margin-bottom: 80px;
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

/* Highlights - 가격/주문제작 강조 */
.highlights-section {
  margin-bottom: 60px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 600px) {
  .highlights-grid {
    grid-template-columns: 1fr;
  }
}

.highlight-card {
  padding: 40px 32px;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
  transition: all 0.3s;
}

.highlight-card:hover {
  border-color: rgba(201, 162, 39, 0.4);
  transform: translateY(-4px);
}

.highlight-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  color: #c9a227;
}

.highlight-icon svg {
  width: 100%;
  height: 100%;
}

.highlight-title {
  font-size: 22px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 12px;
}

.highlight-desc {
  font-size: 15px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.7);
  line-height: 1.7;
}

/* Custom Work CTA */
.custom-cta {
  margin-bottom: 80px;
}

.custom-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: rgba(250, 250, 250, 0.03);
  border: 1px solid rgba(250, 250, 250, 0.1);
  text-decoration: none;
  transition: all 0.3s;
}

.custom-link:hover {
  background: rgba(250, 250, 250, 0.05);
  border-color: rgba(201, 162, 39, 0.3);
}

.custom-link:hover svg {
  transform: translateX(4px);
}

.custom-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c9a227;
}

.custom-text {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.7);
}

.custom-link svg {
  color: rgba(250, 250, 250, 0.5);
  transition: transform 0.3s;
}

@media (max-width: 600px) {
  .custom-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .custom-link svg {
    display: none;
  }
}

/* Products */
.products-section {
  margin-bottom: 80px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 500px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.product-card {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

.product-category {
  font-size: 16px;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
}

.product-items {
  list-style: none;
  padding: 0;
}

.product-items li {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 8px;
}

.products-cta {
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

/* Process */
.process-section {
  margin-bottom: 80px;
}

.process-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 140px;
  max-width: 180px;
  text-align: center;
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
  font-size: 15px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.5);
  line-height: 1.5;
}

.step-arrow {
  width: 24px;
  height: 24px;
  color: rgba(250, 250, 250, 0.3);
  margin-top: 24px;
}

.step-arrow svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .step-arrow {
    display: none;
  }

  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .step {
    max-width: 100%;
    padding: 20px;
    background: rgba(250, 250, 250, 0.02);
    border: 1px solid rgba(250, 250, 250, 0.06);
  }
}

/* CTA */
.wholesale-cta {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.wholesale-cta h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.wholesale-cta p {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 32px;
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

/* Location Info */
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
