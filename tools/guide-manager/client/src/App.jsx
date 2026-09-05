import { useEffect, useState } from 'react'
import {
  Activity, ArrowRight, BarChart3, BookOpen, Check, ChevronRight,
  ClipboardCheck, Clock3, Gauge, Gem, History, ImagePlus,
  Menu, RefreshCcw, Save, Search, Settings, ShieldCheck, Sparkles, Upload, X,
} from 'lucide-react'
import { api } from './api'
import { DataQuality, DeploymentForm, MeasurementPage } from './Measurement'
import { ContentAudits } from './ContentAudits'
import { Editor } from './Editor'
import {
  Badge, EmptyRow, ErrorNotice, ListToolbar, Pagination, RefreshStatus, SortHead, Spinner, SuccessNotice,
  dateTime, fmt, pct, useListState,
} from './ui'

const NAV = [
  ['dashboard', '현황', Gauge],
  ['opportunities', '기회 탐색', Search],
  ['audits', '기존 글 진단', ClipboardCheck],
  ['editor', '가이드 편집', BookOpen],
  ['images', '이미지 작업실', ImagePlus],
  ['analytics', '분석 자료', BarChart3],
  ['history', '반영 이력', History],
  ['measurement', '상담 성과', Activity],
  ['settings', '설정', Settings],
]

function Metric({ label, value, note, accent = false }) {
  return <div className={`metric ${accent ? 'metric-accent' : ''}`}>
    <span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}
  </div>
}

function Dashboard({ data, onNavigate, refresh, refreshing, message, clearMessage }) {
  const performance = data?.latest?.performance
  const ga4 = data?.latest?.ga4
  const organic = data?.latest?.organic
  const naver = data?.latest?.naver
  const coverage = data?.latest?.coverage
  const p = performance?.summary || {}
  const g = ga4?.summary || {}
  const n = naver?.summary || {}
  const c = coverage?.summary || {}
  return <main className="page page-enter">
    <header className="page-head">
      <div><p className="eyebrow">OPERATING VIEW</p><h1>오늘 손볼 가이드가 보입니다</h1><p>플랫폼 수치를 섞지 않고 검색·참여·색인 신호를 나눠 판단합니다.</p></div>
      <div className="page-head-actions">
        <RefreshStatus refreshedAt={data?.freshness?.fetchedAt} sources={[
          { label: '가이드 스캔', value: data?.freshness?.inventoryScannedAt },
          { label: '분석 자료', value: data?.freshness?.analyticsImportedAt },
        ]} />
        <button className="button button-quiet" onClick={refresh} disabled={refreshing}>{refreshing ? <Spinner label="갱신 중" /> : <><RefreshCcw size={16} />새로고침</>}</button>
      </div>
    </header>
    <SuccessNotice message={message} onClose={clearMessage} />
    <DataQuality rows={data?.dataQuality} />

    <section className="metric-rail" aria-label="핵심 지표">
      <Metric label="관리 가이드" value={fmt(data?.guides?.total)} note={`일반 ${fmt(data?.guides?.standard)} · 보호 ${fmt(data?.guides?.custom)} · 클러스터 ${fmt(data?.clusters?.length)}`} />
      <Metric label="GSC 노출" value={fmt(p.impressions)} note={`${performance?.periodStart || '—'} ~ ${performance?.periodEnd || '—'}`} accent />
      <Metric label="GSC 클릭" value={fmt(p.clicks)} note={`중복 URL 그룹 ${fmt(p.duplicateGroups)}`} />
      <Metric
        label={ga4?.sourceType === 'ga4_path_device' ? 'GA4 조회수' : 'GA4 활성 사용자'}
        value={fmt(ga4?.sourceType === 'ga4_path_device' ? g.views : g.activeUsers)}
        note={ga4?.sourceType === 'ga4_path_device'
          ? `${ga4?.periodStart || '—'} ~ ${ga4?.periodEnd || '—'} · 경로 ${fmt(g.uniquePaths)}`
          : `평균 참여 ${Number(g.avgEngagementSeconds || 0).toFixed(1)}초`}
      />
      <Metric label="Naver 웹검색 CTR" value={n.overallCtr == null ? '—' : `${(Number(n.overallCtr) * 100).toFixed(1)}%`} note={`${naver?.periodStart || '—'} ~ ${naver?.periodEnd || '—'} · TOP 30`} />
      <Metric label="Google 검색 후 참여" value={fmt(organic?.summary?.engagedSessions)} note={`${organic?.periodStart || '—'} ~ ${organic?.periodEnd || '—'} · 활성 사용자 ${fmt(organic?.summary?.activeUsers)}`} />
      <Metric label="색인 상태" value={`${fmt(c.indexed)} / ${fmt((c.indexed || 0) + (c.notIndexed || 0))}`} note={`미색인 ${fmt(c.notIndexed)}`} />
    </section>

    <div className="dashboard-grid">
      <section className="work-section">
        <div className="section-head"><div><h2>우선 검토</h2><p>현재 데이터로 가장 먼저 볼 페이지입니다.</p></div><button className="text-button" onClick={() => onNavigate('opportunities')}>전체 보기 <ArrowRight size={15} /></button></div>
        <div className="opportunity-list compact">
          {(data?.topOpportunities || []).map((item, index) => <button key={item.slug} className="opportunity-row" onClick={() => onNavigate('opportunities')}>
            <span className="rank">{String(index + 1).padStart(2, '0')}</span>
            <span className="opportunity-copy"><strong>{item.title}</strong><small>{item.reason}</small></span>
            <Badge tone={item.type === '기술 우선' ? 'danger' : item.type === 'CTR 개선' ? 'gold' : 'neutral'}>{item.type}</Badge>
            <span className="score">{item.score}</span>
          </button>)}
        </div>
      </section>

      <aside className="context-column">
        <section className="context-section">
          <div className="section-head"><div><h2>색인 상태</h2><p>Coverage 요약은 사이트 전체 신호입니다.</p></div></div>
          <dl className="definition-list">
            {Object.entries(c.issues || {}).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{fmt(value)}</dd></div>)}
          </dl>
        </section>
        <section className="context-section">
          <div className="section-head"><div><h2>주간 측정</h2><p>7일이 지난 검색어를 수동으로 갱신합니다.</p></div></div>
          <div className="due-count"><Clock3 size={19} /><strong>{fmt(data?.dueKeywords?.length)}</strong><span>개가 화면에 표시됨</span></div>
          <button className="button button-primary full" onClick={() => onNavigate('opportunities')}>검색 순위 확인</button>
        </section>
      </aside>
    </div>
  </main>
}

