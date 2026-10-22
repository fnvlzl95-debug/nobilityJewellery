<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

useHead({
  title: '개인정보처리방침 | 귀족',
  meta: [
    { name: 'description', content: '귀족 귀금속 도매 개인정보처리방침. 수집하는 개인정보 항목, 이용 목적, 보유 기간 안내.' },
    { name: 'keywords', content: '개인정보처리방침, 개인정보보호, 귀족 귀금속' },
    { property: 'og:title', content: '개인정보처리방침 | 귀족' },
    { property: 'og:description', content: '귀족 귀금속 도매 개인정보처리방침.' },
    { property: 'og:image', content: `${siteConfig.url}/Image/set/set0201.webp` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteConfig.url}/privacy` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '개인정보처리방침 | 귀족' },
    { name: 'twitter:description', content: '귀족 귀금속 도매 개인정보처리방침.' },
    { name: 'twitter:image', content: `${siteConfig.url}/Image/set/set0201.webp` },
  ],
  link: [
    { rel: 'canonical', href: `${siteConfig.url}/privacy` }
  ],
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '개인정보처리방침', path: '/privacy' },
      ]))
    }
  ]
})
</script>

<template>
  <div class="page">
    <!-- Custom Cursor -->

    <!-- Main Content -->
    <div class="main">
      <div class="container">
        <div class="back-link">
          <NuxtLink to="/">&larr; 메인으로</NuxtLink>
        </div>

        <h1 class="page-title">개인정보처리방침</h1>
        <p class="page-date">시행일: 2024년 1월 1일 · 수집 항목 안내 갱신: 2026년 10월 22일</p>

        <div class="content">
          <section>
            <h2>1. 개인정보의 처리 목적</h2>
            <p>
              귀족(이하 '회사')은 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul>
              <li>문의 접수 및 상담 서비스 제공</li>
              <li>서비스 이용에 관한 연락 및 안내</li>
              <li>거래 관련 정보 전달</li>
              <li>주문제작 상품의 주문 접수 및 배송</li>
            </ul>
          </section>

          <section>
            <h2>2. 개인정보의 처리 및 보유 기간</h2>
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul>
              <li>문의 내역: 3년</li>
              <li>거래 관련 기록: 5년 (전자상거래법)</li>
            </ul>
          </section>

          <section>
            <h2>3. 수집하는 개인정보 항목</h2>
            <p>
              회사는 문의 접수 및 상담, 주문 접수 및 배송을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <ul>
              <li>필수항목: 이름(또는 업체명), 연락처, 문의 유형, 문의 내용</li>
              <li>선택항목: 귀족을 처음 알게 된 경로</li>
              <li>주문서 작성 시 필수항목: 주문자 이름, 전화번호, 배송지 주소</li>
              <li>문의 접수 시 함께 전달되는 정보: 접수번호, 접수 시각, 상담을 시작한 페이지와 주제, 처음 방문한 페이지, 이전 사이트의 도메인, 캠페인 구분값</li>
            </ul>
            <p>주문서로 받은 정보는 주문 상품·금액과 함께 주문 처리와 배송, 거래 기록 보관을 위해 저장합니다. 주문서 페이지의 방문 기록은 수집하지 않습니다.</p>
            <p>페이지 방문 경로는 상담 맥락 확인과 유입 경로별 문의 집계에 이용합니다. 사이트 내 상담 이동을 연결하기 위해 브라우저의 세션 저장소를 사용합니다. 문의자의 이름·연락처·주소·문의 내용과 자유 입력 주제는 아래 분석 도구에 보내는 상담 이벤트에서 제외합니다.</p>
          </section>

          <section>
            <h2>방문 통계·상담 경로 측정</h2>
            <p>공개 페이지에서 Google Analytics 4(Google), 네이버 애널리틱스(NAVER), Meta Pixel(Meta)을 사용하여 방문 경로·기기·브라우저·페이지 조회 및 상담 버튼 이용을 분석합니다. 제공사 스크립트가 접속 정보와 쿠키 등 온라인 식별자를 처리할 수 있습니다. 광고·상담 경로의 효과와 홈페이지 이용성을 파악하기 위한 목적입니다.</p>
            <ul>
              <li>Google Analytics 4: 공개 페이지 경로, 검증된 캠페인 구분값·광고 클릭 식별자, 버튼 클릭, 문의 양식 시작·접수 성공을 측정합니다. URL에서 캠페인·광고 식별자를 제외한 매개변수와 해시, 이전 페이지의 매개변수와 해시를 사이트가 전송하는 페이지 조회 정보에서 제외합니다.</li>
              <li>네이버 애널리틱스: 공개 페이지 조회·유입 통계와 카카오·전화·지도·문의 이동, 양식 시작, 접수 성공, 가이드에서 서비스 이동을 고정된 이벤트 이름으로 측정합니다.</li>
              <li>Meta Pixel: 공개 페이지 조회·콘텐츠 조회, 상담 이동 및 접수 성공을 측정합니다. 상담 이벤트에는 고객 이름·전화번호·이메일을 포함하지 않습니다.</li>
              <li>접수 성공은 메일 제공자의 수락까지 확인한 상태이며, 상담 완료나 구매를 의미하지 않습니다. Google과 Meta의 접수 이벤트에는 중복 방지를 위한 임의 접수번호가 포함됩니다.</li>
            </ul>
            <p>주문서·견적서·관리 페이지에서는 이 세 분석 도구를 초기화하지 않습니다. 자유 검색어 또는 허용하지 않은 URL 매개변수가 있는 문서도 분석에서 제외합니다. 분석을 거부하려면 <a href="/privacy?analytics=off" rel="noreferrer">이 탭의 분석 수집 끄기</a>를 선택하세요. 거부 상태는 이 탭의 세션 저장소에 보관되며, 이후 사이트 내부 이동에도 적용됩니다. 브라우저 저장소를 차단한 경우 새로고침하거나 다시 방문할 때 거부 링크를 다시 선택하세요. 기존 전송 기록은 이 선택으로 삭제되지 않습니다.</p>
            <p>분석 제공사의 쿠키·데이터 처리 및 별도 거부 방법은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google 개인정보처리방침</a>, <a href="https://privacy.naver.com/policy/privacy.html" target="_blank" rel="noopener noreferrer">NAVER 개인정보처리방침</a>, <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta 개인정보처리방침</a>에서 확인할 수 있습니다. 브라우저 설정에서 쿠키를 삭제하거나 차단할 수도 있습니다.</p>
          </section>

          <section>
            <h2>4. 개인정보의 파기</h2>
            <p>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>
          </section>

          <section>
            <h2>5. 정보주체의 권리·의무 및 행사방법</h2>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
              권리 행사는 서면, 전화, 이메일 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </section>

          <section>
            <h2>6. 개인정보 보호책임자</h2>
            <div class="info-box">
              <p>
                <strong>개인정보 보호책임자</strong><br>
                담당자: 박승태 (대표)<br>
                연락처: {{ siteConfig.phone }}
              </p>
            </div>
          </section>

          <section>
            <h2>7. 개인정보 처리방침 변경</h2>
            <p>
              이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fafafa;
  font-family: var(--font-body);
}

/* Main */
.main {
  padding-top: 120px;
  padding-bottom: 80px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-link {
  margin-bottom: 32px;
}

.back-link a {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.back-link a:hover {
  color: #c9a227;
}

.page-title {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 300;
  margin-bottom: 12px;
}

.page-date {
  font-size: 14px;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 48px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.content section h2 {
  font-size: 18px;
  font-weight: 500;
  color: #fafafa;
  margin-bottom: 16px;
}

.content section p {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.7);
}

.content section ul {
  margin-top: 16px;
  padding-left: 20px;
}

.content section li {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(250, 250, 250, 0.6);
  margin-bottom: 8px;
}

.info-box {
  background: rgba(250, 250, 250, 0.05);
  border: 1px solid rgba(250, 250, 250, 0.1);
  padding: 24px;
  margin-top: 16px;
}

.info-box p {
  font-size: 14px;
  line-height: 1.8;
}

.info-box strong {
  color: #c9a227;
}

/* Mobile */
@media (max-width: 480px) {
  .page-title {
    font-size: 28px;
  }
}
</style>
