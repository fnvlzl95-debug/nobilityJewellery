/**
 * Nuxt Sitemap's HTML image discovery can retain HTML-escaped IPX modifiers.
 * Restore the URL value before the sitemap serializer performs XML escaping.
 * Only touch IPX's modifier segment: an entity-like filename/query is not a modifier.
 * Already decoded URLs are unchanged, so this is safe when discovery is fixed upstream.
 * @param {string} loc
 * @returns {string}
 */
export const normalizeSitemapImageLoc = (loc) => loc.replace(
  /(\/_ipx\/)([^/]+)(\/)/,
  (_, prefix, modifiers, suffix) => `${prefix}${modifiers.replaceAll('&amp;', '&')}${suffix}`,
)