function Opportunities({ onStart }) {
  const [data, setData] = useState(null)
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [research, setResearch] = useState(null)
  const load = async () => { const value = await api.get('/opportunities'); setData(value); return value }
  useEffect(() => { load().catch((value) => setError(value.message)) }, [])

  const list = useListState({
    rows: data?.pageRows || [],
    search: (row) => `${row.title} ${row.keyword} ${row.path}`,
    filters: [
      { id: '전체', label: '전체' },
      ...['CTR 개선', '본문 보강', '내부링크 강화', '기술 우선'].map((type) => ({ id: type, label: type, test: (row) => row.type === type })),
    ],
    sorters: [
      { id: 'score', label: '판단 점수', value: (row) => row.score, dir: 'desc' },
      { id: 'impressions', label: 'GSC 노출', value: (row) => row.metrics.gsc.impressions, dir: 'desc' },
      { id: 'ctr', label: 'CTR', value: (row) => row.metrics.gsc.ctr, dir: 'desc' },
      { id: 'position', label: '평균 순위', value: (row) => row.metrics.gsc.position, dir: 'asc' },
      { id: 'views', label: 'GA4 조회', value: (row) => row.metrics.ga4.views, dir: 'desc' },
      { id: 'title', label: '제목순', value: (row) => row.title, dir: 'asc' },
    ],
    initialSize: 20,
  })

  const scanDue = async () => {
    setBusy('scan'); setError('')
    try { await api.post('/naver/scan'); await load() } catch (value) { setError(value.message) } finally { setBusy('') }
  }
  const refresh = async () => {
    setBusy('refresh'); setError('')
    try { await load() } catch (value) { setError(value.message) } finally { setBusy('') }
  }
  const searchNaver = async (event) => {
    event.preventDefault(); if (!keyword.trim()) return
    setBusy('research'); setError('')
    try { setResearch(await api.post('/naver/research', { keyword })) } catch (value) { setError(value.message) } finally { setBusy('') }
  }

  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">DECISION QUEUE</p><h1>무엇을 왜 바꿀지</h1><p>점수보다 유형과 근거를 먼저 확인한 뒤 편집 작업을 시작합니다.</p></div><div className="page-head-actions">
      <RefreshStatus refreshedAt={data?.freshness?.fetchedAt} sources={[
        { label: '분석 자료', value: data?.freshness?.analyticsImportedAt },
        { label: '순위 측정', value: data?.freshness?.rankMeasuredAt },
      ]} />
      <button className="button button-quiet" onClick={refresh} disabled={!!busy}>{busy === 'refresh' ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />목록 새로고침</>}</button>
      <button className="button button-quiet" onClick={scanDue} disabled={!!busy}>{busy === 'scan' ? <Spinner label="측정 중" /> : <><Activity size={16} />주간 순위 측정</>}</button>
    </div></header>
    <ErrorNotice message={error} onClose={() => setError('')} />
    <section className="search-strip">
      <form onSubmit={searchNaver}><Search size={18} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Naver에서 검색 의도·자사 순위 확인" /><button disabled={!!busy}>{busy === 'research' ? '조사 중' : '조사'}</button></form>
      {research && <div className="research-snapshot"><span><b>{research.keyword}</b> {research.web?.source === 'naver_webkr' ? '웹문서' : '블로그 보조'} {fmt(research.web?.total)}건</span><span>자사 {research.ownRank?.available === false ? '웹문서 API 미활성' : research.ownRank?.found ? `${research.ownRank.rank}위` : `${research.ownRank?.depth || 100}위 밖`}</span><span>트렌드 {research.trend?.direction === 'rising' ? '상승' : research.trend?.direction === 'falling' ? '하락' : '보합/자료 없음'}</span><small>{research.web?.warning || '트렌드는 절대 검색량이 아닌 상대 지수입니다.'}</small></div>}
    </section>

    <ListToolbar state={list} placeholder="제목·키워드·경로 검색" label="판단 유형" />

    <section className="data-table opportunity-table">
      <div className="table-row table-head-row">
        <SortHead state={list} id="title">페이지</SortHead>
        <SortHead state={list} id="impressions">검색 성과</SortHead>
        <SortHead state={list} id="views">참여</SortHead>
        <SortHead state={list} id="score">판단</SortHead>
        <span />
      </div>
      {list.view.map((row) => <div className="table-row" key={row.slug}>
        <div className="title-cell"><strong>{row.title}</strong><small>{row.path}</small><span>{row.keyword}</span></div>
        <div className="metric-cell"><strong>{fmt(row.metrics.gsc.impressions)}회</strong><small>CTR {pct(row.metrics.gsc.ctr, 2)} · {row.metrics.gsc.position ? `${Number(row.metrics.gsc.position).toFixed(1)}위` : '순위 없음'}</small></div>
        <div className="metric-cell"><strong>{fmt(row.metrics.ga4.views)}뷰</strong><small>이탈 {pct(row.metrics.ga4.bounceRate)}</small></div>
        <div className="judgement-cell"><Badge tone={row.type === '기술 우선' ? 'danger' : row.type === 'CTR 개선' ? 'gold' : 'neutral'}>{row.type}</Badge><small>{row.reason}</small><span className="breakdown">G {row.breakdown.gsc} · P {row.breakdown.position} · A {row.breakdown.ga4} · N {row.breakdown.naver} · B {row.breakdown.business}</span></div>
        <button className="icon-action" disabled={row.isCustom} title={row.isCustom ? '보호 페이지' : '편집 작업 시작'} onClick={() => onStart({ targetSlug: row.slug, topic: row.keyword, category: row.category })}>{row.isCustom ? <ShieldCheck size={18} /> : <ChevronRight size={18} />}</button>
      </div>)}
      {!list.view.length && <EmptyRow title="조건에 맞는 페이지가 없습니다" hint="유형이나 검색어를 바꿔보세요." />}
    </section>
    <Pagination state={list} sizes={[10, 20, 50]} />

    <section className="new-topic-section">
      <div className="section-head"><div><h2>검색어에서 발견한 새 주제</h2><p>기존 제목·키워드 유사도가 낮은 검색어입니다.</p></div></div>
      <div className="topic-flow">{(data?.newTopics || []).slice(0, 12).map((item) => <button key={item.query} onClick={() => onStart({ topic: item.query })}><span>{item.query}</span><small>노출 {fmt(item.impressions)} · {item.position ? `${Number(item.position).toFixed(1)}위` : '—'}</small><ArrowRight size={15} /></button>)}</div>
    </section>
  </main>
}

