import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { requireAdmin } from '../../../utils/admin-auth'
import { useOrdersDb } from '../../../utils/cloudflare'
import { QUOTE_COLUMNS, toAdminQuote, type QuoteRow } from '../../../utils/quotes'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<{ action?: unknown }>(event)
  if (!/^QUO-\d{8}-[0-9A-F]{8}$/.test(id) || body?.action !== 'cancel') {
    throw createError({ statusCode: 400, message: '요청을 확인해주세요.' })
  }

  // 취소하면 고객 링크가 닫히고, 내려주던 이미지도 함께 지운다.
  const db = useOrdersDb(event)
  const [cancelled] = await db.batch([
    db.prepare(`UPDATE quotes SET status = 'cancelled', cancelled_at = ? WHERE id = ? AND status = 'active'`).bind(new Date().toISOString(), id),
    db.prepare(`DELETE FROM quote_images WHERE quote_id = ?`).bind(id),
  ])
  const quote = await db.prepare(`SELECT ${QUOTE_COLUMNS} FROM quotes WHERE id = ?`).bind(id).first<QuoteRow>()
  if (!quote) {
    throw createError({ statusCode: 404, message: '견적서를 찾을 수 없습니다.' })
  }

  if (cancelled.meta.changes !== 1) {
    throw createError({
      statusCode: 409,
      message: '이미 취소된 견적서입니다.',
      data: { code: 'QUOTE_STATE_CHANGED' },
    })
  }

  console.log('Quote cancelled:', { quoteId: id })
  return { quote: toAdminQuote(quote) }
})
