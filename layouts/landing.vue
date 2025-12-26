<script setup lang="ts">
// 랜딩 페이지 전용 레이아웃
// CustomCursor, TheNavigation, TheFooter 자동 포함
</script>

<template>
  <div class="page-landing">
    <CustomCursor />
    <TheNavigation />

    <main class="main">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<style>
.page-landing {
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
  min-height: 100vh;
}

.page-landing .main {
  padding-top: 120px;
  padding-bottom: 80px;
}

.page-landing .container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
}

/* 공통 랜딩 페이지 스타일 */
.page-landing .page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-landing .label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 16px;
}

.page-landing .title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 300;
  color: #fafafa;
  margin-bottom: 20px;
}

.page-landing .desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.6);
}

.page-landing .hero-image {
  margin-bottom: 80px;
  aspect-ratio: 16/9;
  overflow: hidden;
  border: 1px solid rgba(250, 250, 250, 0.1);
}

.page-landing .hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-landing .section-title {
  font-size: 24px;
  font-weight: 300;
  color: #fafafa;
  text-align: center;
  margin-bottom: 16px;
}

.page-landing .section-desc {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  text-align: center;
  margin-bottom: 40px;
}

/* Why/Advantage 그리드 */
.page-landing .why-grid,
.page-landing .advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .page-landing .why-grid,
  .page-landing .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .page-landing .why-grid,
  .page-landing .advantages-grid {
    grid-template-columns: 1fr;
  }
}

.page-landing .why-item,
.page-landing .advantage-item {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.08) 0%, rgba(201, 162, 39, 0.02) 100%);
  border: 1px solid rgba(201, 162, 39, 0.2);
}

.page-landing .why-number {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #c9a227;
  margin-bottom: 16px;
}

.page-landing .why-item h3,
.page-landing .advantage-item h3 {
  font-size: 18px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.page-landing .advantage-item h3 {
  color: #c9a227;
}

.page-landing .why-item p,
.page-landing .advantage-item p {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.6);
  line-height: 1.5;
}

/* 프로세스 그리드 */
.page-landing .process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 800px) {
  .page-landing .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .page-landing .process-grid {
    grid-template-columns: 1fr;
  }
}

.page-landing .process-step {
  text-align: center;
  padding: 24px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
}

.page-landing .step-num {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: #c9a227;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.page-landing .step-title {
  font-size: 16px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.page-landing .step-desc {
  font-size: 13px;
  color: rgba(250, 250, 250, 0.5);
  line-height: 1.5;
}

/* 갤러리 그리드 */
.page-landing .gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
}

@media (max-width: 600px) {
  .page-landing .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.page-landing .gallery-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid rgba(250, 250, 250, 0.1);
  transition: all 0.3s;
}

.page-landing .gallery-grid img:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.page-landing .gallery-cta {
  text-align: center;
  margin-top: 32px;
}

.page-landing .btn-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #c9a227;
  text-decoration: none;
  transition: gap 0.3s;
}

.page-landing .btn-text:hover {
  gap: 12px;
}

/* 관련 제품 */
.page-landing .related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 600px) {
  .page-landing .related-grid {
    grid-template-columns: 1fr;
  }
}

.page-landing .related-card {
  padding: 32px;
  background: rgba(250, 250, 250, 0.02);
  border: 1px solid rgba(250, 250, 250, 0.06);
  text-decoration: none;
  transition: all 0.3s;
}

.page-landing .related-card:hover {
  border-color: rgba(201, 162, 39, 0.3);
}

.page-landing .related-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c9a227;
  display: block;
  margin-bottom: 8px;
}

.page-landing .related-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
}

.page-landing .related-card p {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
}

/* 섹션 마진 */
.page-landing .why-section,
.page-landing .advantages-section,
.page-landing .products-section,
.page-landing .sets-section,
.page-landing .materials-section,
.page-landing .process-section,
.page-landing .checklist-section,
.page-landing .gallery-section,
.page-landing .related-section,
.page-landing .zodiac-section {
  margin-bottom: 80px;
}
</style>
