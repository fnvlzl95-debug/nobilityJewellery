<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/thin-gold-ring-shank-repair'
const pageTitle = '금반지 얇아짐, 밴드 보강 수리 상담 기준 | 귀족'
const pageDescription = '금반지 손바닥 쪽이 얇아지거나 반복해서 휘면 밴드의 남은 두께와 손상 범위를 확인하세요. 보강·부분 교체 상담 기준, 견적과 사진 준비, 종로 귀족 문의 방법을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/thin-gold-ring-shank-repair-hero.webp`
const publishedAt = '2026-11-15'
const updatedAt = ''
const faqItems = [
  {
    "question": "금반지 아래쪽이 얇아져도 보강할 수 있나요?",
    "answer": "남은 금속과 마모 구간, 반지 소재·구조를 확인한 뒤 보강이나 부분 밴드 교체를 검토할 수 있습니다. 전체·아래쪽·옆면 사진을 보내고 실물 점검이 필요한 부분을 상담하세요."
  },
  {
    "question": "반지가 끊어진 곳만 연결하면 되나요?",
    "answer": "끊어진 위치와 주변 밴드가 얼마나 남아 있는지 함께 확인해야 합니다. 얇아진 구간이 넓거나 이전 수리 부근에 손상이 있다면 작업 범위를 추가로 검토할 수 있습니다."
  },
  {
    "question": "밴드 보강과 반지 사이즈 조절을 함께 문의해도 되나요?",
    "answer": "현재 착용감과 원하는 호수를 함께 알려 주세요. 수리할 구간과 완성 후 밴드 형태를 확인한 뒤 사이즈 조절 가능 범위와 포함 비용을 상담합니다."
  },
  {
    "question": "안쪽 각인과 윗장식을 살릴 수 있나요?",
    "answer": "수리할 구간과 각인·장식 위치의 관계를 확인해야 합니다. 꼭 남기고 싶은 부분을 사진에 표시하고 보존 가능한 범위와 추가 작업 여부를 미리 상담하세요."
  },
  {
    "question": "반지 보강 수리는 당일 받을 수 있나요?",
    "answer": "완료 일정은 남은 밴드 상태, 추가 금속과 보석 작업, 마감 범위를 확인한 뒤 안내합니다. 필요한 날짜를 먼저 알려 주세요. 새 반지 주문제작으로 진행하는 경우에는 최소 3주를 기준으로 상담합니다."
  }
]
const quickAnswers = [
  "손바닥 쪽 밴드의 두께와 폭, 얇아진 구간의 길이를 함께 확인하세요. 반지 정면 사진에 아래쪽과 옆면 사진을 더하면 상태를 전달하기 좋습니다.",
  "보강·부분 밴드 교체의 가능 범위는 소재와 남은 금속, 보석·각인 위치를 확인한 뒤 정합니다. 이전에 늘리기·줄이기·땜을 했다면 함께 알려 주세요.",
  "견적에는 추가 금속과 작업 범위, 호수 조절·각인·마감의 포함 여부를 확인하세요. 수리 기간은 실물 점검 후 안내하며, 새 반지 주문제작으로 진행하면 최소 3주를 기준으로 상담합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "금반지 아래쪽이 얇아졌다면 무엇을 확인하나요?",
    "paragraphs": [
      "손가락을 감싸는 반지의 고리 부분을 밴드 또는 생크라고 부릅니다. 반지를 벗어 옆면에서 보았을 때 손바닥에 닿는 아래쪽이 얼마나 남아 있는지, 양옆으로 이어지는 부분과 비교해 보세요. 원래 아래로 갈수록 가늘어지는 디자인인지 살펴볼 수 있도록 구매 당시 사진이 있으면 함께 준비합니다.",
      "Stuller의 반지 수리 안내는 오랜 착용으로 밴드의 가장 아래쪽이 얇아질 수 있다고 설명합니다. “아래쪽이 가늘어졌다”, “같은 곳이 다시 휜다”, “작은 틈이 보인다”처럼 현재 보이는 변화를 적어 주세요. 사진을 보고 마모의 깊이나 수리 방식을 확정하기 어려운 부분은 실물로 확인합니다.",
      "밴드가 얇아 보이는 상태와 표면 색이 달라진 상태를 각각 보여 주세요. 색 변화가 함께 있으면 소재 표시와 도금 이력도 확인할 수 있습니다. 손으로 눌러 강도를 시험하거나 벌어진 부위를 맞추기 전에 현재 모양을 그대로 촬영하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 보강과 부분 밴드 교체는 어떻게 상담하나요?",
    "paragraphs": [
      "반지 보강을 문의할 때는 금속이 부족해 보이는 위치와 범위를 먼저 알려 주세요. 작업자가 남은 밴드 상태와 연결할 부분을 살펴보고 가능한 수리 방향을 검토합니다. 반지의 윗장식과 보석, 안쪽 각인 중 꼭 보존하고 싶은 부분도 함께 표시하세요.",
      "마모된 구간을 새 밴드 부분으로 바꾸는 수리 방식도 있습니다. Stuller는 이를 리샹킹이라고 소개하며, 닳은 금속 구간을 제거하고 부분 밴드를 연결한 뒤 기존 반지와 어울리도록 마감하는 원리를 설명합니다. 본인 반지에도 이 방식이 맞는지는 소재·구조와 손상 범위를 확인해 상담해야 합니다.",
      "“금을 조금 더 붙여 주세요”라는 요청에 더해 어느 구간을 손볼지, 새 금속이 들어갈 범위와 완성 후 안쪽 모양이 어떻게 달라질지 물어보세요. 밴드 두께가 달라지면 원하는 호수와 착용감도 다시 확인합니다. 보석이나 무늬가 밴드 아래까지 이어진 디자인은 해당 부분의 처리 가능 범위를 함께 검토합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "현재 확인한 상태",
        "실물에서 확인할 부분",
        "상담할 질문"
      ],
      "rows": [
        [
          "아래쪽 일부가 유난히 얇음",
          "얇아진 구간과 양옆에 남은 금속",
          "이 구간의 보강이나 부분 교체를 검토할 수 있나요?"
        ],
        [
          "수리한 부근이 다시 휘거나 벌어짐",
          "이전 연결 부위와 주변 밴드 상태",
          "이전 수리 이력을 바탕으로 작업 범위를 확인해 주실 수 있나요?"
        ],
        [
          "보석·무늬가 밴드까지 이어짐",
          "손상 위치와 장식·세팅의 관계",
          "보존할 부분과 새로 손볼 부분을 함께 정할 수 있나요?"
        ],
        [
          "안쪽에 남기고 싶은 문구가 있음",
          "문구 위치와 수리할 구간",
          "각인 보존 가능 범위와 추가 작업을 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "사이즈와 안쪽 각인도 함께 알려 주세요",
    "paragraphs": [
      "현재 반지가 잘 맞는지, 헐겁거나 조이는지 먼저 적어 주세요. 보강과 함께 호수 조절을 원한다면 착용할 손가락과 원하는 느낌까지 전달합니다. 사진만으로 최종 호수를 정하기보다 실물 상담에서 완성 후 밴드 형태에 맞춰 확인하는 것이 좋습니다.",
      "안쪽 문구가 수리할 위치와 겹친다면 보존할 수 있는 부분과 다시 각인할 수 있는지를 상담하세요. 14K·18K 등의 소재 표시도 읽을 수 있도록 촬영합니다. 소재를 모르면 알고 있는 구매 정보나 이전 수리 내용을 함께 보내면 됩니다.",
      "과거에 사이즈를 늘리거나 줄였는지, 끊어진 부분을 연결했는지 알려 주세요. 정확한 작업 방식이 기억나지 않아도 언제 어느 부분을 손봤는지 전달하면 점검할 위치를 정하는 데 도움이 됩니다. 예전 사진과 지금 사진이 있으면 변화를 설명하기에도 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 보강 수리 비용과 기간은 무엇에 따라 달라지나요?",
    "paragraphs": [
      "비용 상담에서는 추가할 금속의 소재와 양, 손볼 구간, 밴드 연결과 마감 작업을 확인합니다. 보석 점검이나 탈착·재세팅이 필요한지, 사이즈 조절과 각인 작업을 함께 진행하는지에 따라 확인할 항목이 늘어날 수 있습니다. 견적에 포함된 범위를 정한 뒤 총액을 비교하세요.",
      "Jewelers of America는 제품을 평가한 뒤 수리 비용과 시간을 안내하고 작업 전에 동의를 받는 절차를 설명합니다. 귀족도 최종 비용과 완료 일정은 제품의 소재·보석·손상 상태와 필요한 부품을 확인한 뒤 상담합니다. 방문 전에는 사진과 함께 원하는 날짜를 알려 주세요.",
      "기존 반지 수리의 완료일은 작업 범위를 확인한 뒤 정합니다. 상담 결과 새 반지를 주문제작하는 방향으로 진행한다면 귀족의 제작기간은 최소 3주를 기준으로 합니다. 반지를 맡기기 전에 진행할 작업, 최종 금액, 예상 수령일과 분리된 부품의 처리 방법을 함께 확인하세요."
    ],
    "bullets": [
      "보강 또는 교체할 밴드 구간과 추가 금속",
      "보석 점검·탈착·재세팅 필요 여부",
      "호수 조절·각인·표면 마감의 포함 범위",
      "실물 확인 후 최종 금액과 완료 일정"
    ],
    "table": null
  },
  {
    "title": "종로 방문 전 사진으로 보강 가능 범위 문의하기",
    "paragraphs": [
      "반지 전체가 보이는 사진 한 장과 손바닥 쪽 밴드, 옆면 두께, 안쪽 각인 사진을 준비하세요. 균열처럼 보이는 부분이나 이전에 연결한 자리가 있으면 해당 위치를 표시합니다. 보석이 있는 반지는 윗장식도 함께 보여 주세요.",
      "카톡에서는 이렇게 문의할 수 있습니다. “오래 착용한 금반지의 손바닥 쪽이 얇아졌습니다. 전체·아래쪽·옆면 사진을 보냅니다. 예전에 ○○ 부분을 수리한 적이 있고, 윗장식과 안쪽 문구를 최대한 남기고 싶습니다. 보강 가능한 범위와 견적을 확인하려면 무엇을 준비하면 될까요? 희망 수령일은 ○월 ○일입니다.” 이전 수리 이력이 없거나 각인이 없다면 해당 항목을 빼고 보내세요.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 카카오톡 또는 전화 02-766-4789로 사진 상담과 방문 준비사항을 문의할 수 있습니다. 아래 상담 내용 복사 버튼으로 항목을 복사해 현재 반지 상태와 희망일을 적어 보내 주세요."
    ],
    "bullets": [
      "반지 전체와 손바닥 쪽 밴드 사진",
      "옆면 두께와 안쪽 소재 표시·문구 사진",
      "이전 수리 이력과 현재 착용감",
      "남기고 싶은 장식, 예산 범위와 희망 수령일"
    ],
    "table": null
  },
  {
    "title": "수령할 때는 수리한 구간과 착용감을 확인하세요",
    "paragraphs": [
      "수리 후에는 상담했던 밴드 구간을 함께 확인하세요. 손가락에 닿는 안쪽이 매끄러운지, 주변 금속과 이어지는 부분의 모양과 색상·광택이 자연스러운지 살펴봅니다. 보존하기로 한 각인과 무늬도 확인해 주세요.",
      "Jewelers of America는 수리 후 확인할 항목으로 금속 표면의 마감과 보석의 안정적인 고정을 제시합니다. 보석이 있는 반지는 점검한 내용을 안내받고, 실제로 착용해 호수와 손가락에 닿는 느낌을 확인하세요. 사용 중 다시 같은 부위가 불편해지면 언제부터 어떤 변화가 생겼는지 알려 추가 점검을 상담합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "얇아진 밴드를 직접 누르거나 벌려 보지 마세요. 균열·끊어짐이 보이면 착용을 멈추고 분리된 조각과 함께 보관해 점검을 받으세요.",
  "수리할 범위, 보존할 장식·각인, 금액과 예상 수령일을 함께 확인하고 상담 내용을 보관하세요."
]
const relatedLinks = [
  {
    "to": "/guide/gold-ring-repair-cost",
    "label": "금반지 수리 작업별 비용 기준",
    "description": "보강 외에 함께 진행할 수리 항목과 견적 범위를 확인하세요."
  },
  {
    "to": "/guide/jongno-ring-size-repair",
    "label": "반지 사이즈 조절 상담 준비",
    "description": "현재 착용감과 늘리기·줄이기 요청을 함께 정리하세요."
  },
  {
    "to": "/guide/ring-personal-engraving-removal",
    "label": "안쪽 각인과 밴드 두께 확인",
    "description": "문구를 바꾸고 싶을 때 각인 깊이와 남은 두께를 살펴보세요."
  },
  {
    "to": "/repair",
    "label": "귀족 수리·AS 사진 상담",
    "description": "제품 상태를 보내 수리 가능 범위와 방문 준비를 문의하세요."
  },
  {
    "to": "/contact",
    "label": "종로 귀족 위치와 문의하기",
    "description": "사진·예산·희망일을 준비해 상담을 시작하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '금반지 얇아짐, 밴드 보강 수리 상담 기준'
const gmArticleLead = '금반지의 손바닥 쪽 밴드가 예전보다 얇아졌다면 남아 있는 금속 두께와 마모 범위부터 확인하세요. 얇아진 부분과 주변 밴드 상태에 따라 보강이나 부분 교체를 검토할 수 있습니다. 귀족에 반지 전체·아래쪽·옆면 사진과 이전 수리 이력을 보내면 실물 점검 전에 준비할 내용을 안내받을 수 있습니다.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '반지 보강 수리'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '얇아진 금반지 밴드 보강'
const gmHeroAlt = '손바닥 쪽 밴드가 가늘어진 금빛 보석 반지를 옆면에서 살펴보는 가상 예시'
const gmHeroCaption = '밴드 아래쪽의 두께와 마모 확인 위치를 설명하기 위해 AI로 생성한 가상 반지 이미지입니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '밴드 마모와 부분 교체의 일반 원리는 Stuller, 수리 전 견적 확인과 수령 점검 기준은 Jewelers of America 자료를 참고했습니다. 사진 준비와 문의 예시는 독자의 상담을 돕기 위해 작성했습니다. 귀족의 실제 작업 범위와 비용·일정은 제품 확인 후 안내합니다.'
const gmSources = [
  {
    "label": "Stuller — 반지 밴드 교체와 주요 수리",
    "url": "https://www.stuller.com/benchjeweler/resources/bencharticles/view/top-4-most-common-ring-repairs/",
    "note": "Reshanking 항목에서 오래 착용한 반지의 아래쪽 밴드 마모와 부분 밴드 교체의 일반 원리를 확인했습니다."
  },
  {
    "label": "Jewelers of America — 주얼리 수리 안내",
    "url": "https://www.jewelers.org/find-a-jeweler/repair-care/repair/",
    "note": "작업 전 비용·기간 확인, 수리 후 마감과 보석 고정 상태를 살펴보는 기준을 참고했습니다."
  },
  {
    "label": "귀족 — 종로 귀금속 수리·AS 상담",
    "url": "https://noblessegold.com/repair",
    "note": "제품 사진으로 상담을 시작하고 실물 상태에 따라 가능 범위·비용·일정을 확인하는 절차를 확인했습니다."
  },
  {
    "label": "귀족 — 사진 상담과 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "사진·예산·희망일 준비, 종로 매장 위치와 주문제작 최소 3주 기준을 확인했습니다."
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
