# 상담 측정 운영 기준

운영 호스트 `noblessegold.com`에서만 GA4·Naver Analytics·Meta Pixel을 초기화한다. 로컬·Cloudflare 미리보기는 제외한다. 운영 점검은 처음 여는 URL에 `?analytics=off`를 붙인다. 2026-10-22 개선판은 이 거부 상태를 탭 세션에 유지하며 이후 내부 이동에도 적용한다. 초기화된 픽셀과 비공개 문서를 분리하기 위해 `/order`, `/quote`, `/admin` 진입·이탈은 전체 문서 이동과 `no-referrer` 경계로 처리한다.

| 단계 | 대표 이벤트 | 해석 |
| --- | --- | --- |
| 카톡 이동 | `kakao_click` | 채팅 화면으로 이동한 클릭. 새 문의 또는 계약이 아님 |
| 전화 이동 | `phone_click` | 전화 링크 클릭. 통화 성립을 보장하지 않음 |
| 웹 양식 이동 | `inquiry_click` | 문의 양식으로 이동한 클릭 |
| 웹 문의 접수 | `generate_lead` | 메일 제공자가 접수를 수락하고 서버가 문의 ID를 반환한 경우 |
| 경로 진단 | `cta_click`, `guide_to_service_click`, `consultation_case_click` | 대표 클릭과 합산하지 않는 보조 이벤트 |
| 거래 확인 | 운영 대장의 계약일·완료일 | 실제 기록과 대조 후 입력. 사이트 클릭에서 자동 생성하지 않음 |

GA4 주요 이벤트에서 `custom_inquiry_click`, `inquiry_click`, `kakao_click`, `naver_map_click`, `phone_click`, `repair_inquiry_click`, `wholesale_inquiry_click` 표시를 해제했다. 과거 주요 이벤트 합계와 이후 합계를 직접 비교하지 않는다. `generate_lead`는 유지하며, `qualify_lead`·`close_convert_lead`는 현재 코드에서 전송하지 않는다. 기본 `purchase`도 실제 구매 이벤트를 만들지 않는다.

GA4 페이지 조회는 개선판부터 코드가 경로 변경당 한 번 전송한다. 모든 `config`에 `send_page_view:false`를 적용하고 현재의 정제된 페이지 URL·이전 페이지를 갱신한다. **2026-10-22 약 22:06 KST, 관리자에서 향상된 측정의 ‘브라우저 기록 이벤트에 기반한 페이지 변경’, 사이트 검색, 양식 상호작용 자동 수집을 OFF로 저장하고 재열어 확인했다.** 자동 history 수집을 다시 켜면 수동 페이지뷰와 중복될 수 있다. `form_start`는 문의 양식 첫 포커스에서 개인정보 없이 수집한다. 이전 자동 양식 지표와 이후 지표의 정의가 달라졌음을 비교 보고서에 표시한다.

GA4 `page_location`에는 공개 경로와 형식·길이를 검증한 UTM 및 `gclid/dclid/gbraid/wbraid/fbclid/msclkid`만 남긴다. 내부 이전 페이지는 공개 경로, 외부 이전 페이지는 origin만 보낸다. 문의 `topic`은 URL과 이벤트에서 고정 서비스 유형으로 바꾸며, 제품명·가이드 제목은 탭 안의 임시 양식 맥락으로 최대 15분 보존하여 화면·접수 메일에 사용한다. 저장소가 차단된 직접 방문에서는 재로드 후 이 보조 제목이 유지되지 않을 수 있다. 자유 검색어 `q`, 네이버 광고의 자유 문자열 `n_query/n_keyword`, 알 수 없는 매개변수는 문서 전체를 추적 제외한다. 숫자·영문 형식의 네이버 광고 ID는 허용한다. 실제 광고 캠페인 도입 시 실제 착지 URL로 누락 여부를 먼저 확인한다. 자유 제목을 포함한 과거 직접 문의 URL의 정규화 재로드는 원래 referrer를 제거하므로 해당 방문의 Naver 출처가 Direct로 분류될 수 있다. 검증된 UTM과 상담 출처 경로는 유지한다.

