import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { createOrderId, ORDER_VALID_DAYS, parseOrderDetails, toAdminOrder, type OrderRow } from '../../utils/orders'
import { randomToken } from '../../utils/secure-random'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<Record<string, unknown>>(event)
  const details = parseOrderDetails(body)
  const validDays = body?.validDays

  if (typeof validDays !== 'number' || !ORDER_VALID_DAYS.includes(validDays)) {
    throw createError({ statusCode: 400, message: '작성 기한을 선택해주세요.' })
  }

  const now = new Date()
  const order: OrderRow = {
    id: createOrderId(now),
    token: randomToken(16),
    product: details.product,
    amount: details.amount,
    vat_included: details.vatIncluded ? 1 : 0,
    deposit: details.deposit,
    account: details.account,
    spec: details.spec,
    due_date: details.dueDate,
    memo: details.memo,
    // 운영자가 주문자를 직접 적은 주문(전화·카카오톡 주문)은 고객 작성 없이 바로 접수된다.
    status: details.customer ? 'submitted' : 'open',
    customer_name: details.customer?.name ?? null,
    customer_phone: details.customer?.phone ?? null,
    customer_address: details.customer?.address ?? null,
    created_at: now.toISOString(),
    expires_at: new Date(now.getTime() + validDays * 86400000).toISOString(),
    submitted_at: details.customer ? now.toISOString() : null,
    paid_at: null,
    balance_paid_at: null,
    cancelled_at: null,
  }

  await useOrdersDb(event)
    .prepare(`INSERT INTO orders (id, token, product, amount, vat_included, deposit, account, spec, due_date, memo, status, customer_name, customer_phone, customer_address, created_at, expires_at, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(order.id, order.token, order.product, order.amount, order.vat_included, order.deposit, order.account, order.spec, order.due_date, order.memo, order.status, order.customer_name, order.customer_phone, order.customer_address, order.created_at, order.expires_at, order.submitted_at)
    .run()

  console.log('Order created:', { orderId: order.id })
  return { order: toAdminOrder(order) }
})
