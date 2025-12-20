<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: '문의하기 | 귀족',
  meta: [
    { name: 'description', content: '귀족 귀금속 도매 문의 - 전화, 온라인 상담' }
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
  { value: 'wholesale', label: '도매 상담' },
  { value: 'custom', label: '주문 제작' },
  { value: 'repair', label: '수리/세공' },
  { value: 'other', label: '기타' },
]

const isSubmitting = ref(false)
const isSubmitted = ref(false)

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
    <!-- Navigation -->
    <nav class="nav">
      <NuxtLink to="/" class="nav-brand">귀족</NuxtLink>
      <div class="nav-menu">
        <NuxtLink to="/" class="nav-link">홈</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <NuxtLink to="/contact" class="nav-link active">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <div class="contact-grid">
          <!-- Left: Info -->
          <div class="info-side">
            <span class="label">Contact</span>
            <h1 class="title">문의하기</h1>
            <p class="desc">도매 상담, 주문 제작, 수리 문의 등<br>무엇이든 편하게 연락주세요.</p>

            <a href="tel:02-XXX-XXXX" class="phone-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>02-XXX-XXXX</span>
            </a>

            <div class="info-list">
              <div class="info-item">
                <strong>영업시간</strong>
                <span>평일 10:00-18:00 / 토 10:00-14:00</span>
              </div>
              <div class="info-item">
                <strong>위치</strong>
                <span>종로구 종묘귀금속상가</span>
              </div>
            </div>
          </div>

          <!-- Right: Form -->
          <div class="form-side">
            <div v-if="isSubmitted" class="success-message">
              <div class="success-icon">✓</div>
              <h3>문의가 접수되었습니다</h3>
              <p>24시간 내 연락드리겠습니다.</p>
              <button @click="isSubmitted = false" class="btn">추가 문의</button>
            </div>

            <form v-else class="form" @submit.prevent="handleSubmit">
              <!-- Type -->
              <div class="type-row">
                <label
                  v-for="type in inquiryTypes"
                  :key="type.value"
                  class="type-btn"
                  :class="{ active: formData.type === type.value }"
                >
                  <input type="radio" v-model="formData.type" :value="type.value" required>
                  {{ type.label }}
                </label>
              </div>

              <!-- Name & Phone -->
              <div class="input-row">
                <input v-model="formData.name" type="text" placeholder="이름/업체명 *" required>
                <input v-model="formData.phone" type="tel" placeholder="연락처 *" required>
              </div>

              <!-- Message -->
              <textarea v-model="formData.message" placeholder="문의 내용을 입력해주세요 *" required></textarea>

              <!-- Consent & Submit -->
              <div class="bottom-row">
                <label class="consent">
                  <input v-model="formData.consent" type="checkbox" required>
                  <span class="check"></span>
                  <span>개인정보처리방침 동의</span>
                </label>
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  {{ isSubmitting ? '전송중...' : '문의 보내기' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #f5f3f0;
  overflow: hidden;
}

/* Navigation */
.nav {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #f5f3f0;
  border-bottom: 1px solid #e8e5e0;
}

.nav-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.nav-menu {
  display: flex;
  gap: 28px;
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: #888;
  text-decoration: none;
}

.nav-link:hover,
.nav-link.active {
  color: #1a1a1a;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 24px;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .main {
    align-items: flex-start;
    padding-top: 40px;
  }
}

/* Info Side */
.info-side {
  padding-right: 40px;
}

.label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 12px;
}

.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.1;
}

.desc {
  font-size: 14px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 28px;
}

.phone-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: #1a1a1a;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 28px;
  transition: background 0.2s;
}

.phone-btn:hover {
  background: #b8860b;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.info-item strong {
  color: #1a1a1a;
  min-width: 60px;
}

.info-item span {
  color: #666;
}

/* Form Side */
.form-side {
  background: #fff;
  padding: 32px;
  border: 1px solid #e8e5e0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media (max-width: 600px) {
  .type-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.type-btn {
  position: relative;
  padding: 12px 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  background: #f8f6f3;
  border: 2px solid #e8e5e0;
  cursor: pointer;
  transition: all 0.15s;
}

.type-btn input {
  position: absolute;
  opacity: 0;
}

.type-btn:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.type-btn.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fff;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 500px) {
  .input-row {
    grid-template-columns: 1fr;
  }
}

.form input[type="text"],
.form input[type="tel"] {
  padding: 14px 16px;
  font-size: 15px;
  font-family: inherit;
  border: 2px solid #e8e5e0;
  background: #fff;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.2s;
}

.form input:focus {
  border-color: #b8860b;
}

.form input::placeholder {
  color: #aaa;
}

.form textarea {
  padding: 14px 16px;
  font-size: 15px;
  font-family: inherit;
  border: 2px solid #e8e5e0;
  background: #fff;
  color: #1a1a1a;
  outline: none;
  resize: none;
  height: 100px;
  line-height: 1.5;
  transition: border-color 0.2s;
}

.form textarea:focus {
  border-color: #b8860b;
}

.form textarea::placeholder {
  color: #aaa;
}

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;
}

@media (max-width: 500px) {
  .bottom-row {
    flex-direction: column;
    align-items: stretch;
  }
}

.consent {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.consent input {
  display: none;
}

.consent .check {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.consent input:checked + .check {
  background: #b8860b;
  border-color: #b8860b;
}

.consent input:checked + .check::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.submit-btn {
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 600;
  background: #b8860b;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #9a7209;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success */
.success-message {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b8860b;
  color: #fff;
  font-size: 24px;
  border-radius: 50%;
}

.success-message h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
}

.success-message p {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 24px;
  font-size: 13px;
  font-weight: 600;
  background: #1a1a1a;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: #333;
}
</style>
