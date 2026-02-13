<script setup lang="ts">
import { siteConfig } from '~/config/site'

definePageMeta({
  layout: 'landing'
})

useHead({
  title: '귀금속 주문제작 | 반지·목걸이·팔찌 | 귀족',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/custom' }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 주문제작 전문 귀족. 커플링 주문제작, 돌반지 맞춤제작, 결혼반지 맞춤, 금반지 주문제작. 30년 경력 장인이 직접 세공. 디자인 상담부터 제작까지. 종로3가 금은방.' },
    { name: 'keywords', content: '금반지 주문제작, 맞춤 반지, 이니셜 각인, 14K 주문제작, 18K 주문제작, 종로 주문제작, 커플링 맞춤' },
    // Open Graph
    { property: 'og:title', content: '귀금속 주문제작 | 반지·목걸이·팔찌 | 귀족' },
    { property: 'og:description', content: '종로 귀금속 주문제작 전문. 커플링, 돌반지, 결혼반지 맞춤제작. 30년 경력 장인 직접 세공.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/custom' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '귀금속 주문제작 | 반지·목걸이·팔찌 | 귀족' },
    { name: 'twitter:description', content: '종로 귀금속 주문제작 전문. 커플링, 돌반지, 결혼반지 맞춤제작.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '귀금속 주문제작',
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
        serviceType: '귀금속 맞춤제작',
        description: '커플링, 돌반지, 결혼반지, 예물 등 귀금속 주문제작. 30년 경력 장인이 직접 세공합니다.',
        areaServed: {
          '@type': 'Country',
          name: 'South Korea'
        }
      })
    }
  ]
})

const customTypes = [
  {
    title: '커플링 주문제작',
    description: '두 분만의 특별한 커플링을 제작합니다. 이니셜 각인, 특별한 날짜, 원하시는 디자인으로 세상에 하나뿐인 반지를 만들어드립니다.',
    items: ['이니셜 각인', '날짜 각인', '디자인 맞춤', '사이즈 정밀 조절']
  },
  {
    title: '돌반지 주문제작',
    description: '아이의 첫 돌을 축하하는 순금 돌반지를 맞춤 제작합니다. 띠별 디자인, 이름 각인 등 정성을 담아 제작합니다.',
    items: ['24K 순금', '띠별 디자인', '이름 각인', '크기 맞춤']
  },
  {
    title: '결혼예물 맞춤',
    description: '결혼을 준비하시는 분들을 위한 예물 세트를 맞춤 제작합니다. 반지, 목걸이, 귀걸이 세트를 일관된 디자인으로.',
    items: ['반지 + 목걸이 + 귀걸이', '디자인 통일', '소재 선택', '예산 맞춤']
  },
  {
    title: '리폼/리디자인',
    description: '오래된 금제품을 새로운 디자인으로 다시 태어나게 합니다. 기존 금을 녹여 새로운 주얼리로 제작해드립니다.',
    items: ['기존 금 활용', '새 디자인 적용', '크기 변경', '스타일 현대화']
  }
]

const process = [
  { num: '01', title: '상담', desc: '원하시는 디자인과 예산을 말씀해주세요' },
  { num: '02', title: '디자인 확정', desc: '샘플 확인 후 세부 사항 결정' },
  { num: '03', title: '제작', desc: '30년 경력 장인이 직접 세공' },
  { num: '04', title: '완성', desc: '품질 검수 후 전달 (1-2주 소요)' }
]

