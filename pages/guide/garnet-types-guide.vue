<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/garnet-types-guide'
const pageTitle = '가넷 종류 5가지와 색별 구분법｜빨강·주황·녹색 가넷 차이 | 귀족'
const pageDescription = '가넷은 한 종류가 아닙니다. 파이로프·알만다인·스페사르틴·그로슐러·안드라다이트와 로돌라이트·차보라이트·데만토이드를 색·종·변종 기준으로 구분합니다.'
const ogImage = `${siteConfig.url}/Image/guide/garnet-types-hero.webp`
const publishedAt = '2026-07-24'

const faqItems = [
  {
    "question": "가넷은 모두 짙은 빨간색인가요?",
    "answer": "아닙니다. 가넷은 여러 광물 종으로 이루어진 그룹이며 보라빛 빨강, 주황, 노랑, 녹색 등으로 나타날 수 있습니다. 붉은 가넷이 대표 이미지로 알려졌지만 모든 가넷이 짙은 빨간색인 것은 아닙니다. 다른 보석의 유형 구분은 오팔 종류별 차이 가이드도 함께 참고하세요."
  },
  {
    "question": "가넷의 종과 변종은 어떻게 다른가요?",
    "answer": "파이로프·알만딘·스페사르틴·그로슐러·안드라다이트는 대표적인 가넷 종입니다. 로돌라이트·차보라이트·데만토이드는 특정 종 또는 혼합 조성에서 쓰이는 변종명으로 알려져 있으며, 품질 등급을 뜻하지는 않습니다."
  },
  {
    "question": "차보라이트와 데만토이드는 같은 녹색 가넷인가요?",
    "answer": "둘 다 녹색 가넷이지만 종이 다릅니다. 차보라이트는 녹색 그로슐러이고 데만토이드는 녹색 안드라다이트입니다. 색만 보지 말고 판매 표기와 감별 정보를 함께 확인하세요."
  },
  {
    "question": "로돌라이트 가넷은 어떤 종류인가요?",
    "answer": "로돌라이트는 자주빛 계열의 파이로프·알만딘 가넷으로 알려진 변종명입니다. 단일 종 이름으로 단정하기보다 색, 투명도와 감별 표기를 함께 비교해야 합니다."
  },
  {
    "question": "AAA 가넷은 공통 품질 등급인가요?",
    "answer": "공통으로 통용되는 하나의 품질 등급이라고 보기 어렵습니다. 판매 업체가 A·AA·AAA 같은 자체 표현을 사용할 수 있으므로 다른 판매처의 등급을 그대로 환산하지 마세요. 색, 투명도, 컷, 크기와 실제 종류를 항목별로 비교하는 것이 좋습니다."
  }
]

const quickAnswers = [
  "가넷은 한 가지 빨간 보석이 아니라 화학 조성이 다른 여러 광물 종으로 이루어진 그룹입니다.",
  "대표 종은 파이로프·알만다인·스페사르틴·그로슐러·안드라다이트이며, 빨강·주황·녹색 등으로 나타납니다.",
  "로돌라이트·차보라이트·데만토이드는 품질 등급이 아니라 특정 종 또는 혼합 조성에서 쓰이는 변종명입니다."
]

