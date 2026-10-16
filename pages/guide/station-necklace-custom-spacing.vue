<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/station-necklace-custom-spacing'
const pageTitle = '스테이션 목걸이 주문제작, 보석 간격 정하기 | 귀족'
const pageDescription = '스테이션 목걸이는 체인을 따라 보석을 간격 있게 배치한 디자인입니다. 주문제작 전 전체 길이·장식 개수·배치 구간을 구분하고, 보석 사이 여백과 정면에 보이는 범위를 종로 귀족에 상담해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/station-necklace-custom-spacing-hero-512f9998.webp`
const publishedAt = '2026-10-16'
const updatedAt = ''
const faqItems = [
  {
    "question": "스테이션 목걸이는 다이아몬드로만 만드나요?",
    "answer": "다이아몬드 외에도 진주 등 다른 보석을 체인을 따라 배치한 사례가 있습니다. 원하는 보석과 간격을 함께 전달하고 재료에 맞는 연결 구조와 제작 가능 여부를 상담하세요."
  },
  {
    "question": "스테이션 목걸이의 보석 간격은 몇 cm가 적당한가요?",
    "answer": "모든 디자인에 맞는 한 가지 간격은 없습니다. 장식 개수·외곽 크기·배치 구간과 착용 길이를 함께 정하고, 간격을 보석 중심끼리 잴지 테두리 사이 여백으로 잴지도 맞추세요."
  },
  {
    "question": "장식 개수가 같으면 스테이션 목걸이 배열도 같나요?",
    "answer": "같은 개수라도 앞쪽에 모으거나 옆목까지 펼치는 구간에 따라 여백이 달라집니다. 전체 장식 수와 정면에서 보이길 원하는 범위를 구분해 전달하세요."
  },
  {
    "question": "목걸이 길이를 줄이면 보석 사이 간격도 줄어드나요?",
    "answer": "자동으로 함께 바뀌는 것은 아닙니다. 잠금 쪽 길이를 조절하는 것과 보석 사이의 체인을 바꾸는 작업은 다를 수 있으므로 전체 길이 변경과 배열 변경을 각각 문의하세요."
  }
]
const quickAnswers = [
  "전체 길이·보석 장식 개수·장식을 놓을 구간을 먼저 나누면 원하는 간격을 설명하기 쉽습니다.",
  "보석 중심끼리의 거리와 금속 테두리 사이에 드러난 체인 길이는 다릅니다. 간격을 비교할 때 측정 기준을 맞추세요.",
  "목걸이를 짧게 착용하는 것과 보석 사이의 체인을 줄여 배열을 바꾸는 것은 별개의 요청입니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "스테이션 목걸이는 어떤 디자인인가요?",
    "paragraphs": [
      "스테이션(station) 목걸이는 체인의 여러 지점에 보석 장식이 놓이고 그 사이로 체인이 보이는 디자인입니다. Brilliant Earth는 스테이션 목걸이를 체인을 따라 개별 다이아몬드나 보석이 간격을 두고 배치된 형태로 설명합니다. 주문할 때는 보석 하나의 크기와 함께 보석 사이의 여백을 살펴보세요.",
      "다이아몬드만으로 만드는 형태는 아닙니다. 같은 브랜드의 Celine 제품에는 양식 진주가 체인을 따라 개별적으로 놓인 사례도 있습니다. 다이아몬드의 반짝임을 원하는지, 진주가 이어지는 인상을 원하는지 참고 사진으로 전달하고 선택할 재료에 맞는 연결 구조를 상담하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "보석 개수만 정하면 간격도 정해지나요?",
    "paragraphs": [
      "개수와 배치 구간을 함께 정해야 합니다. 같은 수의 장식을 목 앞쪽의 짧은 구간에 모을 수도 있고, 옆목 쪽까지 넓게 펼친 느낌을 요청할 수도 있습니다. 목걸이 전체 길이가 같더라도 장식이 차지하는 구간과 뒤쪽의 민체인 길이는 다르게 구성할 수 있습니다.",
      "먼저 정면에서 어디까지 장식이 보이길 원하는지 표시해 보세요. 가운데에 보석 하나가 놓이는 모습인지, 가운데는 체인으로 비워 두고 좌우에 장식이 놓이는 모습인지도 구분합니다. 이를 기준으로 좌우 배열과 목 뒤쪽 구성을 함께 상담하면 좋습니다.",
      "아래 표는 주문안을 정리하기 위한 기준입니다. 각 항목을 따로 정리한 뒤 실제로 함께 구현할 수 있는지 확인하세요. 장식 개수나 간격에 모든 사람에게 맞는 정답이 있는 것은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "정할 항목",
        "확인할 부분",
        "상담할 내용"
      ],
      "rows": [
        [
          "전체 길이",
          "잠금 부속까지 포함한 완성 길이",
          "원하는 착용 위치와 길이 조절 여부"
        ],
        [
          "장식 개수",
          "목걸이 전체에 들어갈 보석 장식 수",
          "정면에 보일 수와 전체 수를 구분하기"
        ],
        [
          "배치 구간",
          "앞쪽·옆목·뒤쪽의 장식 분포",
          "장식을 시작하고 끝낼 위치 표시하기"
        ],
        [
          "보석 사이 간격",
          "중심 간 거리 또는 테두리 사이 여백",
          "비교 자료의 측정 기준 맞추기"
        ],
        [
          "중앙 기준",
          "정면 가운데의 보석 또는 빈 체인",
          "좌우 배열의 기준점을 표시하기"
        ]
      ]
    }
  },
  {
    "title": "보석 사이 간격은 어디서부터 재야 하나요?",
    "paragraphs": [
      "“보석 간격”이 무엇을 뜻하는지 먼저 맞춰 보세요. 보석의 중심에서 다음 보석의 중심까지인지, 금속 테두리의 끝에서 다음 테두리까지 드러나는 체인 부분인지에 따라 같은 배열을 설명하는 수치도 달라집니다. 참고 사진에 간격을 표시한 선을 그려 전달하는 방법이 좋습니다.",
      "보석과 이를 감싼 금속 테두리의 크기도 여백에 영향을 줍니다. 중심 사이 거리가 같아도 장식의 외곽이 커지면 그 사이에 보이는 체인은 짧아집니다. 보석의 크기감과 체인이 드러나는 비중을 함께 비교해 주세요.",
      "후보를 비교할 때는 확대 사진의 비율을 비슷하게 맞추고, 목에 걸었을 때의 정면 자료도 요청해 보세요. 평면에 길게 펼쳐 놓은 배열에서 보이는 장식이 착용했을 때 모두 정면에 놓이는 것은 아닙니다. 평소 입을 상의의 목선 안에서 어느 구간이 보이는지 확인하면 배치 요청이 구체적이 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "목걸이를 짧게 만들면 보석 간격도 좁아지나요?",
    "paragraphs": [
      "전체 길이 변경과 장식 사이 체인 변경은 나누어 설명해야 합니다. 잠금 쪽에서 길이를 조절하는 구조라면 착용 길이를 바꾸어도 이미 연결된 보석 사이의 체인 길이는 그대로일 수 있습니다. “더 짧게”와 “장식끼리 더 가깝게” 중 원하는 변화를 분명히 알려 주세요.",
      "주문안에서는 가장 짧게 착용할 때와 길게 착용할 때 보석이 놓이는 위치를 각각 확인해 보세요. 길이 조절을 원한다면 조절 구간이 어디에 들어가는지, 선택한 길이에서 정면 중앙과 양옆의 장식이 어떻게 보이는지 함께 질문하면 좋습니다.",
      "이미 가진 목걸이의 간격을 바꾸고 싶다면 전체 사진과 장식 연결 부위 사진을 보내 주세요. 전체 길이만 조정할지 배열까지 바꿀지에 따라 검토할 부분이 다르며, 작업 가능 여부는 현재 체인과 연결 구조를 확인한 뒤 상담합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 스테이션 목걸이를 어떻게 문의하나요?",
    "paragraphs": [
      "원하는 참고 사진에 정면 중앙과 장식을 두고 싶은 구간을 표시해 주세요. 보석 개수를 아직 못 정했다면 먼저 “옆목까지 이어지는 느낌” 또는 “앞쪽에만 포인트가 보이는 느낌”처럼 원하는 범위를 적어도 됩니다. 보석 사이의 체인이 넉넉히 드러나길 원하는지도 함께 알려 주세요.",
      "문의 예시: “작은 보석이 체인 사이사이에 놓인 스테이션 목걸이를 주문하고 싶습니다. 앞쪽에 장식이 보이고 뒤쪽은 민체인인 구성을 선호해요. 첨부 사진에서 표시한 구간을 기준으로 보석 개수와 간격을 비교하고, 길이를 조절했을 때의 배치도 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 참고 사진·원하는 착용 길이·장식 배치 구간·보석 후보·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 요청한 구성을 기준으로 제작 가능한 범위와 견적·일정을 상담합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "외부 브랜드 제품은 배치 형태를 설명하기 위한 사례입니다. 해당 제품의 규격·재고·제작 조건이 귀족에 그대로 적용되는 것은 아닙니다.",
  "간격을 나타낸 평면 사진만으로 착용 위치를 확정하지 말고, 선택한 길이에서 정면과 옆목에 보이는 범위를 함께 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "스테이션 목걸이 주문제작 상담",
    "description": "원하는 보석 배치 구간을 표시한 사진으로 문의하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 살펴보기",
    "description": "좋아하는 금속 색상과 보석 장식의 느낌을 찾아보세요."
  },
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "목걸이 착용 길이 정하기",
    "description": "장식 배열을 정하기 전 원하는 착용 위치를 살펴보세요."
  },
  {
    "to": "/guide/tennis-necklace-uniform-graduated-selection",
    "label": "보석이 연속된 테니스 목걸이 비교",
    "description": "보석 사이에 체인이 보이는 구성과 다른 인상을 비교하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '스테이션 목걸이 주문제작, 보석 간격 정하기'
const gmArticleLead = '스테이션 목걸이는 체인을 따라 여러 보석을 간격을 두고 배치한 목걸이입니다. 주문제작에서는 전체 길이와 장식 개수뿐 아니라, 보석을 어느 구간에 놓을지와 사이에 체인이 얼마나 드러나길 원하는지를 함께 정하세요. 같은 개수라도 배치 구간에 따라 보이는 여백이 달라집니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '스테이션 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '스테이션 목걸이 보석 간격 주문제작'
const gmHeroAlt = '가는 금빛 체인을 따라 작은 원형 보석들이 서로 간격을 두고 연결된 스테이션 목걸이'
const gmHeroCaption = '보석 장식 사이로 체인이 드러나는 배치 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '스테이션 목걸이의 정의와 진주 적용 사례는 Brilliant Earth의 원문을 참고했습니다. 간격의 측정 기준, 배치 비교표와 문의 예시는 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Brilliant Earth — 스테이션 목걸이의 배치 정의",
    "url": "https://www.brilliantearth.com/jewelry/necklace/station/",
    "note": "체인을 따라 보석이 간격을 두고 놓이는 배치를 설명합니다."
  },
  {
    "label": "Brilliant Earth — 진주 스테이션 목걸이 사례",
    "url": "https://www.brilliantearth.com/Celine-Cultured-Pearl-Station-Necklace-14K-Gold-BE4P572/",
    "note": "진주가 체인을 따라 개별적으로 놓인 브랜드 제품 사례입니다."
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
