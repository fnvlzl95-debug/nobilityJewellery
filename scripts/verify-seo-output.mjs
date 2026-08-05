import { existsSync } from 'node:fs'
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'

const args = process.argv.slice(2)
const liveIndex = args.indexOf('--live')
const liveOrigin = liveIndex >= 0 ? new URL(args[liveIndex + 1] || 'https://noblessegold.com') : null
const expectedOrigin = liveOrigin?.origin || 'https://noblessegold.com'

const decodeXml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'")

const extractLocations = (xml) => [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
  .map((match) => decodeXml(match[1].trim()))

const extractAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))
  return match?.[1]
}

const extractCanonical = (html) => {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
    || html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
  return tag ? extractAttribute(tag, 'href') : undefined
}

const extractOgUrl = (html) => {
  const tag = html.match(/<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/i)?.[0]
    || html.match(/<meta\b[^>]*\bcontent=["'][^"']+["'][^>]*\bproperty=["']og:url["'][^>]*>/i)?.[0]
  return tag ? extractAttribute(tag, 'content') : undefined
}

const extractAnchors = (html) => [...html.matchAll(/<a\b[^>]*>/gi)]
  .map((match) => extractAttribute(match[0], 'href'))
  .filter(Boolean)

const normalizeUrl = (value) => {
  const url = new URL(value, expectedOrigin)
  url.hash = ''
  return url.href
}

const oppositeSlashUrl = (value) => {
  const url = new URL(value)
  if (url.pathname === '/') return null
  url.pathname = url.pathname.endsWith('/')
    ? url.pathname.slice(0, -1)
    : `${url.pathname}/`
  return url
}

const runPool = async (items, worker, concurrency = 8) => {
  const results = new Array(items.length)
  let nextIndex = 0
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++
      results[index] = await worker(items[index], index)
    }
  })
  await Promise.all(runners)
  return results
}

const verifyLive = async () => {
  const sitemapUrl = new URL('/sitemap.xml', liveOrigin)
  const sitemapResponse = await fetch(sitemapUrl, { redirect: 'manual' })
  if (sitemapResponse.status !== 200) {
    throw new Error(`sitemap status ${sitemapResponse.status}: ${sitemapUrl}`)
  }

  const locations = extractLocations(await sitemapResponse.text())
  const failures = []

  await runPool(locations, async (location) => {
    const canonicalUrl = new URL(location)
    const response = await fetch(canonicalUrl, { redirect: 'manual' })
    if (response.status !== 200) {
      failures.push(`${canonicalUrl.pathname}: canonical status ${response.status}`)
      return
    }

    const html = await response.text()
    const canonical = extractCanonical(html)
    const ogUrl = extractOgUrl(html)
    if (!canonical || normalizeUrl(canonical) !== normalizeUrl(canonicalUrl.href)) {
      failures.push(`${canonicalUrl.pathname}: canonical ${canonical || 'missing'}`)
    }
    if (!ogUrl || normalizeUrl(ogUrl) !== normalizeUrl(canonicalUrl.href)) {
      failures.push(`${canonicalUrl.pathname}: og:url ${ogUrl || 'missing'}`)
    }

    const opposite = oppositeSlashUrl(canonicalUrl.href)
    if (!opposite) return

    const redirect = await fetch(opposite, { redirect: 'manual' })
    if (![301, 302, 307, 308].includes(redirect.status)) {
      failures.push(`${opposite.pathname}: opposite status ${redirect.status}`)
      return
    }

    const locationHeader = redirect.headers.get('location')
    const redirectTarget = locationHeader ? new URL(locationHeader, opposite) : null
    if (!redirectTarget || normalizeUrl(redirectTarget.href) !== normalizeUrl(canonicalUrl.href)) {
      failures.push(`${opposite.pathname}: redirect target ${locationHeader || 'missing'}`)
    }
  })

  if (failures.length) {
    throw new Error(`Live SEO verification failed (${failures.length})\n${failures.join('\n')}`)
  }

  console.log(`Live SEO verification passed: ${locations.length} sitemap URLs`)
}

const findPublicDir = () => {
  const candidates = [resolve('.output/public'), resolve('dist')]
  const publicDir = candidates.find((candidate) => existsSync(join(candidate, 'sitemap.xml')))
  if (!publicDir) {
    throw new Error('Build output not found. Run `npm run build` first.')
  }
  return publicDir
}

const listHtmlFiles = async (dir) => {
  const files = []
  for (const entry of await readdir(dir)) {
    const fullPath = join(dir, entry)
    const info = await stat(fullPath)
    if (info.isDirectory()) files.push(...await listHtmlFiles(fullPath))
    else if (entry.endsWith('.html')) files.push(fullPath)
  }
  return files
}

const verifyLocal = async () => {
  const publicDir = findPublicDir()
  const sitemap = await readFile(join(publicDir, 'sitemap.xml'), 'utf8')
  const locations = extractLocations(sitemap)
  const failures = []
  const internalLinkFailures = new Set()
  const sitemapPaths = new Set(locations.map((location) => new URL(location).pathname))

  for (const location of locations) {
    const url = new URL(location)
    if (url.origin !== expectedOrigin) {
      failures.push(`${location}: unexpected origin`)
      continue
    }
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      failures.push(`${url.pathname}: sitemap has trailing slash`)
    }

    const relativePath = url.pathname === '/'
      ? 'index.html'
      : `${decodeURIComponent(url.pathname).replace(/^\//, '')}.html`
    const filePath = join(publicDir, ...relativePath.split('/'))
    if (!existsSync(filePath)) {
      failures.push(`${url.pathname}: missing ${relativePath}`)
      continue
    }

    const html = await readFile(filePath, 'utf8')
    const canonical = extractCanonical(html)
    const ogUrl = extractOgUrl(html)
    if (!canonical || normalizeUrl(canonical) !== normalizeUrl(location)) {
      failures.push(`${url.pathname}: canonical ${canonical || 'missing'}`)
    }
    if (!ogUrl || normalizeUrl(ogUrl) !== normalizeUrl(location)) {
      failures.push(`${url.pathname}: og:url ${ogUrl || 'missing'}`)
    }

    for (const href of extractAnchors(html)) {
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue

      const link = new URL(href, expectedOrigin)
      if (link.origin !== expectedOrigin) continue
      if (link.pathname !== '/' && link.pathname.endsWith('/')) {
        internalLinkFailures.add(`${url.pathname}: trailing-slash link ${link.pathname}`)
      }
      if (!sitemapPaths.has(link.pathname)) {
        internalLinkFailures.add(`${url.pathname}: link target not in sitemap ${link.pathname}`)
      }
    }
  }

  failures.push(...internalLinkFailures)

  const nestedIndexFiles = (await listHtmlFiles(publicDir))
    .filter((file) => file.endsWith(`${sep}index.html`) && resolve(file) !== resolve(publicDir, 'index.html'))
  if (nestedIndexFiles.length) {
    failures.push(`nested index.html files: ${nestedIndexFiles.length}`)
  }

  if (failures.length) {
    throw new Error(`Local SEO verification failed (${failures.length})\n${failures.join('\n')}`)
  }

  console.log(`Local SEO verification passed: ${locations.length} sitemap URLs`)
  console.log(`Output: ${publicDir}`)
}

if (liveOrigin) await verifyLive()
else await verifyLocal()