Naver는 경로 변경당 `wcs_do({})`를 한 번 호출하며 해시·쿼리만 바뀌면 추가 호출하지 않는다. 지연 로딩이 끝났을 때 현재 페이지 한 번만 기록하고 과거 URL을 재생하지 않는다. `wcs.event('Consultation', 이름)`으로 `KakaoClick`, `PhoneClick`, `InquiryClick`, `MapClick`, `FormStart`, `LeadAccepted`, `GuideToService`만 보낸다. 공통 `cta_click`을 다시 네이버 이벤트로 보내지 않으며 원시 이름·전화·메시지·주제·접수번호를 네이버 이벤트에 넣지 않는다. 준비 전 이벤트는 최대 20개만 보관한다. 광고 구매 전환 `wcs.trans`를 임의로 만들지 않는다.

Naver 공개 라이브러리는 실제 문서 URL과 `document.referrer`를 읽는다. SPA 가상 페이지뷰의 유입 재분류를 공식적으로 제어하는 인자를 확인하지 못했으므로 임의 referrer 덮어쓰기를 하지 않는다. 과거 검색 유입 bounce 99.82%, 전체 88.65%의 원인과 `/order` 13 PV·GA4 제목 기준 11 PV의 발생 원인은 확정하지 않았다. 이번 수정으로 역사적 통계가 수정되거나 반송률이 정상화되었다고 판단하지 않는다. GA4 참여율과 Naver 반송률은 정의·세션 범위가 달라 직접 역산하지 않는다.

