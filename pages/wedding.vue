<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useHead({
  title: '결혼예물 | 예물 세트 주문제작 - 귀족 종로 금은방',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/wedding' }
  ],
  meta: [
    { name: 'description', content: '결혼예물 주문제작 전문 귀족. 결혼반지, 예물 세트, 시댁예물, 처가예물. 18K 골드, 다이아몬드 예물. 30년 장인 직접 세공. 종로3가 금은방 도매가. 신부예물, 신랑예물 맞춤 구성.' },
    { name: 'keywords', content: '결혼예물, 예물 세트, 결혼반지, 시댁예물, 처가예물, 신부예물, 신랑예물, 18K 예물, 다이아몬드 예물, 종로 예물, 금은방 예물, 예물 도매, 웨딩 주얼리' },
    // Open Graph
    { property: 'og:title', content: '결혼예물 | 예물 세트 주문제작 - 귀족 종로 금은방' },
    { property: 'og:description', content: '결혼예물 주문제작. 예물 세트, 시댁예물, 처가예물. 30년 장인 직접 세공. 종로 도매가.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/wedding' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/set/set0101.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '결혼예물 | 예물 세트 주문제작 - 귀족' },
    { name: 'twitter:description', content: '결혼예물 주문제작. 예물 세트, 시댁예물, 처가예물. 30년 장인 직접 세공.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/set/set0101.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: '결혼예물',
        description: '결혼예물 세트, 결혼반지, 시댁예물, 처가예물 주문제작. 18K 골드, 다이아몬드.',
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
        image: 'https://noblessegold.com/Image/set/set0101.webp'
      })
    }
  ]
})

const giftSets = [
  {
    title: '신부 예물 세트',
    description: '신부를 위한 예물 세트. 결혼반지, 목걸이, 귀걸이를 일관된 디자인으로 맞춤 제작합니다.',
    items: ['결혼반지', '목걸이', '귀걸이'],
    materials: ['18K 골드', '다이아몬드', '진주']
  },
  {
    title: '신랑 예물 세트',
    description: '신랑을 위한 예물 세트. 결혼반지, 커프스, 타이핀 등을 세트로 구성합니다.',
    items: ['결혼반지', '커프스', '타이핀'],
    materials: ['18K 골드', '화이트골드']
  },
  {
    title: '시댁/처가 예물',
    description: '양가 어르신께 드리는 예물. 어머니 반지, 목걸이, 아버지 반지 등을 맞춤 제작합니다.',
    items: ['어머니 반지', '어머니 목걸이', '아버지 반지'],
    materials: ['18K 골드', '24K 순금']
  }
]

const advantages = [
  { title: '맞춤 구성', desc: '예산과 스타일에 맞게 세트 구성' },
  { title: '직접 제작', desc: '30년 경력 장인이 직접 세공' },
  { title: '도매가', desc: '종로 도매상가 가격으로 합리적 구매' },
  { title: '품질보증', desc: '모든 제품 품질보증서 제공' }
]

const materials = [
  { name: '18K 골드', purity: '순도 75%', desc: '내구성 우수, 결혼예물 추천' },
  { name: '화이트골드', purity: '18K', desc: '은빛 광택, 다이아와 조화' },
  { name: '다이아몬드', purity: 'GIA 인증', desc: '4C 기준 품질 보장' },
  { name: '24K 순금', purity: '99.9%', desc: '전통 예물, 어르신 선물' }
]

