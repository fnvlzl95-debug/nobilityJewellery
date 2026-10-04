<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/tennis-necklace-uniform-graduated-selection'
const pageTitle = '테니스 목걸이, 균일형과 중앙 강조형 | 귀족'
const pageDescription = '테니스 목걸이를 고를 때는 보석 크기가 일정하게 이어지는 균일형과 중앙으로 갈수록 커지는 그라데이션형을 먼저 비교하세요. 크기 배열과 목선 윤곽의 차이, 착용 사진에서 볼 부분, 종로 귀족 상담 준비 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/tennis-necklace-uniform-graduated-selection-hero-28a75f0c.webp`
const publishedAt = '2026-10-04'
const updatedAt = ''
const faqItems = [
  {
    "question": "테니스 목걸이의 그라데이션은 색이 달라진다는 뜻인가요?",
    "answer": "이 글에서 말하는 그라데이션형은 보석의 크기가 점진적으로 달라지는 배열입니다. 색 변화가 있는 디자인을 원한다면 크기 배열과 별도로 색 조건을 알려 주세요."
  },
  {
    "question": "중앙 강조형 테니스 목걸이는 가운데 보석만 보면 되나요?",
    "answer": "중앙 보석과 함께 양옆으로 크기가 이어지는 구간을 보세요. 가장 큰 부분의 확대 사진과 전체 착용 사진을 함께 비교하면 원하는 강조 정도를 정하기 좋습니다."
  },
  {
    "question": "그라데이션 테니스 목걸이는 모두 V자 모양인가요?",
    "answer": "크기 배열과 전체 윤곽은 따로 확인해야 합니다. 중앙으로 커지는 배열을 원하더라도 둥근 목선인지 V자에 가까운 형태인지 참고 사진으로 구분해 전달하세요."
  },
  {
    "question": "균일형과 중앙 강조형 중 어느 쪽이 더 잘 어울리나요?",
    "answer": "고른 라인을 원하는지 앞쪽 중심이 돋보이는 느낌을 원하는지부터 정하세요. 같은 상의와 원하는 착용 위치를 기준으로 후보를 비교하고 정면·옆모습·전체 인상을 함께 살펴보세요."
  }
]
const quickAnswers = [
  "균일형은 전체 라인의 고른 느낌을, 중앙 강조형은 중심과 옆부분의 크기 차이를 보며 선택하세요.",
  "그라데이션형의 크기 변화와 목걸이 전체의 U자·V자 윤곽은 별개입니다. 중앙 확대 사진과 전체 착용 사진을 함께 보세요.",
  "평소 입을 상의와 원하는 착용 위치를 정한 뒤 비교하세요. 목걸이 길이나 중심 보석 하나만으로 전체 인상을 판단하지 마세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "테니스 목걸이는 어떤 디자인인가요?",
    "paragraphs": [
      "테니스 목걸이를 찾을 때는 보석이 이어지는 라인 전체를 먼저 보세요. 중심 장식이 얼마나 큰지에만 집중하면 목 옆부분까지 이어지는 모양을 놓치기 쉽습니다. 같은 이름의 후보라도 전체가 고른 느낌인지, 앞쪽으로 갈수록 굵어 보이는지 비교해 보세요.",
      "이 글에서는 크기가 고르게 이어지는 인상을 “균일형”, 중앙으로 갈수록 커지는 배열을 “중앙 강조형”으로 나누어 비교합니다. 판매처마다 명칭이 다를 수 있으므로 이름보다 전체 사진에서 크기 변화가 어디서 시작되는지 살펴보세요.",
      "먼저 목 전체에 고른 빛의 라인이 보이는 것이 좋은지, 앞쪽 중심에 시선이 모이는 느낌이 좋은지 골라 보세요. 둘 중 하나가 더 좋은 등급이라는 의미는 아니며, 원하는 디자인을 설명하기 위한 구분입니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "균일형과 중앙 강조형은 무엇을 비교하나요?",
    "paragraphs": [
      "균일형 후보는 정면뿐 아니라 옆으로 이어지는 부분까지 보세요. 중앙 강조형 후보는 가장 큰 보석만 확대해서 보지 말고, 중앙에서 옆부분으로 크기가 어떻게 이어지는지도 함께 확인하는 편이 좋습니다.",
      "De Beers의 DB Classic 라인 목걸이 설명에는 라운드 다이아가 크기를 달리하며 한 줄로 이어지는 배열이 소개됩니다. 중앙을 강조하는 후보를 상담할 때는 이처럼 “크기가 변하는 배열”을 원하는 것인지부터 분명하게 전달하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교할 점",
        "균일형에서 볼 부분",
        "중앙 강조형에서 볼 부분"
      ],
      "rows": [
        [
          "첫인상",
          "전체가 고른 띠처럼 보이는지",
          "중앙과 양옆의 대비가 원하는 정도인지"
        ],
        [
          "전체 사진",
          "옆부분까지 이어지는 라인의 느낌",
          "보석 크기가 달라지는 구간과 연결감"
        ],
        [
          "착용 사진",
          "목둘레 전체에서 보이는 존재감",
          "앞쪽 중심이 놓이는 위치와 강조 정도"
        ],
        [
          "상담에 전할 말",
          "전체가 비슷한 굵기로 이어지면 좋겠어요",
          "중앙은 돋보이고 옆으로 자연스럽게 작아지면 좋겠어요"
        ]
      ]
    }
  },
  {
    "title": "그라데이션형이면 목선도 V자로 보이나요?",
    "paragraphs": [
      "크기가 변하는 배열이라고 해서 목걸이의 윤곽이 모두 같지는 않습니다. 여기서 그라데이션은 보석 크기의 점진적인 변화를 말합니다. 색이 달라진다는 뜻이나 V자 형태를 뜻하는 말로만 이해하면 원하는 디자인과 달라질 수 있습니다.",
      "Brilliant Earth는 보석 크기가 달라지면서 중앙에 셰브런, 즉 V자에 가까운 윤곽을 만드는 테니스 목걸이를 별도 제품으로 소개합니다. “크기 배열”과 “전체 윤곽”을 함께 설명하는 사례입니다. 원하는 사진이 있다면 보석의 크기 차이를 좋아하는지, 가운데가 내려오는 모양을 좋아하는지 각각 표시해 보세요.",
      "또한 목걸이 라인 안에 큰 보석이 이어진 모습과 별도 펜던트가 아래로 달린 모습도 구분해 두세요. 중심 확대 사진만으로는 전체 구성을 이해하기 어려울 수 있으므로 잠금 쪽까지 보이는 전체 사진과 착용 사진을 함께 요청하는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "착용해 볼 때는 어디를 확인하나요?",
    "paragraphs": [
      "입으려는 상의의 목 부분을 기준으로 비교해 보세요. 목걸이가 옷 위에 놓이길 원하는지, 목선이 드러나는 부분 안에 놓이길 원하는지 정한 뒤 같은 상의로 후보를 번갈아 보면 차이를 설명하기 쉽습니다.",
      "가까운 거리에서는 중앙과 옆부분의 보석 배열을 보고, 조금 떨어진 거울에서는 옷과 함께 보이는 전체 라인을 살펴보세요. 특히 중앙 강조형은 가장 큰 부분이 원하는 위치에 놓이는지 확인하고, 정면뿐 아니라 목 옆쪽에서 이어지는 모습도 비교합니다.",
      "착용한 뒤 평소처럼 고개를 돌리거나 앉았을 때 라인이 한쪽으로 몰리거나 장식의 뒷면이 자주 보이는지도 살펴보세요. 특정 배열이 뒤집힘을 막아 준다고 가정하기보다 실제 후보의 착용 상태를 확인하는 과정입니다. 불편한 부분이 있다면 사진에 위치를 표시해 상담하세요.",
      "길이 측정 방법은 별도 목걸이 길이 가이드를 참고할 수 있습니다. 이번 선택에서는 숫자부터 정하기보다 원하는 착용 위치와 배열 중 무엇이 우선인지 알려 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 테니스 목걸이 상담은 어떻게 시작하나요?",
    "paragraphs": [
      "귀족 카카오톡에 목걸이 전체 참고 사진, 균일형·중앙 강조형 선호, 원하는 착용 위치와 평소 입을 상의 사진을 보내 주세요. 예산과 희망일, 보석·금속 소재에 원하는 조건이 있다면 함께 알려 주세요.",
      "“전체 라인은 얇게 보이고 중앙에서만 보석이 조금씩 커지는 느낌이 좋습니다. 가운데가 아래로 뾰족하게 내려오는 모양보다는 둥근 목선을 원해요”처럼 배열과 윤곽을 따로 설명하면 상담을 시작하기 좋습니다. 사진에서 특히 마음에 든 구간을 표시해도 됩니다.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 구매·제작 가능한 디자인과 보석 구성, 견적·일정은 상담에서 확인합니다. 참고 브랜드의 제품 구성이나 제작 조건이 그대로 적용되는 것은 아닙니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "균일형·그라데이션형은 배열을 설명하는 표현입니다. 보석 종류와 천연·랩그로운 구분, 금속 소재는 실제 후보의 설명에서 따로 확인하세요.",
  "평면에 놓인 사진과 착용 사진을 함께 비교하세요. 원하는 배열만으로 착용 위치나 뒤집힘 여부가 정해지는 것은 아닙니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "테니스 목걸이 디자인 상담",
    "description": "원하는 배열과 목선의 윤곽을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "목걸이 디자인 참고하기",
    "description": "전체 모양과 착용하고 싶은 인상을 골라 보세요."
  },
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "목걸이 길이 선택 기준",
    "description": "원하는 위치와 실제 착용 길이를 비교하세요."
  },
  {
    "to": "/guide/jongno-diamond-pendant-design-order",
    "label": "한 알 다이아 펜던트와 비교하기",
    "description": "별도 장식이 달린 목걸이를 원할 때 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '테니스 목걸이, 균일형과 중앙 강조형'
const gmArticleLead = '테니스 목걸이는 보석이 연속된 라인을 이루는 디자인입니다. 구매할 때는 비슷한 크기가 이어지는 균일형을 원하는지, 중앙으로 갈수록 보석이 커지는 그라데이션형을 원하는지 먼저 정해 보세요. 보석 크기의 배열과 착용했을 때 만들어지는 목선의 윤곽은 따로 확인하는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '테니스 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '테니스 목걸이 배열과 디자인 선택'
const gmHeroAlt = '밝은 천 위에 보석 크기가 고르게 이어지는 목걸이와 중앙 보석이 커지는 목걸이를 나란히 놓은 배열 비교 예시'
const gmHeroCaption = '보석 크기 배열의 차이를 보여 주는 디자인 예시입니다. 실제 판매 제품 사진이나 규격 비교 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '테니스 목걸이의 형태와 배열 사례는 각 브랜드의 원문을 참고했습니다. 균일형·중앙 강조형의 비교 항목과 같은 상의로 착용해 보는 방법은 원하는 디자인을 정리하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "De Beers — 크기 변화가 있는 라인 목걸이 사례",
    "url": "https://www.debeers.com/en-us/db-classic-eternity-line-round-brilliant-diamond-necklace/N102115.html",
    "note": "크기가 달라지는 다이아 라인 배열의 사례입니다."
  },
  {
    "label": "Brilliant Earth — 그라데이션·셰브런 배열 사례",
    "url": "https://www.brilliantearth.com/Chevron-Graduated-Diamond-Tennis-Necklace-%286-3/4-ct.-tw.%29-White-Gold-BE4D3009/",
    "note": "보석 크기 변화와 V자에 가까운 윤곽을 함께 보여 주는 사례입니다."
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
