<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/signet-ring-face-shape-selection-guide'
const pageTitle = '시그넷 반지 뜻, 윗면 모양과 착용감 고르는 법 | 귀족'
const pageDescription = '시그넷 반지는 넓은 윗면이 특징인 인장 반지에서 이어진 디자인입니다. 타원형·쿠션형 차이, 무각인 선택, 착용 손가락과 윗면 높이를 비교하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/signet-ring-face-shape-selection-guide-hero-6ec45611.webp`
const publishedAt = '2026-09-15'
const updatedAt = ''
const faqItems = [
  {
    "question": "시그넷 반지는 각인이 없으면 안 되나요?",
    "answer": "각인은 필수가 아닙니다. 무각인 윗면의 곡선이나 각진 윤곽 자체를 디자인으로 선택할 수 있습니다."
  },
  {
    "question": "시그넷 반지는 남자 새끼손가락에만 끼나요?",
    "answer": "남성이나 새끼손가락에 한정되지 않습니다. 착용하고 싶은 손가락을 정한 뒤 윗면의 크기와 옆 손가락 접촉을 비교하세요."
  },
  {
    "question": "타원형과 쿠션형 중 어느 쪽이 더 편한가요?",
    "answer": "모양 이름만으로 정할 수 없습니다. 윗면 크기와 높이, 고리로 이어지는 부분의 폭, 가장자리 마감에 따라 달라지므로 실제 착용 조건에서 확인하세요."
  },
  {
    "question": "시그넷이라는 이름이 순금이라는 뜻인가요?",
    "answer": "아닙니다. 시그넷은 디자인을 가리키며 금속 종류나 함량을 보증하는 표기가 아닙니다. 제품별 소재와 함량을 별도로 확인하세요."
  }
]
const quickAnswers = [
  "시그넷은 금 함량이나 브랜드 이름이 아니라 반지의 디자인을 가리키는 말입니다.",
  "타원형과 쿠션형은 윗면의 외곽선이 다릅니다. 같은 모양도 가로·세로 비례에 따라 인상이 달라집니다.",
  "각인이나 새끼손가락 착용은 필수가 아닙니다. 원하는 손가락에서 윗면 높이와 옆 손가락 접촉을 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "시그넷 반지, 꼭 문장을 새겨야 할까요?",
    "paragraphs": [
      "시그넷 링(signet ring)은 인장 반지라고도 부릅니다. 과거에는 윗면에 새긴 표식을 밀랍에 찍어 편지를 봉인하는 용도로 쓰였습니다. 가문 문장이나 이니셜을 담은 형태에서 오늘날의 다양한 장식용 디자인으로 이어졌습니다.",
      "현재 판매되는 시그넷이 모두 실제 도장처럼 쓸 수 있는 것은 아닙니다. Garrard의 공식 시그넷 안내처럼 아무것도 새기지 않은 채 착용하는 선택도 있습니다. 각인 여부와 별개로 넓은 윗면의 윤곽을 좋아하는지부터 살펴보세요.",
      "시그넷이라는 이름만으로 소재도 정해지지 않습니다. Tiffany의 시그넷 제품군에는 금과 실버가 함께 소개됩니다. 디자인 이름과 금속 종류·함량은 나누어 확인하면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "타원형과 쿠션형은 윗면의 선을 비교하세요",
    "paragraphs": [
      "타원형은 외곽이 연속된 곡선이고, 쿠션형은 사각형의 모서리를 둥글게 다듬은 형태입니다. 쿠션형이라는 이름이 같아도 정사각형에 가까운지, 한쪽으로 길쭉한지에 따라 보이는 비례가 다릅니다.",
      "아래 표는 모양을 고르기 위한 관찰 기준입니다. 어느 형태가 손을 더 길어 보이게 하거나 누구에게나 편하다는 공식은 아니므로, 원하는 손가락 위에서 실제 크기를 비교해 보세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "윗면 형태",
        "먼저 보이는 특징",
        "함께 비교할 부분"
      ],
      "rows": [
        [
          "타원형",
          "모서리 없이 이어지는 곡선",
          "긴 방향이 손가락과 나란한지, 가로로 놓이는지"
        ],
        [
          "쿠션형",
          "직선에 가까운 변과 둥근 모서리",
          "모서리가 둥근 정도와 가로·세로 비례"
        ],
        [
          "두 형태 공통",
          "손가락 위를 덮는 넓은 면",
          "윗면 크기, 가장자리 마감, 측면 높이"
        ]
      ]
    }
  },
  {
    "title": "호수와 별도로 윗면 높이를 살펴보세요",
    "paragraphs": [
      "윗면이 마음에 들어도 손에 얹었을 때 느껴지는 부피는 따로 확인해야 합니다. 정면 사진에서는 비슷해 보이는 두 반지도 옆에서 보면 윗면의 높이와 고리로 이어지는 부분의 폭이 다를 수 있습니다.",
      "가능한 경우 착용할 손가락에 대어 보고 손을 자연스럽게 펴거나 가볍게 굽혀 보세요. 아래 항목을 하나씩 비교하면 단순히 “크다” 또는 “불편하다”는 말보다 어떤 부분이 맞지 않는지 설명하기 쉽습니다."
    ],
    "bullets": [
      "정면: 윗면이 손가락 폭을 어느 정도 덮는지 확인합니다.",
      "측면: 윗면이 얼마나 올라오는지, 가장자리가 두드러지는지 봅니다.",
      "옆 손가락: 손을 모았을 때 반지 옆면이나 윗면 가장자리가 닿아 불편한지 확인합니다.",
      "고정감: 자연스럽게 손을 움직일 때 윗면이 자꾸 옆으로 돌아가는지 살핍니다."
    ],
    "table": null
  },
  {
    "title": "손가락을 정한 뒤 원하는 모양을 설명하세요",
    "paragraphs": [
      "시그넷 반지를 반드시 새끼손가락에 낄 필요는 없습니다. Tiffany도 과거의 새끼손가락·약지 착용을 소개하면서 오늘날에는 어느 손가락에도 착용할 수 있다고 안내합니다. 다른 반지와 함께 낄지, 한 개만 포인트로 쓸지 정한 다음 그 손가락에서 비례를 비교해 보세요.",
      "종로에서 반지 디자인을 상담할 때는 정면 사진 한 장에 더해 옆모습도 준비하면 좋습니다. 예를 들어 “각인 없는 세로 타원형이 좋고, 윗면이 너무 높지 않았으면 합니다. 이 손가락에서 옆 손가락에 닿는 부분을 비교하고 싶습니다”처럼 원하는 형태와 착용 조건을 함께 설명할 수 있습니다.",
      "각인을 원한다면 반지 위에서 글자가 어느 방향으로 보이길 원하는지도 사진에 표시하세요. 실제 표현 가능 범위는 디자인별로 확인하고, 문구·서체를 정하는 방법은 아래 각인 가이드를 참고하면 됩니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "사진의 확대 비율만으로 윗면 크기나 착용감을 판단하지 마세요. 실제 치수와 옆모습을 함께 확인하는 편이 좋습니다.",
  "특정 문장 조각이나 인장 기능, 제작 방식의 가능 여부는 디자인별 상담이 필요합니다. 설명용 이미지가 귀족의 판매 재고를 뜻하지는 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/couple-ring-engraving-guide",
    "label": "반지 각인 문구·위치·서체",
    "description": "각인을 넣기로 정했다면 문구와 배치를 구체화해 보세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "반지 사이즈 확인 방법",
    "description": "디자인을 고른 뒤 착용할 손가락의 호수를 확인하세요."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "일반 반지 주문제작 상담 준비",
    "description": "소재와 사양 등 주문 전 확인할 내용을 정리합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '시그넷 반지 뜻, 윗면 모양과 착용감 고르는 법'
const gmArticleLead = '시그넷 반지는 표식이나 문장을 새겨 인장으로 쓰던 반지에서 이어진 디자인입니다. 요즘은 각인 없이 넓은 윗면 자체를 즐기기도 합니다. 처음 고른다면 새길 문구보다 윗면의 모양과 크기, 손에 얹었을 때의 높이를 먼저 비교해 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '시그넷 반지 뜻'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '시그넷 반지 디자인 선택'
const gmHeroAlt = '둥근 윗면과 쿠션형 무각인 시그넷 반지 두 개, 반지 측정 도구와 손에 착용한 예시를 함께 표현한 이미지'
const gmHeroCaption = '시그넷 반지의 둥근 윗면과 쿠션형, 착용 모습을 표현한 설명용 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'Tiffany와 Garrard의 공식 자료를 바탕으로 시그넷의 배경, 무각인 선택과 착용 위치를 정리했습니다. 윗면 비교표와 착용 체크리스트는 형태를 관찰하고 선호를 설명하기 위한 안내입니다.'
const gmSources = [
  {
    "label": "Tiffany & Co. — Personalized Signet Rings",
    "url": "https://www.tiffany.com/jewelry/signet-rings/personalized/",
    "note": "시그넷의 역사적 표식, 다양한 소재와 착용 손가락 안내."
  },
  {
    "label": "Garrard — Medium Cushion Signet Ring",
    "url": "https://www.garrard.com/en-us/products/medium-cushion-signet-ring-in-18ct-yellow-gold",
    "note": "쿠션형의 둥근 모서리, 무각인 선택과 밀랍 봉인 배경."
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
