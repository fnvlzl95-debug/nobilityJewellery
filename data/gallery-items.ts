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
  specs?: ProductSpec[]  // 상세 페이지 스펙 표
}

export const galleryProductDefaults = {
  material: '14K·18K',
  colorOptions: ['화이트골드', '로즈골드', '옐로우골드'],
  workType: '주문제작',
  delivery: '최소 2주',
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
    title: '프라미스 각인 커플링',
    titleEn: 'PROMISE Couple Ring',
    description: '프라미스 레터링과 각인 포인트를 더한 클래식 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0103.webp',
      '/Image/ring/NN0101.webp',
      '/Image/ring/NN0102.webp',
      '/Image/ring/NN0104.webp'  ],
    imageAlts: [
      '프라미스 각인 커플링 정면',
      '프라미스 각인 커플링 레터링 디테일',
      '프라미스 각인 커플링 밴드 디테일',
      '프라미스 각인 커플링 전체 구성'
    ],
  },
  {
    id: 2,
    slug: 'diamond-solitaire-couple-ring',
    category: 'ring',
    title: '다이아몬드 솔리테어 커플링',
    titleEn: 'Diamond Solitaire',
    description: '중앙 다이아몬드가 빛나는 우아한 솔리테어 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NS0102.webp',
      '/Image/ring/NS0101.webp'],
    imageAlts: [
      '다이아몬드 솔리테어 커플링 정면',
      '다이아몬드 솔리테어 커플링 측면 세팅'
    ],
  },
  {
    id: 3,
    slug: 'pure-gold-horse-baby-ring',
    category: 'ring',
    title: '말띠 아기 돌반지',
    titleEn: 'Signet Ring',
    description: '말 모티브를 새겨 돌·백일 선물로 제작하는 아기 반지입니다.',
    material: '24K 순금',
    workType: '주문제작 가능',
    delivery: '1-2주',
    specs: [
      { label: '중량 옵션', value: '1돈 · 반돈 (기타 중량 상담)' },
      { label: '각인', value: '이름·날짜 각인 가능' },
    ],
    images: ['/Image/ring/SB0101.webp',
      '/Image/ring/SB0102.webp',
      '/Image/ring/SB0103.webp',
      '/Image/ring/SB0104.webp',
      '/Image/ring/SB0105.webp',
      '/Image/ring/SB0106.webp'
    ],
    imageAlts: [
      '말띠 아기 돌반지 정면',
      '말 모티브와 이름 각인 디테일',
      '말띠 아기 돌반지 측면',
      '돌·백일 기념 아기 반지 구성',
      '말띠 아기 돌반지 각인 디테일',
      '말띠 아기 돌반지 세트 구성'
    ],
  },
  {
    id: 4,
    slug: 'milgrain-line-one-point-couple-ring',
    category: 'ring',
    title: '밀그레인 원포인트 커플링',
    titleEn: 'Milgrain Line One-Point Couple Ring',
    description: '민무늬 밴드에 밀그레인 라인과 원스톤 포인트를 더한 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작 가능',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0201.webp',
      '/Image/ring/NN0202.webp'],
    imageAlts: [
      '밀그레인 원포인트 커플링 정면',
      '밀그레인 원포인트 커플링 측면'
    ],
  },
  {
    id: 5,
    slug: 'two-tone-combi-satin-point-couple-ring',
    category: 'ring',
    title: '투톤 새틴 콤비 커플링',
    titleEn: 'Two-Tone Combi Satin Point Couple Ring',
    description: '새틴 무광 면과 유광 엣지를 조합한 투톤 콤비 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1-2주',
    images: [
      '/Image/ring/NN0301.webp',
      '/Image/ring/NN0302.webp'],
    imageAlts: [
      '투톤 새틴 콤비 커플링 정면',
      '투톤 새틴 콤비 커플링 유광 엣지 디테일'
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
      '브릿지 솔리테어 커플링 정면',
      '브릿지 솔리테어 커플링 측면 세팅'
    ],
  },
  {
    id: 7,
    slug: 'v-line-layered-combi-couple-ring',
    category: 'ring',
    title: 'V라인 레이어드 커플링',
    titleEn: 'V-Line Layered Combi Couple Ring',
    description: 'V라인 레이어드 밴드가 손가락을 길어 보이게 연출하는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0501.webp',
      '/Image/ring/NN0502.webp'],
    imageAlts: [
      'V라인 레이어드 커플링 정면',
      'V라인 레이어드 커플링 밴드 디테일'
    ],
  },
  {
    id: 8,
    slug: 'lovely-heart-layered-combi-couple-ring',
    category: 'ring',
    title: '하트 레이어드 커플링',
    titleEn: 'Lovely Heart Layered Combi Couple Ring',
    description: '하트 스톤과 레이어드 라인이 돋보이는 로맨틱 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0602.webp',
      '/Image/ring/NN0601.webp'],
    imageAlts: [
      '하트 레이어드 커플링 정면',
      '하트 레이어드 커플링 측면 세팅'
    ],
  },
  {
    id: 9,
    slug: 'yellow-gold-step-edge-couple-ring',
    category: 'ring',
    title: '스텝 엣지 커플링',
    titleEn: 'Yellow Gold Step Edge Point Couple Ring',
    description: '계단형 스텝 엣지로 밴드에 입체감을 살린 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0701.webp',
      '/Image/ring/NN0702.webp'],
    imageAlts: [
      '스텝 엣지 커플링 정면',
      '스텝 엣지 커플링 측면 디테일'
    ],
  },
    {
    id: 10,
    slug: 'diagonal-wave-point-couple-ring',
    category: 'ring',
    title: '사선 웨이브 커플링',
    titleEn: 'Diagonal Wave Point Couple Ring',
    description: '사선 웨이브 라인으로 손가락이 가늘어 보이는 커플링입니다.',
    material: '14K White / Rose / Gold',
    workType: '주문제작',
    delivery: '1~2주',
    images: [
      '/Image/ring/NN0802.webp',
      '/Image/ring/NN0801.webp'],
    imageAlts: [
      '사선 웨이브 커플링 정면',
      '사선 웨이브 커플링 측면'
    ],
  },
  {
    id: 11,
    slug: 'modern-dual-chain-set',
    category: 'set',
    title: '오벌 링크 파베 주얼리 세트',
    titleEn: 'Modern Dual Chain Wedding Set',
    description: '오벌 링크와 파베 디테일을 맞춘 반지·목걸이·귀걸이 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0101.webp', '/Image/set/set0102.webp'],
    imageAlts: [
      '오벌 링크 파베 주얼리 세트 전체 구성',
      '오벌 링크 파베 주얼리 세트 디테일'
    ],
  },
    {
    id: 12,
    slug: 'u-link-lettering-signature-set',
    category: 'set',
    title: '말발굽 레터링 주얼리 세트',
    titleEn: 'U-Link Lettering Signature Set',
    description: '말발굽 모티브와 레터링이 돋보이는 시그니처 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0201.webp', '/Image/set/set0202.webp'],
    imageAlts: [
      '말발굽 레터링 주얼리 세트 전체 구성',
      '말발굽 레터링 주얼리 세트 디테일'
    ],
  },
      {
    id: 13,
    slug: 'moonlight-circle-drop-set',
    category: 'set',
    title: '서클 드롭 파베 주얼리 세트',
    titleEn: 'Moonlight Circle Drop Set',
    description: '서클 드롭과 파베 포인트를 맞춘 반지·목걸이·귀걸이 세트입니다.',
    material: '14K White / Rose / Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0302.webp', '/Image/set/set0301.webp'],
    imageAlts: [
      '서클 드롭 파베 주얼리 세트 전체 구성',
      '서클 드롭 파베 주얼리 세트 디테일'
    ],
  },
  {
    id: 14,
    slug: 'satin-matte-diagonal-cut-couple-ring',
    category: 'ring',
    title: '새틴 무광 사선 컷 커플링',
    titleEn: 'Satin Matte Diagonal Cut One-Point Couple Ring',
    description: '새틴 무광 마감에 사선 컷 포인트를 준 데일리 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN0901.webp'],
    imageAlts: [
      '새틴 무광 사선 컷 커플링 정면'
    ],
  },
  {
    id: 15,
    slug: 'two-line-solitaire-pave-couple-ring',
    category: 'ring',
    title: '투 라인 솔리테어 파베 커플링',
    titleEn: 'Two-Line Solitaire Pavé Couple Ring',
    description: '솔리테어 큐빅을 파베 라인이 감싼 화려한 커플링입니다.',
    material: '14K Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1001.webp'],
    imageAlts: [
      '투 라인 솔리테어 파베 커플링 정면'
    ],
  },
  {
    id: 16,
    slug: 'tri-color-gold-twist-ring',
    category: 'ring',
    title: '트리컬러 트위스트 반지',
    titleEn: 'Tri-Color Gold Twist Cutting Ring',
    description: '세 가지 색상과 꼬임 패턴을 조합한 트리컬러 데일리 반지입니다.',
    material: '14K Yellow / Rose / White Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1101.webp'],
    imageAlts: [
      '트리컬러 트위스트 반지 꼬임 디테일'
    ],
  },
  {
    id: 17,
    slug: 'classic-milgrain-solitaire-combi-couple-ring',
    category: 'ring',
    title: '밀그레인 솔리테어 콤비 커플링',
    titleEn: 'Classic Milgrain Solitaire Combi Couple Ring',
    description: '밀그레인 디테일로 빈티지와 모던을 살린 콤비 커플링입니다.',
    material: '14K Gold / Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1201.webp'],
    imageAlts: [
      '밀그레인 솔리테어 콤비 커플링 정면'
    ],
  },
  {
    id: 18,
    slug: 'milgrain-band-daily-couple-ring',
    category: 'ring',
    title: '밀그레인 밴드 커플링',
    titleEn: 'Milgrain Band Daily Couple Ring',
    description: '은은한 밀그레인 포인트의 편안한 데일리 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/NN1301.webp'],
    imageAlts: [
      '밀그레인 밴드 커플링 정면'
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
      '빈티지 패턴 와이드 밴드 커플링 정면'
    ],
  },
  {
    id: 20,
    slug: 'rose-gold-silver-ball-bead-necklace',
    category: 'necklace',
    title: '볼 비즈 체인 목걸이',
    titleEn: 'Rose Gold Silver Ball Bead Daily Necklace',
    description: '볼 비즈를 한 줄로 배열해 체인에 대비감을 준 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0101.webp'],
    imageAlts: [
      '볼 비즈 체인 목걸이 전체 디자인'
    ],
  },
  {
    id: 21,
    slug: 'lucky-horseshoe-number-pendant-necklace',
    category: 'necklace',
    title: '말발굽 숫자 각인 목걸이',
    titleEn: 'Lucky Horseshoe Number Pendant Necklace',
    description: '행운의 말발굽 모티브에 기념 숫자나 참을 더하는 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0201.webp'],
    imageAlts: [
      '말발굽 숫자 각인 목걸이 펜던트 디테일'
    ],
  },
  {
    id: 22,
    slug: 'rose-gold-buckle-cubic-pendant-necklace',
    category: 'necklace',
    title: '버클 파베 펜던트 목걸이',
    titleEn: 'Rose Gold Buckle Cubic Pendant Necklace',
    description: '버클 형태의 곡선 펜던트에 파베 스톤을 세팅한 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/necklace/NC0301.webp'],
    imageAlts: [
      '버클 파베 펜던트 목걸이 정면'
    ],
  },
  {
    id: 23,
    slug: 'rose-gold-mesh-chain-slider-bracelet',
    category: 'bracelet',
    title: '메시 체인 슬라이더 팔찌',
    titleEn: 'Rose Gold Mesh Chain Slider Bracelet',
    description: '메시 체인과 슬라이더 장식으로 길이를 조절하는 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/BR0101.webp'],
    imageAlts: [
      '메시 체인 슬라이더 팔찌 전체 디자인'
    ],
  },
  {
    id: 24,
    slug: 'flower-motif-rose-gold-jewelry-set',
    category: 'set',
    title: '플라워 모티브 주얼리 세트',
    titleEn: 'Flower Motif Rose Gold Jewelry Set',
    description: '꽃잎 모티브를 맞춘 목걸이·팔찌·반지·귀걸이 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0401.webp'],
    imageAlts: [
      '플라워 모티브 주얼리 세트 전체 구성'
    ],
  },
  {
    id: 25,
    slug: 'circle-link-pave-rose-gold-jewelry-set',
    category: 'set',
    title: '서클 링크 파베 주얼리 세트',
    titleEn: 'Circle Link Pavé Rose Gold Jewelry Set',
    description: '파베 서클과 체인 링크를 조합한 목걸이·팔찌·반지·귀걸이 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0501.webp'],
    imageAlts: [
      '서클 링크 파베 주얼리 세트 전체 구성'
    ],
  },
  {
    id: 26,
    slug: 'lock-chain-gold-jewelry-set',
    category: 'set',
    title: '자물쇠 체인 주얼리 세트',
    titleEn: 'Lock & Chain Gold Jewelry Set',
    description: '자물쇠와 체인 링크 모티브를 맞춘 주얼리 세트입니다.',
    material: '14K Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/set0601.webp'],
    imageAlts: [
      '자물쇠 체인 주얼리 세트 전체 구성'
    ],
  },
  // ── 2026-08 추가 입고 ──────────────────────────────────────────────
  {
    id: 27,
    slug: 'rose-gold-clover-initial-chain-bracelet',
    category: 'bracelet',
    title: '클로버 이니셜 체인 팔찌',
    titleEn: 'Rose Gold Clover Initial Chain Bracelet',
    description: '이니셜을 새긴 클로버 참과 볼 장식을 연결한 체인 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-clover-initial-chain-bracelet-01.webp'],
    imageAlts: [
      '클로버 이니셜 체인 팔찌 전체 디자인'
    ],
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
    title: '물고기 모티브 커플링',
    titleEn: 'Rose Gold Fish Motif Couple Ring',
    description: '물고기 모티브와 밀그레인 라인을 조합한 커플링입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/rose-gold-fish-motif-couple-ring-01.webp'],
    imageAlts: [
      '물고기 모티브 커플링 착용 이미지'
    ],
    specs: [
      { label: '모티브', value: '물고기 · 밀그레인 라인' },
      { label: '세팅', value: '큐빅 파베 · 포인트 스톤' },
    ],
  },
  {
    id: 29,
    slug: 'rose-gold-double-chain-solitaire-bracelet',
    category: 'bracelet',
    title: '더블 체인 원스톤 팔찌',
    titleEn: 'Rose Gold Double Chain Solitaire Bracelet',
    description: '두 겹 체인 위에 원스톤을 올린 가벼운 데일리 팔찌입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-double-chain-solitaire-bracelet-01.webp'],
    imageAlts: [
      '더블 체인 원스톤 팔찌 착용 이미지'
    ],
    specs: [
      { label: '체인', value: '더블 레이어드 체인' },
      { label: '포인트', value: '원스톤 큐빅' },
    ],
  },
  {
    id: 30,
    slug: 'rose-gold-black-onyx-clover-bangle',
    category: 'bracelet',
    title: '블랙 오닉스 클로버 뱅글',
    titleEn: 'Rose Gold Black Onyx Clover Bangle',
    description: '블랙 오닉스 클로버를 얹은 슬림 와이어 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-black-onyx-clover-bangle-01.webp',
      '/Image/bracelet/rose-gold-black-onyx-clover-bangle-02.webp',
    ],
    imageAlts: [
      '블랙 오닉스 클로버 뱅글 정면',
      '블랙 오닉스 클로버 뱅글 착용 이미지'
    ],
    specs: [
      { label: '스톤', value: '블랙 오닉스' },
      { label: '테두리', value: '밀그레인 비딩' },
      { label: '형태', value: '와이어 뱅글' },
    ],
  },
  {
    id: 31,
    slug: 'rose-gold-knot-pave-bangle',
    category: 'bracelet',
    title: '매듭 파베 뱅글',
    titleEn: 'Rose Gold Knot Pave Bangle',
    description: '매듭 모티브를 파베 라인으로 감싼 슬림 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/rose-gold-knot-pave-bangle-01.webp'],
    imageAlts: [
      '매듭 파베 뱅글 정면'
    ],
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
    description: '두 가지 골드 색상을 조합한 텐션 세팅 솔리테어 커플링입니다.',
    material: '14K Rose / Yellow Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/two-tone-tension-solitaire-couple-ring-01.webp'],
    imageAlts: [
      '투톤 텐션 솔리테어 커플링 정면'
    ],
    specs: [
      { label: '세팅', value: '4프롱 텐션 세팅' },
      { label: '밴드', value: '플랫 밴드' },
      { label: '색상 조합', value: '선택 색상 두 가지 조합' },
    ],
  },
  {
    id: 33,
    slug: 'rose-gold-heart-pave-eternity-ring',
    category: 'ring',
    title: '하트 파베 에타니티 반지',
    titleEn: 'Heart & Pave Eternity Ring',
    description: '하트 라인과 파베 라인 두 가지 디자인으로 고르는 에타니티 반지입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/ring/rose-gold-heart-pave-eternity-ring-01.webp'],
    imageAlts: [
      '하트 파베 에타니티 반지 두 가지 디자인'
    ],
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
    title: 'X 모티브 파베 뱅글',
    titleEn: 'Rose Gold Cross Pave Bangle',
    description: 'X자로 교차한 파베 포인트가 중심을 잡는 슬림 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-cross-pave-bangle-01.webp',
      '/Image/bracelet/rose-gold-cross-pave-bangle-02.webp',
    ],
    imageAlts: [
      'X 모티브 파베 뱅글 정면',
      'X 모티브 파베 뱅글 착용 이미지'
    ],
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
    title: '청키 체인 파베 토글 목걸이',
    titleEn: 'Rose Gold Chunky Chain Pave Lock Necklace',
    description: '두툼한 오벌 체인에 파베 토글 잠금 장식을 더한 목걸이입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/necklace/rose-gold-chunky-chain-pave-lock-necklace-01.webp',
      '/Image/necklace/rose-gold-chunky-chain-pave-lock-necklace-02.webp',
    ],
    imageAlts: [
      '청키 체인 파베 토글 목걸이 정면',
      '청키 체인 파베 토글 목걸이 착용 이미지'
    ],
    specs: [
      { label: '체인', value: '오벌 링크 청키 체인' },
      { label: '포인트', value: '파베 토글 클래스프' },
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
      '팬시 옐로우 다이아몬드 쿠션 컷 솔리테어 반지 정면'
    ],
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
    title: '자개 컴퍼스 스타 뱅글',
    titleEn: 'Rose Gold Compass Star Bangle',
    description: '자개 바탕에 팔각별 메달을 얹은 슬림 뱅글입니다.',
    material: '14K Rose Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: [
      '/Image/bracelet/rose-gold-compass-star-bangle-01.webp',
      '/Image/bracelet/rose-gold-compass-star-bangle-02.webp',
    ],
    imageAlts: [
      '자개 컴퍼스 스타 뱅글 정면',
      '자개 컴퍼스 스타 뱅글 착용 이미지'
    ],
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
    title: '파베 링크 체인 목걸이·팔찌 세트',
    titleEn: 'Rose Gold Chain Necklace & Bracelet Set',
    description: '볼 장식과 파베 링크를 맞춘 체인 목걸이·팔찌 세트입니다.',
    material: '14K Rose Gold',
    workType: '맞춤 제작',
    delivery: '상담 후 결정',
    images: ['/Image/set/rose-gold-chain-necklace-bracelet-set-01.webp'],
    imageAlts: [
      '파베 링크 체인 목걸이·팔찌 세트 전체 구성'
    ],
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
      '투톤 래티스 텐션 커플링 정면과 안쪽 격자 세공'
    ],
    specs: [
      { label: '세팅', value: '4프롱 텐션 세팅' },
      { label: '이너 밴드', value: '격자 타공 · 로프 텍스처' },
      { label: '마감', value: '유광 · 무광 콤비 마감' },
    ],
  },
  {
    id: 40,
    slug: 'white-gold-pave-rondelle-pendant-necklace',
    category: 'necklace',
    title: '파베 롱델 펜던트 목걸이',
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
      '파베 롱델 펜던트 목걸이 정면',
      '파베 롱델 펜던트 목걸이 착용 이미지'
    ],
    specs: [
      { label: '펜던트', value: '파베 롱델(배럴)' },
      { label: '체인', value: '슬림 케이블 체인' },
    ],
  },
  {
    id: 41,
    slug: 'gold-layered-chain-bracelet-trio',
    category: 'bracelet',
    title: '레이어드 체인 팔찌 3종',
    titleEn: 'Gold Layered Chain Bracelet Trio',
    description: '이니셜·로프·스테이션 체인을 단독 또는 겹쳐 연출하는 팔찌 3종입니다.',
    material: '14K Gold',
    workType: '주문제작 가능',
    delivery: '1~2주',
    images: ['/Image/bracelet/gold-layered-chain-bracelet-trio-01.webp'],
    imageAlts: [
      '레이어드 체인 팔찌 3종 착용 이미지'
    ],
    specs: [
      { label: '구성', value: '이니셜 체인 · 로프 체인 · 스테이션 체인' },
      { label: '연출', value: '단독 · 레이어드 모두 가능' },
      { label: '판매', value: '낱개 구매 가능' },
    ],
  },
]

