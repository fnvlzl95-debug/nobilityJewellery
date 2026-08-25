<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/opal-types-guide'
const pageTitle = '오팔 종류별 차이: 블랙·화이트·볼더·파이어 오팔 구분 | 귀족'
const pageDescription = '오팔은 블랙·화이트·볼더·크리스털·파이어로 구분하지만 종류명만으로 품질이 정해지지는 않습니다. 바탕색·투명도·모암 구조·유색 효과를 비교하는 순서를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/opal-types-hero.webp`
const publishedAt = '2026-07-23'

const faqItems = [
  {
    "question": "블랙 오팔은 보석 전체가 검은색인가요?",
    "answer": "블랙 오팔은 검정 또는 짙은 바탕에서 유색 효과가 나타나는 유형을 가리킵니다. 표면 전체가 단색 검정으로만 보인다는 뜻은 아니며, 바탕색과 유색 효과는 별도로 확인하는 것이 좋습니다."
  },
  {
    "question": "볼더 오팔과 이중석·삼중석은 어떻게 확인하나요?",
    "answer": "볼더 오팔은 자연 모암을 포함할 수 있지만, 사진이나 뒷면 색만으로 구조를 확정할 수는 없습니다. 옆면의 층과 접착 경계를 살피고, 판매 정보 및 감별 문서에 적힌 조립석 여부를 함께 확인하세요."
  },
  {
    "question": "파이어 오팔은 모두 유색 효과가 있나요?",
    "answer": "파이어 오팔은 따뜻한 노랑·주황·빨강 계열 바탕색과 관련된 유형입니다. 바탕색과 유색 효과는 다른 관찰 항목이므로, 제품별로 유색 효과의 존재 여부와 보이는 범위를 따로 확인해야 합니다."
  },
  {
    "question": "사진만으로 천연 오팔과 합성·처리 오팔을 구분할 수 있나요?",
    "answer": "사진은 외관을 비교하는 데 참고가 될 수 있지만 천연 여부, 합성 여부, 처리 여부, 조립석 여부를 확정하기에는 한계가 있습니다. 중요한 구매 전에는 제품 설명 또는 감별 문서의 기재 내용을 확인하세요."
  }
]

const quickAnswers = [
  "블랙·화이트 오팔은 주로 바탕색, 크리스털 오팔은 투명도, 볼더 오팔은 자연 모암이 남은 구조, 파이어 오팔은 따뜻한 바탕색으로 구분합니다.",
  "오팔 종류는 품질 순위가 아닙니다. 유색 효과의 밝기·범위·패턴, 투명도, 표면 상태, 컷, 천연·합성·처리 정보를 따로 확인해야 합니다.",
  "볼더 오팔은 자연 모암을 포함할 수 있으므로, 검은 뒷면만으로 볼더 오팔이라 단정하지 말고 옆면의 층과 감별 정보를 확인하세요. 구매 전에는 종류명보다 유색 효과·균열·컷과 천연·합성·처리·조립석 표기를 함께 보세요."
]

