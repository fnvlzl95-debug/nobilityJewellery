<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/birthstone-necklace-gift-guide'
const pageTitle = '탄생석 종류와 의미, 목걸이 선물 고르는 기준 | 귀족'
const pageDescription = '월별 탄생석 종류와 의미를 정리하고 탄생석 목걸이 선물 상담 전 확인할 색상, 소재, 천연석·합성석 표기, 예산 기준을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/birthstone-necklace-gift-hero.webp`
const publishedAt = '2026-07-09'

const faqItems = [
  {
    question: '탄생석 종류는 국가마다 다른가요?',
    answer: '기준표와 브랜드에 따라 일부 달라질 수 있습니다. 국내 선물 상담에서는 대표 탄생석을 기준으로 보되, 색감과 착용 취향을 함께 맞추는 것이 실용적입니다.',
  },
  {
    question: '탄생석 목걸이는 천연석으로만 해야 하나요?',
    answer: '꼭 그렇지는 않습니다. 예산과 디자인에 따라 천연석, 합성석, 큐빅, 랩그로운 스톤을 비교할 수 있습니다. 중요한 것은 판매 표기와 관리 방법을 명확히 확인하는 것입니다.',
  },
  {
    question: '선물용 탄생석은 생월이 맞아야 하나요?',
    answer: '생월 의미를 중요하게 보는 선물이라면 맞추는 것이 좋습니다. 다만 착용자가 좋아하는 색상이나 평소 스타일이 더 중요하다면 생월보다 실제 착용 만족도를 우선해도 됩니다.',
  },
  {
    question: '탄생석 목걸이 소재는 14K와 18K 중 무엇이 좋나요?',
    answer: '데일리 선물은 가격과 내구성 균형을 보고 14K를 많이 비교하고, 색감과 고급감을 더 보고 싶다면 18K도 후보가 됩니다. 스톤 크기와 체인 굵기까지 함께 봐야 합니다.',
  },
  {
    question: '탄생석 목걸이 관리에서 조심할 점은 무엇인가요?',
    answer: '진주, 오팔, 터키석처럼 열과 화학약품에 민감한 보석은 물, 향수, 초음파 세척을 조심해야 합니다. 보석 종류에 따라 세척과 보관 방법이 달라집니다.',
  },
]

const quickAnswers = [
  '탄생석 종류는 1월 가넷부터 12월 터키석까지 월별 상징이 있어 생일 선물 검색 의도와 잘 맞습니다.',
  '목걸이 선물은 탄생석 의미만 보지 말고 착용자 피부톤, 평소 옷 색상, 체인 길이, 펜던트 크기를 같이 봐야 합니다.',
  '천연석, 합성석, 큐빅 표기는 가격과 관리법에 영향을 주므로 상담 전에 어떤 표기인지 확인하는 것이 좋습니다.',
]

