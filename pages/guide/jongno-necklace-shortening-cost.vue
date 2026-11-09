<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-necklace-shortening-cost'
const pageTitle = '종로 목걸이 줄이기 비용, 견적 확인법 | 귀족'
const pageDescription = '종로에서 목걸이 길이를 줄이려면 줄일 길이뿐 아니라 잠금장치 재연결과 부품 교체 범위를 함께 확인하세요. 완성 길이 전달법, 견적 항목, 남는 체인 처리와 수령 점검을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-necklace-shortening-cost-hero.webp`
const publishedAt = '2026-11-10'
const updatedAt = ''
const faqItems = [
  {
    "question": "종로 목걸이 줄이기 비용은 몇 cm를 줄이는지로 정하나요?",
    "answer": "줄일 길이만으로 정하기 어렵습니다. 체인 구조, 끝부분 재연결, 기존 부품 사용 여부와 추가 작업 범위를 확인한 뒤 견적을 상담하세요."
  },
  {
    "question": "목걸이를 1cm만 줄여도 작업비가 필요한가요?",
    "answer": "짧게 줄이더라도 끝부분 연결이나 마감이 필요한지 확인해야 합니다. 작업비 유무와 금액은 제품 상태와 진행 범위를 확인한 뒤 안내받으세요."
  },
  {
    "question": "잠금장치를 포함해 목걸이 길이를 알려야 하나요?",
    "answer": "현재 길이와 원하는 완성 길이를 같은 기준으로 전달하는 것이 중요합니다. 잠금장치 포함 여부와 조절 고리의 기준 위치를 함께 적고, 작업 전 측정 기준을 맞추세요."
  },
  {
    "question": "줄이고 남는 금 체인은 작업비에서 빼 주나요?",
    "answer": "자동 차감을 전제로 하면 안 됩니다. 남는 체인이나 부품의 반환·처리 방법과 별도 정산 여부를 작업 전에 문의하고 최종 비용을 확인하세요."
  },
  {
    "question": "종로에 방문한 날 목걸이 길이를 바로 줄일 수 있나요?",
    "answer": "당일 완료 여부는 제품 구조와 상태, 필요한 부품과 작업 일정에 따라 확인해야 합니다. 귀족에 전체와 끝부분 사진, 원하는 완성 길이와 수령 희망일을 먼저 보내 상담하세요."
  }
]
const quickAnswers = [
  "견적은 길이 조정 작업, 연결 부품 교체, 추가로 요청한 마감 작업을 나누어 확인하세요. 같은 길이를 줄여도 필요한 작업이 다를 수 있습니다.",
  "현재 길이와 원하는 완성 길이를 같은 기준으로 전달하세요. 잠금장치를 포함하는지, 조절 고리가 있다면 어느 위치를 기준으로 하는지도 함께 적습니다.",
  "자르고 남는 체인의 반환·보관 방법은 작업 전에 문의하세요. 남은 금속이 있다고 해서 작업비에서 자동으로 차감되는 것은 아닙니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "조금만 줄여도 비용이 생기는 이유는 무엇인가요?",
    "paragraphs": [
      "목걸이 길이 조정은 남는 부분을 덜어내는 데서 끝나는 요청이 아닙니다. 원하는 길이에서 다시 잠글 수 있도록 체인 끝과 연결 부품을 정리해야 하는지 확인하는 과정이 포함됩니다. 따라서 줄이는 길이가 짧다는 이유만으로 간단한 작업이나 일정한 비용을 예상하기는 어렵습니다.",
      "Stuller의 체인 부품 안내는 잠금장치, 연결 고리, 체인 끝 부품의 역할을 구분합니다. 연결 고리를 직접 달기 어려운 구조에는 별도 끝 부품이 쓰이기도 합니다. 이 차이를 바탕으로 기존 부품을 계속 쓸 수 있는지, 새 부품이 필요한지를 물어보면 견적 내용을 이해하기 쉽습니다.",
      "Jewelers of America 역시 제품 평가 후 수리 비용과 시간을 안내받는 절차를 설명합니다. 귀족의 길이 조정 상담에서도 사진만 보고 정액이나 당일 완료를 약속하기보다, 실제 구조와 상태를 확인한 뒤 가능한 작업을 정합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "목걸이 줄이기 견적에서 어떤 항목을 확인하나요?",
    "paragraphs": [
      "상담받은 총액이 어떤 요청을 포함하는지 확인하세요. 길이만 줄이려는지, 잠금장치가 불편해 교체까지 원하는지에 따라 상담 범위가 달라집니다. 기존에 마모되거나 손상된 부위가 있다면 길이 조정과 함께 처리해야 하는지도 따로 물어보세요.",
      "아래 표는 가격표가 아니라 견적을 확인하는 질문표입니다. 모든 작업에 부품 교체나 광택이 필요한 것은 아닙니다. 추가 작업을 제안받았다면 그 이유와 비용을 확인하고 진행 범위를 정하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 항목",
        "견적에서 구분할 내용",
        "상담 질문"
      ],
      "rows": [
        [
          "길이 조정과 재연결",
          "기존 체인을 줄이고 끝부분을 연결하는 범위",
          "원하는 완성 길이까지 조정하는 작업이 포함되나요?"
        ],
        [
          "잠금장치·연결 부품",
          "기존 부품 사용 여부와 새 부품이 필요한 이유",
          "교체가 필요하다면 어떤 부품이며 비용은 얼마인가요?"
        ],
        [
          "장식 위치와 균형",
          "고정 펜던트나 반복 장식의 위치 조정 여부",
          "줄인 뒤에도 장식과 잠금 위치가 원하는 대로 놓이나요?"
        ],
        [
          "추가 마감·점검",
          "요청한 세척·광택 등 추가 작업의 제공 여부와 범위",
          "길이 조정 외에 포함되거나 별도인 작업이 있나요?"
        ]
      ]
    }
  },
  {
    "title": "몇 cm 자를지보다 완성 길이를 먼저 정하세요",
    "paragraphs": [
      "“3cm 줄여 주세요”라는 말만 전달하면 현재 길이를 어디서부터 어디까지 재었는지 다시 확인해야 할 수 있습니다. 목걸이를 무리하게 당기지 않고 펼친 뒤, 잠금장치를 포함한 현재 길이와 원하는 완성 길이를 함께 적어 주세요. 조절 고리가 여러 개라면 가장 길게 잠근 상태인지, 평소 사용하는 고리 기준인지도 표시합니다.",
      "예를 들어 같은 측정 기준에서 현재 45cm이고 완성 길이 42cm를 원한다면 두 수치를 함께 전달하세요. 이는 상담 예시이며 실제 절단할 체인의 길이를 지시하는 값은 아닙니다. 연결 부품을 바꾸는 경우까지 포함해 최종 길이가 맞는지 작업자가 확인해야 합니다.",
      "펜던트가 체인 위를 움직이는 목걸이인지, 장식 양옆에 체인이 고정된 목걸이인지도 알려 주세요. 고정형이나 장식이 일정 간격으로 이어지는 디자인은 어느 부분을 줄일지에 따라 중심과 좌우 배치가 달라질 수 있으므로, 장식을 유지하고 싶은 위치까지 상담하는 편이 좋습니다. 착용 길이 자체를 고르는 방법은 아래의 목걸이 길이 선택 글에서 이어서 볼 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "남는 체인과 수령 후 확인은 어떻게 하나요?",
    "paragraphs": [
      "작업 전에 잘라낸 체인이나 분리한 부품이 생기는지, 생긴다면 어떤 방식으로 돌려받거나 처리할 수 있는지 문의하세요. 남은 부분을 나중에 쓰고 싶다면 그 의사도 먼저 전달합니다. 다만 짧은 조각을 보관한다고 해서 이후 연장 작업에 그대로 사용할 수 있다고 확정할 수는 없습니다.",
      "남은 금속의 반환과 작업비 계산은 구분해 물어보세요. 금을 덜어냈으니 작업비가 자동으로 줄어든다고 가정하면 실제 안내와 차이가 생길 수 있습니다. 반환 가능 범위, 별도 정산 여부와 최종 결제 금액은 매장과 작업 전에 확인할 내용입니다.",
      "수령할 때는 상담한 기준으로 완성 길이를 다시 확인하고 잠금이 제대로 되는지 살펴보세요. 고정 장식이 있다면 착용했을 때의 중심과 좌우 배치도 함께 확인합니다. 연결부가 거슬리거나 요청한 길이와 다르게 느껴진다면 현장에서 어떤 부분이 다른지 설명하고 안내받는 것이 좋습니다."
    ],
    "bullets": [
      "완성 길이와 측정 기준이 상담 내용과 맞는지",
      "잠금장치와 연결부가 자연스럽게 작동하는지",
      "고정 펜던트와 장식이 원하는 위치에 놓이는지",
      "반환하기로 한 체인·부품과 최종 비용을 확인했는지"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 길이 조정 비용을 문의하려면",
    "paragraphs": [
      "목걸이 전체, 잠금장치와 양쪽 끝, 고정 장식이 보이는 사진을 준비해 주세요. 알고 있는 소재 정보와 현재 길이, 원하는 완성 길이, 잠금장치 교체를 함께 원하는지 적으면 길이 조정에 필요한 상담을 시작하기 쉽습니다. 다른 곳에서 구매했거나 이전에 수리했다면 그 내용도 함께 알려 주세요.",
      "문의 예시: “가지고 있는 목걸이를 줄이고 싶습니다. 잠금장치를 포함해 현재 약 45cm이며 완성 길이는 약 42cm를 생각하고 있습니다. 잠금장치는 계속 쓰고 싶고, 남는 체인을 받을 수 있는지도 궁금합니다. 전체와 끝부분 사진을 보내니 가능한 작업과 견적 확인 방법을 알려 주세요.” 수치는 제품에 맞게 바꾸고, 사진에 보이지 않는 상태는 실물로 확인합니다.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 종로3가 귀금속 수리를 알아보고 있다면 방문 전 전화 02-766-4789 또는 카카오톡으로 제품 사진과 희망 수령일을 보내 주세요. 비용과 완료 일정은 제품 확인 후 상담합니다. 새 목걸이 주문제작으로 방향을 바꾸는 경우에는 최소 3주를 기준으로 일정을 문의해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "견적을 받기 전에 체인을 직접 자르거나 연결 고리를 벌리지 마세요. 원하는 길이와 실제 조정 가능한 위치를 먼저 상담하세요.",
  "이 글의 수치와 질문표는 상담 준비용 예시입니다. 특정 작업의 정액 요금, 당일 완료, 남은 금속의 자동 차감이나 이후 재사용을 약속하는 내용은 아닙니다."
]
const relatedLinks = [
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "목걸이 완성 길이를 아직 못 정했다면",
    "description": "길이별 착용 위치와 펜던트를 고려해 원하는 길이를 선택하세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "길이 조정 대신 체인 교체가 필요하다면",
    "description": "새 체인과 기존 펜던트의 호환을 확인할 기준을 살펴보세요."
  },
  {
    "to": "/guide/necklace-bracelet-chain-repair",
    "label": "체인이 끊어졌거나 연결부가 손상됐다면",
    "description": "길이 변경과 별도로 손상 위치에 따른 수리 상담을 준비하세요."
  },
  {
    "to": "/repair",
    "label": "종로 귀족 수리 상담 안내",
    "description": "제품 사진을 보내 가능한 작업과 비용·일정을 문의하세요."
  },
  {
    "to": "/contact",
    "label": "귀족 매장 위치와 연락처",
    "description": "종로 방문 전 상담 경로와 매장 위치를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '종로 목걸이 줄이기 비용, 견적 확인법'
const gmArticleLead = '종로 목걸이 줄이기 비용은 몇 cm를 줄이는지만으로 정하기 어렵습니다. 기존 체인 끝을 다시 연결하는 범위, 잠금장치와 연결 부품의 상태, 장식 위치 조정 여부를 함께 봐야 합니다. 상담할 때는 “몇 cm 잘라 주세요”보다 “작업 후 전체 길이를 얼마로 맞추고 싶은지”를 먼저 알려 주세요. 사진으로 방향을 상담한 뒤 실물 확인을 거쳐 최종 비용과 일정을 정하는 순서입니다.'
const gmArticleCategory = '비용'
const gmArticleKeyword = '종로 목걸이 줄이기 비용'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '목걸이 길이 줄이기 비용 상담'
const gmHeroAlt = '아이보리 트레이에 펼쳐 놓은 금빛 체인 목걸이의 잠금장치와 양쪽 끝, 타원형 펜던트'
const gmHeroCaption = '목걸이 길이 조정 상담을 설명하기 위한 AI 생성 이미지입니다. 실제 귀족 제품이나 작업 전후 사진은 아닙니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '수리 전 견적 확인은 Jewelers of America, 체인 연결 부품의 구분은 Stuller의 공식 자료를 참고했습니다. 완성 길이 전달 예시와 견적 질문표는 상담 준비를 위한 편집 안내입니다. 귀족의 비용·일정·작업 가능 범위와 남은 체인 처리는 개별 상담으로 확인합니다.'
const gmSources = [
  {
    "label": "Jewelers of America — 주얼리 수리 전 견적 확인",
    "url": "https://www.jewelers.org/find-a-jeweler/repair-care/repair/",
    "note": "작업 전 제품을 평가해 비용과 시간을 안내하고, 체인 구조에 따라 작업 난이도가 달라질 수 있다는 소비자 안내를 참고했습니다."
  },
  {
    "label": "Stuller — 체인 연결 부품의 구조",
    "url": "https://www.stuller.com/benchjeweler/resources/bencharticles/view/chain-repair-essentials/",
    "note": "잠금장치·연결 고리·체인 끝 부품은 역할과 연결 구조가 다르다는 기술 자료를 확인했습니다."
  },
  {
    "label": "귀족 — 종로 귀금속 수리 상담",
    "url": "https://noblessegold.com/repair",
    "note": "제품 전체와 연결부 사진을 먼저 확인하고 실물 상태에 따라 작업 범위·비용·일정을 상담하는 공식 안내입니다."
  },
  {
    "label": "귀족 — 문의와 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "종로 매장 주소와 전화·카카오톡 상담 경로, 새 주문제작 최소 3주 기준을 확인했습니다."
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
