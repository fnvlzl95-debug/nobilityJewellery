import { defineEventHandler, readBody, createError } from 'h3'

interface InquiryBody {
  name: string
  phone: string
  type: string
  message: string
  consent: boolean
  honeypot?: string // Spam prevention
}

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // Max requests
const RATE_WINDOW = 60 * 1000 // Per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
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

export default defineEventHandler(async (event) => {
  const ip = event.node.req.headers['x-forwarded-for'] as string ||
             event.node.req.socket.remoteAddress ||
             'unknown'

  // Rate limiting
  if (!checkRateLimit(ip)) {
    throw createError({
      statusCode: 429,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    })
  }

  const body = await readBody<InquiryBody>(event)

  // Honeypot check (spam prevention)
  if (body.honeypot) {
    // Silently accept but don't process
    return { ok: true }
  }

  // Validation
  if (!body.name || body.name.length < 2 || body.name.length > 100) {
    throw createError({
      statusCode: 400,
      message: '이름을 올바르게 입력해주세요.',
    })
  }

  if (!body.phone || !validatePhone(body.phone)) {
    throw createError({
      statusCode: 400,
      message: '올바른 연락처를 입력해주세요.',
    })
  }

  if (!body.message || body.message.length < 10 || body.message.length > 2000) {
    throw createError({
      statusCode: 400,
      message: '문의 내용을 10자 이상 입력해주세요.',
    })
  }

  if (!body.consent) {
    throw createError({
      statusCode: 400,
      message: '개인정보 수집에 동의해주세요.',
    })
  }

  // Process inquiry
  const inquiry = {
    name: body.name.trim(),
    phone: body.phone.replace(/\s/g, ''),
    type: body.type || 'other',
    message: body.message.trim(),
    submittedAt: new Date().toISOString(),
    ip: ip.split(',')[0].trim(), // Take first IP if multiple
  }

  // TODO: Implement actual notification
  // Options:
  // 1. Send email via Resend/SendGrid/Mailgun
  // 2. Send webhook to Slack/Discord
  // 3. Store in database (Supabase/PlanetScale)

  console.log('New inquiry received:', inquiry)

  // Example: Send email notification (uncomment and configure)
  /*
  const { sendEmail } = useResend()
  await sendEmail({
    to: 'admin@guijok.com',
    subject: `[귀족] 새 문의 - ${inquiry.name}`,
    html: `
      <h2>새로운 문의가 접수되었습니다</h2>
      <p><strong>이름:</strong> ${inquiry.name}</p>
      <p><strong>연락처:</strong> ${inquiry.phone}</p>
      <p><strong>유형:</strong> ${inquiry.type}</p>
      <p><strong>내용:</strong></p>
      <p>${inquiry.message}</p>
      <p><small>접수시간: ${inquiry.submittedAt}</small></p>
    `,
  })
  */

  return { ok: true }
})