function ImageStudio() {
  const [items, setItems] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [generation, setGeneration] = useState(null)
  const [slot, setSlot] = useState('hero')
  const [form, setForm] = useState({ prompt: '', altText: '', caption: '' })
  const [busy, setBusy] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshedAt, setRefreshedAt] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const loadItems = async () => {
    const rows = await api.get('/generations')
    setItems(rows)
    setSelectedId((current) => current || (rows[0] ? String(rows[0].id) : ''))
    return rows
  }
  const loadGeneration = async (id = selectedId) => {
    if (!id) { setGeneration(null); setRefreshedAt(new Date().toISOString()); return null }
    const value = await api.get(`/generations/${id}`)
    setGeneration(value); setRefreshedAt(new Date().toISOString())
    return value
  }
  useEffect(() => { loadItems().catch((value) => setError(value.message)) }, [])
  useEffect(() => { if (!selectedId) return; loadGeneration(selectedId).catch((value) => setError(value.message)) }, [selectedId])
  const draft = generation?.humanized || generation?.draft
  const planFor = (value) => value === 'hero' ? draft?.heroImage : draft?.sections?.[Number(value.split('-')[1]) - 1]?.image
  useEffect(() => {
    const plan = planFor(slot) || {}
    setForm({ prompt: plan.prompt || '', altText: plan.alt || '', caption: plan.caption || '' })
  }, [slot, generation?.id, draft?.updatedAt])

  const list = useListState({
    rows: [...(generation?.images || [])].reverse(),
    search: (row) => `${row.slot} ${row.altText || ''} ${row.prompt || ''}`,
    filters: [
      { id: 'all', label: '전체' },
      { id: 'active', label: '사용 중', test: (row) => row.status === 'active' },
      { id: 'superseded', label: '교체됨', test: (row) => row.status === 'superseded' },
      { id: 'error', label: '오류', test: (row) => row.status === 'error' },
    ],
    sorters: [
      { id: 'updated', label: '최신순', value: (row) => row.updatedAt, dir: 'desc' },
      { id: 'slot', label: '슬롯순', value: (row) => row.slot, dir: 'asc' },
      { id: 'status', label: '상태순', value: (row) => row.status, dir: 'asc' },
    ],
    initialSize: 6,
  })

  const generate = async (event) => {
    event.preventDefault(); if (!generation || !draft) return
    setBusy(true); setError(''); setMessage('')
    try {
      const sectionIndex = slot === 'hero' ? null : Number(slot.split('-')[1]) - 1
      await api.post(`/generations/${generation.id}/images`, { slot, sectionIndex, ...form })
      await loadGeneration(generation.id)
      setMessage('새 WebP 이미지를 생성했습니다.')
    } catch (value) { setError(value.message) } finally { setBusy(false) }
  }

  const refresh = async () => {
    setRefreshing(true); setError('')
    try { await loadItems(); await loadGeneration() } catch (value) { setError(value.message) }
    finally { setRefreshing(false) }
  }

  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">IMAGE ATELIER</p><h1>이미지 작업실</h1><p>기존 이미지를 재사용하지 않고 가이드별 대표·본문 이미지를 새로 만듭니다.</p></div><div className="page-head-actions">
      <RefreshStatus refreshedAt={refreshedAt} sources={[{ label: '선택 작업 수정', value: generation?.updated_at }]} />
      <button className="button button-quiet" onClick={refresh} disabled={busy || refreshing}>{refreshing ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />새로고침</>}</button>
    </div></header>
    <ErrorNotice message={error} onClose={() => setError('')} />
    <SuccessNotice message={message} onClose={() => setMessage('')} />
    <div className="image-studio-layout">
      <section className="image-brief">
        <label><span>가이드 작업</span><select value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setSlot('hero') }}><option value="">작업 선택</option>{items.map((item) => <option key={item.id} value={item.id}>#{item.id} · {item.kind === 'update' ? '수정' : '새 글'} · {item.topic}</option>)}</select></label>
        {!draft ? <div className="empty-inline"><ImagePlus size={24} />원고를 먼저 생성해 주세요.</div> : <form onSubmit={generate} className="field-stack">
          <label><span>슬롯</span><select value={slot} onChange={(event) => setSlot(event.target.value)}><option value="hero">대표 이미지 · 필수</option>{draft.sections?.slice(0, 2).map((section, index) => <option key={section.title} value={`section-${index + 1}`}>본문 {index + 1} · {section.title}</option>)}</select></label>
          <label><span>생성 프롬프트</span><textarea rows="8" required value={form.prompt} onChange={(event) => setForm({ ...form, prompt: event.target.value })} /></label>
          <label><span>대체텍스트</span><textarea rows="3" required value={form.altText} onChange={(event) => setForm({ ...form, altText: event.target.value })} /></label>
          <label><span>캡션</span><textarea rows="3" value={form.caption} onChange={(event) => setForm({ ...form, caption: event.target.value })} /></label>
          <div className="image-spec"><span>gpt-image-2</span><span>1536×1024</span><span>medium → WebP</span></div>
          <button className="button button-primary" disabled={busy}>{busy ? <Spinner label="이미지 생성 중" /> : <><Sparkles size={15} />새 이미지 생성</>}</button>
        </form>}
      </section>
      <section className="image-gallery">
        <div className="section-head"><div><h2>생성 이력</h2><p>활성·교체·오류 상태와 프롬프트를 함께 보관합니다.</p></div></div>
        <ListToolbar state={list} placeholder="슬롯·대체텍스트·프롬프트 검색" label="상태" />
        {list.view.length ? <>
          <div className="asset-grid">{list.view.map((asset) => {
            const preview = asset.publicPath && asset.status !== 'error' ? `/generated-images/${generation.id}/${asset.publicPath.split('/').at(-1)}` : null
            return <article key={asset.id} className={`asset-item ${asset.status}`}>
              {preview ? <img src={preview} alt={asset.altText || ''} /> : <div className="asset-empty"><ImagePlus size={25} /></div>}
              <div>
                <span>{asset.slot}</span>
                <Badge tone={asset.status === 'active' ? 'success' : asset.status === 'error' ? 'danger' : 'neutral'}>{asset.status}</Badge>
                <strong>{asset.altText}</strong>
                <small>{asset.model || '대기'} · {dateTime(asset.updatedAt)}</small>
                <details><summary>프롬프트</summary><p>{asset.prompt}</p></details>
              </div>
            </article>
          })}</div>
          <Pagination state={list} sizes={[6, 12, 24]} />
        </> : <EmptyRow icon={ImagePlus} title="생성된 이미지가 없습니다" hint="원고의 이미지 계획을 확인한 뒤 새 이미지를 만드세요." />}
      </section>
    </div>
  </main>
}

const IMPORT_LABELS = { gsc_performance: 'GSC 성과', gsc_coverage: 'GSC 색인', ga4_overview: 'GA4 개요', ga4_path_device: 'GA4 경로·기기', ga4_organic_landing: 'Google 검색 후 참여', naver_web_performance: 'Naver 웹검색' }

function Analytics() {
  const [imports, setImports] = useState([])
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshedAt, setRefreshedAt] = useState('')
  const [error, setError] = useState('')
  const load = async () => { const rows = await api.get('/analytics/imports'); setImports(rows); setRefreshedAt(new Date().toISOString()); return rows }
  useEffect(() => { load().catch((value) => setError(value.message)) }, [])

  const list = useListState({
    rows: imports,
    search: (row) => `${row.fileName} ${row.sourceType}`,
    filters: [
      { id: 'all', label: '전체' },
      ...Object.entries(IMPORT_LABELS).map(([id, label]) => ({ id, label, test: (row) => row.sourceType === id })),
    ],
    sorters: [
      { id: 'importedAt', label: '가져온 순서', value: (row) => row.importedAt, dir: 'desc' },
      { id: 'period', label: '측정 기간', value: (row) => row.periodStart, dir: 'desc' },
      { id: 'fileName', label: '파일 이름순', value: (row) => row.fileName, dir: 'asc' },
    ],
    initialSize: 10,
  })

  const upload = async (event) => {
    event.preventDefault(); if (!file) return
    setBusy(true); setError('')
    try { await api.upload('/analytics/import', file); setFile(null); await load() } catch (value) { setError(value.message) } finally { setBusy(false) }
  }
  const refresh = async () => {
    setRefreshing(true); setError('')
    try { await load() } catch (value) { setError(value.message) }
    finally { setRefreshing(false) }
  }
  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">SOURCE LEDGER</p><h1>분석 자료</h1><p>원본을 보존하고 측정 기간과 플랫폼 정의를 분리해 적재합니다.</p></div><div className="page-head-actions">
      <RefreshStatus refreshedAt={refreshedAt} sources={[{ label: '최근 자료', value: imports[0]?.importedAt }]} />
      <button className="button button-quiet" onClick={refresh} disabled={busy || refreshing}>{refreshing ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />새로고침</>}</button>
    </div></header>
    <ErrorNotice message={error} onClose={() => setError('')} />
    <form className="upload-zone" onSubmit={upload}><Upload size={28} /><div><strong>GA4 CSV 또는 Search Console ZIP</strong><p>같은 파일은 해시로 감지해 중복 적재하지 않습니다.</p></div><input type="file" accept=".csv,.zip" onChange={(event) => setFile(event.target.files?.[0] || null)} /><button className="button button-primary" disabled={!file || busy}>{busy ? <Spinner /> : file ? `${file.name} 가져오기` : '파일 선택'}</button></form>

    <ListToolbar state={list} placeholder="파일 이름 검색" label="출처" />
    <section className="data-table import-table">
      <div className="table-row table-head-row">
        <SortHead state={list} id="fileName">출처</SortHead>
        <SortHead state={list} id="period">측정 기간</SortHead>
        <span>핵심 값</span>
        <SortHead state={list} id="importedAt">가져온 시각</SortHead>
      </div>
      {list.view.map((item) => <div className="table-row" key={item.id}>
        <div><Badge tone={item.sourceType === 'gsc_coverage' ? 'danger' : item.sourceType.startsWith('ga4_') ? 'gold' : 'neutral'}>{IMPORT_LABELS[item.sourceType] || item.sourceType}</Badge><small>{item.fileName}</small><small>SHA-256 {item.fileHash?.slice(0, 12) || '—'} · {item.parserVersion || '—'}</small></div>
        <div><strong>{item.periodStart || '—'}</strong><small>~ {item.periodEnd || '—'}</small></div>
        <div className="summary-chips">{Object.entries(item.summary || {}).filter(([, value]) => typeof value !== 'object').slice(0, 4).map(([key, value]) => <span key={key}>{key} <b>{fmt(value)}</b></span>)}</div>
        <div>{dateTime(item.importedAt)}</div>
      </div>)}
      {!list.view.length && <EmptyRow title="가져온 자료가 없습니다" hint="위에서 CSV 또는 ZIP을 올려주세요." />}
    </section>
    <Pagination state={list} sizes={[10, 20, 50]} />
  </main>
}

