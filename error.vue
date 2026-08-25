<script setup lang="ts">
import type { NuxtError } from '#app'
import { siteConfig } from '~/config/site'

const { trackPhoneClick, trackKakaoClick } = useGtag()
const handleErrorPhoneClick = () => trackPhoneClick('error', {
  placement: 'error_page',
  intent: 'support',
  destination: `tel:${siteConfig.phone}`,
})
const handleErrorKakaoClick = () => trackKakaoClick('error', {
  placement: 'error_page',
  intent: 'support',
  destination: siteConfig.social.kakaoOpenChat,
})

const props = defineProps<{
  error: NuxtError
}>()

useHead({
  title: props.error.statusCode === 404
    ? '페이지를 찾을 수 없습니다 | 귀족'
    : '오류가 발생했습니다 | 귀족',
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

const popularLinks = [
  { to: '/baby-gold', label: '돌반지' },
  { to: '/couple-ring', label: '커플링' },
  { to: '/buy-gold', label: '금·은 매입' },
  { to: '/guide', label: '주얼리 가이드' },
]

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <span class="error-code">{{ error.statusCode }}</span>
      <h1 class="error-title">
        {{ error.statusCode === 404 ? '페이지를 찾을 수 없습니다' : '오류가 발생했습니다' }}
      </h1>
      <p class="error-message">
        {{ error.statusCode === 404
          ? '요청하신 페이지가 존재하지 않거나 이동되었습니다.'
          : '잠시 후 다시 시도해 주세요.'
        }}
      </p>
      <button @click="handleError" class="error-button">
        <span>홈으로 돌아가기</span>
      </button>

      <div class="error-cta">
        <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="error-cta-link" @click="handleErrorKakaoClick">
          카카오톡 문의
        </a>
        <a :href="`tel:${siteConfig.phone}`" class="error-cta-link" @click="handleErrorPhoneClick">
          전화 {{ siteConfig.phone }}
        </a>
      </div>

      <nav class="error-links" aria-label="주요 페이지">
        <NuxtLink v-for="link in popularLinks" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Decorative Elements -->
    <div class="error-decoration">
      <div class="deco-line deco-line-1"></div>
      <div class="deco-line deco-line-2"></div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #fafafa;
  font-family: var(--font-body);
  position: relative;
  overflow: hidden;
}

.error-content {
  text-align: center;
  padding: 40px;
  position: relative;
  z-index: 1;
}

.error-code {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(120px, 25vw, 200px);
  font-weight: 300;
  line-height: 1;
  color: var(--gold);
  opacity: 0.3;
  margin-bottom: -20px;
}

.error-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 300;
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}

.error-message {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 40px;
  line-height: 1.7;
}

.error-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4b44a 0%, #c9a227 50%, #a68820 100%);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.error-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.error-cta {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.error-cta-link {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 13px;
  font-weight: 700;
  color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.4);
  text-decoration: none;
  transition: all 0.3s;
}

.error-cta-link:hover {
  border-color: #c9a227;
  color: #fafafa;
}

.error-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
}

.error-links a {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.65);
  text-decoration: none;
  transition: color 0.3s;
}

.error-links a:hover {
  color: #c9a227;
}

/* Decorative lines */
.error-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.1), transparent);
  height: 1px;
}

.deco-line-1 {
  top: 30%;
  left: 0;
  right: 0;
}

.deco-line-2 {
  bottom: 30%;
  left: 0;
  right: 0;
}
</style>
