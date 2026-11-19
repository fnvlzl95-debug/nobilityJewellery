<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-signet-ring-seal-design-direction'
const pageTitle = 'AI 시그넷 반지 주문제작, 문양 방향 정하는 법 | 귀족'
const pageDescription = 'AI로 만든 문양으로 시그넷 반지를 주문할 때 반지 위에서 보이는 방향과 왁스에 찍히는 방향을 비교하세요. 제비 도안 예시로 좌우 반전, 각인할 선, 종로 제작 상담에 보낼 자료를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-signet-ring-seal-design-direction-hero.webp`
const publishedAt = '2026-11-19'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI로 만든 반지 사진 한 장만 있어도 문의할 수 있나요?",
    "answer": "네. 원본에 제비의 부리나 이니셜처럼 방향을 알아볼 부분을 표시하고, 반지 위와 왁스 자국 중 어디에서 그렇게 보이고 싶은지 적어 주세요."
  },
  {
    "question": "왁스에 이니셜을 바로 읽히게 하려면 제가 미리 뒤집어야 하나요?",
    "answer": "직접 뒤집을 필요는 없습니다. 읽히길 원하는 철자를 텍스트로 쓰고 원본에 ‘찍힌 모습 기준’이라고 표시하세요. 반지에 새길 반전 도안은 별도로 확인합니다."
  },
  {
    "question": "좌우 대칭 문양도 방향을 표시해야 하나요?",
    "answer": "문양 전체가 대칭이라면 차이가 작습니다. 다만 안에 들어간 글자, 한쪽의 작은 점이나 바깥 테두리 장식까지 대칭인지 살펴보세요."
  },
  {
    "question": "착용용 반지로 편지 봉투에 인장도 찍을 수 있나요?",
    "answer": "용도를 함께 알려 주셔야 합니다. 반지 위에서 읽히는 글은 찍으면 거울상이 되고, 장식 각인의 깊이와 모양도 원하는 인장 자국에 맞는지 확인해야 합니다."
  },
  {
    "question": "제작 기간과 견적은 언제 알 수 있나요?",
    "answer": "귀족 주문제작은 최소 3주입니다. 문양과 용도, 윗면 크기, 호수, 소재를 상담한 뒤 가능한 작업 범위와 견적, 수령 일정을 안내합니다."
  }
]
const quickAnswers = [
  "손에 끼고 볼 문양이라면 반지 정면에서 원하는 방향을 표시하세요. 왁스에 찍을 인장이라면 찍힌 결과를 기준 그림으로 보내고, 반지에 새길 반전 도안을 따로 확인하세요.",
  "AI가 만든 이미지에 이니셜이 있다면 정확한 철자를 텍스트로도 보내세요. 글자와 새 그림을 한 덩어리로 반전해야 글자 획과 부리의 방향을 함께 비교할 수 있습니다.",
  "종로 귀족에 문의할 때는 원본 시안 한 장에 기준 방향, 남길 선, 희망 크기를 적어 주세요. 실제 인장 기능은 제작 가능 여부를 먼저 확인하며, 귀족 주문제작 기간은 최소 3주입니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "반지 위의 제비와 왁스 위의 제비는 어떻게 다른가요?",
    "paragraphs": [
      "대표 이미지에서 반지를 정면으로 보면 제비 부리가 왼쪽에 있습니다. 이 모습으로 착용하고 싶다면 사진에 ‘반지 정면에서 왼쪽’이라고 써 주세요. 반대로 봉투에 찍힌 제비가 왼쪽을 향해야 한다면, 반지 표면의 부리는 오른쪽을 향해야 합니다. 위아래를 그대로 두고 좌우를 뒤집어 보세요.",
      "예일 영국미술센터가 소개하는 인장 반지에도 같은 원리가 보입니다. 왁스에 찍힌 글을 읽을 수 있도록 반지에는 글을 거꾸로 새겼습니다. 이니셜이 있는 디자인은 글자 순서만 바꾸면 획의 방향이 맞지 않습니다. 글자까지 포함한 그림 전체를 거울에 비춰 보는 편이 이해하기 쉽습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "AI 시안 한 장으로 반지 정면과 찍힌 모습을 비교하는 법",
    "paragraphs": [
      "원본은 그대로 두고 사본 한 장을 휴대폰 사진 편집기의 좌우 반전 기능으로 뒤집으세요. 두 이미지 아래에 각각 ‘반지 정면’과 ‘왁스에 찍힌 모습’이라고 적습니다. 용도에 따라 원본이 어느 쪽에 들어갈지 먼저 정하면 이미 뒤집은 파일을 다시 뒤집는 실수를 줄일 수 있습니다.",
      "착용 방향도 따로 표시하면 좋습니다. 손등 사진 위에 시안을 얹어 반지 윗면에서 손톱 쪽이 어디인지 화살표로 그려 주세요. 사진을 반 바퀴 돌리면 위아래가 함께 바뀝니다. 왁스에 찍힐 좌우 방향을 비교할 때와 손가락에 낄 방향을 맞출 때는 각각의 사진을 보세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "목적",
        "기준으로 보낼 그림",
        "상담 메모 예시"
      ],
      "rows": [
        [
          "평소 착용",
          "반지를 정면에서 본 그림",
          "손등을 위로 했을 때 부리가 왼쪽"
        ],
        [
          "편지 봉인",
          "왁스에 찍혀 보일 그림",
          "봉투에서 읽을 때 이니셜이 JH"
        ],
        [
          "두 용도 모두",
          "반지와 찍힌 자국을 나란히 놓은 그림",
          "어느 쪽에서 글자를 읽을지 우선순위 표시"
        ]
      ]
    }
  },
  {
    "title": "AI 그림의 그림자와 실제로 새길 선은 어떻게 나누나요?",
    "paragraphs": [
      "제비 날개 아래로 가느다란 검은 선이 두 개 보인다고 해 보겠습니다. 하나는 날개의 윤곽이고 다른 하나는 금속에 비친 그림자일 수 있습니다. 시안 사본에서 꼭 새길 윤곽만 색으로 따라 그어 주세요. 눈과 꼬리 갈래처럼 작아져도 남기고 싶은 특징 두 곳을 동그라미 치면 상담할 때 기준이 생깁니다.",
      "그림을 원하는 반지 윗면 크기로 종이에 출력해 손가락 위에 대 보세요. 예를 들어 원하는 윗면 폭이 12mm라면 출력한 타원의 가로가 자로 재어 12mm인지 먼저 확인하세요. 부리와 테두리 사이 여백, 갈라진 꼬리 사이의 틈이 실제 크기에서도 보이는지 살핍니다. 잘 보이지 않는 부분은 윗면을 키우거나 안쪽 선을 줄인 두 안으로 비교할 수 있습니다. 새길 깊이와 선 간격은 소재와 실제 치수를 보고 정합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "장식 각인과 인장 제작은 견적에서 무엇을 확인하나요?",
    "paragraphs": [
      "착용용이라면 반지 위에서 문양이 어떻게 보일지가 기준입니다. 반지 호수, 윗면 가로·세로, 원하는 금속, 남길 선을 보내면 같은 조건으로 견적을 비교하기 좋습니다. 시안에 입체로 솟아 보이는 새를 원한다면 ‘윤곽선만 파기’와 ‘새의 몸통을 도드라지게 남기기’ 중 어느 모습인지도 표시해 주세요.",
      "봉투에 찍을 용도라면 ‘실링 왁스에 찍어 쓸 예정’이라고 첫 문의에 적어 주세요. 반지에서 움푹 파인 자리는 찍힌 자국에서 도드라집니다. 선 각인만 한 착용용 반지가 원하는 자국까지 남기는지는 별도 문제입니다. 해당 문양으로 인장 제작이 가능한지, 찍힌 모양을 어떻게 확인할 수 있는지 견적 전에 물어보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 보낼 제작 문의 예시",
    "paragraphs": [
      "“AI로 그린 제비를 시그넷 반지로 맞추고 싶습니다. 첨부한 사진은 반지 정면 기준입니다. 부리는 왼쪽으로, 꼬리의 두 갈래는 살리고 날개 안쪽 잔선은 생략해 주세요. 착용용으로 생각하고 있습니다. 이 문양이 보일 윗면 크기와 14K 제작 견적이 궁금합니다.”",
      "실링 왁스에 쓸 생각이라면 마지막 두 문장을 ‘첨부한 그림은 왁스에 찍힌 모습 기준입니다. 이 방향으로 찍히는 인장 제작이 가능한지 먼저 알고 싶습니다’로 바꿔 주세요. 아래 카톡 상담으로 기준 그림과 예산, 희망 수령일을 보내면 됩니다. 귀족 주문제작은 최소 3주이며, 디자인과 소재를 정한 뒤 수령 일정을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "반전본만 보내면 원래 의도를 알기 어렵습니다. 원본 파일을 함께 보내고 어느 그림을 기준으로 삼을지 표시하세요.",
  "확대 이미지에 보이는 잔선과 음영은 실제 크기에서 다르게 보일 수 있습니다. 제작 전 최종 도안에서 새길 부분을 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/signet-ring-face-shape-selection-guide",
    "label": "시그넷 반지 윗면 고르기",
    "description": "문양을 담을 윗면 모양과 착용감을 비교해 보세요."
  },
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 이미지로 주얼리 상담하기",
    "description": "생성한 이미지에서 유지할 디자인과 바꿀 부분을 정리하세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "디자인 확정과 제작 일정, 상담 방법을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 시그넷 반지 주문제작, 문양 방향 정하는 법'
const gmArticleLead = 'AI 시안 속 제비가 왼쪽을 보고 있다면, 완성된 반지에서도 왼쪽을 보길 원하시나요? 아니면 편지 봉투에 찍힌 제비가 왼쪽을 봐야 할까요? 시그넷 반지 주문제작은 문양을 어디에서 볼지 정하는 일부터 시작합니다. 같은 새를 새겨도 반지 표면과 왁스에 찍힌 자국은 서로 거울상입니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '시그넷 반지 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 문양 시그넷 반지 제작'
const gmHeroAlt = '왼쪽을 향해 나는 제비의 윤곽을 타원형 윗면에 새긴 금빛 시그넷 반지 디자인 예시'
const gmHeroCaption = 'AI로 만든 착용용 디자인 예시입니다. 제비의 부리와 갈라진 꼬리가 어느 쪽을 향하는지 살펴보세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '인장과 찍힌 자국의 관계는 예일 영국미술센터의 소장품 해설을, 제작 상담 및 기간은 귀족 안내를 참고했습니다. 제비 도안은 방향을 비교하기 위한 예시입니다.'
const gmSources = [
  {
    "label": "예일 영국미술센터 — 왁스 인장 반지",
    "url": "https://interactive.britishart.yale.edu/slavery-and-portraiture/303/signet-ring-for-wax-seal",
    "note": "왁스에 찍은 글을 읽을 수 있도록 반지의 문양을 반전해 새긴 소장품을 소개합니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "참고 사진과 원하는 소재로 제작 범위를 상담하며, 최소 3주를 기준으로 세부 일정을 안내합니다."
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
