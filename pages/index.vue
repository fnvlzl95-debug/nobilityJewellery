<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { galleryItems, categories } from '~/data/gallery-items'
import { faqItems } from '~/data/faq-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const { trackPhoneClick, trackKakaoClick, trackMapClick, trackEvent } = useGtag()

const handleQuickStartClick = (label: string, to: string) => {
  trackEvent('home_quick_start_click', { item_name: label, destination: to })
}

const handleCategoryClick = (title: string, to: string) => {
  trackEvent('home_category_click', { item_name: title, destination: to })
}

const handleGalleryPreviewClick = (title: string, slug: string) => {
  trackEvent('home_gallery_preview_click', { item_name: title, destination: `/gallery/${slug}` })
}

const handlePhoneClick = () => {
  trackPhoneClick('home', {
    placement: 'hero',
    intent: 'general',
    topic: '종로 귀금속 상담',
  })
}

const handleKakaoClick = () => {
  trackKakaoClick('home', {
    placement: 'hero',
    intent: 'general',
    topic: '종로 귀금속 상담',
  })
}

const handleLocationPhoneClick = () => {
  trackPhoneClick('home', {
    placement: 'section_cta',
    intent: 'general',
    topic: '오시는 길',
  })
}

const handleCtaPhoneClick = () => {
  trackPhoneClick('home', {
    placement: 'footer_cta',
    intent: 'general',
    topic: '지금 문의하세요',
  })
}

const handleCtaKakaoClick = () => {
  trackKakaoClick('home', {
    placement: 'footer_cta',
    intent: 'general',
    topic: '지금 문의하세요',
  })
}

const iconPaths: Record<string, string> = {
  custom: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>',
  repair: '<path d="M14 6a4 4 0 105.5 5.5L21 13l-8 8-2-2 8-8 1.5-1.5A4 4 0 0014 6z"/><path d="M6 6l4 4"/>',
  buy: '<rect x="3" y="7" width="18" height="12" rx="1"/><path d="M7 7V5h10v2M3 11h18"/>',
  wedding: '<path d="M4 8h16l-1.5 11h-13z"/><path d="M8 8V6a4 4 0 018 0v2"/>',
  wholesale: '<path d="M3 9l9-5 9 5v10l-9 5-9-5z"/><path d="M3 9l9 5 9-5M12 14v10"/>',
  chat: '<path d="M21 12a8 8 0 01-8 8H5l-2 2V12a8 8 0 018-8h2a8 8 0 018 8z"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  craft: '<path d="M12 3l7 4v10l-7 4-7-4V7z"/><path d="M12 3v18M5 7l7 4 7-4"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
}

const categoryLabels = Object.fromEntries(categories.map((category) => [category.id, category.label]))

// 서비스 바로가기 (기존 Quick Start 섹션)
const serviceTiles = [
  { to: '/custom', label: '주문제작', eng: 'CUSTOM MADE', icon: 'custom' },
  { to: '/repair', label: '수리·AS', eng: 'REPAIR SERVICE', icon: 'repair' },
  { to: '/buy-gold', label: '금매입', eng: 'GOLD PURCHASE', icon: 'buy' },
  { to: '/wedding', label: '결혼예물', eng: 'WEDDING', icon: 'wedding' },
  { to: '/wholesale', label: '도매', eng: 'WHOLESALE', icon: 'wholesale' },
]

// 품목·서비스 카테고리 (기존 인기 카테고리 + 서비스 카드 통합)
const categoryCards = [
  { to: '/couple-ring', title: '커플링', eng: 'COUPLE RING', image: '/Image/ring/NN0103.webp', alt: '14K 커플링 주문제작 디자인' },
  { to: '/baby-gold', title: '순금 돌반지', eng: 'BABY GOLD', image: '/Image/ring/SB0101.webp', alt: '24K 순금 돌반지 주문제작' },
  { to: '/wedding', title: '결혼예물', eng: 'WEDDING SET', image: '/Image/set/set0101.webp', alt: '결혼예물 세트 구성' },
  { to: '/custom', title: '목걸이 · 팔찌', eng: 'NECKLACE', image: '/Image/necklace/NC0101.webp', alt: '금목걸이 주문제작 디자인' },
  { to: '/repair', title: '수리 · 리폼', eng: 'REPAIR', image: '/Image/ring/NN0104.webp', alt: '수리·리폼 상담 대상 14K 반지' },
  { to: '/buy-gold', title: '금 · 은 매입', eng: 'GOLD PURCHASE', image: '/Image/set/set0201.webp', alt: '금 매입 상담을 위한 귀금속 확인' },
]

// 갤러리 미리보기 — 분류가 고르게 퍼지도록 선별 (카테고리 카드와 사진 중복 없음)
const previewSlugs = [
  'two-tone-lattice-tension-couple-ring',
  'rose-gold-chunky-chain-pave-lock-necklace',
  'flower-motif-rose-gold-jewelry-set',
  'gold-layered-chain-bracelet-trio',
  'lucky-horseshoe-number-pendant-necklace',
  'fancy-yellow-diamond-solitaire-ring',
]
const previewItems = previewSlugs
  .map((slug) => galleryItems.find((item) => item.slug === slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))

// 제작·수리 진행 순서
const processSteps = [
  { num: '01', title: '상담', desc: '원하시는 디자인과 예산·수령일 상담', icon: 'chat' },
  { num: '02', title: '견적 확인', desc: '중량·공임과 당일 시세 기준 견적 안내', icon: 'doc' },
  { num: '03', title: '제작 · 수리', desc: '숙련된 장인이 매장에서 직접 세공', icon: 'craft' },
  { num: '04', title: '검수 · 전달', desc: '마감·사이즈 검수 후 안전하게 전달', icon: 'check' },
]

const repairChecks = [
  { title: '반지 사이즈 조절', desc: '늘리기·줄이기 당일 접수' },
  { title: '세척 · 광택 복원', desc: '금·은 세척과 폴리싱' },
  { title: '화이트골드 재도금', desc: '변색·광택 기준 안내' },
  { title: '체인 수리', desc: '끊어짐·잠금장치 교체' },
  { title: '보석 재세팅', desc: '큐빅 빠짐·발 보강' },
  { title: '귀걸이 침 수리', desc: '휘어짐·부러짐 점검' },
]

