import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { requireAdmin } from '../../../utils/admin-auth'
import { useOrdersDb, type D1Database } from '../../../utils/cloudflare'
import { toAdminOrder, type OrderRow } from '../../../utils/orders'

// 각 처리는 허용된 이전 상태에서만 일어난다. 조건에 맞지 않으면 한 줄도 바뀌지 않는다.
const actions = {
  markPaid: (db: D1Database, id: string, now: string) => db
    .prepare(`UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ? AND status = 'submitted'`)
    .bind(now, id),
  unmarkPaid: (db: D1Database, id: string) => db
    .prepare(`UPDATE orders SET status = 'submitted', paid_at = NULL WHERE id = ? AND status = 'paid'`)
    .bind(id),
  cancel: (db: D1Database, id: string, now: string) => db
    .prepare(`UPDATE orders SET status = 'cancelled', cancelled_at = ? WHERE id = ? AND status IN ('open', 'submitted')`)
    .bind(now, id),
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<{ action?: unknown }>(event)
  const action = typeof body?.action === 'string' ? body.action : ''
  if (!/^ORD-\d{8}-[0-9A-F]{8}$/.test(id) || !Object.hasOwn(actions, action)) {
    throw createError({ statusCode: 400, message: '요청을 확인해주세요.' })
  }

  const db = useOrdersDb(event)
  const result = await actions[action as keyof typeof actions](db, id, new Date().toISOString()).run()
  const order = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first<OrderRow>()
  if (!order) {
    throw createError({ statusCode: 404, message: '주문서를 찾을 수 없습니다.' })
  }

  if (result.meta.changes !== 1) {
    throw createError({
      statusCode: 409,
      message: '주문서 상태가 바뀌어 처리하지 못했습니다. 목록을 새로고침해 주세요.',
      data: { code: 'ORDER_STATE_CHANGED' },
    })
  }

  console.log('Order updated:', { orderId: id, action })
  return { order: toAdminOrder(order) }
})
