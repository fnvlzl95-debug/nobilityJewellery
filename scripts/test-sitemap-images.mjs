import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { XMLParser } from 'fast-xml-parser'
import { withQuery } from 'ufo'
import { normalizeSitemapImageLoc } from '../server/utils/sitemap-images.mjs'
import { readSitemapImageLocations } from './sitemap-image-validation.mjs'

// Exercise the installed serializer, isolating its pure functions from Nitro's
// build-only virtual imports. No substitute XML-escaping implementation is used.
const packageRoot = new URL('../node_modules/@nuxtjs/sitemap/dist/runtime/server/', import.meta.url)
const utilitySource = readFileSync(new URL('utils.js', packageRoot), 'utf8')
const escapeFunction = utilitySource.match(/export function xmlEscape\(str\) \{[\s\S]*?\n\}/)?.[0]
assert.ok(escapeFunction, 'Installed sitemap xmlEscape function must be available')
const serializerSource = readFileSync(new URL('sitemap/builder/xml.js', packageRoot), 'utf8')
const urlsToXml = runInNewContext(
  `${escapeFunction}\n${serializerSource}`.replace(/^import .*;\r?\n/gm, '').replaceAll('export function ', 'function ') + '\nurlsToXml',
  { withQuery },
)

const original = 'https://noblessegold.com/_ipx/f_webp&q_82&s_3200x1334/Image/main/home-cta-jewelry-banner.webp'
const discovered = original.replaceAll('&', '&amp;')
const serialize = loc => urlsToXml([{ loc: 'https://noblessegold.com/', images: [{ loc }] }], {}, { xsl: false, credits: false, minify: false })

test('HTML-discovered IPX URL survives the actual sitemap XML serializer and parser', () => {
  const xml = serialize(normalizeSitemapImageLoc(discovered))
  assert.ok(xml.includes('&amp;q_82&amp;s_3200x1334'))
  assert.ok(!xml.includes('&amp;amp;'))
  assert.deepEqual(readSitemapImageLocations(xml), [original])
})

test('the regression reproduces a different URL without the normalization and is rejected', () => {
  const brokenXml = serialize(discovered)
  const parsed = new XMLParser().parse(brokenXml)
  assert.equal(parsed.urlset.url['image:image']['image:loc'], discovered)
  assert.notEqual(discovered, original)
  assert.throws(() => readSitemapImageLocations(brokenXml), /Double-escaped/)
})

test('raw images, already normalized IPX URLs, percent escapes and entity-like filenames remain intact', () => {
  for (const url of [original, 'https://noblessegold.com/Image/a&b.webp', 'https://example.com/image.webp?label=R%26D', 'https://example.com/Image/a&amp;b.webp']) {
    assert.equal(normalizeSitemapImageLoc(url), url)
    assert.deepEqual(readSitemapImageLocations(serialize(url)), [url])
  }
  const filename = original.replace('home-cta-jewelry-banner.webp', 'a&amp;b.webp')
  assert.equal(normalizeSitemapImageLoc(filename), filename)
})

test('malformed XML is rejected instead of silently dropping images', () => {
  assert.throws(() => readSitemapImageLocations('<urlset><url></urlset>'), /Invalid sitemap XML/)
})
