<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ring-cubic-stone-repair'
const pageTitle = '반지 큐빅 빠짐 수리, 종로에 맡기기 전 확인할 것 | 귀족'
const pageDescription = '반지 큐빅 빠짐 수리 전 착용을 멈춰야 하는 이유와 빠진 스톤 보관, 재사용·교체 판단, 세팅 발 점검, 종로 수리 상담 준비물을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/ring-cubic-stone-repair-hero.webp`
const publishedAt = '2026-07-14'

const faqItems = [
  {
    "question": "반지에서 빠진 큐빅을 찾았으면 다시 사용할 수 있나요?",
    "answer": "크기와 모양이 원래 자리에 맞고 가장자리 깨짐이나 표면 손상이 없다면 재사용을 검토할 수 있습니다. 다만 스톤만 보지 말고 이를 잡던 발과 세팅 자리까지 함께 확인해야 합니다."
  },
  {
    "question": "큐빅 하나만 빠졌는데 반지를 계속 착용해도 되나요?",
    "answer": "수리 전에는 착용을 멈추는 편이 좋습니다. 충격이나 변형으로 한 알이 빠졌다면 주변 세팅 발도 느슨해졌을 가능성이 있어 추가 손상을 배제하기 어렵습니다."
  },
  {
    "question": "빠진 큐빅을 순간접착제로 붙여도 되나요?",
    "answer": "권하지 않습니다. 접착제가 세팅 틈이나 스톤 뒷면에 남으면 이후 상태 확인과 재세팅 작업에 영향을 줄 수 있습니다. 반지와 스톤을 그대로 보관해 전문가에게 점검을 요청하세요."
  },
  {
    "question": "원래 큐빅을 잃어버렸어도 수리가 가능한가요?",
    "answer": "대체 스톤이 기존 세팅 자리에 맞는지는 크기와 높이, 컷 모양, 색감 등을 실물로 비교해 판단해야 합니다. 주변 스톤과 반지 세팅을 확인하기 전에는 가능 여부를 단정하기 어렵습니다."
  },
  {
    "question": "반지 큐빅 빠짐 수리 비용과 기간은 어떻게 정해지나요?",
    "answer": "스톤 보유 여부와 크기, 개수, 세팅 방식, 발 보강이나 금속 복원 필요 여부, 마감 범위에 따라 달라질 수 있습니다. 최종 견적과 작업 일정은 실물 점검과 상담 후 확인하세요."
  }
]

const quickAnswers = [
  "큐빅이 빠진 즉시 반지 착용을 멈추고, 찾은 스톤은 작은 지퍼백이나 뚜껑 있는 용기에 따로 보관하세요.",
  "한 알만 새로 넣는 것으로 끝내지 말고 빈 자리의 발, 주변 스톤의 흔들림, 반지 변형을 함께 점검해야 합니다.",
  "종로 수리 상담에는 반지 전체와 빠진 부위의 정면·측면 사진, 소재 각인, 수령 희망일을 준비하면 확인이 빨라집니다."
]

