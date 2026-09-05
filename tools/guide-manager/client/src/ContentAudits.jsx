import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, Check, CheckCircle2, ChevronRight, CircleAlert, FilePenLine, FileSearch,
  LoaderCircle, RefreshCcw, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { api } from './api'
import { Badge as AuditBadge, EmptyRow, ListToolbar, Pagination, RefreshStatus, SortHead, fmt, pct, shortDate, useListState } from './ui'

const CLASSIFICATIONS = ['전체', '기술 우선', 'CTR 개선', '출처 백필', '본문 보강', '내부링크 강화', '통합 검토', '유지']

function Busy({ children }) {
  return <span className="spinner-label"><LoaderCircle size={15} className="spin" />{children}</span>
}

const WORK_LABELS = { idea: '기획', researched: '근거 준비', generating: '생성 중', draft: '초안', humanizing: '다듬는 중', humanized: '다듬기 완료', review: '검수 대기', ready: '게시 준비 완료', approved: '승인됨', applied: '반영 완료' }
const workState = (work) => !work?.latest ? 'untouched' : work.latest.status === 'applied' ? 'applied' : 'working'

function WorkBadge({ work }) {
  if (!work?.latest) return null
  if (work.latest.status === 'applied') return <AuditBadge tone="success">✓ 수정 반영됨 · {shortDate(work.appliedAt || work.latest.updatedAt)}</AuditBadge>
  if (work.appliedAt) return <AuditBadge tone="gold">반영 후 재작업 중</AuditBadge>
  return <AuditBadge tone="gold">작업 중 · {WORK_LABELS[work.latest.status] || work.latest.status}</AuditBadge>
}

function toneFor(classification) {
  if (classification === '기술 우선') return 'danger'
  if (classification === 'CTR 개선') return 'gold'
  if (classification === '출처 백필') return 'gold'
  if (classification === '유지') return 'success'
  return 'neutral'
}

function statusLabel(status) {
  return ({ measured: '수치 진단', analyzing: 'Terra 분석 중', ready: 'Terra 완료', stale: '재분석 필요', error: '분석 오류' })[status] || status
}

function naverLabel(value) {
  if (!value?.measured) return '미측정'
  if (value.available === false) return '순위 API 비활성'
  if (value.found) return `${value.rank}위`
  return '측정 범위 밖'
}

function errorText(error) {
  return error?.message || '처리 중 오류가 발생했습니다.'
}

function DetailSkeleton({ onBack }) {
  return <aside className="audit-detail audit-detail-empty">
    <button className="audit-detail-back" type="button" onClick={onBack}><ArrowLeft size={16} />목록으로 돌아가기</button>
    <div className="audit-detail-empty-copy"><FileSearch size={30} /><strong>상세 분석을 불러오는 중입니다</strong><p>수치, 본문 구조, 기술 신호와 수정 계획을 연결하고 있습니다.</p></div>
  </aside>
}

