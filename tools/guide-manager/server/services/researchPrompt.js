function researchInput(generation) {
  const input = generation.input || {};
  const baseline = input.updatePolicy?.baselineDraft;
  const context = generation.kind === 'update' && baseline ? {
    scope: input.updatePolicy.scope?.fields || [],
    goal: input.auditPlan?.goal || '',
    title: baseline.title,
    quickAnswers: baseline.quickAnswers,
    sections: baseline.sections?.map(({ title, paragraphs, bullets }) => ({ title, paragraphs, bullets })),
    cautions: baseline.cautions,
    faqItems: baseline.faqItems,
  } : null;
  return [
    `주제: ${generation.topic}`,
    `사업자 제공 사실: ${input.businessFacts || '없음'}`,
    context ? `검증 대상인 기존 원문과 수정 범위 (기존 문장도 검증된 사실로 간주하지 마세요):\n${JSON.stringify(context).slice(0, 24000)}` : '',
    context ? '기존 본문의 재질·구조·관리·수리 원리에 직접 관련된 근거를 조사하세요. 제목에 비용이 있어도 일반 물가·법령 자료로 기술적 설명이나 매장 견적을 뒷받침하지 마세요.' : '',
    '한국어 가이드에 필요한 최소 사실만 조사하세요.',
  ].filter(Boolean).join('\n');
}

module.exports = { researchInput };
