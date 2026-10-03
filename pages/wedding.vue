<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

definePageMeta({
  layout: 'landing'
})

const pageTitle = '종로 결혼예물 맞춤 상담 | 구성·제작기간 | 귀족'
const pageDescription = '결혼반지부터 목걸이·귀걸이, 양가 선물까지 필요한 예물만 상담하세요. 종로3가 귀족에서 희망 소재·디자인·예산과 촬영·예식일을 확인해 구성을 정합니다. 제작은 최소 2주, 견적과 수령 일정은 카카오톡 상담으로 안내합니다.'
const { trackKakaoClick, trackPageInquiryClick, trackEvent } = useGtag()
const weddingContact = { path: '/contact', query: { type: 'custom', source: 'wedding_overview', topic: '결혼예물 구성·일정', from: '/wedding' } }
const handleWeddingKakao = () => trackKakaoClick('wedding', { placement: 'wedding_intro', intent: 'custom', topic: '결혼예물 구성·일정' })
const handleWeddingInquiry = () => trackPageInquiryClick('wedding', { placement: 'wedding_overview', intent: 'custom', topic: '결혼예물 구성·일정' })
const trackWeddingLink = (targetPath: string, placement: string) => trackEvent('consultation_path_click', { source_path: '/wedding', target_path: targetPath, placement })