const buyItems = [
  { title: '금', desc: '순금(24K), 18K, 14K, 골드바' },
  { title: '은', desc: '순은, 실버바, 은 장신구' },
  { title: '기타', desc: '백금, 금니, 부서진 귀금속' },
  { title: '확인 후 당일 지급', desc: '순도·중량 측정 후 최종 금액 안내' },
]

// 홈 노출 FAQ — 상담 전 반복 질문. /faq 전체로 연결하고 FAQPage 구조화 데이터로도 내보낸다
const homeFaqIds = [1, 20, 12, 41, 50, 2]
const homeFaqs = homeFaqIds
  .map((id) => faqItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))

const featuredGuides = [
  { to: '/guide/white-gold-discoloration-care', category: '관리', title: '화이트골드 변색, 재도금이 필요한 기준', description: '누렇게 보이는 이유와 세척·도금 구분' },
  { to: '/guide/couple-ring-14k-18k-price-difference', category: '가격', title: '14K·18K 커플링 가격 차이', description: '금 함량·중량·공임을 같은 기준으로 비교' },
  { to: '/guide/gold-one-don-gram', category: '소재', title: '금 1돈은 몇 g? 3.75g 환산', description: '돈·그램 계산과 순도별 실제 금 함량' },
  { to: '/guide/baby-ring-price', category: '가격', title: '돌반지 가격, 문의 전 확인할 3가지', description: '중량·순도·공임이 가격을 가르는 지점' },
  { to: '/guide/gold-necklace-length-guide', category: '선택', title: '목걸이 길이 추천: 42·45·50cm', description: '목둘레·펜던트·체인 굵기 기준 비교' },
  { to: '/guide/platinum-vs-white-gold-difference', category: '소재', title: '백금과 화이트골드 차이', description: '무게·변색·관리·가격으로 나눠 정리' },
]

useHead({
  title: '종로 귀금속 도매·주문제작 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/` }
  ],
  meta: [
    { name: 'description', content: '서울 종로 귀금속 도매 전문점 귀족. 금반지, 돌반지, 순금 돌반지, 커플링, 예물, 결혼반지 주문제작. 14K 18K 24K 순금 반지·목걸이·귀걸이·팔찌 도매. 종로3가 금은방, 귀금속 수리·세공.' },
    { name: 'keywords', content: '종로 금은방, 귀금속 도매, 금반지 도매, 종로3가 금은방, 귀족 귀금속, 금반지 주문제작, 귀금속 수리, 금 매입, 돌반지, 커플링, 결혼예물' },
    // Open Graph
    { property: 'og:title', content: '종로 귀금속 도매·주문제작 | 귀족' },
    { property: 'og:description', content: '서울 종로 귀금속 도매 전문. 금반지, 돌반지, 커플링, 예물 주문제작. 종로3가 금은방, 귀금속 도매상.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteConfig.url },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NS0102.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '종로 귀금속 도매·주문제작 | 귀족' },
    { name: 'twitter:description', content: '서울 종로 귀금속 도매 전문. 금반지, 돌반지, 커플링, 예물 주문제작. 종로3가 금은방' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NS0102.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'JewelryStore',
        '@id': siteConfig.url,
        name: siteConfig.name,
        description: '종로 귀금속 도매 전문. 반지, 목걸이, 귀걸이, 팔찌 도매 상담, 주문 제작, 수리·세공까지.',
        url: siteConfig.url,
        telephone: siteConfig.phoneFormatted,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: siteConfig.hours.days,
            opens: siteConfig.hours.open,
            closes: siteConfig.hours.close
          }
        ],
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        priceRange: '$$',
        currenciesAccepted: 'KRW',
        paymentAccepted: 'Cash, Credit Card',
        areaServed: {
          '@type': 'Country',
          name: 'South Korea'
        },
        sameAs: [
          siteConfig.social.naverPlace,
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.blog,
        ].filter(Boolean)
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
      ]))
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: homeFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      })
    }
  ]
})

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const heroLoaded = ref(false)
const mapLoaded = ref(false)
const mapWrapper = ref<HTMLElement | null>(null)

let lenis: Lenis | null = null
let rafId: number | null = null
let revealObserver: IntersectionObserver | null = null
let fallbackScrollHandler: (() => void) | null = null

const scrollTo = (id: string) => {
  isMenuOpen.value = false
  // Reset body scroll lock when menu closes
  document.body.style.overflow = ''
  const target = document.getElementById(id)
  if (target && lenis) {
    lenis.scrollTo(target)
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

// Watch menu state for scroll lock and focus management
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  // 메뉴 열릴 때 모든 포커스 해제
  if (open) {
    (document.activeElement as HTMLElement)?.blur()
  }
})

// 3D Tilt Effect for cards
const handleTilt = (e: MouseEvent, el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
}

const resetTilt = (el: HTMLElement) => {
  el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
}

onMounted(() => {
  // Hero animation
  setTimeout(() => heroLoaded.value = true, 100)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      isScrolled.value = scroll > 80
    })
  } else {
    fallbackScrollHandler = () => { isScrolled.value = window.scrollY > 80 }
    window.addEventListener('scroll', fallbackScrollHandler, { passive: true })
    fallbackScrollHandler()
  }

  // Reveal animation observer
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver!.observe(el))

  // 3D Tilt cards - only on desktop
  if (window.matchMedia('(min-width: 1024px)').matches) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => handleTilt(e as MouseEvent, card as HTMLElement))
      card.addEventListener('mouseleave', () => resetTilt(card as HTMLElement))
    })
  }

  // Lazy load map when visible (성능 최적화)
  if (mapWrapper.value) {
    const mapObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !mapLoaded.value) {
          mapLoaded.value = true
          mapObserver.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    mapObserver.observe(mapWrapper.value)
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  revealObserver?.disconnect()
  revealObserver = null
  if (fallbackScrollHandler) {
    window.removeEventListener('scroll', fallbackScrollHandler)
    fallbackScrollHandler = null
  }
})

const handleKakaoMapClick = () => {
  trackMapClick('home', 'kakao', {
    placement: 'section_cta',
    intent: 'directions',
    topic: '오시는 길',
    destination: 'https://map.kakao.com/link/search/서울 종로구 종로 173 귀족',
  })
}

const handleNaverMapClick = () => {
  trackMapClick('home', 'naver', {
    placement: 'section_cta',
    intent: 'directions',
    topic: '오시는 길',
    destination: 'https://naver.me/xen7hRCZ',
  })
}
</script>

