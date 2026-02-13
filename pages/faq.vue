<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { faqItems, faqCategories, generateFAQSchema } from '~/data/faq-items'
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

useHead({
  title: 'FAQ | 도매·주문제작·수리 안내 | 귀족',
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/faq` }
  ],
  meta: [
    { name: 'description', content: '종로 귀금속 도매 귀족 FAQ. 금반지 도매 주문방법, 돌반지 주문제작, 커플링, 결혼예물, 반지 사이즈 조절, 귀금속 수리, A/S, 배송, 주차 안내. 종로3가 금은방 자주 묻는 질문.' },
    { name: 'keywords', content: '귀금속 FAQ, 금반지 AS, 수리 기간, 주문제작 기간, 도매 조건, 금 시세, 반지 사이즈, 종로 금은방' },
    // Open Graph
    { property: 'og:title', content: 'FAQ | 도매·주문제작·수리 안내 | 귀족' },
    { property: 'og:description', content: '종로 귀금속 도매 귀족 FAQ. 금반지 도매, 돌반지, 커플링, 결혼예물, 귀금속 수리, A/S 안내.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/faq` },
    { property: 'og:image', content: `${siteConfig.url}/Image/ring/NN0701.webp` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: '귀족' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'FAQ | 도매·주문제작·수리 안내 | 귀족' },
    { name: 'twitter:description', content: '종로 귀금속 도매 귀족 FAQ. 금반지 도매, 돌반지, 커플링, 결혼예물, 귀금속 수리, A/S 안내.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/ring/NN0701.webp` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(generateFAQSchema())
    }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]))
    }
  ]
})

const openId = ref<number | null>(null)
const isScrolled = ref(false)
const selectedCategory = ref('all')

const filteredFaqItems = computed(() => {
  if (selectedCategory.value === 'all') return faqItems
  return faqItems.filter(item => item.category === selectedCategory.value)
})

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  openId.value = null
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  if (window.location.hash === '#parking') {
    openId.value = 5
    setTimeout(() => {
      document.getElementById('parking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="page">
    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Main Content -->
    <main class="main">
      <div class="faq-container">
        <!-- Header -->
        <div class="faq-header">
          <span class="label">FAQ</span>
          <h1 class="title">자주 묻는 질문</h1>
          <p class="desc">
            궁금하신 점이 있으시면 아래 내용을 확인해주세요.<br>
            추가 문의는 <NuxtLink to="/contact" class="link-inline">문의하기</NuxtLink>를 이용해주세요.
          </p>
        </div>

        <!-- Category Filter -->
        <div class="category-filter">
          <button
            class="category-btn"
            :class="{ active: selectedCategory === 'all' }"
            @click="selectCategory('all')"
          >
            전체
          </button>
          <button
            v-for="cat in faqCategories"
            :key="cat.id"
            class="category-btn"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- FAQ List -->
        <div class="faq-list">
          <div
            v-for="item in filteredFaqItems"
            :key="item.id"
            :id="item.id === 5 ? 'parking' : undefined"
            class="faq-item"
            :class="{ open: openId === item.id }"
          >
            <button class="faq-question" @click="toggle(item.id)">
              <span class="question-text">{{ item.question }}</span>
              <span class="question-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14" v-if="openId !== item.id" />
                  <path d="M5 12h14" v-else />
                </svg>
              </span>
            </button>
            <div class="faq-answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="faq-cta">
          <p class="cta-text">원하시는 답변을 찾지 못하셨나요?</p>
          <NuxtLink to="/contact" class="cta-button">
            <span>문의하기</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
  overflow-x: hidden;
  max-width: 100vw;
  width: 100%;
}

/* ===== Main Content ===== */
.main {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 120px clamp(20px, 5vw, 60px) 60px;
}

.faq-container {
  width: 100%;
  max-width: 800px;
}

/* ===== Header ===== */
.faq-header {
  text-align: center;
  margin-bottom: 40px;
}

.label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 16px;
}

.title {
  font-family: 'JeonjuCraftMyungjo';
  font-size: clamp(32px, 5vw, 44px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 16px;
  line-height: 1.2;
}

.desc {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.5);
}

.link-inline {
  color: #c9a227;
  text-decoration: none;
  border-bottom: 1px solid rgba(201, 162, 39, 0.3);
  transition: border-color 0.3s;
}

.link-inline:hover {
  border-color: #c9a227;
}

/* ===== Category Filter ===== */
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 40px;
}

.category-btn {
  min-height: 44px;
  padding: 10px 20px;
  font-family: 'JeonjuCraftMyungjo';
  font-size: 13px;
  font-weight: 700;
  color: rgba(250, 250, 250, 0.6);
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.15);
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  color: #fafafa;
  border-color: rgba(250, 250, 250, 0.3);
}

.category-btn.active {
  color: #0a0a0a;
  background: #c9a227;
  border-color: #c9a227;
}

/* ===== FAQ List ===== */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.faq-item {
  background: #0a0a0a;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
}

.faq-question:hover {
  background: rgba(201, 162, 39, 0.05);
}

.question-text {
  font-family: 'JeonjuCraftMyungjo';
  font-size: 16px;
  font-weight: 400;
  color: #fafafa;
  line-height: 1.5;
}

.question-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a227;
  transition: transform 0.3s;
}

.faq-item.open .question-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s;
}

.faq-item.open .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding: 0 24px 24px;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.6);
}

/* ===== CTA ===== */
.faq-cta {
  margin-top: 60px;
  text-align: center;
}

.cta-text {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 20px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: #c9a227;
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-button:hover {
  background: #d4af37;
  transform: translateY(-2px);
}

.cta-button svg {
  transition: transform 0.3s;
}

.cta-button:hover svg {
  transform: translateX(4px);
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .category-filter {
    gap: 6px;
  }

  .category-btn {
    padding: 8px 14px;
    font-size: 12px;
  }

  .faq-question {
    padding: 20px 16px;
  }

  .question-text {
    font-size: 15px;
  }

  .faq-answer p {
    padding: 0 16px 20px;
    font-size: 14px;
  }
}

</style>