function HistoryPage() {
  const [rows, setRows] = useState([])
  const [comparisons, setComparisons] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [refreshedAt, setRefreshedAt] = useState('')
  const [error, setError] = useState('')
  const load = async () => {
    const [applyRows, comparisonRows] = await Promise.all([api.get('/applies'), api.get('/analytics/comparisons')])
    setRows(applyRows); setComparisons(comparisonRows); setRefreshedAt(new Date().toISOString())
  }
  useEffect(() => { load().catch((value) => setError(value.message)) }, [])
  const refresh = async () => {
    setRefreshing(true); setError('')
    try { await load() } catch (value) { setError(value.message) }
    finally { setRefreshing(false) }
  }

  const list = useListState({
    rows,
    search: (row) => `${row.topic} #${row.id}`,
    filters: [
      { id: 'all', label: '전체' },
      { id: 'done', label: '반영 성공', test: (row) => row.state === 'done' },
      { id: 'rolled', label: '자동 복원', test: (row) => row.state !== 'done' },
    ],
    sorters: [
      { id: 'createdAt', label: '최신순', value: (row) => row.createdAt, dir: 'desc' },
      { id: 'topic', label: '주제순', value: (row) => row.topic, dir: 'asc' },
    ],
    initialSize: 10,
  })

  return <main className="page page-enter">
    <header className="page-head"><div><p className="eyebrow">LOCAL CHANGELOG</p><h1>반영 이력</h1><p>파일 변경, 검사 결과, 자동 복원과 28일 이후 참고 변화를 확인합니다.</p></div><div className="page-head-actions">
      <RefreshStatus refreshedAt={refreshedAt} sources={[{ label: '최근 반영', value: rows[0]?.finishedAt || rows[0]?.createdAt }]} />
      <button className="button button-quiet" onClick={refresh} disabled={refreshing}>{refreshing ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />새로고침</>}</button>
    </div></header>
    <ErrorNotice message={error} onClose={() => setError('')} />
    <ListToolbar state={list} placeholder="주제·번호 검색" label="결과" />
    <section className="history-line">{list.view.length ? list.view.map((row) => <article key={row.id}>
      <span className={`history-mark ${row.state}`}></span>
      <div>
        <div className="history-title"><strong>{row.topic}</strong><Badge tone={row.state === 'done' ? 'success' : 'danger'}>{row.state === 'done' ? '로컬 반영 성공' : row.state === 'running' ? '반영 중 · 중단 시 복구 필요' : row.state === 'rolled_back' ? '자동 복원' : '확인 필요'}</Badge></div>
        <p>반영 #{row.id} · 작업 #{row.generationId} · {dateTime(row.createdAt)}</p>
        <div className="validation-row">{row.validation?.map((item) => <span key={item.command} className={item.ok ? 'ok' : 'fail'}>{item.ok ? <Check size={13} /> : <X size={13} />}{item.command}</span>)}</div>
        {row.error && <small className="error-copy">{row.error}</small>}
        {row.state === 'recovery_required' && <button className="button button-quiet" onClick={async () => { try { await api.post(`/applies/${row.id}/recover`); await load() } catch (error) { setError(error.message) } }}>백업으로 복구</button>}
      </div>
    </article>) : <EmptyRow icon={History} title="아직 저장소 반영 이력이 없습니다" />}</section>
    <Pagination state={list} sizes={[10, 20, 50]} />

    <section className="comparison-section">
      <div className="section-head"><div><h2>28일 이후 참고 변화</h2><p>배포 완료일이 기록된 작업만, 같은 보고서의 겹치지 않는 전체 기간으로 비교합니다.</p></div></div>
      {comparisons.length ? <div className="comparison-list">{comparisons.map((item) => <article key={item.id}>
        <div><strong>{item.topic}</strong><small>{item.guideSlug} · 반영 {dateTime(item.appliedAt)}</small></div>
        <Badge tone={item.status === 'comparable' ? 'success' : 'neutral'}>{item.status === 'comparable' ? '비교 가능' : item.status === 'awaiting_deployment' ? '배포일 미등록 · 비교 보류' : `${new Date(item.readyAt).toLocaleDateString('ko-KR')} 이후 자료 필요`}</Badge>
        {item.changes && <div className="change-strip">{[['노출', item.changes.impressions], ['클릭', item.changes.clicks], ['CTR', item.changes.ctr], ['조회', item.changes.views]].map(([label, value]) => value && <span key={label}>{label}<b>{label === 'CTR' ? `${(value.before * 100).toFixed(2)} → ${(value.after * 100).toFixed(2)}%` : `${fmt(value.before)} → ${fmt(value.after)}`}</b></span>)}</div>}
        <p>{item.note}</p>
        {item.deployedAt ? <small>배포 {dateTime(item.deployedAt)} · {item.deploymentCommit}</small> : <DeploymentForm id={item.id} onSaved={load} onError={setError} />}
      </article>)}</div> : <div className="empty-inline"><Clock3 size={24} />성공적으로 반영된 작업부터 변경 전 기준선이 기록됩니다.</div>}
    </section>
  </main>
}