const sections = [
  {
    "title": "가넷은 하나의 광물이 아니라 보석 그룹입니다",
    "paragraphs": [
      "같은 기본 결정 구조를 공유하지만 화학 조성이 서로 다른 여러 광물 종을 묶어 가넷이라고 합니다. 조성 차이에 따라 같은 가넷도 빨강, 주황, 노랑, 녹색 등 다양한 색과 외관으로 나타날 수 있습니다.",
      "파이로프, 알만딘, 스페사르틴, 그로슐러, 안드라다이트는 보석으로 중요한 대표 종입니다. 다만 실제 가넷은 하나의 순수한 종으로만 이루어지기보다 두 가지 이상의 가넷 종 성분이 섞인 혼합 조성을 보이는 경우도 많습니다."
    ],
    "bullets": [
      "그룹: 서로 가까운 여러 가넷 광물 전체",
      "종: 화학 조성으로 구분하는 대표 광물",
      "변종: 특정 색과 외관을 설명하는 이름",
      "혼합 조성: 두 가지 이상의 가넷 종 성분이 섞인 경우"
    ]
  },
  {
    "title": "파이로프와 알만딘은 붉은 계열의 대표 종입니다",
    "paragraphs": [
      "빨강의 인상만으로 광물 종을 확정하기는 어렵습니다. 파이로프와 알만딘은 자주빛 빨강을 포함한 붉은 계열로 나타나는 경우가 많고, 두 종의 색 범위가 서로 겹칠 수 있기 때문입니다.",
      "판매 표기와 감별 정보를 함께 확인해야 합니다. 로돌라이트는 자주빛 계열의 파이로프와 알만딘 가넷으로 알려진 변종명이므로, 이 이름을 단일 종 이름이나 품질 순위로 해석하지 않는 것이 좋습니다."
    ],
    "bullets": [
      "파이로프: 빨강에서 자주빛 빨강 계열",
      "알만딘: 붉은 계열을 보이는 대표 가넷 종",
      "로돌라이트: 자주빛 계열의 파이로프·알만딘 가넷",
      "붉은 색만으로 종을 확정하지 않기"
    ],
    "image": {
      "src": "/Image/guide/garnet-types-guide-section-2.webp",
      "alt": "파이로프와 알만딘은 붉은 계열의 대표 종입니다 예시 이미지",
      "caption": "파이로프와 알만딘은 붉은 계열의 대표 종입니다에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "스페사르틴은 주황 계열, 헤소나이트는 그로슐러 변종입니다",
    "paragraphs": [
      "스페사르틴은 대표적으로 주황색 계열로 나타나는 가넷 종입니다. 주황빛은 노랑에 가까운 색부터 붉은빛이 섞인 색까지 범위가 있을 수 있기 때문에 실제 색상과 투명도를 함께 살펴야 합니다.",
      "주황빛 적색 그로슐러로 알려진 변종은 헤소나이트입니다. 주황색 가넷이라는 이유만으로 스페사르틴과 헤소나이트를 같은 종으로 보아서는 안 됩니다. 상업적인 색상 표현은 광물 종이나 공통 품질 등급을 뜻하지 않을 수 있다는 점도 고려해야 합니다."
    ],
    "bullets": [
      "스페사르틴: 주황색 계열의 대표 종",
      "헤소나이트: 주황빛 적색 그로슐러 변종",
      "주황색만으로 종을 확정하지 않기",
      "판매명과 종 표기, 감별 정보를 함께 확인하기"
    ]
  },
  {
    "title": "차보라이트와 데만토이드는 종이 다른 녹색 가넷입니다",
    "paragraphs": [
      "녹색 가넷인 차보라이트와 데만토이드는 각각 녹색 그로슐러와 녹색 안드라다이트입니다. 둘 다 녹색이지만, 기반이 되는 광물 종은 서로 다릅니다.",
      "색만으로 이름을 정하기에는 녹색 계열에서도 색 범위와 외관이 겹칠 수 있으므로 주의하는 것이 좋습니다. 구매를 검토한다면 판매자가 표시한 종과 변종, 감별 자료의 내용을 서로 대조하는 것이 좋습니다."
    ],
    "bullets": [
      "차보라이트: 녹색 그로슐러 가넷",
      "데만토이드: 녹색 안드라다이트 가넷",
      "녹색이라는 공통점만으로 같은 종류라고 보지 않기",
      "종과 변종 표기를 감별 정보와 함께 확인하기"
    ],
    "image": {
      "src": "/Image/guide/garnet-types-guide-section-4.webp",
      "alt": "차보라이트와 데만토이드는 종이 다른 녹색 가넷입니다 예시 이미지",
      "caption": "차보라이트와 데만토이드는 종이 다른 녹색 가넷입니다에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "다섯 주요 종을 색과 이름으로 정리하세요",
    "paragraphs": [
      "가넷 종류를 정리할 때 대표 색을 출발점으로 삼으면 쉽게 살펴볼 수 있지만, 색 범위가 서로 겹친다는 점은 기억해야 합니다. 파이로프와 알만딘은 붉은 계열로, 스페사르틴은 주황 계열로 나타날 수 있습니다. 그로슐러는 무색부터 노랑·주황·녹색까지, 안드라다이트는 노랑부터 녹색까지 나타날 수 있습니다.",
      "대표적인 녹색 가넷 종류인 우바로바이트는 일반적으로 결정이 작습니다. 그래서 투명하게 연마한 보석으로는 드문 편입니다. 제품 설명에 종과 변종, 상업명이 함께 쓰였다면 각 이름이 어떤 기준으로 사용됐는지 확인해야 합니다."
    ],
    "bullets": [
      "파이로프: 빨강·자주빛 빨강",
      "알만딘: 붉은 계열",
      "스페사르틴: 주황 계열",
      "그로슐러: 무색·노랑·주황·녹색",
      "안드라다이트: 노랑·녹색 계열",
      "우바로바이트: 녹색 가넷 종이며 투명 연마 보석으로는 드문 편"
    ]
  },
  {
    "title": "종류를 확인한 뒤 색·투명도·컷·크기를 비교하세요",
    "paragraphs": [
      "가넷은 같은 종류 안에서 색, 투명도, 컷과 크기를 비교하기 전에 종류를 먼저 확인하는 편이 이해하기 쉽습니다. 색을 살필 때는 색상만 보지 말고 명도와 채도도 함께 확인해야 합니다. 정면에서 보이는 밝기와 균일성도 같이 살펴야 합니다.",
      "정면의 밝기와 색 분포는 컷에 따라 달라질 수 있습니다. 사진은 조명과 촬영 설정의 영향을 받아 색이 다르게 보일 수 있습니다. 가능하다면 같은 조명에서 비교해야 합니다. 컷 형태의 차이는 다이아몬드 컷 종류 가이드에서도 함께 비교할 수 있습니다."
    ],
    "bullets": [
      "색: 색상·명도·채도와 균일성 비교",
      "투명도: 내포물의 정도와 위치 확인",
      "컷: 정면 밝기와 빛의 분포 점검",
      "크기: 캐럿과 실제 치수를 별도로 확인",
      "감별: 판매명과 실제 광물 종 표기 대조"
    ]
  }
]

const cautions = [
  "가넷의 종·변종·상업명을 품질 순위로 해석하지 말고 같은 종류 안에서 실제 품질 요소를 비교하세요.",
  "A·AA·AAA 표기는 판매처별 기준이 다를 수 있으므로 서로 다른 판매처의 표현을 일대일로 비교하지 마세요.",
  "사진의 노출과 화이트밸런스는 빨강·주황·녹색의 명도와 채도를 바꿀 수 있습니다.",
  "색만으로 광물 종을 확정하지 말고 판매 표기와 감별 정보를 함께 확인하세요."
]

const relatedLinks = [
  {
    "to": "/guide/opal-types-guide",
    "label": "오팔 종류별 차이: 검은 오팔·흰 오팔·볼더·파이어 오팔 구분",
    "description": "오팔의 유형을 바탕색과 구조, 투명도 기준으로 비교하는 가이드입니다."
  },
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "다이아몬드 컷 종류, 라운드·오벌·쿠션·페어·에메랄드 비교",
    "description": "컷 형태와 정면에서 보이는 빛의 차이를 비교하는 가이드입니다."
  },
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 종류, 스터드·드롭·후프·클립형 차이",
    "description": "가넷을 세팅한 주얼리 형태를 고를 때 참고할 수 있는 귀걸이 유형 가이드입니다."
  }
]

