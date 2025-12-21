<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { getPreviewItems, categories } from '~/data/gallery-items'

const previewItems = getPreviewItems(4)

useHead({
  title: '귀족 | 종로 귀금속 도매',
  meta: [
    { name: 'description', content: '종로 귀금속 도매 전문 · 20년 신뢰의 거래. 반지, 목걸이, 귀걸이, 팔찌 도매 상담, 주문 제작, 수리·세공까지.' },
    // Open Graph
    { property: 'og:title', content: '귀족 | 종로 귀금속 도매' },
    { property: 'og:description', content: '종로 귀금속 도매 전문 · 20년 신뢰의 거래. 도매 상담, 주문 제작, 수리·세공까지.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.png' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '귀족 | 종로 귀금속 도매' },
    { name: 'twitter:description', content: '종로 귀금속 도매 전문 · 20년 신뢰의 거래' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://noblessegold.com',
        name: '귀족',
        description: '종로 귀금속 도매 전문. 반지, 목걸이, 귀걸이, 팔찌 도매 상담, 주문 제작, 수리·세공까지.',
        url: 'https://noblessegold.com',
        telephone: '+82-2-766-4789',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '종로 173 종묘귀금속백화점 101호',
          addressLocality: '종로구',
          addressRegion: '서울',
          postalCode: '03186',
          addressCountry: 'KR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.5713,
          longitude: 126.9961
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00'
          }
        ],
        image: 'https://noblessegold.com/Image/ring/NS0102.png',
        priceRange: '$$',
        currenciesAccepted: 'KRW',
        paymentAccepted: 'Cash, Credit Card',
        areaServed: {
          '@type': 'Country',
          name: 'South Korea'
        },
        sameAs: []
      })
    }
  ]
})

const showMobileCta = ref(false)
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const heroLoaded = ref(false)

let lenis: Lenis | null = null
let rafId: number | null = null

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

