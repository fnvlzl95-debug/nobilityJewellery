<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/asymmetric-earrings-custom-pairing'
const pageTitle = '비대칭 귀걸이 주문제작, 한 쌍의 조합 고르기 | 귀족'
const pageDescription = '비대칭 귀걸이 주문제작은 양쪽에 공통으로 남길 요소와 다르게 만들 부분을 정하는 것부터 시작합니다. 길이·모양·보석 조합을 비교하고, 한 쌍의 참고 사진으로 종로 귀족에 제작 상담을 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/asymmetric-earrings-custom-pairing-hero-9f602b96.webp`
const publishedAt = '2026-10-11'
const updatedAt = ''
const faqItems = [
  {
    "question": "비대칭 귀걸이는 꼭 한쪽만 길어야 하나요?",
    "answer": "꼭 그렇지는 않습니다. 비슷한 길이에서 모양이나 보석 색을 다르게 할 수도 있습니다. 길이·모양·색 중 무엇을 다르게 하고 싶은지 정하고 가능한 조합을 상담하세요."
  },
  {
    "question": "비대칭 귀걸이를 고르면 한쪽만 받게 되나요?",
    "answer": "디자인 명칭과 판매 단위는 별개입니다. 양쪽이 다른 한 쌍인지 낱개인지 확인하고, 주문제작 문의에도 한 쌍 신규 제작인지 한쪽 추가인지 적어 주세요."
  },
  {
    "question": "양쪽에 서로 다른 모양의 진주를 넣어도 되나요?",
    "answer": "의도적으로 모양을 다르게 조합하는 안을 고려할 수 있습니다. 모양 외에 색과 광택 등 어떤 느낌은 맞추고 싶은지도 설명하고, 실제 후보와 고정 방식은 상담에서 확인하세요."
  },
  {
    "question": "가지고 있는 귀걸이에 다른 모양 한쪽을 맞출 수 있나요?",
    "answer": "기존 제품과 새로 원하는 디자인을 함께 보내 상담할 수 있습니다. 기존 귀걸이와 연결할 공통 요소부터 알려 주세요. 실제 제작 가능 여부와 실물 확인 필요 여부는 제품과 디자인을 보고 판단합니다."
  }
]
const quickAnswers = [
  "비대칭 귀걸이는 양쪽 디자인을 다르게 조합하는 방식이며, 한쪽만 판매하는 모노 이어링과는 구분해 확인하세요.",
  "길이와 모양을 모두 바꾸기 전에 같은 보석·금속 색·모티브처럼 함께 남길 요소부터 정하세요.",
  "한 쌍을 같은 배율로 비교하고, 원하는 외형 차이와 각 귀의 착용감은 따로 확인하는 것이 좋습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "비대칭 귀걸이와 한쪽 귀걸이는 무엇이 다른가요?",
    "paragraphs": [
      "비대칭 귀걸이는 왼쪽과 오른쪽의 모습에 차이를 두는 디자인입니다. 언발 귀걸이나 언밸런스 귀걸이라는 이름으로 찾기도 합니다. Boucheron도 Plume de Paon 제품을 비대칭 귀걸이로 소개합니다. 이처럼 서로 다른 모습으로 한 쌍을 구성할 수 있지만, 상품명만으로 판매 수량까지 알 수 있는 것은 아닙니다.",
      "한쪽만 착용하거나 낱개로 선택하는 모노 이어링은 구매 단위부터 확인해야 합니다. 비대칭 한 쌍을 새로 만들고 싶은지, 이미 가진 귀걸이에 다른 한쪽을 보태고 싶은지 첫 문의에서 알려 주세요. 같은 “짝이 다른 귀걸이”라도 준비할 자료와 상담할 범위가 달라집니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "양쪽을 다르게 만들 때 무엇을 맞추면 좋나요?",
    "paragraphs": [
      "공통으로 남길 요소를 먼저 고르면 서로 다른 디자인을 비교하기 수월합니다. 같은 색 보석을 양쪽에 넣되 한쪽에만 내려오는 장식을 더하거나, 같은 모티브를 크기가 다르게 표현하는 안을 생각해 볼 수 있습니다. 처음에는 한 가지 차이부터 비교해 보고 원하는 대비를 넓혀 가세요.",
      "아래 표는 조합을 설명하기 위한 예시입니다. 정해진 디자인 공식이나 제작 가능한 옵션 목록은 아니므로, 마음에 드는 기준을 골라 상담에서 적용 가능 여부를 확인해 주세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "함께 남길 요소",
        "다르게 해 볼 부분",
        "전달할 요청"
      ],
      "rows": [
        [
          "같은 보석 색",
          "한쪽은 짧게, 다른 쪽은 아래 장식 추가",
          "보석 색은 맞추고 길이에 차이를 주고 싶어요."
        ],
        [
          "같은 모티브",
          "장식의 크기나 반복 방식",
          "같은 주제로 표현하되 양쪽 존재감을 다르게 하고 싶어요."
        ],
        [
          "같은 금속 색과 마감",
          "둥근 선과 길쭉한 선 등 윤곽",
          "금속 느낌은 같게 두고 모양을 다르게 보고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "보석이나 진주도 서로 달라도 되나요?",
    "paragraphs": [
      "양쪽의 보석을 꼭 동일하게 골라야 하는 것은 아닙니다. 다만 색·모양·크기를 한꺼번에 바꾸면 마음에 드는 차이가 무엇인지 설명하기 어려울 수 있습니다. 같은 윤곽에서 색만 바꾼 안과, 같은 색에서 윤곽만 바꾼 안을 나누어 비교해 보세요.",
      "진주를 넣는다면 의도한 차이를 더 구체적으로 정할 수 있습니다. GIA는 진주의 매칭을 설명하면서 디자이너가 독특한 효과를 위해 색·모양·크기를 의도적으로 섞기도 한다고 안내합니다. 이를 참고해 둥근 진주와 길쭉한 진주를 조합하되, 비슷한 색감을 원할지 색도 대비시킬지 따로 요청해 보세요.",
      "“다르게 만들고 싶다”는 말이 모든 차이를 허용한다는 뜻은 아닙니다. 예를 들어 모양 차이는 원하지만 한쪽만 유난히 흐릿해 보이는 조합은 원하지 않을 수 있습니다. 실제 후보를 나란히 보고 좋아하는 차이와 맞추고 싶은 느낌을 구분해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "한 쌍의 조합은 어떤 사진으로 확인하나요?",
    "paragraphs": [
      "양쪽 귀걸이를 같은 배율로 나란히 놓은 자료를 요청해 보세요. 각각 크게 확대한 사진만 보면 어느 쪽이 더 길거나 넓은지 놓치기 쉽습니다. 귀에 붙는 위치를 기준으로 장식이 어디까지 내려오는지 비교하면 차이가 더 분명해집니다.",
      "길이가 다른 조합은 한쪽씩 고른 모습과 두 귀에 함께 놓인 모습이 다르게 느껴질 수 있습니다. 가능하면 양쪽을 함께 착용한 상태나 착용 위치가 표시된 자료로 비교하세요. 한쪽에만 긴 장식을 두고 싶다면 착용자 기준 어느 귀인지 덧붙여 전달하면 됩니다.",
      "외형의 비대칭과 착용감은 별개로 확인하세요. 짧은 쪽과 긴 쪽의 모양이 마음에 들어도 각 귀에서 느끼는 무게감이나 움직임은 다를 수 있습니다. 어느 쪽이 더 편해야 하는지, 고정된 장식과 움직이는 장식 중 무엇을 선호하는지도 상담에 알려 주세요."
    ],
    "bullets": [
      "양쪽을 같은 배율로 놓은 정면 자료",
      "귀에 붙는 위치를 맞춘 길이·너비 비교",
      "공통으로 유지한 부분과 의도적으로 바꾼 부분",
      "양쪽을 함께 착용했을 때의 모습과 각 귀의 착용감"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 비대칭 귀걸이를 어떻게 주문 문의하나요?",
    "paragraphs": [
      "새 한 쌍을 원한다면 양쪽 후보를 함께 보내고, 공통으로 남길 요소와 다르게 만들 부분을 표시해 주세요. 한 장의 사진에서 “이 보석 색은 양쪽에 유지하고, 내려오는 장식은 한쪽에만 두고 싶다”처럼 설명할 수 있습니다.",
      "이미 가진 귀걸이와 조합하고 싶다면 남은 제품의 앞·옆·뒷면 사진과 새로 원하는 쪽의 참고 사진을 함께 준비하세요. 원본과 똑같은 한쪽을 복원하려는 요청인지, 의도적으로 다른 디자인을 보태려는 요청인지 분명히 알려 주면 좋습니다. 사진 상담 뒤 실물 확인이 필요한지는 제품을 보고 안내받으세요.",
      "문의 예시: “비대칭 귀걸이 한 쌍을 새로 주문하고 싶습니다. 양쪽 보석 색과 금속 색은 같게 하고, 한쪽은 귀 가까이에 짧게, 다른 쪽은 아래로 내려오는 장식을 넣고 싶어요. 첨부한 조합으로 제작 가능한 형태와 착용감을 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 한 쌍의 참고 사진·공통 요소·달라질 부분·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 가능한 디자인과 보석 조합, 견적·일정을 상담합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "조합 예시는 원하는 디자인을 설명하기 위한 제안입니다. 특정 보석의 재고나 모든 형태의 제작 가능 여부를 뜻하지 않습니다.",
  "양쪽을 다르게 주문할 때도 의도한 차이와 원하지 않는 차이를 구분해 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "비대칭 귀걸이 주문제작 상담",
    "description": "함께 남길 요소와 다르게 만들 부분을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "원하는 전체 분위기를 찾을 때 참고하세요."
  },
  {
    "to": "/guide/custom-earrings-production-time",
    "label": "귀걸이 제작 일정 확인하기",
    "description": "디자인을 정한 뒤 수령 일정을 상담할 때 참고하세요."
  },
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 기본 형태 살펴보기",
    "description": "스터드·드롭 등 조합할 형태를 구분해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '비대칭 귀걸이 주문제작, 한 쌍의 조합 고르기'
const gmArticleLead = '비대칭 귀걸이는 양쪽의 길이·모양·장식을 의도적으로 다르게 구성한 귀걸이입니다. 주문제작을 준비할 때는 먼저 같은 보석, 금속 색, 모티브 중 한 쌍을 이어 줄 공통점을 골라 보세요. 그다음 어느 부분을 다르게 할지 정하면 원하는 조합을 설명하기 쉽습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '비대칭 귀걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '비대칭 귀걸이 한 쌍의 조합과 주문제작'
const gmHeroAlt = '같은 보라색 보석과 금빛 테두리를 공유하며 한쪽에만 길게 내려오는 장식을 더한 비대칭 귀걸이 한 쌍'
const gmHeroCaption = '같은 요소를 남기고 길이를 다르게 구성한 디자인 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '비대칭 귀걸이의 사례는 Boucheron, 진주의 의도적인 조합은 GIA 안내를 참고했습니다. 공통 요소를 고르는 비교표와 사진 확인법·문의 예시는 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Boucheron — 비대칭 귀걸이 디자인 사례",
    "url": "https://www.boucheron.com/int_en/plume-de-paon-asymmetrical-ear-jewel-jco01627.html",
    "note": "브랜드가 비대칭 귀걸이로 소개하는 디자인 사례입니다."
  },
  {
    "label": "GIA — 진주 매칭과 의도적인 조합",
    "url": "https://www.gia.edu/pearl-quality-factor",
    "note": "진주의 색·모양·크기를 의도적으로 조합하는 경우를 설명합니다."
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
