<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-friendship-ring-group-order'
const pageTitle = '우정반지 주문제작, 여럿이 맞추는 순서 | 귀족'
const pageDescription = '여럿이 우정반지를 주문제작하려면 공통 디자인과 각자 다른 요청을 먼저 나누세요. 인원별 확인표와 예산 합의 방법을 살펴보고 참고 사진·참여 인원·희망일을 귀족에 보내 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-friendship-ring-group-order-hero-048163b6.webp`
const publishedAt = '2026-09-22'
const updatedAt = ''
const faqItems = [
  {
    "question": "우정반지를 전부 똑같은 디자인으로 맞춰야 하나요?",
    "answer": "모두 같은 모습을 원하는지, 하나의 표식만 공유하고 싶은지부터 친구들끼리 정해 보세요. 개별 요청을 반영할 수 있는 범위는 선택한 디자인을 기준으로 상담합니다."
  },
  {
    "question": "친구 한 명의 호수가 아직 미정이어도 문의할 수 있나요?",
    "answer": "참여 인원과 디자인을 먼저 보내고 누구의 호수가 미정인지 적어 주세요. 실제 제작을 시작하기 전까지 어떤 정보를 확정해야 하는지 상담할 수 있습니다."
  },
  {
    "question": "대표자 한 명이 우정반지 상담을 맡아도 되나요?",
    "answer": "인원별 요청을 모아 첫 문의를 할 수 있습니다. 제작을 정하기 전에는 각자가 자신의 디자인과 문구 등 주문 내용을 확인하는 것이 좋습니다. 필요한 사이즈 확인 방법은 상담에서 안내받으세요."
  },
  {
    "question": "나중에 참여한 친구도 같은 반지를 추가할 수 있나요?",
    "answer": "추가 주문 계획이 있다면 처음부터 알려 주세요. 같은 모델과 사양으로 다시 제작할 수 있는지, 가격과 일정은 어떻게 되는지 추가 주문 시점에 확인해야 합니다."
  }
]
const quickAnswers = [
  "전부 같은 디자인을 원할지, 공통된 표식만 남기고 각자 다르게 고를지부터 합의하세요.",
  "이름이나 A·B·C 표시를 붙여 누구의 요청인지 구분하고, 미정인 항목도 그대로 적어 주세요.",
  "대표자가 문의를 모아 보내더라도 최종 주문 내용은 착용할 사람마다 확인하는 것이 좋습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "새 후보를 더하기 전에 공통 기준을 하나 정하세요",
    "paragraphs": [
      "“우정반지니까 다 같아야 한다”와 “내가 편한 디자인이 좋다”는 의견이 함께 나올 수 있습니다. 먼저 모두 같은 기본 디자인을 고를지, 눈에 띄는 선이나 작은 표식만 공유할지 이야기해 보세요. 공통으로 남길 부분이 정해지면 각자 다른 취향을 설명하기도 쉬워집니다.",
      "GIA의 맞춤 반지 안내도 스타일과 색상, 착용자의 사이즈를 따로 확인할 항목으로 소개합니다. 이를 참고해 친구들끼리 후보 사진을 한 장 골라 “여기는 함께 유지하고 싶다”고 표시해 보세요. 이 글의 인원별 정리 순서는 여러 사람의 의견을 모으기 위한 제안입니다.",
      "예를 들어 세 사람 모두 같은 선 무늬가 마음에 든다면 그 선을 공통 기준으로 삼고, 다른 요청은 별도로 적을 수 있습니다. 변경이 실제로 가능한지는 디자인을 본 뒤 상담해야 하므로 대화방에서 정한 안을 곧바로 제작 확정으로 생각하지 마세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "먼저 합의할 질문",
        "같이 정할 내용",
        "남겨 둘 개별 요청"
      ],
      "rows": [
        [
          "멀리서도 같은 반지로 보이길 원하나요?",
          "공통 기준 사진 한 장",
          "각자가 바꾸고 싶은 부분"
        ],
        [
          "같은 의미만 담겨도 괜찮나요?",
          "함께 남길 표식 또는 문구",
          "각자가 고른 기본 형태"
        ],
        [
          "아직 의견이 갈리나요?",
          "모두 동의한 요소 한 가지",
          "동의하지 않은 요소와 대안"
        ]
      ]
    }
  },
  {
    "title": "누구의 반지인지 연결되는 표를 만드세요",
    "paragraphs": [
      "메시지에 “호수는 나중에”, “각인은 이걸로”라고만 남기면 누구의 이야기인지 다시 찾아야 합니다. 참여자 이름이나 A·B·C처럼 구분할 수 있는 표시를 붙여 요청을 모아 보세요. 공통 기준 사진은 하나로 두고, 달라지는 부분만 사람별로 적으면 됩니다.",
      "예시는 실제 주문 양식이 아니라 문의를 준비하는 방법입니다. 모르는 정보는 추측해서 채우지 말고 미정으로 표시하세요. 각인 문구처럼 서로 다른 내용이 들어간다면 해당 반지를 착용할 사람이 자기 줄을 다시 확인하도록 해 보세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "참여자",
        "공통안에서 달라지는 요청",
        "본인이 확인할 미정 항목"
      ],
      "rows": [
        [
          "A",
          "공통안 그대로 희망",
          "착용할 손가락과 최종 호수"
        ],
        [
          "B",
          "안쪽 문구를 다르게 희망",
          "정확한 문구와 적용 가능 여부"
        ],
        [
          "C",
          "일부 장식을 빼고 싶음",
          "변경 가능 여부와 개별 견적"
        ]
      ]
    }
  },
  {
    "title": "예산과 희망일도 전원이 같은 뜻으로 이해했는지 보세요",
    "paragraphs": [
      "“한 사람당 같은 금액까지 쓰자”는 예산 합의와 실제 반지의 개별 견적은 다를 수 있습니다. 공동 예산으로 준비할지 각자 자신의 반지 비용을 부담할지 먼저 이야기하고, 상담에서는 사람별 견적과 전체 합계를 구분해 확인하세요. 여러 개를 함께 주문한다는 이유만으로 같은 가격이나 할인이 적용된다고 가정하지 않는 것이 좋습니다.",
      "기념일에 함께 착용할 계획이라면 모두 받아야 하는 날짜를 하나로 전달하세요. 아직 참여 여부가 정해지지 않은 친구가 있거나 누군가의 요청이 미정이라면 그 점도 알려 주세요. 인원이나 디자인이 바뀔 때 기존 견적과 희망 일정이 유지되는지는 다시 확인해야 합니다.",
      "나중에 합류할 친구의 반지를 추가로 맞추고 싶다면 처음 상담 때 물어보세요. 오늘 선택한 디자인을 훗날 같은 조건으로 다시 주문할 수 있는지는 미리 보장할 수 없습니다. 추가 주문 시 확인할 기준 사진과 모델 정보를 어떤 방식으로 남길지도 상담할 수 있습니다."
    ],
    "bullets": [
      "현재 확정된 인원과 아직 미정인 인원",
      "사람별 지출 상한과 전체 예산 구분",
      "전원이 받아야 하는 희망 날짜",
      "인원·요청 변경 시 다시 확인할 조건"
    ],
    "table": null
  },
  {
    "title": "대표자가 모아 보내고, 각자가 최종 내용을 확인하세요",
    "paragraphs": [
      "문의는 대표자가 한 번에 모아 보내면 설명을 반복할 일을 줄일 수 있습니다. 다만 대표자가 고른 안을 모두의 동의로 넘기기보다는, 제작을 정하기 전에 각자가 자신의 디자인과 문구를 확인해 주세요. 수정할 때는 “B의 문구만 변경”처럼 대상과 바뀐 내용을 함께 적는 편이 명확합니다.",
      "문의 예시: “친구 세 명이 우정반지를 맞추려고 합니다. 첨부 사진의 선 무늬는 함께 유지하고 싶고, B는 안쪽 문구를 따로 넣고 싶습니다. A와 C는 호수가 아직 미정입니다. ○월 ○일까지 모두 받으려면 어떤 정보를 먼저 정해야 할지, 각자 요청이 가능한지와 개별 견적을 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 기준 사진·참여 인원·인원별 요청·희망일을 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 제작 가능한 디자인과 주문 조건을 확인할 수 있습니다. 아직 모든 의견이 모이지 않았다면 합의된 부분부터 알려 주셔도 됩니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "다른 친구의 호수나 문구를 대표자가 임의로 확정하지 말고 본인에게 확인해 주세요.",
  "인원 추가와 디자인 변경에 따른 견적·일정은 다시 확인해야 합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "우정반지 주문제작 상담 안내",
    "description": "참여 인원과 공통 기준 사진으로 상담을 시작하세요."
  },
  {
    "to": "/gallery",
    "label": "함께 고를 반지 디자인 둘러보기",
    "description": "공통으로 남기고 싶은 선과 장식을 사진에서 찾아보세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "각자 확인할 반지 사이즈",
    "description": "디자인을 정한 뒤 착용할 손가락의 호수를 확인하는 안내입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '우정반지 주문제작, 여럿이 맞추는 순서'
const gmArticleLead = '친구들과 우정반지를 맞추려는데 단체 대화방에 후보 사진만 계속 쌓이고 있나요? 우정반지 주문제작은 “모두 똑같이 맞출 부분”을 먼저 합의하고, 각자의 요청을 한 줄씩 정리하면 시작하기 쉽습니다. 아래 순서로 의견을 모은 뒤 귀족에 참여 인원과 참고 사진을 보내 보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '우정반지 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '우정반지 인원별 디자인과 주문 조건'
const gmHeroAlt = '얇은 직선 홈이 하나씩 들어간 금빛 민자 반지 세 개가 크기만 다르게 나란히 놓인 모습'
const gmHeroCaption = '구성을 설명하기 위해 만든 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '맞춤 반지의 기본 선택 항목은 GIA 안내를 참고했습니다. 여러 사람이 공통안과 개별 요청을 정리하는 표·문의 예시는 우정반지 상담을 준비하기 위한 제안이며, 귀족의 제작 조건은 디자인별로 확인합니다.'
const gmSources = [
  {
    "label": "GIA — Guide to Custom Engagement Rings",
    "url": "https://4cs.gia.edu/en-us/blog/guys-guide-custom-engagement-rings/",
    "note": "맞춤 반지의 스타일·색상·사이즈를 별도로 확인하는 기본 안내."
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