function SettingsPage() {
  const [value, setValue] = useState(null)
  const [evaluation, setEvaluation] = useState(null)
  const [form, setForm] = useState({})
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [refreshedAt, setRefreshedAt] = useState('')
  const load = async () => {
    const [data, evaluationData] = await Promise.all([api.get('/settings'), api.get('/settings/evaluations')])
    setValue(data); setEvaluation(evaluationData)
    setForm({ defaultModel: data.models.default, fallbackModel: data.models.fallback, siteRoot: data.paths.siteRoot, humanizerDir: data.paths.humanizerDir, humanizerUrl: data.paths.humanizerUrl })
    setRefreshedAt(new Date().toISOString())
  }
  useEffect(() => { load().catch((e) => setError(e.message)) }, [])
  const run = async (key, action) => { setBusy(key); setError(''); try { await action(); await load() } catch (e) { setError(e.message) } finally { setBusy('') } }
  if (!value) return <main className="page"><Spinner label="설정 확인 중" /></main>
  return <main className="page page-enter"><header className="page-head"><div><p className="eyebrow">LOCAL CONFIGURATION</p><h1>연결과 모델</h1><p>비밀값은 마스킹하고 이 PC의 로컬 DB에만 보관합니다.</p></div><div className="page-head-actions">
    <RefreshStatus refreshedAt={refreshedAt} sources={[{ label: '모델 비교', value: evaluation?.rows?.[0]?.createdAt }]} />
    <button className="button button-quiet" disabled={!!busy} onClick={() => run('refresh', async () => {})}>{busy === 'refresh' ? <Spinner label="확인 중" /> : <><RefreshCcw size={16} />새로고침</>}</button>
  </div></header><ErrorNotice message={error} onClose={() => setError('')} />
    <div className="settings-layout"><section className="settings-section"><div className="section-head"><div><h2>API 연결</h2><p>청소업체블로그관리 설정을 가져온 상태입니다.</p></div><button className="button button-quiet" onClick={() => run('import', () => api.post('/settings/import-reference'))}>{busy === 'import' ? <Spinner /> : '다시 가져오기'}</button></div><div className="connection-row"><span><i className={value.openai.configured ? 'online' : ''}></i>OpenAI</span><strong>{value.openai.masked || '설정 안 됨'}</strong></div><div className="connection-row"><span><i className={value.naver.configured ? 'online' : ''}></i>Naver API HUB</span><strong>{value.naver.clientId || '설정 안 됨'}</strong></div></section>
      <section className="settings-section"><div className="section-head"><div><h2>원고 모델</h2><p>Luna를 기본으로 쓰고 차단 오류가 남을 때 Terra가 한 번 보완합니다.</p></div></div><div className="form-grid"><label><span>기본</span><select value={form.defaultModel} onChange={(e) => setForm({ ...form, defaultModel: e.target.value })}>{value.models.allowed.map((model) => <option key={model}>{model}</option>)}</select></label><label><span>자동 보완</span><select value={form.fallbackModel} onChange={(e) => setForm({ ...form, fallbackModel: e.target.value })}>{value.models.allowed.map((model) => <option key={model}>{model}</option>)}</select></label><label><span>이미지</span><input readOnly value={value.models.image} /></label></div></section>
      <section className="settings-section full-span"><div className="section-head"><div><h2>로컬 경로</h2><p>관리도구는 이 경로 밖의 파일을 반영하지 않습니다.</p></div></div><div className="field-stack"><label><span>귀족 저장소</span><input value={form.siteRoot} onChange={(e) => setForm({ ...form, siteRoot: e.target.value })} /></label><label><span>Humanizer V9</span><input value={form.humanizerDir} onChange={(e) => setForm({ ...form, humanizerDir: e.target.value })} /></label><label><span>Humanizer URL</span><input value={form.humanizerUrl} onChange={(e) => setForm({ ...form, humanizerUrl: e.target.value })} /></label></div><div className="settings-actions"><button className="button button-primary" onClick={() => run('save', () => api.put('/settings', form))}>{busy === 'save' ? <Spinner /> : <><Save size={15} />설정 저장</>}</button><button className="button button-quiet" onClick={() => run('humanizer', () => api.post('/humanizer/start'))}>{busy === 'humanizer' ? <Spinner /> : 'Humanizer 시작'}</button></div></section>
      <section className="settings-section full-span model-evaluation"><div className="section-head"><div><h2>Luna · Terra 5건 비교</h2><p>대표 가이드 5건의 구조 성공률, 안전 휴리스틱, 토큰과 응답 시간을 같은 계약으로 비교합니다.</p></div><button className="button button-quiet" disabled={!!busy} onClick={() => { if (confirm('Luna와 Terra를 각각 5회 호출해 비교할까요? OpenAI API 사용량이 발생합니다.')) run('evaluation', () => api.post('/settings/evaluations')) }}>{busy === 'evaluation' ? <Spinner label="10회 비교 중" /> : '비교 다시 실행'}</button></div>{evaluation?.batchId ? <><div className="evaluation-grid">{evaluation.models.map((model) => <article key={model.model}><strong>{model.model}</strong><span>스키마 성공 <b>{fmt(model.success)} / {fmt(model.total)}</b></span><span>평균 품질 <b>{model.avgQuality == null ? '—' : Number(model.avgQuality).toFixed(1)}</b></span><span>평균 응답 <b>{model.avgLatencyMs == null ? '—' : `${(model.avgLatencyMs / 1000).toFixed(1)}초`}</b></span><span>토큰 <b>{fmt(model.inputTokens)} + {fmt(model.outputTokens)}</b></span></article>)}</div><small className="safety-copy">{evaluation.note}</small></> : <div className="empty-inline"><Activity size={23} />아직 실제 모델 비교를 실행하지 않았습니다.</div>}</section>
    </div>
  </main>
}

