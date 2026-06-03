export interface GalleryItem {
  id: number
  category: string
  title: string
  titleEn: string
  description: string  // 카드용 짧은 설명 (2줄 이내)
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
    titleEn: 'PROMISE Couple Ring',
    description: '세 가지 골드 컬러의 클래식 데일리 커플링입니다.',
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
    description: '중앙 다이아몬드가 빛나는 우아한 솔리테어 커플링입니다.',
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
    description: '24K 순금으로 만드는 돌·백일 기념 아기 반지입니다.',
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
    title: '밀그레인 라인 원포인트 커플링',
    titleEn: 'Milgrain Line One-Point Couple Ring',
    description: '민무늬 밴드에 밀그레인 라인을 더한 모던 웨딩밴드입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0201.webp',
      '/Image/ring/NN0202.webp']
  },
  {
    id: 5,
    category: 'ring',
    title: '투톤 콤비 새틴 포인트 커플링',
    titleEn: 'Two-Tone Combi Satin Point Couple Ring',
    description: '무광 화이트골드에 유광 엣지를 더한 콤비 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0301.webp',
      '/Image/ring/NN0302.webp']
  },
  {
    id: 6,
    category: 'ring',
    title: '브릿지 솔리테어 커플링',
    titleEn: 'Bridge Solitaire Couple Rings',
    description: '심플함과 화려함을 겸한 브릿지 솔리테어 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0401.webp',
      '/Image/ring/NN0402.webp']
  },
  {
    id: 7,
    category: 'ring',
    title: 'V 라인 레이어드 콤비 커플링',
    titleEn: 'V-Line Layered Combi Couple Ring',
    description: '로즈골드 V라인이 손가락을 길어 보이게 하는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0501.webp',
      '/Image/ring/NN0502.webp']
  },
  {
    id: 8,
    category: 'ring',
    title: '러블리 하트 레이어드 콤비 커플링',
    titleEn: 'Lovely Heart Layered Combi Couple Ring',
    description: '하트 스톤과 레이어드 라인이 돋보이는 로맨틱 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0602.webp',
      '/Image/ring/NN0601.webp']
  },
  {
    id: 9,
    category: 'ring',
    title: '옐로우골드 스텝 엣지 포인트 커플링',
    titleEn: 'Yellow Gold Step Edge Point Couple Ring',
    description: '계단형 스텝 엣지로 입체감을 살린 옐로우골드 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0701.webp',
      '/Image/ring/NN0702.webp']
  },
    {
    id: 10,
    category: 'ring',
    title: '사선 웨이브 포인트 커플링',
    titleEn: 'Diagonal Wave Point Couple Ring',
    description: '사선 웨이브 라인으로 손가락이 가늘어 보이는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0802.webp',
      '/Image/ring/NN0801.webp']
  },
  {
    id: 11,
    category: 'set',
    title: '모던 듀얼 체인 패션 세트',
    titleEn: 'Modern Dual Chain Wedding Set',
    description: '오벌 쉐입과 체인 텍스처의 프리미엄 패션 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0101.webp', '/Image/set/set0102.webp']
  },
    {
    id: 12,
    category: 'set',
    title: 'U-링크 레터링 시그니처 세트',
    titleEn: 'U-Link Lettering Signature Set',
    description: '말발굽 모티브와 레터링이 돋보이는 시그니처 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0201.webp', '/Image/set/set0202.webp']
  },
      {
    id: 13,
    category: 'set',
    title: '문라이트 서클 드롭 세트',
    titleEn: 'Moonlight Circle Drop Set',
    description: '움직일 때마다 영롱하게 반짝이는 서클 드롭 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0302.webp', '/Image/set/set0301.webp']
  },
  {
    id: 14,
    category: 'ring',
    title: '새틴 무광 사선컷 원포인트 커플링',
    titleEn: 'Satin Matte Diagonal Cut One-Point Couple Ring',
    description: '새틴 무광 마감에 사선 컷 포인트를 준 데일리 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN0901.webp']
  },
  {
    id: 15,
    category: 'ring',
    title: '투라인 솔리테어 파베 커플링',
    titleEn: 'Two-Line Solitaire Pavé Couple Ring',
    description: '솔리테어 큐빅을 파베 라인이 감싼 화려한 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1001.webp']
  },
  {
    id: 16,
    category: 'ring',
    title: '삼색 골드 트위스트 컷팅 반지',
    titleEn: 'Tri-Color Gold Twist Cutting Ring',
    description: '세 가지 골드가 어우러진 꼬임 패턴 데일리 반지입니다.',
    material: '14K Yellow / Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1101.webp']
  },
  {
    id: 17,
    category: 'ring',
    title: '클래식 밀그레인 솔리테어 콤비 커플링',
    titleEn: 'Classic Milgrain Solitaire Combi Couple Ring',
    description: '밀그레인 디테일로 빈티지와 모던을 살린 콤비 커플링입니다.',
    material: '14K Gold / Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1201.webp']
  },
  {
    id: 18,
    category: 'ring',
    title: '밀그레인 밴드 데일리 커플링',
    titleEn: 'Milgrain Band Daily Couple Ring',
    description: '은은한 밀그레인 포인트의 편안한 데일리 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1301.webp']
  },
  {
    id: 19,
    category: 'ring',
    title: '빈티지 패턴 와이드 밴드 커플링',
    titleEn: 'Vintage Pattern Wide Band Couple Ring',
    description: '넓은 밴드에 빈티지 패턴을 새긴 앤티크 무드 커플링입니다.',
    material: '14K Yellow / Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1401.webp']
  },
  {
    id: 20,
    category: 'necklace',
    title: '로즈골드 실버볼 비즈 데일리 목걸이',
    titleEn: 'Rose Gold Silver Ball Bead Daily Necklace',
    description: '실버 비즈가 포인트인 미니멀 로즈골드 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0101.webp']
  },
  {
    id: 21,
    category: 'necklace',
    title: '행운 호스슈 넘버 펜던트 목걸이',
    titleEn: 'Lucky Horseshoe Number Pendant Necklace',
    description: '행운의 말굽에 기념 숫자를 새기는 로즈골드 펜던트입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0201.webp']
  },
  {
    id: 22,
    category: 'necklace',
    title: '로즈골드 버클 큐빅 펜던트 목걸이',
    titleEn: 'Rose Gold Buckle Cubic Pendant Necklace',
    description: '큐빅을 촘촘히 채운 버클 펜던트 로즈골드 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0301.webp']
  },
  {
    id: 23,
    category: 'bracelet',
    title: '로즈골드 메시체인 슬라이더 팔찌',
    titleEn: 'Rose Gold Mesh Chain Slider Bracelet',
    description: '길이 조절이 간편한 메시체인 로즈골드 데일리 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/BR0101.webp']
  },
  {
    id: 24,
    category: 'set',
    title: '플라워 모티브 로즈골드 주얼리 세트',
    titleEn: 'Flower Motif Rose Gold Jewelry Set',
    description: '꽃잎 디테일이 로맨틱한 로즈골드 주얼리 4종 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0401.webp']
  },
  {
    id: 25,
    category: 'set',
    title: '서클 링크 파베 로즈골드 주얼리 세트',
    titleEn: 'Circle Link Pavé Rose Gold Jewelry Set',
    description: '파베 서클과 체인 링크가 트렌디한 로즈골드 4종 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0501.webp']
  },
  {
    id: 26,
    category: 'set',
    title: '자물쇠 체인 골드 주얼리 세트',
    titleEn: 'Lock & Chain Gold Jewelry Set',
    description: '자물쇠·체인 모티브로 힙하게 연출하는 골드 4종 세트입니다.',
    material: '14K Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0601.webp']
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

// 메인 페이지 프리뷰용 (반지 3개 + 세트 3개)
export const getPreviewItems = (count: number = 6): GalleryItem[] => {
  const rings = galleryItems.filter(item => item.category === 'ring').slice(0, 3)
  const sets = galleryItems.filter(item => item.category === 'set').slice(0, 3)
  return [...rings, ...sets]
}
