const { nowIso } = require('../lib/utils');
const topicService = require('./topicService');
const generations = require('./generationService');
const images = require('./imageService');
const humanizer = require('./humanizerService');
const applies = require('./applyService');
const { getGuide } = require('./inventoryService');
const { preferredArchetype, archetypePrompt } = require('./imageService');

const PIPELINE_STEPS = [
  ['topic', 'Terra 주제 전략'],
  ['sources', '공식 근거 조사'],
  ['draft', 'Luna 구조화 원고'],
  ['visuals', '이미지와 삽입 위치'],
  ['humanize', 'Humanizer 사실 보존'],
  ['seo', 'SEO·중복 검사'],
  ['diff', '저장소 변경 미리보기'],
];

function jewelrySubject(topic) {
  const value = String(topic || '');
  if (/(목걸이|체인|펜던트)/.test(value)) return 'a realistic fine-jewelry necklace and chain';
  if (/(팔찌|손목)/.test(value)) return 'a realistic fine-jewelry bracelet';
  if (/(귀걸이|이어링)/.test(value)) return 'a realistic pair of fine-jewelry earrings';
  if (/(진주)/.test(value)) return 'real cultured pearl jewelry';
  if (/(다이아|보석|루비|사파이어|에메랄드|오팔|가넷|탄생석)/.test(value)) return 'real gemstone jewelry with accurate stone cuts and settings';
  return 'a realistic fine-jewelry ring';
}

function visualPrompt(topic, sectionTitle, kind = 'section', archetype = '') {
  const selected = archetype || preferredArchetype(`${topic} ${sectionTitle}`, kind) || 'product-closeup';
  const purpose = kind === 'hero' ? 'an educational overview' : 'a precise practical example';
  return `${jewelrySubject(topic)} showing ${purpose}. ${archetypePrompt(selected)} Accurate proportions and materials, premium restrained tone, no text, no logo, no watermark.`;
}

function planDraftImages(sourceDraft, topic) {
  const draft = JSON.parse(JSON.stringify(sourceDraft));
  const heroArchetype = preferredArchetype(`${topic} ${draft.title}`, 'hero') || 'product-closeup';
  draft.heroImage = {
    path: draft.heroImage?.path || '',
    alt: draft.heroImage?.alt || `${topic} 가이드 대표 이미지`,
    caption: draft.heroImage?.caption || `${topic}의 핵심 확인 항목을 시각적으로 정리했습니다.`,
    archetype: draft.heroImage?.archetype || heroArchetype,
    prompt: !/[가-힣]/.test(draft.heroImage?.prompt || '') && draft.heroImage?.prompt
      ? draft.heroImage.prompt : visualPrompt(topic, draft.title, 'hero', heroArchetype),
  };
  const existing = (draft.sections || []).map((section, index) => section.image?.path ? index : null).filter((index) => index != null);
  const preferred = draft.sections?.length >= 4 ? [1, 3] : draft.sections?.length >= 2 ? [1] : draft.sections?.length ? [0] : [];
  const planned = [...new Set([...existing, ...preferred])].slice(0, 2);
  draft.sections = (draft.sections || []).map((section, index) => {
    if (!planned.includes(index)) return { ...section, image: null };
    return {
      ...section,
      image: {
        path: section.image?.path || '',
        alt: section.image?.alt || `${section.title} 예시 이미지`,
        caption: section.image?.caption || `${section.title}에서 확인할 부분을 보여주는 이미지입니다.`,
        archetype: section.image?.archetype || preferredArchetype(`${topic} ${section.title}`) || '',
        prompt: !/[가-힣]/.test(section.image?.prompt || '') && section.image?.prompt
          ? section.image.prompt : visualPrompt(topic, section.title, 'section', section.image?.archetype || ''),
      },
    };
  });
  return {
    draft,
    placements: [
      { slot: 'hero', sectionIndex: null, location: '제목과 첫 문단 다음', alt: draft.heroImage.alt },
      ...planned.map((sectionIndex) => ({
        slot: `section-${sectionIndex + 1}`,
        sectionIndex,
        location: `${sectionIndex + 1}번째 본문 섹션 “${draft.sections[sectionIndex].title}” 안`,
        alt: draft.sections[sectionIndex].image.alt,
      })),
    ],
  };
}

