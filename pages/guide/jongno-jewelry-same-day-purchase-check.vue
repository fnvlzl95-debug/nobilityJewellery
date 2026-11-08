<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-jewelry-same-day-purchase-check'
const pageTitle = '종로 귀금속 구매, 당일 수령 확인법 | 귀족'
const pageDescription = '종로 귀금속 구매 후 오늘 바로 받으려면 실제 재고·반지 호수·목걸이 길이·추가 작업을 확인하세요. 갤러리 사진과 판매 가능한 제품을 구분하고, 귀족 방문 전 수령 가능 시간을 문의하는 방법을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-jewelry-same-day-purchase-check-hero.webp`
const publishedAt = '2026-11-09'
const updatedAt = ''
const faqItems = [
  {
    "question": "종로 귀금속 매장에 가면 당일 수령할 수 있나요?",
    "answer": "원하는 사양의 판매 가능한 제품이 있고 추가 작업이 필요한지에 따라 달라집니다. 방문 전에 제품 사진과 필요한 호수·길이, 수령 희망 시각을 알려 가능 여부를 확인하세요."
  },
  {
    "question": "귀족 갤러리에 있는 디자인은 모두 재고가 있나요?",
    "answer": "갤러리는 디자인과 제작 사양을 상담하는 자료입니다. 해당 사진과 같은 소재·색상·치수의 현재 재고와 판매 가능 여부는 개별 문의로 확인해야 합니다."
  },
  {
    "question": "재고 반지에 각인만 하면 바로 받을 수 있나요?",
    "answer": "각인 가능 여부와 문구·위치, 필요한 작업 일정에 따라 달라집니다. 각인을 포함한 수령 시간을 확인해야 하며, 재고가 있다는 이유만으로 당일 각인 완료를 확정할 수는 없습니다."
  },
  {
    "question": "방문 예약을 하면 제품도 확보되나요?",
    "answer": "상담 시간과 제품 확보 여부는 각각 확인하세요. 원하는 제품을 방문 전까지 보관할 수 있는지, 별도 절차나 조건이 있는지 매장에 문의하는 것이 좋습니다."
  },
  {
    "question": "사진과 같은 디자인을 새로 만들면 얼마나 걸리나요?",
    "answer": "귀족 주문제작은 최소 3주를 기준으로 상담합니다. 디자인·소재·치수·보석·각인 등 최종 조건에 따라 실제 수령일을 안내받으세요."
  }
]
const quickAnswers = [
  "“이 디자인 있나요?”에 더해 원하는 소재·색상·호수 또는 길이까지 알려주세요. 같은 디자인이 있어도 지금 필요한 사양과 다를 수 있습니다.",
  "현재 제품을 그대로 구매하는 경우와 조정·각인·새 제작이 필요한 경우를 나누어 수령 일정을 확인하세요.",
  "오늘 필요하다면 방문 시각과 실제 받아야 할 시각을 함께 알려주세요. 재고 문의나 상담 예약만으로 제품 확보와 당일 수령이 확정되지는 않습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "종로 귀금속은 방문하면 바로 살 수 있나요?",
    "paragraphs": [
      "당일 수령 여부는 상가 이름이나 매장 수보다 선택한 제품의 상태에 달려 있습니다. 원하는 제품이 판매 가능한 상태로 준비돼 있고 별도 작업이 필요 없는지부터 물어보세요. 이 글은 특정 제품의 재고나 오늘 구매 가능한 품목을 실시간으로 안내하는 목록은 아닙니다.",
      "귀족 갤러리는 디자인을 고르고 가격과 제작 사양을 상담하는 페이지입니다. 사진 속 제품이 완성품으로 준비돼 있는지, 디자인 확인용인지, 같은 모습으로 새로 제작해야 하는지는 별도로 확인하세요. 상품명이나 페이지 주소를 보내면 어떤 사진을 보고 문의하는지 맞추기 쉽습니다.",
      "당일 구매에서 먼저 정할 것은 원하는 디자인과 꼭 지켜야 하는 조건입니다. 예를 들어 금속 색은 바꿔도 되는지, 받는 사람의 반지 호수는 맞아야 하는지 정해 두세요. 대체 제품을 안내받더라도 필요한 조건이 맞는지 다시 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "재고가 있어도 수령일이 달라지는 경우는?",
    "paragraphs": [
      "“재고가 있다”는 답을 들었다면 그 제품을 지금 상태 그대로 가져가는 조건인지 확인하세요. 반지 호수, 체인 길이, 각인, 장식 변경을 요청하면 필요한 작업과 일정이 달라질 수 있습니다. 간단해 보이는 변경에도 정해진 당일 완료 시간을 임의로 붙이지 않는 것이 좋습니다.",
      "아래 표는 재고 확인 후 이어서 물어볼 질문입니다. 각인이나 사이즈 조정이 언제나 가능하다는 뜻은 아니며, 가능한 작업 범위와 실제 받을 수 있는 시간을 함께 안내받으세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "상담에서 확인한 상태",
        "이어서 물어볼 내용",
        "수령 일정의 확인점"
      ],
      "rows": [
        [
          "원하는 사양의 완성 제품이 있음",
          "현재 제품을 변경 없이 구매할 수 있나요?",
          "방문 예정 시각에 판매·수령 가능한지 확인"
        ],
        [
          "디자인은 같지만 치수가 다름",
          "내 호수나 길이에 맞추는 작업이 가능한가요?",
          "조정 필요 여부와 작업 후 수령일 확인"
        ],
        [
          "각인이나 장식 변경을 희망함",
          "요청한 변경이 가능한 구조인가요?",
          "추가 작업을 포함한 완료·수령 시간 확인"
        ],
        [
          "사진과 같은 제품을 새로 만들어야 함",
          "최종 소재·치수·구성을 어떻게 정하나요?",
          "귀족 주문제작은 최소 3주 기준으로 별도 상담"
        ]
      ]
    }
  },
  {
    "title": "반지 호수나 목걸이 길이를 모르면 어떻게 하나요?",
    "paragraphs": [
      "치수가 미정이면 “사이즈는 아직 모르고, 오늘 착용할 제품을 찾는다”고 먼저 알려주세요. 방문해서 착용감을 확인할 수 있는지 상담하고, 사진 속 크기만으로 맞을 것이라고 결정하지 마세요. 반지는 맞는 손가락과 호수, 목걸이와 팔찌는 원하는 착용 위치와 완성 길이를 구분해 확인합니다.",
      "GIA의 반지 구매 안내도 필요한 날짜와 착용자의 호수를 미리 확인하도록 설명합니다. 반지에 작은 보석이 이어진 구조 등에서는 크기 조절이 더 복잡해질 수 있으므로, 나중에 쉽게 줄이면 된다고 가정하지 않는 편이 좋습니다. 구체적인 호수 측정은 아래 관련 글에서 확인할 수 있습니다.",
      "선물 받는 사람의 치수를 모른다면 구매 전에 그 사실을 전달하세요. 비교할 제품의 선택 범위, 추후 조정 가능 여부와 조건을 확인해야 합니다. 오늘 제품을 확보하는 것과 선물 받는 사람이 바로 편하게 착용할 수 있는 것은 따로 확인할 문제입니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "방문 전에 어떤 메시지를 보내면 좋나요?",
    "paragraphs": [
      "제품 사진이나 갤러리 링크 하나에 조건을 모아 보내세요. 품목, 소재와 색상, 알고 있는 치수, 추가 작업 유무, 방문 예정 시각과 필요한 수령 시각을 적으면 됩니다. 모르는 항목은 미정이라고 표시하고, 확인되지 않은 치수를 추측해서 적지 마세요.",
      "문의 예시: “갤러리에서 본 이 목걸이와 비슷한 제품을 오늘 선물하고 싶습니다. 옐로골드를 원하고 각인은 필요 없습니다. 길이는 방문해서 확인하고 싶어요. 오늘 오후에 방문할 예정인데, 변경 작업 없이 구매 가능한 제품이 있는지와 수령 가능한 시간을 먼저 안내받고 싶습니다.”",
      "답변을 받으면 안내된 제품이 처음 문의한 제품과 같은지, 변경 가능한 조건이 무엇인지 확인하세요. 전화나 메시지로 재고를 문의했다고 해서 자동으로 제품이 확보되는 것은 아니므로, 방문 전까지 보관이 가능한지와 필요한 절차도 별도로 물어보세요. 제품 확보 방식이나 조건을 이 글에서 미리 약속하지는 않습니다."
    ],
    "bullets": [
      "상품명 또는 사진·페이지 주소",
      "품목·소재·색상과 알고 있는 치수",
      "각인·길이 조정 등 추가 요청 유무",
      "방문 예정일·시각과 실제로 필요한 수령 시각"
    ],
    "table": null
  },
  {
    "title": "오늘 받을 제품이 없다면 무엇을 비교하나요?",
    "paragraphs": [
      "당일 수령이 꼭 필요하다면 현재 구매 가능한 제품 중 유지할 조건이 맞는지 상담하세요. 급하다는 이유로 맞지 않는 반지 호수나 불편한 목걸이 길이를 선택하기보다, 제품을 바꿀지 수령일을 바꿀지 나누어 결정하는 편이 좋습니다.",
      "반대로 특정 디자인·소재·각인을 꼭 원한다면 새 주문제작 일정으로 확인하세요. 귀족은 최소 3주를 기준으로 상담하며, 최종 사양을 정한 뒤 실제 수령일을 안내합니다. 이 기준은 판매 가능한 완성 제품을 그대로 구매할 때의 대기 기간을 뜻하지 않습니다.",
      "종로 귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 전화 02-766-4789 또는 카카오톡으로 제품과 필요한 날짜를 보내 주세요. 출발 전 문의 페이지에서 운영 시간을 확인하고 방문 예정 시각을 전달하면 됩니다. 당일 구매·수령 가능 여부는 그때 확인한 제품과 작업 조건을 기준으로 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "갤러리 사진, 이전 상담 내용과 제품 설명만으로 현재 재고나 당일 수령을 확정할 수 없습니다. 방문 시점의 조건을 다시 확인하세요.",
  "사이즈·길이·각인·소재를 바꾸면 처음 안내받은 조건과 달라질 수 있습니다. 변경 후 총액과 수령 가능일을 함께 확인하세요."
]
const relatedLinks = [
  {
    "to": "/gallery",
    "label": "귀족 귀금속 디자인 갤러리",
    "description": "원하는 제품 사진과 페이지 주소를 골라 상담에 사용하세요."
  },
  {
    "to": "/guide/jongno-jewelry-store-visit-guide",
    "label": "종로 금은방 방문 상담 준비",
    "description": "구매 외에 수리·리폼 등 방문 목적별 준비물을 확인하세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "반지 호수 확인 방법",
    "description": "치수를 모를 때 측정 기준과 주의점을 먼저 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "새 주문제작을 원할 때",
    "description": "최소 3주 기준으로 디자인과 수령 일정을 상담하세요."
  },
  {
    "to": "/contact",
    "label": "귀족 연락처와 방문 안내",
    "description": "현재 운영 시간과 위치를 확인하고 구매 조건을 문의하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '종로 귀금속 구매, 당일 수령 확인법'
const gmArticleLead = '종로 귀금속을 구매해 당일 수령하려면 원하는 사양의 판매 가능한 제품이 있는지, 사이즈 조정이나 각인 같은 추가 작업이 필요한지 먼저 확인하세요. 매장 사진에 보이는 디자인과 오늘 가져갈 수 있는 제품은 구분해야 합니다. 귀족의 새 주문제작은 최소 3주를 기준으로 상담하며, 당일 구매 가능 여부는 개별 제품의 현재 상태를 확인한 뒤 안내합니다.'
const gmArticleCategory = '기간'
const gmArticleKeyword = '종로 귀금속 당일 구매'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '종로 귀금속 구매·당일 수령 가능 여부'
const gmHeroAlt = '상담 트레이에 구분해 놓인 금빛 반지·목걸이·후프 귀걸이와 옆의 반지 사이즈 측정 도구'
const gmHeroCaption = '구매 전 제품 구성을 확인하는 장면을 표현한 AI 생성 예시입니다. 실제 매장이나 현재 재고를 나타내지 않습니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '귀족의 갤러리·주문제작·문의 안내와 GIA의 구매 전 날짜·호수 확인 원칙을 참고했습니다. 상황별 표와 문의 문장은 상담 준비용 예시이며, 현재 재고·상품 확보·당일 작업을 보장하는 내용은 아닙니다. GIA의 해외 제작 소요기간은 귀족의 일정으로 옮기지 않았습니다.'
const gmSources = [
  {
    "label": "귀족 — 갤러리와 디자인 상담",
    "url": "https://noblessegold.com/gallery",
    "note": "사진으로 원하는 디자인을 찾고 가격·제작 사양을 상담하는 페이지입니다. 실시간 재고 확인을 대신하지 않습니다."
  },
  {
    "label": "귀족 — 주문제작 기간 안내",
    "url": "https://noblessegold.com/custom",
    "note": "주문제작은 최소 3주를 기준으로 하며, 최종 사양 확인 후 수령 일정을 안내합니다."
  },
  {
    "label": "GIA — 구매 시 필요한 날짜와 반지 호수 확인",
    "url": "https://4cs.gia.edu/en-us/blog/buying-diamond-engagement-ring-questions-jeweler-will-ask/",
    "note": "필요한 날짜와 반지 호수를 구매 전에 확인하고, 준비된 세팅과 맞춤 제작을 구분하는 원칙을 참고했습니다."
  },
  {
    "label": "귀족 — 연락처와 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "종로 매장 주소와 전화·카카오톡 상담 경로, 방문 시간 확인에 사용하는 공식 안내입니다."
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
    :hero-caption="gmHeroCaption"
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
