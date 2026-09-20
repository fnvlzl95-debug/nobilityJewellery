<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-initial-necklace-custom-order'
const pageTitle = '이니셜 목걸이 주문제작, 형태별 선택법 | 귀족'
const pageDescription = '이니셜 목걸이를 주문하려면 글자 참·연결 네임형·각인 판부터 구분하세요. 도안의 연결 위치와 앞뒤 모습, 체인 포함 범위를 정리해 종로 귀족에 제작 상담을 요청할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-initial-necklace-custom-order-hero-30c4af3e.webp`
const publishedAt = '2026-09-20'
const updatedAt = ''
const faqItems = [
  {
    "question": "이니셜 참을 고르면 모두 주문제작인가요?",
    "answer": "이미 준비된 글자 참을 고르는 구성도 있고, 원하는 글자 모양을 새로 만드는 주문도 있습니다. 상품명만 보지 말고 어느 방식인지 확인하세요."
  },
  {
    "question": "한 글자와 연결 네임형 중 무엇을 고를까요?",
    "answer": "이니셜 하나를 강조하고 싶다면 한 글자형을, 이름 전체의 실루엣을 원한다면 연결 네임형을 비교해 보세요. 연결 네임형은 글자 사이의 연결 위치까지 도안으로 확인하는 것이 좋습니다."
  },
  {
    "question": "펜던트 가격에 목걸이 체인도 포함되나요?",
    "answer": "제품과 주문 구성에 따라 다릅니다. 체인 포함 또는 펜던트 단독 중 원하는 구성을 정해 문의하고, 각인·보석 추가 여부도 함께 확인하세요."
  },
  {
    "question": "한글 이름이나 손글씨도 상담할 수 있나요?",
    "answer": "원하는 이름이나 손글씨 이미지를 보내 주세요. 선의 형태와 글자 연결을 확인한 뒤 표현 가능한 방식과 제작 범위를 상담하게 됩니다."
  }
]
const quickAnswers = [
  "글자 실루엣이 보이길 원하면 글자형, 금속 판 위에 문구를 담고 싶으면 각인형부터 비교하세요.",
  "이미 만들어진 글자 참을 고르는 것과 새 도안을 제작하는 것은 다른 주문입니다.",
  "원하는 글자·참고 사진·체인 포함 여부를 보내면 어떤 제작을 원하는지 설명하기 쉽습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "기성 글자 참인지, 새 도안 제작인지부터 정하세요",
    "paragraphs": [
      "이니셜 목걸이라는 이름 아래에는 글자 참을 골라 체인에 다는 구성, 여러 글자를 연결한 네임형, 판에 문구를 새기는 구성이 있습니다. Pandora의 공식 개인화 목걸이 안내도 목걸이 선택, 글자 참 선택, 각인 추가를 별도 단계로 구분합니다.",
      "상담에서는 “M 목걸이”라는 말에 한 문장을 더해 보세요. “이미 있는 M 참 중에서 고르고 싶어요”인지, “이 도안의 M 모양으로 새로 만들고 싶어요”인지가 분명하면 필요한 확인부터 진행할 수 있습니다. 아래 표는 원하는 형태를 설명하기 위한 비교입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 모습",
        "비교할 형태",
        "먼저 확인할 것"
      ],
      "rows": [
        [
          "알파벳 한 글자가 눈에 띄는 모습",
          "한 글자 펜던트·참",
          "기성 글자 선택인지 별도 도안 제작인지"
        ],
        [
          "이름이 한 덩어리로 이어진 모습",
          "연결 네임형",
          "글자 사이를 연결할 위치와 양끝 구조"
        ],
        [
          "코인이나 판 안에 문구가 보이는 모습",
          "각인형 펜던트",
          "판 모양과 문구가 들어갈 면"
        ]
      ]
    }
  },
  {
    "title": "글자가 실제로 어디에 매달리는지 보세요",
    "paragraphs": [
      "글자 모양을 고른 다음에는 체인과 만나는 위치를 확인하세요. 가운데 고리에 펜던트가 달리는 안과 글자 양끝에 체인이 연결되는 안을 나란히 그려 달라고 요청하면 원하는 모습을 설명하기 쉽습니다.",
      "연결 네임형을 생각한다면 글자 사이의 빈 공간과 이어지는 부분을 도안에서 짚어 보세요. “여기는 떨어진 글자로 보이길 원하는지, 이어진 선으로 보이길 원하는지”를 표시하는 방법이 좋습니다. 화면의 선만으로 두께나 연결 강도를 확정하지 말고 제작자가 구현할 구조를 확인해야 합니다.",
      "이 과정은 도안 확인을 돕기 위한 제안입니다. 모든 글자·서체·고정 방식을 선택할 수 있다는 뜻은 아니므로 원하는 모습을 먼저 전달하고 가능한 안을 비교하세요."
    ],
    "bullets": [
      "원하는 방향을 표시한 정면 그림",
      "체인과 만나는 고리 또는 양끝 위치",
      "글자 사이에서 남기고 싶은 빈 공간",
      "도안에 표시된 크기와 실제 완성 크기의 차이 여부"
    ],
    "table": null
  },
  {
    "title": "앞면만 보지 말고 뒷면과 주문 구성을 확인하세요",
    "paragraphs": [
      "Pandora의 특정 알파벳 참은 앞면과 뒷면의 표면 장식이 다르며, 호환되는 제품군도 별도로 표시합니다. 모든 이니셜 펜던트가 같은 구조라는 뜻은 아닙니다. 후보 제품도 앞뒤 사진과 연결 부위 설명을 확인하세요.",
      "비교하는 금액이 펜던트만의 조건인지, 체인을 포함한 목걸이 조건인지 먼저 구분하면 문의를 반복할 일이 줄어듭니다. 기존 체인을 사용할 계획이라면 “체인 제외, 펜던트만 상담”이라고 적고 연결 부위 사진을 함께 보내세요. 체인 교체와 호환을 자세히 확인하는 방법은 아래 관련 가이드에서 이어 볼 수 있습니다."
    ],
    "bullets": [
      "기성 참 선택 또는 새 도안 제작",
      "펜던트 단독 또는 체인 포함",
      "장식이 있는 앞면과 피부에 닿는 뒷면",
      "각인·보석 추가를 원하는 위치"
    ],
    "table": null
  },
  {
    "title": "이니셜과 참고 사진을 보내 제작 상담을 시작하세요",
    "paragraphs": [
      "종로 귀족에 문의할 때는 완성된 디자인을 미리 정해 올 필요는 없습니다. 원하는 글자와 마음에 드는 형태를 보내고, 아직 고민 중인 부분을 함께 적어 주세요. 한글·자필·연결 네임형은 원본 도안을 보고 표현 가능한 범위를 확인합니다.",
      "문의 예시: “M 한 글자가 펜던트인 목걸이를 원합니다. 첨부 사진처럼 고리에 달리는 형태가 좋고, 체인까지 포함해 상담받고 싶어요. 새 도안 제작이 필요한지와 가능한 소재, 견적을 알려 주세요. 희망 수령일은 ○월 ○일입니다.”",
      "아래 카카오톡 상담에서 참고 사진과 위 내용을 보내 주세요. 도안과 주문 구성을 확인한 뒤 제작 가능 범위·가격·일정을 안내받을 수 있습니다. 방문 상담은 종로 173 종묘귀금속백화점 101호 귀족에서 진행합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "참고 사진은 원하는 분위기를 설명하는 자료입니다. 실제 도안과 연결 구조를 확인한 뒤 주문 내용을 정하세요.",
  "한글·자필·연결 네임형의 표현 범위와 일정은 도안에 따라 확인이 필요합니다."
]
const relatedLinks = [
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 둘러보기",
    "description": "갤러리의 목걸이 디자인을 살펴보고 원하는 체인과 분위기를 골라 보세요."
  },
  {
    "to": "/custom",
    "label": "주문제작 상담 안내",
    "description": "원하는 이니셜과 참고 사진으로 제작 상담을 시작하세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "기존 체인과 펜던트 호환 확인",
    "description": "이미 가진 체인을 활용하고 싶을 때 연결 부위를 확인하는 안내입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '이니셜 목걸이 주문제작, 형태별 선택법'
const gmArticleLead = '이니셜 목걸이 주문제작은 원하는 글자와 함께 “글자 자체를 만들지, 판에 새길지”를 정하면 시작하기 쉽습니다. 한 글자 참을 고르는 주문과 이름 전체의 모양을 새로 만드는 주문은 확인할 내용이 다릅니다. 아래에서 형태를 고른 뒤 참고 사진과 이니셜을 귀족에 보내 제작 가능 범위와 견적을 상담해 보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '이니셜 목걸이 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '이니셜 목걸이 도안과 주문 조건'
const gmHeroAlt = '짙은 돌 위 금빛 체인에 연결된 M 모양 펜던트'
const gmHeroCaption = '글자 자체가 펜던트가 되는 형태의 설명용 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'Pandora 제조사 페이지의 개인화 구성과 특정 글자 참의 앞뒤·호환 표기를 참고했습니다. 형태 비교표와 도안 확인 순서는 귀족 상담을 준비하기 위한 편집 안내이며, 타사의 선택 옵션이 귀족에도 그대로 적용된다는 뜻은 아닙니다.'
const gmSources = [
  {
    "label": "Pandora — Initial Necklaces",
    "url": "https://us.pandora.net/en/necklaces/initial-necklaces/",
    "note": "목걸이·글자 참 선택과 각인 추가를 구분하는 제조사 안내."
  },
  {
    "label": "Pandora — Letter A Alphabet Charm",
    "url": "https://us.pandora.net/en/charms/charms/letter-a-alphabet-charm/797455.html",
    "note": "특정 글자 참의 앞뒤 표면과 호환 제품군 표기."
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
