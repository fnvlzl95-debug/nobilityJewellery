export interface ProductSpec {
  label: string
  value: string
}

export interface GalleryItem {
  id: number
  slug: string  // /gallery/<slug> 상세 페이지 경로
  category: string
  title: string
  titleEn: string
  description: string  // 카드용 짧은 설명 (2줄 이내)
  material: string
  colorOptions: string[]
  workType: string
  delivery: string
  images: string[]  // 최대 4개 이미지
  imageAlts: string[]  // images와 1:1 대응하는 SEO alt 텍스트
  keywords?: string[]  // 상세 페이지 meta keywords
  specs?: ProductSpec[]  // 상세 페이지 스펙 표
}

export const galleryProductDefaults = {
  material: '14K·18K 골드',
  colorOptions: ['옐로우골드', '로즈골드', '화이트골드'],
  workType: '주문제작',
  delivery: '약 1~2주',
} as const

type GalleryItemSource = Omit<GalleryItem, 'colorOptions'>

export interface Category {
  id: string
  label: string
  labelEn: string
  description: string  // SEO용 카테고리 설명
}

const galleryItemSource: GalleryItemSource[] = [
  {
    id: 1,
    slug: 'promise-couple-ring',
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
      '/Image/ring/NN0104.webp'  ],
    imageAlts: [
      'PROMISE 14K 옐로우골드 커플링 - 종로 금은방 도매가 주문제작',
      'PROMISE 14K 화이트골드 커플링 - 이니셜 각인 가능',
      'PROMISE 14K 로즈골드 커플링 - 기념일 선물 추천',
      'PROMISE 14K 골드 커플링 - 클래식 데일리 디자인'
    ],
  },
  {
    id: 2,
    slug: 'diamond-solitaire-couple-ring',
    category: 'ring',
    title: 'SOLITAIRE 커플링',
    titleEn: 'Diamond Solitaire',
    description: '중앙 다이아몬드가 빛나는 우아한 솔리테어 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NS0102.webp',
      '/Image/ring/NS0101.webp'],
    imageAlts: [
      '14K 다이아몬드 솔리테어 커플링 - 예물 반지 주문제작',
      '14K 솔리테어 커플링 측면 - 종로 도매가 다이아 반지'
    ],
  },
  {
    id: 3,
    slug: 'pure-gold-horse-baby-ring',
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
    ],
    imageAlts: [
      '24K 순금 말띠 돌반지 - 돌잔치 선물용 아기반지',
      '순금 돌반지 띠별 디자인 - 이름 각인 가능',
      '99.9% 순금 아기반지 - 종로 금은방 도매가',
      '백일반지 순금 세트 - 백일 선물용 귀금속',
      '순금 돌반지 각인 디테일 - 주문제작 가능',
      '24K 순금 아기반지 세트 구성 - 돌 선물 추천'
    ],
  },
  {
    id: 4,
    slug: 'milgrain-line-one-point-couple-ring',
    category: 'ring',
    title: '밀그레인 라인 원포인트 커플링',
    titleEn: 'Milgrain Line One-Point Couple Ring',
    description: '민무늬 밴드에 밀그레인 라인을 더한 모던 웨딩밴드입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0201.webp',
      '/Image/ring/NN0202.webp'],
    imageAlts: [
      '14K 밀그레인 라인 원포인트 커플링 - 모던 웨딩밴드',
      '14K 밀그레인 커플링 측면 - 결혼반지 주문제작'
    ],
  },
  {
    id: 5,
    slug: 'two-tone-combi-satin-point-couple-ring',
    category: 'ring',
    title: '투톤 콤비 새틴 포인트 커플링',
    titleEn: 'Two-Tone Combi Satin Point Couple Ring',
    description: '무광 화이트골드에 유광 엣지를 더한 콤비 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0301.webp',
      '/Image/ring/NN0302.webp'],
    imageAlts: [
      '14K 투톤 콤비 새틴 포인트 커플링 - 무광 화이트골드 웨딩밴드',
      '14K 콤비 커플링 유광 엣지 디테일 - 종로 도매가'
    ],
  },
  {
    id: 6,
    slug: 'bridge-solitaire-couple-ring',
    category: 'ring',
    title: '브릿지 솔리테어 커플링',
    titleEn: 'Bridge Solitaire Couple Rings',
    description: '심플함과 화려함을 겸한 브릿지 솔리테어 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0401.webp',
      '/Image/ring/NN0402.webp'],
    imageAlts: [
      '14K 브릿지 솔리테어 커플링 - 심플 화려 예물 반지',
      '14K 브릿지 솔리테어 커플링 측면 - 주문제작 가능'
    ],
  },
  {
    id: 7,
    slug: 'v-line-layered-combi-couple-ring',
    category: 'ring',
    title: 'V 라인 레이어드 콤비 커플링',
    titleEn: 'V-Line Layered Combi Couple Ring',
    description: '로즈골드 V라인이 손가락을 길어 보이게 하는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0501.webp',
      '/Image/ring/NN0502.webp'],
    imageAlts: [
      '14K V라인 레이어드 콤비 커플링 - 손가락 길어 보이는 디자인',
      '14K V라인 로즈골드 커플링 디테일 - 종로 금은방'
    ],
  },
  {
    id: 8,
    slug: 'lovely-heart-layered-combi-couple-ring',
    category: 'ring',
    title: '러블리 하트 레이어드 콤비 커플링',
    titleEn: 'Lovely Heart Layered Combi Couple Ring',
    description: '하트 스톤과 레이어드 라인이 돋보이는 로맨틱 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0602.webp',
      '/Image/ring/NN0601.webp'],
    imageAlts: [
      '14K 러블리 하트 레이어드 콤비 커플링 - 로맨틱 기념일 선물',
      '14K 하트 스톤 커플링 측면 - 주문제작 가능'
    ],
  },
  {
    id: 9,
    slug: 'yellow-gold-step-edge-couple-ring',
    category: 'ring',
    title: '옐로우골드 스텝 엣지 포인트 커플링',
    titleEn: 'Yellow Gold Step Edge Point Couple Ring',
    description: '계단형 스텝 엣지로 입체감을 살린 옐로우골드 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0701.webp',
      '/Image/ring/NN0702.webp'],
    imageAlts: [
      '14K 옐로우골드 스텝 엣지 포인트 커플링 - 입체 웨딩밴드',
      '14K 스텝 엣지 커플링 디테일 - 종로 도매가'
    ],
  },
    {
    id: 10,
    slug: 'diagonal-wave-point-couple-ring',
    category: 'ring',
    title: '사선 웨이브 포인트 커플링',
    titleEn: 'Diagonal Wave Point Couple Ring',
    description: '사선 웨이브 라인으로 손가락이 가늘어 보이는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0802.webp',
      '/Image/ring/NN0801.webp'],
    imageAlts: [
      '14K 사선 웨이브 포인트 커플링 - 가늘어 보이는 반지 디자인',
      '14K 사선 웨이브 커플링 측면 - 주문제작 가능'
    ],
  },
  {
    id: 11,
    slug: 'modern-dual-chain-set',
    category: 'set',
    title: '모던 듀얼 체인 패션 세트',
    titleEn: 'Modern Dual Chain Wedding Set',
    description: '오벌 쉐입과 체인 텍스처의 프리미엄 패션 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0101.webp', '/Image/set/set0102.webp'],
    imageAlts: [
      '14K 모던 듀얼 체인 예물 세트 - 오벌 쉐입 프리미엄 주얼리',
      '14K 듀얼 체인 세트 디테일 - 맞춤 제작 예물'
    ],
  },
    {
    id: 12,
    slug: 'u-link-lettering-signature-set',
    category: 'set',
    title: 'U-링크 레터링 시그니처 세트',
    titleEn: 'U-Link Lettering Signature Set',
    description: '말발굽 모티브와 레터링이 돋보이는 시그니처 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0201.webp', '/Image/set/set0202.webp'],
    imageAlts: [
      '14K U링크 레터링 시그니처 세트 - 말발굽 모티브 주얼리',
      '14K 레터링 시그니처 세트 디테일 - 맞춤 제작'
    ],
  },
      {
    id: 13,
    slug: 'moonlight-circle-drop-set',
    category: 'set',
    title: '문라이트 서클 드롭 세트',
    titleEn: 'Moonlight Circle Drop Set',
    description: '움직일 때마다 영롱하게 반짝이는 서클 드롭 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0302.webp', '/Image/set/set0301.webp'],
    imageAlts: [
      '14K 문라이트 서클 드롭 세트 - 반짝이는 예물 주얼리',
      '14K 서클 드롭 세트 디테일 - 맞춤 제작 가능'
    ],
  },
  {
    id: 14,
    slug: 'satin-matte-diagonal-cut-couple-ring',
    category: 'ring',
    title: '새틴 무광 사선컷 원포인트 커플링',
    titleEn: 'Satin Matte Diagonal Cut One-Point Couple Ring',
    description: '새틴 무광 마감에 사선 컷 포인트를 준 데일리 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN0901.webp'],
    imageAlts: [
      '14K 새틴 무광 사선컷 원포인트 커플링 - 데일리 결혼반지'
    ],
  },
  {
    id: 15,
    slug: 'two-line-solitaire-pave-couple-ring',
    category: 'ring',
    title: '투라인 솔리테어 파베 커플링',
    titleEn: 'Two-Line Solitaire Pavé Couple Ring',
    description: '솔리테어 큐빅을 파베 라인이 감싼 화려한 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1001.webp'],
    imageAlts: [
      '14K 투라인 솔리테어 파베 커플링 - 화려한 예물 반지'
    ],
  },
  {
    id: 16,
    slug: 'tri-color-gold-twist-ring',
    category: 'ring',
    title: '삼색 골드 트위스트 컷팅 반지',
    titleEn: 'Tri-Color Gold Twist Cutting Ring',
    description: '세 가지 골드가 어우러진 꼬임 패턴 데일리 반지입니다.',
    material: '14K Yellow / Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1101.webp'],
    imageAlts: [
      '14K 삼색 골드 트위스트 컷팅 반지 - 데일리 금반지 주문제작'
    ],
  },
  {
    id: 17,
    slug: 'classic-milgrain-solitaire-combi-couple-ring',
    category: 'ring',
    title: '클래식 밀그레인 솔리테어 콤비 커플링',
    titleEn: 'Classic Milgrain Solitaire Combi Couple Ring',
    description: '밀그레인 디테일로 빈티지와 모던을 살린 콤비 커플링입니다.',
    material: '14K Gold / Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1201.webp'],
    imageAlts: [
      '14K 클래식 밀그레인 솔리테어 콤비 커플링 - 빈티지 모던 웨딩밴드'
    ],
  },
  {
    id: 18,
    slug: 'milgrain-band-daily-couple-ring',
    category: 'ring',
    title: '밀그레인 밴드 데일리 커플링',
    titleEn: 'Milgrain Band Daily Couple Ring',
    description: '은은한 밀그레인 포인트의 편안한 데일리 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1301.webp'],
    imageAlts: [
      '14K 밀그레인 밴드 데일리 커플링 - 편안한 일상 결혼반지'
    ],
  },
  {
    id: 19,
    slug: 'vintage-pattern-wide-band-couple-ring',
    category: 'ring',
    title: '빈티지 패턴 와이드 밴드 커플링',
    titleEn: 'Vintage Pattern Wide Band Couple Ring',
    description: '넓은 밴드에 빈티지 패턴을 새긴 앤티크 무드 커플링입니다.',
    material: '14K Yellow / Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1401.webp'],
    imageAlts: [
      '14K 빈티지 패턴 와이드 밴드 커플링 - 앤티크 무드 반지'
    ],
  },
  {
    id: 20,
    slug: 'rose-gold-silver-ball-bead-necklace',
    category: 'necklace',
    title: '로즈골드 실버볼 비즈 데일리 목걸이',
    titleEn: 'Rose Gold Silver Ball Bead Daily Necklace',
    description: '실버 비즈가 포인트인 미니멀 로즈골드 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0101.webp'],
    imageAlts: [
      '14K 로즈골드 실버볼 비즈 데일리 목걸이 - 미니멀 금목걸이'
    ],
  },
  {
    id: 21,
    slug: 'lucky-horseshoe-number-pendant-necklace',
    category: 'necklace',
    title: '행운 호스슈 넘버 펜던트 목걸이',
    titleEn: 'Lucky Horseshoe Number Pendant Necklace',
    description: '행운의 말굽에 기념 숫자를 새기는 로즈골드 펜던트입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0201.webp'],
    imageAlts: [
      '14K 로즈골드 행운 호스슈 넘버 펜던트 목걸이 - 숫자 각인 주문제작'
    ],
  },
  {
    id: 22,
    slug: 'rose-gold-buckle-cubic-pendant-necklace',
    category: 'necklace',
    title: '로즈골드 버클 큐빅 펜던트 목걸이',
    titleEn: 'Rose Gold Buckle Cubic Pendant Necklace',
    description: '큐빅을 촘촘히 채운 버클 펜던트 로즈골드 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0301.webp'],
    imageAlts: [
      '14K 로즈골드 버클 큐빅 펜던트 목걸이 - 종로 도매가 금목걸이'
    ],
  },
  {
    id: 23,
    slug: 'rose-gold-mesh-chain-slider-bracelet',
    category: 'bracelet',
    title: '로즈골드 메시체인 슬라이더 팔찌',
    titleEn: 'Rose Gold Mesh Chain Slider Bracelet',
    description: '길이 조절이 간편한 메시체인 로즈골드 데일리 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/BR0101.webp'],
    imageAlts: [
      '14K 로즈골드 메시체인 슬라이더 팔찌 - 길이조절 데일리 금팔찌'
    ],
  },
  {
    id: 24,
    slug: 'flower-motif-rose-gold-jewelry-set',
    category: 'set',
    title: '플라워 모티브 로즈골드 주얼리 세트',
    titleEn: 'Flower Motif Rose Gold Jewelry Set',
    description: '꽃잎 디테일이 로맨틱한 로즈골드 주얼리 4종 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0401.webp'],
    imageAlts: [
      '14K 플라워 모티브 로즈골드 주얼리 4종 세트 - 맞춤 제작'
    ],
  },
  {
    id: 25,
    slug: 'circle-link-pave-rose-gold-jewelry-set',
    category: 'set',
    title: '서클 링크 파베 로즈골드 주얼리 세트',
    titleEn: 'Circle Link Pavé Rose Gold Jewelry Set',
    description: '파베 서클과 체인 링크가 트렌디한 로즈골드 4종 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0501.webp'],
    imageAlts: [
      '14K 서클 링크 파베 로즈골드 주얼리 4종 세트 - 트렌디 예물'
    ],
  },
  {
    id: 26,
    slug: 'lock-chain-gold-jewelry-set',
    category: 'set',
    title: '자물쇠 체인 골드 주얼리 세트',
    titleEn: 'Lock & Chain Gold Jewelry Set',
    description: '자물쇠·체인 모티브로 힙하게 연출하는 골드 4종 세트입니다.',
    material: '14K Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0601.webp'],
    imageAlts: [
      '14K 자물쇠 체인 골드 주얼리 4종 세트 - 힙한 골드 주얼리'
    ],
  },
  // ── 2026-08 추가 입고 ──────────────────────────────────────────────
  {
    id: 27,
    slug: 'rose-gold-clover-initial-chain-bracelet',
    category: 'bracelet',
    title: '로즈골드 클로버 이니셜 체인 팔찌',
    titleEn: 'Rose Gold Clover Initial Chain Bracelet',
    description: '이니셜을 새긴 클로버 참과 볼 장식의 로즈골드 체인 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-clover-initial-chain-bracelet-01.webp'],
    imageAlts: [
      '14K 로즈골드 클로버 이니셜 체인 팔찌 - 종로 금은방 도매가 주문제작'
    ],
    keywords: ['로즈골드 팔찌', '이니셜 팔찌', '클로버 팔찌', '14K 금팔찌', '종로 금은방'],
    specs: [
      { label: '체인', value: '로프 체인' },
      { label: '참', value: '클로버 이니셜 · 볼 장식' },
      { label: '길이 조절', value: '슬라이드 어저스터' },
    ],
  },
  {
    id: 28,
    slug: 'rose-gold-fish-motif-couple-ring',
    category: 'ring',
    title: '로즈골드 물고기 모티브 커플반지',
    titleEn: 'Rose Gold Fish Motif Couple Ring',
    description: '물고기 모티브와 밀그레인 라인이 만나는 로즈골드 커플반지입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/rose-gold-fish-motif-couple-ring-01.webp'],
    imageAlts: [
      '14K 로즈골드 물고기 모티브 커플반지 착용 - 종로 금은방 도매가 주문제작'
    ],
    keywords: ['물고기 반지', '로즈골드 커플링', '모티브 반지', '14K 금반지', '종로 금은방'],
    specs: [
      { label: '모티브', value: '물고기 · 밀그레인 라인' },
      { label: '세팅', value: '큐빅 파베 · 포인트 스톤' },
    ],
  },
  {
    id: 29,
    slug: 'rose-gold-double-chain-solitaire-bracelet',
    category: 'bracelet',
    title: '로즈골드 더블체인 원스톤 팔찌',
    titleEn: 'Rose Gold Double Chain Solitaire Bracelet',
    description: '두 겹 체인 위에 원스톤을 올린 가벼운 데일리 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-double-chain-solitaire-bracelet-01.webp'],
    imageAlts: [
      '14K 로즈골드 더블체인 원스톤 팔찌 착용 - 데일리 금팔찌 주문제작'
    ],
    keywords: ['로즈골드 팔찌', '데일리 금팔찌', '원스톤 팔찌', '14K 팔찌', '종로 도매'],
    specs: [
      { label: '체인', value: '더블 레이어드 체인' },
      { label: '포인트', value: '원스톤 큐빅' },
    ],
  },
  {
    id: 30,
    slug: 'rose-gold-black-onyx-clover-bangle',
    category: 'bracelet',
    title: '로즈골드 블랙오닉스 클로버 뱅글',
    titleEn: 'Rose Gold Black Onyx Clover Bangle',
    description: '블랙 오닉스 클로버를 얹은 가는 라인의 로즈골드 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-black-onyx-clover-bangle-01.webp',
      '/Image/bracelet/rose-gold-black-onyx-clover-bangle-02.webp',
    ],
    imageAlts: [
      '14K 로즈골드 블랙오닉스 클로버 뱅글 - 종로 금은방 도매가 주문제작',
      '14K 로즈골드 클로버 뱅글 착용 - 데일리 금팔찌 코디'
    ],
    keywords: ['클로버 뱅글', '로즈골드 뱅글', '오닉스 팔찌', '14K 뱅글', '종로 금은방'],
    specs: [
      { label: '스톤', value: '블랙 오닉스' },
      { label: '테두리', value: '로즈골드 밀그레인 비딩' },
      { label: '형태', value: '와이어 뱅글' },
    ],
  },
  {
    id: 31,
    slug: 'rose-gold-knot-pave-bangle',
    category: 'bracelet',
    title: '로즈골드 노트 파베 뱅글',
    titleEn: 'Rose Gold Knot Pave Bangle',
    description: '매듭 지점을 파베로 감싼 로즈골드 슬림 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-knot-pave-bangle-01.webp'],
    imageAlts: [
      '14K 로즈골드 노트 파베 뱅글 - 매듭 디자인 금팔찌 주문제작'
    ],
    keywords: ['노트 뱅글', '매듭 팔찌', '로즈골드 뱅글', '파베 팔찌', '14K 금팔찌'],
    specs: [
      { label: '모티브', value: '노트(매듭)' },
      { label: '세팅', value: '더블 라인 파베' },
      { label: '형태', value: '와이어 뱅글' },
    ],
  },
  {
    id: 32,
    slug: 'two-tone-tension-solitaire-couple-ring',
    category: 'ring',
    title: '투톤 텐션 솔리테어 커플링',
    titleEn: 'Two-Tone Tension Solitaire Couple Ring',
    description: '로즈골드와 옐로우골드를 나눠 낀 텐션 세팅 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/two-tone-tension-solitaire-couple-ring-01.webp'],
    imageAlts: [
      '14K 투톤 텐션 솔리테어 커플링 - 종로 도매가 결혼반지 주문제작'
    ],
    keywords: ['텐션 커플링', '투톤 커플링', '솔리테어 반지', '결혼반지', '종로 금은방'],
    specs: [
      { label: '세팅', value: '4프롱 텐션 세팅' },
      { label: '밴드', value: '플랫 밴드' },
      { label: '컬러', value: '로즈골드 · 옐로우골드' },
    ],
  },
  {
    id: 33,
    slug: 'rose-gold-heart-pave-eternity-ring',
    category: 'ring',
    title: '하트·파베 에타니티 반지',
    titleEn: 'Heart & Pave Eternity Ring',
    description: '하트 라인과 파베 라인 두 가지로 고르는 로즈골드 에타니티 반지입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/rose-gold-heart-pave-eternity-ring-01.webp'],
    imageAlts: [
      '14K 로즈골드 하트 에타니티 반지와 파베 에타니티 반지 - 겹침 연출 데일리 금반지'
    ],
    keywords: ['에타니티 반지', '하트 반지', '파베 반지', '로즈골드 반지', '데일리 금반지'],
    specs: [
      { label: '하트 라인', value: '하트 베젤 · 큐빅 인레이' },
      { label: '파베 라인', value: '프롱 파베 · 골드 비드 교차' },
      { label: '착용', value: '단독 · 레이어드 모두 가능' },
    ],
  },
  {
    id: 34,
    slug: 'rose-gold-cross-pave-bangle',
    category: 'bracelet',
    title: '로즈골드 크로스 파베 뱅글',
    titleEn: 'Rose Gold Cross Pave Bangle',
    description: 'X자로 교차한 파베 포인트가 중심을 잡는 로즈골드 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-cross-pave-bangle-01.webp',
      '/Image/bracelet/rose-gold-cross-pave-bangle-02.webp',
    ],
    imageAlts: [
      '14K 로즈골드 크로스 파베 뱅글 - 종로 금은방 도매가 주문제작',
      '14K 로즈골드 크로스 뱅글 오픈 컷 - 파베 X 모티브 금팔찌'
    ],
    keywords: ['크로스 뱅글', '파베 팔찌', '로즈골드 뱅글', '14K 금팔찌', '종로 도매'],
    specs: [
      { label: '모티브', value: 'X 크로스' },
      { label: '세팅', value: '큐빅 파베' },
      { label: '길이 조절', value: '체인 익스텐더' },
    ],
  },
  {
    id: 35,
    slug: 'rose-gold-chunky-chain-pave-lock-necklace',
    category: 'necklace',
    title: '로즈골드 청키체인 파베 락 목걸이',
    titleEn: 'Rose Gold Chunky Chain Pave Lock Necklace',
    description: '두툼한 체인에 파베 락 클래스프를 더한 로즈골드 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/necklace/rose-gold-chunky-chain-pave-lock-necklace-01.webp',
      '/Image/necklace/rose-gold-chunky-chain-pave-lock-necklace-02.webp',
    ],
    imageAlts: [
      '14K 로즈골드 청키체인 파베 락 목걸이 - 종로 금은방 도매가 주문제작',
      '14K 로즈골드 청키체인 목걸이 착용 - 파베 락 포인트 금목걸이'
    ],
    keywords: ['청키체인 목걸이', '로즈골드 목걸이', '락 목걸이', '14K 금목걸이', '종로 금은방'],
    specs: [
      { label: '체인', value: '오벌 링크 청키 체인' },
      { label: '포인트', value: '파베 락 클래스프' },
      { label: '길이 조절', value: '익스텐더 체인' },
    ],
  },
  {
    id: 36,
    slug: 'fancy-yellow-diamond-solitaire-ring',
    category: 'ring',
    title: '팬시 옐로우 다이아몬드 솔리테어 반지',
    titleEn: 'Fancy Yellow Diamond Solitaire Ring',
    description: '쿠션컷 옐로우 다이아몬드를 중심에 올린 파베 솔리테어 반지입니다.',
    material: '화이트골드 · 옐로우 다이아몬드',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/ring/fancy-yellow-diamond-solitaire-ring-01.webp'],
    imageAlts: [
      '팬시 옐로우 다이아몬드 쿠션컷 솔리테어 반지 - 종로 도매가 다이아 반지 맞춤 제작'
    ],
    keywords: ['옐로우 다이아몬드', '팬시 다이아', '솔리테어 반지', '다이아 반지', '종로 도매'],
    specs: [
      { label: '센터 스톤', value: '쿠션컷 팬시 옐로우 다이아몬드' },
      { label: '세팅', value: '4프롱 · 숄더 파베' },
      { label: '상담', value: '캐럿·등급은 상담 후 결정' },
    ],
  },
  {
    id: 37,
    slug: 'rose-gold-compass-star-bangle',
    category: 'bracelet',
    title: '로즈골드 컴퍼스 스타 뱅글',
    titleEn: 'Rose Gold Compass Star Bangle',
    description: '자개 위 팔각별 메달을 얹은 로즈골드 슬림 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-compass-star-bangle-01.webp',
      '/Image/bracelet/rose-gold-compass-star-bangle-02.webp',
    ],
    imageAlts: [
      '14K 로즈골드 컴퍼스 스타 뱅글 - 자개 메달 금팔찌 주문제작',
      '14K 로즈골드 컴퍼스 스타 뱅글 착용 - 데일리 금팔찌 코디'
    ],
    keywords: ['컴퍼스 뱅글', '자개 팔찌', '로즈골드 뱅글', '별 모티브 팔찌', '14K 금팔찌'],
    specs: [
      { label: '메달', value: '자개 바탕 · 팔각별' },
      { label: '스톤', value: '센터 큐빅 포인트' },
      { label: '형태', value: '와이어 뱅글' },
    ],
  },
  {
    id: 38,
    slug: 'rose-gold-chain-necklace-bracelet-set',
    category: 'set',
    title: '로즈골드 체인 목걸이·팔찌 세트',
    titleEn: 'Rose Gold Chain Necklace & Bracelet Set',
    description: '볼 장식과 파베 링크를 맞춘 로즈골드 목걸이·팔찌 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/rose-gold-chain-necklace-bracelet-set-01.webp'],
    imageAlts: [
      '14K 로즈골드 체인 목걸이 팔찌 세트 - 종로 도매가 예물 주얼리 맞춤 제작'
    ],
    keywords: ['주얼리 세트', '로즈골드 세트', '체인 목걸이', '체인 팔찌', '예물 세트'],
    specs: [
      { label: '구성', value: '목걸이 + 팔찌' },
      { label: '체인', value: '엘롱게이티드 링크 · 볼 스테이션' },
      { label: '포인트', value: '파베 링크' },
    ],
  },
  {
    id: 39,
    slug: 'two-tone-lattice-tension-couple-ring',
    category: 'ring',
    title: '투톤 래티스 텐션 커플링',
    titleEn: 'Two-Tone Lattice Tension Couple Ring',
    description: '안쪽에 격자·로프 세공을 넣은 투톤 텐션 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/two-tone-lattice-tension-couple-ring-01.webp'],
    imageAlts: [
      '14K 투톤 래티스 텐션 커플링 - 안쪽 격자 세공 결혼반지 주문제작'
    ],
    keywords: ['래티스 반지', '투톤 커플링', '텐션 세팅', '결혼반지', '종로 금은방'],
    specs: [
      { label: '세팅', value: '4프롱 텐션 세팅' },
      { label: '이너 밴드', value: '격자 타공 · 로프 텍스처' },
      { label: '마감', value: '유광 로즈골드 · 무광 옐로우골드' },
    ],
  },
  {
    id: 40,
    slug: 'white-gold-pave-rondelle-pendant-necklace',
    category: 'necklace',
    title: '화이트골드 파베 롱델 펜던트 목걸이',
    titleEn: 'White Gold Pave Rondelle Pendant Necklace',
    description: '가는 체인에 파베 롱델 하나만 얹은 미니멀 목걸이입니다.',
    material: '14K White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/necklace/white-gold-pave-rondelle-pendant-necklace-01.webp',
      '/Image/necklace/white-gold-pave-rondelle-pendant-necklace-02.webp',
    ],
    imageAlts: [
      '14K 화이트골드 파베 롱델 펜던트 목걸이 - 미니멀 금목걸이 주문제작',
      '14K 화이트골드 롱델 펜던트 목걸이 착용 - 데일리 목걸이 코디'
    ],
    keywords: ['화이트골드 목걸이', '파베 펜던트', '미니멀 목걸이', '14K 금목걸이', '데일리 목걸이'],
    specs: [
      { label: '펜던트', value: '파베 롱델(배럴)' },
      { label: '체인', value: '슬림 케이블 체인' },
    ],
  },
  {
    id: 41,
    slug: 'gold-layered-chain-bracelet-trio',
    category: 'bracelet',
    title: '14K 골드 레이어드 체인 팔찌 3종',
    titleEn: 'Gold Layered Chain Bracelet Trio',
    description: '이니셜·로프·스테이션 체인을 겹쳐 연출하는 골드 팔찌 3종입니다.',
    material: '14K Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/gold-layered-chain-bracelet-trio-01.webp'],
    imageAlts: [
      '14K 골드 레이어드 체인 팔찌 3종 착용 - 이니셜 로프 스테이션 금팔찌'
    ],
    keywords: ['레이어드 팔찌', '골드 체인 팔찌', '이니셜 팔찌', '14K 금팔찌', '종로 도매'],
    specs: [
      { label: '구성', value: '이니셜 체인 · 로프 체인 · 스테이션 체인' },
      { label: '연출', value: '단독 · 레이어드 모두 가능' },
      { label: '판매', value: '낱개 구매 가능' },
    ],
  },
]

