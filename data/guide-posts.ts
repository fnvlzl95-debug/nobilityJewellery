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
]
