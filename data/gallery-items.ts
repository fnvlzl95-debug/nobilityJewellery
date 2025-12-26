export interface GalleryItem {
  id: number
  category: string
  title: string
  titleEn: string
  description: string  // SEO용 상세 설명
  material: string
  workType: string
  delivery: string
  images: string[]  // 최대 4개 이미지
}

export interface Category {
  id: string
  label: string
  labelEn: string
  description: string  // SEO용 카테고리 설명
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'ring',
    title: 'PROMISE 커플링',
    titleEn: 'Wedding Band',
    description: '14K 화이트골드, 로즈골드, 옐로우골드로 제작되는 프로미스 커플링입니다. 결혼반지, 결혼예물 커플링으로 인기 있으며 사이즈 맞춤 주문제작이 가능합니다. 종로3가 금은방 귀족에서 귀금속 도매가로 제공합니다.',
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
    description: '다이아몬드 솔리테어 세팅의 고급 커플링입니다. 14K 화이트골드, 로즈골드, 옐로우골드 중 선택 가능하며, 중앙 다이아몬드가 우아하게 빛나는 클래식한 디자인입니다.',
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
    description: '24K 순금으로 제작된 말띠 아기 반지입니다. 순금 돌반지, 돌잔치 반지, 백일반지로 인기 있으며 말띠 해 태어난 아기를 위한 전통적인 순금 반지입니다. 종로 금은방 귀족에서 도매가 주문제작 가능합니다.',
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
    description: '14K, 18K 골드로 제작된 레이어드 디자인 반지입니다. 여러 겹의 밴드가 세련된 느낌을 주며, 일상에서 착용하기 좋은 모던한 스타일입니다. 사이즈 조절 가능합니다.',
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
    description: '925 스털링 실버로 장인이 수작업으로 제작한 핸드메이드 반지입니다. 은 특유의 차가운 광택과 유니크한 디자인이 특징이며, 주문제작으로 원하시는 사이즈에 맞춰 드립니다.',
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
    description: '14K 골드 체인 목걸이입니다. 심플하면서도 고급스러운 디자인으로 어떤 펜던트와도 잘 어울리며, 길이 조절이 가능해 다양한 스타일링이 가능합니다. 종로3가 금은방 귀족에서 귀금속 도매가로 제공합니다.',
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
    description: '18K 골드와 천연 진주로 구성된 럭셔리 주얼리 세트입니다. 목걸이와 귀걸이가 세트로 구성되어 있으며, 결혼식, 파티 등 특별한 날에 착용하기 좋은 고급 주얼리입니다.',
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
    description: '24K 순금으로 제작된 뱅글 스타일 팔찌입니다. 순도 99.9% 순금의 묵직한 무게감과 광택이 특징이며, 사이즈 주문제작이 가능합니다. 종로3가 금은방 귀족 귀금속 도매 전문점에서 합리적인 가격에 제공합니다.',
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
    description: '14K 골드에 담수진주를 세팅한 드롭 이어링입니다. 우아하고 여성스러운 디자인으로 데일리 착용부터 특별한 자리까지 다양하게 활용 가능합니다. 피어싱, 클립 타입 모두 제공됩니다.',
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
    description: '18K 골드로 제작된 웨딩 주얼리 컬렉션입니다. 결혼예물, 결혼반지, 목걸이, 귀걸이 등을 맞춤 구성할 수 있으며, 신부 드레스와 스타일에 맞춰 상담 후 주문제작해드립니다. 종로 금은방 귀족 귀금속 도매.',
    material: '18K 골드',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/pexels-jeremy-wong-382920-1043902.webp']
  },
]

export const categories: Category[] = [
  {
    id: 'ring',
    label: '반지',
    labelEn: 'Rings',
    description: '14K, 18K, 24K 순금 반지를 도매가로 제공합니다. 돌반지, 커플링, 예물, 결혼반지, 아기반지 등 다양한 디자인을 주문제작 가능합니다.'
  },
  {
    id: 'necklace',
    label: '목걸이',
    labelEn: 'Necklaces',
    description: '골드 체인 목걸이부터 진주 목걸이까지. 14K, 18K 골드 목걸이를 종로 도매가로 만나보세요.'
  },
  {
    id: 'bracelet',
    label: '팔찌',
    labelEn: 'Bracelets',
    description: '순금 뱅글, 골드 체인 팔찌 등 고급 팔찌 컬렉션. 24K 순금부터 14K 골드까지 다양하게 준비되어 있습니다.'
  },
  {
    id: 'earring',
    label: '귀걸이',
    labelEn: 'Earrings',
    description: '진주 이어링, 골드 귀걸이, 드롭 이어링 등. 피어싱, 클립 타입 모두 제공되며 도매가로 구매 가능합니다.'
  },
  {
    id: 'set',
    label: '세트',
    labelEn: 'Sets',
    description: '웨딩 주얼리 세트, 럭셔리 주얼리 컬렉션. 결혼식, 특별한 날을 위한 맞춤 세트 구성이 가능합니다.'
  },
]

// 카테고리별 아이템 필터
export const getItemsByCategory = (categoryId: string): GalleryItem[] => {
  return galleryItems.filter(item => item.category === categoryId)
}

// 메인 페이지 프리뷰용 (처음 4개)
export const getPreviewItems = (count: number = 4): GalleryItem[] => {
  return galleryItems.slice(0, count)
}
