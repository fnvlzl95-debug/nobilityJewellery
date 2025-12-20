<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

useHead({
  title: '귀족 | 종로 귀금속 도매',
  meta: [
    { name: 'description', content: '종로 귀금속 도매 · 20년 신뢰의 거래' }
  ]
})

const showMobileCta = ref(false)
const isMenuOpen = ref(false)
const isScrolled = ref(false)

let lenis: Lenis | null = null
let rafId: number | null = null

const scrollTo = (id: string) => {
  isMenuOpen.value = false
  const target = document.getElementById(id)
  if (target && lenis) {
    lenis.scrollTo(target)
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  lenis.on('scroll', ({ scroll }: { scroll: number }) => {
    showMobileCta.value = scroll > window.innerHeight * 0.5
    isScrolled.value = scroll > 100
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
})
</script>

<template>
  <div class="page">
    <!-- Navigation -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <NuxtLink to="/" class="nav-brand">귀족</NuxtLink>
      <div class="nav-menu" :class="{ open: isMenuOpen }">
        <button @click="scrollTo('about')" class="nav-link">소개</button>
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <button @click="scrollTo('location')" class="nav-link">오시는 길</button>
        <NuxtLink to="/contact" class="nav-link nav-link--cta">문의하기</NuxtLink>
      </div>
      <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="메뉴">
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/Image/pexels-jeremy-wong-382920-1043902.jpg" alt="귀금속" class="hero-image">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-tag">Since 2004 · Jongno</p>
        <h1 class="hero-title">귀족</h1>
        <p class="hero-sub">종로 귀금속 도매</p>
        <div class="hero-btns">
          <a href="tel:02-XXX-XXXX" class="btn btn--gold">전화 상담</a>
          <NuxtLink to="/contact" class="btn btn--outline">문의하기</NuxtLink>
        </div>
      </div>
      <button @click="scrollTo('about')" class="scroll-down" aria-label="스크롤">
        <svg width="20" height="30" viewBox="0 0 20 30"><path d="M10 0v28M2 20l8 8 8-8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
      </button>
    </section>

    <!-- About -->
    <section id="about" class="section">
      <div class="container">
        <div class="about">
          <div class="about-img fade-in">
            <img src="/Image/pexels-leah-newhouse-50725-691046.jpg" alt="귀금속 작업">
          </div>
          <div class="about-text">
            <span class="label fade-in">About</span>
            <h2 class="title fade-in">20년간 한 자리에서<br><em>신뢰</em>를 쌓아왔습니다</h2>
            <p class="desc fade-in">종묘귀금속상가에서 시작한 귀족은 도매 거래의 본질에 집중해왔습니다. 정확한 납기, 일관된 품질, 투명한 가격으로 500개 이상의 파트너사와 함께하고 있습니다.</p>
            <div class="stats fade-in">
              <div class="stat">
                <strong>20+</strong>
                <span>Years</span>
              </div>
              <div class="stat">
                <strong>500+</strong>
                <span>Partners</span>
              </div>
              <div class="stat">
                <strong>10K+</strong>
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="section section--dark">
      <div class="container">
        <span class="label fade-in">Services</span>
        <h2 class="title title--light fade-in">취급 품목</h2>
        <div class="services">
          <div class="service fade-in">
            <h3>반지</h3>
            <p>웨딩밴드, 약혼반지, 시그넷 링 등</p>
          </div>
          <div class="service fade-in">
            <h3>목걸이</h3>
            <p>체인, 펜던트, 초커 등</p>
          </div>
          <div class="service fade-in">
            <h3>귀걸이</h3>
            <p>스터드, 드롭, 후프 등</p>
          </div>
          <div class="service fade-in">
            <h3>팔찌</h3>
            <p>뱅글, 체인, 커프 등</p>
          </div>
        </div>
        <div class="services-cta fade-in">
          <NuxtLink to="/gallery" class="btn btn--gold">갤러리 보기</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Preview Gallery -->
    <section class="section section--gallery">
      <div class="container">
        <div class="gallery-header">
          <div>
            <span class="label fade-in">Gallery</span>
            <h2 class="title fade-in">귀금속</h2>
          </div>
          <NuxtLink to="/gallery" class="btn btn--dark fade-in">전체 보기</NuxtLink>
        </div>
        <div class="gallery-grid">
          <div class="gallery-item fade-in">
            <img src="/Image/pexels-pixabay-265856.jpg" alt="18K 골드 웨딩밴드">
            <div class="gallery-item-info">
              <span>Ring</span>
              <h4>18K 골드 웨딩밴드</h4>
            </div>
          </div>
          <div class="gallery-item fade-in">
            <img src="/Image/pexels-pixabay-266621.jpg" alt="다이아몬드 솔리테어">
            <div class="gallery-item-info">
              <span>Ring</span>
              <h4>다이아몬드 솔리테어</h4>
            </div>
          </div>
          <div class="gallery-item fade-in">
            <img src="/Image/pexels-pixabay-248077.jpg" alt="14K 체인 네크리스">
            <div class="gallery-item-info">
              <span>Necklace</span>
              <h4>14K 체인 네크리스</h4>
            </div>
          </div>
          <div class="gallery-item fade-in">
            <img src="/Image/pexels-pixabay-265906.jpg" alt="순금 뱅글 브레이슬릿">
            <div class="gallery-item-info">
              <span>Bracelet</span>
              <h4>순금 뱅글</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location -->
    <section id="location" class="section">
      <div class="container">
        <div class="location">
          <div class="location-info">
            <span class="label fade-in">Location</span>
            <h2 class="title fade-in">오시는 길</h2>
            <address class="address fade-in">
              서울특별시 종로구 종로 XXX<br>
              종묘귀금속상가 X층 XXX호
            </address>
            <ul class="contact-list fade-in">
              <li><strong>Tel</strong> <a href="tel:02-XXX-XXXX">02-XXX-XXXX</a></li>
              <li><strong>Mobile</strong> <a href="tel:010-XXXX-XXXX">010-XXXX-XXXX</a></li>
              <li><strong>Hours</strong> 평일 10:00 – 18:00</li>
            </ul>
            <div class="map-btns fade-in">
              <a href="https://map.kakao.com/" target="_blank" rel="noopener" class="btn btn--outline-dark">카카오맵</a>
              <a href="https://map.naver.com/" target="_blank" rel="noopener" class="btn btn--outline-dark">네이버지도</a>
            </div>
          </div>
          <div class="location-img fade-in">
            <img src="/Image/pexels-wendelmoretti-1730877.jpg" alt="매장">
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--cta">
      <div class="container">
        <h2 class="cta-title fade-in">문의하기</h2>
        <p class="cta-desc fade-in">도매 상담, 주문 제작, 수리 문의 등<br>무엇이든 편하게 연락주세요.</p>
        <div class="cta-btns fade-in">
          <a href="tel:02-XXX-XXXX" class="btn btn--gold">전화 상담</a>
          <NuxtLink to="/contact" class="btn btn--outline">온라인 문의</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-brand">귀족</span>
        <div class="footer-links">
          <NuxtLink to="/gallery">갤러리</NuxtLink>
          <NuxtLink to="/contact">문의하기</NuxtLink>
          <NuxtLink to="/privacy">개인정보처리방침</NuxtLink>
        </div>
        <span class="footer-copy">© 2024 귀족. All rights reserved.</span>
      </div>
    </footer>

    <!-- Mobile CTA -->
    <div class="mobile-cta" :class="{ visible: showMobileCta }">
      <a href="tel:02-XXX-XXXX" class="mobile-cta-btn">전화 상담</a>
      <NuxtLink to="/contact" class="mobile-cta-btn mobile-cta-btn--alt">문의하기</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Base */
.page {
  background: #f8f6f3;
  color: #1a1a1a;
  font-family: 'Pretendard Variable', -apple-system, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 100px 0;
}

.section--dark {
  background: #1a1a1a;
  color: #ffffff;
}

.section--gallery {
  background: #efece7;
}

.section--cta {
  background: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 120px 0;
}

/* Typography */
.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 16px;
}

.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 400;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.title--light {
  color: #ffffff;
}

.title em {
  font-style: italic;
  color: #b8860b;
}

.desc {
  font-size: 15px;
  line-height: 1.8;
  color: #555555;
  max-width: 480px;
}

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  transition: all 0.3s ease;
}

