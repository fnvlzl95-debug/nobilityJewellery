<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useHead({
  title: '커플링 | 커플링 주문제작 - 귀족 종로 금은방',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/couple-ring' }
  ],
  meta: [
    { name: 'description', content: '커플링 주문제작 전문 귀족. 14K 18K 커플링, 이니셜 각인, 기념일 각인. 화이트골드, 로즈골드, 옐로우골드. 30년 장인 직접 세공. 종로3가 금은방 도매가. 약혼반지, 우정반지.' },
    { name: 'keywords', content: '커플링, 커플링 주문제작, 14K 커플링, 18K 커플링, 이니셜 커플링, 각인 커플링, 약혼반지, 우정반지, 기념일 반지, 화이트골드 커플링, 로즈골드 커플링, 종로 커플링' },
    // Open Graph
    { property: 'og:title', content: '커플링 | 커플링 주문제작 - 귀족 종로 금은방' },
    { property: 'og:description', content: '커플링 주문제작. 14K 18K 골드, 이니셜 각인. 30년 장인 직접 세공. 종로 도매가.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/couple-ring' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NN0103.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '커플링 | 커플링 주문제작 - 귀족' },
    { name: 'twitter:description', content: '커플링 주문제작. 14K 18K 골드, 이니셜 각인. 30년 장인 직접 세공.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NN0103.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: '커플링',
        description: '14K, 18K 커플링 주문제작. 이니셜 각인, 기념일 각인 가능.',
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
        image: 'https://noblessegold.com/Image/ring/NN0103.webp'
      })
    }
  ]
})

const ringTypes = [
  {
    title: '클래식 커플링',
    description: '심플하고 클래식한 디자인. 어떤 스타일에도 잘 어울리며 일상 착용에 적합합니다.',
    features: ['심플 디자인', '일상 착용', '사이즈 교환']
  },
  {
    title: '이니셜 커플링',
    description: '두 분의 이니셜을 새긴 특별한 반지. 세상에 하나뿐인 커플링을 만들어드립니다.',
    features: ['이니셜 각인', '날짜 각인', '맞춤 디자인']
  },
  {
    title: '다이아 커플링',
    description: '다이아몬드가 세팅된 고급스러운 커플링. 약혼반지로도 인기 있습니다.',
    features: ['다이아 세팅', '약혼 추천', '프로포즈']
  }
]

const materials = [
  { name: '14K 화이트골드', desc: '은빛 광택의 세련된 느낌' },
  { name: '14K 로즈골드', desc: '핑크빛의 여성스러운 느낌' },
  { name: '14K 옐로우골드', desc: '클래식한 골드 느낌' },
  { name: '18K 골드', desc: '내구성 우수, 고급스러운 광택' }
]

const occasions = [
  { title: '100일 기념', desc: '사귀기 시작한 지 100일' },
  { title: '1주년 기념', desc: '함께한 1년을 기념' },
  { title: '약혼', desc: '프로포즈와 함께' },
  { title: '우정', desc: '친구와 함께 맞추는 반지' }
]

