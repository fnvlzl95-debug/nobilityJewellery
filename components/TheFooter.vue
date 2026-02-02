<script setup lang="ts">
const footerLinks = [
  { to: '/', label: '홈' },
  { to: '/gallery', label: '갤러리' },
  { to: '/baby-gold', label: '돌반지' },
  { to: '/couple-ring', label: '커플링' },
  { to: '/wedding', label: '결혼예물' },
  { to: '/buy-gold', label: '금 매입' },
  { to: '/wholesale', label: '도매 안내' },
  { to: '/custom', label: '주문제작' },
  { to: '/repair', label: '수리/AS' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: '문의하기' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <NuxtLink to="/" class="footer-brand">귀족</NuxtLink>
        <div class="footer-nav">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
      <div class="footer-info">
        <span>대표: 박승태 | 사업자등록번호: 101-09-26010</span>
      </div>
      <div class="footer-bottom">
        <span class="copyright">© 2024 귀족. All rights reserved.</span>
        <NuxtLink to="/privacy" class="privacy-link">개인정보처리방침</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #050505;
  padding: 48px clamp(20px, 5vw, 60px);
  border-top: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.05);
}

.footer-brand {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  text-decoration: none;
  letter-spacing: 0.1em;
}

.footer-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-nav a {
  font-size: clamp(13px, 2vw, 15px);
  color: rgba(250, 250, 250, 0.5);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-nav a:hover {
  color: #fafafa;
}

.footer-info {
  margin-bottom: 16px;
}

.footer-info span {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
}

.privacy-link {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.4);
  text-decoration: none;
}

.privacy-link:hover {
  color: #fafafa;
}
</style>
