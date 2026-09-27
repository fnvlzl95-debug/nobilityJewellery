<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jade-ring-buying-guide'
const pageTitle = '옥반지 구매, 통옥·세팅형과 처리 확인 | 귀족'
const pageDescription = '옥반지는 옥 자체가 고리를 이루는 통옥형과 금속 반지에 옥을 올린 세팅형을 나누어 고르세요. 경옥·연옥의 구분, 경옥 A·B·C 처리 표기와 구매 전 확인할 사진을 정리했습니다. 원하는 형태와 자료를 보내 귀족에 상담할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jade-ring-buying-guide-hero-7b0a67e3.webp`
const publishedAt = '2026-09-27'
const updatedAt = ''
const faqItems = [
  {
    "question": "옥반지는 녹색만 있나요?",
    "answer": "아닙니다. 경옥에는 녹색 외에 라벤더색 등도 있습니다. 색 이름만으로 옥의 종류나 처리 상태를 판단하지 말고 제품 설명과 실제 후보를 함께 확인하세요."
  },
  {
    "question": "A급 옥반지는 품질이 모두 같은가요?",
    "answer": "경옥의 A 표기는 일반적으로 자연 상태 또는 왁스 광택만 더한 처리 구분을 뜻합니다. 색·투명감·표면 상태를 합친 종합 품질 순위가 아니므로 실제 후보를 따로 비교해야 합니다."
  },
  {
    "question": "통옥 반지도 금반지처럼 호수를 바꿀 수 있나요?",
    "answer": "통옥 반지를 금속 밴드와 같은 방식으로 조정할 수 있다고 가정하면 안 됩니다. 선택 가능한 호수와 구입 후 변경 가능 범위를 제품별로 먼저 확인하세요."
  },
  {
    "question": "옥반지를 살 때 어떤 사진을 요청하면 좋나요?",
    "answer": "실제 구매할 후보의 정면·측면·안쪽 사진을 요청해 보세요. 통옥형은 전체 둘레를, 세팅형은 옥과 금속의 연결 부분 및 완성 높이를 함께 확인하면 좋습니다."
  }
]
const quickAnswers = [
  "옥 자체가 손가락을 두르는 통옥형과 금속 밴드에 옥을 올린 세팅형은 착용과 주문 조건을 따로 살펴야 합니다.",
  "옥으로 불리는 대표 재료에는 경옥과 연옥이 있으며, 색이나 사진만으로 종류를 확정하기는 어렵습니다.",
  "경옥의 A·B·C 표기는 처리 구분을 뜻하므로, A라는 말만으로 모든 품질 조건이 정해지지는 않습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "통옥 반지와 금속 세팅형은 무엇이 다른가요?",
    "paragraphs": [
      "통옥형은 옥 자체가 고리를 이루고, 세팅형은 금속 반지에 옥 보석을 고정한 형태입니다. 손가락 전체에 옥의 색이 이어지는 모습을 원하는지, 윗면의 옥과 금속 테두리가 함께 보이는 모습을 원하는지부터 골라 보세요.",
      "통옥 반지를 일반 금반지와 같은 방식으로 줄이거나 늘릴 수 있다고 생각하지 마세요. 선택 가능한 호수와 착용 상태, 구입 후 크기 변경 가능 범위를 먼저 물어보는 것이 좋습니다. 세팅형 역시 옥과 금속 구조에 따라 가능한 작업이 달라지므로 형태만 보고 조정 여부를 확정하지 않습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "고를 형태",
        "마음에 드는 부분",
        "구매 전 확인할 질문"
      ],
      "rows": [
        [
          "통옥 가락지",
          "반지 전체에 이어지는 옥의 색과 윤곽",
          "내 손가락에 맞는 제품이 있고 실제 착용 확인이 가능한가요?"
        ],
        [
          "옥을 올린 세팅형",
          "윗면의 옥과 주변 금속의 조합",
          "옥의 높이와 금속 테두리가 옆에서 어떻게 보이나요?"
        ],
        [
          "선물용 옥반지",
          "받는 분이 선호하는 형태",
          "형태와 호수를 확인한 뒤 선택·변경 가능한 범위를 알 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "옥반지의 경옥과 연옥은 어떻게 확인하나요?",
    "paragraphs": [
      "제품 설명에서 경옥인지 연옥인지 먼저 확인하세요. GIA는 옥으로 불리는 대표적인 보석 재료로 경옥(jadeite)과 연옥(nephrite)을 안내합니다. 두 이름은 다른 재료를 가리키므로 “천연 옥”이라는 말만 듣고 어느 쪽인지 추정하기보다 구체적인 소재명을 물어보는 편이 좋습니다.",
      "경옥은 녹색 외에 라벤더색 등도 있습니다. 색이 진하다거나 맑게 보인다는 이유 하나로 종류나 처리 상태를 판단하지 마세요. 판매 설명과 감별 자료가 있다면 같은 제품을 설명하는지 함께 확인합니다.",
      "마음에 드는 색을 고르는 일과 소재를 확인하는 일은 나누어 진행하세요. 사진에는 좋아하는 부분의 색과 무늬를 표시하고, 상담에서는 그 후보의 재료와 처리 내용을 따로 질문하면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "경옥의 A·B·C 표기는 품질 등급인가요?",
    "paragraphs": [
      "경옥의 A·B·C는 처리 내용을 구분하는 유통 표현이며, 색·투명감·표면 상태를 합쳐 순위를 매긴 종합 품질 등급은 아닙니다. GIA의 설명에서 A는 자연 상태 또는 왁스 광택만 더한 경옥, B는 산으로 표백한 뒤 고분자 수지를 함침한 경옥, C는 염색된 재료를 가리킵니다.",
      "따라서 “A급”이라는 문구를 보았다면 이 처리 구분을 뜻하는지, 판매자가 다른 의미로 사용하는지 확인해야 합니다. A라는 말만으로 마음에 드는 색과 표면 상태까지 보장되는 것은 아닙니다. 처리 설명을 확인한 뒤 실제 후보의 모습을 보고 선택하세요."
    ],
    "bullets": [
      "소재명이 경옥으로 확인되는지",
      "A·B·C 또는 별도 처리 설명이 무엇을 뜻하는지",
      "감별 자료가 있다면 해당 반지의 옥과 연결되는 자료인지"
    ],
    "table": null
  },
  {
    "title": "옥반지는 실물과 관리 조건에서 무엇을 보나요?",
    "paragraphs": [
      "실제 구매할 후보의 정면·측면·안쪽 사진과 처리에 맞는 관리 안내를 확인하세요. 통옥형은 전체 둘레와 안쪽 면을, 세팅형은 옥의 윗면뿐 아니라 금속에 가려지는 부분과 완성 높이를 함께 보는 편이 좋습니다. 사진에서 선이나 얼룩이 보인다면 무늬인지 손상인지 짐작하지 말고 설명을 요청하세요.",
      "옥을 손상시킬 수 있는 긁기·가열 같은 자가 감별은 피하세요. GIA는 옥이 긁힐 수 있고 열의 영향을 받을 수 있으며, 염색·함침 등 처리에 따라 세척 시 고려할 점이 달라진다고 안내합니다. 처리 여부를 모른다면 초음파나 스팀 세척부터 시도하지 말고 해당 제품의 관리 방법을 확인해 주세요.",
      "세팅형은 옥 이외의 소재와 고정 방식도 함께 고려해야 합니다. 보석만의 관리 안내를 반지 전체에 그대로 적용하기보다, 금속·다른 장식·접착 부위 등을 포함한 완성품 기준으로 문의하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "옥반지 구매·제작 상담은 무엇을 보내면 되나요?",
    "paragraphs": [
      "통옥형인지 세팅형인지와 마음에 드는 색의 사진을 보내 주세요. 예를 들어 “녹색 옥을 금빛 테두리로 감싼 반지를 원합니다. 첨부 사진의 둥근 윗면이 마음에 들어요. 옥의 종류와 처리 내용을 확인할 수 있는지, 이런 형태로 구매 또는 제작 상담이 가능한지 궁금합니다”라고 요청할 수 있습니다.",
      "귀족 카카오톡에 형태·색 참고 사진·보유한 소재 및 처리 설명·착용할 손가락·예산·희망일을 알려 주세요. 옥반지의 취급 여부와 보석 준비, 가능한 제작 범위 및 일정은 상담에서 먼저 확인합니다. 기존 옥을 활용하고 싶다면 보석 사진과 현재 세팅 상태도 함께 보내 주세요.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 방문 전 원하는 형태를 사진으로 설명하고, 통옥 반지의 호수 선택이나 세팅형 제작 중 어떤 상담이 필요한지 알려 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "옥의 색이나 A 표기만으로 소재·처리·품질을 모두 확정하지 마세요. 해당 후보의 구체적인 설명을 확인하세요.",
  "통옥형과 세팅형의 크기 변경·제작 가능 범위는 각각 확인해야 합니다. 옥을 긁거나 가열해 진위를 시험하지 마세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "옥반지 취급·제작 가능 범위 문의",
    "description": "원하는 형태와 보유 자료를 보내 상담하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 보기",
    "description": "금속 세팅형 반지의 전체 형태를 참고하세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감별 자료 읽는 기준",
    "description": "자료가 확인하는 항목과 대상을 구분해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '옥반지 구매, 통옥·세팅형과 처리 확인'
const gmArticleLead = '옥반지를 고를 때는 통옥 가락지인지 금속에 옥을 올린 반지인지 먼저 정하고, 옥의 종류와 처리 상태를 확인하세요. 녹색이라는 이유만으로 같은 옥이라고 판단할 수는 없습니다. 특히 경옥의 A·B·C 표기는 색이나 품질의 순위보다 처리 내용을 구분하는 말로 읽어야 합니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '옥반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '옥반지 형태와 소재 확인'
const gmHeroAlt = '아이보리 배경 위 금빛 테두리에 녹색 돔형 옥을 올린 반지 예시'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이나 패션쇼 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '옥의 대표 재료와 경옥의 처리 표기, 관리 특성은 GIA 안내를 참고했습니다. 통옥·세팅형을 나누고 사진과 주문 조건을 정리하는 방법은 구매 상담을 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — Jade Buyer’s Guide",
    "url": "https://www.gia.edu/jade/buyers-guide",
    "note": "옥의 대표 재료와 경옥 처리 표기를 설명합니다."
  },
  {
    "label": "GIA — Jade Care and Cleaning Guide",
    "url": "https://www.gia.edu/articles/jade-care-cleaning",
    "note": "옥의 열·긁힘 영향과 처리별 관리 기준을 안내합니다."
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