// Watch menu state for scroll lock
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
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
    showMobileCta.value = scroll > window.innerHeight * 0.5
    isScrolled.value = scroll > 80
  })

  // Reveal animation observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  // 3D Tilt cards - only on desktop
  if (window.matchMedia('(min-width: 1024px)').matches) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => handleTilt(e as MouseEvent, card as HTMLElement))
      card.addEventListener('mouseleave', () => resetTilt(card as HTMLElement))
    })
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
})
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
      <div class="nav-links desktop-nav">
        <button @click="scrollTo('about')" class="nav-link">소개</button>
        <button @click="scrollTo('services')" class="nav-link">취급품목</button>
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <button @click="scrollTo('location')" class="nav-link">오시는 길</button>
        <NuxtLink to="/contact" class="nav-cta">
          <span>문의하기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
      <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="메뉴" :class="{ active: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Mobile Menu (separate from nav to avoid transform issues) -->
    <Teleport to="body">
      <Transition name="menu-fade">
        <div v-if="isMenuOpen" class="mobile-menu-overlay">
          <!-- Close Button -->
          <button class="mobile-menu-close" @click="isMenuOpen = false" aria-label="닫기">
            <span></span>
            <span></span>
          </button>

          <!-- Menu Content -->
          <div class="mobile-menu">
            <!-- Brand -->
            <div class="mobile-menu-brand">
              <span class="mobile-menu-brand-text">귀족</span>
              <span class="mobile-menu-brand-line"></span>
            </div>

            <!-- Navigation Links -->
            <nav class="mobile-menu-nav">
              <button @click="scrollTo('about')" class="mobile-menu-link">
                <span class="mobile-menu-link-num">01</span>
                <span class="mobile-menu-link-text">소개</span>
              </button>
              <button @click="scrollTo('services')" class="mobile-menu-link">
                <span class="mobile-menu-link-num">02</span>
                <span class="mobile-menu-link-text">취급품목</span>
              </button>
              <NuxtLink to="/gallery" class="mobile-menu-link" @click="isMenuOpen = false">
                <span class="mobile-menu-link-num">03</span>
                <span class="mobile-menu-link-text">갤러리</span>
              </NuxtLink>
              <button @click="scrollTo('location')" class="mobile-menu-link">
                <span class="mobile-menu-link-num">04</span>
                <span class="mobile-menu-link-text">오시는 길</span>
              </button>
            </nav>

            <!-- CTA -->
            <div class="mobile-menu-footer">
              <NuxtLink to="/contact" class="mobile-menu-cta" @click="isMenuOpen = false">
                <span>문의하기</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
              <a href="tel:02-766-4789" class="mobile-menu-phone">
                02-766-4789
              </a>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="mobile-menu-decor">
            <div class="mobile-menu-decor-line"></div>
            <div class="mobile-menu-decor-glow"></div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Hero Section -->
    <section class="hero" :class="{ loaded: heroLoaded }">
      <div class="hero-bg">
        <NuxtImg
          src="/Image/set/pexels-jeremy-wong-382920-1043902.jpg"
          alt="귀족 - 종로 귀금속 도매 전문점"
          class="hero-image"
          format="webp"
          quality="95"
          sizes="100vw"
          preload
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
          <span class="title-line">귀</span>
          <span class="title-line">족</span>
        </h1>

        <p class="hero-subtitle">종로 귀금속 도매의 품격</p>

        <div class="hero-cta">
          <a href="tel:02-766-4789" class="btn-magnetic">
            <span class="btn-text">전화 상담</span>
            <span class="btn-glow"></span>
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

    <!-- About Section -->
    <section id="about" class="section-about">
      <div class="container-lg">
        <div class="about-grid">
          <div class="about-visual">
            <div class="visual-frame reveal reveal-left">
              <NuxtImg
                src="/Image/ring/pexels-leah-newhouse-50725-691046.jpg"
                alt="귀금속 반지 세공 작업"
                format="webp"
                quality="95"
                sizes="sm:100vw md:50vw lg:600px"
                loading="lazy"
              />
              <div class="frame-border"></div>
            </div>
            <div class="visual-accent"></div>
          </div>

          <div class="about-content">
            <span class="section-label reveal">About Us</span>
            <h2 class="section-title reveal reveal-delay-1">
              20년간 한 자리에서<br>
              <em>신뢰</em>를 쌓아왔습니다
            </h2>
            <p class="section-desc reveal reveal-delay-2">
              종묘귀금속상가에서 시작한 귀족은 도매 거래의 본질에 집중해왔습니다.
              정확한 납기, 일관된 품질, 투명한 가격으로 500개 이상의 파트너사와 함께하고 있습니다.
            </p>

            <div class="stats-row reveal reveal-delay-3">
              <div class="stat-item">
                <span class="stat-number">20<sup>+</sup></span>
                <span class="stat-label">Years</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">500<sup>+</sup></span>
                <span class="stat-label">Partners</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">10K<sup>+</sup></span>
                <span class="stat-label">Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-services">
      <div class="services-bg">
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
      </div>

      <div class="container-lg">
        <div class="services-header">
          <span class="section-label reveal">Our Services</span>
          <h2 class="section-title-light reveal reveal-delay-1">취급 품목</h2>
          <p class="section-desc-light reveal reveal-delay-2">최고급 소재와 장인의 손길로 완성되는 귀금속</p>
        </div>

        <div class="services-grid">
          <div class="service-card tilt-card reveal reveal-delay-1">
            <div class="card-inner">
              <div class="card-icon">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1">
                  <circle cx="30" cy="30" r="20"/>
                  <circle cx="30" cy="30" r="8"/>
                  <path d="M30 10v5M30 45v5M10 30h5M45 30h5"/>
                </svg>
              </div>
              <h3 class="card-title">반지</h3>
              <p class="card-desc">웨딩밴드, 약혼반지, 시그넷 링 등<br>모든 종류의 반지 도매</p>
              <div class="card-glow"></div>
            </div>
          </div>

          <div class="service-card tilt-card reveal reveal-delay-2">
            <div class="card-inner">
              <div class="card-icon">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1">
                  <path d="M30 10v40"/>
                  <circle cx="30" cy="50" r="6"/>
                  <path d="M20 20c5-5 15-5 20 0"/>
                </svg>
              </div>
              <h3 class="card-title">목걸이</h3>
              <p class="card-desc">체인, 펜던트, 초커 등<br>다양한 스타일의 목걸이</p>
              <div class="card-glow"></div>
            </div>
          </div>

          <div class="service-card tilt-card reveal reveal-delay-3">
            <div class="card-inner">
              <div class="card-icon">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1">
                  <circle cx="30" cy="25" r="12"/>
                  <path d="M30 37v15"/>
                  <circle cx="30" cy="25" r="5"/>
                </svg>
              </div>
              <h3 class="card-title">귀걸이</h3>
              <p class="card-desc">스터드, 드롭, 후프 등<br>트렌디한 귀걸이 컬렉션</p>
              <div class="card-glow"></div>
            </div>
          </div>

          <div class="service-card tilt-card reveal reveal-delay-4">
            <div class="card-inner">
              <div class="card-icon">
                <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1">
                  <ellipse cx="30" cy="30" rx="25" ry="8"/>
                  <path d="M5 30c0 4 11 8 25 8s25-4 25-8"/>
                </svg>
              </div>
              <h3 class="card-title">팔찌</h3>
              <p class="card-desc">뱅글, 체인, 커프 등<br>고급스러운 팔찌 라인업</p>
              <div class="card-glow"></div>
            </div>
          </div>
        </div>

        <div class="services-cta reveal reveal-delay-5">
          <NuxtLink to="/gallery" class="btn-gold">
            <span>전체 갤러리 보기</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section class="section-gallery">
      <div class="container-lg">
        <div class="gallery-header">
          <div class="gallery-title-wrap">
            <span class="section-label reveal">Gallery</span>
            <h2 class="section-title reveal reveal-delay-1">귀금속 컬렉션</h2>
          </div>
          <NuxtLink to="/gallery" class="btn-text reveal reveal-delay-2">
            <span>전체 보기</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="gallery-showcase">
          <div
            v-for="(item, index) in previewItems"
            :key="item.id"
            class="gallery-item reveal"
            :class="[
              index === 0 ? 'gallery-item-lg' : '',
              index > 0 ? `reveal-delay-${index}` : ''
            ]"
          >
            <div class="item-image">
              <NuxtImg
                :src="item.images[0]"
                :alt="item.title"
                format="webp"
                quality="95"
                sizes="sm:50vw md:33vw lg:400px"
                loading="lazy"
              />
            </div>
            <div class="item-overlay">
              <span class="item-category">{{ item.titleEn.split(' ')[0] }}</span>
              <h3 class="item-title">{{ item.title }}</h3>
            </div>
          </div>
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
              서울 종로구 종로 173<br>
              종묘귀금속백화점 <em>101호</em>
            </address>

            <ul class="contact-info reveal reveal-delay-3">
              <li>
                <span class="info-label">Tel</span>
                <a href="tel:02-766-4789">02-766-4789</a>
              </li>
              <li>
                <span class="info-label">Hours</span>
                <span>평일·토요일 10:00 – 19:00</span>
              </li>
            </ul>

            <div class="map-buttons reveal reveal-delay-4">
              <a href="https://map.kakao.com/link/search/서울 종로구 종로 173 귀족" target="_blank" rel="noopener" class="btn-map">
                <span>카카오맵</span>
              </a>
              <a href="https://naver.me/xen7hRCZ" target="_blank" rel="noopener" class="btn-map">
                <span>네이버지도</span>
              </a>
            </div>
          </div>

          <div class="location-visual reveal reveal-right">
            <div class="map-wrapper">
              <iframe
                src="https://www.google.com/maps?q=서울+종로구+종로+173+종묘귀금속백화점&output=embed"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="귀족 귀금속 위치 - 종로구 종로 173 종묘귀금속백화점"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-cta">
      <div class="cta-bg">
        <div class="cta-gradient"></div>
      </div>
      <div class="container-lg">
        <div class="cta-content">
          <h2 class="cta-title reveal">
            <span>지금</span>
            <em>문의</em>
            <span>하세요</span>
          </h2>
          <p class="cta-desc reveal reveal-delay-1">
            도매 상담, 주문 제작, 수리 문의 등<br>
            무엇이든 편하게 연락주세요.
          </p>
          <div class="cta-buttons reveal reveal-delay-2">
            <a href="tel:02-766-4789" class="btn-gold btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>전화 상담</span>
            </a>
            <NuxtLink to="/contact" class="btn-outline-light btn-lg">
              <span>온라인 문의</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container-lg">
        <div class="footer-top">
          <div class="footer-brand">
            <span class="brand-name">귀족</span>
          </div>
          <div class="footer-nav">
            <NuxtLink to="/">홈</NuxtLink>
            <NuxtLink to="/gallery">갤러리</NuxtLink>
            <NuxtLink to="/contact">문의하기</NuxtLink>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="copyright">© 2024 귀족. All rights reserved.</span>
          <NuxtLink to="/privacy" class="privacy-link">개인정보처리방침</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- Mobile CTA -->
    <div class="mobile-cta" :class="{ visible: showMobileCta }">
      <a href="tel:02-766-4789" class="mobile-btn mobile-btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>전화</span>
      </a>
      <NuxtLink to="/contact" class="mobile-btn mobile-btn-secondary">
        <span>문의</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}

