import { useEffect, useMemo, useState, useRef } from 'react'
import {
  ArrowRight, Check, CheckCircle2, ChevronRight, CircleAlert, Clock3, FilePlus2, FileSearch, FilePenLine,
  Gem, ImagePlus, Lock, Play, RefreshCcw, Save, Search, ShieldCheck, Sparkles, Trash2, WandSparkles, X,
} from 'lucide-react'
import { api } from './api'
import { Badge, EmptyRow, ErrorNotice, ListToolbar, Pagination, RefreshStatus, Spinner, SuccessNotice, dateTime, fmt, shortDate, useListState } from './ui'

const STATUS_META = {
  idea: { label: '기획', group: 'progress' },
  researched: { label: '근거 준비', group: 'progress' },
  generating: { label: '원고 생성 중', group: 'progress' },
  draft: { label: '초안', group: 'progress' },
  humanizing: { label: '다듬는 중', group: 'progress' },
  humanized: { label: '다듬기 완료', group: 'progress' },
  review: { label: '검수 필요', group: 'review' },
  ready: { label: '게시 준비 완료', group: 'review' },
  approved: { label: '승인됨', group: 'review' },
  applied: { label: '반영 완료', group: 'done' },
}
const statusLabel = (status) => STATUS_META[status]?.label || status || '—'
const statusGroup = (status) => STATUS_META[status]?.group || 'progress'
const statusTone = (status) => status === 'applied' ? 'success' : ['ready', 'approved'].includes(status) ? 'gold' : status === 'review' ? 'danger' : 'neutral'

function kindLabel(kind) { return kind === 'update' ? '기존 글 수정' : '새 글 작성' }

function KindTag({ kind, size = 'md' }) {
  return <span className={`kind-tag ${kind === 'update' ? 'update' : 'new'} ${size}`}>
    {kind === 'update' ? <FilePenLine size={12} /> : <FilePlus2 size={12} />}{kindLabel(kind)}
  </span>
}

export function guideSteps(generation, draft) {
  const sources = generation?.research?.official?.sources || []
  const heroActive = (generation?.images || []).some((image) => image.slot === 'hero' && image.status === 'active')
  const heroReady = heroActive || !!draft?.heroImage?.path
  const lintOk = !!generation?.lint && !generation.lint.blocking
  const humanizeSkipped = !!generation?.research?.automation?.humanizeSkipped
  return [
    { key: 'official', label: '출처 조사', done: !!generation?.research?.official, hint: '주제에 맞는 공식·권위 출처 후보를 찾습니다.', action: '출처 조사 실행' },
    { key: 'select', label: '출처 선택', done: sources.some((source) => source.selected), hint: '찾은 후보 중 원고 근거로 쓸 출처를 고릅니다. ‘출처’ 탭에서 직접 고르거나 공식 출처만 한 번에 선택할 수 있습니다.', action: '공식 출처 모두 선택' },
    { key: 'draft', label: '원고 생성', done: !!generation?.draft, hint: '선택한 근거만 사용해 Luna가 구조화 원고를 만들고 자동 검사까지 실행합니다.', action: '원고 생성' },
    { key: 'image', label: '이미지 생성', done: heroReady, hint: '대표 이미지를 만듭니다. 기존 글 수정은 기존 이미지를 그대로 유지할 수도 있습니다.', action: '대표 이미지 생성' },
    { key: 'polish', label: '다듬기·검사', done: (!!generation?.humanized || humanizeSkipped) && lintOk, hint: '수치·단위·URL을 잠근 채 문장을 다듬고 SEO·중복 검사를 통과시킵니다.', action: '문장 다듬기' },
    { key: 'approve', label: '최종 승인', done: ['approved', 'applied'].includes(generation?.status), hint: '미리보기를 읽어보고 문제가 없으면 승인하세요. 승인해도 저장소는 아직 바뀌지 않습니다.', action: '최종 승인' },
    { key: 'apply', label: '저장소 반영', done: generation?.status === 'applied', hint: '승인된 파일을 귀족 저장소에 반영하고 typecheck·build·SEO 검사를 실행합니다. 실패하면 자동 복원되며 배포는 별도 지시로만 진행합니다.', action: '저장소에 반영' },
  ]
}

function StepRail({ steps, currentIndex, busy, onStep }) {
  return <ol className="step-rail">
    {steps.map((step, index) => {
      const state = step.done ? 'done' : index === currentIndex ? 'current' : 'todo'
      return <li key={step.key} className={state}>
        <span className="step-mark">{step.done ? <Check size={13} /> : index + 1}</span>
        <div className="step-body">
          <strong>{step.label}</strong>
          {state === 'current' && <p>{step.hint}</p>}
        </div>
        {state === 'current'
          ? <button type="button" className="step-action" disabled={!!busy} onClick={() => onStep(step)}>{busy.startsWith(step.key) ? <Spinner label="진행 중" /> : step.action}</button>
          : <span className="step-state">{step.done ? '완료' : '대기'}</span>}
      </li>
    })}
  </ol>
}

function GuidePreview({ draft, generation }) {
  if (!draft) return <div className="empty-preview"><Gem size={34} /><strong>원고 미리보기</strong><p>근거를 선택하고 원고를 생성하면 실제 가이드 구조가 이곳에 나타납니다.</p></div>
  const heroAsset = generation?.images?.find((image) => image.slot === 'hero' && image.status === 'active')
  const heroUrl = heroAsset?.publicPath ? `/generated-images/${generation.id}/${heroAsset.publicPath.split('/').at(-1)}` : null
  return <article className="guide-preview">
    <header><span>{draft.category}</span><h1>{draft.title}</h1><p>{draft.lead}</p>
      <small>{draft.publishedAt} 최초 작성{draft.updatedAt ? ` · ${draft.updatedAt} 최종 검토` : ''}</small>
      {heroUrl ? <img src={heroUrl} className="preview-image-fallback" alt={draft.heroImage?.alt || draft.title} /> : <div className="image-placeholder"><ImagePlus size={24} />대표 이미지 생성 대기</div>}
    </header>
    <section className="quick-preview"><h2>먼저 확인하세요</h2><ul>{draft.quickAnswers?.map((answer) => <li key={answer}>{answer}</li>)}</ul></section>
    {draft.sections?.map((section, index) => {
      const asset = generation?.images?.find((image) => image.slot === `section-${index + 1}` && image.status === 'active')
      const url = asset?.publicPath ? `/generated-images/${generation.id}/${asset.publicPath.split('/').at(-1)}` : null
      return <section className="preview-section" key={`${section.title}-${index}`}>
        <h2><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</h2>
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets?.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        {url && <figure><img src={url} loading="lazy" alt={section.image?.alt || section.title} /><figcaption>{section.image?.caption}</figcaption></figure>}
      </section>
    })}
    <section className="preview-faq"><h2>자주 묻는 질문</h2>{draft.faqItems?.map((item) => <div key={item.question}><strong>Q. {item.question}</strong><p>A. {item.answer}</p></div>)}</section>
  </article>
}