// 갤러리 공통 기준: 대부분의 디자인은 14K·18K, 세 가지 골드 색상으로 주문제작하며 제작 기간은 최소 2주다.
// 소스의 material은 촬영된 샘플의 사양이므로 '사진 제품 기준'으로 노출하고, 주문 옵션은 공통 기준으로 표기한다.
// 순금·다이아몬드처럼 소재가 명시된 예외 제품(material이 '14K'로 시작하지 않음)은 소스 값을 그대로 쓰고 색상 옵션을 걸지 않는다.
const SAMPLE_MATERIAL_LABELS: Record<string, string> = {
  '14K Rose Gold': '14K 로즈골드',
  '14K White Gold': '14K 화이트골드',
  '14K Gold': '14K 옐로우골드',
  '14K White / Rose / Gold': '14K 화이트·로즈·옐로우골드',
  '14K Yellow / Rose / White Gold': '14K 옐로우·로즈·화이트골드',
  '14K Rose / White Gold': '14K 로즈·화이트골드',
  '14K Rose / Yellow Gold': '14K 로즈·옐로우골드',
  '14K Yellow / Rose Gold': '14K 옐로우·로즈골드',
  '14K Gold / Rose Gold': '14K 옐로우·로즈골드',
}

export const galleryItems: GalleryItem[] = galleryItemSource.map((item) => {
  if (!item.material.startsWith('14K')) {
    return {
      ...item,
      colorOptions: [],
      delivery: galleryProductDefaults.delivery,
    }
  }
  const sampleLabel = SAMPLE_MATERIAL_LABELS[item.material] ?? item.material
  return {
    ...item,
    material: galleryProductDefaults.material,
    colorOptions: [...galleryProductDefaults.colorOptions],
    workType: galleryProductDefaults.workType,
    delivery: galleryProductDefaults.delivery,
    specs: [{ label: '사진 제품 기준', value: sampleLabel }, ...(item.specs ?? [])],
  }
})