function blockingMessages(lint) {
  const errors = (lint?.findings || []).filter((finding) => finding.severity === 'error');
  return errors.slice(0, 3).map((finding) => finding.message).join(' / ') || '차단 항목 정보 없음';
}

function automationState(generation) {
  return generation?.research?.automation || {
    state: 'idle',
    stage: null,
    startedAt: null,
    completedAt: null,
    steps: {},
    placements: [],
    publishGate: '명시적인 “올려” 지시 전까지 저장소 반영과 배포를 실행하지 않습니다.',
  };
}

function updateAutomation(id, patch) {
  const generation = generations.getGeneration(id);
  if (!generation) throw new Error('자동 준비 작업을 찾을 수 없습니다');
  const current = automationState(generation);
  const next = {
    ...current,
    ...patch,
    steps: { ...(current.steps || {}), ...(patch.steps || {}) },
  };
  const research = { ...(generation.research || {}), automation: next };
  return generations.updateGeneration(id, { research_json: JSON.stringify(research) });
}

function finishStep(id, step, message, extra = {}) {
  return updateAutomation(id, {
    stage: step,
    steps: { [step]: { state: 'done', message, completedAt: nowIso(), ...extra } },
  });
}

function startStep(id, step, message) {
  return updateAutomation(id, {
    stage: step,
    steps: { [step]: { state: 'running', message, startedAt: nowIso() } },
  });
}

function activeSlots(generation) {
  return new Set((generation.images || []).filter((asset) => asset.status === 'active').map((asset) => asset.slot));
}

// 이미지 정책: 'new'는 항상 생성, 'reuse'는 기존 이미지 유지, 'auto'는 작업 종류와 수정 계획으로 판단한다.
function resolveImagePolicy(requested, generation, existingHeroPath) {
  if (requested === 'reuse' && existingHeroPath) return 'reuse';
  if (requested === 'reuse' || requested === 'new') return 'new';
  if (generation.kind !== 'update' || !existingHeroPath) return 'new';
  const changes = generation.input?.auditPlan?.changes || [];
  const imageWork = changes.some((entry) => entry.enabled && /이미지|image|사진|시각|비주얼/i.test(`${entry.area || ''} ${entry.action || ''} ${entry.proposedState || ''}`));
  return imageWork ? 'new' : 'reuse';
}

function readiness(generation, diff = null) {
  const draft = generation?.humanized || generation?.draft;
  const active = activeSlots(generation || { images: [] });
  const auto = automationState(generation);
  const placements = auto.placements || [];
  const reuse = auto.imagePolicy === 'reuse';
  const selected = generation?.research?.official?.sources?.filter((source) => source.selected) || [];
  const officialSelected = selected.filter((source) => source.official);
  const checks = {
    topic: !!(generation?.input?.topicDecision || generation?.kind === 'update' || generation?.topic),
    officialSources: officialSelected.length > 0 || (selected.length > 0 && !!generation?.input?.allowWithoutOfficial),
    structuredDraft: !!draft,
    heroImage: !!draft?.heroImage?.path && (reuse || active.has('hero')),
    bodyImages: placements.filter((item) => item.slot !== 'hero').every((item) => active.has(item.slot)),
    humanized: !!generation?.humanized || !!auto.humanizeSkipped,
    seoLint: !!generation?.lint && !generation.lint.blocking,
    diffReady: !!diff,
  };
  return {
    ready: Object.values(checks).every(Boolean),
    checks,
    placements,
    files: diff?.files?.map((file) => file.path) || [],
    images: diff?.images || [],
    gate: 'awaiting_explicit_publish_instruction',
  };
}

