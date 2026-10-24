<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-jewelry-gemstone-color-selection'
const pageTitle = 'AI 보석 색감, 주문제작 전 실물 고르기 | 귀족'
const pageDescription = 'AI 보석 색감이 마음에 들었다면 실제 주문제작에는 어떻게 반영할까요? 색상·밝기·선명도의 선호를 정리하고 실제 후보 보석을 비교하는 방법, 종로 귀족에 보낼 문의 예시를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-jewelry-gemstone-color-selection-hero-a7acb078.webp`
const publishedAt = '2026-10-24'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 이미지에서 뽑은 색상 코드로 보석을 주문할 수 있나요?",
    "answer": "원하는 색의 방향을 전달하는 참고 자료로 사용할 수 있습니다. 다만 한 색상 코드가 보석 전체의 색과 반짝임을 정하지는 못하므로, 실제 후보에서 좋아하는 색기와 밝기를 비교해 주세요."
  },
  {
    "question": "보석 이름을 몰라도 AI 이미지 색감으로 상담할 수 있나요?",
    "answer": "만들 품목과 좋아하는 색 특징부터 설명할 수 있습니다. 이름은 미정이라고 적고, 파랑과 초록 중 어느 쪽을 선호하는지, 밝거나 차분한 느낌 중 무엇이 좋은지 알려 주세요."
  },
  {
    "question": "후보 사진의 색이 마음에 들면 그 보석으로 확정된 건가요?",
    "answer": "사진이 실제 선택 가능한 특정 보석인지 색감 예시인지 먼저 확인해야 합니다. 선택할 후보의 모습과 사양, 수급 및 제작 가능 여부를 확인한 뒤 주문 구성을 정하세요."
  },
  {
    "question": "AI가 추천한 보석명이 실제 색과 성질을 보증하나요?",
    "answer": "AI의 이름 제안만으로 실제 보석의 종류·천연 여부·처리·성질이 확인되지는 않습니다. 제안은 상담 참고로 전달하고, 사용할 보석에 관한 설명과 확인 자료를 따로 살펴보세요."
  }
]
const quickAnswers = [
  "AI 이미지에서 마음에 드는 색 부분과 전체 디자인을 함께 보내세요. 가장 밝게 반짝이는 한 점만 지정하면 보석 전체의 색 취향을 전달하기 어렵습니다.",
  "“이 청록색 그대로” 대신 “초록기가 조금 섞인 파랑, 너무 어둡지 않은 느낌”처럼 선호와 피하고 싶은 인상을 함께 적어 보세요.",
  "후보 사진이 실제 선택할 보석을 찍은 것인지 먼저 확인하세요. 후보끼리 비슷한 조명·배경·방향에서 비교하고, 보석명과 처리 정보는 색 취향과 별도로 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI 이미지의 색을 그대로 보석 이름으로 정해도 되나요?",
    "paragraphs": [
      "색은 선호를 설명하는 자료로 사용하고, 보석 이름은 실제 후보를 확인하며 정하세요. AI가 만든 이미지에는 검사할 실물 보석이 없습니다. 생성할 때 특정 보석 이름을 입력했거나 AI가 이미지에 이름을 붙였더라도, 그 이름이 실제로 사용할 보석의 종류나 성질을 확인해 주는 것은 아닙니다.",
      "“이 보석이 무엇인가요?”보다 “이 이미지의 어떤 색감이 좋은가요?”부터 이야기하면 상담 방향을 잡기 좋습니다. 예를 들어 파랑이 마음에 드는지, 약간 섞인 초록기가 좋은지, 밝고 맑은 느낌이 중요한지를 나누어 보세요. 보석명을 아직 모르더라도 이런 설명으로 원하는 인상을 전달할 수 있습니다.",
      "GIA는 실제 유색보석을 검사할 때 색 관찰과 보석의 정체·처리 등을 확인하는 검사를 구분합니다. 따라서 생성 이미지의 색만 보고 천연 여부나 처리 상태를 추정하지 마세요. 실제 후보에 관한 설명과 확인 자료를 따로 살펴보는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "원하는 보석 색감을 어떤 말로 설명하면 좋나요?",
    "paragraphs": [
      "색 이름에 밝기와 선명도를 더하고, 받아들일 수 있는 차이도 함께 적어 보세요. GIA는 색을 색상, 밝고 어두운 정도, 색의 강도로 나누어 설명합니다. 이 구분을 취향 전달에 활용하면 “민트색”, “바다색”처럼 사람마다 다르게 떠올리는 표현을 조금 더 구체화할 수 있습니다.",
      "아래는 청록색 보석이 있는 AI 반지 이미지를 보고 상담하는 예시입니다. 품질을 매기는 등급표가 아니라, 자신이 원하는 모습과 조정 가능한 범위를 정리하는 표입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "이미지에서 고를 특징",
        "상담할 때 쓸 표현 예시",
        "함께 알려 줄 허용 범위"
      ],
      "rows": [
        [
          "색의 방향",
          "파랑에 초록기가 조금 섞인 느낌이 좋아요",
          "초록이 더 강한 후보도 볼지, 파랑 위주로 볼지"
        ],
        [
          "밝고 어두운 정도",
          "평소 실내에서도 너무 어두운 인상은 피하고 싶어요",
          "사진보다 조금 밝거나 어두워도 괜찮은지"
        ],
        [
          "선명하거나 차분한 느낌",
          "강렬한 색보다 차분한 청록색이 좋아요",
          "회색기가 느껴지는 색도 괜찮은지"
        ],
        [
          "반짝임과 표면 인상",
          "매끈한 돔보다 여러 면이 반짝이는 모습이 좋아요",
          "색과 반짝임 중 무엇을 먼저 맞추고 싶은지"
        ],
        [
          "전체 모양과 비율",
          "타원형 중심 장식이 마음에 들어요",
          "길쭉한 비율이나 실제 크기는 바꿔도 되는지"
        ]
      ]
    }
  },
  {
    "title": "색 참고 이미지는 어떻게 보내야 오해가 적나요?",
    "paragraphs": [
      "전체 이미지 한 장에 마음에 드는 색 부위를 표시해 보내는 방법을 권합니다. 색이 잘 보이는 부분을 잘라 첨부하더라도 원본 전체를 함께 두세요. 아주 밝은 반사광이나 어두운 모서리만 잘라 보내면, 전체 보석에서 어떤 느낌을 원하는지 알기 어려울 수 있습니다.",
      "표시한 부분 옆에 “이쪽의 파랑과 초록이 섞인 느낌이 좋다”처럼 이유를 한 문장으로 적어 보세요. 밝게 반짝이는 장면이 좋은 것인지, 반짝임이 약할 때도 남아 있는 색이 좋은 것인지 구분하면 실제 후보를 볼 때 기준이 생깁니다.",
      "이미지에서 색상 코드 하나를 추출했더라도 참고용으로 사용하세요. 한 픽셀의 색은 보석 전체의 입체적인 색과 반짝임을 대신하지 못합니다. 원하는 보석이 모든 방향과 조명에서 그 코드와 같아야 한다는 조건보다는, 색의 방향과 피하고 싶은 인상을 설명하는 편이 상담에 유용합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "실제 보석 후보 사진을 받으면 무엇을 비교하나요?",
    "paragraphs": [
      "우선 사진이 현재 선택할 수 있는 특정 보석의 모습인지, 색감을 설명하기 위한 예시인지 확인하세요. 예시 사진을 보고 마음에 들어도 그 사진 속 보석을 주문하는 것인지가 정해진 것은 아닙니다. 실제 후보라면 사진과 보석명·치수 등 안내받은 사양이 어느 후보에 해당하는지 함께 확인합니다.",
      "후보 A와 B는 가능하면 비슷한 조명·배경·방향에서 비교해 보세요. GIA도 색을 관찰할 때 통제된 조명 아래 실물을 비교합니다. 상담에서는 가장 화려하게 나온 장면 하나에만 맞추기보다, 평소 착용 환경에 가까운 모습도 확인할 수 있는지 물어보는 편이 좋습니다. 사진으로 차이를 판단하기 어렵다면 실물을 확인할 수 있는지도 상담하세요.",
      "비교 결과는 “A는 더 파랗지만 어둡게 느껴지고, B는 조금 더 초록빛이지만 밝은 느낌이 좋다”처럼 적어 보세요. 이때 색이 가까운 쪽을 고를지, 밝은 인상을 우선할지 선택하면 다음 후보를 검토할 기준이 분명해집니다. 사진 속 분위기와 실물이 완전히 같다는 전제로 결정하지는 마세요.",
      "비슷한 색의 후보라도 보석 종류와 천연·합성 여부, 처리 상태는 별도 항목입니다. 자주 착용할 반지인지 목걸이인지도 함께 알려 주세요. 종류별 내구성과 보고서의 의미는 아래 관련 가이드에서 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 색감 중심 주문제작을 어떻게 문의하나요?",
    "paragraphs": [
      "AI 이미지, 만들 품목, 좋아하는 색 특징과 피하고 싶은 인상을 보내 주세요. 보석의 이름을 먼저 확정하기 어려우면 미정이라고 적고, 색·모양·크기 중 어디를 우선하고 어디를 조정할 수 있는지 알려 주시면 됩니다.",
      "문의 예시: “AI로 만든 이 반지의 청록색 중심 장식이 마음에 듭니다. 초록기가 조금 있는 파랑을 원하고, 실내에서 너무 어두워 보이는 느낌은 피하고 싶어요. 타원형은 유지하되 크기는 상담 후 정해도 괜찮습니다. 예산은 ○○원 안팎이며 평소 착용할 반지로 가능한 보석 구성을 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 이미지와 희망일을 함께 전달해 주세요. 상담 후 선택한 보석은 이미지에서 원했던 색감과 구분해, 실제 후보의 모습과 안내받은 사양을 기준으로 확인합니다. 사용 가능한 보석과 디자인 구성이 정해지면 해당 구성의 견적·일정도 함께 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "본문의 색 설명과 표는 취향을 전달하는 예시이며 보석 등급이나 특정 색의 수급을 보증하지 않습니다.",
  "AI 이미지와 후보 사진의 색은 실물과 다르게 보일 수 있습니다. 최종 결정 전 실제 선택할 보석과 확인 자료, 제작 사양을 함께 살펴보세요."
]
const relatedLinks = [
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 이미지 주문제작 상담 준비",
    "description": "색 외에 실제 제작 전에 확인할 디자인 요소를 살펴보세요."
  },
  {
    "to": "/guide/ai-jewelry-custom-budget-guide",
    "label": "AI 디자인의 예산 조정 방법",
    "description": "원하는 특징을 유지하며 견적 대안을 비교해 보세요."
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석의 내구성 확인",
    "description": "색을 고른 다음 착용 환경에 맞는지 확인하세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 읽는 법",
    "description": "실제 보석의 확인 자료가 설명하는 범위를 알아보세요."
  },
  {
    "to": "/custom",
    "label": "AI 이미지 색감으로 주문제작 문의",
    "description": "원하는 색과 조정 가능한 범위를 함께 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "보석과 금속의 디자인 조합을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 보석 색감, 주문제작 전 실물 고르기'
const gmArticleLead = 'AI 보석 색감이 마음에 들었다면, 생성 이미지를 원하는 분위기를 전달하는 자료로 활용하세요. 사진 속 청록색이나 분홍색을 그대로 재현한다고 정하기보다, 어떤 색기와 밝기를 좋아하는지 설명한 뒤 실제 보석 후보를 비교하는 방법입니다. 최종 선택은 생성 이미지의 색 이름만이 아니라 사용할 보석의 모습과 확인된 사양을 기준으로 합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 보석 색감'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 이미지 색감을 참고한 보석 주문제작 상담'
const gmHeroAlt = '청록색 타원형 보석 하나를 네 개의 발로 고정한 금빛 반지의 AI 디자인 예시'
const gmHeroCaption = '원하는 보석 색감을 설명하기 위한 AI 생성 이미지입니다. 실제 보석 샘플·판매 제품·완성된 주문제작 사례가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '보석 색의 기본 요소와 실물 확인 원칙은 GIA 자료를 참고했습니다. AI 이미지의 색 취향을 전달하는 표와 문의 문장은 상담을 돕기 위해 작성한 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 유색보석의 색상·명도·채도",
    "url": "https://www.gia.edu/gia-news-research/value-factors-design-cut-quality-colored-gemstone-value-factors",
    "note": "색상·밝기·색의 강도를 구분하는 설명을 참고했습니다."
  },
  {
    "label": "GIA — 실물 보석의 색 관찰과 감별",
    "url": "https://www.gia.edu/gia-news-research/guide-how-gia-analyzes-colored-stones",
    "note": "통제된 조명에서 색을 관찰하고 보석의 정체·처리 등을 별도 검사하는 설명을 참고했습니다."
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
