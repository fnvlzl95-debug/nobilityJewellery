function makeDraft(overrides = {}) {
  return {
    slug: 'gold-ring-polishing-guide',
    title: '금반지 광택 기준, 맡기기 전에 확인할 항목',
    description: '금반지 광택을 맡기기 전에 표면 상태와 세팅, 마감 방식, 작업 범위를 확인하는 기준을 차근차근 정리했습니다.',
    lead: '금반지 광택은 제품 상태와 원하는 마감에 따라 작업 범위가 달라집니다. 확인할 순서를 먼저 살펴보세요.',
    category: '관리',
    keyword: '금반지 광택 기준',
    inquiryType: 'repair',
    inquiryTopic: '금반지 광택 상담',
    publishedAt: '2026-08-05',
    updatedAt: '',
    heroImage: {
      path: '/Image/guide/gold-ring-polishing-guide-hero.webp',
      alt: '검은 작업대 위 금반지와 광택 도구',
      caption: '작업 전 제품 상태와 마감 범위를 확인합니다.',
      prompt: 'gold ring and polishing tools on a dark jeweler workbench',
    },
    quickAnswers: [
      '세척과 표면 연마는 서로 다른 작업입니다.',
      '깊은 흠집은 제품 두께를 고려해 범위를 정합니다.',
      '보석 세팅과 도금 여부를 접수 전에 확인합니다.',
    ],
    sections: [
      { title: '현재 상태를 먼저 확인하세요', paragraphs: ['표면 오염과 흠집, 변형 여부를 나눠 살펴봅니다.'], bullets: ['전체 형태', '안쪽 각인'], image: null },
      { title: '원하는 마감을 구분하세요', paragraphs: ['유광과 무광은 사용하는 도구와 완성 기준이 다릅니다.'], bullets: ['유광', '무광'], image: null },
      { title: '접수 항목을 기록하세요', paragraphs: ['제품과 희망 결과를 사진과 문장으로 함께 남기는 것이 좋습니다.'], bullets: ['제품 사진', '희망 결과'], image: null },
    ],
    cautions: ['과도한 연마는 금속 두께에 영향을 줄 수 있습니다.', '제품 상태는 실물 확인 뒤 판단해야 합니다.'],
    faqItems: [
      { question: '세척과 광택은 같은가요?', answer: '오염 제거와 표면 마감은 서로 다른 작업입니다.' },
      { question: '보석 반지도 가능한가요?', answer: '세팅 상태를 먼저 확인한 뒤 작업 범위를 정합니다.' },
      { question: '사진만으로 확정할 수 있나요?', answer: '사진은 사전 상담에 도움이 되지만 실물 점검이 필요합니다.' },
    ],
    relatedLinks: [
      { to: '/guide/jewelry-cleaning-care-at-home', label: '주얼리 세척 관리', description: '집에서 할 수 있는 관리 범위를 봅니다.' },
      { to: '/guide/gold-plating-repair', label: '금 도금 수리', description: '도금이 필요한 조건을 확인합니다.' },
      { to: '/guide/gold-ring-repair-cost', label: '금반지 수리 비용', description: '수리 견적 항목을 확인합니다.' },
    ],
    sourceNote: '공식 교육 자료와 귀족의 확인된 상담 기준을 바탕으로 검토했습니다.',
    sources: [{ label: 'GIA Jewelry Manufacturing Arts', url: 'https://www.gia.edu/gem-education/program-jewelry-manufacturing-arts', note: '주얼리 제작·마감 교육 기준', official: true }],
    ...overrides,
  };
}

module.exports = { makeDraft };
