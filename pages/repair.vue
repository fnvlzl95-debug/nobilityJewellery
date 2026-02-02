<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useHead({
  title: '귀금속 수리·AS | 반지 사이즈·도금 | 귀족',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/repair' }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 수리 전문 귀족. 반지 사이즈 조절, 목걸이 체인 수리, 귀걸이 침 교체, 금 세척·광택. 30년 경력 장인이 직접 수리. 종로3가 금은방.' },
    { name: 'keywords', content: '금반지 수리, 귀금속 AS, 사이즈 조절, 광택, 도금, 종로 귀금속 수리, 체인 수리, 금 세척' },
    // Open Graph
    { property: 'og:title', content: '귀금속 수리·AS | 반지 사이즈·도금 | 귀족' },
    { property: 'og:description', content: '종로 귀금속 수리 전문. 반지 사이즈 조절, 체인 수리, 금 세척·광택. 종로3가 금은방 귀족.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/repair' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '귀금속 수리·AS | 반지 사이즈·도금 | 귀족' },
    { name: 'twitter:description', content: '종로 귀금속 수리 전문. 반지 사이즈 조절, 체인 수리, 금 세척·광택. 종로3가 금은방 귀족.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '귀금속 수리 서비스',
        description: '반지 사이즈 조절, 목걸이 체인 수리, 귀걸이 침 교체, 금 세척 및 광택 작업',
        provider: {
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
        },
        areaServed: {
          '@type': 'City',
          name: '서울'
        }
      })
    }
  ]
})

const repairServices = [
  {
    title: '반지 사이즈 조절',
    description: '반지가 헐겁거나 꽉 끼시나요? 14K, 18K 골드 반지의 사이즈 늘리기, 줄이기 모두 가능합니다.',
    details: ['사이즈 늘리기 (최대 2호)', '사이즈 줄이기', '당일 작업 가능 (상태에 따라)'],
    icon: 'ring'
  },
  {
    title: '체인 수리',
    description: '끊어진 목걸이, 팔찌 체인을 원래대로 복원해드립니다. 다양한 체인 종류 수리 가능.',
    details: ['목걸이 체인 땜', '팔찌 체인 땜', '잠금장치 교체'],
    icon: 'chain'
  },
  {
    title: '세척 및 광택',
    description: '오래된 귀금속의 광택을 되살려드립니다. 금, 은 모두 세척 가능.',
    details: ['초음파 세척', '광택 복원', '로듐 도금 (화이트골드)'],
    icon: 'polish'
  },
  {
    title: '귀걸이 수리',
    description: '귀걸이 침 교체, 잠금장치 수리 등 다양한 귀걸이 수리 서비스.',
    details: ['침 교체 (피어싱/클립)', '잠금장치 수리', '큐빅/보석 재세팅'],
    icon: 'earring'
  },
  {
    title: '보석 세팅',
    description: '빠진 보석 재세팅, 보석 교체 등 세팅 관련 수리.',
    details: ['빠진 보석 재세팅', '보석 교체', '발 수리'],
    icon: 'gem'
  },
  {
    title: '기타 수리',
    description: '위에 없는 수리도 상담 가능합니다. 먼저 전화로 문의해주세요.',
    details: ['각인 추가/수정', '디자인 변경', '리폼/리세팅'],
    icon: 'tool'
  }
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="repair-header">
          <span class="label">Repair & Service</span>
          <h1 class="title">수리/AS 안내</h1>
          <p class="desc">
            30년 경력의 장인이 직접 수리합니다.<br>
            반지 사이즈 조절부터 체인 수리까지, 모든 귀금속 수리가 가능합니다.
          </p>
        </div>

        <!-- Notice -->
        <div class="repair-notice">
          <div class="notice-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div class="notice-content">
            <p><strong>수리 전 안내</strong></p>
            <p>수리 내용에 따라 소요 시간과 비용이 다를 수 있습니다.<br>방문 전 전화 상담을 권장합니다.</p>
            <a href="tel:02-766-4789" class="notice-phone">02-766-4789</a>
          </div>
        </div>

        <!-- Services Grid -->
        <div class="services-grid">
          <div
            v-for="(service, index) in repairServices"
            :key="index"
            class="service-card"
          >
            <div class="service-header">
              <div class="service-icon">
                <svg v-if="service.icon === 'ring'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="9"/>
                  <circle cx="12" cy="12" r="5"/>
                </svg>
                <svg v-else-if="service.icon === 'chain'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <svg v-else-if="service.icon === 'polish'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <svg v-else-if="service.icon === 'earring'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="10" r="6"/>
                  <path d="M12 16v6"/>
                  <circle cx="12" cy="10" r="2"/>
                </svg>
                <svg v-else-if="service.icon === 'gem'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M6 3h12l4 6-10 13L2 9z"/>
                  <path d="M2 9h20M12 22V9M6 3l6 6 6-6"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
            </div>
            <p class="service-desc">{{ service.description }}</p>
            <ul class="service-details">
              <li v-for="(detail, i) in service.details" :key="i">{{ detail }}</li>
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <LandingCTA
          title="수리 문의하기"
          description="수리가 필요하신 제품이 있으시면 전화 또는 방문해주세요."
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

.repair-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* Header */
.repair-header {
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

/* Notice */
.repair-notice {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: rgba(201, 162, 39, 0.08);
  border: 1px solid rgba(201, 162, 39, 0.2);
  margin-bottom: 60px;
}

.notice-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  color: #c9a227;
}

.notice-icon svg {
  width: 100%;
  height: 100%;
}

.notice-content p {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.7;
  margin-bottom: 8px;
}

.notice-content strong {
  color: #c9a227;
}

.notice-phone {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #c9a227;
  text-decoration: none;
  margin-top: 8px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

.service-card {
  padding: 32px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  transition: all 0.3s;
}

.service-card:hover {
  background: rgba(250, 250, 250, 0.04);
  border-color: rgba(201, 162, 39, 0.3);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.service-icon {
  width: 40px;
  height: 40px;
  color: #c9a227;
}

.service-icon svg {
  width: 100%;
  height: 100%;
}

.service-title {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
}

.service-desc {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 16px;
}

.service-details {
  list-style: none;
  padding: 0;
}

.service-details li {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 8px;
}

.service-details li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  background: #c9a227;
  border-radius: 50%;
}

/* CTA */
.repair-cta {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.repair-cta h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.repair-cta p {
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
