export type GuideClusterId = 'repair' | 'wedding' | 'gold-weight' | 'gemstone'

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
