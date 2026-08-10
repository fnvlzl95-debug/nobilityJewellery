<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/mother-necklace-price'
const pageTitle = '어머니 금목걸이 가격, 예산별 선택 방법 | 귀족'
const pageDescription = '어머니 금목걸이 가격은 당일 금 시세, 14K·18K, 체인 길이, 펜던트 포함 여부에 따라 달라집니다. 상담 전에 확인할 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/necklace/NC0101.webp`
const publishedAt = '2026-02-14'
const updatedAt = '2026-08-10'
const faqItems = [
  {
    "question": "어머니 금목걸이는 14K와 18K 중 어떤 것이 더 좋은가요?",
    "answer": "한 가지가 모든 경우에 더 좋다고 단정하기 어렵습니다. 14K와 18K는 금 함량이 다르므로 예산과 원하는 색감, 중량, 착용 목적을 함께 비교해야 합니다."
  },
  {
    "question": "어머니 금목걸이 가격을 문의할 때 무엇을 알려야 하나요?",
    "answer": "각인 예시, 중량, 도금 여부, 보석이나 장식 포함 여부, 체인 길이와 펜던트 포함 여부를 알려주면 비교 기준을 맞추는 데 도움이 됩니다."
  },
  {
    "question": "예산을 먼저 말해도 되나요?",
    "answer": "예산 범위를 먼저 알려주면 그 조건에서 비교할 수 있는 순도, 중량, 구성과 디자인 방향을 상담하기 쉽습니다. 실제 가능 구성은 상담 시점의 제품 조건에 따라 확인해야 합니다."
  },
  {
    "question": "금 시세는 언제 기준으로 보나요?",
    "answer": "가격을 계산할 때는 상담 시점의 금 가격과 선택한 중량을 확인하는 것이 일반적입니다. 실제 견적에는 제품 구성과 거래 조건이 함께 반영될 수 있으므로 기준 시점을 문의하세요."
  },
  {
    "question": "체인과 펜던트를 따로 비교해도 되나요?",
    "answer": "체인 단독과 펜던트 포함 구성은 중량과 구성 항목이 달라질 수 있습니다. 두 견적이 같은 조건인지 확인한 뒤 비교해야 합니다."
  }
]

const quickAnswers = [
  "가격은 금 시세, 14K·18K, 중량이 함께 결정합니다.",
  "체인 길이, 굵기, 잠금장치, 펜던트 포함 여부까지 확인해야 비교가 정확해집니다.",
  "예산과 착용 목적, 수령일을 먼저 정하시면 상담 조건을 맞추기 쉽습니다."
]

