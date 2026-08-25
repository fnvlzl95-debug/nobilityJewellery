<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/wedding-jewelry-set-composition'
const pageTitle = '결혼예물 세트 구성 가이드｜신부·신랑·혼주 예물 준비 기준 | 귀족'
const pageDescription = '결혼예물 세트 구성은 웨딩밴드를 기준으로 신부·신랑·혼주 예물 범위를 정하는 것부터 시작합니다. 다이아 3부·5부, 데일리 주얼리, 상담 전 체크리스트를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/wedding-jewelry-set-box.webp`
const publishedAt = '2026-05-18'

const faqItems = [
  {
    "question": "결혼예물 세트 구성은 어디까지 준비해야 하나요?",
    "answer": "정해진 필수 범위는 없습니다. 웨딩밴드를 기본으로 두고 다이아 반지, 데일리 주얼리, 혼주 예물을 실제 착용 여부와 예산에 따라 더하거나 줄일 수 있습니다."
  },
  {
    "question": "신부 예물은 다이아 반지를 꼭 준비해야 하나요?",
    "answer": "필수는 아닙니다. 웨딩밴드만 준비하거나 다이아 반지를 추가할 수 있으며, 다이아를 고를 때는 4C와 착용 계획을 함께 확인하세요."
  },
  {
    "question": "신랑 예물에 시계를 꼭 포함해야 하나요?",
    "answer": "필수는 아닙니다. 평소 시계 착용 습관을 기준으로 결정하고, 시계를 생략한다면 신랑 웨딩밴드의 폭과 두께, 중량, 마감을 비교할 수 있습니다."
  },
  {
    "question": "혼주 예물은 양가가 같은 구성으로 해야 하나요?",
    "answer": "반드시 같을 필요는 없습니다. 같은 품목으로 맞추거나 양가가 합의한 비슷한 예산 범위에서 품목을 다르게 정할 수 있습니다."
  }
]

const quickAnswers = [
  "결혼예물 세트에 정해진 필수 품목은 없습니다. 먼저 웨딩밴드, 다이아 반지, 혼주 예물 중 꼭 필요한 항목과 예산 상한을 두 분이 정하세요.",
  "신부 예물은 웨딩밴드만 준비하거나 다이아 3부·5부 반지, 데일리 목걸이·귀걸이를 더하는 방식으로 나눠볼 수 있습니다.",
  "혼주 예물은 양가의 예산 범위와 본식 착용 필요 여부를 먼저 합의한 뒤 같은 품목 또는 비슷한 예산대로 조정하세요."
]

