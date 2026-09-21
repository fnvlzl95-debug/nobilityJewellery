<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/eternity-ring-half-full-selection'
const pageTitle = '이터니티 반지, 하프와 풀 선택법 | 귀족'
const pageDescription = '이터니티 반지를 고를 때는 하프·풀 이름보다 보석이 이어지는 범위를 확인하세요. 정면의 끝점과 손바닥 쪽 구조, 호수별 배열을 비교하고 원하는 반지의 주문 조건을 상담할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/eternity-ring-half-full-selection-hero-b64e5c09.webp`
const publishedAt = '2026-09-21'
const updatedAt = ''
const faqItems = [
  {
    "question": "하프 이터니티는 보석이 정확히 절반에만 있나요?",
    "answer": "이름만으로 정확한 범위를 확정하기보다는 해당 제품의 위쪽 세팅이 어디에서 끝나는지 확인하세요. 정면과 양옆 사진을 함께 보며 원하는 범위와 비교하면 됩니다."
  },
  {
    "question": "이터니티라는 이름이면 모두 풀 세팅인가요?",
    "answer": "그렇지 않습니다. 공식 제품 안내에서도 하프와 풀을 나누어 소개합니다. 보석이 일부 구간에만 있는지 둘레 전체에 이어지는지 별도로 확인하세요."
  },
  {
    "question": "주문 호수가 달라도 사진과 보석 개수가 같나요?",
    "answer": "사진만으로 알 수 없습니다. 주문할 호수에서 보석 개수와 배열, 세팅 끝점을 어떻게 정하는지 확인한 뒤 견적과 디자인을 비교하세요."
  },
  {
    "question": "하프와 풀 중 손바닥 면이 매끈한 것을 원하면요?",
    "answer": "손바닥 쪽에 보석이 없는 금속 구간을 원하는지 먼저 알려 주세요. 하프 후보의 실제 뒷면과 세팅 끝점을 비교하고, 마감과 착용감은 해당 디자인을 기준으로 확인하는 것이 좋습니다."
  }
]
const quickAnswers = [
  "풀 이터니티는 보석이 둘레 전체에, 하프 이터니티는 주로 위쪽 구간에 배치된 형태입니다.",
  "하프라는 이름만으로 정확히 반둘레인지 판단하지 말고 후보 제품의 실제 세팅 끝점을 확인하세요.",
  "원하는 둘레 범위와 참고 사진을 보내고, 내 호수에서의 배열과 제작 가능 범위를 상담하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "손바닥 면까지 보석을 둘지부터 정하세요",
    "paragraphs": [
      "Tiffany의 공식 이터니티 안내는 풀을 둘레 전체에 보석이 놓인 형태로, 하프를 위쪽 구간에 보석이 놓인 형태로 구분합니다. 반지를 어느 방향에서 보아도 보석이 이어지길 원한다면 풀을, 손바닥 쪽에 금속 면이 남는 모습을 원한다면 하프를 비교할 수 있습니다.",
      "하프라는 이름만 보고 보석이 정확히 원의 절반을 채운다고 생각하기보다는 후보 제품의 실제 범위를 확인하세요. 같은 하프라는 설명 아래에서도 내가 보는 정면과 양옆에서 어디까지 보석이 이어지는지 질문하는 편이 정확합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "선택 기준",
        "하프를 비교할 때",
        "풀을 비교할 때"
      ],
      "rows": [
        [
          "손바닥 쪽에서 원하는 모습",
          "금속 면이 남는 구간 확인",
          "보석이 아래쪽까지 이어지는지 확인"
        ],
        [
          "양옆에서 보이는 모습",
          "보석 줄이 끝나는 위치 확인",
          "전체 둘레의 배열이 이어지는 모습 확인"
        ],
        [
          "주문할 호수에서의 배열",
          "세팅 끝점이 어디에 놓이는지 질문",
          "보석 수와 배열이 어떻게 정해지는지 질문"
        ]
      ]
    }
  },
  {
    "title": "정면 사진의 양끝을 짚어 보세요",
    "paragraphs": [
      "하프 후보를 고를 때는 가운데 보석만 보지 말고 줄의 양끝을 찾아보세요. 정면 사진에서는 풍성하게 보여도 옆으로 돌리면 금속 면이 시작되는 위치가 드러납니다. 원하는 것은 손가락 위쪽만의 장식인지, 양옆까지 이어지는 장식인지 사진에 표시해 보세요.",
      "풀 후보라면 정면 한 장으로 둘레 전체를 판단하지 말고 반대편 사진도 확인하세요. 상품명이 이터니티이거나 파베라는 이유만으로 반드시 한 바퀴 전체에 보석이 있다고 추정하지 않는 것이 좋습니다. 보석 줄의 수와 실제 배열 범위는 각각 확인할 항목입니다.",
      "정면에서 좋아 보이는 범위를 찾았더라도 양옆에서 보석과 세팅이 옆 손가락에 닿는 느낌은 별도로 확인하세요. 이 글의 비교표는 둘레 범위를 고르기 위한 기준이며, 특정 형태가 누구에게나 편하다는 뜻은 아닙니다."
    ],
    "bullets": [
      "정면에서 보석 줄이 끝나는 양쪽 지점",
      "양옆에서 금속 면으로 바뀌는 위치",
      "손바닥 쪽의 보석 유무",
      "한 줄 또는 여러 줄 중 원하는 배열"
    ],
    "table": null
  },
  {
    "title": "내 호수에서도 같은 배열인지 물어보세요",
    "paragraphs": [
      "참고 사진의 반지와 주문할 반지의 호수가 같지 않을 수 있습니다. 상담할 때는 사진 속 보석 개수나 끝점이 내 호수에서도 그대로 유지되는지, 아니면 배열이 달라지는지 확인해 달라고 요청하세요. 호수가 달라지면 반드시 특정 개수만큼 보석이 늘어난다고 미리 계산하지 마세요.",
      "하프는 세팅 양끝이 원하는 위치에 오는지, 풀은 전체 둘레의 보석 배열을 어떤 기준으로 맞추는지 질문하면 좋습니다. 견적을 비교할 때도 하프·풀 이름만 맞추지 말고 해당 호수의 보석 구성과 금속 사양을 함께 확인하세요.",
      "사이즈 변경은 디자인별로 가능한 범위가 다릅니다. 하프라서 언제나 조절할 수 있다거나 풀이라서 어떤 방법으로도 변경할 수 없다고 단정하지 말고 주문 전에 조건을 물어보세요. 조절 작업과 수리 기간에 관한 자세한 내용은 관련 가이드에서 따로 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "세팅 범위를 표시해 주문 상담을 시작하세요",
    "paragraphs": [
      "원하는 반지 사진에 보석이 이어졌으면 하는 구간을 표시해 주세요. 정면뿐 아니라 손바닥 쪽에 보석이 있어도 좋은지 적으면 선택 기준을 전달하기 쉽습니다. 아직 호수를 확정하지 못했다면 평소 착용하는 반지 호수는 참고 정보로만 남겨 주세요.",
      "문의 예시: “이터니티 반지를 주문하고 싶습니다. 한 줄 하프 형태를 생각하고 있고, 손바닥 면은 금속으로 남았으면 합니다. 첨부 사진의 표시한 지점까지 보석이 오는 디자인이 가능한지, 제 호수에서의 배열과 견적을 상담받고 싶어요. 희망 수령일은 ○월 ○일입니다.”",
      "아래 카카오톡 상담으로 사진과 원하는 범위를 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 제작 가능한 디자인과 보석 구성, 일정과 가격을 확인할 수 있습니다. 기존 반지 옆에 함께 낄 계획이라면 그 사실도 알려 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "정면 사진 한 장이나 상품명만으로 보석의 전체 배열 범위를 판단하지 마세요. 옆면과 반대편도 확인하세요.",
  "참고 사진의 호수와 보석 수가 주문할 반지에 그대로 적용되는지 제작 전에 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "이터니티 반지 주문 상담 안내",
    "description": "원하는 세팅 범위와 참고 사진을 준비해 상담하세요."
  },
  {
    "to": "/guide/ring-resizing-repair-time",
    "label": "주문 전 알아둘 사이즈 조절 조건",
    "description": "보석이 이어진 반지의 조절 제한과 작업 확인 항목입니다."
  },
  {
    "to": "/guide/wedding-band-guard-ring-guide",
    "label": "기존 반지와 함께 낄 때 확인하기",
    "description": "가드링 조합의 곡선·높이·접촉 위치는 별도로 비교하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '이터니티 반지, 하프와 풀 선택법'
const gmArticleLead = '이터니티 반지를 구매한다면 “보석이 손바닥 쪽까지 이어져야 할까?”부터 생각해 보세요. 하프와 풀의 차이는 반짝임의 양뿐 아니라 보석이 놓이는 위치에 있습니다. 정면·양옆·손바닥 면에서 원하는 범위를 정리하면 귀족에 주문할 디자인을 더 구체적으로 설명할 수 있습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '이터니티 반지 하프 풀'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '이터니티 반지 하프·풀 세팅 범위'
const gmHeroAlt = '짙은 돌 앞에 세운 윗부분에 작은 흰 보석 한 줄이 있는 금빛 반지'
const gmHeroCaption = '디자인 구조를 설명하기 위해 만든 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '하프·풀의 구분과 하프서클 제품 사례는 Tiffany 공식 안내를 참고했습니다. 세팅 끝점과 호수별 배열을 묻는 순서는 주문 상담을 위한 편집 제안이며, 실제 구성과 변경 가능 범위는 선택한 디자인에 따라 확인합니다.'
const gmSources = [
  {
    "label": "Tiffany — Diamond Eternity Rings",
    "url": "https://www.tiffany.com/jewelry/eternity-rings/diamond/",
    "note": "하프와 풀 이터니티의 보석 배열 범위 정의."
  },
  {
    "label": "Tiffany — Forever Half-circle Band",
    "url": "https://www.tiffany.com/jewelry/rings/tiffany-forever-18k-yellow-gold-round-brilliant-diamonds-rings-1451573645.html",
    "note": "하프서클 보석 밴드의 실제 제품 표기."
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