.container-lg {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* ===== Navigation ===== */
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
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  padding: 16px clamp(20px, 5vw, 60px);
  border-bottom: 1px solid rgba(201, 162, 39, 0.1);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  gap: 2px;
}

.logo-text {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 28px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: 0.15em;
}


.nav-links.desktop-nav {
  display: none;
  align-items: center;
  gap: 40px;
}

@media (min-width: 900px) {
  .nav-links.desktop-nav {
    display: flex;
  }
}

.nav-link {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(250, 250, 250, 0.7);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
  padding: 8px 4px;
  z-index: 10;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: #c9a227;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover {
  color: #fafafa;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: 700;
  color: #0a0a0a;
  background: #c9a227;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-cta:hover {
  background: #fafafa;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(201, 162, 39, 0.3);
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1002;
}

@media (min-width: 900px) {
  .nav-toggle {
    display: none;
  }
}

.nav-toggle span {
  width: 28px;
  height: 2px;
  background: #fafafa;
  transition: all 0.3s;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
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
  width: 100%;
  height: 120%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.1);
  transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero.loaded .hero-image {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.4) 0%,
    rgba(10, 10, 10, 0.2) 40%,
    rgba(10, 10, 10, 0.6) 100%
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
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(100px, 20vw, 200px);
  font-weight: 300;
  line-height: 1;
  color: #fafafa;
  text-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(60px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero.loaded .title-line:nth-child(1) {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

.hero.loaded .title-line:nth-child(2) {
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
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
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
  background: linear-gradient(135deg, #e5c654 0%, #d4af37 100%);
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
  font-size: 10px;
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

/* ===== About Section ===== */
.section-about {
  padding: 160px 0;
  background: #0a0a0a;
  overflow: hidden;
}

.about-grid {
  display: grid;
  gap: 80px;
  align-items: center;
}

@media (min-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.about-visual {
  position: relative;
}

.visual-frame {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
}

.visual-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame-border {
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(201, 162, 39, 0.3);
  pointer-events: none;
}

.visual-accent {
  position: absolute;
  bottom: -40px;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

@media (min-width: 768px) {
  .visual-accent {
    right: -40px;
    width: 200px;
    height: 200px;
  }
}

.about-content {
  max-width: 560px;
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
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  line-height: 1.3;
  color: #fafafa;
  margin-bottom: 24px;
}

.section-title em {
  font-style: italic;
  color: #c9a227;
}

.section-desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(250, 250, 250, 0.6);
}

.stats-row {
  display: flex;
  gap: 40px;
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid rgba(250, 250, 250, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-number {
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(36px, 4vw, 48px);
  font-weight: 300;
  color: #fafafa;
}

.stat-number sup {
  font-size: 0.5em;
  color: #c9a227;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.4);
}

.stat-divider {
  width: 1px;
  background: rgba(250, 250, 250, 0.1);
}

/* ===== Services Section ===== */
.section-services {
  position: relative;
  padding: 160px 0;
  background: #0a0a0a;
  overflow: hidden;
}

.services-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.gradient-orb-1 {
  top: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: rgba(201, 162, 39, 0.08);
}

.gradient-orb-2 {
  bottom: -100px;
  right: -100px;
  width: 250px;
  height: 250px;
  background: rgba(201, 162, 39, 0.06);
}

@media (min-width: 768px) {
  .gradient-orb-1 {
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
  }
  .gradient-orb-2 {
    bottom: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
  }
}

.services-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title-light {
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 16px;
}

.section-desc-light {
  font-size: 16px;
  font-weight: 300;
  color: rgba(250, 250, 250, 0.5);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (min-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service-card {
  position: relative;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-inner {
  position: relative;
  padding: 48px 28px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  text-align: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .card-inner {
  background: rgba(250, 250, 250, 0.05);
  border-color: rgba(201, 162, 39, 0.3);
}

.card-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 24px;
  color: #c9a227;
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.card-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 13px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.5);
}

.card-glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  width: 150px;
  height: 100px;
  background: radial-gradient(ellipse, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}

.service-card:hover .card-glow {
  opacity: 1;
}

.services-cta {
  text-align: center;
  margin-top: 60px;
}

.btn-gold {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  border: none;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e5c654 0%, #d4af37 100%);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201, 162, 39, 0.35);
}

.btn-gold:hover::before {
  opacity: 1;
}

.btn-gold span,
.btn-gold svg {
  position: relative;
  z-index: 1;
}

/* ===== Gallery Section ===== */
.section-gallery {
  padding: 160px 0;
  background: #0f0f0f;
  overflow: hidden;
}

.gallery-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 60px;
  flex-wrap: wrap;
  gap: 24px;
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

.gallery-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (min-width: 900px) {
  .gallery-showcase {
    grid-template-columns: 1.5fr 1fr 1fr;
    grid-template-rows: repeat(2, 280px);
  }

  .gallery-item-lg {
    grid-row: span 2;
  }
}

.gallery-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.item-image {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-item:hover .item-image img {
  transform: scale(1.08);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-item:hover .item-overlay {
  opacity: 1;
  transform: translateY(0);
}

.item-category {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 8px;
}

.item-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 20px;
  font-weight: 300;
  color: #fafafa;
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
  font-family: 'JeonjuCraftMyungjo';
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
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
  font-size: 15px;
  color: rgba(250, 250, 250, 0.7);
}

.info-label {
  min-width: 60px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.4);
}

.contact-info a {
  color: #fafafa;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-info a:hover {
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

/* ===== CTA Section ===== */
.section-cta {
  position: relative;
  padding: 180px 0;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%);
}

.cta-content {
  position: relative;
  text-align: center;
}

.cta-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 24px;
  line-height: 1.2;
}

.cta-title em {
  font-style: italic;
  color: #c9a227;
}

.cta-desc {
  font-size: 17px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 48px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 20px 44px;
  font-size: 15px;
}

.btn-outline-light {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 17px 36px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fafafa;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.25);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-outline-light::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(250, 250, 250, 0.08);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-outline-light:hover {
  border-color: rgba(250, 250, 250, 0.6);
}

.btn-outline-light:hover::before {
  transform: scaleX(1);
}

.btn-outline-light span,
.btn-outline-light svg {
  position: relative;
  z-index: 1;
}

/* ===== Footer ===== */
.footer {
  background: #050505;
  padding: 60px 0;
  border-top: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 24px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: 0.1em;
}

.brand-sub {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #c9a227;
}

.footer-nav {
  display: flex;
  gap: 32px;
}

.footer-nav a {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-nav a:hover {
  color: #fafafa;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
}

.privacy-link {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  text-decoration: none;
  transition: color 0.3s;
}

.privacy-link:hover {
  color: #fafafa;
}

/* ===== Mobile CTA ===== */
.mobile-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  gap: 1px;
  background: #0a0a0a;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 12px;
  border-top: 1px solid rgba(201, 162, 39, 0.2);
}

.mobile-cta.visible {
  transform: translateY(0);
}

@media (min-width: 900px) {
  .mobile-cta {
    display: none;
  }
}

.mobile-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
}

.mobile-btn-primary {
  background: #c9a227;
  color: #0a0a0a;
}

.mobile-btn-secondary {
  background: transparent;
  color: #fafafa;
  border: 1px solid rgba(250, 250, 250, 0.2);
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

/* ===== Mobile Responsive ===== */
@media (max-width: 1023px) {
  .section-about,
  .section-services,
  .section-gallery,
  .section-location {
    padding: 80px 0;
  }

  .section-cta {
    padding: 100px 0;
  }

  .about-grid,
  .location-grid {
    gap: 40px;
  }

  .services-grid {
    gap: 16px;
  }

  .gallery-header {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: clamp(28px, 5vw, 40px);
  }

  .section-desc {
    font-size: 14px;
  }

  .stats-row {
    gap: 24px;
  }

  .stat-number {
    font-size: 36px;
  }

  .cta-title {
    font-size: clamp(36px, 8vw, 60px);
  }
}

@media (max-width: 640px) {
  .section-about,
  .section-services,
  .section-gallery,
  .section-location {
    padding: 60px 0;
  }

  .section-cta {
    padding: 80px 0;
  }

  .container-lg {
    padding: 0 20px;
  }

  .hero-cta {
    flex-direction: column;
    gap: 12px;
  }

  .btn-magnetic,
  .btn-outline-gold {
    width: 100%;
    justify-content: center;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .gallery-showcase {
    gap: 12px;
  }

  .stats-row {
    flex-wrap: wrap;
    gap: 16px;
  }

  .stat-divider {
    display: none;
  }

  .footer-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .footer-nav {
    gap: 16px;
  }
}
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
  font-family: 'JeonjuCraftMyungjo';
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
  font-family: 'JeonjuCraftMyungjo';
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.3);
  transition: color 0.3s;
}

.mobile-menu-link-text {
  font-family: 'JeonjuCraftMyungjo';
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
  font-family: 'JeonjuCraftMyungjo';
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  text-decoration: none;
  transition: all 0.3s;
}

.mobile-menu-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.mobile-menu-phone {
  font-family: 'JeonjuCraftMyungjo';
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
