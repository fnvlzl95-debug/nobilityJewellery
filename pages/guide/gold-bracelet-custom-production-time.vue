<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-bracelet-custom-production-time'
const pageTitle = '금팔찌 주문제작 기간, 최소 3주와 수령일 확인 | 귀족'
const pageDescription = '금팔찌 주문제작은 최소 3주를 기준으로 상담합니다. 체인·잠금 부속 준비, 길이와 각인 확정, 최종 검수에 따라 달라지는 일정과 종로 귀족에 희망 수령일을 문의하는 방법을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/bracelet/slim-paperclip-chain-bracelet-01.webp`
const publishedAt = '2026-11-07'
const updatedAt = ''
const faqItems = [
  {
    "question": "귀족 금팔찌 주문제작 기간은 얼마나 걸리나요?",
    "answer": "최소 3주를 기준으로 상담합니다. 체인과 잠금 부속 준비, 길이·각인 확정, 제작과 검수 범위에 따라 최종 수령일을 안내받으세요. 기간을 계산하는 시작 날짜도 함께 확인하는 것이 좋습니다."
  },
  {
    "question": "기성 체인이 있으면 팔찌를 바로 받을 수 있나요?",
    "answer": "체인 외에도 연결 고리와 잠금장치의 준비, 길이 조정과 조립·검수가 필요한지 확인해야 합니다. 완성 재고 구매인지 새 조립이 필요한 주문인지 구분해 수령 가능일을 문의하세요."
  },
  {
    "question": "주문 후 팔찌 길이만 바꾸면 수령일은 그대로인가요?",
    "answer": "현재 제작 단계와 체인 구조에 따라 달라집니다. 링크를 더하거나 줄이는 방법과 끝단·잠금장치 연결에 추가 작업이 필요한지 확인하고, 변경 후 수령일을 다시 안내받으세요."
  },
  {
    "question": "금팔찌 각인 작업도 제작 기간에 포함되나요?",
    "answer": "주문에 각인이 포함됐는지 먼저 확인하세요. 각인판 제작, 문구·위치 확인, 각인과 부착, 마감 확인까지 안내받은 일정에 포함되는지 묻고 중간에 추가한 요청은 수령일을 재확인합니다."
  },
  {
    "question": "완성됐다는 연락을 받으면 그날 수령할 수 있나요?",
    "answer": "최종 확인과 매장 수령 준비가 끝났는지 문의하세요. 배송을 원하면 지원 여부와 이동 기간을 별도로 확인해야 하므로, 제작 완료일과 실제 받을 수 있는 날짜를 나누어 안내받는 것이 좋습니다."
  }
]
const quickAnswers = [
  "귀족의 금팔찌 주문제작은 최소 3주가 기준입니다. 날짜를 계산하기 전에 제작 기간의 시작점과 부속 준비·검수 포함 여부를 확인하세요.",
  "완성 재고 구매, 준비된 체인과 부속의 조합, 링크부터 새로 만드는 주문은 확인할 작업이 다릅니다. 사진에 보이는 제품의 현재 준비 상태부터 문의하세요.",
  "체인과 잠금장치가 준비돼도 길이·각인·장식판이 미정이면 수령일을 다시 확인해야 합니다. 선물할 날과 실제 받을 날을 구분해 전달하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "금팔찌 제작에 최소 3주면 수령일까지 맞출 수 있나요?",
    "paragraphs": [
      "최소 3주는 귀족의 주문제작 안내 기준이며, 개별 주문의 수령일은 사양을 확인한 뒤 정합니다. 필요한 날짜에서 3주를 뺀 날을 곧바로 주문 마감일로 잡기보다, 원하는 체인과 부속을 준비할 수 있는지 먼저 상담하세요.",
      "상담할 때는 기간을 어느 날부터 계산하는지 물어보세요. 디자인과 길이 확정, 부속 준비, 제작과 검수가 안내된 일정에 어떻게 포함되는지 확인하면 좋습니다. 영업일과 달력일 중 어떤 기준인지도 함께 확인합니다.",
      "예를 들어 토요일에 선물하려면 그 전날까지 팔찌를 받아야 하는지, 선물하는 날 매장에 들를 수 있는지 정해 두세요. 문의에는 선물할 날짜와 실제로 받아야 할 날짜를 각각 적어 주세요. 착용 후 길이 확인이나 수정이 필요할 가능성도 상담합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "체인과 잠금 부속은 어떤 상태인지 확인하나요?",
    "paragraphs": [
      "먼저 원하는 주문이 현재 완성된 제품의 구매인지, 기성 체인에 부속을 조합하는 주문인지, 링크 모양부터 새로 만드는 주문인지 구분하세요. 갤러리 사진은 디자인을 설명하는 자료이므로, 같은 구성의 현재 재고와 제작 가능 범위는 별도로 확인합니다.",
      "체인과 부속을 조합한다면 선택한 소재·색상·링크 규격의 체인뿐 아니라 그 끝에 맞는 연결 고리와 잠금장치도 준비되는지 물어보세요. 체인만 확보된 상태와 최종 길이로 조립할 부속까지 정해진 상태를 구분해 확인해야 합니다.",
      "링크부터 새로 만드는 주문이라면 반복되는 한 마디의 형태와 크기, 연결 방식, 끝단과 잠금 구성이 검토 대상입니다. GIA의 주얼리 디자인 교육 자료도 크기·비례·요소의 관계를 시간과 제조 방식 등의 제약 안에서 다룹니다. 이 원칙을 바탕으로, 디자인이 정해졌을 때 어떤 작업이 남는지 상담해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "길이와 각인을 늦게 정하면 일정도 달라지나요?",
    "paragraphs": [
      "완성 길이가 미정이면 마지막 링크 구성과 잠금장치 연결을 다시 확인해야 할 수 있습니다. 손목 둘레와 원하는 착용 여유를 전달하고, 잠금장치를 포함한 완성 길이를 정하세요. 측정 방법과 디자인 선택은 아래의 팔찌 사이즈·주문제작 안내에서 먼저 확인할 수 있습니다.",
      "예를 들어 길쭉한 사각 링크가 반복되는 팔찌는 한 마디를 줄였을 때의 변화가 눈에 띌 수 있습니다. 작은 길이 차이를 어떤 연결 부위에서 조정할 수 있는지는 디자인별로 확인합니다. 주문 후 길이만 바꾸는 요청도 현재 조립 상태에 따라 추가 작업 여부를 물어보세요.",
      "이니셜판이나 각인을 원한다면 문구·위치와 판의 크기를 함께 정해 두세요. 판 제작, 글자 확인, 각인과 체인에 연결하는 작업이 안내받은 일정에 포함되는지 확인합니다. 중간에 요청을 추가했다면 견적뿐 아니라 완료 예정일도 다시 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "주문 상황별로 어떤 날짜를 확인하면 되나요?",
    "paragraphs": [
      "아래 표는 체인 팔찌 주문 상담에서 사용할 질문입니다. 각 작업에 정해진 일수를 붙이기보다, 준비가 끝난 항목과 아직 결정할 항목을 구분해 수령 가능일을 안내받으세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "주문 상황",
        "먼저 확인할 항목",
        "일정에 관해 물어볼 내용"
      ],
      "rows": [
        [
          "완성 제품 구매를 희망할 때",
          "동일 디자인·소재·길이의 현재 재고",
          "변경 작업 없이 받을 수 있는 날짜는 언제인가요?"
        ],
        [
          "기성 체인에 부속을 조합할 때",
          "체인·연결 고리·잠금장치 준비",
          "부속 준비부터 조립·검수까지 포함한 일정인가요?"
        ],
        [
          "링크부터 새로 만들 때",
          "링크 형태·크기·연결·끝단 구성",
          "사양을 확정한 뒤 제작 시작과 완료는 언제인가요?"
        ],
        [
          "길이·각인판을 추가로 바꿀 때",
          "현재 작업 단계와 바꿀 수 있는 범위",
          "변경을 반영하면 수령일도 달라지나요?"
        ],
        [
          "선물 날짜가 정해져 있을 때",
          "제작 완료·매장 수령·배송 지원 여부",
          "제가 실제로 받아야 하는 날짜에 맞출 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "완성 안내를 받으면 무엇을 확인하고 수령하나요?",
    "paragraphs": [
      "완성 안내를 받으면 주문한 길이와 체인 구성, 잠금장치, 각인과 마감 확인이 끝났는지 물어보세요. 직접 수령할 때는 착용 여유와 잠금 조작도 살펴봅니다. 길이 수정이 필요하다면 가능한 범위와 추가 일정을 확인하세요.",
      "검사기관 QIMA의 장신구 제조 검사 안내는 조립, 체인 잠금장치, 착용 적합성, 치수와 정렬 등을 점검 항목으로 제시합니다. 팔찌를 받을 때도 길이와 연결·잠금 상태를 나누어 살펴볼 참고가 됩니다. 실제 검수 범위는 주문한 제품에 맞춰 확인하세요.",
      "종로 귀족에 문의할 때는 참고 사진, 손목 둘레와 희망 완성 길이, 소재·색상, 각인 유무, 필요한 날짜를 보내 주세요. 아직 치수를 모르면 미정인 항목을 알려주시면 됩니다. 매장 수령을 원하는지, 배송이 필요한지도 함께 전달하세요.",
      "문의 예시: “사진처럼 길쭉한 사각 링크의 금팔찌를 주문하고 싶습니다. 손목 둘레는 측정해서 보내드리고, 착용 여유와 완성 길이는 상담하고 싶어요. 각인은 없고, 선물하는 날 전에 매장에서 받으려 합니다. 체인과 잠금 부속 준비를 포함해 최소 3주 기준으로 가능한 수령일을 알려주세요.”",
      "귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있습니다. 아래 카카오톡으로 원하는 디자인과 꼭 필요한 날짜를 보내주시면 제작 가능 범위와 일정을 상담할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "귀족의 주문제작은 최소 3주를 기준으로 합니다. 최종 사양과 준비 상태를 확인한 뒤 실제 수령 가능일을 안내받으세요.",
  "주문 중 길이·잠금장치·각인 구성을 바꾸면 추가 작업 여부와 수령일을 다시 확인하세요. 사진만으로 부속 재고나 조정 가능 범위를 확정할 수 없습니다.",
  "배송을 원한다면 지원 여부와 이동에 필요한 시간을 별도로 문의하세요. 제작 완료 예정일과 실제 도착일은 구분해 확인합니다."
]
const relatedLinks = [
  {
    "to": "/guide/custom-gold-bracelet-order",
    "label": "금팔찌 디자인과 주문 사양 정하기",
    "description": "체인·길이·소재·잠금장치를 먼저 정하고 싶을 때 참고하세요."
  },
  {
    "to": "/guide/bracelet-size-measuring-guide",
    "label": "팔찌 사이즈 재는 법",
    "description": "손목 둘레와 원하는 착용 여유를 확인하는 방법입니다."
  },
  {
    "to": "/gallery",
    "label": "귀족 팔찌 디자인 사진 보기",
    "description": "갤러리의 팔찌 카테고리에서 원하는 체인 구성을 골라보세요."
  },
  {
    "to": "/custom",
    "label": "금팔찌 주문제작 상담 안내",
    "description": "참고 사진과 희망 수령일로 제작 가능 범위를 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '금팔찌 주문제작 기간, 최소 3주와 수령일 확인'
const gmArticleLead = '금팔찌 주문제작은 귀족에서 최소 3주를 기준으로 상담합니다. 선택한 체인과 잠금 부속의 준비, 완성 길이와 각인 확정, 검수 범위에 따라 최종 수령일이 달라집니다. 선물 날짜가 정해져 있다면 체인을 고르기 전에 꼭 필요한 날을 알려주고, 제작 완료 예정일과 실제 받을 수 있는 날짜를 함께 확인하세요.'
const gmArticleCategory = '기간'
const gmArticleKeyword = '금팔찌 주문제작 기간'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '금팔찌 체인·부속 준비와 제작 수령일 상담'
const gmHeroAlt = '손목에 착용한 길쭉한 사각 링크의 슬림 체인 팔찌'
const gmHeroCaption = '귀족 갤러리에 등록된 원본 착용 사진입니다. 원하는 체인 규격과 길이·잠금 구성을 정한 뒤 제작 일정을 상담하세요.'
const gmHeroWidth = 1187
const gmHeroHeight = 1467
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '최소 3주는 2026년 11월 7일 확인한 귀족의 주문제작 안내 기준입니다. GIA 자료는 디자인과 제작 조건의 관계, QIMA 자료는 일반적인 장신구 검사 항목을 참고했습니다. 외부 자료가 귀족의 소요 기간이나 특정 검사·인증을 입증하는 것은 아닙니다. 상황별 질문과 문의 문장은 상담 준비를 위한 편집 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 주얼리 설계와 제작 조건",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-technology",
    "note": "크기·비례·요소 간 관계를 시간·비용·제조 방식과 함께 고려하는 교육 안내입니다."
  },
  {
    "label": "QIMA — 장신구 제조 검사 항목",
    "url": "https://www.qima.com/blog/inspection/jewelry-manufacturing-inspections",
    "note": "조립·체인 잠금장치·치수·착용 적합성 등 일반 검사 항목을 참고했습니다."
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
