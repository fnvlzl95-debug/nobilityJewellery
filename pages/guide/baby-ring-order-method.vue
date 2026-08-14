<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/baby-ring-order-method'
const pageTitle = '돌반지 주문 방법｜문의 전 예산·각인·수령일 체크리스트 | 귀족'
const pageDescription = '돌반지 주문 전에는 예산 범위, 원하는 크기감, 각인 문구, 수령 희망일을 먼저 정리하세요. 참고 사진·수령 방식·포장 확인까지 문의 순서대로 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/baby-ring-order-method-hero.webp`
const publishedAt = '2026-03-30'
const faqItems = [
  {
    "question": "돌반지 주문할 때 무게를 정확히 몰라도 되나요?",
    "answer": "네. 정확한 무게를 몰라도 예산 범위와 원하는 크기감을 먼저 알려주면 상담을 시작할 수 있습니다. 가능한 무게와 디자인은 제품 조건과 상담 결과에 따라 확인해야 합니다."
  },
  {
    "question": "사진만 보내도 주문 상담이 가능한가요?",
    "answer": "참고 사진을 보내면 원하는 디자인 방향을 공유하는 데 도움이 됩니다. 다만 순도·함량, 중량, 장식, 각인 조건과 가격은 상담에서 별도로 확인해야 합니다."
  },
  {
    "question": "돌잔치 일정이 가까우면 어떻게 문의해야 하나요?",
    "answer": "문의 첫 문장에 수령 희망일과 방문 또는 택배 수령 희망 여부를 적으세요. 선택 디자인과 주문 시점에 따른 가능 여부와 각인 반영 시점은 상담에서 확인받아야 합니다."
  },
  {
    "question": "각인 문구는 무엇을 준비하면 되나요?",
    "answer": "이름, 날짜, 짧은 문구의 초안을 준비하고 철자와 날짜를 주문 확정 전에 다시 확인하세요. 글자 수와 위치, 비용 조건은 선택한 제품과 상담 내용에 따라 확인해야 합니다."
  }
]

const updatedAt = '2026-08-14'
const quickAnswers = [
  "돌반지 주문 전에는 예산 범위, 원하는 크기감, 각인 문구, 수령 희망일을 먼저 정리하면 상담이 수월합니다.",
  "무게를 정하지 못했으면 예산 범위와 원하는 크기감을 알려주세요. 가능한 선택지는 상담에서 확인합니다.",
  "일정이 촉박하면 문의 첫 문장에 수령 희망일과 방문 또는 택배 수령 희망 여부를 함께 적으세요. 가능 여부는 확인 후 안내받아야 합니다."
]