export const categories: Category[] = [
  {
    id: 'ring',
    label: '반지',
    labelEn: 'Rings',
    description: '커플링, 웨딩밴드, 돌·백일 반지 등 다양한 반지 디자인을 주문제작합니다. 색상과 소재 세부 사양은 상담으로 안내합니다.'
  },
  {
    id: 'necklace',
    label: '목걸이',
    labelEn: 'Necklaces',
    description: '체인, 펜던트, 비즈 목걸이 등 다양한 디자인을 세 가지 골드 색상으로 주문제작합니다.'
  },
  {
    id: 'bracelet',
    label: '팔찌',
    labelEn: 'Bracelets',
    description: '뱅글, 체인, 레이어드 팔찌 등 다양한 디자인을 세 가지 골드 색상으로 주문제작합니다.'
  },
  {
    id: 'earring',
    label: '귀걸이',
    labelEn: 'Earrings',
    description: '진주, 스터드, 드롭 귀걸이 등 다양한 디자인과 착용 방식을 상담해 주문제작할 수 있습니다.'
  },
  {
    id: 'set',
    label: '세트',
    labelEn: 'Sets',
    description: '목걸이·팔찌·반지·귀걸이를 함께 맞춘 주얼리 세트로, 원하는 구성과 색상을 상담해 주문제작합니다.'
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
