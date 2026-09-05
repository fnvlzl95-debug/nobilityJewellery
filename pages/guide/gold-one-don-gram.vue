<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-one-don-gram'
const pageTitle = '금 1돈은 몇 g? 3.75g·2돈·3돈 무게 환산표 | 귀족'
const pageDescription = '금 1돈은 3.75g, 2돈은 7.5g, 3돈은 11.25g입니다. 돈·그램 환산표와 순도·공임까지 함께 비교하는 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/SB0105.webp`
const publishedAt = '2026-03-31'
const updatedAt = '2026-09-05'
const faqItems = [
  {
    question: '금 1돈은 정확히 몇 g인가요?',
    answer: '국내 귀금속 상담에서 말하는 1돈은 3.75g입니다. 그래서 2돈은 7.5g, 3돈은 11.25g으로 계산하시면 됩니다.',
  },
  {
    question: '14K와 18K도 1돈으로 말하나요?',
    answer: '네. 돈은 무게 단위라서 14K, 18K, 24K 모두 “몇 돈”으로 말할 수 있습니다. 다만 같은 1돈이어도 실제 금 함량과 가격은 소재에 따라 달라집니다.',
  },
  {
    question: '금 1돈 가격이 곧 제품 가격인가요?',
    answer: '아니요. 실제 제품 가격은 당일 시세뿐 아니라 순도, 디자인, 공임, 부자재, 잠금장치 같은 구성까지 함께 반영됩니다.',
  },
  {
    question: '돌반지는 꼭 1돈으로 해야 하나요?',
    answer: '꼭 그렇지는 않습니다. 예산, 아이 손 크기, 선물 목적에 따라 1돈 안팎 또는 그 이상으로 상담하시는 경우도 많습니다.',
  },
  {
    question: '전화 문의할 때 무엇을 같이 말하면 좋나요?',
    answer: '원하는 품목, 대략적인 무게 범위, 14K·18K·24K 중 보는 소재, 예산, 수령일을 같이 말씀해주시면 상담이 훨씬 빨라집니다.',
  },
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
        { name: '금 1돈 무게 환산표', path: pagePath },
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
        dateModified: updatedAt,
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
    category="가격"
    keyword="금 1돈 몇 g"
    inquiry-type="custom"
    inquiry-topic="금 1돈 몇 g"
    title="금 1돈은 몇 g? 3.75g·2돈·3돈 무게 환산표"
    lead="금 상담을 하다 보면 “1돈이면 몇 그램이에요?”, “돌반지 1돈이면 어느 정도예요?” 같은 질문이 정말 많습니다. 결론부터 말하면 금 1돈은 3.75g이고, 실제 제품 가격은 무게에 순도와 공임, 구성까지 함께 봐야 정확합니다."
    :published-at="publishedAt"
    :updated-at="updatedAt"
    :hero-image="`${siteConfig.url}/Image/ring/SB0105.webp`"
    hero-alt="금반지와 돌반지 무게 상담"
    :quick-answers="[
      '금 1돈은 3.75g, 2돈은 7.5g, 3돈은 11.25g입니다.',
      '같은 1돈이라도 14K·18K·24K와 공임에 따라 가격은 달라집니다.',
      '돌반지나 목걸이 상담 때는 무게만 말하지 말고 소재와 예산, 수령일도 같이 알려주세요.'
    ]"
    :sections="[
      {
        title: '금 1돈은 정확히 몇 g인가요?',
        paragraphs: [
          '국내 귀금속 상담에서 말하는 1돈은 3.75g입니다. 그래서 2돈은 7.5g, 3돈은 11.25g으로 계산하시면 됩니다. 매장에서 “몇 돈으로 보세요?”라고 여쭤보는 이유도 결국 제품 무게를 빠르게 맞춰보기 위해서예요.',
          '요즘은 공식 단위로 g를 더 자주 보지만, 현장에서는 여전히 돈 단위를 많이 씁니다. 특히 돌반지, 순금 제품, 간단한 상담에서는 “1돈짜리”, “2돈 안팎”처럼 말하는 편이 훨씬 익숙합니다.'
        ],
        bullets: [
          '1돈 = 3.75g',
          '2돈 = 7.5g',
          '3돈 = 11.25g',
          '10돈 = 37.5g'
        ]
      },
      {
        title: '왜 아직도 돈 단위를 많이 쓰나요?',
        paragraphs: [
          '고객 입장에서는 g가 더 직관적일 수 있지만, 귀금속 제품은 오래전부터 돈 단위로 상담하는 경우가 많았습니다. 그래서 시세를 볼 때도 “오늘 순금 1돈 얼마”처럼 보는 분들이 많고, 제품을 비교할 때도 자연스럽게 돈 단위가 따라옵니다.',
          '중요한 건 돈과 g를 둘 다 연결해서 이해하는 것입니다. 금목걸이나 돌반지를 고르실 때 “1돈이면 3.75g 정도구나”만 알고 있어도 상담이 훨씬 쉬워집니다.'
        ],
        bullets: [
          '시세를 볼 때 돈 단위가 익숙한 경우가 많아요',
          '돌반지·순금 제품은 돈 기준으로 비교하기 쉬워요',
          'g와 돈을 함께 이해하면 가격 비교가 빨라집니다'
        ]
      },
      {
        title: '같은 1돈인데 가격이 다른 이유',
        paragraphs: [
          '많이 헷갈리시는 부분이 바로 이것입니다. 1돈이 3.75g이라는 건 무게 기준이고, 실제 제품 가격은 무게만으로 정해지지 않습니다. 24K인지, 18K인지, 14K인지에 따라 금 함량이 다르고, 디자인 난이도와 공임까지 더해지기 때문입니다.',
          '예를 들어 같은 1돈이어도 돌반지처럼 비교적 단순한 구성인지, 잠금장치와 체인 구조가 들어가는 목걸이인지에 따라 가격이 달라집니다. 그래서 “1돈 가격”과 “제품 가격”을 같은 뜻으로 생각하시면 비교가 꼬이기 쉬워요.'
        ],
        bullets: [
          '순도 차이 — 14K, 18K, 24K는 금 함량이 달라요',
          '공임 차이 — 디자인과 작업 난이도에 따라 달라져요',
          '구성 차이 — 체인, 펜던트, 잠금장치 포함 여부가 달라요',
          '시세 차이 — 상담하는 날짜 기준 시세가 반영돼요'
        ]
      },
      {
        title: '돌반지·목걸이 상담할 때 무게를 어떻게 말하면 좋을까',
        paragraphs: [
          '처음 문의하실 때 “돌반지 1돈 정도 생각해요”, “목걸이는 너무 얇지 않게 보고 싶어요”처럼 무게 감각을 같이 말씀해주시면 상담이 훨씬 구체적이 됩니다. 꼭 정확한 돈 수를 모르셔도 괜찮고, 예산과 선호하는 분위기를 같이 말씀해주시는 편이 더 중요합니다.',
          '특히 선물용은 제품 무게만 맞춘다고 끝나지 않습니다. 실제 착용감, 길이, 디자인 분위기, 수령일을 함께 봐야 하기 때문에 “1돈 기준으로 보되 예산은 이 정도”처럼 말씀해주시면 추천이 빨라집니다.'
        ],
        bullets: [
          '품목 — 돌반지인지, 목걸이인지 먼저 정하기',
          '무게 감각 — 1돈 안팎인지, 더 묵직하게 볼지 정하기',
          '소재 — 14K·18K·24K 중 어떤 쪽인지 말하기',
          '예산 — 무게보다 예산을 우선할지 함께 전달하기',
          '수령일 — 돌잔치, 선물 날짜가 있으면 꼭 먼저 알리기'
        ]
      },
      {
        title: '가격 비교할 때 헷갈리지 않는 방법',
        paragraphs: [
          '온라인에서 글을 보거나 다른 곳과 비교하실 때는 숫자 하나만 보지 마시고, 같은 조건인지 먼저 맞춰보셔야 합니다. 같은 1돈처럼 보여도 한쪽은 24K, 다른 쪽은 18K일 수 있고, 어떤 곳은 각인이나 케이스가 포함되어 있을 수도 있습니다.',
          '결국 비교는 “같은 무게, 같은 순도, 같은 구성”으로 해야 의미가 있습니다. 그래야 상담 중에 불필요하게 다시 고르지 않고, 원하는 방향으로 바로 좁혀갈 수 있습니다.'
        ],
        bullets: [
          '무게가 같은지 확인하기',
          '14K·18K·24K처럼 순도가 같은지 맞추기',
          '각인, 케이스, 펜던트 포함 여부 확인하기',
          '당일 시세 기준인지 확인하기',
          '수리·세척 같은 사후 안내 가능 여부까지 보기'
        ]
      }
    ]"
    :cautions="[
      '금 1돈 = 3.75g은 무게 기준이고, 제품 가격은 별도로 계산됩니다.',
      '같은 1돈이어도 14K·18K·24K는 가격이 같지 않습니다.',
      '비교 견적을 볼 때는 무게, 순도, 공임, 포함 항목을 같은 조건으로 맞춰보세요.'
    ]"
    :faq-items="faqItems"
    :sources="[
      {
        label: '국가기술표준원 법정단위 FAQ',
        url: 'https://www.kats.go.kr/content.do?cmsid=78',
        note: '1돈 = 3.75g 환산과 g 단위 계량 기준'
      },
      {
        label: '한국거래소 KRX금시장 안내',
        url: 'https://open.krx.co.kr/contents/OPN/01/01050206/OPN01050206.jsp',
        note: '금 가격 형성 요인과 1g 거래 기준'
      }
    ]"
    :related-links="[
      { to: '/buy-gold', label: '순도와 중량을 확인한 뒤 금·은 매입 상담받기', description: '실물 확인 후 당일 시세를 적용하는 매입 절차를 확인하세요' },
      { to: '/baby-gold', label: '순금 돌반지 주문 상담', description: '1돈·반돈과 각인, 최소 제작 일정을 함께 확인하세요' },
      { to: '/guide/jewelry-hallmark-numbers-meaning', label: '585·750·925 각인 뜻', description: '금·은 제품의 순도 표기를 읽는 기준을 확인하세요' }
    ]"
  >
    <template #hero-summary>
      <section class="don-summary" aria-labelledby="don-summary-title">
        <h2 id="don-summary-title">금 1돈은 3.75g입니다</h2>
        <p>돈은 무게 단위이므로 14K·18K·24K 모두 1돈의 무게는 같고, 순금 함량과 제품 가격만 달라집니다.</p>

        <div class="don-table-wrap">
          <table>
            <caption>돈을 그램으로 바로 환산</caption>
            <thead>
              <tr>
                <th scope="col">돈</th>
                <th scope="col">그램(g)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>반돈(0.5돈)</td><td>1.875g</td></tr>
              <tr><td>1돈</td><td>3.75g</td></tr>
              <tr><td>2돈</td><td>7.5g</td></tr>
              <tr><td>3돈</td><td>11.25g</td></tr>
              <tr><td>10돈</td><td>37.5g</td></tr>
            </tbody>
          </table>
        </div>

        <div class="don-calculator">
          <h3>직접 환산해 보기</h3>
          <GoldWeightCalculator id-prefix="guide-gold-weight" :initial-weight="1" compact />
        </div>
      </section>
    </template>
  </GuideArticleView>
