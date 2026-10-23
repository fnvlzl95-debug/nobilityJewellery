<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-jewelry-custom-budget-guide'
const pageTitle = 'AI 이미지 주문제작 비용, 예산 맞추는 법 | 귀족'
const pageDescription = 'AI로 만든 반지·목걸이 이미지, 주문제작 비용은 어떻게 정할까요? 꼭 유지할 디자인과 조정 가능한 장식을 나누고 원안·예산 조정안의 견적을 비교하는 방법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-jewelry-custom-budget-guide-hero-eea8014e.webp`
const publishedAt = '2026-10-23'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 이미지가 있으면 디자인 비용은 빠지나요?",
    "answer": "이미지로 디자인 방향을 전달할 수는 있지만, 실제 치수와 구조를 정하거나 제작에 맞게 수정하는 작업이 필요할 수 있습니다. 견적에 어떤 설계·수정 작업이 포함되는지 확인해 주세요."
  },
  {
    "question": "AI 이미지에서 작은 보석을 빼면 비용이 줄어드나요?",
    "answer": "보석과 세팅 작업이 달라질 수 있지만, 주변 금속 형태를 다시 설계하는 등 다른 작업이 필요할 수도 있습니다. 같은 기준에서 변경한 부분과 금액을 함께 비교해야 합니다."
  },
  {
    "question": "체인이 보이는 AI 목걸이 사진은 체인 포함 견적인가요?",
    "answer": "사진에 체인이 보여도 견적에 포함됐다고 단정할 수 없습니다. 펜던트만 제작하는지 체인까지 포함하는지 먼저 확인하고, 체인이 포함된다면 그 사양도 함께 상담하세요."
  },
  {
    "question": "AI 이미지를 조금 수정했는데 견적을 다시 확인해야 하나요?",
    "answer": "작은 화면상의 변화라도 실제 보석·금속·크기·작업 범위를 바꿀 수 있습니다. 수정한 부분을 알려 주고, 변경된 구성에도 기존 견적이 적용되는지 확인하는 편이 좋습니다."
  }
]
const quickAnswers = [
  "AI 이미지 한 장만으로 확정 금액을 알기는 어렵습니다. 처음 안내받은 견적이 어떤 소재·크기·보석을 가정한 것인지 확인하세요.",
  "예산을 조정할 때는 가장 마음에 드는 특징 하나를 먼저 정하세요. 중앙 보석과 외곽은 유지하고 주변 장식을 바꿀 수 있는지처럼 구체적으로 문의합니다.",
  "두 안의 금액을 비교할 때 바뀐 디자인과 포함 범위도 함께 보세요. 펜던트만의 견적과 체인이 포함된 목걸이 견적은 같은 조건이 아닙니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI로 만든 사진이 있는데 왜 바로 가격을 정하기 어렵나요?",
    "paragraphs": [
      "이미지는 원하는 인상을 보여 주지만, 가격을 계산할 실제 사양을 모두 담고 있지는 않습니다. 보라색 보석처럼 보인다고 보석의 종류와 품질이 정해지는 것은 아니며, 작은 반짝임이 보석인지 금속 표면의 빛 반사인지도 확인이 필요합니다. 화면을 확대해 크게 보이는 것과 실제 제작 크기도 구분해야 합니다.",
      "GIA의 반지 비용 안내는 중심 보석뿐 아니라 금속, 세팅과 세부 장식, 맞춤 설계 작업도 비용에 영향을 준다고 설명합니다. 따라서 AI 이미지로 문의할 때는 “이 사진이면 얼마인가요?”에 더해 “어떤 사양으로 계산한 금액인가요?”라고 물어보세요.",
      "초기 견적에서 보석과 크기가 아직 가정이라면 그 항목을 표시해 두는 편이 좋습니다. 이후 실제 보석을 고르거나 크기를 바꾸었을 때 무엇 때문에 금액이 달라졌는지 알 수 있습니다. 이미지의 구조와 상담 자료를 준비하는 방법은 아래 관련 글 ‘AI 생성 사진으로 주문제작 상담하기’에서 이어서 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "예산에 맞추려면 AI 이미지에서 무엇부터 골라야 하나요?",
    "paragraphs": [
      "이미지에서 포기하고 싶지 않은 특징을 한 문장으로 적어 보세요. “타원형 보라색 중심 장식과 매끄러운 금빛 테두리가 좋다”처럼 말하면, 위쪽 작은 보석이나 표면 무늬는 조정해도 되는지 구분하기 쉽습니다. 반대로 작은 보석의 반짝임이 핵심이라면 그 부분을 유지하는 방향으로 상담해야 합니다.",
      "다음 표는 같은 이미지에서 대안을 질문하는 예시입니다. 각 변경이 항상 비용을 낮추는 것은 아닙니다. 바뀌는 외관과 필요한 작업을 함께 확인한 뒤 실제 견적으로 비교해 주세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "이미지에서 본 요소",
        "유지하고 싶은 특징",
        "조정안으로 물어볼 내용"
      ],
      "rows": [
        [
          "중앙의 유색 보석",
          "색감과 타원형 인상",
          "보석 종류·크기 후보가 달라질 때 외관과 금액은 어떻게 달라지나요?"
        ],
        [
          "중앙 위쪽 작은 보석",
          "중심 장식이 돋보이는 구성",
          "작은 보석을 줄이거나 금속 장식으로 바꾸는 안도 비교할 수 있나요?"
        ],
        [
          "테두리와 표면 무늬",
          "전체 외곽과 금속 색감",
          "세밀한 무늬를 매끄러운 면으로 정리하면 어떤 작업이 달라지나요?"
        ],
        [
          "펜던트에 연결된 체인",
          "목걸이로 착용하는 목적",
          "체인 포함 안과 펜던트만의 안은 각각 무엇을 포함하나요?"
        ]
      ]
    }
  },
  {
    "title": "원안과 예산 조정안은 어떻게 비교하면 좋나요?",
    "paragraphs": [
      "먼저 원안은 이미지에서 요청한 특징을 최대한 유지하는 방향으로, 조정안은 바꿔도 되는 요소를 명시한 방향으로 상담해 보세요. 두 안 모두 실제 제작 가능한 사양으로 검토해야 하므로, 원안이라는 이름이 생성 사진의 모든 부분을 그대로 구현한다는 뜻은 아닙니다.",
      "예를 들어 원안은 타원형 중심 보석과 위쪽 작은 보석을 함께 두고, 조정안은 중심 보석을 유지하면서 위쪽 장식을 단순하게 하는 방식입니다. 이때 중심 보석의 사양, 펜던트 크기, 금속, 체인 포함 여부를 같은 기준으로 두고 비교할 수 있는지 물어보세요. 다른 조건도 함께 바뀌었다면 별도로 적어 두어야 금액 차이를 이해할 수 있습니다.",
      "금액이 낮아졌더라도 원하는 분위기까지 달라졌다면 만족스러운 선택이 아닐 수 있습니다. “작은 보석은 없어져도 좋지만 타원형 중심과 매끄러운 테두리는 유지하고 싶다”처럼 결과를 판단할 기준을 남겨 두세요. 원하는 사양과 예산이 맞지 않으면 여러 요소를 한꺼번에 바꾸기보다, 어느 조건을 다시 검토할지 상담하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "장식을 줄이는 것과 필요한 구조를 빼는 것은 어떻게 다른가요?",
    "paragraphs": [
      "예산을 줄이려고 보이지 않는 부분을 단순히 얇게 하거나 보석을 잡는 부분을 없애 달라고 요청하기보다는, 그 부분이 어떤 역할을 하는지 먼저 확인하세요. 겉으로 장식처럼 보이는 요소가 보석 고정이나 연결을 위한 구조일 수도 있습니다. 필요한 구조를 유지하면서 바꿀 수 있는 장식을 찾는 것이 상담의 출발점입니다.",
      "GIA의 CAD/CAM 교육도 제작 모델을 다룰 때 비용뿐 아니라 크기·비례·제조 방식의 제약을 함께 고려합니다. AI 이미지에서 선 하나를 지우는 수정과 실제 금속 제품의 구조를 바꾸는 작업은 구분해서 생각해야 합니다.",
      "이미지를 수정한 뒤 견적이 바뀌었다면 “어느 부분의 소재나 작업이 달라졌나요?”라고 물어보세요. 변경한 이미지를 보내며 기존 견적이 그대로 적용된다고 생각하기보다, 최종 선택한 모습과 사양에 해당하는 금액인지 확인하는 편이 좋습니다. 이미지가 있다는 이유만으로 설계나 수정 작업이 모두 생략되는 것도 아닙니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 AI 이미지와 예산을 어떻게 보내면 되나요?",
    "paragraphs": [
      "AI로 만든 이미지에 표시를 많이 할 필요는 없습니다. 만들 품목, 예산 범위, 가장 유지하고 싶은 특징, 바꿔도 되는 부분을 짧게 적어 주세요. 목걸이라면 체인이 필요한지도 함께 알려 주시면 상담할 범위를 정리하기 좋습니다.",
      "문의 예시: “AI로 만든 이 펜던트를 주문제작하고 싶습니다. 예산은 ○○원 안팎이며 체인까지 포함하고 싶어요. 타원형 보라색 중심 장식과 매끄러운 테두리는 살리고, 위쪽 작은 보석은 조정해도 괜찮습니다. 이 방향으로 가능한 구성과 견적을 상담받고 싶습니다.” 보석 종류나 실제 크기를 모르겠다면 아직 정하지 않았다고 적어도 됩니다.",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 AI 이미지와 희망일을 함께 보내 주세요. 마음에 드는 디자인을 실제로 제작할 수 있는 범위와 예산에 맞춰 상담합니다. 소재·사양·포함 품목을 정한 뒤 해당 구성의 견적과 일정을 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "표와 문의 문장은 예산 상담을 돕는 예시입니다. 장식을 바꾸거나 줄여도 비용이 반드시 낮아지는 것은 아니며 실제 사양과 작업에 따라 달라집니다.",
  "AI 생성 이미지는 실제 판매 제품이나 제작 도면이 아닙니다. 이미지와 동일한 구현 여부, 보석 수급, 제작 가능한 구조와 일정은 상담에서 확인해 주세요."
]
const relatedLinks = [
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 생성 사진으로 주문제작 상담하기",
    "description": "이미지에서 확인할 구조와 상담 자료 준비를 알아보세요."
  },
  {
    "to": "/guide/ai-jewelry-design-prompt-guide",
    "label": "AI 주얼리 이미지 프롬프트 예시",
    "description": "원하는 형태를 이미지로 만들고 싶을 때 참고하세요."
  },
  {
    "to": "/custom",
    "label": "AI 이미지와 예산으로 주문제작 문의",
    "description": "유지할 특징과 조정 가능한 장식을 함께 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 살펴보기",
    "description": "실제 디자인의 외곽과 장식 구성을 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 이미지 주문제작 비용, 예산 맞추는 법'
const gmArticleLead = 'AI 주얼리 주문제작 비용은 생성한 사진의 완성도보다 실제 보석·금속·크기·제작 구조와 작업 범위에 따라 달라집니다. 마음에 드는 이미지가 있다면 예산과 함께 “꼭 살릴 특징”을 먼저 알려 주세요. 이미지에 가까운 안과 일부 장식을 조정한 안을 상담하면, 어떤 모습과 비용을 함께 선택하는지 판단하기 좋습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 주얼리 주문제작 비용'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 이미지 주얼리 예산과 디자인 조정 상담'
const gmHeroAlt = '타원형 보라색 중심 보석과 위쪽 작은 보석을 둔 금빛 펜던트의 AI 디자인 예시'
const gmHeroCaption = '유지할 중심 장식과 조정할 세부 장식을 설명하기 위한 AI 생성 이미지입니다. 실제 판매 제품·제작 사례·확정 견적을 나타내지 않습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '비용 요소와 제작 설계 조건은 GIA 자료를 참고했습니다. AI 이미지의 원안·조정안 비교표와 문의 문장은 이를 바탕으로 구성한 상담 예시이며 실제 견적이나 비용 절감 보장이 아닙니다.'
const gmSources = [
  {
    "label": "GIA — 반지 비용에 영향을 주는 요소",
    "url": "https://4cs.gia.edu/en-us/blog/how-much-should-engagement-ring-cost/",
    "note": "소재·보석·세팅·세부 장식과 맞춤 설계가 비용에 영향을 준다는 설명을 참고했습니다."
  },
  {
    "label": "GIA — 제작 설계에서 고려하는 조건",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-cad-cam",
    "note": "크기·비례·비용·제조 방식 등 제작 설계의 고려 조건을 참고했습니다."
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
