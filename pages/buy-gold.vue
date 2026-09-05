<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { trackPhoneClick } = useGtag()
const handleInlinePhoneClick = () => trackPhoneClick('buy_gold', {
  placement: 'price_info',
  intent: 'sell_gold',
  destination: `tel:${siteConfig.phone}`,
})

definePageMeta({
  layout: 'landing'
})

useHead({
  title: '종로 금매입·은매입 | 당일 시세·순도·중량 확인 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/buy-gold` }
  ],
  meta: [
    { name: 'description', content: '종로 금매입·은매입 상담 안내. 순금(24K)·18K·14K·골드바와 은 제품의 순도·각인·중량을 확인한 뒤 당일 시세를 적용해 금액을 안내하고 당일 지급합니다.' },
    { name: 'keywords', content: '금 매입, 금매입, 은 매입, 귀금속 매입, 금반지 매입, 금목걸이 매입, 골드바 매입, 순금 매입, 18K 매입, 14K 매입, 종로 금 매입, 금은방 매입, 금 시세, 금 팔기' },
    // Open Graph
    { property: 'og:title', content: '종로 금매입·은매입 | 당일 시세·순도·중량 확인 | 귀족' },
    { property: 'og:description', content: '품목·순도·각인·중량을 확인하고 당일 시세를 적용하는 종로 금·은 매입 상담.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/buy-gold` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NN0801.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '종로 금매입·은매입 | 당일 시세·순도·중량 확인 | 귀족' },
    { name: 'twitter:description', content: '품목·순도·각인·중량 확인 후 당일 시세를 적용하는 종로 매입 상담.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NN0801.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '종로 금매입·은매입 | 당일 시세·순도·중량 확인 | 귀족',
        description: '품목과 순도·각인, 중량을 확인한 뒤 당일 시세를 적용하는 금·은 매입 상담 안내 페이지입니다.',
        url: `${siteConfig.url}/buy-gold`,
        mainEntity: {
          '@type': 'Service',
          name: '금·은 귀금속 매입',
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
          areaServed: { '@type': 'City', name: '서울' }
        }
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
        { name: '금·은 매입', path: '/buy-gold' },
      ]))
    }
  ]
})

const highlights = [
  {
    title: '당일 시세 기준',
    description: '순도와 중량을 확인한 뒤 상담 당일의 금 시세를 기준으로 매입 금액을 계산합니다.',
    icon: 'chart'
  },
  {
    title: '확인 후 당일 지급',
    description: '감정 결과와 최종 금액을 확인한 뒤 당일 지급해드립니다.',
    icon: 'cash'
  }
]

const buyItems = [
  { category: '금', items: ['순금(24K)', '18K', '14K', '10K', '골드바', '금괴'] },
  { category: '은', items: ['순은', '실버바', '은화', '은 장신구'] },
  { category: '장신구', items: ['반지', '목걸이', '팔찌', '귀걸이', '브로치'] },
  { category: '기타', items: ['백금', '금니', '금시계', '부서진 귀금속'] },
]

