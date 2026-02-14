<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '~/config/site'

const route = useRoute()

const currentPage = computed(() => {
  const path = route.path.split('/').filter(Boolean)[0] || 'home'
  return path
})

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Watch menu state for scroll lock
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    (document.activeElement as HTMLElement)?.blur()
  }
})

const navLinks = [
  { to: '/', label: '홈', key: 'home' },
  { to: '/gallery', label: '갤러리', key: 'gallery' },
  { to: '/guide', label: '가이드', key: 'guide' },
  { to: '/buy-gold', label: '금 매입', key: 'buy-gold' },
  { to: '/faq', label: 'FAQ', key: 'faq' },
  { to: '/contact', label: '문의하기', key: 'contact' }
]

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="nav-luxury" :class="{ scrolled: isScrolled }">
    <NuxtLink to="/" class="nav-logo">
      <span class="logo-text">귀족</span>
    </NuxtLink>
    <div class="nav-links">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.key"
        :to="link.to"
        class="nav-link"
        :class="{ active: currentPage === link.key }"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
    <!-- Mobile Toggle -->
    <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="메뉴" :class="{ active: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile Menu -->
  <Teleport to="body">
    <Transition name="menu-fade">
      <div v-if="isMenuOpen" class="mobile-menu-overlay">
        <!-- Close Button -->
        <button class="mobile-menu-close" @click="closeMenu" aria-label="닫기">
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
            <NuxtLink
              v-for="(link, index) in navLinks"
              :key="link.key"
              :to="link.to"
              class="mobile-menu-link"
              @click="closeMenu"
            >
              <span class="mobile-menu-link-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="mobile-menu-link-text">{{ link.label }}</span>
            </NuxtLink>
          </nav>

          <!-- CTA -->
          <div class="mobile-menu-footer">
            <a :href="`tel:${siteConfig.phone}`" class="mobile-menu-phone">
              {{ siteConfig.phone }}
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
</template>

<style scoped>
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
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
}

.nav-luxury.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
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

/* Mobile Toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1002;
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

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-toggle {
    display: flex;
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
  font-family: 'JeonjuCraftMyungjo', serif;
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
  font-family: 'JeonjuCraftMyungjo', serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.6);
  transition: color 0.3s;
}

.mobile-menu-link-text {
  font-family: 'JeonjuCraftMyungjo', serif;
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

.mobile-menu-phone {
  font-family: 'JeonjuCraftMyungjo', serif;
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

@media (min-width: 769px) {
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