function SignalLedger({ snapshot }) {
  const { gsc, ga4, googleOrganic, naver, naverWeb } = snapshot.metrics
  const topQuery = snapshot.queryHints?.[0]
  return <section className="audit-section">
    <h3>판단 근거</h3>
    <dl className="signal-ledger">
      <div><dt>Google 검색</dt><dd><strong>노출 {fmt(gsc.impressions)} · 클릭 {fmt(gsc.clicks)}</strong><span>CTR {pct(gsc.ctr, 2)} · 평균 {gsc.position == null ? '순위 없음' : `${Number(gsc.position).toFixed(1)}위`} · 기대 CTR {pct(gsc.expectedCtr, 1)}</span></dd></div>
      <div><dt>GA4 참여</dt><dd><strong>{ga4.mapped ? `조회 ${fmt(ga4.views)} · 사용자 ${fmt(ga4.activeUsers)}` : '페이지 제목 정확 일치 매핑 없음'}</strong><span>{ga4.mapped ? `이벤트 ${fmt(ga4.events)} · 이탈 ${pct(ga4.bounceRate)}` : '0으로 평가하지 않고 미측정 상태로 보존합니다.'}</span></dd></div>
      <div><dt>검색 후 참여</dt><dd><strong>{googleOrganic?.mapped ? `활성 사용자 ${fmt(googleOrganic.activeUsers)} · 참여 세션 ${fmt(googleOrganic.engagedSessions)}` : '자연 검색 방문 페이지 연결 없음'}</strong><span>{googleOrganic?.mapped ? `참여율 ${pct(googleOrganic.engagementRate, 1)} · 평균 참여 ${Number(googleOrganic.avgEngagementSeconds || 0).toFixed(1)}초 · 주요 이벤트 ${fmt(googleOrganic.keyEvents)}` : 'GSC 유입 뒤 GA4 행동을 같은 경로에서 확인합니다.'}</span></dd></div>
      <div><dt>Naver 보조</dt><dd><strong>{naverLabel(naver)}</strong><span>{naver.measured ? `트렌드 ${naver.trendDirection || '자료 없음'} · 상대 지수 ${naver.trendRatio ?? '—'}${naver.competingUrl ? ` · 대신 노출 ${naver.competingRank}위 ${naver.competingUrl}` : ''}` : '주간 측정 후 목표 URL 정확 일치 순위·상대 트렌드가 연결됩니다.'}</span></dd></div>
      <div><dt>Naver 웹검색</dt><dd><strong>{naverWeb?.listed ? `노출 ${fmt(naverWeb.impressions)} · 클릭 ${fmt(naverWeb.clicks)}` : 'TOP 30 URL 목록 밖'}</strong><span>{naverWeb?.listed ? `CTR ${pct(naverWeb.ctr, 2)} · 웹검색 전체 ${pct(naverWeb.overallCtr, 1)}` : '목록 밖은 노출 0이 아니며 성과 부진으로 판정하지 않습니다.'}</span></dd></div>
      <div><dt>관련 검색어</dt><dd><strong>{topQuery?.query || '추정 가능한 검색어 없음'}</strong><span>{topQuery ? `사이트 전체 검색어에서 유사도 ${Math.round(topQuery.similarity * 100)}%로 추정 · 노출 ${fmt(topQuery.impressions)}` : 'GSC 검색어 CSV는 페이지와 직접 연결되지 않습니다.'}</span></dd></div>
      <div><dt>URL·색인</dt><dd><strong>원본 변형 {fmt(gsc.variants)}개 · self-canonical {snapshot.content.technical.selfCanonical ? '정상' : '확인 필요'}</strong><span>Coverage 미색인 {fmt(snapshot.metrics.coverage?.notIndexed)}개는 사이트 전체 값입니다.</span></dd></div>
    </dl>
  </section>
}

function Diagnosis({ item }) {
  const snapshot = item.snapshot
  const analysis = item.aiAnalysis
  const deterministic = snapshot.deterministicChanges || []
  return <>
    <section className="audit-section">
      <div className="audit-section-head"><h3>상세 진단</h3><AuditBadge tone={analysis ? 'gold' : 'neutral'}>{analysis ? 'Terra · medium' : '규칙 기반 전수 분석'}</AuditBadge></div>
      {analysis ? <>
        <p className="audit-summary">{analysis.summary}</p>
        <div className="diagnosis-columns">
          <div><strong>유지할 강점</strong>{analysis.currentStrengths?.length ? <ul>{analysis.currentStrengths.map((value) => <li key={value}>{value}</li>)}</ul> : <p>별도 강점 기록 없음</p>}</div>
          <div><strong>해결할 문제</strong>{analysis.currentProblems?.length ? <ul>{analysis.currentProblems.map((value) => <li key={value}>{value}</li>)}</ul> : <p>차단 문제 없음</p>}</div>
        </div>
      </> : <div className="deterministic-findings">{deterministic.map((entry) => <article key={entry.id}><span>{entry.priority}</span><div><strong>{entry.action}</strong><p>{entry.proposedState}</p><small>{entry.currentState}</small></div></article>)}</div>}
    </section>
    <section className="audit-section">
      <h3>본문·링크 구조</h3>
      <div className="structure-line">
        {[['본문', `${fmt(snapshot.content.characterCount)}자`], ['섹션', fmt(snapshot.content.structure.sectionCount)], ['FAQ', fmt(snapshot.content.structure.faqCount)], ['공식 출처', fmt(snapshot.content.structure.officialSourceCount)], ['관련 링크', fmt(snapshot.content.structure.relatedLinkCount)], ['유입 링크', fmt(snapshot.links.inboundCount)]].map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}
      </div>
      {snapshot.duplicates?.[0] && <p className="nearest-copy">가장 가까운 기존 글: <b>{snapshot.duplicates[0].title}</b> · 텍스트 유사도 {Math.round(snapshot.duplicates[0].similarity * 100)}%</p>}
    </section>
  </>
}

