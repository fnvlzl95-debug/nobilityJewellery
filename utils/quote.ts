// 견적서 내용과 금액 계산. 관리 화면의 미리보기, 서버 검증, 고객 화면이 같은 계산을 쓴다.

export interface QuoteItem {
  name: string      // 품명
  weight: number    // 중량 (숫자)
  unit: string      // 중량 단위 (돈, g …)
  spec: string      // 규격
  quantity: number  // 수량
  price: number     // 시세 — 중량 1단위당 원
  labor: number     // 공임 — 1개당 원
  // 시세로 계산하지 않고 1개당 금액만 적는 품목. 이때 시세·공임은 쓰지 않는다.
  fixedPrice?: boolean
  unitPrice?: number // 1개당 금액 (원)
}

/** 품명 칸에서 바로 고를 수 있는 소재. 그 밖의 이름은 직접 적는다. */
export const QUOTE_MATERIALS = ['순금', '18K', '14K', '은']

// 품목 표의 칸. 품명과 총액은 항상 넣고, 나머지는 쓰지 않으면 견적서에서 뺄 수 있다.
export const QUOTE_OPTIONAL_COLUMNS = ['weight', 'spec', 'quantity', 'price', 'marketTotal', 'labor', 'unitTotal'] as const
export type QuoteOptionalColumn = typeof QUOTE_OPTIONAL_COLUMNS[number]
// 부가세를 따로 적을 때만 총액 앞에 들어가는 칸.
export const QUOTE_VAT_COLUMNS = ['supply', 'vat'] as const
export type QuoteColumn = 'name' | QuoteOptionalColumn | typeof QUOTE_VAT_COLUMNS[number] | 'total'

export interface QuoteContent {
  recipient: string
  quoteDate: string // YYYY-MM-DD
  vatIncluded: boolean
  showVat: boolean // 부가세 포함 견적서의 표에 공급가액과 부가세를 따로 적는다
  roundDown: boolean // 총시세의 천 원 미만을 버린다
  hiddenColumns: QuoteOptionalColumn[] // 견적서에서 뺄 칸. 값은 그대로 계산에 들어간다
  seal: boolean // 대표자 이름 옆에 직인을 넣는다
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
    supply: '공급가액',
    vat: '부가세',
    total: labels.total,
  }
}

/** 총시세 = 중량 × 시세, 1개당 = 총시세 + 공임, 합계 = 1개당 × 수량. 금액만 적은 품목은 그 금액이 1개당이다. */
export function computeQuote(content: Pick<QuoteContent, 'items' | 'roundDown'>) {
  const rows = content.items.map((item) => {
    if (item.fixedPrice) {
      const unitTotal = item.unitPrice || 0
      return { marketTotal: 0, unitTotal, total: unitTotal * item.quantity }
    }
    const market = item.weight * item.price
    const marketTotal = content.roundDown ? Math.floor(market / 1000) * 1000 : Math.round(market)
    const unitTotal = marketTotal + item.labor
    return { marketTotal, unitTotal, total: unitTotal * item.quantity }
  })
  return { rows, total: rows.reduce((sum, row) => sum + row.total, 0) }
}

/** 부가세 포함 금액을 공급가액과 부가세(10%)로 나눈다. 둘을 더하면 항상 원래 금액이다. */
export function splitVat(total: number) {
  const supply = Math.round(total / 1.1)
  return { supply, vat: total - supply }
}

export const formatMoney = (amount: number) => amount.toLocaleString('ko-KR')

export const formatQuoteDate = (quoteDate: string) => {
  const [year, month, day] = quoteDate.split('-').map(Number)
  return `${year}년 ${month}월 ${day}일`
}

export const formatWeight = (item: Pick<QuoteItem, 'weight' | 'unit'>) => item.weight ? `${item.weight}${item.unit}` : ''
