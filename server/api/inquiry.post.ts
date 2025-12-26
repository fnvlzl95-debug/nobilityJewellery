import { defineEventHandler, readBody, createError } from 'h3'
import { sendMail } from '../utils/mail'

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

const typeLabels: Record<string, string> = {
  wholesale: '도매 상담',
  custom: '주문 제작',
  repair: '수리/세공',
  other: '기타',
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
    typeLabel: typeLabels[body.type] || '기타',
    message: body.message.trim(),
    submittedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    ip: ip.split(',')[0].trim(),
  }

  console.log('New inquiry received:', inquiry)

  // Send email notification
  try {
    await sendMail({
      to: 'fnvlzl95@naver.com',
      subject: `[귀족] 새 문의 - ${inquiry.typeLabel} / ${inquiry.name}`,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            새로운 문의가 접수되었습니다
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 100px;">문의 유형</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${inquiry.typeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">이름</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">연락처</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <a href="tel:${inquiry.phone}" style="color: #c9a227;">${inquiry.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">접수시간</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${inquiry.submittedAt}</td>
            </tr>
          </table>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">문의 내용</h3>
            <div style="background: #f9f9f9; padding: 15px; border-left: 3px solid #c9a227; white-space: pre-wrap;">
${inquiry.message}
            </div>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            이 메일은 noblessegold.com 문의하기를 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    // Don't throw error to user - inquiry is still logged
  }

  return { ok: true }
})
