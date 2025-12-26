<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  activePage?: string
}

const props = withDefaults(defineProps<Props>(), {
  activePage: ''
})

const route = useRoute()

// activePage prop이 없으면 현재 라우트에서 자동 감지
const currentPage = computed(() => {
  if (props.activePage) return props.activePage
  const path = route.path.replace('/', '') || 'home'
  return path
})

const isScrolled = ref(false)

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

const navLinks = [
  { to: '/', label: '홈', key: 'home' },
  { to: '/gallery', label: '갤러리', key: 'gallery' },
  { to: '/buy-gold', label: '금 매입', key: 'buy-gold' },
  { to: '/baby-gold', label: '돌반지', key: 'baby-gold' },
  { to: '/faq', label: 'FAQ', key: 'faq' },
  { to: '/contact', label: '문의하기', key: 'contact' }
]
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
  </nav>
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
</style>
