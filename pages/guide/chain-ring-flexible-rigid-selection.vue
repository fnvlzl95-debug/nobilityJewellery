<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/chain-ring-flexible-rigid-selection'
const pageTitle = '체인 반지 구매, 유연형과 고정형 차이 | 귀족'
const pageDescription = '체인 반지는 움직이는 링크로 만든 제품과 체인 모양을 고정한 제품이 있습니다. 사진의 무늬만 보지 말고 움직이는 구간과 안쪽 면을 확인하세요. 원하는 연결 모양과 착용 방식을 정해 귀족에 구매·제작 가능 범위를 문의할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/chain-ring-flexible-rigid-selection-hero-9bc64ba3.webp`
const publishedAt = '2026-09-26'
const updatedAt = ''
const faqItems = [
  {
    "question": "체인 반지는 일반 반지처럼 모양이 고정되어 있나요?",
    "answer": "제품에 따라 다릅니다. 링크가 움직이는 체인 반지도 있고 체인 모양이 고정된 반지도 있습니다. 구매 전 실제로 움직이는 구간을 확인하세요."
  },
  {
    "question": "체인 반지 사진만으로 유연한 제품인지 알 수 있나요?",
    "answer": "정면의 링크 무늬만으로는 판단하기 어렵습니다. 구조 설명과 움직임을 보여 주는 자료를 요청하고, 안쪽 면과 장식 연결 부분도 함께 살펴보세요."
  },
  {
    "question": "체인 반지는 손가락에 맞게 저절로 늘어나나요?",
    "answer": "링크가 움직이는 것과 전체 길이가 늘어나는 것은 다릅니다. 유연형도 제품에 맞는 크기를 골라야 하므로 선택 가능한 호수와 조정 범위를 확인하세요."
  },
  {
    "question": "체인 반지 주문제작 사진에는 무엇을 표시하나요?",
    "answer": "유지하고 싶은 링크 모양과 장식 유무를 표시하고, 링크가 움직이기를 원하는지 고정된 형태를 원하는지 적어 주세요. 실제 가능한 구조는 상담에서 확인합니다."
  }
]
const quickAnswers = [
  "체인 반지라는 이름만으로 링크가 움직이는지 알 수 없습니다. 제품별 연결 구조를 확인하세요.",
  "유연한 체인을 원하는지, 체인 모양이 고정된 반지를 원하는지 먼저 정하면 후보를 좁히기 쉽습니다.",
  "정면 사진에 더해 움직임을 보여 주는 자료와 안쪽 면을 확인한 뒤 착용할 손가락에 맞춰 상담하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "체인 반지는 모두 링크가 움직이나요?",
    "paragraphs": [
      "아닙니다. 체인 반지에는 유연하게 움직이는 구조와 고정된 구조가 모두 있습니다. Rebecca Wolf Design의 Aura는 착용하면서 반지 형태를 이루는 유연한 박스 체인으로 설명되고, Emanuele Bicocchi의 Chain Ring은 고정된 커브 체인 구조로 명시되어 있습니다.",
      "따라서 상품명이나 체인 무늬 사진만으로 움직임을 판단하기는 어렵습니다. 온라인에서 후보를 찾았다면 “각 링크가 움직이는 제품인가요, 체인 모양이 고정되어 있나요?”라고 먼저 물어보세요. 일부 구간만 움직이는 제품이라면 그 구간을 나누어 확인하면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "유연형과 고정형 중 무엇을 고르면 좋나요?",
    "paragraphs": [
      "연결 마디가 따라 움직이는 느낌을 원하는지, 체인 무늬가 일정한 윤곽을 유지하기를 원하는지부터 정해 보세요. 구조 이름만으로 더 편하거나 튼튼한 쪽을 정할 수는 없습니다. 같은 구조 안에서도 링크의 모양, 안쪽 마감과 착용 조건이 다를 수 있습니다.",
      "아래 표는 원하는 착용 방식을 설명하기 위한 비교입니다. 유연형·고정형은 여기서 움직임을 구분하는 말이며, 모든 판매자가 동일한 상품 분류명으로 사용하는 것은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교할 부분",
        "링크가 움직이는 제품",
        "체인 모양이 고정된 제품"
      ],
      "rows": [
        [
          "원하는 형태",
          "연결 마디가 손가락을 따라 놓이는 느낌",
          "체인 무늬가 일정한 반지 윤곽을 유지하는 느낌"
        ],
        [
          "구조 확인",
          "어느 연결 마디가 움직이는지 보기",
          "고정된 부분과 실제 움직이는 부분 구분하기"
        ],
        [
          "착용할 때 볼 곳",
          "마디 사이와 안쪽 면이 닿는 느낌",
          "링크 모양의 돌출부와 안쪽 면이 닿는 느낌"
        ],
        [
          "상담 자료",
          "움직임을 보여 주는 짧은 영상",
          "정면·측면·안쪽 형태를 보여 주는 사진"
        ]
      ]
    }
  },
  {
    "title": "정면 사진 외에 무엇을 확인해야 하나요?",
    "paragraphs": [
      "움직이는 구간, 손가락에 닿는 안쪽, 장식과 체인이 만나는 부분을 확인하세요. 손에 올렸을 때와 바닥에 놓았을 때의 형태를 비교한 자료가 있으면 실제 움직임을 이해하기 쉽습니다. 고정형인지 모르는 반지를 직접 구부려 시험하기보다는 판매자에게 구조를 확인해 주세요.",
      "장식이 달린 체인 반지라면 체인 전체가 움직이는지, 장식 주변만 고정되는지도 살펴보세요. 마음에 드는 것이 링크 자체인지, 위쪽 장식인지 사진에 표시하면 주문 상담에서 유지하고 싶은 부분을 설명하기 좋습니다.",
      "사이즈 선택 역시 제품별 안내를 따라야 합니다. 유연한 체인이라고 길이가 자유롭게 늘어나는 것은 아닙니다. Rebecca Wolf Design의 해당 제품은 링크를 덜어내는 방식 때문에 선택 가능한 크기에 간격이 있다고 안내합니다. 이 방식을 모든 체인 반지에 적용하지 말고, 후보 제품의 선택 가능한 호수와 변경 범위를 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "체인 반지 구매·주문 상담은 어떻게 하나요?",
    "paragraphs": [
      "원하는 링크 모양과 움직임 여부를 함께 알려 주세요. 예를 들어 “사진처럼 연결 마디가 보이는 체인 반지를 찾고 있어요. 링크가 부드럽게 움직이는 구성을 원하고, 위쪽 장식은 없는 형태가 좋습니다. 이런 구조로 구매 또는 제작 가능한지 상담받고 싶어요”라고 요청할 수 있습니다.",
      "귀족 카카오톡에 정면·안쪽 참고 사진·희망 움직임·착용할 손가락·예산·희망일을 보내 주세요. 체인 무늬가 고정된 형태를 원한다면 그 점을 별도로 적어 주세요. 실제 구조와 소재, 제작 가능 범위, 견적·일정은 상담에서 확인합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에 방문하기 전, 사진의 어느 연결 모양이 마음에 드는지 짚어 보세요. 원하는 모양과 움직임을 나누어 보내면 서로 다른 체인 반지를 같은 제품으로 이해하는 일을 줄일 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "체인처럼 보이는 고정형 반지를 억지로 구부리지 마세요. 움직이는 부분은 해당 제품의 설명으로 확인하세요.",
  "유연한 구조만으로 프리사이즈, 늘어남, 편안함이나 내구성을 보장할 수 없습니다. 제품별 사양과 착용 상태를 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "체인 반지 구매·제작 문의",
    "description": "원하는 링크 모양과 움직임을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 보기",
    "description": "상담에 참고할 전체 형태를 살펴보세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "착용할 손가락의 사이즈 확인",
    "description": "구조를 고른 뒤 기본 호수 측정 기준을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '체인 반지 구매, 유연형과 고정형 차이'
const gmArticleLead = '체인 반지는 모두 부드럽게 움직이는 반지가 아닙니다. 링크가 움직이며 손가락을 따라 놓이는 제품과 체인 모양을 고정해 만든 제품이 있습니다. 체인 반지를 구매할 때는 “체인처럼 보이는가”와 “실제로 어느 부분이 움직이는가”를 나누어 확인하세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '체인 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '체인 반지의 연결 구조와 디자인'
const gmHeroAlt = '크림색 천 위에 금빛 연결 고리들이 닫힌 타원으로 이어진 체인 반지 예시'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '유연한 체인과 고정된 체인 모양의 사례는 각 브랜드의 제품 설명을 직접 확인했습니다. 비교표와 상담 질문은 구조를 고르기 위한 제안이며, 해당 브랜드 제품을 귀족에서 판매한다는 뜻은 아닙니다.'
const gmSources = [
  {
    "label": "Rebecca Wolf Design — Aura Flexible Box Chain Ring",
    "url": "https://www.rebeccawolf-design.com/products/aura-flexible-box-chain-ring-silver",
    "note": "유연한 박스 체인과 제품별 사이즈 선택 범위를 설명하는 브랜드 자료입니다."
  },
  {
    "label": "Emanuele Bicocchi — Chain Ring",
    "url": "https://emanuelebicocchi.it/en-us/products/chain-ring",
    "note": "고정된 커브 체인 구조로 명시된 반지의 제조사 설명입니다."
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
