<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/fall-2026-charm-necklace-trend'
const pageTitle = '2026 가을 참 목걸이, 모티브 조합법 | 귀족'
const pageDescription = '2026년 9월 보그가 소개한 가을 참 주얼리 흐름을 바탕으로, 여러 모티브를 한 목걸이에 조합하는 방법을 정리했습니다. 중심 장식과 배치 방식, 나중에 교체할지 여부를 정해 귀족에 구매·제작 상담을 시작해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/fall-2026-charm-necklace-trend-hero-87844b8b.webp`
const publishedAt = '2026-09-27'
const updatedAt = ''
const faqItems = [
  {
    "question": "2026 가을 참 목걸이 유행은 어떤 자료를 참고했나요?",
    "answer": "2026년 9월 4일 보그의 가을 액세서리 기사 중 참 주얼리 내용을 참고했습니다. 브랜드의 참 조합 안내는 스타일링 사례로 별도 활용했습니다."
  },
  {
    "question": "참 목걸이와 목걸이 레이어드는 같은 뜻인가요?",
    "answer": "참 목걸이는 작은 장식을 달아 구성한 목걸이이고, 레이어드는 목걸이를 여러 줄 겹쳐 착용하는 방식입니다. 이 글은 한 목걸이 안의 모티브 조합을 다룹니다."
  },
  {
    "question": "참 목걸이는 모든 장식을 나중에 바꿀 수 있나요?",
    "answer": "제품에 따라 고정된 장식과 교체 가능한 장식이 다릅니다. 배치 사진만 보지 말고 연결 구조와 추가·교체 가능 범위를 확인하세요."
  },
  {
    "question": "가지고 있는 참으로 새 목걸이를 만들 수 있나요?",
    "answer": "참의 연결 부분과 새 체인·홀더가 맞는지 확인해야 합니다. 보유한 참의 앞면·연결 고리 사진과 제품 정보를 보내 가능한 구성부터 상담해 주세요."
  }
]
const quickAnswers = [
  "좋아하는 모티브 사진과 함께 입을 가을옷 사진을 준비하면 원하는 분위기를 설명하기 쉽습니다.",
  "참 목걸이는 중심으로 보여 주고 싶은 장식을 고른 뒤 공통 색이나 질감을 정해 조합해 보세요.",
  "참을 한 홀더에 모을지 나누어 달지, 고정할지 교체할 수 있게 할지는 별개의 선택입니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "2026 가을 참 목걸이 트렌드는 무엇인가요?",
    "paragraphs": [
      "2026년 9월 4일 보그는 가을 액세서리 기사에서 메달·글자·조개 등 여러 모티브를 활용한 참 주얼리와 니트·셔츠 위 연출을 소개했습니다. 해외 컬렉션에서 관찰한 스타일 흐름으로, 국내 판매량이나 특정 제품의 인기 순위를 뜻하는 자료는 아닙니다.",
      "이번 글에서는 이 흐름을 내 목걸이에 적용할 때 정할 요소를 살펴봅니다. 목걸이를 여러 줄 겹치는 방법보다, 한 목걸이 안에서 어떤 장식을 함께 보여 줄지에 초점을 맞춰 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "참 모티브는 어떤 기준으로 조합하면 좋나요?",
    "paragraphs": [
      "중심으로 보여 주고 싶은 모티브부터 고르고, 다른 장식과 연결할 공통 요소를 정해 보세요. Pandora의 참 목걸이 스타일링 안내도 취향과 기억을 담은 상징을 고르고 크기·색의 균형을 살피도록 제안합니다. 이 자료는 브랜드의 조합 사례이며 최신 유행을 측정한 통계는 아닙니다.",
      "아래 표는 조합을 시작하기 위한 자체 제안입니다. 좋아하는 장식을 모두 한꺼번에 넣기 전에 어떤 부분이 마음에 드는지 적어 보세요. 같은 모양을 반복할지, 서로 다른 모양을 색으로 묶을지도 선택할 수 있습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 분위기",
        "먼저 고를 모티브",
        "함께 맞출 기준"
      ],
      "rows": [
        [
          "개인적인 의미를 담고 싶음",
          "나에게 의미 있는 상징",
          "다른 장식보다 주인공이 잘 보이는지"
        ],
        [
          "자연스러운 형태가 좋음",
          "잎·조개 등 좋아하는 윤곽",
          "표면 질감이나 금속 색을 연결할지"
        ],
        [
          "여러 모양을 경쾌하게 섞고 싶음",
          "별·하트 등 구분되는 모양",
          "공통 색을 남길지, 크기 차이를 줄지"
        ]
      ]
    }
  },
  {
    "title": "참을 한곳에 모을까요, 체인에 나눠 달까요?",
    "paragraphs": [
      "중앙에 모인 장식을 원하면 홀더에 모으는 구성, 목걸이 전체에 장식이 보이기를 원하면 간격을 두는 구성을 비교해 보세요. Pandora는 O 참 홀더에 참을 모아 체인 등에 연결하는 방식을 소개합니다. 모든 참 목걸이가 같은 홀더를 쓰거나 같은 방식으로 배치되는 것은 아닙니다.",
      "배치와 교체 가능 여부도 구분해야 합니다. 사진에서 떨어져 달린 것처럼 보여도 실제로 위치가 고정된 제품일 수 있습니다. 원하는 간격을 유지하는 구성인지, 나중에 참을 더하거나 바꿀 수 있는지 제품별로 물어보세요.",
      "이미 가진 참을 쓰고 싶다면 앞면 사진뿐 아니라 연결 고리와 사용하던 제품 정보를 함께 보내 주세요. 보이는 구멍이 비슷하다는 이유만으로 다른 체인이나 홀더에 맞는다고 판단하지 말고, 연결 가능 여부와 사용 조건을 확인하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "가을옷에 맞춘 참 목걸이는 어떻게 상담하나요?",
    "paragraphs": [
      "평소 입는 상의 위에서 장식의 위치와 서로 겹치는 모습을 보고 선택하세요. 장식이 한곳에 모였을 때와 간격을 두었을 때를 같은 옷 사진에서 비교하면 어느 쪽이 원하는 분위기인지 판단하기 좋습니다. 정해진 참 개수나 길이를 정답으로 삼을 필요는 없습니다.",
      "문의 예시: “별과 조개 모양을 함께 넣은 참 목걸이를 원합니다. 가운데에 모두 모으기보다 체인을 따라 나누어 배치한 느낌이 좋아요. 금속 색은 통일하고, 나중에 장식을 바꿀 수 있는지 궁금합니다. 첨부한 니트와 어울리는 구성으로 상담받고 싶어요.”",
      "귀족 카카오톡에 좋아하는 모티브 사진·중앙 집중 또는 분산 배치·고정 또는 교체 희망·함께 입을 옷·예산·희망일을 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 구매·제작 가능 범위와 견적·일정을 상담할 수 있습니다. 소개한 브랜드 제품의 판매나 동일 구조 제작을 보장하는 안내는 아닙니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "패션 기사에서 소개한 스타일을 국내 인기 순위나 판매 증가로 해석하지 마세요.",
  "보유 참을 다른 체인·홀더와 조합하거나 장식을 추가할 때는 제품별 호환과 사용 조건을 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "참 목걸이 조합 상담하기",
    "description": "좋아하는 모티브와 원하는 배치를 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 보기",
    "description": "참과 함께 고려할 목걸이 분위기를 찾아보세요."
  },
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "목걸이 기본 길이 선택",
    "description": "장식 조합을 고른 뒤 착용 위치를 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '2026 가을 참 목걸이, 모티브 조합법'
const gmArticleLead = '참 목걸이는 작은 장식인 참을 달아 구성한 목걸이입니다. 좋아하는 상징부터 정하고, 한곳에 모을지 체인에 나누어 배치할지 비교해 보세요. 가을옷과 함께 고를 때도 평소 입는 옷과 원하는 교체 방식에 맞춰 구성하는 편이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '2026 가을 참 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '참 목걸이 모티브 조합과 배치'
const gmHeroAlt = '갈색 니트 위 금빛 체인에 조개·잎·불가사리 모티브를 나누어 단 참 목걸이 예시'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이나 패션쇼 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '최근 흐름은 보그의 2026년 9월 4일 기사로 확인했고, 참 조합과 홀더 사례는 Pandora 안내를 참고했습니다. 모티브 선택 표와 주문 예시는 귀족 상담을 준비하기 위한 제안입니다. 자료 확인일은 2026년 9월 27일입니다.'
const gmSources = [
  {
    "label": "Vogue — Fall 2026 Accessory Trends (2026.09.04)",
    "url": "https://www.vogue.com/article/fall-2026-accessory-trends",
    "note": "2026년 9월 4일 발행된 가을 액세서리 기사 중 참 주얼리 흐름입니다."
  },
  {
    "label": "Pandora — Charm Necklaces to Style and Gift",
    "url": "https://au.pandora.net/en/blog/statement-charm-necklace-ideas/",
    "note": "개인적인 상징과 크기·색을 고려하는 참 조합 안내입니다."
  },
  {
    "label": "Pandora — Charm Holders: How to Style",
    "url": "https://uk.pandora.net/en/discover/stories/charm-holders-how-to/",
    "note": "참을 홀더에 모아 체인 등에 연결하는 브랜드 사례입니다."
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
