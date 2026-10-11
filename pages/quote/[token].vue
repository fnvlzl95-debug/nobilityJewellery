<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { formatMoney, formatQuoteDate } from '~/utils/quote'

interface PublicQuote {
  quoteId: string
  state: 'active' | 'cancelled'
  title?: string
  recipient?: string
  quoteDate?: string
  total?: number
  imageWidth?: number
  imageHeight?: number
}

const route = useRoute()
const quoteUrl = `/api/quote/${route.params.token}`

// 관리 페이지(/admin)의 견적서 탭에서 만든 견적서를 링크의 토큰으로 찾는다.
const { data: fetchedQuote, error } = await useFetch<PublicQuote>(quoteUrl)
if (error.value || !fetchedQuote.value) {
  throw createError({
    statusCode: error.value?.statusCode || 500,
    statusMessage: '견적서를 찾을 수 없습니다',
    fatal: true,
  })
}

// 이미지는 관리 화면에서 그린 그대로 서버에 저장돼 있다. 주소가 있는 파일이라
// 카카오톡 같은 인앱 브라우저에서도 저장 버튼과 길게 눌러 저장이 모두 된다.
const quote = fetchedQuote.value
const imageUrl = `${quoteUrl}/image`
const title = quote.title || '견적서'

useHead({
  title: `${title} | ${siteConfig.name}`,
  meta: [
    { name: 'description', content: `${siteConfig.name} ${title}. 견적 내용을 확인하고 이미지로 저장하실 수 있습니다.` },
    // 고객 한 사람에게만 보내는 링크 — 검색에 잡히거나 주소가 다른 사이트로 넘어가면 안 된다.
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'referrer', content: 'no-referrer' },
    // Open Graph (카카오톡 링크 미리보기)
    { property: 'og:title', content: `${siteConfig.name} ${title}` },
    { property: 'og:description', content: '견적 내용을 확인하고 이미지로 저장하실 수 있습니다.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `${siteConfig.url}${siteConfig.ogImage}` },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: siteConfig.name },
  ],
})
</script>

<template>
  <div class="page">
    <div class="main">
      <div class="quote-wrapper">
        <header>
          <h1 class="title">{{ title }}</h1>
          <p v-if="quote.state === 'active'" class="desc">
            견적 내용을 확인하시고, 아래 버튼으로 이미지를 저장하실 수 있습니다.
          </p>
        </header>

        <template v-if="quote.state === 'active'">
          <dl class="detail-list">
            <div v-if="quote.recipient" class="detail-row">
              <dt>받는 분</dt>
              <dd>{{ quote.recipient }} 귀하</dd>
            </div>
            <div class="detail-row">
              <dt>견적일</dt>
              <dd>{{ formatQuoteDate(quote.quoteDate!) }}</dd>
            </div>
            <div class="detail-row">
              <dt>합계금액</dt>
              <dd class="amount">{{ formatMoney(quote.total!) }}원</dd>
            </div>
          </dl>

          <a class="quote-sheet" :href="imageUrl" target="_blank" rel="noopener">
            <img
              :src="imageUrl"
              :width="quote.imageWidth"
              :height="quote.imageHeight"
              :alt="`${quote.recipient ? `${quote.recipient} 귀하 ` : ''}${title}. 견적일 ${formatQuoteDate(quote.quoteDate!)}, 합계금액 ${formatMoney(quote.total!)}원`"
              loading="eager"
            >
          </a>

          <div class="save">
            <a class="btn-save" :href="`${imageUrl}?download=1`" download>이미지 저장</a>
            <p class="save-hint">저장되지 않으면 견적서 이미지를 길게 눌러 저장해 주세요.</p>
          </div>

          <p class="quote-id">견적번호 <span>{{ quote.quoteId }}</span></p>
        </template>

        <!-- 취소된 견적서 -->
        <div v-else class="status-box">
          <h2 class="section-title">취소된 견적서입니다</h2>
          <p class="status-desc">새 견적이 필요하시면 카카오톡이나 전화로 문의해 주세요.</p>
          <p class="quote-id">견적번호 <span>{{ quote.quoteId }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.page {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--black);
  color: var(--white);
  font-family: var(--font-body);
}

.main {
  padding: clamp(112px, 10vw, 144px) clamp(20px, 5vw, 60px) clamp(72px, 8vw, 112px);
}

/* 견적서는 가로로 긴 문서라 주문서보다 넓게 잡는다 */
.quote-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
  max-width: 880px;
  margin: 0 auto;
}

.title {
  margin: 0 0 16px;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--gray);
}

.section-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* ===== 요약 ===== */
.detail-list {
  margin: 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.detail-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

.detail-row dt {
  flex: 0 0 auto;
  font-size: 14px;
  color: var(--gray);
}

.detail-row dd {
  margin: 0;
  font-size: 16px;
  text-align: right;
}

.detail-row .amount {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

/* ===== 견적서 이미지 — 흰 종이 문서를 그대로 올린다 ===== */
.quote-sheet {
  display: block;
  border: 1px solid rgba(250, 250, 250, 0.14);
  line-height: 0;
}

.quote-sheet img {
  display: block;
  width: 100%;
  height: auto;
}

.save {
  display: grid;
  gap: 12px;
}

.btn-save {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 54px;
  padding: 0 18px;
  font-size: 16px;
  font-weight: 700;
  color: var(--black);
  background: var(--gold);
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s var(--ease-out-expo);
}

.btn-save:hover {
  background: var(--gold-light);
}

.btn-save:active {
  transform: scale(0.98);
}

.save-hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--gray);
  text-align: center;
}

.quote-id {
  margin: 0;
  font-size: 13px;
  color: var(--gray);
}

.quote-id span {
  margin-left: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.04em;
}

/* ===== 취소 ===== */
.status-box {
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.08);
}

.status-desc {
  margin: 8px 0 16px;
  font-size: 15px;
  line-height: 1.7;
}

/* ===== Mobile ===== */
@media (max-width: 600px) {
  .main {
    padding: 100px 20px 72px;
  }

  .status-box {
    padding: 20px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-save {
    transition: none;
  }
}
</style>
