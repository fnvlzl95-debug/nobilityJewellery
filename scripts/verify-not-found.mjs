import assert from 'node:assert/strict'

// Cover both Pages asset exclusions and Worker routes. A root 404.html disables
// Pages' implicit SPA fallback, which otherwise returns the home document as 200.
// https://developers.cloudflare.com/pages/configuration/serving-pages/
export const missingPagePaths = [
  '/guide/nonexistent-seo-verification',
  '/guide/nonexistent-seo-verification?from=search',
  '/guide/nonexistent-seo-verification/',
  '/gallery/nonexistent-seo-verification',
  '/gallery/nonexistent-seo-verification/',
  '/guide/qqqq-missing-seo-verification',
  '/page-not-found-seo-verification',
]

export const verifyNotFoundDocument = (html, label) => {
  assert.match(html, /<html\b[^>]*lang=["']ko["']/i, `${label}: Korean error document`)
  assert.match(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i, `${label}: robots noindex`)
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  assert.equal(headings.length, 1, `${label}: one error H1`)
  assert.match(headings[0][1], /페이지를 찾을 수 없습니다/, `${label}: useful error message`)
  assert.match(html, /<a\b[^>]*href=["']\/guide["']/i, `${label}: crawlable guide recovery link`)
  assert.doesNotMatch(html, /<link\b[^>]*rel=["']canonical["']/i, `${label}: error must not canonicalize to the home page`)
}

export const verifyNotFoundResponses = async (origin) => {
  for (const path of missingPagePaths) {
    const response = await fetch(new URL(path, origin), {
      redirect: 'manual',
      headers: { accept: 'text/html' },
      signal: AbortSignal.timeout(15000),
    })
    assert.equal(response.status, 404, `${path}: missing URL must return HTTP 404`)
    assert.match(response.headers.get('content-type') || '', /text\/html/i, `${path}: user-facing HTML error`)
    verifyNotFoundDocument(await response.text(), path)
  }
  console.log(`PASS: ${missingPagePaths.length} missing Pages/Worker URLs · HTTP 404 · noindex · Korean recovery links`)
}
