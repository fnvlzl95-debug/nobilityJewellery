<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/tourmaline-ring-bicolor-selection'
const pageTitle = '투어멀린 반지, 단색과 바이컬러 고르기 | 귀족'
const pageDescription = '투어멀린 반지를 고를 때 단색 느낌과 바이컬러의 색 배치를 비교해 보세요. 워터멜론과 다색성의 차이, 실제 보석 사진에서 볼 부분, 종로 귀족에 원하는 색과 디자인을 전달하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/tourmaline-ring-bicolor-selection-hero-feec0a71.webp`
const publishedAt = '2026-10-01'
const updatedAt = ''
const faqItems = [
  {
    "question": "10월 탄생석은 오팔만 있나요?",
    "answer": "GIA는 오팔과 투어멀린을 모두 10월 탄생석으로 소개합니다. 투어멀린 반지를 선물로 고를 때는 생월과 함께 받는 분이 좋아하는 색 배치를 살펴보세요."
  },
  {
    "question": "바이컬러 투어멀린은 보석 두 개를 붙인 것인가요?",
    "answer": "바이컬러라는 말은 한 보석 안의 두 색 구역을 설명할 때 쓰이며, 그 자체가 접합을 뜻하지는 않습니다. 개별 상품의 구성과 천연 여부는 판매 설명·확인 자료로 따로 확인하세요."
  },
  {
    "question": "워터멜론 투어멀린은 모두 같은 무늬인가요?",
    "answer": "같은 이름이어도 실제 색 배치를 확인해야 합니다. 중심과 바깥쪽이 나뉘는 모습이 좋은지, 양끝의 색이 다른 모습이 좋은지 사진으로 선호를 전하세요."
  },
  {
    "question": "투어멀린을 기울이면 색이 달라 보이는 이유는 무엇인가요?",
    "answer": "투어멀린에는 보는 방향에 따라 색이 다르게 보이는 다색성이 있습니다. 색 구역이 나뉜 바이컬러와 구분하고, 실제 후보의 정면과 기울인 모습을 함께 확인하세요."
  },
  {
    "question": "참고 사진과 같은 바이컬러 반지를 주문할 수 있나요?",
    "answer": "참고 사진에서 좋아하는 색 경계와 방향을 먼저 알려 주세요. 실제로 준비할 수 있는 보석 후보와 디자인을 확인한 뒤 제작 범위를 상담하며, 사진과 동일한 색 배치를 미리 보장할 수는 없습니다."
  }
]
const quickAnswers = [
  "단색 느낌을 원하면 전체 색감을, 바이컬러를 원하면 한 보석 안의 색 경계와 배치를 먼저 비교하세요.",
  "워터멜론의 대표적인 모습은 분홍 중심을 초록 바깥 부분이 둘러싼 형태입니다. 상품 이름과 실제 무늬를 함께 보세요.",
  "마음에 든 색 배치는 실제 후보의 정면 사진에 표시해 두세요. 같은 이름의 다른 보석도 똑같이 보인다고 가정하지 마세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "투어멀린 반지, 단색과 바이컬러는 어떻게 다른가요?",
    "paragraphs": [
      "투어멀린은 다양한 색으로 만날 수 있으며, GIA 구매 가이드는 여러 색을 함께 보여 주도록 연마한 보석도 소개합니다. 이 글에서 단색은 한 색이 중심으로 보이는 인상을, 바이컬러는 한 보석 안에 두 색의 구역이 나타나는 모습을 뜻합니다.",
      "먼저 참고 사진을 보며 내가 좋아하는 것이 핑크나 그린이라는 색 자체인지, 서로 다른 색이 맞닿는 모습인지 나누어 보세요. 색의 조합이 마음에 들었다면 “핑크 투어멀린”으로만 문의하기보다 경계가 보이는 사진을 보내는 편이 원하는 인상을 전달하기 쉽습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 모습",
        "사진에서 볼 부분",
        "상담에 전할 선호"
      ],
      "rows": [
        [
          "한 색이 중심인 모습",
          "전체 색감과 어둡게 보이는 부분",
          "선명한 느낌인지 차분한 느낌인지"
        ],
        [
          "바이컬러",
          "색 경계의 위치와 양쪽의 비중",
          "두 색 중 어느 쪽이 더 많이 보이면 좋은지"
        ],
        [
          "워터멜론 느낌",
          "중심과 바깥쪽의 색 배치",
          "중심색과 둘레색이 드러나는 모습이 중요한지"
        ]
      ]
    }
  },
  {
    "title": "바이컬러와 워터멜론은 같은 뜻인가요?",
    "paragraphs": [
      "워터멜론은 색 배치가 수박의 속과 껍질을 닮은 데서 온 이름입니다. GIA는 분홍 중심을 초록 부분이 둘러싼 결정을 대표 사례로 보여 줍니다. 따라서 핑크와 그린이라는 이름만 보고 모두 같은 무늬를 기대하기보다 실제 보석을 확인해야 합니다.",
      "원하는 무늬를 설명할 때는 “양끝에서 색이 나뉘는 모습”인지 “중심을 다른 색이 둘러싸는 모습”인지 구분해 보세요. 반지로 찾고 있다면 원석 조각의 참고 사진만 고르기보다, 후보 보석의 연마된 모습과 세팅 방향까지 확인하는 것이 좋습니다.",
      "두 색이 보인다는 사실만으로 서로 다른 돌을 붙였다고 판단할 수도 없습니다. GIA는 결정이 자라는 동안 성분 변화로 색 구역이 생길 수 있다고 설명합니다. 다만 이것은 일반적인 형성 설명이며, 특정 상품의 천연 여부를 사진만으로 증명해 주지는 않습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "기울일 때 색이 달라 보이면 바이컬러인가요?",
    "paragraphs": [
      "반드시 그렇지는 않습니다. GIA가 설명하는 다색성은 보석을 보는 결정 방향에 따라 색이 다르게 보이는 성질입니다. 한 보석 안에서 색 구역이 나뉘는 것과는 구분해서 이해해야 합니다.",
      "구매 비교용으로는 정면 사진과 천천히 기울인 짧은 영상을 함께 요청해 보세요. 정면에서 마음에 들었던 색 경계가 어떤 모습인지, 기울였을 때 내가 좋아하는 부분이 계속 잘 보이는지 살펴보는 용도입니다. 이 방법 자체가 감별 검사를 대신하는 것은 아닙니다.",
      "후보가 여럿이면 가능하면 같은 배경과 촬영 조건에서 비교하세요. 화면의 색을 완성품과 완전히 같다고 약속받기보다, 실제로 선택할 보석을 특정한 뒤 확인 가능한 실물·사진·영상의 범위를 상담하는 편이 명확합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "바이컬러 투어멀린 반지는 색 방향을 어떻게 고르나요?",
    "paragraphs": [
      "길쭉한 후보를 골랐다면 손가락을 따라 놓았을 때와 가로로 놓았을 때를 각각 상상해 보세요. 사진을 회전해 나란히 놓으면 색이 위아래로 이어지는 느낌과 좌우로 이어지는 느낌 중 어떤 쪽이 좋은지 비교하기 쉽습니다. 이는 배치 선호를 정리하는 방법이며 실제 제작 가능 여부는 별도로 확인합니다.",
      "정면 사진에 손끝 방향을 표시하고, 더 넓게 보이길 원하는 색이나 가리고 싶지 않은 경계를 함께 적어 두세요. 예를 들어 “손끝 쪽에 핑크가 오고 초록 부분도 분명하게 보였으면 합니다”라고 설명할 수 있습니다. 새 후보로 바뀌면 표시한 배치를 그대로 적용할 수 있는지도 다시 확인하세요.",
      "반지 전체의 장식보다 보석 안의 색 배치가 중요하다면 그 순서를 먼저 알려 주세요. 디자인을 먼저 확정한 뒤 비슷한 색 이름의 돌을 찾는 것과, 마음에 든 실제 보석에 맞춰 디자인을 검토하는 것은 상담의 출발점이 다릅니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 투어멀린 반지 상담은 어떻게 시작하나요?",
    "paragraphs": [
      "귀족 카카오톡에 색 참고 사진과 함께 단색·바이컬러 선호, 원하는 색 경계, 보석을 놓을 방향, 착용할 손가락, 예산과 희망일을 보내 주세요. 선물이라면 받는 분이 자주 착용하는 반지 사진도 디자인 선호를 설명하는 데 도움이 됩니다.",
      "“한 보석 안에 핑크와 그린이 함께 보이는 반지를 찾고 있어요. 첨부 사진처럼 색 경계가 드러나는 느낌이 우선입니다. 가능한 보석 후보와 세팅 방향을 상담하고 싶어요”처럼 문의하면 됩니다. 보석 준비 가능 여부와 제작 범위, 견적·일정은 상담에서 확인합니다.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 방문 전 원하는 색 배치를 먼저 보내고 상담 가능한 내용을 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "색 이름과 사진만으로 천연 여부나 처리 상태를 확정하지 마세요. 실제 후보에 연결되는 판매 설명과 확인 자료를 함께 살펴보세요.",
  "GIA는 투어멀린에 미지근한 비눗물 세척을 안내하고 초음파·증기 세척은 권하지 않습니다. 완성 반지는 보석 상태와 세팅에 맞는 관리 안내도 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "투어멀린 반지 제작 가능 범위 문의",
    "description": "원하는 색 경계와 반지 디자인을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "반지 디자인 참고하기",
    "description": "색 배치와 어울리는 전체 모양을 살펴보세요."
  },
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "탄생석 선물 선택 기준",
    "description": "반지 외의 탄생석 선물도 함께 비교하세요."
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석의 내구성 알아보기",
    "description": "착용 환경에 맞는 보석·세팅을 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '투어멀린 반지, 단색과 바이컬러 고르기'
const gmArticleLead = '투어멀린 반지는 한 색이 중심인 모습과 보석 하나 안에 색 구역이 나뉜 바이컬러 중 어떤 인상을 원하는지부터 정하면 좋습니다. 바이컬러라면 색 이름뿐 아니라 경계의 위치와 각 색이 차지하는 부분을 보세요. 투어멀린은 오팔과 함께 알려진 10월 탄생석이어서 생일 선물로도 살펴볼 수 있습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '투어멀린 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '투어멀린 반지 색 배치와 제작'
const gmHeroAlt = '금빛 반지에 직사각형 보석이 놓이고 보석 안에서 핑크와 그린이 이어지는 바이컬러 디자인 예시'
const gmHeroCaption = '색 배치를 설명하기 위한 디자인 예시 이미지입니다. 실제 판매 제품 사진이나 감별 자료가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '투어멀린의 색 특성·탄생석 정보·세척 안내는 GIA 자료를 참고했습니다. 사진에 색 경계와 방향을 표시하는 방법은 원하는 반지를 설명하기 위한 상담 준비 제안입니다.'
const gmSources = [
  {
    "label": "GIA — 투어멀린 색 구역과 다색성",
    "url": "https://www.gia.edu/tourmaline-quality-factor",
    "note": "색 구역·워터멜론 형태와 다색성의 차이를 설명합니다."
  },
  {
    "label": "GIA — 투어멀린 구매 가이드",
    "url": "https://www.gia.edu/tourmaline/buyers-guide",
    "note": "투어멀린의 다양한 색과 구매 시 살펴볼 요소를 소개합니다."
  },
  {
    "label": "GIA — 10월 탄생석 오팔과 투어멀린",
    "url": "https://www.gia.edu/birthstones/october-birthstones",
    "note": "오팔과 투어멀린을 10월 탄생석으로 소개합니다."
  },
  {
    "label": "GIA — 투어멀린 관리와 세척",
    "url": "https://www.gia.edu/tourmaline-care-cleaning",
    "note": "투어멀린의 세척 방법과 주의점을 안내합니다."
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
