import { siteConfig } from '../config/site'
import { koreanAmount, orderAccount, orderMoney, paymentStage, WEIGHT_NOTICE, type AdminOrder } from './order'
import { drawCell, drawText, FONT, HEADER_FILL, PAPER, SCALE, wrapLines, type QuoteSupplier } from './quote-canvas'
import { formatQuoteDate } from './quote'

// 주문서와 입금확인서: 견적서와 같은 글꼴·선으로 A4 세로(595×842pt)에 그린다. 관리 화면에서 이미지로 저장해 고객에게 보낸다.

export interface PaperRow {
  label: string
  value: string
  money?: boolean // 오른쪽 정렬
  strong?: boolean // 굵게, 칸을 옅게 칠한다
}

export interface PaperDoc {
  title: string
  lead: string // 받는 분 위의 한 줄
  recipient: string // 비어 있으면 '귀하' 줄을 그리지 않는다
  dateLabel: string
  sections: Array<{ title: string; rows: PaperRow[] }>
  closing?: string // 표 아래 가운데 문장
  notes?: string[]
}

const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842
const MARGIN_X = 42
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2
const LABEL_WIDTH = 108
const ROW_HEIGHT = 26
const TEXT_SIZE = 10
// 공급자 칸과 직인. 직인은 대표자 칸의 '(인)' 위에 찍는다.
const SUPPLIER_X = 300
const SUPPLIER_WIDTH = PAGE_WIDTH - MARGIN_X - SUPPLIER_X
const SUPPLIER_LABEL_WIDTH = 64
const SUPPLIER_Y = 96
const SECTIONS_Y = 252 // 항목 표가 시작하는 높이
const SECTION_GAP = 14
// 대표자 칸을 직인보다 조금 낮게 잡아, 직인이 아래 사업장 주소 글자를 덮지 않게 한다.
const SEAL_SIZE = 42
const SEAL_CENTER = { x: SUPPLIER_X + SUPPLIER_WIDTH - 30, y: SUPPLIER_Y + 24 + 24 + 17 }

const won = (amount: number) => `${amount.toLocaleString('ko-KR')}원`

/** 칸 안 글이 몇 줄이 될지 재서 줄 높이를 정한다 (제작 사양처럼 긴 글). */
function rowHeight(ctx: CanvasRenderingContext2D, row: PaperRow) {
  ctx.font = `${row.strong ? 'bold ' : ''}${TEXT_SIZE}px ${FONT}`
  const lines = wrapLines(ctx, row.value, CONTENT_WIDTH - LABEL_WIDTH - 8).length
  return Math.max(ROW_HEIGHT, Math.ceil(lines * TEXT_SIZE * 1.3 + 12))
}