<template>
  <div class="page">
    <!-- Hero Section -->
    <section class="hero" :class="{ loaded: heroLoaded }">
      <div class="hero-bg">
        <img
          src="/Image/ring/NS0102.webp"
          alt="14K 다이아몬드 솔리테어 반지 - 귀족 종로 귀금속 대표 상품"
          class="hero-image"
          fetchpriority="high"
        />
        <div class="hero-overlay"></div>
        <div class="hero-grain"></div>
      </div>

      <div class="hero-content">
        <div class="hero-tag">
          <span class="tag-line"></span>
          <span class="tag-text">Since 2004 · Jongro Jewelry District</span>
          <span class="tag-line"></span>
        </div>

        <h1 class="hero-title">
          <span class="sr-only">종로 귀금속 도매 전문 귀족</span>
          <span class="title-line" aria-hidden="true">귀</span>
          <span class="title-line" aria-hidden="true">족</span>
        </h1>

        <p class="hero-subtitle">종로 귀금속 도매의 품격</p>

        <div class="hero-cta">
          <a
            :href="siteConfig.social.kakaoOpenChat"
            target="_blank"
            rel="noopener"
            class="btn-magnetic"
            @click="handleKakaoClick"
          >
            <span class="btn-text">카톡 문의</span>
            <span class="btn-glow"></span>
          </a>
          <a :href="`tel:${siteConfig.phone}`" class="btn-outline-gold" @click="handlePhoneClick">
            <span>전화 상담</span>
          </a>
          <NuxtLink to="/gallery" class="btn-outline-gold">
            <span>갤러리 보기</span>
          </NuxtLink>
        </div>
      </div>

      <button @click="scrollTo('about')" class="scroll-indicator" aria-label="스크롤">
        <span class="scroll-text">Scroll</span>
        <span class="scroll-line"></span>
      </button>

      <!-- Floating elements -->
      <div class="hero-float hero-float-1"></div>
      <div class="hero-float hero-float-2"></div>
    </section>

    <!-- Quick Start: 서비스 바로가기 -->
    <section id="quick-start" class="section-block">
      <div class="container-lg quick-row">
        <div class="quick-head reveal">
          <span class="sec-eyebrow">Quick Start</span>
          <h2 class="block-title">무엇이 필요하세요?</h2>
        </div>
        <nav class="service-tiles" aria-label="서비스 바로가기">
          <NuxtLink
            v-for="(tile, index) in serviceTiles"
            :key="tile.to"
            :to="tile.to"
            class="service-tile reveal"
            :class="`reveal-delay-${Math.min(index + 1, 5)}`"
            @click="handleQuickStartClick(tile.label, tile.to)"
          >
            <span class="tile-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" v-html="iconPaths[tile.icon]"></svg>
            </span>
            <span class="tile-label">
              <b>{{ tile.label }}</b>
              <span class="tile-eng">{{ tile.eng }}</span>
            </span>
            <span class="tile-arrow" aria-hidden="true">›</span>
          </NuxtLink>
        </nav>
      </div>
    </section>

    <!-- About: 브랜드 소개 -->
    <section id="about" class="section-block">
      <div class="container-lg">
        <div class="about-panel reveal">
          <div class="about-visual">
            <NuxtImg
              src="/Image/main/home-trust-jewelry-still-life.webp"
              alt="정밀 검수된 금반지와 주얼리 도구 - 세공 경력 30년 종로 금은방"
              width="800"
              height="600"
              format="webp"
              quality="90"
              loading="lazy"
              sizes="sm:100vw md:50vw lg:520px"
            />
          </div>
          <div class="about-content">
            <span class="sec-eyebrow">About Us</span>
            <h2 class="block-title">세공 경력 30년,<br><em>신뢰</em>를 쌓아왔습니다</h2>
            <p class="about-text">
              귀족은 서울 종로3가 귀금속 거리, 종묘귀금속백화점에서 2004년부터 운영 중인 금은방입니다.
              세공 경력 30년의 장인이 정확한 납기와 일관된 품질, 투명한 가격을 지키며 직접 제작합니다.
            </p>
            <p class="about-text">
              돌반지·커플링·결혼예물 주문제작부터 14K·18K·24K 순금과 백금·은 도매,
              금·은 매입, 반지 사이즈 조절과 세공 수리까지 한자리에서 해결하실 수 있습니다.
            </p>
            <div class="about-stats">
              <div class="about-stat"><strong>30<sup>+</sup></strong><span>Years of Craft</span></div>
              <div class="about-stat"><strong>도매</strong><span>Wholesale</span></div>
              <div class="about-stat"><strong>주문제작</strong><span>Custom</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category: 품목·서비스별 안내 -->
    <section class="section-block">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">Category</span>
            <h2 class="block-title">품목·서비스별 안내</h2>
            <p class="block-desc">찾으시는 항목을 고르시면 소재·제작 기간·상담 기준을 함께 보실 수 있습니다</p>
          </div>
          <NuxtLink to="/gallery" class="block-more">갤러리 전체 보기 ›</NuxtLink>
        </div>
        <div class="cat-grid">
          <NuxtLink
            v-for="card in categoryCards"
            :key="card.title"
            :to="card.to"
            class="cat-card reveal"
            @click="handleCategoryClick(card.title, card.to)"
          >
            <span class="cat-media">
              <NuxtImg
                :src="card.image"
                :alt="card.alt"
                width="400"
                height="533"
                format="webp"
                quality="88"
                loading="lazy"
                sizes="sm:56vw md:33vw lg:190px"
              />
              <span class="cat-frame" aria-hidden="true"></span>
            </span>
            <div class="cat-body">
              <b>{{ card.title }}</b>
              <span>{{ card.eng }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery: 제작 디자인 미리보기 -->
    <section class="section-block">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">Gallery</span>
            <h2 class="block-title">귀족의 제품을 둘러보세요</h2>
            <p class="block-desc">마음에 드는 제품을 기준으로 소재와 사이즈를 바꿔 주문하실 수 있습니다</p>
          </div>
          <NuxtLink to="/gallery" class="block-more">갤러리 전체 보기 ›</NuxtLink>
        </div>
        <div class="preview-grid">
          <NuxtLink
            v-for="item in previewItems"
            :key="item.slug"
            :to="`/gallery/${item.slug}`"
            class="preview-card reveal"
            @click="handleGalleryPreviewClick(item.title, item.slug)"
          >
            <span class="preview-media">
              <NuxtImg
                :src="item.images[0]"
                :alt="item.imageAlts[0] ?? item.title"
                width="400"
                height="533"
                format="webp"
                quality="88"
                loading="lazy"
                sizes="sm:56vw md:33vw lg:190px"
              />
              <span class="cat-frame" aria-hidden="true"></span>
            </span>
            <div class="preview-caption">
              <span class="preview-name">
                <b>{{ item.title }}</b>
                <span>{{ categoryLabels[item.category] }}</span>
              </span>
              <span class="preview-plus" aria-hidden="true">+</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Guide: 상담 전 가이드 -->
    <section class="section-block section-guide">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">Guide</span>
            <h2 class="block-title">상담 전에 보면 좋은 가이드</h2>
            <p class="block-desc">실제 문의에서 가장 많이 나온 질문을 기준으로 정리했습니다</p>
          </div>
          <NuxtLink to="/guide" class="block-more">가이드 전체 보기 ›</NuxtLink>
        </div>
        <div class="guide-grid">
          <NuxtLink
            v-for="guide in featuredGuides"
            :key="guide.to"
            :to="guide.to"
            class="guide-card reveal"
          >
            <span class="guide-cat">{{ guide.category }}</span>
            <b>{{ guide.title }}</b>
            <span class="guide-desc">{{ guide.description }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process: 제작·수리 과정 -->
    <section class="section-block">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">Process</span>
            <h2 class="block-title">제작 · 수리 과정</h2>
            <p class="block-desc">상담부터 수령까지, 정확하고 투명하게 진행됩니다</p>
          </div>
        </div>
        <div class="process">
          <div v-for="step in processSteps" :key="step.num" class="process-step reveal">
            <span class="process-node">
              <svg viewBox="0 0 24 24" aria-hidden="true" v-html="iconPaths[step.icon]"></svg>
            </span>
            <b><i>{{ step.num }}</i>{{ step.title }}</b>
            <span>{{ step.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Repair: 수리·AS -->
    <section id="repair" class="section-block">
      <div class="container-lg">
        <div class="repair-panel reveal">
          <div class="repair-body">
            <span class="sec-eyebrow">Repair</span>
            <h2 class="block-title">수리 · AS 서비스</h2>
            <p class="block-desc repair-desc">소중한 주얼리, 새것처럼 — 30년 경력의 장인이 직접 수리합니다</p>
            <div class="repair-checks">
              <div v-for="check in repairChecks" :key="check.title" class="repair-check">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L19 7"/></svg>
                <span>{{ check.title }}<small>{{ check.desc }}</small></span>
              </div>
            </div>
            <NuxtLink to="/repair" class="panel-link">수리 안내 자세히 보기 ›</NuxtLink>
          </div>
          <div class="repair-media">
            <NuxtImg
              src="/Image/main/home-repair-tools-still-life.webp"
              alt="귀금속 수리 작업 도구 - 종로 금은방 반지 사이즈 조절"
              width="720"
              height="540"
              format="webp"
              quality="88"
              loading="lazy"
              sizes="sm:100vw md:50vw lg:560px"
            />
            <div class="repair-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
              <span><b>당일 접수</b><span>반지 사이즈 조절은 당일 접수 가능합니다</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Buy Gold + Calculator -->
    <section id="buy-gold" class="section-block">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">Gold Purchase</span>
            <h2 class="block-title">금 · 은 매입과 돈수 계산</h2>
            <p class="block-desc">순도와 중량을 확인해 당일 시세로 안내합니다</p>
          </div>
        </div>
        <div class="buy-row">
          <div class="buy-panel reveal">
            <h3 class="panel-title">매입 품목</h3>
            <p class="panel-desc">감정 결과와 최종 금액 확인 후 당일 지급합니다</p>
            <ul class="buy-list">
              <li v-for="item in buyItems" :key="item.title">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L19 7"/></svg>
                <div><b>{{ item.title }}</b><span>{{ item.desc }}</span></div>
              </li>
            </ul>
            <NuxtLink to="/buy-gold" class="panel-link">매입 안내 자세히 보기 ›</NuxtLink>
          </div>

          <div class="calc-panel reveal reveal-delay-1">
            <h3 class="panel-title">금 돈수 계산기</h3>
            <p class="panel-desc">돈·그램을 환산하고 순도별 실제 금 함량을 확인하세요</p>
            <GoldWeightCalculator id-prefix="home-gold-weight" />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ: 상담 전 자주 묻는 질문 -->
    <section class="section-block section-faq">
      <div class="container-lg">
        <div class="block-head reveal">
          <div>
            <span class="sec-eyebrow">FAQ</span>
            <h2 class="block-title">자주 묻는 질문</h2>
            <p class="block-desc">상담 전에 가장 많이 물어보시는 내용을 모았습니다</p>
          </div>
          <NuxtLink to="/faq" class="block-more">질문 전체 보기 ›</NuxtLink>
        </div>
        <div class="faq-grid">
          <details v-for="faq in homeFaqs" :key="faq.id" class="faq-item reveal">
            <summary>
              <span>{{ faq.question }}</span>
              <span class="faq-mark" aria-hidden="true"></span>
            </summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Location Section -->
    <section id="location" class="section-location">
      <div class="container-lg">
        <div class="location-grid">
          <div class="location-content">
            <span class="section-label reveal">Location</span>
            <h2 class="section-title reveal reveal-delay-1">오시는 길</h2>

            <address class="location-address reveal reveal-delay-2">
              {{ siteConfig.address.full }}
            </address>

            <ul class="contact-info reveal reveal-delay-3">
              <li>
                <span class="info-label">Tel</span>
                <a :href="`tel:${siteConfig.phone}`" @click="handleLocationPhoneClick">{{ siteConfig.phone }}</a>
              </li>
              <li>
                <span class="info-label">Hours</span>
                <span>{{ siteConfig.hours.display }}</span>
              </li>
              <li>
                <span class="info-label">Parking</span>
                <NuxtLink to="/faq#parking" class="link-parking">주차 안내 보기</NuxtLink>
              </li>
            </ul>

            <div class="map-buttons reveal reveal-delay-4">
              <a href="https://map.kakao.com/link/search/서울 종로구 종로 173 귀족" target="_blank" rel="noopener" class="btn-map" @click="handleKakaoMapClick">
                <span>카카오맵</span>
              </a>
              <a href="https://naver.me/xen7hRCZ" target="_blank" rel="noopener" class="btn-map" @click="handleNaverMapClick">
                <span>네이버지도</span>
              </a>
            </div>
          </div>

          <div class="location-visual reveal reveal-right">
            <div ref="mapWrapper" class="map-wrapper">
              <iframe
                v-if="mapLoaded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.5!2d126.9969905!3d37.5709401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca39b5483f101%3A0x749ac4f8c54eae40!2z6recKOq0gCkg7ISY7Jq47Yq567OE7Iuc7KKF66Gc6rWs7KKF66GcMTcz7KKF66qo6reI6riI7IaN67Cx7ZmU7KCQMTAx7Zi4!5e0!3m2!1sko!2skr!4v1703123456789!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                title="귀족 귀금속 위치 - 종로구 종로 173 종묘귀금속백화점"
              ></iframe>
              <div v-else class="map-placeholder">
                <span>지도 로딩 중...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-cta">
      <div class="cta-bg">
        <NuxtImg
          src="/Image/main/home-cta-jewelry-banner.webp"
          alt=""
          aria-hidden="true"
          width="1536"
          height="640"
          format="webp"
          quality="82"
          loading="lazy"
          sizes="sm:100vw md:100vw lg:1600px"
        />
        <div class="cta-gradient"></div>
        <span class="cta-frame" aria-hidden="true"></span>
      </div>
      <div class="container-lg">
        <div class="cta-content">
          <p class="cta-kicker reveal">Consultation</p>
          <h2 class="cta-title reveal reveal-delay-1">소중한 순간을 위한 <em>단 하나</em>의 주얼리</h2>
          <p class="cta-desc reveal reveal-delay-2">
            원하시는 디자인 사진과 소재·사이즈·희망일을 보내주시면<br>
            제작 가능 여부와 견적을 빠르게 안내해드립니다.
          </p>
          <div class="cta-actions reveal reveal-delay-3">
            <a
              :href="siteConfig.social.kakaoOpenChat"
              target="_blank"
              rel="noopener"
              class="cta-btn cta-btn-kakao"
              @click="handleCtaKakaoClick"
            >
              카카오톡 상담
            </a>
            <a
              :href="`tel:${siteConfig.phone}`"
              class="cta-btn cta-btn-phone"
              @click="handleCtaPhoneClick"
            >
              {{ siteConfig.phone }}
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  background: #0a0a0a;
  color: #fafafa;
  font-family: var(--font-body);
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}

/* Screen Reader Only (SEO용 숨김 텍스트) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container-lg {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}
/* ===== Hero Section ===== */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 100vw;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  object-position: center center;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 모바일 히어로 최적화 */
@media (max-width: 768px) {
  .hero {
    min-height: 100vh;
    min-height: 100svh;
  }

  .hero-image {
    min-width: 100%;
    min-height: 100%;
  }
}

.hero.loaded .hero-image {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.7) 0%,
    rgba(10, 10, 10, 0.8) 40%,
    rgba(10, 10, 10, 0.75) 100%
  );
}

.hero-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
}

