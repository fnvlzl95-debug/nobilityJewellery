import { useEffect, useRef, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { api } from './api'
import { Badge, ErrorNotice, Spinner, SuccessNotice, dateTime, fmt, pct } from './ui'

const STATUS = { waiting: '고정 기간 자료 대기', comparable: '같은 자료로 비교 가능', confounded: '글 변경 확인 · 비교 보류', source_mismatch: '기준 자료 확인 · 비교 보류' }
const TIMING = { before_window: '사후 기간 시작 전 등록', during_window: '사후 기간 중 등록', after_window: '사후 기간 종료 후 등록' }
const METRICS = { gsc: [['impressions', '노출'], ['clicks', '클릭'], ['ctr', 'CTR'], ['position', '평균 게재 순위']], ga4: [['views', '조회'], ['activeUsers', '활성 사용자'], ['bounceRate', '이탈률']] }
const valueText = (key, value) => value == null ? '미확인' : ['ctr', 'bounceRate'].includes(key) ? pct(value, 2) : key === 'position' ? Number(value).toFixed(2) : fmt(value)
const changeText = (key, value) => {
  if (value?.change == null) return '—'
  const number = Number(value.change), sign = number > 0 ? '+' : ''
  return ['ctr', 'bounceRate'].includes(key) ? `${sign}${(number * 100).toFixed(2)}%p` : `${sign}${key === 'position' ? number.toFixed(2) : fmt(number)}`
}

function Periods({ value }) {
  return <div className="control-periods">{Object.entries(value.expectedPeriods || {}).map(([platform, expected]) => {
    const measured = value.measurementPeriods?.[platform]
    return <div className="comparison-periods" key={platform}>
      <strong>{platform === 'gsc' ? 'Google 검색' : 'GA4 참여'}</strong>
      <span>고정 사후 기간: {expected ? `${expected.periodStart} ~ ${expected.periodEnd} (${expected.periodDays}일) · ${expected.timeZone}${expected.timeZoneAssumed ? ' 가정' : ''}` : '기준 기간 없음'}</span>
      {measured && ['before', 'after'].map(phase => <small key={phase}>{phase === 'before' ? '변경 전' : '배포 후'} 원본: {measured[phase] ? `#${measured[phase].importId} · ${measured[phase].periodStart} ~ ${measured[phase].periodEnd}${measured[phase].property ? ` · ${measured[phase].property}` : ''}` : '사용 가능한 자료 없음'}</small>)}
    </div>
  })}</div>
}

export function ControlComparison({ value }) {
  const blocked = ['confounded', 'source_mismatch'].includes(value.status) || Boolean(value.issues?.length)
  return <section className="control-result" aria-label="등록한 대조 관찰">
    <div className="section-head"><div><h2>{value.treatment.title} · 대조 관찰</h2><p>대조 글: {value.control.title}</p></div><Badge tone={blocked ? 'warning' : value.status === 'comparable' ? 'success' : 'neutral'}>{STATUS[value.status] || '상태 확인 필요'}</Badge></div>
    <p>{dateTime(value.registeredAt)} · {TIMING[value.registrationTiming] || '등록 시점 확인 필요'}</p>
    <p className="control-reason">선정 이유: {value.selectionReason}</p>
    <Periods value={value} />
    {!!value.issues?.length && <div className="draft-retained" role="status"><strong>비교를 보류한 이유</strong><ul>{value.issues.map((issue, index) => <li key={`${issue.code}-${index}`}>{issue.message}</li>)}</ul></div>}
    {!!value.dataIssues?.length && <p role="status">{value.dataIssues.map(issue => issue.message).join(' ')}</p>}
    {!!value.history?.postWindowChanges?.length && <p role="status">관찰 종료 후 커밋된 수정이 있습니다. 완료한 관찰 기간은 유지합니다. Git 커밋 시각은 실제 공개 배포 시각과 다를 수 있습니다.</p>}
    {Object.entries(METRICS).map(([platform, metrics]) => <div className="control-table-wrap" key={platform} tabIndex={0} role="region" aria-label={`${platform === 'gsc' ? '검색' : '참여'} 지표 비교 표`}>
      <table><caption>{platform === 'gsc' ? 'Google 검색' : 'GA4 참여'} · 누락된 행은 0으로 채우지 않습니다.</caption><thead><tr><th rowSpan="2" scope="col">지표</th><th colSpan="3" scope="colgroup">변경 글</th><th colSpan="3" scope="colgroup">대조 글</th></tr><tr>{['treatment', 'control'].flatMap(side => ['전', '후', '변화'].map(label => <th key={`${side}-${label}`} scope="col">{label}</th>))}</tr></thead><tbody>
        {metrics.map(([key, label]) => <tr key={key}><th scope="row">{label}</th>{['treatment', 'control'].flatMap(side => [<td key={`${side}-before`}>{valueText(key, value[side]?.before?.[platform]?.[key])}</td>, <td key={`${side}-after`}>{valueText(key, value[side]?.after?.[platform]?.[key])}</td>, <td key={`${side}-change`}>{blocked ? '비교 보류' : changeText(key, value.changes?.[side]?.[key])}</td>])}</tr>)}
      </tbody></table>
    </div>)}
    <p>평균 게재 순위와 CTR은 검색어 구성에도 영향을 받습니다. 두 글의 차이를 콘텐츠 수정의 인과효과나 통계적으로 입증된 상승으로 해석하지 않습니다.</p>
    {!!value.limitations?.length && <ul className="control-limitations">{value.limitations.map((note, index) => <li key={index}>{note}</li>)}</ul>}
  </section>
}

export function ComparisonControlsPage() {
  const [comparisons, setComparisons] = useState([]), [controls, setControls] = useState([]), [guides, setGuides] = useState([])
  const [baselineId, setBaselineId] = useState(''), [controlSlug, setControlSlug] = useState(''), [reason, setReason] = useState('')
  const [preview, setPreview] = useState(null), [busy, setBusy] = useState(''), [error, setError] = useState(''), [message, setMessage] = useState('')
  const request = useRef(0), submitting = useRef(0), selection = useRef({ baselineId: '', controlSlug: '' })
  const load = async () => {
    const serial = ++request.current
    setBusy('load'); setError('')
    try {
      const [baselineRows, controlRows, guideRows] = await Promise.all([api.get('/analytics/comparisons'), api.get('/analytics/comparison-controls'), api.get('/guides')])
      if (serial !== request.current) return
      const available = baselineRows.filter(row => row.kind === 'update' && row.deployedAt)
      setComparisons(available); setControls(controlRows); setGuides(guideRows); setPreview(null)
      const nextId = available.some(row => String(row.id) === selection.current.baselineId) ? selection.current.baselineId : String(available[0]?.id || '')
      selection.current = { baselineId: nextId, controlSlug: nextId === selection.current.baselineId ? selection.current.controlSlug : '' }
      setBaselineId(nextId); setControlSlug(selection.current.controlSlug)
    } catch (value) { if (serial === request.current) setError(value.message) }
    finally { if (serial === request.current) setBusy('') }
  }
  useEffect(() => { load(); return () => { request.current++ } }, [])
  const selected = comparisons.find(row => String(row.id) === baselineId)
  const registered = controls.find(row => String(row.baselineId) === baselineId)
  const changeSelection = field => event => {
    const next = event.target.value
    request.current++; submitting.current = 0; setBusy('')
    selection.current = { ...selection.current, [field]: next }
    if (field === 'baselineId') { selection.current.controlSlug = ''; setBaselineId(next); setControlSlug(''); setReason('') }
    else setControlSlug(next)
    setPreview(null); setError(''); setMessage('')
  }
  const inspect = async () => {
    if (!selected || !controlSlug || submitting.current || String(selected.id) !== selection.current.baselineId || controlSlug !== selection.current.controlSlug) return
    const serial = ++request.current
    submitting.current = serial
    setBusy('preview'); setError(''); setPreview(null)
    try {
      const value = await api.get(`/analytics/comparisons/${selected.id}/control?slug=${encodeURIComponent(controlSlug)}`)
      if (serial === request.current) setPreview(value)
    } catch (value) { if (serial === request.current) setError(value.message) }
    finally { if (submitting.current === serial) submitting.current = 0; if (serial === request.current) setBusy('') }
  }
  const save = async event => {
    event.preventDefault()
    if (submitting.current || !preview?.canRegister || preview.baselineId !== selected?.id || preview.control.slug !== controlSlug || String(selected?.id) !== selection.current.baselineId || controlSlug !== selection.current.controlSlug) return
    const serial = ++request.current
    submitting.current = serial; setBusy('save'); setError(''); setMessage('')
    try {
      const value = await api.post(`/analytics/comparisons/${selected.id}/control`, { controlSlug, selectionReason: reason.trim(), expectedSourceHash: preview.control.sourceHash, expectedIndexEntryHash: preview.control.indexEntryHash })
      if (serial !== request.current) return
      setControls(current => [...current.filter(row => row.baselineId !== value.baselineId), value]); setPreview(null); setReason(''); setMessage('대조 글과 변경 전 자료, 고정 관찰 기간을 등록했습니다.')
    } catch (value) { if (serial === request.current) { setError(value.message); setPreview(null) } }
    finally { if (submitting.current === serial) submitting.current = 0; if (serial === request.current) setBusy('') }
  }
  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">PAIRED OBSERVATION</p><h1>대조 글 관찰</h1><p>배포 다음 날부터의 고정 기간에 변경 글과 그대로 둔 글을 같은 원본으로 비교합니다.</p></div><button className="button button-quiet" onClick={load} disabled={!!busy}>{busy === 'load' ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />새로고침</>}</button></header>
    <ErrorNotice message={error} onClose={() => setError('')} /><SuccessNotice message={message} onClose={() => setMessage('')} />
    <div className="measurement-form"><label>배포한 기존 글<select value={baselineId} onChange={changeSelection('baselineId')} disabled={!!busy}><option value="">비교할 반영 선택</option>{comparisons.map(row => <option key={row.id} value={row.id}>#{row.id} · {row.topic} · {dateTime(row.deployedAt)}</option>)}</select></label></div>
    {!busy && !comparisons.length && <p>실제 배포일을 기록한 기존 글 수정이 없습니다. 반영 이력에서 배포일을 기록한 뒤 대조 관찰을 등록할 수 있습니다. 신규 글은 반영 이력에서 관찰합니다.</p>}
    {selected && !registered && <section className="work-section"><h2>대조 글 등록</h2><p>비슷한 주제를 다루며 관찰 기간에 수정하지 않을 글을 선택하세요. 등록 뒤 대상과 기준 자료는 보존되며, 관찰 중 글이 바뀌면 비교를 보류합니다.</p>
      <form className="control-registration" onSubmit={save}>
        <div className="measurement-form"><label>그대로 둘 가이드<select required value={controlSlug} onChange={changeSelection('controlSlug')} disabled={!!busy}><option value="">대조 글 선택</option>{guides.filter(row => row.slug !== selected.guideSlug).map(row => <option key={row.slug} value={row.slug}>{row.title}</option>)}</select></label><button type="button" className="button button-quiet" disabled={!!busy || !controlSlug} onClick={inspect}>{busy === 'preview' ? '확인 중…' : '원문과 비교 조건 확인'}</button></div>
        {preview && <div className="control-preview"><Periods value={preview} /><p>{TIMING[preview.registrationTiming] || '등록 시점 확인 필요'}</p>{!!preview.issues?.length && <ul>{preview.issues.map((issue, index) => <li key={index}>{issue.message}</li>)}</ul>}{!!preview.limitations?.length && <ul>{preview.limitations.map((note, index) => <li key={index}>{note}</li>)}</ul>}</div>}
        <label className="control-reason-input">선정 이유와 비교의 한계<textarea required minLength={20} maxLength={2000} rows={3} value={reason} disabled={!!busy} onChange={event => setReason(event.target.value)} placeholder="주제·기존 노출·연결 구조가 어느 정도 비슷한지, 다른 조건은 무엇인지 기록하세요." /></label>
        <button className="button button-primary" disabled={!!busy || !preview?.canRegister || reason.trim().length < 20}>{busy === 'save' ? '등록 중…' : '이 조건으로 대조 관찰 등록'}</button>
      </form>
    </section>}
    {registered && <ControlComparison value={registered} />}
  </main>
}
