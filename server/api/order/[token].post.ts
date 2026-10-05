import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { clientIp, runAfterResponse, useOrdersDb } from '../../utils/cloudflare'
import { sendOrderSubmittedMail } from '../../utils/order-mail'
import { findOrderByToken, orderState, type OrderState } from '../../utils/orders'
import { createRateLimiter } from '../../utils/rate-limit'

interface OrderBody {
  name: string
  phone: string
  address: string
  consent: boolean
  honeypot?: string // Spam prevention
}

const allowRequest = createRateLimiter(5, 60 * 1000)

function validatePhone(phone: string): boolean {
  // Korean phone number format
  const phoneRegex = /^(01[016789]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

const closedMessages: Record<Exclude<OrderState, 'open'>, string> = {
  submitted: '이미 접수된 주문서입니다.',
  paid: '이미 접수된 주문서입니다.',
  cancelled: '취소된 주문서입니다.',
  expired: '작성 기한이 지난 주문서입니다.',
}

export default defineEventHandler(async (event) => {
  // Rate limiting
  if (!allowRequest(clientIp(event))) {
    throw createError({
      statusCode: 429,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    })
  }

  const db = useOrdersDb(event)
  const order = await findOrderByToken(db, getRouterParam(event, 'token'))
  if (!order) {
    throw createError({ statusCode: 404, message: '주문서를 찾을 수 없습니다.' })
  }

  const body = await readBody<OrderBody>(event)

  if (!body || typeof body !== 'object' || typeof body.name !== 'string' ||
      typeof body.phone !== 'string' || typeof body.address !== 'string') {
    throw createError({ statusCode: 400, message: '주문서 내용을 확인해주세요.', data: { code: 'INVALID_ORDER' } })
  }

  // Honeypot check (spam prevention)
  if (body.honeypot) {
    // Silently accept but don't process
    return { ok: true }
  }

  const closed = (state: Exclude<OrderState, 'open'>) => createError({
    statusCode: 409,
    message: closedMessages[state],
    data: { code: 'ORDER_NOT_OPEN' },
  })
  const state = orderState(order)
  if (state !== 'open') throw closed(state)

  // Validation
  if (body.name.trim().length < 2 || body.name.length > 50) {
    throw createError({
      statusCode: 400,
      message: '주문자 이름을 올바르게 입력해주세요.',
    })
  }

  if (!validatePhone(body.phone)) {
    throw createError({
      statusCode: 400,
      message: '올바른 전화번호를 입력해주세요.',
    })
  }

  if (body.address.trim().length < 5 || body.address.length > 200) {
    throw createError({
      statusCode: 400,
      message: '배송지 주소를 정확히 입력해주세요.',
    })
  }

  if (body.consent !== true) {
    throw createError({
      statusCode: 400,
      message: '개인정보 수집·이용에 동의해주세요.',
    })
  }

  const submitted = {
    ...order,
    status: 'submitted' as const,
    customer_name: body.name.trim(),
    customer_phone: body.phone.replace(/\s/g, ''),
    customer_address: body.address.trim(),
    submitted_at: new Date().toISOString(),
  }

  // 상태 조건을 건 한 번의 UPDATE로 접수한다 — 같은 링크로 동시에 보내도 한 건만 받는다.
  const result = await db
    .prepare(`UPDATE orders
      SET status = 'submitted', customer_name = ?, customer_phone = ?, customer_address = ?, submitted_at = ?
      WHERE token = ? AND status = 'open' AND expires_at > ?`)
    .bind(submitted.customer_name, submitted.customer_phone, submitted.customer_address, submitted.submitted_at, order.token, submitted.submitted_at)
    .run()
  if (result.meta.changes !== 1) throw closed('submitted')

  console.log('Order submitted:', { orderId: order.id })

  // 주문은 이미 저장됐다. 알림 메일이 실패해도 접수는 유효하고 관리 페이지에서 확인할 수 있다.
  await runAfterResponse(event, sendOrderSubmittedMail(event, submitted)
    .then(mail => console.log('Order email sent:', { orderId: order.id, mailId: mail.id }))
    .catch((error) => {
      const message = error instanceof Error ? error.message : ''
      const code = message.includes('not configured') ? 'MAIL_NOT_CONFIGURED' : 'MAIL_PROVIDER_REJECTED'
      console.error('Order notification failed:', { orderId: order.id, code })
    }))

  return { ok: true, orderId: order.id, state: 'submitted' as const }
})
