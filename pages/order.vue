<script setup lang="ts">
import { ref, shallowRef, nextTick } from 'vue'
import { siteConfig } from '~/config/site'

const { order } = siteConfig
const amountLabel = `${order.amount.toLocaleString('ko-KR')}원`

useHead({
  title: `주문서 | ${siteConfig.name}`,
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/order` }
  ],
  meta: [
    { name: 'description', content: `${order.product} 주문서. 주문자 정보와 배송지를 남기고 입금해 주세요.` },
    // 상담을 마친 고객에게 링크로만 전달하는 페이지 — 검색 노출 대상이 아니다.
    { name: 'robots', content: 'noindex, nofollow' },
    // Open Graph (카카오톡 링크 미리보기)
    { property: 'og:title', content: `${order.product} 주문서` },
    { property: 'og:description', content: '주문자 정보와 배송지를 남겨주세요.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/order` },
    { property: 'og:image', content: `${siteConfig.url}${siteConfig.ogImage}` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: siteConfig.name },
  ],
})

const { trackEvent, trackFormError } = useGtag()

const buildInitialFormData = () => ({
  name: '',
  phone: '',
  address: '',
  consent: false,
  honeypot: '',
})

const formData = ref(buildInitialFormData())

const isSubmitting = ref(false)
const submittedOrderId = ref('')
const formError = ref('')
const successHeadingRef = ref<HTMLElement | null>(null)

// 은행 앱 입력란은 숫자만 받는 경우가 많아 하이픈 없이 복사한다.
const accountDigits = order.account.replaceAll('-', '')
const copyState = ref<'idle' | 'done' | 'failed'>('idle')
let copyResetTimer: ReturnType<typeof setTimeout> | undefined

const copyAccount = async () => {
  let copied = false
  try {
    await navigator.clipboard.writeText(accountDigits)
    copied = true
  } catch {
    // 카카오톡 등 인앱 브라우저는 Clipboard API가 막혀 있을 수 있다.
    const field = document.createElement('textarea')
    field.value = accountDigits
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    try { copied = document.execCommand('copy') } catch { /* 직접 복사 안내로 대체 */ }
    field.remove()
  }

  copyState.value = copied ? 'done' : 'failed'
  clearTimeout(copyResetTimer)
  copyResetTimer = setTimeout(() => { copyState.value = 'idle' }, 2400)
}

