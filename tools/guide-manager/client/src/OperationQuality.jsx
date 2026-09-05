import { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { api } from './api'
import { ErrorNotice, Spinner, dateTime, fmt, pct } from './ui'

const ACTIONS = { prepare: '원고 자동 준비', automatic: '원고 자동 준비', generate: '원고 생성', official: '공식 출처 조사', humanize: '문장 다듬기', image: '이미지', apply: '파일 반영', audits: '기존 글 분석', topics: '주제 분석', evaluation: '모델 평가' }
const duration = ms => ms == null ? '표본 없음' : ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}초`

export function OperationQuality() {
  const [days, setDays] = useState(28), [data, setData] = useState(null), [busy, setBusy] = useState(false), [error, setError] = useState('')
  const load = async () => {
    setBusy(true); setError('')
    try { setData(await api.get(`/operations/quality?days=${days}`)) }
    catch (value) { setError(value.message) }
    finally { setBusy(false) }
  }
  useEffect(() => { load() }, [days])
  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">PRODUCTION RECORDS</p><h1>제작 지표</h1><p>실행 시간·보완·거절·반영 실패를 기록으로 확인합니다.</p></div><div className="page-head-actions">
      <label>기간 <select value={days} disabled={busy} onChange={event => setDays(Number(event.target.value))}>{[7, 28, 90].map(value => <option key={value} value={value}>최근 {value}일</option>)}</select></label>
      <button className="button button-quiet" onClick={load} disabled={busy}>{busy ? <Spinner /> : <><RefreshCcw size={16} />새로고침</>}</button>
    </div></header>
    <ErrorNotice message={error} onClose={() => setError('')} />
    {data && <>
      <p>{dateTime(data.window.from)} ~ {dateTime(data.window.to)} · 요청 거절 계측 시작 {dateTime(data.decisionTrackingStartedAt)}</p>
      <section className="metric-rail" aria-label="제작 결과">
        {[['자동 원고 보완', data.repair], ['중복 생성 거절', data.duplicates], ['범위 위반 저장·승인 거절', data.scopeRejections], ['반영 실패·복원', data.applyFailures]].map(([label, metric]) => <div className="metric" key={label}><span>{label}</span><strong>{metric.rate == null ? '표본 없음' : pct(metric.rate, 1)}</strong><small>{fmt(metric.numerator)} / {fmt(metric.denominator)}건</small><small>{metric.definition}</small></div>)}
      </section>
      <section className="work-section"><div className="section-head"><div><h2>성공한 실행의 소요 시간</h2><p>{data.note}</p></div></div>
        <div className="operation-timing-table"><table><thead><tr><th>작업</th><th>접수</th><th>완료</th><th>실패·중단</th><th>취소</th><th>진행</th><th>시간 표본</th><th>중앙값</th><th>95백분위</th></tr></thead><tbody>
          {data.durations.map(row => <tr key={row.action}><th scope="row">{ACTIONS[row.action] || row.action}</th>{['requested', 'completed', 'failed', 'cancelled', 'active', 'durationSamples'].map(key => <td key={key}>{fmt(row[key])}</td>)}<td>{duration(row.p50Ms)}</td><td>{duration(row.p95Ms)}</td></tr>)}
          {!data.durations.length && <tr><td colSpan="9">이 기간에 기록된 백그라운드 작업이 없습니다.</td></tr>}
        </tbody></table></div>
      </section>
      <section className="context-section"><h2>유효 상담당 제작 비용</h2><strong>계산 자료 미연결</strong><p>{data.costPerQualifiedInquiry.reason}</p><p>상담 클릭과 실제 접수·유효 상담은 상담 성과 화면에서 구분해 기록합니다.</p></section>
    </>}
  </main>
}
