<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: '문의하기 | 귀족 - 종로 귀금속 도매',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/contact' }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 결혼예물 상담, 귀금속 수리·세공. 반지 사이즈 조절. 전화 02-766-4789 / 종로3가 금은방.' },
    // Open Graph
    { property: 'og:title', content: '문의하기 | 귀족 - 종로 귀금속 도매' },
    { property: 'og:description', content: '종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 귀금속 수리·세공. 종로3가 금은방.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://noblessegold.com/contact' },
    { property: 'og:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '문의하기 | 귀족 - 종로 귀금속 도매' },
    { name: 'twitter:description', content: '종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 귀금속 수리·세공. 종로3가 금은방.' },
    { name: 'twitter:image', content: 'https://noblessegold.com/Image/ring/NS0102.webp' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '문의하기 - 귀족',
        description: '귀족 귀금속 도매 문의 페이지',
        url: 'https://noblessegold.com/contact',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: '귀족',
          telephone: '+82-2-766-4789',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '종로 173 종묘귀금속백화점 101호',
            addressLocality: '종로구',
            addressRegion: '서울',
            addressCountry: 'KR'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '10:30',
              closes: '18:00'
            }
          ],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 37.5714,
            longitude: 126.9920
          }
        }
      })
    }
  ]
})

const formData = ref({
  name: '',
  phone: '',
  type: '',
  message: '',
  consent: false,
})

const inquiryTypes = [
  { value: 'wholesale', label: '도매 상담', labelEn: 'Wholesale' },
  { value: 'custom', label: '주문 제작', labelEn: 'Custom Order' },
  { value: 'repair', label: '수리/세공', labelEn: 'Repair' },
  { value: 'other', label: '기타', labelEn: 'Other' },
]

const isSubmitting = ref(false)
const isSubmitted = ref(false)
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

const handleSubmit = async () => {
  if (!formData.value.consent) {
    alert('개인정보 수집에 동의해주세요.')
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/inquiry', { method: 'POST', body: formData.value })
    isSubmitted.value = true
    formData.value = { name: '', phone: '', type: '', message: '', consent: false }
  } catch (e: any) {
    alert(e.data?.message || '전송 중 오류가 발생했습니다. 전화로 문의해주세요.')
  } finally {
    isSubmitting.value = false
  }
}
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
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">홈</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <NuxtLink to="/buy-gold" class="nav-link">금 매입</NuxtLink>
        <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
        <NuxtLink to="/contact" class="nav-link active">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="contact-wrapper">
        <!-- Left Side: Info -->
        <div class="info-side">
          <div class="info-content">
            <span class="label">Contact</span>
            <h1 class="title">문의하기</h1>
            <p class="desc">
              도매 상담, 주문 제작, 수리 문의 등<br>
              무엇이든 편하게 연락주세요.
            </p>

            <a href="tel:02-747-0004" class="phone-cta">
              <div class="phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="phone-text">
                <span class="phone-label">전화 상담</span>
                <span class="phone-number">02-747-0004</span>
              </div>
              <div class="phone-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Hours</span>
                <span class="info-value">평일·토요일<br>10:30-18:00</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location</span>
                <span class="info-value">서울 종로구 종로 173<br>종묘귀금속백화점 101호</span>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="info-decor">
            <div class="decor-line"></div>
            <div class="decor-orb"></div>
          </div>
        </div>

        <!-- Right Side: Form -->
        <div class="form-side">
          <!-- Success State -->
          <div v-if="isSubmitted" class="success-state">
            <div class="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 class="success-title">문의가 접수되었습니다</h3>
            <p class="success-desc">24시간 내 연락드리겠습니다</p>
            <button @click="isSubmitted = false" class="btn-reset">
              <span>추가 문의하기</span>
            </button>
          </div>

          <!-- Form -->
          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <!-- Type Selection -->
            <div class="form-group">
              <label class="form-label">문의 유형</label>
              <div class="type-grid">
                <label
                  v-for="type in inquiryTypes"
                  :key="type.value"
                  class="type-option"
                  :class="{ active: formData.type === type.value }"
                >
                  <input type="radio" v-model="formData.type" :value="type.value" required>
                  <span class="type-label">{{ type.label }}</span>
                  <span class="type-label-en">{{ type.labelEn }}</span>
                </label>
              </div>
            </div>

            <!-- Name & Phone -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">이름/업체명</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  placeholder="이름 또는 업체명"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">연락처</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="form-input"
                  placeholder="010-0000-0000"
                  required
                >
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label class="form-label">문의 내용</label>
              <textarea
                v-model="formData.message"
                class="form-textarea"
                placeholder="문의하실 내용을 입력해주세요"
                required
              ></textarea>
            </div>

            <!-- Consent & Submit -->
            <div class="form-footer">
              <label class="consent-check">
                <input v-model="formData.consent" type="checkbox" required>
                <span class="check-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <span class="check-label">개인정보처리방침에 동의합니다</span>
              </label>

              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                <span v-if="isSubmitting">전송중...</span>
                <template v-else>
                  <span>문의 보내기</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
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
  padding: 20px clamp(20px, 5vw, 60px);
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(250, 250, 250, 0.04);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-luxury.scrolled {
  background: rgba(10, 10, 10, 0.95);
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
  font-size: 22px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: 0.15em;
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
  color: rgba(250, 250, 250, 0.6);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s;
  padding: 8px 4px;
  position: relative;
  z-index: 10;
}

