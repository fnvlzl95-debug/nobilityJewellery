<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/cufflinks-shirt-fastening-selection'
const pageTitle = '커프스 버튼, 셔츠 소매에 맞춰 고르기 | 귀족'
const pageDescription = '커프스 버튼은 셔츠 소매의 구멍을 연결하는 장식입니다. 모든 셔츠에 맞는 것은 아니므로 소매 구조부터 확인하세요. 회전바·체인 연결식의 차이와 선물·주문제작 상담에 필요한 사진을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/cufflinks-shirt-fastening-selection-hero-7d436939.webp`
const publishedAt = '2026-10-07'
const updatedAt = ''
const faqItems = [
  {
    "question": "커프스 버튼과 커프링크는 다른 물건인가요?",
    "answer": "이 글에서는 셔츠 소매의 구멍을 연결해 여미는 장식을 뜻하는 말로 사용합니다. 셔츠에 실로 달린 일반 단추와는 사용 구조가 다릅니다."
  },
  {
    "question": "일반 셔츠에도 커프스 버튼을 끼울 수 있나요?",
    "answer": "모든 셔츠에 사용할 수 있는 것은 아닙니다. 소매 양쪽의 구멍과 여밈 구조를 확인하고, 커프링크용으로 사용할 수 있는지 셔츠 판매처에 문의하세요."
  },
  {
    "question": "커프스 버튼은 모두 뒷부분을 돌려서 잠그나요?",
    "answer": "아닙니다. 회전바 방식 외에 체인 연결식과 고정형 등이 있습니다. 돌아가지 않는 부품을 억지로 돌리지 말고 제품별 사용 방법을 확인하세요."
  },
  {
    "question": "선물용 커프스에 이니셜을 넣으려면 무엇이 필요한가요?",
    "answer": "원하는 문구와 위치, 양쪽에 같은 내용을 넣을지 여부, 착용했을 때 읽히는 방향을 준비하세요. 선택한 디자인에서 표현 가능한 범위와 일정은 상담 후 확인합니다."
  }
]
const quickAnswers = [
  "커프스 버튼은 셔츠에 달린 단추와 사용 구조가 다릅니다. 소매 양쪽에 커프링크가 통과할 구멍이 있는지 먼저 보세요.",
  "회전바 방식은 뒷바를 돌려 고정하고, 체인 연결식은 앞뒤 부품을 짧은 체인으로 잇습니다. 앞면 사진만으로는 구별하기 어렵습니다.",
  "선물·맞춤 제작 문의에는 셔츠 소매 안팎과 원하는 장식의 앞뒤 사진을 준비하세요. 특정 잠금 방식이나 각인의 구현 가능 여부는 별도로 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "커프스 버튼은 어떤 셔츠에 사용하나요?",
    "paragraphs": [
      "소매 양쪽에 커프링크용 구멍이 있는 셔츠인지 확인하세요. Deakin & Francis는 소매를 접어 사용하는 프렌치 커프, 즉 더블 커프 셔츠를 대표적인 착용 대상으로 안내합니다. 셔츠에 붙어 있는 단추를 여미는 방식과는 다릅니다.",
      "셔츠 이름만 듣고 구매하기보다 소매를 펼친 안쪽과 바깥쪽 사진을 확인하는 편이 좋습니다. 커프링크를 넣을 구멍이 서로 마주 보는지, 해당 셔츠가 어떤 방식으로 여미도록 만들어졌는지 판매처에 물어보세요.",
      "커프스 버튼을 쓰려고 기존 단추를 먼저 떼거나 소매에 구멍을 내지 마세요. 호환 여부가 불분명하면 셔츠부터 확인한 다음 장식을 고르는 순서가 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "회전바와 체인 연결식은 무엇이 다른가요?",
    "paragraphs": [
      "회전바 방식은 구멍을 통과시킨 뒤 뒷바를 돌려 소매 뒤에 걸리게 하는 구조입니다. 체인 연결식은 앞 장식과 뒤쪽 부품을 짧은 체인으로 연결합니다. Longmire도 이 두 구조를 구분하며, 어느 쪽이 항상 우수하기보다 착용 방식과 선호가 다르다고 설명합니다.",
      "고정형처럼 회전하는 부품이 없는 제품도 있습니다. 모든 커프스 버튼의 뒷부분이 돌아간다고 생각하지 말고, 구매할 제품의 실제 잠금 사진과 사용 설명을 확인하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "방식",
        "구조의 차이",
        "구매 전에 확인할 점"
      ],
      "rows": [
        [
          "회전바·T바",
          "기둥 끝의 바를 돌려 소매 뒤에 고정",
          "바가 어떻게 움직이고 닫히는지"
        ],
        [
          "체인 연결식",
          "앞뒤 부품이 짧은 체인으로 연결",
          "뒤쪽 부품을 소매 구멍에 넣는 방법"
        ],
        [
          "고정형",
          "회전 잠금 대신 고정된 뒤쪽 장식을 사용",
          "기울여 넣는 방향과 해당 셔츠와의 호환"
        ]
      ]
    }
  },
  {
    "title": "장식 크기와 소재는 무엇을 보고 고르나요?",
    "paragraphs": [
      "장식만 확대한 사진보다 실제 소매에 놓인 비례를 먼저 보세요. Longmire는 모든 사람에게 맞는 하나의 정답 크기가 있는 것은 아니며 소매와의 균형이 중요하다고 설명합니다. 같은 타원형이라도 소매 위에서 차지하는 면적과 옆으로 돌출되는 모습은 제품마다 다를 수 있습니다.",
      "구매 후보를 착용해 볼 수 있다면 입을 셔츠와 재킷을 함께 준비하세요. 팔을 자연스럽게 내렸을 때 보이는 정도, 팔을 굽혔을 때 소매 안쪽에서 누르는 부분, 시계와 맞닿는 부분을 확인해 보세요. 이 과정은 특정 크기를 일률적으로 추천하기 위한 것이 아니라 나에게 불편한 조합을 찾기 위한 것입니다.",
      "금빛이나 은빛은 겉으로 보이는 색을 설명할 뿐입니다. 앞 장식과 뒷 잠금의 소재, 도금 여부와 관리 안내는 해당 제품 설명에서 따로 확인하세요. 소재에 관한 정보가 없는 사진만으로 금이나 은 제품이라고 판단하지 않는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "커프스 선물이나 각인은 무엇부터 정하나요?",
    "paragraphs": [
      "선물이라면 받는 분이 커프링크를 사용할 셔츠를 갖고 있는지부터 확인하세요. 예식에서 사용할 예정이면 본식에 입을 셔츠를 기준으로, 평소 정장용이라면 자주 입는 셔츠를 기준으로 후보를 좁혀 보세요. 디자인이 마음에 들어도 맞는 셔츠가 없으면 바로 착용하기 어렵습니다.",
      "각인을 원한다면 앞면에 보이게 넣을지, 뒤쪽에 작게 남기고 싶은지 적어 보세요. 양쪽에 같은 내용을 넣을지 서로 다른 내용을 나눌지, 소매에 착용했을 때 글자가 어느 방향으로 읽히길 원하는지도 사진에 표시하면 상담에 도움이 됩니다.",
      "작은 장식에는 선택한 면과 잠금 구조에 따라 표현할 수 있는 공간이 달라집니다. 문구를 확정하기 전에 배치안을 확인하고, 사용하려는 그림이나 글자가 해당 디자인에서 가능한지 문의하세요. 예시 사진만으로 각인 방식이나 제작 가능 범위가 정해지는 것은 아닙니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 커프스 버튼 상담은 어떻게 준비하나요?",
    "paragraphs": [
      "귀족에 문의할 때는 입을 셔츠의 소매 안팎 사진, 원하는 장식의 정면과 뒷면 사진, 선물 또는 본인 착용 여부를 함께 보내 주세요. 뒷면을 찾을 수 없다면 모르는 부분을 추측해 정하기보다 잠금 방식을 비교하고 싶다고 적어 주세요.",
      "“예식 때 입을 셔츠에 쓸 커프스 버튼을 찾습니다. 앞면은 단순한 타원형이 좋고, 혼자 여미기 편한 잠금을 비교하고 싶습니다”처럼 사용 장면과 선호를 함께 설명할 수 있습니다. 소재·색상 선호, 예산과 희망 수령일도 알려 주세요.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 홈페이지의 신랑 예물 상담 범위에 커프스가 포함돼 있으며, 준비 가능한 디자인과 구매·제작 범위는 상담에서 확인합니다. 특정 잠금 부품의 보유 여부, 각인과 완성 일정도 실제 후보를 검토한 뒤 확인하세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "잠금 구조가 움직이지 않을 때 억지로 비틀거나 공구로 벌리지 마세요. 고정형인지 작동형인지 해당 제품 설명부터 확인하세요.",
  "참고 이미지와 외부 브랜드의 설명은 구조를 이해하기 위한 자료입니다. 귀족의 판매 재고나 동일 제품의 제작 가능 여부를 뜻하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "커프스 버튼 디자인 상담",
    "description": "셔츠 소매와 원하는 장식 사진을 함께 준비해 주세요."
  },
  {
    "to": "/wedding",
    "label": "신랑 예물 상담 범위 보기",
    "description": "예식 때 착용할 품목을 필요한 만큼 정해 보세요."
  },
  {
    "to": "/guide/wedding-jewelry-set-composition",
    "label": "결혼예물 구성 정하기",
    "description": "커프스와 함께 준비할 예물의 범위를 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '커프스 버튼, 셔츠 소매에 맞춰 고르기'
const gmArticleLead = '커프스 버튼은 셔츠 소매 양쪽의 구멍을 연결해 여미는 장식으로, 커프링크라고도 부릅니다. 구매 전에는 입을 셔츠에 사용할 수 있는지 확인하고, 앞면 디자인과 뒷면 잠금 방식을 함께 고르세요. 선물용이라면 받는 분이 입는 셔츠와 착용할 자리를 먼저 알아두는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '커프스 버튼'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '커프스 버튼 셔츠 호환과 디자인 선택'
const gmHeroAlt = '흰 셔츠 원단 위 금빛 타원형 커프스 버튼 한 쌍의 앞 장식과 옆에서 본 뒷 잠금 구조'
const gmHeroCaption = '커프스 버튼의 앞 장식과 뒷 잠금을 살펴보기 위한 디자인 예시입니다. 실제 판매 제품 사진이나 부품 규격도가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '커프링크의 용도와 잠금 구조는 Deakin & Francis와 Longmire의 브랜드 원문을 참고했습니다. 셔츠 사진 준비, 착용 비교와 각인 배치 확인은 구매 상담을 위한 제안입니다.'
const gmSources = [
  {
    "label": "Deakin & Francis — 커프링크 착용과 잠금 종류",
    "url": "https://deakinandfrancis.com/blogs/news/how-to-wear-cufflinks",
    "note": "커프링크의 용도와 대표적인 잠금 구조를 설명하는 제조 브랜드 자료입니다."
  },
  {
    "label": "Longmire — 체인·T바 구조와 소매 비례",
    "url": "https://www.longmire.co.uk/blogs/news/how-to-choose-cufflinks-a-buyers-guide-to-fittings-materials-and-fit",
    "note": "체인 연결식과 회전바, 소매와 장식의 비례를 설명하는 브랜드 구매 안내입니다."
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
