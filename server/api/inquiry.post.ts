import { defineEventHandler, readBody, createError, getRequestHeader, getRequestIP } from 'h3'
import { useRuntimeConfig } from '#imports'
import { sendMail } from '../utils/mail'
import { cleanPath, sanitizeAcquisition } from '../../utils/analytics-policy'

interface InquiryBody {
  name: string
  phone: string
  type: string
  message: string
  consent: boolean
  source?: string
  topic?: string
  honeypot?: string // Spam prevention
  sourcePath?: string
  discoverySource?: string
  acquisition?: unknown
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

function createInquiryId(): string {
  const date = new Date()
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
    .replaceAll('-', '')
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
  return `NG-${date}-${random}`
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

  const body = await readBody<InquiryBody>(event)

  if (!body || typeof body !== 'object' || typeof body.name !== 'string' ||
      typeof body.phone !== 'string' || typeof body.message !== 'string' ||
      typeof body.type !== 'string' || !Object.hasOwn(typeLabels, body.type)) {
    throw createError({ statusCode: 400, message: '문의 내용을 확인해주세요.', data: { code: 'INVALID_INQUIRY' } })
  }

  // Honeypot check (spam prevention)
  if (body.honeypot) {
    // Silently accept but don't process
    return { ok: true }
  }

  // Validation
  if (body.name.trim().length < 2 || body.name.length > 100) {
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

  if (body.message.trim().length < 10 || body.message.length > 2000) {
    throw createError({
      statusCode: 400,
      message: '문의 내용을 10자 이상 입력해주세요.',
    })
  }

  if (body.consent !== true) {
    throw createError({
      statusCode: 400,
      message: '개인정보 수집에 동의해주세요.',
    })
  }

  // Process inquiry
  const inquiryId = createInquiryId()
  const inquiry = {
    id: inquiryId,
    name: body.name.trim(),
    phone: body.phone.replace(/\s/g, ''),
    type: body.type || 'other',
    typeLabel: typeLabels[body.type] || '기타',
    message: body.message.trim(),
    source: typeof body.source === 'string' ? body.source.trim().slice(0, 40) : '',
    topic: typeof body.topic === 'string' ? body.topic.trim().slice(0, 120) : '',
    sourcePath: cleanPath(body.sourcePath),
    discoverySource: ['naver_search', 'google_search', 'naver_place', 'ai', 'recommendation', 'returning', 'other'].includes(body.discoverySource || '') ? body.discoverySource! : '',
    acquisition: sanitizeAcquisition(body.acquisition),
    submittedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    ip: ip.split(',')[0].trim(),
  }

  console.log('Inquiry received:', { inquiryId: inquiry.id, type: inquiry.type })

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
    const inquiryTo = cloudflareEnv.INQUIRY_TO ||
      cloudflareEnv.NUXT_INQUIRY_TO ||
      runtimeConfig.inquiryTo ||
      ''

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    if (!inquiryTo) {
      throw new Error('inquiry recipient not configured')
    }

    const mailResult = await sendMail({
      to: inquiryTo,
      subject: `[귀족] 새 문의 ${inquiry.id} - ${inquiry.typeLabel} / ${inquiry.name}`,
      apiKey: resendApiKey,
      fromEmail: resendFrom,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            새로운 문의가 접수되었습니다
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 100px;">접수번호</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${inquiry.id}</strong></td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 100px;">문의 유형</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(inquiry.typeLabel)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">이름</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(inquiry.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">연락처</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <a href="tel:${escapeHtml(inquiry.phone)}" style="color: #c9a227;">${escapeHtml(inquiry.phone)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">접수시간</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${inquiry.submittedAt}</td>
            </tr>
            ${inquiry.source ? `
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">유입 출처</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(inquiry.source)}</td>
            </tr>
            ` : ''}
            ${inquiry.topic ? `
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold;">상담 주제</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(inquiry.topic)}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding:12px;background:#f5f5f5;font-weight:bold">상담 페이지</td>
              <td style="padding:12px">${escapeHtml(inquiry.sourcePath || '직접 문의')}</td>
            </tr>
            <tr>
              <td style="padding:12px;background:#f5f5f5;font-weight:bold">처음 안 경로</td>
              <td style="padding:12px">${escapeHtml(inquiry.discoverySource || '미응답')}</td>
            </tr>
            <tr>
              <td style="padding:12px;background:#f5f5f5;font-weight:bold">사이트 유입</td>
              <td style="padding:12px">착지: ${escapeHtml(inquiry.acquisition.landingPath || '미상')}<br>참조 호스트: ${escapeHtml(inquiry.acquisition.referrerHost || '미상')}<br>캠페인: ${escapeHtml([inquiry.acquisition.utmSource, inquiry.acquisition.utmMedium, inquiry.acquisition.utmCampaign].filter(Boolean).join(' / ') || '없음')}</td>
            </tr>
          </table>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">문의 내용</h3>
            <div style="background: #f9f9f9; padding: 15px; border-left: 3px solid #c9a227; white-space: pre-wrap;">
${escapeHtml(inquiry.message)}
            </div>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            이 메일은 noblessegold.com 문의하기를 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    })
    console.log('Inquiry email sent:', { inquiryId: inquiry.id, mailId: mailResult.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    const code = message.includes('not configured') ? 'MAIL_NOT_CONFIGURED' : 'MAIL_PROVIDER_REJECTED'
    console.error('Inquiry delivery failed:', { inquiryId: inquiry.id, code })
    throw createError({
      statusCode: code === 'MAIL_NOT_CONFIGURED' ? 503 : 502,
      message: '문의 전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.',
      data: { code },
    })
  }

  return { ok: true, inquiryId }
})