const updatedAt = '2026-08-29'
// guide-manager:data:start
const gmArticleTitle = '가넷 종류 5가지와 색별 구분법｜빨강·주황·녹색 가넷 차이'
const gmArticleLead = '대표 종과 변종의 차이, 색만으로 종류를 단정하기 어려운 이유, 실물 비교 기준을 정리했습니다. 가넷은 빨간 보석 한 종류가 아니라 여러 광물 종의 그룹이며, 빨강·주황·녹색으로 나타납니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '가넷 종류'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '가넷 종류와 품질 비교'
const gmHeroAlt = '빨강, 자주, 주황, 노랑, 녹색의 다양한 가넷을 정면에서 비교하는 실제 귀금속 사진'
const gmSourceNote = '가넷의 광물군과 대표 종, 변종 및 색상 경향은 Gemological Institute of America의 공식 교육 자료를 바탕으로 정리했습니다. 가격, 재고, 처리 여부와 개별 보석의 감별 결과는 이 가이드에서 판단할 수 없습니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, Garnet Description",
    "url": "https://www.gia.edu/gems-gemology/garnet-description",
    "note": "가넷의 광물군, 주요 종, 보석 변종과 혼합 조성에 관한 공식 교육 자료입니다."
  },
  {
    "label": "Gemological Institute of America, Garnet Quality Factors",
    "url": "https://www.gia.edu/garnet-quality-factor",
    "note": "가넷 종별 대표 색상과 로돌라이트의 분류, 품질 비교 요소를 설명하는 공식 자료입니다."
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
    { property: 'og:locale', content: 'ko_KR' },
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
        { name: '가넷 종류', path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
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
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
