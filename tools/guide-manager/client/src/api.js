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
  if (options.method && generationId && !headers['If-Match'] && revisions.has(generationId)) headers['If-Match'] = String(revisions.get(generationId))
  const response = await fetch(`/api${path}`, { ...options, headers, body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (payload.code === 'SESSION_REQUIRED') sessionPromise = null
    throw Object.assign(new Error(payload.error || `요청 실패 (${response.status})`), { status: response.status, code: payload.code })
  }
  if (response.status === 202 && payload.jobId && !options.noPoll) {
    window.dispatchEvent(new CustomEvent('guide-job-update', { detail: payload.job }))
    return waitForJob(payload.jobId)
  }
  rememberRevision(payload)
  return payload
}

function rememberRevision(payload) {
  if (payload?.kind && payload?.id && Number.isInteger(payload.revision)) revisions.set(String(payload.id), payload.revision)
}
async function waitForJob(id) {
  let failures = 0
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    let job
    try { job = await request('/jobs/' + id); failures = 0 }
    catch (error) {
      if (++failures < 4 && (!error.status || error.status >= 500)) continue
      throw Object.assign(new Error('진행 상태 연결이 끊겼습니다. 실행 기록에서 계속 확인할 수 있습니다. ' + error.message), { jobId: id })
    }
    window.dispatchEvent(new CustomEvent('guide-job-update', { detail: job }))
    if (job.state === 'done') { rememberRevision(job.result); return job.result }
    if (['error', 'cancelled', 'interrupted'].includes(job.state)) throw Object.assign(new Error(job.error || '실행이 중단됐습니다'), { code: job.code, jobId: id })
  }
}
export const api = {
  get: (path) => request(path),
  post: (path, body = {}, options = {}) => request(path, { ...options, method: 'POST', body }),
  put: (path, body = {}, options = {}) => request(path, { ...options, method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload: (path, file, fields = {}) => {
    const body = new FormData()
    body.append('file', file)
    for (const [key, value] of Object.entries(fields)) if (value != null) body.append(key, typeof value === 'string' ? value : JSON.stringify(value))
    return request(path, { method: 'POST', body })
  },
}
