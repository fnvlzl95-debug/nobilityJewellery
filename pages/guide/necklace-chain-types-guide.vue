<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-chain-types-guide'
const pageTitle = '목걸이 체인 종류, 베네치아·커브·로프·스네이크 차이 | 귀족'
const pageDescription = '목걸이 체인 종류를 케이블·커브·베네치아·로프·스네이크·볼체인별 구조와 착용감, 펜던트 조합, 수리 기준으로 비교했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-chain-types-hero.webp`
const publishedAt = '2026-07-19'

const faqItems = [
  {
    question: '가장 튼튼한 목걸이 체인 종류는 무엇인가요?',
    answer: '종류 이름만으로 가장 튼튼한 체인을 정할 수 없습니다. 같은 구조라도 링크 굵기와 크기, 연결부 납땜, 속이 찼는지 비었는지, 사용 중 마모 상태에 따라 내구성이 달라집니다. 실제 중량과 단면, 연결 상태를 함께 확인해야 합니다.',
  },
  {
    question: '펜던트에는 어떤 체인이 잘 어울리나요?',
    answer: '펜던트 무게를 안정적으로 받으면서 고리 안으로 체인과 끝장식이 통과해야 합니다. 작은 펜던트에는 가는 케이블이나 베네치아 체인이 무난하고, 무게감 있는 펜던트는 체인 폭과 잠금장치까지 균형 있게 맞추는 편이 좋습니다.',
  },
  {
    question: '머리카락이 덜 걸리는 체인은 어떤 종류인가요?',
    answer: '표면이 매끄럽고 링크 틈이 촘촘한 스네이크나 일부 베네치아 체인은 걸림이 적게 느껴질 수 있습니다. 다만 마모된 연결부, 거친 마감, 잠금 고리 틈에서도 머리카락이 걸릴 수 있어 완제품 상태를 직접 확인해야 합니다.',
  },
  {
    question: '매장마다 체인 이름이 다른 이유는 무엇인가요?',
    answer: '국가와 제조사, 유통 현장에 따라 같은 구조를 다른 별칭으로 부르거나 비슷한 체인을 한 이름으로 묶기도 합니다. 이름만 듣고 주문하지 말고 링크 모양, 폭, 단면과 실물 샘플을 사진으로 확인하세요.',
  },
  {
    question: '모든 목걸이 체인은 끊어져도 수리할 수 있나요?',
    answer: '일반 링크 체인은 연결 부위를 찾아 수리할 수 있는 경우가 많지만, 속이 빈 체인이나 표면이 연속된 스네이크 체인, 심하게 늘어나거나 여러 구간이 닳은 체인은 흔적 없이 복원하기 어렵거나 교체가 나을 수 있습니다.',
  },
]

const quickAnswers = [
  '목걸이 체인 종류는 이름보다 링크 구조, 실제 폭과 중량, 속이 찬 구조인지부터 비교해야 합니다.',
  '펜던트를 사용할 때는 체인 굵기뿐 아니라 펜던트 고리의 안쪽 크기와 체인 끝장식 통과 여부가 중요합니다.',
  '매장별 명칭이 다를 수 있으므로 원하는 링크 모양과 착용 사진, 수리·관리 조건을 실물로 확인하세요.',
]

