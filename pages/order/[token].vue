<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { siteConfig } from '~/config/site'

type OrderState = 'open' | 'submitted' | 'paid' | 'cancelled' | 'expired'
interface PublicOrder {
  orderId: string
  product: string
  amount: number
  state: OrderState
}

const account = siteConfig.order
const route = useRoute()
const orderUrl = `/api/order/${route.params.token}`

// 주문마다 주소가 다른 1대1 주문서. 관리 페이지(/admin)에서 만든 주문을 링크의 토큰으로 찾는다.
const { data: fetchedOrder, error } = await useFetch<PublicOrder>(orderUrl)
if (error.value || !fetchedOrder.value) {
  throw createError({
    statusCode: error.value?.statusCode || 500,
    statusMessage: '주문서를 찾을 수 없습니다',
    fatal: true,
  })
}
// 접수하면 이 화면에서 바로 상태가 바뀌므로 따로 들고 있는다.
const order = ref<PublicOrder>(fetchedOrder.value)
const amountLabel = computed(() => `${order.value.amount.toLocaleString('ko-KR')}원`)

useHead({
  title: `주문서 | ${siteConfig.name}`,
  meta: [
    { name: 'description', content: `${order.value.product} 주문서. 주문자 정보와 배송지를 남기고 입금해 주세요.` },
    // 고객 한 사람에게만 보내는 링크 — 검색에 잡히거나 주소가 다른 사이트로 넘어가면 안 된다.
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'referrer', content: 'no-referrer' },
    // Open Graph (카카오톡 링크 미리보기)
    { property: 'og:title', content: `${order.value.product} 주문서` },
    { property: 'og:description', content: '주문자 정보와 배송지를 남겨주세요.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `${siteConfig.url}${siteConfig.ogImage}` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: siteConfig.name },
  ],
})

const statusMessages: Record<Exclude<OrderState, 'open'>, { title: string; desc: string }> = {
  submitted: { title: '주문서가 접수되었습니다', desc: '' },
  paid: { title: '입금이 확인되었습니다', desc: '주문해 주셔서 감사합니다.' },
  cancelled: { title: '취소된 주문서입니다', desc: '궁금한 점은 카카오톡이나 전화로 문의해 주세요.' },
  expired: { title: '작성 기한이 지난 주문서입니다', desc: '새 주문서가 필요하시면 카카오톡이나 전화로 문의해 주세요.' },
}
const status = computed(() => {
  const state = order.value.state
  if (state === 'open') return null
  if (state === 'submitted') return { title: statusMessages.submitted.title, desc: `아래 계좌로 ${amountLabel.value}을 입금해 주시면 확인 후 연락드리겠습니다.` }
  return statusMessages[state]
})
const isClosed = computed(() => order.value.state === 'cancelled' || order.value.state === 'expired')

const buildInitialFormData = () => ({
  name: '',
  phone: '',
  postcode: '',
  address: '',
  addressDetail: '',
  consent: false,
  honeypot: '',
})

const formData = ref(buildInitialFormData())

const isSubmitting = ref(false)
const formError = ref('')
const statusHeadingRef = ref<HTMLElement | null>(null)

// 카카오 우편번호 서비스 — 키 발급 없이 쓰는 무료 주소 검색. 주소 검색을 누를 때만 불러온다.
// https://postcode.map.kakao.com/guide
const postcodeScriptUrl = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
type PostcodeResult = {
  zonecode: string
  address: string
  roadAddress: string
  jibunAddress: string
  userSelectedType: 'R' | 'J'
  buildingName: string
}

const addressSearchRef = ref<HTMLElement | null>(null)
const addressFieldRef = ref<HTMLTextAreaElement | null>(null)
const addressDetailRef = ref<HTMLInputElement | null>(null)
const isAddressSearchOpen = ref(false)
const isAddressSearchLoading = ref(false)
// 검색 서비스를 불러오지 못하면 주소를 직접 적게 한다.
const manualAddress = ref(false)

let postcodeScript: Promise<void> | undefined
const loadPostcodeScript = () => postcodeScript ??= new Promise<void>((resolve, reject) => {
  const script = document.createElement('script')
  const fail = () => {
    postcodeScript = undefined
    script.remove()
    reject(new Error('postcode script unavailable'))
  }
  const timer = setTimeout(fail, 8000)
  script.src = postcodeScriptUrl
  script.onload = () => { clearTimeout(timer); resolve() }
  script.onerror = () => { clearTimeout(timer); fail() }
  document.head.appendChild(script)
})