.hero-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.hero.loaded .hero-tag {
  opacity: 1;
  transform: translateY(0);
}

.tag-line {
  width: 40px;
  height: 1px;
  background: #c9a227;
}

.tag-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
}

.hero-title {
  display: flex;
  justify-content: center;
  gap: 0.1em;
  margin-bottom: 16px;
}

.title-line {
  font-family: var(--font-body);
  font-size: clamp(100px, 20vw, 200px);
  font-weight: 300;
  line-height: 1;
  color: #fafafa;
  text-shadow: 0 4px 40px rgba(10, 10, 10, 0.3);
  opacity: 0;
  transform: translateY(60px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero.loaded .title-line:nth-child(2) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

.hero.loaded .title-line:nth-child(3) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.5s;
}

.hero-subtitle {
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 300;
  letter-spacing: 0.2em;
  color: rgba(250, 250, 250, 0.8);
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
}

.hero.loaded .hero-subtitle {
  opacity: 1;
  transform: translateY(0);
}

.hero-cta {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
}

.hero.loaded .hero-cta {
  opacity: 1;
  transform: translateY(0);
}

.btn-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 36px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4b44a 0%, #c9a227 50%, #a68820 100%);
  border: none;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-magnetic::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #d4b44a 0%, #d4b44a 100%);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.btn-magnetic:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201, 162, 39, 0.35);
}

