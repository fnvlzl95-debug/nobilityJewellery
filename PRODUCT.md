# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

주 사용자는 **일반 소비자**다. 돌반지·백일반지, 커플링·결혼반지, 예물 세트, 데일리 금붙이를 찾는 개인 고객이 네이버·구글 검색으로 들어온다. 대부분 모바일이고, 대개 "종로 돌반지 가격", "커플링 14K 18K 차이" 같은 정보성 검색으로 먼저 도착한 뒤 가이드 글 → 갤러리 → 상담 순으로 이동한다.

도매 거래처(소매점·공방)도 `/wholesale`로 받지만, 검색 유입의 대부분은 개인이고 갤러리·제품 상세는 개인 기준으로 설계한다.

## Product Purpose

서울 종로 종묘귀금속백화점의 귀금속 도매점 **귀족**의 온라인 창구다. 매장에 오기 전에 (1) 어떤 디자인이 있는지 보고, (2) 소재·제작 방식·기간을 이해하고, (3) 상담을 시작하게 만드는 것이 목적이다. 사이트에서 결제가 일어나지 않는다 — 성공은 **카카오톡 상담 시작**이다.

## Positioning

종로3가 도매 상권에 실제 매장을 둔 곳이 직접 운영한다. 완제품 진열이 아니라 **주문제작**이 기본이고, 갤러리의 디자인은 "이대로 사거나, 이걸 기준으로 상담하는" 레퍼런스로 기능한다. 도매가로 제공하되 금시세 연동이라 가격은 상담에서만 안내한다.

## Operating Context

- 매장: 서울 종로구 종로 173 종묘귀금속백화점 101호 / 매일 10:30~18:30 (매달 셋째 주 화요일 휴무)
- 전화 02-766-4789, 카카오톡 상담, `/contact` 문의 폼 — 세 경로가 공존하며 **카카오톡이 1순위**
- 상담 전 고객이 준비하면 좋은 것: 원하는 디자인 사진, 희망 소재·색상, 착용 목적, 희망 수령일과 예산
- 제작 기간은 대체로 1~2주, 맞춤 구성은 상담 후 결정

## Capabilities and Constraints

- **가격·중량 등 수치는 전면 비공개.** 금시세 변동 때문에 상세 페이지에도 가격을 적지 않고, 중량·석수 같은 숫자도 노출하지 않는다. 소재·세팅·모티브 같은 디자인 서술만 표기한다. (`4프롱` 같은 세팅 유형 명칭은 수치가 아니라 디자인 용어로 취급한다.)
- 카테고리: 반지 / 목걸이 / 팔찌 / 귀걸이 / 세트. 현재 귀걸이는 등록 이미지가 없어 갤러리에서 자동으로 숨겨진다 (`getItemsByCategory` 결과가 0이면 섹션 미출력).
- 한국어 전용. `htmlAttrs.lang = 'ko'`, 본문 서체는 Pretendard Variable 동적 서브셋.
- Nuxt 3 정적 프리렌더 → Cloudflare Pages. `nitro.prerender.routes`가 `pages/` 트리를 스캔해 라우트를 만들고, 동적 라우트는 명시적으로 주입해야 한다. `autoSubfolderIndex: false`라 `/gallery/foo` → `gallery/foo.html`.
- 전환 계측이 이미 깔려 있다: GA4, Naver Analytics, Meta Pixel. 신규 CTA는 `useGtag()`의 `trackPageInquiryClick` / `trackKakaoClick` / `trackEvent` / `trackMetaEvent` 를 그대로 사용한다.
- 이미지 파이프라인: PNG/JPG를 `public/Image/<category>/`에 두고 `npm run images` 실행 → WebP(q90) 변환 + 원본을 `assets-original/`로 이동.
- SEO 검증 스크립트가 존재한다: `npm run verify:seo` (canonical / og:url / 슬래시 정합성), `npm run audit:ctr`.

## Brand Commitments

- 상호 **귀족** (영문 **Noblesse**), 태그라인 "종로 귀금속 도매의 품격"
- 단일 소스 설정 파일 `config/site.ts` — 상호·연락처·주소·좌표·영업시간·계측 ID가 전부 여기 있고, 다른 가게에 재적용할 수 있게 설계되어 있다
- 존댓말 상담 톤. 제품 설명은 "~입니다" 체 한 문장, 과장 없는 서술
- 타사 브랜드 각인이 찍힌 사진은 사이트에 올리지 않는다 (2026-08 입고분에서 Chopard·Cartier·ROSEPEARL·FOPE 각인 4장 제외)

## Evidence on Hand

- 실제 매장 주소·좌표·영업시간, 사업자 연락처 (`config/site.ts`)
- Google Search Console / Naver Search Advisor 소유 확인 완료
- 자체 촬영·공급처 제공 제품 사진 (`public/Image/`, 2026-08 추가 입고 15개 제품)
- 가이드 아티클 다수 (`data/guide-posts.ts`, `pages/guide/`) — 다이아 4C, 돌반지, 커플링, 사이즈 측정 등

## Open Decisions

- 귀걸이 카테고리의 제품 사진 확보 시점 (현재 미정, 카테고리는 코드상 준비됨)
- 2026-08 입고분의 정확한 소재 스펙(K수)은 공급처 확인 전 잠정값이며 사장님 확인 후 확정 필요
