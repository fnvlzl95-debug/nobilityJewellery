const revisions = new Map()
let sessionPromise
async function sessionToken() {
  sessionPromise ||= fetch('/api/session', { cache: 'no-store' }).then(async response => {
    if (!response.ok) throw new Error('관리 서버 연결을 확인해 주세요')
    return (await response.json()).token
  }).catch(error => { sessionPromise = null; throw error })
  return sessionPromise
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json'
  if (options.method && options.method !== 'GET') headers['X-Guide-Manager-Token'] = await sessionToken()
  const generationId = path.match(/^\/generations\/(\d+)\//)?.[1]
  if (options.method && generationId && revisions.has(generationId)) headers['If-Match'] = String(revisions.get(generationId))
  const response = await fetch(`/api${path}`, { ...options, headers, body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (payload.code === 'SESSION_REQUIRED') sessionPromise = null
    throw Object.assign(new Error(payload.error || `요청 실패 (${response.status})`), { status: response.status, code: payload.code })
  }
  if (payload?.kind && payload?.id && Number.isInteger(payload.revision)) revisions.set(String(payload.id), payload.revision)
  return payload
}

export const api = {
  get: (path) => request(path),
  post: (path, body = {}) => request(path, { method: 'POST', body }),
  put: (path, body = {}) => request(path, { method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload: (path, file) => {
    const body = new FormData()
    body.append('file', file)
    return request(path, { method: 'POST', body })
  },
}