export function drawPaperDoc(canvas: HTMLCanvasElement, doc: PaperDoc, supplier: QuoteSupplier, sealImage?: ImageBitmap | HTMLCanvasElement | null) {
  // 먼저 표 높이를 재서 종이 길이를 정한다. 내용이 길면 그만큼 늘린다.
  const measure = canvas.getContext('2d')
  if (!measure) return
  const sectionsHeight = doc.sections.reduce((sum, section) => sum + 26 + SECTION_GAP + section.rows.reduce((rows, row) => rows + rowHeight(measure, row), 0), 0)
  const tailHeight = (doc.closing ? 48 : 0) + (doc.notes?.length || 0) * 16
  const pageHeight = Math.max(PAGE_HEIGHT, SECTIONS_Y + sectionsHeight + tailHeight + 80)

  canvas.width = PAGE_WIDTH * SCALE
  canvas.height = pageHeight * SCALE
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, PAGE_WIDTH, pageHeight)

  drawText(ctx, doc.title, MARGIN_X, 44, CONTENT_WIDTH, 40, { size: 22, bold: true, align: 'center' })

  // 받는 분과 날짜
  drawText(ctx, doc.lead, MARGIN_X, 104, 240, 18, { size: 10.5 })
  drawText(ctx, doc.recipient, MARGIN_X, 128, 240, 34, { size: 17, bold: true })
  drawText(ctx, doc.dateLabel, MARGIN_X, 174, 240, 18, { size: 10.5 })

  // 공급자
  const supplierRows: Array<[string, string, number]> = [
    ['상호', supplier.company, 24],
    ['사업자번호', siteConfig.businessNumber, 24],
    ['대표자', supplier.representative, 34],
    ['사업장', supplier.address, 34],
    ['전화번호', supplier.phone, 24],
  ]
  let y = SUPPLIER_Y
  for (const [label, value, height] of supplierRows) {
    drawCell(ctx, label, SUPPLIER_X, y, SUPPLIER_LABEL_WIDTH, height, { size: 9.5, bold: true, align: 'center' }, HEADER_FILL)
    drawCell(ctx, value, SUPPLIER_X + SUPPLIER_LABEL_WIDTH, y, SUPPLIER_WIDTH - SUPPLIER_LABEL_WIDTH, height, { size: 9.5 })
    y += height
  }
  drawText(ctx, '(인)', SEAL_CENTER.x - 18, SEAL_CENTER.y - 14, 36, 28, { size: 9, align: 'center' })
  if (sealImage) {
    const fit = SEAL_SIZE / Math.max(sealImage.width, sealImage.height)
    const width = sealImage.width * fit
    const height = sealImage.height * fit
    ctx.save()
    ctx.globalCompositeOperation = 'multiply' // 인주 아래로 글자와 선이 비치게
    ctx.drawImage(sealImage, SEAL_CENTER.x - width / 2, SEAL_CENTER.y - height / 2, width, height)
    ctx.restore()
  }

  // 항목 표
  y = SECTIONS_Y
  for (const section of doc.sections) {
    drawText(ctx, section.title, MARGIN_X, y, CONTENT_WIDTH, 22, { size: 11.5, bold: true })
    y += 26
    for (const row of section.rows) {
      const height = rowHeight(ctx, row)
      const fill = row.strong ? HEADER_FILL : undefined
      drawCell(ctx, row.label, MARGIN_X, y, LABEL_WIDTH, height, { size: TEXT_SIZE, bold: true, align: 'center' }, HEADER_FILL)
      drawCell(ctx, row.value, MARGIN_X + LABEL_WIDTH, y, CONTENT_WIDTH - LABEL_WIDTH, height, { size: TEXT_SIZE, bold: row.strong, align: row.money ? 'right' : 'left' }, fill)
      y += height
    }
    y += SECTION_GAP
  }

  if (doc.closing) {
    drawText(ctx, doc.closing, MARGIN_X, y + 14, CONTENT_WIDTH, 24, { size: 12, align: 'center' })
    y += 48
  }
  for (const note of doc.notes || []) {
    drawText(ctx, note, MARGIN_X, y, CONTENT_WIDTH, 16, { size: 9 })
    y += 16
  }

  drawText(ctx, supplier.company, PAGE_WIDTH - MARGIN_X - 180, pageHeight - 70, 180, 24, { size: 15, bold: true, align: 'right' })
}

// ===== 주문서 =====

const accountLine = (order: AdminOrder) => {
  const account = orderAccount(order.account)
  return `${account.bank} ${account.account} (예금주 ${account.accountHolder})`
}
const dateText = (isoDate: string) => isoDate ? formatQuoteDate(isoDate) : ''

