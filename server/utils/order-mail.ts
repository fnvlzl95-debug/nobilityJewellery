import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import { cloudflareEnv } from './cloudflare'
import { sendMail } from './mail'
import type { OrderRow } from './orders'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Cloudflare Pages exposes runtime bindings on the request context. Support
// both the existing variable names and Nuxt's NUXT_* runtime overrides.
function resolveMailConfig(event: H3Event) {
  const runtimeConfig = useRuntimeConfig(event)
  const env = cloudflareEnv(event) as Record<string, string | undefined>
  const to = env.INQUIRY_TO || env.NUXT_INQUIRY_TO || runtimeConfig.inquiryTo || ''
  return {
    apiKey: env.RESEND_API_KEY || env.NUXT_RESEND_API_KEY || runtimeConfig.resendApiKey || '',
    fromEmail: env.RESEND_FROM || env.NUXT_RESEND_FROM || runtimeConfig.resendFrom || '',
    to,
    // 관리자 로그인 인증번호를 받는 주소. 따로 정하지 않으면 주문·문의 메일을 받는 주소와 같다.
    adminEmail: env.ADMIN_EMAIL || to,
  }
}

export function adminEmail(event: H3Event): string {
  return resolveMailConfig(event).adminEmail.trim().toLowerCase()
}

function requireMailConfig(event: H3Event) {
  const config = resolveMailConfig(event)
  if (!config.apiKey) throw new Error('RESEND_API_KEY not configured')
  if (!config.to) throw new Error('order recipient not configured')
  return config
}

const row = (label: string, value: string) => `
            <tr>
              <td style="padding: 12px; background: #f5f5f5; font-weight: bold; width: 100px;">${label}</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${value}</td>
            </tr>`

export async function sendOrderSubmittedMail(event: H3Event, order: OrderRow) {
  const config = requireMailConfig(event)
  const submittedAt = new Date(order.submitted_at || Date.now()).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const phone = escapeHtml(order.customer_phone || '')
  return sendMail({
    to: config.to,
    idempotencyKey: `order/${order.id}`,
    subject: `[귀족] 주문서 접수 ${order.id} - ${order.customer_name}`,
    apiKey: config.apiKey,
    fromEmail: config.fromEmail,
    html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            주문서가 접수되었습니다
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            ${row('접수번호', `<strong>${order.id}</strong>`)}
            ${row('주문 상품', escapeHtml(order.product))}
            ${row('주문 금액', `${order.amount.toLocaleString('ko-KR')}원`)}
            ${order.memo ? row('내부 메모', escapeHtml(order.memo)) : ''}
            ${row('주문자', escapeHtml(order.customer_name || ''))}
            ${row('전화번호', `<a href="tel:${phone}" style="color: #c9a227;">${phone}</a>`)}
            ${row('배송지', escapeHtml(order.customer_address || ''))}
            ${row('접수시간', submittedAt)}
          </table>

          <p style="margin: 20px 0;">
            입금을 확인하면 주문서 관리 페이지에서 입금 확인으로 바꿔 주세요.
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            이 메일은 noblessegold.com 주문서를 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
  })
}

export async function sendAdminLoginCodeMail(event: H3Event, code: string, minutes: number) {
  const config = requireMailConfig(event)
  return sendMail({
    to: config.adminEmail,
    subject: `[귀족] 주문서 관리 로그인 인증번호 ${code}`,
    apiKey: config.apiKey,
    fromEmail: config.fromEmail,
    html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a227; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            주문서 관리 로그인
          </h2>

          <p style="margin: 20px 0 8px;">아래 인증번호를 로그인 화면에 입력해 주세요. ${minutes}분 동안만 쓸 수 있습니다.</p>
          <p style="margin: 0 0 20px; font-size: 32px; font-weight: bold; letter-spacing: 4px;">${code}</p>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            직접 요청하지 않았다면 이 메일은 무시하셔도 됩니다. 인증번호를 다른 사람에게 알려주지 마세요.
          </p>
        </div>
      `,
  })
}