.nav-link:hover,
.nav-link.active {
  color: #fafafa;
}

/* ===== Main Content ===== */
.main {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 100px clamp(20px, 5vw, 60px) 40px;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 900px) {
  .contact-wrapper {
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: center;
  }
}

/* ===== Info Side ===== */
.info-side {
  position: relative;
  overflow: hidden;
}

.info-content {
  position: relative;
  z-index: 1;
}

.label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 16px;
}

.title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 16px;
  line-height: 1.2;
}

.desc {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 32px;
}

.phone-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
  text-decoration: none;
  margin-bottom: 32px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.phone-cta:hover {
  background: rgba(201, 162, 39, 0.15);
  border-color: rgba(201, 162, 39, 0.4);
  transform: translateX(4px);
}

.phone-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c9a227;
  color: #0a0a0a;
}

.phone-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phone-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.5);
}

.phone-number {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 22px;
  font-weight: 300;
  color: #fafafa;
}

.phone-arrow {
  color: #c9a227;
  transition: transform 0.3s;
}

.phone-cta:hover .phone-arrow {
  transform: translateX(4px);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.6);
}

.info-value {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(250, 250, 250, 0.8);
}

.info-decor {
  position: absolute;
  top: -40px;
  right: 0;
  pointer-events: none;
  overflow: hidden;
}

.decor-line {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 200px;
  background: linear-gradient(to bottom, rgba(201, 162, 39, 0.3), transparent);
}

.decor-orb {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 60%);
  filter: blur(40px);
}

@media (min-width: 768px) {
  .info-decor {
    right: -40px;
  }
  .decor-orb {
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
  }
}

/* ===== Form Side ===== */
.form-side {
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  padding: clamp(24px, 4vw, 40px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.85);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media (max-width: 700px) {
  .type-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.type-option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.type-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.type-option:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.type-option.active {
  background: #c9a227;
  border-color: #c9a227;
}

.type-label {
  font-size: 14px;
  font-weight: 700;
  color: #fafafa;
}

.type-label-en {
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.7);
}

.type-option.active .type-label {
  color: #0a0a0a;
}

.type-option.active .type-label-en {
  color: rgba(10, 10, 10, 0.6);
}

.form-input {
  padding: 16px 18px;
  font-size: 15px;
  font-family: inherit;
  font-weight: 300;
  color: #fafafa;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.1);
  outline: none;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: rgba(201, 162, 39, 0.5);
  background: rgba(250, 250, 250, 0.04);
}

.form-input::placeholder {
  color: rgba(250, 250, 250, 0.5);
}

.form-textarea {
  padding: 16px 18px;
  font-size: 15px;
  font-family: inherit;
  font-weight: 300;
  color: #fafafa;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.1);
  outline: none;
  resize: none;
  height: 120px;
  line-height: 1.6;
  transition: all 0.3s;
}

.form-textarea:focus {
  border-color: rgba(201, 162, 39, 0.5);
  background: rgba(250, 250, 250, 0.04);
}

.form-textarea::placeholder {
  color: rgba(250, 250, 250, 0.5);
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.consent-check {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.consent-check input {
  display: none;
}

.check-box {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.2);
  color: transparent;
  transition: all 0.3s;
}

.consent-check input:checked + .check-box {
  background: #c9a227;
  border-color: #c9a227;
  color: #0a0a0a;
}

.check-label {
  font-size: 13px;
  color: #fafafa;
}

.btn-submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 32px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  border: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e5c654 0%, #d4af37 100%);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.btn-submit span,
.btn-submit svg {
  position: relative;
  z-index: 1;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201, 162, 39, 0.35);
}

.btn-submit:hover:not(:disabled)::before {
  opacity: 1;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Success State ===== */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 400px;
}

.success-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c9a227;
  color: #0a0a0a;
  margin-bottom: 24px;
}

.success-title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 28px;
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 8px;
}

.success-desc {
  font-size: 15px;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 32px;
}

.btn-reset {
  position: relative;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fafafa;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-reset::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(250, 250, 250, 0.1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-reset span {
  position: relative;
  z-index: 1;
}

.btn-reset:hover {
  border-color: rgba(250, 250, 250, 0.6);
}

.btn-reset:hover::before {
  transform: scaleX(1);
}

/* ===== Mobile Responsive ===== */
@media (max-width: 900px) {
  .main {
    padding-top: 120px;
    align-items: flex-start;
  }

  .info-decor {
    display: none;
  }
}

/* ===== Mobile Navigation ===== */
@media (max-width: 1023px) {
  .nav-luxury {
    padding: 16px 20px;
  }

  .nav-luxury.scrolled {
    padding: 12px 20px;
  }

  .nav-links {
    gap: 16px;
  }

  .nav-link {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 12px;
  }

  .nav-link {
    font-size: 11px;
  }
}
</style>