const advantages = [
  { title: '직접 세공', desc: '외주 없이 매장에서 직접 제작합니다' },
  { title: '30년 경력', desc: '종로 귀금속 상가에서 쌓은 기술력' },
  { title: '합리적 가격', desc: '도매가로 주문제작을 진행합니다' },
  { title: '품질 보증', desc: '모든 제품 품질보증서 제공' }
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="custom-header">
          <span class="label">Custom Made</span>
          <h1 class="title">주문제작</h1>
          <p class="desc">
            원하시는 디자인을 말씀해주세요.<br>
            30년 경력의 장인이 직접 세공하여 제작해드립니다.
          </p>
        </div>

        <!-- Advantages -->
        <div class="advantages-section">
          <div class="advantages-grid">
            <div
              v-for="(adv, index) in advantages"
              :key="index"
              class="advantage-item"
            >
              <h3 class="advantage-title">{{ adv.title }}</h3>
              <p class="advantage-desc">{{ adv.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Custom Types -->
        <div class="types-section">
          <h2 class="section-title">주문제작 종류</h2>
          <div class="types-grid">
            <div
              v-for="(type, index) in customTypes"
              :key="index"
              class="type-card"
            >
              <h3 class="type-title">{{ type.title }}</h3>
              <p class="type-desc">{{ type.description }}</p>
              <ul class="type-items">
                <li v-for="(item, i) in type.items" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Process -->
        <div class="process-section">
          <h2 class="section-title">제작 과정</h2>
          <div class="process-steps">
            <div
              v-for="(step, index) in process"
              :key="index"
              class="step"
            >
              <span class="step-num">{{ step.num }}</span>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <div class="materials-section">
          <h2 class="section-title">사용 소재</h2>
          <div class="materials-list">
            <div class="material">
              <span class="material-name">24K 순금</span>
              <span class="material-desc">순도 99.9% 순금. 돌반지, 뱅글에 적합</span>
            </div>
            <div class="material">
              <span class="material-name">18K 골드</span>
              <span class="material-desc">순도 75%. 내구성이 좋아 일상 착용에 적합</span>
            </div>
            <div class="material">
              <span class="material-name">14K 골드</span>
              <span class="material-desc">순도 58.5%. 합리적인 가격의 골드 주얼리</span>
            </div>
            <div class="material">
              <span class="material-name">화이트골드</span>
              <span class="material-desc">은빛 광택. 다이아몬드와 잘 어울림</span>
            </div>
            <div class="material">
              <span class="material-name">로즈골드</span>
              <span class="material-desc">핑크빛 골드. 여성스러운 느낌</span>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div class="gallery-section">
          <h2 class="section-title">주문제작 갤러리</h2>
          <div class="gallery-grid">
            <img src="/Image/ring/NS0102.webp" alt="14K 다이아몬드 솔리테어 반지 - 주문제작 가능" loading="lazy" />
            <img src="/Image/ring/NN0103.webp" alt="14K 골드 커플링 주문제작 - 이니셜 각인 가능" loading="lazy" />
            <img src="/Image/ring/SB0101.webp" alt="24K 순금 돌반지 주문제작 - 띠별 디자인" loading="lazy" />
            <img src="/Image/ring/NN0101.webp" alt="14K 화이트골드 맞춤 반지 - 사이즈 조절 가능" loading="lazy" />
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
          title="주문제작 상담"
          description="원하시는 디자인이 있으시면 전화 또는 방문해주세요.<br>상담 후 견적을 안내해드립니다."
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

.custom-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* Header */
.custom-header {
  text-align: center;
  margin-bottom: 60px;
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
  margin-bottom: 40px;
}

/* Advantages */
.advantages-section {
  margin-bottom: 80px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 800px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}

.advantage-item {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.advantage-title {
  font-size: 18px;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 8px;
}

.advantage-desc {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  line-height: 1.5;
}

/* Types */
.types-section {
  margin-bottom: 80px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 700px) {
  .types-grid {
    grid-template-columns: 1fr;
  }
}

.type-card {
  padding: 32px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  transition: all 0.3s;
}

.type-card:hover {
  background: rgba(250, 250, 250, 0.04);
  border-color: rgba(201, 162, 39, 0.3);
}

.type-title {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 12px;
}

.type-desc {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  line-height: 1.7;
  margin-bottom: 20px;
}

.type-items {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-items li {
  font-size: 12px;
  color: #c9a227;
  padding: 6px 12px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

/* Process */
.process-section {
  margin-bottom: 80px;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 800px) {
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .process-steps {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    max-width: 320px;
    margin: 0 auto;
  }

  .step {
    position: relative;
    text-align: left;
    padding: 24px 24px 24px 56px;
    background: transparent;
    border: none;
    border-left: 2px solid rgba(201, 162, 39, 0.3);
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

.step {
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
  font-size: clamp(12px, 2.5vw, 14px);
  color: rgba(250, 250, 250, 0.5);
  line-height: 1.6;
}

/* Materials */
.materials-section {
  margin-bottom: 80px;
}

.materials-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.material {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

@media (max-width: 600px) {
  .material {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.material-name {
  font-size: 16px;
  font-weight: 700;
  color: #c9a227;
}

.material-desc {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
}

/* Gallery */
.gallery-section {
  margin-bottom: 80px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
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
.custom-cta {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.custom-cta h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.custom-cta p {
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
