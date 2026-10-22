interface ServiceQuestion {
  question: string
  answer: string
  links: { to: string; label: string }[]
}

export const serviceQuestions: Record<string, ServiceQuestion[]> = {
  '/custom': [
    {
      question: '사진으로 주문제작을 상담하려면 무엇을 보내나요?',
      answer: '참고 사진에서 유지할 모양과 바꿀 부분을 나눠 알려주세요. 소재·색상, 착용 부위와 희망 수령일을 함께 확인한 뒤 제작 가능 범위와 견적을 안내합니다. 사진만으로 같은 구조의 제작이 확정되지는 않습니다.',
      links: [{ to: '/guide/ai-image-jewelry-custom-order', label: '참고 이미지로 제작 상담 준비하기' }, { to: '/guide/chain-ring-flexible-rigid-selection', label: '체인 반지의 모양과 움직임 구분' }, { to: '/guide/east-west-ring-custom-orientation', label: '중심석 가로·세로 방향 정하기' }],
    },
    {
      question: '각인은 어떤 디자인을 보며 정할 수 있나요?',
      answer: '공개된 프라미스 각인 커플링에서 레터링의 위치와 밴드 모양을 살펴보세요. 원하는 문구와 위치를 보내주시면 실제 디자인의 공간에 맞는지 확인합니다. 사진에 없는 글자 수·서체·깊이를 미리 확정하지 않습니다.',
      links: [{ to: '/gallery/promise-couple-ring', label: '프라미스 각인 커플링 사진 보기' }, { to: '/guide/couple-ring-engraving-guide', label: '각인 문구와 위치 정하기' }],
    },
    {
      question: '제작 기간과 견적은 언제 확정하나요?',
      answer: '주문제작은 최소 2주를 기준으로 상담하며, 디자인·소재·보석·각인 등 최종 조건에 따라 일정이 달라집니다. 먼저 필요한 날짜를 알려주세요. 기존 주얼리를 활용하는 리폼은 제품의 상태와 활용 가능한 부분도 확인합니다.',
      links: [{ to: '/guide/gold-jewelry-remodeling-cost', label: '기존 주얼리 리폼 전에 확인할 조건' }],
    },
    {
      question: '가족을 담는 보석이나 길이 조절 구조는 어떻게 설명하나요?',
      answer: '가족 반지는 담고 싶은 생월과 보석의 배치 순서를, 조절형 팔찌는 원하는 착용감과 조절 방식을 나눠 알려주세요. 의미와 외형을 정하는 단계에서 실제 보석 확보 여부나 내부 부품을 확정하지 않고, 가능한 구성부터 확인합니다.',
      links: [{ to: '/guide/family-birthstone-ring-custom-order', label: '가족 탄생석 반지의 구성 기록' }, { to: '/guide/slider-bracelet-adjustment-tail-selection', label: '슬라이더 팔찌 조절 구조 확인' }],
    },
  ],
  '/repair': [
    {
      question: '반지 사이즈는 얼마나 늘리거나 줄일 수 있나요?',
      answer: '소재, 밴드 구조, 보석 세팅과 각인 위치에 따라 달라집니다. 반지 전체·안쪽·보석 부분 사진과 현재 착용감을 보내주세요. 사진 상담 뒤 실물 상태를 확인해 작업 범위와 일정을 안내합니다.',
      links: [{ to: '/guide/jongno-ring-size-repair', label: '반지 사이즈 수리 기준' }, { to: '/guide/eternity-ring-half-full-selection', label: '보석이 이어진 에타니티 반지의 구조 확인' }],
    },
    {
      question: '끊어진 체인은 연결 작업만 하면 되나요?',
      answer: '체인 중간이 끊어졌는지, 연결 고리나 잠금장치에 문제가 있는지 먼저 구분합니다. 손상 부위의 가까운 사진과 전체 사진을 함께 보내주세요. 같은 모양의 부품을 사용할 수 있는지와 주변 마모도 확인해야 합니다.',
      links: [{ to: '/guide/necklace-bracelet-chain-repair', label: '체인 손상 위치별 상담 준비' }, { to: '/guide/necklace-clasp-types', label: '목걸이 잠금장치 구조 확인' }],
    },
    {
      question: '사진만으로 비용과 당일 완료 여부를 알 수 있나요?',
      answer: '사진으로 필요한 확인 사항을 먼저 안내할 수 있습니다. 최종 비용과 완료 일정은 소재·보석·손상 정도와 필요한 부품을 확인한 뒤 정합니다. 이전 수리나 도금 이력이 있다면 함께 알려주세요.',
      links: [{ to: '/guide/ring-resizing-repair-time', label: '수리 기간이 달라지는 이유' }, { to: '/guide/gold-plating-repair', label: '세척·광택과 재도금 구분하기' }],
    },
  ],
  '/baby-gold': [
    {
      question: '말띠·뱀띠 돌반지는 어떤 사진을 볼 수 있나요?',
      answer: '말 모티브를 새긴 말띠 아기 돌반지와 왕관을 쓴 뱀 캐릭터의 뱀띠 아기 돌반지가 공개돼 있습니다. 정면과 측면 사진에서 모티브와 각인 위치를 비교하고, 원하는 디자인을 상담 때 알려주세요.',
      links: [{ to: '/gallery/pure-gold-horse-baby-ring', label: '말띠 아기 돌반지 사진' }, { to: '/gallery/pure-gold-snake-baby-ring', label: '뱀띠 아기 돌반지 사진' }],
    },
    {
      question: '이름 각인과 선물 날짜는 언제 정하나요?',
      answer: '이름·날짜 등 원하는 문구와 각인 위치, 선물할 날짜를 상담 때 함께 보내주세요. 주문제작은 최소 2주를 기준으로 하며 디자인 확정 후 가능한 수령 일정을 안내합니다. 각인은 반지의 모티브와 사용 가능한 면을 확인한 뒤 정합니다.',
      links: [{ to: '/guide/baby-ring-engraving-cost', label: '돌반지 이름 각인 준비' }, { to: '/guide/baby-ring-production-time', label: '돌반지 제작 일정 확인' }],
    },
    {
      question: '돌반지 가격은 어떤 조건으로 상담하나요?',
      answer: '상담 시점의 금시세와 선택한 소재·디자인·각인 조건을 함께 확인합니다. 예산과 희망 디자인을 먼저 알려주시면 주문 조건과 견적을 안내합니다. 홈페이지 사진만으로 최종 가격을 확정하지 않습니다.',
      links: [{ to: '/guide/baby-ring-price', label: '돌반지 가격을 비교할 때 확인할 항목' }],
    },
  ],
  '/wedding': [
    {
      question: '예물은 세트로 모두 준비해야 하나요?',
      answer: '결혼반지부터 시작해 목걸이·귀걸이·양가 선물 중 필요한 품목만 정할 수 있습니다. 공개된 오벌 링크 파베 주얼리 세트와 말발굽 레터링 주얼리 세트에서 모티브가 이어지는 구성을 비교한 뒤, 원하는 품목을 상담하세요.',
      links: [{ to: '/gallery/modern-dual-chain-set', label: '오벌 링크 파베 주얼리 세트' }, { to: '/gallery/u-link-lettering-signature-set', label: '말발굽 레터링 주얼리 세트' }],
    },
    {
      question: '결혼반지와 가드링은 어떻게 맞춰 보나요?',
      answer: '각각의 정면뿐 아니라 함께 착용했을 때의 간격과 보석 높이를 확인하세요. 하트 파베 에타니티 반지는 장식이 이어지는 디자인을 비교하는 참고가 됩니다. 기존 반지와 맞출 경우 옆면 사진과 착용할 손가락을 함께 알려주세요.',
      links: [{ to: '/gallery/rose-gold-heart-pave-eternity-ring', label: '하트 파베 에타니티 반지' }, { to: '/guide/eternity-ring-half-full-selection', label: '하프·풀 세팅 범위 비교' }],
    },
    {
      question: '촬영·예식일과 커프스 등 추가 품목은 언제 알려주나요?',
      answer: '촬영일·예식일 중 먼저 필요한 날짜와 희망 품목을 첫 상담에 알려주세요. 제작은 최소 2주를 기준으로 하며 최종 일정은 사양 확인 후 안내합니다. 커프스는 착용할 셔츠 소매와 원하는 잠금 형태를 따로 확인합니다.',
      links: [{ to: '/guide/wedding-ring-production-time', label: '결혼반지 제작 일정' }, { to: '/guide/cufflinks-shirt-fastening-selection', label: '신랑 커프스와 셔츠 소매 확인' }],
    },
  ],
}
