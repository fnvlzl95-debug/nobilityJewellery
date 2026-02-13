<script setup lang="ts">
import { siteConfig } from '~/config/site'

interface Props {
  title: string
  description: string
}

defineProps<Props>()

const route = useRoute()
const { trackPhoneClick, trackInquiryClick, trackKakaoClick } = useGtag()

// 현재 페이지 이름 추출
const pageName = computed(() => {
  return route.path.replace('/', '') || 'home'
})

const handlePhoneClick = () => {
  trackPhoneClick(pageName.value)
}

const handleInquiryClick = () => {
  trackInquiryClick(pageName.value)
}

const handleKakaoClick = () => {
  trackKakaoClick(pageName.value)
}
</script>

<template>
  <div class="cta-section">
    <h3>{{ title }}</h3>
    <p v-html="description"></p>
    <div class="cta-buttons">
      <a :href="`tel:${siteConfig.phone}`" class="btn-gold" @click="handlePhoneClick">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>{{ siteConfig.phone }}</span>
      </a>
      <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="btn-kakao" @click="handleKakaoClick">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.53c-.08.31.26.56.52.38l4.16-2.76c.52.05 1.06.1 1.6.1 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
        </svg>
        <span>카카오톡 문의</span>
      </a>
      <NuxtLink to="/contact" class="btn-outline" @click="handleInquiryClick">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <span>온라인 문의</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.cta-section {
  text-align: center;
  padding: 60px 40px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  margin-bottom: 40px;
}

.cta-section h3 {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 12px;
}

.cta-section p {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 32px;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-gold,
.btn-kakao,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 160px;
  height: 52px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.3s;
}

@media (max-width: 600px) {
  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
    max-width: 280px;
    margin: 0 auto;
  }

  .btn-gold,
  .btn-kakao,
  .btn-outline {
    min-width: 100%;
    width: 100%;
  }
}

.btn-gold {
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.btn-kakao {
  color: #3C1E1E;
  background: #FEE500;
}

.btn-kakao:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(254, 229, 0, 0.3);
}

.btn-outline {
  color: #fafafa;
  background: transparent;
  border-color: rgba(250, 250, 250, 0.3);
}

.btn-outline:hover {
  border-color: #c9a227;
  color: #c9a227;
  transform: translateY(-2px);
}
</style>