/** 주문자 → 전화번호 → 주문금액 순으로 시작해 제작 사양, 결제, 수령 안내를 적는다. */
export function orderSheetDoc(order: AdminOrder, issuedDate: string): PaperDoc {
  const money = orderMoney(order)
  const stage = paymentStage(order)
  const payment: PaperRow[] = []
  if (order.vatIncluded) {
    payment.push(
      { label: '공급가액', value: won(money.supply), money: true },
      { label: '부가세 (10%)', value: won(money.vat), money: true },
      { label: '총금액', value: `${won(money.total)} (부가세 포함)`, money: true, strong: true },
    )
  }
  if (order.deposit) {
    payment.push(
      { label: '계약금', value: `${won(money.deposit)} (${stage === 'none' ? '입금 전' : '입금 완료'})`, money: true },
      { label: '잔금', value: `${won(money.balance)} (${stage === 'full' ? '입금 완료' : '입금 전'})`, money: true, strong: stage !== 'full' },
    )
  } else {
    payment.push({ label: '결제', value: stage === 'full' ? '완불 (입금 완료)' : '완불', money: true })
  }

  const pickup: PaperRow[] = []
  if (order.dueDate) pickup.push({ label: '수령 예정일', value: order.dueDate })
  if (order.customerAddress) pickup.push({ label: '배송지', value: order.customerAddress })
  if (stage !== 'full') pickup.push({ label: stage === 'deposit' ? '잔금 입금 계좌' : '입금 계좌', value: accountLine(order) })

  return {
    title: '주 문 서',
    lead: '아래와 같이 주문을 확인합니다.',
    recipient: order.customerName ? `${order.customerName} 귀하` : '',
    dateLabel: `작성일   ${dateText(issuedDate)}`,
    sections: [
      {
        title: '주문 정보',
        rows: [
          { label: '주문자', value: order.customerName || '' },
          { label: '전화번호', value: order.customerPhone || '' },
          { label: '주문금액', value: `${won(money.total)}${order.vatIncluded ? ' (부가세 포함)' : ''}`, money: true, strong: true },
        ],
      },
      {
        title: '제작 사양',
        rows: [
          { label: '품명', value: order.product },
          ...(order.spec ? [{ label: '제작 사양', value: order.spec }] : []),
        ],
      },
      { title: '결제 내역', rows: payment },
      ...(pickup.length ? [{ title: '수령 · 입금 안내', rows: pickup }] : []),
    ],
    notes: [`※ ${WEIGHT_NOTICE}`],
  }
}

// ===== 입금확인서 =====

export interface ReceiptInput {
  kind: 'deposit' | 'full' // 계약금 입금확인서 / 완불 입금확인서
  depositor: string
  paidDate: string // 계약금(또는 전액) 입금일 YYYY-MM-DD
  balanceDate: string // 계약금 주문의 잔금 입금일
  issuedDate: string
}

export function receiptDoc(order: AdminOrder, input: ReceiptInput): PaperDoc {
  const money = orderMoney(order)
  const isDeposit = input.kind === 'deposit'
  const split = !isDeposit && order.deposit > 0 // 계약금과 잔금을 나눠 받은 완불
  const received = isDeposit ? money.deposit : money.total
  const amountRow: PaperRow = {
    label: split ? '총 입금액' : '입금액',
    value: `${won(received)} (일금 ${koreanAmount(received)}원정)`,
    strong: true,
  }

  const payments: PaperRow[] = [{ label: '입금자', value: input.depositor }]
  if (split) {
    payments.push(
      { label: '계약금', value: `${won(money.deposit)} · ${dateText(input.paidDate)} 입금` },
      { label: '잔금', value: `${won(money.balance)} · ${dateText(input.balanceDate)} 입금` },
      amountRow,
    )
  } else {
    payments.push({ label: '입금일', value: dateText(input.paidDate) }, amountRow)
  }
  payments.push(
    { label: '구분', value: isDeposit ? '계약금' : '완불' },
    { label: '입금 계좌', value: accountLine(order) },
  )

  const orderRows: PaperRow[] = [{ label: '품명', value: order.product }]
  if (order.spec) orderRows.push({ label: '제작 사양', value: order.spec })
  orderRows.push({ label: '주문금액', value: `${won(money.total)}${order.vatIncluded ? ' (부가세 포함)' : ''}`, money: true })
  if (order.deposit) {
    orderRows.push(
      { label: '계약금', value: won(money.deposit), money: true },
      { label: '잔금', value: `${won(money.balance)}${split ? ' (입금 완료)' : ''}`, money: true },
    )
  }
  if (order.dueDate) orderRows.push({ label: '수령 예정일', value: order.dueDate })

  return {
    title: isDeposit ? '계약금 입금확인서' : order.deposit ? '완불 입금확인서' : '입금확인서',
    lead: '아래와 같이 입금을 확인합니다.',
    recipient: order.customerName ? `${order.customerName} 귀하` : '',
    dateLabel: `발행일   ${dateText(input.issuedDate)}`,
    sections: [
      { title: '입금 내역', rows: payments },
      { title: '주문 내역', rows: orderRows },
    ],
    closing: isDeposit
      ? '위 금액을 계약금으로 정히 입금 받았음을 확인합니다.'
      : split ? '위 주문 대금 전액을 정히 입금 받았음을 확인합니다.' : '위 금액을 정히 입금 받았음을 확인합니다.',
  }
}
