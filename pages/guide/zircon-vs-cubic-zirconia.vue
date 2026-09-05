<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/zircon-vs-cubic-zirconia'
const pageTitle = '지르콘과 큐빅 지르코니아 차이 | 귀족'
const pageDescription = '지르콘과 큐빅 지르코니아는 이름이 비슷하지만 재료와 관리법이 다릅니다. 제품 표기와 보고서에서 확인할 항목, 지르콘 관리 방법을 정리합니다.'
const ogImage = `${siteConfig.url}/Image/guide/zircon-vs-cubic-zirconia-hero-b17bdd15.webp`
const publishedAt = '2026-09-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "지르콘과 큐빅 지르코니아는 같은 돌인가요?",
    "answer": "아닙니다. 지르콘은 ZrSiO4 광물이고, 큐빅 지르코니아는 산화지르코늄을 바탕으로 만든 인공 재료입니다."
  },
  {
    "question": "파란색이면 지르콘이라고 볼 수 있나요?",
    "answer": "그렇게 볼 수 없습니다. 지르콘과 큐빅 지르코니아 모두 여러 색으로 나타날 수 있으므로 색만으로 재료를 구분하면 안 됩니다."
  },
  {
    "question": "선물 제품에서 어떤 표기를 확인해야 하나요?",
    "answer": "zircon, natural zircon, cubic zirconia, CZ처럼 재료를 직접 가리키는 표현을 확인하세요. 보고서가 있다면 천연 또는 인공 여부와 검출 가능한 처리 항목을 제품 표기와 대조하는 것이 좋습니다."
  },
  {
    "question": "지르콘은 어떻게 세척하나요?",
    "answer": "따뜻한 비눗물로 부드럽게 세척하는 방법이 안내됩니다. 초음파와 스팀 세척은 피하고, 완성 제품은 주변 보석과 세팅 상태의 제한도 확인하세요."
  }
]
const quickAnswers = [
  "지르콘은 ZrSiO4 광물이고 큐빅 지르코니아는 산화지르코늄 기반의 인공 재료입니다.",
  "색과 반짝임만으로 두 재료나 처리 상태를 확정할 수 없습니다.",
  "지르콘은 마찰·충격을 피하고, 완성 제품의 상태를 확인한 뒤 관리법을 정합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "비슷한 이름이지만 같은 재료가 아닙니다",
    "paragraphs": [
      "지르콘은 ZrSiO4라는 화학식을 가진 광물입니다. 무색뿐 아니라 파랑, 빨강, 노랑, 갈색, 초록 등 여러 색으로 나타날 수 있습니다.",
      "큐빅 지르코니아는 산화지르코늄을 원료로 만든 인공 재료입니다. 지르콘을 실험실에서 단순히 성장시킨 같은 물질이라는 뜻이 아니며, 다른 보석의 외관을 대신하는 모조 또는 대체 재료로 사용될 수 있습니다."
    ],
    "bullets": [
      "제품 설명에서 zircon 또는 natural zircon인지 확인합니다.",
      "cubic zirconia 또는 CZ로 적혀 있는지 확인합니다.",
      "색 이름만으로 재료를 구분하지 않습니다."
    ],
    "table": {
      "headers": [
        "구분",
        "지르콘",
        "큐빅 지르코니아"
      ],
      "rows": [
        [
          "재료",
          "광물 지르콘 ZrSiO4",
          "산화지르코늄 기반의 인공 재료"
        ],
        [
          "형성 또는 제작",
          "자연에서 형성된 광물",
          "사람이 만든 인공 재료"
        ],
        [
          "색",
          "파랑, 빨강, 노랑, 갈색 등",
          "여러 색으로 제작 가능"
        ],
        [
          "확인 기준",
          "제품 표기와 보고서의 재료 및 처리 항목",
          "제품 표기의 cubic zirconia 또는 CZ"
        ]
      ]
    }
  },
  {
    "title": "천연·인공·모조라는 말 읽기",
    "paragraphs": [
      "천연·인공은 형성 배경에 관한 말이고, 모조는 다른 보석의 외관을 대신하는 용도를 설명합니다. 모조 재료에는 천연과 인공 재료가 모두 포함될 수 있습니다.",
      "큐빅 지르코니아를 지르콘의 실험실 성장품으로 읽으면 재료를 잘못 이해하게 됩니다. 제품명에 큐빅이라는 말만 있으면 판매자에게 정확한 재료명을 물어보세요."
    ],
    "bullets": [
      "천연 여부와 실제 재료명은 각각 확인합니다.",
      "CZ를 천연 지르콘과 같은 재료로 해석하지 않습니다."
    ],
    "table": null
  },
  {
    "title": "색과 반짝임만으로 구별하지 마세요",
    "paragraphs": [
      "지르콘과 큐빅 지르코니아 모두 여러 색으로 보일 수 있으므로 파란색, 무색 같은 색 이름만으로 재료를 판단할 수 없습니다. 사진의 색, 반짝임, 투명도만으로도 재료나 처리 상태를 확정하기 어렵습니다.",
      "청색과 무색 지르콘에는 가열 처리가 흔합니다. 일부 처리석은 강한 빛에 오래 노출되거나 열을 받으면 색이 달라지거나 원래 색으로 돌아갈 수 있으므로 판매 표기와 처리 안내를 확인해야 합니다."
    ],
    "bullets": [
      "감별이 필요하면 감별 보고서의 재료 항목을 확인합니다.",
      "검출 가능한 처리 항목이 있는지 살펴봅니다.",
      "사진은 참고 자료로만 보고 실제 확인은 표기와 보고서를 기준으로 합니다."
    ],
    "table": null
  },
  {
    "title": "제품 설명과 보고서에서 확인할 항목",
    "paragraphs": [
      "선물 제품의 이름만 보고 판단하기보다 제품 설명에 적힌 재료명을 먼저 확인하세요. zircon, natural zircon, cubic zirconia, CZ처럼 재료를 직접 가리키는 표현을 살펴보면 됩니다.",
      "보유 보고서가 있다면 재료 식별과 검출 가능한 처리 항목을 제품 표기와 대조하세요. 문의할 때 제품 표기 사진과 보고서를 함께 준비하고, 반지처럼 자주 착용할 제품인지도 알려 주세요."
    ],
    "bullets": [
      "제품 표기의 보석 이름을 확인합니다.",
      "천연 또는 인공 여부가 따로 적혀 있는지 확인합니다.",
      "처리 안내와 보고서의 검출 가능한 처리 항목을 대조합니다.",
      "반지나 목걸이처럼 완성된 제품은 주변 보석과 세팅 상태의 관리 제한도 확인합니다."
    ],
    "table": null
  },
  {
    "title": "지르콘은 마찰과 초음파 세척을 피하세요",
    "paragraphs": [
      "지르콘의 모스 경도는 6에서 7.5 범위지만, 경도가 있다고 해서 모서리 마모나 강한 충격에 안전하다는 뜻은 아닙니다. 다른 보석이나 물체와 부딪히거나 마찰하지 않도록 주의하고, 보관할 때는 다른 보석과 따로 두는 편이 좋습니다.",
      "GIA는 지르콘 세척에 따뜻한 비눗물을 권하며 초음파 세척과 스팀 세척은 권하지 않습니다. 완성 제품은 주변 보석과 세팅 상태에 따라 추가 제한이 있을 수 있으므로 제품 전체의 관리 안내를 함께 확인하세요."
    ],
    "bullets": [
      "강한 충격과 마찰을 피하고 다른 보석과 분리해 보관합니다.",
      "제품 전체의 상태와 관리 안내를 확인한 뒤 세척합니다.",
      "지르콘에 초음파·스팀 세척기를 사용하지 않습니다."
    ],
    "table": null
  }
]
const cautions = [
  "보석 이름이 모호하면 구매 전 정확한 재료명과 처리 안내를 서면으로 확인하세요.",
  "지르콘의 일반 관리법도 함께 세팅된 보석이나 제품 상태에 따라 제한될 수 있습니다."
]
const relatedLinks = [
  {
    "to": "/guide/cubic-moissanite-diamond-difference",
    "label": "큐빅·모이사나이트·다이아 비교",
    "description": "다이아 대체석 선택이 궁금할 때"
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이",
    "description": "재료와 처리 의견이 담긴 문서 확인"
  },
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "탄생석 목걸이 선물",
    "description": "이름과 관리법을 알고 선물 고르기"
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '지르콘과 큐빅 지르코니아 차이'
const gmArticleLead = '지르콘과 큐빅 지르코니아는 같은 돌이 아닙니다. 지르콘은 자연에서 형성된 광물이고, 큐빅 지르코니아는 산화지르코늄을 바탕으로 만든 인공 재료입니다. 선물 제품을 확인할 때는 색이나 반짝임보다 제품 표기와 보고서의 재료 항목을 먼저 살펴보세요.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '지르콘 큐빅 지르코니아 차이'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '지르콘과 큐빅 지르코니아의 재료 및 관리 차이'
const gmHeroAlt = '밝은 천 위에 나란히 놓인 푸른 보석과 무색 보석, 검은 루페'
const gmHeroCaption = '이름이 비슷한 두 보석 재료를 설명하기 위한 생성 이미지입니다. 색과 사진만으로 재료를 판별할 수는 없습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '지르콘의 재료와 색, 큐빅 지르코니아의 개념, 지르콘의 처리와 관리 내용은 아래 GIA 공식 자료를 바탕으로 정리했습니다.'
const gmSources = [
  {
    "label": "GIA 지르콘 개요",
    "url": "https://www.gia.edu/zircon",
    "note": "지르콘의 광물명, 화학식 ZrSiO4, 색 범위, 경도와 큐빅 지르코니아와의 혼동을 설명하는 공식 자료입니다."
  },
  {
    "label": "GIA 모조 보석 재료 안내",
    "url": "https://www.gia.edu/gem-imitation",
    "note": "큐빅 지르코니아의 제조 재료와 인공 모조석 및 대체재의 개념을 설명하는 공식 자료입니다."
  },
  {
    "label": "GIA 지르콘 관리·세척 안내",
    "url": "https://www.gia.edu/zircon-care-cleaning",
    "note": "지르콘의 경도, 취성, 마찰과 충격 주의, 열처리와 세척 방법을 설명하는 공식 자료입니다."
  },
  {
    "label": "GIA 지르콘 구매 안내",
    "url": "https://www.gia.edu/zircon/buyers-guide",
    "note": "지르콘의 색과 처리, 별도 보관, 감별 보고서에서 확인할 항목과 관리법을 설명하는 공식 자료입니다."
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
