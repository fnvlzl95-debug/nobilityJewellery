import { useEffect, useRef, useState } from 'react'
import { api } from './api'
import { Badge, Spinner, refreshDateTime } from './ui'

export function usePublicChecks() {
  const [results, setResults] = useState(() => new Map())
  const [busy, setBusy] = useState(() => new Set())
  const [errors, setErrors] = useState(() => new Map())
  const [loadError, setLoadError] = useState('')
  const mounted = useRef(true)
  const requests = useRef(new Map())
  const attempts = useRef(new Map())
  const loadSequence = useRef(0)
  const currentResults = useRef(results)
  currentResults.current = results
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; loadSequence.current++; requests.current.clear() }
  }, [])

  // This reads saved records only. Network checks are started exclusively by check().
  const loadSaved = async () => {
    const sequence = ++loadSequence.current
    const startedAttempts = new Map(attempts.current)
    const startedRequests = new Set(requests.current.keys())
    try {
      const rows = await api.get('/public-checks')
      if (!mounted.current || sequence !== loadSequence.current) return
      if (!Array.isArray(rows)) throw new Error('공개 상태 확인 기록을 읽지 못했습니다.')
      setResults(current => {
        const next = new Map(current)
        for (const row of rows) {
          const slug = row?.guideSlug
          if (!slug || startedRequests.has(slug) || requests.current.has(slug) || attempts.current.get(slug) !== startedAttempts.get(slug)) continue
          next.set(slug, row)
        }
        return next
      })
      setErrors(current => {
        const next = new Map(current)
        for (const row of rows) {
          const slug = row?.guideSlug
          if (next.get(slug)?.kind === 'load' && !startedRequests.has(slug) && !requests.current.has(slug) && attempts.current.get(slug) === startedAttempts.get(slug)) next.delete(slug)
        }
        return next
      })
      setLoadError('')
    } catch (error) {
      if (!mounted.current || sequence !== loadSequence.current) return
      const message = error.message || '공개 상태 확인 기록을 읽지 못했습니다.'
      setLoadError(message)
      setErrors(current => {
        const next = new Map(current)
        for (const slug of currentResults.current.keys()) {
          if (!next.has(slug) && !startedRequests.has(slug) && !requests.current.has(slug) && attempts.current.get(slug) === startedAttempts.get(slug)) next.set(slug, { message, kind: 'load' })
        }
        return next
      })
    }
  }
  const check = async (slug) => {
    if (!slug || !mounted.current || requests.current.has(slug)) return
    const request = Symbol(slug)
    requests.current.set(slug, request)
    attempts.current.set(slug, (attempts.current.get(slug) || 0) + 1)
    setBusy(current => new Set(current).add(slug))
    setErrors(current => { const next = new Map(current); next.delete(slug); return next })
    try {
      const result = await api.post(`/guides/${encodeURIComponent(slug)}/public-check`)
      if (!mounted.current || requests.current.get(slug) !== request) return
      if (result?.guideSlug !== slug) throw new Error('공개 상태 응답이 요청한 글과 일치하지 않습니다. 다시 확인해 주세요.')
      setResults(current => new Map(current).set(slug, result))
    } catch (error) {
      if (mounted.current && requests.current.get(slug) === request) {
        setErrors(current => new Map(current).set(slug, { message: error.message || '공개 상태를 확인하지 못했습니다.', attemptedAt: new Date().toISOString() }))
      }
    } finally {
      if (mounted.current && requests.current.get(slug) === request) {
        requests.current.delete(slug)
        setBusy(current => { const next = new Set(current); next.delete(slug); return next })
      }
    }
  }
  return { results, busy, errors, loadError, loadSaved, check }
}

export function PublicCheckStatus({ guideSlug, result, busy = false, error, loadError, onCheck }) {
  const stored = result?.guideSlug === guideSlug ? result : null
  const failure = error?.message || (!stored && loadError)
  const prior = busy || !!failure || !!stored?.stale
  const status = busy ? ['확인 중', 'neutral']
    : failure ? ['확인 실패 · 현재 상태 미확인', 'danger']
      : stored?.stale ? ['재확인 필요', 'gold']
        : stored?.state === 'pass' ? ['점검 통과', 'success']
          : stored?.state === 'attention' ? ['확인 필요', 'gold']
            : stored?.state === 'unreachable' ? ['연결 확인 불가', 'danger'] : ['미확인', 'neutral']
  return <section className="public-check-status" aria-label={`${guideSlug} 현재 공개 상태`}>
    <div className="public-check-head"><strong>현재 공개 상태</strong><span role="status"><Badge tone={status[1]}>{status[0]}</Badge></span>
      <button type="button" className="button button-quiet" disabled={busy || !guideSlug} aria-label={`${guideSlug} ${stored ? '공개 상태 다시 확인' : '공개 상태 확인'}`} onClick={() => onCheck(guideSlug)}>{busy ? <Spinner label="확인 중" /> : stored ? '다시 확인' : '공개 상태 확인'}</button>
    </div>
    <p>배포일 기록·28일 관찰과 별도인 현재 시점의 점검입니다.</p>
    <p>Google 웹검색 기준의 공개 HTTP 응답·검색 차단 점검이며, Google 색인·순위나 과거 배포 완료를 증명하지 않습니다.</p>
    <small>{stored?.checkedAt ? <>{prior ? '이전 확인' : '확인'}: <time dateTime={stored.checkedAt}>{refreshDateTime(stored.checkedAt)}</time></> : '확인 기록 없음'}</small>
    {stored?.stale && <p className="public-check-warning">원고 변경 또는 확인 시간이 오래되어 다시 확인해야 합니다. 이전 결과를 현재 상태로 판단하지 마세요.</p>}
    {failure && <p className="error-copy" role="alert">{failure}{error?.attemptedAt && <> · 요청 <time dateTime={error.attemptedAt}>{refreshDateTime(error.attemptedAt)}</time></>}</p>}
    {!!stored?.checks?.length && <details><summary>{prior ? '이전 저장 점검 항목' : '점검 항목'} {stored.checks.length}개</summary>
      <ul>{stored.checks.map((item, index) => <li key={`${item.key}-${index}`}><div><strong>{item.label}</strong><Badge tone={prior ? 'neutral' : item.status === 'pass' ? 'success' : item.status === 'fail' ? 'danger' : 'neutral'}>{item.status === 'pass' ? '통과' : item.status === 'fail' ? '확인 필요' : '미확인'}</Badge></div><p>{item.detail}</p></li>)}</ul>
      {stored.note && <p>{stored.note}</p>}
    </details>}
  </section>
}
