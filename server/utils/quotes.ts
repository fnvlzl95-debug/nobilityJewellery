import { createError } from 'h3'
import { computeQuote, QUOTE_MAX_ITEMS, QUOTE_OPTIONAL_COLUMNS, quoteLabels, type QuoteContent, type QuoteItem, type QuoteOptionalColumn } from '../../utils/quote'
import type { D1Database } from './cloudflare'

export interface QuoteRow {
  id: string
  token: string
  recipient: string
  quote_date: string
  vat_included: number
  round_down: number
  hidden_columns: string
  seal: number
  items: string
  note: string
  memo: string
  total: number
  image_width: number
  image_height: number
  status: 'active' | 'cancelled'
  created_at: string
  cancelled_at: string | null
}

// 이미지를 뺀 본문 열. 목록과 고객 화면은 이것만 읽는다.
export const QUOTE_COLUMNS = 'id, token, recipient, quote_date, vat_included, round_down, hidden_columns, seal, items, note, memo, total, image_width, image_height, status, created_at, cancelled_at'

export const QUOTE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22}$/
// D1의 한 행 한도(2MB) 안에 여유 있게 들어가는 크기.
const MAX_IMAGE_BYTES = 1500000
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

const invalid = (message: string) => createError({ statusCode: 400, message, data: { code: 'INVALID_QUOTE' } })

const text = (value: unknown, max: number, label: string, required = false): string => {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  if (required && !trimmed) throw invalid(`${label} 항목을 입력해주세요.`)
  if (trimmed.length > max) throw invalid(`${label} 항목은 ${max}자 이내로 입력해주세요.`)
  return trimmed
}

const amount = (value: unknown, label: string, min = 0): number => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > 1000000000) {
    throw invalid(`${label} 항목을 숫자로 입력해주세요.`)
  }
  return value
}

/** 관리 화면에서 보낸 견적 내용을 검증해 저장할 모양으로 만든다. */
export function parseQuoteContent(body: Record<string, unknown> | null | undefined): QuoteContent & { memo: string } {
  if (!body || typeof body !== 'object') throw invalid('견적서 내용을 확인해주세요.')

  const quoteDate = typeof body.quoteDate === 'string' ? body.quoteDate : ''
  if (!/^\d{4}-\d{2}-\d{2}$/.test(quoteDate) || Number.isNaN(Date.parse(quoteDate))) {
    throw invalid('견적일을 선택해주세요.')
  }

  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > QUOTE_MAX_ITEMS) {
    throw invalid(`품목은 1개에서 ${QUOTE_MAX_ITEMS}개까지 넣을 수 있습니다.`)
  }
  const items: QuoteItem[] = body.items.map((raw: Record<string, unknown> | null) => {
    if (!raw || typeof raw !== 'object') throw invalid('품목 내용을 확인해주세요.')
    const weight = raw.weight
    if (typeof weight !== 'number' || !Number.isFinite(weight) || weight < 0 || weight > 100000) {
      throw invalid('중량 항목을 숫자로 입력해주세요.')
    }
    const fixedPrice = raw.fixedPrice ?? false
    if (typeof fixedPrice !== 'boolean') throw invalid('품목 내용을 확인해주세요.')
    return {
      name: text(raw.name, 30, '품명', true),
      weight,
      unit: text(raw.unit, 6, '중량 단위'),
      spec: text(raw.spec, 60, '규격'),
      quantity: amount(raw.quantity, '수량', 1),
      // 금액만 적는 품목은 시세·공임을 비워 두고 1개당 금액만 저장한다.
      price: fixedPrice ? 0 : amount(raw.price, '시세'),
      labor: fixedPrice ? 0 : amount(raw.labor, '공임'),
      fixedPrice,
      unitPrice: fixedPrice ? amount(raw.unitPrice, '판매가격') : 0,
    }
  })

  const hiddenColumns = body.hiddenColumns ?? []
  if (!Array.isArray(hiddenColumns) || hiddenColumns.some(column => !(QUOTE_OPTIONAL_COLUMNS as readonly unknown[]).includes(column))) {
    throw invalid('견적서에 넣을 칸을 다시 선택해주세요.')
  }

  return {
    recipient: text(body.recipient, 40, '받는 분'),
    quoteDate,
    vatIncluded: body.vatIncluded === true,
    roundDown: body.roundDown === true,
    // 표의 순서대로, 중복 없이 저장한다.
    hiddenColumns: QUOTE_OPTIONAL_COLUMNS.filter(column => hiddenColumns.includes(column)),
    seal: body.seal === true,
    items,
    note: text(body.note, 200, '비고'),
    memo: text(body.memo, 200, '메모'),
  }
}

/** base64로 받은 이미지를 PNG인지 확인하고 크기를 읽는다. */
export function decodePng(value: unknown, maxBytes: number, message: string): { png: Uint8Array; width: number; height: number } {
  if (typeof value !== 'string' || !value || value.length > maxBytes * 1.4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    throw invalid(message)
  }
  const binary = atob(value)
  const png = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) png[i] = binary.charCodeAt(i)
  if (png.length > maxBytes || png.length < 33 || PNG_SIGNATURE.some((byte, i) => png[i] !== byte)) {
    throw invalid(message)
  }
  // IHDR: 서명 8바이트 + 길이·타입 8바이트 뒤에 가로·세로가 4바이트씩 온다.
  const view = new DataView(png.buffer)
  return { png, width: view.getUint32(16), height: view.getUint32(20) }
}

export const decodeQuoteImage = (value: unknown) => decodePng(value, MAX_IMAGE_BYTES, '견적서 이미지를 만들지 못했습니다. 다시 시도해주세요.')

export function createQuoteId(now = new Date()): string {
  const date = now
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
    .replaceAll('-', '')
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `QUO-${date}-${random}`
}

export const quoteTotal = (content: QuoteContent) => computeQuote(content).total

export function toAdminQuote(quote: QuoteRow) {
  return {
    id: quote.id,
    token: quote.token,
    recipient: quote.recipient,
    quoteDate: quote.quote_date,
    vatIncluded: quote.vat_included === 1,
    roundDown: quote.round_down === 1,
    hiddenColumns: JSON.parse(quote.hidden_columns) as QuoteOptionalColumn[],
    seal: quote.seal === 1,
    items: JSON.parse(quote.items) as QuoteItem[],
    note: quote.note,
    memo: quote.memo,
    total: quote.total,
    state: quote.status,
    createdAt: quote.created_at,
  }
}

/** 고객 링크에 보여줄 내용. 내부 메모는 빼고, 취소된 견적서는 금액도 내보내지 않는다. */
export function toPublicQuote(quote: QuoteRow) {
  if (quote.status !== 'active') return { quoteId: quote.id, state: quote.status }
  return {
    quoteId: quote.id,
    state: quote.status,
    title: quoteLabels(quote.vat_included === 1).title,
    recipient: quote.recipient,
    quoteDate: quote.quote_date,
    total: quote.total,
    imageWidth: quote.image_width,
    imageHeight: quote.image_height,
  }
}

export async function findQuoteByToken(db: D1Database, token: unknown): Promise<QuoteRow | null> {
  if (typeof token !== 'string' || !QUOTE_TOKEN_PATTERN.test(token)) return null
  return db.prepare(`SELECT ${QUOTE_COLUMNS} FROM quotes WHERE token = ?`).bind(token).first<QuoteRow>()
}
