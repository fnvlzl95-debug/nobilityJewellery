// 견적서 내용과 금액 계산. 관리 화면의 미리보기, 서버 검증, 고객 화면이 같은 계산을 쓴다.

export interface QuoteItem {
  name: string      // 품명
  weight: number    // 중량 (숫자)
  unit: string      // 중량 단위 (돈, g …)
  spec: string      // 규격
  quantity: number  // 수량
  price: number     // 시세 — 중량 1단위당 원
  labor: number     // 공임 — 1개당 원
}

// 품목 표의 칸. 품명과 총액은 항상 넣고, 나머지는 쓰지 않으면 견적서에서 뺄 수 있다.
export const QUOTE_OPTIONAL_COLUMNS = ['weight', 'spec', 'quantity', 'price', 'marketTotal', 'labor', 'unitTotal'] as const
export type QuoteOptionalColumn = typeof QUOTE_OPTIONAL_COLUMNS[number]
export type QuoteColumn = 'name' | QuoteOptionalColumn | 'total'

export interface QuoteContent {
  recipient: string
  quoteDate: string // YYYY-MM-DD
  vatIncluded: boolean
  roundDown: boolean // 총시세의 천 원 미만을 버린다
  hiddenColumns: QuoteOptionalColumn[] // 견적서에서 뺄 칸. 값은 그대로 계산에 들어간다
  items: QuoteItem[]
  note: string
}

export const QUOTE_MAX_ITEMS = 8

/** 부가세 포함 여부에 따라 제목과 금액 칸 이름이 달라진다. */
export const quoteLabels = (vatIncluded: boolean) => vatIncluded
  ? { title: '부가세 포함 견적서', price: '부가세 포함\n시세', unitTotal: '1개당 판매가격', total: '총판매가격' }
  : { title: '견적서', price: '시세', unitTotal: '1개당 공급가액', total: '총공급가액' }

/** 품목 표의 칸 이름 (왼쪽부터 놓이는 순서). */
export const quoteColumnHeaders = (vatIncluded: boolean): Record<QuoteColumn, string> => {
  const labels = quoteLabels(vatIncluded)
  return {
    name: '품명',
    weight: '중량',
    spec: '규격',
    quantity: '수량',
    price: labels.price,
    marketTotal: '총시세',
    labor: '공임',
    unitTotal: labels.unitTotal,
    total: labels.total,
  }
}

/** 총시세 = 중량 × 시세, 1개당 = 총시세 + 공임, 합계 = 1개당 × 수량 */
export function computeQuote(content: Pick<QuoteContent, 'items' | 'roundDown'>) {
  const rows = content.items.map((item) => {
    const market = item.weight * item.price
    const marketTotal = content.roundDown ? Math.floor(market / 1000) * 1000 : Math.round(market)
    const unitTotal = marketTotal + item.labor
    return { marketTotal, unitTotal, total: unitTotal * item.quantity }
  })
  return { rows, total: rows.reduce((sum, row) => sum + row.total, 0) }
}

export const formatMoney = (amount: number) => amount.toLocaleString('ko-KR')

export const formatQuoteDate = (quoteDate: string) => {
  const [year, month, day] = quoteDate.split('-').map(Number)
  return `${year}년 ${month}월 ${day}일`
}

export const formatWeight = (item: Pick<QuoteItem, 'weight' | 'unit'>) => item.weight ? `${item.weight}${item.unit}` : ''
