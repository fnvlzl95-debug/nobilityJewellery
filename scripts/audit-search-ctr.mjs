import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const inputArg = args.find((arg) => !arg.startsWith('--'))

const optionValue = (name, fallback) => {
  const exact = args.find((arg) => arg.startsWith(`${name}=`))
  if (exact) return exact.slice(name.length + 1)
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}

const minImpressions = Number(optionValue('--min-impressions', '100'))
const maxCtr = Number(optionValue('--max-ctr', '1'))
const format = optionValue('--format', 'table')

if (!inputArg) {
  console.error('사용법: npm run audit:ctr -- <GSC 페이지.csv 또는 Performance ZIP> [--min-impressions=100] [--max-ctr=1] [--format=table|markdown|json]')
  process.exit(1)
}

if (!Number.isFinite(minImpressions) || minImpressions < 0 || !Number.isFinite(maxCtr) || maxCtr < 0) {
  console.error('노출·CTR 기준은 0 이상의 숫자여야 합니다.')
  process.exit(1)
}

const inputPath = resolve(inputArg)
if (!existsSync(inputPath)) {
  console.error(`입력 파일을 찾을 수 없습니다: ${inputPath}`)
  process.exit(1)
}

const readInput = () => {
  const actualPath = statSync(inputPath).isDirectory() ? join(inputPath, '페이지.csv') : inputPath
  if (!existsSync(actualPath)) {
    throw new Error(`디렉터리 안에서 페이지.csv를 찾을 수 없습니다: ${actualPath}`)
  }

  if (!actualPath.toLowerCase().endsWith('.zip')) {
    return readFileSync(actualPath, 'utf8')
  }

  const extracted = spawnSync('tar', ['-xOf', actualPath, '페이지.csv'], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })

  if (extracted.status !== 0 || !extracted.stdout) {
    throw new Error(`ZIP에서 페이지.csv를 읽지 못했습니다. 압축을 푼 CSV를 직접 지정해 주세요.\n${extracted.stderr || ''}`)
  }

  return extracted.stdout
}

const parseCsv = (source) => {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    const next = source[index + 1]

    if (char === '"' && quoted && next === '"') {
      field += '"'
      index += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      row.push(field)
      field = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1
      row.push(field)
      if (row.some((value) => value.length > 0)) rows.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }

  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

const normalizeUrl = (value) => {
  try {
    const url = new URL(value.trim())
    const pathname = url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '')
    return `${url.origin}${pathname}`
  } catch {
    return value.trim().replace(/\/+$/, '')
  }
}

let csv
try {
  csv = readInput().replace(/^\uFEFF/, '')
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}

const [headers = [], ...rows] = parseCsv(csv)
const headerIndex = new Map(headers.map((header, index) => [header.trim(), index]))
const urlIndex = headerIndex.get('인기 페이지') ?? headerIndex.get('페이지') ?? headerIndex.get('URL')
const clicksIndex = headerIndex.get('클릭수') ?? headerIndex.get('클릭')
const impressionsIndex = headerIndex.get('노출') ?? headerIndex.get('노출수')
const positionIndex = headerIndex.get('게재 순위') ?? headerIndex.get('평균 게재순위')

if ([urlIndex, clicksIndex, impressionsIndex].some((index) => index === undefined)) {
  console.error(`필수 열을 찾지 못했습니다. 현재 헤더: ${headers.join(', ')}`)
  process.exit(1)
}

const aggregated = new Map()
for (const row of rows) {
  const rawUrl = row[urlIndex]?.trim()
  if (!rawUrl) continue

  const url = normalizeUrl(rawUrl)
  const clicks = Number(row[clicksIndex] || 0)
  const impressions = Number(row[impressionsIndex] || 0)
  const position = positionIndex === undefined ? 0 : Number(row[positionIndex] || 0)
  const previous = aggregated.get(url) ?? { url, clicks: 0, impressions: 0, positionWeight: 0 }

  previous.clicks += Number.isFinite(clicks) ? clicks : 0
  previous.impressions += Number.isFinite(impressions) ? impressions : 0
  previous.positionWeight += Number.isFinite(position) ? position * impressions : 0
  aggregated.set(url, previous)
}

const candidates = [...aggregated.values()]
  .map((row) => ({
    url: row.url,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.impressions > 0 ? (row.clicks / row.impressions) * 100 : 0,
    position: row.impressions > 0 ? row.positionWeight / row.impressions : 0,
  }))
  .filter((row) => row.impressions >= minImpressions && row.ctr < maxCtr)
  .sort((a, b) => b.impressions - a.impressions || a.ctr - b.ctr)

const outputRows = candidates.map((row) => ({
  URL: row.url,
  클릭: row.clicks,
  노출: row.impressions,
  CTR: `${row.ctr.toFixed(2)}%`,
  평균순위: row.position.toFixed(2),
}))

if (format === 'json') {
  console.log(JSON.stringify({ minImpressions, maxCtr, candidates: outputRows }, null, 2))
} else if (format === 'markdown') {
  console.log(`| URL | 클릭 | 노출 | CTR | 평균순위 |`)
  console.log(`| --- | ---: | ---: | ---: | ---: |`)
  for (const row of outputRows) {
    console.log(`| ${row.URL} | ${row.클릭} | ${row.노출} | ${row.CTR} | ${row.평균순위} |`)
  }
} else if (outputRows.length) {
  console.table(outputRows)
} else {
  console.log(`조건에 맞는 URL이 없습니다. 노출 ≥ ${minImpressions}, CTR < ${maxCtr}%`)
}

console.log(`\n정규화 URL ${aggregated.size}개 중 점검 후보 ${candidates.length}개 · 기준: 노출 ≥ ${minImpressions}, CTR < ${maxCtr}%`)
