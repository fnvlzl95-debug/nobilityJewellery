<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/family-birthstone-ring-custom-order'
const pageTitle = '가족 탄생석 반지 주문제작, 구성부터 정하기 | 귀족'
const pageDescription = '가족 탄생석 반지 주문제작은 한 반지에 누구의 생월을 담을지 정하는 것부터 시작합니다. 같은 생월을 반복할지, 가족 순서와 색 조합 중 무엇을 우선할지 살펴보고 종로 귀족에 원하는 구성을 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/family-birthstone-ring-custom-order-hero-103279c0.webp`
const publishedAt = '2026-10-10'
const updatedAt = ''
const faqItems = [
  {
    "question": "가족 탄생석 반지에는 부모의 생월도 넣어야 하나요?",
    "answer": "정해진 구성은 없습니다. 자녀의 생월만 담을지, 착용자와 배우자 등 함께 기념하고 싶은 가족을 포함할지 먼저 정해 주세요. 담을 대상이 정해지면 가능한 보석 구성을 상담할 수 있습니다."
  },
  {
    "question": "가족 중 생월이 같은 사람이 있으면 보석을 하나만 넣나요?",
    "answer": "하나로 함께 상징할 수도 있고, 사람마다 같은 종류의 보석을 반복하는 안을 요청할 수도 있습니다. 먼저 담고 싶은 의미를 정하고 실제 배치가 가능한지 확인하세요."
  },
  {
    "question": "가족 탄생석 반지의 보석 순서는 나이순이어야 하나요?",
    "answer": "나이순으로 정해야 하는 규칙은 없습니다. 가족 순서를 유지할지 색의 조화를 우선할지 정한 뒤, 사람별 의미와 위치가 연결되도록 원하는 안을 설명해 주세요."
  },
  {
    "question": "가족 탄생석 반지를 만든 뒤 보석을 더 넣을 수 있나요?",
    "answer": "반지마다 달라 미리 보장할 수 없습니다. 추가 계획은 처음부터 알리되, 여백만 남기면 나중에 넣을 수 있다고 가정하지 마세요. 실제 변경 시점에 구조와 상태를 보고 다시 확인해야 합니다."
  }
]
const quickAnswers = [
  "가족이 각자 착용하는 반지를 맞추는 것과, 한 사람의 반지에 가족의 탄생석을 모으는 것은 주문 구성이 다릅니다.",
  "같은 생월이 겹치면 사람마다 보석을 반복할지, 하나의 보석으로 함께 상징할지 먼저 정하세요.",
  "탄생석의 종류와 배치, 나중에 보석을 더할 수 있는지는 실제 제작안을 기준으로 확인해야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "가족 탄생석 반지는 누구를 담는 반지인가요?",
    "paragraphs": [
      "이 글에서 다루는 가족 탄생석 반지는 한 사람이 착용할 반지에 여러 가족의 생월을 담는 디자인입니다. 자녀를 기념해 부모에게 선물하거나, 자신에게 소중한 가족을 한자리에 표현하고 싶을 때 생각해 볼 수 있습니다. Jared의 가족·어머니 주얼리 안내에서도 자녀의 탄생석을 담은 반지를 소개합니다.",
      "디자인 사진을 찾기 전에 누구를 담을지부터 정하세요. 자녀의 생월만 넣을지, 착용자와 배우자의 생월도 함께 넣을지에 따라 원하는 구성이 달라집니다. 가족관계나 출생연도를 자세히 설명하기보다 “엄마·아빠·아이”처럼 구분할 표시와 생월을 적으면 첫 상담을 시작할 수 있습니다.",
      "가족 모두가 반지를 하나씩 착용하고 싶다면 그 점을 따로 알려 주세요. 여러 사람이 같은 디자인을 맞추는 주문인지, 한 반지에 가족의 의미를 모으는 주문인지 먼저 구분해야 합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 생월이 겹치면 탄생석도 반복해야 하나요?",
    "paragraphs": [
      "반드시 사람마다 다른 색을 골라야 하는 것은 아닙니다. 같은 생월의 가족을 각각 표현하고 싶다면 같은 종류의 보석을 반복하는 안을, 생월 자체를 상징하고 싶다면 하나로 묶는 안을 요청해 볼 수 있습니다. 어느 방식이 맞는지는 가족이 담고 싶은 의미에 따라 정하세요.",
      "같은 생월이라고 후보 보석이 늘 하나인 것도 아닙니다. GIA는 6월 탄생석으로 진주·알렉산드라이트·문스톤을 안내합니다. 선택지가 있는 생월은 어떤 보석을 원하는지 적되, 그 조합을 반지에 적용할 수 있는지는 별도로 상담하세요.",
      "색상 견본만으로 보석을 확정하지 마세요. “보라색”처럼 색을 고른 단계와 실제 보석 종류를 정한 단계는 다릅니다. 가족별 표시 옆에 희망 보석을 적고, 모르는 항목은 미정으로 남겨 두면 상담 중 바뀐 후보를 확인하기 쉽습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "담고 싶은 의미",
        "상담할 구성",
        "먼저 정할 내용"
      ],
      "rows": [
        [
          "가족 한 사람씩 표현",
          "같은 생월도 각각 표시하는 안",
          "누가 어떤 보석에 해당하는지"
        ],
        [
          "가족의 생월을 모아 표현",
          "겹치는 생월을 함께 상징하는 안",
          "하나로 묶어도 의미가 괜찮은지"
        ],
        [
          "같은 생월이지만 다르게 표현",
          "해당 생월의 다른 탄생석 후보를 비교하는 안",
          "원하는 보석과 실제 적용 가능 여부"
        ]
      ]
    }
  },
  {
    "title": "가족 순서와 색 조합 중 무엇을 먼저 정하나요?",
    "paragraphs": [
      "가족 순서를 알아볼 수 있는 반지를 원한다면 그 순서를 우선 기준으로 삼으세요. 전체 색의 조화가 더 중요하다면 사람별 의미는 유지하면서 보석 위치를 바꾸는 안을 상담할 수 있습니다. 둘을 동시에 확정하기 어렵다면 무엇을 꼭 지키고 싶은지 먼저 말하는 것이 좋습니다.",
      "예를 들어 “가족을 나타내는 보석은 모두 담되 색이 어울리도록 위치를 바꿔도 됩니다”와 “가족 순서는 그대로 두고 가능한 색감을 비교하고 싶습니다”는 서로 다른 요청입니다. 아래 비교는 원하는 구성을 설명하는 방법이며, 귀족에서 제공하는 고정 옵션 목록은 아닙니다.",
      "담을 가족이 많아질 때는 정면에서 모든 보석이 함께 보이길 원하는지도 이야기해 보세요. 인원만큼 보석을 넣는다는 말만으로 반지의 겉모습이 정해지지는 않습니다. 장식이 손가락 옆까지 이어지는지, 원하는 반지 폭 안에서 어떻게 보이는지를 제작 가능한 안으로 확인합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "우선할 기준",
        "유지하고 싶은 부분",
        "상담할 부분"
      ],
      "rows": [
        [
          "가족 순서",
          "정해 둔 사람별 순서",
          "그 순서에서 가능한 보석 조합"
        ],
        [
          "색의 조화",
          "가족별 생월의 의미",
          "전체가 어울리는 위치 구성"
        ],
        [
          "단정한 착용 모습",
          "원하는 장식 범위",
          "가족의 의미를 담으면서 가능한 배치"
        ]
      ]
    }
  },
  {
    "title": "나중에 가족의 탄생석을 추가할 수도 있나요?",
    "paragraphs": [
      "추가 계획이 있다면 첫 문의에서 함께 알려 주세요. 지금 만들 반지의 구성과 훗날 보석을 더 넣고 싶은 계획은 나누어 확인해야 합니다. 사진에서 빈 공간이 보이거나 처음부터 여백을 남긴다고 해서 나중의 추가 세팅이 보장되지는 않습니다.",
      "“현재 구성으로 완성할 때의 모습”과 “추가 요청이 생기면 다시 확인해야 하는 부분”을 구분해 물어보세요. 실제 변경 가능 여부와 비용·일정은 그때의 반지 상태와 제작 조건을 보고 확인할 사항입니다. 처음 주문할 때부터 자유롭게 보석을 바꿀 수 있는 제품으로 생각하고 확정하지 않는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 가족 탄생석 반지를 어떻게 문의하나요?",
    "paragraphs": [
      "먼저 가족별 표시와 생월 목록, 겹치는 생월을 표현할 방식, 원하는 배치 기준을 보내 주세요. 참고 사진에는 마음에 드는 전체 분위기를 표시하고, 실제 착용할 분의 취향·예산·희망일을 덧붙이면 상담할 방향이 분명해집니다.",
      "문의 예시: “어머니가 착용할 가족 탄생석 반지를 만들고 싶습니다. 가족의 생월 목록을 보내 드릴게요. 같은 생월도 사람마다 따로 표현하고 싶고, 위치는 색이 어울리도록 바꿔도 괜찮습니다. 장식이 한쪽으로 너무 넓어지지 않는 구성으로 가능한 보석과 디자인을 상담받고 싶습니다.”",
      "아래 카카오톡 상담으로 원하는 구성을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 제작 가능한 보석 조합과 디자인, 견적·일정을 상담합니다. 아직 보석 이름을 고르지 못했다면 가족별 생월과 원하는 분위기부터 알려 주셔도 됩니다."
    ],
    "bullets": [
      "한 반지에 담고 싶은 가족의 표시와 생월",
      "같은 생월을 각각 표현할지 함께 상징할지",
      "가족 순서·색 조합·장식 범위 중 우선할 기준",
      "착용할 분의 취향, 참고 사진, 예산과 희망일"
    ],
    "table": null
  }
]
const cautions = [
  "배치와 문의 예시는 주문제작 상담을 준비하기 위한 제안입니다. 특정 보석의 재고나 모든 조합의 제작 가능 여부를 뜻하지 않습니다.",
  "완성한 반지에 보석을 추가하거나 바꾸는 작업은 처음 주문과 별도로 가능 여부를 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "가족 탄생석 반지 주문제작 상담",
    "description": "가족별 생월과 담고 싶은 구성을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "반지 디자인 참고하기",
    "description": "원하는 전체 분위기를 찾을 때 살펴보세요."
  },
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "생월별 탄생석 살펴보기",
    "description": "탄생석 종류를 처음 고를 때 참고하세요."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "반지 주문 전 기본 사양 확인",
    "description": "금속·사이즈 등 공통 주문 항목을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '가족 탄생석 반지 주문제작, 구성부터 정하기'
