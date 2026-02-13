<script setup lang="ts">
import { siteConfig } from '~/config/site'

interface ArticleSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

interface RelatedLink {
  to: string
  label: string
  description: string
}

const props = defineProps<{
  category: string
  title: string
  lead: string
  keyword: string
  publishedAt: string
  updatedAt?: string
  heroImage: string
  heroAlt: string
  quickAnswers: string[]
  sections: ArticleSection[]
  cautions?: string[]
  relatedLinks: RelatedLink[]
}>()

const { trackPhoneClick, trackKakaoClick, trackInquiryClick } = useGtag()

const sectionAnchor = (index: number) => `sec-${index + 1}`

const handlePhoneClick = () => {
  trackPhoneClick('guide_article')
}

const handleKakaoClick = () => {
  trackKakaoClick('guide_article')
}

const handleInquiryClick = () => {
  trackInquiryClick('guide_article')
}
</script>

<template>
  <div class="guide-page">
    <CustomCursor />

    <div class="guide-wrap">
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

      <section class="guide-actions">
        <p class="guide-actions-title">궁금한 점이 있으시면 편하게 연락주세요</p>
        <div class="guide-actions-grid">
          <a :href="`tel:${siteConfig.phone}`" class="guide-action guide-action-primary" @click="handlePhoneClick">
            전화 {{ siteConfig.phone }}
          </a>
          <NuxtLink to="/contact" class="guide-action" @click="handleInquiryClick">
            온라인 문의
          </NuxtLink>
          <a :href="siteConfig.social.kakaoOpenChat" target="_blank" rel="noopener" class="guide-action" @click="handleKakaoClick">
            카카오톡 상담
          </a>
        </div>
      </section>

      <nav class="guide-toc" aria-label="문서 목차">
        <h2>목차</h2>
        <ul>
          <li v-for="(section, index) in props.sections" :key="section.title">
            <a :href="`#${sectionAnchor(index)}`">{{ index + 1 }}. {{ section.title }}</a>
          </li>
        </ul>
      </nav>

      <article class="guide-article">
        <section
          v-for="(section, index) in props.sections"
          :id="sectionAnchor(index)"
          :key="section.title"
          class="article-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets?.length">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </section>
      </article>

      <section v-if="props.cautions?.length" class="guide-caution">
        <h2>알아두시면 좋아요</h2>
        <ul>
          <li v-for="caution in props.cautions" :key="caution">{{ caution }}</li>
        </ul>
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
          <NuxtLink to="/contact" @click="handleInquiryClick">온라인으로 문의하기</NuxtLink>
          <a :href="`tel:${siteConfig.phone}`" @click="handlePhoneClick">전화로 문의하기</a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fafafa;
  padding: 120px 20px 80px;
  font-family: 'JeonjuCraftMyungjo';
}

.guide-wrap {
  max-width: 980px;
  margin: 0 auto;
}

.guide-hero {
  margin-bottom: 28px;
}

.guide-category {
  color: #c9a227;
  letter-spacing: 0.08em;
  font-size: 12px;
  margin-bottom: 10px;
}

.guide-title {
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.25;
  margin: 0 0 14px;
}

.guide-lead {
  color: rgba(250, 250, 250, 0.85);
  line-height: 1.8;
  margin-bottom: 16px;
}

.guide-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
  font-size: 12px;
  color: rgba(250, 250, 250, 0.65);
}

.guide-hero-image {
  width: 100%;
  aspect-ratio: 16 / 8;
  object-fit: cover;
  border: 1px solid rgba(201, 162, 39, 0.35);
}

.quick-answer {
  margin-bottom: 34px;
  padding: 20px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.08), rgba(201, 162, 39, 0));
}

.guide-actions {
  margin-bottom: 24px;
  padding: 18px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.04);
}

.guide-actions-title {
  margin: 0 0 12px;
  font-size: 15px;
  color: rgba(250, 250, 250, 0.9);
}

.guide-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.guide-action {
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.45);
  text-align: center;
  font-size: 14px;
  padding: 10px 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.guide-action:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.12);
}

.guide-action-primary {
  background: #c9a227;
  border-color: #c9a227;
  color: #0a0a0a;
  font-weight: 700;
}

.guide-toc {
  margin-bottom: 28px;
  padding: 18px;
  border: 1px solid rgba(201, 162, 39, 0.3);
}

.guide-toc h2 {
  margin: 0 0 10px;
  font-size: 19px;
}

.guide-toc ul {
  margin: 0;
  padding-left: 20px;
}

.guide-toc a {
  color: rgba(250, 250, 250, 0.86);
  text-decoration: none;
  line-height: 1.9;
}

.guide-toc a:hover {
  color: #c9a227;
}

.quick-answer h2,
.guide-article h2,
.guide-caution h2,
.guide-related h2 {
  font-size: 22px;
  margin: 0 0 14px;
}

.quick-answer ul,
.guide-article ul,
.guide-caution ul {
  margin: 0;
  padding-left: 20px;
}

.quick-answer li,
.guide-article li,
.guide-caution li {
  margin-bottom: 8px;
  line-height: 1.75;
}

.article-section {
  margin-bottom: 30px;
}

.guide-article p {
  line-height: 1.85;
  margin: 0 0 12px;
  color: rgba(250, 250, 250, 0.9);
}

.guide-caution {
  margin-bottom: 34px;
  padding: 20px;
  border: 1px solid rgba(255, 168, 168, 0.35);
  background: rgba(255, 168, 168, 0.05);
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
  padding: 14px;
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.06);
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
  color: rgba(250, 250, 250, 0.75);
  line-height: 1.5;
}

.guide-bottom-cta {
  margin-top: 36px;
  padding: 22px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.08), rgba(201, 162, 39, 0.02));
}

.guide-bottom-cta h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.guide-bottom-cta p {
  margin: 0 0 14px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.86);
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
  padding: 10px 14px;
}

.guide-bottom-links a:last-child {
  background: transparent;
  color: #fafafa;
}

@media (max-width: 900px) {
  .guide-actions-grid {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
