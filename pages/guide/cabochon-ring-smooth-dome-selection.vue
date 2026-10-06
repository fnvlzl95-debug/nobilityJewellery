<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/cabochon-ring-smooth-dome-selection'
const pageTitle = '카보숑 반지, 매끈한 돔형 보석 고르기 | 귀족'
const pageDescription = '카보숑 반지는 여러 평평한 면 대신 매끈한 곡면을 살린 보석이 특징입니다. 타원형과 카보숑의 차이, 패싯 컷과 비교할 부분, 스타 사파이어를 고를 때 볼 점을 정리했습니다. 원하는 색과 표면 느낌으로 귀족에 상담해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/cabochon-ring-smooth-dome-selection-hero-c1384397.webp`
const publishedAt = '2026-10-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "카보숑은 보석 이름인가요?",
    "answer": "보석 종류가 아니라 연마 형태를 가리킵니다. 반지를 구매할 때는 카보숑이라는 표현과 별도로 실제 보석 이름을 확인하세요."
  },
  {
    "question": "타원형 반지면 카보숑 반지인가요?",
    "answer": "타원형은 위에서 본 윤곽을 뜻하므로 그것만으로 구분할 수 없습니다. 표면이 매끈한 곡면인지 여러 평평한 면으로 나뉘는지 함께 보세요."
  },
  {
    "question": "카보숑은 반짝임이 적으면 낮은 품질인가요?",
    "answer": "패싯 컷의 면 반사와 같은 기준 하나로 판단하기 어렵습니다. 원하는 곡면의 인상을 고른 뒤 해당 보석의 색·상태·마감과 설명을 함께 확인하세요."
  },
  {
    "question": "카보숑 사파이어와 스타 사파이어는 같은 뜻인가요?",
    "answer": "같은 뜻은 아닙니다. 스타 사파이어는 별 모양의 빛이 나타나는 사파이어이며, 카보숑이라는 연마 형태만으로 그 효과가 보장되지는 않습니다."
  }
]
const quickAnswers = [
  "타원형은 위에서 본 윤곽이고, 카보숑은 연마 형태입니다. 타원형 보석이라도 표면에 면이 나뉠 수 있습니다.",
  "카보숑이라는 이름만으로 천연 여부나 품질을 판단하지 마세요. 보석명과 확인 자료는 별도로 살펴야 합니다.",
  "별빛이 보이는 스타 사파이어를 원한다면 그 조건을 명확히 전하세요. 매끈한 돔형이라는 이유만으로 스타 효과가 생기는 것은 아닙니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "카보숑은 둥근 보석을 뜻하나요?",
    "paragraphs": [
      "카보숑은 매끈하게 연마한 곡면이 특징인 커팅입니다. GIA는 기본적인 형태로 윗면이 둥글고 바닥이 평평한 카보숑을 설명하며, 위아래가 모두 둥근 형태와 다양한 윤곽도 소개합니다. 따라서 “둥근 보석”이라는 말만으로는 원하는 모습을 충분히 전달하기 어렵습니다.",
      "타원·원형은 위에서 내려다본 외곽선이고, 카보숑·패싯은 표면을 어떻게 연마했는지에 관한 표현입니다. 상담할 때 “타원형이면서 윗면은 매끈한 곡면인 보석을 원합니다”처럼 두 조건을 함께 설명해 보세요.",
      "윗부분이 볼록해 보여도 표면에 작은 면이 나뉜 로즈컷처럼 다른 커팅일 수 있습니다. 참고 사진에서 마음에 든 것이 외곽선인지, 표면의 매끈함인지 먼저 구분하면 후보를 고르기 쉽습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "카보숑과 패싯 컷은 어떻게 비교하나요?",
    "paragraphs": [
      "사진을 볼 때는 어느 쪽이 더 많이 반짝이는지만 비교하기보다, 내가 원하는 표면의 인상을 살펴보세요. 매끈하게 이어지는 곡면이 좋은지, 면의 경계가 드러나는 모습이 좋은지 후보를 나란히 놓고 골라 볼 수 있습니다.",
      "같은 파란색 계열이라도 실제 보석 종류와 투명도, 촬영 조명이 다를 수 있습니다. 커팅만 비교하려는 사진과 실제로 구매할 후보 사진을 구분하고, 마음에 드는 보석이 정해지면 해당 후보의 정면과 기울인 영상을 요청해 보세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "구분할 항목",
        "무엇을 뜻하나요?",
        "상담할 때 전할 말"
      ],
      "rows": [
        [
          "보석 이름",
          "반지에 사용하는 재료의 종류",
          "원하는 보석이 있는지, 색감부터 찾는지"
        ],
        [
          "윤곽",
          "위에서 본 원형·타원형 등의 외곽선",
          "길쭉한 타원인지 원에 가까운 모습인지"
        ],
        [
          "표면 커팅",
          "매끈한 곡면인지 평평한 면들이 나뉘는지",
          "카보숑의 매끈한 표면을 원하는지"
        ],
        [
          "광학 효과",
          "별 모양처럼 별도로 나타나는 빛의 모습",
          "스타 효과가 필요한지, 일반 곡면이면 되는지"
        ]
      ]
    }
  },
  {
    "title": "모든 카보숑 반지에서 별빛이 보이나요?",
    "paragraphs": [
      "아닙니다. GIA는 스타 사파이어의 별 효과를 특정 방향으로 놓인 미세한 바늘 모양 내포물에서 빛이 반사되는 현상으로 설명합니다. 카보숑 연마는 그 효과를 드러내는 데 쓰이지만, 매끈하게 연마한 모든 보석에 별이 생기는 것은 아닙니다.",
      "스타 사파이어를 고를 때 GIA가 살펴보는 요소에는 별이 중앙에 놓이는지, 선이 선명하고 고르게 이어지는지, 보석을 기울일 때 별이 부드럽게 움직이는지가 포함됩니다. 이는 스타 효과가 있는 사파이어를 보는 기준이며 일반 카보숑 전체의 공통 등급표는 아닙니다.",
      "별 효과가 구매 이유라면 별이 잘 보이는 조명 조건을 물어보고, 정지 사진과 짧은 움직임 영상을 함께 확인해 보세요. 한 장의 사진에서 별이 선명했다는 이유만으로 평소 모든 조명에서도 같은 모습이라고 예상하지 않는 것이 좋습니다.",
      "별이 보인다는 사실만으로 천연 여부를 판단하지 마세요. 실제 후보의 보석명과 판매 설명, 확인 가능한 감별 자료는 효과의 선명함과 따로 살펴야 합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "실제 반지 후보는 어떤 사진으로 확인하나요?",
    "paragraphs": [
      "정면 사진에는 좋아하는 색과 윤곽을, 비스듬한 사진에는 표면의 곡선과 금속이 닿는 부분을 표시해 두세요. 밝게 반사되는 부분 때문에 표면이 잘 안 보이면 조명을 바꾼 사진을 요청할 수 있습니다. 특정 자국이 보인다면 사진만으로 흠집인지 내부 특징인지 단정하지 말고 설명을 물어보세요.",
      "착용할 반지 사진에서는 보석만 확대하기보다 손가락 위에서 전체가 어떻게 보이는지도 함께 확인하세요. 매끈한 보석이 중심이 되는 단순한 디자인을 원하는지, 주변 금속 장식도 눈에 띄는 구성을 원하는지 정하면 상담할 조건이 구체적입니다.",
      "카보숑이라는 커팅 이름만으로 관리 방법을 정할 수는 없습니다. 어떤 보석인지 확인한 뒤 실제 제품의 관리 안내를 받으세요. 손상 여부나 세팅 상태를 사진으로 모두 판단할 수는 없으므로 필요한 경우 실물 확인을 거칩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 카보숑 반지 상담은 어떻게 시작하나요?",
    "paragraphs": [
      "귀족 카카오톡에 좋아하는 색의 참고 사진, 원하는 윤곽, 매끈한 표면의 느낌과 스타 효과 선호를 보내 주세요. 원하는 보석 종류가 정해졌다면 함께 적고, 착용할 손가락·예산·희망일도 알려 주세요.",
      "“타원형의 파란 보석으로 매끈한 돔형 반지를 원합니다. 별빛 효과는 필요하지 않고, 표면의 곡선이 잘 드러나는 단순한 디자인이 좋습니다”처럼 문의할 수 있습니다. 스타 사파이어가 목적이라면 별 효과가 보이는 실제 후보 영상을 확인하고 싶다고 덧붙여 주세요.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 준비 가능한 보석과 확인 자료, 구매·제작 범위, 견적·일정은 상담에서 확인합니다. 참고 사진과 같은 보석을 보유하고 있다는 의미는 아닙니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "매끈한 외관이나 스타 효과만으로 보석의 종류·천연 여부·처리 상태를 확정하지 마세요. 실제 후보에 연결되는 설명과 자료를 확인하세요.",
  "표면 상태를 확인하려고 긁거나 보석을 흔들어 시험하지 마세요. 이상이 보이는 위치를 사진으로 남겨 상담하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "카보숑 반지 구매·제작 문의",
    "description": "원하는 색·윤곽·스타 효과 선호를 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "반지 디자인 참고하기",
    "description": "보석과 어울리는 전체 디자인을 살펴보세요."
  },
  {
    "to": "/guide/rose-cut-diamond-ring-buying-guide",
    "label": "면이 나뉜 돔형 로즈컷 알아보기",
    "description": "매끈한 카보숑과 다른 표면을 비교해 보세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서와 감별서 구분하기",
    "description": "보석 형태와 별도로 확인할 자료를 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '카보숑 반지, 매끈한 돔형 보석 고르기'
const gmArticleLead = '카보숑 반지는 보석의 매끈한 곡면을 살린 디자인입니다. 카보숑은 보석 종류가 아니라 연마 형태를 가리키며, 패싯 컷처럼 표면을 여러 평평한 면으로 나누는 방식과 구별됩니다. 구매할 때는 좋아하는 색·윤곽과 함께 일반적인 곡면의 광택을 원하는지, 스타 효과까지 원하는지 정해 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '카보숑 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '카보숑 반지 보석과 디자인 선택'
const gmHeroAlt = '금빛 반지의 파란 타원형 보석을 비교한 예시로 왼쪽은 매끈한 곡면이고 오른쪽은 평평한 면들이 나뉜 모습'
const gmHeroCaption = '카보숑과 패싯 표면의 차이를 설명하기 위한 디자인 예시입니다. 실제 판매 제품 사진이나 특정 보석의 감별 자료가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '카보숑의 정의와 스타 사파이어의 특징은 GIA 자료를 참고했습니다. 참고 사진을 나누어 준비하고 원하는 표면과 효과를 전달하는 방법은 구매 상담을 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 보석 커팅과 카보숑의 정의",
    "url": "https://www.gia.edu/gia-news-research-value-factors-gem-cutting-styles-definitions",
    "note": "카보숑의 표면과 형태, 면을 나누는 커팅의 차이를 설명합니다."
  },
  {
    "label": "GIA — 스타 사파이어의 효과와 커팅",
    "url": "https://www.gia.edu/sapphire-quality-factor",
    "note": "스타 효과의 원인과 별의 위치·선·움직임을 살펴보는 기준을 설명합니다."
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
