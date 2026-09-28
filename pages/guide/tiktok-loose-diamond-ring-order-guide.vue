<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/tiktok-loose-diamond-ring-order-guide'
const pageTitle = '틱톡 다이아 경매, 반지 제작 전 확인 | 귀족'
const pageDescription = '틱톡 다이아 경매에서 본 루스 보석을 반지로 만들고 싶다면 구매 구성과 제작 가능 범위를 먼저 확인하세요. 실제 보석 자료, 지참 보석 세팅, 완성품 견적에 포함할 항목을 나누고 귀족 상담에 필요한 정보를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/tiktok-loose-diamond-ring-order-guide-hero-7e4a2098.webp`
const publishedAt = '2026-09-28'
const updatedAt = ''
const faqItems = [
  {
    "question": "틱톡에서 산 루스 다이아는 완성 반지인가요?",
    "answer": "루스는 금속에 세팅하지 않은 낱개 보석을 뜻합니다. 다만 판매 구성은 상품마다 다르므로, 보석만 받는지 반지 제작까지 포함되는지 상세 설명을 확인하세요."
  },
  {
    "question": "루스 다이아를 먼저 사고 반지 제작을 맡겨도 되나요?",
    "answer": "구매 전에 지참 보석 작업 가능 여부를 문의하는 편이 좋습니다. 보석 자료와 원하는 디자인을 함께 보내 검토할 범위를 확인하고, 제작 확정에 실물 확인이 필요한지도 물어보세요."
  },
  {
    "question": "방송 캡처만으로 반지 제작 견적을 받을 수 있나요?",
    "answer": "캡처는 상담을 시작하는 참고 자료로 쓸 수 있습니다. 다만 해당 보석의 제품 자료와 실제 상태, 원하는 완성 형태를 확인해야 구체적인 제작 범위와 견적을 검토할 수 있습니다."
  },
  {
    "question": "루스 경매 가격을 완성 반지 가격과 비교해도 되나요?",
    "answer": "같은 포함 범위인지 먼저 확인해야 합니다. 보석 대금 외에 금속 반지 제작과 세팅·마감, 배송 등 별도 항목이 있는지 나누어 비교하세요."
  }
]
const quickAnswers = [
  "루스 다이아 구매와 반지 제작은 별개의 주문일 수 있습니다. 판매 구성에 금속 반지와 세팅 작업이 포함되는지 확인하세요.",
  "방송 화면만 저장하기보다 실제 구매할 보석의 자료와 원하는 반지 사진을 함께 준비하세요.",
  "외부에서 구입한 보석을 맡길 수 있는지 먼저 문의하고, 보석값과 완성 반지 견적의 포함 범위를 나누어 비교하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "틱톡 다이아 경매는 어떤 SNS 흐름인가요?",
    "paragraphs": [
      "2026년 9월 22일 주얼리 전문 매체 Jeweller는 틱톡 등 SNS에서 다이아몬드와 유색석을 판매하는 라이브 경매의 확산을 다뤘습니다. 해외 SNS 거래 흐름을 소개한 보도이며, 국내 검색량이나 SNS 전체 인기 순위를 집계한 자료는 아닙니다.",
      "이런 영상에서 보석을 고를 때는 “마음에 드는 루스를 찾았다”와 “착용할 반지를 주문했다”를 구분하세요. 영상에 완성 반지가 함께 등장하더라도 실제 판매 대상이 낱개 보석인지, 반지까지 포함한 구성인지 상품별로 확인해야 합니다.",
      "반지로 착용할 목적이라면 보석을 고르는 단계부터 완성 형태를 생각해 두세요. 원하는 금속 색과 반지 디자인을 정리해 두면, 보석만 먼저 구매한 뒤 제작 방향을 다시 찾는 일을 줄일 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "라이브에서 본 보석은 어떤 자료를 받아야 하나요?",
    "paragraphs": [
      "실제로 주문할 보석을 특정할 수 있는 자료부터 요청하세요. GIA의 온라인 다이아 구매 안내는 넓은 등급 범위가 아니라 개별 보석의 정보를 확인하고, GIA 보고서가 있다면 Report Check에서 기재 내용을 대조하도록 설명합니다. 보고서 조회와 도착한 실물의 일치 확인은 구분해서 진행하는 것이 좋습니다.",
      "아래는 판매자에게 보낼 질문을 정리한 표입니다. 같은 모양의 대표 사진이나 다른 상품의 보고서가 아니라, 내가 살 보석에 연결되는 자료인지 확인하세요. 보석 종류나 천연·랩그로운 여부가 불명확하면 판매자의 구체적인 설명을 먼저 요청합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "받아 둘 자료",
        "확인하려는 내용",
        "판매자에게 할 질문"
      ],
      "rows": [
        [
          "해당 상품의 상세 설명",
          "판매 대상과 포함 구성",
          "보석만 받는 주문인가요, 반지 제작도 포함되나요?"
        ],
        [
          "실제 보석 사진·영상",
          "내가 받게 될 후보의 모습",
          "방송에서 본 바로 그 보석을 여러 방향에서 볼 수 있나요?"
        ],
        [
          "보고서와 보석 식별 자료",
          "설명과 자료가 같은 대상을 가리키는지",
          "이 보고서가 해당 보석과 연결되는지 어떻게 확인하나요?"
        ],
        [
          "형태·실측 등 제품 자료",
          "제작 상담에서 검토할 정보",
          "세팅 상담에 보낼 보석 자료를 받을 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "구매한 루스를 원하는 반지에 바로 넣을 수 있나요?",
    "paragraphs": [
      "가능하다고 미리 가정하지 말고, 지참 보석으로 작업을 맡길 수 있는지 먼저 확인하세요. 주얼리 제조사 Stuller도 고객 보유 보석을 자사 마운팅에 세팅하는 작업을 사례별로 검토한다고 안내합니다. 이는 해당 회사의 서비스 사례이며 귀족의 작업 가능 여부를 대신 설명하는 것은 아닙니다.",
      "상담에서는 보석 자료와 원하는 반지 사진을 함께 보여 주세요. 보석의 모양과 실제 상태를 확인한 뒤 기존 디자인을 활용할지, 형태를 조정해야 할지 검토할 수 있습니다. 사진 상담만으로 제작을 확정하기보다 실물 확인이 필요한 단계도 물어보세요.",
      "금속 반지에 보석을 고정하는 작업까지 고려해야 완성품의 방향이 잡힙니다. “이 보석으로 이 디자인을 만들 수 있나요?”라는 질문에 이어, 가능한 범위와 추가 확인 자료를 먼저 요청해 보세요."
    ],
    "bullets": [
      "외부에서 구입한 보석을 맡기는 상담이 가능한지",
      "원하는 디자인에서 유지할 부분과 조정할 부분은 무엇인지",
      "실물 확인 전후에 확정할 수 있는 내용이 어떻게 다른지"
    ],
    "table": null
  },
  {
    "title": "보석값과 반지 제작 견적은 어떻게 나누나요?",
    "paragraphs": [
      "보석 구매 대금과 반지 제작에 필요한 금속·세팅·마감 등의 포함 범위를 나누어 확인하세요. 판매자가 제시한 금액이 루스만의 가격이라면 완성 반지 견적과 바로 비교하기 어렵습니다. 배송이나 별도 확인 작업 등 추가 항목이 있는지도 각 거래 상대에게 물어보는 편이 좋습니다.",
      "구매 전에 판매자의 배송·반품 조건을 확인하고, 도착한 보석을 어떤 방법으로 살펴볼지 정해 두세요. GIA도 판매자 확인과 반품 정책, 실물 확인을 온라인 구매에서 살펴볼 항목으로 안내합니다. 실제 수령 일정과 제작 가능 범위가 정해지기 전에는 반지 완성일을 확정하기 어렵습니다.",
      "귀족 카카오톡에 상품 링크·실제 보석 사진 또는 영상·보유 보고서와 제품 자료·원하는 반지 사진·예산·희망일을 보내 주세요. “SNS에서 본 루스를 반지로 만들고 싶습니다. 구매 전인데 지참 보석 상담이 가능한지, 제작 견적에 무엇이 포함되는지 궁금합니다”라고 문의하면 됩니다. 이미 구입했다면 수령 여부와 보유 자료를 함께 알려 주세요.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 외부 구매 보석의 작업 가능 범위와 실물 확인 필요 여부는 방문 전에 상담해 주세요. 보석을 아직 정하지 않았다면 원하는 완성 반지 사진부터 보내 구매·제작 방향을 문의할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "SNS 영상의 인기와 해당 보석의 상태·판매 조건은 따로 확인하세요. 이 글은 특정 경매 판매자나 거래를 추천하는 안내가 아닙니다.",
  "귀족의 외부 구매 보석 작업 가능 여부와 견적·일정은 자료 및 실물 확인에 따라 달라집니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "루스 보석 반지 제작 가능 범위 문의",
    "description": "보석 자료와 원하는 반지 사진을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "완성 반지 디자인 참고하기",
    "description": "마음에 드는 형태를 골라 상담에 활용하세요."
  },
  {
    "to": "/guide/lab-grown-diamond-natural-difference",
    "label": "랩그로운과 천연 다이아의 차이",
    "description": "소재 선택이 먼저 필요하다면 확인해 보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '틱톡 다이아 경매, 반지 제작 전 확인'
const gmArticleLead = '틱톡 다이아 경매에서 마음에 드는 보석을 찾았다면, 보석만 받는 거래인지 완성 반지까지 포함되는지 먼저 확인하세요. 금속에 세팅하지 않은 낱개 보석을 루스라고 합니다. 반지로 만들 계획이라면 구매 전에 해당 보석으로 원하는 디자인을 제작할 수 있는지와 별도 비용 범위를 함께 상담하는 편이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '틱톡 다이아 경매'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'SNS 루스 다이아 반지 제작 가능 범위'
const gmHeroAlt = '아이보리 보석 종이 위에 놓인 투명한 라운드 형태의 루스 보석 예시'
const gmHeroCaption = '루스 보석의 형태를 설명하기 위한 예시 이미지입니다. SNS 영상 속 보석이나 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'SNS 흐름은 Jeweller의 2026년 9월 22일 보도, 온라인 구매 확인 항목은 GIA, 지참 보석 세팅 사례는 Stuller 안내를 참고했습니다. 구매·제작을 연결하는 질문과 상담 예시는 자체 제안입니다. 자료 확인일은 2026년 9월 28일입니다.'
const gmSources = [
  {
    "label": "Jeweller — SNS 보석 라이브 경매 보도 (2026.09.22)",
    "url": "https://www.jewellermagazine.com/Article/15534/Growing-concern-over-popular-diamond-auctions-on-social-media",
    "note": "해외 SNS 보석 라이브 경매의 확산을 다룬 2026년 9월 22일 보도입니다."
  },
  {
    "label": "GIA — 온라인 다이아몬드 구매 안내",
    "url": "https://www.gia.edu/research-news-tips-buying-diamonds-online",
    "note": "개별 보석 정보와 보고서, 판매자 및 실물 확인을 안내합니다."
  },
  {
    "label": "Stuller — Stone Setting Services",
    "url": "https://www.stuller.com/stonesetting/",
    "note": "고객 보유 보석의 세팅을 사례별로 검토하는 제조사 안내입니다."
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