</template>

<style scoped>
.don-summary {
  margin: 8px 0 28px;
  padding: 24px 0;
  border-top: 1px solid rgba(201, 162, 39, 0.7);
  border-bottom: 1px solid rgba(201, 162, 39, 0.28);
}

.don-summary h2 {
  margin: 0 0 10px;
  color: #d4b44a;
  font-size: clamp(22px, 4vw, 30px);
  line-height: 1.35;
}

.don-summary > p {
  margin: 0 0 22px;
  color: rgba(250, 250, 250, 0.86);
  font-size: 15px;
  line-height: 1.75;
}

.don-table-wrap {
  overflow-x: auto;
}

.don-summary table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.don-summary caption {
  margin-bottom: 10px;
  color: rgba(250, 250, 250, 0.62);
  font-size: 12px;
  text-align: left;
}

.don-summary th,
.don-summary td {
  padding: 11px 14px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  text-align: left;
}

.don-summary th {
  color: rgba(250, 250, 250, 0.68);
  font-size: 12px;
  font-weight: 600;
}

.don-summary td:last-child {
  color: #fafafa;
  font-weight: 700;
}

.don-calculator {
  margin-top: 28px;
}

.don-calculator h3 {
  margin: 0 0 12px;
  font-size: 18px;
}
</style>
