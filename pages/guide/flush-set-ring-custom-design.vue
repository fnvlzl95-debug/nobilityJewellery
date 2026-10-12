<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/flush-set-ring-custom-design'
const pageTitle = '플러시 세팅 반지 주문제작, 보석 높이와 배치 | 귀족'
const pageDescription = '플러시 세팅 반지는 보석을 금속 밴드 안에 낮게 넣는 디자인입니다. 보석의 돌출 높이와 반지 자체의 두께를 구분하고, 중앙·분산 배치와 금속 여백을 정해 종로 귀족에 주문제작 상담을 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/flush-set-ring-custom-design-hero-08dd25b6.webp`
const publishedAt = '2026-10-12'
const updatedAt = ''
const faqItems = [
  {
    "question": "플러시 세팅과 플러쉬 세팅은 다른 뜻인가요?",
    "answer": "둘 다 영어 flush setting을 가리키는 표기로 쓰입니다. 명칭만 전달하기보다 보석이 밴드 안에 낮게 들어간 참고 사진을 함께 보내 원하는 구조를 확인하세요."
  },
  {
    "question": "플러시 세팅 반지는 보석이 낮으니 밴드도 얇은가요?",
    "answer": "그렇지는 않습니다. 보석의 크기와 깊이를 담을 금속이 필요하므로 밴드가 도톰해질 수 있습니다. 보석의 돌출 정도와 반지 전체의 두께를 나누어 확인하세요."
  },
  {
    "question": "플러시 세팅 반지는 중앙에만 보석을 넣어야 하나요?",
    "answer": "중앙 포인트 외에 간격을 둔 배열이나 한쪽으로 치우친 배치도 희망안으로 상담할 수 있습니다. 원하는 위치에 실제로 세팅할 수 있는지는 보석과 밴드 구조를 검토해야 합니다."
  },
  {
    "question": "가지고 있는 민자 반지를 플러시 세팅으로 바꿀 수 있나요?",
    "answer": "사진만으로 가능하다고 단정하기 어렵습니다. 기존 반지와 희망 보석 정보를 보내고 실물 확인이 필요한지 상담하세요. 새로 만드는 반지와 기존 제품에 추가하는 작업은 조건이 다릅니다."
  }
]
const quickAnswers = [
  "플러시 세팅은 보석을 밴드 안에 넣는 방식입니다. 플러쉬 세팅이나 매립형 보석 반지라는 표현으로 찾기도 합니다.",
  "보석의 크기와 깊이를 수용할 금속이 필요하므로, 낮은 보석 높이와 얇은 밴드라는 희망을 나누어 상담하세요.",
  "정면에서는 보석 사이의 금속 여백을, 측면에서는 반지 전체 두께를 보며 제작 가능한 조합을 정하는 것이 좋습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "플러시 세팅은 베젤 세팅과 어떻게 다른가요?",
    "paragraphs": [
      "GIA는 플러시 세팅을 보석이 금속 밴드 자체에 들어가 윗면이 밴드 표면과 나란히 놓이는 방식으로 설명합니다. 보석을 높게 세운 장식보다 금속 표면 안의 작은 포인트처럼 보이는 디자인을 원할 때 비교할 수 있습니다.",
      "베젤은 보석 둘레를 감싸는 금속 테두리가 특징이고, 플러시는 보석이 밴드 안에 자리한다는 점에 초점이 있습니다. 사진에서 테두리만 둥글게 보인다고 같은 구조로 판단하지 말고, 옆모습에서 밴드 위로 별도의 보석 장식이 올라오는지 함께 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "보석이 낮으면 반지도 얇게 만들 수 있나요?",
    "paragraphs": [
      "보석의 돌출 높이와 반지 전체의 두께는 별개입니다. GIA는 플러시 세팅에서 보석의 크기와 깊이를 수용하려면 대체로 더 넓고 두꺼운 밴드가 필요하다고 안내합니다. “위로 나온 장식이 없는 모습”과 “손가락에 닿는 반지가 얇은 느낌”을 구분해 설명해 주세요.",
      "처음부터 보석과 밴드를 각각 확정하기보다는 둘이 함께 가능한 조합인지 확인하는 것이 좋습니다. 원하는 보석을 유지할 때 가능한 밴드 형태와, 원하는 밴드 느낌을 유지할 때 선택할 수 있는 보석을 나누어 상담해 보세요.",
      "예를 들어 “이 보석은 꼭 쓰고 싶어 반지 형태는 조정해도 된다”와 “반지가 두꺼워 보이지 않는 것이 우선이라 보석 후보를 바꿔도 된다”는 다른 요청입니다. 먼저 유지할 조건을 알려 주면 제작안을 비교할 기준이 생깁니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "보석을 어디에 넣을지 어떻게 정하나요?",
    "paragraphs": [
      "보석만 보지 말고 보석 주위에 남을 금속 면도 함께 고르세요. 중앙에 포인트를 모은 모습과 간격을 두고 흩어진 모습은 같은 세팅 방식이어도 인상이 달라집니다. 참고 사진에 마음에 드는 보석 위치와 비워 두고 싶은 면을 함께 표시해 보세요.",
      "아래 표는 배치 취향을 설명하는 예시입니다. 원하는 간격이나 가장자리와의 거리를 그대로 구현할 수 있는지는 보석과 반지의 구조를 검토한 뒤 확인해야 합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 배치",
        "정면에서 비교할 것",
        "상담할 요청"
      ],
      "rows": [
        [
          "중앙에 포인트",
          "중심 보석과 주변 금속 면의 비례",
          "중앙은 강조하고 양옆은 단정하게 남기고 싶어요."
        ],
        [
          "간격을 둔 분산",
          "보석 사이에 남는 여백과 배열 범위",
          "촘촘하게 채우기보다 금속 면이 함께 보이면 좋겠어요."
        ],
        [
          "한쪽으로 치우친 포인트",
          "비어 있는 면과 보석 위치의 관계",
          "표시한 위치를 중심으로 가능한 배치를 보고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "주문 확정 전 정면과 측면에서 무엇을 보나요?",
    "paragraphs": [
      "정면 자료에서는 보석이 보이는 면적과 금속 여백이 원하는 조합인지 보고, 측면에서는 밴드 자체가 얼마나 도톰해지는지 확인하세요. 확대된 보석 사진만으로 결정하기보다 반지 전체 윤곽이 보이는 자료를 함께 요청하면 좋습니다.",
      "낮은 세팅을 고른 이유도 알려 주세요. 돌출된 장식이 부담스러운지, 금속 면이 넓게 보이는 디자인을 좋아하는지에 따라 우선할 부분이 달라집니다. 걸림이 걱정된다면 완성 표면과 실제 착용감의 확인 방법을 상담하세요. 낮은 구조라는 이유만으로 걸림이나 보석 빠짐이 전혀 없다고 생각해서는 안 됩니다.",
      "이미 가진 민자 반지에 보석을 추가하고 싶다면 신규 제작과 구분해 문의하세요. 기존 반지에 바로 구멍을 내어 넣을 수 있다고 가정하지 말고, 제품과 희망 보석을 확인한 뒤 가능한 작업 범위를 안내받는 것이 좋습니다."
    ],
    "bullets": [
      "정면: 보석 위치, 배열 범위, 남는 금속 면",
      "측면: 보석 부분의 돌출 정도와 밴드 전체 두께",
      "착용: 원하는 손가락에서 느끼는 부피와 표면감",
      "상담: 유지할 보석 또는 밴드 조건, 변경 가능한 부분"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 플러시 세팅 반지를 어떻게 문의하나요?",
    "paragraphs": [
      "원하는 반지의 정면·옆면 사진과 보석 배치 선호를 보내 주세요. 사용할 보석이 이미 정해져 있다면 그 정보도 함께 전달하고, 아직 미정이라면 “금속 면이 넓게 보이고 보석은 낮게 넣고 싶다”처럼 원하는 모습부터 설명하셔도 됩니다.",
      "문의 예시: “플러시 세팅 반지를 새로 주문하고 싶습니다. 중앙에 보석 포인트를 넣고 주변 금속 면은 넉넉히 남기고 싶어요. 보석이 위로 튀어나오지 않는 모습이 좋지만 반지 자체가 너무 도톰해지는 것은 부담스럽습니다. 이 느낌으로 가능한 보석과 밴드 조합을 상담받고 싶습니다.”",
      "아래 카카오톡 상담으로 참고 사진·보석 희망사항·배치·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 가능한 세팅과 반지 형태, 견적·일정을 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "본문 배치 예시는 주문 상담을 위한 제안이며, 모든 보석이나 반지에 같은 세팅을 적용할 수 있다는 뜻은 아닙니다.",
  "기존 반지의 추가 세팅과 새 반지 제작은 구분해서 상담하고, 가능한 작업 범위와 점검 조건을 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "플러시 세팅 반지 주문제작 상담",
    "description": "보석 높이와 밴드 형태의 선호를 함께 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 참고하기",
    "description": "원하는 반지 전체의 분위기를 찾아보세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "다른 보석 세팅과 비교하기",
    "description": "프롱·베젤·파베·채널의 차이를 살펴보세요."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "반지 주문 기본 항목 확인",
    "description": "금속과 사이즈 등 공통 사양을 정리해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '플러시 세팅 반지 주문제작, 보석 높이와 배치'
const gmArticleLead = '플러시 세팅 반지는 보석을 금속 밴드 안에 넣어 윗면이 반지 표면과 나란히 낮게 자리하도록 만든 반지입니다. 주문제작을 원한다면 보석 배치와 함께 밴드의 폭·두께를 확인하세요. 보석이 덜 튀어나오는 디자인이라고 반지 자체도 얇은 것은 아닙니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '플러시 세팅 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '플러시 세팅 반지의 보석 배치와 주문제작'
const gmHeroAlt = '넓은 금빛 밴드 표면 안에 둥근 무색 보석을 낮게 넣고 옆면 두께가 보이도록 놓은 플러시 세팅 반지'
const gmHeroCaption = '플러시 세팅의 낮은 보석 위치를 보여 주는 디자인 예시입니다. 실제 판매 제품 사진이나 제작 규격도가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '플러시 세팅의 정의와 베젤과의 차이, 밴드 폭·두께에 관한 설명은 GIA 안내를 참고했습니다. 배치 비교표와 우선순위·문의 예시는 주문제작 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 플러시 세팅의 구조와 밴드",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-ring-settings/",
    "note": "밴드 안에 보석을 넣는 방식과 보석 크기·깊이에 따른 밴드 구조를 설명합니다."
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