function DraftTab({ draft, onChange, onSave, busy, isUpdate = false }) {
  const [advanced, setAdvanced] = useState(false)
  const [raw, setRaw] = useState('')
  useEffect(() => setRaw(draft ? JSON.stringify(draft, null, 2) : ''), [draft])
  if (!draft) return <EmptyRow icon={FileSearch} title="편집할 원고가 없습니다" hint="원고 생성 단계를 먼저 끝내주세요." />
  const patch = (key, value) => onChange({ ...draft, [key]: value })
  const titleLength = String(draft.title || '').length
  const titleTone = titleLength >= 32 ? (isUpdate ? 'warning' : 'danger') : titleLength >= 28 ? 'warning' : 'safe'
  const saveRaw = () => {
    let parsed
    try { parsed = JSON.parse(raw) } catch (_) { alert('JSON 형식을 확인해 주세요.'); return }
    onChange(parsed); onSave(parsed)
  }
  return <div className="tab-panel">
    <div className="panel-head">
      <div><h2>원고 편집</h2><p>저장하면 승인 상태가 풀리고 검사를 다시 실행합니다.</p></div>
      <button type="button" className="text-button" onClick={() => setAdvanced(!advanced)}>{advanced ? '기본 편집으로' : '구조 JSON 편집'}</button>
    </div>
    {advanced ? <>
      <textarea className="json-editor" value={raw} onChange={(event) => setRaw(event.target.value)} spellCheck={false} />
      <button type="button" className="button button-primary" onClick={saveRaw} disabled={!!busy}><Save size={15} />JSON 저장·재검사</button>
    </> : <>
      <div className="edit-grid">
        <label className="span-2"><span>제목 <small className={`field-meter ${titleTone}`}>{titleLength}/27자 권장 · 31자 한도</small></span><input maxLength="64" value={draft.title || ''} onChange={(event) => patch('title', event.target.value)} /><small className={`field-help ${titleTone}`}>{titleLength >= 32 ? (isUpdate ? '기존 제목을 그대로 유지하는 본문 수정은 예외입니다. 제목을 바꾸면 31자 한도가 적용됩니다.' : '검색결과 잘림을 막기 위해 저장 전 31자 이하로 줄여야 합니다.') : titleLength >= 28 ? '뒷부분이 잘릴 수 있습니다. 핵심 답을 앞 27자 안에 배치하세요.' : '“| 귀족” 접미사 5자는 자동으로 붙습니다.'}</small></label>
        <label><span>대표 검색어</span><input value={draft.keyword || ''} onChange={(event) => patch('keyword', event.target.value)} /></label>
        <label><span>카테고리</span><input value={draft.category || ''} onChange={(event) => patch('category', event.target.value)} /></label>
        <label><span>작성일</span><input type="date" value={draft.publishedAt || ''} onChange={(event) => patch('publishedAt', event.target.value)} /></label>
        <label><span>최종 검토일 <small>(비우면 표시 안 함)</small></span><input type="date" value={draft.updatedAt || ''} onChange={(event) => patch('updatedAt', event.target.value)} /></label>
        <label className="span-2"><span>검색 설명</span><textarea rows="3" value={draft.description || ''} onChange={(event) => patch('description', event.target.value)} /></label>
        <label className="span-2"><span>첫 문단</span><textarea rows="4" value={draft.lead || ''} onChange={(event) => patch('lead', event.target.value)} /></label>
      </div>
      <button type="button" className="button button-primary" disabled={!!busy} onClick={() => onSave(draft)}>{busy === 'save' ? <Spinner /> : <><Save size={15} />원고 저장·재검사</>}</button>
    </>}
  </div>
}

function SourcesTab({ rows, selected, setSelected, allowWithoutOfficial, setAllowWithoutOfficial, onSave, onResearch, busy }) {
  if (!rows.length) return <div className="tab-panel">
    <EmptyRow icon={FileSearch} title="아직 조사한 출처가 없습니다" hint="진행 순서의 ‘출처 조사’ 단계를 실행하거나 아래 버튼을 누르세요." />
    <button type="button" className="button button-primary" disabled={!!busy} onClick={() => onResearch(false)}>{busy === 'official' ? <Spinner label="조사 중" /> : <><FileSearch size={15} />출처 조사 실행</>}</button>
  </div>
  const official = rows.filter((source) => source.official)
  const selectedOfficial = official.filter((source) => selected.includes(source.url)).length
  return <div className="tab-panel">
    <div className="panel-head">
      <div><h2>출처 승인 <b>{selected.length}/{rows.length}</b></h2><p>체크한 근거만 원고에 사용합니다. 공식·권위 출처(정부·표준기관·교육기관·국제 보석 협회)가 1개 이상이면 그대로 진행됩니다.</p></div>
      <div className="panel-head-actions">
        {official.length > 0 && <button type="button" className="text-button" onClick={() => setSelected(official.map((source) => source.url))}>공식 출처 모두 선택</button>}
        <button type="button" className="text-button" onClick={() => setSelected(rows.map((source) => source.url))}>전체 선택</button>
        <button type="button" className="text-button" onClick={() => setSelected([])}>선택 해제</button>
      </div>
    </div>

    {!official.length && <div className="source-fallback">
      <CircleAlert size={17} />
      <div>
        <strong>승인 가능한 공식·권위 출처를 찾지 못했습니다.</strong>
        <p>정부·표준기관·교육기관·국제 보석 협회 도메인이 후보에 없습니다. 다시 조사하거나, 아래를 켜서 보조 출처만으로 진행할 수 있습니다.</p>
        <label className="fallback-toggle">
          <input type="checkbox" checked={allowWithoutOfficial} onChange={(event) => setAllowWithoutOfficial(event.target.checked)} />
          <span>공식 출처 없이 보조 출처로 진행 — 원고와 검사에 경고로 기록됩니다</span>
        </label>
        <button type="button" className="button button-quiet" disabled={!!busy} onClick={() => onResearch(true)}>{busy === 'official' ? <Spinner label="다시 조사 중" /> : <><RefreshCcw size={14} />정부·표준기관 중심으로 다시 조사</>}</button>
      </div>
    </div>}

    <div className="source-list">{rows.map((source) => <label key={source.url} className={source.official ? '' : 'unofficial'}>
      <input type="checkbox" checked={selected.includes(source.url)} onChange={(event) => setSelected(event.target.checked ? [...selected, source.url] : selected.filter((url) => url !== source.url))} />
      <span><strong>{source.label}</strong><small>{source.domain} · {source.official ? '공식 출처' : '보조 후보'}</small><em>{source.reason}</em></span>
    </label>)}</div>

    <div className="source-actions">
      <button type="button" className="button button-primary" onClick={onSave} disabled={busy === 'sources' || !selected.length}>{busy === 'sources' ? <Spinner /> : <><Check size={15} />선택 저장</>}</button>
      <button type="button" className="button button-quiet" disabled={!!busy} onClick={() => onResearch(false)}>{busy === 'official' ? <Spinner label="조사 중" /> : <><RefreshCcw size={14} />출처 다시 조사</>}</button>
      <small className="muted">{selectedOfficial ? `공식 출처 ${selectedOfficial}개 선택됨` : allowWithoutOfficial ? '보조 출처로 진행하도록 설정됨' : '공식 출처가 선택되지 않았습니다'}</small>
    </div>
  </div>
}

