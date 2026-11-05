<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/bold-dome-ring-width-height-selection'
const pageTitle = '볼드 돔 반지, 폭과 높이 고르는 법 | 귀족'
const pageDescription = '볼드 돔 반지는 상단 폭, 둥글게 솟은 높이와 손바닥 쪽 밴드를 나누어 비교하세요. 정면·옆면 사진으로 원하는 볼륨을 정하고, 호수와 안쪽 구조를 확인하는 종로 귀족 구매·주문 가이드입니다.'
const ogImage = `${siteConfig.url}/Image/guide/bold-dome-ring-width-height-selection-hero-7876a09b.webp`
const publishedAt = '2026-11-05'
const updatedAt = ''
const faqItems = [
  {
    "question": "볼드 돔 반지는 몇 mm부터 볼드라고 하나요?",
    "answer": "볼드라는 이름만으로 일정한 폭을 정하기 어렵습니다. 제품별 상단 최대 폭과 높이, 손바닥 쪽 밴드 폭을 확인하고 착용할 손가락 위에서 원하는 넓이감인지 비교하세요."
  },
  {
    "question": "돔 높이와 반지 두께는 같은 수치인가요?",
    "answer": "서로 다른 부위를 가리킬 수 있습니다. 윗면의 솟은 높이인지, 아래쪽 밴드의 두께인지 사진에 표시해 질문하고 측정 시작점과 끝점을 함께 확인하세요."
  },
  {
    "question": "돔 반지는 겉이 커 보이면 무거운가요?",
    "answer": "외관만으로 무게를 확정하기 어렵습니다. 소재와 내부 구성, 각 부위의 두께에 맞는 완제품 중량을 확인하세요. 주문제작이라면 예상 중량을 어떤 사양으로 안내하는지도 물어보면 좋습니다."
  },
  {
    "question": "볼드 돔 반지를 평소 반지와 같은 호수로 주문해도 되나요?",
    "answer": "평소 호수와 함께 기존 반지의 폭을 알려 주고, 새 돔 반지의 밴드와 안쪽 형태로 다시 확인하는 것이 좋습니다. 관절을 통과할 때와 착용 위치에서의 조임을 함께 살펴보세요."
  }
]
const quickAnswers = [
  "넓게 보이는 반지를 원하면 상단 폭을, 동그랗게 솟은 입체감을 원하면 옆면 높이를 먼저 비교하세요. 정면과 측면 사진을 한 쌍으로 보는 것이 좋습니다.",
  "윗부분만 넓고 아래로 좁아지는 형태인지, 손바닥 쪽까지 넓은 밴드인지 확인하세요. 상단의 최대 폭 하나로 손가락을 감싸는 부분까지 알 수는 없습니다.",
  "낄 손가락을 정하고 실제 밴드 형태에 맞춰 호수를 확인하세요. 완제품 중량과 내부 구조는 별도 사양으로 물어보면 됩니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "볼드 돔 반지는 어떤 모양을 말하나요?",
    "paragraphs": [
      "돔 반지는 위쪽 금속 표면이 둥근 지붕처럼 솟은 모양을 가리킵니다. 이 글에서는 보석 없이 금속의 곡면이 중심이 되는 디자인을 다룹니다. 볼드라는 표현은 넓이감과 존재감을 설명할 때 쓰이므로, 제품마다 상단 폭과 높이 수치를 함께 확인해 보세요.",
      "완만하게 부푼 낮은 곡면, 중앙이 도톰하게 올라온 곡면, 옆으로 길게 이어지는 곡면 중 어떤 모습이 좋은지 골라 보세요. 정면의 윤곽이 길쭉한지 둥근지도 함께 표시하면 원하는 형태를 설명하기 쉽습니다. 마음에 드는 사진에서 가장 넓은 부분과 가장 높아 보이는 부분을 각각 짚어 두세요.",
      "제조사 Mejuri의 특정 Dôme Ring 제품 설명은 상단 폭 11mm, 높이 5mm, 밴드 폭 3.5mm를 따로 표시합니다. 이 수치는 서로 다른 부위의 치수를 구분하는 상품 사례입니다. 자신의 반지에서는 원하는 볼륨과 손가락에 맞춰 각 부위의 값을 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "돔 반지의 폭과 높이는 어떻게 비교하나요?",
    "paragraphs": [
      "정면 사진에서는 손가락 위를 덮는 넓이를, 옆면 사진에서는 곡면이 올라오는 정도를 보세요. 마음에 드는 후보 두 개의 상단 폭이 비슷하다면 옆 사진을 나란히 놓고 중앙의 솟음과 양옆으로 내려오는 곡선을 비교합니다. 낮고 넓은 느낌과 둥글게 솟은 느낌 중 선호하는 쪽을 정할 수 있습니다.",
      "“두께가 몇 mm인가요?”라는 질문에는 판매처가 서로 다른 부위를 답할 수 있습니다. 돔의 높이를 묻는지, 아래쪽 밴드의 두께를 묻는지 사진에 표시해 주세요. 높이도 어느 지점부터 어느 지점까지 측정했는지 확인하면 후보끼리 비교하기 좋습니다. 아래 표는 정면·옆면·안쪽 사진에서 확인할 항목입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인 항목",
        "살펴볼 위치",
        "상담할 질문"
      ],
      "rows": [
        [
          "상단 최대 폭",
          "정면에서 가장 넓은 부분",
          "손가락 위를 덮는 폭은 어느 구간에서 잰 값인가요?"
        ],
        [
          "돔 높이",
          "옆면에서 가장 솟은 부분",
          "높이의 측정 시작점과 끝점을 알려 주세요."
        ],
        [
          "어깨의 곡선",
          "넓은 윗부분이 양옆으로 내려오는 곳",
          "위쪽 볼륨이 어느 지점부터 좁아지나요?"
        ],
        [
          "손바닥 쪽 밴드",
          "반지 아래쪽 고리",
          "이 부분의 폭과 두께를 각각 알 수 있나요?"
        ],
        [
          "손가락에 닿는 안쪽",
          "윗면 아래 공간과 밴드 안쪽",
          "안쪽 사진과 완제품 중량도 함께 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "손바닥 쪽 밴드와 안쪽은 왜 따로 보나요?",
    "paragraphs": [
      "상단이 넓어도 손바닥 쪽으로 갈수록 가늘어지는 돔 반지가 있고, 넓은 밴드가 둘레를 따라 이어지는 형태도 있습니다. 앞에서 볼 때 비슷한 존재감이 있어도 실제로 손가락을 감싸는 부분은 달라질 수 있습니다. 정면 사진 다음에는 반지를 돌려 아래쪽 밴드가 보이는 사진을 요청해 보세요.",
      "안쪽에서는 손가락에 닿는 면의 곡선과 가장자리, 윗부분 아래에 드러난 공간을 확인합니다. 보이지 않는 내부 구성은 제품 설명으로 물어보세요. “겉은 넓지만 손바닥 쪽은 가늘게 이어지는 형태를 원한다”처럼 원하는 연결을 말하면 주문 방향이 구체적입니다.",
      "완성된 반지의 중량도 따로 확인하세요. 큰 곡면이 보이는 사진만으로 금속량이나 무게를 정하기 어렵습니다. 속이 빈 구조와 금속으로 채워진 구조를 자세히 비교하려면 아래 중공·솔리드 가이드를 참고하고, 선택한 돔 반지에는 어떤 설명이 적용되는지 질문하면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "볼드 돔 반지는 호수와 착용감을 어떻게 확인하나요?",
    "paragraphs": [
      "착용할 손과 손가락을 먼저 정하고, 선택한 밴드 형태로 맞춤을 확인하세요. GIA의 반지 사이즈 안내는 넓은 밴드가 더 조이게 느껴질 수 있어 폭을 고려하도록 설명합니다. 정면 돔이 넓다는 이유만으로 일정한 호수를 더하기보다, 아래쪽 밴드와 안쪽 형태까지 함께 보여 주는 것이 좋습니다.",
      "착용할 수 있는 후보가 있다면 손을 자연스럽게 펴고 오므리며 양옆 손가락과 닿는 부분을 살펴보세요. 손바닥 쪽 밴드가 특정 지점을 누르는지, 평소 입는 옷의 소매와 닿는 높이인지도 확인해 봅니다. 더 낮게 만들고 싶은 부분이나 어깨를 좁히고 싶은 위치를 찾기 위한 비교입니다.",
      "GIA는 관절을 지나 착용할 수 있으면서 불편할 만큼 조이지 않는 맞춤을 안내합니다. 평소 끼는 반지의 호수는 참고로 전달하고, 그 반지의 폭도 함께 알려 주세요. 다른 반지와 나란히 낄 계획이면 어느 손가락에 조합할지까지 설명하면 착용 조건을 검토하기 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 돔 반지를 어떻게 구매·주문 상담하나요?",
    "paragraphs": [
      "좋아하는 돔 반지의 정면과 측면 참고 사진을 함께 준비하세요. 상단이 넓은 느낌을 원하는지, 높게 부푼 곡면을 원하는지 적고 손바닥 쪽 밴드의 선호도 덧붙여 주세요. 금속 색과 소재, 착용할 손가락, 현재 호수의 확인 상태, 예산과 희망일을 알려 주시면 상담할 기준이 됩니다.",
      "“보석 없이 둥근 금속 곡면이 보이는 돔 반지를 찾습니다. 정면에서는 넓게 보이되 옆으로 너무 높이 솟지 않았으면 좋겠어요. 손바닥 쪽은 가늘어지는 형태를 원합니다. ○○ 손가락에 낄 예정이고, 평소 반지는 ○호입니다. 가능한 상단 폭과 높이, 안쪽 형태와 예상 중량을 비교해 상담받고 싶어요.”처럼 문의해 보세요.",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 사진을 보내 주세요. 원하는 곡면과 밴드 형태를 확인하고 구매 가능한 구성이나 주문제작 범위, 견적과 일정을 상담합니다. 치수를 조정할 때는 상단의 볼륨과 손가락에 닿는 부분을 함께 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "폭·높이·두께를 비교할 때는 어느 부위를 측정한 값인지 확인하세요. 특히 상단 최대 폭과 손바닥 쪽 밴드 폭을 나누어 기록하는 것이 좋습니다.",
  "외관 사진에서 확인되지 않는 내부 구성과 중량은 선택한 제품의 사양으로 확인하고, 호수는 실제 밴드 형태에 맞춰 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/signet-ring-face-shape-selection-guide",
    "label": "넓은 윗면에 각인을 원한다면",
    "description": "시그넷 반지의 윗면 모양과 각인 면을 고르는 기준입니다."
  },
  {
    "to": "/guide/hollow-vs-solid-gold-jewelry",
    "label": "중공·솔리드 구조 더 알아보기",
    "description": "금속의 외형과 내부 구조, 중량을 구분해 확인하세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "반지 호수 확인하기",
    "description": "주문 전 손가락과 반지 크기를 확인하는 기본 안내입니다."
  },
  {
    "to": "/custom",
    "label": "돔 반지 주문제작 상담",
    "description": "원하는 정면 폭과 옆면 높이가 보이는 사진을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 둘러보기",
    "description": "금속의 볼륨과 밴드 형태를 설명할 참고 디자인을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '볼드 돔 반지, 폭과 높이 고르는 법'
const gmArticleLead = '볼드 돔 반지를 고를 때는 정면에서 보이는 넓이와 옆에서 솟은 높이를 따로 확인하세요. 금속 윗면이 둥글게 부푼 돔 반지는 비슷한 폭이라도 곡선과 아래쪽 밴드에 따라 인상이 달라집니다. 원하는 볼륨을 고른 뒤 손바닥 쪽 폭과 안쪽 형태까지 함께 보면 착용할 반지의 조건을 구체적으로 정할 수 있습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '볼드 돔 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '볼드 돔 반지 폭·높이·착용감 상담'
const gmHeroAlt = '넓고 둥근 금속 윗면이 양옆을 따라 가는 아래쪽 밴드로 이어지는 금색 돔 반지의 AI 예시'
const gmHeroCaption = '돔 반지의 둥근 윗면과 아래쪽으로 좁아지는 밴드를 보여 주는 AI 생성 예시입니다. 내부 구조와 중량은 실제 제품 사양으로 확인해 주세요.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '제조사의 부위별 치수 표기와 GIA의 반지 사이즈 안내를 참고했습니다. 비교표와 사진 표시 방법은 돔 반지의 구매·주문 의도를 정리하기 위한 편집 예시입니다.'
const gmSources = [
  {
    "label": "Mejuri — Dôme Ring의 부위별 치수 표시 사례",
    "url": "https://mejuri.com/shop/products/dome-ring",
    "note": "상단 폭·높이·밴드 폭을 별도로 표시한 특정 제품 사례입니다."
  },
  {
    "label": "GIA — 밴드 폭을 고려한 반지 사이즈 확인",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-determine-ring-size-tips-and-ring-size-chart/",
    "note": "밴드 폭과 관절 통과를 함께 고려하는 사이즈 안내입니다."
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