const sections = [
  {
    "title": "오팔 종류와 품질 등급은 같은 말이 아닙니다",
    "paragraphs": [
      "오팔의 유형명은 외관과 구조를 설명하는 분류이며, 하나의 품질 순위표는 아닙니다. GIA는 블랙, 화이트 또는 라이트, 파이어, 볼더, 크리스털 또는 워터 오팔 등을 소개하며, 각 이름은 바탕색·투명도·모암을 포함한 구조처럼 서로 다른 특징과 관련됩니다.",
      "실물 비교에서는 먼저 유형을 파악한 다음 유색 효과의 밝기와 보이는 범위, 무늬, 바탕색, 투명도, 표면 상태, 컷을 나누어 살펴보는 편이 좋습니다. GIA는 오팔을 볼 때 바탕색, 유색 효과, 무늬, 투명도 등 여러 외관 요소를 함께 관찰하도록 안내합니다. 출처: GIA Opal Quality Factors.",
      "색과 계열에 따른 보석 분류를 더 비교하려면 가넷 종류 가이드도 함께 확인해 보세요."
    ],
    "bullets": [
      "유형: 블랙·화이트·볼더·크리스털·파이어 등 외관과 구조를 설명하는 이름",
      "바탕색: 흰색·밝은색·검정·짙은색·노랑·주황·빨강처럼 몸체에서 보이는 기본 색",
      "투명도: 빛이 돌 안쪽을 통과하는 정도",
      "유색 효과: 관찰 각도에 따라 색이 달라져 보이는 현상의 밝기·범위·무늬"
    ]
  },
  {
    "title": "화이트와 블랙 오팔은 바탕색 대비가 다릅니다",
    "paragraphs": [
      "화이트 또는 라이트 오팔은 흰색이나 밝은 계열의 바탕에서 유색 효과가 보이는 유형입니다. 밝은 바탕과 유색 효과의 조합은 돌마다 다르게 보일 수 있으므로, 유형명만으로 유색 효과의 강도를 판단하기보다 실제로 보이는 색과 범위를 따로 확인하세요.",
      "블랙 오팔은 검정 또는 짙은 바탕에서 유색 효과가 나타나는 유형입니다. 어두운 바탕은 색 대비에 영향을 줄 수 있지만, 바탕색이 짙다는 점만으로 유색 효과의 밝기나 무늬가 정해지는 것은 아닙니다. 같은 조명과 배경에서 돌을 기울여 비교하는 방법이 도움이 됩니다."
    ],
    "bullets": [
      "화이트 오팔: 흰색 또는 밝은 바탕과 유색 효과",
      "블랙 오팔: 검정 또는 짙은 바탕과 유색 효과",
      "비교 항목: 유색 효과가 보이는 면적, 밝기, 색 범위와 무늬",
      "사진 확인 시: 촬영 조명과 배경색이 대비를 다르게 보이게 할 수 있음"
    ]
  },
  {
    "title": "볼더 오팔은 자연 모암이 완성석에 남습니다",
    "paragraphs": [
      "볼더 오팔은 오팔층이 형성된 모암을 함께 포함한 형태로 소개됩니다. 완성석의 뒷면이나 옆면에 모암이 남을 수 있어, 오팔층과 모암의 연결 방식은 제품마다 다르게 보일 수 있습니다.",
      "다만 검은색 또는 짙은색 뒷면만으로 볼더 오팔이라고 확정할 수는 없습니다. GIA 구매 가이드는 조립석 여부와 처리 정보를 판매 정보 및 문서로 확인할 필요가 있다고 안내합니다. 볼더 오팔로 표시된 제품은 옆면의 층, 접착 경계의 유무, 제품 설명 또는 감별 문서를 함께 대조하세요. 출처: GIA Opal Buyer Guide."
    ],
    "bullets": [
      "볼더 오팔: 자연 모암과 오팔층을 함께 포함할 수 있는 구조",
      "확인할 부분: 옆면의 층과 오팔층·모암의 경계",
      "조립석 확인: 이중석·삼중석 여부를 제품 설명 또는 감별 문서로 대조",
      "주의: 사진 한 장이나 뒷면 색만으로 구조를 확정하지 않기"
    ]
  },
  {
    "title": "크리스털 오팔은 투명도가 분류 기준입니다",
    "paragraphs": [
      "크리스털 오팔은 투명하거나 반투명한 바탕을 보이는 유형으로 알려져 있습니다. 이 이름은 투명한 외관을 설명하는 것이며, 유색 효과의 유무나 밝기와는 별도로 관찰해야 합니다.",
      "투명도는 배경과 조명에 따라 인상이 달라질 수 있습니다. 흰 배경과 어두운 배경에서 각각 살펴보고, 돌을 천천히 기울여 유색 효과가 어느 범위와 각도에서 보이는지 비교해 보세요."
    ],
    "bullets": [
      "크리스털 오팔: 투명 또는 반투명한 바탕을 보이는 유형",
      "비교 기준: 바탕의 투명도와 유색 효과의 밝기를 분리해 보기",
      "관찰 방법: 서로 다른 배경에서도 바탕과 유색 효과 확인",
      "제품 확인: 사진뿐 아니라 실물 관찰 조건과 설명을 함께 확인"
    ]
  },
  {
    "title": "파이어 오팔은 따뜻한 바탕색으로 구분합니다",
    "paragraphs": [
      "파이어 오팔은 노랑·주황·빨강 계열처럼 따뜻한 바탕색과 관련된 유형입니다. 바탕색의 선명함과 유색 효과는 같은 항목이 아니므로, 주황색 또는 빨강색이 뚜렷한지와 색 변화가 보이는지를 구분해 기록하는 것이 좋습니다.",
      "제품이 패싯 형태로 연마되었거나 캐보션 형태로 연마되었는지도 외관에 영향을 줄 수 있습니다. 정면에서 보이는 색뿐 아니라 표면 상태, 광택, 가장자리의 상태와 실제 치수를 함께 확인하세요."
    ],
    "bullets": [
      "바탕색: 노랑·주황·빨강 계열을 중심으로 확인",
      "유색 효과: 존재 여부, 밝기, 보이는 범위를 별도 확인",
      "컷: 캐보션 또는 패싯 형태와 대칭·광택 확인",
      "사진 비교: 정면 사진 외의 각도와 제품 설명 함께 확인"
    ]
  },
  {
    "title": "같은 조명에서 다섯 단계로 비교하세요",
    "paragraphs": [
      "오팔을 비교할 때는 서로 다른 요소를 한 번에 판단하지 않는 편이 좋습니다. GIA의 오팔 품질 자료는 바탕색, 유색 효과, 무늬, 투명도 등 여러 요소를 함께 관찰하는 기준을 제시합니다. 출처: GIA Opal Quality Factors.",
      "먼저 유형을 확인한 뒤, 유색 효과의 밝기·범위·무늬와 바탕색을 살펴보세요. 이어서 투명도와 표면 상태, 균열 여부를 확인하고 마지막으로 컷, 대칭, 광택, 치수 및 제품 설명을 대조합니다. 컷 형태의 차이는 다이아몬드 컷 종류 가이드에서 비교할 수 있습니다.",
      "천연 여부, 합성 여부, 처리 여부와 이중석·삼중석 같은 조립석 여부는 이름이나 사진만으로 확정하지 않습니다. 제품 설명 또는 감별 문서를 확인하고, 문서의 기재 내용이 실물 및 판매 정보와 일치하는지 살펴보세요."
    ],
    "bullets": [
      "유형 확인: 바탕색·투명도·모암 구조를 바탕으로 유형 파악",
      "유색 효과 비교: 밝기, 보이는 면적, 주요 색과 무늬 확인",
      "투명도 확인: 맑음·반투명·불투명한 정도를 구분",
      "표면 상태 확인: 균열, 흠집, 가장자리와 구조의 상태 점검",
      "컷과 정보 대조: 형태·광택·치수와 천연·합성·처리·조립석 표기 확인"
    ]
  }
]

