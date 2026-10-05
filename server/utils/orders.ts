import type { D1Database } from './cloudflare'

export type OrderStatus = 'open' | 'submitted' | 'paid' | 'cancelled'
// 'expired'는 저장하지 않는다 — 작성 대기(open) 상태로 기한이 지난 주문서를 뜻한다.
export type OrderState = OrderStatus | 'expired'

export interface OrderRow {
  id: string
  token: string
  product: string
  amount: number
  memo: string
  status: OrderStatus
  customer_name: string | null
  customer_phone: string | null
  customer_address: string | null
  created_at: string
  expires_at: string
  submitted_at: string | null
  paid_at: string | null
  cancelled_at: string | null
}

export const ORDER_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22}$/
export const ORDER_VALID_DAYS = [7, 14, 30]

export function orderState(order: Pick<OrderRow, 'status' | 'expires_at'>, now = new Date()): OrderState {
  return order.status === 'open' && order.expires_at <= now.toISOString() ? 'expired' : order.status
}

/** What the customer's link may show: never the submitted personal details. */
export function toPublicOrder(order: OrderRow) {
  return {
    orderId: order.id,
    product: order.product,
    amount: order.amount,
    state: orderState(order),
  }
}

export function toAdminOrder(order: OrderRow) {
  return {
    id: order.id,
    token: order.token,
    product: order.product,
    amount: order.amount,
    memo: order.memo,
    state: orderState(order),
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerAddress: order.customer_address,
    createdAt: order.created_at,
    expiresAt: order.expires_at,
    submittedAt: order.submitted_at,
    paidAt: order.paid_at,
  }
}

export function createOrderId(now = new Date()): string {
  const date = now
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
    .replaceAll('-', '')
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `ORD-${date}-${random}`
}

export async function findOrderByToken(db: D1Database, token: unknown): Promise<OrderRow | null> {
  if (typeof token !== 'string' || !ORDER_TOKEN_PATTERN.test(token)) return null
  return db.prepare('SELECT * FROM orders WHERE token = ?').bind(token).first<OrderRow>()
}
