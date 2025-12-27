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
    titleEn: 'PROMISE Couple Ring',
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
    title: '밀그레인 라인 원포인트 커플링',
    titleEn: 'Milgrain Line One-Point Couple Ring',
    description: '깔끔한 민무늬 밴드와 엔틱한 밀그레인 라인이 반반씩 조화를 이루는 모던한 웨딩 밴드입니다. 중앙에 세팅된 원 포인트 스톤이 과하지 않은 화려함을 주며, 밴드 안쪽까지 굴림 처리되어 매일 착용해도 편안합니다. 심플함 속에 디테일이 살아있는 디자인을 찾는 예비 부부에게 추천드립니다.',
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
    description: '은은한 무광(Satin) 텍스처의 화이트골드 베이스에 유광 골드 엣지를 더해 세련된 입체감을 살린 콤비 커플링입니다. 서로 다른 두 가지 골드 컬러가 결합되어 유니크한 매력을 주며, 중앙의 메인 스톤이 모던한 밴드 위에서 더욱 영롱하게 빛납니다. 도시적이고 감각적인 스타일을 선호하는 커플에게 완벽한 선택입니다.',
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
    description: '모던한 밴드 디자인과 클래식한 솔리테어 세팅이 결합된 웨딩 밴드입니다. 남성 반지는 골드와 무광 화이트골드의 세련된 콤비네이션이, 여성 반지는 밴드 양쪽에 섬세한 스톤을 파베 세팅하여 화사함과 우아함을 극대화했습니다. 중앙의 메인 스톤이 다리(Bridge)처럼 밴드를 연결하는 독특한 구조로, 심플함과 화려함의 완벽한 조화를 원하는 예비 부부에게 추천드립니다.',
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
    description: '마치 두 개의 반지를 레이어드한 듯한 유니크한 디자인입니다. 차분한 무광 화이트골드 밴드 위에 얹어진 로즈골드 V자 라인이 손가락을 더 길고 가늘어 보이게 해줍니다. 남성용은 깔끔한 금속 광택으로 세련미를, 여성용은 V 라인에 보석을 촘촘히 세팅하여 티아라를 쓴 듯한 우아함을 강조했습니다.',
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
    description: '사랑을 상징하는 하트 모양(Heart Cut) 메인 스톤이 돋보이는 로맨틱한 커플링입니다. 넓은 화이트골드 밴드 위에 얇은 로즈골드 반지를 하나 더 낀 것처럼 보이는 "레이어드" 디자인이 특징입니다. 남성용은 무광으로 처리해 차분하고 멋스럽게, 여성용은 로즈골드 라인에 보석을 촘촘히 박아 화려하고 여성스럽게 완성했습니다.',
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
    description: '고급스러운 황금빛(옐로우골드)이 돋보이는 모던한 커플링입니다. 반지 양쪽 테두리를 계단처럼 살짝 낮게 깎아낸 "스텝(Step)" 디자인이 특징입니다. 중앙 부분은 광택을 없앤 무광으로 차분하게, 테두리는 반짝이는 유광으로 마감하여 심플하면서도 입체적인 느낌을 줍니다. 가운데 콕 박힌 보석 하나가 은은한 포인트를 완성합니다.',
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
    description: '반지 중앙에 사선으로 부드럽게 흐르는 웨이브 라인이 매력적인 커플링입니다. 딱딱한 일자 형태가 아니라서 착용했을 때 손가락이 더 가늘고 길어 보입니다. 심플한 유광 밴드 위에 큐빅 하나가 깔끔하게 박혀 있어, 질리지 않는 데일리 반지를 찾는 커플에게 가장 추천하는 디자인입니다.',
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
    description: '도회적인 오벌(Oval) 쉐입과 섬세한 체인 텍스처가 조화를 이루는 프리미엄 패션 주얼리입니다. 반지는 레이어드한 듯한 볼륨감 있는 디자인이 특징이며, 목걸이와 귀걸이는 촘촘히 세팅된 스톤이 빛을 받아 신부를 더욱 화사하게 만들어줍니다. 종로 귀족 귀금속에서 예산과 스타일에 맞춰 1:1 상담 후 정성껏 주문 제작해 드립니다.',
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
    description: '행운을 담은 말발굽(U자) 모양을 자물쇠처럼 디자인하여 유니크한 매력을 살린 주얼리 세트입니다. 펜던트 표면에 영문 레터링을 새겨 브랜드 시그니처 같은 고급스러움을 주었고, 반짝이는 큐빅 라인과 매치하여 화려함을 더했습니다. 목걸이 줄은 트렌디한 "클립 체인"을 사용하여, 캐주얼룩과 정장 어디에나 힙하게 어울리는 포인트 아이템입니다.',
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
    description: '때마다 더욱 반짝입니다. 우아하면서도 존재감 있는 포인트를 원하는 분들께 추천합니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',  
    delivery: '상담 후 결정',
    images: ['/Image/set/set0302.webp', '/Image/set/set0301.webp']
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
