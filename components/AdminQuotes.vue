<script setup lang="ts">
import { ref, shallowRef, computed, watch, nextTick, onMounted } from 'vue'
import { siteConfig } from '~/config/site'
import { computeQuote, formatMoney, formatQuoteDate, formatWeight, QUOTE_MATERIALS, QUOTE_MAX_ITEMS, QUOTE_OPTIONAL_COLUMNS, quoteColumnHeaders, quoteLabels, type QuoteContent, type QuoteOptionalColumn } from '~/utils/quote'
import { drawQuote } from '~/utils/quote-canvas'
import { extractSeal } from '~/utils/seal-image'

// 관리 페이지의 견적서 탭. 기존 견적서 양식 그대로 그려 이미지로 저장하고, 고객에게 보낼 링크를 만든다.
// 화면 공통 스타일은 pages/admin/index.vue에 있다.
const props = defineProps<{
  api: <T>(url: string, options?: { method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE'; body?: Record<string, unknown> }) => Promise<T>
}>()

interface AdminQuote extends QuoteContent {
  id: string
  token: string
  memo: string
  total: number
  state: 'active' | 'cancelled'
  createdAt: string
}

const supplier = {
  company: siteConfig.name,
  representative: siteConfig.representative,
  address: siteConfig.address.full,
  phone: siteConfig.phone,
}

const errorMessage = (e: any, fallback: string) => e?.data?.message || fallback
const digits = (value: string) => Number(value.replace(/\D/g, ''))
const withCommas = (value: number) => value ? formatMoney(value) : ''

// ===== 작성 =====
// 입력 칸은 문자열로 들고 있다가 계산할 때 숫자로 바꾼다 (금액 칸에는 쉼표가 들어간다).
const buildItem = () => ({ name: '', weight: '', unit: '돈', spec: '', quantity: '1', price: '', labor: '', fixedPrice: false, unitPrice: '' })
type FormItem = ReturnType<typeof buildItem>
const todayInSeoul = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
const buildForm = (hiddenColumns: QuoteOptionalColumn[] = [], seal = false) => ({
  recipient: '',
  quoteDate: todayInSeoul(),
  vatIncluded: false,
  showVat: false,
  roundDown: false,
  hiddenColumns,
  seal,
  items: [buildItem()],
  note: '',
  memo: '',
})
const form = ref(buildForm())

// 쓰지 않는 칸은 견적서에서 뺀다. 어떤 칸을 쓰는지는 대개 매번 같으므로 이 기기에 기억해 둔다.
const COLUMNS_STORAGE_KEY = 'ng_quote_hidden_columns'
const onlyOptionalColumns = (value: unknown) => QUOTE_OPTIONAL_COLUMNS.filter(column => Array.isArray(value) && value.includes(column))
const rememberColumns = () => {
  try { localStorage.setItem(COLUMNS_STORAGE_KEY, JSON.stringify(form.value.hiddenColumns)) } catch { /* 저장이 막힌 브라우저에서는 기억하지 않는다 */ }
}
const toggleColumn = (column: QuoteOptionalColumn) => {
  const hidden = form.value.hiddenColumns
  form.value.hiddenColumns = hidden.includes(column) ? hidden.filter(key => key !== column) : onlyOptionalColumns([...hidden, column])
  rememberColumns()
}
const columnNames = computed(() => quoteColumnHeaders(form.value.vatIncluded))

const content = computed<QuoteContent>(() => ({
  recipient: form.value.recipient.trim(),
  quoteDate: form.value.quoteDate,
  vatIncluded: form.value.vatIncluded,
  showVat: form.value.vatIncluded && form.value.showVat,
  roundDown: form.value.roundDown,
  hiddenColumns: form.value.hiddenColumns,
  seal: form.value.seal,
  items: form.value.items.map(item => ({
    name: item.name.trim(),
    weight: Number.parseFloat(item.weight) || 0,
    unit: item.unit.trim(),
    spec: item.spec.trim(),
    quantity: digits(item.quantity) || 1,
    // 판매가격만 적는 품목은 시세·공임 칸에 남아 있는 값을 쓰지 않는다.
    price: item.fixedPrice ? 0 : digits(item.price),
    labor: item.fixedPrice ? 0 : digits(item.labor),
    fixedPrice: item.fixedPrice,
    unitPrice: item.fixedPrice ? digits(item.unitPrice) : 0,
  })),
  note: form.value.note.trim(),
}))
const labels = computed(() => quoteLabels(form.value.vatIncluded))
const totals = computed(() => computeQuote(content.value))

// 입력하는 동안 천 단위 쉼표를 붙여 금액을 잘못 읽지 않게 한다.
const formatMoneyField = (item: FormItem, key: 'price' | 'labor' | 'unitPrice') => {
  item[key] = withCommas(digits(item[key]))
}

const addItem = () => {
  if (form.value.items.length < QUOTE_MAX_ITEMS) form.value.items.push(buildItem())
}
const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

// ===== 직인 =====
// 직인 이미지는 서버에 한 번 등록해 두고 견적서를 그릴 때만 받아 온다. 사이트 어디에도 공개되지 않는다.
const SEAL_STORAGE_KEY = 'ng_quote_seal'
const sealImage = shallowRef<ImageBitmap | null>(null)
const sealPreviewUrl = ref('')
const sealError = ref('')
const isSealBusy = ref(false)

const loadSeal = async () => {
  const response = await fetch('/api/admin/seal', { credentials: 'same-origin' }).catch(() => null)
  if (sealPreviewUrl.value) URL.revokeObjectURL(sealPreviewUrl.value)
  if (!response?.ok) {
    sealImage.value = null
    sealPreviewUrl.value = ''
    return
  }
  const blob = await response.blob()
  sealImage.value = await createImageBitmap(blob)
  sealPreviewUrl.value = URL.createObjectURL(blob)
}

const setSeal = (seal: boolean) => {
  form.value.seal = seal
  try { localStorage.setItem(SEAL_STORAGE_KEY, seal ? '1' : '0') } catch { /* 저장이 막힌 브라우저에서는 기억하지 않는다 */ }
}

// 미리보기가 곧 저장되는 이미지다 — 고객이 내려받는 파일도 이 그림 그대로다.
const canvasRef = ref<HTMLCanvasElement | null>(null)
const redraw = () => {
  if (canvasRef.value) drawQuote(canvasRef.value, content.value, supplier, sealImage.value)
}
watch([content, sealImage], redraw, { deep: true })

const createError = ref('')
const isCreating = ref(false)
const createdId = ref('')
// 수정 중인 견적번호. 비어 있으면 새 견적서를 만든다.
const editingId = ref('')
const savedAs = ref<'created' | 'updated'>('created')

const canvasToBase64 = (canvas: HTMLCanvasElement) => new Promise<string>((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (!blob) return reject(new Error('canvas export failed'))
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  }, 'image/png')
})