useHead({
  title: pageTitle,
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/wedding` }
  ],
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'keywords', content: '결혼예물, 예물 세트, 결혼반지, 시댁예물, 처가예물, 신부예물, 신랑예물, 18K 예물, 다이아몬드 예물, 종로 예물, 금은방 예물, 예물 도매, 웨딩 주얼리' },
    // Open Graph
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/wedding` },
    { property: 'og:image', content: `${siteConfig.url}/Image/set/set0101.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/set/set0101.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageTitle,
        description: pageDescription,
        url: `${siteConfig.url}/wedding`,
        image: `${siteConfig.url}/Image/set/set0101.webp`,
        mainEntity: {
          '@type': 'Service',
          name: '결혼예물 맞춤 상담',
          serviceType: '결혼예물 주문제작',
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
          }
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
        { name: '결혼예물', path: '/wedding' },
      ]))
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
  { title: '수령 전 확인', desc: '소재·구성·각인과 완성 일정 확인' }
]

const materials = [
  { name: '14K·18K 골드', purity: '소재·색상 상담', desc: '원하는 색감과 착용 목적을 함께 비교' },
  { name: '화이트골드', purity: '은빛 색상', desc: '표면 마감과 관리 방법을 함께 확인' },
  { name: '다이아몬드', purity: '감정서 확인', desc: '4C 기준, 감정서는 상담 시 안내' },
  { name: '24K 순금', purity: '순금 예물', desc: '양가 선물 용도와 디자인 상담' }
]

const processSteps = [
  { num: '01', title: '상담', desc: '예산, 스타일, 세트 구성 상담' },
  { num: '02', title: '디자인 확정', desc: '샘플 확인 후 세부사항 결정' },
  { num: '03', title: '제작', desc: '최소 2주, 사양에 따라 추가 기간 안내' },
  { num: '04', title: '전달', desc: '품질 검수 후 케이스와 함께 전달' }
]
</script>

<template>
  <div class="container">
    <!-- Header -->
        <div class="page-header">
          <span class="label">결혼예물 맞춤 상담</span>
          <h1 class="title">종로 결혼예물,<br>필요한 구성부터 함께 정하세요</h1>
          <p class="desc">
            결혼반지만 준비할지, 목걸이·귀걸이와 양가 선물까지 맞출지.<br>
            원하는 디자인 사진과 예산, 촬영·예식 날짜를 보내주세요.<br>
            종로3가 귀족에서 필요한 품목과 제작 가능한 일정을 함께 확인합니다.
          </p>
          <div class="wedding-intro-actions">
            <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="wedding-kakao" @click="handleWeddingKakao">사진으로 예물 카톡 상담</a>
            <NuxtLink :to="weddingContact" @click="handleWeddingInquiry">문의 내용 남기기</NuxtLink>
          </div>
        </div>

        <section class="wedding-overview" aria-labelledby="wedding-overview-title">
          <h2 id="wedding-overview-title">예물 상담 전에 세 가지만 정하세요</h2>
          <div class="wedding-overview-grid">
            <div>
              <strong>구성 상담</strong>
              <p>커플링을 중심으로 목걸이·귀걸이·양가 선물 중 필요한 품목만 고릅니다.</p>
              <NuxtLink to="/guide/wedding-jewelry-set-composition" @click="trackWeddingLink('/guide/wedding-jewelry-set-composition', 'wedding_overview')">구성 기준 보기</NuxtLink>
            </div>
            <div>
              <strong>예산 상담</strong>
              <p>전체 예산과 꼭 필요한 품목을 알려주세요. 소재·디자인·구성을 맞춘 뒤 상담 시점의 견적을 안내합니다.</p>
              <NuxtLink :to="weddingContact" @click="handleWeddingInquiry">예산과 구성 상담 남기기</NuxtLink>
            </div>
            <div>
              <strong>제작 일정 상담</strong>
              <p>제작은 최소 2주가 필요하며, 선택 사양과 촬영일·예식일을 함께 확인해 수령 일정을 정합니다.</p>
              <NuxtLink to="/guide/wedding-ring-production-time" @click="trackWeddingLink('/guide/wedding-ring-production-time', 'wedding_overview')">일정 기준 보기</NuxtLink>
            </div>
          </div>
        </section>

        <!-- Hero Image -->
        <div class="hero-image">
          <img src="/Image/set/set0101.webp" alt="모던 듀얼 체인 주얼리 세트 디자인" loading="eager" />
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
          <h2 class="section-title">상담 가능한 예물 범위</h2>
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
                <h3>필요한 품목과 예산</h3>
                <p>결혼반지·목걸이·귀걸이·양가 선물 중 필요한 품목과 전체 예산을 알려주세요. 모든 품목을 세트로 맞출 필요는 없습니다.</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">2</span>
              <div class="check-text">
                <h3>비교할 디자인과 소재</h3>
                <p>마음에 드는 사진과 유지하거나 바꾸고 싶은 부분, 희망 소재·색상을 보내주세요. 보석과 장식의 변경 가능 범위도 함께 확인합니다.</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">3</span>
              <div class="check-text">
                <h3>착용 정보와 각인</h3>
                <p>알고 있는 반지 사이즈, 원하는 목걸이 길이 느낌, 각인 문구를 준비해주세요. 사이즈가 불확실하면 확정 전에 상담으로 확인합니다.</p>
              </div>
            </div>
            <div class="checklist-item">
              <span class="check-icon">4</span>
              <div class="check-text">
                <h3>먼저 필요한 날짜</h3>
                <p>촬영일·예식일·선물일 중 먼저 필요한 날짜를 알려주세요. 제작은 최소 2주가 필요하며, 디자인 확정 후 가능한 수령 일정을 안내합니다.</p>
              </div>
            </div>
          </div>
          <p class="wedding-quote-note">견적을 비교할 때는 포함 품목·소재·보석·각인 조건을 같게 맞추세요. 가격은 금시세와 최종 제작 조건에 따라 상담으로 안내하며, 디자인이나 구성이 바뀌면 견적과 일정도 다시 확인합니다.</p>
        </div>

        <!-- Gallery -->
        <div class="gallery-section">
          <h2 class="section-title">예물 구성을 상담할 디자인</h2>
          <div class="gallery-grid">
            <NuxtLink to="/gallery/modern-dual-chain-set" @click="trackWeddingLink('/gallery/modern-dual-chain-set', 'wedding_gallery')">
              <img src="/Image/set/set0101.webp" alt="모던 듀얼 체인 세트 전체 디자인" loading="lazy" />
            </NuxtLink>
            <NuxtLink to="/gallery/modern-dual-chain-set" @click="trackWeddingLink('/gallery/modern-dual-chain-set', 'wedding_gallery')">
              <img src="/Image/set/set0102.webp" alt="모던 듀얼 체인 세트 장식 디테일" loading="lazy" />
            </NuxtLink>
            <NuxtLink to="/gallery/u-link-lettering-signature-set" @click="trackWeddingLink('/gallery/u-link-lettering-signature-set', 'wedding_gallery')">
              <img src="/Image/set/set0201.webp" alt="U링크 레터링 시그니처 세트 디자인" loading="lazy" />
            </NuxtLink>
            <NuxtLink to="/gallery/u-link-lettering-signature-set" @click="trackWeddingLink('/gallery/u-link-lettering-signature-set', 'wedding_gallery')">
              <img src="/Image/set/set0202.webp" alt="U링크와 레터링 장식 디테일" loading="lazy" />
            </NuxtLink>
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

        <GuideClusterLinks cluster-id="wedding" current-path="/wedding" />

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

        <ConsultationNextStep path="/wedding" />

        <!-- CTA -->
        <LandingCTA
          title="필요한 예물과 수령일을 알려주세요"
          description="원하는 디자인 사진·소재·예산과 촬영 또는 예식 날짜를<br>카카오톡으로 보내주시면 구성과 제작 조건을 상담해드립니다."
        />

    <!-- Location -->
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

.nav-logo { text-decoration: none; }
.logo-text { font-size: 24px; font-weight: 700; color: #fafafa; letter-spacing: 0.1em; }
.nav-link { font-size: 13px; font-weight: 700; letter-spacing: 0.05em; color: rgba(250, 250, 250, 0.7); text-decoration: none; transition: color 0.3s; }
.nav-link:hover, .nav-link.active { color: #fafafa; }


/* Main */
.main { padding-top: 120px; padding-bottom: 80px; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 60px); }

/* Header */
.page-header { text-align: center; margin-bottom: 48px; }
.label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a227; margin-bottom: 16px; }
.title { font-size: clamp(32px, 5vw, 48px); font-weight: 300; color: #fafafa; margin-bottom: 20px; }
.desc { font-size: 16px; font-weight: 300; line-height: 1.8; color: rgba(250, 250, 250, 0.6); }
.wedding-intro-actions { display:flex; align-items:center; justify-content:center; gap:12px 20px; flex-wrap:wrap; margin-top:24px; }
.wedding-intro-actions a { display:inline-flex; align-items:center; justify-content:center; min-height:48px; padding:12px 18px; color:#d4b44a; font-size:14px; font-weight:600; text-underline-offset:4px; }
.wedding-intro-actions .wedding-kakao { background:#c9a227; color:#0a0a0a; text-decoration:none; }
.wedding-intro-actions a:focus-visible { outline:2px solid #d4b44a; outline-offset:4px; }
.wedding-quote-note { margin:24px auto 0; max-width:720px; color:rgba(250,250,250,.72); font-size:14px; line-height:1.8; }

.wedding-overview {
  margin: 0 0 36px;
  padding: 24px 0;
  border-top: 1px solid rgba(201, 162, 39, 0.6);
  border-bottom: 1px solid rgba(201, 162, 39, 0.24);
}

.wedding-overview h2 {
  margin: 0 0 20px;
  color: #fafafa;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 500;
  text-align: center;
}

.wedding-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.wedding-overview-grid > div {
  padding: 4px 24px;
  border-left: 1px solid rgba(250, 250, 250, 0.12);
}

.wedding-overview-grid > div:first-child {
  border-left: 0;
}

.wedding-overview strong {
  display: block;
  margin-bottom: 8px;
  color: #d4b44a;
  font-size: 15px;
}

.wedding-overview p {
  margin: 0 0 10px;
  color: rgba(250, 250, 250, 0.76);
  font-size: 13px;
  line-height: 1.7;
}

.wedding-overview a {
  color: #fafafa;
  font-size: 13px;
  text-underline-offset: 4px;
}

@media (max-width: 720px) {
  .wedding-overview-grid {
    grid-template-columns: 1fr;
  }

  .wedding-overview-grid > div,
  .wedding-overview-grid > div:first-child {
    padding: 18px 0;
    border-top: 1px solid rgba(250, 250, 250, 0.1);
    border-left: 0;
  }

  .wedding-overview-grid > div:first-child {
    border-top: 0;
    padding-top: 0;
  }
}

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
@media (max-width: 500px) {
  .process-grid {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    max-width: 320px;
    margin: 0 auto;
  }
  .process-step {
    position: relative;
    text-align: left;
    padding: 24px 24px 24px 56px;
    background: transparent;
    border: none;
    border-left: 2px solid rgba(201, 162, 39, 0.3);
  }
  .process-step:last-child { border-left-color: transparent; }
  .process-step::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 28px;
    width: 12px;
    height: 12px;
    background: #c9a227;
    border-radius: 50%;
  }
  .process-step .step-num {
    position: absolute;
    left: 20px;
    top: 24px;
  }
  .process-step .step-title { margin-bottom: 6px; }
}
.process-step { text-align: center; padding: 24px; background: rgba(250, 250, 250, 0.02); border: 1px solid rgba(250, 250, 250, 0.06); }
.step-num { display: inline-block; font-size: 12px; font-weight: 700; color: #c9a227; letter-spacing: 0.1em; margin-bottom: 12px; }
.step-title { font-size: 16px; font-weight: 700; color: #fafafa; margin-bottom: 8px; }
.step-desc { font-size: clamp(12px, 2.5vw, 14px); color: rgba(250, 250, 250, 0.5); line-height: 1.6; }

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
.btn-gold { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; font-size: 14px; font-weight: 700; color: #0a0a0a; background: linear-gradient(135deg, #d4b44a 0%, #c9a227 50%, #a68820 100%); text-decoration: none; transition: all 0.3s; }
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3); }
.btn-outline { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; font-size: 14px; font-weight: 700; color: #fafafa; background: transparent; border: 1px solid rgba(250, 250, 250, 0.3); text-decoration: none; transition: all 0.3s; }
.btn-outline:hover { border-color: #c9a227; color: #c9a227; transform: translateY(-2px); }

/* Location */
.location-info { text-align: center; padding: 32px; border-top: 1px solid rgba(250, 250, 250, 0.06); }
.location-info h4 { font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #c9a227; margin-bottom: 16px; }
.location-info .address { font-size: 16px; color: #fafafa; margin-bottom: 8px; }
.location-info .hours { font-size: 14px; color: rgba(250, 250, 250, 0.6); }

/* Footer */
</style>
