<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/tanzanite-necklace-blue-violet-color'
const pageTitle = '탄자나이트 목걸이, 파란빛과 보랏빛 고르는 법 | 귀족'
const pageDescription = '12월 탄생석 탄자나이트 목걸이에서 파란빛과 보랏빛이 함께 보이는 이유를 알아보세요. 펜던트 정면색과 실제 크기를 비교하고 열처리 여부를 확인하는 주문 가이드입니다.'
const ogImage = `${siteConfig.url}/Image/guide/tanzanite-necklace-blue-violet-color-hero.webp`
const publishedAt = '2026-11-27'
const updatedAt = ''
const faqItems = [
  {
    "question": "탄자나이트도 12월 탄생석인가요?",
    "answer": "네. GIA는 탄자나이트, 터키석, 지르콘을 12월 탄생석으로 소개합니다. 푸른색에 보라가 섞여 보이는 보석을 원한다면 탄자나이트가 한 가지 선택입니다."
  },
  {
    "question": "같은 돌이 각도에 따라 보라색으로 보여도 되나요?",
    "answer": "그럴 수 있습니다. 탄자나이트는 결정 방향에 따라 색이 달라 보이는 다색성이 있습니다. 같은 조명에서 정면과 기울인 모습을 비교해 보세요."
  },
  {
    "question": "열처리라고 적혀 있으면 합성인가요?",
    "answer": "열처리는 색을 바꾸기 위한 가공을 뜻합니다. 천연 탄자나이트에도 널리 쓰이므로 천연 여부와 처리 여부를 각각 확인하세요."
  },
  {
    "question": "기존 금목걸이에 탄자나이트 펜던트만 맞출 수 있나요?",
    "answer": "제작 가능 여부를 상담할 수 있습니다. 체인 끝장식의 가장 넓은 부분을 자 옆에서 찍어 보내면 펜던트 고리를 통과할 수 있는지 확인하는 데 도움이 됩니다."
  },
  {
    "question": "탄생일 선물은 언제 주문해야 하나요?",
    "answer": "귀족 주문제작은 최소 3주가 필요합니다. 원하는 색의 돌을 확보하는 시간도 고려해 희망 수령일을 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "탄자나이트는 터키석·지르콘과 함께 12월 탄생석으로 꼽힙니다. 같은 탄자나이트 안에서도 파란 기가 강한 돌과 보라색이 먼저 눈에 들어오는 돌이 있습니다.",
  "정면 사진은 착용할 때 보이는 주된 색을, 같은 조명에서 돌을 기울인 영상은 방향에 따라 섞여 보이는 색을 확인하는 데 쓰세요.",
  "색을 낼 목적으로 열처리한 탄자나이트가 널리 유통됩니다. 상품 사진만 보고 비가열이나 천연 여부를 판단하기는 어렵습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "왜 한 알에서 파랑과 보라가 함께 보일까요?",
    "paragraphs": [
      "탄자나이트는 조이사이트의 청색~보라색 변종입니다. 결정 안에서 빛이 지나가는 방향에 따라 보이는 색이 달라지는 성질을 다색성이라고 합니다. 원석의 어느 면을 정면으로 잡고 연마했는지가 완성된 펜던트의 첫인상을 좌우합니다.",
      "두 후보 중 하나를 고른다고 해볼까요. A는 똑바로 볼 때 짙은 파랑이고 살짝 젖히면 보라가 비칩니다. B는 정면에서 연보라가 먼저 보입니다. 평소 보라색을 즐기는 분께 선물한다면 B를 고를 이유가 충분합니다. 진한 색과 좋아하는 색은 각각 따로 물어볼 만한 질문입니다."
    ],
    "table": null,
    "bullets": []
  },
  {
    "title": "온라인으로 주문할 때 어떤 사진을 요청할까요?",
    "paragraphs": [
      "판매자에게 후보석을 A와 B로 구분해 같은 배경에 놓아 달라고 해보세요. 따로 찍은 확대 사진에서는 배경색이나 노출 차이까지 돌의 차이로 보일 수 있습니다. 마음에 드는 돌을 골랐다면 그 번호와 펜던트 위쪽이 될 방향을 함께 기록해 두세요.",
      "예를 들어 가로 5mm, 세로 7mm인 타원형이라면 종이에 그 크기의 타원을 그려 자른 뒤 목 아래에 대 보세요. 그 종이는 보석 한 알의 윤곽에 해당합니다. 금테와 체인 고리를 더한 펜던트 전체 길이는 별도로 물어보면 선물의 실제 크기를 가늠할 수 있습니다."
    ],
    "table": {
      "headers": [
        "요청할 자료",
        "살펴볼 부분",
        "정할 내용"
      ],
      "rows": [
        [
          "같은 화면에 담은 두 알의 정면 사진",
          "푸른 기와 보랏빛 중 먼저 보이는 색",
          "선호하는 후보석 번호"
        ],
        [
          "조명을 고정하고 돌만 기울인 짧은 영상",
          "기울일 때 달라 보이는 면과 색",
          "착용 정면으로 삼을 방향"
        ],
        [
          "눈금 옆에 둔 돌 또는 펜던트 사진",
          "보석 가로·세로와 고리 포함 길이",
          "목에 걸었을 때 원하는 크기"
        ]
      ]
    },
    "bullets": []
  },
  {
    "title": "열처리한 탄자나이트도 천연석인가요?",
    "paragraphs": [
      "광물의 기원과 처리 이력은 서로 다른 정보입니다. 땅에서 나온 탄자나이트도 채굴 후 가열할 수 있습니다. GIA에 따르면 시중의 푸른 탄자나이트 대부분은 가열을 거쳐 청색과 보라색을 띱니다. 색이 진하다는 이유만으로 비가열이라고 판단할 수는 없습니다.",
      "비가열 여부가 구매 조건이라면 견적서의 보석명과 판매자가 확인해 줄 수 있는 처리 내역을 먼저 보세요. 감별 자료가 있다면 실제 문구도 요청하세요. 가열 여부를 실험실에서도 판별하기 어려운 경우가 있어, 기재가 없는 항목은 무엇까지 확인된 것인지 묻는 편이 정확합니다."
    ],
    "table": null,
    "bullets": []
  },
  {
    "title": "펜던트를 오래 착용하려면 어떻게 관리하나요?",
    "paragraphs": [
      "목걸이를 풀어 화장대에 내려놓을 때는 펜던트가 돌 상판에 먼저 부딪히지 않게 손으로 받쳐 주세요. 탄자나이트는 특정 방향으로 쪼개지는 성질이 있어 단단한 모서리에 부딪히는 충격을 피하는 것이 좋습니다. 다른 주얼리를 올려놓지 않도록 별도 칸에 보관하세요.",
      "GIA는 탄자나이트 세척에 미지근한 비눗물을 안내하며 초음파·스팀 세척은 권하지 않습니다. 집에서 가볍게 씻은 뒤에는 깨끗한 물로 헹구고 부드러운 천으로 물기를 걷어 주세요. 장식이 흔들리거나 처리 상태를 모르는 제품은 세척 전에 확인하세요."
    ],
    "table": null,
    "bullets": []
  },
  {
    "title": "종로에서 12월 탄생석 목걸이를 맞출 때",
    "paragraphs": [
      "문의할 때는 “정면에서 파랑보다 연보라가 더 많이 보이는 타원형을 찾습니다. 펜던트만 맞추고 싶고, 가지고 있는 체인 끝장식 사진을 함께 보냅니다”처럼 적어 보세요. 원하는 색과 구성을 알면 후보석을 구할 수 있는지, 기존 체인을 그대로 쓸 수 있는지부터 상담할 수 있습니다.",
      "귀족의 주문제작 기간은 최소 3주입니다. 생일에 맞추려면 원하는 수령일과 예산, 체인 포함 여부를 먼저 알려 주세요. 실제 후보석의 색·치수와 확보 일정을 확인한 뒤 디자인과 견적, 수령 가능일을 정합니다."
    ],
    "table": null,
    "bullets": []
  }
]
const cautions = [
  "화면 밝기와 촬영 조명은 색 인상에 영향을 줍니다. 판매 사진에 맞춰 화면색을 조정하기보다 같은 환경에서 찍은 실제 후보석끼리 비교하세요.",
  "캐럿은 무게 단위입니다. 펜던트 앞에서 보이는 크기를 정할 때는 보석의 가로·세로를 밀리미터로 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "생월별 탄생석 목걸이 비교",
    "description": "다른 달의 탄생석과 목걸이 선물 기준을 살펴보세요."
  },
  {
    "to": "/guide/gold-pendant-only-custom-cost",
    "label": "체인 제외 펜던트 견적 확인",
    "description": "기존 체인을 사용할 때 견적에 포함할 항목을 정리해 보세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "사진과 희망 수령일로 제작 가능 범위를 문의하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '탄자나이트 목걸이, 파란빛과 보랏빛 고르는 법'
const gmArticleLead = '탄자나이트 목걸이는 목에 걸었을 때 정면에서 가장 마음에 드는 색으로 고르세요. 탄자나이트는 보는 방향에 따라 파란빛과 보랏빛의 비율이 달라 보이는 보석입니다. 후보 두 알을 같은 조명 아래 나란히 놓고, 펜던트로 달 방향에서 찍은 사진을 보면 원하는 색을 설명하기 쉽습니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '탄자나이트 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '탄자나이트 목걸이 제작 상담'
const gmHeroAlt = '아이보리 천 위에 금빛 발로 물린 타원형 청보라색 펜던트 두 개를 나란히 놓은 예시'
const gmHeroCaption = '선호하는 청보라색을 비교하는 AI 생성 디자인 예시입니다. 주문할 돌의 색은 실제 후보석으로 확인하세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '탄자나이트의 다색성·가열 처리·세척법과 12월 탄생석 분류는 미국보석연구소(GIA) 자료를 참고했습니다. 치수와 상담 문구는 주문 방법을 설명하는 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 탄자나이트 품질 요인",
    "url": "https://www.gia.edu/tanzanite-quality-factor",
    "note": "결정 방향과 연마 방향에 따라 청색과 보라색이 달라 보이고, 유통되는 푸른 탄자나이트 대부분은 열처리를 거칩니다."
  },
  {
    "label": "GIA — 탄자나이트 관리와 세척",
    "url": "https://www.gia.edu/tanzanite-care-cleaning",
    "note": "충격에 의한 쪼개짐에 유의하고 미지근한 비눗물을 사용하며 스팀·초음파는 피하도록 안내합니다."
  },
  {
    "label": "GIA — 12월 탄생석",
    "url": "https://www.gia.edu/birthstones/december-birthstones",
    "note": "탄자나이트·지르콘·터키석을 12월 탄생석으로 소개합니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "희망 수령일과 사양을 확인해 견적과 가능 범위를 안내하며 주문제작은 최소 3주 기준입니다."
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