// 같은 내용을 다시 보내면(전송 오류 후 재시도) 같은 접수번호로 묶여 메일이 중복 발송되지 않는다.
const pendingSubmission = shallowRef<{ key: string; requestId?: string; requestedAt?: string } | null>(null)
const handleSubmit = async () => {
  if (isSubmitting.value) return
  formError.value = ''

  if (!formData.value.consent) {
    trackFormError('order', 'missing_consent', 'validation')
    formError.value = '개인정보 수집·이용에 동의해주세요.'
    return
  }

  isSubmitting.value = true
  const submissionSnapshot = { ...formData.value }
  const key = JSON.stringify(submissionSnapshot)
  const pending = pendingSubmission.value
  if (!pending || pending.key !== key || (pending.requestedAt && Date.now() - Date.parse(pending.requestedAt) > 22 * 3600000)) {
    // 구형 인앱 브라우저에는 randomUUID가 없다 — 그때는 서버가 접수번호를 만든다.
    const requestId = globalThis.crypto?.randomUUID?.()
    pendingSubmission.value = requestId
      ? { key, requestId, requestedAt: new Date().toISOString() }
      : { key }
  }

  try {
    const response = await $fetch<{ ok: boolean, orderId?: string }>('/api/order', {
      method: 'POST',
      body: { ...submissionSnapshot, ...pendingSubmission.value, key: undefined },
    })

    if (!response.ok || !response.orderId) {
      throw new Error('접수번호를 확인할 수 없습니다.')
    }

    pendingSubmission.value = null
    submittedOrderId.value = response.orderId
    trackEvent('order_submitted', { order_id: response.orderId })
    formData.value = buildInitialFormData()
    await nextTick()
    successHeadingRef.value?.focus()
  } catch (e: any) {
    const errorMessage = e.data?.message || '전송 중 오류가 발생했습니다. 전화로 문의해주세요.'
    const errorCode = e.data?.data?.code || e.data?.code || 'SUBMISSION_FAILED'
    trackFormError('order', errorCode, e.statusCode ? 'api_error' : 'submission')
    formError.value = errorMessage
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="main">
      <div class="order-wrapper">
        <header class="order-header">
          <h1 class="title">주문서</h1>
          <p class="desc">
            주문자 정보와 배송지를 남기신 뒤, 아래 계좌로 입금해 주세요.
          </p>
        </header>

        <dl class="detail-list">
          <div class="detail-row">
            <dt>주문 상품</dt>
            <dd>{{ order.product }}</dd>
          </div>
          <div class="detail-row">
            <dt>주문 금액</dt>
            <dd class="amount">{{ amountLabel }}</dd>
          </div>
        </dl>

        <!-- Success State -->
        <div v-if="submittedOrderId" class="success-state">
          <h2 ref="successHeadingRef" tabindex="-1" class="section-title">주문서가 접수되었습니다</h2>
          <p class="success-desc">아래 계좌로 {{ amountLabel }}을 입금해 주시면 확인 후 연락드리겠습니다.</p>
          <p class="success-id">접수번호 <span>{{ submittedOrderId }}</span></p>
          <p class="success-note">
            내용을 고쳐야 하면 카카오톡이나 전화
            <a :href="`tel:${siteConfig.phone}`">{{ siteConfig.phone }}</a>로 알려주세요.
          </p>
        </div>

        <!-- Form -->
        <form v-else class="order-form" @submit.prevent="handleSubmit">
          <h2 class="section-title">주문자·배송 정보</h2>

          <div class="honeypot-field" aria-hidden="true">
            <label>
              Leave this field empty
              <input v-model="formData.honeypot" type="text" tabindex="-1" autocomplete="off">
            </label>
          </div>

          <div class="form-group">
            <label class="form-label" for="order-name">주문자</label>
            <input
              id="order-name"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="이름"
              autocomplete="name"
              minlength="2"
              maxlength="50"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="order-phone">전화번호</label>
            <input
              id="order-phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="010-0000-0000"
              autocomplete="tel"
              inputmode="tel"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="order-address">배송지 주소</label>
            <textarea
              id="order-address"
              v-model="formData.address"
              class="form-input form-textarea"
              placeholder="도로명 주소와 동·호수까지 적어주세요"
              autocomplete="street-address"
              rows="3"
              minlength="5"
              maxlength="200"
              required
            ></textarea>
          </div>

          <label class="consent-check">
            <input v-model="formData.consent" type="checkbox">
            <span class="check-box">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span class="check-label">
              <NuxtLink to="/privacy">개인정보처리방침</NuxtLink>에 따른 수집·이용에 동의합니다
              <span class="check-detail">이름, 전화번호, 배송지 주소를 주문 접수와 배송에만 사용합니다.</span>
            </span>
          </label>

          <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>

          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '전송 중...' : '주문서 보내기' }}
          </button>
        </form>

        <section class="payment" aria-labelledby="payment-title">
          <h2 id="payment-title" class="section-title">입금 계좌</h2>
          <dl class="detail-list">
            <div class="detail-row">
              <dt>은행</dt>
              <dd>{{ order.bank }}</dd>
            </div>
            <div class="detail-row">
              <dt>계좌번호</dt>
              <dd class="account-number">{{ order.account }}</dd>
            </div>
            <div class="detail-row">
              <dt>예금주</dt>
              <dd>{{ order.accountHolder }}</dd>
            </div>
            <div class="detail-row">
              <dt>입금 금액</dt>
              <dd class="amount">{{ amountLabel }}</dd>
            </div>
          </dl>
          <button type="button" class="btn-copy" @click="copyAccount">
            <span aria-live="polite">{{ copyState === 'done' ? '복사했습니다' : copyState === 'failed' ? '계좌번호를 길게 눌러 복사해 주세요' : '계좌번호 복사' }}</span>
          </button>
          <p class="payment-note">주문자와 입금자 이름이 다르면 카카오톡이나 전화로 알려주세요.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--black);
  color: var(--white);
  font-family: var(--font-body);
}

