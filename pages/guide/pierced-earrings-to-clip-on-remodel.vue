<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/pierced-earrings-to-clip-on-remodel'
const pageTitle = '귀걸이 귀찌로 바꾸기, 리폼 전 확인할 것 | 귀족'
const pageDescription = '귀걸이를 귀찌로 바꾸고 싶다면 침과 장식의 연결 구조부터 확인하세요. 컨버터와 부속 교체의 차이, 디자인·착용감·비용 확인 사항과 종로 귀족 사진 상담 준비를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/pierced-earrings-to-clip-on-remodel-hero.webp`
const publishedAt = '2026-11-16'
const updatedAt = ''
const faqItems = [
  {
    "question": "금귀걸이를 귀찌로 바꿀 수 있나요?",
    "answer": "침과 앞장식의 연결 구조, 클립을 붙일 공간, 소재·무게를 확인한 뒤 가능 범위를 판단합니다. 한 쌍의 정면·옆면·뒷면 사진을 보내 먼저 상담하세요."
  },
  {
    "question": "귀찌로 바꾸면 앞면 디자인은 그대로인가요?",
    "answer": "보존하고 싶은 부분을 먼저 지정해야 합니다. 앞장식을 유지하더라도 새 부속의 위치에 따라 착용 높이와 기울기, 옆에서 보이는 모습이 달라질 수 있어 변경 범위를 상담합니다."
  },
  {
    "question": "침을 자르지 않고 귀찌로 착용할 수도 있나요?",
    "answer": "기존 침을 끼우는 컨버터 방식도 있습니다. 다만 제품마다 침의 방향·규격과 연결 구조가 달라 내 귀걸이에 맞는지 확인해야 합니다. 원상태 보존이 중요하면 가공 전에 알려 주세요."
  },
  {
    "question": "귀걸이 귀찌 변경 비용은 얼마인가요?",
    "answer": "한쪽 또는 한 쌍의 작업 수량, 클립 부속의 소재와 수급, 기존 연결부 처리·보석 점검·마감 범위에 따라 달라집니다. 사진으로 상담을 시작하고 실물 확인 후 최종 견적을 안내받으세요."
  },
  {
    "question": "귀찌 리폼 기간은 얼마나 걸리나요?",
    "answer": "기존 귀걸이 변경 일정은 구조와 작업 범위, 부속 준비 여부를 확인한 뒤 안내합니다. 새 귀찌를 주문제작하는 경우에는 최소 3주를 기준으로 상담하므로 필요한 날짜를 미리 알려 주세요."
  }
]
const quickAnswers = [
  "귀걸이의 침을 없애는 것만으로 귀찌가 완성되지는 않습니다. 귓불을 잡는 부속의 위치와 장식이 놓일 방향까지 확인해야 하므로 먼저 앞·뒤·옆 사진으로 상담하세요.",
  "기존 침을 끼우는 컨버터와 침·뒷부분을 손보는 부속 교체는 작업 범위가 다릅니다. 원래 귀걸이로 돌아가고 싶은지, 앞면에 부속이 보여도 되는지 함께 알려 주세요.",
  "비용과 완료 일정은 부속의 소재·수급, 한 쌍의 작업 범위와 마감을 확인한 뒤 안내합니다. 새 귀찌를 주문제작하는 방향으로 진행한다면 최소 3주를 기준으로 상담합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "귀걸이를 귀찌로 바꿀 수 있는지 먼저 확인하세요",
    "paragraphs": [
      "귀찌는 귀에 침을 통과시키지 않고 귓불을 잡아 고정하는 귀걸이입니다. 보유한 귀걸이를 이 방식으로 쓰려면 앞장식을 유지하면서 고정 구조를 바꿀 수 있는지 살펴봐야 합니다. “귀찌로 바꿔 주세요”라는 요청에 현재 귀걸이 사진을 더하면 어떤 부위를 확인해야 하는지 설명하기 수월합니다.",
      "작은 장식 뒤에 침이 바로 붙은 귀걸이와 고리 아래로 장식이 매달린 귀걸이는 연결 위치가 다릅니다. 클립을 붙일 자리가 충분한지, 장식 뒤가 평평한지, 보석 뒷부분이 돌출되어 있는지 보여 주세요. 사진으로 알기 어려운 금속 두께와 연결 상태는 실물을 확인합니다.",
      "귀족의 수리 안내에는 귀걸이 침·클립 관련 작업과 디자인 변경 상담이 포함되어 있습니다. 다만 모든 귀걸이가 같은 방식으로 변경되는 것은 아닙니다. 소재를 모르거나 예전에 수리한 제품도 알고 있는 정보와 현재 상태를 함께 전달해 가능한 범위를 먼저 문의하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "귀찌 컨버터와 부속 교체 리폼은 어떻게 다른가요?",
    "paragraphs": [
      "컨버터는 귀걸이를 클립형으로 착용하도록 연결해 주는 별도 부품입니다. E’arrs의 침형 귀걸이용 제품은 기존 침을 부품에 끼우는 방식을 안내합니다. 이런 연결 방식을 검토할 때는 내 귀걸이의 침 방향과 길이, 장식이 달릴 위치에 맞는지 먼저 확인해야 합니다.",
      "부속 교체 리폼은 기존 고정 부분을 어떻게 처리하고 새 클립을 어디에 연결할지 정하는 작업입니다. 원래 침을 제거하거나 연결 부위를 바꾸는 범위가 있다면 작업 후 다시 침형으로 쓰고 싶을 때 어떤 추가 작업이 필요한지도 물어보세요. 컨버터 제품의 간단한 사용 설명을 모든 귀금속 리폼에 적용할 수는 없습니다.",
      "상담할 때는 원본을 그대로 보관하고 싶은지, 앞면에서 새 부속이 보이는 것이 괜찮은지부터 알려 주세요. 특정 컨버터나 클립을 정해 두었다면 제품 사진도 함께 보내 호환 여부를 확인합니다. 귀족에서 사용할 수 있는 부품과 작업 방식은 실제 귀걸이 구조를 확인한 뒤 안내합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "상담 방향",
        "먼저 확인할 부분",
        "함께 물어볼 질문"
      ],
      "rows": [
        [
          "기존 침을 활용하는 컨버터",
          "침의 방향·규격과 장식이 놓이는 위치",
          "침을 가공하지 않고 연결할 수 있나요?"
        ],
        [
          "클립 부속으로 교체",
          "새 부속 연결 공간과 기존 침 처리",
          "앞면 모양과 뒷면 마감은 어떻게 달라지나요?"
        ],
        [
          "장식 연결 위치 조정",
          "장식 고리와 착용했을 때 기울기",
          "귓불 아래로 내려오는 길이가 달라지나요?"
        ],
        [
          "새 귀찌 주문제작",
          "원하는 앞장식과 고정 방식",
          "제작 범위·예산·최소 3주 일정을 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "앞면 디자인과 착용감은 따로 확인해야 합니다",
    "paragraphs": [
      "남기고 싶은 윤곽, 보석 배열, 드롭 장식의 길이를 사진에 표시해 주세요. 앞장식을 그대로 활용해도 고정 위치가 바뀌면 귀에 걸렸을 때 보이는 높이나 방향은 달라질 수 있습니다. 정면 모양뿐 아니라 옆에서 클립이 얼마나 보이는지도 상담할 항목입니다.",
      "귀찌를 선택할 때는 장식의 크기와 한쪽 무게, 클립이 닿는 위치, 여닫는 방법을 함께 확인하세요. 이전에 착용한 귀찌가 쉽게 빠졌거나 눌리는 느낌이 있었다면 어느 부분이 불편했는지 알려 주세요. 클립을 세게 조이기 전에 실제 착용 상태에서 고정감과 압박감을 살펴보는 것이 좋습니다.",
      "선물용이면 받는 분이 귀찌를 사용하는지와 선호하는 장식 크기를 먼저 확인하세요. 착용할 사람이 함께 방문할 수 있는지도 알려 주세요. 사진으로 디자인을 고를 수 있어도 최종 착용감은 사람마다 달라서, 외형만 보고 편안함을 보장하기 어렵습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "귀걸이 귀찌 변경 비용과 기간을 물어볼 때",
    "paragraphs": [
      "견적은 한쪽만 바꾸는지 한 쌍을 함께 바꾸는지, 새 부속의 소재와 수급, 기존 연결부 처리와 표면 마감을 포함해 확인합니다. 보석이 있는 귀걸이는 보석 고정 상태 점검과 추가 작업이 필요한지도 물어보세요. 희망하는 금속 색상과 예산 범위를 먼저 알려주면 상담 조건을 정리하기 좋습니다.",
      "Jewelers of America는 제품을 평가한 뒤 작업 비용과 시간을 안내하고 고객 동의를 받는 절차를 설명합니다. 귀족에서도 실물의 소재·구조와 필요한 부품을 확인한 후 최종 금액과 완료 일정을 상담합니다. 사진 문의 단계에서는 방문 전 준비사항과 추가로 보여줄 부위를 안내받을 수 있습니다.",
      "행사나 선물 날짜가 정해져 있다면 처음 문의할 때 함께 적어 주세요. 기존 제품의 변경 일정은 작업 범위와 부품 수급을 확인한 뒤 정합니다. 기존 귀걸이를 바꾸는 대신 새 귀찌를 주문제작하기로 했다면 제작기간은 최소 3주를 기준으로 상담합니다."
    ],
    "bullets": [
      "한쪽 또는 한 쌍의 작업 범위",
      "클립 부속 소재·색상과 준비 가능 여부",
      "기존 침 처리·보석 점검·표면 마감 포함 여부",
      "최종 금액과 희망일에 맞춘 완료 가능 일정"
    ],
    "table": null
  },
  {
    "title": "종로 방문 전, 이 사진으로 귀찌 리폼을 문의하세요",
    "paragraphs": [
      "한 쌍을 나란히 놓은 정면 사진, 침과 연결 부위가 보이는 뒷면, 장식 높이를 볼 수 있는 옆면을 촬영하세요. 작은 연결부는 밝은 곳에서 가까이 찍고, 전체 모양이 보이는 사진도 함께 보내 주세요. 소재 표시가 있으면 읽을 수 있게 보여주고 표시를 찾지 못했다면 모른다고 적어도 됩니다.",
      "문의 문장은 이렇게 시작할 수 있습니다. “가지고 있는 귀걸이를 귀찌로 바꾸고 싶습니다. 정면·옆면·뒷면 사진을 보냅니다. 앞장식은 최대한 살리고 싶고, 한 쌍 모두 변경하려고 합니다. 가능한 고정 방식과 비용을 확인하려면 무엇을 더 보여드리면 될까요? 예산은 ○○, 필요한 날짜는 ○월 ○일입니다.” 원하는 조건에 맞게 항목을 바꿔 보내세요.",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 방문 전에 카톡으로 사진을 보내거나 02-766-4789로 문의하면 상담 준비사항을 확인할 수 있습니다. 아래 상담 내용 복사 버튼을 이용해 사진과 함께 남기고 싶은 디자인, 변경 수량, 희망일을 전달해 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "완성품은 한 쌍의 모양과 클립 작동을 확인하세요",
    "paragraphs": [
      "수령할 때는 처음 상담한 앞장식이 어떻게 유지되었는지, 양쪽의 높이와 방향이 의도한 대로 맞는지 살펴보세요. 기존 침을 처리한 부분과 피부에 닿는 뒷면 마감도 확인합니다. 좌우가 다른 디자인이라면 보존하기로 한 차이를 기준으로 비교하세요.",
      "클립을 직접 열고 닫아 보고 착용 방법과 조절 가능한 범위를 안내받으세요. 보석이 있는 제품은 고정 상태를 함께 확인합니다. 사용 중 불편함이나 헐거움이 생기면 부속을 직접 구부리기 전에 어느 쪽에서 어떤 변화가 생겼는지 사진과 함께 알려 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "변경 가능 여부를 확인하기 전에 귀걸이 침을 자르거나 구부리지 마세요. 원래 연결 상태를 보여주는 사진이 상담에 도움이 됩니다.",
  "피부에 닿는 부속의 소재와 마감을 확인하고, 착용 중 눌림이나 불편함이 있으면 벗어 고정 상태를 다시 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 종류와 클립형 구조",
    "description": "스터드·드롭·클립형의 착용 방식을 비교하세요."
  },
  {
    "to": "/guide/earring-back-lost-types",
    "label": "귀걸이 뒷마개와 고정 부속 확인",
    "description": "현재 귀걸이의 고정 방식과 부속을 확인하세요."
  },
  {
    "to": "/guide/custom-earrings-production-time",
    "label": "새 귀걸이 주문제작 기간",
    "description": "새 디자인으로 제작할 때 준비할 일정과 부속을 살펴보세요."
  },
  {
    "to": "/repair",
    "label": "귀족 귀걸이 수리·리폼 상담",
    "description": "사진으로 작업 가능 범위와 방문 준비를 문의하세요."
  },
  {
    "to": "/contact",
    "label": "종로 귀족 위치와 사진 문의",
    "description": "제품 사진·희망 조건·예산을 준비해 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '귀걸이 귀찌로 바꾸기, 리폼 전 확인할 것'
const gmArticleLead = '가지고 있는 귀걸이를 귀찌로 바꿀 수 있는지는 침과 앞장식의 연결 구조, 클립 부속을 붙일 공간, 소재와 무게를 확인한 뒤 판단합니다. 앞면 디자인을 최대한 살리고 싶다면 한 쌍의 정면·옆면·뒷면 사진을 보내 주세요. 귀족에서 변경 가능 범위와 실물 상담 전에 준비할 내용을 안내합니다.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '귀걸이 귀찌로 바꾸기'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '귀걸이 귀찌 변경 리폼'
const gmHeroAlt = '타원형 금빛 귀찌 한 쌍의 앞장식과 열린 클립 뒷면을 보여주는 가상 예시'
const gmHeroCaption = '클립형 귀걸이의 앞면과 뒷면 확인 위치를 설명하기 위해 AI로 생성한 가상 디자인입니다. 실제 리폼 전후 사례가 아닙니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '컨버터 방식은 E’arrs의 제품 설명, 수리 전 비용·일정 협의와 마감 확인은 Jewelers of America 자료를 참고했습니다. 비교표와 사진 준비·문의 예시는 상담을 돕기 위한 편집 안내입니다. 실제 변경 가능 범위와 비용·기간은 제품 확인 후 정합니다.'
const gmSources = [
  {
    "label": "E’arrs — 침형 귀걸이용 클립 컨버터",
    "url": "https://www.earrs.com/collections/clip-on-earring-accessories/products/gold-post-to-clip-converters",
    "note": "기존 침을 끼워 클립형으로 착용하는 별도 부품의 원리를 확인했습니다. 귀족의 판매 제품이나 보유 부품을 뜻하지 않습니다."
  },
  {
    "label": "Jewelers of America — 주얼리 수리 안내",
    "url": "https://www.jewelers.org/find-a-jeweler/repair-care/repair/",
    "note": "제품 평가 후 비용·기간 안내와 작업 동의, 수리 후 표면 마감·보석 고정 확인 기준을 참고했습니다."
  },
  {
    "label": "귀족 — 귀걸이 수리와 리폼 상담",
    "url": "https://noblessegold.com/repair",
    "note": "침·클립 관련 수리 안내와 사진 상담, 실물 확인 후 비용·일정을 정하는 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 사진 상담과 종로 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "디자인 사진·예산·희망일 준비, 매장 위치와 주문제작 최소 3주 기준을 확인했습니다."
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