const gmArticleLead = '가족 탄생석 반지는 가족의 생월을 나타내는 보석을 한 반지에 모아 담는 기념 디자인입니다. 주문제작을 준비한다면 먼저 담고 싶은 가족과 생월을 적고, 같은 생월도 사람마다 따로 표현할지 정해 보세요. 이 구성이 잡히면 원하는 보석과 배치를 상담하기 쉬워집니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '가족 탄생석 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '가족 탄생석 반지 구성과 주문제작'
const gmHeroAlt = '금빛 반지 윗부분에 서로 다른 색의 작은 보석을 나란히 배치한 가족 탄생석 반지 디자인 예시'
const gmHeroCaption = '가족의 생월을 여러 보석으로 표현하는 디자인 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '탄생석 선택지는 GIA, 가족 탄생석 반지의 사례는 Jared의 원문을 참고했습니다. 같은 생월의 표현 방식과 배치 비교표·문의 예시는 귀족의 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 6월 탄생석의 여러 선택지",
    "url": "https://www.gia.edu/birthstones/june-birthstones",
    "note": "한 생월에 여러 탄생석 후보가 있는 사례를 확인할 수 있습니다."
  },
  {
    "label": "Jared — 가족·어머니 탄생석 주얼리",
    "url": "https://www.jared.com/personalized/mothers-jewelry/c/7000000304",
    "note": "자녀의 탄생석을 담은 반지를 소개하는 브랜드 사례입니다."
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
