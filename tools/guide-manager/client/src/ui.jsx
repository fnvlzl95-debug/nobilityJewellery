import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, CircleAlert, CheckCircle2, Clock3, LoaderCircle, Search, X } from 'lucide-react'

const nf = new Intl.NumberFormat('ko-KR')
export const fmt = (value) => value == null ? '—' : nf.format(Math.round(value))
export const pct = (value, digits = 1) => value == null ? '—' : `${(Number(value) * 100).toFixed(digits)}%`
export const dateTime = (value) => value ? new Date(value).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '기록 없음'
export const shortDate = (value) => value ? new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) : '—'
export const refreshDateTime = (value) => value ? new Date(value).toLocaleString('ko-KR', {
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
}) : '기록 없음'

export function Spinner({ label = '처리 중' }) {
  return <span className="spinner-label"><LoaderCircle size={15} className="spin" />{label}</span>
}

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function ErrorNotice({ message, onClose }) {
  if (!message) return null
  return <div className="error-notice" role="alert"><CircleAlert size={17} /><span>{message}</span>{onClose && <button aria-label="알림 닫기" onClick={onClose}><X size={15} /></button>}</div>
}

export function SuccessNotice({ message, onClose }) {
  if (!message) return null
  return <div className="success-notice" role="status"><CheckCircle2 size={16} /><span>{message}</span>{onClose && <button onClick={onClose}><X size={15} /></button>}</div>
}

export function RefreshStatus({ refreshedAt, sources = [] }) {
  const rows = [
    { label: '화면 확인', value: refreshedAt },
    ...sources.filter((item) => item?.value),
  ]
  return <div className="refresh-status" aria-live="polite">
    <Clock3 size={15} />
    <div>{rows.map((item) => <span key={item.label}>{item.label} <time dateTime={item.value}>{refreshDateTime(item.value)}</time></span>)}</div>
  </div>
}

function compareValues(a, b) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'ko')
}

/**
 * 목록 화면 공통 상태: 필터 칩 → 검색 → 정렬 → 페이지 나누기 순서로 처리한다.
 * filters: [{ id, label, test?(row) }]  ·  sorters: [{ id, label, value(row), dir? }]
 */
export function useListState({ rows, search, filters = [], sorters = [], initialFilter, initialSort, initialSize = 12 }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(initialFilter ?? filters[0]?.id ?? 'all')
  const [sort, setSort] = useState(initialSort ?? sorters[0]?.id ?? 'default')
  const [dir, setDir] = useState('')
  const [pageSize, setPageSize] = useState(initialSize)
  const [page, setPage] = useState(1)

  const source = rows || []
  const activeFilter = filters.find((item) => item.id === filter)
  const activeSorter = sorters.find((item) => item.id === sort) || sorters[0] || null
  const activeDir = dir || activeSorter?.dir || 'desc'

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    let list = activeFilter?.test ? source.filter(activeFilter.test) : source
    if (needle && search) list = list.filter((row) => String(search(row) || '').toLowerCase().includes(needle))
    if (activeSorter?.value) {
      const factor = activeDir === 'asc' ? 1 : -1
      list = [...list].sort((a, b) => factor * compareValues(activeSorter.value(a), activeSorter.value(b)))
    }
    return list
  }, [source, query, filter, sort, activeDir])

  const counts = useMemo(() => Object.fromEntries(filters.map((item) => [item.id, item.test ? source.filter(item.test).length : source.length])), [source, filter])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pageCount)
  useEffect(() => { setPage(1) }, [query, filter, sort, activeDir, pageSize])

  return {
    view: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    sourceTotal: source.length,
    counts, filters, sorters,
    query, setQuery, filter, setFilter,
    sort, dir: activeDir, setSort,
    toggleSort: (id) => {
      if (id === sort) setDir(activeDir === 'asc' ? 'desc' : 'asc')
      else { setSort(id); setDir('') }
    },
    page: current, setPage, pageCount, pageSize, setPageSize,
    from: filtered.length ? (current - 1) * pageSize + 1 : 0,
    to: Math.min(current * pageSize, filtered.length),
  }
}

export function FilterChips({ state, label }) {
  if (!state.filters.length) return null
  return <div className="chip-row">
    {label && <span className="chip-label">{label}</span>}
    {state.filters.map((item) => <button type="button" key={item.id} className={state.filter === item.id ? 'active' : ''} onClick={() => state.setFilter(item.id)}>
      {item.label}<span>{state.counts[item.id] ?? 0}</span>
    </button>)}
  </div>
}

export function ListToolbar({ state, placeholder = '검색', children, label }) {
  return <div className="list-toolbar">
    <FilterChips state={state} label={label} />
    <div className="list-toolbar-tools">
      {children}
      <label className="list-search"><Search size={15} /><input value={state.query} onChange={(event) => state.setQuery(event.target.value)} placeholder={placeholder} />{state.query && <button type="button" aria-label="검색어 지우기" onClick={() => state.setQuery('')}><X size={13} /></button>}</label>
      {state.sorters.length > 1 && <label className="list-sort"><span>정렬</span>
        <select value={state.sort} onChange={(event) => { state.setSort(event.target.value) }}>{state.sorters.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
        <button type="button" className="sort-dir" title={state.dir === 'asc' ? '오름차순' : '내림차순'} onClick={() => state.toggleSort(state.sort)}>{state.dir === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />}</button>
      </label>}
    </div>
  </div>
}

export function SortHead({ state, id, children, className = '' }) {
  const active = state.sort === id
  return <button type="button" className={`sort-head ${active ? 'active' : ''} ${className}`} onClick={() => state.toggleSort(id)}>
    {children}{active && (state.dir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
  </button>
}

function pageWindow(page, pageCount) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1)
  const pages = new Set([1, pageCount, page, page - 1, page + 1])
  const list = [...pages].filter((value) => value >= 1 && value <= pageCount).sort((a, b) => a - b)
  const output = []
  list.forEach((value, index) => {
    if (index && value - list[index - 1] > 1) output.push(`gap-${value}`)
    output.push(value)
  })
  return output
}

export function Pagination({ state, sizes = [10, 20, 50] }) {
  if (!state.sourceTotal) return null
  return <div className="pagination">
    <span className="pagination-count">{state.total ? `${state.from}–${state.to}` : '0'} / {fmt(state.total)}개{state.total !== state.sourceTotal ? ` (전체 ${fmt(state.sourceTotal)})` : ''}</span>
    <div className="pagination-pages">
      <button type="button" disabled={state.page <= 1} onClick={() => state.setPage(state.page - 1)} aria-label="이전 페이지"><ChevronLeft size={15} /></button>
      {pageWindow(state.page, state.pageCount).map((value) => typeof value === 'number'
        ? <button type="button" key={value} className={value === state.page ? 'active' : ''} onClick={() => state.setPage(value)}>{value}</button>
        : <span key={value}>…</span>)}
      <button type="button" disabled={state.page >= state.pageCount} onClick={() => state.setPage(state.page + 1)} aria-label="다음 페이지"><ChevronRight size={15} /></button>
    </div>
    <select className="page-size" value={state.pageSize} onChange={(event) => state.setPageSize(Number(event.target.value))}>{sizes.map((size) => <option key={size} value={size}>{size}개씩</option>)}</select>
  </div>
}

export function EmptyRow({ icon: Icon = Search, title, hint }) {
  return <div className="list-empty"><Icon size={24} /><strong>{title}</strong>{hint && <p>{hint}</p>}</div>
}
