<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/opal-types-guide'
const pageTitle = '오팔 종류, 블랙·화이트·볼더·파이어 오팔 차이 | 귀족'
const pageDescription = '오팔 종류를 블랙·화이트·볼더·크리스털·파이어 오팔로 나누고 바탕색, 투명도, 유색 효과와 품질 비교 순서를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/opal-types-hero.webp`
const publishedAt = '2026-07-23'

const faqItems = [
  {
    question: '가장 비싼 오팔 종류는 블랙 오팔인가요?',
    answer: '다른 품질 요소가 같다면 어두운 바탕에서 유색 효과가 선명한 블랙 오팔을 선호하는 시장이 많지만, 종류 이름만으로 가격이 정해지지는 않습니다. 유색 효과의 밝기와 색 범위, 패턴, 보이는 각도, 투명도, 균열, 컷과 크기를 함께 비교해야 합니다.',
  },
  {
    question: '블랙 오팔은 보석 전체가 검은색인가요?',
    answer: '검정 또는 짙은 바탕색 위에 유색 효과가 나타나는 오팔을 가리킵니다. 표면 전체가 단색의 검정으로만 보인다는 뜻이 아니며, 짙은 배경과 여러 색의 섬광이 만드는 대비가 특징입니다.',
  },
  {
    question: '볼더 오팔 뒤의 갈색 돌은 제거해야 하나요?',
    answer: '볼더 오팔은 얇은 오팔층이 모암 안에 형성되어 갈색 철광석 계열 모암을 붙인 채 연마하는 것이 특징입니다. 이 자연 모암은 볼더 오팔의 일부이므로, 접착한 이중석의 뒷판과 혼동하지 않도록 옆면과 감별 정보를 확인하세요.',
  },
  {
    question: '파이어 오팔은 모두 무지개색이 보이나요?',
    answer: '아닙니다. 파이어 오팔은 보통 노랑·주황·빨강 계열의 바탕색으로 구분하며 유색 효과가 있을 수도, 없을 수도 있습니다. 선명한 주황색 바탕과 무지개 유색 효과는 서로 다른 관찰 항목입니다.',
  },
  {
    question: '사진만으로 천연 오팔과 합성·모조 오팔을 구분할 수 있나요?',
    answer: '사진은 바탕색과 대략적인 패턴 비교에는 도움이 되지만 천연, 합성, 처리, 이중석·삼중석 여부를 확정하기 어렵습니다. 중요한 구매는 옆면과 뒷면 구조를 확인하고 신뢰할 수 있는 감별 보고서의 보석 정체와 처리 기재를 대조하세요.',
  },
]

const quickAnswers = [
  '오팔 종류는 바탕색, 투명도, 모암이 붙은 구조와 유색 효과의 존재를 나누어 보면 구분하기 쉽습니다.',
  '블랙·화이트는 주로 바탕색, 크리스털은 투명도, 볼더는 모암과 함께 연마한 구조, 파이어는 노랑·주황·빨강 계열 바탕색이 핵심입니다.',
  '종류가 곧 품질 등급은 아니므로 유색 효과의 밝기·범위·패턴과 투명도, 균열, 컷, 천연·합성 및 처리 정보를 별도로 확인해야 합니다.',
]

