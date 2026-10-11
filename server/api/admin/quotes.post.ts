import { defineEventHandler, readBody } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { createQuoteId, decodeQuoteImage, parseQuoteContent, quoteTotal, toAdminQuote, type QuoteRow } from '../../utils/quotes'
import { randomToken } from '../../utils/secure-random'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<Record<string, unknown>>(event)
  const content = parseQuoteContent(body)
  // 이미지는 관리 화면이 같은 내용으로 그린 것이다. 합계는 이미지를 믿지 않고 여기서 다시 계산한다.
  const image = decodeQuoteImage(body.image)

  const now = new Date()
  const quote: QuoteRow = {
    id: createQuoteId(now),
    token: randomToken(16),
    recipient: content.recipient,
    quote_date: content.quoteDate,
    vat_included: content.vatIncluded ? 1 : 0,
    round_down: content.roundDown ? 1 : 0,
    items: JSON.stringify(content.items),
    note: content.note,
    memo: content.memo,
    total: quoteTotal(content),
    image_width: image.width,
    image_height: image.height,
    status: 'active',
    created_at: now.toISOString(),
    cancelled_at: null,
  }

  const db = useOrdersDb(event)
  await db.batch([
    db.prepare(`INSERT INTO quotes (id, token, recipient, quote_date, vat_included, round_down, items, note, memo, total, image_width, image_height, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(quote.id, quote.token, quote.recipient, quote.quote_date, quote.vat_included, quote.round_down, quote.items, quote.note, quote.memo, quote.total, quote.image_width, quote.image_height, quote.status, quote.created_at),
    db.prepare('INSERT INTO quote_images (quote_id, png) VALUES (?, ?)').bind(quote.id, image.png),
  ])

  console.log('Quote created:', { quoteId: quote.id })
  return { quote: toAdminQuote(quote) }
})