const sections = [
  {
    title: '체인 이름보다 링크 구조를 먼저 보세요',
    paragraphs: [
      '목걸이 체인은 고리를 연결하는 방식, 링크의 단면, 꼬임과 표면 가공에 따라 움직임과 반사가 달라집니다. 같은 이름으로 판매되더라도 링크 폭과 두께, 속이 빈 구조인지에 따라 착용감과 가격, 수리 방식이 달라질 수 있습니다.',
      '상담할 때는 “베네치아 체인” 같은 명칭만 전달하기보다 원하는 링크 확대 사진과 전체 착용 모습을 함께 준비하세요. 체인 폭을 밀리미터로 확인하고 14K·18K·은 같은 소재, 길이, 중량과 잠금장치까지 기록하면 다른 제품과 비교하기 쉽습니다.',
    ],
    bullets: [
      '링크 모양: 타원, 납작한 고리, 사각, 꼬임, 구슬 등',
      '단면과 내부: 속이 찬 구조인지 빈 구조인지',
      '표면 상태: 유광, 컷팅, 무광과 모서리 마감',
      '기본 정보: 소재, 폭, 길이, 중량, 잠금장치',
    ],
  },
  {
    title: '케이블 체인과 커브 체인의 차이',
    paragraphs: [
      '케이블 체인은 타원형이나 원형 고리를 번갈아 연결한 기본 구조입니다. 움직임이 자연스럽고 링크 하나를 구분하기 쉬워 작은 펜던트부터 일상용 목걸이까지 폭넓게 사용됩니다. 링크 크기와 선 굵기에 따라 섬세하거나 선명한 인상을 만들 수 있습니다.',
      '커브 체인은 연결 고리를 비틀고 납작하게 정렬해 목에 놓았을 때 한 방향으로 평평하게 보이는 구조입니다. 금속 면이 연속적으로 반사되어 같은 폭에서도 존재감이 크지만, 링크가 뒤집히거나 꼬였을 때 피부에 닿는 느낌을 확인하는 것이 좋습니다.',
    ],
    bullets: [
      '케이블: 기본 고리 구조, 움직임이 유연하고 펜던트 조합이 쉬움',
      '커브: 납작하게 정렬된 링크, 표면 반사와 체인 자체의 존재감이 큼',
      '확인 항목: 링크 납땜, 선 굵기, 모서리와 뒤집힘',
      '선택 기준: 펜던트 중심인지 체인 단독 착용인지',
    ],
  },
  {
    title: '베네치아 체인과 로프 체인의 차이',
    paragraphs: [
      '베네치아 또는 박스 체인은 사각형에 가까운 링크가 연속되어 반듯한 선을 만듭니다. 작은 면이 규칙적으로 빛을 반사하고 펜던트와 조합했을 때 정돈된 인상을 주지만, 심하게 접히거나 눌린 구간은 모양이 눈에 띌 수 있습니다.',
      '로프 체인은 여러 링크가 나선처럼 얽혀 밧줄 같은 꼬임을 만드는 구조입니다. 방향에 따라 빛이 풍부하게 반사되어 체인만 착용해도 장식성이 크며, 링크가 촘촘한 만큼 오염이 안쪽에 남지 않도록 부드럽게 관리해야 합니다.',
    ],
    bullets: [
      '베네치아: 사각 링크가 이어지는 반듯하고 기하학적인 선',
      '로프: 여러 고리가 나선형으로 얽힌 입체적인 꼬임',
      '베네치아 확인: 꺾임 자국과 사각 링크의 눌림',
      '로프 확인: 꼬임 사이의 오염과 링크 마모',
    ],
  },
  {
    title: '스네이크 체인과 볼체인의 특징',
    paragraphs: [
      '스네이크 체인은 작은 판이나 링크가 촘촘히 맞물려 매끄러운 관처럼 보입니다. 피부에 닿는 면이 부드럽고 펜던트가 자연스럽게 움직일 수 있지만, 한 지점을 반복해서 접으면 꺾임이 남을 수 있어 둥글게 보관하는 편이 좋습니다.',
      '볼체인은 작은 구슬을 일정한 간격으로 연결한 구조로 가볍고 캐주얼한 인상이 뚜렷합니다. 펜던트 고리가 작으면 구슬이나 연결 단자가 통과하지 못할 수 있고, 연결선이 얇은 제품은 당김과 마모 상태를 살펴야 합니다.',
    ],
    bullets: [
      '스네이크: 표면이 연속적이고 매끄러우며 급격한 꺾임에 주의',
      '볼체인: 구슬 형태가 반복되고 펜던트 고리 통과 여부가 중요',
      '보관: 스네이크는 접지 말고 넓은 곡선으로 두기',
      '점검: 볼 사이 연결선과 끝단 결합 상태 확인',
    ],
  },
  {
    title: '펜던트와 체인을 맞추는 세 가지 치수',
    paragraphs: [
      '펜던트를 함께 착용하려면 체인 폭, 펜던트 고리의 안쪽 크기, 체인 끝장식의 최대 폭을 비교해야 합니다. 체인 본체가 고리에 들어가도 끝장식이 통과하지 못하면 펜던트를 끼울 수 없고, 고리가 너무 넓으면 펜던트가 앞뒤로 쉽게 돌아갈 수 있습니다.',
      '펜던트 무게도 고려하세요. 가는 체인에 무거운 펜던트를 달면 목 앞쪽이 과하게 당기고 한 지점의 마모가 빨라질 수 있습니다. 완성 상태에서 펜던트가 중앙에 머무는지, 잠금장치가 앞으로 돌아오는지까지 확인하는 편이 좋습니다.',
    ],
    bullets: [
      '체인 본체의 실제 폭과 두께',
      '펜던트 고리 안쪽의 가로·세로 치수',
      '체인 끝장식과 연결 고리의 최대 폭',
      '펜던트 중량을 받는 체인의 균형',
      '착용 중 펜던트 방향과 잠금장치 이동',
    ],
    image: {
      src: '/Image/guide/necklace-chain-pendant-fit.webp',
      alt: '주얼리 작업자가 펜던트 고리와 세 가지 목걸이 체인의 굵기를 비교하는 모습',
      caption: '체인 굵기만 보지 말고 펜던트 고리 안쪽과 끝장식이 실제로 통과하는지 함께 확인하세요.',
    },
  },
  {
    title: '구매 전 내구성과 수리 조건을 확인하세요',
    paragraphs: [
      '체인의 내구성은 종류 이름보다 금속 선의 굵기, 링크 크기, 납땜 상태, 속이 찬 정도와 마모에 좌우됩니다. 부피가 커 보여도 속이 빈 체인은 가볍고 눌림에 민감할 수 있으며, 가는 체인도 링크가 단단히 연결되고 무리한 펜던트를 달지 않으면 일상용으로 적합할 수 있습니다.',
      '수리 가능성도 구조마다 다릅니다. 개별 링크가 보이는 체인은 손상 부위를 연결할 수 있는 경우가 많지만, 매끄러운 스네이크 체인이나 심하게 늘어난 로프 체인은 수리 자국이나 유연성 차이가 남을 수 있습니다. 구입 전에 동일 체인 수급, 길이 조절, 잠금장치 교체 가능 여부를 확인하세요.',
    ],
    bullets: [
      '속이 찬 체인과 빈 체인의 중량·눌림 차이',
      '링크 접합부와 잠금장치의 마모 상태',
      '동일 체인으로 길이 연장 가능한지',
      '끊어짐 수리 후 굳음이나 흔적이 남는 구조인지',
      '펜던트 포함 총중량에 맞는 체인인지',
    ],
  },
]

