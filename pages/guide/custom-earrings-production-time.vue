<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/custom-earrings-production-time'
const pageTitle = '귀걸이 주문제작 기간, 디자인 확정부터 한쌍 수령까지 | 귀족'
const pageDescription = '귀걸이 주문제작 기간을 상담, 좌우 규격 확정, 모델 제작, 주조·조립, 세팅, 마감과 착용 검수 단계로 나눠 수령 일정 확인법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/custom-earrings-production-time-hero.webp`
const publishedAt = '2026-08-04'

const faqItems = [
  {
    question: '귀걸이 주문제작 기간은 보통 얼마나 걸리나요?',
    answer: '디자인 방식, 금속과 보석 수급, 한 쌍의 좌우 대칭 작업, 잠금 부속, 도금·각인 범위에 따라 달라 고정된 일수로 단정하기 어렵습니다. 도안만 보낸 날이 아니라 크기·무게·침·뒷마개와 마감까지 승인한 날을 기준으로 예상 완료일을 확인하세요.',
  },
  {
    question: '상담한 날부터 제작 기간을 계산하면 되나요?',
    answer: '참고 사진만 전달했거나 견적만 받은 단계라면 실제 제작이 시작되지 않았을 수 있습니다. 정면·옆면 구조, 한쪽 무게, 금속, 보석, 침 길이, 잠금 방식과 최종 시안이 확정됐는지 먼저 확인해야 합니다.',
  },
  {
    question: '귀걸이 한 쌍과 한쪽만 주문할 때 기간이 같은가요?',
    answer: '같다고 보기 어렵습니다. 한 쌍은 좌우 모델을 함께 설계할 수 있지만, 한쪽 복원은 남은 귀걸이의 실측과 색·마감·보석 매칭이 추가될 수 있습니다. 주문 목적과 공정이 다르므로 각각 별도 일정을 받아야 합니다.',
  },
  {
    question: '제작 중 귀걸이 길이나 잠금을 바꿀 수 있나요?',
    answer: '모델 승인 전에는 조정 가능한 항목이 비교적 많지만 주조나 조립 이후에는 구조 변경으로 재제작이 필요할 수 있습니다. 변경 가능한 마지막 단계와 일정·비용 영향을 요청 전에 확인하세요.',
  },
  {
    question: '맞춤 귀걸이 수령 시 어떤 항목을 점검하나요?',
    answer: '좌우 길이와 각도, 한쪽 무게, 침과 잠금의 맞물림, 연결 고리, 보석 흔들림, 표면 마감을 비교하세요. 실제로 양쪽을 착용해 기울기와 귓불 당김까지 확인한 뒤 수정 가능 범위와 추가 기간을 안내받는 것이 좋습니다.',
  },
]

const quickAnswers = [
  '귀걸이 주문제작 기간은 상담일보다 디자인, 한쪽 무게, 침·잠금, 보석과 마감이 모두 승인된 날부터 확인하는 것이 정확합니다.',
  '한 쌍은 좌우 대칭과 잠금 강도를 함께 맞춰야 하므로 모델, 주조, 조립, 세팅, 마감과 착용 검수 단계를 나눠 보세요.',
  '선물 날짜가 정해졌다면 시안 승인일, 공방 완료일, 실제 착용·수정 여유일을 따로 잡아야 일정 변수를 줄일 수 있습니다.',
]

