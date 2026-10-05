import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { toAdminOrder, type OrderRow } from '../../utils/orders'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { results } = await useOrdersDb(event)
    .prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 300')
    .all<OrderRow>()
  return { orders: results.map(toAdminOrder) }
})
