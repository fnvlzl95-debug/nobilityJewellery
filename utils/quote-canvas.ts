import { computeQuote, formatMoney, formatQuoteDate, formatWeight, quoteColumnHeaders, quoteLabels, type QuoteColumn, type QuoteContent } from './quote'

export interface QuoteSupplier {
  company: string
  representative: string
  address: string
  phone: string
}

// 기존에 쓰던 견적서(PDF) 양식을 그대로 옮긴다: A4 가로 842×595pt.
// 좌표와 글자 크기는 모두 pt 기준이고, 저장용 이미지는 3배로 그려 인쇄해도 선명하다.
const PAGE_WIDTH = 842
const PAGE_HEIGHT = 595
const MARGIN_X = 36
const SCALE = 3
const FONT = `'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif`
const TABLE_Y = 328
const HEADER_HEIGHT = 38
const ROW_HEIGHT = 34
const MIN_ROWS = 5
const INK = '#000000'
const PAPER = '#ffffff'
const HEADER_FILL = '#f2f2f2'

type Align = 'left' | 'center' | 'right'

// 칸마다의 기본 너비와 정렬. 뺀 칸이 있으면 남은 칸이 같은 비율로 표 너비를 채운다.
const COLUMNS: Array<{ key: QuoteColumn; width: number; align: Align }> = [
  { key: 'name', width: 70, align: 'center' },
  { key: 'weight', width: 62, align: 'center' },
  { key: 'spec', width: 190, align: 'left' },
  { key: 'quantity', width: 48, align: 'center' },
  { key: 'price', width: 75, align: 'right' },
  { key: 'marketTotal', width: 75, align: 'right' },
  { key: 'labor', width: 68, align: 'right' },
  { key: 'unitTotal', width: 95, align: 'right' },
  { key: 'total', width: 87, align: 'right' },
]
interface TextStyle {
  size: number
  bold?: boolean
  align?: Align
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const word of paragraph.split(' ')) {
      const candidate = line ? `${line} ${word}` : word
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate
        continue
      }
      if (line) lines.push(line)
      line = ''
      // 한 단어가 칸보다 길면 글자 단위로 나눈다.
      for (const char of word) {
        if (line && ctx.measureText(line + char).width > maxWidth) {
          lines.push(line)
          line = char
        } else {
          line += char
        }
      }
    }
    lines.push(line)
  }
  return lines
}

/** 칸 안에 글을 가로 정렬·세로 가운데로 넣는다. 넘치면 들어갈 때까지 글자를 줄인다. */
function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number, style: TextStyle) {
  if (!text) return
  const padding = 4
  const maxWidth = width - padding * 2
  let size = style.size
  let lines: string[] = []
  for (; size >= 6; size -= 0.5) {
    ctx.font = `${style.bold ? 'bold ' : ''}${size}px ${FONT}`
    lines = wrapLines(ctx, text, maxWidth)
    if (lines.length * size * 1.3 <= height - 2) break
  }

  const align = style.align || 'left'
  const lineHeight = size * 1.3
  const textX = align === 'left' ? x + padding : align === 'right' ? x + width - padding : x + width / 2
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.fillStyle = INK
  let lineY = y + (height - lines.length * lineHeight) / 2 + lineHeight / 2
  for (const line of lines) {
    ctx.fillText(line, textX, lineY)
    lineY += lineHeight
  }
}

function drawCell(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number, style: TextStyle, fill?: string) {
  if (fill) {
    ctx.fillStyle = fill
    ctx.fillRect(x, y, width, height)
  }
  ctx.strokeStyle = INK
  ctx.lineWidth = 0.7
  ctx.strokeRect(x, y, width, height)
  drawText(ctx, text, x, y, width, height, style)
}

