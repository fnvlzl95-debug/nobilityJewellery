<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

type InquiryType = 'wholesale' | 'custom' | 'repair' | 'other'
type InquirySource = 'home' | 'gallery' | 'guide_article'

useHead({
  title: '도매·주문제작·수리 상담 | 종로 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/contact` }
  ],
  meta: [
    { name: 'description', content: `종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 결혼예물 상담, 귀금속 수리·세공. 반지 사이즈 조절. 전화 ${siteConfig.phone} / 종로3가 금은방.` },
    { name: 'keywords', content: '종로 금은방 문의, 귀금속 상담, 도매 문의, 주문제작 상담, 수리 문의, 금 매입 문의, 종로3가 금은방' },
    // Open Graph
    { property: 'og:title', content: '도매·주문제작·수리 상담 | 종로 | 귀족' },
    { property: 'og:description', content: '종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 귀금속 수리·세공. 종로3가 금은방.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/contact` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NN0201.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '도매·주문제작·수리 상담 | 종로 | 귀족' },
    { name: 'twitter:description', content: '종로 귀금속 도매 귀족 문의. 금반지 도매, 돌반지 주문제작, 귀금속 수리·세공. 종로3가 금은방.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NN0201.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `문의하기 - ${siteConfig.name}`,
        description: '귀족 귀금속 도매 문의 페이지',
        url: `${siteConfig.url}/contact`,
        mainEntity: {
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          telephone: siteConfig.phoneFormatted,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: siteConfig.hours.days,
              opens: siteConfig.hours.open,
              closes: siteConfig.hours.close
            }
          ],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.geo.latitude,
            longitude: siteConfig.geo.longitude
          }
        }
      })
    }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '문의하기', path: '/contact' },
      ]))
    }
  ]
})

const route = useRoute()
const { trackPhoneClick, trackKakaoClick, trackLeadSubmitted, trackFormError } = useGtag()

const inquiryTypes = [
  { value: 'wholesale', label: '도매 상담', labelEn: 'Wholesale' },
  { value: 'custom', label: '주문 제작', labelEn: 'Custom Order' },
  { value: 'repair', label: '수리/세공', labelEn: 'Repair' },
  { value: 'other', label: '기타', labelEn: 'Other' },
]

const inquirySourceLabels: Record<InquirySource, string> = {
  home: '홈',
  gallery: '갤러리',
  guide_article: '가이드',
}

const getQueryValue = (value: string | null | Array<string | null> | undefined) => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const parseQueryType = (): InquiryType | '' => {
  const type = getQueryValue(route.query.type)
  return inquiryTypes.some((item) => item.value === type) ? (type as InquiryType) : ''
}

const parseQuerySource = (): InquirySource | '' => {
  const source = getQueryValue(route.query.source)
  return source === 'home' || source === 'gallery' || source === 'guide_article'
    ? source
    : ''
}

const buildInitialFormData = () => ({
  name: '',
  phone: '',
  type: parseQueryType(),
  message: '',
  consent: false,
  source: parseQuerySource(),
  topic: getQueryValue(route.query.topic).trim().slice(0, 120),
  honeypot: '',
})

