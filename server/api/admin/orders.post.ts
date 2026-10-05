import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { createOrderId, ORDER_VALID_DAYS, toAdminOrder, type OrderRow } from '../../utils/orders'
import { randomToken } from '../../utils/secure-random'

interface CreateOrderBody {
  product?: unknown
  amount?: unknown
  memo?: unknown
  validDays?: unknown
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<CreateOrderBody>(event)
  const product = typeof body?.product === 'string' ? body.product.trim() : ''
  const memo = typeof body?.memo === 'string' ? body.memo.trim() : ''
  const amount = body?.amount
  const validDays = body?.validDays

  if (product.length < 1 || product.length > 60) {
    throw createError({ statusCode: 400, message: '상품명을 60자 이내로 입력해주세요.' })
  }

  if (typeof amount !== 'number' || !Number.isInteger(amount) || amount < 1000 || amount > 1000000000) {
    throw createError({ statusCode: 400, message: '금액을 원 단위 숫자로 입력해주세요.' })
  }

  if (memo.length > 200) {
    throw createError({ statusCode: 400, message: '메모는 200자 이내로 입력해주세요.' })
  }

  if (typeof validDays !== 'number' || !ORDER_VALID_DAYS.includes(validDays)) {
    throw createError({ statusCode: 400, message: '작성 기한을 선택해주세요.' })
  }

  const now = new Date()
  const order: OrderRow = {
    id: createOrderId(now),
    token: randomToken(16),
    product,
    amount,
    memo,
    status: 'open',
    customer_name: null,
    customer_phone: null,
    customer_address: null,
    created_at: now.toISOString(),
    expires_at: new Date(now.getTime() + validDays * 86400000).toISOString(),
    submitted_at: null,
    paid_at: null,
    cancelled_at: null,
  }

  await useOrdersDb(event)
    .prepare('INSERT INTO orders (id, token, product, amount, memo, status, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(order.id, order.token, order.product, order.amount, order.memo, order.status, order.created_at, order.expires_at)
    .run()

  console.log('Order created:', { orderId: order.id })
  return { order: toAdminOrder(order) }
})
