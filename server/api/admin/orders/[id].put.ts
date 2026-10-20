import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { requireAdmin } from '../../../utils/admin-auth'
import { useOrdersDb } from '../../../utils/cloudflare'
import { orderState, parseOrderDetails, toAdminOrder, type OrderRow } from '../../../utils/orders'

// 만든 주문서의 내용을 고친다. 접수번호와 고객 링크, 접수·입금 기록은 그대로 둔다.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id') || ''
  if (!/^ORD-\d{8}-[0-9A-F]{8}$/.test(id)) {
    throw createError({ statusCode: 400, message: '요청을 확인해주세요.' })
  }

  const details = parseOrderDetails(await readBody<Record<string, unknown>>(event))
  const db = useOrdersDb(event)
  const order = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first<OrderRow>()
  if (!order) {
    throw createError({ statusCode: 404, message: '주문서를 찾을 수 없습니다.' })
  }

  const conflict = (message: string) => createError({ statusCode: 409, message, data: { code: 'ORDER_STATE_CHANGED' } })
  const state = orderState(order)
  if (state === 'cancelled' || state === 'expired') throw conflict('취소되었거나 작성 기한이 지난 주문서는 고칠 수 없습니다.')
  // 접수된 주문서의 주문자 정보는 지울 수 없다. 작성 대기 주문서에 주문자를 적으면 그때 접수된다.
  if (order.status !== 'open' && !details.customer) throw createError({ statusCode: 400, message: '주문자와 전화번호를 입력해주세요.' })

  const now = new Date().toISOString()
  const customer = details.customer
  const status = order.status === 'open' && customer ? 'submitted' : order.status
  const result = await db
    .prepare(`UPDATE orders
      SET product = ?, amount = ?, vat_included = ?, deposit = ?, account = ?, spec = ?, due_date = ?, memo = ?,
          customer_name = ?, customer_phone = ?, customer_address = ?, status = ?, submitted_at = ?
      WHERE id = ? AND status = ? AND (status != 'open' OR expires_at > ?)`)
    .bind(
      details.product, details.amount, details.vatIncluded ? 1 : 0, details.deposit, details.account, details.spec, details.dueDate, details.memo,
      customer?.name ?? null, customer?.phone ?? null, customer?.address ?? null, status, order.submitted_at ?? (customer ? now : null),
      id, order.status, now,
    )
    .run()
  // 그사이 고객이 접수했거나 다른 기기에서 상태를 바꿨으면 아무것도 바꾸지 않는다.
  if (result.meta.changes !== 1) throw conflict('주문서 상태가 바뀌어 고치지 못했습니다. 목록을 새로고침해 주세요.')

  const updated = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first<OrderRow>()
  console.log('Order edited:', { orderId: id })
  return { order: toAdminOrder(updated!) }
})