.nav.scrolled {
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px 32px;
}

.nav-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.nav-menu {
  display: none;
  gap: 36px;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
    align-items: center;
  }
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #ffffff;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: color 0.2s;
}

.nav-link:hover {
  color: #b8860b;
}

.nav-link--cta {
  background: #b8860b;
  color: #ffffff !important;
  padding: 10px 20px;
  text-shadow: none;
}

.nav-link--cta:hover {
  background: #9a7209;
}

.nav-toggle {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
}

.nav-toggle span {
  width: 24px;
  height: 2px;
  background: #ffffff;
  border-radius: 1px;
}

/* Mobile Menu */
.nav-menu.open {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1a1a1a;
  align-items: center;
  justify-content: center;
  gap: 32px;
  z-index: 1001;
}

.nav-menu.open .nav-link {
  font-size: 24px;
  text-shadow: none;
}

.nav-menu.open .nav-link--cta {
  font-size: 18px;
}

/* Hero */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
  padding: 24px;
  animation: fadeUp 1s ease forwards;
}

.hero-tag {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 20px;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(72px, 18vw, 160px);
  font-weight: 300;
  line-height: 0.9;
  color: #ffffff;
  margin-bottom: 12px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.hero-sub {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.9);
  margin-bottom: 40px;
}

.hero-btns {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.scroll-down {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.8;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn--gold {
  background: #b8860b;
  color: #ffffff;
}

.btn--gold:hover {
  background: #9a7209;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
}

.btn--dark {
  background: #1a1a1a;
  color: #ffffff;
}

.btn--dark:hover {
  background: #333333;
}

.btn--outline {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255,255,255,0.6);
}

.btn--outline:hover {
  background: rgba(255,255,255,0.15);
  border-color: #ffffff;
}

.btn--outline-dark {
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
}

.btn--outline-dark:hover {
  background: #1a1a1a;
  color: #ffffff;
}

/* About */
.about {
  display: grid;
  gap: 60px;
  align-items: center;
}

@media (min-width: 768px) {
  .about {
    grid-template-columns: 1fr 1fr;
  }
}

.about-img {
  aspect-ratio: 4/5;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.about-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-text {
  max-width: 500px;
}

.stats {
  display: flex;
  gap: 40px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e0ddd8;
}

.stat strong {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 400;
  color: #1a1a1a;
}

.stat span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888888;
}

/* Services */
.services {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 48px;
}

@media (min-width: 768px) {
  .services {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service {
  background: rgba(255,255,255,0.08);
  padding: 40px 24px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.1);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.service:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(184, 134, 11, 0.3);
}

.service h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 12px;
}

.service p {
  font-size: 13px;
  color: #aaaaaa;
  line-height: 1.6;
}

.services-cta {
  text-align: center;
  margin-top: 48px;
}

/* Gallery */
.gallery-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-out;
  will-change: transform;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-item-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  color: #ffffff;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.gallery-item:hover .gallery-item-info {
  opacity: 1;
  transform: translateY(0);
}

