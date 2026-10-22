# 의존성 보안 감사 — 2026-10-22

## 결론과 검사 범위

추가한 XML 검증 도구와 실제 sitemap 런타임이 함께 사용하는 `fast-xml-parser`를 5.3.3에서 같은 major의 5.11.2로 교체했다. `npm ls`에서 직접 의존성과 `@nuxtjs/sitemap`의 의존성이 같은 수정 버전을 사용함을 확인했다. XML 회귀 4개와 `npm run typecheck`가 통과했다. 이 버전은 재실행한 npm audit에 취약 패키지로 보고되지 않는다.

원본 감사와 수정 후 감사 JSON은 `../analysis_work/audit_20261022/implementation/`에 보관했다. npm 수치는 취약성의 영향을 받는 **패키지 수**이며, 서로 다른 실제 공격 경로의 수가 아니다. `--omit=dev` 역시 Nuxt의 dependencies 아래 설치된 개발·빌드 도구를 포함하므로 그대로 운영 서버 취약점 수로 읽으면 안 된다.

| 범위 | 수정 전 | XML 파서 수정 후 |
| --- | --- | --- |
| 전체 | 57: critical 6, high 38, moderate 10, low 3 | 56: critical 5, high 38, moderate 10, low 3 |
| `--omit=dev` | 54: critical 6, high 35, moderate 10, low 3 | 53: critical 5, high 35, moderate 10, low 3 |

배포 worker의 소스맵 275개와 소스 설정·호출 지점을 대조했다. 이 소스맵은 XML 파서 수정 전 첫 production build 기준이다. 패키지 포함 여부는 함수에 공격 입력이 도달한다는 뜻이 아니며, 포함되지 않았다는 결과도 개발 PC 안전을 뜻하지 않는다. 운영 서버에 공격 요청을 보내거나 공격 코드를 실행하지 않았다. 전체 침투 테스트를 대체하지 않는다. 수정 후 최종 빌드는 root 검증 기록을 따른다.

## Critical 6개 분류

