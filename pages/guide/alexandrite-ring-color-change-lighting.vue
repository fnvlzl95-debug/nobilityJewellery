<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/alexandrite-ring-color-change-lighting'
const pageTitle = '알렉산드라이트 반지, 두 조명에서 고르는 법 | 귀족'
const pageDescription = '알렉산드라이트 반지의 색 변화가 궁금하다면 같은 돌을 주광과 백열등에서 비교하세요. 천연·합성 표기, 감별서에서 확인할 항목과 종로 주문제작 상담 질문을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/alexandrite-ring-color-change-lighting-hero.webp`
const publishedAt = '2026-11-22'
const updatedAt = ''
const faqItems = [
  {
    "question": "집에서는 매장처럼 붉게 보이지 않는 이유가 뭔가요?",
    "answer": "사용한 광원이 다를 수 있습니다. 매장에서 비교한 빛이 백열등인지 확인하고, 집에서 주로 쓰는 조명에서도 마음에 드는 색인지 살펴보세요."
  },
  {
    "question": "색이 많이 바뀌면 천연 알렉산드라이트인가요?",
    "answer": "색 변화의 크기만으로는 알 수 없습니다. 합성 알렉산드라이트나 색 변화가 있는 다른 보석도 있으므로 천연 여부는 해당 돌의 감별 자료로 확인하세요."
  },
  {
    "question": "색 변화가 큰 돌과 주광 색이 맑은 돌 중 어느 쪽이 좋나요?",
    "answer": "두 조명에서 각각 보이는 색과 변화의 정도를 함께 보세요. 낮에 자주 낄 반지라면 주광에서 원하는 색과 밝기를 먼저 고르고, 백열등에서의 모습까지 확인하는 방법이 있습니다."
  },
  {
    "question": "보석 중량이 같으면 반지에서 보이는 크기도 같나요?",
    "answer": "가로·세로 비율이나 깊이에 따라 위에서 보이는 면적이 달라질 수 있습니다. 캐럿과 함께 정면 치수를 밀리미터 단위로 요청하고 손등에 댄 모습을 비교하세요."
  },
  {
    "question": "알렉산드라이트를 가지고 있어도 주문제작 상담이 되나요?",
    "answer": "보유석 사진과 치수, 감별서가 있다면 함께 보내 주세요. 돌의 상태와 원하는 세팅을 확인해 제작 가능 범위를 안내합니다. 제작은 최소 3주 기준이며 수령일은 사양 확인 후 정합니다."
  }
]
const quickAnswers = [
  "주광과 백열등에서 같은 후보석의 정면을 비교하세요. 두 환경에서 각각 무슨 색으로 보이는지, 어두워서 색을 알아보기 힘든 부분은 없는지 적어 두세요.",
  "사진에서 색이 크게 달라져도 천연 여부는 별도로 확인해야 합니다. 판매 명칭과 함께 감별서에 적힌 보석 종류, 천연·합성 구분, 치수를 확인하세요.",
  "반지 제작을 문의할 때는 어떤 조명에서 본 색이 더 중요한지 알려 주세요. 보석을 보유했는지, 새로 구해야 하는지에 따라 먼저 확인할 내용이 달라집니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "알렉산드라이트는 밤이 되면 색이 바뀌나요?",
    "paragraphs": [
      "알렉산드라이트는 크리소베릴이라는 광물의 한 종류입니다. 색을 달리 보이게 하는 것은 시간보다 보석을 비추는 빛입니다. GIA는 좋은 품질의 예로 주광에서 녹색부터 청록색, 백열등에서 붉은색부터 자주색을 띠는 돌을 소개합니다. 후보석마다 변화의 폭과 각 색의 선명도는 다릅니다.",
      "‘낮에는 초록, 밤에는 빨강’이라는 설명만 기억하면 저녁에 집에서 봤을 때 당황할 수 있습니다. 저녁 식탁 위에 켜 둔 등이 LED라면 판매 사진을 찍은 백열등과 조건이 다릅니다. 저녁에 낄 반지를 찾는다면 평소 사용하는 조명에서도 직접 봤을 때 어느 색이 남는지가 더 유용한 선택 기준입니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "매장에서 후보석 두 알을 어떻게 비교할까요?",
    "paragraphs": [
      "후보를 A와 B로 구분해 같은 무채색 바탕 위에 나란히 올려 달라고 하세요. 먼저 주광에서 두 돌의 정면을 본 뒤, 배경과 보는 방향을 유지한 채 백열등에서 다시 봅니다. 돌을 기울이면서 조명까지 바꾸면 어느 변화가 빛 때문인지 구분하기 어렵습니다.",
      "메모에는 ‘A가 더 예쁨’보다 ‘A는 주광에서 맑은 청록, 백열등에서는 어두운 자주’라고 쓰세요. B도 같은 방식으로 적으면 낮에 좋아하는 색과 밤에 좋아하는 색이 꼭 같은 돌에서 나오지는 않는다는 점을 눈으로 비교할 수 있습니다. 마지막으로 정면에서 손등에 올려 보며 자주 낄 환경에서 고르세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "관찰 조건",
        "두 후보에 공통으로 볼 것",
        "메모 예시"
      ],
      "rows": [
        [
          "주광",
          "정면에서 보이는 색과 밝기",
          "청록빛이 맑은지, 중앙이 짙어 보이는지"
        ],
        [
          "백열등",
          "같은 돌과 각도에서 변한 색",
          "자줏빛이 분명한지, 갈색 기운이 도는지"
        ],
        [
          "평소 쓰는 조명",
          "손에 올렸을 때 가장 자주 볼 모습",
          "사무실 조명에서도 마음에 드는 후보 표시"
        ]
      ]
    }
  },
  {
    "title": "온라인 사진만 보고 주문할 때 요청할 장면",
    "paragraphs": [
      "녹색 사진과 붉은색 사진이 서로 다른 상품의 대표 컷일 수 있습니다. 주문할 후보의 번호를 먼저 확인하고 그 한 알을 주광과 백열등에서 이어서 보여 줄 수 있는지 물어보세요. 촬영한 광원과 배경을 알려 달라고 하면 서로 다른 판매 사진의 채도를 두고 고민하는 일을 줄일 수 있습니다.",
      "AI로 만든 반지 그림은 중심석을 가로로 놓을지, 발을 몇 개 보이게 할지 설명하는 데 쓸 수 있습니다. 실제 돌의 색이 궁금하다면 후보석 사진을 따로 요청하세요. 카메라의 자동 화이트밸런스와 화면 설정에 따라 보이는 색도 달라지므로, 두 후보가 비슷하면 실물을 볼 수 있는지 확인하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "‘알렉산드라이트 사파이어’와 천연 표기는 어떻게 읽나요?",
    "paragraphs": [
      "두 색이 보인다는 사실만으로 광물의 종류나 천연 여부를 판별할 수는 없습니다. GIA 구매 안내에 따르면 ‘알렉산드라이트 사파이어’는 흔히 알렉산드라이트처럼 색이 변하도록 만든 합성 사파이어를 가리킵니다. 합성 알렉산드라이트와 합성 사파이어도 서로 다른 재료이므로 견적서에 실제 보석명을 적어 달라고 하세요.",
      "천연석을 원한다면 해당 후보의 감별서에서 보석 종류와 천연·합성 표기를 확인하세요. 치수와 형태까지 제품 설명에 맞는지 함께 보는 것이 좋습니다. GIA는 알렉산드라이트의 특성을 검사하지만 색 변화에 일률적인 등급을 매기지는 않습니다. 판매처가 쓴 ‘AAA’의 뜻이 궁금하면 자체 기준과 실물 비교 조건을 물어보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 반지 제작을 문의할 때",
    "paragraphs": [
      "“주광에서 청록빛이 잘 보이는 타원형 알렉산드라이트로 반지를 맞추고 싶습니다. 천연석을 우선으로 보고 있습니다. 예산 안에서 구할 수 있는 후보와 감별서 유무, 같은 돌을 두 조명에서 확인할 방법을 알려 주세요. 14K와 18K 중 금속만 바꿨을 때의 견적도 궁금합니다.”처럼 쓰면 원하는 색과 견적 조건을 함께 전달할 수 있습니다.",
      "이미 가진 돌이 있다면 새로 구할 필요가 없다는 점부터 알려 주세요. 감별서에 적힌 가로·세로·깊이, 보석의 앞면과 옆면 사진을 보내면 반지에 고정할 자리를 상담하는 데 도움이 됩니다. 종로 귀족의 주문제작 기간은 최소 3주입니다. 아래 카톡 상담에서 보석 준비 여부와 희망 수령일을 알려 주시면 가능한 제작 범위와 일정을 확인합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "불꽃이나 열로 돌을 시험할 필요는 없습니다. 바꾸는 것은 보석에 닿는 빛이며, 반지는 광원에서 떨어진 상태로 관찰하세요.",
  "색이 선명한 사진 한 장을 천연석 감별이나 가격 비교의 근거로 삼기 어렵습니다. 견적에 적힌 후보석과 감별서가 같은 돌을 가리키는지 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "유색보석 감별서 읽는 법",
    "description": "보석명과 감별 결과를 제품과 대조할 때 확인하세요."
  },
  {
    "to": "/guide/ai-jewelry-gemstone-color-selection",
    "label": "AI 시안에서 실물 보석 고르기",
    "description": "참고 이미지의 색과 실제 후보석을 비교하는 방법입니다."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "보유석과 제작 희망 조건을 보내 상담할 수 있습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '알렉산드라이트 반지, 두 조명에서 고르는 법'
const gmArticleLead = '알렉산드라이트 반지를 고를 때는 같은 돌을 같은 방향에 놓고 빛만 바꿔 보세요. 주광에서 청록빛이던 돌이 백열등에서 자줏빛을 띨 수 있습니다. 두 색의 차이가 얼마나 눈에 띄는지, 평소 오래 머무는 곳에서도 마음에 드는지를 따로 보면 내게 맞는 한 알을 고르기 쉽습니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '알렉산드라이트 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '알렉산드라이트 반지 제작 상담'
const gmHeroAlt = '가느다란 금빛 반지에 타원형 청록색 중심석 한 알을 네 발로 고정한 디자인 예시'
const gmHeroCaption = 'AI로 만든 반지 디자인 예시입니다. 실제 알렉산드라이트의 주광·백열등 비교 사진은 글 아래 GIA 품질 자료에서 볼 수 있습니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '보석의 종류, 광원별 색 변화와 감별 표기는 GIA의 알렉산드라이트 자료를 참고했습니다. 주문제작 일정은 귀족의 안내를 따릅니다.'
const gmSources = [
  {
    "label": "GIA — 알렉산드라이트 품질과 실물 비교 사진",
    "url": "https://www.gia.edu/alexandrite-quality-factor",
    "note": "GIA는 같은 보석을 주광과 백열등에서 촬영한 사진과 돌마다 다른 색조·채도의 예를 제공합니다."
  },
  {
    "label": "GIA — 알렉산드라이트 구매 안내",
    "url": "https://www.gia.edu/alexandrite/buyers-guide",
    "note": "구매할 때 색 변화와 두 조명에서의 색을 함께 보며, 감별 정보에서 천연·합성 여부와 정확한 보석명을 확인할 수 있습니다."
  },
  {
    "label": "GIA — 알렉산드라이트 개요",
    "url": "https://www.gia.edu/alexandrite",
    "note": "알렉산드라이트는 광원에 따라 다른 색을 보이는 크리소베릴의 한 종류입니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "디자인과 소재를 상담해 견적을 정하며 제작은 최소 3주를 기준으로 안내합니다."
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