const sections = [
  {
    title: '귀걸이 주문제작 기간은 사양 승인일부터 계산하세요',
    paragraphs: [
      '귀걸이는 참고 이미지를 보낸 즉시 제작되는 제품이 아닙니다. 스터드·후프·드롭 중 형태를 정하고, 정면 크기와 전체 길이, 한쪽 무게, 금속과 보석, 침과 뒷마개 구조까지 결정해야 실제 작업 범위가 만들어집니다.',
      '상담할 때는 문의일과 제작 시작일을 같은 날짜로 적지 말고 견적 확인, 시안 승인, 작업 착수, 예상 완료를 구분하세요. 특히 착용감에 영향을 주는 무게와 잠금이 미정이면 완성 모양만 정해져도 일정은 확정되지 않을 수 있습니다.',
    ],
    bullets: [
      '형태: 스터드, 후프, 허기, 드롭 중 기본 구조',
      '치수: 정면 폭, 전체 길이, 두께와 한쪽 무게',
      '착용부: 침 길이·굵기, 후크, 힌지와 뒷마개',
      '표면: 유광·무광, 도금 색상과 각인 여부',
      '일정표: 시안 승인일과 실제 제작 시작일',
    ],
  },
  {
    title: '한 쌍의 좌우 기준을 먼저 고정해야 합니다',
    paragraphs: [
      '귀걸이 주문제작은 같은 형태 두 개를 단순히 만드는 작업과 다릅니다. 착용했을 때 좌우 길이와 기울기, 장식 방향, 연결 고리의 위치가 한 쌍으로 보이도록 기준을 맞춰야 합니다. 비대칭 디자인이라면 어느 쪽 귀에 어떤 장식이 오는지도 도안에 표시해야 합니다.',
      '샘플 착용이 가능하다면 거울 정면뿐 아니라 옆면과 고개를 움직였을 때의 균형을 확인하세요. 장식이 넓거나 긴 제품은 한쪽 무게 상한을 먼저 정해 두면 완성 후 귓불이 처지거나 귀걸이가 앞으로 숙는 문제를 줄이는 데 도움이 됩니다.',
    ],
    bullets: [
      '좌우가 같은 대칭형인지 서로 다른 비대칭형인지',
      '장식의 앞뒤 방향과 연결 고리 회전 범위',
      '양쪽 완성 길이와 한쪽 무게 허용 차이',
      '귓불 두께에 맞는 침 길이와 뒷마개 크기',
      '착용 시 장식이 정면을 보는 기준 각도',
    ],
  },
  {
    title: '시안과 모델 확인도 전체 일정에 포함됩니다',
    paragraphs: [
      '완전 맞춤 디자인은 도안이나 CAD로 비율을 정한 뒤 왁스 또는 출력 모델을 거쳐 제작할 수 있습니다. 평면 화면에서는 커 보이지 않던 두께와 높이가 실제 모델에서 달라 보일 수 있으므로 승인 방식과 수정 횟수를 미리 확인하는 편이 좋습니다.',
      '기존 제품을 참고해 새로 만들더라도 침, 힌지, 원터치 잠금처럼 작동하는 부위는 장식과 별도로 설계해야 합니다. 모델 승인 전에 길이와 무게, 피부에 닿는 모서리, 잠금 동선을 한 번에 검토하면 뒤 단계에서 구조를 되돌리는 일을 줄일 수 있습니다.',
    ],
    bullets: [
      '정면·옆면 도안과 실제 완성 치수 대조',
      'CAD 화면 또는 왁스 모델 확인 여부',
      '수정 요청 횟수와 회신 마감 시점',
      '침·힌지·잠금 부속의 규격과 작동 공간',
      '최종 승인 뒤 변경 가능한 항목',
    ],
  },
  {
    title: '모델부터 한 쌍 검수까지 제작 단계를 확인하세요',
    paragraphs: [
      '사양 확정 후에는 제작 모델을 만든 뒤 금속으로 구현하고, 표면 세공과 부속 연결, 보석 고정, 광택 작업과 완성 검사를 차례로 진행합니다. GIA가 공개한 제조 현장 자료에서도 디지털 설계와 왁스 모델, 주조, 보석 고정, 마감, 품질 검사를 연속 단계로 보여 줍니다.',
      '귀걸이는 완성품 두 개를 나란히 놓고 좌우 길이, 장식 각도, 잠금 강도와 마감을 비교하는 검수가 필요합니다. 도금이나 레이저 각인이 있다면 기본 연마 뒤 별도 마감이 더해질 수 있으므로 공방 완료와 수령 가능 날짜가 같은지도 물어보세요.',
    ],
    bullets: [
      '도안·CAD를 바탕으로 모델 또는 제작 데이터 준비',
      '주조 후 형태와 표면을 다듬고 부속 조립',
      '보석 세팅과 연결 고리 닫힘 상태 확인',
      '유광·무광·도금·각인 마감 적용',
      '좌우 대칭, 무게, 잠금과 착용 상태 최종 검수',
    ],
    image: {
      src: '/Image/guide/earring-production-stages.webp',
      alt: '귀걸이 스케치, 파란 왁스 모델, 거친 금 주조물과 광택을 낸 완성 귀걸이의 네 제작 단계',
      caption: '맞춤 귀걸이는 디자인 승인 뒤에도 모델, 주조, 세공과 최종 마감 단계를 거쳐 한 쌍으로 검수합니다.',
    },
  },
  {
    title: '보석과 특수 부속이 있으면 수급 일정을 더하세요',
    paragraphs: [
      '기성 규격이 아닌 보석이나 좌우 색을 맞춘 유색 보석을 쓰면 한 쌍을 선별하는 시간이 필요할 수 있습니다. 주문형 침, 클립, 나사 뒷마개, 특수 힌지처럼 별도 부속이 들어가는 디자인도 재고와 입고 시점을 먼저 확인해야 합니다.',
      '제작 중 길이·두께·보석 배치를 바꾸면 이미 만든 모델이나 주조물을 다시 준비할 수 있습니다. 명절과 예식 성수기에는 작업 순서도 일정에 영향을 주므로 빠른 제작이라는 표현보다 현재 확정 공정과 남은 공정을 날짜별로 받아 두는 것이 분명합니다.',
    ],
    bullets: [
      '좌우 크기와 색을 맞춘 보석 선별 또는 추가 주문',
      '나사형 뒷마개, 클립, 특수 힌지 부속 수급',
      '승인 후 전체 길이·두께·보석 위치 변경',
      '도금 색상 샘플 확인과 재마감 요청',
      '성수기 작업량과 방문·택배 수령 방식',
    ],
  },
  {
    title: '수령일 전 착용 확인과 수정 여유를 남기세요',
    paragraphs: [
      '선물이나 행사에 맞춘다면 사용일 바로 전날을 목표로 잡지 마세요. 시안 승인 마감일, 제작 완료 목표일, 실제 착용 점검일을 구분하고 귓불 두께에 맞춘 뒷마개나 침 조정이 필요할 때 쓸 여유 기간을 남겨야 합니다.',
      '수령할 때는 한 쌍을 같은 방향으로 놓아 길이와 각도를 비교하고 양쪽 귀에 직접 착용해 보세요. 잠금 소리나 걸림이 좌우에서 다르거나 보석이 흔들리고 연결 고리가 벌어져 있다면 사용하기 전에 점검을 요청하고 추가 작업 일정을 다시 확인해야 합니다.',
    ],
    bullets: [
      '주문서의 금속, 보석 수량, 치수와 한쪽 무게',
      '좌우 길이·각도·표면 색과 광택의 균형',
      '침 끝 마감, 뒷마개 압력과 힌지 맞물림',
      '보석 흔들림과 연결 고리 틈 여부',
      '착용 수정 가능 범위와 사후 수리 소요 일정',
    ],
  },
]