async function prepareBest(input = {}, dependencyOverrides = {}) {
  const deps = {
    suggestTopics: topicService.suggestTopics,
    createGeneration: generations.createGeneration,
    getGeneration: generations.getGeneration,
    updateGeneration: generations.updateGeneration,
    researchOfficial: generations.researchOfficial,
    selectSources: generations.selectSources,
    generateDraft: generations.generateDraft,
    generateSlot: images.generateSlot,
    humanizeGeneration: humanizer.humanizeGeneration,
    lintGeneration: generations.lintGeneration,
    preview: applies.preview,
    ...dependencyOverrides,
  };
  let generation = input.generationId ? deps.getGeneration(Number(input.generationId)) : null;
  let candidate = generation?.input?.topicDecision || null;
  let report = input.report || null;
  let id = generation?.id || null;
  try {
    if (!generation) {
      report = report || await deps.suggestTopics({ limit: 8, force: !!input.forceTopics });
      candidate = report.accepted?.find((item) => item.id === input.candidateId)
        || (!input.candidateId ? report.recommended : null);
      if (!candidate || !candidate.accepted) throw new Error('서버 중복·수요 검사를 통과한 주제를 선택해 주세요');
      generation = await deps.createGeneration({
        topic: candidate.topic,
        category: candidate.category,
        inquiryType: candidate.inquiryType,
        slug: candidate.slug,
        businessFacts: input.businessFacts || '',
        topicDecision: candidate,
        automationRequested: true,
      });
      id = generation.id;
      updateAutomation(id, {
        state: 'running', stage: 'topic', startedAt: nowIso(), completedAt: null,
        topicReportMeta: { generatedAt: report.generatedAt, model: report.model, methodology: report.methodology, period: report.period },
        steps: { topic: { state: 'done', message: `Terra 후보 중 서버 점수 ${candidate.score}점 1순위를 선택했습니다.`, completedAt: nowIso() } },
      });
      const current = deps.getGeneration(id);
      const research = {
        ...(current.research || {}),
        topicDecision: candidate,
        naver: candidate.researchSignals ? {
          keyword: candidate.primaryKeyword,
          trend: candidate.researchSignals.naverTrend,
          web: candidate.researchSignals.naverWeb,
          note: '주제 비교용 신호이며 원고의 사실 근거로 사용하지 않습니다.',
        } : null,
      };
      deps.updateGeneration(id, { research_json: JSON.stringify(research) });
    } else {
      updateAutomation(id, { state: 'running', completedAt: null });
    }

    generation = deps.getGeneration(id);
    startStep(id, 'sources', '공식·권위 출처를 조사하고 있습니다.');
    if (!generation.research?.official) await deps.researchOfficial(id);
    generation = deps.getGeneration(id);
    let allSources = generation.research?.official?.sources || [];
    let officialUrls = allSources.filter((source) => source.official).map((source) => source.url);
    if (!officialUrls.length) {
      // 1차 조사에서 권위 출처가 안 나오면 정부·표준기관을 명시해 한 번만 다시 조사한다.
      startStep(id, 'sources', '권위 출처를 찾지 못해 정부·표준기관 중심으로 다시 조사합니다.');
      await deps.researchOfficial(id, { emphasizeOfficial: true });
      generation = deps.getGeneration(id);
      allSources = generation.research?.official?.sources || [];
      officialUrls = allSources.filter((source) => source.official).map((source) => source.url);
    }
    if (officialUrls.length) {
      if (!allSources.some((source) => source.selected && source.official)) await deps.selectSources(id, officialUrls, { allowWithoutOfficial: false });
      finishStep(id, 'sources', `공식·권위 출처 ${officialUrls.length}개만 원고 근거로 잠갔습니다.`, { count: officialUrls.length });
    } else if (allSources.length) {
      if (!generation.input?.allowWithoutOfficial) throw new Error('공식·권위 출처를 찾지 못했습니다. 출처 탭에서 보조 출처 사용을 직접 검토·확정한 뒤 다시 실행해 주세요');
      await deps.selectSources(id, allSources.map(source => source.url), { allowWithoutOfficial: true });
      finishStep(id, 'sources', '운영자가 확정한 보조 출처로 진행합니다.');
    } else {
      throw new Error('근거 출처를 하나도 찾지 못했습니다. 주제를 조금 더 구체적으로 바꿔 다시 시도해 주세요');
    }

    generation = deps.getGeneration(id);
    startStep(id, 'draft', '승인된 근거만 사용해 구조화 원고를 만들고 있습니다.');
    if (!generation.draft) await deps.generateDraft(id);
    generation = deps.getGeneration(id);
    if (!generation.draft) throw new Error(generation.error || '원고를 만들지 못했습니다');
    if (generation.lint?.blocking) throw new Error(generation.error || `원고 차단 검사가 남았습니다 — ${blockingMessages(generation.lint)}`);
    finishStep(id, 'draft', 'Luna 초안과 구조화 스키마 검사를 통과했습니다.');

    generation = deps.getGeneration(id);
    startStep(id, 'visuals', '대표 이미지와 본문 이미지 위치를 확정하고 있습니다.');
    const existingGuide = generation.target_slug ? getGuide(generation.target_slug) : null;
    const imagePolicy = resolveImagePolicy(input.imagePolicy || null, generation, existingGuide?.image || null);
    const reuseHero = imagePolicy === 'reuse';
    const sourceDraft = generation.humanized || generation.draft;
    const plan = planDraftImages(sourceDraft, generation.topic);
    // 대표 이미지를 유지하더라도 본문 이미지 계획까지 버리지 않는다. 유지 대상은 대표 이미지 한 장뿐이다.
    if (reuseHero) {
      plan.draft.heroImage = {
        ...(plan.draft.heroImage || {}),
        path: existingGuide.image,
        alt: plan.draft.heroImage?.alt || `${generation.topic} 가이드 대표 이미지`,
        caption: plan.draft.heroImage?.caption || '',
      };
      plan.placements = plan.placements.filter((placement) => placement.slot !== 'hero');
    }
    const draftField = generation.humanized ? 'humanized_json' : 'draft_json';
    deps.updateGeneration(id, { [draftField]: JSON.stringify(plan.draft) });
    updateAutomation(id, { placements: plan.placements, imagePolicy });
    generation = deps.getGeneration(id);
    let slots = activeSlots(generation);
    const failures = [];
    for (const placement of plan.placements) {
      if (slots.has(placement.slot)) continue;
      const latestDraft = deps.getGeneration(id).humanized || deps.getGeneration(id).draft;
      const imagePlan = placement.slot === 'hero' ? latestDraft.heroImage : latestDraft.sections[placement.sectionIndex]?.image;
      if (!imagePlan?.prompt) { failures.push(`${placement.slot}: 생성 프롬프트가 없습니다`); continue; }
      try {
        await deps.generateSlot(id, {
          slot: placement.slot,
          sectionIndex: placement.sectionIndex,
          prompt: imagePlan.prompt,
          altText: imagePlan.alt,
          caption: imagePlan.caption,
          archetype: imagePlan.archetype,
        });
      } catch (error) {
        // 한 장이 실패해도 나머지 이미지와 이후 단계는 계속 진행하고, 실패 사실만 남긴다.
        failures.push(`${placement.slot}: ${error.message}`);
      }
      slots = activeSlots(deps.getGeneration(id));
    }
    // 실패한 본문 이미지는 계획에서 빼서 빈 경로가 남지 않게 한다. 본문 이미지는 선택 항목이다.
    const failedBody = plan.placements.filter((placement) => placement.slot !== 'hero' && !slots.has(placement.slot));
    if (failedBody.length) {
      const cleaned = deps.getGeneration(id).humanized || deps.getGeneration(id).draft;
      const patched = JSON.parse(JSON.stringify(cleaned));
      for (const placement of failedBody) {
        if (patched.sections?.[placement.sectionIndex]) patched.sections[placement.sectionIndex].image = null;
      }
      deps.updateGeneration(id, { [draftField]: JSON.stringify(patched) });
      plan.placements = plan.placements.filter((placement) => !failedBody.includes(placement));
      updateAutomation(id, { placements: plan.placements });
    }
    const madeCount = plan.placements.filter((placement) => slots.has(placement.slot)).length;
    const heroNote = reuseHero ? '기존 대표 이미지를 유지하고' : '대표 이미지를 새로 만들고';
    if (failures.length) {
      updateAutomation(id, {
        imageFailures: failures.join(' / '),
        steps: { visuals: { state: 'warning', message: `${heroNote} 이미지 ${madeCount}장을 만들었지만 ${failures.length}장이 실패했습니다: ${failures.join(' / ')}`, completedAt: nowIso() } },
      });
    } else {
      finishStep(id, 'visuals', `${heroNote} 본문 이미지 ${madeCount}장의 위치·대체텍스트·파일명을 확정했습니다.`, { placements: plan.placements, imagePolicy });
    }

    generation = deps.getGeneration(id);
    startStep(id, 'humanize', '보호 사실을 잠근 상태로 설명 문단을 다듬고 있습니다.');
    let humanizeSkipped = null;
    if (!generation.humanized) {
      // 문장 다듬기는 표현만 바꾸는 단계다. 엔진이 꺼져 있어도 원고 사실은 그대로이므로 전체를 중단하지 않는다.
      try { await deps.humanizeGeneration(id); }
      catch (error) { humanizeSkipped = error.message; }
    }
    if (humanizeSkipped) {
      updateAutomation(id, {
        humanizeSkipped,
        steps: { humanize: { state: 'warning', message: `문장 다듬기를 건너뛰고 원문을 유지했습니다: ${humanizeSkipped}`, completedAt: nowIso() } },
      });
    } else {
      updateAutomation(id, { humanizeSkipped: null });
      finishStep(id, 'humanize', '설명 문단을 다듬고 수치·단위·등급·URL 보존 검사를 실행했습니다.');
    }

    startStep(id, 'seo', '검색 설명·중복·출처·이미지를 최종 검사하고 있습니다.');
    await deps.lintGeneration(id, { requireImage: true });
    generation = deps.getGeneration(id);
    if (generation.lint?.blocking) throw new Error(`최종 SEO·중복·이미지 검사에 차단 항목이 남았습니다 — ${blockingMessages(generation.lint)}`);
    finishStep(id, 'seo', `최종 검사 ${generation.lint?.score ?? '통과'}점, 차단 항목이 없습니다.`, { score: generation.lint?.score ?? null });

    startStep(id, 'diff', '저장소에 들어갈 파일 변경 묶음을 계산하고 있습니다.');
    const diff = await deps.preview(id);
    finishStep(id, 'diff', `Vue·가이드 목록·WebP ${diff.images?.length || 0}개 변경 묶음을 만들었습니다.`, {
      files: diff.files?.map((file) => file.path) || [], images: diff.images || [],
    });
    generation = deps.getGeneration(id);
    const ready = readiness(generation, diff);
    if (!ready.ready) {
      const missing = Object.entries(ready.checks).filter(([, ok]) => !ok).map(([key]) => key).join(', ');
      throw new Error(`게시 준비 체크가 모두 완료되지 않았습니다 — 미완료: ${missing}`);
    }
    updateAutomation(id, { state: 'ready', stage: 'ready', completedAt: nowIso(), readiness: ready });
    generation = deps.updateGeneration(id, { status: 'ready', error: null });
    return { ...generation, readiness: ready, diffSummary: { files: ready.files, images: ready.images } };
  } catch (error) {
    if (id) {
      try {
        updateAutomation(id, {
          state: 'review',
          completedAt: nowIso(),
          steps: { [automationState(deps.getGeneration(id)).stage || 'topic']: { state: 'error', message: error.message, completedAt: nowIso() } },
        });
        deps.updateGeneration(id, { status: 'review', error: `자동 준비 중단: ${error.message}` });
      } catch (_) { /* 원래 오류를 유지합니다. */ }
    }
    throw error;
  }
}

module.exports = { PIPELINE_STEPS, jewelrySubject, visualPrompt, planDraftImages, automationState, readiness, prepareBest };
