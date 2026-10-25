<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/handwriting-engraving-custom-order'
const pageTitle = '손글씨 각인 주문제작, 원본 준비와 확인법 | 귀족'
const pageDescription = '손글씨 각인으로 필체를 남기고 싶다면 원본 사진과 사용할 부분부터 정리하세요. 반지·펜던트의 각인 면에 맞춰 획·여백·방향을 확인하는 방법과 종로 귀족에 보낼 문의 예시를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/handwriting-engraving-custom-order-hero-c530028e.webp`
const publishedAt = '2026-10-25'
const updatedAt = ''
const faqItems = [
  {
    "question": "손글씨 각인을 하려면 새로 써야 하나요?",
    "answer": "이미 가지고 있는 카드나 메모의 사진으로도 표현 가능 범위를 상담할 수 있습니다. 새로 덧쓰기보다 가장 선명한 원본과 사용할 부분을 먼저 보내 주세요."
  },
  {
    "question": "필기체 서체를 고르면 원래 손글씨와 같아지나요?",
    "answer": "기성 필기체와 실제 자필의 모양은 다릅니다. 특정인의 필체를 남기고 싶다면 문구를 입력하는 것과 별도로 원본 사진을 보내고 그 의도를 설명하세요."
  },
  {
    "question": "긴 편지 한 문장을 작은 펜던트에 모두 넣을 수 있나요?",
    "answer": "각인할 면과 원본 글씨의 형태에 따라 확인해야 합니다. 전체 문장을 줄인 안과 의미 있는 짧은 부분만 남긴 안을 비교하고, 실제 영역에서 어떻게 읽힐지 상담하세요."
  },
  {
    "question": "AI로 선명하게 보정한 손글씨 사진을 보내도 되나요?",
    "answer": "보정본과 함께 수정 전 원본도 보내는 편이 좋습니다. 자동 보정이 원래 획을 확인해 주는 것은 아니므로, 원본과 달라진 모양이 있는지 먼저 살펴보세요."
  }
]
const quickAnswers = [
  "글자를 입력하고 기성 서체를 고르는 주문과, 실제 손글씨 이미지를 참고해 필체를 옮기는 주문을 구분해 주세요. 상담 첫 문장에 어느 쪽을 원하는지 적으면 좋습니다.",
  "수정하지 않은 원본과 사용할 부분을 표시한 사본을 함께 준비하세요. 흐릿한 획을 덧쓰거나 자동 보정한 이미지가 있다면 원본과 구분해 보냅니다.",
  "큰 화면에서 읽히는 것과 작은 각인 면에서 읽히는 것은 다를 수 있습니다. 실제로 들어갈 영역의 크기와 글자 간격·방향을 확인할 방법을 상담하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "손글씨 각인은 필기체 서체를 고르는 것과 어떻게 다른가요?",
    "paragraphs": [
      "기성 필기체는 입력한 글자를 준비된 서체로 표현하는 방식이고, 자필을 남기려는 주문은 원본에 있는 획과 간격을 참고한다는 점이 다릅니다. 같은 “사랑해”라는 말도 끝획의 모양이나 글자의 기울기 때문에 특별하게 느껴질 수 있습니다. 내용만 새기려는지, 그 사람이 쓴 모양까지 남기려는지 먼저 정해 보세요.",
      "기념일 카드의 짧은 문장, 가족이 적어 준 이름처럼 의미 있는 자료를 준비할 수 있습니다. 다만 모든 필체를 모든 제품에 동일하게 옮길 수 있다는 뜻은 아닙니다. 원본을 보여 주며 어떤 특징을 살리고 싶은지 설명하고, 제품에 맞는 표현 범위를 확인해야 합니다.",
      "글자 자체가 펜던트의 외곽이 되길 원하는 경우는 금속 면에 새기는 각인형과 상담할 내용이 다릅니다. 이 글은 주얼리의 면 위에 손글씨를 남기려는 경우를 다룹니다. 글자형과 판형 중 아직 고민 중이라면 아래 ‘이니셜 목걸이 형태 선택’ 글을 먼저 참고해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "손글씨 원본은 어떤 사진으로 준비하면 좋나요?",
    "paragraphs": [
      "글씨의 획이 잘 보이는 수정 전 사진을 먼저 준비하세요. 촬영할 수 있는 원본이 있다면 종이를 가능한 한 정면에서 찍고, 초점이 맞았는지와 손·휴대전화의 그림자가 글씨를 가리지 않는지 확인합니다. 사용할 부분을 확대해도 획이 알아볼 수 있는지 살펴보세요.",
      "손글씨 주얼리를 제작하는 Raniska는 자사 안내에서 글씨를 가까이서 선명하게 촬영하도록 요청하고, 받은 자료의 선명도와 세부 표현을 검토한다고 설명합니다. 이는 원본 상태를 확인하는 브랜드 사례이며, 특정 사진 규격이나 제작 방식이 모든 매장에 동일하게 적용된다는 뜻은 아닙니다.",
      "편지 전체를 남겨 둔 원본과, 새기고 싶은 부분을 표시한 사본을 나누어 보내는 방법을 권합니다. 종이 원본 위에 선을 긋기보다 사진 사본에서 표시해 주세요. 파일이 여러 장이라면 “원본”, “사용할 부분”, “보정본”처럼 구분하면 어떤 자료를 기준으로 볼지 전달하기 쉽습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "가지고 있는 자료",
        "먼저 확인할 부분",
        "상담할 때 함께 보낼 것"
      ],
      "rows": [
        [
          "새로 촬영할 수 있는 글씨",
          "초점·그림자·비스듬한 촬영 여부",
          "수정하지 않은 선명한 사진"
        ],
        [
          "오래된 편지 사진",
          "옅어진 획과 종이 얼룩이 구분되는지",
          "가장 선명한 원본 파일과 사용할 부분 표시"
        ],
        [
          "긴 문장이나 여러 줄",
          "어느 단어와 줄을 남길지",
          "선택한 부분 및 원하는 줄바꿈 설명"
        ],
        [
          "자동 보정한 이미지",
          "원래 없던 획이 더해지거나 모양이 바뀌었는지",
          "보정 전 원본과 보정본을 구분한 파일"
        ]
      ]
    }
  },
  {
    "title": "반지나 펜던트에 작게 넣을 때 무엇을 확인하나요?",
    "paragraphs": [
      "제품 전체 크기보다 실제로 각인이 들어갈 면을 기준으로 보세요. 반지 안쪽의 띠 모양 영역과 판형 펜던트의 앞면은 글씨를 배치하는 공간이 다릅니다. 넣고 싶은 글씨가 길거나 여러 줄이라면, 같은 제품에서도 남길 부분에 따라 축소 정도가 달라질 수 있습니다.",
      "Nomination은 자사 손글씨 각인 안내에서 작은 주얼리 표면에 맞춰 그림이나 글씨를 축소하며 사진의 적합성을 검토한다고 설명합니다. 이 사례처럼 원본이 또렷해도, 실제 들어갈 크기로 줄인 상태는 별도로 확인하는 편이 좋습니다.",
      "상담에서는 “각인할 영역은 가로·세로 어느 정도인가요?”, “이 크기에서 글자 사이의 빈 공간과 작은 점이 구분되나요?”라고 물어보세요. 전체 문장이 너무 작아진다면 의미 있는 한 단어나 짧은 구절만 남기는 안을 비교할 수 있습니다. 원본을 유지하는 것과 글씨를 크게 읽히게 하는 것 중 어느 쪽이 중요한지도 알려 주세요.",
      "화면 확대본만 보고 결정하지 말고 실제 크기와 배치를 어떤 자료로 확인할 수 있는지 상담하세요. 종이에 예정 크기로 표시해 보는 것은 크기를 가늠하는 보조 방법이며, 금속 표면의 반사와 각인 결과까지 재현하는 견본은 아닙니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "필체를 살리려면 어떤 획과 배치를 짚어야 하나요?",
    "paragraphs": [
      "남기고 싶은 필체의 특징과 정리하고 싶은 배경을 구분하세요. 삐뚤한 글자나 긴 끝획 자체가 의미 있다면 “이 모양은 유지하고 싶다”고 적습니다. 종이 얼룩이나 주변 메모는 제외하고 싶다는 뜻도 별도로 전달해 주세요. 글씨를 더 반듯하게 만드는 것이 항상 원본의 느낌을 살리는 것은 아닙니다.",
      "확인 자료를 받게 되면 원본과 나란히 놓고 빠진 점·획·띄어쓰기·줄바꿈을 살펴보세요. 맞춤법이나 날짜를 고치고 싶다면 원본 그대로 남길 부분과 수정 요청을 나누어 적는 편이 좋습니다. 글자가 실제로 읽히는 방향과 제품을 착용했을 때의 위아래도 확인합니다.",
      "흐릿한 부분은 먼저 원래 글자가 무엇인지 설명하고 표현 가능한 범위를 물어보세요. AI나 자동 보정 도구로 선명해 보이게 만든 결과에는 원래와 다른 획이 생길 수 있습니다. 보정본을 사용하고 싶더라도 원본과 달라진 부분을 확인한 뒤 상담 기준을 정하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 손글씨 각인을 어떻게 문의하나요?",
    "paragraphs": [
      "원본 사진과 사용할 글씨, 원하는 품목을 보내며 자필 모양을 살리고 싶다고 알려 주세요. 제품을 새로 만들려는지, 가지고 있는 제품의 각인을 문의하는지도 구분하면 좋습니다. 기존 제품이라면 전체 모습과 새기고 싶은 면의 사진도 함께 보내고 작업 가능 여부부터 확인합니다.",
      "문의 예시: “첨부한 카드의 ‘사랑해’ 부분을 판형 펜던트에 남기고 싶습니다. 문구를 기성 서체로 바꾸기보다 원래 글씨의 기울기와 끝획을 살리고 싶어요. 원본과 사용할 부분을 표시한 사진을 보냅니다. 가능한 표현 방식과 각인 면 크기, 목걸이로 제작할 때의 견적을 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 사진과 예산·희망 수령일을 전달해 주세요. 원본과 제품을 확인한 뒤 표현 가능한 범위, 필요한 자료, 견적과 일정을 상담합니다. 목걸이라면 체인 포함 여부도 함께 적어 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "외부 브랜드 자료는 원본 검토와 축소 확인의 사례로 참고했습니다. 해당 브랜드의 각인 색·반품·가격·제작 조건이 귀족에 적용되는 것은 아닙니다.",
  "손글씨의 표현 범위와 작업 가능 여부는 원본 및 제품 확인이 필요합니다. 사진 속 모든 획의 동일한 재현이나 특정 크기에서의 가독성을 미리 확정하지 마세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "손글씨 원본으로 제작 상담",
    "description": "원본과 사용할 부분, 원하는 품목을 함께 보내 주세요."
  },
  {
    "to": "/guide/couple-ring-engraving-guide",
    "label": "일반 각인의 문구·위치·서체 선택",
    "description": "자필 대신 기성 서체를 사용할 때 참고하세요."
  },
  {
    "to": "/guide/jongno-initial-necklace-custom-order",
    "label": "이니셜 목걸이 형태 선택",
    "description": "글자형 펜던트와 판에 새기는 각인형을 비교하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "원하는 제품 형태와 각인할 면의 느낌을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '손글씨 각인 주문제작, 원본 준비와 확인법'
const gmArticleLead = '손글씨 각인 주문제작은 글자의 내용뿐 아니라 직접 쓴 획의 모양을 주얼리에 담을 수 있는지 확인하는 상담입니다. 원본 사진과 사용할 부분을 보내고, 새길 면에 맞춰 줄였을 때 글씨가 어떻게 보일지 살펴보세요. 표현 가능한 범위는 원본의 선명도와 제품의 각인 면, 작업 방식에 따라 확인해야 합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '손글씨 각인'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '손글씨 원본을 활용한 주얼리 각인 제작 상담'
const gmHeroAlt = '넓은 금빛 타원형 펜던트 면에 작은 손그림 하트의 각인 위치를 보여 주는 예시'
const gmHeroCaption = '각인할 면과 여백을 설명하는 AI 생성 디자인 예시입니다. 실제 손글씨 복제 결과나 판매 제품·완성된 제작 사례가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '손글씨 원본 검토와 작은 면에 맞춘 축소는 각 브랜드의 자사 서비스 안내를 참고했습니다. 자료 구분표와 확인 질문, 문의 문장은 주문 상담을 돕기 위한 제안이며 특정 브랜드의 조건을 귀족의 제작 조건으로 적용한 것이 아닙니다.'
const gmSources = [
  {
    "label": "Raniska — 손글씨 사진 준비와 검토 사례",
    "url": "https://raniska.com/pages/our-process-handwriting",
    "note": "선명한 손글씨 사진을 요청하고 세부 표현을 검토하는 브랜드 사례입니다."
  },
  {
    "label": "Nomination — 작은 각인 면에 맞춘 축소 안내",
    "url": "https://www.nomination.com/us_en/handwriting-guide-us",
    "note": "작은 주얼리 표면에 맞춘 축소와 사진 적합성 검토를 안내하는 브랜드 사례입니다."
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