const uploadSeal = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || isSealBusy.value) return
  sealError.value = ''
  isSealBusy.value = true
  try {
    // 사진에서 빨간 도장만 남기고 종이 배경은 지운다.
    const image = await canvasToBase64(await extractSeal(file))
    await props.api('/api/admin/seal', { method: 'PUT', body: { image } })
    await loadSeal()
    setSeal(true)
  } catch (e) {
    sealError.value = errorMessage(e, '사진에서 빨간 도장을 찾지 못했습니다. 도장이 또렷하게 나온 사진으로 다시 올려주세요.')
  } finally {
    isSealBusy.value = false
  }
}

const removeSeal = async () => {
  if (isSealBusy.value || !window.confirm('등록된 직인을 지울까요?\n이미 만든 견적서의 이미지는 바뀌지 않습니다.')) return
  sealError.value = ''
  isSealBusy.value = true
  try {
    await props.api('/api/admin/seal', { method: 'DELETE' })
    await loadSeal()
  } catch (e) {
    sealError.value = errorMessage(e, '직인을 지우지 못했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isSealBusy.value = false
  }
}

const saveQuote = async () => {
  if (isCreating.value || !canvasRef.value) return
  createError.value = ''

  if (content.value.items.some(item => !item.name)) {
    createError.value = '품명을 입력해주세요.'
    return
  }

  isCreating.value = true
  try {
    redraw()
    const image = await canvasToBase64(canvasRef.value)
    const editing = editingId.value
    // 수정은 같은 견적번호와 링크에 내용과 이미지만 바꿔 넣는다.
    const response = await props.api<{ quote: AdminQuote }>(editing ? `/api/admin/quotes/${editing}` : '/api/admin/quotes', {
      method: editing ? 'PUT' : 'POST',
      body: { ...content.value, memo: form.value.memo, image },
    })
    // 비슷한 견적서를 이어서 만들 수 있게 입력 내용은 지우지 않는다.
    quotes.value = editing
      ? quotes.value.map(item => item.id === editing ? response.quote : item)
      : [response.quote, ...quotes.value]
    createdId.value = response.quote.id
    savedAs.value = editing ? 'updated' : 'created'
    editingId.value = ''
    await nextTick()
    document.getElementById(`quote-${response.quote.id}`)?.scrollIntoView({ block: 'center' })
  } catch (e) {
    createError.value = errorMessage(e, '견적서를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.')
  } finally {
    isCreating.value = false
  }
}

const resetForm = () => {
  form.value = buildForm(form.value.hiddenColumns, form.value.seal)
  createError.value = ''
}

// 만든 견적서의 내용을 입력 칸으로 가져온다.
const formRef = ref<HTMLElement | null>(null)
const fillForm = (quote: AdminQuote, quoteDate: string) => {
  form.value = {
    recipient: quote.recipient,
    quoteDate,
    vatIncluded: quote.vatIncluded,
    showVat: quote.showVat === true,
    roundDown: quote.roundDown,
    hiddenColumns: onlyOptionalColumns(quote.hiddenColumns),
    seal: quote.seal === true,
    items: quote.items.map(item => ({
      name: item.name,
      weight: item.weight ? String(item.weight) : '',
      unit: item.unit,
      spec: item.spec,
      quantity: String(item.quantity),
      price: withCommas(item.price),
      labor: withCommas(item.labor),
      fixedPrice: item.fixedPrice === true,
      unitPrice: withCommas(item.unitPrice || 0),
    })),
    note: quote.note,
    memo: quote.memo,
  }
  createError.value = ''
  formRef.value?.scrollIntoView({ block: 'start' })
}

// 복사해 새로 작성: 오늘 날짜의 새 견적서가 된다.
const loadQuote = (quote: AdminQuote) => {
  editingId.value = ''
  fillForm(quote, todayInSeoul())
}

// 수정: 견적일을 포함해 그대로 불러오고, 저장하면 같은 링크의 내용이 바뀐다.
const startEdit = (quote: AdminQuote) => {
  editingId.value = quote.id
  fillForm(quote, quote.quoteDate)
}

const cancelEdit = () => {
  editingId.value = ''
  resetForm()
}

// ===== 목록 =====
const quotes = ref<AdminQuote[]>([])
const listError = ref('')
const isLoading = ref(false)
const busyId = ref('')

const loadQuotes = async () => {
  if (isLoading.value) return
  listError.value = ''
  isLoading.value = true
  try {
    const response = await props.api<{ quotes: AdminQuote[] }>('/api/admin/quotes')
    quotes.value = response.quotes
  } catch (e) {
    listError.value = errorMessage(e, '목록을 불러오지 못했습니다.')
  } finally {
    isLoading.value = false
  }
}

const cancelQuote = async (quote: AdminQuote) => {
  if (busyId.value) return
  if (!window.confirm('이 견적서를 취소할까요?\n고객에게 보낸 링크와 이미지가 더 이상 열리지 않습니다.')) return
  listError.value = ''
  busyId.value = quote.id
  try {
    const response = await props.api<{ quote: AdminQuote }>(`/api/admin/quotes/${quote.id}`, { method: 'PATCH', body: { action: 'cancel' } })
    quotes.value = quotes.value.map(item => item.id === quote.id ? response.quote : item)
  } catch (e: any) {
    listError.value = errorMessage(e, '처리하지 못했습니다. 잠시 후 다시 시도해주세요.')
    if (e?.statusCode === 409) await loadQuotes()
  } finally {
    busyId.value = ''
  }
}

// ===== 고객 링크와 이미지 =====
const quoteLink = (quote: AdminQuote) => `${window.location.origin}/quote/${quote.token}`
const imageUrl = (quote: AdminQuote) => `/api/quote/${quote.token}/image?download=1`
const copiedId = ref('')
const canShare = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyLink = async (quote: AdminQuote) => {
  const link = quoteLink(quote)
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
  copiedId.value = quote.id
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copiedId.value = '' }, 2400)
}

