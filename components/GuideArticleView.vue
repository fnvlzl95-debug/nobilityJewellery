<script setup lang="ts">
import { siteConfig } from '~/config/site'

interface ArticleSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
  image?: {
    src: string
    alt: string
    caption: string
  }
}

interface RelatedLink {
  to: string
  label: string
  description: string
}

interface FAQItem {
  question: string
  answer: string
}

const props = withDefaults(defineProps<{
  category: string
  title: string
  lead: string
  keyword: string
  inquiryType?: 'custom' | 'repair' | 'wholesale' | 'other'
  inquiryTopic?: string
  publishedAt: string
  updatedAt?: string
  heroImage: string
  heroAlt: string
  quickAnswers: string[]
  sections: ArticleSection[]
  cautions?: string[]
  faqItems?: FAQItem[]
  relatedLinks: RelatedLink[]
}>(), {
  inquiryType: 'custom',
  inquiryTopic: '',
})

const { trackPhoneClick, trackKakaoClick, trackInquiryClick } = useGtag()

const sectionAnchor = (index: number) => `sec-${index + 1}`
const formatSectionIndex = (index: number) => String(index + 1).padStart(2, '0')
const inquiryActionLabel = computed(() => {
  if (props.inquiryType === 'repair') return '수리 문의'
  if (props.inquiryType === 'wholesale') return '도매 상담'
  if (props.inquiryType === 'other') return '매입 문의'
  return '주문 상담'
})
const contactLink = computed(() => ({
  path: '/contact',
  query: {
    type: props.inquiryType,
    source: 'guide_article',
    topic: props.inquiryTopic || props.keyword,
  },
}))

const handlePhoneClick = () => {
  trackPhoneClick('guide_article', {
    placement: 'section_cta',
    intent: props.inquiryType,
    topic: props.inquiryTopic || props.keyword,
  })
}

const handleKakaoClick = () => {
  trackKakaoClick('guide_article', {
    placement: 'section_cta',
    intent: props.inquiryType,
    topic: props.inquiryTopic || props.keyword,
  })
}

const handleInquiryClick = () => {
  trackInquiryClick('guide_article', {
    placement: 'section_cta',
    intent: props.inquiryType,
    topic: props.inquiryTopic || props.keyword,
  })
}
</script>