const sections = [
  {
    title: '오팔 종류와 품질 등급은 같은 말이 아닙니다',
    paragraphs: [
      '오팔 종류는 하나의 순위표가 아니라 외관과 구조를 설명하는 분류입니다. GIA는 주요 유형으로 블랙, 화이트 또는 라이트, 파이어, 볼더, 크리스털 또는 워터 오팔을 소개합니다. 이 이름들은 바탕색, 투명도, 모암이 붙은 상태 같은 서로 다른 특징을 기준으로 합니다.',
      '따라서 블랙 오팔이라는 이름만으로 모든 화이트 오팔보다 품질이 높다고 단정할 수 없습니다. 실제 비교에서는 먼저 유형을 확인한 뒤 유색 효과의 비율과 밝기, 색 범위와 패턴, 투명도, 내포물과 균열, 컷을 순서대로 살펴야 합니다.',
    ],
    bullets: [
      '바탕색: 흰색·밝은색·검정·짙은색·노랑·주황·빨강',
      '투명도: 투명에서 반투명, 불투명까지의 정도',
      '구조: 오팔 단일층인지 자연 모암과 함께 연마했는지',
      '유색 효과: 관찰 각도에 따라 색이 변해 보이는 범위와 밝기',
    ],
  },
  {
    title: '화이트와 블랙 오팔은 바탕색 대비가 다릅니다',
    paragraphs: [
      '화이트 또는 라이트 오팔은 흰색이나 밝은 회색 계열 바탕에서 유색 효과가 보이는 유형입니다. 밝은 바탕 때문에 전체 인상이 부드럽고 우윳빛으로 보일 수 있으며, 유색 효과가 흐린 돌부터 여러 색이 선명한 돌까지 품질 차이가 큽니다.',
      '블랙 오팔은 검정이나 짙은 바탕 위에 유색 효과가 나타납니다. 어두운 배경은 색의 대비를 강하게 보이게 할 수 있어 선호도가 높지만, 어둡다는 사실만으로 좋은 돌은 아닙니다. 넓은 각도에서 유색 효과가 얼마나 밝고 고르게 보이는지 확인하세요.',
    ],
    bullets: [
      '화이트 오팔: 흰색 또는 밝은 바탕과 유색 효과',
      '블랙 오팔: 검정 또는 짙은 바탕과 높은 색 대비',
      '공통 비교: 유색 효과가 보이는 면적과 밝기',
      '주의: 사진 노출과 배경색이 바탕색 대비를 과장할 수 있음',
    ],
  },
  {
    title: '볼더 오팔은 자연 모암이 완성석에 남습니다',
    paragraphs: [
      '볼더 오팔은 암석 틈에 형성된 얇은 오팔층을 주변 모암과 함께 연마한 유형입니다. 갈색이나 짙은색 모암이 뒷면과 일부 표면에 자연스럽게 남고, 불규칙한 경계가 디자인의 일부가 됩니다.',
      '모암이 보인다고 무조건 결함은 아닙니다. 볼더 오팔에서는 자연 구조를 보여주는 특징이지만, 오팔 조각을 검은 받침에 접착한 이중석이나 그 위에 투명 덮개를 더한 삼중석과는 구조가 다릅니다. 옆면의 층과 접착 경계를 확인하세요.',
    ],
    bullets: [
      '자연 모암과 오팔층의 불규칙한 연결',
      '얇은 오팔층을 지지하는 모암이 완성석에 포함',
      '이중석·삼중석의 평평한 접착층과 구분',
      '세팅 전 모암 가장자리와 오팔층의 균열 확인',
    ],
  },
  {
    title: '크리스털 오팔은 투명도가 분류 기준입니다',
    paragraphs: [
      '크리스털 오팔은 바탕이 투명에서 반투명해 돌 안쪽으로 빛이 통과하는 유형입니다. 이름의 크리스털은 이 분류에서 투명한 외관을 설명하며, 색이 없다는 뜻은 아닙니다. 맑은 바탕 안에서 강한 유색 효과가 나타날 수 있습니다.',
      '워터 오팔도 투명에서 반투명한 맑은 바탕을 보이지만 유색 효과가 없거나 약하고 일부에만 나타날 수 있습니다. 흰 배경과 어두운 배경에서 각각 보고, 돌을 천천히 기울여 유색 효과가 어느 각도와 면적에서 유지되는지 비교하세요.',
    ],
    bullets: [
      '크리스털 오팔: 투명·반투명 바탕과 뚜렷한 유색 효과',
      '워터 오팔: 맑은 바탕, 유색 효과가 없거나 제한적일 수 있음',
      '투명도와 유색 효과 밝기를 별도 항목으로 기록',
      '배경과 조명을 같게 맞춰 여러 돌을 나란히 비교',
    ],
  },
  {
    title: '파이어 오팔은 따뜻한 바탕색으로 구분합니다',
    paragraphs: [
      '파이어 오팔은 보통 투명에서 반투명하며 노랑, 주황, 빨강 계열의 바탕색을 보입니다. 이름의 파이어는 무지개 섬광의 강도를 뜻하는 것이 아니라 불을 떠올리게 하는 따뜻한 바탕색에서 나온 분류입니다.',
      '파이어 오팔에는 유색 효과가 나타날 수도 있고 나타나지 않을 수도 있습니다. 따라서 주황색이 선명한지와 유색 효과가 밝은지는 별도로 확인해야 합니다. 패싯 컷 제품은 정면색뿐 아니라 가장자리 마모와 표면 흠집도 함께 살펴보세요.',
    ],
    bullets: [
      '바탕색: 노랑·주황·주황빛 빨강·빨강 계열',
      '투명도: 투명에서 반투명 범위',
      '유색 효과: 존재 여부와 밝기를 별도로 확인',
      '컷 상태: 대칭, 광택, 표면 흠집과 가장자리 손상',
    ],
  },
  {
    title: '같은 조명에서 다섯 단계로 비교하세요',
    paragraphs: [
      'GIA의 오팔 평가 순서는 유형, 유색 효과, 투명도, 투명도에 영향을 주는 특징과 표면 상태, 컷을 차례로 확인하는 방식입니다. 먼저 종류를 구분하고, 돌을 천천히 회전해 유색 효과가 차지하는 비율과 밝기, 주요 색, 색 범위와 패턴을 기록하세요.',
      '그다음 투명도와 흐림, 균열망인 크레이징, 구멍과 표면 흠집, 모암의 영향을 살핍니다. 마지막으로 형태의 대칭, 두께, 광택과 실제 치수를 확인하고, 고가 제품은 천연·합성, 처리와 조립석 여부가 기재된 신뢰할 수 있는 감별 보고서를 실물과 대조하세요.',
    ],
    bullets: [
      '1단계: 블랙·화이트·볼더·크리스털·파이어 등 유형 확인',
      '2단계: 유색 효과의 면적, 밝기, 색 범위와 패턴 비교',
      '3단계: 투명도와 바탕의 흐림 확인',
      '4단계: 크레이징, 표면 흠집, 모암과 접착층 점검',
      '5단계: 컷·두께·광택·치수와 감별 정보 대조',
    ],
    image: {
      src: '/Image/guide/opal-inspection-comparison.webp',
      alt: '감별 작업자가 핀셋으로 오팔 한 개를 기울이며 트레이의 비교용 오팔 세 개와 유색 효과를 확인하는 모습',
      caption: '오팔은 같은 조명에서 천천히 기울여야 유색 효과가 보이는 면적, 밝기와 각도 차이를 비교할 수 있습니다.',
    },
  },
]