| 패키지와 확인 버전 | 영향 조건과 현재 관찰 | 조치 |
| --- | --- | --- |
| fast-xml-parser 5.3.3 | worker에 포함. 신뢰할 수 없는 XML의 DOCTYPE·entity 등을 파싱하는 경로가 문제이며, 현재 앱은 사용자 XML 업로드 API를 제공하지 않는다. sitemap 모듈의 XML 파서도 포함되어 있어 제거 대상이다. | **5.11.2로 수정 완료**, 회귀 통과. [공식 advisory](https://github.com/advisories/GHSA-m7jm-9gc2-mpf2) |
| @nuxt/devtools 3.1.1 | worker 소스맵에 없음. 개발 모드 HMR RPC에 연결할 수 있으면 개발 PC 명령 실행이 가능하며, localhost 개발 서버도 악성 웹페이지를 방문하는 조건을 무시할 수 없다. | `devtools: { enabled: false }`로 개발 환경도 비활성화했다. production 평가값은 변경 전후 모두 false다. 의존성 경고 자체는 남으므로 다음 호환 업데이트 때 3.3.1 이상 수정 버전 반영·재감사. [공식 advisory](https://github.com/advisories/GHSA-279x-mwfv-vcqv) |
| seroval 1.4.2 | Nuxt Vite builder 하위, worker 소스맵에 없음. 공격자 데이터의 `fromJSON` 역직렬화와 특정 plugin 반환값·thenable 경로가 필요하다. | 빌드 체인 업데이트 계획에 포함. 한 advisory의 최소 수정 버전만으로 전체 취약점 해소를 단정하지 않는다. [공식 advisory](https://github.com/advisories/GHSA-p6vx-979v-rg4c) |
| shell-quote 1.8.3 | launch-editor 하위, worker 소스맵에 없음. 신뢰하지 않는 object-token의 `op` 등을 명령 인자로 만들어 shell 실행하는 조건이 필요하다. | devtools/launch-editor 체인과 함께 수정. [공식 advisory](https://github.com/advisories/GHSA-w7jw-789q-3m8p) |
| simple-git 3.30.0 | devtools 하위, worker 소스맵에 없음. 공격자에게 Git 설정·실행 인자를 허용하는 애플리케이션이 대상이다. 본 앱의 운영 API에 Git 실행 기능은 없다. | devtools 체인 업데이트 시 4.0.1 관련 수정 포함 여부를 확인. 상위 패키지와의 major 호환성 검토 없이 override하지 않는다. [공식 advisory](https://github.com/advisories/GHSA-x6jw-m9v5-85vh) |
| tar 7.5.2 | Nitro → NFT → node-pre-gyp 하위, worker 소스맵에 없음. 신뢰할 수 없는 압축 tar 처리 시 자원 고갈·파일 경로 문제가 가능하다. 운영 API는 tar 업로드·해제를 제공하지 않는다. | 설치·빌드 체인 갱신 시 수정. [공식 advisory](https://github.com/advisories/GHSA-23hp-3jrh-7fpw) |

## Worker에 포함된 high 계열

| 계열 | 실제 사용 경로 조사 | 판정과 후속 |
| --- | --- | --- |
| Nuxt 3.20.2 | `.server.vue` 파일 없음, runtimeCompiler 활성화 설정 없음. 빌드의 `/__nuxt_island/**` handler는 빈 handler다. 앱에서 사용자 URL을 바로 `NuxtLink`·`navigateTo`에 넣는 사용과 NoScript 사용을 찾지 못했다. 링크는 정적 데이터·내부 경로·고정 prefix로 만든다. | island RCE/DoS와 임의 프로토콜 링크 XSS의 전제조건을 현재 코드에서 확인하지 못했다. Nuxt 3 지원 수정 버전으로 별도 업데이트·회귀 필요. [island advisory](https://github.com/advisories/GHSA-9473-5f9j-94wq), [NuxtLink advisory](https://github.com/advisories/GHSA-934w-87qh-qr26) |
| h3 1.15.4 | worker에 포함되나 `serveStatic`·`createEventStream` 함수는 생성 JS에서 발견되지 않았다. 정적 이미지는 Cloudflare Pages assets로 처리한다. 운영은 Cloudflare Request 기반이며 Node TCP socket 서버가 아니다. | 파일 시스템 static traversal·SSE injection 기능 경로 없음. TE.TE request-smuggling은 Node/비정규화 TCP proxy 조건과 차이가 있어 현재 배포 공격 경로로 확인되지 않았다. 다음 Nitro 갱신 시 h3도 패치. [static advisory](https://github.com/advisories/GHSA-wr4h-v87w-p3r7), [TE.TE advisory](https://github.com/advisories/GHSA-mp2g-9vg9-f4cg) |
| nitropack 2.12.9 | routeRules에 proxy 또는 wildcard redirect를 사용하지 않는다. high 표시는 하위 의존성 영향도 포함한다. | 두 직접 advisory의 기능 조건 없음. 업데이트는 h3·배포 adapter와 함께 검증. [공식 advisory](https://github.com/advisories/GHSA-5w89-w975-hf9q) |
| Vue / server-renderer 3.5.26 | SSR 사용. 앱 템플릿에서 외부 입력 object의 속성 이름을 `v-bind="userObject"`처럼 그대로 렌더하는 사용은 찾지 못했다. | 알려진 CR attribute-name XSS의 공격 입력 경로 미확인. Vue·server-renderer·compiler 버전을 일치시켜 3.5.42 이상 수정 버전 반영 검토. [공식 advisory](https://github.com/advisories/GHSA-g2v6-rqmx-r4w6) |
| devalue 5.6.1 | Nuxt SSR payload에 사용된다. 앱 서버가 외부 입력을 devalue.parse/unflatten 하는 코드 없음. 공개 주문·견적 payload는 JSON 필드이며 이미지 BLOB은 별도 Uint8Array Response로 보낸다. Node Buffer를 SSR payload로 보내는 사용 없음. | parse/희소 배열/공유 메모리 경로가 현재 앱 입력에서 확인되지 않았다. 프레임워크 serializer의 잔여 위험이므로 다음 갱신 우선 대상. [공유 메모리 advisory](https://github.com/advisories/GHSA-j22f-vq7h-c4qm) |
| defu 6.1.4 | 앱 코드에서 defu 직접 호출 없음. 모듈의 설정·routeRules 병합 사용이 존재한다. | 외부 요청 body를 defaults로 병합하는 경로를 찾지 못했다. 6.1.5 이상 수정 버전 반영 검토. [공식 advisory](https://github.com/advisories/GHSA-737v-mqg7-c878) |
| @nuxt/image / sharp / IPX | @nuxt/image 런타임 helper는 포함. 설정은 `ipxStatic`이며 `/Image/*`, `/_ipx/*`는 worker 밖에서 제공한다. | 임의 사용자 이미지의 서버 변환 API를 운영하지 않는다. sharp/IPX 업데이트는 이미지 생성·빌드 회귀가 필요하다. |
| unhead 2.1.1 | 앱에서 useHeadSafe 호출 없음. 메타·JSON-LD 생성 사용은 있으며 서비스 값은 정적 데이터다. | 보고된 useHeadSafe의 사용자 속성·URI 입력 전제가 미확인. Nuxt head 체인 갱신에 포함. |

## 다음 수정 단위

현재 정적 검토에서 XML 파서 외에 **배포를 즉시 중단해야 하는 공개 요청 취약 경로를 추가로 확인하지는 못했다**. 이는 남은 56개 경고가 해결됐다는 판정이 아니다. DevTools는 개발 환경에서도 비활성화하는 공식 완화책을 적용했지만 취약 패키지의 버전 갱신은 후속으로 남아 있다. 이 설정은 새로 시작한 개발 서버부터 적용되므로 이미 실행 중인 Nuxt 개발 서버가 있다면 종료·재시작해야 한다.

현재 npm audit의 `fixAvailable: true`는 Nuxt·Vue·image·wrangler 등에 허용 범위 내 해법이 있음을 나타낸다. 실제 업데이트 후 재감사와 앱 회귀를 해야 수정 완료라고 할 수 있다. Tailwind 모듈의 자동 제안에는 구버전 이동, sharp에는 pre-1.0 호환성 경계가 있어 `npm audit fix --force`는 실행하지 않았다. 다음 작업은 (1) DevTools 개발 호스트 보호, (2) Nuxt 3·Nitro/h3·Vue·serializer/head 체인의 좁은 업데이트, (3) 빌드 도구 갱신으로 나누고, 각 단계에서 build/typecheck/사이트맵/414개 화면/관리자·주문·견적 검증을 수행한다.
