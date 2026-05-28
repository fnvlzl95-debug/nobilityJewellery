<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { siteConfig } from '~/config/site'

const route = useRoute()
const { trackKakaoClick, trackPhoneClick, trackMapClick } = useGtag()

const naverMapUrl = 'https://naver.me/xen7hRCZ'
const staticPaths = new Set([
  '/',
  '/gallery',
  '/repair',
  '/custom',
  '/wholesale',
  '/couple-ring',
  '/baby-gold',
  '/wedding',
])

const normalizedPath = computed(() => {
  if (route.path === '/') return '/'
  return route.path.replace(/\/$/, '')
})

const pathSegments = computed(() => normalizedPath.value.split('/').filter(Boolean))
const isGuideDetail = computed(() => pathSegments.value[0] === 'guide' && pathSegments.value.length === 2)
const shouldShow = computed(() => staticPaths.has(normalizedPath.value) || isGuideDetail.value)
const hasKakaoLink = computed(() => Boolean(siteConfig.social.kakaoOpenChat))

const pageName = computed(() => {
  if (normalizedPath.value === '/') return 'home'
  return pathSegments.value.join('_')
})

const intent = computed(() => {
  const path = normalizedPath.value
  if (path.includes('repair') || path.includes('plating') || path.includes('chain') || path.includes('size')) return 'repair'
  if (path.includes('wholesale')) return 'wholesale'
  if (path.includes('custom') || path.includes('couple-ring') || path.includes('baby-gold') || path.includes('wedding') || path.includes('gallery')) return 'custom'
  return 'general'
})

const topic = computed(() => {
  if (normalizedPath.value === '/') return '종로 귀금속 상담'
  if (isGuideDetail.value) return pathSegments.value[1]
  return pathSegments.value[0]
})

const applyBodyOffset = () => {
  if (!import.meta.client) return
  document.body.classList.toggle('has-mobile-conversion-bar', shouldShow.value)
}

watch(shouldShow, applyBodyOffset, { immediate: true })

onMounted(applyBodyOffset)

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.classList.remove('has-mobile-conversion-bar')
})

const handleKakaoClick = () => {
  trackKakaoClick(pageName.value, {
    placement: 'mobile_bar',
    intent: intent.value,
    topic: topic.value,
  })
}

const handlePhoneClick = () => {
  trackPhoneClick(pageName.value, {
    placement: 'mobile_bar',
    intent: intent.value,
    topic: topic.value,
  })
}

const handleNaverMapClick = () => {
  trackMapClick(pageName.value, 'naver', {
    placement: 'mobile_bar',
    intent: 'directions',
    topic: topic.value,
    destination: naverMapUrl,
  })
}
</script>

<template>
  <div v-if="shouldShow" class="mobile-conversion-bar" role="navigation" aria-label="빠른 상담">
    <a
      v-if="hasKakaoLink"
      :href="siteConfig.social.kakaoOpenChat"
      target="_blank"
      rel="noopener"
      class="conversion-action conversion-action-kakao"
      @click="handleKakaoClick"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.53c-.08.31.26.56.52.38l4.16-2.76c.52.05 1.06.1 1.6.1 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
      </svg>
      <span>카톡상담</span>
    </a>

    <a
      :href="`tel:${siteConfig.phone}`"
      class="conversion-action conversion-action-phone"
      @click="handlePhoneClick"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span>전화</span>
    </a>

    <a
      :href="naverMapUrl"
      target="_blank"
      rel="noopener"
      class="conversion-action conversion-action-map"
      @click="handleNaverMapClick"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-4.52 7-11a7 7 0 1 0-14 0c0 6.48 7 11 7 11z"/>
        <circle cx="12" cy="10" r="2.4"/>
      </svg>
      <span>오시는 길</span>
    </a>
  </div>
</template>

<style scoped>
.mobile-conversion-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr) minmax(0, 0.95fr);
  gap: 8px;
  padding: 10px 10px calc(10px + env(safe-area-inset-bottom));
  background: rgba(10, 10, 10, 0.94);
  border-top: 1px solid rgba(250, 250, 250, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);
}

.conversion-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  min-height: 52px;
  padding: 0 10px;
  color: #fafafa;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  border: 1px solid rgba(250, 250, 250, 0.14);
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.24s ease, background-color 0.24s ease;
}

.conversion-action:active {
  transform: scale(0.98);
}

.conversion-action svg {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
}

.conversion-action-kakao {
  color: #2f1b12;
  background: #fee500;
  border-color: #fee500;
}

.conversion-action-kakao svg {
  fill: currentColor;
}

.conversion-action-phone,
.conversion-action-map {
  background: rgba(250, 250, 250, 0.035);
}

.conversion-action-phone svg,
.conversion-action-map svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 900px) {
  .mobile-conversion-bar {
    display: none;
  }
}

@media (max-width: 899px) {
  :global(body.has-mobile-conversion-bar) {
    padding-bottom: calc(72px + env(safe-area-inset-bottom));
  }
}
</style>
