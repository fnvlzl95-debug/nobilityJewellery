<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { siteConfig } from '~/config/site'
import type { AdminOrder } from '~/utils/order'
import { drawPaperDoc, orderSheetDoc, receiptDoc } from '~/utils/order-docs-canvas'

// 주문 카드 안에서 주문서·입금확인서를 이미지로 만든다. 저장하거나 공유해 고객에게 보낸다.
// 이미지는 서버에 남기지 않고 이 화면에서만 그린다.
const props = defineProps<{
  order: AdminOrder
  kind: 'sheet' | 'deposit' | 'full'
}>()
const emit = defineEmits<{ close: [] }>()

const supplier = {
  company: siteConfig.name,
  representative: siteConfig.representative,
  address: siteConfig.address.full,
  phone: siteConfig.phone,
}

const todayInSeoul = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
const dateInSeoul = (iso: string | null) => iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }) : todayInSeoul()

// 날짜와 입금자는 입금 기록에서 채우고, 실제와 다르면 여기서 고쳐 그린다 (저장된 주문은 바뀌지 않는다).
const issuedDate = ref(todayInSeoul())
const depositor = ref(props.order.customerName || '')
const paidDate = ref(dateInSeoul(props.order.paidAt))
const balanceDate = ref(dateInSeoul(props.order.balancePaidAt))
const isSplitFull = computed(() => props.kind === 'full' && props.order.deposit > 0)

const doc = computed(() => props.kind === 'sheet'
  ? orderSheetDoc(props.order, issuedDate.value)
  : receiptDoc(props.order, { kind: props.kind, depositor: depositor.value.trim(), paidDate: paidDate.value, balanceDate: balanceDate.value, issuedDate: issuedDate.value }))
const fileName = computed(() => `귀족_${doc.value.title.replaceAll(' ', '')}_${props.order.customerName || props.order.id}.png`)

// 직인은 견적서와 같은 것을 쓴다. 한 번만 받아 둔다.
let sealRequest: Promise<ImageBitmap | null> | undefined
const loadSeal = () => sealRequest ??= fetch('/api/admin/seal', { credentials: 'same-origin' })
  .then(response => response.ok ? response.blob().then(blob => createImageBitmap(blob)) : null)
  .catch(() => null)

const sealImage = shallowRef<ImageBitmap | null>(null)
const imageUrl = ref('')
const imageBlob = shallowRef<Blob | null>(null)
const canShareFile = ref(false)

const render = () => {
  const canvas = document.createElement('canvas')
  drawPaperDoc(canvas, doc.value, supplier, sealImage.value)
  canvas.toBlob((blob) => {
    if (!blob) return
    if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
    imageBlob.value = blob
    imageUrl.value = URL.createObjectURL(blob)
    const file = new File([blob], fileName.value, { type: 'image/png' })
    canShareFile.value = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })
  }, 'image/png')
}
watch(doc, render, { deep: true })

const share = async () => {
  if (!imageBlob.value) return
  try {
    await navigator.share({ files: [new File([imageBlob.value], fileName.value, { type: 'image/png' })] })
  } catch { /* 공유 창을 닫은 경우 */ }
}

onMounted(async () => {
  sealImage.value = await loadSeal()
  render()
})
onBeforeUnmount(() => {
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
})
</script>

<template>
  <div class="doc-panel">
    <div class="doc-fields">
      <div class="field">
        <label class="field-label" :for="`doc-issued-${order.id}`">{{ kind === 'sheet' ? '작성일' : '발행일' }}</label>
        <input :id="`doc-issued-${order.id}`" v-model="issuedDate" type="date" class="field-input">
      </div>
      <template v-if="kind !== 'sheet'">
        <div class="field">
          <label class="field-label" :for="`doc-depositor-${order.id}`">입금자</label>
          <input :id="`doc-depositor-${order.id}`" v-model="depositor" type="text" class="field-input" maxlength="50">
        </div>
        <div class="field">
          <label class="field-label" :for="`doc-paid-${order.id}`">{{ isSplitFull ? '계약금 입금일' : '입금일' }}</label>
          <input :id="`doc-paid-${order.id}`" v-model="paidDate" type="date" class="field-input">
        </div>
        <div v-if="isSplitFull" class="field">
          <label class="field-label" :for="`doc-balance-${order.id}`">잔금 입금일</label>
          <input :id="`doc-balance-${order.id}`" v-model="balanceDate" type="date" class="field-input">
        </div>
      </template>
    </div>

    <img v-if="imageUrl" :src="imageUrl" :alt="`${doc.title} 미리보기`" class="doc-image">
    <p v-else class="muted">그리는 중...</p>

    <div class="order-actions">
      <a v-if="imageUrl" class="btn-ghost" :href="imageUrl" :download="fileName">이미지 저장</a>
      <button v-if="canShareFile" type="button" class="btn-ghost" @click="share">공유</button>
      <button type="button" class="btn-text" @click="emit('close')">닫기</button>
    </div>
    <p class="hint">이미지를 길게 눌러 저장하거나 "이미지 저장"으로 내려받아 고객에게 보내세요. 날짜·입금자를 고쳐도 저장된 주문 내용은 바뀌지 않습니다.</p>
  </div>
</template>

<style>
/* pages/admin/index.vue의 관리 화면 스타일을 함께 쓴다 */
.admin .doc-panel {
  display: grid;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.admin .doc-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.admin .doc-image {
  display: block;
  width: 100%;
  height: auto;
  background: #fff;
}

.admin .doc-panel .order-actions {
  margin-top: 0;
}
</style>
