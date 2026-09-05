export type GuideClusterId = 'repair' | 'wedding' | 'gold-weight' | 'gemstone' | 'couple-ring' | 'baby-gold' | 'custom'

export interface GuideClusterLink {
  to: string
  label: string
  description: string
}

export interface GuideCluster {
  id: GuideClusterId
  title: string
  description: string
  hubPath: string
  hubLabel: string
  links: GuideClusterLink[]
}

export const guideClusters: GuideCluster[] = [
  {
    id: 'repair',
    title: '귀금속 수리·AS 가이드',
    description: '증상 확인부터 비용·기간·도금·세팅까지 수리 상담 순서대로 확인하세요.',
    hubPath: '/repair',
    hubLabel: '수리·AS 전체 안내',
    links: [
      { to: '/guide/gold-ring-repair-cost', label: '금반지 수리 비용', description: '작업별 견적 기준' },
      { to: '/guide/jongno-ring-size-repair', label: '반지 사이즈 수리', description: '줄이기·늘리기 전 확인' },
      { to: '/guide/necklace-bracelet-chain-repair', label: '목걸이·팔찌 체인 수리', description: '가능 여부와 기간' },
      { to: '/guide/gold-plating-repair', label: '화이트골드 도금 수리', description: '변색·광택·재도금 기준' },
      { to: '/guide/ring-cubic-stone-repair', label: '반지 큐빅 빠짐 수리', description: '재세팅과 발 보강' },
      { to: '/guide/earring-post-bent-repair', label: '귀걸이 침 수리', description: '휘어짐·부러짐 점검' },
      { to: '/guide/pearl-necklace-restringing', label: '진주 목걸이 줄 교체', description: '매듭과 잠금장식 확인' },
      { to: '/guide/jongno-ring-polishing-cost', label: '반지 광택·마감', description: '세척과 폴리싱 차이' },
      { to: '/guide/white-gold-discoloration-care', label: '화이트골드 변색 관리', description: '재도금 전 확인 기준' },
      { to: '/guide/plated-jewelry-discoloration-care-guide', label: '도금 변색, 닦기 전 원인 확인', description: '오염과 도금 마모 구분법' },
    ],
  },
  {
    id: 'wedding',
    title: '결혼예물 준비 가이드',
    description: '세트 구성·소재·사이즈·제작일정을 촬영일과 예식일에 맞춰 순서대로 정리하세요.',
    hubPath: '/wedding',
    hubLabel: '결혼예물 전체 안내',
    links: [
      { to: '/guide/wedding-jewelry-set-composition', label: '결혼예물 세트 구성', description: '신부·신랑·양가 범위' },
      { to: '/guide/wedding-ring-production-time', label: '결혼반지 제작기간', description: '촬영·예식일 역산' },
      { to: '/guide/platinum-vs-white-gold-difference', label: '화이트골드·백금 차이', description: '무게·변색·관리 비교' },
      { to: '/guide/couple-ring-14k-18k-price-difference', label: '14K·18K 가격 차이', description: '순도와 예산 비교' },
      { to: '/guide/wedding-band-matte-gloss', label: '웨딩밴드 무광·유광', description: '마감과 사용감 비교' },
      { to: '/guide/wedding-band-guard-ring-guide', label: '결혼반지 가드링', description: '형태와 높이 맞추기' },
      { to: '/guide/ring-size-measuring-method', label: '반지 사이즈 재는 법', description: '주문 전 측정 기준' },
      { to: '/guide/diamond-3bu-5bu-difference', label: '다이아 3부·5부 차이', description: '크기와 예산 기준' },
    ],
  },
  {
    id: 'gold-weight',
    title: '금 중량·순도 가이드',
    description: '돈과 g 환산부터 순도·각인·시세까지 같은 기준으로 연결해 비교하세요.',
    hubPath: '/guide/gold-one-don-gram',
    hubLabel: '금 1돈 환산과 계산기',
    links: [
      { to: '/guide/gold-price-how-to-check', label: '금 시세 보는 법', description: '살 때·팔 때 가격 구분' },
      { to: '/guide/jewelry-hallmark-numbers-meaning', label: '585·750·925 각인', description: '금·은 순도 숫자 읽기' },
      { to: '/guide/gold-magnet-test-limitations', label: '금 자석 테스트 한계', description: '순도 확인 순서' },
      { to: '/guide/baby-ring-price', label: '돌반지 가격 기준', description: '중량·순도·공임 확인' },
      { to: '/guide/hollow-vs-solid-gold-jewelry', label: '중공·솔리드 차이', description: '부피와 실제 무게 비교' },
      { to: '/buy-gold', label: '금·은 매입 안내', description: '당일 시세와 계량 상담' },
      { to: '/baby-gold', label: '순금 돌반지 주문', description: '1돈·반돈·각인 상담' },
      { to: '/guide/14k-18k-jewelry-price-difference', label: '14K·18K 주얼리 가격 차이 기준', description: '금 함량·중량·제작 조건·보석·부자재 비교' },
    ],
  },
  {
    id: 'gemstone',
    title: '보석·소재 비교 가이드',
    description: '경도·종류·처리·감별 정보를 구분하고 착용 목적과 관리법까지 함께 확인하세요.',
    hubPath: '/guide?category=소재·보석',
    hubLabel: '소재·보석 가이드 전체 보기',
    links: [
      { to: '/guide/gemstone-mohs-hardness-guide', label: '보석 경도 순위표', description: '긁힘과 충격 차이' },
      { to: '/guide/gemstone-grading-vs-identification-report', label: '감정서·감별서 차이', description: '보고서 목적 구분' },
      { to: '/guide/cubic-moissanite-diamond-difference', label: '큐빅·모이사나이트·다이아', description: '메인스톤 비교' },
      { to: '/guide/lab-grown-diamond-natural-difference', label: '랩그로운·천연 다이아', description: '생성 방식과 선택 기준' },
      { to: '/guide/ruby-vs-pink-sapphire-difference', label: '루비·핑크 사파이어', description: '같은 코런덤의 색 기준' },
      { to: '/guide/pearl-value-factors', label: '진주 품질 7요소', description: '광택·표면·매칭 확인' },
      { to: '/guide/emerald-oil-treatment-care', label: '에메랄드 오일 처리', description: '처리와 세척 주의' },
      { to: '/guide/sapphire-quality-factors', label: '사파이어 등급', description: '색·투명도·컷·처리' },
          { to: '/guide/birthstone-price-factors-guide', label: '탄생석 가격 순위가 달라지는 주요 기준', description: '탄생석은 종류만으로 가격이 정해지지 않습니다' },
      { to: '/guide/ruby-heat-treatment-buying-checklist', label: '루비 가열·비가열, 구매 전 확인할 것', description: '루비 가열·비가열과 유리 충전의 차이를 확인하세요' },
      { to: '/guide/zircon-vs-cubic-zirconia', label: '지르콘과 큐빅 지르코니아 차이', description: '지르콘과 큐빅 지르코니아는 이름이 비슷하지만 재료와 관리법이 다릅니다' },
],
  },
  // 아래 3개 클러스터는 기존 클러스터보다 뒤에 있어야 한다 —
  // findGuideClusterForPath는 첫 매칭을 반환하므로, 중복 등재된 글(14K·18K 가격 차이 등)은 기존 클러스터 블록을 유지한다.
  {
    id: 'couple-ring',
    title: '커플링 준비 가이드',
    description: '가격 차이·각인·사이즈·주문 과정을 상담 전에 순서대로 확인하세요.',
    hubPath: '/couple-ring',
    hubLabel: '커플링 맞춤제작 안내',
    links: [
      { to: '/guide/couple-ring-14k-18k-price-difference', label: '14K·18K 가격 차이', description: '금 함량·중량·공임 비교' },
      { to: '/guide/jongno-14k-couple-ring-quote-checklist', label: '14K 커플링 견적 체크리스트', description: '견적 요청 전 확인 항목' },
      { to: '/guide/couple-ring-engraving-guide', label: '커플링 각인 가이드', description: '문구·위치·서체 선택' },
      { to: '/guide/jongno-custom-couple-ring-order', label: '종로 커플링 주문 과정', description: '상담부터 수령까지' },
      { to: '/guide/rose-gold-couple-ring-selection-guide', label: '로즈골드 커플링 선택', description: '피부톤·도금·관리 기준' },
      { to: '/guide/wedding-ring-vs-couple-ring-choice', label: '결혼반지·커플링 선택', description: '용도별 차이 비교' },
      { to: '/guide/find-girlfriend-ring-size-guide', label: '몰래 반지 사이즈 재기', description: '선물 준비 전 확인' },
      { to: '/gallery', label: '커플링 디자인 갤러리', description: '실제 제작 디자인 보기' },
      { to: '/guide/jongno-couple-ring-price-consultation-prep', label: '종로 커플링 가격 상담 전 정할 것', description: '종로 커플링 상담에서 예산만 말하지 않고 금속, 폭, 보석, 세팅, 착용감과 두 반지의 통일 정도' },
    ],
  },
  {
    id: 'baby-gold',
    title: '돌반지 준비 가이드',
    description: '중량·각인·제작기간·가격 기준을 돌잔치 일정에 맞춰 확인하세요.',
    hubPath: '/baby-gold',
    hubLabel: '순금 돌반지 전체 안내',
    links: [
      { to: '/guide/baby-ring-price', label: '돌반지 가격 기준', description: '중량·순도·공임 확인' },
      { to: '/guide/baby-ring-half-don-one-don-selection', label: '반돈·1돈 선택 기준', description: '예산과 용도 비교' },
      { to: '/guide/baby-ring-engraving-cost', label: '돌반지 각인 비용', description: '이름·날짜 각인 기준' },
      { to: '/guide/baby-ring-order-method', label: '돌반지 주문 방법', description: '문의 전 준비 사항' },
      { to: '/guide/baby-ring-production-time', label: '돌반지 제작기간', description: '돌잔치 일정 역산' },
      { to: '/guide/jongno-baby-gold-ring-purchase-checklist', label: '구매 전 체크리스트', description: '종로 방문 전 확인' },
      { to: '/guide/gold-one-don-gram', label: '금 1돈 무게 환산', description: '돈·그램 계산 기준' },
      { to: '/gallery/pure-gold-horse-baby-ring', label: '말띠 돌반지 디자인', description: '2026 말띠 제작 안내' },
      { to: '/gallery/pure-gold-snake-baby-ring', label: '뱀띠 돌반지 디자인', description: '2025 뱀띠 캐릭터 2종' },
    ],
  },
  {
    id: 'custom',
    title: '주문제작 준비 가이드',
    description: '품목별 주문 방법과 사이즈·체인·제작기간을 상담 전에 확인하세요.',
    hubPath: '/custom',
    hubLabel: '주문제작 전체 안내',
    links: [
      { to: '/guide/custom-ring-consultation-checklist', label: '반지 주문 체크리스트', description: '상담 전 준비 항목' },
      { to: '/guide/custom-gold-bracelet-order', label: '금팔찌 주문제작', description: '길이·굵기·잠금 선택' },
      { to: '/guide/custom-earrings-production-time', label: '귀걸이 제작기간', description: '디자인 확정부터 수령까지' },
      { to: '/guide/gold-necklace-length-guide', label: '목걸이 길이 추천', description: '42·45·50cm 비교' },
      { to: '/guide/necklace-chain-types-guide', label: '목걸이 체인 종류', description: '베네치안·커브·로프 차이' },
      { to: '/guide/bracelet-size-measuring-guide', label: '팔찌 사이즈 재는 법', description: '손목 둘레 측정 기준' },
      { to: '/guide/mother-necklace-design-consulting', label: '어머니 목걸이 상담', description: '선물용 디자인 기준' },
      { to: '/gallery', label: '주문제작 갤러리', description: '실제 제작 디자인 보기' },
      { to: '/guide/jongno-jewelry-quote-comparison-tips', label: '종로 금은방 견적 비교 기록법', description: '금속 정보·비용 항목·환불 조건을 같은 기준으로 비교하는 방법' },
      { to: '/guide/earring-style-by-face-shape', label: '얼굴형별 귀걸이 고르는 법', description: '얼굴형과 헤어스타일에 따라 스터드형, 후프형, 드롭형 귀걸이를 고르는 기준을 정리했습니다' },
      { to: '/guide/stud-earring-meaning-selection-guide', label: '스터드 귀걸이 뜻과 선택 기준', description: '형태·잠금 방식·소재·무게·크기·관리 기준' },
    ],
  },
]

const pathOnly = (value: string) => value.split('?')[0]?.replace(/\/$/, '') || '/'

export const getGuideCluster = (id: GuideClusterId) => guideClusters.find((cluster) => cluster.id === id)

export const findGuideClusterForPath = (path: string) => {
  const normalizedPath = pathOnly(path)
  return guideClusters.find((cluster) => (
    pathOnly(cluster.hubPath) === normalizedPath
    || cluster.links.some((link) => pathOnly(link.to) === normalizedPath)
  ))
}

export const normalizeGuidePath = pathOnly
