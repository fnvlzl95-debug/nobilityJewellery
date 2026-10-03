import type { GalleryItem } from './gallery-items'

// Existing catalog designs: consultation guidance, not customer outcome claims.
interface GalleryConsultation {
  title: string
  points: string[]
  scope?: string
  links?: { to: string; label: string }[]
}

export const galleryConsultation: Record<string, GalleryConsultation> = {
  'promise-couple-ring': {
    title: '레터링과 각인 방향부터 정해보세요',
    points: ['사진의 레터링 느낌을 유지할지, 다른 각인을 원하는지 알려주세요.', '두 반지의 색상을 맞출지 다르게 할지 함께 상담합니다.', '원하는 각인과 수령일을 보내주시면 제작 조건을 확인합니다.'],
  },
  'rose-gold-chunky-chain-pave-lock-necklace': {
    title: '체인과 잠금장치의 느낌을 함께 살펴보세요',
    points: ['볼륨감 있는 체인과 파베 장식 중 마음에 드는 부분을 알려주세요.', '원하는 착용 위치와 평소 착용 스타일을 함께 전달해주세요.', '기존 제품 리폼을 생각하신다면 보유 제품 사진도 필요합니다. 재사용 가능 범위는 상태 확인 후 안내합니다.'],
  },
  'gold-layered-chain-bracelet-trio': {
    title: '레이어드 스타일과 착용감을 비교하세요',
    points: ['사진에서 마음에 드는 체인 형태를 골라주세요.', '단독 착용인지 다른 팔찌와 함께 착용할지 알려주세요.', '손목에 밀착되는 느낌과 여유 있는 느낌 중 선호하는 착용감으로 상담합니다.'],
  },
  'pure-gold-horse-baby-ring': {
    title: '돌 선물의 디자인과 준비 일정을 확인하세요',
    points: ['말 모티프 디자인을 기준으로 선물 용도를 알려주세요.', '각인 등 원하는 변경은 제작 가능 여부부터 확인합니다.', '선물 날짜를 먼저 알려주세요. 주문제작에는 최소 2주가 필요합니다.'],
  },
  'pure-gold-snake-baby-ring': {
    title: '왕관 뱀 모티프, 원하는 디자인부터 골라주세요',
    points: [
      '각 사진의 뱀 캐릭터 표정과 왕관, 반지 몸체의 연결 모양을 비교하고 마음에 드는 사진을 보내주세요.',
      '돌·백일 선물인지, 기념으로 보관할 반지인지와 이름·날짜 각인 희망 여부를 함께 알려주세요.',
      '선물할 날짜를 먼저 알려주세요. 주문제작은 최소 2주가 필요하며 디자인과 각인 확정 후 수령 일정을 확인합니다.',
    ],
    scope: '사진의 디자인을 기준으로 상담합니다. 모티프 변경, 각인 위치·문구, 원하는 사이즈의 제작 가능 여부는 상담 후 확정합니다. 사진만으로 재고나 즉시 수령 가능 여부를 판단하지 말고 먼저 확인해주세요.',
    links: [
      { to: '/baby-gold', label: '순금 돌반지 주문 안내' },
      { to: '/guide/baby-ring-production-time', label: '돌반지 제작 일정 준비' },
    ],
  },
  'modern-dual-chain-set': {
    title: '한 세트에서 필요한 품목만 먼저 정하세요',
    points: [
      '사진의 체인과 장식 중 함께 맞추고 싶은 부분을 골라주세요.',
      '목걸이·반지·귀걸이 등 필요한 품목과 평소 착용할 때의 스타일을 알려주세요.',
      '예물로 준비한다면 촬영일·예식일 중 먼저 필요한 날짜와 희망 소재·색상을 함께 보내주세요.',
    ],
    links: [{ to: '/wedding', label: '결혼예물 구성 상담' }],
  },
  'u-link-lettering-signature-set': {
    title: '링크 모양과 레터링을 함께 비교하세요',
    points: [
      'U자 링크와 레터링 장식 중 유지하고 싶은 부분을 알려주세요.',
      '세트 전체가 필요한지, 일부 품목만 맞추고 싶은지 먼저 정해주세요.',
      '희망 색상과 각인 문구가 있다면 사진과 함께 보내주세요. 장식·각인 변경 가능 범위는 상담으로 확인합니다.',
    ],
    links: [{ to: '/wedding', label: '결혼예물 구성 상담' }],
  },
}

const categoryConsultation: Record<string, GalleryConsultation> = {
  ring: {
    title: '반지의 모양과 착용감을 함께 상담하세요',
    points: ['사진에서 유지하고 싶은 장식·표면 마감과 바꾸고 싶은 부분을 알려주세요.', '착용할 손가락과 알고 있는 반지 사이즈, 희망 소재·색상을 함께 보내주세요.', '각인 희망 여부와 수령일을 알려주시면 디자인에 맞는 제작 조건을 확인합니다.'],
  },
  necklace: {
    title: '목걸이의 체인과 착용 위치를 정해보세요',
    points: ['체인 모양과 펜던트 중 마음에 드는 부분을 알려주세요.', '목에 붙는 느낌인지 가슴 쪽으로 내려오는 느낌인지, 평소 함께 착용할 주얼리가 있는지 알려주세요.', '기존 펜던트를 사용하려면 전체 사진과 연결 고리 사진을 보내주세요. 호환 여부는 확인 후 안내합니다.'],
  },
  bracelet: {
    title: '팔찌의 구조와 원하는 착용감을 알려주세요',
    points: ['체인·장식·잠금장치 중 마음에 드는 부분을 사진으로 골라주세요.', '손목에 밀착되는 느낌과 여유 있는 느낌 중 선호하는 착용감을 알려주세요.', '단독 착용인지 시계나 다른 팔찌와 함께 착용할지, 희망 수령일도 함께 알려주세요.'],
  },
  earring: {
    title: '귀걸이의 장식과 잠금 방식을 확인하세요',
    points: ['사진에서 원하는 장식 모양과 희망 소재·색상을 알려주세요.', '평소 착용하는 귀걸이의 잠금 방식과 불편했던 부분이 있으면 함께 알려주세요.', '선물이나 행사 용도라면 필요한 날짜와 변경하고 싶은 부분을 함께 보내주세요.'],
  },
  set: {
    title: '함께 맞출 품목과 색상부터 정하세요',
    points: ['세트 전체 또는 일부 품목 중 필요한 구성을 알려주세요.', '사진에서 맞추고 싶은 모티프와 희망 소재·색상을 함께 보내주세요.', '예물·선물·평소 착용 중 용도와 희망 수령일을 알려주시면 구성별 제작 조건을 확인합니다.'],
    links: [{ to: '/wedding', label: '결혼예물 구성 상담' }],
  },
}

export const getGalleryConsultation = (item: GalleryItem): GalleryConsultation => ({
  scope: '갤러리 사진을 기준으로 소재·색상·디자인 변경을 상담할 수 있습니다. 변경 가능한 범위와 최종 제작 사양, 수령 일정은 상담 후 확정합니다.',
  ...(galleryConsultation[item.slug] ?? categoryConsultation[item.category] ?? categoryConsultation.ring),
})