const closeAddressSearch = () => {
  isAddressSearchOpen.value = false
}

const openAddressSearch = async () => {
  if (manualAddress.value || isAddressSearchOpen.value || isAddressSearchLoading.value) return
  isAddressSearchLoading.value = true
  try {
    await loadPostcodeScript()
    const Postcode = (window as any).kakao?.Postcode || (window as any).daum?.Postcode
    if (!Postcode) throw new Error('postcode service unavailable')

    isAddressSearchOpen.value = true
    await nextTick()
    const frame = addressSearchRef.value
    if (!frame) return
    // 모바일·인앱 브라우저에서는 팝업 대신 페이지에 끼워넣는 방식이 권장된다.
    new Postcode({
      oncomplete: (data: PostcodeResult) => {
        const base = (data.userSelectedType === 'J' ? data.jibunAddress : data.roadAddress) || data.address
        formData.value.postcode = data.zonecode
        formData.value.address = data.buildingName ? `${base} (${data.buildingName})` : base
        formError.value = ''
        closeAddressSearch()
        nextTick(() => addressDetailRef.value?.focus())
      },
      onresize: (size: { height: number }) => { frame.style.height = `${size.height}px` },
      width: '100%',
      height: '100%',
      hideMapBtn: true,
      hideEngBtn: true,
    }).embed(frame, { autoClose: false })
    // 버튼이 화면 아래쪽에 있으면 검색 화면이 하단 상담 바 밑에서 열려 보이지 않는다.
    frame.scrollIntoView({ block: 'center' })
  } catch {
    manualAddress.value = true
    await nextTick()
    addressFieldRef.value?.focus()
  } finally {
    isAddressSearchLoading.value = false
  }
}

// 은행 앱 입력란은 숫자만 받는 경우가 많아 하이픈 없이 복사한다.
const accountDigits = account.account.replaceAll('-', '')
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

