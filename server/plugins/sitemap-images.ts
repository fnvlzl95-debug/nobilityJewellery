import { normalizeSitemapImageLoc } from '../utils/sitemap-images.mjs'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:resolved', (context) => {
    for (const page of context.urls) {
      for (const image of page.images || []) {
        image.loc = normalizeSitemapImageLoc(String(image.loc))
      }
    }
  })
})
