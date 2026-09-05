<script setup lang="ts">
const props = withDefaults(defineProps<{
  idPrefix?: string
  initialWeight?: number | null
  compact?: boolean
}>(), {
  idPrefix: 'gold-weight',
  initialWeight: null,
  compact: false,
})

const { trackEvent } = useGtag()
const route = useRoute()
const calculatedPaths = useState<string[]>('calculator-measured-paths', () => [])
const recordCalculation = () => {
  if (!calcGrams.value || calculatedPaths.value.includes(route.path)) return
  calculatedPaths.value.push(route.path)
  trackEvent('calculator_use', { source_path: route.path, calculator: 'gold_weight', unit: calcUnit.value, purity: calcPurity.value })
}
const DON_TO_GRAM = 3.75
const purityOptions = [
  { key: '24k', label: '24K 순금', rate: 0.999 },
  { key: '18k', label: '18K', rate: 0.75 },
  { key: '14k', label: '14K', rate: 0.585 },
] as const

type PurityKey = typeof purityOptions[number]['key']

const calcWeight = ref<number | null>(props.initialWeight)
const calcUnit = ref<'don' | 'gram'>('don')
const calcPurity = ref<PurityKey>('24k')
const inputId = computed(() => `${props.idPrefix}-input`)
const purityLabelId = computed(() => `${props.idPrefix}-purity-label`)
const resultId = computed(() => `${props.idPrefix}-result`)
const activePurity = computed(() => purityOptions.find((option) => option.key === calcPurity.value)!)

const calcGrams = computed(() => {
  if (typeof calcWeight.value !== 'number' || !Number.isFinite(calcWeight.value) || calcWeight.value <= 0) return null
  return calcUnit.value === 'don' ? calcWeight.value * DON_TO_GRAM : calcWeight.value
})

const formatNumber = (value: number) => value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })

const calcConversion = computed(() => {
  if (calcGrams.value === null) return null
  const don = calcGrams.value / DON_TO_GRAM
  return calcUnit.value === 'don'
    ? `${formatNumber(don)}돈 = ${formatNumber(calcGrams.value)}g`
    : `${formatNumber(calcGrams.value)}g = ${formatNumber(don)}돈`
})

const calcPureGold = computed(() => {
  if (calcGrams.value === null) return null
  return `약 ${formatNumber(calcGrams.value * activePurity.value.rate)}g`
})
</script>

<template>
  <div class="weight-calculator" :class="{ 'is-compact': props.compact }">
    <div class="calculator-controls">
      <div class="calculator-field">
        <label class="calculator-label" :for="inputId">무게</label>
        <div class="calculator-input-row">
          <input
            :id="inputId"
            v-model.number="calcWeight"
            type="number"
            min="0"
            step="0.1"
            inputmode="decimal"
            placeholder="0"
            class="calculator-input"
            :aria-describedby="resultId"
            @change="recordCalculation"
          >
          <div class="calculator-toggle" role="group" aria-label="무게 단위 선택">
            <button
              type="button"
              :class="{ active: calcUnit === 'don' }"
              :aria-pressed="calcUnit === 'don'"
              @click="calcUnit = 'don'"
            >돈</button>
            <button
              type="button"
              :class="{ active: calcUnit === 'gram' }"
              :aria-pressed="calcUnit === 'gram'"
              @click="calcUnit = 'gram'"
            >g</button>
          </div>
        </div>
      </div>

      <div class="calculator-field">
        <span :id="purityLabelId" class="calculator-label">순도</span>
        <div class="calculator-toggle calculator-purity" role="group" :aria-labelledby="purityLabelId">
          <button
            v-for="option in purityOptions"
            :key="option.key"
            type="button"
            :class="{ active: calcPurity === option.key }"
            :aria-pressed="calcPurity === option.key"
            @click="calcPurity = option.key"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <div :id="resultId" class="calculator-results" aria-live="polite">
      <div class="calculator-result">
        <span class="calculator-result-label">환산 무게</span>
        <strong class="calculator-result-value">{{ calcConversion ?? '—' }}</strong>
      </div>
      <div class="calculator-result-divider" aria-hidden="true"></div>
      <div class="calculator-result">
        <span class="calculator-result-label">순금 함량 ({{ activePurity.label }})</span>
        <strong class="calculator-result-value">{{ calcPureGold ?? '—' }}</strong>
      </div>
    </div>

    <p class="calculator-note">
      1돈 = 3.75g 기준입니다. 순금 함량은 이론 환산값이며, 실제 제품 중량·매입가는 감정과 계량 후 확인합니다.
    </p>
  </div>
</template>

<style scoped>
.weight-calculator {
  margin-top: 48px;
  padding: 40px;
  color: #fafafa;
  text-align: left;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(201, 162, 39, 0.24);
}

.weight-calculator.is-compact {
  margin-top: 0;
  padding: 24px;
}

.calculator-controls,
.calculator-field {
  display: flex;
  flex-direction: column;
}

.calculator-controls {
  gap: 24px;
}

.calculator-field {
  gap: 10px;
}

.calculator-label {
  color: rgba(250, 250, 250, 0.85);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.calculator-input-row,
.calculator-toggle {
  display: flex;
  gap: 8px;
}

.calculator-input {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid rgba(250, 250, 250, 0.14);
  color: #fafafa;
  background: rgba(250, 250, 250, 0.04);
  font: inherit;
  font-size: 18px;
  appearance: textfield;
  transition: border-color 0.25s ease;
}

.calculator-input::-webkit-outer-spin-button,
.calculator-input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

.calculator-input:focus {
  border-color: #c9a227;
  outline: none;
}

.calculator-toggle button {
  min-height: 46px;
  padding: 10px 18px;
  border: 1px solid rgba(250, 250, 250, 0.14);
  color: rgba(250, 250, 250, 0.78);
  background: rgba(250, 250, 250, 0.03);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.calculator-toggle button:hover {
  border-color: rgba(201, 162, 39, 0.65);
}

.calculator-toggle button.active {
  border-color: #c9a227;
  color: #0a0a0a;
  background: #c9a227;
}

.calculator-purity {
  flex-wrap: wrap;
}

.calculator-purity button {
  flex: 1;
  min-width: 100px;
}

.calculator-results {
  display: flex;
  align-items: stretch;
  gap: 24px;
  margin-top: 32px;
  padding: 24px;
  border: 1px solid rgba(201, 162, 39, 0.16);
  background: rgba(201, 162, 39, 0.06);
}

.calculator-result {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
}

.calculator-result-label {
  color: rgba(250, 250, 250, 0.68);
  font-size: 12px;
}

.calculator-result-value {
  color: #d4b44a;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 700;
}

.calculator-result-divider {
  width: 1px;
  background: rgba(250, 250, 250, 0.12);
}

.calculator-note {
  margin: 20px 0 0;
  color: rgba(250, 250, 250, 0.66);
  font-size: 12px;
  line-height: 1.7;
}

@media (max-width: 600px) {
  .weight-calculator,
  .weight-calculator.is-compact {
    padding: 24px 20px;
  }

  .calculator-results {
    flex-direction: column;
    gap: 16px;
  }

  .calculator-result-divider {
    width: 100%;
    height: 1px;
  }
}
</style>