const sections = [
  {
    title: '탄생석 종류, 월별로 먼저 정리하세요',
    paragraphs: [
      '탄생석 종류는 생일 선물이나 기념일 주얼리를 고를 때 가장 먼저 떠올리는 기준입니다. 월별 대표 보석이 정해져 있어 의미를 담기 쉽고, 반지보다 목걸이는 사이즈 부담이 적어 선물용으로 상담하기 좋습니다.',
      '다만 탄생석 기준은 국가와 브랜드, 전통석과 현대석 구분에 따라 일부 달라질 수 있습니다. 아래 목록은 국내에서 선물 상담 때 자주 쓰는 대표 조합으로 이해하면 좋습니다.',
    ],
    bullets: [
      '1월 가넷: 깊은 붉은색, 안정감 있는 선물 이미지',
      '2월 자수정: 보라색 계열, 차분하고 우아한 분위기',
      '3월 아쿠아마린: 맑은 하늘빛, 산뜻한 데일리 느낌',
      '4월 다이아몬드: 투명한 광채, 기념일 선물에 많이 비교',
      '5월 에메랄드: 선명한 초록색, 클래식한 포인트',
      '6월 진주: 부드러운 광택, 단정한 선물용으로 적합',
      '7월 루비: 강한 붉은색, 존재감 있는 포인트',
      '8월 페리도트: 밝은 연두색, 가볍고 생기 있는 인상',
      '9월 사파이어: 깊은 파란색, 차분한 고급감',
      '10월 오팔: 다채로운 유색광, 개성 있는 선물',
      '11월 토파즈·시트린: 노란빛과 따뜻한 색감',
      '12월 터키석: 청록색 계열, 캐주얼한 포인트',
    ],
    image: {
      src: '/Image/guide/birthstone-necklace-gift-hero.webp',
      alt: '월별 탄생석 종류와 탄생석 목걸이 선물 이미지',
      caption: '탄생석 목걸이는 생월 의미와 실제 착용 색감을 함께 맞추는 것이 중요합니다.',
    },
  },
  {
    title: '목걸이 선물은 의미보다 착용성을 먼저 봅니다',
    paragraphs: [
      '탄생석 목걸이 선물은 의미가 분명하다는 장점이 있지만, 실제로 자주 착용할지는 다른 문제입니다. 착용자가 평소 작은 주얼리를 좋아하는지, 컬러 포인트를 즐기는지, 금색과 은색 중 어떤 색을 자주 쓰는지 먼저 떠올려보세요.',
      '목걸이는 반지처럼 정확한 호수를 몰라도 선물하기 좋지만, 체인 길이와 펜던트 크기는 착용감에 영향을 줍니다. 데일리용이라면 너무 큰 스톤보다 작고 낮은 세팅이 부담이 적습니다.',
    ],
    bullets: [
      '평소 골드 주얼리를 많이 착용하면 옐로우골드나 로즈골드 비교',
      '차분한 스타일이면 작은 원석 펜던트나 단정한 베젤 세팅 비교',
      '화려한 스타일이면 색감이 선명한 루비, 에메랄드, 사파이어 계열 비교',
      '매일 착용할 선물이라면 체인 굵기와 잠금장식 편의성 확인',
    ],
  },
  {
    title: '색상별로 분위기가 달라집니다',
    paragraphs: [
      '탄생석 종류를 고를 때 생월만 보면 색상이 착용자 취향과 맞지 않을 수 있습니다. 예를 들어 7월 루비는 선명한 붉은색이 강점이지만 평소 차분한 색을 선호한다면 작은 크기나 은은한 디자인이 더 잘 맞을 수 있습니다.',
      '반대로 생월과 상관없이 좋아하는 색을 기준으로 고르는 방법도 있습니다. 선물의 상징성을 강조하려면 생월 탄생석, 실제 착용 빈도를 높이고 싶다면 선호 색상과 스타일을 우선하는 방식입니다.',
    ],
    bullets: [
      '붉은 계열: 가넷, 루비처럼 포인트가 강한 선물',
      '푸른 계열: 아쿠아마린, 사파이어, 터키석처럼 시원한 인상',
      '초록 계열: 에메랄드, 페리도트처럼 생기 있는 포인트',
      '투명·화이트 계열: 다이아몬드, 진주처럼 데일리 착용에 유리',
      '노란 계열: 시트린, 토파즈처럼 따뜻한 느낌',
    ],
  },
  {
    title: '천연석, 합성석, 큐빅 표기를 확인하세요',
    paragraphs: [
      '탄생석 목걸이 가격은 보석 이름만으로 정해지지 않습니다. 같은 루비 색상이라도 천연 루비, 합성 루비, 큐빅, 유색 큐빅처럼 표기가 달라질 수 있습니다. 표기가 달라지면 가격, 희소성, 관리법도 달라집니다.',
      '선물용이라면 “천연석인지”, “합성석인지”, “큐빅 또는 대체석인지”를 명확히 확인하는 것이 좋습니다. 의미를 담는 선물이라면 표기 자체가 중요하고, 색감 중심 선물이라면 예산 안에서 가장 잘 어울리는 대체석을 고를 수도 있습니다.',
    ],
    bullets: [
      '천연석: 자연에서 나온 보석, 개체별 색과 내포물이 다를 수 있음',
      '합성석: 같은 성분을 인공적으로 만든 보석, 색과 품질이 균일한 편',
      '큐빅·대체석: 가격 부담을 낮추고 색상 포인트를 주기 쉬움',
      '진주·오팔·터키석: 열, 물, 화학약품에 민감할 수 있어 관리 확인',
    ],
    image: {
      src: '/Image/guide/birthstone-necklace-selection.webp',
      alt: '탄생석 목걸이 선물 상담에서 원석 색상과 펜던트를 고르는 장면',
      caption: '탄생석 선물은 보석 이름뿐 아니라 표기, 세팅, 체인 소재를 함께 확인해야 합니다.',
    },
  },
  {
    title: '예산을 정할 때 보는 기준',
    paragraphs: [
      '탄생석 목걸이 예산은 스톤 종류, 크기, 소재, 체인 굵기, 세팅 방식에 따라 달라집니다. 같은 14K 목걸이라도 펜던트 크기가 커지거나 체인이 굵어지면 중량이 늘고, 천연석 등급이 높아지면 스톤 비용도 달라집니다.',
      '처음 상담할 때는 정확한 금액보다 예산 범위를 알려주는 것이 좋습니다. 예산 안에서 14K와 18K, 천연석과 대체석, 작은 펜던트와 포인트 펜던트를 현실적으로 비교할 수 있습니다.',
    ],
    bullets: [
      '소재: 14K, 18K, 실버, 화이트골드 여부',
      '스톤: 천연석, 합성석, 큐빅, 랩그로운 스톤 여부',
      '크기: 데일리용 작은 포인트인지, 기념일용 메인 포인트인지',
      '체인: 길이, 굵기, 잠금장식, 펜던트 탈착 가능 여부',
      '일정: 생일이나 기념일 전 수령 가능 날짜',
    ],
  },
  {
    title: '상담 전 체크리스트',
    paragraphs: [
      '탄생석 종류를 미리 정해도 실제 상담에서는 착용자 취향이 더 중요할 때가 많습니다. 생월, 좋아하는 색상, 평소 착용하는 금속 색, 선물 날짜, 예산 범위를 정리해오면 상담이 빨라집니다.',
      '참고 사진이 있다면 정면 사진만 보내기보다 펜던트 크기와 체인 길이가 보이는 착용 사진도 같이 준비하세요. 같은 탄생석 목걸이라도 스톤 크기와 체인 굵기에 따라 분위기가 크게 달라집니다.',
    ],
    bullets: [
      '선물 받을 분의 생월과 좋아하는 색상',
      '평소 착용하는 주얼리 색상과 스타일',
      '원하는 소재와 예산 범위',
      '생일, 기념일 등 필요한 수령 날짜',
      '참고 디자인 사진과 원하는 펜던트 크기',
    ],
  },
]