// 원고에 이미지 계획이 없는 섹션도 직접 만들 수 있도록 서버와 같은 형식의 기본 프롬프트를 준비한다.
function fallbackPrompt(topic, title, kind) {
  const subject = kind === 'hero' ? 'a realistic fine-jewelry educational overview' : 'a realistic fine-jewelry practical detail'
  return `${subject}. Use a scene appropriate for comparison, measurement, craft process, product close-up, or wearing context. Accurate materials, premium restrained tone, no text, no logo, no watermark.`
}

function ImagesTab({ generation, draft, busy, onGenerate }) {
  if (!draft) return <EmptyRow icon={ImagePlus} title="원고가 먼저 필요합니다" hint="원고를 생성하면 이미지 계획이 만들어집니다." />
  const topic = generation?.topic || draft.title
  const slots = [
    { slot: 'hero', sectionIndex: null, title: '대표 이미지', required: true, plan: draft.heroImage || {}, fallbackAlt: draft.title, fallbackPrompt: fallbackPrompt(topic, draft.title, 'hero') },
    ...(draft.sections || []).map((section, index) => ({
      slot: `section-${index + 1}`, sectionIndex: index, title: `본문 ${index + 1} · ${section.title}`,
      planned: !!section.image, plan: section.image || {}, fallbackAlt: section.title,
      fallbackPrompt: fallbackPrompt(topic, section.title, 'section'),
    })),
  ]
  const assets = [...(generation?.images || [])].reverse()
  return <div className="tab-panel">
    <div className="panel-head"><div><h2>이미지</h2><p>대표 이미지와 본문 섹션별로 만들거나 다시 만들 수 있습니다. 원고에 계획이 없던 섹션도 여기서 직접 추가할 수 있습니다.</p></div></div>
    <div className="slot-grid">{slots.map((item) => {
      const active = (generation?.images || []).find((image) => image.slot === item.slot && image.status === 'active')
      const url = active?.publicPath ? `/generated-images/${generation.id}/${active.publicPath.split('/').at(-1)}` : null
      const label = `image-${item.slot}`
      const reused = !url && !!item.plan.path
      return <article key={item.slot} className={`slot-card ${item.required ? 'required' : ''}`}>
        {url ? <img src={url} alt={item.plan.alt || item.fallbackAlt} /> : <div className="slot-empty"><ImagePlus size={22} />{busy === label ? '생성 중' : reused ? '기존 이미지 유지' : '미생성'}</div>}
        <div>
          <strong>{item.title}</strong>
          <small>{item.plan.path || (active ? active.publicPath : item.planned === false ? '원고 계획 없음 · 직접 추가 가능' : '아직 생성되지 않음')}</small>
          {(active?.archetype || item.plan.archetype) && <small>장면 유형 · {active?.archetype || item.plan.archetype}{active?.width ? ` · ${active.width}×${active.height}` : ''}</small>}
          <button type="button" className="button button-quiet full" disabled={!!busy} onClick={() => onGenerate(label, item)}>
            {busy === label ? <Spinner label="이미지 생성 중" /> : url || reused ? '다시 생성' : '이미지 생성'}
          </button>
        </div>
      </article>
    })}</div>
    <div className="panel-head sub"><div><h3>생성 이력 {assets.length ? `(${assets.length})` : ''}</h3></div></div>
    {assets.length ? <div className="asset-log">{assets.map((asset) => <div key={asset.id} className={asset.status}>
      <Badge tone={asset.status === 'active' ? 'success' : asset.status === 'error' ? 'danger' : 'neutral'}>{asset.status}</Badge>
      <span><strong>{asset.slot}</strong><small>{asset.model || '대기'} · {dateTime(asset.updatedAt)}</small></span>
      {asset.error && <em>{asset.error}</em>}
    </div>)}</div> : <p className="muted">아직 생성된 이미지가 없습니다.</p>}
  </div>
}

