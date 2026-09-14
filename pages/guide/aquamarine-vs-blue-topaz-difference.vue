<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/aquamarine-vs-blue-topaz-difference'
const pageTitle = '아쿠아마린·블루 토파즈 차이, 색보다 먼저 볼 것 | 귀족'
const pageDescription = '비슷한 푸른색의 아쿠아마린과 블루 토파즈는 다른 광물입니다. 색 처리와 합성의 차이, 충격·초음파 세척 주의, 제품 설명에서 확인할 항목을 비교했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/aquamarine-vs-blue-topaz-difference-hero-b341babe.webp`
const publishedAt = '2026-09-14'
const updatedAt = ''
const faqItems = [
  {
    "question": "색이 연하면 아쿠아마린이고 진하면 블루 토파즈인가요?",
    "answer": "그렇게 구분할 수 없습니다. 아쿠아마린의 색도 다양하고 두 보석의 외관이 비슷할 수 있어, 보석명과 확인 문서를 함께 봐야 합니다."
  },
  {
    "question": "블루 토파즈가 처리석이면 가짜인가요?",
    "answer": "처리됐다는 이유만으로 가짜나 합성석이 되는 것은 아닙니다. 천연 기원인지와 색 처리가 있었는지를 별도 항목으로 확인하세요."
  },
  {
    "question": "토파즈가 더 단단하니 반지로 더 안전한가요?",
    "answer": "경도는 긁힘 저항이며 깨짐 저항과 다릅니다. 토파즈는 벽개가 있어 충격에 주의해야 하고, 반지의 보석 보호 구조와 착용 환경도 함께 살펴야 합니다."
  },
  {
    "question": "두 보석을 같은 초음파 세척기에 넣어도 되나요?",
    "answer": "토파즈는 초음파·스팀 세척을 피하세요. 아쿠아마린도 균열·액체 내포물·충전 여부에 따라 제한되므로 종류와 상태를 확인하지 않은 채 함께 세척하지 마세요."
  }
]
const quickAnswers = [
  "아쿠아마린과 블루 토파즈는 서로 다른 광물입니다. 연한 색·진한 색만으로 구별할 수 없습니다.",
  "천연 보석에도 색 처리가 쓰일 수 있습니다. 천연 여부와 무처리 여부는 따로 확인하세요.",
  "토파즈는 초음파·스팀 세척을 피하세요. 아쿠아마린도 균열·액체 내포물·충전 여부를 먼저 확인해야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "푸른색이 비슷해도 같은 광물이 아닙니다",
    "paragraphs": [
      "아쿠아마린은 베릴이라는 광물의 푸른색 계열 보석입니다. 블루 토파즈는 토파즈 중 푸른색을 띠는 보석을 가리킵니다. 두 이름은 같은 보석의 색상 등급을 나눈 표현이 아닙니다.",
      "아쿠아마린도 연한 하늘색부터 녹색 기운이 섞인 푸른색까지 다양합니다. 색이 연하면 아쿠아마린, 진하면 토파즈라는 식으로 구분하지 마세요. 상품명에서 두 이름이 함께 보이면 선택 옵션인지, 실제 세팅된 보석이 무엇인지 판매자에게 물어보는 것이 좋습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 항목",
        "아쿠아마린",
        "블루 토파즈"
      ],
      "rows": [
        [
          "광물",
          "베릴 계열",
          "토파즈"
        ],
        [
          "색 처리 사례",
          "가열로 녹색 기운을 줄임",
          "방사선 처리와 가열로 푸른색을 만듦"
        ],
        [
          "모스 경도",
          "7.5~8",
          "8"
        ],
        [
          "관리에서 주의할 점",
          "균열·액체 내포물·충전 여부",
          "벽개로 인한 충격 손상, 초음파·스팀 회피"
        ]
      ]
    }
  },
  {
    "title": "천연이라는 말이 무처리를 뜻하지는 않습니다",
    "paragraphs": [
      "GIA의 처리 안내에 따르면 아쿠아마린은 가열로 녹색 기운을 줄여 더 푸르게 보이게 할 수 있습니다. 블루 토파즈에는 무색 토파즈에 방사선 처리와 가열을 적용해 푸른색을 만드는 방식이 널리 쓰입니다.",
      "천연 여부는 보석이 만들어진 기원에 관한 정보이고, 처리 여부는 이후 색이나 투명도 등에 손을 댔는지에 관한 정보입니다. 천연 토파즈에 색 처리를 했다고 합성 보석이 되는 것은 아닙니다. 반대로 천연이라는 설명만으로 색도 자연 그대로라고 해석할 수는 없습니다."
    ],
    "bullets": [
      "보석명과 천연·합성 여부를 먼저 확인합니다.",
      "가열·방사선·코팅·충전 등 알려진 처리 정보가 있는지 묻습니다.",
      "모든 처리가 한 제품에 쓰였다고 가정하지 말고 해당 보석의 정보를 확인합니다."
    ],
    "table": null
  },
  {
    "title": "경도가 비슷해도 세척법은 다릅니다",
    "paragraphs": [
      "토파즈는 모스 경도 8이지만 특정 방향으로 갈라지는 성질인 벽개가 있습니다. 강한 충격이나 급격한 온도 변화로 손상될 수 있어, 경도 숫자만으로 아쿠아마린보다 충격에 강하다고 판단하면 안 됩니다. GIA는 토파즈의 초음파·스팀 세척을 피하도록 안내합니다.",
      "아쿠아마린은 경도 7.5~8이며 충격과 긁힘에 주의해야 합니다. 초음파·스팀 세척도 액체 내포물이나 균열이 있으면 예외가 생기고, 드물게 충전 처리된 것은 미지근한 비눗물만 사용하도록 안내돼 있습니다.",
      "GIA는 두 보석 모두 미지근한 비눗물 세척을 안내하지만, 완성 주얼리는 함께 세팅된 다른 보석이나 금속, 접착 부위의 조건도 확인해야 합니다. 종류와 상태를 모르는 푸른 보석이라면 기계 세척부터 시도하지 말고 먼저 제품 정보를 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "제품 두 개를 비교할 때는 같은 질문을 하세요",
    "paragraphs": [
      "사진에서 좋아 보이는 색을 골랐다면 제품별 보석명과 처리 설명을 나란히 적어 보세요. 한쪽은 보석명만 있고 다른 쪽은 처리 정보까지 있다면, 설명의 길이로 품질을 판단하지 말고 빠진 항목을 질문하면 됩니다.",
      "실물을 볼 때는 같은 조명과 배경에서 원하는 색감인지 비교하세요. 이는 취향과 외관을 비교하는 과정이며 감별을 대신하지 않습니다. 정확한 종류 확인이 필요하다면 판매 설명과 감별 문서의 해당 보석 정보를 대조하세요."
    ],
    "bullets": [
      "실제로 세팅된 보석은 아쿠아마린인가요, 블루 토파즈인가요?",
      "천연·합성 여부와 알려진 처리 정보는 무엇인가요?",
      "반지나 펜던트로 착용할 때 피해야 할 충격·세척 방식이 있나요?",
      "제품 설명이나 감별 문서에서 해당 정보를 어디에서 확인할 수 있나요?"
    ],
    "table": null
  }
]
const cautions = [
  "보석끼리 긁거나 열을 가해 구분하지 마세요. 색감 비교는 취향을 고르는 방법이며 광물 감별 시험이 아닙니다.",
  "균열·흔들림·접착 여부를 모르면 직접 세척을 진행하지 말고 상태와 관리 조건부터 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "탄생석 종류와 목걸이 선물",
    "description": "생월 의미와 좋아하는 색을 함께 정하는 방법입니다."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 읽기",
    "description": "보석 이름과 처리 정보가 문서에 어떻게 적히는지 확인하세요."
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석의 내구성",
    "description": "경도·인성·안정성을 구분해 착용 조건을 살펴봅니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '아쿠아마린·블루 토파즈 차이, 색보다 먼저 볼 것'
const gmArticleLead = '푸른 보석을 고르다 보면 아쿠아마린과 블루 토파즈가 비슷해 보입니다. 하지만 아쿠아마린은 베릴 계열이고, 블루 토파즈는 토파즈입니다. 색감만 보고 같은 보석으로 생각하기보다 정확한 보석명과 처리 정보, 관리 방법을 함께 확인하세요.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '아쿠아마린 블루 토파즈 차이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '푸른 보석의 종류와 디자인 선택'
const gmHeroAlt = '흰색 트레이 위에 연청색과 진한 푸른색의 사각 쿠션 형태 보석 두 개를 나란히 표현한 이미지'
const gmHeroCaption = '푸른 보석의 색감과 형태를 표현한 설명용 이미지입니다. 색이나 사진만으로 두 보석을 감별할 수는 없습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 구매 안내와 처리·관리 자료를 대조해 광물, 색 처리, 세척 주의를 정리했습니다. 제품별 비교 질문은 이 차이를 확인하기 위한 안내이며, 사진 감별이나 특정 제품의 품질 판정을 뜻하지 않습니다.'
const gmSources = [
  {
    "label": "GIA — Aquamarine Buyer’s Guide",
    "url": "https://www.gia.edu/aquamarine/buyers-guide",
    "note": "베릴 계열과 아쿠아마린의 색 범위·구매 확인 항목."
  },
  {
    "label": "GIA — Topaz Buyer’s Guide",
    "url": "https://www.gia.edu/topaz/buyers-guide",
    "note": "토파즈의 색과 제품 비교 항목."
  },
  {
    "label": "GIA — Aquamarine Care and Cleaning",
    "url": "https://www.gia.edu/aquamarine-care-cleaning",
    "note": "아쿠아마린 경도와 균열·내포물·충전석의 관리 예외."
  },
  {
    "label": "GIA — Topaz Care and Cleaning",
    "url": "https://www.gia.edu/topaz-care-cleaning",
    "note": "토파즈 벽개와 초음파·스팀 세척 주의."
  },
  {
    "label": "GIA — An Introduction to Gem Treatments",
    "url": "https://www.gia.edu/gem-treatment?lang=en",
    "note": "아쿠아마린 가열 및 토파즈 방사선·가열 색 처리."
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