const cautions = [
  '탄생석 의미는 문화권과 브랜드 기준에 따라 표현이 달라질 수 있습니다.',
  '천연 보석은 색, 내포물, 크기에 따라 가격 차이가 커질 수 있어 실물 확인이 필요합니다.',
  '진주, 오팔, 터키석처럼 민감한 보석은 세척과 보관 방법을 상담 때 꼭 확인하세요.',
]

const relatedLinks = [
  { to: '/guide/sapphire-quality-factors', label: '사파이어 등급 보는 법', description: '색·투명도·컷과 처리 기준' },
  { to: '/custom', label: '주문제작 안내', description: '원하는 탄생석 목걸이 제작 상담' },
  { to: '/guide/gemstone-mohs-hardness-guide', label: '보석 모스 경도 순위', description: '착용 빈도와 내구성 기준 확인' },
  { to: '/guide/jewelry-cleaning-care-at-home', label: '주얼리 관리법', description: '보석별 세척과 보관 주의점' },
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
        { name: '탄생석 종류', path: pagePath },
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
        author: { '@type': 'Organization', name: siteConfig.name },
        publisher: { '@type': 'Organization', name: siteConfig.name },
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
    category="소재·보석"
    keyword="탄생석 종류"
    inquiry-type="custom"
    inquiry-topic="탄생석 목걸이 선물 상담"
    title="탄생석 종류와 의미, 목걸이 선물 고르는 기준"
    lead="탄생석 종류는 생일 선물과 기념일 주얼리에서 검색 의도가 뚜렷한 주제입니다. 월별 대표 보석을 먼저 정리하고, 실제로 오래 착용할 수 있는 탄생석 목걸이를 고르려면 색상, 소재, 스톤 표기, 체인 구성을 함께 봐야 합니다."
    :published-at="publishedAt"
    :hero-image="ogImage"
    hero-alt="탄생석 종류와 탄생석 목걸이 선물 이미지"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
  />
</template>