const shareLink = async (quote: AdminQuote) => {
  try {
    await navigator.share({ title: `${siteConfig.name} 견적서`, url: quoteLink(quote) })
  } catch { /* 공유 창을 닫은 경우 */ }
}

const itemSummary = (quote: AdminQuote) => quote.items
  .map(item => [item.name, formatWeight(item), `${item.quantity}개`].filter(Boolean).join(' '))
  .join(', ')

onMounted(() => {
  canShare.value = typeof navigator.share === 'function'
  try {
    form.value.hiddenColumns = onlyOptionalColumns(JSON.parse(localStorage.getItem(COLUMNS_STORAGE_KEY) || '[]'))
    form.value.seal = localStorage.getItem(SEAL_STORAGE_KEY) === '1'
  } catch { /* 기억해 둔 값이 없거나 읽을 수 없으면 모든 칸을 넣고 직인은 뺀다 */ }
  loadSeal()
  redraw()
  loadQuotes()
})
</script>

<template>
  <div class="admin-tab">
    <!-- 새 견적서 -->
    <section ref="formRef" class="panel">
      <h2 class="section-title">{{ editingId ? '견적서 수정' : '새 견적서' }}</h2>
      <p v-if="editingId" class="hint editing-note">{{ editingId }} 수정 중입니다. 저장하면 고객에게 보낸 링크는 그대로이고 내용과 이미지만 바뀝니다.</p>
      <form class="stack" @submit.prevent="saveQuote">
        <div class="field">
          <label class="field-label" for="quote-recipient">받는 분 <span class="optional">(선택)</span></label>
          <input id="quote-recipient" v-model="form.recipient" type="text" class="field-input" maxlength="40" placeholder="이름 또는 회사명">
          <p class="hint">견적서에는 뒤에 '귀하'가 붙습니다. 비워 두면 받는 분 없이 만들어집니다.</p>
        </div>

        <div class="field">
          <label class="field-label" for="quote-date">견적일</label>
          <input id="quote-date" v-model="form.quoteDate" type="date" class="field-input" required>
        </div>

        <div class="field">
          <span id="quote-vat-label" class="field-label">금액 기준</span>
          <div class="segmented" role="group" aria-labelledby="quote-vat-label">
            <button type="button" class="segment" :aria-pressed="!form.vatIncluded" @click="form.vatIncluded = false">공급가액 (부가세 별도)</button>
            <button type="button" class="segment" :aria-pressed="form.vatIncluded" @click="form.vatIncluded = true">판매가격 (부가세 포함)</button>
          </div>
          <template v-if="form.vatIncluded">
            <label class="check">
              <input type="checkbox" :checked="form.showVat" @change="form.showVat = !form.showVat">
              <span class="check-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span>표에 공급가액·부가세 따로 적기</span>
            </label>
            <p class="hint">판매가격을 공급가액과 부가세(10%)로 나눠 표에 함께 적고, 맨 아래 줄에 합계를 넣습니다. 합계금액은 그대로입니다.</p>
          </template>
        </div>

        <fieldset v-for="(item, index) in form.items" :key="index" class="quote-item">
          <legend class="field-label">품목 {{ index + 1 }}</legend>
          <div class="quote-item-grid">
            <div class="field quote-item-wide">
              <label class="field-label" :for="`quote-name-${index}`">품명</label>
              <div class="material-picker" role="group" :aria-label="`품목 ${index + 1} 소재 고르기`">
                <button
                  v-for="material in QUOTE_MATERIALS"
                  :key="material"
                  type="button"
                  class="segment"
                  :aria-pressed="item.name.trim() === material"
                  @click="item.name = material"
                >
                  {{ material }}
                </button>
              </div>
              <input :id="`quote-name-${index}`" v-model="item.name" type="text" class="field-input" maxlength="30" placeholder="위에서 고르거나 직접 입력" required>
            </div>

            <div class="field quote-item-wide">
              <span :id="`quote-mode-label-${index}`" class="field-label">금액 넣는 방식</span>
              <div class="segmented" role="group" :aria-labelledby="`quote-mode-label-${index}`">
                <button type="button" class="segment" :aria-pressed="!item.fixedPrice" @click="item.fixedPrice = false">시세로 계산</button>
                <button type="button" class="segment" :aria-pressed="item.fixedPrice" @click="item.fixedPrice = true">판매가격만 입력</button>
              </div>
            </div>

            <!-- 판매가격만 입력: 1개당 금액을 그대로 적는다 -->
            <div v-if="item.fixedPrice" class="field quote-item-wide">
              <label class="field-label" :for="`quote-unit-price-${index}`">{{ labels.unitTotal }}</label>
              <input :id="`quote-unit-price-${index}`" v-model="item.unitPrice" type="text" class="field-input" inputmode="numeric" autocomplete="off" placeholder="1,500,000" @input="formatMoneyField(item, 'unitPrice')">
            </div>
            <!-- 시세로 계산: 중량 × 시세 + 공임 -->
            <template v-else>
              <div class="field">
                <label class="field-label" :for="`quote-price-${index}`">시세 <span class="optional">(중량 1{{ item.unit || '단위' }}당)</span></label>
                <input :id="`quote-price-${index}`" v-model="item.price" type="text" class="field-input" inputmode="numeric" autocomplete="off" placeholder="843,000" @input="formatMoneyField(item, 'price')">
              </div>
              <div class="field">
                <label class="field-label" :for="`quote-labor-${index}`">공임 <span class="optional">(1개당)</span></label>
                <input :id="`quote-labor-${index}`" v-model="item.labor" type="text" class="field-input" inputmode="numeric" autocomplete="off" placeholder="900,000" @input="formatMoneyField(item, 'labor')">
              </div>
            </template>

            <div class="field">
              <label class="field-label" :for="`quote-weight-${index}`">중량 <span v-if="item.fixedPrice" class="optional">(선택)</span></label>
              <input :id="`quote-weight-${index}`" v-model="item.weight" type="text" class="field-input" inputmode="decimal" autocomplete="off" placeholder="15">
            </div>
            <div class="field">
              <label class="field-label" :for="`quote-unit-${index}`">중량 단위</label>
              <input :id="`quote-unit-${index}`" v-model="item.unit" type="text" class="field-input" maxlength="6" placeholder="돈">
            </div>
            <div class="field">
              <label class="field-label" :for="`quote-quantity-${index}`">수량</label>
              <input :id="`quote-quantity-${index}`" v-model="item.quantity" type="text" class="field-input" inputmode="numeric" autocomplete="off" required>
            </div>
            <div class="field quote-item-wide">
              <label class="field-label" :for="`quote-spec-${index}`">규격 <span class="optional">(선택)</span></label>
              <input :id="`quote-spec-${index}`" v-model="item.spec" type="text" class="field-input" maxlength="60" placeholder="높이 6cm / 가로 4cm">
            </div>
          </div>
          <p class="quote-item-total">
            {{ labels.unitTotal }} {{ formatMoney(totals.rows[index].unitTotal) }}원 · {{ labels.total }} <strong>{{ formatMoney(totals.rows[index].total) }}원</strong>
          </p>
          <button v-if="form.items.length > 1" type="button" class="btn-text" @click="removeItem(index)">이 품목 빼기</button>
        </fieldset>

        <button v-if="form.items.length < QUOTE_MAX_ITEMS" type="button" class="btn-ghost" @click="addItem">품목 추가</button>

        <button type="button" class="segment segment-single" :aria-pressed="form.roundDown" @click="form.roundDown = !form.roundDown">
          총시세 천 원 미만 버림
        </button>

        <fieldset class="column-picker">
          <legend class="field-label">견적서에 넣을 칸</legend>
          <div class="check-grid">
            <label v-for="column in QUOTE_OPTIONAL_COLUMNS" :key="column" class="check">
              <input type="checkbox" :checked="!form.hiddenColumns.includes(column)" @change="toggleColumn(column)">
              <span class="check-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span>{{ columnNames[column].replace('\n', ' ') }}</span>
            </label>
          </div>
          <p class="hint">쓰지 않는 칸은 체크를 풀면 견적서에서 빠집니다. 품명과 {{ labels.total }} 칸은 항상 들어가고, 뺀 칸에 적은 값도 합계 계산에는 그대로 들어갑니다.</p>
        </fieldset>

        <fieldset class="column-picker">
          <legend class="field-label">직인</legend>
          <label class="check">
            <input type="checkbox" :checked="form.seal" @change="setSeal(!form.seal)">
            <span class="check-box">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span>견적서에 직인 넣기</span>
          </label>
          <div class="seal-row">
            <img v-if="sealPreviewUrl" :src="sealPreviewUrl" alt="등록된 직인" class="seal-thumb">
            <label class="btn-ghost seal-upload">
              {{ isSealBusy ? '처리하는 중...' : sealPreviewUrl ? '직인 사진 바꾸기' : '직인 사진 올리기' }}
              <input type="file" accept="image/*" :disabled="isSealBusy" @change="uploadSeal">
            </label>
            <button v-if="sealPreviewUrl" type="button" class="btn-text" :disabled="isSealBusy" @click="removeSeal">직인 지우기</button>
          </div>
          <p v-if="sealError" class="error" role="alert">{{ sealError }}</p>
          <p class="hint">
            대표자 이름 옆 '(인)' 자리에 찍히고, '본 견적서는 검인없이 사용함' 문구는 빠집니다.
            {{ sealPreviewUrl ? '' : '등록된 직인이 없으면 찍을 자리만 표시됩니다.' }}
            직인 이미지는 이 관리 화면에서만 쓰이고 사이트에 공개되지 않습니다.
          </p>
        </fieldset>

        <div class="field">
          <label class="field-label" for="quote-note">비고 <span class="optional">(선택 · 견적서에 인쇄됩니다)</span></label>
          <input id="quote-note" v-model="form.note" type="text" class="field-input" maxlength="200" placeholder="※ 수량 5개 기준 총공급가액입니다.">
        </div>

        <div class="field">
          <label class="field-label" for="quote-memo">메모 <span class="optional">(선택 · 고객에게 보이지 않습니다)</span></label>
          <input id="quote-memo" v-model="form.memo" type="text" class="field-input" maxlength="200">
        </div>

        <div class="field">
          <span class="field-label">미리보기 <span class="optional">(이 모양 그대로 이미지로 저장됩니다)</span></span>
          <div class="quote-preview">
            <canvas ref="canvasRef" role="img" :aria-label="`${labels.title} 미리보기. 합계금액 ${formatMoney(totals.total)}원`"></canvas>
          </div>
          <p class="quote-total">합계금액 <strong>{{ formatMoney(totals.total) }}원</strong></p>
        </div>

        <p v-if="createError" class="error" role="alert">{{ createError }}</p>
        <button type="submit" class="btn-primary" :disabled="isCreating">
          {{ isCreating ? '저장하는 중...' : editingId ? '수정 저장' : '견적서 만들기' }}
        </button>
        <button v-if="editingId" type="button" class="btn-text" @click="cancelEdit">수정 취소</button>
        <button v-else type="button" class="btn-text" @click="resetForm">입력 내용 지우기</button>
      </form>
    </section>

    <!-- 견적서 목록 -->
    <section>
      <div class="list-header">
        <h2 class="section-title">견적서 목록</h2>
        <button type="button" class="btn-text" :disabled="isLoading" @click="loadQuotes">
          {{ isLoading ? '불러오는 중...' : '새로고침' }}
        </button>
      </div>

      <p v-if="listError" class="error" role="alert">{{ listError }}</p>
      <p v-if="!quotes.length && !isLoading" class="muted">아직 만든 견적서가 없습니다.</p>

      <ul class="order-list">
        <li
          v-for="quote in quotes"
          :id="`quote-${quote.id}`"
          :key="quote.id"
          class="order-card"
          :class="{ 'is-new': quote.id === createdId }"
        >
          <div class="order-top">
            <span class="chip" :class="quote.state === 'active' ? 'chip-paid' : ''">{{ quote.state === 'active' ? '발행' : '취소' }}</span>
            <span class="order-id">{{ quote.id }}</span>
          </div>

          <p class="order-summary">{{ quote.recipient ? `${quote.recipient} 귀하` : '받는 분 없음' }} · <strong>{{ formatMoney(quote.total) }}원</strong></p>
          <p class="order-memo">{{ formatQuoteDate(quote.quoteDate) }} · {{ quoteLabels(quote.vatIncluded).title }} · {{ itemSummary(quote) }}{{ quote.showVat ? ' · 부가세 표기' : '' }}{{ quote.seal ? ' · 직인' : '' }}</p>
          <p v-if="quote.memo" class="order-memo">{{ quote.memo }}</p>
          <p v-if="quote.id === createdId" class="order-new-note">
            {{ savedAs === 'updated' ? '수정했습니다. 고객에게 보낸 링크는 그대로이고 내용만 바뀌었습니다.' : '견적서를 만들었습니다. 링크를 복사해 고객에게 보내주세요.' }}
          </p>

          <div class="order-actions">
            <template v-if="quote.state === 'active'">
              <button type="button" class="btn-ghost" @click="copyLink(quote)">
                <span aria-live="polite">{{ copiedId === quote.id ? '복사했습니다' : '링크 복사' }}</span>
              </button>
              <button v-if="canShare" type="button" class="btn-ghost" @click="shareLink(quote)">공유</button>
              <a class="btn-ghost" :href="imageUrl(quote)">이미지 저장</a>
            </template>
            <button v-if="quote.state === 'active'" type="button" class="btn-text" @click="startEdit(quote)">수정</button>
            <button type="button" class="btn-text" @click="loadQuote(quote)">복사해 새로 작성</button>
            <button v-if="quote.state === 'active'" type="button" class="btn-text" :disabled="busyId === quote.id" @click="cancelQuote(quote)">견적 취소</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