.btn-magnetic:hover::before {
  opacity: 1;
}

.btn-magnetic .btn-text {
  position: relative;
  z-index: 1;
  color: #0a0a0a;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  z-index: 2;
  transition: left 0.5s ease;
}

.btn-magnetic:hover .btn-glow {
  left: 100%;
}

.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 17px 36px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #c9a227;
  background: transparent;
  border: 1px solid rgba(201, 162, 39, 0.4);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-outline-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(201, 162, 39, 0.08);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-outline-gold:hover {
  border-color: #c9a227;
  color: #fafafa;
}

.btn-outline-gold:hover::before {
  transform: scaleX(1);
}

.btn-outline-gold span {
  position: relative;
  z-index: 1;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  animation: fadeInUp 0.8s 1.2s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
  }
}

.scroll-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.5);
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, #c9a227, transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.5; }
}

.hero-float {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: float 8s ease-in-out infinite;
}

.hero-float-1 {
  top: 20%;
  left: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.1) 0%, transparent 70%);
  animation-delay: 0s;
}

.hero-float-2 {
  bottom: 20%;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 70%);
  animation-delay: -4s;
}

@media (min-width: 768px) {
  .hero-float-1 {
    left: 10%;
    width: 300px;
    height: 300px;
  }
  .hero-float-2 {
    right: 10%;
    width: 400px;
    height: 400px;
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}
.section-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-body);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  line-height: 1.3;
  color: #fafafa;
  margin-bottom: 24px;
}

.section-title em {
  font-style: normal;
  font-weight: 700;
  color: #c9a227;
}

.section-desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(250, 250, 250, 0.6);
}
/* ═══════════════════════════════════════════════════════════
   섹션 공통 — 목업(mocks/home-redesign.html) 기준
   간격은 6/10/16/20/24/40 스케일, 색은 main.css 토큰만 사용
   ═══════════════════════════════════════════════════════════ */
.section-block {
  padding: clamp(52px, 7vw, 84px) 0;
}

/* 카드 경계 — 기본 hairline(0.08)은 #0a0a0a 배경에서 거의 보이지 않아 한 단계 밝게 잡는다 */
.section-block {
  --card-line: rgba(245, 230, 204, 0.16);
  --card-line-hover: rgba(201, 162, 39, 0.5);
}