function ChecksTab({ generation, draft, busy, onAction, onDiff, onApprove, onApply }) {
  const lint = generation?.lint
  const automation = generation?.research?.automation
  const latestHumanize = generation?.humanizeRuns?.[0]
  const steps = [['topic', 'Terra 주제'], ['sources', '공식 근거'], ['draft', '구조화 원고'], ['visuals', '이미지·위치'], ['humanize', '사실 보존'], ['seo', 'SEO 검사'], ['diff', '파일 diff']]
  return <div className="tab-panel checks-panel">
    {generation?.input?.allowWithoutOfficial && <p className="warn-copy">공식·권위 출처 없이 보조 출처만으로 진행 중인 작업입니다. 반영 전에 근거가 충분한지 직접 확인해 주세요.</p>}
    <section className="check-card">
      <div className="check-head"><ShieldCheck size={16} /><strong>품질 검사</strong>{lint && <span className="quality-score">{lint.score}</span>}
        <button type="button" className="text-button" disabled={!!busy || !draft} onClick={onAction}>{busy === 'lint' ? <Spinner /> : '다시 검사'}</button></div>
      {!lint ? <p className="muted">원고 생성 후 검사가 실행됩니다.</p>
        : <div className="finding-list">{lint.findings?.length
          ? lint.findings.map((finding, index) => <div key={`${finding.code}-${index}`} className={finding.severity}><CircleAlert size={14} /><span>{finding.message}</span></div>)
          : <div className="all-clear"><CheckCircle2 size={18} />차단 항목이 없습니다.</div>}</div>}
    </section>

    {automation && <section className="check-card">
      <div className="check-head"><Sparkles size={16} /><strong>자동 진행 기록</strong></div>
      <div className="readiness-steps">{steps.map(([key, label]) => {
        const state = automation.steps?.[key]?.state || 'pending'
        return <div key={key} className={state}>{state === 'done' ? <Check size={13} /> : state === 'error' ? <CircleAlert size={13} /> : state === 'warning' ? <CircleAlert size={13} /> : <Clock3 size={13} />}<span>{label}</span></div>
      })}</div>
      {automation.humanizeSkipped && <p className="warn-copy">문장 다듬기를 건너뛰고 원문을 유지했습니다 — {automation.humanizeSkipped}</p>}
      {automation.sourceFallback && <p className="warn-copy">공식·권위 출처를 찾지 못해 보조 출처로 진행했습니다 — {automation.sourceFallback}</p>}
      {automation.imageFailures && <p className="warn-copy">일부 이미지를 만들지 못했습니다 — {automation.imageFailures}. ‘이미지’ 탭에서 다시 시도할 수 있습니다.</p>}
      {automation.state === 'ready' && <div className="ready-callout"><CheckCircle2 size={18} /><div><strong>바로 반영 가능한 상태입니다.</strong><p>최종 승인 후 저장소 반영을 진행할 수 있습니다.</p></div></div>}
      {automation.state === 'review' && generation.error && <p className="automation-error">{generation.error}</p>}
    </section>}

    <section className="check-card">
      <div className="check-head"><WandSparkles size={16} /><strong>문장 다듬기</strong></div>
      <p className="muted">수치·단위·등급·URL을 잠그고 설명 문단만 Humanizer V9으로 다듬습니다.</p>
      {latestHumanize && <details className="humanizer-result">
        <summary><span>{latestHumanize.engineVersion || latestHumanize.engineProfile}</span><Badge tone={latestHumanize.facts?.pass ? 'success' : latestHumanize.status === 'reverted' ? 'danger' : 'neutral'}>{latestHumanize.facts?.pass ? '사실 보존' : latestHumanize.status}</Badge></summary>
        <div className="humanizer-diff"><div><small>전</small><p>{latestHumanize.beforeText}</p></div><div><small>후</small><p>{latestHumanize.afterText || '사실 잠금 또는 구조 검사로 원문을 유지했습니다.'}</p></div></div>
        {latestHumanize.error && <small className="error-copy">{latestHumanize.error}</small>}
      </details>}
    </section>

    <section className="check-card apply-card">
      <div className="check-head"><CheckCircle2 size={16} /><strong>승인과 반영</strong></div>
      <div className="apply-actions">
        <button type="button" className="button button-quiet" disabled={!!busy || !draft} onClick={onDiff}>{busy === 'diff' ? <Spinner /> : '파일 변경 미리보기'}</button>
        <button type="button" className="button button-primary" disabled={!!busy || !draft || ['approved', 'applied'].includes(generation?.status)} onClick={onApprove}>{busy === 'approve' ? <Spinner /> : '최종 승인'}</button>
        <button type="button" className="button button-danger" disabled={!!busy || generation?.status !== 'approved'} onClick={onApply}>{busy === 'apply' ? <Spinner label="검증 포함 처리 중" /> : '저장소에 반영'}</button>
      </div>
      <small className="safety-copy">충돌이나 검사 실패 시 이번 변경만 자동 복원합니다. Git 커밋과 배포는 하지 않습니다.</small>
    </section>
  </div>
}

const strategyLabels = {
  googleDemand: 'Google 수요', rankOpportunity: '상승 여지', naverDemand: 'Naver 수요',
  business: '사업 연결', audienceFit: 'GA4 반응', novelty: '중복 회피', clusterOpportunity: '내부링크',
}

function TopicStrategy({ report, selectedId, onSelect, onPrepare, busy }) {
  if (!report) return null
  const selected = report.accepted?.find((candidate) => candidate.id === selectedId) || report.recommended
  return <section className="topic-strategy" aria-live="polite">
    <div className="strategy-head">
      <div><h2>노출 가능성 우선 주제</h2><p>{report.analysisSummary}</p></div>
      <div className="strategy-method"><Badge tone="gold">Terra · medium</Badge><span>{report.period?.start}—{report.period?.end}</span></div>
    </div>
    {report.accepted?.length ? <>
      <div className="strategy-list" role="listbox" aria-label="검색 노출 후보">
        {report.accepted.map((candidate, index) => <button type="button" role="option" aria-selected={selected?.id === candidate.id} className={selected?.id === candidate.id ? 'selected' : ''} key={candidate.id} onClick={() => onSelect(candidate)}>
          <span className="strategy-rank">{index + 1}</span>
          <span className="strategy-copy"><strong>{candidate.workingTitle}</strong><small>{candidate.primaryKeyword} · {candidate.intent} · {candidate.cluster}</small><em>{candidate.reason}</em></span>
          <span className="strategy-signals"><b>{candidate.score}점</b><small>GSC 노출 {fmt(candidate.metrics?.googleImpressions)} · 평균 {candidate.metrics?.googlePosition ? `${Number(candidate.metrics.googlePosition).toFixed(1)}위` : '신규'}</small></span>
          <ChevronRight size={16} />
        </button>)}
      </div>
      {selected && <div className="strategy-decision">
        <div><strong>{selected.workingTitle}</strong><p>{selected.contentGap}</p><div className="score-breakdown">{Object.entries(selected.breakdown || {}).map(([key, value]) => <span key={key}>{strategyLabels[key] || key} <b>{value}</b></span>)}</div></div>
        <div className="strategy-buttons">
          <button className="button button-quiet" type="button" onClick={() => onSelect(selected)} disabled={!!busy}>양식에 채우기</button>
          <button className="button button-primary" type="button" onClick={() => onPrepare(selected)} disabled={!!busy}>{busy === 'prepare' ? <Spinner label="준비 중" /> : <><WandSparkles size={16} />이 주제로 한 번에 준비</>}</button>
        </div>
      </div>}
    </> : <div className="strategy-empty"><ShieldCheck size={22} /><div><strong>안전하게 추천할 신규 주제가 없습니다.</strong><p>중복 또는 수요 근거 부족으로 후보가 모두 보류됐습니다.</p></div></div>}
  </section>
}

