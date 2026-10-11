import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { QUOTE_COLUMNS, toAdminQuote, type QuoteRow } from '../../utils/quotes'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { results } = await useOrdersDb(event)
    .prepare(`SELECT ${QUOTE_COLUMNS} FROM quotes ORDER BY created_at DESC LIMIT 300`)
    .all<QuoteRow>()
  return { quotes: results.map(toAdminQuote) }
})
