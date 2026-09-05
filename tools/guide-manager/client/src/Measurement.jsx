import { useEffect, useState } from 'react'
import { api } from './api'
import { ErrorNotice, SuccessNotice, fmt } from './ui'

export function DataQuality({ rows = [] }) {
  if (!rows.length) return null
  return <section className="data-quality" aria-label="분석 자료 최신성">
    <strong>분석 기준일</strong>
    <p>화면 새로고침은 새 분석 자료를 가져오지 않습니다. 집계 종료일이 7일을 넘은 자료는 최근 수정의 효과를 판단하기에 오래됐습니다.</p>
    <ul>{rows.map(row => <li key={row.label}><b>{row.label}</b> {row.periodStart || '—'} ~ {row.periodEnd || '—'} · {row.state === 'missing' ? '자료 필요' : row.state === 'invalid' ? '기간 확인 필요' : row.state === 'stale' ? `${row.ageDays}일 전 자료 · 새 보고서 필요` : '최근 자료'}</li>)}</ul>
  </section>
}

export function DeploymentForm({ id, onSaved, onError }) {
  const [date, setDate] = useState('')
  const [commit, setCommit] = useState('')
  const [busy, setBusy] = useState(false)
  return <form className="measurement-form" onSubmit={async event => {
    event.preventDefault(); setBusy(true)
    try { await api.post(`/analytics/comparisons/${id}/deployment`, { deployedAt: new Date(date).toISOString(), commit }); await onSaved() }
    catch (error) { onError(error.message) } finally { setBusy(false) }
  }}>
    <label>실제 배포 완료 시각<input type="datetime-local" required value={date} onChange={event => setDate(event.target.value)} /></label>
    <label>배포 커밋<input required pattern="[a-fA-F0-9]{7,40}" value={commit} onChange={event => setCommit(event.target.value)} placeholder="Git 커밋 7~40자리" /></label>
    <button className="button button-quiet" disabled={busy}>{busy ? '기록 중…' : '배포일 기록'}</button>
  </form>
}

export function MeasurementPage() {
  const [data, setData] = useState(null)
  const [guides, setGuides] = useState([])
  const [form, setForm] = useState({ reference: '', guideSlug: '', stage: 'inquiry', occurredOn: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }) })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  useEffect(() => { Promise.all([api.get('/measurement'), api.get('/guides')]).then(([result, items]) => { setData(result); setGuides(items) }).catch(error => setError(error.message)) }, [])
  const stages = { inquiry: '상담 접수', qualified: '유효 상담', contract: '계약 완료', closed: '미계약 종료' }
  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">OUTCOMES</p><h1>상담 성과</h1><p>유입 가이드를 확인한 상담을 기록합니다. 버튼 클릭과 실제 상담·계약을 구분합니다.</p></div></header>
    <ErrorNotice message={error} onClose={() => setError('')} /><SuccessNotice message={message} onClose={() => setMessage('')} />
    <section className="metric-rail">{[['기록한 상담', data?.totals.inquiries], ['유효 상담·계약', data?.totals.qualified], ['계약 완료', data?.totals.contracts]].map(([label, count]) => <div className="metric" key={label}><span>{label}</span><strong>{fmt(count)}</strong></div>)}</section>
    <p>수동으로 기록한 상담만 집계합니다. 이름·전화번호 대신 무작위 식별번호를 사용하고, 같은 상담의 단계가 바뀌면 기존 항목을 선택해 수정하세요. 이 수치만으로 콘텐츠 변경의 인과효과를 입증할 수는 없습니다.</p>
    <form className="measurement-form" onSubmit={async event => {
      event.preventDefault(); setBusy(true); setError(''); setMessage('')
      try { setData(await api.post('/measurement/outcomes', { ...form, reference: form.reference || crypto.randomUUID() })); setForm({ ...form, reference: '', guideSlug: '' }); setMessage('상담 단계를 저장했습니다.') }
      catch (error) { setError(error.message) } finally { setBusy(false) }
    }}>
      <label>유입 가이드<select required value={form.guideSlug} onChange={event => setForm({ ...form, guideSlug: event.target.value })}><option value="">가이드 선택</option>{guides.map(guide => <option key={guide.slug} value={guide.slug}>{guide.title}</option>)}</select></label>
      <label>상담일<input required type="date" value={form.occurredOn} onChange={event => setForm({ ...form, occurredOn: event.target.value })} /></label>
      <label>현재 단계<select value={form.stage} onChange={event => setForm({ ...form, stage: event.target.value })}>{Object.entries(stages).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <button className="button button-primary" disabled={busy}>{busy ? '저장 중…' : form.reference ? '단계 수정' : '상담 기록'}</button>
      {form.reference && <button type="button" className="button button-quiet" onClick={() => setForm({ ...form, reference: '', guideSlug: '' })}>새 상담으로 전환</button>}
    </form>
    <section className="history-line">{data?.rows.map(row => <article key={row.reference}><div><strong>{row.title}</strong><p>{row.occurredOn} · {stages[row.stage]} · {row.reference.slice(0, 8)}</p><button className="text-button" onClick={() => setForm({ reference: row.reference, guideSlug: row.guideSlug, stage: row.stage, occurredOn: row.occurredOn })}>상담 단계 수정</button></div></article>)}</section>
    {data && !data.rows.length && <p>기록된 상담이 없습니다. 실제 상담에서 유입 가이드를 확인한 경우부터 기록하세요.</p>}
    <DataQuality rows={data?.dataQuality} />
  </main>
}
