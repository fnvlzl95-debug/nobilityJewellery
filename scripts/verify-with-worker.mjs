import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import ts from 'typescript'
import { parse as parseHtml } from '@vue/compiler-dom'

// Read only static source data; never execute the Vue page or user query text.
const literal = node => {
  if (ts.isAsExpression(node)) return literal(node.expression)
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return ts.isNumericLiteral(node) ? Number(node.text) : node.text
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal)
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
    assert.ok(ts.isPropertyAssignment(property), '검증할 데이터는 정적 속성이어야 합니다')
    return [property.name.text, literal(property.initializer)]
  }))
  throw new Error('지원하지 않는 SEO 검증 데이터 표현식')
}
const sourceConstants = (file, script = false) => {
  const source = readFileSync(resolve(file), 'utf8')
  const text = script ? source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)?.[1] : source
  assert.ok(text, `${file} 소스 읽기 실패`)
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  return name => {
    const declaration = ast.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]).find(item => item.name.getText(ast) === name)
    assert.ok(declaration?.initializer, `${file}: ${name} 데이터 없음`)
    return literal(declaration.initializer)
  }
}
const postData = sourceConstants('data/guide-posts.ts')
const pageData = sourceConstants('pages/guide/index.vue', true)
const guidePosts = postData('guidePosts')
const categories = postData('guideCategories')
const contexts = pageData('categoryContexts')
const pageDescription = pageData('pageDescription')
const basePageTitle = pageData('basePageTitle')
const perPage = pageData('postsPerPage')
const attribute = (node, name) => node.props?.find(property => property.type === 6 && property.name === name)?.value?.content
const textContent = node => node.type === 2 ? node.content : (node.children || []).map(textContent).join('')
const elements = node => (node.children || []).flatMap(child => child.type === 1 ? [child, ...elements(child)] : [])
const inspect = html => {
  const nodes = elements(parseHtml(html))
  const tags = name => nodes.filter(node => node.tag === name)
  const scripts = tags('script')
  const jsonLd = scripts.filter(node => attribute(node, 'type') === 'application/ld+json').flatMap(node => {
    const parsed = JSON.parse(textContent(node))
    return Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed]
  })
  return { nodes, scripts, tags, jsonLd,
    meta: (key, value) => tags('meta').filter(node => attribute(node, key) === value).map(node => attribute(node, 'content')),
    canonical: tags('link').filter(node => attribute(node, 'rel') === 'canonical').map(node => attribute(node, 'href')) }
}
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
  const slash = await fetch(origin + '/guide/?page=2', { redirect: 'manual' })
  if (slash.status !== 308 || slash.headers.get('location') !== '/guide?page=2') throw new Error('SSR 가이드 슬래시 정규화 실패')
  const maliciousQuery = '</script><script>alert(1)</script>'
  const categoryWithSecondPage = categories.find(category => guidePosts.filter(post => post.category === category).length > perPage)
  assert.ok(categoryWithSecondPage, '카테고리 2페이지 검증 자료 없음')
  const scenarios = [{}, { page: 2 }, ...categories.map(category => ({ category })),
    { category: categoryWithSecondPage, page: 2 }, { q: '변색' }, { q: maliciousQuery }]
  let benignSearchScripts
  for (const scenario of scenarios) {
    const { category, q = '', page = 1 } = scenario
    const posts = guidePosts.filter(post => (!category || post.category === category)
      && (!q || `${post.title} ${post.description} ${post.keyword}`.toLocaleLowerCase().includes(q.toLocaleLowerCase())))
    const currentPage = Math.min(page, Math.max(1, Math.ceil(posts.length / perPage)))
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    if (currentPage > 1) params.set('page', String(currentPage))
    const query = params.size ? '?' + params.toString() : ''
    const canonical = 'https://noblessegold.com/guide' + query
    const heading = category ? `귀금속 가이드 ${category}` : '귀금속 가이드'
    const title = currentPage > 1 ? `${heading} ${currentPage}페이지 | 귀족` : category ? `${heading} | 귀족` : basePageTitle
    const description = category ? contexts[category] : pageDescription
    const expectedPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage)
    const response = await fetch(origin + '/guide' + query, { signal: AbortSignal.timeout(15000) })
    const html = await response.text()
    assert.equal(response.status, 200, `${query}: 실제 SSR HTTP 상태`)
    const parsed = inspect(html)
    assert.deepEqual(parsed.tags('h1').map(textContent), [heading], `${query}: H1`)
    assert.deepEqual(parsed.tags('title').map(textContent), [title], `${query}: title`)
    assert.deepEqual(parsed.canonical, [canonical], `${query}: canonical`)
    for (const [key, value] of [['name', 'description'], ['property', 'og:description'], ['name', 'twitter:description']]) assert.deepEqual(parsed.meta(key, value), [description], `${query}: ${value}`)
    for (const [key, value] of [['property', 'og:title'], ['name', 'twitter:title']]) assert.deepEqual(parsed.meta(key, value), [title], `${query}: ${value}`)
    assert.deepEqual(parsed.meta('property', 'og:url'), [canonical], `${query}: og:url`)
    assert.deepEqual(parsed.meta('name', 'robots'), [q || currentPage > 1 ? 'noindex, follow' : 'index, follow'], `${query}: robots`)
    const context = parsed.tags('p').find(node => (attribute(node, 'class') || '').split(/\s+/).includes('guide-category-context'))
    assert.ok(context && textContent(context).includes(contexts[category || '전체']), `${query}: 화면 카테고리 설명`)
    const collections = parsed.jsonLd.filter(node => node['@type'] === 'CollectionPage')
    assert.equal(collections.length, 1, `${query}: CollectionPage 개수`)
    assert.equal(collections[0].name, title, `${query}: CollectionPage 이름`)
    assert.equal(collections[0].description, description, `${query}: CollectionPage 설명`)
    assert.equal(collections[0].url, canonical, `${query}: CollectionPage URL`)
    assert.deepEqual(collections[0].hasPart, expectedPosts.map(post => ({ '@type': 'Article', headline: post.title, url: 'https://noblessegold.com' + post.path })), `${query}: 해당 카테고리·페이지 hasPart`)
    const cards = parsed.tags('a').filter(node => (attribute(node, 'class') || '').split(/\s+/).includes('guide-card'))
    assert.deepEqual(cards.map(node => attribute(node, 'href')), expectedPosts.map(post => post.path), `${query}: 실제 카드와 JSON-LD 일치`)
    if (q === '변색') benignSearchScripts = parsed.scripts.length
    if (q === maliciousQuery) {
      assert.equal(parsed.scripts.length, benignSearchScripts, '검색어가 추가 script 요소를 만들면 안 됩니다')
      assert.ok(!parsed.scripts.some(node => textContent(node).trim() === 'alert(1)'), '검색어가 실행 가능한 script로 분리되었습니다')
      assert.equal(new URL(collections[0].url).searchParams.get('q'), maliciousQuery, '검색어 JSON-LD canonical round-trip')
    }
    console.log(`PASS: SSR ${query || '/guide'} · H1/meta/CollectionPage · ${expectedPosts.length} cards`)
  }
  console.log(`PASS: Cloudflare SSR ${scenarios.length}개 목록·카테고리·페이지·검색 시나리오와 검색어 script 탈출 방지`)
} finally {
  if (worker.exitCode === null) {
    if (process.platform === 'win32') await new Promise(resolve => spawn('taskkill', ['/PID', String(worker.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }).once('close', resolve))
    else worker.kill('SIGTERM')
  }
}