const sections = [
  {
    "title": "큐빅이 빠졌다면 먼저 착용을 멈추세요",
    "paragraphs": [
      "반지에서 작은 스톤이 빠진 것을 발견하면 우선 착용을 멈추는 편이 좋습니다. 세팅이 느슨해진 상태로 착용을 이어갈 경우, 남아 있는 스톤이나 세팅에 추가 손상이 생길 가능성을 배제하기 어렵습니다.",
      "빠진 큐빅을 찾았을 때는 반지의 빈 자리에 억지로 눌러 넣지 말고, 작은 지퍼백이나 뚜껑 있는 용기에 따로 보관해야 합니다. 반지와 스톤을 함께 가져가면 원래 자리에 맞는지 비교하는 데 도움이 됩니다."
    ],
    "bullets": [
      "반지를 바로 빼고 추가 착용 중단",
      "빠진 스톤은 작은 용기에 별도 보관",
      "빈 세팅을 칫솔이나 바늘로 건드리지 않기",
      "순간접착제나 투명 매니큐어를 사용하지 않기"
    ]
  },
  {
    "title": "빠진 원인과 세팅 전체를 확인합니다",
    "paragraphs": [
      "큐빅 빠짐은 스톤 자체의 문제에 또한, 스톤을 잡는 금속 구조와도 관련될 수 있습니다. 발과 보석 사이에 틈이 생겼거나 스톤이 세팅 자리에 제대로 안착하지 않은 경우가 있으며, 발이 느슨해지거나 마모 또는 파손된 상태일 수도 있습니다.",
      "빈 자리에 새 스톤만 넣기 전에 주변 발의 상태와 다른 스톤의 움직임을 확인하고, 반지의 변형도 함께 살펴야 합니다. 옷에 자주 걸렸거나 반지가 눌린 적이 있었다면 상담할 때 알려 주는 것이 좋습니다."
    ],
    "bullets": [
      "발과 스톤 사이의 틈",
      "세팅 자리에서 스톤이 움직이는지 여부",
      "발의 느슨함·마모·파손",
      "반지 몸체와 주변 세팅의 변형"
    ],
    "image": {
      "src": "/Image/guide/ring-cubic-stone-repair-section-2.webp",
      "alt": "빠진 원인과 세팅 전체를 확인합니다 예시 이미지",
      "caption": "빠진 원인과 세팅 전체를 확인합니다에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "찾은 스톤의 재사용과 교체를 구분합니다",
    "paragraphs": [
      "겉으로 멀쩡해 보이는 스톤이라도 찾은 뒤에는 가장자리와 뒷면에 손상이 있는지 확인해야 합니다. 크기와 모양이 원래 자리에 맞고 눈에 띄는 손상이 없을 때 재사용을 검토할 수 있지만, 스톤과 세팅을 함께 확인한 뒤 최종 판단을 정해야 합니다.",
      "스톤을 잃어버린 경우에는 주변 스톤과 어울리는 대체품인지 먼저 비교해야 합니다. 지름 외에도 높이, 컷 모양, 색감과 밝기가 세팅 자리에 맞는지 확인해야 하며, 반지와 스톤을 확인하기 전에는 실제 소재를 단정하지 않는 것이 좋습니다."
    ],
    "bullets": [
      "스톤의 지름과 높이 확인",
      "가장자리 깨짐과 표면 손상 확인",
      "주변 스톤과 크기·색감·밝기 비교",
      "새 스톤이 기존 세팅 자리에 안정적으로 앉는지 확인"
    ]
  },
  {
    "title": "재세팅과 발 보강의 범위를 상담합니다",
    "paragraphs": [
      "세팅 자리와 발의 상태가 양호하면 스톤을 다시 안착시키고 발을 조정하는 방법을 검토할 수 있습니다. 반대로 발이 닳거나 부러진 경우에는 상태에 따라 발 끝에 금속을 덧대거나 발 머리 전체를 교체하는 방법을 상담할 수 있습니다.",
      "작은 스톤이 촘촘히 배치된 반지에서는 한 자리의 발이 주변 스톤과 연결되어 있을 수 있습니다. 따라서 한 알만 보고 힘을 주기보다는 확대 점검을 하면서 주변 세팅의 상태까지 함께 확인하는 것이 안전합니다."
    ],
    "bullets": [
      "세팅 상태가 양호한 경우 재세팅 검토",
      "느슨한 발은 조정 가능 여부 확인",
      "마모 정도에 따라 금속 덧대기 또는 발 머리 교체 검토",
      "주변 스톤의 흔들림과 걸림 여부 확인"
    ],
    "image": {
      "src": "/Image/guide/ring-cubic-stone-repair-section-4.webp",
      "alt": "현미경 아래에서 금반지의 작은 큐빅 세팅 발을 점검하는 주얼리 작업",
      "caption": "빠진 한 알뿐 아니라 주변 발과 세팅 상태를 함께 확인하는 과정입니다."
    }
  },
  {
    "title": "종로 수리 상담 전에 사진과 정보를 준비하세요",
    "paragraphs": [
      "사진 상담을 받을 때는 반지 전체 정면과 빠진 부위 확대, 옆면 높이, 안쪽 소재 각인을 나누어 촬영하는 것이 좋습니다. 빠진 스톤을 보관하고 있다면 반지와 함께 가져가야 하지만, 사진만으로 최종 규격과 수리 범위를 확정하기는 어렵습니다.",
      "구입 시기와 착용 중 걸림이나 충격이 있었는지, 이전에 같은 부위를 수리했는지도 함께 전달하세요. 수리 전에는 세팅과 발 상태에 대한 설명을 듣고 견적과 작업 범위를 확인한 뒤 의뢰하는 것이 좋습니다."
    ],
    "bullets": [
      "반지 전체 정면 사진",
      "빈 세팅의 정면·측면 확대 사진",
      "안쪽 소재 각인 사진",
      "찾은 스톤의 보관 여부",
      "이전 수리 이력과 수령 희망일"
    ]
  }
]

const cautions = [
  "빠진 자리에 접착제를 사용하면 스톤과 세팅 틈이 오염되어 이후 작업에 영향을 줄 수 있습니다.",
  "한 알이 빠진 원인이 반지 변형이나 발 마모라면 주변 스톤도 느슨할 수 있으므로 수리 전 착용을 중단하세요.",
  "사진만으로 스톤 종류와 미세한 손상, 세팅 발의 상태를 확정하기 어려우므로 최종 견적과 작업 범위에는 실물 확인이 필요합니다."
]

const relatedLinks = [
  {
    "to": "/guide/gold-ring-repair-cost",
    "label": "금반지 수리 비용, 작업별 상담 기준",
    "description": "귀금속 수리 범위와 견적 상담 전에 확인할 항목을 정리한 가이드입니다."
  },
  {
    "to": "/guide/jongno-ring-size-repair",
    "label": "종로 반지 사이즈 줄이기·늘리기, 맡기기 전 확인할 것",
    "description": "반지 소재와 보석 세팅에 따른 사이즈 수리 상담 기준을 확인할 수 있습니다."
  },
  {
    "to": "/guide/necklace-bracelet-chain-repair",
    "label": "금목걸이·팔찌 체인 수리, 끊어짐 전 확인할 것",
    "description": "체인과 접합부 상태에 따른 귀금속 수리 상담 기준을 정리한 가이드입니다."
  },
  {
    "to": "/guide/gold-plating-repair",
    "label": "금반지·화이트골드 도금 수리, 변색·광택 상담 전 기준",
    "description": "도금과 광택을 함께 상담할 때 확인할 표면 상태와 마감 범위를 안내합니다."
  }
]

const updatedAt = '2026-08-10'
// guide-manager:data:start
const gmArticleTitle = '반지 큐빅 빠짐 수리, 종로에 맡기기 전 확인할 것'
const gmArticleLead = '반지 큐빅 빠짐 수리는 빈 자리에 새 스톤 하나를 넣는 것으로 끝나지 않을 수 있습니다. 먼저 빠진 큐빅의 상태와 재사용 여부를 살피고, 세팅 발의 마모·느슨함과 주변 스톤의 흔들림, 반지 변형까지 확인한 뒤 수리 범위를 상담하는 것이 좋습니다.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '반지 큐빅 빠짐 수리'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '반지 큐빅 빠짐 수리'
const gmHeroAlt = '작은 큐빅 한 알이 빠진 금반지와 따로 보관한 스톤을 수리 전에 확인하는 모습'
const gmSourceNote = '큐빅 빠짐 후 착용 중단, 세팅 발과 보석의 상태 점검, 발 조정과 금속 보강 방법, 수리 전 점검과 견적 확인에 관한 내용은 아래 공식 보석 교육 기관과 업계 기관 자료를 참고했습니다. 가격과 작업 기간, 실제 수리 가능 여부는 제품 상태와 상담 결과에 따라 달라질 수 있습니다.'
const gmSources = [
  {
    "label": "GIA, Bench Tip #10: Use Vector Tightening to Overcome Metal Memory in Prongs",
    "url": "https://my.gia.edu/gia-website/bench-tip-use-vector-tightening-to-overcome-metal-memory-in-prongs",
    "note": "느슨해진 보석과 발톱 조정의 원리, 세팅이 느슨한 상태에서 발생할 수 있는 보석·세팅 손상 위험을 설명합니다."
  },
  {
    "label": "GIA, Bench Tip 17: Avoid Stone Loss with Quality Assurance Benchmarks",
    "url": "https://www.gia.edu/bench-tip-avoid-stone-loss-with-quality-assurance-benchmarks",
    "note": "발톱과 보석 사이의 틈, 부적절한 안착 등으로 보석이 움직이거나 빠질 수 있음을 설명합니다."
  },
  {
    "label": "Jewelers of America, Jewelry Repair",
    "url": "https://www.jewelers.org/buying-jewelry/jewelry-repair-and-care/jewelry-repair",
    "note": "발톱 조정, 금속 덧대기, 발톱 머리 교체와 수리 전 점검·견적·고객 허가 절차를 설명합니다."
  },
  {
    "label": "GIA, More than the Mohs Scale: Understanding Gem Durability",
    "url": "https://4cs.gia.edu/en-us/blog/more-than-mohs-scale-gem-durability/",
    "note": "느슨한 보석이 세팅 금속 발을 손상시키고 빠질 수 있으며 발 상태를 확인해야 한다고 설명합니다."
  },
  {
    "label": "GIA, Bench Tip #18: How To Modify a Wooden Ring Clamp",
    "url": "https://www.gia.edu/articles/bench-tip-how-to-modify-wooden-ring-clamp",
    "note": "세팅 작업 중 공구가 미끄러지면 보석이나 발톱이 손상될 수 있음을 설명합니다."
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
        { name: '반지 큐빅 빠짐 수리', path: pagePath },
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
