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

const extractSitemapEntries = (xml) => [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)]
  .map((match) => {
    const block = match[1]
    const loc = block.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]
    const lastmod = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]
    return {
      loc: loc ? decodeXml(loc.trim()) : '',
      lastmod: lastmod ? decodeXml(lastmod.trim()) : '',
    }
  })
  .filter((entry) => entry.loc)

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

const extractMetaContent = (html, attributeName, attributeValue) => {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  const tag = tags.find((candidate) => (
    extractAttribute(candidate, attributeName)?.toLowerCase() === attributeValue.toLowerCase()
  ))
  return tag ? extractAttribute(tag, 'content') : undefined
}

const extractTitle = (html) => decodeXml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '')
const extractH1 = (html) => decodeXml(
  (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
)

const seenGalleryPageNames = new Map()
const forbiddenProductNamePattern = /(?:14|18|24)\s*K|순금|로즈골드|화이트골드|옐로우골드/i

const extractJsonLdNodes = (html) => {
  const nodes = []
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(decodeXml(match[1].trim()))
      const values = Array.isArray(value) ? value : [value]
      for (const item of values) {
        if (item?.['@graph'] && Array.isArray(item['@graph'])) nodes.push(...item['@graph'])
        else nodes.push(item)
      }
    } catch {
      nodes.push({ '@type': 'InvalidJsonLd' })
    }
  }
  return nodes
}

const hasSchemaType = (node, type) => {
  const nodeType = node?.['@type']
  return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type
}

const containsSchemaType = (value, type) => {
  if (Array.isArray(value)) return value.some((item) => containsSchemaType(item, type))
  if (!value || typeof value !== 'object') return false
  if (hasSchemaType(value, type)) return true
  return Object.values(value).some((item) => containsSchemaType(item, type))
}

const verifyCommonSeoDocument = (html, pageUrl, sitemapEntry, failures) => {
  const title = extractTitle(html)
  const h1 = extractH1(html)
  const description = extractMetaContent(html, 'name', 'description')
  const robots = extractMetaContent(html, 'name', 'robots') || ''
  const ogTitle = extractMetaContent(html, 'property', 'og:title')
  const ogDescription = extractMetaContent(html, 'property', 'og:description')
  const jsonLdNodes = extractJsonLdNodes(html)

  if (!title) failures.push(`${pageUrl.pathname}: title missing`)
  if (!h1) failures.push(`${pageUrl.pathname}: H1 missing`)
  if (!description) failures.push(`${pageUrl.pathname}: description missing`)
  if (!ogTitle) failures.push(`${pageUrl.pathname}: og:title missing`)
  if (!ogDescription) failures.push(`${pageUrl.pathname}: og:description missing`)
  if (/\bnoindex\b/i.test(robots)) failures.push(`${pageUrl.pathname}: robots noindex`)
  if (jsonLdNodes.some((node) => hasSchemaType(node, 'InvalidJsonLd'))) {
    failures.push(`${pageUrl.pathname}: invalid JSON-LD`)
  }

  if (pageUrl.pathname.startsWith('/guide/')) {
    const article = jsonLdNodes.find((node) => hasSchemaType(node, 'Article'))
    const breadcrumb = jsonLdNodes.find((node) => hasSchemaType(node, 'BreadcrumbList'))
    if (!article) failures.push(`${pageUrl.pathname}: Article JSON-LD missing`)
    if (!breadcrumb) failures.push(`${pageUrl.pathname}: BreadcrumbList JSON-LD missing`)
    if (!sitemapEntry?.lastmod) failures.push(`${pageUrl.pathname}: sitemap lastmod missing`)

    const dateModified = String(article?.dateModified || '').slice(0, 10)
    const sitemapLastmod = String(sitemapEntry?.lastmod || '').slice(0, 10)
    if (!dateModified) {
      failures.push(`${pageUrl.pathname}: Article dateModified missing`)
    } else {
      if (sitemapLastmod && sitemapLastmod !== dateModified) {
        failures.push(`${pageUrl.pathname}: sitemap lastmod ${sitemapLastmod} != Article dateModified ${dateModified}`)
      }
      const visibleHtml = html
        .replace(/<script\b[\s\S]*?<\/script>/gi, '')
        .replace(/<style\b[\s\S]*?<\/style>/gi, '')
      if (!visibleHtml.includes(dateModified)) {
        failures.push(`${pageUrl.pathname}: visible modified date ${dateModified} missing`)
      }
    }
  }

  if (['/wedding', '/buy-gold'].includes(pageUrl.pathname)) {
    if (!jsonLdNodes.some((node) => hasSchemaType(node, 'WebPage'))) {
      failures.push(`${pageUrl.pathname}: WebPage JSON-LD missing`)
    }
    if (!jsonLdNodes.some((node) => hasSchemaType(node, 'BreadcrumbList'))) {
      failures.push(`${pageUrl.pathname}: BreadcrumbList JSON-LD missing`)
    }
    if (jsonLdNodes.some((node) => hasSchemaType(node, 'Article'))) {
      failures.push(`${pageUrl.pathname}: commercial page must not use Article JSON-LD`)
    }
    if (!sitemapEntry?.lastmod) failures.push(`${pageUrl.pathname}: sitemap lastmod missing`)
  }
}