const relatedGuides = [
  {
    to: '/guide/gold-one-don-gram',
    title: '금 1돈·2돈·3돈 무게 환산표',
    description: '1돈 3.75g 기준과 중량 환산 방법',
  },
  {
    to: '/guide/jewelry-hallmark-numbers-meaning',
    title: '585·750·925 각인 뜻',
    description: '14K·18K·은 순도 표기를 읽는 기준',
  },
  {
    to: '/guide/gold-price-how-to-check',
    title: '당일 금 시세 확인 방법',
    description: '고시가와 실제 매입가를 구분하는 기준',
  },
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="buy-header">
          <span class="label">귀금속 매입 상담</span>
          <h1 class="title">종로 금매입·은매입</h1>
          <p class="desc">
            사용하지 않는 귀금속의 순도와 중량을 확인해 매입가를 안내합니다.<br>
            종로3가 금은방 귀족이 30년 경력의 신뢰할 수 있는 거래를 약속드립니다.
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
          <p class="section-desc">품목·순도·상태를 확인한 뒤 매입 가능 여부와 금액을 안내합니다</p>
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
              <h3 class="step-title">품목 확인</h3>
              <p class="step-desc">매입할 귀금속의 종류와 상태를 확인합니다</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">02</span>
              <h3 class="step-title">순도·각인 확인</h3>
              <p class="step-desc">각인과 감정을 통해 순도를 확인합니다</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">03</span>
              <h3 class="step-title">중량 측정</h3>
              <p class="step-desc">확인된 품목의 중량을 측정합니다</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">04</span>
              <h3 class="step-title">당일 시세 적용</h3>
              <p class="step-desc">순도와 중량에 상담 당일 시세를 적용합니다</p>
            </div>
            <div class="step-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div class="step">
              <span class="step-num">05</span>
              <h3 class="step-title">최종 금액 안내</h3>
              <p class="step-desc">실물 확인 결과를 반영해 최종 매입 금액을 안내합니다</p>
            </div>
          </div>
        </div>

        <!-- Gold Price Info -->
        <section class="price-info-section">
          <h2 class="section-title">순금 시세, 이렇게 확인하세요</h2>
          <div class="price-info-body">
            <p>
              금 시세는 국제 금 가격과 환율에 따라 매일, 하루 중에도 여러 번 바뀝니다.
              국내에서는 보통 <strong>1돈(3.75g)</strong> 단위로 시세를 표시하며,
              살 때(소매가)와 팔 때(매입가)의 가격이 다릅니다.
              한국금거래소 등에서 고시하는 당일 기준 시세를 확인한 뒤 방문하시면
              매입가가 적정한지 바로 비교하실 수 있습니다.
            </p>
            <p>
              귀족은 서울 종로3가 금은방 밀집 지역, 종묘귀금속백화점 1층에 있어
              당일 국제 시세를 실시간으로 반영해 매입가를 산정합니다.
              14K·18K는 순도에 따라 금 함량을 계산해 매입하며,
              감정과 계량 과정을 모두 보시는 앞에서 진행합니다.
              방문 전 전화(<a :href="`tel:${siteConfig.phone}`" @click="handleInlinePhoneClick">{{ siteConfig.phone }}</a>)로
              문의하시면 당일 매입 시세를 미리 안내해드립니다.
            </p>
            <NuxtLink to="/guide/gold-price-how-to-check" class="price-info-link">
              금시세 확인 방법 자세히 보기 →
            </NuxtLink>
          </div>
        </section>

        <!-- Notice -->
        <div class="notice-section">
          <h3 class="notice-title">매입 안내</h3>
          <ul class="notice-list">
            <li>매입 시세는 당일 국제 금 시세에 따라 변동됩니다</li>
            <li>순도에 따라 매입가가 달라집니다 (24K, 18K, 14K 등)</li>
            <li>방문 전 전화 문의 시 대략적인 시세 안내 가능합니다</li>
            <li>최종 매입가는 순도·중량·제품 상태를 실물로 확인한 뒤 결정됩니다</li>
          </ul>
        </div>

        <section class="guide-links-section">
          <h2 class="section-title">관련 가이드</h2>
          <p class="section-desc">매입 상담 전 자주 묻는 질문을 정리한 글입니다.</p>
          <div class="guide-links-grid">
            <NuxtLink
              v-for="guide in relatedGuides"
              :key="guide.to"
              :to="guide.to"
              class="guide-link-card"
            >
              <strong>{{ guide.title }}</strong>
              <span>{{ guide.description }}</span>
            </NuxtLink>
          </div>
        </section>

        <ConsultationNextStep path="/buy-gold" />

        <!-- CTA -->
        <LandingCTA
          title="매입 상담 문의"
          description="전화 또는 카카오톡으로 순도·중량 확인 기준을 안내해드립니다."
        />

    <!-- Location Info -->
    <LandingLocation />
  </div>
</template>

<style scoped>
.page {
  background: #0a0a0a;
  color: #fafafa;
  font-family: var(--font-body);
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
  color: rgba(250, 250, 250, 0.65);
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
  color: rgba(250, 250, 250, 0.6);
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
.price-info-section {
  margin-bottom: 80px;
}

.price-info-body {
  max-width: 720px;
  margin: 0 auto;
}

.price-info-body p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(250, 250, 250, 0.75);
  margin-bottom: 20px;
}

.price-info-body strong {
  color: #c9a227;
  font-weight: 700;
}

.price-info-body a {
  color: #c9a227;
}

.price-info-link {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: #c9a227;
  text-decoration: none;
}

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

/* Related Guide */
.guide-links-section {
  margin-bottom: 80px;
}

.guide-links-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}

.guide-link-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  text-decoration: none;
  border: 1px solid rgba(201, 162, 39, 0.3);
  background: rgba(201, 162, 39, 0.05);
  transition: border-color 0.2s, transform 0.2s;
}

.guide-link-card:hover {
  border-color: #c9a227;
  transform: translateY(-2px);
}

.guide-link-card strong {
  font-size: 15px;
  color: #fafafa;
}

.guide-link-card span {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.7);
  line-height: 1.6;
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
  background: linear-gradient(135deg, #d4b44a 0%, #c9a227 50%, #a68820 100%);
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
  color: rgba(250, 250, 250, 0.65);
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
  color: rgba(250, 250, 250, 0.65);
}

.privacy-link {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.65);
  text-decoration: none;
}

.privacy-link:hover {
  color: #fafafa;
}

@media (max-width: 900px) {
  .guide-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