export default function App() {
  const [view, setView] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('view')
    return NAV.some(([id]) => id === requested) ? requested : 'dashboard'
  })
  const [mobileNav, setMobileNav] = useState(false)
  const [dashboard, setDashboard] = useState(null)
  const [dashboardBusy, setDashboardBusy] = useState(false)
  const [dashboardMessage, setDashboardMessage] = useState('')
  const [seed, setSeed] = useState(null)
  const [error, setError] = useState('')
  const loadDashboard = async () => {
    try { setDashboard(await api.get('/dashboard')); setError('') }
    catch (value) { setError(value.message) }
  }
  const refreshDashboard = async () => {
    setDashboardBusy(true); setDashboardMessage(''); setError('')
    try {
      const scan = await api.post('/inventory/refresh')
      setDashboard(await api.get('/dashboard'))
      setDashboardMessage(`가이드 ${fmt(scan.total)}개를 다시 확인하고 현황을 갱신했습니다.`)
    } catch (value) { setError(value.message) }
    finally { setDashboardBusy(false) }
  }
  useEffect(() => { void loadDashboard() }, [])
  const navigate = (target) => { setView(target); setMobileNav(false); if (target === 'dashboard') loadDashboard() }
  const startEditor = (value) => { setSeed(value); navigate('editor') }
  const activeLabel = NAV.find(([id]) => id === view)?.[1]
  return <div className="app-shell">
    <aside className={`main-nav ${mobileNav ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Gem size={22} /></div><div><strong>귀족</strong><span>GUIDE DESK</span></div></div>
      <nav>{NAV.map(([id, label, Icon]) => <button key={id} className={view === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span></button>)}</nav>
      <div className="nav-foot"><span className="local-dot"></span><div><strong>LOCAL ONLY</strong><small>127.0.0.1:8788</small></div></div>
    </aside>
    <div className="mobile-header"><button onClick={() => setMobileNav(!mobileNav)}><Menu /></button><strong>{activeLabel}</strong><Gem size={19} /></div>
    <div className="app-content">
      {error && <ErrorNotice message={error} onClose={() => setError('')} />}
      {view === 'dashboard' && (dashboard ? <Dashboard data={dashboard} onNavigate={navigate} refresh={refreshDashboard} refreshing={dashboardBusy} message={dashboardMessage} clearMessage={() => setDashboardMessage('')} /> : <div className="global-loading"><Spinner label="분석 기준선 불러오는 중" /></div>)}
      {view === 'opportunities' && <Opportunities onStart={startEditor} />}
      {view === 'audits' && <ContentAudits onStart={startEditor} />}
      {view === 'editor' && <Editor seed={seed} clearSeed={() => setSeed(null)} />}
      {view === 'images' && <ImageStudio />}
      {view === 'analytics' && <Analytics />}
      {view === 'history' && <HistoryPage />}
      {view === 'measurement' && <MeasurementPage />}
      {view === 'settings' && <SettingsPage />}
    </div>
  </div>
}
