<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/enamel-jewelry-selection-care-guide'
const pageTitle = '에나멜 주얼리, 색 장식과 관리 확인법 | 귀족'
const pageDescription = '에나멜 주얼리는 금속 재질과 색 장식 재료를 따로 확인하세요. 유리질 에나멜과 수지 제품의 차이, 색면·금속 경계 비교, 구매 전 물세척과 관리 조건을 묻는 방법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/enamel-jewelry-selection-care-guide-hero-7c07e554.webp`
const publishedAt = '2026-10-28'
const updatedAt = ''
const faqItems = [
  {
    "question": "14K 에나멜 반지라면 색 장식도 금으로 된 건가요?",
    "answer": "14K는 금속에 관한 표시이며 색 장식층의 재료를 설명하지는 않습니다. 금속 재질과 별도로 색을 채운 부분이 유리질인지 수지 계열인지 확인하세요."
  },
  {
    "question": "에나멜과 콜드 에나멜은 이름만 다른 건가요?",
    "answer": "이름만 다르고 재료는 같다고 단정할 수 없습니다. 전통적 유리질 에나멜과 달리 콜드 에나멜이라는 이름으로 에폭시 수지 제품도 판매되므로, 실제 제품의 색층 재료와 제작 방식을 물어보세요."
  },
  {
    "question": "에나멜 목걸이를 금 세척액에 담가도 되나요?",
    "answer": "금속이 금이라고 해서 색 장식에도 그 세척액을 사용할 수 있는 것은 아닙니다. 제품의 색층과 부속에 맞는 세정제인지, 물이나 세척액에 담가도 되는지 판매처의 관리 안내부터 확인하세요."
  },
  {
    "question": "에나멜 주얼리 사진만 보내면 같은 방식으로 제작할 수 있나요?",
    "answer": "사진만으로 색 장식의 재료나 공법이 확인되지는 않습니다. 원하는 품목·색 장식·예산을 보내 취급 및 제작 상담 가능 범위를 먼저 확인하고, 진행 가능한 경우 실제 재료와 사양을 정해야 합니다."
  }
]
const quickAnswers = [
  "14K·18K 표시는 금속에 관한 정보입니다. 파랑·빨강 등 색을 내는 장식층이 어떤 재료인지는 별도로 물어보세요.",
  "상세 사진에서는 색이 채워진 면과 금속 선을 나누어 보세요. 사진이 실제 받을 제품인지, 디자인을 보여 주는 샘플인지도 함께 확인합니다.",
  "색 장식이 있는 제품은 금제품이라는 이유만으로 물에 담그거나 세척액을 사용하지 마세요. 사용할 수 있는 세척 방법과 피해야 할 환경을 제품별로 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "에나멜 주얼리의 색 장식은 보석인가요?",
    "paragraphs": [
      "전통적인 유리질 에나멜은 금속 위에 유리를 융착해 색을 표현하는 장식입니다. 영국 V&A 박물관은 곱게 간 유리를 금속에 융착하는 방식으로 에나멜을 설명합니다. 별도의 보석 한 알을 금속에 고정한 구성과는 구분해서 볼 수 있습니다.",
      "파란색이 보인다고 해서 사파이어나 다른 파란 보석이라고 판단할 수는 없습니다. 하나의 제품에 보석과 에나멜 장식이 함께 들어갈 수도 있으니, 어떤 부분이 보석이고 어떤 부분이 색 장식인지 상품 설명과 실물을 함께 보세요.",
      "금속과 색 장식은 각각 확인할 항목입니다. 예를 들어 14K라는 표시를 보았다면 금속에 관한 정보를 확인한 것이지, 파란 장식층이 유리질인지 수지인지까지 확인한 것은 아닙니다. 상담할 때도 “바탕 금속은 무엇인가요?”와 “색을 채운 부분의 재료는 무엇인가요?”를 나누어 물으면 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "콜드 에나멜도 유리질 에나멜과 같은 재료인가요?",
    "paragraphs": [
      "상품에 붙은 에나멜이라는 이름만으로 재료가 같다고 볼 수는 없습니다. 예를 들어 금세공 도구 공급사 Tavast는 판매 중인 콜드 에나멜을 두 성분을 섞어 굳히는 에폭시 수지로 설명합니다. 금속에 유리를 융착하는 전통적 에나멜과 재료를 구분해야 하는 사례입니다.",
      "이는 모든 콜드 에나멜 제품의 사양을 대신하는 설명이 아닙니다. 구매할 제품의 색층 재료와 제작 방식을 판매자에게 확인하세요. 유리질인지 수지인지 설명이 없으면, 광택이 강하다거나 색이 선명하다는 이유로 어느 쪽이라고 추정하지 않는 편이 좋습니다.",
      "재료 이름 하나로 가격이나 완성도를 판단하기도 어렵습니다. 원하는 색과 모양을 고르는 일에 더해, 일상에서 어떻게 착용하고 관리할 수 있는지 확인하는 것이 구매에 도움이 됩니다. 제작 기법을 자세히 외우기보다 실제 제품에 적용된 재료와 관리 안내를 받아 두세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "색 장식은 사진과 실물에서 무엇을 비교하나요?",
    "paragraphs": [
      "색이 넓게 채워진 디자인을 원하는지, 가는 금속 선 사이로 색이 보이는 디자인을 원하는지부터 정해 보세요. 같은 파란색 계열이라도 색면이 차지하는 비중과 테두리의 굵기에 따라 전체 인상이 달라집니다. 보석의 반짝임을 원하는지, 매끈한 색면을 원하는지도 구분하면 후보를 좁히기 쉽습니다.",
      "사진에서는 정면의 전체 모습과 가장자리 확대 사진을 함께 보세요. 화면과 조명에 따라 색이 다르게 보일 수 있으므로 실제 받을 제품의 사진인지 확인하고, 가능하다면 실물도 비교해 보세요. 표면에 선이나 작은 패임이 보인다면 사진만으로 하자 또는 수작업의 특징이라고 단정하지 말고 해당 부위의 설명을 요청하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교할 항목",
        "살펴볼 부분",
        "구매 전 질문"
      ],
      "rows": [
        [
          "색 장식 재료",
          "색이 들어간 층의 재료·공정 설명",
          "유리질 에나멜인가요, 수지 계열인가요?"
        ],
        [
          "색면과 금속 선",
          "색의 면적, 테두리와 내부 선의 굵기",
          "색면이 넓은 디자인과 금속 선이 많은 디자인을 비교할 수 있나요?"
        ],
        [
          "색과 광택",
          "불투명하거나 비쳐 보이는 느낌, 반사광",
          "이 사진은 실제 받을 제품인가요, 샘플인가요?"
        ],
        [
          "경계와 가장자리",
          "금속과 색이 만나는 곳, 눈에 띄는 균열·패임",
          "이 부분을 다른 각도로 보고 설명받을 수 있나요?"
        ],
        [
          "뒷면과 부속",
          "뒷면의 마감, 고리·잠금장치 주변 구성",
          "색 장식과 금속 부속에 함께 적용할 수 있는 관리법은 무엇인가요?"
        ]
      ]
    }
  },
  {
    "title": "에나멜 반지·목걸이는 물세척해도 되나요?",
    "paragraphs": [
      "제품의 관리 안내를 먼저 확인하세요. 금속, 색 장식, 함께 들어간 보석과 부속을 고려해야 하므로 “금목걸이니까 물에 담가 두면 된다”는 식으로 결정하기 어렵습니다. 물에 잠깐 닿는 것과 통째로 담가 두는 것도 같은 조건으로 보지 마세요.",
      "Fabergé는 자사 에나멜 주얼리 관리 안내에서 수영·스킨케어 제품 사용·격한 운동 전에 제품을 빼고, 떨어뜨리는 충격을 피하도록 설명합니다. 세척 안내에는 물에 담그지 말라는 조건도 있습니다. 이는 해당 브랜드의 제품 관리 사례이며, 그 세척 방법을 모든 에나멜 제품에 그대로 적용한다는 뜻은 아닙니다.",
      "구매할 때 물세척 가능 여부, 허용되는 세정제와 도구, 피해야 할 착용 환경을 물어보세요. 관리 조건을 모른다면 초음파 세척기나 연마용 천을 먼저 시험하기보다 판매처에 확인하는 편이 좋습니다. 표면에 균열이나 벗겨짐이 보이면 상태 사진을 남기고 판매처 또는 원 제작사에 점검·처리 가능 범위를 문의하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 색 장식 주얼리는 어떻게 상담하나요?",
    "paragraphs": [
      "마음에 드는 색 장식의 참고 사진과 원하는 품목, 예산을 보내고 상담 가능한 범위부터 확인해 주세요. 특히 에나멜 기법을 지정하고 싶다면 유리질인지 수지 계열인지 알고 있는 정보를 함께 적어 주세요. 아직 모른다면 재료 미정이라고 표시하면 됩니다.",
      "문의 예시: “파란색 면과 얇은 금색 테두리가 있는 목걸이를 찾고 있습니다. 첨부 사진은 원하는 분위기의 참고용이며 색 장식 재료는 아직 모릅니다. 예산은 ○○원 안팎입니다. 이런 색 장식 제품의 취급 여부와 디자인 상담이 가능한 범위부터 알고 싶어요.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 자료를 보내 주세요. 사진만으로 특정 에나멜 공법의 제작이나 복원이 가능하다고 확정할 수는 없습니다. 취급 및 제작 상담 가능 범위를 확인한 뒤, 진행할 수 있는 구성에 한해 재료·견적·일정과 관리 조건을 함께 상담하세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "에나멜이라는 명칭과 사진만으로 색 장식의 재료·공정·품질을 확인할 수는 없습니다. 실제 구매할 제품의 설명과 상태를 함께 확인하세요.",
  "본문의 브랜드 관리 사례는 해당 브랜드 안내입니다. 다른 제품에는 그 제품의 관리 지침을 우선 적용하고, 손상 처리 가능 여부도 별도로 문의하세요."
]
const relatedLinks = [
  {
    "to": "/guide/plated-jewelry-discoloration-care-guide",
    "label": "금속 도금층의 변색이 궁금하다면",
    "description": "색 장식과 별도로, 도금층의 마모와 변색을 확인하는 방법을 보세요."
  },
  {
    "to": "/guide/ai-jewelry-gemstone-color-selection",
    "label": "색 장식 대신 유색보석을 고른다면",
    "description": "실제 보석 후보의 색감을 비교하는 방법을 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "색 장식 주얼리 상담 범위 확인",
    "description": "원하는 품목과 참고 사진을 보내 취급·제작 상담 가능 여부부터 확인하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 살펴보기",
    "description": "전체 형태와 금속 선의 분위기를 참고해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '에나멜 주얼리, 색 장식과 관리 확인법'
const gmArticleLead = '에나멜 주얼리를 고를 때는 색 장식의 재료와 금속 재질을 따로 확인하세요. 전통적인 유리질 에나멜은 금속에 유리를 융착한 장식이지만, 콜드 에나멜이라는 이름으로 수지 제품도 판매됩니다. 이름이나 사진만으로 같은 재료라고 정하지 말고, 실제 색면과 금속 경계의 모습, 해당 제품의 관리 조건까지 확인하면 구매 기준을 세우기 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '에나멜 주얼리'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '색 장식 주얼리 디자인 상담'
const gmHeroAlt = '짙은 파란색 면과 가는 금색 테두리·곡선이 있는 원형 펜던트의 AI 디자인 예시'
const gmHeroCaption = '색면과 금속 선의 구성을 설명하는 AI 생성 이미지입니다. 실제 판매 제품이나 제작 사례가 아니며, 이미지로 에나멜 재료와 공법을 확인할 수는 없습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '유리질 에나멜의 정의는 V&A 박물관, 수지 제품과 관리 사례는 각 판매사·브랜드의 원문을 참고했습니다. 비교표와 문의 문장은 구매 전 확인할 내용을 정리한 편집 예시입니다.'
const gmSources = [
  {
    "label": "V&A 박물관 — 유리질 에나멜의 정의",
    "url": "https://www.vam.ac.uk/collections/enamels",
    "note": "전통적인 유리질 에나멜의 정의를 참고했습니다."
  },
  {
    "label": "Tavast — 에폭시 수지 콜드 에나멜 상품 사례",
    "url": "https://tools.tavast.eu/product/cold-enamel-transparent-120ml/",
    "note": "콜드 에나멜이라는 이름으로 판매되는 수지 제품의 사례입니다."
  },
  {
    "label": "Fabergé — 자사 에나멜 주얼리 관리 안내",
    "url": "https://www.faberge.com/pages/care-and-repair",
    "note": "해당 브랜드의 제품별 착용·관리 조건을 참고했습니다."
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
