<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/baroque-pearl-pendant-selection-guide'
const pageTitle = '못난이 진주 목걸이, 한 알의 모양 고르기 | 귀족'
const pageDescription = '못난이 진주 목걸이를 한 알 펜던트로 고를 때는 그 진주만의 윤곽과 매달리는 방향을 살펴보세요. 대표 사진과 실제 후보를 구분하고, 유지하고 싶은 굴곡을 표시해 귀족에 구매·제작 가능 범위를 문의할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/baroque-pearl-pendant-selection-guide-hero-f33218b7.webp`
const publishedAt = '2026-09-24'
const updatedAt = ''
const faqItems = [
  {
    "question": "못난이 진주는 양식 진주가 아닌가요?",
    "answer": "불규칙한 모양과 양식 여부는 별개의 정보입니다. 양식 진주에도 바로크 형태가 있으므로, 모양 대신 해당 제품의 진주 종류와 기원 설명을 확인하세요."
  },
  {
    "question": "못난이 진주 목걸이는 사진과 똑같은 모양으로 받을 수 있나요?",
    "answer": "대표 사진인지 실제 구매할 개체의 사진인지 먼저 확인해야 합니다. 특정한 굴곡이나 윤곽이 마음에 든다면 실제 후보를 확인할 수 있는지 문의해 주세요."
  },
  {
    "question": "바로크 진주 한 알은 어느 면을 앞으로 두나요?",
    "answer": "하나의 정답이 정해져 있지는 않습니다. 선호하는 면을 사진에 표시하고, 고리와 연결한 완성품에서 그 방향이 가능한지 확인하세요."
  },
  {
    "question": "못난이 진주 펜던트는 무엇부터 골라야 하나요?",
    "answer": "길쭉함·둥근 볼륨·넓적한 굴곡처럼 마음에 드는 외곽선을 먼저 골라 보세요. 이후 실제 후보의 사진과 연결 방향을 확인하고 진주 종류와 주문 조건을 상담하면 됩니다."
  }
]
const quickAnswers = [
  "바로크 진주는 불규칙한 모양을 뜻하며, 모양만으로 천연·양식 여부나 품질을 확정할 수 없습니다.",
  "한 알 펜던트는 길쭉함·볼륨·넓적한 굴곡 중 마음에 드는 윤곽부터 골라 보세요.",
  "구매할 때는 대표 사진인지 실제 선택할 진주의 사진인지 확인하고, 고리가 연결된 완성 방향도 살펴보세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "못난이 진주는 모양을 먼저 설명하는 말입니다",
    "paragraphs": [
      "못난이 진주를 찾을 때 함께 보게 되는 바로크(baroque)는 일정한 구형에서 벗어난 자유로운 형태를 가리킵니다. GIA는 바로크 진주의 불규칙한 모양이 성장 과정에서 만들어진다고 설명하며, 양식 진주에서도 바로크 형태를 소개합니다.",
      "따라서 생김새가 불규칙하다는 이유만으로 가짜라고 보거나, 반대로 양식하지 않은 천연 진주라고 판단할 수는 없습니다. 형태와 진주의 종류·기원은 별도로 확인해야 합니다. 품질을 자세히 비교하려면 아래 진주 등급 안내를 참고하고, 여기서는 한 알이 만드는 디자인에 집중해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "한 알의 윤곽에서 유지하고 싶은 부분을 찾으세요",
    "paragraphs": [
      "비슷한 흰색 진주라도 아래로 길게 흐르는 모양, 둥글고 볼륨 있는 모양, 옆으로 넓적하게 펼쳐진 모양은 다른 인상을 줍니다. 처음에는 등급 기호보다 외곽선이 마음에 드는 후보를 골라 보세요. 여러 알 목걸이의 배열을 맞추는 것과 달리, 한 알 펜던트에서는 그 진주만의 비대칭이 눈에 들어옵니다.",
      "사진에 “이쪽으로 길어진 끝이 좋다” 또는 “한쪽이 볼록한 굴곡을 남기고 싶다”고 표시해 보세요. 아래 구분은 취향을 설명하기 위한 것으로, 공인된 형태 등급이나 우열 순서는 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "마음에 드는 윤곽",
        "후보 사진에서 표시할 부분",
        "전달할 요청"
      ],
      "rows": [
        [
          "아래로 길게 이어지는 모양",
          "끝이 길어지는 방향",
          "완성 목걸이에서도 긴 부분이 아래로 보였으면 해요."
        ],
        [
          "둥글고 볼륨 있는 모양",
          "도드라진 부분과 전체 외곽",
          "이 볼록한 윤곽이 정면에서 보이면 좋겠어요."
        ],
        [
          "넓적하고 굴곡이 있는 모양",
          "넓게 펼쳐진 면과 비대칭 부분",
          "이 면을 주로 보이게 연결할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "대표 사진과 실제 고를 진주를 구분하세요",
    "paragraphs": [
      "상품 사진이 디자인을 보여 주는 대표 사진인지, 구매할 수 있는 바로 그 진주를 찍은 사진인지 물어보세요. 특히 특정 굴곡 때문에 마음이 갔다면 실제 선택할 후보의 전체 사진을 보고 결정하는 것이 좋습니다. 같은 상품명이라고 해서 그 윤곽까지 완전히 같다고 가정하지 마세요.",
      "한 알을 손에 들거나 바닥에 놓은 사진과 고리에 연결된 펜던트 사진은 보이는 방향이 다를 수 있습니다. “이 면이 정면에 오기를 원한다”고 표시하고, 해당 진주의 형태에서 가능한 연결 방향을 확인해 보세요. 이미 완성된 제품이라면 체인에 매달린 모습을 보는 것이 도움이 됩니다.",
      "마음에 드는 굴곡과 표면 상태를 확인하는 일도 구분하세요. GIA는 형태와 표면 품질을 별도 평가 요소로 다룹니다. 사진에서 보이는 부분이 원래의 형태인지 표면 손상인지 불분명하다면, 설명과 가까운 사진을 요청하고 생김새만으로 판단하지 않는 것이 좋습니다."
    ],
    "bullets": [
      "대표 사진인지 실제 선택 가능한 개체 사진인지",
      "특히 유지하고 싶은 비대칭 윤곽",
      "고리와 연결한 뒤 주로 보이는 면",
      "추후 추가 주문 때도 같은 개체·모양인지 별도 확인"
    ],
    "table": null
  },
  {
    "title": "원하는 윤곽과 완성 방향을 함께 문의하세요",
    "paragraphs": [
      "문의 예시: “못난이 진주를 한 알 단 목걸이를 원합니다. 첨부 사진처럼 아래로 길쭉하고 한쪽이 볼록한 모양이 좋아요. 표시한 면이 정면으로 보이는 펜던트를 찾고 있습니다. 실제 후보 사진을 볼 수 있는지, 이 방향으로 구매 또는 제작할 수 있는지 상담받고 싶습니다.”",
      "귀족 카카오톡 상담에 참고 사진·마음에 드는 윤곽 표시·선호하는 완성 방향·예산·희망일을 보내 주세요. 실제 후보를 보고 고를 수 있는지와 연결 방식의 선택 범위는 상담에서 먼저 확인합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에서 원하는 디자인과 주문 조건을 상담할 수 있습니다. 선물이라면 받는 분이 좋아할 한 알의 모양을 먼저 골라 보내 주세요. 진주 종류와 구성에 따른 견적·일정은 상담 시 확인합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "못난이·바로크라는 형태 설명만으로 천연·양식 여부나 품질을 단정하지 마세요.",
  "대표 사진과 실제 구매할 진주의 윤곽이 같은지 확인하세요. 원하는 연결 방향이나 개체 선택 가능 여부는 제품별로 상담해야 합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "바로크 진주 펜던트 상담하기",
    "description": "선호하는 한 알의 윤곽과 방향을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 살펴보기",
    "description": "원하는 펜던트의 전체 분위기를 사진으로 찾아보세요."
  },
  {
    "to": "/guide/pearl-value-factors",
    "label": "진주 품질을 따로 비교하는 기준",
    "description": "모양을 고른 뒤 광택·표면 등 품질 요소를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '못난이 진주 목걸이, 한 알의 모양 고르기'
const gmArticleLead = '못난이 진주 목걸이에서 마음에 든 부분이 길쭉한 끝이나 한쪽으로 볼록한 모양이라면, 상품명보다 그 한 알의 사진이 중요합니다. 이 글은 진주가 연속으로 이어진 목걸이보다 한 알 펜던트를 고르려는 분을 위한 안내입니다. 원하는 윤곽을 고르고 완성품에서 어느 방향으로 보일지 살펴보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '못난이 진주 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '못난이 진주 한 알 펜던트의 모양과 방향'
const gmHeroAlt = '짙은 회갈색 천 위에 놓인 길쭉한 흰 바로크 진주 한 알 펜던트와 작은 금빛 고리, 얇은 체인'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '바로크 형태와 진주의 종류, 형태·표면의 구분은 GIA 안내를 참고했습니다. 한 알의 윤곽을 고르는 표와 사진에 방향을 표시하는 방법은 구매 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — Different Pearl Types Explained",
    "url": "https://www.gia.edu/gia-news-research/differences-between-pearl-types",
    "note": "성장 과정에서 형성되는 바로크 형태와 다양한 진주 종류 안내입니다."
  },
  {
    "label": "GIA — Pearl Buyer’s Guide",
    "url": "https://www.gia.edu/pearl/buyers-guide",
    "note": "진주의 형태와 표면을 별도 요소로 살펴보는 구매 안내입니다."
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