.main {
  padding: clamp(112px, 10vw, 144px) clamp(20px, 5vw, 60px) clamp(72px, 8vw, 112px);
}

.order-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
  max-width: 560px;
  margin: 0 auto;
}

/* ===== Header ===== */
.title {
  margin: 0 0 16px;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--gray);
}

.section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* ===== 상품·계좌 정의 목록 ===== */
.detail-list {
  margin: 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.detail-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.detail-row dt {
  flex: 0 0 auto;
  font-size: 14px;
  color: var(--gray);
}

.detail-row dd {
  margin: 0;
  font-size: 16px;
  text-align: right;
}

.detail-row .account-number {
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}

.detail-row .amount {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

/* ===== Form ===== */
.order-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  font-size: 14px;
  font-weight: 600;
}

/* 16px 미만이면 iOS가 입력 포커스 때 화면을 확대한다 */
.form-input {
  width: 100%;
  min-height: 54px;
  padding: 15px 18px;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5;
  color: var(--white);
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.14);
  border-radius: 0;
  transition: border-color 0.3s, background-color 0.3s;
}

.form-input:focus {
  border-color: rgba(201, 162, 39, 0.35);
  background: rgba(250, 250, 250, 0.04);
}

.form-input::placeholder {
  color: var(--gray);
}

.form-textarea {
  display: block;
  resize: none;
}

.consent-check {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

/* 시각적으로만 숨김 — display:none은 키보드 포커스를 막는다 */
.consent-check input {
  position: absolute;
  width: 1px;
  height: 1px;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}

.consent-check input:focus-visible + .check-box {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.check-box {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(250, 250, 250, 0.3);
  color: transparent;
  transition: background-color 0.3s, border-color 0.3s;
}

.consent-check input:checked + .check-box {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--black);
}

.check-label {
  font-size: 14px;
  line-height: 1.6;
}

.check-label a {
  color: var(--gold-light);
  text-underline-offset: 3px;
}

.check-detail {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: var(--gray);
}

.form-error {
  margin: 0;
  padding: 12px 16px;
  font-size: 14px;
  background: rgba(201, 162, 39, 0.1);
  border-left: 2px solid var(--gold);
}

.btn-submit {
  width: 100%;
  min-height: 54px;
  padding: 0 18px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 700;
  color: var(--black);
  background: var(--gold);
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s var(--ease-out-expo);
}

.btn-submit:hover:not(:disabled) {
  background: var(--gold-light);
}

.btn-submit:active:not(:disabled),
.btn-copy:active {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Success State ===== */
.success-state {
  padding: 24px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.35);
}

.success-desc {
  margin: 8px 0 16px;
  font-size: 15px;
  line-height: 1.7;
}

.success-id {
  margin: 0 0 16px;
  font-size: 13px;
}

.success-id span {
  margin-left: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.04em;
}

.success-note {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

.success-note a {
  color: var(--white);
  text-underline-offset: 3px;
  white-space: nowrap;
}

/* ===== 입금 계좌 ===== */
.payment {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.payment .detail-list {
  margin-top: 16px;
}

.btn-copy {
  width: 100%;
  min-height: 48px;
  margin-top: 16px;
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  font-weight: 600;
  color: var(--gold);
  background: transparent;
  border: 1px solid rgba(201, 162, 39, 0.35);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s var(--ease-out-expo);
}

.btn-copy:hover {
  color: var(--gold-light);
  background: rgba(201, 162, 39, 0.1);
}

.payment-note {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

/* ===== Mobile ===== */
@media (max-width: 600px) {
  .main {
    padding: 100px 20px 72px;
  }

  .order-wrapper {
    gap: 32px;
  }

  .payment,
  .success-state {
    padding: 20px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-input,
  .check-box,
  .btn-submit,
  .btn-copy {
    transition: none;
  }
}
</style>
