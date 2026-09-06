<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-chain-replacement-guide'
const pageTitle = '목걸이 줄 교체와 펜던트 호환 | 귀족'
const pageDescription = '목걸이 줄을 바꿀 때 손상 위치와 금속 표시를 확인하고, 펜던트 고리와 잠금장치가 새 체인에 맞는지 상담하는 방법을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-chain-replacement-guide-hero-c433543b.webp`
const publishedAt = '2026-09-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "체인이 끊어지면 바로 줄 전체를 교체해야 하나요?",
    "answer": "손상 위치와 범위에 따라 달라집니다. 체인 중간의 손상인지, 연결 고리나 잠금장치의 문제인지 확인한 뒤 수리와 교체 방향을 상담하세요."
  },
  {
    "question": "기존 펜던트를 새 체인에 연결할 수 있나요?",
    "answer": "펜던트 고리의 안쪽 공간, 체인 굵기, 잠금장치 크기와 연결 방식을 확인해야 합니다. 실물 치수를 확인하기 전에는 호환 여부를 단정하기 어렵습니다."
  },
  {
    "question": "체인과 펜던트가 같은 재질인지 어떻게 확인하나요?",
    "answer": "각 부품의 금속 표시와 구매 당시 안내를 확인하세요. 표시가 없거나 불분명하면 외관만으로 같은 재질이라고 판단하지 말고 상담 과정에서 확인해야 합니다."
  },
  {
    "question": "상담 전에 어떤 사진을 준비하면 되나요?",
    "answer": "목걸이 전체, 손상 부위, 잠금장치, 연결 고리, 펜던트 고리가 보이는 사진을 준비하세요. 가능하면 재질 표시와 체인 끝부분도 함께 촬영하세요."
  }
]
const quickAnswers = [
  "체인이 늘어졌거나 연결부와 잠금장치가 손상됐다면 착용을 멈추고 상태를 먼저 확인하세요.",
  "펜던트 호환 여부는 펜던트 고리의 안쪽 공간, 체인 굵기, 연결 방식과 재질 표시를 함께 확인해야 합니다.",
  "체인과 펜던트의 재질이나 도금 정보가 확인되지 않으면 같은 재질이나 안전한 호환이라고 단정할 수 없습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "줄 교체를 먼저 상담할 상황",
    "paragraphs": [
      "체인이 끊어졌거나 특정 부분이 심하게 눌린 경우, 줄 전체 교체가 필요한지 손상 부위 수리로 충분한지 구분해야 합니다.",
      "잠금장치가 느슨하거나 체인과 잠금장치를 잇는 연결 고리가 변형됐다면 착용을 중지하고 점검을 우선하세요. 손상 정도는 사진만으로 판단하기 어려울 수 있습니다."
    ],
    "bullets": [
      "체인이 한쪽으로 반복해서 꺾이는지 확인하기",
      "잠금장치가 끝까지 닫히는지 확인하기",
      "체인과 잠금장치 사이 연결 고리가 벌어졌는지 살펴보기",
      "펜던트 고리와 체인의 접촉 부위가 과하게 마모됐는지 확인하기"
    ],
    "table": null
  },
  {
    "title": "펜던트 호환을 확인하는 항목",
    "paragraphs": [
      "새 체인에 기존 펜던트를 연결할 수 있는지는 펜던트 고리의 안쪽 공간과 체인의 굵기, 체인이 통과하는 방향을 함께 봐야 합니다.",
      "펜던트 고리가 납작하거나 안쪽 공간이 좁으면 체인이 지나가지 않거나 움직임이 제한될 수 있습니다. 체인 끝의 잠금장치를 분리해야 연결되는 구조인지도 확인 대상입니다."
    ],
    "bullets": [
      "펜던트 고리의 안쪽 높이와 폭",
      "체인이 펜던트 고리를 통과하는지 여부",
      "체인 끝 잠금장치의 크기와 분리 가능 여부",
      "펜던트와 체인의 연결 고리 형태",
      "착용 중 한쪽에 하중이 몰리는 구조인지 여부"
    ],
    "table": {
      "headers": [
        "확인 항목",
        "상담에서 볼 내용"
      ],
      "rows": [
        [
          "펜던트 고리",
          "체인이 통과할 수 있는 안쪽 공간과 형태"
        ],
        [
          "체인 굵기",
          "펜던트 고리와 잠금장치에 걸리지 않는지"
        ],
        [
          "연결 방식",
          "끝부분 분리 또는 별도 연결 고리 사용 여부"
        ],
        [
          "재질·도금 표시",
          "확인된 표시와 실제 상태가 일치하는지"
        ],
        [
          "손상 상태",
          "마모·변형·벌어짐이 있는지"
        ]
      ]
    }
  },
  {
    "title": "재질과 표시를 확인하는 이유",
    "paragraphs": [
      "체인과 펜던트의 재질, 도금 여부, 금속 표시가 확인되어야 교체 부품을 비교할 수 있습니다. 표시가 없거나 판독하기 어려운 경우에는 확인되지 않은 정보를 바탕으로 같은 재질이라고 판단하지 않아야 합니다.",
      "금속의 종류나 품질 표시는 제품과 판매 정보에 따라 확인 방법이 다를 수 있습니다. 상담할 때 각 부품의 표시, 구매 당시 안내, 보유한 보증서나 영수증을 함께 제시하면 확인에 도움이 됩니다."
    ],
    "bullets": [
      "체인과 펜던트에 각기 다른 표시가 있는지 확인하기",
      "도금 제품인지 알 수 있는 구매 정보가 있는지 확인하기",
      "재질을 모르는 부품은 외관만으로 판단하지 않기",
      "교체 후 색상과 표면 상태의 차이가 생길 수 있음을 상담하기"
    ],
    "table": null
  },
  {
    "title": "상담 전에 준비할 정보",
    "paragraphs": [
      "실물 상담 전에는 목걸이 전체와 손상 부위를 각각 촬영하고, 펜던트를 체인에 연결한 상태의 사진도 준비하세요. 사진에는 잠금장치, 연결 고리, 펜던트 고리가 모두 보이도록 하는 것이 좋습니다.",
      "체인의 길이와 원하는 착용 방식, 펜던트를 계속 사용할지 여부, 확인 가능한 재질 표시를 알려주면 교체 방향을 논의하기 쉽습니다. 최종적인 교체 가능 여부와 작업 범위는 실물 상태를 확인한 뒤 달라질 수 있습니다."
    ],
    "bullets": [
      "목걸이 전체 사진",
      "끊어짐이나 마모 부위의 가까운 사진",
      "잠금장치와 펜던트 고리 사진",
      "길이와 체인 굵기에 대한 희망",
      "구매 당시 재질 정보와 보유 서류"
    ],
    "table": null
  }
]
const cautions = [
  "잠금장치가 느슨하거나 연결부가 손상된 목걸이는 추가 손실을 막기 위해 착용을 중지하고 점검을 먼저 받으세요.",
  "재질과 도금 정보가 확인되지 않은 상태에서 같은 재질, 안전한 호환, 내구성을 단정하지 마세요.",
  "펜던트 고리나 체인의 치수는 사진만으로 정확히 확인하기 어려울 수 있어 실물 상담이 필요할 수 있습니다."
]
const relatedLinks = [
  {
    "to": "/guide/necklace-bracelet-chain-repair",
    "label": "목걸이 끊어짐 수리: 체인·잠금장치 확인 기준",
    "description": "체인 중간, 연결 고리, 잠금장치 중 손상 위치를 구분하고 수리 상담 전에 확인할 내용을 정리했습니다."
  },
  {
    "to": "/guide/necklace-clasp-types",
    "label": "목걸이 잠금장치 종류, 스프링링·랍스터·토글 차이",
    "description": "잠금장치의 구조와 조작성, 연결부 점검 시 살펴볼 기준을 비교합니다."
  },
  {
    "to": "/guide/necklace-chain-types-guide",
    "label": "목걸이 체인 종류, 베네치아·커브·로프·스네이크 차이",
    "description": "체인 구조와 펜던트 고리 치수, 교체 상담에서 확인할 기준을 정리했습니다."
  },
  {
    "to": "/guide/pearl-necklace-restringing",
    "label": "진주 목걸이 줄 교체, 종로 수리 전 확인할 것",
    "description": "진주 목걸이의 줄 교체와 잠금장치, 상담 전 준비할 사진을 안내합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '목걸이 줄 교체와 펜던트 호환'
const gmArticleLead = '목걸이 줄 교체는 끊어진 위치만 보는 것보다 체인, 연결 고리, 잠금장치, 펜던트 고리의 상태를 함께 확인하는 것이 중요합니다. 재질과 치수가 확인되지 않은 상태에서는 호환 여부를 단정하지 말고 실물 점검을 우선하세요.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '목걸이 줄 교체 펜던트 호환'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '목걸이 체인 교체와 펜던트 호환 상담'
const gmHeroAlt = '작은 펜던트와 굵기가 다른 목걸이 체인이 흰색 작업대에 놓여 있고 옆에 확대경과 측정 도구가 배치된 모습'
const gmHeroCaption = '체인과 펜던트 연결부를 살펴보는 상담 준비'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '관리와 표시 확인에 관한 일반 기준은 아래 승인 출처를 참고했습니다. 두 출처 모두 자동 조사 단계의 자료이므로, 실제 작업 가능 여부와 범위는 상담 시 실물 상태를 기준으로 확인하세요.'
const gmSources = [
  {
    "label": "Tiffany & Co. Jewelry Care FAQ",
    "url": "https://www.tiffany.com/faq/care-repair-faq/how-do-i-care-for-my-jewelry/",
    "note": "주얼리 잠금장치와 연결부 확인, 체인과 잠금장치 관리 및 수리에 관한 안내를 참고했습니다."
  },
  {
    "label": "Federal Trade Commission Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속의 금속 종류, 품질, 내구성, 서비스 가능성과 관련 표시를 확인할 때 참고했습니다."
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
