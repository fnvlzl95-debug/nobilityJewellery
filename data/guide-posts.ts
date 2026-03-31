export interface GuidePostSummary {
  slug: string
  path: string
  title: string
  description: string
  keyword: string
  image: string
  publishedAt: string
  category: '가격' | '비용' | '기간'
}

export const guidePosts: GuidePostSummary[] = [
  {
    slug: 'baby-ring-engraving-cost',
    path: '/guide/baby-ring-engraving-cost',
    title: '돌반지 각인 비용, 추가금이 생기는 경우는?',
    description: '글자 수, 각인 위치, 주문제작 여부에 따라 비용이 달라져요. 상담 전에 확인할 포인트를 정리했습니다.',
    keyword: '돌반지 각인 비용',
    image: '/Image/ring/SB0103.webp',
    publishedAt: '2026-03-28',
    category: '비용',
  },
  {
    slug: 'mother-necklace-production-time',
    path: '/guide/mother-necklace-production-time',
    title: '어머니 목걸이 제작 기간, 선물 날짜 맞추려면',
    description: '디자인, 길이, 펜던트 구성, 재고 여부에 따라 기간이 달라져요. 일정 맞추는 방법을 정리했습니다.',
    keyword: '어머니 목걸이 제작 기간',
    image: '/Image/necklace/NC0201.webp',
    publishedAt: '2026-03-28',
    category: '기간',
  },
  {
    slug: 'silver-ring-repair-cost',
    path: '/guide/silver-ring-repair-cost',
    title: '은반지 수리 비용, 변색·찌그러짐·사이즈별 기준',
    description: '광택, 형태 복원, 사이즈 조절, 땜 여부에 따라 비용이 달라져요. 맡기기 전 확인할 내용을 모았습니다.',
    keyword: '은반지 수리 비용',
    image: '/Image/ring/NN0401.webp',
    publishedAt: '2026-03-28',
    category: '비용',
  },
  {
    slug: 'baby-ring-price',
    path: '/guide/baby-ring-price',
    title: '돌반지 가격 문의 전에 꼭 확인할 3가지',
    description: '순금 시세, 중량, 각인에 따라 가격이 달라져요. 상담 전에 미리 알아두면 좋은 것들을 정리했습니다.',
    keyword: '돌반지 가격 문의',
    image: '/Image/ring/SB0101.webp',
    publishedAt: '2026-02-14',
    category: '가격',
  },
  {
    slug: 'silver-buying',
    path: '/guide/silver-buying',
    title: '은매입 가격은 어떻게 정해질까? 방문 전 체크리스트',
    description: '순도, 중량, 당일 시세로 매입가가 정해져요. 방문 전에 챙기면 좋은 것들을 알려드립니다.',
    keyword: '은매입',
    image: '/Image/ring/NN0801.webp',
    publishedAt: '2026-02-14',
    category: '비용',
  },
  {
    slug: 'mother-necklace-price',
    path: '/guide/mother-necklace-price',
    title: '어머니 금목걸이, 예산별 선택 방법',
    description: '소재, 중량, 체인·펜던트 구성에 따라 가격이 달라져요. 예산에 맞게 고르는 방법을 알려드립니다.',
    keyword: '어머니 금목걸이 가격',
    image: '/Image/necklace/pexels-pixabay-248077.webp',
    publishedAt: '2026-02-14',
    category: '가격',
  },
  {
    slug: 'gold-ring-repair-cost',
    path: '/guide/gold-ring-repair-cost',
    title: '금반지 수리 비용: 작업별로 달라지는 기준',
    description: '사이즈 조절, 땜, 재세팅 등 작업에 따라 비용이 달라져요. 맡기기 전에 확인해두면 좋은 점을 정리했습니다.',
    keyword: '금반지 수리 비용',
    image: '/Image/ring/pexels-leah-newhouse-50725-691046.webp',
    publishedAt: '2026-02-14',
    category: '비용',
  },
  {
    slug: 'baby-ring-production-time',
    path: '/guide/baby-ring-production-time',
    title: '돌반지 주문제작 기간, 일정 맞추는 가장 확실한 방법',
    description: '디자인과 각인에 따라 제작 기간이 달라져요. 돌잔치 일정에 맞추려면 이렇게 준비하세요.',
    keyword: '돌반지 주문제작 기간',
    image: '/Image/ring/SB0102.webp',
    publishedAt: '2026-02-14',
    category: '기간',
  },
  {
    slug: 'gold-one-don-gram',
    path: '/guide/gold-one-don-gram',
    title: '금 1돈은 몇 g일까? 돌반지·목걸이 볼 때 헷갈리지 않게 정리',
    description: '금 1돈은 3.75g입니다. 하지만 가격은 순도, 공임, 구성까지 함께 봐야 정확해요. 상담 전에 꼭 알아둘 기준을 정리했습니다.',
    keyword: '금 1돈 몇 g',
    image: '/Image/ring/SB0101.webp',
    publishedAt: '2026-03-31',
    category: '가격',
  },
]
