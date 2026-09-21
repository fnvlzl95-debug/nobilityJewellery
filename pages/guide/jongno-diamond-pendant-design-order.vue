<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-diamond-pendant-design-order'
const pageTitle = '다이아 목걸이 주문, 한 알과 둘레 장식 | 귀족'
const pageDescription = '다이아 목걸이 주문제작은 한 알을 강조할지 둘레 장식을 더할지부터 고르세요. 중심석과 펜던트 외곽, 옆면 높이를 나누어 비교하고 종로 귀족에 원하는 디자인의 제작 상담을 요청할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-diamond-pendant-design-order-hero-2573bff4.webp`
const publishedAt = '2026-09-21'
const updatedAt = ''
const faqItems = [
  {
    "question": "한 알 목걸이와 헤일로 목걸이는 무엇이 다른가요?",
    "answer": "한 알을 중심으로 보여 주는 구성과 그 중심석 주위에 작은 보석을 둘러 장식한 구성의 차이입니다. 가운데 보석을 강조하고 싶은지, 둘레 장식까지 보이길 원하는지부터 비교해 보세요."
  },
  {
    "question": "펜던트가 커 보이면 중심 다이아도 큰가요?",
    "answer": "그렇다고 단정할 수 없습니다. 주변 장식이 펜던트 외곽을 넓혀 보이게 할 수 있으므로 중심석 자체와 장식을 포함한 전체 치수를 나누어 확인하세요."
  },
  {
    "question": "정면 사진만으로 다이아 목걸이를 주문해도 되나요?",
    "answer": "정면 사진은 원하는 분위기를 전하기 위한 출발점입니다. 주문을 정하기 전에는 옆면 높이, 뒷면 받침, 연결 고리 포함 치수까지 확인하는 것이 좋습니다."
  },
  {
    "question": "두 디자인 중 고르지 못했어도 견적 상담을 할 수 있나요?",
    "answer": "비교 중인 사진과 각 사진에서 마음에 드는 부분을 보내 주세요. 중심석을 강조할지 둘레 장식을 더할지부터 정리하고, 가능한 디자인과 보석 구성에 맞춰 견적을 상담할 수 있습니다."
  }
]
const quickAnswers = [
  "한 알의 윤곽을 강조하고 싶다면 솔리테어형, 중심석 주변까지 반짝이는 장식을 원하면 헤일로형부터 비교하세요.",
  "목걸이 전체가 커 보이는 것과 중심 다이아 자체가 큰 것은 다른 조건입니다.",
  "정면·옆면·뒷면 자료로 원하는 모습을 정하고, 참고 사진과 희망일을 보내 주문 상담을 시작하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "한 알을 강조할지, 둘레 장식을 더할지 고르세요",
    "paragraphs": [
      "솔리테어형은 한 개의 보석을 중심으로 보여 주는 구성입니다. Tiffany의 공식 솔리테어 펜던트 설명에서도 라운드 브릴리언트 다이아몬드를 단 펜던트를 확인할 수 있습니다. 다이아 한 알의 모양이 눈에 들어오는 모습을 원할 때 비교할 수 있습니다.",
      "헤일로형은 중심석 주위에 작은 보석을 둘러 놓은 구성입니다. Tiffany의 Soleste 공식 설명은 중심석을 다이아몬드 둘레 장식이 감싼 형태를 소개합니다. 여기서는 두 유형의 구조를 이해하는 사례로만 참고하며, 귀족의 제품 구성이나 재고를 뜻하지 않습니다.",
      "둘 중 어느 것이 더 좋은지보다 내가 보고 싶은 부분을 먼저 정하세요. 사진에서 “가운데 한 알이 좋다” 또는 “둘레까지 이어지는 반짝임이 좋다”고 표시하면 상담의 출발점이 분명해집니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 인상",
        "먼저 비교할 형태",
        "사진에서 표시할 부분"
      ],
      "rows": [
        [
          "한 알의 모양을 또렷하게",
          "솔리테어형",
          "중심석의 윤곽과 드러난 금속 테두리"
        ],
        [
          "중심 주변까지 장식이 이어지게",
          "헤일로형",
          "중심석과 둘레 보석 사이의 경계"
        ],
        [
          "두 형태 사이에서 고민 중",
          "같은 척도의 두 후보",
          "좋아하는 외곽과 피하고 싶은 장식"
        ]
      ]
    }
  },
  {
    "title": "중심석 크기와 펜던트 외곽을 따로 비교하세요",
    "paragraphs": [
      "두 후보의 확대 사진을 나란히 놓으면 서로 다른 크기도 비슷하게 보일 수 있습니다. 비교할 때는 중심석 자체의 가로·세로와 장식을 포함한 펜던트 외곽을 각각 확인해 달라고 요청하세요. 위쪽 연결 고리가 있는 디자인은 고리를 포함한 세로 길이인지도 함께 물어보면 좋습니다.",
      "예를 들어 A 사진에서는 중심석 한 알이 마음에 들고, B 사진에서는 펜던트 전체의 윤곽이 마음에 들 수 있습니다. 이때 “B처럼 크게”라고만 요청하지 말고, 원하는 것이 보석 자체의 크기인지 둘레 장식까지 포함한 모습인지 구분해 전달하세요.",
      "견적도 선택한 중심석과 주변 보석 구성에 맞춰 확인해야 합니다. 두 후보가 비슷하게 보인다는 이유만으로 같은 보석 조건이나 같은 가격이라고 판단하지 마세요. 다이아 등급과 보고서 설명은 아래 관련 가이드에서 별도로 확인할 수 있습니다."
    ],
    "bullets": [
      "중심석만의 정면 치수",
      "장식을 포함한 펜던트 외곽 치수",
      "연결 고리 포함·제외 기준",
      "각 후보의 보석 구성과 소재"
    ],
    "table": null
  },
  {
    "title": "옆면과 뒷면에서 원하는 돌출감을 확인하세요",
    "paragraphs": [
      "정면의 윤곽을 골랐다면 옆면도 비교하세요. 보석을 받치는 부분이 얼마나 솟아 있는지, 연결 고리가 위로 드러나는지에 따라 예상한 모습과 다르게 느낄 수 있습니다. “정면은 이 사진처럼, 옆면은 덜 돌출된 느낌으로”처럼 원하는 방향을 적어 보세요.",
      "뒷면은 펜던트의 받침 모양과 피부에 닿는 부분을 살펴보기 위한 자료입니다. 정면 사진만 보고 뒷면이 평평하거나 속이 막혀 있다고 추정하지 말고, 제품 사진 또는 제작 상담에서 확인하세요. 자료를 보고도 착용감이 궁금하다면 방문 시 확인할 수 있는 범위를 먼저 문의하면 됩니다.",
      "기존 체인을 활용하려는 경우에는 그 사실을 함께 알려 주세요. 체인 길이나 고리 호환을 자세히 확인하는 순서는 관련 가이드로 이어 볼 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "원하는 윤곽을 표시해 귀족에 문의하세요",
    "paragraphs": [
      "마음에 드는 사진 한 장 또는 비교 중인 두 장을 준비해 주세요. 중심 한 알과 둘레 장식 중 선호하는 부분을 표시하고, 옆면에서 피하고 싶은 돌출감이 있다면 함께 적으면 됩니다. 소재나 보석 조건을 아직 정하지 못했다면 상담에서 비교할 수 있도록 미정이라고 남겨 주세요.",
      "문의 예시: “다이아 목걸이를 주문하고 싶습니다. 첫 번째 사진의 한 알이 또렷한 모습과 두 번째 사진의 둘레 장식을 비교 중이에요. 표시한 윤곽을 기준으로 가능한 디자인과 견적을 알고 싶습니다. 옆면은 많이 돌출되지 않는 쪽을 선호하고, 희망 수령일은 ○월 ○일입니다.”",
      "아래 카카오톡 상담으로 사진과 원하는 조건을 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 디자인별 제작 가능 범위와 주문 조건을 상담할 수 있습니다. 가격과 수령 일정은 선택한 구성에 맞춰 확인합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "확대된 상품 사진만으로 중심석의 실제 크기와 펜던트 외곽을 비교하지 마세요. 측정 범위가 같은 자료인지 확인하세요.",
  "참고 사진의 장식을 그대로 구현할 수 있는지는 구조와 소재를 확인한 뒤 상담합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "다이아 목걸이 주문 상담 안내",
    "description": "원하는 윤곽과 참고 사진으로 제작 상담을 시작하세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 확인하기",
    "description": "디자인을 고른 뒤 보석 보고서의 검사 범위를 확인하세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "기존 체인과 펜던트 호환 확인",
    "description": "이미 가진 체인을 함께 쓰고 싶을 때 참고할 안내입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '다이아 목걸이 주문, 한 알과 둘레 장식'
const gmArticleLead = '다이아 목걸이 주문제작을 고민한다면 “한 알이 또렷한 목걸이”와 “작은 보석이 둘레를 감싼 목걸이”를 먼저 비교해 보세요. 두 디자인은 사진에서 비슷한 크기로 보여도 중심석과 장식의 비율이 다릅니다. 원하는 윤곽을 고른 뒤 참고 사진을 귀족에 보내 제작 가능 범위와 견적을 상담해 보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '다이아 목걸이 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '다이아 목걸이 한 알·둘레 장식 디자인'
const gmHeroAlt = '밝은 천 위에 놓인 원형 보석 한 알의 금빛 펜던트 목걸이 세 개'
const gmHeroCaption = '디자인 구조를 설명하기 위해 만든 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '솔리테어와 헤일로의 구조 사례는 Tiffany 공식 펜던트 설명을 참고했습니다. 사진·치수 비교 순서와 문의 예시는 주문 상담을 돕기 위한 편집 안내이며, 타사의 제품 조건이 귀족에도 동일하게 적용된다는 뜻은 아닙니다.'
const gmSources = [
  {
    "label": "Tiffany — Solitaire Diamond Pendant",
    "url": "https://www.tiffany.com/jewelry/necklaces-pendants/no-designer-platinum-diamond-necklaces-pendants-40302572.html",
    "note": "라운드 브릴리언트 다이아몬드 한 알의 펜던트 사례."
  },
  {
    "label": "Tiffany — Soleste Pendant",
    "url": "https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-soleste-platinum-diamond-necklaces-pendants-60572844.html",
    "note": "중심석을 둘레 보석이 감싸는 헤일로 구성 사례."
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
