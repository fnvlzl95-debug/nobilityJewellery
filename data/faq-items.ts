export interface FAQItem {
  id: number
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: '주문 방법이 어떻게 되나요?',
    answer: '전화 주문 또는 매장 방문을 통해 주문하실 수 있습니다. 전화로 상담 후 방문하시면 더욱 빠른 상담이 가능합니다.'
  },
  {
    id: 2,
    question: '지방이나 해외 배송이 가능한가요?',
    answer: '지방 배송은 가능합니다. 단, 해외 배송은 현재 지원하지 않습니다.'
  },
  {
    id: 3,
    question: 'A/S는 어떻게 받을 수 있나요?',
    answer: '구매하신 제품은 매장 방문을 통해 A/S 받으실 수 있습니다. 수리 내용에 따라 소요 시간과 비용이 다를 수 있으니 방문 전 전화 상담을 권장합니다.'
  },
  {
    id: 4,
    question: '매장 운영 시간이 어떻게 되나요?',
    answer: '평일 및 토요일 오전 10시 ~ 오후 7시까지 운영합니다. 일요일 및 공휴일은 휴무입니다.'
  },
  {
    id: 5,
    question: '품질보증서가 제공되나요?',
    answer: '네, 모든 제품에 품질보증서가 제공됩니다. 14K, 18K, 24K 등 소재별 보증서가 함께 제공되며, 보증서는 A/S 시 필요하오니 잘 보관해 주세요.'
  },
  {
    id: 6,
    question: '주차는 어디에 하나요?',
    answer: '종묘 귀금속백화점 건물 내 주차장을 이용하실 수 있습니다. 주차 공간이 협소할 수 있으니 대중교통 이용을 권장합니다. (지하철 1호선 종로3가역 도보 3분)'
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
