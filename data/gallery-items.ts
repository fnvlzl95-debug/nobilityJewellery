export interface GalleryItem {
  id: number
  category: string
  title: string
  titleEn: string
  material: string
  workType: string
  delivery: string
  images: string[]  // 최대 4개 이미지
}

export interface Category {
  id: string
  label: string
  labelEn: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'ring',
    title: 'PROMISE 커플링',
    titleEn: 'Wedding Band',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0103.webp',
      '/Image/ring/NN0101.webp',
      '/Image/ring/NN0102.webp',
      '/Image/ring/NN0104.webp'  ]
  },
  {
    id: 2,  
    category: 'ring',
    title: 'SOLITAIRE 커플링',
    titleEn: 'Diamond Solitaire',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NS0102.webp',
      '/Image/ring/NS0101.webp']
  },
  {
    id: 3,
    category: 'ring',
    title: '순금 말띠 아기 반지',
    titleEn: 'Signet Ring',
    material: '순금',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: ['/Image/ring/SB0101.webp',
      '/Image/ring/SB0102.webp',
      '/Image/ring/SB0103.webp',
      '/Image/ring/SB0104.webp',
      '/Image/ring/SB0105.webp',
      '/Image/ring/SB0106.webp'
    ]
  },
  {
    id: 4,
    category: 'ring',
    title: '골드 레이어드 링',
    titleEn: 'Layered Ring',
    material: '14K / 18K 골드',
    workType: '사이즈 조절',
    delivery: '즉시',
    images: ['/Image/ring/pexels-fox-58267-998521.webp']
  },
  {
    id: 5,
    category: 'ring',
    title: '핸드메이드 실버 링',
    titleEn: 'Handmade Silver',
    material: '925 실버',
    workType: '주문제작',
    delivery: '1-2주',
    images: ['/Image/ring/pexels-leah-newhouse-50725-691046.webp']
  },
  {
    id: 6,
    category: 'necklace',
    title: '14K 체인 네크리스',
    titleEn: 'Chain Necklace',
    material: '14K 골드',
    workType: '길이 조절 가능',
    delivery: '즉시',
    images: ['/Image/necklace/pexels-pixabay-248077.webp']
  },
  {
    id: 7,
    category: 'necklace',
    title: '럭셔리 주얼리 세트',
    titleEn: 'Luxury Set',
    material: '18K 골드 / 진주',
    workType: '세트 구성',
    delivery: '1주',
    images: ['/Image/necklace/pexels-wendelmoretti-1730877.webp']
  },
  {
    id: 8,
    category: 'bracelet',
    title: '순금 뱅글 브레이슬릿',
    titleEn: 'Gold Bangle',
    material: '24K 순금',
    workType: '사이즈 주문',
    delivery: '2-3주',
    images: ['/Image/bracelet/pexels-pixabay-265906.webp']
  },
  {
    id: 9,
    category: 'earring',
    title: '진주 드롭 이어링',
    titleEn: 'Pearl Drop',
    material: '14K 골드 / 담수진주',
    workType: '피어싱/클립',
    delivery: '즉시',
    images: ['/Image/earring/pexels-git-stephen-gitau-302905-1670723.webp']
  },
  {
    id: 10,
    category: 'set',
    title: '웨딩 주얼리 컬렉션',
    titleEn: 'Wedding Collection',
    material: '18K 골드',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/pexels-jeremy-wong-382920-1043902.webp']
  },
]

export const categories: Category[] = [
  { id: 'ring', label: '반지', labelEn: 'Rings' },
  { id: 'necklace', label: '목걸이', labelEn: 'Necklaces' },
  { id: 'bracelet', label: '팔찌', labelEn: 'Bracelets' },
  { id: 'earring', label: '귀걸이', labelEn: 'Earrings' },
  { id: 'set', label: '세트', labelEn: 'Sets' },
]

// 카테고리별 아이템 필터
export const getItemsByCategory = (categoryId: string): GalleryItem[] => {
  return galleryItems.filter(item => item.category === categoryId)
}

// 메인 페이지 프리뷰용 (처음 4개)
export const getPreviewItems = (count: number = 4): GalleryItem[] => {
  return galleryItems.slice(0, count)
}
