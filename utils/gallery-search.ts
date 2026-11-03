import type { GalleryItem } from '~/data/gallery-items'

/** Local-only search over published catalog facts. No inferred prices/specifications. */
export const filterGalleryItems = (items: GalleryItem[], query: string): GalleryItem[] => {
  const terms = query.normalize('NFKC').trim().toLocaleLowerCase('ko-KR').split(/\s+/).filter(Boolean)
  if (!terms.length) return items
  return items.filter(item => {
    const text = [item.title, item.titleEn, item.description, item.material, ...item.colorOptions]
      .join(' ').normalize('NFKC').toLocaleLowerCase('ko-KR')
    return terms.every(term => text.includes(term))
  })
}