const cautions = [
  '작업 소요일은 디자인과 공방의 진행 순서에 따라 바뀔 수 있습니다. 문의 전에 임의로 정한 숫자를 완료 약속으로 여기지 마세요.',
  '완성 사진만 보고 승인하지 말고 한쪽 무게, 전체 길이, 침과 잠금 규격을 제작 확인서에 함께 남기세요.',
  '주조 이후 구조 변경은 재제작으로 이어질 수 있으므로 수정 가능한 마지막 시점과 일정 영향을 사전에 확인하세요.',
]

const relatedLinks = [
  { to: '/guide/earring-types-guide', label: '귀걸이 종류 비교', description: '스터드·후프·드롭과 잠금 구조를 먼저 고르세요' },
  { to: '/guide/single-earring-reproduction-cost', label: '귀걸이 한짝 제작 비용', description: '남은 한쪽을 복원할 때의 견적 항목을 확인하세요' },
  { to: '/custom', label: '주문제작 안내', description: '귀걸이 디자인 상담과 제작 접수 방법을 확인하세요' },
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
        { name: '귀걸이 주문제작 기간', path: pagePath },
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
    category="기간"
    keyword="귀걸이 주문제작 기간"
    inquiry-type="custom"
    inquiry-topic="귀걸이 주문제작 기간 상담"
    title="귀걸이 주문제작 기간, 디자인 확정부터 한쌍 수령까지"
    lead="귀걸이 주문제작 기간은 시안을 고르는 시간만으로 정해지지 않습니다. 한 쌍의 좌우 규격, 침과 잠금, 보석과 마감을 확정한 뒤 모델·주조·조립·세팅·검수를 거치는 순서와 수령 일정 확인법을 정리했습니다."
    :published-at="publishedAt"
    :hero-image="ogImage"
    hero-alt="옐로우골드 드롭 귀걸이 한 쌍과 빈 일정표, 캘리퍼로 확인하는 귀걸이 주문제작 기간"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
  />
</template>
