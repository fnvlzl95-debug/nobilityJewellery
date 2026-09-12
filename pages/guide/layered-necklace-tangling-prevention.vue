<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/layered-necklace-tangling-prevention'
const pageTitle = '목걸이 레이어드 엉킴, 길이·체인 조합 확인법 | 귀족'
const pageDescription = '목걸이 두 개를 겹쳐 착용할 때 자꾸 엉킨다면 길이 차이, 체인 형태, 펜던트 위치를 살펴보세요. 겹치는 위치별 조정 방법과 외출 전 착용 확인 순서를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/layered-necklace-tangling-prevention-hero-69a9f516.webp`
const publishedAt = '2026-09-12'
const updatedAt = ''
const faqItems = [
  {
    "question": "목걸이 길이는 얼마나 차이를 둬야 하나요?",
    "answer": "한 가지 간격을 정답으로 정하기보다 실제 착용했을 때 체인과 장식이 놓이는 위치를 보세요. 목둘레, 옷의 목선, 펜던트에 따라 같은 길이도 다르게 보일 수 있습니다."
  },
  {
    "question": "굵은 체인을 섞으면 엉키지 않나요?",
    "answer": "굵기나 링크 형태를 달리하는 것은 비교해 볼 조합 방법입니다. 연결 부위나 펜던트가 걸릴 수 있으므로 움직인 뒤 상태도 확인하세요."
  },
  {
    "question": "펜던트 목걸이 두 개를 같이 착용해도 되나요?",
    "answer": "함께 착용해 보고 두 장식이 부딪히거나 다른 체인에 걸리는지 확인하세요. 겹침이 반복되면 펜던트 하나를 빼거나 착용 위치가 다른 조합을 비교하는 것이 좋습니다."
  },
  {
    "question": "이미 엉킨 목걸이도 계속 착용해도 되나요?",
    "answer": "먼저 착용을 멈추고 체인을 당기지 않은 상태에서 매듭과 연결 부위를 확인하세요. 쉽게 분리되지 않거나 변형이 보이면 억지로 힘을 주지 마세요."
  }
]
const quickAnswers = [
  "목걸이 길이 숫자보다 실제로 걸었을 때 두 체인과 펜던트가 겹치는 위치를 확인하세요.",
  "비슷한 길이의 가는 체인끼리 엉킨다면 길이와 체인 형태가 다른 조합을 비교해 보세요.",
  "외출 전 평소처럼 움직여 보고, 반복해서 걸리는 조합은 하나를 빼고 다시 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "두 목걸이의 겹치는 위치부터 보세요",
    "paragraphs": [
      "레이어드 조합은 두 개부터 시작해 보세요. 한 개씩 착용했을 때의 위치를 확인한 뒤 함께 걸면, 어느 체인이나 펜던트가 다른 목걸이와 겹치는지 구분하기 쉽습니다.",
      "정면에서 체인 두 줄이 포개지는지, 짧은 목걸이의 장식이 긴 체인 위에 놓이는지 살펴보세요. 조합을 비교할 때는 같은 옷을 입고 확인하면 목선이 달라져 생기는 차이를 줄일 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "길이와 체인 형태를 다르게 비교하세요",
    "paragraphs": [
      "Blue Nile의 레이어드 안내는 서로 다른 길이와 체인 종류를 조합하는 방법을 제시합니다. 길이가 비슷한 목걸이끼리 겹친다면 먼저 착용 위치에 차이가 나는 조합을 찾아보세요. 모든 사람에게 맞는 길이 차이를 하나로 정하기보다는 목에 걸었을 때의 간격을 확인하는 편이 좋습니다.",
      "Jewelers of America의 체인 안내처럼 링크에는 사각형, 둥근 고리, 길쭉한 고리 등 여러 형태가 있습니다. 가는 체인끼리 계속 포개진다면 한쪽을 형태나 굵기가 다른 체인으로 바꿔 비교해 보세요. 모양이 다르다고 엉킴이 완전히 없어지는 것은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "겹치는 모습",
        "먼저 바꿔 볼 것",
        "다시 확인할 점"
      ],
      "rows": [
        [
          "두 체인이 같은 높이에서 포개짐",
          "착용 길이가 다른 조합",
          "걸었을 때 두 줄 사이가 구분되는지"
        ],
        [
          "가는 체인 두 개가 서로 감김",
          "한쪽의 체인 형태나 굵기",
          "움직인 뒤 다시 한 줄처럼 모이는지"
        ],
        [
          "펜던트끼리 부딪힘",
          "펜던트 하나를 빼거나 위치 변경",
          "장식과 다른 체인이 계속 닿는지"
        ],
        [
          "연결 부위에서 반복해서 걸림",
          "함께 착용하는 목걸이 수 줄이기",
          "걸리는 부위의 벌어짐이나 변형 여부"
        ]
      ]
    }
  },
  {
    "title": "펜던트는 한 개부터 더해 보세요",
    "paragraphs": [
      "처음에는 장식 없는 체인과 펜던트 목걸이를 조합해 보세요. 여러 장식을 한꺼번에 걸었을 때보다 서로 닿는 부분을 확인하기 쉽습니다. 두 펜던트를 함께 쓰고 싶다면 각 장식이 놓이는 위치를 먼저 비교합니다.",
      "사진으로 보기 좋은 조합이라도 몸을 움직일 때 장식이 다른 체인에 걸릴 수 있습니다. 펜던트 고리와 체인 연결 부위에서 걸림이 반복되면 그 조합은 풀어 놓고 상태를 살펴보세요. 길이 조절용 부자재를 쓰려면 현재 잠금장치와 맞는지도 확인해야 합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "외출 전 한 가지씩 바꿔 시험하세요",
    "paragraphs": [
      "거울 앞에 가만히 서 있는 상태에서만 판단하지 마세요. 평소처럼 고개를 돌리거나 팔을 움직인 뒤 목걸이가 놓인 위치를 다시 봅니다. 아래 순서는 길이와 체인 조합을 자신의 착용 환경에서 비교하기 위한 방법입니다.",
      "걸림이 생겼다면 길이·펜던트·목걸이 수를 동시에 바꾸기보다 한 가지씩 조정하세요. 어떤 조합이 편했는지 사진으로 남겨 두면 다음에 목걸이를 고를 때 비교하기 좋습니다."
    ],
    "bullets": [
      "각 목걸이를 따로 걸어 원래 놓이는 위치를 확인합니다.",
      "두 개를 함께 착용하고 체인과 펜던트의 겹침을 봅니다.",
      "평소 동작을 한 뒤 같은 부위가 반복해서 걸리는지 확인합니다.",
      "걸림이 있으면 하나를 빼거나 다른 길이로 바꾸고 다시 비교합니다."
    ],
    "table": null
  }
]
const cautions = [
  "걸린 체인을 목에 건 채 잡아당기거나 연결 고리를 도구로 벌리지 마세요. 벌어짐·눌림·변형이 보이면 착용을 멈추고 상태를 확인하세요.",
  "길이와 체인 조합을 바꾸어도 모든 움직임에서 엉킴을 막는 것은 아닙니다. 이미 생긴 매듭은 아래의 목걸이 엉킴 가이드에서 별도로 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "목걸이 길이 추천",
    "description": "목둘레와 착용 위치에 따라 길이를 비교하는 기준입니다."
  },
  {
    "to": "/guide/necklace-chain-types-guide",
    "label": "목걸이 체인 종류",
    "description": "체인별 링크 모양과 특징을 비교할 수 있습니다."
  },
  {
    "to": "/guide/necklace-untangling-guide",
    "label": "목걸이 엉켰을 때 푸는 법",
    "description": "이미 생긴 매듭을 확인하고 무리한 힘을 피하는 순서입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '목걸이 레이어드 엉킴, 길이·체인 조합 확인법'
const gmArticleLead = '따로 착용할 때는 괜찮은 목걸이도 함께 걸면 체인이 포개지거나 펜던트가 부딪힐 수 있습니다. 두 목걸이가 어디에서 겹치는지 먼저 보고, 길이와 체인 조합을 하나씩 바꿔 보세요. 새 목걸이를 고를 때도 평소 함께 착용할 제품을 기준으로 비교하면 도움이 됩니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '목걸이 레이어드 엉킴'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '목걸이 레이어드 길이와 체인 조합 상담'
const gmHeroAlt = '아이보리 옷 위로 길이가 다른 금색 체인 세 개와 둥근 펜던트를 겹쳐 착용한 모습'
const gmHeroCaption = '서로 다른 길이와 링크 형태를 조합한 레이어드 착용 예시 이미지입니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '길이와 체인 종류의 조합은 Blue Nile의 레이어드 안내, 링크 형태는 Jewelers of America의 체인 안내를 참고했습니다. 비교표와 움직임 확인 순서는 이 원칙을 실제 착용 조합에 적용해 정리한 것으로, 엉킴 방지 효과를 보장하는 시험 기준은 아닙니다.'
const gmSources = [
  {
    "label": "Blue Nile — The Ultimate Guide to Layering Necklaces & 8 Styling Tips",
    "url": "https://www.bluenile.com/blog/fashion/layering-necklaces",
    "note": "서로 다른 길이와 체인 종류를 조합하는 레이어드 방법을 안내합니다."
  },
  {
    "label": "Jewelers of America — Chain Style Guide",
    "url": "https://www.jewelers.org/buying-jewelry/jewelry-styles/chains",
    "note": "체인 링크의 여러 형태와 서로 다른 체인을 조합하는 스타일을 설명합니다."
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
