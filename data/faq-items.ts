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
    answer: '근처 종묘 지하 주차장 이용 또는 세운스퀘어 주차장 이용하시면 됩니다. 자세한 문의는 방문 전 전화 부탁드립니다.'
  },
  {
    id: 7,
    question: '돌반지 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 돌반지, 백일반지, 아기반지 모두 주문제작 가능합니다. 자세한 내용은 문의주시면 성실히 답변드리겠습니다.'
  },
  {
    id: 8,
    question: '예물 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 커플링, 결혼반지, 예물 세트 등 맞춤 제작이 가능합니다. 자세한 내용은 문의주시면 성실히 답변드리겠습니다.'
  },
  {
    id: 9,
    question: '커플링 주문제작이 가능한가요?',
    answer: '네, 가능합니다. 커플링, 우정링, 기념일 반지 등 맞춤 제작이 가능합니다. 자세한 내용은 문의주시면 성실히 답변드리겠습니다.'
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