const cautions = [
  '블랙·화이트·파이어 같은 종류 이름을 품질이나 가격의 단일 순위로 해석하지 마세요.',
  '오팔은 열과 급격한 건조에 민감할 수 있고 미세 균열이 진행되는 크레이징이 생길 수 있으므로 강한 열원과 장시간 직사광선 노출을 피하세요.',
  '검은 뒷면만 보고 볼더 오팔로 단정하지 말고 자연 모암, 접착한 이중석·삼중석, 표면 처리 여부를 옆면과 감별 정보로 구분하세요.',
]

const relatedLinks = [
  { to: '/guide/birthstone-necklace-gift-guide', label: '탄생석 종류와 의미', description: '10월 오팔과 월별 탄생석 정리' },
  { to: '/guide/gemstone-mohs-hardness-guide', label: '보석 모스 경도 순위', description: '오팔의 착용 내구성과 보관 기준' },
  { to: '/guide/jewelry-cleaning-care-at-home', label: '보석 세척과 보관', description: '오팔을 포함한 보석별 관리 주의점' },
]

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
        dateModified: publishedAt,
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
    category="소재·보석"
    keyword="오팔 종류"
    inquiry-type="custom"
    inquiry-topic="오팔 종류와 품질 비교"
    title="오팔 종류, 블랙·화이트·볼더·파이어 오팔 차이"
    lead="오팔은 바탕색과 투명도, 자연 모암이 남은 구조, 유색 효과에 따라 여러 종류로 나뉩니다. 블랙·화이트·볼더·크리스털·파이어 오팔의 차이와 실물 비교 순서를 정리했습니다."
    :published-at="publishedAt"
    :hero-image="ogImage"
    hero-alt="화이트, 블랙, 볼더, 크리스털, 파이어 오팔 다섯 종류를 같은 조명에서 비교한 모습"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
  />
</template>
