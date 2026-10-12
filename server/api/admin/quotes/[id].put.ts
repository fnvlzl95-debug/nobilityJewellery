import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { requireAdmin } from '../../../utils/admin-auth'
import { useOrdersDb } from '../../../utils/cloudflare'
import { decodeQuoteImage, parseQuoteContent, QUOTE_COLUMNS, quoteTotal, toAdminQuote, type QuoteRow } from '../../../utils/quotes'

// 발행한 견적서를 고친다. 견적번호와 고객 링크는 그대로 두고 내용과 이미지만 바꾼다.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id') || ''
  if (!/^QUO-\d{8}-[0-9A-F]{8}$/.test(id)) {
    throw createError({ statusCode: 400, message: '요청을 확인해주세요.' })
  }

  const body = await readBody<Record<string, unknown>>(event)
  const content = parseQuoteContent(body)
  const image = decodeQuoteImage(body.image)

  // 내용과 이미지를 한 묶음으로 바꾼다. 이미지는 발행 중인 견적서일 때만 갈아 끼운다.
  const db = useOrdersDb(event)
  const [updated] = await db.batch([
    db.prepare(`UPDATE quotes
      SET recipient = ?, quote_date = ?, vat_included = ?, round_down = ?, hidden_columns = ?, seal = ?, items = ?, note = ?, memo = ?, total = ?, image_width = ?, image_height = ?
      WHERE id = ? AND status = 'active'`)
      .bind(content.recipient, content.quoteDate, content.vatIncluded ? 1 : 0, content.roundDown ? 1 : 0, JSON.stringify(content.hiddenColumns), content.seal ? 1 : 0, JSON.stringify(content.items), content.note, content.memo, quoteTotal(content), image.width, image.height, id),
    db.prepare(`UPDATE quote_images SET png = ? WHERE quote_id = ? AND EXISTS (SELECT 1 FROM quotes WHERE id = ? AND status = 'active')`)
      .bind(image.png, id, id),
  ])
  const quote = await db.prepare(`SELECT ${QUOTE_COLUMNS} FROM quotes WHERE id = ?`).bind(id).first<QuoteRow>()
  if (!quote) {
    throw createError({ statusCode: 404, message: '견적서를 찾을 수 없습니다.' })
  }

  if (updated.meta.changes !== 1) {
    throw createError({
      statusCode: 409,
      message: '취소된 견적서는 수정할 수 없습니다.',
      data: { code: 'QUOTE_STATE_CHANGED' },
    })
  }

  console.log('Quote updated:', { quoteId: id })
  return { quote: toAdminQuote(quote) }
})
