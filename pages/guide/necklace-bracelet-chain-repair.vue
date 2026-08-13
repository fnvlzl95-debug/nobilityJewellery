<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-bracelet-chain-repair'
const pageTitle = '목걸이 끊어짐과 팔찌 잠금장식 수리 전 확인할 것 | 귀족'
const pageDescription = '목걸이나 팔찌가 끊어졌다면 체인 중간인지 잠금장식 연결부인지 먼저 구분하고, 제품 전체와 손상 부위를 함께 확인해야 합니다. 사진 상담 준비부터 실물 확인 전 주의할 점까지 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-bracelet-chain-repair-hero.webp`
const publishedAt = '2026-05-28'
const updatedAt = '2026-08-13'
const faqItems = [
  {
    "question": "목걸이가 끊어졌는데 사진만으로 상담할 수 있나요?",
    "answer": "제품 전체와 끊어진 위치, 체인 형태, 잠금장식과 연결 고리가 보이는 사진으로 1차 상담을 요청할 수 있습니다. 정확한 작업 범위와 일정은 실물 확인 후 안내받으세요."
  },
  {
    "question": "팔찌 잠금장식만 교체할 수 있나요?",
    "answer": "기존 체인 굵기와 연결 고리 형태, 잠금장식 상태, 분실 부속 여부를 확인한 뒤 교체 여부를 판단합니다. 가능 범위는 제품 상태와 상담 시점에 따라 달라질 수 있습니다."
  },
  {
    "question": "체인 중간이 끊어진 경우 어떤 방식으로 수리하나요?",
    "answer": "손상된 고리를 확인하고 필요한 경우 손상 부위를 정리한 뒤 건전한 고리를 연결하고 납땜하는 방식이 사용될 수 있습니다. 체인 구조와 상태에 따른 최종 방식은 실물 확인이 필요합니다."
  },
  {
    "question": "수리할 때 세척이나 광택도 같이 맡길 수 있나요?",
    "answer": "세척이나 광택을 함께 원하는 경우 상담할 때 요청할 수 있습니다. 제공 여부와 작업 범위는 제품 상태와 매장 안내를 확인한 뒤 결정됩니다."
  }
]

const quickAnswers = [
  "끊어진 위치가 체인 중간인지 잠금장식 연결부인지 먼저 구분하고, 체인 형태와 주변 마모 상태를 함께 확인하세요.",
  "사진 상담에는 제품 전체, 손상 부위 확대, 잠금장식과 연결 고리, 따로 보관 중인 부속이 모두 보이도록 준비하세요.",
  "작업 방식과 수리 가능 여부, 일정은 제품 상태와 상담 시점에 따라 달라질 수 있으므로 실물 확인 후 안내받으세요."
]