const sections = [
  {
    "title": "결혼예물 세트 구성, 먼저 정할 순서",
    "paragraphs": [
      "품목을 한꺼번에 고르기보다는 보다 실제 착용할 반지를 기준으로 결혼예물 세트 구성의 범위를 넓혀 가는 편이 이해하기 쉽습니다. 약혼반지와 결혼반지는 함께 착용할 수도 있고 각각 착용할 수도 있으므로, 먼저 두 반지의 역할과 착용 계획을 확인해야 합니다.",
      "먼저 정할 내용은 웨딩밴드를 기본으로 둘지, 다이아 반지를 추가할지, 혼주 예물을 별도로 준비할지입니다. 여기에 전체 예산 상한과 희망 수령일도 정해야 하며, 구성은 두 분의 착용 빈도와 예산에 따라 달라질 수 있습니다."
    ],
    "bullets": [
      "기본 항목: 웨딩밴드 또는 커플링",
      "추가 검토 항목: 다이아 반지, 목걸이, 귀걸이, 팔찌, 펜던트",
      "가족 항목: 양가 혼주 예물",
      "상담 전 기준: 예산 상한, 착용 빈도, 본식 일정, 양가 합의"
    ]
  },
  {
    "title": "예물 세트 구성, 이렇게 나눠보세요",
    "paragraphs": [
      "예물 세트는 한 가지 표준에 맞추기보다, 필요한 품목과 먼저 합의할 질문을 함께 비교한 뒤 선택할 수 있습니다. 상담 전에 선택 범위를 좁힐 수 있도록 아래에 구성 선택표를 정리했습니다."
    ],
    "bullets": [
      "웨딩밴드 중심｜포함을 검토할 품목: 웨딩밴드｜먼저 합의할 질문: 다이아 반지를 별도로 둘지",
      "반지 추가형｜포함을 검토할 품목: 웨딩밴드와 다이아 반지｜먼저 합의할 질문: 다이아의 크기와 품질 기준을 무엇으로 볼지",
      "데일리 주얼리 추가형｜포함을 검토할 품목: 웨딩밴드와 목걸이·귀걸이｜먼저 합의할 질문: 실제 착용 빈도가 있는지",
      "혼주 포함형｜포함을 검토할 품목: 위 구성과 양가 혼주 품목｜먼저 합의할 질문: 양가 예산 범위와 착용 일정이 같은지"
    ],
    "image": {
      "src": "/Image/guide/wedding-jewelry-set-composition-section-2.webp",
      "alt": "예물 세트 구성, 이렇게 나눠보세요 예시 이미지",
      "caption": "예물 세트 구성, 이렇게 나눠보세요에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "신부 예물 구성은 반지와 착용 계획부터",
    "paragraphs": [
      "신부 예물은 웨딩밴드만 준비하는 경우와 다이아 반지, 목걸이와 귀걸이를 추가하는 경우로 나누어 살펴볼 수 있습니다. 다이아가 포함된 약혼반지를 고를 때에는 색상, 클래리티, 컷, 캐럿 중량인 4C를 확인할 수 있습니다.",
      "다이아 반지를 추가할 때는 상담 전에 다이아 3부·5부 차이와 비교 기준부터 확인하는 것이 좋습니다. 평소 웨딩밴드와 함께 착용할지, 별도로 착용할지 정리한 뒤 세팅이 생활 방식에 맞는지도 살펴보세요."
    ],
    "bullets": [
      "웨딩밴드 중심: 매일 착용할 반지에 우선순위 두기",
      "반지 추가형: 다이아의 크기와 품질 기준을 정한 뒤 비교하기",
      "데일리 주얼리 추가형: 목걸이와 귀걸이의 실제 착용 장면 확인하기",
      "확인할 정보: 금속 종류와 함량, 보석 종류와 품질, 중량, 표시 내용"
    ]
  },
  {
    "title": "신랑 예물 구성은 생활 방식과 반지 착용감 확인",
    "paragraphs": [
      "신랑 예물에 시계를 반드시 포함할 필요는 없으며, 생활 방식에 맞춰 반지와 다른 주얼리의 범위를 정할 수 있습니다. 시계를 자주 착용하지 않는 경우에는 웨딩밴드의 폭과 두께, 중량, 표면 마감을 먼저 비교해 보세요.",
      "신부 반지와 디자인을 완전히 같게 맞추지 않아도 금속 색과 마감의 분위기는 조정할 수 있습니다. 폭과 두께는 손에 직접 착용해 본 다음, 일상 업무나 운동 중 걸림이 없는지 확인하는 것이 좋습니다."
    ],
    "bullets": [
      "시계 포함 여부는 평소 착용 습관으로 결정하기",
      "반지 폭과 두께는 실제 손에 착용해 비교하기",
      "무광과 유광 등 표면 마감 차이 확인하기",
      "신부 반지와 금속 색과 분위기를 맞출지 합의하기"
    ],
    "image": {
      "src": "/Image/guide/wedding-jewelry-set-composition-section-4.webp",
      "alt": "신랑 예물 구성은 생활 방식과 반지 착용감 확인 예시 이미지",
      "caption": "신랑 예물 구성은 생활 방식과 반지 착용감 확인에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "혼주 예물은 양가 합의와 본식 착용 여부부터",
    "paragraphs": [
      "혼주 예물은 양가 부모님께 같은 품목으로 준비할 수도 있지만, 합의한 비슷한 예산 범위 안에서 품목을 다르게 정할 수도 있습니다. 본식에서 실제로 착용할지 먼저 확인하고, 한복이나 의상에 어울리는지도 살펴보세요.",
      "양가의 예산과 기존 예물 준비 내용에 따라 혼주 예물의 범위는 달라질 수 있습니다. 매장에서 결정하기 전에 양가가 원하는 품목을 확인하고 예산 범위까지 미리 맞춰 두면 선택 과정에서 오해를 줄일 수 있습니다."
    ],
    "bullets": [
      "같은 품목 또는 합의한 비슷한 예산 범위로 조정하기",
      "본식 착용 여부와 착용할 의상 확인하기",
      "목걸이, 귀걸이, 반지, 펜던트 등 필요한 품목만 검토하기",
      "양가의 예산과 준비 범위를 상담 전에 공유하기"
    ]
  },
  {
    "title": "예물 상담 전 체크리스트",
    "paragraphs": [
      "상담 전에는 두 분이 전체 예산 상한과 품목별 우선순위를 먼저 정해 두세요. 이후 금속 종류와 함량, 보석의 종류와 품질을 확인하고, 중량 등 상품의 중요 정보가 정확히 표시되는지도 살펴보는 것이 좋습니다.",
      "방문 전 준비물은 결혼예물 상담 전 확인할 체크리스트에서 항목별로 확인할 수 있습니다. 희망 수령일은 매장과 상품의 주문 조건에 따라 달라질 수 있으므로 상담 시 확인하고, 관련 일정은 결혼반지 제작 기간 안내도 함께 살펴보세요."
    ],
    "bullets": [
      "전체 예산 상한과 꼭 필요한 품목 정하기",
      "웨딩밴드와 다이아 반지의 착용 계획 정하기",
      "혼주 예물의 양가 예산과 품목 합의하기",
      "금속 종류와 함량, 보석 정보, 중량 표시 확인하기",
      "희망 수령일과 주문 조건을 상담 시 확인하기"
    ]
  }
]

const cautions = [
  "결혼예물은 필수 품목이 정해져 있지 않으며, 상담 시점의 제품 상태와 두 분의 예산과 착용 계획에 따라 구성이 달라질 수 있습니다.",
  "다이아 가격과 등급, 금속 가격, 제작 기간, 매장별 제공 범위와 인증 여부는 공식 확인 없이 단정하지 말고 상담 시 확인하세요.",
  "혼주 예물은 양가의 예산과 본식 착용 여부를 먼저 합의한 뒤 품목을 정하는 편이 안전합니다."
]

const relatedLinks = [
  {
    "to": "/wedding",
    "label": "원하는 구성과 예산을 정한 뒤 결혼예물 상담받기",
    "description": "방문 전에 예산과 제작 일정을 기준으로 맞춤제작 범위를 확인하세요."
  },
  {
    "to": "/guide/jongno-wedding-jewelry-consultation-checklist",
    "label": "결혼예물 상담 전 확인할 체크리스트",
    "description": "상담 전 예산, 금속과 보석 정보, 반지 치수, 계약 조건을 확인하는 방법입니다."
  },
  {
    "to": "/guide/platinum-ring-drawbacks-wear-guide",
    "label": "백금 반지 단점은 스크래치·무게·변형·마감 변화에서 확인합니다",
    "description": "백금 반지를 고르기 전에 생활 착용과 표면 변화를 확인하는 방법입니다."
  },
  {
    "to": "/guide/rose-gold-couple-ring-selection-guide",
    "label": "로즈골드 커플링, 피부톤·도금·스크래치·레이어드 확인법",
    "description": "로즈골드 커플링의 색감, 도금 여부, 표면 마감과 조화를 확인하는 방법입니다."
  }
]

const updatedAt = '2026-08-25'
// guide-manager:data:start
const gmArticleTitle = '결혼예물 세트 구성 가이드｜신부·신랑·혼주 예물 준비 기준'
const gmArticleLead = '결혼예물 세트에 반드시 포함해야 하는 품목은 정해져 있지 않습니다. 상담 전에 선택 기준을 세우려면 먼저 보다 실제 착용할 반지를 정한 뒤, 다이아 반지와 데일리 주얼리, 혼주 예물을 추가할지 순서대로 합의하면 됩니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '결혼예물 세트 구성'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '결혼예물 세트 구성'
const gmHeroAlt = '결혼예물 세트 구성 상담을 위한 웨딩밴드와 주얼리'
const gmSourceNote = '다이아와 귀금속 정보는 아래 승인 출처의 일반 안내를 바탕으로 정리했습니다. 가격, 제작 기간, 재고, 수리 가능 여부와 인증 범위는 매장과 상품에 따라 달라질 수 있어 상담 시 별도로 확인해야 합니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, How to Wear Your Engagement Ring and Wedding Band",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-wear-engagement-ring-wedding-band/",
    "note": "약혼반지와 결혼반지의 역할 및 두 반지를 함께 착용하는 일반적 방식을 설명합니다."
  },
  {
    "label": "Gemological Institute of America, How to Choose and Wear Matching Jewelry for Couples",
    "url": "https://4cs.gia.edu/en-us/blog/matching-jewelry-for-couples/",
    "note": "커플용 반지 외에 팔찌, 펜던트 등 다양한 맞춤형 예물 선택지를 설명합니다."
  },
  {
    "label": "Federal Trade Commission, Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속과 보석의 종류, 품질, 중량, 금속 함량 등을 정확히 표시해야 한다는 소비자 정보 기준을 제공합니다."
  },
  {
    "label": "Gemological Institute of America, 10 Tips for Buying an Engagement Ring",
    "url": "https://4cs.gia.edu/en-us/blog/tips-for-buying-an-engagement-ring/",
    "note": "약혼반지 선택 시 다이아몬드의 4C와 반지 착용 계획을 확인해야 한다고 설명합니다."
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
        { name: '결혼예물 세트 구성', path: pagePath },
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
