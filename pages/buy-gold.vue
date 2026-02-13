<script setup lang="ts">
import { siteConfig } from '~/config/site'

definePageMeta({
  layout: 'landing'
})

useHead({
  title: '금·은 매입 | 종로 고가매입 상담 | 귀족',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/buy-gold' }
  ],
  meta: [
    { name: 'description', content: '종로 금 매입 전문 귀족. 금반지, 금목걸이, 금팔찌, 골드바, 순금, 18K, 14K 매입. 은 매입, 백금 매입. 당일 현금 지급. 정확한 시세 적용, 투명한 거래. 종로3가 금은방.' },
    { name: 'keywords', content: '금 매입, 금매입, 은 매입, 귀금속 매입, 금반지 매입, 금목걸이 매입, 골드바 매입, 순금 매입, 18K 매입, 14K 매입, 종로 금 매입, 금은방 매입, 금 시세, 금 팔기' },
    // Open Graph
    { property: 'og:title', content: '금·은 매입 | 종로 고가매입 상담 | 귀족' },
    { property: 'og:description', content: '종로 금 매입 전문. 금반지, 금목걸이, 골드바, 순금, 18K, 14K 매입. 당일 현금 지급. 종로3가 금은방.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/buy-gold' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '금·은 매입 | 종로 고가매입 상담 | 귀족' },
    { name: 'twitter:description', content: '종로 금 매입 전문. 금반지, 금목걸이, 골드바 매입. 당일 현금 지급.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '금·은 귀금속 매입',
        description: '금반지, 금목걸이, 금팔찌, 골드바, 순금, 18K, 14K, 은 귀금속 매입 서비스',
        provider: {
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          telephone: siteConfig.phoneFormatted,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country
          }
        },
        areaServed: {
          '@type': 'City',
          name: '서울'
        }
      })
    }
  ]
})

const highlights = [
  {
    title: '정확한 시세 적용',
    description: '당일 국제 금 시세를 기준으로 정확하게 계산합니다. 투명한 거래를 약속드립니다.',
    icon: 'chart'
  },
  {
    title: '당일 현금 지급',
    description: '감정 후 바로 현금으로 지급해드립니다.',
    icon: 'cash'
  }
]

const buyItems = [
  { category: '금 (Gold)', items: ['순금 (24K)', '18K', '14K', '10K', '골드바', '금괴'] },
  { category: '은 (Silver)', items: ['순은', '실버바', '은화', '은 장신구'] },
  { category: '장신구', items: ['반지', '목걸이', '팔찌', '귀걸이', '브로치'] },
  { category: '기타', items: ['백금', '금니', '금시계', '부서진 귀금속'] },
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="buy-header">
          <span class="label">Gold & Silver</span>
          <h1 class="title">금·은 매입</h1>
          <p class="desc">
            사용하지 않는 귀금속, 정당한 가격으로 매입합니다.<br>
            30년 경력의 신뢰할 수 있는 거래를 약속드립니다.
          </p>
        </div>

        <!-- Highlights -->
        <div class="highlights-section">
          <div class="highlights-grid">
            <div
              v-for="(highlight, index) in highlights"
              :key="index"
              class="highlight-card"
            >
              <div class="highlight-icon">
                <svg v-if="highlight.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18 17V9"/>
                  <path d="M13 17V5"/>
                  <path d="M8 17v-3"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <h3 class="highlight-title">{{ highlight.title }}</h3>
              <p class="highlight-desc">{{ highlight.description }}</p>
            </div>
          </div>
        </div>

        <!-- Buy Items -->
        <div class="items-section">
          <h2 class="section-title">매입 품목</h2>
          <p class="section-desc">상태와 관계없이 모든 귀금속 매입 가능</p>
          <div class="items-grid">
            <div
              v-for="(item, index) in buyItems"
              :key="index"
              class="item-card"
            >
              <h3 class="item-category">{{ item.category }}</h3>
              <ul class="item-list">
                <li v-for="(subItem, i) in item.items" :key="i">{{ subItem }}</li>
              </ul>
            </div>
          </div>
          <p class="items-note">
            * 부서지거나 변형된 귀금속도 매입 가능합니다.
          </p>
        </div>

        <!-- Process -->
        <div class="process-section">
          <h2 class="section-title">매입 절차</h2>
          <div class="process-steps">
            <div class="step">
              <span class="step-num">01</span>
              <h3 class="step-title">방문 / 상담</h3>
              <p class="step-desc">매입 희망 품목을 가지고 방문해주세요</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">02</span>
              <h3 class="step-title">감정 / 계량</h3>
              <p class="step-desc">순도 확인 및 정밀 계량</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">03</span>
              <h3 class="step-title">시세 적용</h3>
              <p class="step-desc">당일 시세 기준 가격 산정</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">04</span>
              <h3 class="step-title">즉시 지급</h3>
              <p class="step-desc">현금 즉시 지급</p>
            </div>
          </div>
        </div>

        <!-- Notice -->
        <div class="notice-section">
          <h3 class="notice-title">매입 안내</h3>
          <ul class="notice-list">
            <li>매입 시세는 당일 국제 금 시세에 따라 변동됩니다</li>
            <li>순도에 따라 매입가가 달라집니다 (24K, 18K, 14K 등)</li>
            <li>방문 전 전화 문의 시 대략적인 시세 안내 가능합니다</li>
          </ul>
        </div>

        <!-- CTA -->
        <LandingCTA
          title="매입 상담 문의"
          description="전화 또는 방문해주시면 친절히 안내해드립니다."
        />

    <!-- Location Info -->
    <LandingLocation />
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

.buy-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* Header */
.buy-header {
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

/* Highlights */
.highlights-section {
  margin-bottom: 80px;
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

/* Items */
.items-section {
  margin-bottom: 80px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .items-grid {
    grid-template-columns: 1fr;
  }
}

.item-card {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

.item-category {
  font-size: 16px;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
}

.item-list {
  list-style: none;
  padding: 0;
}

.item-list li {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 8px;
}

.items-note {
  text-align: center;
  font-size: 13px;
  color: rgba(250, 250, 250, 0.4);
  margin-top: 24px;
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
  font-size: clamp(12px, 2.5vw, 14px);
  color: rgba(250, 250, 250, 0.5);
  line-height: 1.6;
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
    align-items: stretch;
    gap: 0;
    max-width: 320px;
    margin: 40px auto 0;
  }

  .step {
    position: relative;
    max-width: 100%;
    padding: 24px 24px 24px 56px;
    background: transparent;
    border: none;
    border-left: 2px solid rgba(201, 162, 39, 0.3);
    text-align: left;
  }

  .step:last-child {
    border-left-color: transparent;
  }

  .step::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 28px;
    width: 12px;
    height: 12px;
    background: #c9a227;
    border-radius: 50%;
  }

  .step-num {
    position: absolute;
    left: 20px;
    top: 24px;
  }

  .step-title {
    margin-bottom: 6px;
  }
}

/* Notice */
.notice-section {
  margin-bottom: 80px;
  padding: 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

.notice-title {
  font-size: 18px;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 20px;
}

.notice-list {
  list-style: none;
  padding: 0;
}

.notice-list li {
  position: relative;
  font-size: 14px;
  color: rgba(250, 250, 250, 0.7);
  padding-left: 20px;
  margin-bottom: 12px;
  line-height: 1.6;
}

.notice-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #c9a227;
}

/* CTA */
.buy-cta {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.buy-cta h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.buy-cta p {
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
  padding: 16px 32px;
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
  transform: translateY(-2px);
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
