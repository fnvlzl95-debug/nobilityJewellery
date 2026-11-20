<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/custom-constellation-necklace-star-layout'
const pageTitle = '별자리 목걸이 주문제작, 어느 별에 보석을 넣을까? | 귀족'
const pageDescription = '별자리 목걸이 주문제작을 위한 도안 준비법입니다. AI 시안에서 남길 별의 위치, 점 각인과 보석 세팅, 펜던트 실제 크기를 비교하고 종로 귀족에 견적을 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/custom-constellation-necklace-star-layout-hero.webp`
const publishedAt = '2026-11-20'
const updatedAt = ''
const faqItems = [
  {
    "question": "별자리 이름만 알고 있어도 목걸이 제작 상담이 가능한가요?",
    "answer": "가능합니다. 이름과 함께 별을 점으로 표시한 배열, 별자리 기호, 그림 중 어떤 모습이 좋은지 알려 주세요. 세부 배치는 도안을 보고 정합니다."
  },
  {
    "question": "AI 시안과 별지도에서 별 위치가 다르면 어떻게 하나요?",
    "answer": "실제 별 배열이 중요한 경우에는 별지도를 위치 기준으로 지정하세요. AI 시안에는 유지하고 싶은 펜던트 외곽, 금속 색과 마감을 표시하면 됩니다."
  },
  {
    "question": "별 하나만 탄생석으로 넣을 수 있나요?",
    "answer": "한 자리에만 탄생석을 넣는 구성을 문의할 수 있습니다. 도안에 그 별을 표시하고 원하는 탄생석을 알려 주시면 돌의 크기와 펜던트 두께에 맞는지 확인합니다."
  },
  {
    "question": "별자리 연결선 없이 점만 새겨도 되나요?",
    "answer": "점만 새긴 도안도 상담할 수 있습니다. 실제 착용 크기로 줄여 본 뒤 가까운 별들이 구별되는지 확인하고, 유지할 점의 개수와 간격을 정하세요."
  },
  {
    "question": "선물 일정에 맞추려면 언제 문의해야 하나요?",
    "answer": "귀족 주문제작은 최소 3주를 기준으로 합니다. 기념일, 별지도, 희망 소재를 함께 보내고 도안 확정과 보석 준비를 반영한 수령 가능일을 확인하세요."
  }
]
const quickAnswers = [
  "별자리 이름과 마음에 드는 배열 그림을 함께 보내세요. 특정한 날의 밤하늘을 담고 싶다면 날짜·시간·장소를 설정한 별지도를 기준으로 삼으세요.",
  "시안에서 꼭 남길 별에 번호를 붙이고 보석을 넣을 번호 하나에 동그라미를 치세요. 점 사이의 연결선을 새길지도 따로 정하면 견적에 포함할 작업이 분명해집니다.",
  "펜던트 크기, 금속, 보석 종류와 수량, 체인 포함 여부가 견적을 가릅니다. 귀족 주문제작은 최소 3주이며 최종 도안과 소재를 확인한 뒤 수령 일정을 안내합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "생일 별자리 이름과 그날 본 밤하늘, 무엇을 보내야 하나요?",
    "paragraphs": [
      "생일 선물로 천칭자리를 고른다면 먼저 어떤 그림을 담을지 정하세요. 저울 그림이 마음에 든 사람과 별 몇 개를 선으로 이은 도안을 원하는 사람은 같은 이름으로 전혀 다른 목걸이를 떠올릴 수 있습니다. 원하는 쪽을 한 장 골라야 다음 단계에서 점과 보석을 배치하기 쉽습니다.",
      "둘이 함께 본 밤하늘을 기념한다면 관찰한 도시와 날짜, 현지 시각, 바라본 방향을 적어 두세요. 그 조건으로 별지도에서 찾은 화면은 별의 위치를 정하는 자료가 되고, AI로 만든 목걸이 그림은 금속 색과 마감을 정하는 자료가 됩니다. 두 사진에 각각 용도를 적으면 어느 쪽을 따라야 할지 분명합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "별 세 개 중 보석 하나를 고르는 방법",
    "paragraphs": [
      "여름밤을 기억하는 선물이라면 베가·알타이르·데네브를 이은 여름철 대삼각형을 모티브로 삼을 수 있습니다. NASA는 이 세 별을 하늘에서 알아보기 쉬운 별무리의 예로 소개합니다. 특정 별에 의미를 담고 싶다면 별 이름이 보이는 지도에 먼저 동그라미를 치고 그 점을 제작 도안으로 옮기세요.",
      "대표 이미지처럼 세 점을 이은 펜던트에서는 두 점을 작게 파고 한 자리에 옅은 파란색 보석을 넣으면 눈이 그곳에 먼저 갑니다. ‘제일 밝은 별에 보석’이라는 말은 AI 시안의 빛 번짐 때문에 모호할 수 있습니다. ‘첨부 도안 기준 왼쪽 아래 ③에 한 알’이라고 적으면 같은 자리를 보고 상담할 수 있습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "도안에 적을 표시",
        "별 세 개 펜던트 예시",
        "제작 전 확인할 부분"
      ],
      "rows": [
        [
          "①·② 점 각인",
          "금속에 작은 점 두 곳",
          "두 점을 같은 크기로 할지"
        ],
        [
          "③ 보석 한 알",
          "하늘색 보석으로 강조",
          "보석 종류·지름과 세팅 가능 여부"
        ],
        [
          "연결선",
          "①–②–③–① 삼각형",
          "세 변을 모두 새길지"
        ]
      ]
    }
  },
  {
    "title": "별 사이를 선으로 이을지, 점만 남길지 비교하세요",
    "paragraphs": [
      "펜던트를 종이 위에 한 번 그린 뒤 같은 크기로 두 장 복사해 보세요. 한 장에는 별 위치만 찍고, 다른 한 장에는 원하는 점 사이를 선으로 이으세요. 점만 남기면 여백이 넓어 보이고, 선을 더하면 작은 펜던트에서도 별을 따라 눈이 움직입니다. 모든 점을 서로 이을 필요는 없습니다.",
      "예를 들어 지름 14mm와 18mm가 고민이라면 두 크기의 종이 원을 잘라 실제 착용할 높이에 대 보세요. 원 위쪽에 체인 고리 위치를 표시하고, 서로 가장 가까운 두 별과 테두리 사이가 어떻게 보이는지 비교하세요. 이 치수는 비교용 예시입니다. 실제 보석이 들어갈 자리와 필요한 판 두께는 선택한 돌의 크기를 보고 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 별자리 도안인데 견적이 달라지는 부분",
    "paragraphs": [
      "‘별 세 개’라는 주문도 세 점을 모두 각인할 때와 보석 세 알을 고정할 때는 필요한 작업이 다릅니다. 예산을 정했다면 같은 펜던트 지름과 같은 소재를 기준으로 ‘전체 점 각인’과 ‘점 두 곳에 보석 한 알’ 두 구성을 문의하세요. 원하는 별에 색을 넣는 데 얼마의 차이가 나는지 비교하기 쉽습니다.",
      "AI 그림 속 하늘색만으로 보석 종류를 정할 수는 없습니다. 특정 탄생석을 원하는지, 연한 파랑이면 다른 보석도 괜찮은지 알려 주세요. 이미 쓰는 체인이 있다면 끝장식 옆에 자를 대고 찍은 사진을 보내세요. 고리에 통과할지 확인하고 펜던트 단품과 체인 포함 견적을 구분할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 이렇게 문의해 보세요",
    "paragraphs": [
      "“함께 본 여름밤을 기념해 목걸이를 맞추고 싶어요. 첫 사진은 별의 위치를 고른 지도이고 두 번째는 제가 AI로 만든 시안입니다. 지도에서 동그라미 친 별만 파란 보석 한 알로, 나머지 두 별은 점으로 새기고 싶습니다. 세 점을 가는 선으로 이은 14K 펜던트 단품 견적이 궁금합니다.”",
      "여기에 원하는 펜던트 지름과 예산, 선물할 날짜를 덧붙이세요. 종로 귀족은 주문제작 기간을 최소 3주로 안내합니다. 날짜가 정해져 있다면 상담할 때 먼저 알려 주세요. 아래 카톡 상담으로 도안을 보내면 소재와 보석, 각인 범위를 바탕으로 가능한 구성과 수령 일정을 확인할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "별지도 화면을 잘라 보낼 때는 고른 별과 이웃한 별이 함께 보이게 남겨 주세요. 점 하나만 확대하면 방향을 맞추기 어렵습니다.",
  "별 무늬 주변의 반짝임까지 새기고 싶다면 별도로 표시하세요. 빛 반사와 실제로 파야 할 선이 같은 사진에 담길 수 있습니다."
]
const relatedLinks = [
  {
    "to": "/guide/gold-pendant-only-custom-cost",
    "label": "금 펜던트 단품 견적 보기",
    "description": "가지고 있는 체인을 쓸 때 견적에 포함되는 항목을 확인하세요."
  },
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 디자인으로 상담 준비하기",
    "description": "원본 이미지에 제작 시 유지할 부분을 표시하는 방법입니다."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 상담",
    "description": "제작 과정과 일정, 희망 소재를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '별자리 목걸이 주문제작, 어느 별에 보석을 넣을까?'
const gmArticleLead = '별자리 목걸이를 맞출 때는 꼭 남기고 싶은 별부터 고르세요. 그중 눈에 먼저 들어왔으면 하는 별에만 보석을 놓고, 나머지는 작은 점으로 새겨도 별의 배열이 드러납니다. AI로 만든 시안이라면 반짝이는 점을 모두 보석으로 해석하기 쉬우니, 원본 위에 ‘보석 한 곳’과 ‘점 각인’을 표시해 보내는 것이 좋습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '별자리 목걸이 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 별자리 펜던트 제작'
const gmHeroAlt = '금빛 원형 펜던트에 점 두 개와 연한 파란색 보석 한 알을 삼각형으로 이은 별자리 목걸이 시안'
const gmHeroCaption = '점 각인 두 곳과 보석 한 곳을 비교할 수 있도록 AI로 만든 디자인 예시입니다. 왼쪽 아래의 보석이 삼각형의 한 꼭짓점을 이룹니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '여름철 대삼각형을 이루는 별은 NASA의 별무리 해설을 참고했습니다. 제작 기간과 견적 절차는 귀족 주문제작 안내를 기준으로 합니다.'
const gmSources = [
  {
    "label": "NASA — 여름철 대삼각형을 이루는 별",
    "url": "https://science.nasa.gov/solar-system/skywatching/what-are-asterisms/",
    "note": "여름철 대삼각형은 베가·알타이르·데네브 세 별을 이은 별무리입니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "참고 사진과 소재, 각인 범위를 확인해 견적을 안내하며 주문제작 기간은 최소 3주입니다."
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
