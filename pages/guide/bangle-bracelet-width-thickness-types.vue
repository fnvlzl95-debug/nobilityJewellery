<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/bangle-bracelet-width-thickness-types'
const pageTitle = '뱅글팔찌 종류와 두께, 폭부터 구분하기 | 귀족'
const pageDescription = '뱅글팔찌를 고를 때는 정면에서 보이는 폭과 옆면의 두께를 따로 확인하세요. 닫힌 고리형·힌지형·오픈형의 특징, 원형·타원형과 단면의 차이를 설명하고 원하는 볼륨과 구조로 구매·제작 상담하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/bangle-bracelet-width-thickness-types-hero-6f7d34a3.webp`
const publishedAt = '2026-09-30'
const updatedAt = ''
const faqItems = [
  {
    "question": "뱅글팔찌 폭과 두께는 같은 말인가요?",
    "answer": "구분해서 확인하는 것이 좋습니다. 띠의 정면 너비와 옆면에서 보이는 높이는 서로 다를 수 있으므로, 판매처가 어느 위치를 잰 값인지 사진과 설명으로 확인하세요."
  },
  {
    "question": "힌지형 뱅글은 닫힌 고리형과 무엇이 다른가요?",
    "answer": "힌지형은 경첩을 중심으로 열고 닫을 수 있습니다. 별도 입구가 없는 닫힌 고리형은 손을 통과시켜 착용하므로, 닫힌 사진만 보지 말고 실제 여닫는 방식을 확인하세요."
  },
  {
    "question": "중공 뱅글은 겉이 두꺼워도 속이 비어 있나요?",
    "answer": "중공은 안에 빈 공간이 있는 구조를 뜻합니다. 겉에서 보이는 두께와 그 공간을 둘러싼 금속 벽의 두께는 다르므로 속 구조를 별도로 문의하세요."
  },
  {
    "question": "뱅글팔찌 두께는 어느 정도가 적당한가요?",
    "answer": "모든 뱅글에 적용되는 단일 기준으로 정하기 어렵습니다. 원하는 폭과 옆면 볼륨을 나누어 고르고, 실제 후보로 손목을 굽히거나 평소 자세를 취해 착용 상태를 비교하세요."
  },
  {
    "question": "둥근 뱅글이라고 하면 원형 팔찌를 뜻하나요?",
    "answer": "전체 고리의 윤곽이 원형이라는 뜻일 수도 있고 띠의 단면이 둥글다는 뜻일 수도 있습니다. 전체 윤곽과 단면 모양을 각각 설명하면 원하는 형태를 더 정확히 전달할 수 있습니다."
  }
]
const quickAnswers = [
  "넓어 보이는 뱅글과 옆면이 두꺼운 뱅글은 같은 뜻이 아닙니다. 폭·옆면 두께·안쪽 치수를 각각 확인하세요.",
  "개폐 방식과 모양은 별개의 기준입니다. 타원형이면서 힌지형일 수도 있고, 둥근 윤곽이면서 평평한 띠 모양일 수도 있습니다.",
  "두꺼워 보이는 외형만으로 금속의 양이나 튼튼함을 판단하지 마세요. 속 구조와 실제 착용 상태까지 살펴야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "뱅글팔찌의 두께와 폭은 어떻게 다른가요?",
    "paragraphs": [
      "폭은 손목 위에서 보이는 띠의 너비, 옆면 두께는 안쪽 면에서 바깥 면까지 솟아 있는 높이로 나누어 생각하면 쉽습니다. 예를 들어 넓고 납작한 띠는 정면의 존재감이 커도 옆면은 낮을 수 있고, 좁고 둥근 봉 형태는 정면이 가늘어도 옆에서 볼륨이 보일 수 있습니다.",
      "다만 판매처가 “폭”이나 “두께”를 표시하는 위치는 제품에 따라 다를 수 있습니다. 사진에서 어느 두 지점 사이를 잰 값인지 확인하세요. 특히 뱅글 전체의 가로 크기와 띠 자체의 너비를 같은 항목으로 비교하지 않는 것이 중요합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "구분할 항목",
        "어디를 보는가요?",
        "고를 때 도움이 되는 질문"
      ],
      "rows": [
        [
          "띠의 폭",
          "정면에서 보이는 띠 자체의 너비",
          "손목 위에서 어느 정도 넓게 보이기를 원하나요?"
        ],
        [
          "옆면 두께",
          "안쪽 면에서 바깥쪽으로 올라온 높이",
          "옆에서 납작한 모습인가요, 볼록한 모습인가요?"
        ],
        [
          "중공 구조의 금속 벽",
          "속이 빈 부분을 둘러싼 금속",
          "겉두께와 별도로 속 구조를 설명받을 수 있나요?"
        ],
        [
          "안쪽 치수",
          "손목이 놓이는 고리 안의 공간",
          "착용 공간의 크기와 윤곽이 무엇인가요?"
        ]
      ]
    }
  },
  {
    "title": "뱅글팔찌 종류는 어떻게 나누면 되나요?",
    "paragraphs": [
      "뱅글은 체인처럼 유연하게 늘어지는 팔찌와 달리 고리 형태를 유지하는 팔찌를 가리킵니다. Pandora도 이 점을 설명하며, 손을 통과시켜 끼는 형태와 경첩·잠금장치가 있는 형태를 구분합니다. 금속 색이나 장식보다 여닫는 방식을 먼저 보면 종류를 이해하기 쉽습니다.",
      "닫힌 고리형은 별도의 입구를 열지 않고 손을 통과시켜 착용하는 형태입니다. 힌지형은 경첩을 중심으로 열고 닫는 형태로, 닫힌 모습만 보면 고리형과 비슷해 보일 수 있습니다. 구매 사진에는 잠금 부분과 열린 모습도 함께 요청해 보세요.",
      "오픈형·커프형은 양끝 사이에 틈이 있는 형태입니다. 판매명에 “오픈 뱅글”이나 “커프 뱅글”이 함께 쓰이기도 하므로 이름만으로 구조를 확정하지 마세요. 열린 틈이 있다고 해서 자유롭게 벌려도 된다는 의미는 아니며, 커프의 자세한 착용 기준은 별도 가이드를 참고할 수 있습니다."
    ],
    "bullets": [
      "닫힌 고리형: 손을 통과시키는 구조인지 확인",
      "힌지형: 경첩과 잠금 부품, 열린 모습을 확인",
      "오픈형·커프형: 끝의 틈과 제조사가 안내하는 탈착 방법 확인"
    ],
    "table": null
  },
  {
    "title": "원형·타원형과 둥근 단면은 같은 뜻인가요?",
    "paragraphs": [
      "“둥근 뱅글”이라는 말은 전체 고리의 윤곽이 원형이라는 뜻일 수도 있고, 띠를 잘랐다고 생각했을 때 단면이 둥근 봉 모양이라는 뜻일 수도 있습니다. 전체 윤곽과 띠의 단면을 따로 설명하면 상담에서 혼동을 줄일 수 있습니다.",
      "전체 윤곽은 위에서 내려다보았을 때 원에 가까운지, 길쭉한 타원에 가까운지를 봅니다. 단면은 평평한 띠처럼 보이는지, 둥근 봉처럼 보이는지, 안쪽은 비교적 평평하고 바깥쪽이 볼록한 돔 형태인지 구분해 보세요. 단면의 둥글기만으로 안쪽 윤곽을 알 수는 없습니다.",
      "가령 “전체는 타원형이고, 윗면은 평평한 넓은 띠에 가깝게 원합니다” 또는 “닫힌 원형 고리에 둥근 봉 같은 단면이 좋습니다”라고 설명할 수 있습니다. 이런 조합은 모양을 전달하기 위한 예시이며, 실제 제작 가능한 형태는 디자인별로 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "두꺼운 뱅글은 무겁고 튼튼한가요?",
    "paragraphs": [
      "겉으로 보이는 부피만으로 무게나 내부 구조를 정할 수는 없습니다. Stuller의 힌지형 뱅글 제품 사례에는 폭·중량과 별도로 속 구조가 Hollow, 즉 중공으로 표시되어 있습니다. 외형의 크기와 속 구조는 따로 확인할 항목이라는 점을 보여 주는 사례입니다.",
      "중공형에서 보이는 겉두께에는 빈 공간도 포함됩니다. 따라서 옆면이 도톰해 보인다는 말과 금속 벽이 두껍다는 말은 다릅니다. 사진으로 금속 벽의 두께를 추정하거나, 비슷한 외형의 제품을 같은 무게라고 가정하지 마세요.",
      "내구성도 두꺼워 보이는 사진 하나로 비교하기 어렵습니다. 후보의 소재·속 구조·잠금 부분과 사용 시 주의점을 함께 물어보세요. 넓은 폭을 원하는지, 볼록한 옆모습을 원하는지, 실제 손에 느껴지는 무게감을 원하는지 나누어 설명하면 선택이 더 구체적입니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "내게 맞는 뱅글 두께와 종류는 어떻게 고르나요?",
    "paragraphs": [
      "먼저 원하는 인상을 정한 뒤 실물에서 평소 동작을 해보세요. 손목 위에서 넓게 보이는 것이 좋은지, 옆에서 둥근 볼륨이 보이는 것이 좋은지 선택하고, 손목을 굽히거나 소매를 통과시킬 때 어디가 닿는지 확인합니다. 책상에 손을 올리는 일이 많다면 그 자세에서도 비교해 보세요.",
      "폭이나 두께의 숫자 하나를 모든 사람에게 맞는 기준으로 삼기보다, 비슷한 형태의 후보를 같은 조건에서 비교하는 편이 좋습니다. 새로 재는 손목 치수나 고리 안쪽 크기는 별도의 사이즈 가이드를 참고하고, 이번에는 정면·옆면 사진에서 원하는 부분을 표시해 두세요.",
      "귀족 카카오톡에 원하는 개폐 방식·정면의 폭 느낌·옆면 볼륨·원형 또는 타원형 선호·평소 착용 상황·예산·희망일을 보내 주세요. “힌지로 열리는 뱅글을 원하고, 정면은 넓게 보이되 옆면은 낮은 느낌이 좋습니다. 속 구조와 가능한 디자인을 함께 상담하고 싶어요”처럼 문의할 수 있습니다.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 참고 사진과 함께 구매·주문제작 가능 범위를 문의해 주세요. 최종 형태와 견적·일정은 상담에서 확인합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "판매처마다 치수 명칭과 측정 위치가 다를 수 있습니다. 같은 “두께”라는 표현도 어디를 잰 값인지 확인하세요.",
  "겉모습만으로 속 구조·무게·내구성을 단정하지 마세요. 종류별 착용 방법과 관리 조건은 해당 제품의 안내를 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "뱅글팔찌 구매·제작 상담",
    "description": "원하는 폭과 옆면, 개폐 방식을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "팔찌 디자인 참고하기",
    "description": "마음에 드는 형태를 사진으로 골라 보세요."
  },
  {
    "to": "/guide/bracelet-size-measuring-guide",
    "label": "팔찌와 뱅글 사이즈 재는 법",
    "description": "손목 치수와 제품 안쪽 치수를 확인하세요."
  },
  {
    "to": "/guide/gold-cuff-bracelet-buying-guide",
    "label": "오픈형 커프 팔찌 선택과 착용",
    "description": "열린 끝이 있는 커프의 착용 기준을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '뱅글팔찌 종류와 두께, 폭부터 구분하기'
const gmArticleLead = '뱅글팔찌의 두께를 고를 때는 정면에서 보이는 띠의 폭과 옆면에서 보이는 높이를 먼저 구분하세요. 팔찌 종류는 닫힌 고리형인지, 경첩으로 열리는 힌지형인지, 끝이 열린 오픈형인지 나누어 보면 쉽습니다. 여기에 안쪽 윤곽과 단면, 속 구조를 함께 확인해야 원하는 모양을 정확히 설명할 수 있습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '뱅글팔찌 두께'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '뱅글팔찌 종류와 폭·두께 선택'
const gmHeroAlt = '밝은 리넨 위 금빛 뱅글 두 개로, 왼쪽은 가는 둥근 봉 형태이고 오른쪽은 평평한 띠 형태인 비교 예시'
const gmHeroCaption = '폭과 형태를 비교하기 위한 예시 이미지입니다. 실제 판매 제품 사진이나 치수 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '뱅글의 기본 형태와 개폐 방식은 Pandora 안내, 중공 구조의 제품 표기는 Stuller 사례를 참고했습니다. 폭·옆면·안쪽 공간을 나누는 비교 방법과 상담 예시는 구매 준비를 위한 제안입니다.'
const gmSources = [
  {
    "label": "Pandora — 뱅글과 커프 팔찌 안내",
    "url": "https://us.pandora.net/en/blog/what-is-a-bangle-and-cuff-bracelet/",
    "note": "뱅글의 형태와 제품별 여닫는 방식의 차이를 설명합니다."
  },
  {
    "label": "Stuller — 힌지형 중공 뱅글 제품 사례",
    "url": "https://www.stuller.com/products/brc690/3065912/?groupId=107945",
    "note": "폭·중량과 별도로 중공 구조를 표기한 힌지형 뱅글 사례입니다."
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