.sec-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}

.block-title {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--white);
  text-wrap: balance;
}

.block-title em {
  font-style: normal;
  color: var(--gold);
}

.block-desc {
  font-size: 15px;
  color: var(--gray);
  margin-top: 6px;
}

.block-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.block-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-size: 14px;
  color: var(--gold);
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.25s var(--ease-out-quart);
}

.block-more:hover { color: var(--gold-light); }

.panel-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 4px;
}

.panel-desc {
  font-size: 13px;
  color: var(--gray);
  margin-bottom: 20px;
}

.panel-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-top: auto;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  color: var(--gold);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out-quart);
}

.panel-link:hover { background: rgba(201, 162, 39, 0.1); }

/* ===== Quick Start ===== */
.quick-row {
  display: grid;
  grid-template-columns: minmax(200px, 0.62fr) minmax(0, 2.6fr);
  gap: clamp(20px, 3vw, 40px);
  align-items: center;
}

.service-tiles {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.service-tile {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  padding: 16px;
  background: var(--black-lighter);
  border: 1px solid rgba(250, 250, 250, 0.08);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.25s var(--ease-out-quart),
              background-color 0.25s var(--ease-out-quart),
              transform 0.25s var(--ease-out-quart);
}

.service-tile:hover {
  border-color: var(--gold);
  background: rgba(201, 162, 39, 0.1);
  transform: translateY(-3px);
}

.tile-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.tile-icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--gold);
  fill: none;
  stroke-width: 1.4;
}

.tile-label { display: grid; gap: 2px; }
.tile-label b { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
.tile-eng { font-size: 12px; letter-spacing: 0.08em; color: var(--gray); }
.tile-arrow { margin-top: auto; color: var(--gold); font-size: 16px; line-height: 1; }

/* ===== About ===== */
.about-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: var(--black-light);
}

.about-visual { position: relative; min-height: 300px; overflow: hidden; }
.about-visual :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-content { padding: clamp(24px, 4vw, 48px); }
.about-content .block-title { margin-bottom: 16px; }

.about-text {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.72);
  margin-bottom: 10px;
}

.about-stats {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.about-stat {
  padding: 0 clamp(16px, 3vw, 40px);
  border-left: 1px solid rgba(250, 250, 250, 0.08);
}

.about-stat:first-child { padding-left: 0; border-left: none; }

.about-stat strong {
  display: block;
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 700;
  color: var(--gold);
}

.about-stat strong sup { font-size: 0.5em; vertical-align: super; }
.about-stat span { font-size: 12px; letter-spacing: 0.08em; color: var(--gray); }

/* ===== Category ===== */
.cat-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; }

/* 사진 위에 글자를 얹지 않는다 — 사진은 사진대로 보이고 캡션은 아래에서 읽힌다 */
.cat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--card-line);
  background: var(--black-lighter);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.4s var(--ease-out-quart), background-color 0.4s var(--ease-out-quart);
}

.cat-card:hover { border-color: var(--card-line-hover); background: #201c14; }

.cat-media {
  display: block;
  flex: 0 0 auto;
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.cat-card :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s var(--ease-out-expo);
}

.cat-card:hover :deep(img) { transform: scale(1.05); }

/* 사진 안쪽 골드 헤어라인 — 호버 시에만 은은하게 */
.cat-frame {
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(245, 230, 204, 0);
  pointer-events: none;
  transition: border-color 0.5s var(--ease-out-quart);
  z-index: 1;
}

.cat-card:hover .cat-frame,
.preview-card:hover .cat-frame { border-color: rgba(245, 230, 204, 0.28); }

.cat-body {
  padding: 16px;
  border-top: 1px solid var(--card-line);
  background: transparent;
  flex: 0 0 auto;
}

.cat-body b {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(15px * 1.45);
  line-height: 1.45;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 4px;
}

.cat-body span {
  display: block;
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.16em;
  color: var(--gold-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Gallery Preview ===== */
.preview-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; }

.preview-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--card-line);
  background: var(--black-lighter);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.4s var(--ease-out-quart), background-color 0.4s var(--ease-out-quart);
}

.preview-card:hover { border-color: var(--card-line-hover); background: #201c14; }

.preview-media {
  display: block;
  flex: 0 0 auto;
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.preview-card :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s var(--ease-out-expo);
}

.preview-card:hover :deep(img) { transform: scale(1.05); }

.preview-caption {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid var(--card-line);
  background: transparent;
  flex: 0 0 auto;
}

.preview-name { min-width: 0; }

/* 제품명 길이와 무관하게 2줄 분량을 항상 확보해 카드 높이를 통일한다 */
.preview-name b {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(14px * 1.45 * 2);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 4px;
}

.preview-name span { display: block; font-size: 11px; line-height: 1.4; letter-spacing: 0.16em; color: var(--gold-dark); }

.preview-plus {
  flex: 0 0 auto;
  color: var(--gold);
  font-size: 16px;
  line-height: 1.4;
  font-weight: 300;
  transition: transform 0.4s var(--ease-out-quart);
}

.preview-card:hover .preview-plus { transform: rotate(90deg); }

/* ===== Guide ===== */
.section-guide {
  background: var(--black-light);
  border-top: 1px solid rgba(250, 250, 250, 0.08);
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }

.guide-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 132px;
  padding: 20px;
  background: var(--black);
  border: 1px solid rgba(250, 250, 250, 0.08);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.25s var(--ease-out-quart), transform 0.25s var(--ease-out-quart);
}

.guide-card:hover { border-color: var(--gold); transform: translateY(-3px); }
.guide-cat { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--gold); }
.guide-card b { font-size: 17px; font-weight: 700; line-height: 1.45; letter-spacing: -0.01em; color: var(--white); }
.guide-desc { font-size: 14px; color: var(--gray); line-height: 1.55; margin-top: auto; }

/* ===== Process ===== */
.process {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.process::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 12.5%;
  right: 12.5%;
  height: 1px;
  background: repeating-linear-gradient(90deg, rgba(201, 162, 39, 0.35) 0 6px, transparent 6px 14px);
}

.process-step { position: relative; text-align: center; padding: 0 6px; }

.process-node {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: var(--black-light);
  border: 1px solid rgba(201, 162, 39, 0.35);
}

