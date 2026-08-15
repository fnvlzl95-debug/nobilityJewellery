<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-price-how-to-check'
const pageTitle = '금 시세 보는 법: 고시가와 살 때·팔 때 가격 확인 기준 | 귀족'
const pageDescription = '금 시세는 어디서 확인하고, 왜 실제 구매·매입 금액과 다른지 정리했습니다. 거래 전에는 당일 기준 시세, 순도·중량, 공임과 세금 포함 여부를 함께 확인하세요.'
const ogImage = `${siteConfig.url}/Image/guide/gold-price-how-to-check-hero.webp`
const publishedAt = '2026-06-03'
const faqItems = [
  {
    "question": "공개 금 시세를 그대로 적용해 제품을 살 수 있나요?",
    "answer": "공개 시세는 비교 기준입니다. 실제 제품은 순도·중량, 공임, 세금 포함 여부와 거래처의 당일 조건을 함께 확인해야 최종 금액을 알 수 있습니다."
  },
  {
    "question": "국제 금 현물 가격과 국내에서 보는 금 시세가 다른 이유는 무엇인가요?",
    "answer": "표시 통화와 중량 단위가 다를 수 있고, 환율로 환산되는 과정이 있기 때문입니다. 인도 시점·순도·바 크기·인도 장소가 다른 금에는 현물 가격과 다른 조건이 적용될 수도 있습니다."
  },
  {
    "question": "금을 팔 때는 무엇을 먼저 확인해야 하나요?",
    "answer": "제품 구매가보다 순도와 중량, 그리고 거래처의 당일 매입 기준을 먼저 확인하세요. 실제 조건은 제품 확인 결과와 상담 시점에 따라 달라질 수 있습니다."
  },
  {
    "question": "견적을 받을 때 어떤 질문을 해야 하나요?",
    "answer": "기준 시각, 순도와 중량 확인 방법, 공임과 세금 포함 여부, 매입 계산 기준을 한 번에 물어보세요."
  }
]

const updatedAt = '2026-08-15'
const quickAnswers = [
  "금 시세는 공개 값을 흐름 파악에 활용하되, 실제 거래 금액은 해당 거래처의 당일 기준을 확인해야 합니다.",
  "고시 시세가 제품의 최종 결제 금액과 같지는 않습니다. 순도·중량과 공임, 세금 포함 여부를 함께 확인하세요.",
  "금을 팔 때는 제품 구매가보다 순도와 중량을 기준으로 한 당일 매입 조건을 먼저 확인하는 편이 좋습니다."
]

