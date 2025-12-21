<script setup lang="ts">
useHead({
  title: '개인정보처리방침 | 귀족',
  link: [
    { rel: 'canonical', href: 'https://noblessegold.com/privacy' }
  ],
})
</script>

<template>
  <div class="page">
    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Navigation -->
    <nav class="nav-luxury">
      <NuxtLink to="/" class="nav-logo">
        <span class="logo-text">귀족</span>
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">홈</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link">갤러리</NuxtLink>
        <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">문의하기</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <div class="back-link">
          <NuxtLink to="/">&larr; 메인으로</NuxtLink>
        </div>

        <h1 class="page-title">개인정보처리방침</h1>
        <p class="page-date">시행일: 2024년 1월 1일</p>

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
              회사는 문의 접수 및 상담을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <ul>
              <li>필수항목: 이름(또는 업체명), 연락처, 문의 내용</li>
              <li>선택항목: 문의 유형</li>
            </ul>
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
                연락처: 02-766-4789
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
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'JeonjuCraftMyungjo';
}

/* Navigation */
.nav-luxury {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px clamp(20px, 5vw, 60px);
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(201, 162, 39, 0.1);
}

.nav-logo {
  text-decoration: none;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  color: #fafafa;
  letter-spacing: 0.15em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(250, 250, 250, 0.6);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #fafafa;
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
@media (max-width: 1023px) {
  .nav-luxury {
    padding: 16px 20px;
  }

  .nav-links {
    gap: 16px;
  }

  .nav-link {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 12px;
  }

  .nav-link {
    font-size: 11px;
  }

  .page-title {
    font-size: 28px;
  }
}
</style>
