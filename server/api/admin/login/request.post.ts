import { defineEventHandler, readBody, createError } from 'h3'
import { assertSameOrigin, loginCodeHash, LOGIN_CODE_MINUTES, setLoginAttempt } from '../../../utils/admin-auth'
import { clientIp, useOrdersDb } from '../../../utils/cloudflare'
import { adminEmail, sendAdminLoginCodeMail } from '../../../utils/order-mail'
import { createRateLimiter } from '../../../utils/rate-limit'
import { randomDigits, sha256Hex } from '../../../utils/secure-random'

const allowRequest = createRateLimiter(10, 60 * 1000)

// 인증번호 발송 한도 — 운영자 메일함이 도배되거나 번호를 무한정 맞혀 보는 일을 막는다.
const CODES_PER_IP = 3 // 15분
const CODES_TOTAL = 10 // 1시간

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)
  const ip = clientIp(event)
  if (!allowRequest(ip)) {
    throw createError({ statusCode: 429, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' })
  }

  const body = await readBody<{ email?: unknown }>(event)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || email.length > 200) {
    throw createError({ statusCode: 400, message: '관리자 이메일을 입력해주세요.' })
  }

  const db = useOrdersDb(event)
  const attempt = setLoginAttempt(event)

  // 등록된 관리자 주소가 아니면 아무것도 보내지 않는다. 응답은 같게 해서 주소 확인용으로 쓰이지 않게 한다.
  if (email !== adminEmail(event)) return { ok: true }

  const now = Date.now()
  const iso = (offsetMs = 0) => new Date(now + offsetMs).toISOString()
  const [byIp, total] = await db.batch([
    db.prepare('SELECT COUNT(*) AS n FROM admin_login_codes WHERE ip = ? AND created_at > ?').bind(ip, iso(-15 * 60000)),
    db.prepare('SELECT COUNT(*) AS n FROM admin_login_codes WHERE created_at > ?').bind(iso(-60 * 60000)),
  ]) as Array<{ results: Array<{ n: number }> }>
  if (byIp.results[0].n >= CODES_PER_IP || total.results[0].n >= CODES_TOTAL) {
    throw createError({ statusCode: 429, message: '인증번호를 너무 자주 요청했습니다. 잠시 후 다시 시도해주세요.' })
  }

  const code = randomDigits(8)
  await db.batch([
    db.prepare('DELETE FROM admin_login_codes WHERE created_at < ?').bind(iso(-86400000)),
    db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').bind(iso()),
    db.prepare('INSERT INTO admin_login_codes (attempt_hash, code_hash, ip, created_at, expires_at) VALUES (?, ?, ?, ?, ?)')
      .bind(await sha256Hex(attempt), await loginCodeHash(code, attempt), ip, iso(), iso(LOGIN_CODE_MINUTES * 60000)),
  ])

  try {
    await sendAdminLoginCodeMail(event, code, LOGIN_CODE_MINUTES)
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    const errorCode = message.includes('not configured') ? 'MAIL_NOT_CONFIGURED' : 'MAIL_PROVIDER_REJECTED'
    console.error('Admin login mail failed:', { code: errorCode })
    throw createError({
      statusCode: errorCode === 'MAIL_NOT_CONFIGURED' ? 503 : 502,
      message: '인증번호 메일을 보내지 못했습니다. 잠시 후 다시 시도해주세요.',
      data: { code: errorCode },
    })
  }

  return { ok: true }
})
