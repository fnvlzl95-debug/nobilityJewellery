<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/diamond-cut-shapes-guide'
const pageTitle = '다이아몬드 컷 종류, 라운드·오벌·쿠션·페어·에메랄드 비교 | 귀족'
const pageDescription = '다이아몬드 컷 종류를 라운드, 오벌, 쿠션, 페어, 에메랄드, 프린세스, 마퀴즈로 비교하고 모양·비율·컷 등급 선택 기준을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/diamond-cut-shapes-hero.webp`
const publishedAt = '2026-07-12'

const faqItems = [
  {
    "question": "다이아몬드 컷과 모양은 같은 뜻인가요?",
    "answer": "일상적으로 라운드 컷, 오벌 컷처럼 함께 쓰지만 엄밀히는 다릅니다. 셰이프는 위에서 본 외곽 형태이고, 컷은 패싯 배열과 비율을 포함한 설계 및 연마와 관련된 개념입니다."
  },
  {
    "question": "가장 기본적인 다이아몬드 컷 종류는 무엇인가요?",
    "answer": "라운드 브릴리언트가 대표적인 브릴리언트 컷입니다. 표준 라운드 브릴리언트는 일반적으로 57개 또는 58개의 패싯을 가지며, GIA의 공식 컷 등급 체계가 적용되는 형태입니다."
  },
  {
    "question": "오벌 다이아몬드의 보타이 현상은 불량인가요?",
    "answer": "보타이는 오벌·페어·마퀴즈에서 나타날 수 있는 시각적 현상입니다. 어느 정도를 일률적으로 불량이라고 단정하기보다 중앙의 어두운 영역과 좌우 균형을 사진, 회전 영상, 실물로 확인하는 편이 좋습니다."
  },
  {
    "question": "같은 1캐럿이면 보이는 크기도 같은가요?",
    "answer": "캐럿은 무게 단위이므로 형태와 깊이, 가로·세로 실측에 따라 정면에서 보이는 크기가 달라질 수 있습니다. 감정서의 가로·세로·깊이와 실제 착용 모습을 함께 비교하세요."
  },
  {
    "question": "GIA 감정서에는 모든 모양의 컷 등급이 나오나요?",
    "answer": "GIA 리포트의 컷 등급 표기 대상은 리포트 유형과 스톤 형태에 따라 확인해야 합니다. GIA의 공식 설명에서 표준 라운드 브릴리언트에는 컷 등급 체계가 적용된다고 안내하며, 팬시 셰이프는 폴리시·대칭·실측 비율과 실제 관찰을 함께 비교하는 것이 좋습니다."
  }
]

const quickAnswers = [
  "라운드·오벌·쿠션·페어·에메랄드 같은 이름은 주로 위에서 본 외곽 형태인 셰이프를 가리키며, 컷 품질과는 구분해 봐야 합니다.",
  "같은 캐럿이라도 무게 분포와 가로·세로 실측이 달라 정면에서 보이는 크기와 길이감이 달라질 수 있습니다.",
  "오벌·페어·마퀴즈는 보타이와 좌우 대칭을, 뾰족한 끝이나 사각 모서리가 있는 셰이프는 보호 세팅을 함께 확인합니다."
]