function NewWorkPanel({ mode, setMode, create, setCreate, guides, onSubmit, busy, topicReport, selectedTopicId, onDiscover, onSelectTopic, onPrepareTopic, onCancel }) {
  const [guideQuery, setGuideQuery] = useState('')
  const categories = useMemo(() => [...new Set(guides.map((guide) => guide.category).filter(Boolean))], [guides])
  const matched = useMemo(() => {
    const needle = guideQuery.trim().toLowerCase()
    return guides.filter((guide) => !needle || `${guide.title} ${guide.keyword} ${guide.path}`.toLowerCase().includes(needle))
  }, [guides, guideQuery])
  const target = guides.find((guide) => guide.slug === create.targetSlug)

  const pickGuide = (guide) => setCreate((current) => ({
    ...current, targetSlug: guide.slug, topic: guide.keyword || current.topic,
    category: guide.category || current.category, inquiryType: guide.category === '수리' ? 'repair' : current.inquiryType,
  }))

  return <section className="new-work-panel">
    <header className="new-work-head">
      <div><h2>새 작업 만들기</h2><p>먼저 무엇을 할지 고르세요. 이후 단계는 선택한 종류에 맞춰 달라집니다.</p></div>
      <button type="button" className="icon-action" aria-label="닫기" onClick={onCancel}><X size={16} /></button>
    </header>
    <div className="mode-switch" role="tablist">
      <button type="button" role="tab" aria-selected={mode === 'new'} className={mode === 'new' ? 'active new' : ''} onClick={() => { setMode('new'); setCreate((current) => ({ ...current, targetSlug: '' })) }}>
        <FilePlus2 size={18} /><strong>새 글 작성</strong><small>없던 주제로 새 가이드 페이지를 만듭니다</small>
      </button>
      <button type="button" role="tab" aria-selected={mode === 'update'} className={mode === 'update' ? 'active update' : ''} onClick={() => setMode('update')}>
        <FilePenLine size={18} /><strong>기존 글 수정</strong><small>이미 올라간 가이드를 골라 교체합니다</small>
      </button>
    </div>

    <form className="new-work-form" onSubmit={onSubmit}>
      {mode === 'update' ? <div className="guide-picker">
        <label className="picker-search"><Search size={15} /><input value={guideQuery} onChange={(event) => setGuideQuery(event.target.value)} placeholder="수정할 가이드 검색 (제목·키워드·경로)" /></label>
        <div className="picker-list">{matched.slice(0, 40).map((guide) => <button type="button" key={guide.slug} disabled={guide.isCustom}
          className={create.targetSlug === guide.slug ? 'selected' : ''} onClick={() => pickGuide(guide)}>
          <span className="picker-copy"><strong>{guide.isCustom ? <Lock size={11} /> : null}{guide.title}</strong><small>{guide.path}</small></span>
          <span className="picker-meta"><em>{guide.category || '—'}</em><small>{guide.publishedAt || '—'}</small></span>
        </button>)}
        {!matched.length && <EmptyRow title="검색 결과가 없습니다" hint="다른 검색어를 입력해 보세요." />}</div>
        {target && <div className="picker-selected"><FilePenLine size={14} /><span><strong>{target.title}</strong><small>{target.path} · 반영 시 이 페이지가 교체됩니다</small></span></div>}
      </div> : <div className="new-topic-block">
        <button type="button" className="auto-topic-launch" onClick={onDiscover} disabled={!!busy}>{busy === 'topics' ? <Spinner label="Terra 분석 중" /> : <><Sparkles size={15} />최적 주제 자동선정</>}</button>
        <small className="auto-topic-note">기존 글·GSC·GA4·Naver를 함께 보고 중복 후보를 제외합니다.</small>
      </div>}

      <div className="edit-grid">
        <label className="span-2"><span>주제 {mode === 'update' ? '(대표 검색어)' : ''}</span><input required value={create.topic} onChange={(event) => setCreate({ ...create, topic: event.target.value })} placeholder="예: 금반지 광택 비용" /></label>
        <label><span>카테고리</span><input list="guide-categories" value={create.category} onChange={(event) => setCreate({ ...create, category: event.target.value })} />
          <datalist id="guide-categories">{categories.map((value) => <option key={value} value={value} />)}</datalist></label>
        {mode === 'new' && <label><span>영문 slug</span><input value={create.slug} onChange={(event) => setCreate({ ...create, slug: event.target.value })} placeholder="비워두면 자동 제안" /></label>}
        <label className="span-2"><span>확인된 영업 정보</span><textarea rows="3" value={create.businessFacts} onChange={(event) => setCreate({ ...create, businessFacts: event.target.value })} placeholder="가격·기간·가능 여부는 확인된 사실만 입력" /></label>
      </div>

      <div className="new-work-actions">
        <span className="new-work-summary">{mode === 'update'
          ? (target ? <>수정 대상 <b>{target.title}</b></> : '수정할 가이드를 선택해 주세요')
          : '새 가이드 페이지를 만듭니다'}</span>
        <button type="submit" className="button button-primary" disabled={busy === 'create' || (mode === 'update' && !create.targetSlug)}>
          {busy === 'create' ? <Spinner /> : <>작업 만들기 <ArrowRight size={15} /></>}
        </button>
      </div>
    </form>

    {mode === 'new' && <TopicStrategy report={topicReport} selectedId={selectedTopicId} onSelect={onSelectTopic} onPrepare={onPrepareTopic} busy={busy} />}
    {busy === 'prepare' && <div className="pipeline-running"><Spinner label="공식 근거 → 원고 → 이미지 → 다듬기 → SEO → 파일 diff 순으로 준비 중입니다" /><small>몇 분 걸릴 수 있고 중복 실행은 차단됩니다.</small></div>}
  </section>
}

const EMPTY_CREATE = { topic: '', targetSlug: '', category: '', inquiryType: 'custom', businessFacts: '', slug: '' }