.process-node svg { width: 20px; height: 20px; stroke: var(--gold); fill: none; stroke-width: 1.4; }
.process-step b { display: block; font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--white); }
.process-step b i { font-style: normal; color: var(--gold); font-variant-numeric: tabular-nums; margin-right: 6px; }
.process-step span { font-size: 13px; color: var(--gray); line-height: 1.55; }

/* ===== Repair ===== */
.repair-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: var(--black-light);
}

.repair-body { padding: clamp(24px, 4vw, 48px); display: flex; flex-direction: column; }
.repair-desc { margin-bottom: 24px; }

.repair-checks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 24px;
  margin-bottom: 24px;
}

.repair-check { display: flex; gap: 10px; align-items: start; font-size: 15px; line-height: 1.5; color: var(--white); }
.repair-check svg { flex: 0 0 18px; width: 18px; height: 18px; stroke: var(--gold); fill: none; stroke-width: 1.5; margin-top: 3px; }
.repair-check small { display: block; font-size: 13px; color: var(--gray); }

.repair-media { position: relative; min-height: 280px; overflow: hidden; }
.repair-media :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }

.repair-badge {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 16px;
  max-width: 250px;
  background: rgba(10, 10, 10, 0.62);
  border: 1px solid rgba(201, 162, 39, 0.35);
  backdrop-filter: blur(4px);
}

.repair-badge svg { flex: 0 0 22px; width: 22px; height: 22px; stroke: var(--gold); fill: none; stroke-width: 1.4; }
.repair-badge b { display: block; font-size: 14px; font-weight: 700; color: var(--white); }
.repair-badge span span { font-size: 13px; color: rgba(250, 250, 250, 0.72); line-height: 1.45; }

/* ===== Buy Gold + Calculator ===== */
.buy-row {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 16px;
  align-items: stretch;
}

.buy-panel,
.calc-panel {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(250, 250, 250, 0.08);
  background: var(--black-light);
  padding: clamp(24px, 3vw, 32px);
}

.buy-list { list-style: none; display: grid; gap: 16px; margin: 0 0 20px; padding: 0; }
.buy-list li { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 10px; align-items: start; }
.buy-list svg { width: 18px; height: 18px; stroke: var(--gold); fill: none; stroke-width: 1.5; margin-top: 3px; }
.buy-list b { display: block; font-size: 15px; font-weight: 600; color: var(--white); }
.buy-list span { font-size: 13px; color: var(--gray); line-height: 1.5; }

/* 계산기가 더 높을 때 남는 공간을 리스트 위아래로 분배 */
.buy-panel .buy-list { margin-block: auto; }

/* ===== FAQ ===== */
.section-faq {
  background: var(--black-light);
  border-top: 1px solid rgba(250, 250, 250, 0.08);
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.faq-item {
  border: 1px solid var(--card-line);
  background: var(--black);
  transition: border-color 0.3s var(--ease-out-quart);
}

.faq-item:hover { border-color: var(--card-line-hover); }
.faq-item[open] { border-color: rgba(201, 162, 39, 0.35); }

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 60px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker { display: none; }

.faq-mark {
  position: relative;
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
}

.faq-mark::before,
.faq-mark::after {
  content: '';
  position: absolute;
  background: var(--gold);
  transition: transform 0.3s var(--ease-out-quart);
}

.faq-mark::before { top: 5px; left: 0; width: 12px; height: 1px; }
.faq-mark::after { top: 0; left: 5px; width: 1px; height: 12px; }
.faq-item[open] .faq-mark::after { transform: rotate(90deg); }

.faq-item p {
  padding: 0 20px 20px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--gray);
}

/* ===== CTA Section ===== */
.section-cta {
  position: relative;
  padding: clamp(72px, 10vw, 128px) 0;
  overflow: hidden;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.cta-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.cta-bg :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
  display: block;
}

/* 가운데는 살짝 열어 제품이 비치고, 가장자리로 갈수록 깊게 잠기는 비네트 */
/* 배너 자체가 좌측에 어두운 여백을 갖고 있어 오버레이는 가볍게만 얹는다 */
.cta-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.72) 45%, rgba(10, 10, 10, 0.5) 100%),
    linear-gradient(180deg, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.15) 45%, rgba(10, 10, 10, 0.55) 100%);
}

/* 샴페인 헤어라인 액자 */
.cta-frame {
  position: absolute;
  inset: clamp(16px, 3vw, 40px);
  border: 1px solid rgba(245, 230, 204, 0.18);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.cta-kicker {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}

.cta-title em { font-style: normal; color: var(--gold); }

.cta-title {
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--white);
  margin-bottom: 10px;
  text-wrap: balance;
}

.cta-desc {
  font-size: 16px;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 24px;
}

.cta-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 28px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out-quart), color 0.25s var(--ease-out-quart);
}

.cta-btn-kakao {
  background: var(--gold);
  color: var(--black);
  border: 1px solid var(--gold);
}

.cta-btn-kakao:hover { background: var(--gold-light); border-color: var(--gold-light); }

.cta-btn-phone {
  background: transparent;
  color: var(--gold);
  border: 1px solid rgba(201, 162, 39, 0.35);
  font-variant-numeric: tabular-nums;
}

.cta-btn-phone:hover { background: rgba(201, 162, 39, 0.1); }