const sections = [
  {
    "title": "다이아몬드 컷 종류, 모양과 등급부터 구분하세요",
    "paragraphs": [
      "위에서 보았을 때 나타나는 외곽선이 다이아몬드의 형태인 셰이프입니다. 반면 컷은 패싯의 배열과 비율을 포함해 설계 및 연마와 관련된 개념이므로, 셰이프와 같은 뜻으로 보기는 어렵습니다.",
      "작은 삼각형과 마름모꼴 패싯을 중심으로 빛의 반사와 분산을 강조하는 방식이 브릴리언트 스타일입니다. 스텝 컷은 계단처럼 배열된 비교적 큰 사각형 또는 사다리꼴 패싯이 특징이며, 두 스타일을 함께 사용하는 방식은 믹스드 컷입니다."
    ],
    "bullets": [
      "셰이프: 라운드, 오벌, 쿠션처럼 위에서 본 외곽 형태",
      "커팅 스타일: 브릴리언트, 스텝, 믹스드처럼 패싯을 배열한 방식",
      "컷 품질: 비율, 대칭, 연마가 빛의 표현에 미치는 결과",
      "세팅: 선택한 모양을 금속 발이나 테두리로 고정하는 구조"
    ]
  },
  {
    "title": "라운드 브릴리언트: 균형 잡힌 기본 형태",
    "paragraphs": [
      "대표적인 브릴리언트 컷에 해당하는 것이 라운드 브릴리언트이며, 표준 라운드 브릴리언트는 일반적으로 57개 또는 58개의 패싯을 가집니다. 원형 외곽과 패싯 배열을 기준으로 밝기와 반짝임을 비교할 때 자주 활용됩니다.",
      "GIA의 공식 다이아몬드 컷 등급 체계는 표준 라운드 브릴리언트 다이아몬드에 적용됩니다. 같은 컷 등급 안에서도 실제 관찰 인상이 달라질 수 있으므로, 폴리시와 대칭, 실측을 함께 확인하며 제품을 비교하는 편이 좋습니다."
    ],
    "bullets": [
      "확인 항목: 컷 등급, 폴리시, 대칭, 실측 지름",
      "라운드 브릴리언트의 패싯 수와 등급 적용 범위를 구분해 확인",
      "같은 등급 안에서도 밝기와 반짝임에 대한 선호가 다를 수 있음"
    ],
    "image": {
      "src": "/Image/guide/diamond-cut-shapes-guide-section-2.webp",
      "alt": "라운드 브릴리언트: 균형 잡힌 기본 형태 예시 이미지",
      "caption": "라운드 브릴리언트: 균형 잡힌 기본 형태에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "오벌·페어·마퀴즈: 길어 보이는 팬시 셰이프",
    "paragraphs": [
      "둥근 모서리를 유지한 채 세로로 길어진 형태가 오벌입니다. 한쪽은 둥글고 반대쪽은 뾰족한 물방울 모양이 페어이며, 양끝이 뾰족해 길고 날렵한 윤곽이 두드러지는 형태는 마퀴즈입니다.",
      "오벌·페어·마퀴즈에서는 중앙이 나비넥타이처럼 어둡게 보이는 보타이가 나타날 수 있습니다. 보타이를 일률적으로 불량으로 단정하기보다, 정면 사진과 회전 영상에서 어두운 영역의 범위와 좌우 균형을 살펴보는 것이 좋습니다."
    ],
    "bullets": [
      "오벌: 부드러운 긴 타원과 길이 대비 폭 확인",
      "페어: 둥근 끝과 뾰족한 끝의 대칭 및 착용 방향 확인",
      "마퀴즈: 양끝 보호와 좌우 대칭 확인",
      "공통 확인: 보타이, 세로 중심선, 뾰족한 끝의 세팅 보호"
    ]
  },
  {
    "title": "쿠션·프린세스: 부드러운 사각과 선명한 사각",
    "paragraphs": [
      "사각형 또는 직사각형 외곽에 둥근 모서리를 더한 형태가 쿠션 셰이프입니다. 보이는 인상은 정사각에 가까운지, 길쭉한지, 패싯 배열이 어떤지에 따라 달라질 수 있습니다.",
      "정면에서 사각형으로 보이는 프린세스 셰이프는 브릴리언트 스타일의 패싯 배열을 사용하는 대표 예입니다. 네 모서리가 뾰족하기 때문에 세팅이 모서리를 감싸는 구조인지 확인해야 합니다."
    ],
    "bullets": [
      "쿠션: 둥근 모서리와 정사각 또는 직사각 비율 비교",
      "프린세스: 선명한 사각 외곽과 네 모서리 보호 확인",
      "두 형태 모두 실제 가로·세로 치수와 밴드 폭의 균형 확인"
    ],
    "image": {
      "src": "/Image/guide/diamond-cut-shapes-guide-section-4.webp",
      "alt": "쿠션·프린세스: 부드러운 사각과 선명한 사각 예시 이미지",
      "caption": "쿠션·프린세스: 부드러운 사각과 선명한 사각에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "에메랄드·아셔: 계단형 빛을 보는 스텝 컷",
    "paragraphs": [
      "모서리를 잘라낸 직사각형 외곽과 계단형 패싯이 특징인 스텝 컷의 대표 예가 에메랄드 컷입니다. 정사각형에 가까운 외곽을 가진 아셔 컷은 스텝 컷으로 분류됩니다.",
      "넓은 패싯이 보이는 스텝 컷은 비교적 차분하고 정돈된 빛의 인상을 줄 수 있습니다. 테이블 면이 넓은 형태라면 내포물의 위치와 육안 가시성을 실제로 확인하는 것이 좋습니다."
    ],
    "bullets": [
      "에메랄드: 길쭉한 직사각형 외곽과 계단형 패싯",
      "아셔: 정사각형에 가까운 외곽과 중심 대칭 패턴",
      "확인 항목: 테이블 아래 내포물, 계단 폭, 모서리 보호"
    ]
  },
  {
    "title": "캐럿보다 실측과 비율을 함께 비교하세요",
    "paragraphs": [
      "캐럿은 무게를 나타내는 단위입니다. 정면에서 느껴지는 크기는 같은 캐럿이라도 가로·세로·깊이 실측과 형태에 따라 달라질 수 있습니다. 따라서 감정서의 실측도 함께 비교하는 것이 필요합니다.",
      "팬시 셰이프의 길이 대비 폭에는 모든 제품에 공통으로 적용되는 하나의 정답이 없습니다. 손 모양과 디자인 취향을 고려해 비율을 정한 뒤, 좌우 대칭과 보타이, 밝기 분포를 각각 확인해야 합니다. 세팅 후의 모습도 함께 살펴보는 것이 좋습니다."
    ],
    "bullets": [
      "감정서 실측: 가로 × 세로 × 깊이 확인",
      "길이 대비 폭: 길고 날씬한 인상과 넓은 인상 중 취향 결정",
      "정면 검사: 좌우 대칭, 보타이, 어두운 영역과 밝은 영역 확인",
      "세팅 계획: 뾰족한 끝과 모서리를 보호할 발 위치 확인",
      "착용 비교: 같은 캐럿의 다른 셰이프를 손 위에서 비교"
    ]
  },
  {
    "title": "GIA 감정서와 출처 확인 기준",
    "paragraphs": [
      "전체 컷 등급의 표기 대상은 GIA 리포트 유형과 스톤 형태에 따라 확인해야 합니다. GIA의 공식 설명에서는 컷 등급 체계가 표준 라운드 브릴리언트에 적용된다고 안내합니다.",
      "팬시 셰이프는 폴리시·대칭·실측 비율을 실제 관찰 결과와 함께 비교해야 합니다. 감정서 해석은 리포트 유형에 따라 달라질 수 있으므로, 문서에 표시된 항목을 원문 기준으로 확인하는 것이 안전합니다."
    ],
    "bullets": [
      "형태와 컷의 차이: GIA 다이아몬드 컷 설명 확인",
      "브릴리언트·스텝·믹스드 컷 정의 확인",
      "래디언트 컷은 브릴리언트와 스텝 요소가 결합된 예로 확인",
      "리포트 유형과 셰이프별 항목을 개별적으로 확인"
    ]
  }
]

const cautions = [
  "다이아몬드 셰이프의 길이 대비 폭은 취향 요소가 커서 특정 비율을 모든 제품의 정답으로 볼 수 없습니다.",
  "오벌·페어·마퀴즈의 보타이와 팬시 셰이프의 밝기는 정지 사진 한 장보다 여러 조명과 회전 영상에서 확인하는 편이 좋습니다.",
  "뾰족한 끝과 사각 모서리는 충격에 노출될 수 있으므로 모양 선택과 함께 보호 세팅을 검토해야 합니다.",
  "가격, 제작 기간, 재고, 등급, 인증 가능 여부는 개별 제품과 상담 시점에 따라 달라질 수 있으므로 이 글에서 단정하지 않습니다."
]

const relatedLinks = [
  {
    "to": "/guide/diamond-cut-grades",
    "label": "다이아몬드 컷 등급, Excellent·Very Good·Good 차이",
    "description": "GIA 라운드 브릴리언트 컷 등급과 밝기·파이어·신틸레이션 비교 기준을 정리했습니다."
  },
  {
    "to": "/guide/diamond-color-grades",
    "label": "다이아몬드 컬러 등급 뜻, D부터 Z까지",
    "description": "다이아몬드 컬러 등급과 감정서에서 색 범위를 확인하는 기준을 안내합니다."
  },
  {
    "to": "/guide/opal-types-guide",
    "label": "오팔 종류별 차이, 블랙·화이트·볼더·파이어 오팔 구분",
    "description": "보석의 외곽 형태와 종류를 비교해 선택할 때 참고할 수 있는 유형 구분 가이드입니다."
  }
]

const updatedAt = '2026-08-29'
// guide-manager:data:start
const gmArticleTitle = '다이아몬드 컷 종류, 라운드·오벌·쿠션·페어·에메랄드 비교'
const gmArticleLead = '다이아몬드 컷 종류가 라운드, 오벌, 쿠션처럼 보이는 모양만을 가리키는 것은 아닙니다. 캐럿이 같더라도 외곽 형태와 비율, 패싯 배열에 따라 정면 크기와 반짝임이 달라질 수 있으므로 셰이프와 컷 품질을 나누어 비교해야 합니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '다이아몬드 컷 종류'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '다이아몬드 컷 모양 상담'
const gmHeroAlt = '라운드 오벌 쿠션 페어 에메랄드 프린세스 마퀴즈 다이아몬드 컷 종류 비교'
const gmSourceNote = '다이아몬드 형태와 컷 스타일, 표준 라운드 브릴리언트의 컷 등급 적용 범위는 아래 Gemological Institute of America 자료를 확인해 작성했습니다. 감정서 항목의 해석은 리포트 유형과 스톤 형태에 따라 달라질 수 있으므로 원문과 개별 리포트를 함께 확인하세요. 확인일: 2026-07-12.'
const gmSources = [
  {
    "label": "Gemological Institute of America, Diamond Cut",
    "url": "https://4cs.gia.edu/en-us/diamond-cut/",
    "note": "다이아몬드의 형태와 컷의 차이, 라운드 브릴리언트의 패싯 수, GIA 컷 등급 적용 범위를 설명합니다."
  },
  {
    "label": "Gemological Institute of America, Guide to Diamond Engagement Ring Shapes",
    "url": "https://4cs.gia.edu/en-us/blog/guide-diamond-shapes-engagement-rings/",
    "note": "브릴리언트 컷과 스텝 컷의 대표 예시 및 형태와 컷 스타일의 구분을 설명합니다."
  },
  {
    "label": "Gemological Institute of America, Gem Cutting Styles—Definitions",
    "url": "https://www.gia.edu/UK-EN/gia-news-research-value-factors-gem-cutting-styles-definitions",
    "note": "브릴리언트 스타일, 스텝 컷 스타일, 믹스드 컷 스타일의 정의를 제공합니다."
  },
  {
    "label": "Gemological Institute of America, How to Select a Radiant Cut Diamond",
    "url": "https://4cs.gia.edu/en-us/blog/select-radiant-cut-diamond-2/",
    "note": "래디언트 컷의 외곽선과 브릴리언트·스텝 요소가 결합된 컷 구조를 설명합니다."
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
        { name: '다이아몬드 컷 종류', path: pagePath },
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
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
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
