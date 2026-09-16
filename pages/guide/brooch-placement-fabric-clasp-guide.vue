<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/brooch-placement-fabric-clasp-guide'
const pageTitle = '브로치 다는 법, 옷감·위치·잠금 확인하기 | 귀족'
const pageDescription = '브로치는 위치를 고르기 전에 옷감과 뒷면 잠금을 확인하세요. 재킷·블라우스·니트의 부착 조건, 핀을 다는 순서와 처짐·걸림을 확인하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/brooch-placement-fabric-clasp-guide-hero-6c272065.webp`
const publishedAt = '2026-09-16'
const updatedAt = ''
const faqItems = [
  {
    "question": "브로치는 꼭 왼쪽에 달아야 하나요?",
    "answer": "일상적인 스타일링에서 한쪽을 정답으로 정할 필요는 없습니다. 옷깃 모양과 장식의 방향, 가방끈이 닿는 곳을 함께 보고 위치를 비교하세요. 별도 복장 규정이 있는 자리라면 그 규정을 먼저 확인하면 됩니다."
  },
  {
    "question": "두꺼운 트위드에는 무거운 브로치를 달아도 괜찮나요?",
    "answer": "두께만으로 정할 수 없습니다. 트위드도 실 걸림과 당김에 주의해야 하며, 옷깃이 뒤집히거나 처지면 브로치나 옷의 조합을 바꿔 보는 편이 좋습니다."
  },
  {
    "question": "브로치 잠금이 헐거우면 직접 조여도 되나요?",
    "answer": "작동 구조를 모른 채 공구로 조이거나 핀을 구부리지 마세요. 잠금이 저절로 풀리거나 핀 끝이 드러나면 착용을 멈추고 판매처나 점검 가능한 곳에 문의하세요."
  },
  {
    "question": "브로치를 단 채 옷을 세탁해도 되나요?",
    "answer": "세탁 전에 분리하세요. 옷과 주얼리의 관리 조건은 다르며, 핀이나 장식이 옷감에 걸릴 수도 있습니다. 브로치 세척은 제품별 소재와 관리 안내를 따르세요."
  }
]
const quickAnswers = [
  "재킷의 접힌 옷깃인 라펠은 브로치 위치를 비교해 볼 수 있는 곳입니다. 가방끈이나 다른 장식과 닿는지도 함께 보세요.",
  "실크·트위드·캐시미어처럼 섬세한 옷감은 핀을 달고 뺄 때 특히 주의하세요. 두꺼워 보인다고 손상이 없는 것은 아닙니다.",
  "핀과 잠금이 헐겁거나 옷이 처진다면 그대로 착용하지 마세요. 장식 무게·부착 위치·잠금 상태를 나누어 확인해야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "핀을 꽂기 전에 위치부터 대어 보세요",
    "paragraphs": [
      "Tiffany의 공식 브로치 안내는 블레이저나 재킷, 코트의 옷깃 등을 착용 위치의 예로 소개합니다. 평소 입는 옷에서 장식이 어떻게 보이는지 먼저 비교해 보세요. 일상적인 스타일링이라면 왼쪽이나 오른쪽 한곳을 정답으로 정하기보다 옷깃 모양과 다른 장식의 위치를 함께 보는 방법이 좋습니다.",
      "처음부터 핀을 여러 번 꽂아 위치를 바꾸기보다는 잠금을 닫은 상태로 옷 위에 가볍게 대어 보세요. 거울이나 사진으로 전체 배치를 확인한 뒤 부착 위치를 정합니다. 아직 고정하지 않은 브로치는 손으로 받쳐 떨어지지 않게 해 주세요."
    ],
    "bullets": [
      "재킷·코트: 접힌 옷깃의 폭과 브로치의 가로·세로 방향을 비교합니다.",
      "목걸이·스카프와 함께 착용: 장식끼리 부딪히거나 서로 가리지 않는지 봅니다.",
      "가방을 메는 날: 어깨끈이 지나가거나 스치는 위치는 피해서 비교합니다."
    ],
    "table": null
  },
  {
    "title": "옷감이 받쳐 주는지 먼저 확인하세요",
    "paragraphs": [
      "CHANEL은 브로치를 조심스럽게 달고 빼도록 안내하면서 실크·트위드·캐시미어를 섬세한 소재의 예로 듭니다. 트위드 재킷처럼 도톰해 보이는 옷도 실이 걸리거나 당겨질 수 있으므로 두께만으로 판단하지 마세요.",
      "다음 표는 옷과 브로치를 함께 살필 때의 관찰 기준입니다. 특정 소재에 핀을 꽂아도 된다는 보증은 아닙니다. 아끼는 옷이나 손상 여부를 판단하기 어려운 원단은 의류의 관리 안내와 판매처 설명을 먼저 확인하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "옷의 상태",
        "살펴볼 부분",
        "선택을 바꿀 신호"
      ],
      "rows": [
        [
          "형태가 잡힌 재킷·코트 옷깃",
          "장식이 놓일 면의 폭과 겉감 상태",
          "옷깃이 뒤집히거나 한쪽으로 당겨짐"
        ],
        [
          "얇은 블라우스·실크",
          "핀 자국과 원단 손상 가능성",
          "원단이 우는 주름, 눈에 띄는 처짐"
        ],
        [
          "니트·캐시미어",
          "성긴 조직과 실 걸림 가능성",
          "코가 늘어나거나 한 지점이 길게 당겨짐"
        ],
        [
          "트위드 등 조직감 있는 옷",
          "튀어나온 실과 핀 주변의 걸림",
          "실이 끌려 나오거나 표면이 변형됨"
        ]
      ]
    }
  },
  {
    "title": "옷을 벗어 놓고 핀과 잠금을 확인하세요",
    "paragraphs": [
      "핀으로 고정하는 브로치는 옷을 벗어 안정된 곳에 놓으면 뒷면 구조와 옷감을 함께 보기 쉽습니다. 브로치를 손으로 받친 상태에서 해당 제품의 안내에 따라 잠금을 여세요. 회전형·미는 방식 등 제품마다 작동 구조가 다를 수 있으므로 잘 움직이지 않는 부품을 힘으로 돌리지 마세요.",
      "정한 위치에 옷감이 팽팽하게 당겨지지 않도록 놓고, 핀 끝의 진행 방향을 보며 천천히 부착합니다. 손가락이나 다른 옷의 겹이 핀 경로에 들어오지 않게 하고, 잘 통과하지 않으면 밀어붙이지 말고 멈추세요.",
      "부착 뒤에는 핀 끝이 잠금 부분에 제대로 들어갔는지 확인합니다. 보조 잠금이 있는 제품은 그 부분도 확인하세요. Cartier의 일반 주얼리 관리 안내 역시 착용 전 잠금장치와 보조 잠금의 헐거움을 살피고, 의심스러우면 점검 전까지 착용하지 않도록 권합니다."
    ],
    "bullets": [
      "핀 끝이나 잠금 부품이 휘거나 빠진 곳은 없는지 봅니다.",
      "닫은 상태에서 핀 끝이 밖으로 드러나거나 잠금이 저절로 풀리지 않는지 확인합니다.",
      "잠금이 헐거우면 공구로 조이거나 핀을 구부리기보다 사용을 멈추고 점검을 요청합니다."
    ],
    "table": null
  },
  {
    "title": "착용 후 처짐을 보고, 뺄 때는 옷감을 받치세요",
    "paragraphs": [
      "옷을 다시 입고 자연스럽게 서거나 앉아 보세요. 브로치가 옷깃을 아래로 당기는지, 몸을 움직일 때 장식이 뒤집히는지, 가방끈이 스치는지 확인합니다. 문제가 보이면 장식을 더 단단히 눌러 고정하려 하기보다 가벼운 브로치나 다른 옷과의 조합을 검토하세요.",
      "제거할 때도 브로치와 옷감을 각각 받치고 잠금을 충분히 연 뒤, 핀이 들어간 경로를 보며 천천히 빼세요. 장식만 잡아당기면 옷감에 힘이 실릴 수 있습니다. 실이 걸려 나오거나 핀이 움직이지 않으면 계속 당기지 말고 걸린 부분부터 확인합니다.",
      "옷을 세탁하거나 맡기기 전에는 브로치를 분리해 두세요. 주얼리 자체의 세척은 금속·보석·접착 부위 등 소재에 따라 달라지므로, 옷과 함께 세척하지 말고 해당 제품의 관리 방법을 확인하는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "핀 자국이나 원단 손상을 완전히 막는 공통 부착법은 없습니다. 소재와 조직, 장식의 무게·크기·고정 구조를 함께 확인하세요.",
  "이 글은 브로치 착용을 위한 일반 안내입니다. 귀족의 브로치 판매·제작·수리 가능 여부나 특정 제품의 재고를 뜻하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/jewelry-cleaning-care-at-home",
    "label": "금·은 주얼리 세척·보관",
    "description": "브로치를 옷에서 분리한 뒤 소재에 맞는 관리 기준을 확인하세요."
  },
  {
    "to": "/guide/gold-585-vs-750-selection",
    "label": "585·750 각인과 금 소재 선택",
    "description": "금빛 외관과 실제 금 함량을 구분해 제품 정보를 읽어 보세요."
  },
  {
    "to": "/guide/plated-jewelry-discoloration-care-guide",
    "label": "도금 장식의 변색 확인",
    "description": "표면을 닦기 전에 도금과 오염 상태를 구분하는 기준입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '브로치 다는 법, 옷감·위치·잠금 확인하기'
const gmArticleLead = '브로치를 달 때는 예뻐 보이는 위치만큼 옷감이 장식을 받쳐 주는지도 중요합니다. 핀을 꽂기 전 위치를 대어 보고, 옷의 늘어짐과 뒷면 잠금 상태를 확인하세요. 재킷 옷깃부터 니트까지 같은 방법으로 달기보다 옷감과 브로치 구조를 함께 살펴보는 편이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '브로치 다는 법'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '주얼리 디자인과 착용 조건'
const gmHeroAlt = '짙은 회색 재킷의 접힌 옷깃에 금빛 잎 모양 브로치를 단 모습'
const gmHeroCaption = '재킷 옷깃에 브로치를 배치한 설명용 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'Tiffany의 착용 예시, CHANEL의 의류 관리 안내, Cartier의 잠금 점검 안내를 참고했습니다. 옷감 비교표와 부착 전후 확인 순서는 이 자료를 바탕으로 정리한 일반적인 관찰 안내이며, 개별 제품의 사용 설명이 우선합니다.'
const gmSources = [
  {
    "label": "Tiffany & Co. — Brooches",
    "url": "https://www.tiffany.com/jewelry/brooches/",
    "note": "재킷과 코트 옷깃 등 브로치 착용 위치 예시."
  },
  {
    "label": "CHANEL — Ready-to-wear Care Instructions",
    "url": "https://www.chanel.com/us/fashion/care-instructions/ready-to-wear/",
    "note": "브로치 부착·제거와 실크·트위드·캐시미어 취급 주의."
  },
  {
    "label": "Cartier — Some Precautionary Measures",
    "url": "https://int.cartier.com/en/services/care-adjust-repair/jewellery/care/some-precautionary-measures.html",
    "note": "착용 전 잠금·보조 잠금의 헐거움 확인과 의심 시 착용 중단."
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