관리자 운영: 2026-10-22 GA4 이벤트 보관은 14개월로 저장했다. 사용자 보관 14개월과 별개 항목이며 표준 집계 보고서 전체가 14개월 후 사라진다는 뜻이 아니다. URL 데이터 수정 키는 `name,email,phone,tel,mobile,address,message,topic,q,search,token,key`를 적용한다. 운영자는 매장·작업실 고정 공인 IP가 없음을 확인했다. 따라서 내부 트래픽 필터는 Testing을 유지하며, 실제 내부 방문 제외로 해석하지 않는다. 직원 검수는 매번 [수집 제외 검수 링크](https://noblessegold.com/?analytics=off)로 시작한다. 제외 상태는 해당 탭의 세션에만 적용되며 다른 탭·브라우저·기기에는 자동 적용되지 않는다. 저장소를 차단한 브라우저에서는 새로고침·재방문 후 링크를 다시 연다. 2026-10-22 Meta 관리자에서 자동 고급 매칭 모든 항목 OFF를 확인했고, ‘코드 없이 자동으로 이벤트 추적’도 OFF로 저장·확인했다. 자동 이벤트 구성은 사이트 코드에서도 비활성화한다.

Meta의 현재 데이터 소스 분류는 ‘개인적인 어려움’이며, 관리자 상세에서 Core 설정과 특정 표준 이벤트의 공유 차단을 확인했다. 수정 화면에는 민감 분류 10개만 있고 일반·기타·없음 항목이 없어 관련 없는 분류로 바꾸지 않았다. 이 제한은 플랫폼 재검토가 필요하며 이벤트 이름·URL 등을 바꿔 우회하지 않는다. 자체 클릭·접수 이벤트를 호출하는 것과 Meta가 광고 최적화에 해당 이벤트를 수신·사용할 수 있는지는 별개다.

AI 채널 분석은 기본 채널 그룹을 임의 수정하지 않고 같은 기간의 세션 source/medium과 검증된 UTM으로 별도 집계한다. `chatgpt.com` 등 Referral 하위 출처와 `utm_source=chatgpt`를 원본 기준과 함께 표시한다. Naver raw referrer의 ChatGPT 12회와 GA4 UTM을 포함한 ChatGPT 세션 327회, Google Search Console AI 노출은 서로 다른 지표이며 합산하거나 같은 방문자로 비교하지 않는다.

접수 메일에는 문의 ID와 상담 시작 페이지, 첫 착지 페이지, 이전 사이트의 호스트, 유효한 캠페인 구분값을 담는다. 고객의 선택형 유입 답변은 이 자동 경로와 구분한다. 이름·연락처·문의 내용은 GA4 이벤트 매개변수로 전달하지 않는다. 문의 ID는 GA4 맞춤 측정기준으로 등록하지 않는다.

`npm run test:measurement`는 실제 플러그인을 브라우저·라우터 모형에서 실행하여 비공개 직접 방문·양방향 이동·referrer 차단, 내부 이동 및 재로드 후 opt-out, 페이지뷰 중복 방지, UTM/광고 식별자 보존, 자유 주제 제외, 네이버 고정 이벤트, 문의 ID 중복 방지, 입력 유효성·HTML 이스케이프·메일 제공자 성공/실패를 검증한다. 픽셀 네트워크와 외부 메일은 모두 모의 처리한다. `npm run typecheck`, `npm run build`, `npm run verify:seo`를 배포 전 실행한다. 배포 후 관리자 설정과 실제 DebugView/Network에서 공개→공개 1회, 공개↔비공개 0회, 자유 검색·개인 URL값 0개를 확인해야 실제 제공사 수신까지 검증한 것이다.

현재 문의 접수는 메일 제공자의 수락까지 확인하며 받은편지함 배달과 상담 완료를 보장하지 않는다. 대장은 접수 ID로 수신 메일과 대조한다. 요청 제한은 서버 인스턴스 메모리 기반이다. 대량 트래픽에 대한 공용 저장소·영속 큐 도입은 별도 운영 설계가 필요하다.

이미지 변환은 Cloudflare 정적 배포에서도 작동하도록 Nuxt Image `ipxStatic`을 명시한다. 새로운 동적 이미지 표시를 추가할 때 프리렌더에 모든 필요한 변환 파일이 포함되는지 확인한다.

글꼴은 기존 Pretendard의 디자인을 유지한 OFL 서브셋 `Noblesse UI`를 자체 제공한다. 홈·공통 문자와 나머지 콘텐츠 문자를 분리했다. 새 콘텐츠의 글자를 추가할 때 `public/fonts/README.md`의 재생성 절차를 따른다. 미포함 문자는 시스템 글꼴로 표시되며, 프로덕션 빌드는 외부 폰트 다운로드나 Python에 의존하지 않는다.

GA4에는 `page_view → form_start → generate_lead` 웹 접수 퍼널과 기존 이벤트 맥락 측정기준 8개를 등록했다. 2026-10-22 이벤트 범위 `service_type`(상담 서비스 유형), `error_code`(문의 오류 코드)를 추가하여 총 10개 등록을 확인했다. `intent`는 버튼 목적, `lead_type`는 접수 성공의 문의 유형, `service_type`은 상담 행동의 고정 서비스 분류이므로 구분해서 사용한다. `error_code`에는 자유 오류 문장 대신 고정된 오류 구분값만 들어간다. 웹 퍼널은 카카오 실문의·전화 통화·매장 계약을 포함하지 않는다. 운영 대장과 같은 기간으로 대조한다.

참고: [Nuxt Image 설정](https://image.nuxt.com/get-started/configuration), [GA4 페이지 조회와 자동 history 비활성화](https://developers.google.com/analytics/devguides/collection/ga4/views), [GA4 SPA 측정](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [GA4 향상된 측정](https://support.google.com/analytics/answer/9216061), [네이버 공식 이벤트 등록 방법](https://help.naver.com/service/9864/contents/15372?lang=ko&osType=PC), [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy).
