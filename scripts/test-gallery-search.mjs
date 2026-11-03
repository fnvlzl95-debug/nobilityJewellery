import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { galleryItems } from '../data/gallery-items.ts'
import { filterGalleryItems } from '../utils/gallery-search.ts'
assert.equal(filterGalleryItems(galleryItems,'').length,42)
assert.deepEqual(filterGalleryItems(galleryItems,'   '),galleryItems)
for (const query of ['커플링','볼 비즈','로즈골드']) {
  assert.ok(filterGalleryItems(galleryItems,query).length > 0, query)
}
assert.equal(filterGalleryItems(galleryItems,'NO_SUCH_CATALOG_ENTRY').length,0)
assert.deepEqual(filterGalleryItems(galleryItems,'14k'),filterGalleryItems(galleryItems,'１４Ｋ'))
assert.ok(filterGalleryItems(galleryItems,'로즈골드').every(item=>[item.title,item.titleEn,item.description,item.material,...item.colorOptions].join(' ').includes('로즈골드')))
const page=readFileSync(new URL('../pages/gallery/index.vue',import.meta.url),'utf8')
assert.ok(page.includes('aria-live="polite"'))
assert.ok(page.includes('type="search"'))
assert.ok(page.includes('검색 지우기'))
assert.ok(page.includes('@click="clearSearch"'))
assert.ok(page.includes('searchInput.value?.focus()'))
assert.ok(!/track\w*\([^\n]*searchQuery|[Ss]torage[^\n]*searchQuery|query:[^\n]*searchQuery/.test(page))
console.log('Published-catalog search, normalization, no-results recovery and local-only search checks passed.')
