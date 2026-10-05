import { createError, defineEventHandler, getCookie, getQuery, getRequestURL, sendRedirect, setCookie, setResponseHeaders } from 'h3'
import { secureCookies } from '../utils/admin-auth'
import { cloudflareEnv } from '../utils/cloudflare'
import { sha256Hex, timingSafeEqual } from '../utils/secure-random'

const GATE_COOKIE = 'ng_gate'
const GATE_DAYS = 400 // 브라우저가 허용하는 쿠키 최대 수명

// 관리 페이지는 주소를 안다고 열리지 않는다. 운영자만 아는 진입 링크(/admin?key=…)로
// 들어온 기기에만 보이고, 그 밖의 모든 요청에는 없는 페이지와 똑같이 404로 답한다.
// 진입 키는 저장소에 두지 않고 Cloudflare 암호화 변수 ADMIN_GATE_KEY로만 관리한다.
export default defineEventHandler(async (event) => {
  const { pathname, search } = getRequestURL(event)
  if (pathname !== '/admin' && !pathname.startsWith('/admin/') && !pathname.startsWith('/api/admin/')) return

  // Nuxt가 없는 주소에 내는 오류와 같은 내용으로 맞춘다 — 응답만 봐서는 구별할 수 없어야 한다.
  const fullPath = pathname + search
  const notFound = () => createError({ statusCode: 404, statusMessage: `Page not found: ${fullPath}`, data: { path: fullPath } })

  // 키가 설정되지 않았으면 아무에게도 열지 않는다.
  const gateKey = String(cloudflareEnv(event).ADMIN_GATE_KEY || '')
  if (!gateKey) throw notFound()
  const gate = await sha256Hex(gateKey)

  const key = getQuery(event).key
  if (pathname === '/admin' && typeof key === 'string' && timingSafeEqual(await sha256Hex(key), gate)) {
    // 메일 등 다른 곳에서 /admin 링크를 눌러도 따라와야 하므로 SameSite는 lax다. 로그인 세션은 따로 strict로 둔다.
    setCookie(event, GATE_COOKIE, gate, {
      httpOnly: true,
      secure: secureCookies(event),
      sameSite: 'lax',
      path: '/',
      maxAge: GATE_DAYS * 86400,
    })
    // 키가 주소창과 방문 기록에 남지 않게 바로 돌려보낸다.
    return sendRedirect(event, '/admin', 302)
  }

  if (!timingSafeEqual(getCookie(event, GATE_COOKIE) || '', gate)) throw notFound()

  setResponseHeaders(event, {
    'cache-control': 'no-store',
    'x-robots-tag': 'noindex, nofollow',
    'referrer-policy': 'same-origin',
  })
})