<template>
  <div class="guide-page">
    <CustomCursor />

    <div class="guide-wrap">
      <NuxtLink to="/guide" class="guide-back">
        <span aria-hidden="true">←</span> 귀금속 가이드 전체보기
      </NuxtLink>

      <header class="guide-hero">
        <p class="guide-category">{{ props.category }}</p>
        <h1 class="guide-title">{{ props.title }}</h1>
        <p class="guide-lead">{{ props.lead }}</p>
        <div class="guide-meta">
          <span>{{ props.publishedAt }} 작성</span>
          <span v-if="props.updatedAt && props.updatedAt !== props.publishedAt">{{ props.updatedAt }} 업데이트</span>
        </div>
        <img :src="props.heroImage" :alt="props.heroAlt" class="guide-hero-image" loading="eager">
      </header>

      <section class="quick-answer">
        <h2>먼저 확인하세요</h2>
        <ul>
          <li v-for="answer in props.quickAnswers" :key="answer">{{ answer }}</li>
        </ul>
      </section>

      <div class="guide-cta-inline">
        <span class="guide-cta-inline-label">{{ props.inquiryTopic || props.keyword }} {{ inquiryActionLabel }}</span>
        <div class="guide-cta-inline-links">
          <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="cta-pill cta-pill-primary" @click="handleKakaoClick">
            카톡 상담
          </a>
          <a :href="`tel:${siteConfig.phone}`" class="cta-pill" @click="handlePhoneClick">
            전화
          </a>
          <NuxtLink :to="contactLink" class="cta-pill" @click="handleInquiryClick">
            문의 남기기
          </NuxtLink>
        </div>
      </div>

      <nav class="guide-toc" aria-label="문서 목차">
        <p class="guide-toc-label">목차</p>
        <ol>
          <li v-for="(section, index) in props.sections" :key="section.title">
            <a :href="`#${sectionAnchor(index)}`">{{ section.title }}</a>
          </li>
        </ol>
      </nav>

      <article class="guide-article">
        <section
          v-for="(section, index) in props.sections"
          :id="sectionAnchor(index)"
          :key="section.title"
          class="article-section"
        >
          <h2 class="article-section-title">
            <span class="article-section-index">{{ formatSectionIndex(index) }}</span>
            {{ section.title }}
          </h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets?.length" class="article-bullets">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <figure v-if="section.image" class="article-image">
            <img :src="section.image.src" :alt="section.image.alt" loading="lazy">
            <figcaption>{{ section.image.caption }}</figcaption>
          </figure>
        </section>
      </article>

      <section v-if="props.cautions?.length" class="guide-caution">
        <h2>알아두시면 좋아요</h2>
        <ul>
          <li v-for="caution in props.cautions" :key="caution">{{ caution }}</li>
        </ul>
      </section>

      <section v-if="props.faqItems?.length" class="guide-faq">
        <h2>자주 묻는 질문</h2>
        <div class="guide-faq-list">
          <article v-for="item in props.faqItems" :key="item.question" class="guide-faq-item">
            <h3>Q. {{ item.question }}</h3>
            <p>A. {{ item.answer }}</p>
          </article>
        </div>
      </section>

      <section class="guide-related">
        <h2>함께 보면 좋은 페이지</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="link in props.relatedLinks"
            :key="link.to"
            :to="link.to"
            class="related-card"
          >
            <strong>{{ link.label }}</strong>
            <span>{{ link.description }}</span>
          </NuxtLink>
        </div>
      </section>

      <section class="guide-bottom-cta">
        <h2>이것만 알려주시면 상담이 빨라져요</h2>
        <p>예산 범위, 희망 수령일, 원하는 스타일(사진도 좋아요) — 이 세 가지만 미리 정해두시면 훨씬 수월합니다.</p>
        <div class="guide-bottom-links">
          <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" @click="handleKakaoClick">카톡으로 {{ inquiryActionLabel }}</a>
          <a :href="`tel:${siteConfig.phone}`" @click="handlePhoneClick">전화로 문의하기</a>
          <NuxtLink :to="contactLink" @click="handleInquiryClick">문의 남기기</NuxtLink>
        </div>
      </section>

      <NuxtLink to="/guide" class="guide-back-bottom">
        <span aria-hidden="true">←</span> 가이드 목록으로 돌아가기
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fafafa;
  padding: 120px 20px 80px;
  /* 본문은 고딕(Pretendard)으로 — 장문 가독성, 제목은 아래에서 명조로 환원 */
  font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic', 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 17px;
  /* 장문 가독성: 글자 다듬기 켜고, 한글은 어절 단위로 줄바꿈 */
  text-rendering: optimizeLegibility;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* 읽기 좋은 단일 컬럼(한 줄 ~40자) */
.guide-wrap {
  max-width: 720px;
  margin: 0 auto;
}

/* 목록으로 돌아가기 (상단 빵부스러기) */
.guide-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  color: rgba(250, 250, 250, 0.65);
  text-decoration: none;
  transition: color 0.2s ease;
}

.guide-back:hover {
  color: #c9a227;
}

/* 목록으로 돌아가기 (하단 버튼) */
.guide-back-bottom {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 36px;
  padding: 12px 20px;
  border: 1px solid rgba(201, 162, 39, 0.45);
  color: #fafafa;
  text-decoration: none;
  font-size: 14px;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.guide-back-bottom:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.12);
  color: #c9a227;
}

.guide-hero {
  margin-bottom: 36px;
}

.guide-category {
  color: #c9a227;
  letter-spacing: 0.08em;
  font-size: 12px;
  margin-bottom: 10px;
}

.guide-title {
  font-size: clamp(28px, 5vw, 40px);
  line-height: 1.32;
  margin: 0 0 16px;
}

.guide-lead {
  color: rgba(250, 250, 250, 0.88);
  font-size: clamp(16px, 1.06rem, 18px);
  line-height: 1.85;
  margin-bottom: 18px;
}

.guide-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 22px;
  font-size: 12px;
  color: rgba(250, 250, 250, 0.7);
}

.guide-hero-image {
  width: 100%;
  aspect-ratio: 16 / 8;
  object-fit: cover;
  border: 1px solid rgba(201, 162, 39, 0.3);
}

/* ── 위젯 공통: 좌측 골드 액센트(테두리 박스 대신) ── */
.quick-answer {
  margin-bottom: 28px;
  padding: 20px 22px;
  border-left: 3px solid #c9a227;
  background: rgba(201, 162, 39, 0.06);
}

.quick-answer h2 {
  font-size: 19px;
  margin: 0 0 12px;
}

.quick-answer ul {
  margin: 0;
  padding-left: 1.1em;
}