const formData = ref(buildInitialFormData())

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const isScrolled = ref(false)
const inquiryContext = computed(() => {
  const sourceLabel = formData.value.source ? inquirySourceLabels[formData.value.source as InquirySource] : ''
  if (!sourceLabel && !formData.value.topic) return null

  return {
    sourceLabel,
    topic: formData.value.topic,
    description: formData.value.topic
      ? `${sourceLabel ? `${sourceLabel}에서 보신 ` : ''}${formData.value.topic} 관련 문의를 이어가고 있습니다.`
      : `${sourceLabel}에서 문의를 시작하셨습니다.`,
  }
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

const handlePhoneClick = () => {
  trackPhoneClick('contact', {
    placement: 'section_cta',
    intent: 'general',
    topic: '문의하기',
  })
}

const handleKakaoClick = () => {
  trackKakaoClick('contact', {
    placement: 'contact_primary',
    intent: 'general',
    topic: inquiryContext.value?.topic || '문의하기',
  })
}

watch(
  () => route.fullPath,
  () => {
    formData.value = buildInitialFormData()
    isSubmitted.value = false
  }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleSubmit = async () => {
  if (!formData.value.consent) {
    trackFormError('contact', 'missing_consent', 'validation')
    alert('개인정보 수집에 동의해주세요.')
    return
  }

  isSubmitting.value = true
  const submissionSnapshot = { ...formData.value }

  try {
    await $fetch('/api/inquiry', { method: 'POST', body: formData.value })
    trackLeadSubmitted(
      submissionSnapshot.type || 'other',
      submissionSnapshot.source || 'contact',
      submissionSnapshot.topic || undefined
    )
    isSubmitted.value = true
    formData.value = buildInitialFormData()
  } catch (e: any) {
    const errorMessage = e.data?.message || '전송 중 오류가 발생했습니다. 전화로 문의해주세요.'
    trackFormError('contact', errorMessage, e.statusCode ? 'api_error' : 'submission')
    alert(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <!-- Custom Cursor -->
    <CustomCursor />

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
              사진과 함께 카톡으로 편하게 문의해주세요.
            </p>

            <a
              :href="siteConfig.social.kakaoOpenChat"
              target="_blank"
              rel="noopener"
              class="kakao-cta"
              @click="handleKakaoClick"
            >
              <div class="kakao-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.53c-.08.31.26.56.52.38l4.16-2.76c.52.05 1.06.1 1.6.1 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
              </div>
              <div class="kakao-text">
                <span class="kakao-label">카카오톡 문의</span>
                <span class="kakao-copy">사진과 문의 내용을 보내주세요</span>
              </div>
              <div class="kakao-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>

            <a :href="`tel:${siteConfig.phone}`" class="phone-link" @click="handlePhoneClick">
              <span>전화 상담</span>
              <strong>{{ siteConfig.phone }}</strong>
            </a>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Hours</span>
                <span class="info-value">{{ siteConfig.hours.display }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location</span>
                <span class="info-value">{{ siteConfig.address.full }}</span>
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
            <div v-if="inquiryContext" class="inquiry-context">
              <span class="inquiry-context-label">현재 상담 흐름</span>
              <strong>{{ inquiryContext.topic || inquiryContext.sourceLabel }}</strong>
              <p>{{ inquiryContext.description }}</p>
            </div>

            <input v-model="formData.source" type="hidden">
            <input v-model="formData.topic" type="hidden">
            <div class="honeypot-field" aria-hidden="true">
              <label>
                Leave this field empty
                <input v-model="formData.honeypot" type="text" tabindex="-1" autocomplete="off">
              </label>
            </div>

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
  font-family: var(--font-body);
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
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
  font-family: var(--font-body);
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

.kakao-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: #fee500;
  border: 1px solid #fee500;
  color: #2f1b12;
  text-decoration: none;
  margin-bottom: 14px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.kakao-cta:hover {
  transform: translateX(4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
}

.kakao-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(47, 27, 18, 0.1);
}

.kakao-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.kakao-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.kakao-copy {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
}

.kakao-arrow {
  transition: transform 0.3s;
}

.kakao-cta:hover .kakao-arrow {
  transform: translateX(4px);
}

.phone-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
  color: rgba(250, 250, 250, 0.58);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.phone-link strong {
  color: #fafafa;
  font-weight: 600;
}

.phone-link:hover,
.phone-link:focus-visible {
  color: #c9a227;
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

.inquiry-context {
  padding: 18px 20px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.12), rgba(201, 162, 39, 0.03));
}

.inquiry-context-label {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c9a227;
}

.inquiry-context strong {
  display: block;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 300;
  color: #fafafa;
}

.inquiry-context p {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.8);
}

.honeypot-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
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
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #b8960f 100%);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
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
  font-family: var(--font-body);
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

</style>