const sections = [
  {
    "title": "문의 전 30초 체크",
    "paragraphs": [
      "문의 전에 아래 내용을 메모해 두면 디자인과 조건을 비교하기 쉽습니다. 무게를 정확히 알지 못하더라도 예산과 원하는 느낌을 먼저 전달할 수 있습니다."
    ],
    "bullets": [
      "예산: 가능한 범위",
      "크기감: 가볍게 또는 존재감 있게",
      "각인: 이름·날짜·문구 초안",
      "수령: 희망일과 방문 또는 택배 여부",
      "아래 내용을 복사해 문의하세요: 예산 / 원하는 느낌 또는 사진 / 각인 문구 / 수령 희망일 / 수령 방식"
    ]
  },
  {
    "title": "주문 전에 먼저 정할 네 가지",
    "paragraphs": [
      "처음부터 디자인을 완벽하게 정해둘 필요는 없습니다. 상담 시 확인할 조건을 분명하게 하려면 다음 네 가지를 먼저 정리하면 됩니다."
    ],
    "bullets": [
      "예산 범위: 가능한 금액 범위",
      "원하는 무게나 크기감: 가볍게 할지 존재감 있게 할지",
      "각인 여부: 이름, 날짜, 짧은 문구를 넣을지",
      "수령 희망일: 돌잔치나 선물 일정이 언제인지"
    ],
    "image": {
      "src": "/Image/guide/baby-ring-order-method-section-2.webp",
      "alt": "돌반지 주문 전 예산과 각인 조건을 메모하는 모습",
      "caption": "주문 전 네 가지 준비 항목"
    }
  },
  {
    "title": "상담부터 주문 확정까지 순서",
    "paragraphs": [
      "원하는 느낌과 참고 사진을 상담에서 공유하면 예산과 디자인 조건을 좁혀 갈 수 있으며, 각인과 수령 조건도 확인합니다. 제작 또는 준비 진행 여부와 일정은 선택한 디자인과 주문 시점에 따라 달라지므로 상담에서 확인해야 합니다."
    ],
    "bullets": [
      "원하는 스타일이나 참고 사진 공유",
      "예산과 원하는 크기감을 바탕으로 가능한 선택지 확인",
      "각인 문구와 수령 희망일 확인",
      "견적과 주문 조건 확인",
      "주문 확정 후 제작 또는 준비 진행 여부 확인"
    ]
  },
  {
    "title": "실수 줄이는 체크포인트",
    "paragraphs": [
      "주문 확정 전에는 각인과 수령 조건을 다시 확인해야 합니다. 귀금속 제품의 경우 순도 또는 함량, 제품 중량, 디자인과 장식, 가공 관련 표시 등 확인할 정보가 있으므로 주문서나 상담 메시지에 구체적으로 남기는 것이 좋습니다."
    ],
    "bullets": [
      "각인 문구는 철자와 날짜를 주문 확정 전에 다시 확인하세요.",
      "수령 일정, 각인 반영 가능 시점, 방문·택배 가능 여부는 선택 디자인과 주문 시점에 따라 달라질 수 있으므로 상담 시 확인하세요.",
      "케이스·포장 포함 여부는 견적 또는 주문 안내에서 확인하세요.",
      "순도 또는 함량, 제품 중량, 가공국가와 가공지역, 가공업자 정보와 보증기간 및 피해보상 기준을 확인하세요.",
      "각인 문구와 비용 조건을 따로 확인하려면 돌반지 각인 비용, 추가금이 생기는 경우는?를 참고하세요."
    ],
    "image": {
      "src": "/Image/guide/baby-ring-order-method-section-4.webp",
      "alt": "실수 줄이는 체크포인트 예시 이미지",
      "caption": "실수 줄이는 체크포인트에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "자주 묻는 질문",
    "paragraphs": [
      "상담 전에 준비할 정보는 아래 내용으로 정리할 수 있습니다. 다만 실제 가능 여부와 주문 조건은 선택한 제품과 상담 시점에 따라 확인해야 합니다."
    ],
    "bullets": []
  }
]

const cautions = [
  "가격은 상담 시점의 금 시세와 제품의 순도·함량, 실제 중량, 디자인 및 각인 조건에 따라 달라질 수 있으므로 고정 금액으로 판단하지 마세요.",
  "제작 기간, 각인 가능 여부, 방문·택배 수령 가능 여부와 포장 포함 여부는 사업자와 주문 조건 확인 후 안내받으세요.",
  "‘순금’ 또는 24K와 같은 표현은 실제 순도·함량 표시와 함께 확인하고, 금도금이나 금이 아닌 금속이 포함된 제품인지 구분하세요."
]

const relatedLinks = [
  {
    "to": "/guide/baby-ring-engraving-cost",
    "label": "돌반지 각인 비용, 추가금이 생기는 경우는?",
    "description": "각인 문구와 비용 조건을 확인할 때 참고하세요."
  },
  {
    "to": "/guide/baby-ring-price",
    "label": "돌반지 가격 문의 전에 꼭 확인할 3가지",
    "description": "가격 문의 전 순도·중량·디자인 조건을 정리하는 데 도움이 됩니다."
  },
  {
    "to": "/guide/baby-ring-production-time",
    "label": "돌반지 주문제작 기간, 일정 맞추는 가장 확실한 방법",
    "description": "수령 희망일을 정하기 전에 제작 일정 확인 항목을 살펴보세요."
  },
  {
    "to": "/contact",
    "label": "문의하기",
    "description": "예산, 각인, 수령 조건을 정리해 주문 상담을 요청하세요."
  }
]

// guide-manager:data:start
const gmArticleTitle = '돌반지 주문 방법｜문의 전 예산·각인·수령일 체크리스트'
const gmArticleLead = '돌반지 주문을 위해 처음부터 디자인과 무게를 정확히 정해둘 필요는 없습니다. 먼저 예산과 원하는 크기감, 각인 여부, 수령 희망일을 정리하면 상담할 내용을 빠르게 공유할 수 있습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '돌반지 주문 방법'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '돌반지 주문 상담'
const gmHeroAlt = '예산과 각인 문구를 확인하는 돌반지 주문 상담'
const gmSourceNote = '순도·함량과 귀금속 제품 표시 관련 내용은 승인된 정부 고시와 공신력 있는 소비자 안내 자료를 바탕으로 정리했습니다. 귀족의 제작, 각인, 가격, 수령 및 포장 조건은 사업자 제공 사실이 없어 외부 자료로 확정하지 않고 상담 확인 사항으로 안내합니다.'
const gmSources = [
  {
    "label": "중요한 표시·광고사항 고시",
    "url": "https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=2100000267710&chrClsCd=010201",
    "note": "귀금속·보석 제품의 순도·함량, 가공국가·지역, 가공업자 정보, 보증기간 및 피해보상 기준을 확인하는 공정거래위원회 고시입니다."
  },
  {
    "label": "Federal Trade Commission: Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "금의 캐럿 표시와 순금 함량의 의미, 금도금 제품과의 구분을 설명하는 미국 연방거래위원회의 소비자 안내 자료입니다."
  },
  {
    "label": "Federal Trade Commission: Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속 제품의 종류·품질·수량·금속 함량·크기·중량·가격 등을 정확하게 표시해야 한다는 공식 지침입니다."
  }
]
// guide-manager:data:end

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${siteConfig.url}${pagePath}` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteConfig.url}${pagePath}` },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '귀금속 가이드', path: '/guide' },
        { name: '돌반지 주문 방법', path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', name: siteConfig.name },
        publisher: { '@type': 'Organization', name: siteConfig.name },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
})
</script>

<template>
  <GuideArticleView
    :category="gmArticleCategory"
    :keyword="gmArticleKeyword"
    :inquiry-type="gmInquiryType"
    :inquiry-topic="gmInquiryTopic"
    :title="gmArticleTitle"
    :lead="gmArticleLead"
    :published-at="publishedAt"
    :updated-at="updatedAt || undefined"
    :hero-image="ogImage"
    :hero-alt="gmHeroAlt"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