.quick-answer li {
  margin-bottom: 8px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.92);
}

/* ── 슬림 인라인 CTA(상단 큰 박스 대체) ── */
.guide-cta-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 40px;
  padding: 12px 16px;
  border: 1px solid rgba(201, 162, 39, 0.28);
  background: rgba(201, 162, 39, 0.04);
}

.guide-cta-inline-label {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.85);
}

.guide-cta-inline-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cta-pill {
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.45);
  padding: 8px 16px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.cta-pill:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.12);
}

.cta-pill-primary {
  background: #c9a227;
  border-color: #c9a227;
  color: #0a0a0a;
  font-weight: 700;
}

/* ── 목차: 박스 대신 가는 구분선 ── */
.guide-toc {
  margin-bottom: 44px;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.guide-toc-label {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(250, 250, 250, 0.55);
}

.guide-toc ol {
  margin: 0;
  padding-left: 1.3em;
  display: grid;
  gap: 6px;
}

.guide-toc a {
  color: rgba(250, 250, 250, 0.82);
  text-decoration: none;
  line-height: 1.7;
}

.guide-toc a:hover {
  color: #c9a227;
}

/* ── 본문: 테두리 없는 한 글줄, 제목 앞 인라인 번호 ── */
.article-section {
  margin-bottom: 48px;
}

.article-section-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.28);
  color: #fafafa;
  font-size: clamp(21px, 3.5vw, 27px);
  line-height: 1.4;
}

.article-section-index {
  flex: none;
  color: #c9a227;
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.guide-article p {
  font-size: clamp(16px, 1.06rem, 18px);
  line-height: 1.9;
  margin: 0 0 16px;
  color: rgba(250, 250, 250, 0.92);
}

.article-bullets {
  margin: 6px 0 16px;
  padding-left: 1.15em;
}

.article-bullets li {
  margin-bottom: 10px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.9);
}

.article-image {
  margin: 24px 0 0;
}

.article-image img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid rgba(201, 162, 39, 0.3);
}

.article-image figcaption {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(250, 250, 250, 0.72);
}

/* ── 주의: 좌측 경고색 액센트 ── */
.guide-caution {
  margin-bottom: 40px;
  padding: 18px 22px;
  border-left: 3px solid rgba(255, 168, 168, 0.6);
  background: rgba(255, 168, 168, 0.05);
}

.guide-caution h2 {
  font-size: 19px;
  margin: 0 0 12px;
}

.guide-caution ul {
  margin: 0;
  padding-left: 1.1em;
}

.guide-caution li {
  margin-bottom: 8px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.9);
}

/* ── FAQ: 이중 박스 제거, 구분선으로 ── */
.guide-faq {
  margin-bottom: 44px;
}

.guide-faq h2,
.guide-related h2 {
  font-size: 22px;
  margin: 0 0 14px;
}

.guide-faq-list {
  display: grid;
  gap: 0;
}

.guide-faq-item {
  padding: 18px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.guide-faq-item:first-child {
  border-top: 0;
  padding-top: 4px;
}

.guide-faq-item h3 {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.6;
  color: #fafafa;
}

.guide-faq-item p {
  margin: 0;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.86);
}

/* ── 관련 페이지 ── */
.guide-related {
  margin-bottom: 8px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.related-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.3);
  background: rgba(201, 162, 39, 0.05);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.related-card:hover {
  transform: translateY(-2px);
  border-color: #c9a227;
}

.related-card strong {
  font-size: 15px;
}

.related-card span {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.55;
}

/* ── 하단 CTA: 페이지에서 유일하게 강조되는 행동 영역 ── */
.guide-bottom-cta {
  margin-top: 44px;
  padding: 24px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.1), rgba(201, 162, 39, 0.02));
}

.guide-bottom-cta h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.guide-bottom-cta p {
  margin: 0 0 16px;
  line-height: 1.85;
  color: rgba(250, 250, 250, 0.88);
}

.guide-bottom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.guide-bottom-links a {
  text-decoration: none;
  color: #0a0a0a;
  background: #c9a227;
  border: 1px solid #c9a227;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 18px;
}

.guide-bottom-links a:last-child {
  background: transparent;
  color: #fafafa;
}

@media (max-width: 720px) {
  .guide-page {
    padding: 96px 18px 72px;
  }

  .guide-cta-inline {
    flex-direction: column;
    align-items: stretch;
  }

  .guide-cta-inline-links {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .cta-pill {
    justify-content: center;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
