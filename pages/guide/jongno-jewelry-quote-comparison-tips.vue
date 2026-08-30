<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-jewelry-quote-comparison-tips'
const pageTitle = '종로 금은방 견적 비교 기록법 | 귀족'
const pageDescription = '종로 금은방에서 받은 견적을 같은 기준으로 기록하고 금속 정보, 비용 항목, 환불 조건을 비교하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-jewelry-quote-comparison-tips-hero-a87d6bab.webp`
const publishedAt = '2026-08-30'
const updatedAt = ''
const faqItems = [
  {
    "question": "견적 비교표에 가장 먼저 적을 항목은 무엇인가요?",
    "answer": "매장 식별 정보와 제품 사진 또는 모델명, 금속 종류와 순도, 제품 중량, 보석 정보, 비용 항목, 총액을 먼저 적는 것이 좋습니다."
  },
  {
    "question": "총액이 낮은 견적을 바로 선택해도 되나요?",
    "answer": "바로 선택하기보다 금속 중량과 순도, 보석 정보, 세공비와 기타 비용이 같은 기준으로 포함됐는지 확인하세요. 환불·반품 조건과 서면 기재 내용도 함께 비교해야 합니다."
  },
  {
    "question": "세공비가 따로 적히지 않으면 어떻게 해야 하나요?",
    "answer": "세공·디자인 관련 금액이 총액에 포함된 것인지, 별도 비용인지 매장에 질문하고 답변을 견적 메모에 남겨 달라고 요청해 보세요."
  },
  {
    "question": "구매를 결정하게 만든 정보는 어디에 남겨야 하나요?",
    "answer": "비교표에 기록하고, 보석 중량이나 크기처럼 구매 판단에 의존한 정보는 영수증에도 기재해 달라고 요청하는 것이 좋습니다."
  }
]
const quickAnswers = [
  "제품 사진이나 이름, 금속 종류와 순도, 제품 중량을 먼저 적으세요.",
  "보석 정보와 세공비, 기타 비용, 총액을 각각 나누어 기록하세요.",
  "환불·반품 조건과 영수증 또는 견적서에 적히는 내용도 확인하세요."
]
const sections = [
  {
    "title": "방문 전 비교표를 먼저 만들기",
    "paragraphs": [
      "항목을 적을 칸은 매장에 도착하기 전에 휴대전화 메모나 종이에 매장 식별 정보, 제품 사진 또는 모델명, 금속 종류와 순도, 총중량, 보석 정보, 비용, 총액을 넣어 만들어 두세요.",
      "사진을 남길 때는 먼저 매장 촬영 정책을 확인하세요. 같은 제품을 비교하려면 제품의 형태와 크기감이 비슷한지도 함께 기록해야 합니다."
    ],
    "bullets": [
      "매장 이름 또는 위치",
      "제품 사진 또는 모델명",
      "금속 종류와 순도 표시",
      "제품 중량과 보석 정보",
      "세공비와 기타 비용",
      "총액과 환불·반품 조건"
    ]
  },
  {
    "title": "금속과 중량을 같은 기준으로 적기",
    "paragraphs": [
      "금 제품을 기록할 때는 금속 종류와 순도 표시를 따로 적으세요. 18K는 24분율 기준으로 금 18부분과 다른 금속 6부분을 섞은 합금을 뜻합니다.",
      "단순한 금 제품처럼 디자인과 세공 요소가 적다면 그램 중량과 금 가격을 함께 비교할 수 있습니다. 제품 중량은 매장 안내에 표시된 기준을 그대로 기록하세요."
    ],
    "bullets": [
      "금속 종류",
      "순도 또는 캐럿 표시",
      "제품 중량",
      "금 가격 적용 기준이 있는지",
      "중량에 보석이나 부속품이 포함되는지 확인할 내용"
    ],
    "image": {
      "src": "/Image/guide/jongno-jewelry-quote-comparison-tips-section-2-39a4cafd.webp",
      "alt": "금속과 중량을 같은 기준으로 적기 예시 이미지",
      "caption": "금속과 중량을 같은 기준으로 적기에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "총액을 구성 항목으로 나누기",
    "paragraphs": [
      "디자인이나 세공이 있는 제품은 금속 비용, 보석 관련 비용, 세공·디자인 비용, 기타 비용을 나누어 적어 달라고 요청해 보세요. 총액만 놓고 비교하지 않는 것이 좋습니다.",
      "각 매장의 견적서 형식은 다를 수 있습니다. 항목이 없을 때는 해당 비용이 총액에 포함된 것인지 별도로 계산되는지 질문하고, 그 내용도 함께 남기세요."
    ],
    "bullets": [
      "금속 비용",
      "보석 비용과 보석 정보",
      "세공·디자인 비용",
      "각인이나 추가 작업 비용",
      "기타 비용",
      "최종 총액"
    ]
  },
  {
    "title": "구매 전 서면 내용을 확인하기",
    "paragraphs": [
      "환불·반품 조건은 매장별로 따로 기록하고 가능하면 서면으로 받으세요. 구두로 들은 조건과 견적서 또는 영수증에 적힌 내용이 다르지 않은지 확인하는 과정이 필요합니다.",
      "구매 판단에 영향을 준 보석 중량이나 크기 같은 정보는 영수증에 기재해 달라고 요청하는 것이 좋습니다. 견적 비교표에는 영수증이나 견적서에 어떤 내용이 적히는지도 표시하세요."
    ],
    "bullets": [
      "환불·반품 가능 여부와 조건",
      "견적 유효 조건이 있다면 그 내용",
      "영수증에 기재되는 제품 사양",
      "보석 중량과 크기 등 구매 판단에 사용한 정보",
      "상담한 날짜와 담당자 확인 방법"
    ],
    "image": {
      "src": "/Image/guide/jongno-jewelry-quote-comparison-tips-section-4-4f746a36.webp",
      "alt": "구매 전 서면 내용을 확인하기 예시 이미지",
      "caption": "구매 전 서면 내용을 확인하기에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  }
]
const cautions = [
  "매장별 견적의 계산 방식과 포함 항목이 다를 수 있으므로 총액만으로 가격이나 조건이 더 좋다고 단정하지 마세요.",
  "금속 순도, 중량, 보석 정보가 견적서와 실제 제품에서 어떻게 표시되는지 확인하고, 이해되지 않는 항목은 구매 전에 설명을 요청하세요.",
  "이 글의 비교표는 Federal Trade Commission 소비자 안내를 견적 기록에 적용한 예시이며, 종로 매장들의 실제 가격이나 운영 방식을 의미하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/jongno-jewelry-store-visit-guide",
    "label": "종로 금은방 방문 예약, 상담 전 준비하면 좋은 것",
    "description": "종로 금은방 방문 전 상담에 필요한 사진, 예산과 준비 사항을 정리했습니다."
  },
  {
    "to": "/guide/jongno-wedding-jewelry-consultation-checklist",
    "label": "결혼예물 상담 전 확인할 체크리스트",
    "description": "예산과 금속, 보석 사양, 계약 조건과 증빙자료를 상담 전에 확인하는 방법을 안내합니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "종로 커플링 주문제작, 상담부터 수령까지 확인할 것",
    "description": "커플링 주문제작 상담에서 소재, 폭, 두께, 각인과 제작 확인 사항을 정리했습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '종로 금은방 견적 비교 기록법'
const gmArticleLead = '한 표에 제품 사진이나 이름, 금속 종류와 순도, 중량, 보석 정보, 세공비, 총액, 환불·반품 조건을 같은 순서로 기록해 보세요. 여러 매장의 견적을 비교할 때는 총액만 적기보다 제품 사양과 비용 항목을 맞춰 남기는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '종로 금은방 견적 비교'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '종로 금은방 방문 시 여러 견적을 같은 기준으로 기록하고 비교하는 방법'
const gmHeroAlt = '금반지와 금목걸이 옆에 견적 메모장과 펜이 놓인 상담 테이블'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '귀금속과 보석의 표시 정보, 순도와 중량 확인, 환불·반품 정책의 서면 확인에 관한 Federal Trade Commission 안내를 바탕으로 작성했습니다. 비교표 구성과 비용 항목 분리는 해당 안내를 현장 기록에 적용한 예시입니다.'
const gmSources = [
  {
    "label": "Federal Trade Commission, Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "금·백금·은 제품의 순도 표시, 판매자 정보 확인, 환불·반품 정책을 서면으로 확인하라는 소비자 안내입니다."
  },
  {
    "label": "Federal Trade Commission, Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속과 보석의 종류, 품질, 수량, 금속 함량, 크기, 중량과 가격 등 중요한 표시 정보가 정확해야 한다는 안내입니다."
  },
  {
    "label": "Federal Trade Commission, From Bouquets to Bangles: New FTC Brochures Offer Tips for Consumers and Merchants",
    "url": "https://www.ftc.gov/news-events/news/press-releases/1998/04/bouquets-bangles-new-ftc-brochures-offer-tips-consumes-merchants",
    "note": "간단한 금 제품은 그램 중량과 금 가격을 기준으로 비교하고, 구매 판단에 사용한 정보는 영수증에 적도록 요청하라는 소비자 팁을 제공합니다."
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
        { name: gmArticleTitle, path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: articleImages,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url },
        reviewedBy: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: gmReviewedBy, url: siteConfig.url },
        publisher: {
          '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url,
          logo: { '@type': 'ImageObject', url: siteConfig.url + '/favicon.svg' },
        },
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
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
    :hero-width="gmHeroWidth"
    :hero-height="gmHeroHeight"
    :reviewed-by="gmReviewedBy"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
