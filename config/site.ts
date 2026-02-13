// ============================================
// 사이트 설정 파일
// 새 가게 적용 시 이 파일만 수정하면 됨
// ============================================

export const siteConfig = {
  // 기본 정보
  name: '귀족',
  nameEn: 'Noblesse',
  tagline: '종로 귀금속 도매의 품격',
  description: '서울 종로 귀금속 도매 전문점 귀족. 금반지, 돌반지, 커플링, 예물, 결혼반지 주문제작. 14K 18K 24K 순금 도매, 수리·세공.',

  // 연락처
  phone: '02-766-4789',
  phoneFormatted: '+82-2-766-4789',
  email: 'fnvlzl95@gmail.com',

  // 주소
  address: {
    full: '서울 종로구 종로 173 종묘귀금속백화점 101호',
    street: '종로 173 종묘귀금속백화점 101호',
    city: '종로구',
    region: '서울',
    postalCode: '03186',
    country: 'KR',
  },

  // 위치 좌표 (Google Maps, Schema.org용)
  geo: {
    latitude: 37.5709401,
    longitude: 126.9969905,
  },

  // 영업시간
  hours: {
    display: '매일 10:30~18:30 (매달 셋째 주 화요일 휴무)',
    open: '10:30',
    close: '18:30',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  // 도메인 & URL
  domain: 'noblessegold.com',
  url: 'https://noblessegold.com',

  // 분석 도구 ID
  analytics: {
    ga4: 'G-RKK8E5CB6G',
    naver: '9582151f2a151',
  },

  // 검색엔진 인증
  verification: {
    google: 'ZsI2VVbWEPqgSNZ8BntW5Fod0faTHbhJ6SUF3Z470SY',
    naver: '982a858996de4d87d4f5cf7376fab0dc528d2f56',
  },

  // 소셜 & 외부 링크 (있으면 추가)
  social: {
    instagram: '',
    facebook: '',
    blog: '',
    naverPlace: '',
    kakaoOpenChat: 'https://open.kakao.com/o/sc8gQx8h',
  },

  // 이메일 설정 (Resend)
  mail: {
    from: 'noreply@noblessegold.com',
    to: 'fnvlzl95@gmail.com',
  },

  // 브랜드 컬러 (CSS 변수로도 사용)
  colors: {
    primary: '#c9a227',      // 골드
    primaryLight: '#d4b44a',
    primaryDark: '#a68820',
    background: '#0a0a0a',   // 블랙
    text: '#fafafa',         // 화이트
  },

  // OG 이미지 (소셜 공유용)
  ogImage: '/Image/ring/NS0102.webp',

  // 비즈니스 타입 (Schema.org)
  businessType: 'LocalBusiness', // or 'JewelryStore', 'WholesaleStore'
  priceRange: '$$',
}

export type SiteConfig = typeof siteConfig
