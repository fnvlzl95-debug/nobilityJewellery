<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/mother-of-pearl-necklace-pendant-selection'
const pageTitle = '자개 목걸이, 빛깔과 펜던트 크기 고르는 법 | 귀족'
const pageDescription = '흰 자개 목걸이를 고를 때 정면의 바탕색과 기울였을 때의 반사빛을 비교하세요. 자개가 드러나는 폭, 고리를 포함한 길이, 체인 포함 여부를 확인하는 방법입니다.'
const ogImage = `${siteConfig.url}/Image/guide/mother-of-pearl-necklace-pendant-selection-hero.webp`
const publishedAt = '2026-11-24'
const updatedAt = ''
const faqItems = [
  {
    "question": "자개 목걸이가 사진보다 덜 분홍색인데 정상인가요?",
    "answer": "빛과 보는 방향이 달라지면 반사색이 다르게 보일 수 있습니다. 어느 조각을 촬영한 사진인지 확인하고, 같은 조각의 정면과 기울인 모습을 비교하세요."
  },
  {
    "question": "자개 목걸이와 진주 목걸이는 같은 제품인가요?",
    "answer": "자개는 껍데기 안쪽 진주층을 잘라 장식에 쓴 소재입니다. 진주 한 알을 단 목걸이를 원한다면 상세 설명에 적힌 소재와 장식 형태를 함께 확인하세요."
  },
  {
    "question": "자개가 넓게 보이려면 어떤 치수를 물어봐야 하나요?",
    "answer": "금테를 제외하고 정면에서 보이는 자개의 가로와 세로를 요청하세요. 위에 별이나 꽃 같은 금속 장식이 있으면 중앙을 덮는 범위도 함께 살펴보세요."
  },
  {
    "question": "자개 펜던트를 사면 체인도 오나요?",
    "answer": "상품 구성에 따라 다릅니다. 자개 장식 부품인지, 고리가 달린 펜던트 단품인지, 체인까지 포함한 목걸이인지 선택한 옵션에서 확인하세요."
  },
  {
    "question": "선물용 자개 목걸이 제작에는 얼마나 걸리나요?",
    "answer": "귀족 주문제작은 최소 3주를 기준으로 합니다. 원하는 자개 빛깔, 펜던트 치수, 소재와 선물 날짜를 보내고 실제 수령 가능일을 확인하세요."
  }
]
const quickAnswers = [
  "자개는 조개껍데기 안쪽의 진주층을 잘라 쓰는 장식 소재입니다. 상품 설명에서 ‘자개’와 색상을 뜻하는 ‘펄 화이트’를 구분해 보세요.",
  "흰 자개의 바탕색과 반사빛은 한 장의 사진에서 다 보이지 않을 수 있습니다. 구매할 조각의 정면 사진과 같은 조명을 유지한 짧은 영상을 요청하세요.",
  "‘펜던트 15mm’라는 표기에는 측정 방향과 고리 포함 여부가 빠져 있을 수 있습니다. 자개 노출 폭, 금테 포함 폭, 고리까지의 전체 길이를 확인한 뒤 견적을 비교하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "자개와 진주, 목걸이에서 보이는 차이는 무엇인가요?",
    "paragraphs": [
      "자개는 마더오브펄(mother-of-pearl)이라고도 부릅니다. GIA는 장식에 쓰는 자개를 연체동물 껍데기 안쪽의 진주층을 잘라 내거나 조각한 소재로 설명합니다. 둥근 진주 한 알을 단 목걸이와는 형태가 달라, 타원이나 꽃잎처럼 넓은 윤곽 안에 결을 담을 수 있습니다.",
      "화면에서 우윳빛으로 보이는 소재를 찾았다면 상품명의 색상과 상세 설명의 재료명을 함께 보세요. ‘펄 화이트’는 색이나 광택을 설명하는 말일 수도 있습니다. 선물 받는 분이 조개껍데기 고유의 결을 좋아한다면 실제 자개를 사용했는지, 사진이 배송될 개체의 사진인지부터 확인하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 흰 자개인데 사진마다 분홍빛이 다른 이유",
    "paragraphs": [
      "반사빛은 자개 표면을 어느 각도에서 비추고 바라보는지에 따라 다르게 보입니다. 온라인에서 후보를 비교할 때는 같은 바탕 위에 두 조각을 놓고 정면에서 시작해 천천히 기울여 달라고 하세요. 흰색이 고르게 남는 조각과 한쪽에 분홍빛이나 초록빛이 도는 조각을 구별하기 쉽습니다.",
      "‘분홍색으로 만들어 주세요’보다는 ‘정면에서는 흰색이고 움직일 때만 옅은 분홍빛이 보이면 좋겠습니다’처럼 원하는 장면을 말해 보세요. 반대로 결이 또렷한 쪽을 좋아한다면 마음에 드는 줄무늬를 사진에 표시하세요. 실제로 사용할 조각을 고를 수 있는지는 제작 전에 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "15mm 펜던트라면 자개도 15mm인가요?",
    "paragraphs": [
      "금테를 두른 원형 펜던트가 바깥지름 15mm이고, 정면에서 본 금테 폭이 양쪽에 각각 1mm라면 자개가 보이는 지름은 약 13mm입니다. 같은 외곽에 한쪽 테두리가 2mm씩 들어오면 약 11mm가 보입니다. 균일한 테두리를 가정한 예시지만, 숫자가 같은 두 목걸이에서 흰 부분의 인상이 달라지는 이유를 보여 줍니다.",
      "타원형이라면 가로·세로를 함께 물으세요. 고리를 포함한 총길이가 궁금할 때와 목에 걸었을 때 자개가 얼마나 넓게 보일지 궁금할 때 필요한 치수가 다릅니다. 자주 쓰는 펜던트를 자 옆에 두고 찍은 정면 사진에 원하는 자개 폭을 그려 넣으면 상담하기 편합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 치수",
        "어디서 어디까지 재나요?",
        "알 수 있는 것"
      ],
      "rows": [
        [
          "자개 노출 폭",
          "정면에서 보이는 자개의 왼쪽 끝부터 오른쪽 끝",
          "흰 바탕이 차지하는 너비"
        ],
        [
          "몸체 폭",
          "금테 바깥쪽 양 끝",
          "목에 걸었을 때 장식의 전체 폭"
        ],
        [
          "고리 포함 길이",
          "체인이 통과하는 고리 위부터 몸체 아래까지",
          "펜던트가 아래로 내려오는 길이"
        ]
      ]
    }
  },
  {
    "title": "자개만 보이게 할까요, 위에 금속 장식을 얹을까요?",
    "paragraphs": [
      "자개의 결 자체를 살리고 싶다면 중앙을 비우고 가장자리 테두리만 두른 안을 살펴보세요. 한가운데 작은 장식을 얹는 안이라면 종이에 펜던트 윤곽을 그린 다음 장식이 가릴 부분을 칠해 보세요. 흰 바탕을 어느 쪽에 얼마나 남기고 싶은지 실제 크기에서 알 수 있습니다.",
      "귀족 갤러리의 ‘자개 컴퍼스 스타 뱅글’은 자개 위에 팔각별을 얹은 사례입니다. 정면 사진에서 별 사이로 남은 자개 면을 보면 장식과 바탕의 비율을 가늠할 수 있습니다. 목걸이로 상담할 때는 이 비율을 참고해 펜던트의 가로와 세로, 고리를 달 자리를 따로 정하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 자개 목걸이 견적을 묻는 방법",
    "paragraphs": [
      "“흰 바탕에 옅은 분홍빛이 도는 타원형 자개 목걸이를 맞추고 싶습니다. 평소 쓰는 펜던트 사진을 첨부합니다. 금테 포함 크기는 비슷하게 두고 자개 면은 넓게 보였으면 합니다. 고를 수 있는 자개 사진과 14K 펜던트 단품 견적, 체인을 포함한 견적을 알려 주세요.”라고 문의해 보세요.",
      "자개 부품, 고리까지 완성된 펜던트, 체인이 포함된 목걸이는 구성이 다릅니다. 이미 가진 체인을 쓸 경우에는 끝장식의 가장 넓은 부분과 두께도 알려 주세요. 종로 귀족의 주문제작은 최소 3주입니다. 아래 카톡 상담으로 예산과 필요한 날짜를 보내면 자개 준비 여부와 사양을 확인해 수령 일정을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "사진 속 무늬가 마음에 들었다면 주문 전에 해당 조각이 실제 제작에 쓰이는지 확인하세요. 같은 흰 자개라도 결의 위치는 다를 수 있습니다.",
  "보관할 때는 자개 앞면과 다른 장신구가 맞부딪히지 않도록 칸을 나누세요. 세척은 자개와 고정 방식에 맞는 제품별 안내를 따르세요."
]
const relatedLinks = [
  {
    "to": "/guide/gold-pendant-only-custom-cost",
    "label": "펜던트 단품 견적 확인하기",
    "description": "자개 펜던트에 가지고 있는 체인을 쓸 때 참고하세요."
  },
  {
    "to": "/guide/coin-necklace-design-selection-guide",
    "label": "목걸이 테두리와 앞뒷면 비교",
    "description": "같은 외곽 크기에서 테두리가 차지하는 비율을 보세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "참고 사진과 원하는 소재를 보내 제작 가능 범위를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '자개 목걸이, 빛깔과 펜던트 크기 고르는 법'
const gmArticleLead = '흰 자개 목걸이를 고를 때는 같은 펜던트를 정면에서 한 번, 살짝 기울여 한 번 보세요. 정면에서는 흰 바탕과 결이, 기울이면 분홍빛처럼 스쳐 가는 반사색이 잘 보입니다. 크기를 비교할 때는 금테까지 잰 바깥 폭과 실제 자개가 드러난 폭을 따로 물어보세요.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '자개 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '자개 펜던트 목걸이 제작 상담'
const gmHeroAlt = '가는 금빛 테두리 안쪽으로 분홍빛과 흰 결이 비치는 타원형 자개 펜던트 목걸이 디자인 예시'
const gmHeroCaption = '타원형 자개와 금테의 비율을 보여 주는 AI 디자인 예시입니다. 실제 제작할 조각의 빛깔과 결은 후보 사진으로 확인하세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '자개의 정의는 GIA의 조개 소재 연구를, 빛깔과 보관은 반클리프 아펠의 소재 안내를 참고했습니다. 치수는 비교를 위한 계산 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 주얼리에 쓰이는 조개 소재",
    "url": "https://www.gia.edu/gems-gemology/fall-2026-superiority-of-shell",
    "note": "자개는 연체동물 껍데기의 진주층을 잘라 내거나 조각해 장식으로 쓰는 소재입니다."
  },
  {
    "label": "반클리프 아펠 — 마더오브펄 소재 안내",
    "url": "https://www.vancleefarpels.com/gb/en/the-maison/articles/mother-of-pearl.html",
    "note": "흰 자개의 은은한 반사빛과 섬세한 표면을 고려한 보관법을 소개합니다."
  },
  {
    "label": "귀족 — 자개 컴퍼스 스타 뱅글",
    "url": "https://noblessegold.com/gallery/rose-gold-compass-star-bangle",
    "note": "자개 바탕에 팔각별 메달을 얹은 뱅글 디자인입니다."
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
