<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jewelry-metal-hardness-and-deformation-guide'
const pageTitle = '귀금속 경도 순위, 금·은·백금 비교 전에 볼 것 | 귀족'
const pageDescription = '금·은·백금은 합금과 가공 상태에 따라 경도가 달라집니다. 경도표의 시험 조건, 가공 경화와 열처리, 완성품의 휨을 따로 살피는 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jewelry-metal-hardness-and-deformation-guide-hero-4fac21f1.webp`
const publishedAt = '2026-09-19'
const updatedAt = ''
const faqItems = [
  {
    "question": "14K와 18K 중 어느 쪽이 더 단단한가요?",
    "answer": "금 함량 외에 합금 조성과 가공 상태를 확인해야 합니다. 함량 표기의 의미와 선택 기준은 아래의 585·750 가이드를 함께 보세요."
  },
  {
    "question": "금속 색이 같으면 경도도 같은가요?",
    "answer": "외관만으로 판단할 수 없습니다. 제품 설명에서 소재와 제작 정보를 확인하세요."
  },
  {
    "question": "경도표에 HV가 없으면 쓸 수 없는 표인가요?",
    "answer": "다른 시험법을 썼을 수 있습니다. 숫자만 비교하지 말고 어떤 척도와 조건인지 확인하세요."
  },
  {
    "question": "경도 수치를 모르면 제품을 어떻게 비교하나요?",
    "answer": "확인 가능한 소재 정보와 두께·형태·연결 구조부터 비교하세요. 알 수 없는 경도값은 임의로 채우지 말고, 실제 사용 중 주의할 부분을 판매처에 질문하면 됩니다."
  }
]
const quickAnswers = [
  "금속 이름만 있는 경도 순위표로 완성 주얼리의 내구성을 판단하기는 어렵습니다.",
  "경도값 옆의 합금 조성·가공 상태·시험 방법을 함께 확인하세요.",
  "제품 사진에서는 폭뿐 아니라 옆면 두께와 연결 부위를 비교해 보세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "경도표에서 먼저 확인할 세 가지",
    "paragraphs": [
      "Corti의 주얼리 합금 연구는 경도를 여러 기계적 특성 중 하나로 설명합니다. 비커스 경도(HV)는 압입 자국으로 평가하며, 모스 경도는 긁힘을 비교합니다. 서로 다른 척도의 숫자를 그대로 나란히 세우면 의미가 달라집니다.",
      "인터넷에서 본 표를 제품 선택에 쓰려면 아래 조건이 적혀 있는지 먼저 확인하세요. 조건을 찾을 수 없다면 그 표만으로 구매 후보의 순위를 정하지 않는 편이 좋습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "표에서 볼 항목",
        "확인할 질문"
      ],
      "rows": [
        [
          "합금 조성",
          "순금속인가요, 특정 함량의 합금인가요?"
        ],
        [
          "가공 상태",
          "풀림 상태인가요, 가공하거나 경화한 상태인가요?"
        ],
        [
          "시험 방법",
          "같은 경도 척도와 시험 조건으로 비교했나요?"
        ]
      ]
    }
  },
  {
    "title": "같은 소재도 가공하면 경도가 달라집니다",
    "paragraphs": [
      "금속을 눌러 펴거나 늘이는 가공은 경도를 높일 수 있습니다. 이를 가공 경화라고 합니다. 반대로 풀림 열처리는 가공으로 단단해진 재료를 다시 부드럽게 만들 수 있습니다. 일부 합금은 별도의 시효 경화 처리가 가능하지만 모든 합금에 적용되지는 않습니다.",
      "Corti의 자료는 같은 백금 950이라도 첨가 금속과 처리 상태에 따라 경도값이 달라지는 사례를 제시합니다. 함량 표기 하나가 일정한 경도값을 뜻하지 않는다는 예입니다.",
      "GIA도 백금 합금을 구분해 설명하며, 제품을 변경할 때 원래 합금과 맞는 재료를 사용해야 한다고 안내합니다. 소재를 바꾸거나 손보는 상담에서는 색상과 각인 외에 기존 합금 정보를 확인할 수 있는지도 물어보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "높은 경도와 잘 휘지 않는 제품은 따로 살펴보세요",
    "paragraphs": [
      "경도는 긁힘·마모와 관련이 있고 재료의 강도를 이해하는 단서가 됩니다. 다만 완성품에는 두께와 형태, 힘이 가해지는 위치가 더해집니다. 경도 숫자가 높다는 이유만으로 얇은 부분이나 연결 부위까지 튼튼하다고 확정할 수는 없습니다.",
      "예를 들어 비슷해 보이는 밴드 두 개를 비교한다면 정면 사진만 보지 말고 옆면도 요청해 보세요. 폭이 넓어 보여도 두께나 안쪽 구조는 다를 수 있습니다. 속이 빈 구조와 통 구조의 차이는 별도 가이드에서 더 자세히 다룹니다."
    ],
    "bullets": [
      "사진으로 소재의 경도나 실제 내부 구조를 확정하지 마세요.",
      "얇아지는 구간과 장식 연결 부위를 표시해 해당 부분의 구조를 질문하세요.",
      "손으로 구부리거나 다른 물건으로 긁어서 시험하지 마세요."
    ],
    "table": null
  },
  {
    "title": "제품 두 개를 비교할 때 이렇게 질문하세요",
    "paragraphs": [
      "판매처에 “어느 금속이 제일 단단한가요?”라고만 묻기보다, 보고 있는 제품 두 개를 정해 같은 항목을 질문해 보세요. 답변을 나란히 적으면 확인한 정보와 아직 모르는 정보를 구분하기 쉽습니다.",
      "모든 판매처가 완성품의 경도 시험값을 보유하는 것은 아닙니다. 수치가 없다는 이유만으로 품질이 나쁘다고 판단하거나, 일반 합금표의 숫자를 해당 제품의 측정값으로 대신하지 마세요."
    ],
    "bullets": [
      "소재의 정확한 함량과 합금 종류를 확인할 수 있나요?",
      "경도 수치가 있다면 이 제품을 측정한 값인가요, 원재료 자료인가요?",
      "후보 제품의 밴드 두께·안쪽 구조·연결 방식은 어떻게 다른가요?",
      "평소 손을 쓰는 활동에서 조심해야 할 부분은 어디인가요?"
    ],
    "table": null
  }
]
const cautions = [
  "집에서 열을 가하거나 두드려 주얼리를 경화하려 하지 마세요. 이 글의 가공 설명은 제작 원리를 이해하기 위한 내용입니다.",
  "일반 합금 자료는 특정 판매 제품의 검사 성적이나 내구성 보증이 아닙니다."
]
const relatedLinks = [
  {
    "to": "/guide/gold-585-vs-750-selection",
    "label": "585·750 각인과 금 함량 선택",
    "description": "함량 표기가 알려 주는 정보와 제품 선택 기준을 확인하세요."
  },
  {
    "to": "/guide/hollow-vs-solid-gold-jewelry",
    "label": "속 빈 금과 통 금 구조 비교",
    "description": "금속 이름과 별도로 제품 내부 구조를 비교하는 안내입니다."
  },
  {
    "to": "/guide/platinum-ring-drawbacks-wear-guide",
    "label": "백금 반지의 생활 흠집과 관리",
    "description": "실제 착용 뒤 표면 변화와 폴리싱을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '귀금속 경도 순위, 금·은·백금 비교 전에 볼 것'
const gmArticleLead = '금·은·백금 중 무엇이 더 단단한지 궁금하다면, 경도표에서 금속 이름 옆의 조건부터 보세요. 같은 합금도 가공 상태에 따라 수치가 달라집니다. 반지를 고를 때는 그 수치가 어떤 재료에서 나온 것인지와 실제 제품의 형태를 함께 확인해야 합니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '귀금속 경도 순위'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '주얼리 소재와 제품 형태 선택'
const gmHeroAlt = '밝은 천 위에 나란히 놓인 금빛 밴드와 은빛 밴드'
const gmHeroCaption = '소재 비교를 떠올릴 수 있도록 만든 설명용 이미지입니다. 실제 제품이나 경도 시험 결과를 나타내지 않습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 백금 합금 안내와 Corti의 주얼리 합금 연구를 참고했습니다. 표를 읽는 질문과 제품 비교 순서는 소비자를 위한 편집 안내이며 특정 제품의 실험 결과가 아닙니다.'
const gmSources = [
  {
    "label": "GIA — Identify and Characterize Platinum Alloys",
    "url": "https://www.gia.edu/quality-assurance-benchmark/identify-characteristic-platinum-alloy",
    "note": "백금 합금의 구분과 제품 변경 시 재료 일치 확인."
  },
  {
    "label": "Christopher W. Corti — The Role of Hardness in Jewelry Alloys (2008)",
    "url": "https://static1.squarespace.com/static/55f1c5d5e4b0e83b4ef3e659/t/66fac9c45010a03864fdc606/1727711685383/2008-The-Role-of-Hardness-in-Jewelry-Alloys.pdf",
    "note": "경도 시험과 가공 상태, 합금별 경도 자료 및 해석상의 한계."
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
