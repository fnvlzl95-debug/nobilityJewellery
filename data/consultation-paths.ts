export interface ConsultationPath {
  title: string
  kakaoLabel?: string
  priceGuidance?: string[]
  description: string
  type: 'custom' | 'repair' | 'other'
  prompts: string[]
  gallerySlugs: string[]
  links?: { to: string; label: string }[]
}

const custom: ConsultationPath = {
  title: '원하는 디자인에서 제작 상담으로',
  description: '참고 사진과 바꾸고 싶은 부분을 알려주세요. 제작 가능한 범위와 확인할 사항부터 안내합니다.',
  type: 'custom', prompts: ['원하는 스타일 또는 참고 사진', '새로 제작할지, 가지고 있는 제품을 리폼할지', '희망 수령일 · 제작은 최소 3주'],
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
  type: 'custom', prompts: ['마음에 드는 디자인', '각인 등 원하는 변경', '선물할 날짜 · 제작은 최소 3주'],
  gallerySlugs: ['pure-gold-horse-baby-ring'],
}
const couple: ConsultationPath = {
  title: '두 분이 원하는 커플링을 함께 고르세요',
  description: '원하시는 디자인과 예산 범위, 희망 수령일을 알려주세요. 호수를 아직 정하지 않았다면 상담 내용에 미정으로 적어주세요.',
  kakaoLabel: '예산·일정 카톡 상담',
  priceGuidance: ['견적은 상담 시점의 금시세와 소재, 두 반지의 호수·폭·디자인에 따라 달라집니다.', '보석과 각인 등 원하는 변경 사항을 함께 알려주세요. 제작 가능 범위와 비용을 확인한 뒤 결정할 수 있습니다.', '정해 둔 예산 범위가 있다면 먼저 알려주세요. 상세 가격과 중량은 개별 상담에서 안내합니다.'],
  type: 'custom', prompts: ['두 반지의 예산 범위', '참고 디자인과 선호 색상', '착용할 손가락·호수 (미정 가능)', '각인 등 원하는 변경', '희망 수령일 · 제작은 최소 3주'],
  gallerySlugs: ['promise-couple-ring', 'two-tone-lattice-tension-couple-ring'],
  links: [{ to: '/couple-ring', label: '커플링 디자인·각인 상담 안내' }, { to: '/guide/couple-ring-14k-18k-price-difference', label: '14K·18K 견적이 달라지는 기준' }],
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
  '/guide/diamond-ring-lower-setting-remodel': {
    title: '반지 옆면 사진으로 낮은 세팅 상담하기',
    description: '현재 반지에서 불편한 점과 유지하고 싶은 부분을 알려주세요. 구조와 보석 상태를 확인해 리폼 가능 범위와 견적을 상담합니다.',
    type: 'custom',
    kakaoLabel: '반지 높이·리폼 카톡 상담',
    prompts: ['반지 정면·옆면·안쪽 사진과 알고 있는 소재', '옷에 걸리는 위치와 불편함이 시작된 시점', '유지할 보석·밴드와 원하는 디자인', '예산 범위와 희망 수령일 · 주문제작 최소 3주'],
    gallerySlugs: [],
    links: [{ to: '/custom', label: '리폼·주문제작 가능 범위 안내' }, { to: '/contact', label: '종로 매장 위치와 방문 문의' }],
  },
  '/custom': custom, '/repair': repair, '/baby-gold': baby, '/couple-ring': couple, '/buy-gold': buying,
  '/wedding': { ...couple, priceGuidance: undefined, prompts: ['참고 디자인과 선호 색상', '각인 등 원하는 변경', '희망 수령일 · 제작은 최소 3주'], title: '예물 구성의 우선순위를 함께 정해보세요', description: '원하는 품목과 스타일, 준비 일정을 기준으로 구성 선택을 돕습니다.', gallerySlugs: ['rose-gold-chain-necklace-bracelet-set'] },
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
    priceGuidance: undefined,
    kakaoLabel: '반지 제작·조정 카톡 상담',
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
  '/guide/couple-ring-finger-placement': { ...couple, title: '두 분에게 맞는 커플링을 찾아보세요' },
  '/guide/ring-spinning-fit-balance-guide': {
    ...repair,
    title: '반지가 돌아가는 상황과 착용감을 알려주세요',
    description: '호수뿐 아니라 반지 폭과 장식의 무게 균형도 함께 확인합니다. 사진만으로 수리 방법을 확정하지 않고, 실제 상태를 확인한 뒤 가능한 작업을 안내합니다.',
    kakaoLabel: '반지 착용감 카톡 상담',
    prompts: ['반지 전체·옆면·안쪽 각인 사진', '언제 돌아가는지와 헐거움·조임 여부', '이전 사이즈 조절 이력과 희망 방문일'],
    links: [{ to: '/repair', label: '반지 수리 상담 안내' }, { to: '/guide/jongno-ring-size-repair', label: '사이즈 조절 전에 확인할 기준' }],
  },
  '/guide/couple-ring-14k-18k-price-difference': couple,
  '/guide/necklace-bracelet-chain-repair': repair,
  '/guide/silver-ring-repair-cost': repair,
  '/guide/gold-ring-repair-cost': repair,
  '/guide/gold-jewelry-remodeling-cost': custom,
  '/guide/single-earring-to-pendant-remodel': {
    title: '남은 귀걸이 사진으로 목걸이 리폼 상담하기',
    description: '귀걸이 사진과 남기고 싶은 부분을 보내주세요. 가능한 제작 방향과 실물로 확인할 항목을 안내합니다.',
    type: 'custom',
    kakaoLabel: '귀걸이 사진으로 리폼 상담',
    prompts: ['귀걸이 앞·옆·뒤 사진과 알고 있는 소재', '살리고 싶은 장식 또는 보석', '보유 체인 사용 또는 새 체인 구매 희망', '예산 범위와 희망 수령일 · 주문제작 최소 3주'],
    gallerySlugs: [],
    links: [{ to: '/custom', label: '리폼·주문제작 진행 안내' }],
  },
  '/guide/platinum-vs-white-gold-difference': couple,
}