const engravingOptions = [
  { type: '이니셜', example: 'J ♥ S' },
  { type: '날짜', example: '2024.12.25' },
  { type: '메시지', example: 'Forever' }
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="page-header">
          <span class="label">Couple Rings</span>
          <h1 class="title">커플링</h1>
          <p class="desc">
            두 분만의 특별한 반지.<br>
            이니셜, 기념일을 새겨 세상에 하나뿐인 커플링을 만들어드립니다.
          </p>
        </div>

        <!-- Hero Images -->
        <div class="hero-images">
          <div class="hero-item">
            <img src="/Image/ring/NN0103.webp" alt="PROMISE 커플링 - 14K 골드" loading="eager" />
          </div>
          <div class="hero-item">
            <img src="/Image/ring/NN0101.webp" alt="커플링 화이트골드" loading="eager" />
          </div>
        </div>

        <!-- Why Choose -->
        <div class="why-section">
          <div class="why-grid">
            <div class="why-item">
              <h3>직접 제작</h3>
              <p>30년 경력 장인이 매장에서 직접 세공</p>
            </div>
            <div class="why-item">
              <h3>도매가</h3>
              <p>종로 도매상가 가격으로 합리적 구매</p>
            </div>
            <div class="why-item">
              <h3>무료 각인</h3>
              <p>이니셜, 날짜, 메시지 각인 무료</p>
            </div>
            <div class="why-item">
              <h3>사이즈 조절</h3>
              <p>구매 후 사이즈 조절 가능</p>
            </div>
          </div>
        </div>

        <!-- Ring Types -->
        <div class="types-section">
          <h2 class="section-title">커플링 종류</h2>
          <div class="types-grid">
            <div
              v-for="(ring, index) in ringTypes"
              :key="index"
              class="type-card"
            >
              <h3 class="type-title">{{ ring.title }}</h3>
              <p class="type-desc">{{ ring.description }}</p>
              <ul class="type-features">
                <li v-for="(feature, i) in ring.features" :key="i">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <div class="materials-section">
          <h2 class="section-title">소재 선택</h2>
          <div class="materials-grid">
            <div
              v-for="(mat, index) in materials"
              :key="index"
              class="material-card"
            >
              <h3 class="material-name">{{ mat.name }}</h3>
              <p class="material-desc">{{ mat.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Occasions -->
        <div class="occasions-section">
          <h2 class="section-title">이런 분들께 추천</h2>
          <div class="occasions-grid">
            <div
              v-for="(occ, index) in occasions"
              :key="index"
              class="occasion-card"
            >
              <h3>{{ occ.title }}</h3>
              <p>{{ occ.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Engraving -->
        <div class="engraving-section">
          <h2 class="section-title">각인 서비스</h2>
          <p class="section-desc">주문제작 시 무료로 각인해드립니다</p>
          <div class="engraving-grid">
            <div
              v-for="(eng, index) in engravingOptions"
              :key="index"
              class="engraving-card"
            >
              <span class="engraving-type">{{ eng.type }}</span>
              <span class="engraving-example">{{ eng.example }}</span>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div class="gallery-section">
          <h2 class="section-title">제품 갤러리</h2>
          <div class="gallery-grid">
            <img src="/Image/ring/NN0103.webp" alt="PROMISE 커플링" loading="lazy" />
            <img src="/Image/ring/NN0101.webp" alt="커플링 화이트골드" loading="lazy" />
            <img src="/Image/ring/NN0102.webp" alt="커플링 로즈골드" loading="lazy" />
            <img src="/Image/ring/NN0104.webp" alt="커플링 옐로우골드" loading="lazy" />
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
          title="커플링 상담"
          description="두 분만의 특별한 커플링을 만들어드립니다.<br>전화 또는 방문하시면 상세히 안내해드립니다."
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

/* Hero Images */
.hero-images { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 80px; }
@media (max-width: 600px) { .hero-images { grid-template-columns: 1fr; } }
.hero-item { aspect-ratio: 4/3; overflow: hidden; border: 1px solid rgba(250, 250, 250, 0.1); }
.hero-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.hero-item:hover img { transform: scale(1.05); }

/* Section Title */
.section-title { font-size: 24px; font-weight: 300; color: #fafafa; text-align: center; margin-bottom: 16px; }
.section-desc { font-size: 14px; color: rgba(250, 250, 250, 0.5); text-align: center; margin-bottom: 40px; }

/* Why Section */
.why-section { margin-bottom: 80px; }
.why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
@media (max-width: 800px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .why-grid { grid-template-columns: 1fr; } }
.why-item { text-align: center; padding: 32px 20px; background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%); border: 1px solid rgba(201, 162, 39, 0.2); }
.why-item h3 { font-size: 18px; font-weight: 700; color: #c9a227; margin-bottom: 8px; }
.why-item p { font-size: 13px; color: rgba(250, 250, 250, 0.6); line-height: 1.5; }

/* Types */
.types-section { margin-bottom: 80px; }
.types-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
@media (max-width: 800px) { .types-grid { grid-template-columns: 1fr; } }
.type-card { padding: 32px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); transition: all 0.3s; }
.type-card:hover { border-color: rgba(201, 162, 39, 0.3); }
.type-title { font-size: 20px; font-weight: 700; color: #fafafa; margin-bottom: 12px; }
.type-desc { font-size: 14px; color: rgba(250, 250, 250, 0.6); line-height: 1.7; margin-bottom: 20px; }
.type-features { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.type-features li { font-size: 11px; color: #c9a227; padding: 6px 12px; background: rgba(201, 162, 39, 0.1); border: 1px solid rgba(201, 162, 39, 0.2); }

/* Materials */
.materials-section { margin-bottom: 80px; }
.materials-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 800px) { .materials-grid { grid-template-columns: repeat(2, 1fr); } }
.material-card { padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); text-align: center; }
.material-name { font-size: 14px; font-weight: 700; color: #fafafa; margin-bottom: 8px; display: block; }
.material-desc { font-size: 12px; color: rgba(250, 250, 250, 0.5); }

/* Occasions */
.occasions-section { margin-bottom: 80px; }
.occasions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 800px) { .occasions-grid { grid-template-columns: repeat(2, 1fr); } }
.occasion-card { padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); text-align: center; }
.occasion-card h3 { font-size: 16px; font-weight: 700; color: #c9a227; margin-bottom: 8px; }
.occasion-card p { font-size: 13px; color: rgba(250, 250, 250, 0.5); }

/* Engraving */
.engraving-section { margin-bottom: 80px; }
.engraving-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 600px) { .engraving-grid { grid-template-columns: 1fr; } }
.engraving-card { display: flex; flex-direction: column; align-items: center; padding: 32px; background: rgba(201, 162, 39, 0.05); border: 1px solid rgba(201, 162, 39, 0.15); }
.engraving-type { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: rgba(250, 250, 250, 0.5); margin-bottom: 12px; }
.engraving-example { font-size: 24px; font-weight: 300; color: #c9a227; }

/* Gallery */
.gallery-section { margin-bottom: 80px; }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 600px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
.gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 1px solid rgba(250, 250, 250, 0.1); transition: all 0.3s; }
.gallery-grid img:hover { border-color: rgba(201, 162, 39, 0.3); }
.gallery-cta { text-align: center; margin-top: 32px; }
.btn-text { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #c9a227; text-decoration: none; transition: gap 0.3s; }
.btn-text:hover { gap: 12px; }

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