const cautions = [
  "블랙·화이트·볼더·파이어 같은 종류 이름을 품질이나 가격의 단일 순위로 해석하지 마세요.",
  "천연·합성·처리·이중석·삼중석 여부는 사진이나 이름만으로 확정하지 말고 제품 설명 또는 감별 문서를 확인하세요.",
  "검은 뒷면만 보고 볼더 오팔로 단정하지 말고 옆면의 층, 모암 구조, 접착 경계와 판매 정보를 함께 살펴보세요."
]

const relatedLinks = [
  {
    "to": "/guide/garnet-types-guide",
    "label": "가넷 종류, 파이로프·알만다인·스페사르틴·그로슐러·안드라다이트 차이",
    "description": "보석의 유형명과 색·투명도·컷을 나누어 비교하는 기준을 가넷 사례로 살펴봅니다."
  },
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "다이아몬드 컷 종류, 라운드·오벌·쿠션·페어·에메랄드 비교",
    "description": "오팔의 컷·대칭·광택을 확인한 뒤 주요 컷 형태의 차이를 비교해 보세요."
  },
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 종류, 스터드·드롭·후프·클립형 차이",
    "description": "오팔을 세팅한 주얼리의 착용 형태와 잠금 구조를 함께 살펴볼 수 있습니다."
  }
]

const updatedAt = '2026-08-25'
// guide-manager:data:start
const gmArticleTitle = '오팔 종류별 차이: 블랙·화이트·볼더·파이어 오팔 구분'
const gmArticleLead = '오팔은 바탕색과 투명도, 자연 모암이 남은 구조, 유색 효과에 따라 여러 유형으로 나뉩니다. 블랙·화이트·볼더·크리스털·파이어 오팔의 구분 기준과 제품 설명·감별 정보를 확인하는 방법을 살펴보세요.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '오팔 종류'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '오팔 종류와 품질 비교'
const gmHeroAlt = '화이트, 블랙, 볼더, 크리스털, 파이어 오팔을 같은 조명 아래 나란히 놓고 바탕색과 유색 효과를 비교한 모습'
const gmSourceNote = '오팔의 외관 관찰 기준과 판매 정보·문서 확인 원칙은 아래 GIA 자료를 바탕으로 정리했습니다. 제품별 천연·합성·처리·조립석 여부는 개별 제품 설명 또는 감별 문서로 확인해야 합니다.'
const gmSources = [
  {
    "label": "GIA Opal Quality Factors",
    "url": "https://www.gia.edu/articles/opal-quality-factor",
    "note": "오팔의 바탕색·유색 효과·무늬·투명도 등 품질 관찰 기준을 설명합니다."
  },
  {
    "label": "GIA Opal Buyer Guide",
    "url": "https://www.gia.edu/gia-website/opal/buyers-guide",
    "note": "오팔 종류와 외관을 비교하고 처리·조립석 여부를 확인해야 함을 안내합니다."
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
        { name: '오팔 종류', path: pagePath },
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