const verifyGallerySeoDocument = (html, pageUrl, failures) => {
  if (pageUrl.pathname === '/gallery') {
    if (extractMetaContent(html, 'name', 'keywords')) {
      failures.push('/gallery: obsolete meta keywords present')
    }
    const jsonLdNodes = extractJsonLdNodes(html)
    if (!jsonLdNodes.some((node) => hasSchemaType(node, 'CollectionPage'))) {
      failures.push('/gallery: CollectionPage JSON-LD missing')
    }
    if (!jsonLdNodes.some((node) => hasSchemaType(node, 'ItemList'))) {
      failures.push('/gallery: ItemList JSON-LD missing')
    }
    if (jsonLdNodes.some((node) => containsSchemaType(node, 'Product'))) {
      failures.push('/gallery: Product JSON-LD must be omitted without real offers or reviews')
    }
    return null
  }
  if (!pageUrl.pathname.startsWith('/gallery/')) return null

  const title = extractTitle(html)
  const h1 = extractH1(html)
  const description = extractMetaContent(html, 'name', 'description')
  const keywords = extractMetaContent(html, 'name', 'keywords')
  const robots = extractMetaContent(html, 'name', 'robots')
  const ogType = extractMetaContent(html, 'property', 'og:type')
  const ogImage = extractMetaContent(html, 'property', 'og:image')
  const ogImageAlt = extractMetaContent(html, 'property', 'og:image:alt')
  const jsonLdNodes = extractJsonLdNodes(html)
  const webPage = jsonLdNodes.find((node) => hasSchemaType(node, 'WebPage'))
  const pageEntity = webPage?.mainEntity
  const breadcrumb = jsonLdNodes.find((node) => hasSchemaType(node, 'BreadcrumbList'))

  if (!title || !title.endsWith('| 귀족')) failures.push(`${pageUrl.pathname}: gallery title ${title || 'missing'}`)
  if (keywords) failures.push(`${pageUrl.pathname}: obsolete meta keywords present`)
  if (!description || description.length < 60 || description.length > 220) {
    failures.push(`${pageUrl.pathname}: gallery description length ${description?.length || 0}`)
  }
  if (!robots?.includes('index') || !robots.includes('follow')) {
    failures.push(`${pageUrl.pathname}: robots ${robots || 'missing'}`)
  }
  if (ogType !== 'product') failures.push(`${pageUrl.pathname}: og:type ${ogType || 'missing'}`)
  if (!ogImage) failures.push(`${pageUrl.pathname}: og:image missing`)
  if (!ogImageAlt) failures.push(`${pageUrl.pathname}: og:image:alt missing`)
  if (!webPage) failures.push(`${pageUrl.pathname}: WebPage JSON-LD missing`)
  if (!breadcrumb) failures.push(`${pageUrl.pathname}: BreadcrumbList JSON-LD missing`)
  if (jsonLdNodes.some((node) => containsSchemaType(node, 'Product'))) {
    failures.push(`${pageUrl.pathname}: Product JSON-LD must be omitted without real offers or reviews`)
  }
  if (!hasSchemaType(pageEntity, 'Thing')) {
    failures.push(`${pageUrl.pathname}: WebPage mainEntity Thing missing`)
  }

  if (pageEntity) {
    const pageName = String(pageEntity.name || '').trim()
    if (!pageName) {
      failures.push(`${pageUrl.pathname}: gallery entity name missing`)
    } else {
      if (forbiddenProductNamePattern.test(pageName)) {
        failures.push(`${pageUrl.pathname}: fixed color or purity in gallery entity name ${pageName}`)
      }
      if (h1 !== pageName) failures.push(`${pageUrl.pathname}: H1 and gallery entity name mismatch`)
      if (!title.startsWith(`${pageName} 주문제작 |`)) {
        failures.push(`${pageUrl.pathname}: title does not lead with gallery entity name`)
      }
      const existingPath = seenGalleryPageNames.get(pageName)
      if (existingPath && existingPath !== pageUrl.pathname) {
        failures.push(`${pageUrl.pathname}: duplicate gallery entity name with ${existingPath}`)
      } else {
        seenGalleryPageNames.set(pageName, pageUrl.pathname)
      }
    }
    if (forbiddenProductNamePattern.test(String(ogImageAlt || ''))) {
      failures.push(`${pageUrl.pathname}: fixed color or purity in hero image alt`)
    }
    // 공통 옵션 제품(14K·18K)은 3색 옵션과 '사진 제품 기준' 샘플 사양을 함께 노출해야 하고,
    // 소재가 명시된 예외 제품(순금·다이아 등)은 색상 옵션을 노출하면 안 된다.
    if (html.includes('14K·18K')) {
      if (!html.includes('사진 제품 기준')) failures.push(`${pageUrl.pathname}: sample spec line missing`)
      for (const expectedColor of ['화이트골드', '로즈골드', '옐로우골드']) {
        if (!html.includes(expectedColor)) failures.push(`${pageUrl.pathname}: visible color missing ${expectedColor}`)
      }
    } else if (html.includes('주문 가능 색상')) {
      failures.push(`${pageUrl.pathname}: explicit-material page must not list color options`)
    }
    if (!html.includes('최소 2주')) failures.push(`${pageUrl.pathname}: visible delivery minimum missing`)
  }

  return ogImage ? new URL(ogImage, pageUrl) : null
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

  const sitemapXml = await sitemapResponse.text()
  const sitemapEntries = extractSitemapEntries(sitemapXml)
  const locations = sitemapEntries.map((entry) => entry.loc)
  const sitemapByPath = new Map(sitemapEntries.map((entry) => [new URL(entry.loc).pathname, entry]))
  const failures = []
  const mobileHeaders = {
    'user-agent': 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/127.0 Mobile Safari/537.36',
  }

  await runPool(locations, async (location) => {
    const canonicalUrl = new URL(location)
    const response = await fetch(canonicalUrl, { redirect: 'manual' })
    if (response.status !== 200) {
      failures.push(`${canonicalUrl.pathname}: canonical status ${response.status}`)
      return
    }

    const html = await response.text()
    const xRobotsTag = response.headers.get('x-robots-tag') || ''
    const canonical = extractCanonical(html)
    const ogUrl = extractOgUrl(html)
    if (/\bnoindex\b/i.test(xRobotsTag)) failures.push(`${canonicalUrl.pathname}: X-Robots-Tag noindex`)
    if (!canonical || normalizeUrl(canonical) !== normalizeUrl(canonicalUrl.href)) {
      failures.push(`${canonicalUrl.pathname}: canonical ${canonical || 'missing'}`)
    }
    if (!ogUrl || normalizeUrl(ogUrl) !== normalizeUrl(canonicalUrl.href)) {
      failures.push(`${canonicalUrl.pathname}: og:url ${ogUrl || 'missing'}`)
    }
    verifyCommonSeoDocument(html, canonicalUrl, sitemapByPath.get(canonicalUrl.pathname), failures)

    const galleryImage = verifyGallerySeoDocument(html, canonicalUrl, failures)
    if (galleryImage) {
      const imageResponse = await fetch(galleryImage, { redirect: 'manual' })
      if (imageResponse.status !== 200 || !imageResponse.headers.get('content-type')?.startsWith('image/')) {
        failures.push(`${canonicalUrl.pathname}: gallery image status ${imageResponse.status}`)
      }
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

    if (canonicalUrl.pathname.startsWith('/guide/')) {
      const mobileCanonical = await fetch(canonicalUrl, { redirect: 'manual', headers: mobileHeaders })
      if (mobileCanonical.status !== 200) {
        failures.push(`${canonicalUrl.pathname}: mobile canonical status ${mobileCanonical.status}`)
      } else {
        const mobileHtml = await mobileCanonical.text()
        const mobileCanonicalHref = extractCanonical(mobileHtml)
        if (!mobileCanonicalHref || normalizeUrl(mobileCanonicalHref) !== normalizeUrl(canonicalUrl.href)) {
          failures.push(`${canonicalUrl.pathname}: mobile canonical ${mobileCanonicalHref || 'missing'}`)
        }
      }

      const mobileRedirect = await fetch(opposite, { redirect: 'manual', headers: mobileHeaders })
      const mobileLocation = mobileRedirect.headers.get('location')
      const mobileTarget = mobileLocation ? new URL(mobileLocation, opposite) : null
      if (![301, 302, 307, 308].includes(mobileRedirect.status)
        || !mobileTarget
        || normalizeUrl(mobileTarget.href) !== normalizeUrl(canonicalUrl.href)) {
        failures.push(`${opposite.pathname}: mobile redirect ${mobileRedirect.status} ${mobileLocation || 'missing'}`)
      }
    }
  })

  const galleryLocations = locations
    .map((location) => new URL(location))
    .filter((url) => url.pathname.startsWith('/gallery/'))
  if (galleryLocations.length) {
    const galleryIndexResponse = await fetch(new URL('/gallery', liveOrigin), { redirect: 'manual' })
    if (galleryIndexResponse.status !== 200) {
      failures.push(`/gallery: index status ${galleryIndexResponse.status}`)
    } else {
      const linkedPaths = new Set(extractAnchors(await galleryIndexResponse.text())
        .map((href) => new URL(href, liveOrigin).pathname))
      for (const detailUrl of galleryLocations) {
        if (!linkedPaths.has(detailUrl.pathname)) {
          failures.push(`${detailUrl.pathname}: missing from gallery index links`)
        }
      }
    }
  }

  if (failures.length) {
    throw new Error(`Live SEO verification failed (${failures.length})\n${failures.join('\n')}`)
  }

  console.log(`Live SEO verification passed: ${locations.length} sitemap URLs, ${galleryLocations.length} gallery detail URLs`)
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
  const sitemapEntries = extractSitemapEntries(sitemap)
  const locations = sitemapEntries.map((entry) => entry.loc)
  const failures = []
  const internalLinkFailures = new Set()
  const sitemapPaths = new Set(locations.map((location) => new URL(location).pathname))
  const sitemapByPath = new Map(sitemapEntries.map((entry) => [new URL(entry.loc).pathname, entry]))
  const galleryDetailPaths = [...sitemapPaths].filter((pathname) => pathname.startsWith('/gallery/'))

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
    verifyCommonSeoDocument(html, url, sitemapByPath.get(url.pathname), failures)

    const galleryImage = verifyGallerySeoDocument(html, url, failures)
    if (galleryImage) {
      if (galleryImage.origin !== expectedOrigin) {
        failures.push(`${url.pathname}: gallery image origin ${galleryImage.origin}`)
      } else {
        const imagePath = join(publicDir, ...decodeURIComponent(galleryImage.pathname).replace(/^\//, '').split('/'))
        if (!existsSync(imagePath)) failures.push(`${url.pathname}: gallery image missing ${galleryImage.pathname}`)
      }
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

  if (galleryDetailPaths.length) {
    const galleryIndexPath = join(publicDir, 'gallery.html')
    if (!existsSync(galleryIndexPath)) {
      failures.push('/gallery: missing gallery.html')
    } else {
      const galleryIndexHtml = await readFile(galleryIndexPath, 'utf8')
      const linkedPaths = new Set(extractAnchors(galleryIndexHtml)
        .map((href) => new URL(href, expectedOrigin).pathname))
      for (const detailPath of galleryDetailPaths) {
        if (!linkedPaths.has(detailPath)) failures.push(`${detailPath}: missing from gallery index links`)
      }
    }
  }

  const nestedIndexFiles = (await listHtmlFiles(publicDir))
    .filter((file) => file.endsWith(`${sep}index.html`) && resolve(file) !== resolve(publicDir, 'index.html'))
  if (nestedIndexFiles.length) {
    failures.push(`nested index.html files: ${nestedIndexFiles.length}`)
  }

  if (failures.length) {
    throw new Error(`Local SEO verification failed (${failures.length})\n${failures.join('\n')}`)
  }

  console.log(`Local SEO verification passed: ${locations.length} sitemap URLs, ${galleryDetailPaths.length} gallery detail URLs`)
  console.log(`Output: ${publicDir}`)
}

if (liveOrigin) await verifyLive()
else await verifyLocal()
