<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-brooch-custom-design-size'
const pageTitle = '금 브로치 주문제작, 도안·크기 정하기 | 귀족'
const pageDescription = '금 브로치 주문제작은 도안의 윤곽, 가로·세로 크기, 보석 위치와 뒷면 잠금부터 상담하세요. 종로 귀족에 보낼 참고 자료와 견적 확인 항목, 최소 3주 제작기간을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/gold-brooch-custom-design-size-hero.webp`
const publishedAt = '2026-11-11'
const updatedAt = ''
const faqItems = [
  {
    "question": "직접 그린 그림으로 금 브로치 주문제작을 상담할 수 있나요?",
    "answer": "그림과 원하는 가로·세로 크기, 꼭 살릴 윤곽과 장식을 함께 보내 상담을 시작할 수 있습니다. 입체감과 뒷면 잠금까지 확인한 뒤 제작 가능한 범위를 안내받으세요."
  },
  {
    "question": "브로치 주문제작 크기는 어떻게 알려 주나요?",
    "answer": "가장 넓은 가로와 가장 긴 세로를 적고, 옆으로 솟는 부분은 별도로 표시하세요. 같은 크기의 종이 윤곽을 옷 위에 대어 보면 정면 비율을 비교하기 쉽습니다."
  },
  {
    "question": "브로치 전체에 작은 보석을 넣어도 되나요?",
    "answer": "보석을 넣고 싶은 범위를 도안에 표시하고 세팅에 필요한 금속과 지지 구조를 함께 상담하세요. 실제 가능한 배치는 금속 면의 폭, 보석 크기와 전체 구조를 확인한 뒤 정합니다."
  },
  {
    "question": "금 브로치 주문제작 비용은 무엇으로 정하나요?",
    "answer": "금의 순도와 예상 중량, 보석 종류·크기·수량, 도안 구현과 뒷면 잠금 부품을 함께 확인합니다. 예산과 우선순위를 전달하고 최종 사양에 따른 견적을 안내받으세요."
  },
  {
    "question": "종로 귀족 주문제작 기간은 얼마나 걸리나요?",
    "answer": "최소 3주를 기준으로 상담합니다. 도안과 소재·보석·부품, 작업 범위를 확인한 뒤 예상 수령일을 정하므로 선물일이나 행사일을 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "도안에서는 꼭 살릴 외곽과 중심 장식을 먼저 표시하세요. 작은 잎맥이나 반복 무늬는 원하는 완성 크기로 줄였을 때 어떻게 보이는지 확인합니다.",
  "가로·세로 치수와 옆으로 솟는 높이를 구분해 전달하세요. 착용할 옷의 사진을 함께 보내면 앞면 크기와 뒷면 고정 구조를 상담하기 좋습니다.",
  "견적은 금의 순도·예상 중량, 보석, 도안 구현과 잠금 부품을 함께 확인하세요. 제작은 최소 3주를 기준으로 희망 수령일을 먼저 상담합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "브로치 도안에서 무엇을 먼저 정하나요?",
    "paragraphs": [
      "처음에는 가장 마음에 드는 참고 이미지 한 장에 남기고 싶은 특징을 표시해 보세요. 꽃이라면 꽃잎의 수와 바깥 윤곽, 곡선 모티브라면 선이 굽는 방향과 겹치는 부분을 적습니다. 여러 사진을 보내는 경우에는 각각 어느 부분을 참고하면 되는지 짧게 설명해 주세요.",
      "앞면 그림에는 금속 면의 높낮이도 덧붙이는 편이 좋습니다. 평평하게 보이는 꽃잎, 가운데만 올라오는 꽃잎, 끝이 둥글게 말리는 꽃잎은 옆에서 봤을 때 형태가 달라집니다. 옆모습이 있는 참고 사진이나 간단한 측면 스케치를 함께 준비하면 원하는 입체감을 전달하기 쉽습니다.",
      "세부 무늬는 우선순위를 정하세요. 예를 들어 “전체 꽃 모양과 중심 보석은 살리고, 잎맥은 작은 크기에서 보이는 정도로 조정하고 싶다”고 적을 수 있습니다. 도안을 확정하기 전에는 유지할 부분과 조정 가능한 부분을 표시한 자료를 함께 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "브로치 크기는 가로·세로·높이로 전달하세요",
    "paragraphs": [
      "화면에서 확대해 본 도안은 실제 착용 크기를 가늠하기 어렵습니다. 원하는 가로와 세로를 적고, 그 크기의 종이 윤곽을 만들어 옷 위에 대어 보세요. 종이로 확인할 수 있는 것은 주로 정면의 크기와 비율입니다. 완성품의 무게감과 입체적인 돌출 정도는 별도로 상담합니다.",
      "가로로 긴 모양이라면 양 끝까지의 전체 폭을, 세로로 늘어지는 모양이라면 가장 아래 장식까지의 길이를 표시하세요. 가운데 보석만의 크기와 브로치 전체 크기도 각각 적어 두면 상담 과정에서 같은 부분을 가리키기 쉽습니다.",
      "다음 표처럼 도안에 치수와 확인할 질문을 붙여 보세요. 원하는 크기를 먼저 전달한 뒤, 금속을 받쳐 줄 공간과 뒷면 부품까지 고려해 조정할 수 있는 범위를 상담하는 순서입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "도안에 표시할 부분",
        "전달할 내용",
        "확인할 질문"
      ],
      "rows": [
        [
          "전체 윤곽",
          "가장 넓은 가로와 가장 긴 세로",
          "이 크기에서 꽃잎이나 곡선의 특징이 잘 보이나요?"
        ],
        [
          "입체감",
          "중앙과 가장자리의 높낮이",
          "옆에서 봤을 때 어느 부분이 가장 높아지나요?"
        ],
        [
          "보석 위치",
          "중심 한 알 또는 보석이 이어지는 범위",
          "이 공간에 맞는 보석 크기와 세팅은 무엇인가요?"
        ],
        [
          "뒷면 고정",
          "착용할 옷과 원하는 가로·세로 방향",
          "핀의 위치와 잠금 작동을 어떻게 확인하나요?"
        ]
      ]
    }
  },
  {
    "title": "보석을 넣을 위치와 금속 면을 함께 고르세요",
    "paragraphs": [
      "중심에 보석 한 알을 두면 중심 장식과 주변 금속 면의 비율을 먼저 비교할 수 있습니다. 꽃잎이나 곡선을 따라 작은 보석을 이어 넣고 싶다면 어느 선까지 장식을 이어갈지 표시하세요. 보석을 넣을 부분과 금속의 광택을 살릴 부분을 도안에 다른 표시로 남기면 요청을 전달하기 쉽습니다.",
      "GIA는 작은 보석을 브로치에 배치할 때 디자인과 구조를 함께 고려해야 한다고 설명합니다. 일부 세팅은 보석 자리를 만들면서 금속을 덜어내므로, 남는 금속이 구조를 지탱할 수 있는지 검토해야 합니다. 보석을 촘촘히 넣고 싶은 부분은 세공 가능한 범위와 금속 면의 폭을 함께 질문하세요.",
      "금의 순도와 색상, 보석의 종류·크기·수량은 견적에서 확인할 사양입니다. 참고 사진에 보이는 색과 반짝임을 설명한 뒤 실제로 사용할 소재 정보를 안내받으세요. 보유한 보석을 활용하고 싶다면 사진과 알고 있는 크기·종류를 보내고, 실물 확인이 필요한 항목을 먼저 문의합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "뒷면 핀과 잠금은 언제 상담하나요?",
    "paragraphs": [
      "앞면 도안을 정하는 단계에서 뒷면도 함께 문의하세요. 원하는 방향으로 착용할 수 있는지 확인하려면 장식의 모양과 무게 배치, 핀을 고정할 위치를 같이 살펴봐야 합니다. 평소 입는 재킷이나 코트의 사진과 브로치를 두고 싶은 위치를 알려 주세요.",
      "상담할 때는 핀이 어느 방향으로 열리는지, 잠금을 조작할 공간이 있는지, 닫았을 때 핀 끝이 어떻게 정리되는지 설명을 요청하세요. 사용하려는 부품의 형태와 제작 가능한 방식은 도안과 함께 확인합니다. 도안 검토 자료에서 뒷면을 볼 수 있는지도 물어보면 좋습니다.",
      "선물할 브로치라면 받는 분이 주로 입는 옷과 손으로 작은 잠금을 조작하기 편한지도 고려하세요. 크기와 모양이 정해진 뒤 실제 착용 방향을 다시 확인하고, 완성품 수령 때는 안내받은 방법으로 여닫아 봅니다. 옷감별 부착과 착용 점검은 연결된 브로치 착용 가이드에서 자세히 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "금 브로치 견적과 제작기간은 어떻게 확인하나요?",
    "paragraphs": [
      "도안과 크기가 정리되면 금의 순도·예상 중량, 보석 구성, 세공 범위와 잠금 부품을 기준으로 견적을 문의하세요. 중심 보석을 바꾸거나 꽃잎에 입체감을 더하는 요청이 생기면 변경된 사양과 비용을 함께 확인합니다. 처음 제시한 예산 안에서 꼭 살리고 싶은 요소를 알려 주면 조정 방향을 상담하기 좋습니다.",
      "귀족 주문제작은 최소 3주를 기준으로 상담합니다. 도안 수정, 사용할 소재와 부품, 작업 범위에 따라 수령 일정은 달라질 수 있으므로 선물일이나 행사일을 먼저 알려 주세요. 디자인 확정 시점에 예상 수령일과 진행 중 변경 요청을 전달할 방법을 함께 확인하세요."
    ],
    "bullets": [
      "금의 순도·색상과 예상 중량의 안내 기준",
      "보석의 종류·크기·수량과 세팅 범위",
      "도안 구현과 뒷면 잠금 부품의 포함 범위",
      "사양 변경 시 견적과 수령 일정 확인 방법"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 브로치 제작 상담을 준비하려면",
    "paragraphs": [
      "참고 도안, 원하는 가로·세로 크기, 소재와 색상, 보석 배치, 예산과 희망 수령일을 준비해 주세요. 착용할 옷의 사진이나 원하는 위치도 함께 전달하면 브로치의 앞면과 뒷면을 함께 상담할 수 있습니다. 준비한 자료를 바탕으로 해당 디자인의 제작 가능 여부와 확인할 사양부터 문의하세요.",
      "다음과 같이 문의 내용을 적어 볼 수 있습니다. “꽃 모양 금 브로치를 생각하고 있습니다. 첨부 도안의 꽃잎 윤곽과 중심 보석을 살리고 싶습니다. 원하는 가로·세로 크기와 착용할 재킷 사진을 함께 보냅니다. 예산과 필요한 날짜에 맞춰 제작 가능한 범위, 뒷면 잠금과 견적을 상담하고 싶습니다.” 수치와 날짜는 실제 희망 조건으로 덧붙여 주세요.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 종로 귀금속 주문제작을 알아보고 있다면 방문 전 카카오톡으로 자료를 보내거나 전화 02-766-4789로 상담 경로를 확인해 주세요. 제작 가능 범위와 최종 사양을 확인한 뒤 방문과 수령 일정을 정할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "이미지에 없는 뒷면과 잠금 구조는 상담 중 확인하고, 도안·크기·소재·보석·수령 일정을 확정한 내용을 보관하세요.",
  "보유 보석이나 기존 주얼리를 활용하려면 제품 상태와 활용 가능 범위를 실물 확인 후 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/brooch-placement-fabric-clasp-guide",
    "label": "완성한 브로치를 옷에 달 때",
    "description": "옷감과 위치, 잠금을 살펴보는 착용 방법을 확인하세요."
  },
  {
    "to": "/guide/gold-585-vs-750-selection",
    "label": "금의 순도 표기를 확인할 때",
    "description": "주문할 금 소재의 585·750 표기를 이해해 보세요."
  },
  {
    "to": "/custom",
    "label": "귀족 주문제작 과정",
    "description": "참고 자료를 준비하고 디자인과 수령 일정을 상담하세요."
  },
  {
    "to": "/contact",
    "label": "종로 귀족 위치와 사진 상담",
    "description": "매장 위치와 카카오톡·전화 문의 경로를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '금 브로치 주문제작, 도안·크기 정하기'
const gmArticleLead = '금 브로치 주문제작을 준비한다면 원하는 도안과 실제 착용할 크기를 함께 정하세요. 꽃이나 곡선의 외곽, 입체적으로 솟을 부분, 보석을 넣을 위치를 표시하고 뒷면 핀과 잠금 구조까지 상담하면 디자인 요청이 구체적이 됩니다. 귀족의 주문제작 기간은 최소 3주를 기준으로 하며, 도안과 소재·구조를 확인한 뒤 제작 가능 범위와 수령 일정을 안내합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '금 브로치 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '금 브로치 도안·크기 주문제작 상담'
const gmHeroAlt = '꽃잎 다섯 개와 작은 중심 보석으로 구성한 금빛 브로치 콘셉트와 종이 위 연필 도안'
const gmHeroCaption = '브로치 도안과 입체감을 설명하기 위해 AI로 생성한 디자인 예시입니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '보석 배치와 금속 구조에 관한 내용은 GIA의 공식 자료를 참고했습니다. 도안 표시법과 크기 비교표, 문의 예시는 상담 준비를 위한 편집 안내입니다. 제작기간과 매장 정보는 귀족의 공식 안내를 기준으로 작성했습니다.'
const gmSources = [
  {
    "label": "GIA — 작은 보석을 활용한 디자인과 구조",
    "url": "https://www.gia.edu/design-with-melee",
    "note": "브로치에 작은 보석을 배치할 때 세팅에 필요한 금속과 전체 구조를 함께 검토해야 한다는 설명을 참고했습니다."
  },
  {
    "label": "귀족 — 주문제작 상담과 제작 과정",
    "url": "https://noblessegold.com/custom",
    "note": "참고 사진·디자인·예산을 상담하고 세부 사양을 확정하는 과정과 최소 3주 제작 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 종로 매장 위치와 문의",
    "url": "https://noblessegold.com/contact",
    "note": "사진 상담 준비 항목, 매장 주소와 전화번호를 확인했습니다."
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