const showStatus = async () => {
  formError.value = ''
  await nextTick()
  statusHeadingRef.value?.focus()
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  formError.value = ''

  // 주소 검색 모드의 주소란은 readonly라 브라우저의 required 검사가 걸리지 않는다.
  if (!formData.value.address.trim()) {
    formError.value = manualAddress.value ? '배송지 주소를 입력해주세요.' : '주소 검색으로 배송지 주소를 선택해주세요.'
    return
  }

  if (!formData.value.consent) {
    formError.value = '개인정보 수집·이용에 동의해주세요.'
    return
  }

  isSubmitting.value = true
  const { postcode, addressDetail, ...fields } = formData.value

  try {
    const response = await $fetch<{ ok: boolean, state?: OrderState }>(orderUrl, {
      method: 'POST',
      body: {
        ...fields,
        // 서버와 접수 메일에는 한 줄 주소로 보낸다: (우편번호) 기본 주소 상세 주소
        address: [postcode && `(${postcode})`, fields.address.trim(), addressDetail.trim()].filter(Boolean).join(' '),
      },
    })

    if (!response.ok || response.state !== 'submitted') {
      throw new Error('접수 결과를 확인할 수 없습니다.')
    }

    order.value = { ...order.value, state: 'submitted' }
    formData.value = buildInitialFormData()
    await showStatus()
  } catch (e: any) {
    // 이미 접수됐거나 그사이 취소·만료된 주문서 — 지금 상태를 다시 읽어 그 화면으로 바꾼다.
    if (e.statusCode === 409) {
      const latest = await $fetch<PublicOrder>(orderUrl).catch(() => null)
      if (latest && latest.state !== 'open') {
        order.value = latest
        await showStatus()
        return
      }
    }
    formError.value = e.data?.message || '전송 중 오류가 발생했습니다. 전화로 문의해주세요.'
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
          <p v-if="order.state === 'open'" class="desc">
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

        <!-- 접수 이후, 또는 취소·기한 만료 -->
        <div v-if="status" class="status-box" :class="{ 'is-closed': isClosed }">
          <h2 ref="statusHeadingRef" tabindex="-1" class="section-title">{{ status.title }}</h2>
          <p class="status-desc">{{ status.desc }}</p>
          <p class="status-id">접수번호 <span>{{ order.orderId }}</span></p>
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

            <div v-if="!manualAddress" class="postcode-row">
              <input
                v-model="formData.postcode"
                type="text"
                class="form-input"
                placeholder="우편번호"
                aria-label="우편번호"
                readonly
                @click="openAddressSearch"
              >
              <button type="button" class="btn-ghost btn-search" :disabled="isAddressSearchLoading" @click="openAddressSearch">
                {{ isAddressSearchLoading ? '불러오는 중...' : '주소 검색' }}
              </button>
            </div>

            <div v-if="isAddressSearchOpen" class="address-search">
              <div ref="addressSearchRef" class="address-search-frame"></div>
              <button type="button" class="btn-close-search" @click="closeAddressSearch">주소 검색 닫기</button>
            </div>

            <p v-if="manualAddress" class="address-notice">주소 검색을 불러오지 못했습니다. 주소를 직접 적어주세요.</p>

            <textarea
              id="order-address"
              ref="addressFieldRef"
              v-model="formData.address"
              class="form-input form-textarea"
              :placeholder="manualAddress ? '도로명 주소' : '주소 검색을 눌러주세요'"
              :readonly="!manualAddress"
              rows="2"
              maxlength="110"
              @click="openAddressSearch"
            ></textarea>

            <input
              ref="addressDetailRef"
              v-model="formData.addressDetail"
              type="text"
              class="form-input"
              placeholder="상세 주소 (동·호수)"
              aria-label="상세 주소"
              autocomplete="address-line2"
              maxlength="80"
            >
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

        <section v-if="order.state === 'open' || order.state === 'submitted'" class="payment" aria-labelledby="payment-title">
          <h2 id="payment-title" class="section-title">입금 계좌</h2>
          <dl class="detail-list">
            <div class="detail-row">
              <dt>은행</dt>
              <dd>{{ account.bank }}</dd>
            </div>
            <div class="detail-row">
              <dt>계좌번호</dt>
              <dd class="account-number">{{ account.account }}</dd>
            </div>
            <div class="detail-row">
              <dt>예금주</dt>
              <dd>{{ account.accountHolder }}</dd>
            </div>
            <div class="detail-row">
              <dt>입금 금액</dt>
              <dd class="amount">{{ amountLabel }}</dd>
            </div>
          </dl>
          <button type="button" class="btn-ghost btn-copy" @click="copyAccount">
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

/* 주소 검색으로 채우는 칸 — 누르면 검색이 열린다 */
.form-input[readonly] {
  cursor: pointer;
}

.postcode-row {
  display: flex;
  gap: 8px;
}

.postcode-row .form-input {
  flex: 1 1 0;
  min-width: 0;
}

.address-search {
  border: 1px solid rgba(250, 250, 250, 0.14);
}

/* 검색 화면(iframe)이 뜨기 전 자리 — 이후 높이는 서비스의 onresize 값으로 맞춘다 */
.address-search-frame {
  height: 440px;
}

.btn-close-search {
  width: 100%;
  min-height: 44px;
  font-size: 14px;
  font-family: inherit;
  color: var(--gray);
  background: transparent;
  border: 0;
  border-top: 1px solid rgba(250, 250, 250, 0.14);
  cursor: pointer;
}

.btn-close-search:hover {
  color: var(--white);
}

.address-notice {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

/* 보조 버튼 — 주소 검색, 계좌번호 복사 */
.btn-ghost {
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

.btn-ghost:hover:not(:disabled) {
  color: var(--gold-light);
  background: rgba(201, 162, 39, 0.1);
}

.btn-ghost:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-ghost:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-search {
  flex: 0 0 auto;
  min-width: 104px;
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

.btn-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 접수·입금 확인·취소·만료 상태 ===== */
.status-box {
  padding: 24px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.35);
}

.status-box.is-closed {
  background: rgba(250, 250, 250, 0.02);
  border-color: rgba(250, 250, 250, 0.08);
}

.status-desc {
  margin: 8px 0 16px;
  font-size: 15px;
  line-height: 1.7;
}

.status-id {
  margin: 0;
  font-size: 13px;
}

.status-id span {
  margin-left: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.04em;
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
  .status-box {
    padding: 20px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-input,
  .check-box,
  .btn-submit,
  .btn-ghost {
    transition: none;
  }
}
</style>
