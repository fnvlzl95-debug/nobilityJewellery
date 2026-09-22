<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-earring-set-buying-guide'
const pageTitle = '목걸이·귀걸이 세트, 조합부터 고르세요 | 귀족'
const pageDescription = '목걸이·귀걸이 세트를 구매할 때는 공통 모티브와 두 품목의 크기 비율, 실제 포함 구성을 확인하세요. 귀족 갤러리의 세트 디자인을 비교하고 필요한 품목을 골라 구매·제작 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-earring-set-buying-guide-hero-830ae920.webp`
const publishedAt = '2026-09-22'
const updatedAt = ''
const faqItems = [
  {
    "question": "목걸이와 귀걸이의 모양이 완전히 같아야 세트인가요?",
    "answer": "같은 모양을 반복하는 구성도 있고, 공통된 요소를 두고 서로 보완하는 조합도 있습니다. 함께 남기고 싶은 모티브와 강조할 품목을 먼저 골라 보세요."
  },
  {
    "question": "세트 사진에 있는 반지와 팔찌도 함께 주문해야 하나요?",
    "answer": "사진만으로 구매 조건을 알 수는 없습니다. 필요한 품목에 표시해 보내고 목걸이·귀걸이만의 구성으로 구매하거나 제작할 수 있는지 확인해 주세요."
  },
  {
    "question": "같은 모티브면 목걸이와 귀걸이 크기도 같나요?",
    "answer": "반드시 같지는 않습니다. 각 품목의 치수나 같은 척도로 비교할 수 있는 자료를 확인하고, 원하는 크기 비율을 상담에서 전달하세요."
  },
  {
    "question": "목걸이를 먼저 사고 귀걸이를 나중에 맞출 수 있나요?",
    "answer": "그 계획을 처음 상담 때 알려 주세요. 나중에도 동일한 구성으로 구매하거나 제작할 수 있는지는 추가 주문 시점에 확인해야 합니다."
  }
]
const quickAnswers = [
  "같은 꽃·서클·링크 모양이 목걸이와 귀걸이에서 어떻게 반복되는지 먼저 살펴보세요.",
  "같은 디자인이어도 두 품목의 크기가 같아야 하는 것은 아닙니다. 어느 쪽을 강조할지 골라 보세요.",
  "세트 사진과 실제 주문 구성을 구분하고, 목걸이 한 개·귀걸이 한 쌍 등 필요한 품목을 적어 문의하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "두 품목에서 같이 남길 모양을 찾으세요",
    "paragraphs": [
      "세트의 통일감은 같은 모양을 반복하거나 서로 어울리는 요소를 고르는 데서 시작할 수 있습니다. Tiffany의 공식 세트 안내도 목걸이와 귀걸이를 맞추는 구성뿐 아니라 같은 컬렉션의 서로 보완되는 디자인을 조합하는 방식을 소개합니다.",
      "사진에서 목걸이와 귀걸이에 함께 들어간 부분을 찾아보세요. 꽃잎의 윤곽인지, 둥근 서클인지, 길쭉한 링크인지가 보이면 원하는 분위기를 설명하기 쉽습니다. 모티브는 유지하면서 한쪽의 장식을 덜고 싶은지도 생각해 보세요. 실제 변경 가능한 범위는 제품별로 확인합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 조합",
        "목걸이에서 볼 점",
        "귀걸이에서 볼 점"
      ],
      "rows": [
        [
          "두 품목이 비슷하게 눈에 띄는 조합",
          "공통 모양의 크기와 장식",
          "같은 모양이 어느 정도로 반복되는지"
        ],
        [
          "목걸이를 중심으로 한 조합",
          "강조하고 싶은 펜던트 윤곽",
          "공통 모양을 작게 남긴 후보"
        ],
        [
          "귀걸이를 중심으로 한 조합",
          "간결한 형태의 후보",
          "강조하고 싶은 길이와 장식"
        ]
      ]
    }
  },
  {
    "title": "귀족 갤러리에서 모티브가 다른 세트를 비교하세요",
    "paragraphs": [
      "“오벌 링크 파베 주얼리 세트”는 오벌 링크와 파베 디테일을 맞춘 반지·목걸이·귀걸이 구성으로 소개돼 있습니다. 링크 모양을 두 품목에서 함께 가져가고 싶다면 비교해 볼 수 있습니다.",
      "둥근 모양과 아래로 이어지는 장식이 좋다면 “서클 드롭 파베 주얼리 세트”를, 꽃잎 모양이 좋다면 “플라워 모티브 주얼리 세트”를 살펴보세요. 플라워 모티브 세트의 갤러리에는 목걸이·팔찌·반지·귀걸이가 함께 소개돼 있습니다.",
      "아래 갤러리 링크에서 사진을 보고 원하는 목걸이와 귀걸이에 표시해 보세요. 여러 품목이 함께 나온 사진은 디자인을 비교하는 자료입니다. 목걸이와 귀걸이만 선택할 수 있는지, 장식이나 크기를 바꿀 수 있는지는 상품명과 함께 문의해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "크기 비율과 실제 포함 품목을 나누어 확인하세요",
    "paragraphs": [
      "목걸이 사진과 귀걸이 사진의 확대 비율이 다르면 실물에서도 같은 크기인지 알아보기 어렵습니다. 함께 놓인 사진이나 각 품목의 치수를 요청하고, 펜던트보다 귀걸이가 작기를 원하는지 등 선호하는 비율을 구체적으로 말해 보세요. 같은 모양이더라도 두 품목을 꼭 같은 크기로 맞춰야 한다는 기준은 없습니다.",
      "주문 구성은 사진과 별도로 확인하세요. Tiffany의 특정 세트 상품도 펜던트 한 개와 귀걸이 한 쌍, 체인 정보를 구분해 적고 있습니다. 이 사례처럼 후보 제품에서도 세트에 무엇이 들어가는지를 읽어 보는 것이 좋습니다. 타사 구성이나 포장·판매 조건이 귀족에 그대로 적용되는 것은 아닙니다.",
      "견적 문의에는 “목걸이 한 개, 귀걸이 한 쌍, 반지·팔찌 제외”처럼 필요한 것을 적어 주세요. 목걸이의 체인 포함 여부와 귀걸이의 한 쌍 구성도 함께 확인하면 서로 다른 구성을 같은 세트 가격으로 비교하는 일을 줄일 수 있습니다."
    ],
    "bullets": [
      "목걸이와 귀걸이 각각의 실제 모티브 크기",
      "목걸이 체인 포함 여부",
      "귀걸이 한 쌍 기준인지 여부",
      "사진에 함께 나온 반지·팔찌의 포함 또는 제외"
    ],
    "table": null
  },
  {
    "title": "상품명과 필요한 품목을 보내 상담하세요",
    "paragraphs": [
      "세트 전체가 마음에 들면 상품명과 사진을 그대로 보내 주세요. 일부 품목만 필요하다면 사진에서 해당 부분을 표시하고, 어느 품목을 더 강조하고 싶은지 적으면 됩니다. 세트라는 이유만으로 개별 구매보다 저렴하다고 가정하기보다는 선택한 구성의 견적을 확인하세요.",
      "문의 예시: “갤러리의 오벌 링크 파베 주얼리 세트를 보고 문의합니다. 목걸이 한 개와 귀걸이 한 쌍을 원하고, 반지는 제외한 구성을 상담받고 싶습니다. 링크 모양은 함께 유지하면서 귀걸이는 덜 눈에 띄는 크기를 선호해요. 구성 선택과 크기 변경이 가능한지, 체인 포함 견적과 ○월 ○일 수령 가능 여부를 알려 주세요.”",
      "아래 카카오톡 상담으로 상품명·사진·필요한 품목·희망일을 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 구매 또는 제작 가능한 구성과 가격·일정을 확인할 수 있습니다. 단품을 먼저 고르고 나중에 다른 품목을 더할 계획이라면 그 점도 알려 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "세트 전체 사진에 나온 품목이 견적에 모두 포함되는 것은 아닐 수 있습니다. 실제 주문 구성을 확인하세요.",
  "일부 품목만의 구매, 크기 변경, 추후 같은 디자인 추가 주문은 제품과 시점에 따라 확인이 필요합니다."
]
const relatedLinks = [
  {
    "to": "/gallery",
    "label": "귀족 주얼리 세트 사진 보기",
    "description": "오벌 링크·서클 드롭·플라워 모티브를 비교해 보세요."
  },
  {
    "to": "/custom",
    "label": "원하는 품목으로 주문 상담하기",
    "description": "상품명과 필요한 목걸이·귀걸이 구성을 알려 주세요."
  },
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 형태와 착용 방식 확인",
    "description": "세트 디자인을 고른 뒤 귀걸이 자체의 착용 조건을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '목걸이·귀걸이 세트, 조합부터 고르세요'
const gmArticleLead = '목걸이·귀걸이 세트를 고를 때는 사진 속 모든 장신구를 한꺼번에 살지부터 고민할 필요가 없습니다. 두 품목에 반복되는 모양을 찾고, 목걸이와 귀걸이 중 어디를 더 강조할지 정해 보세요. 귀족 갤러리에서 마음에 드는 세트를 고른 뒤 필요한 품목과 원하는 비율을 알려 주시면 구매·제작 조건을 상담할 수 있습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '목걸이 귀걸이 세트'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '목걸이·귀걸이 세트 구성과 디자인'
const gmHeroAlt = '밝은 천 위 같은 원형 디자인의 금빛 목걸이 한 개와 작은 스터드 귀걸이 한 쌍'
const gmHeroCaption = '목걸이와 귀걸이의 공통 모양을 설명하기 위해 만든 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '세트 조합과 포함 품목의 표기 사례는 Tiffany 공식 안내를, 귀족 상품명과 구성 설명은 홈페이지 갤러리를 참고했습니다. 강조할 품목과 크기 비율을 고르는 표는 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Tiffany — Jewelry Sets",
    "url": "https://www.tiffany.com/jewelry/jewelry-sets/",
    "note": "같은 모티브와 서로 보완되는 디자인으로 세트를 조합하는 안내."
  },
  {
    "label": "Tiffany — Open Heart Pendant and Earrings Set",
    "url": "https://www.tiffany.com/jewelry/necklaces-pendants/ep-open-heart-sterling-silver-necklaces-pendants-1404181691.html",
    "note": "펜던트·귀걸이 한 쌍·체인을 구분해 표기한 공식 세트 사례."
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
