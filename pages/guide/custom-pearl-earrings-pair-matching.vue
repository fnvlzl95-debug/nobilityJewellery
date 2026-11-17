<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/custom-pearl-earrings-pair-matching'
const pageTitle = '진주 귀걸이 주문제작, 한 쌍 맞추는 법 | 귀족'
const pageDescription = '진주 귀걸이 주문제작은 한 쌍의 크기·색·광택과 착용 형태부터 정하세요. 보유 진주 활용, 스터드·드롭 선택, 14K·18K 견적과 최소 3주 일정, 종로 귀족 사진 상담 준비를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/custom-pearl-earrings-pair-matching-hero.webp`
const publishedAt = '2026-11-17'
const updatedAt = ''
const faqItems = [
  {
    "question": "진주 귀걸이 주문제작은 무엇을 보내면 되나요?",
    "answer": "원하는 귀걸이 사진, 새 진주 선택 또는 보유 진주 활용 여부, 금속 색상, 예산과 희망 수령일을 알려 주세요. 크기를 아직 정하지 못했다면 평소 착용하는 귀걸이나 원하는 착용 사진으로 상담할 수 있습니다."
  },
  {
    "question": "진주 두 알의 크기만 같으면 한 쌍으로 쓰면 되나요?",
    "answer": "크기와 함께 형태·색감·광택이 원하는 조합인지 확인합니다. 후보를 같은 조건에서 나란히 보고, 완성 후 정면으로 보일 방향까지 함께 정하세요."
  },
  {
    "question": "목걸이에 있던 진주로 귀걸이를 만들 수 있나요?",
    "answer": "기존 구멍의 위치·방향과 표면 상태, 새 받침이나 연결 구조를 확인해야 합니다. 목걸이를 먼저 분해하지 말고 전체 사진과 사용할 진주 부위를 보여주어 가능한 범위를 상담하세요."
  },
  {
    "question": "진주 귀걸이 맞춤 제작 비용은 어떻게 정하나요?",
    "answer": "진주 한 쌍의 포함 여부, 14K·18K 등 금속과 부속, 스터드·드롭 구조, 추가 장식과 분리·마감 작업을 확인해 견적을 정합니다. 보유 진주를 쓸 때도 실제 작업 범위를 함께 확인하세요."
  },
  {
    "question": "종로 귀족의 진주 귀걸이 제작기간은 얼마나 걸리나요?",
    "answer": "주문제작은 최소 3주를 기준으로 상담합니다. 진주 한 쌍의 선별과 부속 준비, 디자인·소재 확정 후 실제 수령일을 확인하므로 선물이나 행사 날짜를 첫 문의 때 알려 주세요."
  }
]
const quickAnswers = [
  "처음 문의할 때는 새 진주 선택 또는 보유 진주 활용 여부, 원하는 스터드·드롭 형태, 예산과 필요한 날짜를 알려 주세요. 진주 크기를 아직 몰라도 원하는 착용 사진으로 상담할 수 있습니다.",
  "한 쌍은 크기뿐 아니라 색감·광택·형태가 함께 어울리는지 확인합니다. 진주를 고르는 단계와 침·뒷마개·장식을 정하는 단계를 나누면 견적 조건을 정리하기 쉽습니다.",
  "귀족 주문제작 기간은 최소 3주입니다. 보유 진주 상태, 한 쌍의 선별과 부속 수급, 최종 디자인을 확인한 뒤 실제 수령일을 안내하므로 선물·행사 날짜를 먼저 알려 주세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "진주 귀걸이 주문제작은 무엇부터 정하나요?",
    "paragraphs": [
      "원하는 주문이 진주부터 새로 고르는 귀걸이인지, 가지고 있는 진주로 귀걸이 틀을 만드는 것인지 먼저 구분하세요. 새 진주를 선택한다면 선호하는 색과 모양, 평소 착용할 상황을 전달합니다. 보유 진주를 활용한다면 현재 진주가 따로 있는지, 목걸이나 다른 장식에 연결되어 있는지도 보여 주세요.",
      "진주가 귓불에 가까이 붙는 스터드형과 아래로 내려오는 드롭형 중 어떤 모습이 좋은지 참고 사진에서 표시해 보세요. “출근할 때 편하게 쓰고 싶어요”, “혼주 의상에 맞춰 조금 길게 내려오면 좋겠어요”처럼 용도를 설명하면 진주 크기와 전체 길이를 함께 상담하기 좋습니다.",
      "사진 속 진주의 규격을 모른다면 숫자를 추측해 적을 필요는 없습니다. 평소 쓰는 귀걸이와 원하는 디자인을 함께 보여주고 크기를 비교할 방법을 문의하세요. 한 쌍을 모두 새로 만들지, 남아 있는 한쪽과 짝을 맞출지도 첫 문의에서 알려 주세요. 한쪽 복원은 기존 제품의 색·형태를 기준으로 별도 검토합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "한 쌍은 같은 크기만 고르면 되나요?",
    "paragraphs": [
      "GIA는 귀걸이처럼 여러 진주가 쓰이는 주얼리에서 매칭을 품질 판단 항목으로 설명합니다. 크기가 비슷해도 색이나 광택, 둥근 정도가 다르면 나란히 놓았을 때 인상이 달라질 수 있습니다. 후보 진주는 두 알을 같은 조건에서 함께 보고 원하는 조합인지 확인하세요.",
      "흰색 계열 안에서도 전체 바탕색과 표면에 겹쳐 보이는 색감이 다를 수 있습니다. 상담 사진에서는 한 알씩 따로 찍은 사진에 더해 두 알을 나란히 놓은 모습을 요청해 보세요. 화면의 색은 조명과 촬영 조건의 영향을 받으므로 최종 색감 확인을 어떤 방식으로 할지도 정합니다.",
      "좌우가 비슷한 인상을 원한다면 크기·모양·색·광택 중 특히 맞추고 싶은 항목을 알려 주세요. 자유로운 형태의 바로크 진주로 제작한다면 서로 다른 윤곽을 어떻게 짝지을지도 디자인의 일부가 됩니다. 일정한 구형을 원하는지, 형태 차이를 살릴지에 따라 후보를 보는 기준이 달라집니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 항목",
        "한 쌍으로 볼 부분",
        "상담할 내용"
      ],
      "rows": [
        [
          "크기와 형태",
          "정면 크기와 옆으로 튀어나오는 높이",
          "원하는 볼륨과 좌우 형태의 조합"
        ],
        [
          "색감과 광택",
          "같은 조명에서 본 바탕색과 반사",
          "두 알을 함께 확인할 사진 또는 실물 비교"
        ],
        [
          "표면과 보이는 방향",
          "정면으로 둘 면과 눈에 띄는 표면 특징",
          "완성 후 어느 면이 앞을 향하는지"
        ],
        [
          "금속과 착용 구조",
          "진주 받침·침·뒷마개 또는 연결 장식",
          "전체 높이·길이와 한쪽 착용감"
        ]
      ]
    }
  },
  {
    "title": "가지고 있는 진주로 귀걸이를 만들 수 있나요?",
    "paragraphs": [
      "보유 진주를 활용하고 싶다면 현재 상태 그대로 촬영해 먼저 문의하세요. 두 알을 함께 보여주고 구멍이 보이는 면, 기존 금속과 이어진 부분도 가까이 찍습니다. 진주의 종류나 구매 정보가 확인되면 함께 전달하되, 잘 모르는 내용을 임의로 확정해 적지 않아도 됩니다.",
      "줄에 꿰어져 있던 진주인지, 귀걸이 받침에 붙어 있던 진주인지에 따라 확인할 위치가 달라집니다. 기존 구멍의 위치와 방향, 표면 상태를 확인하고 새 디자인에서 어떤 면을 보이게 할지 상담하세요. 구멍이나 이전 연결 자리를 가릴 수 있는지, 원하는 구조로 고정 가능한지는 실물 확인이 필요할 수 있습니다.",
      "여러 알 중 두 알을 골라 쓰고 싶다면 먼저 전체 구성 사진을 보내 주세요. 어떤 진주를 분리할지 정하기 전에 한 쌍의 조합과 원래 제품에 남는 부분의 처리도 상담합니다. 집에서 진주를 떼거나 구멍을 넓히지 말고 작업 가능한 범위를 확인한 뒤 진행하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "스터드·드롭 형태와 14K·18K 견적을 정하세요",
    "paragraphs": [
      "스터드형은 진주 정면 크기와 함께 귀에서 얼마나 돌출되는지, 침과 뒷마개가 어떤 위치에서 고정되는지를 확인하세요. 드롭형은 진주 자체의 크기뿐 아니라 연결 장식을 포함한 전체 길이와 움직임을 살펴봅니다. 같은 진주를 사용해도 금속 장식과 연결 위치에 따라 완성 인상이 달라질 수 있습니다.",
      "금속은 14K 또는 18K 등 희망 소재와 색상을 알려 주세요. 진주 받침·침·뒷마개가 각각 어떤 소재로 구성되는지 확인하고, 장식이 추가된다면 포함 범위를 견적에 맞춥니다. 받침만의 가격인지 한 쌍의 완성 귀걸이 가격인지 구분하면 비교하기 쉽습니다.",
      "진주를 새로 고르는 주문은 진주 한 쌍과 금속 부속, 세공·마감의 포함 범위를 확인합니다. 보유 진주를 쓰는 주문은 기존 장식 분리나 새 연결 구조 검토가 필요한지도 물어보세요. 예산이 정해져 있으면 진주 선택과 장식 구성을 그 범위에서 함께 상담할 수 있도록 먼저 전달합니다."
    ],
    "bullets": [
      "진주 한 쌍 포함 또는 보유 진주 활용",
      "스터드·드롭 형태와 완성 길이·높이",
      "14K·18K 및 금속 색상, 침·뒷마개 구성",
      "추가 장식·분리 작업·마감과 최종 견적 범위"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 사진으로 주문제작 상담하기",
    "paragraphs": [
      "마음에 드는 진주 귀걸이 참고 사진과 선호하는 금속 색상, 착용 목적을 준비해 주세요. 보유 진주가 있다면 두 알의 전체·옆면·연결 부분 사진을 더합니다. 선물이나 행사 날짜가 있다면 실제 필요한 날짜와 예산 범위를 함께 보내 주세요.",
      "카톡에서는 이렇게 문의할 수 있습니다. “진주 귀걸이 한 쌍을 주문제작하고 싶습니다. 진주는 새로 고르고 싶고, 참고 사진처럼 귓불에 붙는 형태를 원합니다. 금속은 ○○색, 예산은 ○○이며 ○월 ○일까지 받고 싶습니다. 진주 한 쌍의 후보와 침·뒷마개 구성을 상담할 수 있을까요?” 보유 진주를 사용할 때는 그 사진과 활용 희망 내용을 추가하면 됩니다.",
      "귀족은 주문제작에 최소 3주가 필요합니다. 진주 선별, 디자인·소재와 부속을 정한 뒤 수령 일정을 확인하므로 첫 문의 날짜만으로 완료일을 계산하지 마세요. 제작 중 조건을 바꾸고 싶다면 비용과 일정에 어떤 영향이 있는지 먼저 확인합니다.",
      "매장은 서울 종로구 종로 173 종묘귀금속백화점 101호입니다. 아래 상담 내용 복사 버튼으로 준비 항목을 가져가 카톡에 사진과 함께 보내거나, 02-766-4789로 방문 상담을 문의하세요. 아직 진주 종류나 크기를 정하지 못했어도 원하는 착용 모습부터 알려 주시면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "수령할 때는 진주 조합과 착용 상태를 함께 보세요",
    "paragraphs": [
      "완성된 한 쌍을 나란히 놓고 상담했던 진주 조합, 정면 방향과 장식 길이를 확인하세요. 직접 착용해 양쪽이 원하는 위치에 놓이는지, 침·뒷마개 또는 잠금이 잘 맞는지 살펴봅니다. 진주와 받침의 연결 상태, 부속을 여닫는 방법과 이후 점검 안내도 함께 확인해 주세요.",
      "GIA는 진주에 초음파·스팀 세척을 사용하지 않고 착용 후 매우 부드럽고 깨끗한 천으로 관리하도록 안내합니다. 향수·헤어스프레이와의 접촉도 주의하세요. 완성 귀걸이의 금속 부속과 진주 고정 방식에 맞는 관리법은 수령할 때 안내받고, 움직임이나 헐거움이 느껴지면 착용을 멈추고 점검을 문의합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "생성 이미지나 화면 사진의 색감만으로 실제 진주의 종류·품질·한 쌍의 조합을 확정하지 마세요. 제작에 사용할 진주와 완성 방향을 별도로 확인하세요.",
  "보유 진주는 분리·가공하기 전 현재 상태를 보여 주세요. 활용 가능 여부와 작업 범위는 제품을 확인한 뒤 안내합니다."
]
const relatedLinks = [
  {
    "to": "/guide/pearl-value-factors",
    "label": "진주 품질을 보는 기준",
    "description": "크기와 색 외에 광택·표면 등 진주 비교 항목을 살펴보세요."
  },
  {
    "to": "/guide/stud-earring-meaning-selection-guide",
    "label": "스터드 귀걸이 착용 구조",
    "description": "진주 받침과 침·뒷마개를 함께 고를 때 참고하세요."
  },
  {
    "to": "/guide/custom-earrings-production-time",
    "label": "귀걸이 주문제작 일정 확인",
    "description": "디자인 확정부터 한 쌍 수령까지 준비할 단계를 확인하세요."
  },
  {
    "to": "/custom",
    "label": "귀족 주얼리 주문제작 안내",
    "description": "참고 사진으로 제작 범위와 견적을 상담하세요."
  },
  {
    "to": "/contact",
    "label": "종로 귀족 위치와 사진 상담",
    "description": "진주 사진·예산·필요한 날짜를 준비해 문의하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '진주 귀걸이 주문제작, 한 쌍 맞추는 법'
const gmArticleLead = '진주 귀걸이를 주문제작하려면 새 진주를 고를지 보유 진주를 쓸지 먼저 정하고, 한 쌍의 크기·색감·광택과 귀에 놓이는 형태를 함께 확인하세요. 원하는 귀걸이 사진이나 가지고 있는 진주 사진에 예산과 희망일을 더하면 상담을 시작할 수 있습니다. 귀족의 주문제작은 최소 3주를 기준으로 최종 사양과 수령 일정을 확인합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '진주 귀걸이 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '진주 귀걸이 한 쌍 맞춤 제작'
const gmHeroAlt = '크기와 색감이 어우러지는 흰색 진주 스터드 귀걸이 한 쌍의 가상 디자인'
const gmHeroCaption = '진주 한 쌍의 조합을 설명하기 위해 AI로 생성한 가상 디자인입니다. 실제 재고나 완성 주문 사례가 아닙니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '한 쌍의 진주 매칭과 관리 기준은 GIA 자료를 참고했습니다. 비교표와 주문 준비·문의 예시는 상담을 돕기 위한 편집 안내이며, 실제 진주 활용 가능 범위와 견적·일정은 제품 및 최종 사양 확인 후 정합니다.'
const gmSources = [
  {
    "label": "GIA — 진주 품질과 매칭 기준",
    "url": "https://www.gia.edu/pearl-quality-factor",
    "note": "한 쌍의 진주를 비교할 때 크기·형태·색·광택·표면과 매칭을 함께 확인하는 근거를 참고했습니다."
  },
  {
    "label": "GIA — 진주 관리 안내",
    "url": "https://www.gia.edu/pearl-care-cleaning",
    "note": "표면 긁힘과 화장품·향수 접촉 주의, 초음파·스팀 세척을 피하고 부드러운 천으로 관리하는 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "사진과 희망 변경으로 제작 가능 범위·견적을 확인하는 절차, 금속 소재와 최소 3주 제작 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 상담 준비와 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "참고 사진·소재·착용 목적·예산·수령 희망일과 종로 매장 위치를 확인했습니다."
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
