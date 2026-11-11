<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/single-earring-to-pendant-remodel'
const pageTitle = '한쪽 귀걸이 목걸이 리폼, 가능할까요? | 귀족'
const pageDescription = '한쪽만 남은 귀걸이를 목걸이로 리폼하려면 장식·보석의 재사용 범위와 펜던트 연결 구조를 확인하세요. 종로 귀족에 보낼 사진, 체인 포함 견적과 최소 3주 주문제작 상담 순서를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/single-earring-to-pendant-remodel-hero.webp`
const publishedAt = '2026-11-12'
const updatedAt = ''
const faqItems = [
  {
    "question": "귀걸이 한쪽만 있어도 목걸이 리폼을 상담할 수 있나요?",
    "answer": "남은 귀걸이의 앞·옆·뒤 사진과 원하는 목걸이 모습을 보내 상담을 시작할 수 있습니다. 소재와 장식·보석의 상태, 연결 구조를 확인한 뒤 제작 가능한 범위를 정합니다."
  },
  {
    "question": "귀걸이 모양을 그대로 살려 펜던트로 만들 수 있나요?",
    "answer": "기존 장식의 상태와 연결부를 만들 공간, 침·클립 처리와 뒷면 마감을 확인해야 합니다. 꼭 남기고 싶은 윤곽과 장식을 사진에 표시하고 유지 가능한 범위를 상담하세요."
  },
  {
    "question": "귀걸이에 있는 보석만 새 목걸이에 쓸 수 있나요?",
    "answer": "보석의 종류·치수·상태와 분리 가능 범위를 확인한 뒤 새 펜던트 구성을 상담할 수 있습니다. 가지고 있는 감별서나 구매 정보를 함께 준비하면 소재 확인에 도움이 됩니다."
  },
  {
    "question": "귀걸이 목걸이 리폼 견적에는 체인도 포함되나요?",
    "answer": "체인 포함 여부를 따로 확인해야 합니다. 보유 체인을 사용할지 새 체인을 구입할지 먼저 알려 주고, 펜던트 작업과 체인 연결·조정까지 포함한 총액을 문의하세요."
  },
  {
    "question": "종로 귀족에서 새 펜던트를 제작하려면 얼마나 걸리나요?",
    "answer": "주문제작은 최소 3주를 기준으로 상담합니다. 기존 귀걸이의 활용 가능 범위와 디자인·소재·보석·체인 구성을 확인한 뒤 예상 수령일을 정하므로 필요한 날짜를 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "귀걸이 앞면 모양을 살릴지, 보석을 새 펜던트에 옮길지 희망 방향을 알려 주세요. 실제 활용 가능한 부분은 소재와 고정 상태를 확인한 뒤 정합니다.",
  "목걸이로 바꾸려면 체인을 걸 위치, 장식이 향할 방향, 피부에 닿는 뒷면까지 함께 확인해야 합니다.",
  "사진으로 상담을 시작하고 실물 확인 후 작업 범위와 비용을 정합니다. 새 펜던트를 만드는 주문제작은 최소 3주를 기준으로 수령일을 문의하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "한쪽 귀걸이를 목걸이로 바꿀 수 있나요?",
    "paragraphs": [
      "귀걸이의 장식이나 보석을 새 펜던트에 활용하는 방향으로 상담할 수 있습니다. 금속의 소재, 앞면과 뒷면의 구조, 보석을 고정한 상태를 살펴보고 가능한 작업을 정합니다. 귀걸이를 오래 보관했다면 이전 수리나 도금 이력, 눈에 띄는 손상도 함께 알려 주세요.",
      "처음에는 “이 귀걸이에서 무엇을 남기고 싶은지”를 적어 보세요. 선물받은 꽃 모양 전체가 중요한지, 가운데 보석 한 알을 간직하고 싶은지에 따라 검토할 디자인이 달라집니다. 기존 장식을 활용하는 안과 보석을 새 틀에 옮기는 안 중 가능한 방향을 확인할 수 있습니다.",
      "GIA는 기존 주얼리의 보석을 새 디자인에 활용하는 방법을 소개하며, 유산이나 오래된 주얼리는 변경 전에 가치와 보존할 부분을 확인하도록 안내합니다. 가족에게 물려받았거나 원형을 특별히 남기고 싶은 제품이라면 그 이유도 먼저 말씀해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "남길 부분에 따라 어떤 작업을 확인하나요?",
    "paragraphs": [
      "앞면 모양을 유지하고 싶다면 장식 본체를 살리면서 펜던트 연결부를 마련할 수 있는지 문의하세요. 귀걸이 침이나 클립을 어떻게 처리할지, 연결부를 붙일 공간과 뒷면 마감을 어떻게 구성할지도 함께 확인합니다.",
      "보석을 중심으로 새 디자인을 원한다면 보석의 종류·치수·상태와 분리 가능 범위를 먼저 확인합니다. GIA는 보석의 종류와 처리 정보를 아는 것이 재세팅·수리 과정에서 적절한 취급 방법을 정하는 데 도움이 된다고 설명합니다. 보유한 감별서나 구매 정보가 있다면 함께 준비해 주세요.",
      "아래 표에서 본인의 희망 방향을 골라 사진과 함께 전달해 보세요. 어떤 작업을 할지는 실물을 확인한 뒤 상담하며, 도안에서 남길 부분과 새로 만들 부분을 표시해 두면 최종 요청을 확인하기 쉽습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 방향",
        "먼저 확인할 부분",
        "상담 때 전달할 말"
      ],
      "rows": [
        [
          "귀걸이 앞면 모양 유지",
          "장식 본체의 상태와 새 연결부를 만들 위치",
          "이 윤곽과 장식을 최대한 살리고 싶어요."
        ],
        [
          "기존 보석을 새 펜던트에 활용",
          "보석의 종류·치수·상태와 분리·재세팅 가능 범위",
          "가운데 보석을 사용해 새 펜던트를 만들고 싶어요."
        ],
        [
          "여러 장식 중 일부만 활용",
          "사용할 장식과 분리 후 처리할 부품",
          "사진에 표시한 부분을 목걸이 중심에 두고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "펜던트로 달았을 때의 방향과 뒷면을 확인하세요",
    "paragraphs": [
      "귀에 붙어 있을 때 마음에 들던 모양을 목걸이에서도 어떻게 보이게 할지 정하세요. 물방울이나 길쭉한 장식은 위아래를, 비대칭 장식은 정면에서 보여 주고 싶은 방향을 사진에 표시할 수 있습니다. 체인을 거는 위치를 정할 때 이 방향을 함께 전달합니다.",
      "목걸이로 사용하면 장식의 뒷면이 피부나 옷에 닿을 수 있으므로, 기존 침·클립을 처리한 자리와 돌출 부분의 마감도 확인하세요. 보석 뒷부분의 높이, 장식이 흔들리거나 기울어지는 정도는 상담 중 확인할 항목입니다. 완성품 수령 때는 실제로 걸어 보고 원하는 방향과 착용감이 맞는지 살펴보세요.",
      "사용할 체인이 있다면 함께 보여 주세요. 체인 몸통의 굵기와 끝부분을 보고 새 펜던트에 연결할 방식을 상담합니다. 펜던트를 체인 위에서 움직이게 할지, 양옆에 체인을 연결하는 구성을 원하는지도 참고 사진으로 알려 주면 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "귀걸이 목걸이 리폼 비용은 무엇을 확인하나요?",
    "paragraphs": [
      "견적에는 기존 장식을 활용하는 작업, 보석을 옮기는 작업, 새 금속과 연결 부품, 마감 중 어느 범위가 포함되는지 확인하세요. 남은 귀걸이가 작아도 새 구조를 만드는 과정이 필요한지 살펴봐야 합니다. 사용할 부품과 작업 범위를 정한 뒤 최종 금액을 안내받습니다.",
      "목걸이 체인을 새로 구입할 예정이라면 펜던트 작업비와 체인 포함 총액을 함께 물어보세요. 가지고 있는 체인을 쓸 때는 연결이나 조정 작업이 필요한지도 확인합니다. 귀걸이에 남는 금속이나 부품이 생긴다면 반환 또는 처리 방법도 작업 전에 상의하세요.",
      "예산을 먼저 알려 주고 꼭 남기고 싶은 장식이나 보석을 지정해 보세요. 디자인 확정 과정에서 새 금속의 순도·색상, 보석 배치나 체인 구성이 바뀌면 변경된 총액을 다시 확인합니다. 귀족 주문제작은 최소 3주를 기준으로 하며, 제품 상태와 최종 사양을 확인한 뒤 수령 일정을 상담합니다."
    ],
    "bullets": [
      "기존 장식 활용과 보석 탈착·재세팅 중 실제 진행할 작업",
      "새 펜던트 본체·고리·마감에 포함되는 범위",
      "보유 체인 연결 또는 새 체인 구매의 포함 여부",
      "분리한 부품의 처리 방법과 최종 금액·예상 수령일"
    ],
    "table": null
  },
  {
    "title": "문의할 때 어떤 사진을 보내면 좋나요?",
    "paragraphs": [
      "귀걸이 전체를 정면에서 촬영하고, 옆면 높이와 뒷면 침·클립이 보이는 사진을 더해 주세요. 소재 각인을 읽을 수 있다면 가까이 촬영합니다. 보석이 빠졌거나 장식이 휘어진 부분이 있다면 그 위치도 함께 보여 주세요.",
      "원하는 목걸이 참고 사진에는 남기고 싶은 모양을 표시하세요. 기존 체인을 사용할 예정이면 체인 전체와 양쪽 끝부분도 찍어 주세요. 아직 목걸이 디자인이나 소재를 정하지 못했다면 현재 가진 귀걸이 사진부터 보내고 가능한 구성과 추가로 필요한 정보를 문의할 수 있습니다."
    ],
    "bullets": [
      "귀걸이 앞면·옆면·뒷면과 확인 가능한 소재 표시",
      "활용하고 싶은 장식·보석에 표시한 사진",
      "사용할 체인 사진 또는 새 체인 구매 희망 여부",
      "원하는 목걸이 느낌, 예산 범위와 필요한 날짜"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 사진으로 리폼 상담하기",
    "paragraphs": [
      "한쪽만 남아 보관 중인 귀걸이가 있다면 아래 카톡 상담으로 사진과 희망 방향을 보내 주세요. 먼저 제작 가능 범위를 확인하고, 실물로 살펴볼 부분과 방문 준비사항을 안내받을 수 있습니다. 문의 양식에서는 주문제작 유형과 이 글의 리폼 주제가 함께 전달됩니다.",
      "문의 내용은 이렇게 정리할 수 있습니다. “한쪽 남은 귀걸이를 목걸이로 리폼하고 싶습니다. 앞면 장식은 살리고 싶고, 현재 가지고 있는 체인을 사용할 예정입니다. 귀걸이 앞·옆·뒤와 체인 사진을 보냅니다. 예산은 ○○원 정도이며 ○월 ○일에 받고 싶습니다. 가능한 제작 방향과 견적 확인에 필요한 내용을 안내해 주세요.” 체인이 없거나 보석만 활용하고 싶다면 해당 부분을 바꾸어 보내 주세요.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 전화 02-766-4789 또는 카카오톡으로 상담할 수 있습니다. 새 펜던트를 제작하는 일정은 최소 3주를 기준으로 필요한 날짜를 먼저 알려 주시고, 최종 사양 확인 후 예상 수령일을 정해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "귀걸이의 침을 자르거나 보석을 직접 분리하기 전에 현재 상태 그대로 사진 상담을 받아 보세요. 구조와 활용할 부분을 확인하는 데 도움이 됩니다.",
  "재사용할 장식·보석, 새로 만들 부분, 비용과 수령일은 작업 전에 함께 확인하고 상담 내용을 보관하세요."
]
const relatedLinks = [
  {
    "to": "/guide/single-earring-reproduction-cost",
    "label": "귀걸이를 다시 한 쌍으로 맞추고 싶다면",
    "description": "남은 한쪽을 기준으로 새 귀걸이를 제작할 때의 견적 항목을 확인하세요."
  },
  {
    "to": "/guide/gold-jewelry-remodeling-cost",
    "label": "보유 금제품의 리폼 견적을 더 알아보려면",
    "description": "기존 소재와 새 디자인에 따라 확인할 비용 항목을 살펴보세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "사용할 체인과 펜던트를 연결하려면",
    "description": "체인 끝부분과 펜던트 고리의 호환을 확인할 기준입니다."
  },
  {
    "to": "/custom",
    "label": "귀족 리폼·주문제작 안내",
    "description": "디자인과 예산을 전달하고 제작 가능 범위를 상담하세요."
  },
  {
    "to": "/contact",
    "label": "종로 매장 위치와 문의",
    "description": "방문 전 사진을 보내고 상담에 필요한 내용을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '한쪽 귀걸이 목걸이 리폼, 가능할까요?'
const gmArticleLead = '한쪽만 남은 귀걸이는 소재와 장식·보석 상태를 확인한 뒤 목걸이 리폼을 검토할 수 있습니다. 먼저 남기고 싶은 부분을 정하고, 펜던트로 매달았을 때의 방향과 뒷면, 체인 연결 방식을 상담하세요. 귀족에 귀걸이 앞·옆·뒤 사진과 원하는 목걸이 모습을 보내면 제작 가능 범위와 견적 확인에 필요한 내용을 안내받을 수 있습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '귀걸이 목걸이 리폼'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '한쪽 귀걸이 목걸이 리폼'
const gmHeroAlt = '타원형 보석의 금빛 귀걸이 한쪽과 같은 모티브의 펜던트 목걸이를 나란히 놓은 디자인 예시'
const gmHeroCaption = '귀걸이와 펜던트의 구성을 설명하기 위해 AI로 생성한 가상 디자인 예시입니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '보유 주얼리의 보석 활용과 변경 전 확인 원칙은 GIA 자료를 참고했습니다. 사진 준비 항목과 문의 예시는 귀걸이를 목걸이로 활용하려는 독자를 위한 편집 안내입니다. 귀족의 상담 방식·최소 3주 제작 기준·매장 정보는 공식 안내를 확인했습니다.'
const gmSources = [
  {
    "label": "GIA — 보유 주얼리를 새 디자인으로 활용하는 방법",
    "url": "https://4cs.gia.edu/en-us/blog/repurpose-heirloom-jewelry/",
    "note": "기존 보석을 새 주얼리에 활용하는 접근과 변경 전 가치·소재 정보를 확인하는 원칙을 참고했습니다."
  },
  {
    "label": "귀족 — 리폼과 주문제작 상담",
    "url": "https://noblessegold.com/custom",
    "note": "제품의 소재와 상태에 따른 활용 가능 범위, 디자인·견적 상담과 최소 3주 제작 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 사진 상담과 종로 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "사진·희망 소재·예산·수령일을 준비하는 상담 안내와 주소·전화번호를 확인했습니다."
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