const sections = [
  {
    "title": "금 시세는 어디서, 어떻게 볼까",
    "paragraphs": [
      "실제 거래에서 확인해야 하는 것은 거래처가 안내하는 당일 기준이며, 공개 시세는 흐름을 비교하는 기준으로 활용됩니다. 금 가격을 확인할 때에는 표시 통화와 중량 단위를 함께 살펴봐야 하고, 다른 통화로 표시된 가격은 환율을 사용해 환산될 수 있습니다.",
      "표준 현물 가격을 확인할 때 국제 금 현물 가격이 기준으로 쓰입니다. 공개 값을 서로 비교하려면 가격의 기준 시각과 단위를 먼저 맞춰야 하므로, 다른 숫자를 혼동하기 어렵습니다."
    ],
    "bullets": [
      "표시 통화가 원화인지 다른 통화인지 확인하세요.",
      "중량 단위가 그램인지 온스인지, 또는 돈인지 확인하세요.",
      "공개 시세와 실제 거래처의 당일 기준이 같은 조건인지 비교하세요."
    ]
  },
  {
    "title": "고시 시세가 실제 결제 금액과 같은가요",
    "paragraphs": [
      "고시 시세는 비교 기준으로 활용되지만, 실제 결제·매입 금액은 제품 조건과 거래 조건에 따라 달라질 수 있습니다. 국제 현물 가격에는 인도 시점·순도·바 크기·인도 장소가 다른 금의 경우 프리미엄 또는 할인이 붙을 수 있습니다.",
      "제품 견적을 받을 때에는 기준 시각과 순도·중량을 먼저 확인하고, 공임과 세금 포함 여부도 함께 살펴봐야 합니다. 세금이나 비용이 구체적으로 적용되는 내용은 거래처가 제시하는 견적서와 안내 내용을 기준으로 확인하는 것이 안전합니다."
    ],
    "bullets": [
      "순도와 중량이 어떤 방식으로 확인되는지 물어보세요.",
      "공임이 포함된 금액인지 별도인지 확인하세요.",
      "세금 포함 여부와 견적 기준 시각을 확인하세요.",
      "14K·18K·24K 표기만 보지 말고 제품 각인과 거래 문서를 함께 확인하세요."
    ],
    "image": {
      "src": "/Image/guide/gold-price-how-to-check-section-2.webp",
      "alt": "금 제품의 순도와 중량을 확인하는 장면",
      "caption": "고시 시세가 실제 결제 금액과 같은가요에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "살 때와 팔 때 각각 확인할 것",
    "paragraphs": [
      "제품을 살 때는 공임과 세금 포함 여부가 순도·중량에 어떻게 반영되는지 확인해야 합니다. 고시 시세만 확인해서는 최종 결제 금액을 단정하기 어렵습니다.",
      "팔 때는 제품 구매가보다 순도와 중량을 기준으로 정해지는 당일 매입 조건을 먼저 확인하는 편이 좋습니다. 거래처와 제품 상태, 확인된 순도와 중량에 따라 매입 조건이 상담 시 달라질 수 있으므로 사전에 계산 기준을 문의해야 합니다."
    ],
    "bullets": [
      "구매 전에는 최종 결제 금액의 구성 항목을 확인하세요.",
      "매입 전에는 순도와 중량을 어떻게 확인하는지 물어보세요.",
      "매입 기준 시각과 적용 조건을 확인하세요.",
      "자석 반응만으로 금의 진위를 판단하지 말고 필요한 확인 방법을 상담하세요."
    ]
  },
  {
    "title": "거래 전 30초 확인 목록",
    "paragraphs": [
      "공개 시세와 실제 견적의 차이를 줄이려면 아래 질문을 순서대로 확인하면 도움이 됩니다. 숫자 하나만 비교하지 말고, 같은 기준으로 제시된 견적에 해당하는지 살펴보아야 합니다."
    ],
    "bullets": [
      "기준 시각은 언제인가요?",
      "순도와 중량은 어떻게 확인하나요?",
      "공임과 세금은 포함된 금액인가요?",
      "매입은 어떤 당일 기준으로 계산하나요?"
    ],
    "image": {
      "src": "/Image/guide/gold-price-how-to-check-section-4.webp",
      "alt": "거래 전 30초 확인 목록 예시 이미지",
      "caption": "거래 전 30초 확인 목록에서 확인할 부분을 보여주는 이미지입니다."
    }
  }
]

const cautions = [
  "금 시세와 거래처의 기준은 시점과 조건에 따라 달라질 수 있으므로, 상담 시 안내받은 금액은 거래 전에 다시 확인하세요.",
  "공개 시세만으로 특정 제품의 최종 구매 금액이나 매입 금액, 매입 가능 여부를 단정하지 마세요.",
  "순도와 중량이 확인되지 않은 제품은 표시나 간이 시험만으로 거래 조건을 확정하기 어렵습니다."
]

const relatedLinks = [
  {
    "to": "/guide/yellow-gold-ring-discoloration-causes",
    "label": "옐로골드 금반지가 검거나 붉게 보이는 원인과 관리 순서",
    "description": "금 제품의 색과 표면 상태를 확인할 때 살펴볼 조건을 정리합니다."
  },
  {
    "to": "/guide/rose-gold-couple-ring-selection-guide",
    "label": "로즈골드 커플링, 피부톤·도금·스크래치·레이어드 확인법",
    "description": "금 제품을 고를 때 색감과 도금 여부를 확인하는 기준을 안내합니다."
  },
  {
    "to": "/guide/baby-ring-price",
    "label": "아기 금반지 가격을 볼 때 중량·순도·공임 확인하기",
    "description": "제품 가격이 공개 시세 외 조건에 따라 달라지는 점을 함께 살펴봅니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '금 시세 보는 법: 고시가와 살 때·팔 때 가격 확인 기준'
const gmArticleLead = '공개 금 시세는 흐름을 비교하는 기준이고, 실제 거래에서는 거래처가 안내하는 당일 기준과 제품 조건을 함께 확인해야 합니다. 국제 가격을 원화나 그램 단위로 확인할 때에는 표시 통화와 중량 단위부터 살펴보는 것이 좋습니다.'
const gmArticleCategory = '가격'
const gmArticleKeyword = '금 시세 보는 법'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '금 시세·구매·매입 상담'
const gmHeroAlt = '금괴와 금 시세를 확인하는 화면'
const gmSourceNote = '국제 금 가격의 표시 단위와 현물 가격 개념은 아래 공식 자료를 참고했습니다. 개별 거래처의 견적과 매입 조건은 거래 전 별도로 확인해야 합니다.'
const gmSources = [
  {
    "label": "LBMA Precious Metals Market Conventions",
    "url": "https://www.lbma.org.uk/publications/the-code/annex-4-precious-metals-market-conventions",
    "note": "국제 귀금속 시장의 가격 표시 단위와 금 가격 호가 관행을 설명하는 공식 표준 자료입니다."
  },
  {
    "label": "LBMA Frequently Asked Questions",
    "url": "https://www.lbma.org.uk/publications/the-otc-guide/frequently-asked-questions",
    "note": "금 현물 가격과 국제 귀금속 시장의 표준 가격 개념을 설명하는 공식 자료입니다."
  },
  {
    "label": "World Gold Council Gold Price Methodology",
    "url": "https://www.gold.org/data/gold-price/methodology",
    "note": "금 가격의 통화·중량 단위 환산과 데이터 표시 방식을 설명하는 국제 보석·금 산업 기관의 공식 자료입니다."
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
        { name: '금 시세 보는 법', path: pagePath },
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
