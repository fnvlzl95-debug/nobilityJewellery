import { XMLParser, XMLValidator } from 'fast-xml-parser'

export const readSitemapImageLocations = (xml) => {
  const valid = XMLValidator.validate(xml)
  if (valid !== true) throw new Error(`Invalid sitemap XML: ${valid.err.msg}`)
  const parsed = new XMLParser({ isArray: name => name === 'url' || name === 'image:image' }).parse(xml)
  return (parsed.urlset?.url || []).flatMap(page => (page['image:image'] || []).map(image => {
    const loc = image['image:loc']
    if (typeof loc !== 'string' || !/^https:\/\//.test(loc)) {
      throw new Error(`Invalid sitemap image location: ${String(loc)}`)
    }
    if (/\/_ipx\/[^/]*&amp;/.test(loc)) {
      throw new Error(`Double-escaped sitemap image URL: ${loc}`)
    }
    return loc
  }))
}
