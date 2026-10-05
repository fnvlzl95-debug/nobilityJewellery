<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { siteConfig } from '~/config/site'

// 운영자 전용 화면: 1대1 주문서를 만들고, 접수와 입금을 확인한다.
// 로그인 여부는 서버가 쿠키로 판단한다 (server/utils/admin-auth.ts).
definePageMeta({ layout: false })

useHead({
  title: `주문서 관리 | ${siteConfig.name}`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

type OrderState = 'open' | 'expired' | 'submitted' | 'paid' | 'cancelled'
type OrderAction = 'markPaid' | 'unmarkPaid' | 'cancel'
interface AdminOrder {
  id: string
  token: string
  product: string
  amount: number
  memo: string
  state: OrderState
  customerName: string | null
  customerPhone: string | null
  customerAddress: string | null
  createdAt: string
  expiresAt: string
  submittedAt: string | null
  paidAt: string | null
}

const stateLabels: Record<OrderState, string> = {
  open: '작성 대기',
  expired: '기한 만료',
  submitted: '접수 · 입금 대기',
  paid: '입금 확인',
  cancelled: '취소',
}

const view = ref<'loading' | 'login' | 'orders'>('loading')

const errorMessage = (e: any, fallback: string) => e?.data?.message || fallback

// 세션이 끊겼으면 어떤 요청에서든 로그인 화면으로 돌아간다.
const api = async <T>(url: string, options: { method?: 'POST' | 'PATCH'; body?: Record<string, unknown> } = {}) => {
  try {
    return await $fetch<T>(url, options)
  } catch (e: any) {
    if (e?.statusCode === 401) view.value = 'login'
    throw e
  }
}

// ===== 로그인 =====
const loginStep = ref<'email' | 'code'>('email')
const loginEmail = ref('')
const loginCode = ref('')
const loginError = ref('')
const isLoginBusy = ref(false)
const codeInputRef = ref<HTMLInputElement | null>(null)

const requestCode = async () => {
  if (isLoginBusy.value) return
  loginError.value = ''
  isLoginBusy.value = true
  try {
    await api('/api/admin/login/request', { method: 'POST', body: { email: loginEmail.value } })
    loginCode.value = ''
    loginStep.value = 'code'
    await nextTick()
    codeInputRef.value?.focus()
  } catch (e) {
    loginError.value = errorMessage(e, '인증번호를 요청하지 못했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isLoginBusy.value = false
  }
}

const verifyCode = async () => {
  if (isLoginBusy.value) return
  loginError.value = ''
  isLoginBusy.value = true
  try {
    await api('/api/admin/login/verify', { method: 'POST', body: { code: loginCode.value } })
    await loadOrders()
    loginStep.value = 'email'
    loginCode.value = ''
    view.value = 'orders'
  } catch (e) {
    loginError.value = errorMessage(e, '로그인하지 못했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isLoginBusy.value = false
  }
}

const logout = async () => {
  await api('/api/admin/logout', { method: 'POST' }).catch(() => {})
  orders.value = []
  view.value = 'login'
}

// ===== 주문서 목록 =====
const orders = ref<AdminOrder[]>([])
const listError = ref('')
const isLoadingOrders = ref(false)
const busyId = ref('')

const loadOrders = async () => {
  const response = await api<{ orders: AdminOrder[] }>('/api/admin/orders')
  orders.value = response.orders
}

const reloadOrders = async () => {
  if (isLoadingOrders.value) return
  listError.value = ''
  isLoadingOrders.value = true
  try {
    await loadOrders()
  } catch (e) {
    listError.value = errorMessage(e, '목록을 불러오지 못했습니다.')
  } finally {
    isLoadingOrders.value = false
  }
}

const updateOrder = async (order: AdminOrder, action: OrderAction) => {
  if (busyId.value) return
  if (action === 'cancel' && !window.confirm('이 주문서를 취소할까요?\n고객에게 보낸 링크로는 더 이상 작성할 수 없게 됩니다.')) return
  listError.value = ''
  busyId.value = order.id
  try {
    const response = await api<{ order: AdminOrder }>(`/api/admin/orders/${order.id}`, { method: 'PATCH', body: { action } })
    orders.value = orders.value.map(item => item.id === order.id ? response.order : item)
  } catch (e: any) {
    listError.value = errorMessage(e, '처리하지 못했습니다. 잠시 후 다시 시도해주세요.')
    // 그사이 고객이 접수했거나 다른 기기에서 바꾼 경우 — 최신 상태를 다시 보여준다.
    if (e?.statusCode === 409) await loadOrders().catch(() => {})
  } finally {
    busyId.value = ''
  }
}

// ===== 새 주문서 =====
const buildNewOrder = () => ({
  product: siteConfig.order.defaultProduct,
  amount: '',
  memo: '',
  validDays: 14,
})
const newOrder = ref(buildNewOrder())
const createError = ref('')
const isCreating = ref(false)
const createdId = ref('')

const amountValue = computed(() => Number(newOrder.value.amount.replace(/\D/g, '')))

// 입력하는 동안 천 단위 쉼표를 붙여 금액을 잘못 읽지 않게 한다.
const formatAmountInput = () => {
  newOrder.value.amount = amountValue.value ? amountValue.value.toLocaleString('ko-KR') : ''
}

const createOrder = async () => {
  if (isCreating.value) return
  createError.value = ''

  if (!amountValue.value) {
    createError.value = '금액을 입력해주세요.'
    return
  }

  isCreating.value = true
  try {
    const response = await api<{ order: AdminOrder }>('/api/admin/orders', {
      method: 'POST',
      body: {
        product: newOrder.value.product,
        amount: amountValue.value,
        memo: newOrder.value.memo,
        validDays: newOrder.value.validDays,
      },
    })
    orders.value = [response.order, ...orders.value]
    createdId.value = response.order.id
    newOrder.value = buildNewOrder()
    await nextTick()
    document.getElementById(`order-${response.order.id}`)?.scrollIntoView({ block: 'center' })
  } catch (e) {
    createError.value = errorMessage(e, '주문서를 만들지 못했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isCreating.value = false
  }
}

// ===== 고객 링크 =====
const orderLink = (order: AdminOrder) => `${window.location.origin}/order/${order.token}`
const copiedId = ref('')
const canShare = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyLink = async (order: AdminOrder) => {
  const link = orderLink(order)
  let copied = false
  try {
    await navigator.clipboard.writeText(link)
    copied = true
  } catch {
    const field = document.createElement('textarea')
    field.value = link
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    try { copied = document.execCommand('copy') } catch { /* 아래 안내로 대체 */ }
    field.remove()
  }

  if (!copied) {
    window.prompt('아래 링크를 복사해 주세요.', link)
    return
  }
  copiedId.value = order.id
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copiedId.value = '' }, 2400)
}

// 휴대폰에서는 공유 창으로 바로 카카오톡에 보낼 수 있다.
const shareLink = async (order: AdminOrder) => {
  try {
    await navigator.share({ title: `${order.product} 주문서`, url: orderLink(order) })
  } catch { /* 공유 창을 닫은 경우 */ }
}

const won = (amount: number) => `${amount.toLocaleString('ko-KR')}원`
const formatDate = (iso: string | null) => iso
  ? new Date(iso).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  : ''

onMounted(async () => {
  canShare.value = typeof navigator.share === 'function'
  try {
    const session = await api<{ authenticated: boolean }>('/api/admin/session')
    if (session.authenticated) {
      await loadOrders()
      view.value = 'orders'
      return
    }
  } catch (e) {
    loginError.value = errorMessage(e, '관리 페이지를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
  }
  view.value = 'login'
})
</script>

<template>
  <div class="admin">
    <header class="admin-header">
      <h1 class="admin-title">주문서 관리</h1>
      <button v-if="view === 'orders'" type="button" class="btn-text" @click="logout">로그아웃</button>
    </header>

    <p v-if="view === 'loading'" class="muted">불러오는 중...</p>

    <!-- 로그인 -->
    <section v-else-if="view === 'login'" class="panel login-panel">
      <h2 class="section-title">로그인</h2>

      <form v-if="loginStep === 'email'" class="stack" @submit.prevent="requestCode">
        <div class="field">
          <label class="field-label" for="admin-email">관리자 이메일</label>
          <input
            id="admin-email"
            v-model="loginEmail"
            type="email"
            class="field-input"
            autocomplete="email"
            inputmode="email"
            required
          >
          <p class="hint">등록된 관리자 메일로 인증번호를 보냅니다.</p>
        </div>
        <p v-if="loginError" class="error" role="alert">{{ loginError }}</p>
        <button type="submit" class="btn-primary" :disabled="isLoginBusy">
          {{ isLoginBusy ? '보내는 중...' : '인증번호 받기' }}
        </button>
      </form>

      <form v-else class="stack" @submit.prevent="verifyCode">
        <div class="field">
          <label class="field-label" for="admin-code">인증번호 8자리</label>
          <input
            id="admin-code"
            ref="codeInputRef"
            v-model="loginCode"
            type="text"
            class="field-input code-input"
            autocomplete="one-time-code"
            inputmode="numeric"
            maxlength="9"
            required
          >
          <p class="hint">메일로 받은 인증번호를 10분 안에 입력해 주세요. 메일이 오지 않으면 이메일 주소를 확인해 주세요.</p>
        </div>
        <p v-if="loginError" class="error" role="alert">{{ loginError }}</p>
        <button type="submit" class="btn-primary" :disabled="isLoginBusy">
          {{ isLoginBusy ? '확인 중...' : '로그인' }}
        </button>
        <button type="button" class="btn-text" @click="loginStep = 'email'; loginError = ''">인증번호 다시 받기</button>
      </form>
    </section>

    <template v-else>
      <!-- 새 주문서 -->
      <section class="panel">
        <h2 class="section-title">새 주문서</h2>
        <form class="stack" @submit.prevent="createOrder">
          <div class="field">
            <label class="field-label" for="new-product">상품명</label>
            <input id="new-product" v-model="newOrder.product" type="text" class="field-input" maxlength="60" required>
          </div>

          <div class="field">
            <label class="field-label" for="new-amount">금액 (원)</label>
            <input
              id="new-amount"
              v-model="newOrder.amount"
              type="text"
              class="field-input"
              inputmode="numeric"
              placeholder="2,740,000"
              autocomplete="off"
              required
              @input="formatAmountInput"
            >
          </div>

          <div class="field">
            <label class="field-label" for="new-memo">메모 <span class="optional">(선택 · 고객에게 보이지 않습니다)</span></label>
            <input id="new-memo" v-model="newOrder.memo" type="text" class="field-input" maxlength="200" placeholder="고객 이름, 디자인 등">
          </div>

          <div class="field">
            <label class="field-label" for="new-valid">작성 기한</label>
            <select id="new-valid" v-model.number="newOrder.validDays" class="field-input">
              <option :value="7">7일</option>
              <option :value="14">14일</option>
              <option :value="30">30일</option>
            </select>
          </div>

          <p v-if="createError" class="error" role="alert">{{ createError }}</p>
          <button type="submit" class="btn-primary" :disabled="isCreating">
            {{ isCreating ? '만드는 중...' : '주문서 만들기' }}
          </button>
        </form>
      </section>

      <!-- 주문서 목록 -->
      <section>
        <div class="list-header">
          <h2 class="section-title">주문서 목록</h2>
          <button type="button" class="btn-text" :disabled="isLoadingOrders" @click="reloadOrders">
            {{ isLoadingOrders ? '불러오는 중...' : '새로고침' }}
          </button>
        </div>

        <p v-if="listError" class="error" role="alert">{{ listError }}</p>
        <p v-if="!orders.length" class="muted">아직 만든 주문서가 없습니다.</p>

        <ul class="order-list">
          <li
            v-for="order in orders"
            :id="`order-${order.id}`"
            :key="order.id"
            class="order-card"
            :class="{ 'is-new': order.id === createdId }"
          >
            <div class="order-top">
              <span class="chip" :class="`chip-${order.state}`">{{ stateLabels[order.state] }}</span>
              <span class="order-id">{{ order.id }}</span>
            </div>

            <p class="order-summary">{{ order.product }} · <strong>{{ won(order.amount) }}</strong></p>
            <p v-if="order.memo" class="order-memo">{{ order.memo }}</p>
            <p v-if="order.id === createdId" class="order-new-note">주문서를 만들었습니다. 링크를 복사해 고객에게 보내주세요.</p>

            <dl class="order-meta">
              <div>
                <dt>만든 날</dt>
                <dd>{{ formatDate(order.createdAt) }}</dd>
              </div>
              <div v-if="order.state === 'open' || order.state === 'expired'">
                <dt>작성 기한</dt>
                <dd>{{ formatDate(order.expiresAt) }}</dd>
              </div>
              <template v-if="order.customerName">
                <div>
                  <dt>주문자</dt>
                  <dd>{{ order.customerName }}</dd>
                </div>
                <div>
                  <dt>전화번호</dt>
                  <dd><a :href="`tel:${order.customerPhone}`">{{ order.customerPhone }}</a></dd>
                </div>
                <div>
                  <dt>배송지</dt>
                  <dd>{{ order.customerAddress }}</dd>
                </div>
                <div>
                  <dt>접수</dt>
                  <dd>{{ formatDate(order.submittedAt) }}</dd>
                </div>
              </template>
              <div v-if="order.paidAt">
                <dt>입금 확인</dt>
                <dd>{{ formatDate(order.paidAt) }}</dd>
              </div>
            </dl>

            <div v-if="order.state !== 'cancelled' && order.state !== 'expired'" class="order-actions">
              <button v-if="order.state === 'submitted'" type="button" class="btn-ghost" :disabled="busyId === order.id" @click="updateOrder(order, 'markPaid')">
                입금 확인
              </button>
              <template v-if="order.state === 'open' || order.state === 'submitted'">
                <button type="button" class="btn-ghost" @click="copyLink(order)">
                  <span aria-live="polite">{{ copiedId === order.id ? '복사했습니다' : '링크 복사' }}</span>
                </button>
                <button v-if="canShare" type="button" class="btn-ghost" @click="shareLink(order)">공유</button>
                <button type="button" class="btn-text" :disabled="busyId === order.id" @click="updateOrder(order, 'cancel')">주문 취소</button>
              </template>
              <button v-if="order.state === 'paid'" type="button" class="btn-text" :disabled="busyId === order.id" @click="updateOrder(order, 'unmarkPaid')">
                입금 확인 취소
              </button>
            </div>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<style scoped>
/* 운영자 화면은 입력 내용이 다양해 서브셋 웹폰트 대신 기기 기본 글꼴로 통일한다. */
.admin {
  min-height: 100vh;
  min-height: 100dvh;
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 20px 96px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 32px;
  background: var(--black);
  color: var(--white);
  font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic', 'Noto Sans KR', sans-serif;
}

.admin-header,
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.admin-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.muted {
  margin: 0;
  font-size: 14px;
  color: var(--gray);
}

.panel {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

/* ===== 입력 ===== */
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 600;
}

.optional {
  font-weight: 400;
  color: var(--gray);
}

/* 16px 미만이면 iOS가 입력 포커스 때 화면을 확대한다 */
.field-input {
  width: 100%;
  min-height: 52px;
  padding: 14px 16px;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5;
  color: var(--white);
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.14);
  border-radius: 0;
}

select.field-input {
  color-scheme: dark;
}

.field-input::placeholder {
  color: var(--gray);
}

.code-input {
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.2em;
}

.hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

.error {
  margin: 0;
  padding: 12px 16px;
  font-size: 14px;
  background: rgba(201, 162, 39, 0.1);
  border-left: 2px solid var(--gold);
}

.list-header + .error {
  margin-top: 16px;
}

/* ===== 버튼 ===== */
.btn-primary {
  width: 100%;
  min-height: 52px;
  padding: 0 18px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 700;
  color: var(--black);
  background: var(--gold);
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: var(--gold-light);
}

.btn-ghost {
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  font-weight: 600;
  color: var(--gold);
  background: transparent;
  border: 1px solid rgba(201, 162, 39, 0.35);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-ghost:hover:not(:disabled) {
  color: var(--gold-light);
  background: rgba(201, 162, 39, 0.1);
}

.btn-text {
  padding: 10px 4px;
  font-size: 14px;
  font-family: inherit;
  color: var(--gray);
  background: transparent;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn-text:hover:not(:disabled) {
  color: var(--white);
}

.btn-primary:disabled,
.btn-ghost:disabled,
.btn-text:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 주문서 목록 ===== */
.list-header + .muted {
  margin-top: 16px;
}

.order-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.order-card {
  padding: 20px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.order-card.is-new {
  border-color: rgba(201, 162, 39, 0.35);
}

.order-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.chip {
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray);
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

/* 운영자가 확인할 차례인 주문만 골드로 띄운다 */
.chip-submitted {
  color: var(--gold);
  border-color: rgba(201, 162, 39, 0.35);
}

.chip-paid {
  color: var(--white);
}

.order-id {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--gray);
}

.order-summary {
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.6;
}

.order-summary strong {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.order-memo,
.order-new-note {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--gray);
}

.order-new-note {
  margin-top: 10px;
  color: var(--white);
}

.order-meta {
  margin: 14px 0 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.order-meta > div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.order-meta dt {
  flex: 0 0 auto;
  font-size: 14px;
  color: var(--gray);
}

.order-meta dd {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  text-align: right;
  overflow-wrap: anywhere;
}

.order-meta a {
  color: var(--white);
  text-underline-offset: 3px;
}

.order-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary,
  .btn-ghost {
    transition: none;
  }
}
</style>
