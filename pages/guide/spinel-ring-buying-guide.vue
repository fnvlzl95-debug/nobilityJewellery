<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/spinel-ring-buying-guide'
const pageTitle = '스피넬 반지 구매, 루비와 다른 점 | 귀족'
const pageDescription = '스피넬은 루비와 다른 광물이며 빨강 외에도 다양한 색이 있습니다. 스피넬 반지를 구매할 때 색 이름·천연 여부·AAA 표기를 어떻게 읽는지 정리했습니다. 원하는 색과 반지 사진을 보내 귀족에 제작 가능 범위를 문의하세요.'
const ogImage = `${siteConfig.url}/Image/guide/spinel-ring-buying-guide-hero-7b8c2650.webp`
const publishedAt = '2026-09-26'
const updatedAt = ''
const faqItems = [
  {
    "question": "천연 스피넬은 가짜 루비인가요?",
    "answer": "천연 스피넬은 루비와 다른 광물입니다. 비슷한 빨간색 때문에 혼동될 수 있지만 스피넬 자체를 가짜 루비로 볼 수는 없습니다. 제품의 정확한 보석 이름을 확인하세요."
  },
  {
    "question": "스피넬 반지는 빨간색만 있나요?",
    "answer": "아닙니다. 스피넬은 핑크·보라·파랑·검정 등 다양한 색이 있습니다. 원하는 색의 사진과 실제 보석 설명을 함께 보고 선택하세요."
  },
  {
    "question": "AAA 스피넬은 공인된 품질 등급인가요?",
    "answer": "스피넬에는 보편적으로 통일된 AAA 품질 등급이 없습니다. 판매자가 자체적으로 사용하는 기준일 수 있으므로 평가 항목과 실제 후보의 상태를 확인해야 합니다."
  },
  {
    "question": "스피넬 감별 보고서가 있으면 품질 등급도 알 수 있나요?",
    "answer": "보고서의 종류와 기재 항목을 확인해야 합니다. GIA는 스피넬에 품질 등급을 매기지 않으며, 감별 보고서에서 천연·랩그로운 여부와 검출 가능한 처리 등을 평가한다고 안내합니다."
  }
]
const quickAnswers = [
  "스피넬은 루비와 별개의 광물이며 빨강·핑크·보라·파랑 등 다양한 색이 있습니다.",
  "AAA 스피넬은 보편적으로 통일된 품질 등급이 아니므로 판매자가 어떤 기준으로 붙였는지 확인하세요.",
  "천연 여부는 색이나 반짝임으로 판단하지 말고 해당 보석의 설명과 감별 자료로 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "스피넬은 루비와 같은 보석인가요?",
    "paragraphs": [
      "스피넬과 루비는 다른 광물입니다. GIA는 두 보석이 과거에 혼동되었지만 별개의 광물로 확인되었다고 설명합니다. 천연 스피넬 자체를 “가짜 루비”라고 부르는 것은 정확하지 않습니다. 구매할 때는 루비를 원하는지 스피넬을 원하는지 보석 이름을 먼저 분명하게 전달하세요.",
      "스피넬 반지는 빨간색만 있는 것이 아닙니다. GIA 자료에는 핑크·보라·파랑·검정 등도 소개됩니다. “스피넬 느낌으로”라는 요청보다 마음에 드는 색의 참고 사진을 보내는 편이 후보를 좁히기 좋습니다. 색이 비슷하다고 같은 광물이나 같은 품질이라고 판단하지는 마세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "AAA 스피넬이면 좋은 등급이 보장되나요?",
    "paragraphs": [
      "AAA라는 표기만으로 서로 다른 판매자의 스피넬 품질을 같은 기준에서 비교할 수는 없습니다. GIA는 스피넬에 통일된 품질 등급 척도가 없으며, 개별 업체가 자체 품질 설명을 사용할 수 있다고 안내합니다. AAA를 보았다면 색·내포물·연마 중 무엇을 기준으로 붙인 표기인지 물어보세요.",
      "또한 GIA의 스피넬 감별 보고서는 다이아몬드처럼 하나의 품질 등급을 매겨 주는 문서가 아닙니다. GIA는 천연·랩그로운 여부와 검출 가능한 처리 등을 평가한다고 설명합니다. “보고서가 있다”는 말과 “품질이 우수하다”라는 말을 구분해 읽어야 합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "제품 설명의 표현",
        "먼저 확인할 내용",
        "그 말만으로 확정할 수 없는 것"
      ],
      "rows": [
        [
          "핑크·블루·블랙 스피넬",
          "보석 종류와 실제 후보의 색",
          "천연 여부와 품질"
        ],
        [
          "천연 스피넬",
          "해당 보석에 연결되는 판매 설명·감별 자료",
          "처리 여부와 모든 품질 조건"
        ],
        [
          "AAA 스피넬",
          "판매자가 사용하는 평가 기준",
          "다른 업체 AAA와 동등한 품질"
        ],
        [
          "감별 보고서 첨부",
          "보고서의 대상과 실제 기재 내용",
          "모든 품질 항목에 대한 평가"
        ]
      ]
    }
  },
  {
    "title": "원하는 색의 스피넬 반지는 어떻게 고르나요?",
    "paragraphs": [
      "먼저 원하는 색을 고른 뒤 그 색의 실제 후보와 반지 디자인을 연결해 보세요. 스피넬이라는 이름 하나로 검색하면 서로 다른 색의 제품이 함께 나옵니다. 핑크 계열을 원하는지, 보랏빛이 도는 색을 원하는지처럼 선호를 좁혀 보내면 상담을 시작하기 좋습니다.",
      "참고 사진이 색을 설명하기 위한 예시인지, 실제로 구매할 보석의 사진인지도 구분해 두세요. 마음에 든 후보가 있다면 그 보석의 사진과 설명을 함께 보관하고, 이후 보석이 바뀔 경우 같은 색 이름만으로 동일한 모습이라고 생각하지 마세요.",
      "맞춤 반지에서는 보석과 반지 틀을 함께 확정해야 합니다. GIA는 좋은 스피넬 원석이 원석을 살리는 비규격 크기로 연마되는 경우도 있다고 설명합니다. 원하는 디자인의 틀에 맞는지 확인하고, 특정 보석을 우선할지 반지의 전체 모양을 우선할지 알려 주세요. 정해진 틀에 모든 스피넬을 그대로 넣을 수 있다고 가정하지 않는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 스피넬 반지 상담은 무엇부터 보내나요?",
    "paragraphs": [
      "원하는 색의 사진과 보석·디자인 중 우선할 조건을 보내 주세요. 예를 들어 “보랏빛이 도는 핑크 스피넬로 반지를 원합니다. 천연 스피넬을 희망하고, 첨부한 타원형 디자인을 참고하고 싶어요. 가능한 보석 후보와 확인할 수 있는 자료부터 상담받고 싶습니다”라고 요청할 수 있습니다.",
      "귀족 카카오톡에 색 참고 사진·희망 보석 구분·반지 디자인·착용할 손가락·예산·희망일을 알려 주세요. 보석 준비 가능 여부, 확인 자료와 제작 범위, 견적·일정은 상담에서 확인합니다. 원하는 스피넬을 보유하거나 즉시 제작할 수 있다는 뜻은 아닙니다.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 방문 전 사진으로 원하는 색과 디자인을 먼저 전달하면 어떤 조건을 상담할지 정리하기 좋습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "스피넬의 색 이름이나 AAA 표기만으로 천연·합성 여부와 처리 상태를 판단하지 마세요.",
  "참고 사진과 실제 구매할 보석을 구분하고, 보고서가 있다면 어떤 보석과 어떤 항목을 설명하는지 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "스피넬 반지 제작 가능 범위 문의",
    "description": "원하는 색과 디자인을 보내 상담을 시작하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 보기",
    "description": "보석과 함께 고려할 반지의 형태를 찾아보세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "감정서와 감별서 구분하기",
    "description": "보석 보고서가 설명하는 항목을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '스피넬 반지 구매, 루비와 다른 점'
const gmArticleLead = '스피넬은 루비와 다른 광물입니다. 빨간 스피넬이 루비처럼 보여도 같은 보석은 아니며, 스피넬이라는 이름이나 AAA 표기만으로 천연 여부와 품질을 확정할 수 없습니다. 스피넬 반지를 고를 때는 원하는 색, 천연·합성 구분, 판매자가 설명하는 품질 기준을 나누어 확인하세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '스피넬 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '스피넬 반지 보석과 디자인 선택'
const gmHeroAlt = '상아색 바탕 위 금빛 반지에 핑크빛 보라색 타원형 패싯 보석이 세팅된 모습'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '스피넬의 종류·색과 품질 표기, 감별 보고서에 관한 내용은 GIA 자료를 참고했습니다. 후보 사진과 주문 우선순위를 정리하는 방법은 구매 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — Spinel",
    "url": "https://www.gia.edu/spinel",
    "note": "루비와 구분되는 스피넬의 특성과 색을 소개합니다."
  },
  {
    "label": "GIA — Spinel Buyer’s Guide",
    "url": "https://www.gia.edu/spinel/buyers-guide",
    "note": "스피넬의 품질 표기와 감별 보고서, 연마 크기에 관한 안내입니다."
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
