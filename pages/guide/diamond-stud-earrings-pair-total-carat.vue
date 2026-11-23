<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/diamond-stud-earrings-pair-total-carat'
const pageTitle = '1캐럿 다이아 귀걸이, 한쪽은 몇 부일까? | 귀족'
const pageDescription = '1캐럿 다이아 귀걸이가 한쪽 5부인지 한 알 1캐럿인지 알아보세요. 한 쌍 총중량과 중심석 중량을 계산하는 표, 반벌 가격과 헤일로 세팅 견적을 구분하는 질문을 담았습니다.'
const ogImage = `${siteConfig.url}/Image/guide/diamond-stud-earrings-pair-total-carat-hero.webp`
const publishedAt = '2026-11-23'
const updatedAt = ''
const faqItems = [
  {
    "question": "3부 귀걸이 한 쌍이면 총 몇 캐럿인가요?",
    "answer": "한쪽마다 3부 다이아 한 알이고 주변석이 없다면 0.30ct 두 알로 총 0.60ct입니다. 3부가 한쪽 기준인지부터 확인하세요."
  },
  {
    "question": "1.00ct TW라고 적혀 있으면 한 알 무게인가요?",
    "answer": "TW는 총중량(total weight)을 뜻합니다. 한 쌍 전체를 합친 수치인지, 한쪽 장식에 들어간 다이아의 합계인지 상품 설명에서 합산 범위를 확인하세요."
  },
  {
    "question": "다이아 반벌 귀걸이로 주문하면 몇 개가 오나요?",
    "answer": "반벌은 일반적으로 귀걸이 한 개를 뜻합니다. 구매 전 선택 옵션의 구성 수량과 한쪽 뒷마개가 포함되는지 확인하세요."
  },
  {
    "question": "5부 두 알과 1캐럿 한 알은 가격이 같나요?",
    "answer": "합계 무게는 같지만 개별 보석의 크기와 품질이 달라 같은 가격으로 계산할 수 없습니다. 귀걸이는 세팅과 뒷마개까지 포함한 완성가를 따로 확인하세요."
  },
  {
    "question": "한 쌍 주문제작에는 얼마나 걸리나요?",
    "answer": "귀족 주문제작 기간은 최소 3주입니다. 두 후보석의 중량과 치수, 금속과 뒷마개를 정하고 선물 날짜에 맞춰 수령 가능한지 확인하세요."
  }
]
const quickAnswers = [
  "‘한 쌍 합계 1.00ct’라면 양쪽 다이아 무게를 더해 1.00ct입니다. 한쪽당 0.50ct라는 계산은 동일 중량 한 알씩을 넣은 경우에만 맞습니다.",
  "‘한쪽 1.00ct’와 ‘한 쌍 1.00ct’의 견적은 구성이 다릅니다. 옵션에서 반벌·낱개·한 쌍을 확인하고, 중심석 각각의 중량과 합계가 같은 줄에 적혀 있는지 보세요.",
  "가운데 돌 둘레에도 다이아가 있는 헤일로 귀걸이는 주변석까지 총중량에 들어갈 수 있습니다. 중심석 두 알과 주변석 합계를 나눠 물으면 서로 다른 디자인도 비교하기 쉽습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "한 쌍 1캐럿을 5부씩으로 읽어도 되는 조건",
    "paragraphs": [
      "귀걸이 두 개에 같은 무게의 다이아를 하나씩 달았다면 계산은 간단합니다. 1.00ct를 두 알로 나눈 값이 0.50ct이고, 국내 주얼리 매장에서 말하는 5부에 해당합니다. 아래 표는 주변석이 없고 두 알의 무게가 같은 스터드 귀걸이의 계산 예시입니다.",
      "‘총 1.00ct’만으로 두 알의 개별 중량까지 알 수는 없습니다. 왼쪽 0.49ct와 오른쪽 0.51ct를 더해도 합계는 1.00ct입니다. 선물할 두 알을 각각 0.50ct 이상으로 맞추고 싶다면 그 조건을 주문할 때 명확히 적으세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "양쪽 한 쌍의 다이아 총중량",
        "한쪽에 들어간 한 알",
        "매장에서 물어볼 표현"
      ],
      "rows": [
        [
          "0.60ct",
          "0.30ct (3부)",
          "3부 두 알 한 쌍 가격인가요?"
        ],
        [
          "1.00ct",
          "0.50ct (5부)",
          "한쪽 5부, 양쪽 합계 1캐럿인가요?"
        ],
        [
          "2.00ct",
          "1.00ct (1캐럿)",
          "한쪽에 1캐럿씩 두 알인가요?"
        ]
      ]
    }
  },
  {
    "title": "헤일로 귀걸이는 왜 총중량을 반으로 나누면 안 될까요?",
    "paragraphs": [
      "중심석 하나를 작은 다이아로 둘러싼 디자인을 헤일로라고 합니다. 예를 들어 한쪽마다 중심석 0.30ct와 주변석 합계 0.20ct를 썼다면 양쪽 다이아의 합은 1.00ct입니다. 한쪽에 들어간 다이아 전체는 5부지만, 가운데에서 가장 크게 보이는 한 알은 3부입니다.",
      "이런 귀걸이를 한 알짜리 스터드와 나란히 볼 때는 중심석의 정면 지름과 주변을 포함한 장식 전체의 폭을 각각 물어보세요. 하나는 보석 자체의 크기이고, 다른 하나는 귓불을 덮는 범위입니다. 귓불에서 어느 정도로 보이길 원하는지에 따라 비교할 숫자가 달라집니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "‘반벌’ 옵션을 선택하면 가격은 어디까지인가요?",
    "paragraphs": [
      "한 벌은 보통 한 쌍을, 반벌이나 낱개는 귀걸이 한쪽을 뜻합니다. 상품 사진에 두 개가 보여도 선택한 옵션의 수량을 다시 보세요. 예를 들어 ‘5부 / 반벌’ 한 개를 고른 경우에는 양쪽 착용분을 마련하려면 어떤 옵션과 수량을 주문해야 하는지 확인하는 편이 정확합니다.",
      "판매처 두 곳의 견적을 비교할 때는 ‘라운드 천연 다이아 0.50ct 두 알, 14K 스터드, 뒷마개 두 개 포함, 한 쌍 완성가’처럼 조건을 한 줄로 맞춰 보세요. 랩그로운 다이아를 원하면 같은 줄에서 보석 종류만 바꿔 문의하세요. 모이사나이트로 표기한 상품은 별도의 보석이므로 보석명도 함께 확인해야 합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "무게가 맞으면 두 귀에서 크기도 같아 보일까요?",
    "paragraphs": [
      "캐럿은 무게 단위입니다. 같은 0.50ct라도 돌의 깊이와 비율에 따라 정면에서 보이는 지름이 달라질 수 있습니다. 양쪽 후보석의 지름을 mm 단위로 요청하고, 같은 조명 아래 흰 바탕에 나란히 둔 사진을 보면 한쪽만 더 넓거나 짙어 보이는지 비교하기 좋습니다.",
      "반짝임까지 비교하고 싶다면 두 돌을 함께 조금씩 기울이는 짧은 영상이 도움이 됩니다. 착용 때 보일 크기는 금속 테두리와 발의 위치에도 영향을 받습니다. 평소 즐겨 끼는 귀걸이의 앞장식 폭을 재 두면 ‘한쪽 5부’라는 숫자에 내 착용 기준을 더할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 한 쌍 견적을 문의하는 문장",
    "paragraphs": [
      "“양쪽에 다이아 한 알씩 있는 귀걸이를 맞추려고 합니다. 한쪽은 5부 전후, 두 알 합계는 1캐럿 전후를 생각하고 있어요. 후보석별 중량과 정면 지름, 14K 스터드와 뒷마개 두 개를 포함한 한 쌍 견적을 알고 싶습니다.” 이 정도면 중량과 수량을 같은 기준으로 상담할 수 있습니다.",
      "헤일로 디자인이 마음에 들면 참고 사진과 함께 ‘중심석은 한쪽 몇 부인지, 주변석까지 더한 총중량은 얼마인지 알려 주세요’라고 덧붙이세요. 종로 귀족의 주문제작은 최소 3주입니다. 카톡에 예산과 필요한 날짜를 보내면 후보석 준비 여부와 디자인을 확인한 뒤 가능한 수령 일정을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "계산표의 중량은 비교를 위한 예시입니다. 실제 주문에서는 선택한 두 알의 개별 중량과 한 쌍 합계를 확인하세요.",
  "‘1캐럿 크기’라는 문구가 있다면 실제 보석 종류, 중량, 정면 치수를 요청하세요. 크기 비교용 표현과 실측값은 쓰임이 다릅니다."
]
const relatedLinks = [
  {
    "to": "/guide/stud-earring-meaning-selection-guide",
    "label": "스터드 귀걸이 구조와 선택 기준",
    "description": "한 알의 크기를 정한 뒤 침과 뒷마개 구조를 확인하세요."
  },
  {
    "to": "/guide/custom-earrings-production-time",
    "label": "귀걸이 한 쌍 제작 일정",
    "description": "후보석과 디자인을 정한 뒤 수령일까지 걸리는 과정을 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 상담",
    "description": "원하는 보석과 한 쌍 예산을 보내 제작 가능 범위를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '1캐럿 다이아 귀걸이, 한쪽은 몇 부일까?'
const gmArticleLead = '양쪽에 다이아 한 알씩 들어간 귀걸이 한 쌍의 합계가 1캐럿이고 두 알의 무게가 같다면, 한쪽은 0.50캐럿인 5부입니다. 한 알이 1캐럿이면 한 쌍은 2캐럿입니다. 상품명에 ‘1캐럿 다이아 귀걸이’만 적혀 있을 때는 무엇을 합산한 숫자인지, 표시 가격으로 몇 개를 받는지 먼저 확인하세요.'
const gmArticleCategory = '가격'
const gmArticleKeyword = '1캐럿 다이아 귀걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '다이아 귀걸이 한 쌍 견적'
const gmHeroAlt = '둥근 보석 한 알씩을 네 발로 고정한 금빛 스터드 귀걸이 한 쌍의 정면과 옆면'
const gmHeroCaption = '한쪽에 보석 한 알씩 세팅한 구조를 보여 주는 AI 디자인 예시입니다. 실제 캐럿과 크기는 후보석의 중량과 치수로 확인하세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '캐럿 단위와 다이아 스터드 선택 기준은 GIA 자료를 참고했습니다. 표와 헤일로의 무게는 계산 예시이며 제작 기간은 귀족 안내 기준입니다.'
const gmSources = [
  {
    "label": "GIA — 캐럿 중량의 정의",
    "url": "https://4cs.gia.edu/interactive-4cs/carat-weight/index.html",
    "note": "캐럿은 보석 무게 단위이며 같은 중량의 다이아라도 다른 품질 요인에 따라 가치가 달라질 수 있습니다."
  },
  {
    "label": "GIA — 다이아 스터드 귀걸이 선택",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-choose-diamond-stud-earrings/",
    "note": "스터드 한 쌍에 들어가는 다이아를 고를 때 개별 중량과 컷 등 품질을 함께 살펴봅니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "디자인과 소재를 확인해 견적을 안내하며 주문제작은 최소 3주를 기준으로 합니다."
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
