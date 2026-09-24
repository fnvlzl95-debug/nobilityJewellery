<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/toi-et-moi-ring-custom-selection'
const pageTitle = '투아에무아 반지 주문, 두 보석 조합법 | 귀족'
const pageDescription = '투아에무아 반지는 한 반지에 두 보석을 나란히 배치하는 디자인입니다. 먼저 유지할 보석을 고르고 색·모양·배치 방향을 비교해 보세요. 원하는 두 보석의 조합과 참고 사진으로 귀족에 제작 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/toi-et-moi-ring-custom-selection-hero-3fc2ed20.webp`
const publishedAt = '2026-09-24'
const updatedAt = ''
const faqItems = [
  {
    "question": "투아에무아 반지는 커플링 두 개를 말하나요?",
    "answer": "아닙니다. 한 반지에서 두 보석을 나란히 배치한 디자인을 말합니다. 두 사람이 각각 착용하는 커플링과 구분해 문의해 주세요."
  },
  {
    "question": "투아에무아 반지는 같은 보석으로만 만들어야 하나요?",
    "answer": "같은 종류를 조합할 수도 있고, 다이아몬드와 유색보석처럼 서로 다른 종류를 함께 고려할 수도 있습니다. 원하는 조합이 실제로 가능한지는 보석과 디자인을 기준으로 상담합니다."
  },
  {
    "question": "두 보석의 색과 모양을 모두 못 정했으면 어떻게 시작하나요?",
    "answer": "꼭 유지하고 싶은 색이나 모양 하나를 먼저 골라 A로 표시해 보세요. 옆의 B 후보만 바꾸어 비교하면 원하는 조합을 좁히기 쉽습니다."
  },
  {
    "question": "투아에무아 반지의 왼쪽·오른쪽 배치는 어떻게 전달하나요?",
    "answer": "손등을 내려다보는 방향 등 보는 기준을 적고 사진에 A·B를 표시해 주세요. 길쭉한 보석은 기울기와 위아래 위치도 함께 표시하면 좋습니다."
  }
]
const quickAnswers = [
  "투아에무아는 두 사람이 각각 끼는 커플링이 아니라 한 반지에 두 보석을 나란히 놓은 디자인입니다.",
  "두 보석을 모두 한꺼번에 바꾸기보다 먼저 유지할 하나를 정하면 후보를 비교하기 쉽습니다.",
  "A·B 표시와 손등에서 보는 방향을 함께 적어 두 보석의 위치가 뒤바뀌지 않도록 전달하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "투아에무아는 두 보석이 함께 중심을 이룹니다",
    "paragraphs": [
      "투아에무아(Toi et Moi)는 프랑스어로 “너와 나”라는 뜻입니다. GIA는 두 보석을 나란히 배치하는 반지 스타일로 소개하며, 두 보석의 모양·크기·색을 비슷하게 맞추거나 서로 대비시킬 수 있다고 설명합니다. 다이아몬드와 유색보석을 함께 구성하는 방식도 있습니다.",
      "작은 장식석을 중심석 둘레에 더하는 형태와는 고르는 기준이 다릅니다. 투아에무아를 원한다면 “두 보석을 모두 눈에 띄게 보고 싶다”는 요청을 먼저 전달하세요. 어떤 보석과 배치를 구현할 수 있는지는 상담할 디자인을 기준으로 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "꼭 유지할 보석 하나를 먼저 정하세요",
    "paragraphs": [
      "두 가지 색과 여러 컷을 동시에 바꾸면 무엇 때문에 그 조합이 좋은지 판단하기 어렵습니다. 좋아하는 색이나 모양이 분명한 보석을 A로 정하고, 옆에 놓을 B만 바꾸어 보세요. 처음부터 모든 사양을 확정할 필요는 없습니다.",
      "예를 들어 A의 길쭉한 윤곽이 마음에 든다면 B는 둥근 모양과 각진 모양을 비교할 수 있습니다. 두 색의 조화가 더 중요하다면 모양은 비슷하게 두고 색을 바꾸어 보는 방법도 있습니다. 아래 표는 원하는 조합을 설명하는 방법이며, 정해진 조합 공식이나 제작 가능한 옵션 목록은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "우선 유지할 부분",
        "다른 보석에서 비교할 부분",
        "상담에 남길 요청"
      ],
      "rows": [
        [
          "A의 색이 마음에 듦",
          "B의 비슷한 색 또는 대비되는 색",
          "A 색은 유지하고 B 후보를 보고 싶어요."
        ],
        [
          "A의 길쭉한 모양이 마음에 듦",
          "B의 둥근 윤곽 또는 각진 윤곽",
          "다른 모양을 나란히 놓은 안을 비교하고 싶어요."
        ],
        [
          "두 보석의 색을 이미 골랐음",
          "둘을 비슷하게 또는 한쪽을 강조한 구성",
          "두 보석 중 어느 쪽이 더 눈에 띌지 비교하고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "A·B 위치와 기울기를 한 장에 표시하세요",
    "paragraphs": [
      "같은 두 보석이어도 나란히 선 모습과 한쪽이 위로 어긋난 모습은 다르게 보입니다. 길쭉한 보석의 긴 방향을 손가락과 나란히 둘지, 비스듬히 둘지도 참고 사진에 표시해 보세요. 두 보석 사이에서 남기고 싶은 빈 공간이 있다면 그 부분도 짚어 주세요.",
      "사진에는 “착용자가 손등을 내려다보는 방향”처럼 보는 기준을 적고, 원하는 왼쪽과 오른쪽에 A·B를 표시하세요. 사진을 돌리거나 상대편에서 바라보면 위치를 다르게 이해할 수 있으므로, 보석 이름만 적는 것보다 방향 표시가 도움이 됩니다.",
      "정면 배치를 고른 뒤에는 측면에서 두 보석의 높이 관계도 확인하세요. 어느 보석이 더 올라오는지, 두 보석을 받치는 금속 부분은 어떻게 이어지는지 상담 자료에서 보는 과정입니다. 사진에서 서로 가까워 보인다고 실제 보석끼리 맞닿게 제작해 달라고 정하기보다는, 가능한 간격과 지지 구조를 확인해 주세요."
    ],
    "bullets": [
      "A와 B 각각의 보석 이름 또는 희망 색·모양",
      "손등에서 보는 좌우 위치와 보석의 긴 방향",
      "위아래로 어긋나는 배치의 선호 여부",
      "상담 중 후보가 바뀔 때 유지할 쪽과 바꿀 쪽"
    ],
    "table": null
  },
  {
    "title": "두 보석의 조합을 보내 제작 상담을 시작하세요",
    "paragraphs": [
      "문의 예시: “투아에무아 반지를 주문하고 싶습니다. A는 파란색의 길쭉한 모양을 선호하고, B는 무색의 각진 모양을 비교하고 싶어요. 손등에서 볼 때 A가 왼쪽에 놓인 배치를 원합니다. A의 색을 우선 유지하면서 가능한 B 후보와 배치를 상담받고 싶습니다.”",
      "귀족 카카오톡 상담에 A·B를 표시한 사진·우선 유지할 요소·착용할 손가락·예산·희망일을 보내 주세요. 보석의 종류가 미정이면 색과 모양부터 적어 주셔도 됩니다. 가능한 보석 조합과 제작 범위, 견적·일정은 상담에서 확인합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에 방문하기 전, 사진으로 먼저 원하는 조합을 설명해 보세요. 후보를 바꿀 때도 “A는 그대로, B만 변경”처럼 알려 주시면 변경할 부분이 분명해집니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "보석 색과 모양의 조합 예시는 디자인을 설명하기 위한 것으로, 해당 보석의 재고나 제작 가능 여부를 뜻하지 않습니다.",
  "정면의 배치만으로 두 보석의 간격과 고정 구조를 확정하지 말고 상담 자료에서 함께 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "투아에무아 반지 제작 상담하기",
    "description": "두 보석의 조합과 배치 희망안을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 살펴보기",
    "description": "마음에 드는 반지의 전체 형태를 찾아보세요."
  },
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "보석 컷 모양 비교하기",
    "description": "라운드·오벌·페어 등 윤곽을 구분하는 데 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '투아에무아 반지 주문, 두 보석 조합법'
const gmArticleLead = '마음에 드는 보석을 두 개 골랐는데 한 반지에 어떻게 놓아야 할지 고민되나요? 투아에무아 반지는 두 보석이 함께 만드는 모습을 고르는 디자인입니다. 두 보석 중 꼭 유지하고 싶은 쪽부터 정한 뒤, 다른 한쪽의 색과 모양을 바꾸어 비교해 보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '투아에무아 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '투아에무아 반지 두 보석 조합과 배치'
const gmHeroAlt = '닫힌 골드 밴드 반지 위에 페어형 파란 보석과 직사각형 무색 보석이 나란히 놓이고 각각 독립된 금속 발로 고정된 모습'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '투아에무아의 의미와 두 보석 조합의 기본 개념은 GIA 안내를 참고했습니다. A·B를 나누어 후보와 배치 방향을 정리하는 표·문의 예시는 제작 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — Guide to Engagement Ring Settings",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-ring-settings/",
    "note": "두 보석을 나란히 놓는 투아에무아의 의미와 조합 방식 안내입니다."
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
