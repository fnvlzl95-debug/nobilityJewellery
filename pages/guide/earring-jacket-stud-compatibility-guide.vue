<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/earring-jacket-stud-compatibility-guide'
const pageTitle = '이어재킷 귀걸이, 스터드에 맞춰 고르기 | 귀족'
const pageDescription = '이어재킷은 스터드 귀걸이에 더하는 별도 장식입니다. 둘레를 감싸는 형태와 귓불 아래로 보이는 형태, 기존 귀걸이와의 호환·구성품 확인법을 정리했습니다. 사진을 준비해 종로 귀족에 구매·제작 가능 범위를 문의하세요.'
const ogImage = `${siteConfig.url}/Image/guide/earring-jacket-stud-compatibility-guide-hero-d6a32583.webp`
const publishedAt = '2026-10-02'
const updatedAt = ''
const faqItems = [
  {
    "question": "이어재킷 귀걸이는 스터드와 무엇이 다른가요?",
    "answer": "스터드는 앞쪽 귀걸이 본체이고, 이어재킷은 함께 사용하는 추가 장식을 가리킵니다. 스터드와 재킷이 분리되는 구성인지, 완성 귀걸이로 판매되는지 확인하세요."
  },
  {
    "question": "이어재킷은 귀 뒤에만 끼우나요?",
    "answer": "디자인마다 다릅니다. 앞 장식 둘레를 감싸는 형태와 귓불 뒤에서 아래로 드러나는 형태 등이 있으므로 해당 제품의 결합 위치와 착용 안내를 보세요."
  },
  {
    "question": "재킷에 끼울 스터드가 둥글면 모두 호환되나요?",
    "answer": "원형이라는 점만으로 판단할 수 없습니다. 앞 장식의 규격·뒷면 구조와 침, 재킷의 결합 부분을 함께 확인해야 합니다. 보유 귀걸이 사진과 원하는 재킷 사진을 함께 보내 상담하세요."
  },
  {
    "question": "이어재킷 가격에 앞쪽 귀걸이도 포함되나요?",
    "answer": "구성품을 확인해야 합니다. 앞 스터드·추가 장식·뒷마개와 좌우 수량을 구분해 물어보고, 장식만 구매할 때와 완성 조합을 구매할 때의 범위를 따로 비교하세요."
  }
]
const quickAnswers = [
  "이어재킷은 귀걸이에 더하는 장식입니다. 스터드 둘레를 감싸는지, 귓불 뒤에서 아래로 보이는지부터 살펴보세요.",
  "호환은 앞면 모양만으로 판단하기 어렵습니다. 침이 통과하는 부분과 결합한 옆모습, 뒷마개의 고정 상태까지 확인하세요.",
  "상품 사진에 앞쪽 스터드가 보여도 포함 여부는 별도로 확인하세요. 장식만 필요한지 완성된 조합을 원하는지 먼저 정하면 좋습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "이어재킷은 어떤 귀걸이인가요?",
    "paragraphs": [
      "주얼리 브랜드 Angara는 이어재킷을 기존 스터드나 귀걸이 침에 함께 사용하는 추가 장식으로 설명합니다. 중심 장식을 둘러싸는 헤일로 형태도 있고, 귓불 아래에 장식이 드러나는 형태도 있습니다. 디자인에 따라 부품이 놓이는 위치와 끼우는 순서가 달라집니다.",
      "상담할 때는 “이어재킷을 원해요”에 더해 장식이 어디에 보이길 원하는지 알려 주세요. 작은 스터드의 둘레를 넓혀 보이게 하고 싶은지, 귀 아래에 곡선이나 드롭이 나타나는 모습이 좋은지 참고 사진에서 표시하면 원하는 형태를 구분하기 쉽습니다.",
      "둘레에 장식이 있는 귀걸이라도 전체가 붙어 있는 일체형일 수 있습니다. 스터드만 따로 착용하는 모습도 원한다면 앞 장식과 재킷이 실제로 분리되는지, 분리 후 어떻게 고정하는지 제품 설명을 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "가지고 있는 스터드에 아무 재킷이나 맞나요?",
    "paragraphs": [
      "모든 조합이 맞지는 않습니다. Angara의 재킷 구매 안내도 스터드의 모양과 규격에 따라 조합을 확인하도록 설명합니다. 같은 원형처럼 보여도 기존 귀걸이를 그대로 쓸 수 있는지는 별도의 확인이 필요합니다.",
      "Angara의 헤일로 재킷 제품 문답에는 재킷에 맞는 스터드 크기와 침 굵기를 확인하는 안내가 나옵니다. 이는 특정 제품의 호환 조건이 있다는 사례이며, 그 제품의 규격을 모든 재킷의 공통 기준으로 사용할 수는 없습니다.",
      "상담용으로는 앞면만 찍기보다 침과 장식의 뒷면이 함께 보이는 옆 사진을 준비해 보세요. 원하는 재킷 사진도 함께 보내면 어떤 부분을 실물에서 확인해야 할지 정리하기 좋습니다. 아래 표는 구매 전에 질문을 나누어 적는 방법입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 부분",
        "준비하면 좋은 모습",
        "상담할 질문"
      ],
      "rows": [
        [
          "앞 장식과 재킷의 조합",
          "스터드 정면과 원하는 재킷 사진",
          "둘레 장식이 중심을 가리거나 간섭하지 않나요?"
        ],
        [
          "침이 지나가는 부분",
          "침이 보이는 옆면 사진",
          "기존 침을 그대로 사용할 수 있는 구조인가요?"
        ],
        [
          "결합한 옆모습",
          "앞 장식 뒷면과 재킷의 연결 부분",
          "부품이 서로 맞닿아 뜨거나 기울지 않나요?"
        ],
        [
          "최종 고정 상태",
          "사용 중인 뒷마개 사진",
          "장식을 더한 뒤에도 정상적으로 고정할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "재킷만 살지 세트로 살지 어떻게 정하나요?",
    "paragraphs": [
      "계속 쓰고 싶은 스터드가 있다면 그 귀걸이를 기준으로 추가 장식의 조합 가능성을 먼저 문의하세요. 반대로 귀걸이를 새로 고르는 경우라면 스터드와 재킷이 함께 구성된 후보를 살펴보고, 각각 착용했을 때의 모습까지 요청할 수 있습니다.",
      "상품을 비교할 때는 사진 속 부품과 실제 구매 목록을 따로 적어 보세요. 앞 스터드·재킷·뒷마개가 각각 포함되는지, 좌우 한 쌍인지 한쪽용인지 확인한 뒤 비교하면 상담 범위가 분명해집니다. 보유한 스터드를 활용하는 경우에는 원래 귀걸이의 변경 작업이 필요한지도 물어보세요.",
      "귓불 아래로 장식이 보이는 디자인은 착용 사진에서 얼마나 드러나는지 살펴보세요. 원하는 것은 길게 내려오는 인상인지, 귓불 가장자리에 가까운 곡선인지 정하고 실제 후보로 확인합니다. 다른 사람의 착용 사진과 똑같은 위치에 놓일 것이라고 예상하기보다 본인의 피어싱 위치에서 비교하는 편이 좋습니다.",
      "선물이라면 받는 분이 자주 쓰는 스터드를 알 수 있는지부터 생각해 보세요. 기존 귀걸이 정보가 부족할 때는 호환을 추측해 추가 장식만 고르기보다, 어떤 구성으로 선물할지 먼저 상담할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 이어재킷 구매·제작 상담은 어떻게 하나요?",
    "paragraphs": [
      "귀족 카카오톡에 현재 쓰는 스터드의 정면·옆면과 뒷마개 사진, 원하는 재킷 참고 사진을 보내 주세요. 기존 스터드를 유지할지, 새 귀걸이와 함께 고를지, 둘레 장식과 귓불 아래 장식 중 어느 쪽을 원하는지도 알려 주면 좋습니다.",
      "“가지고 있는 한 알 귀걸이를 평소에는 그대로 쓰고, 약속 있는 날에는 둘레 장식을 더하고 싶어요. 기존 스터드를 변경하지 않고 조합할 수 있는지 상담받고 싶습니다”처럼 문의할 수 있습니다. 예산과 희망일도 함께 알려 주세요.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 구매·제작 가능 범위, 기존 귀걸이와의 조합, 필요한 작업과 견적·일정은 상담에서 확인합니다. 사진은 상담을 시작하는 자료이며 최종 결합 상태는 실물 확인이 필요할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "재킷이 잘 들어가지 않으면 침을 억지로 밀거나 부품을 벌리지 마세요. 맞는 조합인지 확인한 뒤 사용하세요.",
  "추가 장식을 끼운 뒤의 고정 상태와 착용감을 확인하세요. 귀걸이가 기울거나 압박·걸림이 생기면 그대로 착용을 이어가기보다 조합을 다시 점검하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "이어재킷 조합·제작 가능 범위 문의",
    "description": "보유 귀걸이와 원하는 추가 장식 사진을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀걸이 디자인 참고하기",
    "description": "마음에 드는 전체 모양을 찾아보세요."
  },
  {
    "to": "/guide/stud-earring-meaning-selection-guide",
    "label": "스터드 귀걸이 기본 구조",
    "description": "앞쪽 귀걸이 본체의 특징을 확인하세요."
  },
  {
    "to": "/guide/earring-back-lost-types",
    "label": "귀걸이 뒷마개 교체 기준",
    "description": "추가 장식과 별도로 고정부의 호환을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '이어재킷 귀걸이, 스터드에 맞춰 고르기'
const gmArticleLead = '이어재킷 귀걸이는 스터드에 별도 장식을 더해 둘레나 귓불 아래의 모습을 바꾸는 방식입니다. 고를 때는 장식이 놓이는 위치, 기존 스터드와의 호환, 구매 구성품을 나누어 확인하세요. 재킷이라는 이름만으로 가지고 있는 모든 귀걸이에 맞는 것은 아닙니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '이어재킷 귀걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '이어재킷과 스터드 귀걸이 조합'
const gmHeroAlt = '단순한 원형 스터드와 금빛 둘레 장식을 더한 스터드를 나란히 놓은 이어재킷 조합 예시'
const gmHeroCaption = '추가 장식에 따른 형태 차이를 설명하기 위한 예시 이미지입니다. 실제 판매 제품 사진이나 조립 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '이어재킷의 기본 형태와 제품별 호환 확인은 Angara의 브랜드 안내·제품 문답을 참고했습니다. 구성품을 나누어 비교하고 사진으로 상담을 준비하는 방법은 구매 준비를 위한 제안입니다.'
const gmSources = [
  {
    "label": "Angara — 이어재킷의 형태와 선택 안내",
    "url": "https://www.angara.com/blog/your-guide-to-earring-jackets/",
    "note": "추가 장식의 형태와 기존 스터드와의 조합을 설명합니다."
  },
  {
    "label": "Angara — 헤일로 재킷 호환 문의 사례",
    "url": "https://www.angara.com/p/prong-set-diamond-halo-earring-jackets-ej-se1570d",
    "note": "제품별로 맞는 스터드와 침을 확인하는 구매 문의 사례입니다."
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