function PlanEditor({ item, plan, setPlan, onSave, onCreate, onAnalyze, busy }) {
  const snapshot = item.snapshot
  const readOnly = snapshot.guide.isCustom
  const recentHold = snapshot.guards?.recentObservationHold
  const patch = (key, value) => setPlan((current) => ({ ...current, [key]: value }))
  const patchChange = (index, values) => patch('changes', plan.changes.map((entry, current) => current === index ? { ...entry, ...values } : entry))
  const patchSection = (index, values) => patch('sectionPlan', plan.sectionPlan.map((entry, current) => current === index ? { ...entry, ...values } : entry))
  const toggleLink = (link) => {
    const exists = plan.internalLinks.some((item) => item.to === link.to)
    patch('internalLinks', exists ? plan.internalLinks.filter((item) => item.to !== link.to) : [...plan.internalLinks, { to: link.to, reason: link.reason }])
  }
  return <section className="audit-section plan-editor">
    <div className="audit-section-head"><div><h3>확정할 수정 계획</h3><p>체크된 항목만 원고 생성 지시로 전달됩니다.</p></div><AuditBadge tone={item.planStatus === 'edited' ? 'success' : 'neutral'}>{item.planStatus === 'edited' ? '사용자 편집 저장됨' : '제안 상태'}</AuditBadge></div>
    {!item.aiAnalysis && <button className="button button-quiet full" type="button" onClick={onAnalyze} disabled={!!busy}>{busy === 'analyze-one' ? <Busy>Terra 정밀진단 중</Busy> : <><Sparkles size={15} />이 글 Terra 정밀진단</>}</button>}
    <div className="plan-fields">
      <label><span>수정 방향</span><select value={plan.classification} onChange={(event) => patch('classification', event.target.value)}>{CLASSIFICATIONS.slice(1).map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span>이번 수정 목표</span><textarea rows="2" value={plan.goal} onChange={(event) => patch('goal', event.target.value)} /></label>
      <label><span>제안 제목</span><input value={plan.proposedTitle} onChange={(event) => patch('proposedTitle', event.target.value)} /></label>
      <label><span>제안 검색 설명</span><textarea rows="2" value={plan.proposedDescription} onChange={(event) => patch('proposedDescription', event.target.value)} /></label>
    </div>
    <div className="plan-subsection">
      <div className="plan-subhead"><strong>상세 수정 항목</strong><span>{plan.changes.filter((entry) => entry.enabled).length}/{plan.changes.length}개 선택 · 눌러서 편집</span></div>
      <div className="change-plan-list">{plan.changes.map((entry, index) => <details key={entry.id || index} className={`change-item ${entry.enabled ? 'enabled' : ''}`}>
        <summary>
          <input type="checkbox" checked={entry.enabled} onClick={(event) => event.stopPropagation()} onChange={(event) => patchChange(index, { enabled: event.target.checked })} />
          <span className="change-priority">{entry.priority}</span>
          <span className="change-summary-copy"><b>{entry.area}</b><small>{entry.action}</small></span>
          <ChevronRight size={14} className="chev" />
        </summary>
        <div className="change-item-body">
          <label><span>작업</span><input value={entry.action} onChange={(event) => patchChange(index, { action: event.target.value })} /></label>
          <label><span>상세 변경 내용</span><textarea rows="3" value={entry.proposedState} onChange={(event) => patchChange(index, { proposedState: event.target.value })} /></label>
          <small>현재: {entry.currentState}</small><small>목표 지표: {entry.targetMetric || '—'}{entry.requiresOfficialSource ? ' · 공식 근거 필요' : ''}</small>
        </div>
      </details>)}</div>
    </div>
    <details className="plan-collapse">
      <summary><strong>섹션 구성</strong><span>{plan.sectionPlan.length ? `${plan.sectionPlan.length}개 계획` : '계획 없음'}</span></summary>
      <button className="plan-collapse-action" type="button" onClick={() => patch('sectionPlan', [...plan.sectionPlan, { action: '추가', heading: '', detail: '' }])}>+ 섹션 추가</button>
      {plan.sectionPlan.length ? <div className="section-plan-list">{plan.sectionPlan.map((section, index) => <div key={`${section.heading}-${index}`}>
        <select value={section.action} onChange={(event) => patchSection(index, { action: event.target.value })}>{['유지', '추가', '수정', '삭제'].map((value) => <option key={value}>{value}</option>)}</select>
        <input placeholder="섹션 제목" value={section.heading} onChange={(event) => patchSection(index, { heading: event.target.value })} />
        <textarea rows="2" placeholder="무엇을 어떻게 바꿀지" value={section.detail} onChange={(event) => patchSection(index, { detail: event.target.value })} />
        <button type="button" aria-label="섹션 계획 삭제" onClick={() => patch('sectionPlan', plan.sectionPlan.filter((_, current) => current !== index))}><X size={14} /></button>
      </div>)}</div> : <p className="plan-empty">Terra 진단 후 섹션별 추가·수정안이 채워집니다. 직접 추가할 수도 있습니다.</p>}
    </details>
    <details className="plan-collapse">
      <summary><strong>허용된 내부링크</strong><span>{plan.internalLinks.length ? `${plan.internalLinks.length}개 선택` : '선택 없음'}</span></summary>
      <div className="link-options">{item.allowedInternalLinks?.length ? item.allowedInternalLinks.map((link) => <label key={link.to}><input type="checkbox" checked={plan.internalLinks.some((item) => item.to === link.to)} onChange={() => toggleLink(link)} /><span><b>{link.label || link.to}</b><small>{link.to} · {link.reason}</small></span></label>) : <p className="plan-empty">연결할 수 있는 가이드 후보가 없습니다.</p>}</div>
    </details>
    {snapshot.guards.keepSnippet && <div className="guard-note"><ShieldCheck size={16} /><span>현재 CTR이 기대치에 근접한 제목은 기본 보존됩니다. 제목 변경 항목은 자동으로 비활성 처리됩니다.</span></div>}
    {recentHold && <div className="guard-note"><ShieldCheck size={16} /><span>최근 변경일 {snapshot.guards.changeDate}부터 31일간 성과를 관찰합니다. {snapshot.guards.observeUntil}까지 분석은 보존하되 수정 작업은 만들지 않습니다.</span></div>}
    {readOnly ? <div className="guard-note"><ShieldCheck size={16} /><span>이 커스텀 가이드는 읽기 전용입니다. 분석은 저장하지만 자동 수정 작업은 만들지 않습니다.</span></div> : recentHold ? null : <div className="plan-actions">
      <button className="button button-quiet" type="button" onClick={onSave} disabled={!!busy}>{busy === 'save' ? <Busy>저장 중</Busy> : <><Check size={15} />수정안 저장</>}</button>
      <button className="button button-primary" type="button" onClick={onCreate} disabled={!!busy || !plan.changes.some((entry) => entry.enabled)}>{busy === 'create' ? <Busy>작업 생성 중</Busy> : <><FilePenLine size={15} />수정안 확정·편집 시작</>}</button>
    </div>}
    <small className="apply-boundary">편집 작업 생성은 저장소를 바꾸지 않습니다. 원고·이미지·diff 확인 후 별도 최종 승인과 반영 절차가 필요합니다.</small>
  </section>
}

function AuditDetail({ item, onBack, onReload, onStart, busy, setBusy, setGlobalError, setMessage }) {
  const [plan, setPlan] = useState(item.plan)
  useEffect(() => setPlan(item.plan), [item.id, item.updatedAt])
  const run = async (name, action, success) => {
    setBusy(name); setGlobalError(''); setMessage('')
    try { const result = await action(); if (success) setMessage(success); return result }
    catch (error) { setGlobalError(errorText(error)); throw error }
    finally { setBusy('') }
  }
  const save = () => run('save', () => api.put(`/audits/${item.guideSlug}/plan`, { plan }), '수정 계획을 저장했습니다.').then(onReload).catch(() => {})
  const create = () => {
    if (!confirm('현재 체크한 수정안을 확정하고 가이드 편집 작업을 만들까요? 아직 저장소에는 반영되지 않습니다.')) return
    run('create', () => api.post(`/audits/${item.guideSlug}/create-update`, { plan }), '수정 작업을 만들었습니다.').then((generation) => onStart({ generationId: generation.id })).catch(() => {})
  }
  const analyzeOne = () => run('analyze-one', () => api.post('/audits/analyze', { slugs: [item.guideSlug], force: true }), 'Terra 상세 진단을 완료했습니다.').then(onReload).catch(() => {})
  return <aside className="audit-detail">
    <button className="audit-detail-back" type="button" onClick={onBack}><ArrowLeft size={16} />목록으로 돌아가기</button>
    <header className="audit-detail-head">
      <div><div className="audit-title-line"><AuditBadge tone={toneFor(plan.classification)}>{plan.classification}</AuditBadge>{item.snapshot.guide.isCustom && <AuditBadge>읽기 전용</AuditBadge>}{item.snapshot.guards?.recentObservationHold && <AuditBadge>D+31 관찰</AuditBadge>}<AuditBadge tone={item.status === 'ready' ? 'success' : item.status === 'error' ? 'danger' : 'neutral'}>{statusLabel(item.status)}</AuditBadge><WorkBadge work={item.work} /></div><h2>{item.snapshot.guide.title}</h2><p>{item.snapshot.guide.path}</p></div>
      <div className="audit-score-pair"><span><small>우선순위</small><b>{item.snapshot.scores.priority}</b></span><span><small>노출 준비도</small><b>{item.snapshot.scores.readiness}</b></span></div>
    </header>
    {item.error && <div className="inline-audit-error"><CircleAlert size={15} /><span>{item.error}</span></div>}
    <div className="audit-detail-columns">
      <div className="audit-analysis-col">
        <SignalLedger snapshot={item.snapshot} />
        <Diagnosis item={item} />
        <details className="audit-caveats"><summary>해석 한계와 안전 규칙</summary>{item.snapshot.caveats.map((value) => <p key={value}>{value}</p>)}</details>
      </div>
      <div className="audit-plan-col">
        <PlanEditor item={item} plan={plan} setPlan={setPlan} onSave={save} onCreate={create} onAnalyze={analyzeOne} busy={busy} />
      </div>
    </div>
  </aside>
}

export function ContentAudits({ onStart }) {
  const [report, setReport] = useState(null)
  const [selectedSlug, setSelectedSlug] = useState('')
  const [selected, setSelected] = useState(null)
  const [classification, setClassification] = useState('전체')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [job, setJob] = useState(null)
  const [detailOpen, setDetailOpen] = useState(() => new URLSearchParams(window.location.search).has('detail'))
  const handledJob = useRef('')
  const workspaceRef = useRef(null)

  const loadReport = async () => {
    const value = await api.get('/audits')
    setReport(value)
    setSelectedSlug((current) => current || value.rows?.[0]?.slug || '')
    return value
  }
  const loadDetail = async (slug = selectedSlug) => {
    if (!slug) return
    setSelected(await api.get(`/audits/${slug}`))
  }
  useEffect(() => {
    Promise.all([loadReport(), api.get('/audits/analyze/status')]).then(([, currentJob]) => {
      setJob(currentJob)
      if (currentJob.state === 'running') setBusy('audit-job')
    }).catch((value) => setError(errorText(value)))
  }, [])
  useEffect(() => { loadDetail().catch((value) => setError(errorText(value))) }, [selectedSlug])
  useEffect(() => {
    if (job?.state !== 'running') return undefined
    setBusy('audit-job')
    const timer = setInterval(async () => {
      try { setJob(await api.get('/audits/analyze/status')) } catch (value) { setError(errorText(value)) }
    }, 2500)
    return () => clearInterval(timer)
  }, [job?.id, job?.state])
  useEffect(() => {
    if (!job?.id || job.state === 'running' || handledJob.current === job.id) return
    handledJob.current = job.id
    setBusy('')
    if (job.state === 'done') setMessage(`Terra 정밀진단 ${job.analyzed}개를 완료했습니다.`)
    else if (job.state === 'error') setError(job.error || 'Terra 정밀진단이 중단됐습니다.')
    Promise.all([loadReport(), loadDetail()]).catch((value) => setError(errorText(value)))
  }, [job?.id, job?.state])

  const byClassification = useMemo(
    () => (report?.rows || []).filter((row) => classification === '전체' || row.classification === classification),
    [report, classification],
  )
  const list = useListState({
    rows: byClassification,
    search: (row) => `${row.title} ${row.keyword} ${row.path}`,
    filters: [
      { id: 'all', label: '전체' },
      { id: 'untouched', label: '미작업', test: (row) => workState(row.work) === 'untouched' },
      { id: 'working', label: '수정 중', test: (row) => workState(row.work) === 'working' },
      { id: 'applied', label: '반영 완료', test: (row) => workState(row.work) === 'applied' },
    ],
    sorters: [
      { id: 'priority', label: '우선순위', value: (row) => row.scores.priority, dir: 'desc' },
      { id: 'readiness', label: '노출 준비도', value: (row) => row.scores.readiness, dir: 'desc' },
      { id: 'impressions', label: 'GSC 노출', value: (row) => row.metrics.gsc.impressions, dir: 'desc' },
      { id: 'ctr', label: 'CTR', value: (row) => row.metrics.gsc.ctr, dir: 'desc' },
      { id: 'views', label: 'GA4 조회', value: (row) => row.metrics.ga4.views, dir: 'desc' },
      { id: 'title', label: '제목순', value: (row) => row.title, dir: 'asc' },
    ],
    initialSize: 20,
  })

  const run = async (name, action, success) => {
    setBusy(name); setError(''); setMessage('')
    try { const result = await action(); if (success) setMessage(success); return result }
    catch (value) { setError(errorText(value)); throw value }
    finally { setBusy('') }
  }
  const rescan = () => run('scan', () => api.post('/audits/scan')).then(async (value) => {
    setMessage(`글 ${fmt(value?.scan?.total)}개의 수치·본문 구조를 다시 계산했습니다.`)
    await loadReport(); await loadDetail()
  }).catch(() => {})
  const startJob = async (options) => {
    setBusy('audit-job'); setError(''); setMessage('')
    try {
      const value = await api.post('/audits/analyze/start', options)
      setJob(value)
      if (value.alreadyRunning) setMessage('이미 실행 중인 Terra 진단을 이어서 표시합니다.')
    } catch (value) { setBusy(''); setError(errorText(value)) }
  }
  const analyzeTop = () => startJob({ limit: 10 })
  const analyzeAll = () => {
    if (!confirm(`${fmt(report?.summary?.total)}개 전체를 Terra medium으로 정밀진단할까요? 이미 완료된 글은 건너뛰며 API 사용량과 시간이 발생합니다.`)) return
    startJob({ all: true })
  }
  const reloadSelected = async () => { await loadReport(); await loadDetail() }
  const focusWorkspace = () => requestAnimationFrame(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  const openDetail = (slug) => {
    if (slug !== selectedSlug) {
      setSelected(null)
      setSelectedSlug(slug)
    }
    setDetailOpen(true)
    focusWorkspace()
  }
  const closeDetail = () => {
    setDetailOpen(false)
    focusWorkspace()
  }

  if (!report) return <main className="page audit-page"><div className="global-loading"><Busy>기존 글 진단 불러오는 중</Busy></div></main>
  return <main className="page audit-page page-enter">
    <header className="page-head audit-page-head">
      <div><h1>기존 글 정밀진단</h1><p>글을 선택하면 전체 화면 상세 진단으로 전환됩니다. 왼쪽은 분석 근거, 오른쪽은 수정 계획입니다.</p></div>
      <div className="page-head-actions"><RefreshStatus refreshedAt={report.refreshedAt} sources={[{ label: '수치 계산', value: report.calculatedAt }]} /><div className="audit-head-actions"><button className="button button-quiet" onClick={rescan} disabled={!!busy}>{busy === 'scan' ? <Busy>계산 중</Busy> : <><RefreshCcw size={15} />수치 다시 계산</>}</button><button className="button button-quiet" onClick={analyzeTop} disabled={!!busy}>{busy === 'audit-job' ? <Busy>{job?.completed || 0}/{job?.requested || '—'} 분석 중</Busy> : <><Sparkles size={15} />우선 10개 Terra</>}</button><button className="button button-primary" onClick={analyzeAll} disabled={!!busy}>{busy === 'audit-job' ? '백그라운드 실행 중' : `${fmt(report.summary.total)}개 전체 Terra`}</button></div></div>
    </header>
    {error && <div className="error-notice"><CircleAlert size={17} /><span>{error}</span><button onClick={() => setError('')}><X size={15} /></button></div>}
    {message && <div className="success-notice"><CheckCircle2 size={16} />{message}</div>}
    <section className="audit-summary-rail" aria-label="진단 현황">
      <span><small>전수 진단</small><b>{fmt(report.summary.total)}</b></span><span><small>Terra 완료</small><b>{fmt(report.summary.analyzed)}</b></span><span className="applied-stat"><small>수정 반영 완료</small><b>{fmt(report.summary.applied)}</b></span><span><small>작업 중</small><b>{fmt(report.summary.inProgress)}</b></span><span><small>GA4 연결</small><b>{fmt(report.summary.ga4Mapped)}</b></span><span><small>Naver TOP 30</small><b>{fmt(report.summary.naverWebListed)}</b></span><span><small>D+31 관찰</small><b>{fmt(report.summary.recentHold)}</b></span><span><small>읽기 전용</small><b>{fmt(report.summary.protected)}</b></span>
    </section>
    <div className="audit-method"><p>{report.methodology}</p><small>{report.caveat}</small></div>
    <div className="audit-toolbar">
      <div className="chip-row"><span className="chip-label">수정 방향</span>{CLASSIFICATIONS.map((value) => <button type="button" key={value} className={classification === value ? 'active' : ''} onClick={() => setClassification(value)}>{value}<span>{value === '전체' ? report.summary.total : report.summary.classifications[value] || 0}</span></button>)}</div>
      <ListToolbar state={list} placeholder="제목·키워드·경로 검색" label="작업 상태" />
    </div>
    <div ref={workspaceRef} className={`audit-workspace ${detailOpen ? 'detail-open' : ''}`}>
      <section className="audit-list" aria-label="가이드 진단 목록">
        <div className="audit-list-cue"><strong>분석할 글을 선택하세요</strong><span>선택 즉시 상세 분석과 수정 계획이 열립니다.</span></div>
        <div className="audit-list-head">
          <SortHead state={list} id="title">페이지</SortHead>
          <SortHead state={list} id="impressions">GSC</SortHead>
          <SortHead state={list} id="views">GA4</SortHead>
          <span>Naver</span>
          <SortHead state={list} id="priority">판단</SortHead>
          <span />
        </div>
        {list.view.length ? list.view.map((row) => <button type="button" key={row.slug} className={`audit-row ${row.work?.latest?.status === 'applied' ? 'applied' : ''} ${selectedSlug === row.slug ? 'selected' : ''}`} onClick={() => openDetail(row.slug)}>
          <span className="audit-row-title"><strong>{row.title}</strong><small>{row.path}</small><em>{row.keyword}</em></span>
          <span><b>{fmt(row.metrics.gsc.impressions)}회</b><small>CTR {pct(row.metrics.gsc.ctr, 2)}</small></span>
          <span><b>{row.metrics.ga4.mapped ? `${fmt(row.metrics.ga4.views)}뷰` : '미연결'}</b><small>{row.metrics.ga4.mapped ? `이탈 ${pct(row.metrics.ga4.bounceRate)}` : '제목 확인'}</small></span>
          <span><b>{naverLabel(row.metrics.naver)}</b><small>{row.metrics.naverWeb?.listed ? `웹 CTR ${pct(row.metrics.naverWeb.ctr, 2)}` : row.metrics.naver.trendDirection || '자료 없음'}</small></span>
          <span className="audit-row-decision"><AuditBadge tone={toneFor(row.classification)}>{row.classification}</AuditBadge>{row.guards?.recentObservationHold && <AuditBadge>D+31 관찰</AuditBadge>}<WorkBadge work={row.work} /><small>우선 {row.scores.priority} · 준비 {row.scores.readiness}</small><em>{statusLabel(row.auditStatus)} · 상세 보기</em></span>
          <ChevronRight size={16} />
        </button>) : <EmptyRow title="조건에 맞는 글이 없습니다" hint="분류·작업 상태·검색어를 바꿔보세요." />}
        <Pagination state={list} sizes={[10, 20, 50]} />
      </section>
      {selected ? <AuditDetail item={selected} onBack={closeDetail} onReload={reloadSelected} onStart={onStart} busy={busy} setBusy={setBusy} setGlobalError={setError} setMessage={setMessage} /> : <DetailSkeleton onBack={closeDetail} />}
    </div>
  </main>
}