const processSteps = [
  { num: '01', title: '상담', desc: '예산, 스타일, 세트 구성 상담' },
  { num: '02', title: '디자인 확정', desc: '샘플 확인 후 세부사항 결정' },
  { num: '03', title: '제작', desc: '장인이 직접 세공 (2-3주)' },
  { num: '04', title: '전달', desc: '품질 검수 후 케이스와 함께 전달' }
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="page-header">
          <span class="label">Wedding Gifts</span>
          <h1 class="title">결혼예물</h1>
          <p class="desc">
            결혼을 준비하는 두 분을 위한 특별한 예물.<br>
            예산과 스타일에 맞게 맞춤 구성해드립니다.
          </p>
        </div>

        <!-- Hero Image -->
        <div class="hero-image">
          <img src="/Image/set/set0101.webp" alt="결혼예물 세트 - 웨딩 주얼리" loading="eager" />
        </div>

        <!-- Advantages -->
        <div class="advantages-section">
          <div class="advantages-grid">
            <div
              v-for="(adv, index) in advantages"
              :key="index"
              class="advantage-item"
            >
              <h3>{{ adv.title }}</h3>
              <p>{{ adv.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Gift Sets -->
        <div class="sets-section">
          <h2 class="section-title">예물 구성</h2>
          <div class="sets-grid">
            <div
              v-for="(set, index) in giftSets"
              :key="index"
              class="set-card"
            >
              <h3 class="set-title">{{ set.title }}</h3>
              <p class="set-desc">{{ set.description }}</p>
              <div class="set-details">
                <div class="set-items">
                  <span class="detail-label">구성품</span>
                  <ul>
                    <li v-for="(item, i) in set.items" :key="i">{{ item }}</li>
                  </ul>
                </div>
                <div class="set-materials">
                  <span class="detail-label">소재</span>
                  <ul>
                    <li v-for="(mat, i) in set.materials" :key="i">{{ mat }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <div class="materials-section">
          <h2 class="section-title">사용 소재</h2>
          <div class="materials-grid">
            <div
              v-for="(mat, index) in materials"
              :key="index"
              class="material-card"
            >
              <h3 class="material-name">{{ mat.name }}</h3>
              <span class="material-purity">{{ mat.purity }}</span>
              <p class="material-desc">{{ mat.desc }}</p>
            </div>
          </div>
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

        <!-- Checklist -->
        <div class="checklist-section">
          <h2 class="section-title">예물 준비 체크리스트</h2>
          <div class="checklist-content">
            <div class="checklist-item">
              <span class="check-icon">1</span>
              <div class="check-text">
                <h3>예산 설정</h3>
                <p>신부/신랑 예물, 시댁/처가 예물 예산 분배</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">2</span>
              <div class="check-text">
                <h3>스타일 결정</h3>
                <p>클래식, 모던, 심플 등 선호 스타일 파악</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">3</span>
              <div class="check-text">
                <h3>사이즈 측정</h3>
                <p>본인과 양가 어르신 사이즈 미리 확인</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">4</span>
              <div class="check-text">
                <h3>일정 확인</h3>
                <p>결혼식 2-3개월 전 주문 권장</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div class="gallery-section">
          <h2 class="section-title">제품 갤러리</h2>
          <div class="gallery-grid">
            <img src="/Image/set/set0101.webp" alt="결혼예물 세트" loading="lazy" />
            <img src="/Image/set/set0102.webp" alt="신부 예물" loading="lazy" />
            <img src="/Image/set/set0201.webp" alt="웨딩 주얼리" loading="lazy" />
            <img src="/Image/set/set0202.webp" alt="예물 반지" loading="lazy" />
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

        <!-- Related -->
        <div class="related-section">
          <h2 class="section-title">함께 보기</h2>
          <div class="related-grid">
            <NuxtLink to="/couple-ring" class="related-card">
              <span class="related-label">Couple Ring</span>
              <h3>커플링</h3>
              <p>이니셜 각인, 기념일 커플링</p>
            </NuxtLink>
            <NuxtLink to="/custom" class="related-card">
              <span class="related-label">Custom Made</span>
              <h3>주문제작</h3>
              <p>원하는 디자인으로 맞춤 제작</p>
            </NuxtLink>
          </div>
        </div>

        <!-- CTA -->
        <LandingCTA
          title="예물 상담"
          description="결혼을 준비하시는 두 분을 위한 맞춤 예물 상담.<br>전화 또는 방문하시면 상세히 안내해드립니다."
        />

    <!-- Location -->
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

.nav-logo { text-decoration: none; }
.logo-text { font-size: 24px; font-weight: 700; color: #fafafa; letter-spacing: 0.1em; }
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-link { font-size: 13px; font-weight: 700; letter-spacing: 0.05em; color: rgba(250, 250, 250, 0.7); text-decoration: none; transition: color 0.3s; }
.nav-link:hover, .nav-link.active { color: #fafafa; }
@media (max-width: 768px) { .nav-links { display: none; } }

/* Main */
.main { padding-top: 120px; padding-bottom: 80px; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 60px); }

/* Header */
.page-header { text-align: center; margin-bottom: 48px; }
.label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a227; margin-bottom: 16px; }
.title { font-size: clamp(32px, 5vw, 48px); font-weight: 300; color: #fafafa; margin-bottom: 20px; }
.desc { font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(250, 250, 250, 0.6); }

/* Hero Image */
.hero-image { margin-bottom: 80px; aspect-ratio: 16/9; overflow: hidden; border: 1px solid rgba(250, 250, 250, 0.1); }
.hero-image img { width: 100%; height: 100%; object-fit: cover; }

/* Section Title */
.section-title { font-size: 24px; font-weight: 300; color: #fafafa; text-align: center; margin-bottom: 40px; }

/* Advantages */
.advantages-section { margin-bottom: 80px; }
.advantages-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
@media (max-width: 800px) { .advantages-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .advantages-grid { grid-template-columns: 1fr; } }
.advantage-item { text-align: center; padding: 32px 20px; background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%); border: 1px solid rgba(201, 162, 39, 0.2); }
.advantage-item h3 { font-size: 18px; font-weight: 700; color: #c9a227; margin-bottom: 8px; }
.advantage-item p { font-size: 13px; color: rgba(250, 250, 250, 0.6); line-height: 1.5; }

/* Gift Sets */
.sets-section { margin-bottom: 80px; }
.sets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 800px) { .sets-grid { grid-template-columns: 1fr; } }
.set-card { padding: 32px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); transition: all 0.3s; }
.set-card:hover { border-color: rgba(201, 162, 39, 0.3); }
.set-title { font-size: 20px; font-weight: 700; color: #fafafa; margin-bottom: 12px; }
.set-desc { font-size: 14px; color: rgba(250, 250, 250, 0.6); line-height: 1.7; margin-bottom: 24px; }
.set-details { display: flex; gap: 24px; }
@media (max-width: 500px) { .set-details { flex-direction: column; gap: 16px; } }
.set-items, .set-materials { flex: 1; }
.detail-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #c9a227; display: block; margin-bottom: 8px; }
.set-details ul { list-style: none; padding: 0; }
.set-details li { font-size: 13px; color: rgba(250, 250, 250, 0.5); margin-bottom: 4px; }

/* Materials */
.materials-section { margin-bottom: 80px; }
.materials-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 800px) { .materials-grid { grid-template-columns: repeat(2, 1fr); } }
.material-card { padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); text-align: center; }
.material-name { font-size: 16px; font-weight: 700; color: #fafafa; margin-bottom: 4px; }
.material-purity { font-size: 12px; color: #c9a227; display: block; margin-bottom: 12px; }
.material-desc { font-size: 13px; color: rgba(250, 250, 250, 0.5); line-height: 1.5; }

/* Process */
.process-section { margin-bottom: 80px; }
.process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
@media (max-width: 800px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .process-grid { grid-template-columns: 1fr; } }
.process-step { text-align: center; padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); }
.step-num { display: inline-block; font-size: 12px; font-weight: 700; color: #c9a227; letter-spacing: 0.1em; margin-bottom: 12px; }
.step-title { font-size: 16px; font-weight: 700; color: #fafafa; margin-bottom: 8px; }
.step-desc { font-size: 13px; color: rgba(250, 250, 250, 0.5); line-height: 1.5; }

/* Checklist */
.checklist-section { margin-bottom: 80px; }
.checklist-content { max-width: 600px; margin: 0 auto; }
.checklist-item { display: flex; gap: 20px; padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); margin-bottom: 12px; }
.check-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(201, 162, 39, 0.15); color: #c9a227; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.check-text h3 { font-size: 16px; font-weight: 700; color: #fafafa; margin-bottom: 4px; }
.check-text p { font-size: 13px; color: rgba(250, 250, 250, 0.5); }

/* Gallery */
.gallery-section { margin-bottom: 80px; }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 600px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
.gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 1px solid rgba(250, 250, 250, 0.1); transition: all 0.3s; }
.gallery-grid img:hover { border-color: rgba(201, 162, 39, 0.3); }
.gallery-cta { text-align: center; margin-top: 32px; }
.btn-text { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #c9a227; text-decoration: none; transition: gap 0.3s; }
.btn-text:hover { gap: 12px; }

/* Related */
.related-section { margin-bottom: 80px; }
.related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (max-width: 600px) { .related-grid { grid-template-columns: 1fr; } }
.related-card { padding: 32px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); text-decoration: none; transition: all 0.3s; }
.related-card:hover { border-color: rgba(201, 162, 39, 0.3); }
.related-label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a227; display: block; margin-bottom: 8px; }
.related-card h3 { font-size: 20px; font-weight: 700; color: #fafafa; margin-bottom: 8px; }
.related-card p { font-size: 14px; color: rgba(250, 250, 250, 0.5); }

/* CTA */
.cta-section { text-align: center; padding: 60px 40px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); margin-bottom: 40px; }
.cta-section h3 { font-size: 24px; font-weight: 300; color: #fafafa; margin-bottom: 12px; }
.cta-section p { font-size: 14px; color: rgba(250, 250, 250, 0.6); margin-bottom: 32px; line-height: 1.7; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-gold { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; font-size: 14px; font-weight: 700; color: #0a0a0a; background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%); text-decoration: none; transition: all 0.3s; }
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3); }
.btn-outline { display: inline-flex; align-items: center; gap: 10px; padding: 15px 32px; font-size: 14px; font-weight: 700; color: #fafafa; background: transparent; border: 1px solid rgba(250, 250, 250, 0.3); text-decoration: none; transition: all 0.3s; }
.btn-outline:hover { border-color: #c9a227; color: #c9a227; }

/* Location */
.location-info { text-align: center; padding: 32px; border-top: 1px solid rgba(250, 250, 250, 0.06); }
.location-info h4 { font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #c9a227; margin-bottom: 16px; }
.location-info .address { font-size: 16px; color: #fafafa; margin-bottom: 8px; }
.location-info .hours { font-size: 14px; color: rgba(250, 250, 250, 0.6); }

/* Footer */
.footer { background: #050505; padding: 48px clamp(20px, 5vw, 60px); border-top: 1px solid rgba(250, 250, 250, 0.05); }
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(250, 250, 250, 0.05); }
.footer-brand { font-size: 20px; font-weight: 700; color: #fafafa; text-decoration: none; letter-spacing: 0.1em; }
.footer-nav { display: flex; gap: 24px; flex-wrap: wrap; }
.footer-nav a { font-size: 13px; color: rgba(250, 250, 250, 0.5); text-decoration: none; transition: color 0.3s; }
.footer-nav a:hover { color: #fafafa; }
.footer-info { margin-bottom: 16px; }
.footer-info span { font-size: 12px; color: rgba(250, 250, 250, 0.4); }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.copyright { font-size: 12px; color: rgba(250, 250, 250, 0.4); }
.privacy-link { font-size: 12px; color: rgba(250, 250, 250, 0.4); text-decoration: none; }
.privacy-link:hover { color: #fafafa; }
</style>
