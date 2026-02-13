<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

definePageMeta({
  layout: 'landing'
})

useHead({
  title: '24K 순금 돌반지 주문제작 | 종로 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/baby-gold` }
  ],
  meta: [
    { name: 'description', content: '순금 돌반지 주문제작 전문 귀족. 24K 순금 돌반지, 백일반지, 아기반지. 띠별 디자인(말띠, 용띠, 뱀띠) 맞춤제작. 이름 각인 가능. 종로3가 금은방 도매가 제공. 돌잔치 선물 추천.' },
    { name: 'keywords', content: '돌반지, 순금 돌반지, 돌반지 주문제작, 백일반지, 아기반지, 돌잔치 반지, 24K 돌반지, 순금 아기반지, 띠별 돌반지, 말띠 돌반지, 용띠 돌반지, 종로 돌반지, 금은방 돌반지' },
    // Open Graph
    { property: 'og:title', content: '24K 순금 돌반지 주문제작 | 종로 | 귀족' },
    { property: 'og:description', content: '24K 순금 돌반지 주문제작. 백일반지, 아기반지, 띠별 디자인 맞춤제작. 종로3가 금은방 도매가.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/baby-gold` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/SB0101.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '24K 순금 돌반지 주문제작 | 종로 | 귀족' },
    { name: 'twitter:description', content: '24K 순금 돌반지 주문제작. 백일반지, 아기반지, 띠별 디자인 맞춤제작.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/SB0101.webp` },
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
            name: siteConfig.name,
            telephone: siteConfig.phoneFormatted,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.region,
              addressCountry: siteConfig.address.country
            }
          }
        },
        image: `${siteConfig.url}/Image/ring/SB0101.webp`
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
        { name: '돌반지', path: '/baby-gold' },
      ]))
    }
  ]
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
          <img src="/Image/ring/SB0101.webp" alt="24K 순금 돌반지 세트 - 돌잔치 선물용 말띠 아기반지" loading="eager" />
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
            <img src="/Image/ring/SB0101.webp" alt="24K 순금 말띠 돌반지 - 돌잔치용 귀금속 선물" loading="lazy" />
            <img src="/Image/ring/SB0102.webp" alt="순금 돌반지 띠별 디자인 - 이름 각인 가능" loading="lazy" />
            <img src="/Image/ring/SB0103.webp" alt="99.9% 순금 아기반지 - 종로 금은방 도매가" loading="lazy" />
            <img src="/Image/ring/SB0104.webp" alt="백일반지 순금 세트 - 백일 선물용 귀금속" loading="lazy" />
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
        <LandingCTA
          title="돌반지 상담"
          description="아이의 첫 돌을 위한 특별한 순금 반지.<br>전화 또는 방문하시면 상세히 안내해드립니다."
        />

    <!-- Location -->
    <LandingLocation />
  </div>
</template>

<style scoped>
/* 페이지 전용 스타일 - 공통 스타일은 layouts/landing.vue에서 관리 */

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

</style>
