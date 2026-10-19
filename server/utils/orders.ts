import { createError } from 'h3'
import { addVat } from '../../utils/order'
import type { D1Database } from './cloudflare'

export type OrderStatus = 'open' | 'submitted' | 'paid' | 'cancelled'
// 'expired'는 저장하지 않는다 — 작성 대기(open) 상태로 기한이 지난 주문서를 뜻한다.
export type OrderState = OrderStatus | 'expired'

export interface OrderRow {
  id: string
  token: string
  product: string
  amount: number
  vat_included: number
  deposit: number
  spec: string
  due_date: string
  memo: string
  status: OrderStatus
  customer_name: string | null
  customer_phone: string | null
  customer_address: string | null
  created_at: string
  expires_at: string
  submitted_at: string | null
  paid_at: string | null
  balance_paid_at: string | null
  cancelled_at: string | null
}

export const ORDER_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22}$/
export const ORDER_VALID_DAYS = [7, 14, 30]

export function orderState(order: Pick<OrderRow, 'status' | 'expires_at'>, now = new Date()): OrderState {
  return order.status === 'open' && order.expires_at <= now.toISOString() ? 'expired' : order.status
}

export function isValidPhone(phone: string): boolean {
  // Korean phone number format
  return /^(01[016789]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/.test(phone.replace(/\s/g, ''))
}

/** What the customer's link may show: never the submitted personal details. */
export function toPublicOrder(order: OrderRow) {
  return {
    orderId: order.id,
    product: order.product,
    amount: order.amount,
    vatIncluded: order.vat_included === 1,
    deposit: order.deposit,
    spec: order.spec,
    dueDate: order.due_date,
    state: orderState(order),
    balancePaid: order.balance_paid_at !== null,
  }
}

export function toAdminOrder(order: OrderRow) {
  return {
    id: order.id,
    token: order.token,
    product: order.product,
    amount: order.amount,
    vatIncluded: order.vat_included === 1,
    deposit: order.deposit,
    spec: order.spec,
    dueDate: order.due_date,
    memo: order.memo,
    state: orderState(order),
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerAddress: order.customer_address,
    createdAt: order.created_at,
    expiresAt: order.expires_at,
    submittedAt: order.submitted_at,
    paidAt: order.paid_at,
    balancePaidAt: order.balance_paid_at,
  }
}

const invalid = (message: string) => createError({ statusCode: 400, message })

/**
 * 관리 화면에서 만들거나 고치는 주문서 내용.
 * 금액은 입력한 그대로 받고, 부가세를 더하는 주문이면 여기서 10%를 더해 총금액으로 저장한다.
 * 주문자와 전화번호를 함께 적으면 고객이 링크에서 작성하지 않아도 바로 접수된 주문서가 된다.
 */
export function parseOrderDetails(body: Record<string, unknown> | null | undefined) {
  const text = (value: unknown) => typeof value === 'string' ? value.trim() : ''
  const product = text(body?.product)
  const spec = text(body?.spec)
  const dueDate = text(body?.dueDate)
  const memo = text(body?.memo)
  const customerName = text(body?.customerName)
  const customerPhone = text(body?.customerPhone).replace(/\s/g, '')
  const customerAddress = text(body?.customerAddress)
  const { amount, deposit } = body || {}

  if (product.length < 1 || product.length > 60) throw invalid('상품명을 60자 이내로 입력해주세요.')
  if (typeof amount !== 'number' || !Number.isInteger(amount) || amount < 1000 || amount > 900000000) {
    throw invalid('금액을 원 단위 숫자로 입력해주세요.')
  }
  const vatIncluded = body?.addVat === true
  const total = vatIncluded ? addVat(amount) : amount
  const depositValue = deposit ?? 0
  if (typeof depositValue !== 'number' || !Number.isInteger(depositValue) || depositValue < 0) {
    throw invalid('계약금을 원 단위 숫자로 입력해주세요.')
  }
  if (depositValue >= total) throw invalid('계약금은 총금액보다 적어야 합니다.')
  if (spec.length > 300) throw invalid('제작 사양은 300자 이내로 입력해주세요.')
  if (dueDate.length > 40) throw invalid('수령 예정일은 40자 이내로 입력해주세요.')
  if (memo.length > 200) throw invalid('메모는 200자 이내로 입력해주세요.')
  if (customerName || customerPhone) {
    if (customerName.length < 2 || customerName.length > 50) throw invalid('주문자 이름을 올바르게 입력해주세요.')
    if (!isValidPhone(customerPhone)) throw invalid('올바른 전화번호를 입력해주세요.')
  }
  if (customerAddress.length > 200) throw invalid('배송지는 200자 이내로 입력해주세요.')

  return {
    product,
    amount: total,
    vatIncluded,
    deposit: depositValue,
    spec,
    dueDate,
    memo,
    customer: customerName ? { name: customerName, phone: customerPhone, address: customerAddress || null } : null,
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
