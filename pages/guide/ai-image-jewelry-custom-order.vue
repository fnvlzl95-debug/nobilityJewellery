<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-image-jewelry-custom-order'
const pageTitle = 'AI 주얼리 주문제작, 생성 사진으로 상담하기 | 귀족'
const pageDescription = 'AI로 만든 반지·목걸이 사진으로 주문제작을 상담할 때 준비할 내용을 안내합니다. 기준 이미지 한 장, 유지할 디자인과 수정할 부분을 정리하고 보석·크기·연결 구조를 종로 귀족에 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/ai-image-jewelry-custom-order-hero-e909dd27.webp`
const publishedAt = '2026-10-19'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 생성 사진 한 장만 있어도 주얼리 상담을 시작할 수 있나요?",
    "answer": "원하는 모습이 담긴 한 장으로 상담 방향을 잡을 수 있습니다. AI 생성 이미지임을 알리고 꼭 유지할 요소와 조정 가능한 부분을 적어 주세요. 제작 가능 여부와 견적은 실제 소재·치수·구조를 검토한 뒤 확인합니다."
  },
  {
    "question": "AI 사진 속 반지와 완전히 똑같이 제작할 수 있나요?",
    "answer": "이미지만으로 동일한 결과를 약속할 수는 없습니다. 보석의 크기와 고정 구조, 금속 두께처럼 사진에 확정되지 않은 조건을 검토해야 합니다. 가장 마음에 드는 특징을 먼저 알려 주고 유지할 수 있는 범위를 상담하세요."
  },
  {
    "question": "AI로 옆면까지 생성하면 제작용 CAD가 필요 없나요?",
    "answer": "생성한 정면과 옆면이 같은 구조인지 확인해야 하며, 일반 이미지 파일이 제작용 모델을 대신한다고 볼 수는 없습니다. 해당 디자인에 필요한 설계 방식과 확인 자료는 제작 상담에서 정하세요."
  },
  {
    "question": "AI 이미지에 18K나 사파이어라고 입력했으면 그 소재로 정해지나요?",
    "answer": "생성 요청 문장의 소재 이름이 이미지의 실제 사양을 보증하지는 않습니다. 원하는 소재를 상담 요청에 따로 적고, 사용할 금속 함량과 보석 종류·크기를 다시 확인하세요."
  }
]
const quickAnswers = [
  "AI 생성 사진을 보내면서 “AI로 만든 참고 이미지”라고 알려 주세요. 실물 제품 사진이나 제작 확정 도면으로 혼동하지 않도록 합니다.",
  "여러 버전 중 기준 이미지 한 장을 정하고, 유지할 요소·변경 가능한 요소·아직 미정인 조건을 나누어 전달하세요.",
  "이미지의 금속 색과 보석 크기감만으로 함량·보석 종류·치수·가격이 정해지지는 않습니다. 실제 주문 사양은 상담에서 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI로 만든 주얼리 사진도 주문제작에 사용할 수 있나요?",
    "paragraphs": [
      "원하는 분위기와 형태를 설명하는 출발점으로 사용할 수 있습니다. 말로 설명하기 어려운 곡선, 보석의 배치, 금속의 색감을 이미지로 보여 주면 어떤 부분이 마음에 드는지 이야기하기 좋습니다. 다만 사진처럼 선명하다는 이유만으로 이미 제작된 제품이거나 그대로 생산할 수 있는 설계라고 볼 수는 없습니다.",
      "GIA의 2024년 주얼리 디자인 연구는 생성형 AI를 디자인 아이디어를 탐색하는 도구로 다루며, 당시 생성 사례에서 연결되지 않은 듯한 보석 테두리와 비정상적인 장식도 보여 줍니다. 특정 도구의 현재 성능을 평가하기보다, 상담할 이미지의 연결 부위와 보석 고정 부분을 직접 확인하는 기준으로 참고할 수 있습니다.",
      "일부 구조를 바꿔야 한다고 해서 원하는 느낌까지 포기해야 하는 것은 아닙니다. 곡선의 흐름은 유지하면서 보석을 받치는 금속을 보완하는 식으로, 살릴 디자인과 조정할 구조를 나누어 상담해 보세요. 가능한 변경 범위는 선택할 소재와 보석, 완성 크기에 따라 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "생성한 이미지가 여러 장이면 무엇을 보내야 하나요?",
    "paragraphs": [
      "가장 원하는 모습 한 장을 기준으로 정하고 다른 이미지는 수정 참고용으로 구분하세요. AI로 조금씩 바꾼 사진에서는 마음에 든 곡선뿐 아니라 보석 개수나 밴드의 갈라지는 위치도 함께 달라졌을 수 있습니다. “마지막 사진대로”라고만 하면 이전 사진에서 유지하고 싶던 요소가 빠질 수 있습니다.",
      "기준 이미지는 A, 수정 참고 이미지는 B처럼 이름을 붙이고 “A의 전체 모양을 유지하고 B의 금속 색감만 참고”라고 적어 보세요. 원본은 따로 두고 표시한 사본에 원이나 화살표로 원하는 부분을 짚어 주면 됩니다. 생성에 사용한 문장을 함께 보내더라도 우선할 이미지와 요청 내용을 분명히 정해 주세요.",
      "메모는 유지할 요소·변경 가능한 요소·미정인 조건으로 나누면 좋습니다. 예를 들어 “타원형 파란 보석과 양옆 곡선은 유지, 보석을 잡는 발과 아래 받침은 상담 후 조정, 보석 종류와 실제 크기는 미정”처럼 적으면 이미지의 어떤 부분부터 검토해야 할지 드러납니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "AI 이미지에서 실제 제작 전에 무엇을 확인하나요?",
    "paragraphs": [
      "이미지에서 좋아하는 인상을 실제 주문 항목으로 바꾸어 확인합니다. 금빛이라는 표현은 금 함량을, 파란색이라는 표현은 보석 종류를 정하지 않습니다. 생성 요청 문장에 소재 이름이나 수치를 넣었더라도 그 이미지가 해당 사양을 정확히 보여 준다고 가정하지 마세요.",
      "아래 표는 이미지의 표현을 상담 질문으로 바꾸는 예시입니다. 처음부터 모든 답을 정할 필요는 없습니다. 확실한 취향은 남기고 나머지는 미정으로 표시해, 예산과 착용 목적에 맞는 선택지를 상담하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "이미지에서 보이는 것",
        "실제로 정할 내용",
        "상담할 질문"
      ],
      "rows": [
        [
          "금빛·은빛 색감",
          "금속 종류·함량·표면 마감",
          "이 색감에 가까운 소재 후보는 무엇인가요?"
        ],
        [
          "파란 보석과 반짝임",
          "보석 종류·모양·크기·개수",
          "어떤 보석과 크기로 비슷한 인상을 낼 수 있나요?"
        ],
        [
          "가늘게 이어진 금속선",
          "폭·두께·연결 위치",
          "이 곡선을 살리려면 어느 부분을 보완해야 하나요?"
        ],
        [
          "떠 있는 듯 보이는 보석",
          "고정하는 발·테두리·아래 받침",
          "앞에서 잘 안 보이는 고정 구조는 어떻게 되나요?"
        ],
        [
          "화면에서의 크기감",
          "완성 치수와 착용 위치",
          "실제 크기에서는 어느 정도로 보이나요?"
        ]
      ]
    }
  },
  {
    "title": "AI로 만든 정면·옆면 사진이 있으면 도면이 되나요?",
    "paragraphs": [
      "여러 방향의 이미지가 있어도 같은 구조를 보여 주는지부터 대조해야 합니다. 정면에는 보석이 하나인데 새로 만든 옆면에 작은 보석이 추가되거나, 밴드가 이어지는 위치가 다르면 어느 쪽을 원하는지 정해야 합니다. 별도로 생성한 옆면을 원래 이미지의 보이지 않는 부분이 확인된 것으로 받아들이지 마세요.",
      "일반적인 JPG·PNG 참고 이미지와 제작에 사용하는 CAD 모델은 구분해 상담합니다. GIA의 주얼리 CAD/CAM 교육 안내도 실제 크기와 비례, 요소 사이의 관계를 맞추고 비용·크기·제조 방법의 제약 안에서 모델을 설계하는 내용을 설명합니다. 이미지를 선명하게 확대하는 것만으로 이러한 설계 조건이 확정되지는 않습니다.",
      "정면에서 마음에 든 모습을 기준으로, 측면 높이와 보석 아래 받침은 어떤 형태로 보완할지 물어보세요. 도면·모형 등 어떤 확인 자료를 제공받을 수 있는지도 상담에서 정합니다. 생성 이미지를 여러 번 수정하는 과정과 실제 제작 사양을 승인하는 과정은 나누어 기록해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에는 AI 생성 사진을 어떻게 보내면 되나요?",
    "paragraphs": [
      "카카오톡으로 기준 이미지와 짧은 설명을 함께 보내 주세요. “AI로 만든 참고 이미지입니다”라고 밝히고, 반드시 유지하고 싶은 요소와 조정해도 괜찮은 부분을 적습니다. 아직 소재나 크기를 결정하지 못했다면 그 점도 그대로 알려 주시면 됩니다.",
      "문의 예시: “AI로 만든 반지 이미지입니다. A 사진의 타원형 파란 보석과 양옆 곡선을 살리고 싶어요. 보석을 잡는 발과 아래 받침은 제작에 맞게 조정해도 됩니다. 보석 종류와 크기는 아직 미정이라 예산 안에서 가능한 구성을 상담받고 싶습니다.”",
      "기준 이미지·착용할 품목·유지할 디자인·수정 가능한 부분·예산·희망일을 아래 상담 링크로 전달해 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 이미지의 제작 가능한 범위를 검토하고, 선택할 사양에 따른 견적과 일정을 상담합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "AI 이미지에 표현된 빛·색·미세 장식과 실물의 모습은 다를 수 있습니다. 주문할 때는 기준 이미지와 함께 확정한 소재·치수·구조를 확인하세요.",
  "AI로 이미지를 만들었다는 이유만으로 제작 비용이 낮아지거나 기간이 짧아지는 것은 아닙니다. 설계와 제작에 필요한 작업을 확인한 뒤 견적·일정을 정합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "AI 이미지로 주문제작 상담하기",
    "description": "기준 이미지와 유지할 디자인을 정리해 문의하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 제작 디자인 살펴보기",
    "description": "이미지의 분위기와 비교할 디자인을 찾아보세요."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "반지 주문 시 사양 확인하기",
    "description": "이미지의 방향을 정한 뒤 소재·사이즈 등 주문 항목을 살펴보세요."
  },
  {
    "to": "/guide/jongno-jewelry-store-visit-guide",
    "label": "종로 귀족 방문 상담 준비",
    "description": "상담 목적과 준비 자료를 정리해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 주얼리 주문제작, 생성 사진으로 상담하기'
const gmArticleLead = 'AI로 만든 반지나 목걸이 사진도 주문제작 상담의 참고 자료로 활용할 수 있습니다. 마음에 드는 이미지 한 장을 기준으로 고르고, 꼭 살리고 싶은 모양과 바꿔도 되는 부분을 표시해 주세요. 실제 제작 가능 여부는 이미지에 보이지 않는 치수·소재·보석 고정 구조까지 검토한 뒤 정합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 주얼리 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 생성 이미지로 주얼리 주문제작 상담'
const gmHeroAlt = '타원형 파란 보석과 곡선 금속 밴드를 조합한 AI 생성 반지 디자인 예시'
const gmHeroCaption = '주문 상담의 참고 자료를 설명하기 위한 AI 생성 이미지입니다. 실제 제작 사례·판매 제품 사진이나 제작 확정 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'AI 디자인 활용과 이미지 사례는 GIA의 2024년 연구, 제작 모델의 설계 조건은 GIA CAD/CAM 안내를 참고했습니다. 기준 이미지 선정·수정 메모·상담 질문은 주문 준비를 돕기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 생성형 AI를 활용한 주얼리 디자인 연구(2024)",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "AI 아이디어 탐색과 당시 이미지의 구조상 오류 사례를 참고했습니다."
  },
  {
    "label": "GIA — 주얼리 CAD/CAM의 설계 기준",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-cad-cam",
    "note": "실제 크기·비례와 제조 조건을 고려하는 CAD 설계 항목을 참고했습니다."
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