/* ═══════════ 반응형 ═══════════ */
@media (max-width: 1023px) {
  .quick-row { grid-template-columns: minmax(0, 1fr); align-items: start; }
  .service-tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .about-panel { grid-template-columns: minmax(0, 1fr); }
  .about-visual { min-height: 0; aspect-ratio: 16 / 9; }
  .cat-grid,
  .preview-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .guide-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .faq-grid { grid-template-columns: minmax(0, 1fr); }
  .repair-panel { grid-template-columns: minmax(0, 1fr); }
  .repair-media { min-height: 0; aspect-ratio: 16 / 9; order: -1; }
  .buy-row { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 640px) {
  /* 카드 줄 → 가로 스와이프. 다음 카드가 걸쳐 보이게 해 스와이프를 암시한다 */
  .service-tiles,
  .cat-grid,
  .preview-grid {
    display: flex;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    gap: 10px;
    margin-inline: calc(-1 * clamp(20px, 5vw, 60px));
    padding-inline: clamp(20px, 5vw, 60px);
    padding-bottom: 10px;
    scroll-padding-inline: clamp(20px, 5vw, 60px);
    scrollbar-width: none;
  }

  .service-tiles::-webkit-scrollbar,
  .cat-grid::-webkit-scrollbar,
  .preview-grid::-webkit-scrollbar { display: none; }

  .service-tile { flex: 0 0 148px; scroll-snap-align: start; }
  .cat-card,
  .preview-card { flex: 0 0 56vw; scroll-snap-align: start; }
  .cat-media,
  .preview-media { aspect-ratio: 1 / 1; }

  /* 가이드는 훑어 찾는 콘텐츠 — 스와이프 대신 전부 노출 */
  .guide-grid { grid-template-columns: minmax(0, 1fr); }
  .guide-card { min-height: 0; padding: 16px 20px; }

  /* 과정은 흐름이 보이도록 세로 일렬 + 세로 점선 */
  .process { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .process::before { display: none; }

  .process-step {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    column-gap: 16px;
    row-gap: 2px;
    text-align: left;
    padding: 0 0 24px;
    position: relative;
  }

  .process-step:last-child { padding-bottom: 0; }
  .process-node { grid-row: 1 / 3; margin: 0; }

  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 24px;
    top: 48px;
    bottom: 0;
    width: 1px;
    background: repeating-linear-gradient(180deg, rgba(201, 162, 39, 0.35) 0 6px, transparent 6px 14px);
  }

  .process-step b { margin-bottom: 0; align-self: end; }

  .block-head { flex-direction: column; align-items: flex-start; gap: 10px; }
  .repair-checks { grid-template-columns: minmax(0, 1fr); }
}

/* ===== Location Section ===== */
.section-location {
  padding: 160px 0;
  background: #0a0a0a;
  overflow: hidden;
}

.location-grid {
  display: grid;
  gap: 80px;
  align-items: center;
}

@media (min-width: 900px) {
  .location-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.location-address {
  font-family: var(--font-body);
  font-size: clamp(24px, 3vw, 32px);
  font-style: normal;
  line-height: 1.6;
  color: #fafafa;
  margin-bottom: 32px;
}

.location-address em {
  font-style: normal;
  color: #c9a227;
  font-weight: 700;
}

.contact-info {
  list-style: none;
  margin-bottom: 32px;
}

.contact-info li {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
  font-size: 15px;
  color: rgba(250, 250, 250, 0.7);
}

.info-label {
  min-width: 60px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.6);
}

.contact-info a {
  color: #fafafa;
  text-decoration: none;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
}

.contact-info a:hover {
  color: #c9a227;
}

.link-parking {
  color: #fafafa;
  text-decoration: none;
  transition: color 0.3s;
}

.link-parking:hover {
  color: #c9a227;
}

.map-buttons {
  display: flex;
  gap: 12px;
}

.btn-map {
  padding: 14px 28px;
  font-size: 13px;
  font-weight: 700;
  color: #fafafa;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.2);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-map:hover {
  background: #fafafa;
  color: #0a0a0a;
  border-color: #fafafa;
}

.location-visual {
  position: relative;
}

.map-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  filter: grayscale(0.2) brightness(0.85);
  transition: filter 0.4s;
}

.map-wrapper:hover iframe {
  filter: grayscale(0) brightness(1);
}

.map-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: rgba(250, 250, 250, 0.5);
  font-size: 14px;
}
/* ===== Reveal Animations ===== */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left {
  transform: translateX(-24px);
}

.reveal-left.revealed {
  transform: translateX(0);
}

.reveal-right {
  transform: translateX(24px);
}

.reveal-right.revealed {
  transform: translateX(0);
}

.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
.reveal-delay-3 { transition-delay: 0.24s; }
.reveal-delay-4 { transition-delay: 0.32s; }
.reveal-delay-5 { transition-delay: 0.4s; }
</style>

<style>
/* Mobile Menu - Luxury Design */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Transition */
.menu-fade-enter-active {
  transition: opacity 0.4s ease;
}
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

/* Close Button */
.mobile-menu-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: none;
  border: 1px solid rgba(201, 162, 39, 0.3);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.mobile-menu-close:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.1);
}

.mobile-menu-close span {
  position: absolute;
  width: 20px;
  height: 1.5px;
  background: #c9a227;
}

.mobile-menu-close span:first-child {
  transform: rotate(45deg);
}

.mobile-menu-close span:last-child {
  transform: rotate(-45deg);
}

/* Menu Content */
.mobile-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 40px 60px;
  position: relative;
  z-index: 5;
}

/* Brand */
.mobile-menu-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 48px;
}

.mobile-menu-brand-text {
  font-family: var(--font-body);
  font-size: 32px;
  font-weight: 300;
  color: #fafafa;
  letter-spacing: 0.2em;
}

.mobile-menu-brand-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #c9a227, transparent);
}

/* Navigation */
.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-menu-link {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(250, 250, 250, 0.06);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.mobile-menu-link:first-child {
  border-top: 1px solid rgba(250, 250, 250, 0.06);
}

.mobile-menu-link:hover,
.mobile-menu-link:focus {
  padding-left: 12px;
  outline: none;
}

.mobile-menu-link:hover .mobile-menu-link-num,
.mobile-menu-link:focus .mobile-menu-link-num {
  color: #c9a227;
}

.mobile-menu-link:hover .mobile-menu-link-text,
.mobile-menu-link:focus .mobile-menu-link-text {
  color: #c9a227;
}

.mobile-menu-link-num {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.6);
  transition: color 0.3s;
}

.mobile-menu-link-text {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  letter-spacing: 0.02em;
  transition: color 0.3s;
}

/* Footer */
.mobile-menu-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-top: 48px;
}

.mobile-menu-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4b44a 0%, #c9a227 50%, #a68820 100%);
  text-decoration: none;
  transition: all 0.3s;
}

.mobile-menu-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.mobile-menu-phone {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.mobile-menu-phone:hover {
  color: #c9a227;
}

/* Decorative Elements */
.mobile-menu-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.mobile-menu-decor-line {
  position: absolute;
  right: 60px;
  top: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.2) 30%, rgba(201, 162, 39, 0.2) 70%, transparent);
}

.mobile-menu-decor-glow {
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 60%);
  filter: blur(60px);
}

@media (min-width: 900px) {
  .mobile-menu-overlay {
    display: none !important;
  }
}

@media (max-width: 400px) {
  .mobile-menu {
    padding: 100px 24px 40px;
  }

  .mobile-menu-link-text {
    font-size: 20px;
  }

  .mobile-menu-brand-text {
    font-size: 28px;
  }
}
</style>