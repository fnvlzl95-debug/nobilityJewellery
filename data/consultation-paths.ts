export interface ConsultationPath {
  title: string
  description: string
  type: 'custom' | 'repair' | 'other'
  prompts: string[]
  gallerySlugs: string[]
  links?: { to: string; label: string }[]
}

const custom: ConsultationPath = {
  title: '원하는 디자인에서 제작 상담으로',
  description: '참고 사진과 바꾸고 싶은 부분을 알려주세요. 제작 가능한 범위와 확인할 사항부터 안내합니다.',
  type: 'custom', prompts: ['원하는 스타일 또는 참고 사진', '새로 제작할지, 가지고 있는 제품을 리폼할지', '희망 수령일 · 제작은 최소 2주'],
  gallerySlugs: ['rose-gold-chunky-chain-pave-lock-necklace', 'gold-layered-chain-bracelet-trio'],
}
const repair: ConsultationPath = {
  title: '수리할 부분을 사진으로 먼저 보여주세요',
  description: '제품 전체와 손상된 부분을 함께 확인하면 상담이 수월합니다. 최종 작업 가능 여부는 제품 상태를 확인한 뒤 안내합니다.',
  type: 'repair', prompts: ['제품 전체와 손상 부위 사진', '소재·각인 등 알고 있는 정보', '방문 또는 발송 희망 여부'], gallerySlugs: [],
  links: [{ to: '/guide/necklace-bracelet-chain-repair', label: '끊어진 체인 수리 안내' }, { to: '/guide/jongno-ring-size-repair', label: '종로 반지 사이즈 수리 안내' }],
}
const baby: ConsultationPath = {
  title: '돌 선물, 디자인과 일정부터 골라보세요',
  description: '마음에 드는 디자인과 선물할 날짜를 알려주세요. 소재와 주문 조건은 상담으로 안내합니다.',
  type: 'custom', prompts: ['마음에 드는 디자인', '각인 등 원하는 변경', '선물할 날짜 · 제작은 최소 2주'],
  gallerySlugs: ['pure-gold-horse-baby-ring'],
}
const couple: ConsultationPath = {
  title: '두 분이 원하는 커플링을 함께 고르세요',
  description: '사진의 디자인을 시작점으로 소재·색상과 각인 방향을 상담할 수 있습니다.',
  type: 'custom', prompts: ['참고 디자인과 선호 색상', '각인 등 원하는 변경', '희망 수령일 · 제작은 최소 2주'],
  gallerySlugs: ['promise-couple-ring', 'two-tone-lattice-tension-couple-ring'],
}
const buying: ConsultationPath = {
  title: '매입 상담 전에 준비하면 좋은 정보',
  description: '품목과 각인을 먼저 알려주시면 확인 순서를 안내합니다. 최종 금액은 실물의 순도·중량과 상담 당일 시세를 확인한 뒤 정합니다.',
  type: 'other', prompts: ['매입하려는 품목과 전체 사진', '확인 가능한 각인이나 보증서', '방문 희망일'], gallerySlugs: [],
  links: [{ to: '/guide/silver-buying', label: '은 제품 매입 안내' }, { to: '/guide/gold-price-how-to-check', label: '시세와 실제 매입가의 차이' }],
}
const necklace: ConsultationPath = { ...custom, title: '착용 스타일에 맞는 목걸이를 찾아보세요', prompts: ['마음에 드는 목걸이 사진', '원하는 착용 위치와 스타일', '희망 수령일 · 제작은 최소 2주'], gallerySlugs: ['rose-gold-chunky-chain-pave-lock-necklace', 'white-gold-pave-rondelle-pendant-necklace'] }
const bracelet: ConsultationPath = { ...custom, title: '팔찌의 착용감과 디자인을 함께 상담하세요', prompts: ['원하는 팔찌 디자인', '여유 있는 착용감 또는 밀착되는 착용감', '희망 수령일 · 제작은 최소 2주'], gallerySlugs: ['gold-layered-chain-bracelet-trio'] }

export const consultationPaths: Record<string, ConsultationPath> = {
  '/custom': custom, '/repair': repair, '/baby-gold': baby, '/couple-ring': couple, '/buy-gold': buying,
  '/wedding': { ...couple, title: '예물 구성의 우선순위를 함께 정해보세요', description: '원하는 품목과 스타일, 준비 일정을 기준으로 구성 선택을 돕습니다.', gallerySlugs: ['rose-gold-chain-necklace-bracelet-set'] },
  '/guide/gold-one-don-gram': { ...buying, title: '무게를 확인한 다음, 어떤 상담이 필요하세요?', description: '돌 선물, 맞춤 제작, 보유한 금의 매입 중 목적에 맞는 안내를 선택하세요. 실제 제품 조건과 금액은 상담에서 확인합니다.', prompts: ['돌 선물·제작·매입 중 상담 목적', '관심 디자인 또는 보유 제품 사진', '희망 수령일 또는 방문일'], links: [{ to: '/buy-gold', label: '금·은 매입 상담' }, { to: '/baby-gold', label: '돌반지 디자인과 주문 안내' }, { to: '/custom', label: '맞춤 제작·리폼 상담' }], gallerySlugs: ['pure-gold-horse-baby-ring'] },
  '/guide/gold-necklace-length-guide': necklace,
  '/guide/bracelet-size-measuring-guide': bracelet,
  '/guide/white-gold-discoloration-care': repair,
  '/guide/couple-ring-14k-18k-price-difference': couple,
  '/guide/necklace-bracelet-chain-repair': repair,
  '/guide/silver-ring-repair-cost': repair,
  '/guide/gold-ring-repair-cost': repair,
  '/guide/gold-jewelry-remodeling-cost': custom,
  '/guide/platinum-vs-white-gold-difference': couple,
}