.admin .segmented {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

/* 켜고 끄는 선택 버튼 — 켜진 쪽만 골드 */
.admin .segment {
  min-height: 48px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  font-weight: 600;
  color: var(--gray);
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.14);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.admin .segment[aria-pressed="true"] {
  color: var(--gold);
  background: rgba(201, 162, 39, 0.1);
  border-color: rgba(201, 162, 39, 0.35);
}

.admin .segment-single {
  width: 100%;
}

/* 견적서에 넣을 칸 고르기 */
.admin .column-picker {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.admin .column-picker legend {
  padding: 0;
  margin-bottom: 4px;
}

.admin .check-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 12px;
  margin-bottom: 8px;
}

.admin .check {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  font-size: 14px;
  cursor: pointer;
}

/* 시각적으로만 숨김 — display:none은 키보드 포커스를 막는다 */
.admin .check input {
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
}

.admin .check input:focus-visible + .check-box {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.admin .check-box {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(250, 250, 250, 0.3);
  color: transparent;
}

.admin .check input:checked + .check-box {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--black);
}

.admin .editing-note {
  margin-top: 8px;
  color: var(--white);
}

/* 직인 등록 */
.admin .seal-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 4px 0 8px;
}

/* 직인은 흰 종이에 찍는 것이라 흰 바탕에 보여준다 */
.admin .seal-thumb {
  width: 64px;
  height: 64px;
  padding: 6px;
  object-fit: contain;
  background: var(--white);
}

.admin .seal-upload {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}

/* 시각적으로만 숨김 — 라벨을 누르면 파일 선택이 열린다 */
.admin .seal-upload input {
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
}

.admin .seal-upload:has(input:focus-visible) {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.admin .quote-item {
  min-width: 0;
  margin: 0;
  padding: 16px;
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .quote-item legend {
  padding: 0 8px;
}

.admin .quote-item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 12px;
}

.admin .quote-item-wide {
  grid-column: 1 / -1;
}

/* 품명에 자주 쓰는 소재를 한 번에 넣는다 */
.admin .material-picker {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.admin .quote-item-total,
.admin .quote-total {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--gray);
}

.admin .quote-item-total strong,
.admin .quote-total strong {
  color: var(--white);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.admin .quote-total {
  margin-top: 4px;
  text-align: right;
}

/* 견적서는 흰 종이 문서다 — 어두운 화면 위에 종이 그대로 올린다 */
.admin .quote-preview {
  border: 1px solid rgba(250, 250, 250, 0.14);
  line-height: 0;
}

.admin .quote-preview canvas {
  display: block;
  width: 100%;
  height: auto;
}

.admin a.btn-ghost {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
  .admin .segment {
    transition: none;
  }
}
</style>
