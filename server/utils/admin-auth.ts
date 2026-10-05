import { createError, deleteCookie, getCookie, getRequestHeader, getRequestHost, getRequestURL, setCookie, type H3Event } from 'h3'
import { useOrdersDb } from './cloudflare'
import { randomToken, sha256Hex } from './secure-random'

// 관리자 로그인: 운영자 메일로 보낸 인증번호를 확인하고, 무작위 세션 토큰을 쿠키로 준다.
// DB에는 토큰의 해시만 남기므로 별도의 서명 비밀값이 필요 없다.
const SESSION_COOKIE = 'ng_admin'
const LOGIN_ATTEMPT_COOKIE = 'ng_login'
const SESSION_DAYS = 30
export const LOGIN_CODE_MINUTES = 10

// 쿠키는 항상 Secure로 준다. http로 띄우는 로컬 개발 서버만 예외다.
export const secureCookies = (event: H3Event) => !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(getRequestHost(event))

/** Admin endpoints change state by cookie alone, so refuse requests started from another site. */
export function assertSameOrigin(event: H3Event): void {
  const origin = getRequestHeader(event, 'origin')
  if (!origin) return
  let originHost = ''
  try { originHost = new URL(origin).host } catch { /* malformed origin */ }
  if (originHost !== getRequestURL(event).host) {
    throw createError({ statusCode: 403, message: '허용되지 않은 요청입니다.' })
  }
}

export async function isAdmin(event: H3Event): Promise<boolean> {
  const token = getCookie(event, SESSION_COOKIE)
  if (!token) return false
  const session = await useOrdersDb(event)
    .prepare('SELECT 1 AS ok FROM admin_sessions WHERE token_hash = ? AND expires_at > ?')
    .bind(await sha256Hex(token), new Date().toISOString())
    .first()
  return Boolean(session)
}

export async function requireAdmin(event: H3Event): Promise<void> {
  assertSameOrigin(event)
  if (!await isAdmin(event)) {
    throw createError({ statusCode: 401, message: '로그인이 필요합니다.', data: { code: 'ADMIN_LOGIN_REQUIRED' } })
  }
}

export async function startAdminSession(event: H3Event): Promise<void> {
  const token = randomToken(32)
  const now = Date.now()
  await useOrdersDb(event)
    .prepare('INSERT INTO admin_sessions (token_hash, created_at, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256Hex(token), new Date(now).toISOString(), new Date(now + SESSION_DAYS * 86400000).toISOString())
    .run()
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: secureCookies(event),
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DAYS * 86400,
  })
}

export async function endAdminSession(event: H3Event): Promise<void> {
  const token = getCookie(event, SESSION_COOKIE)
  if (token) {
    await useOrdersDb(event)
      .prepare('DELETE FROM admin_sessions WHERE token_hash = ?')
      .bind(await sha256Hex(token))
      .run()
  }
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}

// 인증번호는 그것을 요청한 브라우저에서만 쓸 수 있다 — 요청 때 심은 쿠키가 함께 와야 한다.
export function setLoginAttempt(event: H3Event): string {
  const attempt = randomToken(16)
  setCookie(event, LOGIN_ATTEMPT_COOKIE, attempt, {
    httpOnly: true,
    secure: secureCookies(event),
    sameSite: 'strict',
    path: '/api/admin/login',
    maxAge: LOGIN_CODE_MINUTES * 60,
  })
  return attempt
}

export function getLoginAttempt(event: H3Event): string {
  return getCookie(event, LOGIN_ATTEMPT_COOKIE) || ''
}

export function clearLoginAttempt(event: H3Event): void {
  deleteCookie(event, LOGIN_ATTEMPT_COOKIE, { path: '/api/admin/login' })
}

export const loginCodeHash = (code: string, attempt: string) => sha256Hex(`${code}:${attempt}`)
