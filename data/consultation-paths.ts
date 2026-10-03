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
  links: [{ to: '/custom', label: '디자인 변경·맞춤 제작 안내' }],
}
const repair: ConsultationPath = {
  title: '수리할 부분을 사진으로 먼저 보여주세요',
  description: '제품 전체와 손상된 부분을 함께 확인하면 상담이 수월합니다. 최종 작업 가능 여부는 제품 상태를 확인한 뒤 안내합니다.',
  type: 'repair', prompts: ['제품 전체와 손상 부위 사진', '소재·각인 등 알고 있는 정보', '방문 또는 발송 희망 여부'], gallerySlugs: [],
  links: [{ to: '/repair', label: '수리 가능 범위와 사진 상담 안내' }, { to: '/guide/necklace-bracelet-chain-repair', label: '끊어진 체인 수리 안내' }, { to: '/guide/jongno-ring-size-repair', label: '종로 반지 사이즈 수리 안내' }],
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
  links: [{ to: '/couple-ring', label: '커플링 디자인·각인 상담 안내' }],
}
const buying: ConsultationPath = {
  title: '매입 상담 전에 준비하면 좋은 정보',
  description: '품목과 각인을 먼저 알려주시면 확인 순서를 안내합니다. 최종 금액은 실물의 순도·중량과 상담 당일 시세를 확인한 뒤 정합니다.',
  type: 'other', prompts: ['매입하려는 품목과 전체 사진', '확인 가능한 각인이나 보증서', '방문 희망일'], gallerySlugs: [],
  links: [{ to: '/guide/silver-buying', label: '은 제품 매입 안내' }, { to: '/guide/gold-price-how-to-check', label: '시세와 실제 매입가의 차이' }],
}
const necklace: ConsultationPath = {
  ...custom,
  title: '새 목걸이 제작과 가지고 있는 줄의 길이 조정을 나눠보세요',
  description: '새로 만들 목걸이는 체인과 펜던트의 조합을, 기존 목걸이는 잠금장식과 연결부를 먼저 확인합니다. 아래 등록 디자인은 참고용이며 길이 변경 가능 여부는 상담 후 안내합니다.',
  prompts: ['참고 디자인 또는 현재 목걸이 전체 사진', '원하는 착용 위치와 펜던트 유무', '새로 제작할지, 기존 줄을 조정할지'],
  gallerySlugs: ['rose-gold-chunky-chain-pave-lock-necklace', 'white-gold-pave-rondelle-pendant-necklace'],
  links: [{ to: '/custom', label: '원하는 길이·디자인으로 제작 상담' }, { to: '/repair', label: '기존 목걸이 길이·연결부 수리 상담' }],
}
const bracelet: ConsultationPath = {
  ...custom,
  title: '측정한 손목 둘레로 제작·길이 조정을 상담하세요',
  description: '체인 팔찌와 뱅글은 착용 방법이 다릅니다. 등록된 디자인을 참고해 원하는 형태를 고르고, 기존 팔찌를 조정하려면 전체와 잠금장식 사진을 함께 보내주세요.',
  prompts: ['측정한 손목 둘레와 원하는 착용감', '참고 디자인 또는 현재 팔찌 사진', '새로 제작할지, 기존 팔찌를 조정할지'],
  gallerySlugs: ['gold-layered-chain-bracelet-trio', 'rose-gold-cross-pave-bangle'],
  links: [{ to: '/custom', label: '착용감에 맞춘 팔찌 제작 상담' }, { to: '/repair', label: '기존 팔찌 길이·잠금장치 수리 상담' }],
}

export const consultationPaths: Record<string, ConsultationPath> = {
  '/custom': custom, '/repair': repair, '/baby-gold': baby, '/couple-ring': couple, '/buy-gold': buying,
  '/wedding': { ...couple, title: '예물 구성의 우선순위를 함께 정해보세요', description: '원하는 품목과 스타일, 준비 일정을 기준으로 구성 선택을 돕습니다.', gallerySlugs: ['rose-gold-chain-necklace-bracelet-set'] },
  '/guide/gold-one-don-gram': { ...buying, title: '무게를 확인한 다음, 어떤 상담이 필요하세요?', description: '돌 선물, 맞춤 제작, 보유한 금의 매입 중 목적에 맞는 안내를 선택하세요. 실제 제품 조건과 금액은 상담에서 확인합니다.', prompts: ['돌 선물·제작·매입 중 상담 목적', '관심 디자인 또는 보유 제품 사진', '희망 수령일 또는 방문일'], links: [{ to: '/buy-gold', label: '금·은 매입 상담' }, { to: '/baby-gold', label: '돌반지 디자인과 주문 안내' }, { to: '/custom', label: '맞춤 제작·리폼 상담' }], gallerySlugs: ['pure-gold-horse-baby-ring'] },
  '/guide/gold-necklace-length-guide': necklace,
  '/guide/bracelet-size-measuring-guide': bracelet,
  '/guide/white-gold-discoloration-care': {
    ...repair,
    title: '변색 부위를 확인한 뒤 세척·광택·도금을 구분하세요',
    description: '같은 색 변화라도 표면 오염과 도금 마모는 필요한 작업이 다를 수 있습니다. 보석과 접합부 상태를 함께 확인한 뒤 작업 가능 여부를 안내합니다.',
    prompts: ['제품 전체와 색이 달라진 부분 사진', '소재·각인과 알고 있는 도금 이력', '변색 시점과 사용한 세척제'],
    links: [{ to: '/repair', label: '세척·광택·도금 수리 상담' }, { to: '/guide/gold-plating-repair', label: '재도금 전에 확인할 작업 기준' }],
  },
  '/guide/ring-finger-meaning-guide': {
    ...couple,
    title: '착용할 손가락을 정했다면 디자인과 호수를 함께 보세요',
    description: '상징은 자유롭게 정하되, 반지 폭과 장식 높이에 따라 착용감이 달라질 수 있습니다. 아래 등록 디자인을 참고해 새 반지를 상담하거나, 가진 반지의 사이즈 조정 가능 여부를 확인하세요.',
    prompts: ['착용할 손과 손가락', '참고 디자인 또는 현재 반지 사진', '새 반지 제작 또는 기존 반지 사이즈 조정'],
    links: [{ to: '/custom', label: '착용 위치에 맞는 반지 제작 상담' }, { to: '/repair', label: '가지고 있는 반지 사이즈 수리 상담' }],
  },
  '/guide/jongno-ring-size-repair': {
    ...repair,
    title: '반지 전체·안쪽·세팅 부위를 함께 보여주세요',
    description: '줄이거나 늘릴 수 있는 범위는 소재, 밴드 구조, 보석과 각인 위치에 따라 다릅니다. 실제 반지 상태를 확인한 뒤 작업 방법과 일정을 안내합니다.',
    prompts: ['반지 전체와 안쪽 각인·보석 세팅 사진', '헐거움·조임 등 현재 착용감과 원하는 변화', '이전 수리 이력과 방문 희망일'],
    links: [{ to: '/repair', label: '반지 사이즈 수리·방문 상담 안내' }, { to: '/guide/ring-resizing-repair-time', label: '사이즈 수리 기간을 정하는 기준' }],
  },
  '/guide/couple-ring-14k-18k-price-difference': couple,
  '/guide/necklace-bracelet-chain-repair': repair,
  '/guide/silver-ring-repair-cost': repair,
  '/guide/gold-ring-repair-cost': repair,
  '/guide/gold-jewelry-remodeling-cost': custom,
  '/guide/platinum-vs-white-gold-difference': couple,
}
