import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
const socket = createServer()
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve))
const port = socket.address().port
await new Promise(resolve => socket.close(resolve))
const origin = `http://127.0.0.1:${port}`
let logs = ''
const worker = spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'dev', 'dist', '--port', String(port), '--ip', '127.0.0.1', '--log-level', 'error'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } })
worker.stdout.on('data', chunk => { logs = (logs + chunk).slice(-4000) })
worker.stderr.on('data', chunk => { logs = (logs + chunk).slice(-4000) })
try {
  let ready = false
  for (let i = 0; i < 90; i++) {
    try { const response = await fetch(origin + '/guide', { signal: AbortSignal.timeout(1000) }); if (response.ok) { ready = true; break } } catch {}
    if (worker.exitCode !== null) break
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  if (!ready) throw new Error('Cloudflare 로컬 런타임 시작 실패: ' + logs)
  process.env.SEO_LOCAL_RENDER_ORIGIN = origin
  await import('./verify-seo-output.mjs')
  for (const [query, canonical, text, noindex] of [
    ['?page=2', '?page=2', '2페이지', true],
    ['?category=' + encodeURIComponent('관리'), '?category=' + encodeURIComponent('관리'), '귀금속 가이드 관리', false],
    ['?q=' + encodeURIComponent('변색'), '?q=' + encodeURIComponent('변색'), '변색', true],
  ]) {
    const response = await fetch(origin + '/guide' + query)
    const html = await response.text()
    if (!response.ok || !html.includes(text) || !html.includes('https://noblessegold.com/guide' + canonical) || (noindex && !html.includes('noindex, follow'))) throw new Error('SSR 가이드 검색·페이지 검증 실패: ' + query)
  }
  console.log('PASS: Cloudflare SSR 가이드 검색·카테고리·페이지의 초기 HTML과 canonical')
} finally {
  if (worker.exitCode === null) {
    if (process.platform === 'win32') await new Promise(resolve => spawn('taskkill', ['/PID', String(worker.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }).once('close', resolve))
    else worker.kill('SIGTERM')
  }
}
