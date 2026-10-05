import { defineEventHandler, readBody, createError } from 'h3'
import { assertSameOrigin, clearLoginAttempt, getLoginAttempt, loginCodeHash, startAdminSession } from '../../../utils/admin-auth'
import { clientIp, useOrdersDb } from '../../../utils/cloudflare'
import { createRateLimiter } from '../../../utils/rate-limit'
import { sha256Hex, timingSafeEqual } from '../../../utils/secure-random'

const allowRequest = createRateLimiter(10, 60 * 1000)

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)
  if (!allowRequest(clientIp(event))) {
    throw createError({ statusCode: 429, message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' })
  }

  const body = await readBody<{ code?: unknown }>(event)
  const code = typeof body?.code === 'string' ? body.code.replace(/\D/g, '') : ''
  if (code.length !== 8) {
    throw createError({ statusCode: 400, message: '인증번호 8자리를 입력해주세요.' })
  }

  const expired = () => createError({
    statusCode: 400,
    message: '인증번호가 만료되었습니다. 다시 요청해주세요.',
    data: { code: 'LOGIN_CODE_EXPIRED' },
  })
  const attempt = getLoginAttempt(event)
  if (!attempt) throw expired()

  const db = useOrdersDb(event)
  const now = new Date().toISOString()
  const loginCode = await db
    .prepare('SELECT id, code_hash FROM admin_login_codes WHERE attempt_hash = ? AND used_at IS NULL AND expires_at > ? ORDER BY id DESC LIMIT 1')
    .bind(await sha256Hex(attempt), now)
    .first<{ id: number; code_hash: string }>()
  if (!loginCode) throw expired()

  // 비교하기 전에 시도 횟수부터 올린다 — 동시에 여러 번 보내도 5번을 넘겨 맞혀 볼 수 없다.
  const reserved = await db
    .prepare('UPDATE admin_login_codes SET attempts = attempts + 1 WHERE id = ? AND attempts < 5 AND used_at IS NULL')
    .bind(loginCode.id)
    .run()
  if (reserved.meta.changes !== 1) throw expired()

  if (!timingSafeEqual(await loginCodeHash(code, attempt), loginCode.code_hash)) {
    throw createError({ statusCode: 400, message: '인증번호가 맞지 않습니다.' })
  }

  const used = await db
    .prepare('UPDATE admin_login_codes SET used_at = ? WHERE id = ? AND used_at IS NULL')
    .bind(now, loginCode.id)
    .run()
  if (used.meta.changes !== 1) throw expired()

  await startAdminSession(event)
  clearLoginAttempt(event)
  return { ok: true }
})