const sections = [
  {
    "title": "제품 전체와 손상 부위를 함께 촬영하세요",
    "paragraphs": [
      "끊어진 부분만 확대하면 체인 구조와 손상 위치를 파악하기 어려울 수 있습니다. 제품 전체와 손상 부위 주변을 함께 촬영하면 1차 상담에 필요한 정보를 전달하는 데 도움이 됩니다."
    ],
    "bullets": [
      "제품 전체가 보이는 사진",
      "끊어진 부위와 주변 고리를 확대한 사진",
      "잠금장식과 체인 연결부가 보이는 사진",
      "분리되었거나 따로 보관 중인 부속 사진"
    ]
  },
  {
    "title": "끊어진 위치와 체인 구조를 구분하세요",
    "paragraphs": [
      "같은 끊어짐이라도 체인 중간, 잠금장식 연결부, 펜던트 연결부, 고리 중 어디에서 손상이 생겼는지에 따라 확인할 내용이 달라질 수 있습니다. 가는 체인은 손상된 고리를 확인하고 필요한 경우 손상 부위를 정리한 뒤 건전한 고리를 연결하고 납땜하는 방식이 사용될 수 있습니다."
    ],
    "bullets": [
      "체인 중간의 고리가 끊어졌는지 확인",
      "잠금장식과 체인을 잇는 고리가 벌어지거나 변형되었는지 확인",
      "펜던트 연결부의 고리와 체인 손상을 구분",
      "체인 종류와 링크 형태, 주변 마모 상태를 확인",
      "로프 체인이나 케이블 체인처럼 구조가 복잡한지 확인"
    ],
    "image": {
      "src": "/Image/guide/necklace-bracelet-chain-repair-section-2.webp",
      "alt": "체인 중간과 잠금장식 연결 고리의 손상 위치를 비교하는 모습",
      "caption": "끊어진 위치와 체인 구조를 구분하세요에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "팔찌 잠금장식은 체인과 부속을 함께 확인하세요",
    "paragraphs": [
      "잠금장식만 분리해 확인하기보다 체인 끝과 연결 고리까지 함께 살펴야 합니다. 체인과 잠금장식의 재조립과 재납땜, 손상된 박스형 잠금장식 부품의 수리나 와이어 부품 설치가 작업에 포함될 수 있으나, 실제 범위는 제품 상태를 확인한 뒤 판단합니다."
    ],
    "bullets": [
      "잠금장식의 전체 형태",
      "체인 굵기와 연결 고리 형태",
      "잠금이 헐거운지 또는 부품이 파손되었는지",
      "분실된 고리나 부속이 있는지",
      "이전에 수리한 흔적이나 변형이 있는지"
    ]
  },
  {
    "title": "사진 상담부터 실물 확인까지의 순서",
    "paragraphs": [
      "사진 상담은 제품 구조와 손상 위치를 파악하기 위한 1차 확인입니다. 작업 가능 범위, 필요한 부속, 수리 방식과 일정은 실물 확인 후 안내받는 것이 적절합니다."
    ],
    "bullets": [
      "제품 전체와 손상 부위 사진 준비",
      "체인 중간, 연결 고리, 잠금장식 중 손상 위치 구분",
      "소재를 알고 있다면 소재 정보 전달",
      "분실 부속과 이전 수리 이력 전달",
      "수령 희망일과 세척 또는 광택 희망 여부 전달",
      "실물 확인 후 작업 범위와 상담 내용 확인"
    ],
    "image": {
      "src": "/Image/guide/necklace-bracelet-chain-repair-section-4.webp",
      "alt": "사진 상담부터 실물 확인까지의 순서 예시 이미지",
      "caption": "사진 상담부터 실물 확인까지의 순서에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "수리 전에는 손상 부위를 더 움직이지 마세요",
    "paragraphs": [
      "끊어진 체인을 억지로 굽히거나 당기면 남아 있는 고리와 연결부가 더 변형될 수 있습니다. 분리된 부속은 버리지 말고 함께 보관한 뒤 제품 전체와 연결부 상태를 수리 상담에서 보여주세요."
    ],
    "bullets": [
      "손상 부위를 강한 힘으로 당기거나 펴지 않기",
      "분리된 부속을 작은 봉투에 따로 보관하기",
      "체인 전체의 마모와 변형도 함께 확인하기",
      "세척이나 광택을 원하면 상담 때 미리 전달하기"
    ]
  }
]

const cautions = [
  "체인 종류와 링크 형태, 마모 정도에 따라 수리 난이도와 작업 범위가 달라질 수 있습니다.",
  "체인은 끊어진 부위를 수리한 뒤 원래 상태보다 강하지 않을 수 있으므로 착용 전 수리자의 점검과 관리 안내를 확인하세요.",
  "부속 분실, 이전 수리 흔적, 연결부 변형이 있으면 사진만으로 최종 작업 방식이나 일정을 확정하기 어렵습니다.",
  "불꽃이나 납땜 도구를 사용하는 자가 수리는 피하고, 손상 상태를 그대로 보존해 전문 수리 상담을 받는 편이 좋습니다."
]

const relatedLinks = [
  {
    "to": "/guide/silver-necklace-repair-possible",
    "label": "은목걸이 수리 가능 여부, 끊어짐·잠금장식·변색별로 정리",
    "description": "은 소재 목걸이의 끊어짐, 잠금장식 문제와 변색 상태를 상담 전에 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/pearl-necklace-restringing",
    "label": "진주 목걸이 줄 교체, 종로 수리 전 확인할 것",
    "description": "진주 목걸이는 체인 수리와 다른 줄 교체 기준을 확인할 수 있습니다."
  },
  {
    "to": "/guide/necklace-clasp-types",
    "label": "목걸이 잠금장식 종류, 스프링링·랍스터·토글 차이",
    "description": "잠금장식 형태와 연결 구조를 비교해 수리 상담 전에 확인할 수 있습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '목걸이 끊어짐과 팔찌 잠금장식 수리 전 확인할 것'
const gmArticleLead = '목걸이와 팔찌의 수리 방식은 끊어진 위치, 체인 구조, 잠금장식과 연결 고리 상태, 분실된 부속 여부에 따라 달라질 수 있습니다. 사진은 1차 상담에 활용하고, 최종 작업 범위와 가능 여부는 실물 확인 후 안내받으세요.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '목걸이 끊어짐 팔찌 잠금장식 수리'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '목걸이·팔찌 체인과 잠금장식 수리 상담'
const gmHeroAlt = '끊어진 목걸이 체인과 팔찌 잠금장식을 확인하는 수리 상담 장면'
const gmSourceNote = '체인 수리 원리와 잠금장식 관련 작업 범위는 승인된 Gemological Institute of America와 Jewelers of America 자료를 바탕으로 정리했습니다. 개별 제품의 수리 가능 여부, 부속 수급, 가격, 일정, 세척과 광택 제공 여부는 사업자 상담과 실물 확인이 필요합니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, Bench Tip #5: Repair a Fine Chain with a Soldering Technique",
    "url": "https://www.gia.edu/bench-tip-repair-fine-chain-with-soldering-technique",
    "note": "가는 체인의 손상 고리를 제거하고 연결한 뒤 납땜하는 수리 절차와 작업상 주의점을 설명하는 공식 기술 자료입니다."
  },
  {
    "label": "Jewelers of America, Jewelry Repair",
    "url": "https://www.jewelers.org/buying-jewelry/jewelry-repair-and-care/jewelry-repair",
    "note": "체인 수리의 일반적 결과, 수리 후 강도와 체인 종류별 난이도, 수리 전 확인 사항을 설명하는 공식 소비자 안내입니다."
  },
  {
    "label": "Jewelers of America, Bench Professional Certification Program Sample Tests",
    "url": "https://www.jewelers.org/images/careers/JA-BenchCertification-SampleTest-2023.pdf",
    "note": "전문 보석 수리 실기 항목으로 체인과 잠금장식 재조립 및 재납땜, 박스 잠금장식 부품 수리를 제시합니다."
  },
  {
    "label": "Gemological Institute of America, Graduate Jeweler Program",
    "url": "https://www.gia.edu/gem-education/program-graduate-jeweler",
    "note": "보석 제작과 수리 교육 과정에 납땜, 체인 조립, 잠금장식 제작과 레이저 용접이 포함됨을 설명합니다."
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
        { name: '목걸이·팔찌 체인 수리', path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        datePublished: publishedAt,
        dateModified: updatedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', name: siteConfig.name },
        publisher: { '@type': 'Organization', name: siteConfig.name },
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
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
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
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
