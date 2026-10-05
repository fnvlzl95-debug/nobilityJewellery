import { defineEventHandler, readBody, createError, getRequestHeader, getRequestIP } from 'h3'
import { useRuntimeConfig } from '#imports'
import { siteConfig } from '~/config/site'
import { sendMail } from '../utils/mail'

interface OrderBody {
  name: string
  phone: string
  address: string
  consent: boolean
  honeypot?: string // Spam prevention
  requestId?: string
  requestedAt?: string
}

// Same per-isolate limiter as the inquiry endpoint.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // Max requests
const RATE_WINDOW = 60 * 1000 // Per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  if (rateLimitStore.size > 5000) for (const [key, item] of rateLimitStore) if (now > item.resetTime) rateLimitStore.delete(key)
  if (rateLimitStore.size >= 10000 && !rateLimitStore.has(ip)) return false
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

function validatePhone(phone: string): boolean {
  // Korean phone number format
  const phoneRegex = /^(01[016789]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const cloudflareEnv = (
    event.context as typeof event.context & {
      cloudflare?: { env?: Record<string, string | undefined> }
    }
  ).cloudflare?.env ?? {}
  const ip = getRequestHeader(event, 'cf-connecting-ip') ||
             getRequestIP(event, { xForwardedFor: true }) ||
             'unknown'

  // Rate limiting
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    })
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

  // A retried submission keeps its requestId, so it maps to the same order number
  // and the mail provider drops the duplicate.
  if (body.requestId && (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId) || !body.requestedAt || !Number.isFinite(Date.parse(body.requestedAt)) || Math.abs(Date.now() - Date.parse(body.requestedAt)) > 23 * 3600000)) throw createError({ statusCode: 400, message: '주문서 화면을 새로고침한 뒤 다시 전송해주세요.' })
  const requestedAt = new Date(body.requestId ? body.requestedAt! : Date.now())
  const orderDate = requestedAt.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).replaceAll('-', '')
  const orderId = `ORD-${orderDate}-${(body.requestId || crypto.randomUUID()).replaceAll('-', '').slice(0, 8).toUpperCase()}`
  const order = {
    id: orderId,
    product: siteConfig.order.product,
    amount: `${siteConfig.order.amount.toLocaleString('ko-KR')}원`,
    name: body.name.trim(),
    phone: body.phone.replace(/\s/g, ''),
    address: body.address.trim(),
    submittedAt: requestedAt.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  }

  console.log('Order received:', { orderId: order.id })

  // Send email notification
  try {
    // Cloudflare Pages exposes runtime bindings on the request context. Support
    // both the existing variable names and Nuxt's NUXT_* runtime overrides.
    const resendApiKey = cloudflareEnv.RESEND_API_KEY ||
      cloudflareEnv.NUXT_RESEND_API_KEY ||
      runtimeConfig.resendApiKey ||
      ''
    const resendFrom = cloudflareEnv.RESEND_FROM ||
      cloudflareEnv.NUXT_RESEND_FROM ||
      runtimeConfig.resendFrom ||
      ''
    const orderTo = cloudflareEnv.INQUIRY_TO ||
      cloudflareEnv.NUXT_INQUIRY_TO ||
      runtimeConfig.inquiryTo ||
      ''

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    if (!orderTo) {
      throw new Error('order recipient not configured')
    }

    const mailResult = await sendMail({
      to: orderTo,
      idempotencyKey: `order/${order.id}`,
      subject: `[귀족] 주문서 ${order.id} - ${order.name}`,
      apiKey: resendApiKey,
      fromEmail: resendFrom,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            새로운 주문서가 접수되었습니다
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 100px;">접수번호</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${order.id}</strong></td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">주문 상품</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(order.product)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">주문 금액</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${order.amount}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">주문자</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(order.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">전화번호</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <a href="tel:${escapeHtml(order.phone)}" style="color: #c9a227;">${escapeHtml(order.phone)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">배송지</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${escapeHtml(order.address)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">접수시간</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${order.submittedAt}</td>
            </tr>
          </table>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            이 메일은 noblessegold.com 주문서를 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    })
    console.log('Order email sent:', { orderId: order.id, mailId: mailResult.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    const code = message.includes('not configured') ? 'MAIL_NOT_CONFIGURED' : 'MAIL_PROVIDER_REJECTED'
    console.error('Order delivery failed:', { orderId: order.id, code })
    throw createError({
      statusCode: code === 'MAIL_NOT_CONFIGURED' ? 503 : 502,
      message: '주문서 전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.',
      data: { code },
    })
  }

  return { ok: true, orderId }
})
