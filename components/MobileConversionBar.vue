<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '~/config/site'

const route = useRoute()
const { trackKakaoClick, trackPhoneClick, trackMapClick } = useGtag()

const naverMapUrl = 'https://naver.me/xen7hRCZ'

const normalizedPath = computed(() => {
  if (route.path === '/') return '/'
  return route.path.replace(/\/$/, '')
})

const pathSegments = computed(() => normalizedPath.value.split('/').filter(Boolean))
const isGuideDetail = computed(() => pathSegments.value[0] === 'guide' && pathSegments.value.length === 2)
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
  document.body.classList.add('has-mobile-conversion-bar')
}

onMounted(applyBodyOffset)

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.classList.remove('has-mobile-conversion-bar')
})

const getPlacement = () => import.meta.client && window.matchMedia('(min-width: 900px)').matches
  ? 'desktop_floating'
  : 'mobile_bar'

const handleKakaoClick = () => {
  trackKakaoClick(pageName.value, {
    placement: getPlacement(),
    intent: intent.value,
    topic: topic.value,
  })
}

const handlePhoneClick = () => {
  trackPhoneClick(pageName.value, {
    placement: getPlacement(),
    intent: intent.value,
    topic: topic.value,
  })
}

const handleNaverMapClick = () => {
  trackMapClick(pageName.value, 'naver', {
    placement: getPlacement(),
    intent: 'directions',
    topic: topic.value,
    destination: naverMapUrl,
  })
}
</script>

<template>
  <div class="mobile-conversion-bar" role="navigation" aria-label="빠른 상담">
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
      <span class="kakao-mobile-label">카톡상담</span>
      <span class="kakao-desktop-copy">
        <small>사진으로 빠른 상담</small>
        <strong>카톡 문의</strong>
      </span>
      <span class="kakao-arrow" aria-hidden="true">→</span>
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

.kakao-desktop-copy,
.kakao-arrow {
  display: none;
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
    /* 화면이 좁아지면 버튼도 같이 줄어들도록 — 전 구간 vw 기반 */
    --cta-width: clamp(178px, 15.2vw, 238px);
    --cta-height: clamp(54px, 4.9vw, 74px);
    --cta-pad-x: clamp(13px, 1.15vw, 18px);
    --cta-gap: clamp(9px, 0.85vw, 13px);
    --cta-icon: clamp(19px, 1.7vw, 25px);
    --cta-title: clamp(14px, 1.12vw, 17px);
    --cta-sub: clamp(10px, 0.76vw, 12px);

    right: clamp(18px, 2.2vw, 44px);
    bottom: clamp(18px, 2.2vw, 40px);
    left: auto;
    display: block;
    width: min(var(--cta-width), calc(100vw - 48px));
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    backdrop-filter: none;
    animation: kakao-cta-enter 0.55s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* 시선을 끄는 골드 헤일로 — 버튼 뒤에서 천천히 퍼진다 */
  .mobile-conversion-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    animation: kakao-halo 4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s infinite;
  }

  .conversion-action-kakao {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    /* inline-flex면 라인박스 여백이 생겨 헤일로 링이 버튼보다 커진다 */
    display: flex;
    justify-content: flex-start;
    gap: var(--cta-gap);
    width: 100%;
    min-height: var(--cta-height);
    padding: 0 var(--cta-pad-x);
    color: #120e06;
    /* 샴페인 하이라이트 → 골드 → 딥골드: 광택 있는 금 느낌 */
    background: linear-gradient(135deg, var(--champagne) 0%, var(--gold-light) 24%, var(--gold) 58%, var(--gold-dark) 100%);
    border: 1px solid rgba(255, 243, 210, 0.5);
    box-shadow:
      0 0 0 1px rgba(10, 10, 10, 0.55),  /* 밝은 배경에서도 윤곽이 서게 */
      0 16px 36px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 250, 235, 0.42);
  }

  /* 금속 광택이 훑고 지나가는 효과 */
  .conversion-action-kakao::after {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 0;
    width: 40%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: translateX(-160%) skewX(-18deg);
    pointer-events: none;
    animation: kakao-sheen 5.6s ease-in-out 1.8s infinite;
  }

  .conversion-action-kakao > * {
    position: relative;
    z-index: 1;
  }

  .conversion-action-kakao:hover,
  .conversion-action-kakao:focus-visible {
    transform: translateY(-3px);
    border-color: rgba(255, 249, 232, 0.85);
    box-shadow:
      0 0 0 1px rgba(10, 10, 10, 0.55),
      0 22px 46px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 250, 235, 0.55);
  }

  .conversion-action-kakao:active {
    transform: translateY(-1px);
  }

  .conversion-action-kakao svg {
    width: var(--cta-icon);
    height: var(--cta-icon);
    filter: drop-shadow(0 1px 0 rgba(255, 252, 240, 0.35));
  }

  .kakao-mobile-label {
    display: none;
  }

  .kakao-desktop-copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(3px, 0.3vw, 5px);
  }

  /* 좁은 PC 화면에서 두 줄로 깨지지 않게 (body에 word-break: keep-all이 걸려 있음) */
  .kakao-desktop-copy small,
  .kakao-desktop-copy strong {
    white-space: nowrap;
  }

  .kakao-desktop-copy small {
    font-size: var(--cta-sub);
    font-weight: 700;
    letter-spacing: 0.03em;
    color: rgba(18, 14, 6, 0.62);
  }

  .kakao-desktop-copy strong {
    font-family: var(--font-display);
    font-size: var(--cta-title);
    letter-spacing: 0.01em;
  }

  .kakao-arrow {
    display: inline;
    font-size: clamp(15px, 1.2vw, 18px);
    transition: transform 0.24s ease;
  }

  .conversion-action-kakao:hover .kakao-arrow,
  .conversion-action-kakao:focus-visible .kakao-arrow {
    transform: translateX(3px);
  }

  .conversion-action-phone,
  .conversion-action-map {
    display: none;
  }
}

/* 노트북처럼 세로가 짧은 화면에서는 더 낮게 */
@media (min-width: 900px) and (max-height: 720px) {
  .mobile-conversion-bar {
    --cta-width: clamp(160px, 13.5vw, 206px);
    --cta-height: clamp(50px, 4.2vw, 60px);
    --cta-icon: clamp(18px, 1.5vw, 22px);
    --cta-title: clamp(13px, 1vw, 15px);

    bottom: clamp(14px, 1.8vw, 24px);
  }
}

@media (max-width: 899px) {
  :global(body.has-mobile-conversion-bar) {
    padding-bottom: calc(72px + env(safe-area-inset-bottom));
  }
}

@keyframes kakao-cta-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kakao-halo {
  0% {
    box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.5);
  }

  60%,
  100% {
    box-shadow: 0 0 0 16px rgba(201, 162, 39, 0);
  }
}

@keyframes kakao-sheen {
  0%,
  70% {
    transform: translateX(-160%) skewX(-18deg);
  }

  100% {
    transform: translateX(420%) skewX(-18deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-conversion-bar,
  .mobile-conversion-bar::before,
  .conversion-action-kakao::after {
    animation: none;
  }

  .conversion-action,
  .kakao-arrow {
    transition: none;
  }
}
</style>