// 색상·소재·제작 조건은 모든 제품에 공통으로 적용한다.
// 새 제품을 추가해도 표기가 흔들리지 않도록 출력 단계에서 기본값을 정규화한다.
export const galleryItems: GalleryItem[] = galleryItemSource.map((item) => ({
  ...item,
  material: galleryProductDefaults.material,
  colorOptions: [...galleryProductDefaults.colorOptions],
  workType: galleryProductDefaults.workType,
  delivery: galleryProductDefaults.delivery,
}))

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

// 상세 페이지용 slug 조회
export const getItemBySlug = (slug: string): GalleryItem | undefined => {
  return galleryItems.find(item => item.slug === slug)
}

// 같은 카테고리의 다른 제품 (상세 페이지 하단 추천)
export const getRelatedItems = (item: GalleryItem, count: number = 3): GalleryItem[] => {
  return galleryItems
    .filter(other => other.category === item.category && other.id !== item.id)
    .slice(0, count)
}

// 메인 페이지 프리뷰용 (반지 3개 + 세트 3개)
export const getPreviewItems = (count: number = 6): GalleryItem[] => {
  const rings = galleryItems.filter(item => item.category === 'ring').slice(0, 3)
  const sets = galleryItems.filter(item => item.category === 'set').slice(0, 3)
  return [...rings, ...sets]
}
