# 상담 측정 운영 기준

2026-09-05 배포부터 운영 호스트 `noblessegold.com`에서만 GA4·Naver Analytics·Meta Pixel을 초기화한다. 로컬·Cloudflare 미리보기는 제외한다. 운영 점검은 처음 여는 URL에 `?analytics=off`를 붙인다.

| 단계 | 대표 이벤트 | 해석 |
| --- | --- | --- |
| 카톡 이동 | `kakao_click` | 채팅 화면으로 이동한 클릭. 새 문의 또는 계약이 아님 |
| 전화 이동 | `phone_click` | 전화 링크 클릭. 통화 성립을 보장하지 않음 |
| 웹 양식 이동 | `inquiry_click` | 문의 양식으로 이동한 클릭 |
| 웹 문의 접수 | `generate_lead` | 메일 제공자가 접수를 수락하고 서버가 문의 ID를 반환한 경우 |
| 경로 진단 | `cta_click`, `guide_to_service_click`, `consultation_case_click` | 대표 클릭과 합산하지 않는 보조 이벤트 |
| 거래 확인 | 운영 대장의 계약일·완료일 | 실제 기록과 대조 후 입력. 사이트 클릭에서 자동 생성하지 않음 |

GA4 주요 이벤트에서 `custom_inquiry_click`, `inquiry_click`, `kakao_click`, `naver_map_click`, `phone_click`, `repair_inquiry_click`, `wholesale_inquiry_click` 표시를 해제했다. 과거 주요 이벤트 합계와 이후 합계를 직접 비교하지 않는다. `generate_lead`는 유지하며, `qualify_lead`·`close_convert_lead`는 현재 코드에서 전송하지 않는다. 기본 `purchase`도 실제 구매 이벤트를 만들지 않는다.

GA4 페이지 조회는 향상된 측정의 브라우저 방문 기록 변경 기능이 담당한다. 코드에서 두 번째 수동 `page_view`를 추가하지 않는다. Naver는 경로 변경당 한 번 호출하며 해시·쿼리만 바뀌면 추가 호출하지 않는다. 실제 네이버 반송률의 원인은 별도 운영 관측으로 확인해야 한다.

접수 메일에는 문의 ID와 상담 시작 페이지, 첫 착지 페이지, 이전 사이트의 호스트, 유효한 캠페인 구분값을 담는다. 고객의 선택형 유입 답변은 이 자동 경로와 구분한다. 이름·연락처·문의 내용은 GA4 이벤트 매개변수로 전달하지 않는다. 문의 ID는 GA4 맞춤 측정기준으로 등록하지 않는다.

`npm run test:measurement`는 추적 호스트 제한, 대표 이벤트 횟수, 문의 ID 중복 방지, 입력 유효성, HTML 이스케이프, 메일 제공자 성공·실패를 검증한다. 외부 메일은 전송하지 않는다. `npm run typecheck`, `npm run build`, `npm run verify:seo`를 배포 전 실행한다.

현재 문의 접수는 메일 제공자의 수락까지 확인하며 받은편지함 배달과 상담 완료를 보장하지 않는다. 대장은 접수 ID로 수신 메일과 대조한다. 요청 제한은 서버 인스턴스 메모리 기반이다. 대량 트래픽에 대한 공용 저장소·영속 큐 도입은 별도 운영 설계가 필요하다.

이미지 변환은 Cloudflare 정적 배포에서도 작동하도록 Nuxt Image `ipxStatic`을 명시한다. 새로운 동적 이미지 표시를 추가할 때 프리렌더에 모든 필요한 변환 파일이 포함되는지 확인한다.

글꼴은 기존 Pretendard의 디자인을 유지한 OFL 서브셋 `Noblesse UI`를 자체 제공한다. 홈·공통 문자와 나머지 콘텐츠 문자를 분리했다. 새 콘텐츠의 글자를 추가할 때 `public/fonts/README.md`의 재생성 절차를 따른다. 미포함 문자는 시스템 글꼴로 표시되며, 프로덕션 빌드는 외부 폰트 다운로드나 Python에 의존하지 않는다.

GA4에는 `page_view → form_start → generate_lead` 웹 접수 퍼널과 이벤트 맥락 측정기준 8개를 등록했다. 웹 퍼널은 카카오 실문의·전화 통화·매장 계약을 포함하지 않는다. 운영 대장과 같은 기간으로 대조한다.

참고: [Nuxt Image 설정](https://image.nuxt.com/get-started/configuration), [GA4 페이지 조회](https://developers.google.com/analytics/devguides/collection/ga4/views), [GA4 향상된 측정](https://support.google.com/analytics/answer/9216061).
