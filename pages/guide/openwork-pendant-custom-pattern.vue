<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/openwork-pendant-custom-pattern'
const pageTitle = '투각 펜던트 주문제작, 무늬와 빈 공간 고르기 | 귀족'
const pageDescription = '투각 펜던트 주문제작은 금속으로 남길 무늬와 뚫을 공간을 나누는 것부터 시작합니다. 테두리와 연결선, 뒷판 유무, 실제 크기에서 보이는 무늬를 비교하고 종로 귀족에 원하는 도안을 상담해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/openwork-pendant-custom-pattern-hero-703b22ee.webp`
const publishedAt = '2026-10-18'
const updatedAt = ''
const faqItems = [
  {
    "question": "투각 펜던트와 무늬를 각인한 펜던트는 어떻게 다른가요?",
    "answer": "투각은 금속에 뚫린 공간으로 배경이 보이는 무늬를 기준으로 살펴봅니다. 표면에 새긴 선을 원하는지, 뒤까지 구멍이 이어진 형태를 원하는지 참고 사진에서 구분해 주세요."
  },
  {
    "question": "잎 모양을 금속으로 남길지 구멍으로 만들지 어떻게 전달하나요?",
    "answer": "참고 그림에서 남길 금속과 뚫을 공간을 두 색으로 표시하고 각 색의 뜻을 적어 주세요. 잎 모양 자체가 금속인지 빈 공간인지와 바깥 테두리 유무를 함께 알려 주면 좋습니다."
  },
  {
    "question": "투각 펜던트는 작은 구멍이 많을수록 좋은가요?",
    "answer": "구멍의 개수만으로 고르기보다 희망 완성 크기에서 무늬가 구분되는지 확인하세요. 연결선과 배경이 보이는 범위도 함께 비교하고 제작 가능한 구조인지 상담하세요."
  },
  {
    "question": "투각 펜던트는 모두 손으로 톱질해서 만드나요?",
    "answer": "GIA는 드릴과 보석용 톱을 사용하는 투각 기법을 소개하지만, 이 사례만으로 모든 제품의 공정을 단정할 수는 없습니다. 원하는 도안에 적용할 제작 방식은 상담에서 확인하세요."
  }
]
const quickAnswers = [
  "참고 그림에 금속으로 남길 부분과 뚫을 부분을 두 색으로 표시하면 원하는 투각 무늬를 설명하기 쉽습니다.",
  "가운데 무늬가 테두리와 어떤 선으로 연결되는지, 뒤에서 막는 판이 있는지 도안에서 확인하세요.",
  "확대 사진뿐 아니라 희망 완성 크기의 도안으로 작은 구멍과 무늬가 구분되는지 비교하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "투각 펜던트는 어떤 디자인인가요?",
    "paragraphs": [
      "투각 펜던트는 금속의 빈 공간도 무늬의 일부가 되는 장신구입니다. GIA는 오픈워크(openwork)를 금속에 구멍이 있는 무늬를 만들어 빛이 통과하게 하는 기법으로 설명합니다. 이 글에서는 금속을 관통한 무늬를 기준으로, 주문할 때 남길 금속과 비울 공간을 고르는 방법을 살펴봅니다.",
      "표면에 선이나 글자를 새긴 각인과는 확인할 부분이 다릅니다. 각인된 잎맥을 원하는지, 잎맥 사이로 옷이나 피부가 보이는 형태를 원하는지 참고 사진에 표시해 주세요. 정면 사진만으로 구분하기 어렵다면 구멍이 뒤까지 이어지는지도 물어보세요.",
      "가는 금속선으로 짠 듯한 필리그리도 빈 공간이 있는 모습으로 보일 수 있습니다. GIA는 필리그리를 가는 금속선을 납땜해 무늬를 만드는 기법으로 설명합니다. 비슷한 외관이어도 만드는 구조는 다를 수 있으므로 사진의 인상과 원하는 제작 방식을 구분해 상담하는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 잎 무늬인데 왜 다르게 보이나요?",
    "paragraphs": [
      "잎 모양 자체를 금속으로 남기고 주변을 비우는 안과, 넓은 금속 바탕에서 잎 모양을 구멍으로 비우는 안을 비교해 보세요. 첫 번째는 금속 잎의 윤곽이 드러나고, 두 번째는 잎 모양으로 보이는 배경이 무늬가 됩니다. “잎 모양 펜던트”라는 말만으로는 어느 쪽을 원하는지 알기 어렵습니다.",
      "참고 그림을 보낼 때는 남길 금속을 한 색, 뚫을 공간을 다른 색으로 칠해 보세요. 색칠한 부분 옆에 “금속”과 “구멍”을 적으면 사진의 밝고 어두운 부분을 서로 다르게 해석하는 일을 줄일 수 있습니다.",
      "바깥 테두리를 남길지도 함께 표시하세요. 같은 잎맥이라도 타원 테두리 안에 넣은 형태와 잎의 외곽 자체를 제품 윤곽으로 삼는 형태는 다릅니다. 먼저 원하는 외곽과 안쪽 무늬를 정하고, 실제 제작에 필요한 연결 구조를 검토합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "도안에서 연결선과 뒷면은 어떻게 확인하나요?",
    "paragraphs": [
      "도안 가운데의 작은 무늬가 주변 금속과 떨어져 있다면 무엇으로 연결되는지 질문하세요. 테두리나 중심 줄기로 이어지는 금속선이 있는지, 뒤쪽 구조가 받쳐 주는지 확인해야 합니다. 종이에 그릴 수 있는 모양이 그대로 제작 가능한 구조를 뜻하는 것은 아닙니다.",
      "연결선을 넣는 위치도 무늬의 일부로 살펴보세요. 잎맥에 맞춰 이어지는 선을 원하는지, 테두리와 중심 무늬를 잇는 선이 따로 보여도 괜찮은지 표시하면 수정 방향을 설명하기 좋습니다. 가늘게 보이는 정도만으로 강도를 판단하지 말고 소재와 입체 구조를 함께 상담하세요.",
      "뒷판이 있으면 앞쪽 무늬 사이로 보이는 것이 옷이나 피부가 아니라 뒤쪽 판일 수 있습니다. 앞면의 빈 모양과 실제로 관통한 부분을 구분하고, 정면·옆면·뒷면에서 어떤 구조인지 확인해 주세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인 항목",
        "도안에서 구분할 것",
        "상담할 질문"
      ],
      "rows": [
        [
          "남길 금속",
          "잎·줄기·테두리로 남는 선과 면",
          "어느 부분이 실제 금속으로 남나요?"
        ],
        [
          "비울 공간",
          "배경이 보이길 원하는 구멍",
          "뒤까지 뚫리는 범위는 어디인가요?"
        ],
        [
          "연결선",
          "중심 무늬와 바깥 구조를 잇는 부분",
          "떨어진 무늬는 어디로 연결되나요?"
        ],
        [
          "뒷면",
          "뒤에서 받치거나 막는 판의 유무",
          "뒷판을 넣으면 정면에서 무엇이 보이나요?"
        ]
      ]
    }
  },
  {
    "title": "확대 사진 외에 어떤 모습을 비교해야 하나요?",
    "paragraphs": [
      "희망하는 완성 크기로 맞춘 도안에서도 무늬를 확인하세요. 화면을 확대했을 때 선명했던 작은 구멍이 실제 크기에서는 하나의 어두운 면처럼 보일 수 있습니다. 구멍을 많이 넣는 것보다 원하는 잎맥이나 꽃잎이 구분되는지 살펴보는 편이 선택에 도움이 됩니다.",
      "크기를 맞춘 도안은 전체 비율과 무늬를 비교하는 자료입니다. 착용한 느낌을 가늠하려면 빈 공간으로 보일 피부색이나 밝고 어두운 옷 색을 바꿔 넣은 이미지도 요청해 보세요. 인쇄물만으로 금속의 강도나 피부에 닿는 감촉까지 확인할 수는 없습니다.",
      "체인 고리를 포함한 모습도 함께 보세요. 고리가 위쪽 무늬와 겹치는지, 매달았을 때 잎의 위아래 방향이 의도대로 놓이는지 확인합니다. 이미 가진 체인에 달 예정이라면 체인과 잠금 부속 사진을 보내 고리 통과 여부도 별도로 상담해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 투각 펜던트를 어떻게 문의하나요?",
    "paragraphs": [
      "모티프 참고 사진과 함께 금속으로 남길 부분·비울 공간·바깥 윤곽을 표시해 주세요. 아직 도안이 없다면 “잎맥은 금속으로 남기고 사이로 배경이 보이는 타원 펜던트”처럼 원하는 모습을 문장으로 적어도 됩니다. 보석을 넣을지와 체인을 함께 주문할지도 구분해 주세요.",
      "문의 예시: “타원 테두리 안에 잎맥이 있는 투각 펜던트를 주문하고 싶습니다. 표시한 잎맥은 금속으로 남기고 나머지는 옷이 보이도록 비우고 싶어요. 뒷판 없이 가능한 구조인지, 실제 크기에서 무늬가 어떻게 보일지 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 참고 사진·원하는 전체 크기·보석 유무·체인 포함 여부·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 원하는 도안의 제작 가능한 범위와 견적·일정을 상담합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "참고 그림의 선 폭만으로 제작 가능 여부나 내구성을 확정할 수 없습니다. 확정 도안의 소재·두께·연결 구조를 함께 확인하세요.",
  "자료에 소개된 제작 기법이 모든 투각 제품에 동일하게 적용되는 것은 아닙니다. 원하는 외관과 실제 제작 방식을 나누어 상담하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "투각 펜던트 주문제작 상담",
    "description": "남길 금속과 비울 공간을 표시한 참고 사진으로 문의하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 살펴보기",
    "description": "좋아하는 금속 색상과 펜던트 윤곽을 찾아보세요."
  },
  {
    "to": "/guide/coin-necklace-design-selection-guide",
    "label": "코인 목걸이의 무늬와 외곽 비교",
    "description": "빈 공간 없이 바탕에 무늬를 담는 디자인도 비교해 보세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "목걸이 체인과 펜던트 연결 확인",
    "description": "기존 체인에 새 펜던트를 달 때 연결 부속을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '투각 펜던트 주문제작, 무늬와 빈 공간 고르기'
const gmArticleLead = '투각 펜던트는 금속에 뚫린 공간 사이로 배경이 보이는 무늬가 특징입니다. 주문제작에서는 잎이나 꽃을 금속으로 남길지, 그 모양을 구멍으로 비울지부터 정하세요. 같은 그림이라도 남기는 부분에 따라 인상이 달라지므로 테두리·연결선·뒷면까지 함께 확인하면 원하는 모습을 구체적으로 전달할 수 있습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '투각 펜던트'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '투각 펜던트 무늬와 빈 공간 주문제작'
const gmHeroAlt = '금빛 잎맥과 타원 테두리 사이로 어두운 배경이 보이는 투각 펜던트 디자인 예시'
const gmHeroCaption = '금속 무늬 사이로 배경이 보이는 투각 펜던트 디자인 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '오픈워크·필리그리의 정의와 톱질 투각 사례는 GIA 원문을 참고했습니다. 무늬를 표시하는 방법, 도안 비교표와 문의 예시는 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 오픈워크와 필리그리 금속 장식 기법",
    "url": "https://www.gia.edu/gia-news-research/metalwork-takes-bow-techniques-enhance-gemstone-jewelry",
    "note": "OPENWORK와 FILIGREE AND GRANULATION 항목의 정의, 톱질 투각 사례를 참고했습니다."
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