const sections = [
  {
    "title": "가격을 비교할 때 먼저 확인할 기준",
    "paragraphs": [
      "디자인 이름만으로 어머니 금목걸이 가격이 정해지는 것은 아닙니다. 금 시세를 비롯해 상담 시점, 14K인지 18K인지, 체인 길이와 굵기, 펜던트 포함 여부에 따라 견적 조건이 달라질 수 있습니다.",
      "단순 금목걸이의 금속 가치는 중량과 평가 시점의 금 가격을 기준으로 살펴볼 수 있습니다. 하지만 실제 구매 또는 매입 금액을 확인할 때는 구성과 거래 조건을 따로 확인해야 합니다."
    ],
    "bullets": [
      "금속 순도 표시와 각인 예시 확인",
      "완성 중량과 체인 길이 확인",
      "체인만인지 펜던트가 포함되는지 확인",
      "잠금장치와 연결 부위 사양 확인",
      "상담 날짜의 금 가격 기준인지 확인"
    ]
  },
  {
    "title": "14K와 18K를 같은 가격 기준으로 보면 안 되는 이유",
    "paragraphs": [
      "24분의 18이 금인 18K와 24분의 14가 금인 14K는 순도가 서로 다릅니다. 같은 중량으로 비교하더라도 순도에 따라 금속 가치가 달라질 수 있습니다.",
      "전체가 같은 순도의 금으로 된 목걸이를 판단할 때는 도금이나 골드 필드 제품, 속이 빈 제품과 구별해야 합니다. 각인이나 외관만으로 가격을 단정하기보다 소재와 구조를 함께 확인하는 편이 안전합니다."
    ],
    "bullets": [
      "14K와 18K의 순도 표시를 구분하기",
      "도금 여부와 골드 필드 여부 확인하기",
      "속이 빈 구조인지 확인하기",
      "중량과 소재 표시가 견적서에 함께 적히는지 확인하기"
    ],
    "image": {
      "src": "/Image/guide/mother-necklace-price-section-2.webp",
      "alt": "14K와 18K를 같은 가격 기준으로 보면 안 되는 이유 예시 이미지",
      "caption": "14K와 18K를 같은 가격 기준으로 보면 안 되는 이유에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "예산을 정할 때 함께 말하면 좋은 조건",
    "paragraphs": [
      "특정 디자인을 처음부터 고르기보다 예산 범위와 착용 목적을 먼저 알려주면, 가능한 구성과 비교 기준을 좁히기 쉽습니다. 사업자별 재고와 제작 조건은 상담 시점에 별도로 확인해야 합니다.",
      "비교할 항목은 평소 착용용인지 특별한 날을 위한 선물인지에 따라 달라질 수 있습니다. 체인만 필요한지, 펜던트까지 필요한지도 함께 살펴봐야 합니다."
    ],
    "bullets": [
      "희망 예산 범위",
      "평소 착용인지 선물용인지",
      "14K 또는 18K 중 우선순위",
      "체인 길이와 굵기",
      "펜던트 포함 여부",
      "희망 수령일"
    ]
  },
  {
    "title": "견적 문의 전에 준비할 정보",
    "paragraphs": [
      "목걸이의 현재 가격을 계산하려면 각인 예시와 중량을 확인해야 하며, 도금 여부와 보석이나 장식 포함 여부도 필요합니다. 사진이 있다면 각인뿐 아니라 전체 형태까지 함께 확인할 수 있도록 준비하는 것이 좋습니다.",
      "다른 견적과 금액을 비교하기 전에 순도와 중량, 구성, 시세 기준이 같은지 먼저 맞춰야 합니다. 금액만 비교하면 조건이 서로 다른 견적을 비교하게 될 수 있습니다."
    ],
    "bullets": [
      "각인 예시: 14K·18K·750 등",
      "중량 단위와 수치",
      "도금 또는 골드 필드 여부",
      "보석과 장식 포함 여부",
      "체인과 펜던트의 포함 범위",
      "공임과 별도 구성 항목의 표시 여부"
    ],
    "image": {
      "src": "/Image/guide/mother-necklace-price-section-4.webp",
      "alt": "금목걸이 견적 비교에 필요한 정보를 정리한 상담 장면",
      "caption": "견적 문의 전에 준비할 정보에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "선물용 금목걸이의 착용 조건도 확인하기",
    "paragraphs": [
      "실제 착용에 필요한 조건을 살피려면 가격 외에도 어머니가 평소 자주 착용하는지를 확인해야 합니다. 선호하는 길이와 분위기, 잠금장치를 사용하기 편한지도 함께 살펴보는 것이 좋습니다.",
      "사업자와 제품 조건에 따라 세척이나 수리 같은 사후 안내를 받을 수 있는지가 달라질 수 있습니다. 따라서 상담할 때 해당 내용을 별도로 확인해야 합니다."
    ],
    "bullets": [
      "평소 옷차림과 어울리는 길이",
      "체인 굵기와 착용감",
      "잠금장치의 사용 편의성",
      "피부 민감도와 소재 확인",
      "세척 및 수리 안내의 범위"
    ]
  }
]

const cautions = [
  "오래된 가격표만으로 현재 금목걸이 가격을 단정하지 말고 상담 시점의 기준을 확인하세요.",
  "펜던트 포함 여부, 중량, 순도, 도금 여부가 다르면 가격을 직접 비교하기 어렵습니다.",
  "속이 빈 제품이나 도금 제품은 전체가 같은 순도의 금으로 된 제품과 구별해 확인하세요.",
  "재고, 제작 기간, 수리 가능 여부와 비용은 사업자와 제품 상태에 따라 달라질 수 있으므로 상담 전에 확인하세요."
]

const relatedLinks = [
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "남자·여자 목걸이 길이 추천: 42·45·50cm 비교",
    "description": "체형, 펜던트 크기와 체인 굵기를 고려한 금목걸이 길이 기준을 확인해 보세요."
  },
  {
    "to": "/guide/gold-necklace-repair-time",
    "label": "금목걸이 수리 기간, 맡기기 전에 꼭 확인할 것",
    "description": "끊어짐이나 잠금장치 문제 상담 전에 확인할 조건을 정리했습니다."
  },
  {
    "to": "/guide/baby-ring-price",
    "label": "돌반지 가격 문의 전에 꼭 확인할 3가지",
    "description": "순도와 중량, 상담 시점의 금 가격을 기준으로 가격을 비교하는 방법을 확인해 보세요."
  }
]

// guide-manager:data:start
const gmArticleTitle = '어머니 금목걸이 가격, 예산별 선택 방법'
const gmArticleLead = '어머니께 드릴 금목걸이 가격을 비교하려면 고정 금액 하나만 보기보다 상담 시점의 금 시세와 금속 순도, 체인 중량, 길이, 펜던트 포함 여부를 함께 확인해야 정확합니다. 먼저 예산과 착용 목적을 정리해 두면 상담 조건을 맞추기 쉽습니다.'
const gmArticleCategory = '가격'
const gmArticleKeyword = '어머니 금목걸이 가격'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '어머니 금목걸이 가격'
const gmHeroAlt = '어머니께 선물할 금목걸이 상담 이미지'
const gmSourceNote = '금의 순도 표시와 금속 함량, 도금 및 골드 필드 구분, 중량과 금 가격을 기준으로 한 비교 원칙은 미국 연방거래위원회 자료를 참고했습니다. 국내 판매가와 개별 사업자의 재고, 제작 기간, 수리 조건은 확인된 사업자 제공 사실이 없어 이 글에서 단정하지 않습니다.'
const gmSources = [
  {
    "label": "Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "미국 연방거래위원회가 금의 캐럿 표시, 순금 함량, 도금과 골드 필드 등의 구분을 설명합니다."
  },
  {
    "label": "Glittering Gifts: Getting What You Bargained For",
    "url": "https://www.ftc.gov/news-events/news/press-releases/1998/02/glittering-gifts-getting-what-you-bargained",
    "note": "단순 금 장신구는 중량과 금 가격을 기준으로 비교할 수 있다고 안내합니다."
  },
  {
    "label": "Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속의 종류, 품질, 금속 함량, 중량, 가격과 가치가 정확히 표시되어야 한다는 공식 지침을 제공합니다."
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
        { name: '어머니 금목걸이 가격', path: pagePath },
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
        dateModified: updatedAt,
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
