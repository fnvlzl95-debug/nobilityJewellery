<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()

const route = useRoute()
const { trackPhoneClick, trackInquiryClick } = useGtag()

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
</script>

<template>
  <div class="cta-section">
    <h3>{{ title }}</h3>
    <p v-html="description"></p>
    <div class="cta-buttons">
      <a href="tel:02-766-4789" class="btn-gold" @click="handlePhoneClick">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>02-766-4789</span>
      </a>
      <NuxtLink to="/contact" class="btn-outline" @click="handleInquiryClick">
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
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #fafafa;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.3);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-outline:hover {
  border-color: #c9a227;
  color: #c9a227;
}
</style>