.gallery-item-info span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #b8860b;
}

.gallery-item-info h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 6px;
}

/* Location */
.location {
  display: grid;
  gap: 60px;
  align-items: center;
}

@media (min-width: 768px) {
  .location {
    grid-template-columns: 1fr 1fr;
  }
}

.address {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(22px, 3vw, 30px);
  font-style: normal;
  line-height: 1.5;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.contact-list {
  list-style: none;
  margin-bottom: 24px;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #e0ddd8;
  font-size: 15px;
  color: #333333;
}

.contact-list strong {
  min-width: 60px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888888;
}

.contact-list a {
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 500;
}

.contact-list a:hover {
  color: #b8860b;
}

.map-btns {
  display: flex;
  gap: 12px;
}

.location-img {
  aspect-ratio: 1;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.location-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.location-img:hover img {
  transform: scale(1.03);
}

/* CTA */
.cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 16px;
}

.cta-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #aaaaaa;
  margin-bottom: 36px;
}

.cta-btns {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Footer */
.footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 48px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #ffffff;
}

.footer-links {
  display: flex;
  gap: 28px;
}

.footer-links a {
  font-size: 14px;
  color: #888888;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-copy {
  font-size: 13px;
  color: #666666;
}

/* Mobile CTA */
.mobile-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #1a1a1a;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.mobile-cta.visible {
  transform: translateY(0);
}

@media (min-width: 768px) {
  .mobile-cta {
    display: none;
  }
}

.mobile-cta-btn {
  flex: 1;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  background: #b8860b;
  color: #ffffff;
}

.mobile-cta-btn--alt {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255,255,255,0.4);
}

/* Fade In Animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  will-change: opacity, transform;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