export function drawQuote(canvas: HTMLCanvasElement, content: QuoteContent, supplier: QuoteSupplier) {
  const labels = quoteLabels(content.vatIncluded)
  const { rows, total } = computeQuote(content)
  const rowCount = Math.max(MIN_ROWS, content.items.length)
  const tableBottom = TABLE_Y + HEADER_HEIGHT + rowCount * ROW_HEIGHT
  // 품목이 많아 표가 길어지면 그만큼 종이를 늘린다.
  const pageHeight = Math.max(PAGE_HEIGHT, tableBottom + 59)

  canvas.width = PAGE_WIDTH * SCALE
  canvas.height = pageHeight * SCALE
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, PAGE_WIDTH, pageHeight)

  const contentWidth = PAGE_WIDTH - MARGIN_X * 2
  drawText(ctx, labels.title, MARGIN_X, 24, contentWidth, 40, { size: 24, bold: true, align: 'center' })

  // 받는 분
  drawText(ctx, '하기와 같이 견적합니다.', MARGIN_X, 84, 284, 22, { size: 12 })
  drawText(ctx, content.recipient ? `${content.recipient} 귀하` : '', MARGIN_X, 110, 264, 60, { size: 22, bold: true, align: 'center' })

  // 일자와 공급자
  drawText(ctx, '일자', 420, 84, 85, 22, { size: 12, bold: true, align: 'center' })
  drawText(ctx, content.quoteDate ? formatQuoteDate(content.quoteDate) : '', 515, 84, 291, 22, { size: 12, align: 'center' })
  const supplierRows: Array<[string, string, number]> = [
    ['상호(법인명)', supplier.company, 34],
    ['성명', supplier.representative, 34],
    ['사업장', supplier.address, 50],
    ['전화번호', supplier.phone, 34],
  ]
  let supplierY = 110
  for (const [label, value, height] of supplierRows) {
    drawCell(ctx, label, 420, supplierY, 120, height, { size: 10, bold: true, align: 'center' })
    drawCell(ctx, value, 540, supplierY, 266, height, { size: 10 })
    supplierY += height
  }

  // 합계금액
  drawText(ctx, '합계금액', MARGIN_X, 276, 124, 24, { size: 12, bold: true })
  drawText(ctx, `${formatMoney(total)}원`, PAGE_WIDTH - MARGIN_X - 260, 276, 260, 24, { size: 14, bold: true, align: 'right' })
  ctx.strokeStyle = INK
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(MARGIN_X, 302)
  ctx.lineTo(PAGE_WIDTH - MARGIN_X, 302)
  ctx.stroke()

  // 품목 표
  const headers = quoteColumnHeaders(content.vatIncluded)
  const visible = COLUMNS.filter(column => !(content.hiddenColumns as QuoteColumn[]).includes(column.key))
  const stretch = contentWidth / visible.reduce((sum, column) => sum + column.width, 0)
  const columns = visible.map(column => ({ ...column, width: column.width * stretch }))
  let x = MARGIN_X
  for (const column of columns) {
    drawCell(ctx, headers[column.key], x, TABLE_Y, column.width, HEADER_HEIGHT, { size: 10, bold: true, align: 'center' }, HEADER_FILL)
    x += column.width
  }
  for (let row = 0; row < rowCount; row++) {
    const item = content.items[row]
    const cells: Partial<Record<QuoteColumn, string>> = item
      ? {
          name: item.name,
          weight: formatWeight(item),
          spec: item.spec,
          quantity: String(item.quantity),
          price: item.price ? formatMoney(item.price) : '',
          marketTotal: rows[row].marketTotal ? formatMoney(rows[row].marketTotal) : '',
          labor: formatMoney(item.labor),
          unitTotal: formatMoney(rows[row].unitTotal),
          total: formatMoney(rows[row].total),
        }
      : {}
    x = MARGIN_X
    for (const column of columns) {
      drawCell(ctx, cells[column.key] || '', x, TABLE_Y + HEADER_HEIGHT + row * ROW_HEIGHT, column.width, ROW_HEIGHT, { size: 10, align: column.align })
      x += column.width
    }
  }

  // 비고와 맺음
  drawText(ctx, content.note, MARGIN_X, tableBottom + 6, 560, 26, { size: 9 })
  drawText(ctx, '※ 본 견적서는 검인없이 사용함', MARGIN_X, tableBottom + 32, 360, 16, { size: 9 })
  drawText(ctx, supplier.company, PAGE_WIDTH - MARGIN_X - 180, tableBottom + 28, 180, 22, { size: 12, bold: true, align: 'right' })
}