const cautions = [
  '체인 명칭은 제조사와 매장에 따라 다를 수 있으므로 이름만으로 구조와 굵기를 확정하지 마세요.',
  '부피가 큰 체인도 속이 빈 구조라면 눌림과 꺾임에 민감할 수 있어 실중량과 단면 확인이 필요합니다.',
  '펜던트 고리에 체인 본체만 통과하는지 보지 말고 끝장식과 연결 고리까지 지나가는지 확인하세요.',
]

const relatedLinks = [
  { to: '/guide/necklace-clasp-types', label: '목걸이 잠금장치 종류', description: '스프링링·랍스터·토글 구조 비교' },
  { to: '/guide/necklace-bracelet-chain-repair', label: '목걸이 체인 수리', description: '끊어짐과 잠금장치 수리 기준' },
  { to: '/custom', label: '목걸이 주문제작', description: '체인·펜던트 맞춤 상담 안내' },
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
        { name: '목걸이 체인 종류', path: pagePath },
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
    category="방법"
    keyword="목걸이 체인 종류"
    inquiry-type="custom"
    inquiry-topic="목걸이 체인과 펜던트 조합"
    title="목걸이 체인 종류, 베네치아·커브·로프·스네이크 차이"
    lead="목걸이 체인 종류는 링크 모양뿐 아니라 움직임, 반사, 펜던트 조합과 수리 방식까지 다릅니다. 케이블·커브·베네치아·로프·스네이크·볼체인의 구조와 구매 전 확인할 치수를 정리했습니다."
    :published-at="publishedAt"
    :hero-image="ogImage"
    hero-alt="케이블·커브·베네치아·로프·스네이크·볼 형태의 여러 목걸이 체인"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
  />
</template>
