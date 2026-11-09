<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-jewelry-warranty-card-check'
const pageTitle = '종로 귀금속 보증서, 사양·AS 확인법 | 귀족'
const pageDescription = '종로 귀금속 보증서를 받았다면 제품 사양과 AS 조건을 나누어 확인하세요. 영수증·보석 감정서와의 역할 차이, 품목별 대조표, 보증서 분실 시 문의 준비까지 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-jewelry-warranty-card-check-hero.webp`
const publishedAt = '2026-11-10'
const updatedAt = ''
const faqItems = [
  {
    "question": "귀금속 보증서에는 무엇을 먼저 확인하나요?",
    "answer": "발행 주체와 해당 품목부터 확인하고 소재·치수·보석 구성 등 기재된 사양을 실물과 대조하세요. 제품 정보 확인과 보증 적용 범위 확인은 나누어 진행하는 것이 좋습니다."
  },
  {
    "question": "보증서가 있으면 사이즈 조정도 무료인가요?",
    "answer": "보증서 유무만으로 정할 수 없습니다. 사이즈 변경이 적용 대상인지, 가능한 작업 범위와 별도 비용이 있는지 해당 매장에 확인하세요."
  },
  {
    "question": "보석 감정서가 제품 보증서를 대신하나요?",
    "answer": "같은 역할로 보면 안 됩니다. 보석 보고서는 검사 대상의 특성을 설명하며, 완제품의 AS 조건이나 매장 보증 범위는 별도로 확인해야 합니다."
  },
  {
    "question": "금반지 보증서를 분실하면 재발급받을 수 있나요?",
    "answer": "재발급 여부와 필요한 자료는 구매 매장에 문의하세요. 구매 시기, 제품 사진과 보유한 거래 자료를 정리하되, 자료가 있다는 이유만으로 재발급이나 보증 적용을 확정할 수는 없습니다."
  },
  {
    "question": "다른 종로 매장에서 산 제품도 귀족에 수리 문의할 수 있나요?",
    "answer": "구매처와 제품 상태를 알려 수리 가능 여부를 먼저 상담하세요. 기존 판매처의 보증 적용과 귀족에서 새로 요청하는 작업의 비용·일정은 구분해 확인해야 합니다."
  }
]
const quickAnswers = [
  "보증서의 발행 주체와 품목을 먼저 확인하세요. 반지·체인·펜던트를 함께 샀다면 어느 제품의 정보인지 구분하는 것이 좋습니다.",
  "소재·치수·보석 정보와 AS 적용 범위를 별도로 읽으세요. 보증기간이 표시돼 있어도 각인 변경이나 사이즈 조정까지 같은 조건으로 처리되는지는 확인이 필요합니다.",
  "보증서와 영수증, 제품 사진을 한곳에 보관하세요. 자료를 잃어버렸다면 구매 매장에 거래 확인과 재발급 가능 여부부터 문의합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "보증서와 영수증, 감정서는 어떻게 다른가요?",
    "paragraphs": [
      "문서 제목보다 누가 발행했고 무엇이 적혀 있는지 먼저 보세요. 매장에서 제공한 보증서는 해당 제품의 설명과 보증 조건을 확인하는 자료이고, 영수증은 구매한 품목과 결제 내용을 확인하는 자료입니다. 한 장에 두 역할을 함께 담을 수도 있으므로 서류 개수보다 실제 기재 내용을 살피면 됩니다.",
      "보석학 기관의 감정서·감별서는 검사 대상 보석의 특성을 다룹니다. 예를 들어 GIA는 자사 보고서가 보증서나 가격 평가서가 아니라고 설명합니다. 보석 보고서가 있다고 해서 반지 전체의 수리 비용이나 매장의 AS 조건까지 정해지는 것은 아닙니다.",
      "Jewelers of America도 품목별 영수증과 보석학 기관의 보고서를 각각 확인하도록 안내합니다. 보석 보고서의 등급과 검사 범위는 아래 관련 글에서 자세히 볼 수 있으며, 여기서는 구매한 완제품과 보증 내용을 연결해 확인하는 방법에 집중합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "내 제품과 보증서에서 무엇을 맞춰 보나요?",
    "paragraphs": [
      "제품을 하나씩 꺼내 품목과 사양을 대조하세요. 세트나 여러 제품을 함께 구매했다면 소재·치수·보석 정보가 어느 품목에 해당하는지 먼저 연결해 보세요. 사진으로 구분하기 어렵다면 제품명이나 구별되는 장식을 함께 적어 두면 이후 문의에 도움이 됩니다.",
      "아래 항목이 모든 보증서에 같은 형식으로 적히는 것은 아닙니다. 빠진 정보나 이해하기 어려운 표기는 추측해서 채우기보다 구매 당시 설명과 함께 매장에 확인하세요. 보증서의 사진은 글자가 읽히도록 보관하고, 실물 사진도 따로 남기는 방법을 권합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인 항목",
        "제품과 대조할 내용",
        "질문 예시"
      ],
      "rows": [
        [
          "품목과 구성",
          "반지 한 개인지, 체인·펜던트 각각인지, 귀걸이 한 쌍인지",
          "이 사양은 어떤 제품에 해당하나요?"
        ],
        [
          "소재와 색상",
          "상담한 금속 종류·순도·색상과 기재 내용",
          "몸체와 부속의 소재가 각각 어떻게 되나요?"
        ],
        [
          "치수와 중량",
          "반지 호수·완성 길이, 중량의 단위와 포함 범위",
          "적힌 중량은 어느 구성까지 포함한 수치인가요?"
        ],
        [
          "보석과 추가 작업",
          "안내받은 보석 종류·구성과 각인 문구",
          "보석 정보와 추가 요청을 어디에서 확인하나요?"
        ]
      ]
    }
  },
  {
    "title": "보증기간이 있으면 AS는 모두 무료인가요?",
    "paragraphs": [
      "기간과 적용 범위를 함께 확인해야 합니다. 어떤 상태나 작업에 보증이 적용되는지, 비용이 생기는 경우는 무엇인지, 확인을 위해 어떤 자료가 필요한지 나눠 물어보세요. 같은 제품이라도 구매 때의 보증 확인과 이후 취향에 따른 변경 요청은 상담 내용이 달라질 수 있습니다.",
      "예를 들어 “잠금이 잘 닫히지 않는 상태의 점검”과 “목걸이를 더 짧게 바꾸는 요청”을 구분해 전달하세요. 이는 무료·유료를 미리 판정한 예가 아니라, 매장이 필요한 확인과 작업을 구분할 수 있도록 질문하는 방법입니다. 보석 분실이나 표면 손상도 발생 상황과 제품 상태를 함께 설명하면 좋습니다.",
      "BBB의 주얼리 구매 안내 역시 보증 문구를 읽고 구체적인 적용 내용을 질문하라고 권합니다. “평생 보증” 같은 표현을 봤다면 기간만 기억하기보다 포함되는 서비스와 별도 비용을 확인하세요. 실제 처리 조건은 구매 시 안내받은 내용과 제품 상태를 기준으로 문의합니다."
    ],
    "bullets": [
      "적용되는 제품·부위·작업은 무엇인지",
      "기간이 있다면 언제부터 계산하는지",
      "재료·부품 교체 등 별도 비용이 있는지",
      "문의할 때 필요한 구매 자료와 사진은 무엇인지"
    ],
    "table": null
  },
  {
    "title": "보증서를 잃어버렸거나 선물 받은 제품은요?",
    "paragraphs": [
      "보증서를 분실했다면 구매한 매장에 먼저 연락해 거래 확인에 필요한 자료를 물어보세요. 대략적인 구매 시기, 품목과 제품 사진, 보유한 결제 내역이나 상담 메시지를 정리하면 어떤 거래인지 설명하기 쉽습니다. 재발급 가능 여부와 대신 확인할 수 있는 자료는 매장별로 확인해야 합니다.",
      "선물 받은 제품이라면 가능할 때 구매처와 제공된 문서를 함께 전달받으세요. 여러 매장을 둘러본 뒤 구매한 경우에는 상가 이름만 기억하기보다 실제 판매한 점포의 이름과 연락처까지 구분하는 것이 좋습니다. 보증서에 적힌 연락처가 구매 매장인지도 확인해 두세요.",
      "자료를 못 찾았다는 이유만으로 수리 상담 자체가 불가능하다고 결론 내릴 필요는 없습니다. 다만 구매 이력 확인, 기존 보증 적용, 새로 요청할 수리의 가능 여부는 각각 물어봐야 합니다. 제품 사진과 현재 불편한 부분부터 전달하고 필요한 다음 확인을 안내받으세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에는 어떻게 문의하면 좋나요?",
    "paragraphs": [
      "귀족에는 제품 전체 사진과 확인하려는 부분을 함께 보내 주세요. 보증서 등 보유 자료가 있다면 관련 사양이 보이는 부분을 준비하고, “소재 표기가 궁금하다”, “구매 때 안내된 AS 범위를 확인하고 싶다”처럼 질문을 구체적으로 적어 주시면 됩니다. 다른 매장에서 구입했다면 그 사실도 함께 알려 주세요.",
      "문의 예시: “이 목걸이의 잠금 부분이 잘 닫히지 않습니다. 구매 시기는 대략 알고 있고 보증서는 찾지 못했습니다. 제품 사진을 먼저 보내니 실물 확인 전 준비할 자료와 수리 상담 가능 여부를 알려주세요.” 기존 보증 적용은 구매처에 확인하고, 새 작업의 비용·일정은 상태 확인 뒤 별도로 상담합니다.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 전화 02-766-4789 또는 카카오톡으로 문의할 수 있습니다. 수리 범위와 소요 시간은 제품 상태에 따라 달라지며, 새 주문제작을 원할 때는 최소 3주를 기준으로 희망 수령일을 상담해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "보증서 사진이나 제품 각인만으로 소재의 진위와 현재 상태를 확정하지 마세요. 문서와 실물을 연결해 확인할 부분이 남을 수 있습니다.",
  "이 글의 확인표는 특정 매장의 보증기간, 무료 수리 범위나 서류 재발급을 약속하는 내용이 아닙니다. 실제 제공 문서와 상담 내용을 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 읽는 법",
    "description": "보석 보고서의 검사 범위와 실물 대조 방법을 이어서 확인하세요."
  },
  {
    "to": "/guide/jewelry-hallmark-numbers-meaning",
    "label": "585·750 등 소재 각인 확인",
    "description": "제품에 새겨진 숫자와 소재 표기를 읽는 기준을 살펴보세요."
  },
  {
    "to": "/repair",
    "label": "귀족 귀금속 수리·AS 상담",
    "description": "제품 사진과 현재 상태를 보내 작업 범위와 일정을 문의하세요."
  },
  {
    "to": "/contact",
    "label": "종로 귀족 문의와 방문 안내",
    "description": "매장 위치와 연락처를 확인하고 필요한 자료를 문의하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '종로 귀금속 보증서, 사양·AS 확인법'
const gmArticleLead = '종로에서 귀금속을 구매하고 보증서를 받았다면 제품 정보와 AS 조건부터 나누어 읽어 보세요. 소재·치수·보석 구성이 실제 받은 제품과 맞는지 확인하고, 어떤 작업이 보증 대상인지 따로 물어보는 순서입니다. 보증서가 있다는 사실만으로 모든 수리가 무료가 되는 것은 아니며, 영수증과 보석 감정서도 각각 확인할 내용이 다릅니다.'
const gmArticleCategory = '관리'
const gmArticleKeyword = '종로 귀금속 보증서'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '귀금속 보증서·제품 정보 확인'
const gmHeroAlt = '작은 보석이 있는 금빛 반지 상자 옆에 놓인 크림색 서류 보관함과 빈 카드 두 장, 펜'
const gmHeroCaption = '구매 자료 보관을 설명하기 위한 AI 생성 이미지입니다. 실제 귀족 제품이나 발급 서류의 견본이 아닙니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '주얼리 구매 자료와 보증 질문에 관한 BBB·Jewelers of America의 안내, GIA의 보고서 범위 설명을 참고했습니다. 해외 반품 제도나 보증 조건을 국내 매장 정책으로 옮기지 않았습니다. 확인표와 문의 문장은 상담 준비용 제안이며, 귀족의 작업 범위·비용·일정은 공식 수리 안내에 따라 개별 확인합니다.'
const gmSources = [
  {
    "label": "BBB — 주얼리 구매 전 보증 조건과 구매 자료 확인",
    "url": "https://www.bbb.org/article/news-releases/16832-tips-for-buying-and-selling-jewelry",
    "note": "보증·반품 조건을 읽고 구체적으로 질문하며, 구매 영수증과 함께 제공된 보석 문서를 보관하라는 소비자 안내입니다."
  },
  {
    "label": "Jewelers of America — 주얼리 구매 자료 준비",
    "url": "https://www.jewelers.org/find-a-jeweler/repair-care/shopping-tips/",
    "note": "품목별 영수증과 독립 보석학 기관의 보고서를 구분해 확인하는 원칙을 참고했습니다."
  },
  {
    "label": "GIA — 보고서의 범위와 한계",
    "url": "https://www.gia.edu/terms",
    "note": "GIA 보고서는 검사 당시 확인된 특성을 기술하며 보증서나 가격 평가서가 아니라는 설명을 확인했습니다."
  },
  {
    "label": "귀족 — 수리·AS 상담 안내",
    "url": "https://noblessegold.com/repair",
    "note": "제품 사진과 상태를 확인한 뒤 작업 범위, 비용과 일정을 상담하는 공식 안내입니다."
  },
  {
    "label": "귀족 — 문의와 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "종로 매장 주소, 연락처, 사진 상담 경로와 새 주문제작 최소 3주 기준을 확인했습니다."
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
