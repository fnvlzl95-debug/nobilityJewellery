<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { siteConfig } from '~/config/site'
import { addVat, ORDER_ACCOUNTS, orderAccount, paymentStage, type AdminOrder, type OrderState } from '~/utils/order'
import { splitVat } from '~/utils/quote'

// 운영자 전용 화면: 1대1 주문서를 만들어 접수와 입금을 확인하고, 견적서를 만든다 (components/AdminQuotes.vue).
// 주문서·입금확인서 이미지는 components/AdminOrderDoc.vue가 그린다.
// 로그인 여부는 서버가 쿠키로 판단한다 (server/utils/admin-auth.ts).
definePageMeta({ layout: false })

useHead({
  title: `관리 | ${siteConfig.name}`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

type OrderAction = 'markPaid' | 'unmarkPaid' | 'markBalancePaid' | 'unmarkBalancePaid' | 'cancel'
type DocKind = 'sheet' | 'deposit' | 'full'

const stateLabels: Record<OrderState, string> = {
  open: '작성 대기',
  expired: '기한 만료',
  submitted: '접수 · 입금 대기',
  paid: '입금 확인',
  cancelled: '취소',
}
// 입금 확인 뒤에는 계약금만 받았는지, 완불인지로 나눠 보여준다.
const stateLabel = (order: AdminOrder) => {
  const stage = paymentStage(order)
  return stage === 'deposit' ? '계약금 입금 · 잔금 대기' : stage === 'full' ? '완불' : stateLabels[order.state]
}
// 운영자가 확인할 차례(접수, 잔금 대기)인 주문만 골드로 띄운다.
const chipClass = (order: AdminOrder) => paymentStage(order) === 'deposit' ? 'chip-submitted' : `chip-${order.state}`

const view = ref<'loading' | 'login' | 'ready'>('loading')
const tab = ref<'orders' | 'quotes'>('orders')

const errorMessage = (e: any, fallback: string) => e?.data?.message || fallback

// 세션이 끊겼으면 어떤 요청에서든 로그인 화면으로 돌아간다.
const api = async <T>(url: string, options: { method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE'; body?: Record<string, unknown> } = {}): Promise<T> => {
  try {
    return await $fetch<T>(url, options) as T
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
    view.value = 'ready'
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

// ===== 새 주문서 · 수정 =====
// 입력 칸은 문자열로 들고 있다가 보낼 때 숫자로 바꾼다 (금액 칸에는 쉼표가 들어간다).
const buildOrderForm = () => ({
  customerName: '',
  customerPhone: '',
  amount: '',
  addVat: false,
  payment: 'full' as 'full' | 'deposit',
  deposit: '',
  account: ORDER_ACCOUNTS[0].id,
  product: siteConfig.order.defaultProduct,
  spec: '',
  dueDate: '',
  customerAddress: '',
  memo: '',
  validDays: 14,
})
const orderForm = ref(buildOrderForm())
const orderFormRef = ref<HTMLElement | null>(null)
const createError = ref('')
const isCreating = ref(false)
const createdId = ref('')
// 수정 중인 접수번호. 비어 있으면 새 주문서를 만든다.
const editingId = ref('')
const savedAs = ref<'created' | 'updated'>('created')

const digitsOf = (value: string) => Number(value.replace(/\D/g, ''))
const withCommas = (value: number) => value ? value.toLocaleString('ko-KR') : ''
const baseAmount = computed(() => digitsOf(orderForm.value.amount))
const totalAmount = computed(() => orderForm.value.addVat ? addVat(baseAmount.value) : baseAmount.value)
const depositAmount = computed(() => orderForm.value.payment === 'deposit' ? digitsOf(orderForm.value.deposit) : 0)
const hasCustomer = computed(() => orderForm.value.customerName.trim() !== '')

// 입력하는 동안 천 단위 쉼표를 붙여 금액을 잘못 읽지 않게 한다.
const formatMoneyInput = (key: 'amount' | 'deposit') => {
  orderForm.value[key] = withCommas(digitsOf(orderForm.value[key]))
}

const saveOrder = async () => {
  if (isCreating.value) return
  createError.value = ''
  const form = orderForm.value

  if (!baseAmount.value) {
    createError.value = '금액을 입력해주세요.'
    return
  }
  if (hasCustomer.value !== (form.customerPhone.trim() !== '')) {
    createError.value = '주문자와 전화번호를 함께 입력해주세요.'
    return
  }
  if (form.payment === 'deposit' && !depositAmount.value) {
    createError.value = '계약금을 입력해주세요.'
    return
  }
  if (depositAmount.value >= totalAmount.value) {
    createError.value = '계약금은 총금액보다 적어야 합니다.'
    return
  }

  isCreating.value = true
  try {
    const editing = editingId.value
    const response = await api<{ order: AdminOrder }>(editing ? `/api/admin/orders/${editing}` : '/api/admin/orders', {
      method: editing ? 'PUT' : 'POST',
      body: {
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        amount: baseAmount.value,
        addVat: form.addVat,
        deposit: depositAmount.value,
        account: form.account,
        product: form.product,
        spec: form.spec,
        dueDate: form.dueDate,
        memo: form.memo,
        validDays: form.validDays,
      },
    })
    orders.value = editing
      ? orders.value.map(item => item.id === editing ? response.order : item)
      : [response.order, ...orders.value]
    createdId.value = response.order.id
    savedAs.value = editing ? 'updated' : 'created'
    editingId.value = ''
    orderForm.value = buildOrderForm()
    await nextTick()
    document.getElementById(`order-${response.order.id}`)?.scrollIntoView({ block: 'center' })
  } catch (e: any) {
    createError.value = errorMessage(e, '주문서를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.')
    if (e?.statusCode === 409) await loadOrders().catch(() => {})
  } finally {
    isCreating.value = false
  }
}

// 만든 주문서를 입력 칸으로 불러와 고친다. 부가세를 더한 주문은 공급가액으로 되돌려 보여준다.
const startEdit = (order: AdminOrder) => {
  editingId.value = order.id
  orderForm.value = {
    customerName: order.customerName || '',
    customerPhone: order.customerPhone || '',
    amount: withCommas(order.vatIncluded ? splitVat(order.amount).supply : order.amount),
    addVat: order.vatIncluded,
    payment: order.deposit ? 'deposit' : 'full',
    deposit: withCommas(order.deposit),
    account: orderAccount(order.account).id,
    product: order.product,
    spec: order.spec,
    dueDate: order.dueDate,
    customerAddress: order.customerAddress || '',
    memo: order.memo,
    validDays: 14,
  }
  createError.value = ''
  orderFormRef.value?.scrollIntoView({ block: 'start' })
}

const cancelEdit = () => {
  editingId.value = ''
  orderForm.value = buildOrderForm()
  createError.value = ''
}

const savedNote = (order: AdminOrder) => {
  if (savedAs.value === 'updated') return '수정했습니다. 고객에게 보낸 링크는 그대로이고 내용만 바뀌었습니다.'
  return order.customerName
    ? '주문서를 만들었습니다. "주문서 이미지"로 바로 보내거나 링크를 보내주세요.'
    : '주문서를 만들었습니다. 링크를 복사해 고객에게 보내주세요.'
}

// ===== 주문서 · 입금확인서 이미지 =====
const openDoc = ref<{ id: string; kind: DocKind } | null>(null)
const toggleDoc = (order: AdminOrder, kind: DocKind) => {
  openDoc.value = openDoc.value?.id === order.id && openDoc.value.kind === kind ? null : { id: order.id, kind }
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
      view.value = 'ready'
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
      <h1 class="admin-title">{{ siteConfig.name }} 관리</h1>
      <button v-if="view === 'ready'" type="button" class="btn-text" @click="logout">로그아웃</button>
    </header>

    <nav v-if="view === 'ready'" class="tabs" aria-label="관리 메뉴">
      <button type="button" class="tab" :aria-current="tab === 'orders' ? 'page' : undefined" @click="tab = 'orders'">주문서</button>
      <button type="button" class="tab" :aria-current="tab === 'quotes' ? 'page' : undefined" @click="tab = 'quotes'">견적서</button>
    </nav>

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
      <div v-show="tab === 'orders'" class="admin-tab">
      <!-- 새 주문서 · 수정 -->
      <section ref="orderFormRef" class="panel">
        <h2 class="section-title">{{ editingId ? '주문서 수정' : '새 주문서' }}</h2>
        <p v-if="editingId" class="hint editing-note">{{ editingId }} 수정 중입니다. 고객에게 보낸 링크와 접수·입금 기록은 그대로이고 내용만 바뀝니다.</p>
        <form class="stack" @submit.prevent="saveOrder">
          <div class="field">
            <label class="field-label" for="order-customer-name">주문자 <span class="optional">(선택)</span></label>
            <input id="order-customer-name" v-model="orderForm.customerName" type="text" class="field-input" maxlength="50" autocomplete="off">
          </div>

          <div class="field">
            <label class="field-label" for="order-customer-phone">전화번호 <span class="optional">(선택)</span></label>
            <input id="order-customer-phone" v-model="orderForm.customerPhone" type="tel" class="field-input" inputmode="tel" placeholder="010-0000-0000" autocomplete="off">
            <p class="hint">전화·카카오톡으로 받은 주문은 주문자와 전화번호를 적으면 바로 접수됩니다. 비워 두면 고객이 링크에서 직접 적습니다.</p>
          </div>

          <div class="field">
            <label class="field-label" for="new-amount">주문금액 (원)</label>
            <input
              id="new-amount"
              v-model="orderForm.amount"
              type="text"
              class="field-input"
              inputmode="numeric"
              placeholder="2,740,000"
              autocomplete="off"
              required
              @input="formatMoneyInput('amount')"
            >
            <label class="check">
              <input v-model="orderForm.addVat" type="checkbox">
              <span class="check-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span>부가세 10% 더하기</span>
            </label>
            <p v-if="orderForm.addVat && baseAmount" class="hint order-total-hint">
              총금액 <strong>{{ won(totalAmount) }}</strong> (공급가액 {{ won(baseAmount) }} + 부가세 {{ won(totalAmount - baseAmount) }})
            </p>
          </div>

          <div class="field">
            <span id="order-payment-label" class="field-label">결제</span>
            <div class="segmented" role="group" aria-labelledby="order-payment-label">
              <button type="button" class="segment" :aria-pressed="orderForm.payment === 'full'" @click="orderForm.payment = 'full'">완불</button>
              <button type="button" class="segment" :aria-pressed="orderForm.payment === 'deposit'" @click="orderForm.payment = 'deposit'">계약금</button>
            </div>
            <template v-if="orderForm.payment === 'deposit'">
              <input
                id="order-deposit"
                v-model="orderForm.deposit"
                type="text"
                class="field-input"
                inputmode="numeric"
                placeholder="계약금 1,000,000"
                aria-label="계약금 (원)"
                autocomplete="off"
                @input="formatMoneyInput('deposit')"
              >
              <p v-if="depositAmount && totalAmount > depositAmount" class="hint order-total-hint">잔금 <strong>{{ won(totalAmount - depositAmount) }}</strong></p>
            </template>
          </div>

          <div class="field">
            <span id="order-account-label" class="field-label">입금 계좌</span>
            <div class="segmented" role="group" aria-labelledby="order-account-label">
              <button v-for="item in ORDER_ACCOUNTS" :key="item.id" type="button" class="segment" :aria-pressed="orderForm.account === item.id" @click="orderForm.account = item.id">{{ item.bank }}</button>
            </div>
            <p class="hint">{{ orderAccount(orderForm.account).bank }} {{ orderAccount(orderForm.account).account }} (예금주 {{ orderAccount(orderForm.account).accountHolder }})</p>
          </div>

          <div class="field">
            <label class="field-label" for="new-product">상품명</label>
            <input id="new-product" v-model="orderForm.product" type="text" class="field-input" maxlength="60" required>
          </div>

          <div class="field">
            <label class="field-label" for="order-spec">제작 사양 <span class="optional">(선택)</span></label>
            <textarea id="order-spec" v-model="orderForm.spec" class="field-input" rows="3" maxlength="300" placeholder="14K 화이트골드 펜던트 1.5 × 2.5cm, 줄 60cm"></textarea>
          </div>

          <div class="field">
            <label class="field-label" for="order-due">수령 예정일 <span class="optional">(선택)</span></label>
            <input id="order-due" v-model="orderForm.dueDate" type="text" class="field-input" maxlength="40" placeholder="10월 30일 ~ 11월 2일">
          </div>

          <div class="field">
            <label class="field-label" for="order-address">배송지 <span class="optional">(선택)</span></label>
            <input id="order-address" v-model="orderForm.customerAddress" type="text" class="field-input" maxlength="200" autocomplete="off">
            <p class="hint">고객이 링크에서 주문서를 쓰면 고객이 적은 주소가 들어갑니다.</p>
          </div>

          <div class="field">
            <label class="field-label" for="new-memo">메모 <span class="optional">(선택 · 고객에게 보이지 않습니다)</span></label>
            <input id="new-memo" v-model="orderForm.memo" type="text" class="field-input" maxlength="200" placeholder="디자인, 참고 사항 등">
          </div>

          <div v-if="!editingId && !hasCustomer" class="field">
            <label class="field-label" for="new-valid">작성 기한</label>
            <select id="new-valid" v-model.number="orderForm.validDays" class="field-input">
              <option :value="7">7일</option>
              <option :value="14">14일</option>
              <option :value="30">30일</option>
            </select>
          </div>

          <p v-if="createError" class="error" role="alert">{{ createError }}</p>
          <button type="submit" class="btn-primary" :disabled="isCreating">
            {{ isCreating ? '저장하는 중...' : editingId ? '수정 저장' : '주문서 만들기' }}
          </button>
          <button v-if="editingId" type="button" class="btn-text" @click="cancelEdit">수정 취소</button>
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
              <span class="chip" :class="chipClass(order)">{{ stateLabel(order) }}</span>
              <span class="order-id">{{ order.id }}</span>
            </div>

            <p class="order-summary">{{ order.product }} · <strong>{{ won(order.amount) }}</strong>{{ order.vatIncluded ? ' (부가세 포함)' : '' }}</p>
            <p v-if="order.memo" class="order-memo">{{ order.memo }}</p>
            <p v-if="order.id === createdId" class="order-new-note">{{ savedNote(order) }}</p>

            <dl class="order-meta">
              <template v-if="order.customerName">
                <div>
                  <dt>주문자</dt>
                  <dd>{{ order.customerName }}</dd>
                </div>
                <div>
                  <dt>전화번호</dt>
                  <dd><a :href="`tel:${order.customerPhone}`">{{ order.customerPhone }}</a></dd>
                </div>
              </template>
              <div>
                <dt>결제</dt>
                <dd>{{ order.deposit ? `계약금 ${won(order.deposit)} · 잔금 ${won(order.amount - order.deposit)}` : '완불' }}</dd>
              </div>
              <div>
                <dt>입금 계좌</dt>
                <dd>{{ orderAccount(order.account).bank }} {{ orderAccount(order.account).account }}</dd>
              </div>
              <div v-if="order.spec">
                <dt>제작 사양</dt>
                <dd class="pre-line">{{ order.spec }}</dd>
              </div>
              <div v-if="order.dueDate">
                <dt>수령 예정일</dt>
                <dd>{{ order.dueDate }}</dd>
              </div>
              <div v-if="order.customerAddress">
                <dt>배송지</dt>
                <dd>{{ order.customerAddress }}</dd>
              </div>
              <div>
                <dt>만든 날</dt>
                <dd>{{ formatDate(order.createdAt) }}</dd>
              </div>
              <div v-if="order.state === 'open' || order.state === 'expired'">
                <dt>작성 기한</dt>
                <dd>{{ formatDate(order.expiresAt) }}</dd>
              </div>
              <div v-if="order.submittedAt">
                <dt>접수</dt>
                <dd>{{ formatDate(order.submittedAt) }}</dd>
              </div>
              <div v-if="order.paidAt">
                <dt>{{ order.deposit ? '계약금 입금 확인' : '입금 확인' }}</dt>
                <dd>{{ formatDate(order.paidAt) }}</dd>
              </div>
              <div v-if="order.balancePaidAt">
                <dt>잔금 입금 확인</dt>
                <dd>{{ formatDate(order.balancePaidAt) }}</dd>
              </div>
            </dl>

            <div v-if="order.state !== 'cancelled' && order.state !== 'expired'" class="order-actions">
              <button v-if="order.state === 'submitted'" type="button" class="btn-ghost" :disabled="busyId === order.id" @click="updateOrder(order, 'markPaid')">
                {{ order.deposit ? '계약금 입금 확인' : '입금 확인 (완불)' }}
              </button>
              <button v-if="paymentStage(order) === 'deposit'" type="button" class="btn-ghost" :disabled="busyId === order.id" @click="updateOrder(order, 'markBalancePaid')">
                잔금 입금 확인 (완불)
              </button>
              <template v-if="order.state === 'open' || order.state === 'submitted'">
                <button type="button" class="btn-ghost" @click="copyLink(order)">
                  <span aria-live="polite">{{ copiedId === order.id ? '복사했습니다' : '링크 복사' }}</span>
                </button>
                <button v-if="canShare" type="button" class="btn-ghost" @click="shareLink(order)">공유</button>
              </template>
              <button type="button" class="btn-ghost" :aria-expanded="openDoc?.id === order.id && openDoc.kind === 'sheet'" @click="toggleDoc(order, 'sheet')">주문서 이미지</button>
              <button v-if="order.deposit && paymentStage(order) !== 'none'" type="button" class="btn-ghost" :aria-expanded="openDoc?.id === order.id && openDoc.kind === 'deposit'" @click="toggleDoc(order, 'deposit')">계약금 입금확인서</button>
              <button v-if="paymentStage(order) === 'full'" type="button" class="btn-ghost" :aria-expanded="openDoc?.id === order.id && openDoc.kind === 'full'" @click="toggleDoc(order, 'full')">
                {{ order.deposit ? '완불 입금확인서' : '입금확인서' }}
              </button>
              <button type="button" class="btn-text" @click="startEdit(order)">내용 수정</button>
              <button v-if="order.state === 'open' || order.state === 'submitted'" type="button" class="btn-text" :disabled="busyId === order.id" @click="updateOrder(order, 'cancel')">주문 취소</button>
              <button v-if="order.state === 'paid' && !order.balancePaidAt" type="button" class="btn-text" :disabled="busyId === order.id" @click="updateOrder(order, 'unmarkPaid')">
                {{ order.deposit ? '계약금 확인 취소' : '입금 확인 취소' }}
              </button>
              <button v-if="order.balancePaidAt" type="button" class="btn-text" :disabled="busyId === order.id" @click="updateOrder(order, 'unmarkBalancePaid')">
                잔금 확인 취소
              </button>
            </div>

            <AdminOrderDoc
              v-if="openDoc && openDoc.id === order.id"
              :key="openDoc.kind"
              :order="order"
              :kind="openDoc.kind"
              @close="openDoc = null"
            />
          </li>
        </ul>
      </section>
      </div>

      <AdminQuotes v-show="tab === 'quotes'" :api="api" />
    </template>
  </div>
</template>

<style>
/* 견적서 탭(components/AdminQuotes.vue)과 함께 쓰는 스타일이라 scoped가 아니다. 모든 규칙을 .admin 아래로 묶는다.
   운영자 화면은 입력 내용이 다양해 서브셋 웹폰트 대신 기기 기본 글꼴로 통일한다. */
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

.admin .admin-header,
.admin .list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.admin .admin-tab {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
}

/* 주문서 / 견적서 전환 */
.admin .tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid rgba(250, 250, 250, 0.14);
}

.admin .tab {
  min-height: 48px;
  margin-bottom: -1px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  color: var(--gray);
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.admin .tab[aria-current="page"] {
  color: var(--white);
  border-bottom-color: var(--gold);
}

.admin .admin-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.admin .section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.admin .muted {
  margin: 0;
  font-size: 14px;
  color: var(--gray);
}

.admin .panel {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

/* ===== 입력 ===== */
.admin .field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin .field-label {
  font-size: 14px;
  font-weight: 600;
}

.admin .optional {
  font-weight: 400;
  color: var(--gray);
}

/* 16px 미만이면 iOS가 입력 포커스 때 화면을 확대한다 */
.admin .field-input {
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

.admin select.field-input {
  color-scheme: dark;
}

.admin .field-input::placeholder {
  color: var(--gray);
}

.admin textarea.field-input {
  resize: vertical;
}

.admin .order-total-hint strong {
  color: var(--white);
  font-variant-numeric: tabular-nums;
}

.admin .code-input {
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.2em;
}

.admin .hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
}

.admin .error {
  margin: 0;
  padding: 12px 16px;
  font-size: 14px;
  background: rgba(201, 162, 39, 0.1);
  border-left: 2px solid var(--gold);
}

.admin .list-header + .error {
  margin-top: 16px;
}

/* ===== 버튼 ===== */
.admin .btn-primary {
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

.admin .btn-primary:hover:not(:disabled) {
  background: var(--gold-light);
}

.admin .btn-ghost {
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

.admin .btn-ghost:hover:not(:disabled) {
  color: var(--gold-light);
  background: rgba(201, 162, 39, 0.1);
}

.admin .btn-text {
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

.admin .btn-text:hover:not(:disabled) {
  color: var(--white);
}

.admin .btn-primary:disabled,
.admin .btn-ghost:disabled,
.admin .btn-text:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== 주문서 목록 ===== */
.admin .list-header + .muted {
  margin-top: 16px;
}

.admin .order-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.admin .order-card {
  padding: 20px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .order-card.is-new {
  border-color: rgba(201, 162, 39, 0.35);
}

.admin .order-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.admin .chip {
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray);
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

/* 운영자가 확인할 차례인 주문만 골드로 띄운다 */
.admin .chip-submitted {
  color: var(--gold);
  border-color: rgba(201, 162, 39, 0.35);
}

.admin .chip-paid {
  color: var(--white);
}

.admin .order-id {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--gray);
}

.admin .order-summary {
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.6;
}

.admin .order-summary strong {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.admin .order-memo,
.admin .order-new-note {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--gray);
}

.admin .order-new-note {
  margin-top: 10px;
  color: var(--white);
}

.admin .order-meta {
  margin: 14px 0 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .order-meta > div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .order-meta dt {
  flex: 0 0 auto;
  font-size: 14px;
  color: var(--gray);
}

.admin .order-meta dd {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  text-align: right;
  overflow-wrap: anywhere;
}

.admin .order-meta .pre-line {
  white-space: pre-line;
}

.admin .order-meta a {
  color: var(--white);
  text-underline-offset: 3px;
}

.admin .order-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

@media (prefers-reduced-motion: reduce) {
  .admin .btn-primary,
  .admin .btn-ghost {
    transition: none;
  }
}
</style>
