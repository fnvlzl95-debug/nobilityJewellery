import { siteConfig } from '~/config/site'

export interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
}

export const faqCategories = [
  { id: 'general', name: '일반' },
  { id: 'baby-gold', name: '돌반지' },
  { id: 'couple-ring', name: '커플링' },
  { id: 'wedding', name: '결혼예물' },
  { id: 'buy-gold', name: '매입' },
  { id: 'repair', name: '수리/AS' }
]

export const faqItems: FAQItem[] = [
  // 일반
  {
    id: 1,
    category: 'general',
    question: '주문 방법이 어떻게 되나요?',
    answer: '전화 주문 또는 매장 방문을 통해 주문하실 수 있습니다. 전화로 상담 후 방문하시면 더욱 빠른 상담이 가능합니다.'
  },
  {
    id: 2,
    category: 'general',
    question: '지방이나 해외 배송이 가능한가요?',
    answer: '지방 배송은 가능합니다. 단, 해외 배송은 현재 지원하지 않습니다.'
  },
  {
    id: 3,
    category: 'general',
    question: '매장 운영 시간이 어떻게 되나요?',
    answer: `${siteConfig.hours.display} 운영합니다.`
  },
  {
    id: 4,
    category: 'general',
    question: '품질보증서가 제공되나요?',
    answer: '네, 모든 제품에 품질보증서가 제공됩니다. 14K, 18K, 24K 등 소재별 보증서가 함께 제공되며, 보증서는 A/S 시 필요하오니 잘 보관해 주세요.'
  },
  {
    id: 5,
    category: 'general',
    question: '주차는 어디에 하나요?',
    answer: '근처 종묘 지하 주차장 이용 또는 세운스퀘어 주차장 이용하시면 됩니다. 자세한 문의는 방문 전 전화 부탁드립니다.'
  },
  {
    id: 6,
    category: 'general',
    question: '금반지 도매 최소 주문 수량이 있나요?',
    answer: '최소 주문 수량은 없습니다. 소량 도매도 가능하며, 대량 주문 시 추가 할인이 적용됩니다. 자세한 가격은 전화 또는 방문 상담 시 안내해드립니다.'
  },

  // 돌반지
  {
    id: 10,
    category: 'baby-gold',
    question: '돌반지 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 돌반지, 백일반지, 아기반지 모두 주문제작 가능합니다. 디자인, 무게, 각인 내용 등을 상담 후 결정합니다.'
  },
  {
    id: 11,
    category: 'baby-gold',
    question: '순금 돌반지는 어떤 종류가 있나요?',
    answer: '24K 순금 돌반지, 돌잔치 반지, 백일반지 등 다양한 디자인이 있습니다. 띠별 아기반지(용띠, 뱀띠, 말띠 등)도 주문제작 가능합니다. 종로 도매가로 합리적인 가격에 제공해드립니다.'
  },
  {
    id: 12,
    category: 'baby-gold',
    question: '돌반지 제작 기간은 얼마나 걸리나요?',
    answer: '디자인과 작업 내용에 따라 다르며, 상담 시 일정을 협의합니다. 돌잔치 일정에 맞춰 여유 있게 미리 상담하시는 것을 권장합니다.'
  },
  {
    id: 13,
    category: 'baby-gold',
    question: '돌반지에 아기 이름을 새길 수 있나요?',
    answer: '네, 가능합니다. 아기 이름, 생년월일, 띠 문양 등을 각인할 수 있습니다. 한글, 영문 모두 가능하며, 각인 서비스는 무료로 제공됩니다.'
  },
  {
    id: 14,
    category: 'baby-gold',
    question: '돌반지 사이즈는 어떻게 정하나요?',
    answer: '돌반지는 보통 생후 12개월 기준 6~8호 사이즈로 제작합니다. 백일반지는 4~5호가 일반적입니다. 아기마다 다를 수 있으니 방문 시 정확한 측정을 권장합니다.'
  },

  // 커플링
  {
    id: 20,
    category: 'couple-ring',
    question: '커플링 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 커플링, 우정링, 기념일 반지 등 맞춤 제작이 가능합니다. 디자인, 소재, 각인 내용 등을 상담 후 결정합니다.'
  },
  {
    id: 21,
    category: 'couple-ring',
    question: '커플링 각인은 어떤 것이 가능한가요?',
    answer: '이니셜(예: J ♥ S), 기념일(예: 2024.12.25), 짧은 메시지(예: Forever) 등을 각인할 수 있습니다. 반지 안쪽에 새기며, 각인 서비스는 무료입니다.'
  },
  {
    id: 22,
    category: 'couple-ring',
    question: '커플링 제작 기간은 얼마나 걸리나요?',
    answer: '디자인과 작업 내용에 따라 다르며, 상담 시 일정을 협의합니다. 기념일에 맞춰 여유 있게 미리 상담하시는 것을 권장합니다.'
  },
  {
    id: 23,
    category: 'couple-ring',
    question: '커플링 소재는 어떤 것을 선택할 수 있나요?',
    answer: '14K, 18K 골드를 기본으로 화이트골드, 로즈골드, 옐로우골드 중 선택 가능합니다. 두 분이 서로 다른 색상을 선택하셔도 됩니다. 소재별 가격은 상담 시 안내해드립니다.'
  },

  // 결혼예물
  {
    id: 30,
    category: 'wedding',
    question: '결혼예물 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 결혼반지, 예물 세트, 시댁/처가 예물 등 맞춤 제작이 가능합니다. 예산과 스타일에 맞게 구성해드립니다.'
  },
  {
    id: 31,
    category: 'wedding',
    question: '예물 세트는 어떻게 구성되나요?',
    answer: '신부 예물(반지, 목걸이, 귀걸이), 신랑 예물(반지, 커프스, 타이핀), 시댁/처가 예물(어머니 반지, 목걸이) 등으로 구성됩니다. 예산에 맞춰 필요한 품목만 선택하셔도 됩니다.'
  },
  {
    id: 32,
    category: 'wedding',
    question: '결혼예물 제작 기간은 얼마나 걸리나요?',
    answer: '세트 구성과 디자인에 따라 다르며, 상담 시 일정을 협의합니다. 결혼식 2~3개월 전에 상담하시는 것을 권장합니다.'
  },
  {
    id: 33,
    category: 'wedding',
    question: '예물 예산은 어느 정도 잡아야 하나요?',
    answer: '예산은 소재, 디자인, 구성 품목에 따라 달라집니다. 방문 상담 시 예산에 맞는 최적의 구성을 제안해드립니다. 종로 도매가로 합리적인 가격에 제공됩니다.'
  },
  {
    id: 34,
    category: 'wedding',
    question: '시댁/처가 예물은 따로 준비해야 하나요?',
    answer: '양가 어르신께 드리는 예물은 선택사항입니다. 준비하시는 경우 어머니 반지, 목걸이, 아버지 반지 등을 많이 선택하십니다. 함께 구매 시 세트 할인이 적용됩니다.'
  },

  // 매입
  {
    id: 50,
    category: 'buy-gold',
    question: '금 매입은 어떻게 진행되나요?',
    answer: '매입을 원하시는 귀금속을 가지고 매장에 방문해주시면 됩니다. 순도 감정 및 계량 후 당일 시세를 적용하여 즉시 현금으로 지급해드립니다.'
  },
  {
    id: 51,
    category: 'buy-gold',
    question: '어떤 귀금속을 매입하나요?',
    answer: '순금(24K), 18K, 14K, 10K 금, 은, 백금 등 모든 귀금속을 매입합니다. 반지, 목걸이, 팔찌, 귀걸이 등 장신구는 물론 골드바, 금괴, 금니, 부서지거나 변형된 귀금속도 매입 가능합니다.'
  },
  {
    id: 53,
    category: 'buy-gold',
    question: '전화로 매입 시세를 알 수 있나요?',
    answer: '네, 전화 문의 시 당일 기준 대략적인 시세를 안내해드릴 수 있습니다. 단, 정확한 매입가는 실물 감정 후 확정됩니다.'
  },

  // 수리/AS
  {
    id: 40,
    category: 'repair',
    question: 'A/S는 어떻게 받을 수 있나요?',
    answer: '구매하신 제품은 매장 방문을 통해 A/S 받으실 수 있습니다. 수리 내용에 따라 소요 시간과 비용이 다를 수 있으니 방문 전 전화 상담을 권장합니다.'
  },
  {
    id: 41,
    category: 'repair',
    question: '반지 사이즈 조절이 가능한가요?',
    answer: '네, 가능합니다. 14K, 18K 골드 반지의 사이즈 늘리기, 줄이기 모두 가능합니다. 반지 종류에 따라 작업 시간이 다를 수 있으니 방문 전 전화 상담을 권장합니다.'
  },
  {
    id: 42,
    category: 'repair',
    question: '귀금속 수리는 어떤 것이 가능한가요?',
    answer: '반지 사이즈 조절, 끊어진 목걸이·팔찌 수리, 귀걸이 침 교체, 금 세척, 광택 작업 등 다양한 귀금속 수리가 가능합니다. 수리 비용은 상태에 따라 다르니 방문 상담을 권장합니다.'
  },
  {
    id: 43,
    category: 'repair',
    question: '다른 곳에서 구매한 제품도 수리 가능한가요?',
    answer: '네, 가능합니다. 타 매장에서 구매하신 제품도 수리해드립니다. 단, 제품 상태에 따라 수리가 어려운 경우도 있으니 방문 전 전화 상담을 권장합니다.'
  }
]

// FAQ Schema.org 생성 함수
export const generateFAQSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

// 카테고리별 FAQ 필터링 함수
export const getFAQsByCategory = (categoryId: string) => {
  if (categoryId === 'all') return faqItems
  return faqItems.filter(item => item.category === categoryId)
}