export function Editor({ seed, clearSeed }) {
  const [items, setItems] = useState([])
  const [guides, setGuides] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [generation, setGeneration] = useState(null)
  const loadSequence = useRef(0)
  const [draft, setDraft] = useState(null)
  const [selectedSources, setSelectedSources] = useState([])
  const [allowWithoutOfficial, setAllowWithoutOfficial] = useState(false)
  const [diff, setDiff] = useState(null)
  const [tab, setTab] = useState('preview')
  const [panel, setPanel] = useState('work')
  const [mode, setMode] = useState('new')
  const [create, setCreate] = useState(EMPTY_CREATE)
  const [topicReport, setTopicReport] = useState(null)
  const [selectedTopicId, setSelectedTopicId] = useState('')
  const [imagePolicy, setImagePolicy] = useState('auto')
  const [kindFilter, setKindFilter] = useState('all')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [refreshedAt, setRefreshedAt] = useState('')

  const loadLists = async () => {
    const [gens, guideRows] = await Promise.all([api.get('/generations'), api.get('/guides')])
    setItems(gens); setGuides(guideRows)
    return gens
  }
  const loadGeneration = async (id) => {
    const sequence = ++loadSequence.current
    if (!id) { setGeneration(null); setDraft(null); setRefreshedAt(new Date().toISOString()); return null }
    try {
      const value = await api.get(`/generations/${id}`)
      if (sequence !== loadSequence.current) return null
      setGeneration(value)
      setDraft(value.humanized || value.draft)
      setSelectedSources(value.research?.official?.sources?.filter((source) => source.selected).map((source) => source.url) || [])
      setAllowWithoutOfficial(!!value.input?.allowWithoutOfficial)
      setRefreshedAt(new Date().toISOString())
      return value
    } catch (value) { setGeneration(null); setDraft(null); setError(value.message); return null }
  }

  useEffect(() => {
    loadLists().then((gens) => {
      if (!gens.length) { setPanel('create'); return }
      if (seed) return // 다른 화면에서 넘어온 경우 아래 seed 효과가 선택을 결정한다.
      setSelectedId(gens[0].id)
      loadGeneration(gens[0].id)
    }).catch((value) => setError(value.message))
  }, [])

  useEffect(() => {
    if (!seed) return
    if (seed.generationId) {
      setPanel('work'); setTab('preview')
      setSelectedId(Number(seed.generationId))
      loadGeneration(Number(seed.generationId))
    } else {
      setPanel('create')
      setMode(seed.targetSlug ? 'update' : 'new')
      setCreate((current) => ({ ...current, topic: seed.topic || '', targetSlug: seed.targetSlug || '', category: seed.category || current.category }))
    }
    clearSeed?.()
  }, [seed])

  useEffect(() => {
    if (busy !== 'auto' && busy !== 'prepare') return undefined
    if (!selectedId) return undefined
    const timer = setInterval(() => {
      api.get(`/generations/${selectedId}`).then((value) => { setGeneration(value); setDraft(value.humanized || value.draft) }).catch(() => {})
    }, 2500)
    return () => clearInterval(timer)
  }, [busy, selectedId])

  const select = async (id) => {
    if (busy) return
    setSelectedId(id); setPanel('work'); setTab('preview'); setDiff(null)
    await loadGeneration(id)
  }

  const refreshCurrent = async () => {
    setBusy('refresh'); setError(''); setMessage('')
    try {
      await loadLists()
      const value = await loadGeneration(selectedId)
      if (value) setMessage('작업 목록과 선택한 원고를 다시 확인했습니다.')
    } catch (value) { setError(value.message) }
    finally { setBusy('') }
  }

  const run = async (label, fn, { success = '', focus = null } = {}) => {
    if (busy) return null
    setBusy(label); setError(''); setMessage('')
    let result = null
    let failed = false
    try {
      result = await fn()
      if (success) setMessage(success)
    } catch (value) { setError(value.message); failed = true }
    setBusy('')
    // 이미지·검사처럼 다른 모양의 응답이 와도 화면 선택은 바뀌지 않는다.
    const nextId = focus === 'result' && result?.id ? result.id : selectedId
    if (nextId !== selectedId) { setSelectedId(nextId); setPanel('work') }
    await loadLists().catch(() => {})
    if (nextId) await loadGeneration(nextId)
    return failed ? null : result
  }

  const createGeneration = async (event) => {
    event.preventDefault()
    const payload = mode === 'update' ? create : { ...create, targetSlug: '' }
    const result = await run('create', () => api.post('/generations', payload), { success: '새 작업을 만들었습니다.', focus: 'result' })
    if (result?.id) { setPanel('work'); setTab('preview'); setCreate(EMPTY_CREATE) }
  }
  const discoverTopics = async () => {
    const report = await run('topics', () => api.post('/automation/topics', { limit: 5, force: false }))
    if (!report) return
    setTopicReport(report)
    setSelectedTopicId(report.recommended?.id || '')
    setMessage(report.recommended ? `서버 검증을 통과한 후보 ${report.accepted.length}개를 찾았습니다.` : '모든 후보가 중복 또는 수요 근거 부족으로 보류됐습니다.')
  }
  const selectTopic = (candidate) => {
    setSelectedTopicId(candidate.id)
    setCreate((current) => ({ ...current, targetSlug: '', topic: candidate.topic, category: candidate.category, inquiryType: candidate.inquiryType, slug: candidate.slug }))
  }
  const prepareTopic = async (candidate) => {
    selectTopic(candidate)
    const result = await run('prepare', () => api.post('/automation/prepare', { candidateId: candidate.id, businessFacts: create.businessFacts }),
      { success: '원고·이미지·검사와 파일 변경 묶음까지 준비를 마쳤습니다.', focus: 'result' })
    if (result?.id) { setPanel('work'); setTab('preview') }
  }
  const autoAdvance = () => run('auto', () => api.post('/automation/prepare', { generationId: selectedId, businessFacts: create.businessFacts, imagePolicy }),
    { success: '남은 단계를 자동으로 끝냈습니다. 미리보기 확인 후 최종 승인만 하면 됩니다.' })
  const saveSources = () => run('sources', () => api.put(`/generations/${selectedId}/sources`, { selectedUrls: selectedSources, allowWithoutOfficial }), { success: '출처 선택을 저장했습니다.' })
  const researchSources = (emphasizeOfficial) => run('official', () => api.post(`/generations/${selectedId}/research/official`, { emphasizeOfficial }),
    { success: emphasizeOfficial ? '정부·표준기관 중심으로 출처를 다시 조사했습니다.' : '공식 출처 후보를 찾았습니다.' })
  const saveDraft = (value) => run('save', () => api.put(`/generations/${selectedId}/draft`, { draft: value }), { success: '원고를 저장하고 다시 검사했습니다.' })
  const doAction = (label, path, body, success) => run(label, () => api.post(`/generations/${selectedId}${path}`, body || {}), { success })
  const generateImage = (label, item) => run(label, () => api.post(`/generations/${selectedId}/images`, {
    slot: item.slot, sectionIndex: item.sectionIndex,
    prompt: item.plan?.prompt || item.fallbackPrompt,
    altText: item.plan?.alt || item.fallbackAlt,
    caption: item.plan?.caption || '',
  }), { success: '이미지를 생성했습니다.' })
  const previewDiff = async () => {
    const result = await run('diff', () => api.get(`/generations/${selectedId}/diff`))
    if (result) setDiff(result)
  }
  const removeWork = async (item, event) => {
    event.stopPropagation()
    if (!confirm(`작업 #${item.id} “${item.topic}”을 목록에서 지울까요? 반영 이력이 있으면 기록은 남기고 숨김 처리합니다.`)) return
    const result = await run(`delete-${item.id}`, () => api.del(`/generations/${item.id}`))
    if (!result) return
    setMessage(result.message)
    if (item.id === selectedId) {
      const rest = await api.get('/generations').catch(() => [])
      setItems(rest)
      const next = rest[0]?.id || null
      setSelectedId(next)
      await loadGeneration(next)
      if (!next) setPanel('create')
    }
  }

  const pruneDone = async (ids) => {
    if (!ids.length) return
    if (!confirm(`반영이 끝난 작업 ${ids.length}건을 목록에서 정리할까요? 반영 이력이 있는 작업은 기록을 남기고 숨김 처리합니다.`)) return
    const result = await run('prune', () => api.post('/generations/bulk-delete', { ids }))
    if (result) setMessage(`${result.deleted}건 삭제, ${result.archived}건 숨김 처리했습니다.`)
    if (ids.includes(selectedId)) {
      const rest = await api.get('/generations').catch(() => [])
      setItems(rest)
      setSelectedId(rest[0]?.id || null)
      await loadGeneration(rest[0]?.id || null)
    }
  }

  const sourceRows = generation?.research?.official?.sources || []
  const steps = guideSteps(generation, draft)
  const currentIndex = steps.findIndex((step) => !step.done)
  const currentStep = currentIndex === -1 ? null : steps[currentIndex]
  const autoEligible = currentStep && ['official', 'select', 'draft', 'image', 'polish'].includes(currentStep.key)

  const stepAction = (step) => {
    if (step.key === 'official') return researchSources(false)
    if (step.key === 'select') {
      const officials = sourceRows.filter((source) => source.official).map((source) => source.url)
      if (officials.length) {
        setSelectedSources(officials)
        return run('select', () => api.put(`/generations/${selectedId}/sources`, { selectedUrls: officials, allowWithoutOfficial: false }), { success: '공식 출처를 모두 선택해 저장했습니다.' })
      }
      // 권위 출처가 없을 때도 막지 않고, 운영자 확인을 받아 보조 출처로 진행한다.
      setTab('sources')
      if (!confirm('공식·권위 출처 후보가 없습니다. 보조 출처 전체를 근거로 삼아 진행할까요?\n(취소하면 ‘출처’ 탭에서 다시 조사하거나 직접 고를 수 있습니다.)')) return undefined
      const all = sourceRows.map((source) => source.url)
      setSelectedSources(all); setAllowWithoutOfficial(true)
      return run('select', () => api.put(`/generations/${selectedId}/sources`, { selectedUrls: all, allowWithoutOfficial: true }), { success: '보조 출처로 진행하도록 저장했습니다. 검수 단계에서 근거를 확인해 주세요.' })
    }
    if (step.key === 'draft') return doAction('draft', '/generate', {}, '원고와 자동 검사를 완료했습니다.')
    if (step.key === 'image') {
      setTab('images')
      return generateImage('image-hero', {
        slot: 'hero', sectionIndex: null, plan: draft?.heroImage, fallbackAlt: draft?.title,
        fallbackPrompt: fallbackPrompt(generation.topic, draft?.title || generation.topic, 'hero'),
      })
    }
    if (step.key === 'polish') return doAction('polish', '/humanize', {}, '문장 다듬기를 마쳤습니다.')
    if (step.key === 'approve') return doAction('approve', '/approve', {}, '원고를 승인했습니다. 이제 저장소에 반영할 수 있습니다.')
    if (step.key === 'apply') {
      if (!confirm('승인된 파일을 귀족 저장소에 반영하고 typecheck·build·SEO 검사를 실행할까요? Git 커밋과 배포는 하지 않습니다.')) return undefined
      return doAction('apply', '/apply', {}, '저장소 반영과 3개 검사를 완료했습니다.')
    }
    return undefined
  }

  const kindFiltered = useMemo(() => items.filter((item) => kindFilter === 'all' || (kindFilter === 'update' ? item.kind === 'update' : item.kind !== 'update')), [items, kindFilter])
  const list = useListState({
    rows: kindFiltered,
    search: (row) => `${row.topic} ${row.targetSlug || ''} #${row.id}`,
    filters: [
      { id: 'all', label: '전체' },
      { id: 'progress', label: '작업 중', test: (row) => statusGroup(row.status) === 'progress' },
      { id: 'review', label: '검수·승인', test: (row) => statusGroup(row.status) === 'review' },
      { id: 'done', label: '반영 완료', test: (row) => statusGroup(row.status) === 'done' },
    ],
    sorters: [
      { id: 'updated', label: '최근 수정순', value: (row) => row.updatedAt, dir: 'desc' },
      { id: 'created', label: '만든 순서', value: (row) => row.createdAt, dir: 'desc' },
      { id: 'topic', label: '주제 이름순', value: (row) => row.topic, dir: 'asc' },
      { id: 'status', label: '상태순', value: (row) => statusLabel(row.status), dir: 'asc' },
    ],
    initialSize: 10,
  })

  const activeImages = (generation?.images || []).filter((image) => image.status === 'active').length
  const tabs = [
    { id: 'preview', label: '미리보기' },
    { id: 'draft', label: '원고 편집' },
    { id: 'sources', label: `출처${sourceRows.length ? ` ${selectedSources.length}/${sourceRows.length}` : ''}` },
    { id: 'images', label: `이미지${activeImages ? ` ${activeImages}` : ''}` },
    { id: 'checks', label: '검사·반영', flag: generation?.lint?.blocking ? 'danger' : null },
  ]

  return <main className="editor-page page-enter">
    <header className="editor-topbar">
      <div className="editor-title"><p className="eyebrow">GUIDE WORKBENCH</p><h1>가이드 편집</h1></div>
      {panel === 'work' && generation && <div className="editor-current">
        <KindTag kind={generation.kind} />
        <strong>{generation.topic}</strong>
        <span className="editor-current-meta">#{generation.id}{generation.target_slug ? ` · ${generation.target_slug}` : ''} · {dateTime(generation.updated_at)}</span>
        <Badge tone={statusTone(generation.status)}>{statusLabel(generation.status)}</Badge>
      </div>}
      <button type="button" className="button button-primary editor-new" onClick={() => { setPanel('create'); setTopicReport(null) }}><FilePlus2 size={16} />새 작업</button>
    </header>

    <div className="editor-body">
      <aside className="work-rail">
        <div className="rail-head">
          <strong>작업 목록</strong>
          <div className="kind-switch">{[['all', '전체'], ['new', '새 글'], ['update', '수정']].map(([id, label]) => <button type="button" key={id} className={kindFilter === id ? 'active' : ''} onClick={() => setKindFilter(id)}>{label}</button>)}</div>
        </div>
        <ListToolbar state={list} placeholder="주제·번호 검색" />
        {list.filter === 'done' && list.total > 0 && <button type="button" className="text-button prune-done" disabled={!!busy}
          onClick={() => pruneDone(kindFiltered.filter((item) => statusGroup(item.status) === 'done').map((item) => item.id))}>
          {busy === 'prune' ? <Spinner label="정리 중" /> : <><Trash2 size={13} />반영 완료 {list.total}건 목록에서 정리</>}
        </button>}
        <div className="work-list">
          {list.view.map((item) => <div key={item.id} className={`work-item ${selectedId === item.id && panel === 'work' ? 'active' : ''} ${statusGroup(item.status)}`} onClick={() => select(item.id)} role="button" tabIndex={0}
            onKeyDown={(event) => { if (event.key === 'Enter') select(item.id) }}>
            <div className="work-item-top"><KindTag kind={item.kind} size="sm" /><span className="work-id">#{item.id}</span></div>
            <strong>{item.topic}</strong>
            <div className="work-item-foot">
              <Badge tone={statusTone(item.status)}>{statusLabel(item.status)}</Badge>
              <small>{shortDate(item.updatedAt)}</small>
              <button type="button" className="work-delete" aria-label="작업 삭제" title="목록에서 지우기" disabled={!!busy} onClick={(event) => removeWork(item, event)}>
                {busy === `delete-${item.id}` ? <Spinner label="" /> : <Trash2 size={14} />}
              </button>
            </div>
            {item.error && <em className="work-error">{item.error}</em>}
          </div>)}
          {!list.view.length && <EmptyRow title="표시할 작업이 없습니다" hint="필터를 바꾸거나 새 작업을 만들어 보세요." />}
        </div>
        <Pagination state={list} sizes={[10, 20, 50]} />
      </aside>

      <section className="workspace">
        <ErrorNotice message={error} onClose={() => setError('')} />
        <SuccessNotice message={message} onClose={() => setMessage('')} />

        {panel === 'create' ? <NewWorkPanel
          mode={mode} setMode={setMode} create={create} setCreate={setCreate} guides={guides}
          onSubmit={createGeneration} busy={busy} topicReport={topicReport} selectedTopicId={selectedTopicId}
          onDiscover={discoverTopics} onSelectTopic={selectTopic} onPrepareTopic={prepareTopic}
          onCancel={() => { setPanel('work'); if (!selectedId && items[0]) select(items[0].id) }}
        /> : !generation ? <div className="empty-workspace"><Gem size={40} /><h2>왼쪽에서 작업을 선택하세요</h2><p>또는 오른쪽 위 ‘새 작업’으로 새 글 작성이나 기존 글 수정을 시작할 수 있습니다.</p></div> : <>
          <section className={`work-banner ${generation.kind === 'update' ? 'update' : 'new'}`}>
            <div className="banner-copy">
              <KindTag kind={generation.kind} />
              <strong>{generation.topic}</strong>
              <small>{generation.kind === 'update' ? `반영하면 ${generation.target_slug} 페이지가 교체됩니다.` : '완전히 새로운 가이드 페이지를 만듭니다.'}</small>
            </div>
            <div className="banner-actions">
              <RefreshStatus refreshedAt={refreshedAt} sources={[{ label: '작업 수정', value: generation.updated_at }]} />
              {generation.kind === 'update' && autoEligible && <label className="image-policy"><span>대표 이미지</span>
                <select value={imagePolicy} onChange={(event) => setImagePolicy(event.target.value)} disabled={!!busy} title="본문 이미지는 어느 설정에서도 새로 생성됩니다.">
                  <option value="auto">자동 판단</option><option value="reuse">기존 것 유지</option><option value="new">새로 생성</option>
                </select></label>}
              {autoEligible && <button type="button" className="button button-primary" onClick={autoAdvance} disabled={!!busy}>
                {busy === 'auto' ? <Spinner label="자동 진행 중" /> : <><Play size={15} />여기부터 자동 진행</>}</button>}
              <button type="button" className="button button-quiet" onClick={refreshCurrent} disabled={!!busy}>{busy === 'refresh' ? <Spinner label="확인 중" /> : <><RefreshCcw size={15} />새로고침</>}</button>
            </div>
          </section>

          {busy === 'auto' && <p className="guide-running">출처 → 원고 → 이미지 → 다듬기 → SEO 검사 → 파일 변경 순으로 자동 진행 중입니다. 진행 상황은 아래 순서와 ‘검사·반영’ 탭에 실시간 반영됩니다.</p>}

          {generation.input?.auditPlan && <details className="audit-plan-banner"><summary>진단에서 확정한 수정안 · 활성 작업 {(generation.input.auditPlan.changes || []).filter((entry) => entry.enabled).length}개</summary>
            <p>{generation.input.auditPlan.goal}</p>
            {(generation.input.auditPlan.changes || []).filter((entry) => entry.enabled).map((entry) => <div key={entry.id}><b>{entry.priority} · {entry.area}</b><span>{entry.action}</span></div>)}
          </details>}

          <section className="progress-section">
            <div className="panel-head"><div><h2>작업 순서</h2><p>{currentStep ? `다음 할 일은 ${currentStep.label}입니다.` : '모든 단계가 끝났습니다.'}</p></div></div>
            <StepRail steps={steps} currentIndex={currentIndex} busy={busy} onStep={stepAction} />
            {!currentStep && <div className="guide-done"><CheckCircle2 size={17} />모든 단계 완료 — ‘반영 이력’에서 검사 로그를 확인할 수 있습니다.</div>}
          </section>

          <nav className="workspace-tabs" role="tablist">
            {tabs.map((item) => <button type="button" key={item.id} role="tab" aria-selected={tab === item.id} className={`${tab === item.id ? 'active' : ''} ${item.flag || ''}`} onClick={() => setTab(item.id)}>{item.label}</button>)}
          </nav>

          <div className="tab-body">
            {tab === 'preview' && <GuidePreview draft={draft} generation={generation} />}
            {tab === 'draft' && <DraftTab draft={draft} onChange={setDraft} onSave={saveDraft} busy={busy} isUpdate={generation?.kind === 'update'} />}
            {tab === 'sources' && <SourcesTab rows={sourceRows} selected={selectedSources} setSelected={setSelectedSources}
              allowWithoutOfficial={allowWithoutOfficial} setAllowWithoutOfficial={setAllowWithoutOfficial}
              onSave={saveSources} onResearch={researchSources} busy={busy} />}
            {tab === 'images' && <ImagesTab generation={generation} draft={draft} busy={busy} onGenerate={generateImage} />}
            {tab === 'checks' && <ChecksTab generation={generation} draft={draft} busy={busy}
              onAction={() => doAction('lint', '/lint', { requireImage: false }, '검사를 갱신했습니다.')}
              onDiff={previewDiff}
              onApprove={() => doAction('approve', '/approve', {}, '원고를 승인했습니다.')}
              onApply={() => { if (confirm('승인된 파일을 귀족 저장소에 반영하고 검사를 실행할까요? Git 커밋과 배포는 하지 않습니다.')) doAction('apply', '/apply', {}, '저장소 반영과 3개 검사를 완료했습니다.') }} />}
          </div>
        </>}
      </section>
    </div>

    {diff?.files && <div className="modal-backdrop" onClick={() => setDiff(null)}>
      <div className="diff-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head"><div><p className="eyebrow">CHANGESET</p><h2>파일 변경 미리보기</h2></div><button type="button" onClick={() => setDiff(null)}><X /></button></div>
        {diff.files.map((file) => <section key={file.path}><h3>{file.added ? '신규 · ' : ''}{file.path}</h3>
          <pre>{file.changes?.slice(0, 18).map((part, index) => <span key={index} className={part.added ? 'added' : part.removed ? 'removed' : ''}>{part.value}</span>)}</pre>
        </section>)}
      </div>
    </div>}
  </main>
}
