<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/milgrain-ring-custom-edge-design'
const pageTitle = '밀그레인 반지 주문제작, 테두리 장식 고르기 | 귀족'
const pageDescription = '밀그레인 반지 주문제작은 장식의 위치, 알갱이의 크기감, 무늬가 이어지는 범위를 함께 정하는 과정입니다. 테두리와 밴드 폭의 비례를 비교하고, 원하는 참고 사진으로 종로 귀족에 상담해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/milgrain-ring-custom-edge-design-hero-ee61565e.webp`
const publishedAt = '2026-10-14'
const updatedAt = ''
const faqItems = [
  {
    "question": "밀그레인은 작은 다이아몬드를 박은 장식인가요?",
    "answer": "밀그레인 자체는 금속에 표현한 작은 알갱이 무늬입니다. 보석 세팅과 함께 쓰일 수도 있으므로 참고 사진에서 금속 무늬와 보석을 구분해 문의하세요."
  },
  {
    "question": "밀그레인 반지는 양쪽 테두리에 꼭 같은 장식을 넣나요?",
    "answer": "원하는 위치를 한쪽·양쪽 테두리 또는 보석 주변으로 나누어 표시할 수 있습니다. 선택한 밴드와 세팅 구조에서 가능한 장식 범위는 상담으로 확인하세요."
  },
  {
    "question": "밀그레인 크기는 확대 사진만 보고 골라도 되나요?",
    "answer": "확대 사진은 알갱이의 윤곽과 간격을 보는 데 유용하지만, 착용할 때의 인상은 반지 전체 비례로도 확인해야 합니다. 비슷한 배율의 사진과 착용 크기의 자료를 함께 비교하세요."
  },
  {
    "question": "밀그레인 무늬를 둘레 일부에만 넣을 수 있나요?",
    "answer": "원하는 구간을 표시해 가능 여부를 상담할 수 있습니다. 일부 구간을 요청한다면 장식이 시작하고 끝나는 위치와 손바닥 쪽 형태까지 함께 확인하세요."
  }
]
const quickAnswers = [
  "밀그레인 자체는 금속에 표현한 알갱이 무늬입니다. 작은 보석을 줄지어 세팅한 장식과 구분하세요.",
  "한쪽·양쪽 테두리 또는 보석 주변 중 원하는 위치를 사진에 표시하고, 해당 디자인에서 가능한 범위를 확인하세요.",
  "알갱이를 크게 확대한 사진과 착용 크기의 사진을 함께 보며 밴드 폭에 대한 장식의 비중을 비교하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "밀그레인 반지의 작은 점은 보석인가요?",
    "paragraphs": [
      "밀그레인(milgrain)은 금속 가장자리에 작은 알갱이 모양이 연속해서 보이는 장식을 말합니다. GIA는 금속 공예 설명에서 밀그레이닝 도구로 가장자리에 작은 구슬 같은 무늬를 만드는 사례를 소개합니다. 점처럼 빛나는 부분이 모두 다이아몬드인 것은 아닙니다.",
      "보석 세팅과 밀그레인은 한 반지에 함께 들어갈 수도 있고, 보석 없이 테두리 장식만 둘 수도 있습니다. 티파니의 밀그레인 밴드 제품에서도 금속 가장자리의 질감을 디자인 요소로 설명합니다. 참고 사진을 보낼 때 금속 무늬를 원하는지, 작은 보석까지 원하는지 나누어 알려 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "밀그레인은 반지의 어느 부분에 넣을지 정해야 하나요?",
    "paragraphs": [
      "먼저 마음에 드는 장식의 위치를 표시해 보세요. 밴드의 한쪽 가장자리인지, 양쪽을 둘러싼 선인지, 중심 보석을 감싸는 금속 테두리인지에 따라 주문 요청이 달라집니다. “밀그레인을 넣어 주세요”에 위치까지 더하면 상담할 대상이 분명해집니다.",
      "밴드 테두리에 넣고 싶다면 반지 정면과 비스듬한 옆모습을 함께 보세요. 정면에서 장식 선이 얼마나 보이는지, 옆에서 테두리가 어떻게 이어지는지 확인합니다. 반지의 기존 형태와 선택할 폭에서 구현할 수 있는 위치는 제작 상담에서 정하세요.",
      "보석 주변의 장식을 원한다면 보석을 고정하는 구조와 장식선을 함께 확인해야 합니다. 참고 사진에서 금속 발, 보석 테두리, 밀그레인 선을 각각 짚어 보세요. 장식을 추가하겠다는 요청만으로 고정 구조까지 확정되는 것은 아닙니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "알갱이가 작고 촘촘할수록 좋은 밀그레인인가요?",
    "paragraphs": [
      "알갱이의 크기감은 원하는 인상과 밴드 폭을 함께 놓고 고를 요소입니다. 확대해서 보았을 때 선처럼 느껴지는지, 각각의 알갱이가 뚜렷하게 보이는지 비교해 보세요. 알갱이만 크게 보인 사진으로는 반지 전체에서 장식이 차지하는 비중을 판단하기 어렵습니다.",
      "후보 사진은 가능한 한 비슷한 확대 비율로 비교하고, 손에 착용한 크기의 자료도 함께 확인하세요. 중앙에 남는 민무늬 면과 양옆의 장식 선을 같이 보면서 테두리를 은은하게 두를지, 장식 자체를 강조할지 정하는 방법입니다.",
      "커플링의 폭을 다르게 고른다면 두 반지에 같은 크기의 알갱이를 적용했을 때 어떤 비례로 보이는지도 물어보세요. 장식의 위치를 맞추면서 크기감은 각각 비교하는 선택도 상담할 수 있습니다. 아래 표의 항목을 참고 사진에 표시해 두면 요청을 정리하기 좋습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "정할 항목",
        "비교할 부분",
        "상담에 남길 요청"
      ],
      "rows": [
        [
          "장식 위치",
          "한쪽·양쪽 테두리 또는 보석 주변",
          "원하는 선을 사진에 표시하기"
        ],
        [
          "알갱이 크기감",
          "알갱이의 윤곽·간격과 밴드 폭의 비례",
          "은은한 선인지 도드라진 장식인지 설명하기"
        ],
        [
          "연속 범위",
          "손등 쪽과 손바닥 쪽에서 이어지는 무늬",
          "전체 둘레인지 일부 구간인지 구분하기"
        ],
        [
          "주변 면과의 조합",
          "장식선 옆의 민무늬 면과 반사감",
          "좋아하는 테두리와 바탕면을 따로 표시하기"
        ]
      ]
    }
  },
  {
    "title": "반지 둘레 전체에 무늬를 이어야 하나요?",
    "paragraphs": [
      "원하는 연속 범위도 주문 항목으로 정리하세요. 둘레 전체에 같은 선이 이어지는 모습을 원하는지, 손등에서 보이는 쪽에 장식을 집중하고 싶은지 전달하고 가능한 제작 범위를 확인합니다. 일부 구간에만 넣는다면 선이 시작하고 끝나는 위치도 함께 봐야 합니다.",
      "정면 사진 한 장에 보이지 않는 손바닥 쪽은 별도 자료로 확인해 보세요. 장식이 이어지는 부분과 매끈한 부분의 경계가 어디인지, 옆 손가락이 닿는 면은 어떤 형태인지 물어보면 완성 모습을 더 구체적으로 떠올릴 수 있습니다.",
      "기존 반지에 밀그레인을 추가하거나 끊어진 무늬를 잇고 싶은 경우에는 현재 테두리의 형태를 먼저 확인해야 합니다. 새 반지의 주문안과 같은 조건으로 생각하지 말고, 제품 사진과 함께 별도의 작업 가능 여부를 상담하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 밀그레인 반지를 어떻게 주문 상담하나요?",
    "paragraphs": [
      "귀족 갤러리의 “밀그레인 원포인트 커플링”과 “밀그레인 밴드 커플링”을 참고해 좋아하는 장식선을 찾아보세요. 사진에 원하는 부분을 표시하고 알갱이 느낌, 장식 위치, 유지하고 싶은 밴드 형태를 함께 보내면 상담을 시작하기 좋습니다.",
      "문의 예시: “밴드 양쪽 가장자리에 밀그레인을 넣고 싶습니다. 테두리는 은은하게 보이고 중앙 면은 깔끔한 느낌을 원해요. 참고 사진의 알갱이 크기감과 전체 둘레로 이어지는 모습이 선택할 반지 폭에 어울릴지 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 참고 사진·원하는 장식 위치·반지 폭과 색상 선호·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 요청한 디자인을 기준으로 제작 가능한 범위와 견적·일정을 확인해 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "확대 사진의 크기만으로 실제 알갱이 크기나 착용 시 보이는 정도를 판단하기 어렵습니다. 반지 전체 비례와 함께 확인하세요.",
  "참고 디자인의 모든 장식이 선택한 반지에 그대로 적용되는 것은 아닙니다. 위치·연속 범위·세부 표현은 제작 상담에서 확인해 주세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "밀그레인 반지 주문제작 상담",
    "description": "원하는 장식선과 밴드 형태를 표시한 사진을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 밀그레인 커플링 살펴보기",
    "description": "밀그레인 원포인트 커플링과 밀그레인 밴드 커플링을 참고하세요."
  },
  {
    "to": "/guide/wedding-band-matte-gloss",
    "label": "테두리 옆 바탕면의 마감 고르기",
    "description": "유광·무광의 반사감과 표면 표현을 비교하세요."
  },
  {
    "to": "/guide/jongno-two-tone-couple-ring-selection",
    "label": "콤비 커플링의 색 배치 비교",
    "description": "장식 위치와 함께 금속 색이 나뉘는 부분을 정리하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '밀그레인 반지 주문제작, 테두리 장식 고르기'
const gmArticleLead = '밀그레인은 금속 가장자리를 따라 작은 알갱이가 이어지는 듯한 장식입니다. 반지를 주문제작할 때는 장식을 넣을 위치, 알갱이가 도드라지는 정도, 무늬를 이어 갈 범위를 먼저 정해 보세요. 확대 사진의 디테일과 손에 꼈을 때의 전체 인상을 함께 비교하면 원하는 테두리를 설명하기 쉽습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '밀그레인 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '밀그레인 반지 테두리 장식 주문제작'
const gmHeroAlt = '매끈한 금빛 밴드의 양쪽 가장자리에 작은 금속 알갱이 무늬가 이어지는 밀그레인 반지'
const gmHeroCaption = '밀그레인 테두리와 중앙 면의 비례를 보여 주는 디자인 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '밀그레인의 금속 장식 설명은 GIA 자료를, 밴드 적용 사례는 티파니 제품 원문을 참고했습니다. 위치·비례·연속 범위 비교표와 문의 예시는 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 금속 가장자리의 밀그레인 무늬 설명",
    "url": "https://www.gia.edu/gia-news-research/metalwork-takes-bow-techniques-enhance-gemstone-jewelry",
    "note": "금속 가장자리의 작은 알갱이 무늬를 설명하는 자료입니다."
  },
  {
    "label": "Tiffany & Co. — 밀그레인 가장자리의 밴드 사례",
    "url": "https://www.tiffany.com/jewelry/rings/tiffany-together-platinum-rings-60002235.html",
    "note": "보석 없는 밴드에 밀그레인 가장자리를 적용한 브랜드 제품 사례입니다."
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
