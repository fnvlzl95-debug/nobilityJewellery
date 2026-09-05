const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const { db } = require('../lib/db');
const { sha256, nowIso } = require('../lib/utils');
const { gitExecutable } = require('../lib/executables');
const inventory = require('./inventoryService');
const baselines = require('./baselineService');
const { parseLiteral } = require('./contentExtractorService');

db.exec(`CREATE TABLE IF NOT EXISTS comparison_controls (
  baseline_id INTEGER PRIMARY KEY REFERENCES content_baselines(id),
  control_slug TEXT NOT NULL, selection_reason TEXT NOT NULL,
  registered_at TEXT NOT NULL, registration_timing TEXT NOT NULL,
  snapshot_json TEXT NOT NULL
)`);

const limitations = [
  '무작위 실험이 아닌 고정 기간 탐색 관찰입니다. 두 글의 검색 의도·기존 노출·유입 링크가 달라 변화 차이를 수정의 인과효과로 해석하지 않습니다.',
  '원문·목록의 Git 이력과 현재 파일을 확인합니다. 기록되지 않고 되돌린 과거 편집, 원격 배포 이력, 다른 글의 유입 링크·공유 템플릿 변경 전체를 증명하지는 않습니다.',
  'GSC는 태평양 시간 기준입니다. GA4는 원본 시간대 메타가 없어 한국 시간을 가정하며 플랫폼별 기간을 구분합니다. 행 누락은 0이 아닙니다.',
  '이 관찰에 실제 비용·유효 상담은 자동 연결되지 않았습니다. 클릭을 상담으로 환산하지 않습니다.',
];
const fail = (message, code, status = 422) => Object.assign(new Error(message), { status, code });
const issue = (code, message) => ({ code, message });
const normalizedText = value => String(value).replace(/\r\n?/g, '\n');
const textHash = value => sha256(normalizedText(value));
const stableSnapshot = value => Object.fromEntries(['gsc', 'ga4'].map(key => [key, value?.[key] || null]));
const snapshotHash = value => sha256(JSON.stringify(stableSnapshot(value)));
const historyCache = new Map();
const HISTORY_CACHE_LIMIT = 100;

function baselineRow(id) {
  const row = db.prepare(`SELECT b.*, g.kind, g.topic FROM content_baselines b JOIN generations g ON g.id=b.generation_id WHERE b.id=?`).get(Number(id));
  if (!row) throw fail('비교할 변경 전 기준선이 없습니다.', 'BASELINE_NOT_FOUND', 404);
  if (row.kind !== 'update') throw fail('기존 글 수정 기준선에만 대조 글을 연결할 수 있습니다.', 'CONTROL_UPDATE_ONLY');
  if (!row.deployed_at || !/^[a-f0-9]{7,40}$/i.test(row.deployment_commit || '')) throw fail('실제 배포 시각과 커밋을 먼저 기록해 주세요.', 'CONTROL_DEPLOYMENT_REQUIRED');
  return { ...row, before: JSON.parse(row.snapshot_json) };
}

function baselineFingerprint(row) {
  return sha256(JSON.stringify({ id: row.id, generationId: row.generation_id, slug: row.guide_slug,
    snapshot: row.snapshot_json, appliedAt: row.applied_at, deployedAt: row.deployed_at, commit: row.deployment_commit }));
}

function reportFor(value) {
  if (!value?.importId) return null;
  const row = db.prepare(`SELECT id,source_type AS sourceType,period_start AS periodStart,period_end AS periodEnd,
    file_hash AS fileHash,summary_json AS summaryJson FROM analytics_imports WHERE id=?`).get(value.importId);
  if (!row || row.periodStart !== value.periodStart || row.periodEnd !== value.periodEnd
    || (value.sourceType && row.sourceType !== value.sourceType)
    || (value.fileHash && row.fileHash !== value.fileHash)) throw fail('기준선과 보존된 원본의 기간·종류·해시가 달라 대조를 보류합니다.', 'CONTROL_SOURCE_MISMATCH');
  return { ...row, summary: JSON.parse(row.summaryJson || '{}') };
}

function sourceReports(before) {
  return { performance: reportFor(before.gsc), ga4: reportFor(before.ga4) };
}

function sameMetrics(before, actual) {
  for (const platform of ['gsc', 'ga4']) {
    if (!before?.[platform]) continue;
    const current = actual?.[platform];
    if (!current) return false;
    const keys = platform === 'gsc'
      ? ['importId', 'periodStart', 'periodEnd', 'sourceType', 'fileHash', 'normalizedUrl', 'metricFingerprint', 'hasData', 'clicks', 'impressions', 'ctr', 'position', 'variants']
      : ['importId', 'periodStart', 'periodEnd', 'sourceType', 'fileHash', 'hasData', 'views', 'activeUsers', 'events', 'bounceRate'];
    for (const key of keys) {
      if (!Object.hasOwn(before[platform], key)) continue;
      const a = before[platform][key], b = current[key];
      if (typeof a === 'number' && typeof b === 'number') {
        if (!Number.isFinite(a) || !Number.isFinite(b) || Math.abs(a - b) > 1e-10 * Math.max(1, Math.abs(b))) return false;
      } else if (a !== b) return false;
    }
    if (before[platform].sourceScope && JSON.stringify(before[platform].sourceScope) !== JSON.stringify(current.sourceScope)) return false;
  }
  return true;
}

function verifiedBefore(row, slug) {
  const reports = sourceReports(row.before);
  const scope = reports.performance?.summary;
  const property = value => value === 'https://noblessegold.com' ? value + '/' : value;
  if (!reports.performance || reports.performance.sourceType !== 'gsc_performance' || scope?.sitewideEligible !== true
    || !['https://noblessegold.com/', 'sc-domain:noblessegold.com'].includes(property(scope.property)) || String(scope.searchType).toLowerCase() !== 'web') {
    throw fail('같은 속성의 검증된 전체 GSC 변경 전 자료가 필요합니다.', 'CONTROL_SOURCE_MISMATCH');
  }
  const treatment = baselines.metricSnapshot(row.guide_slug, reports);
  if (!sameMetrics(row.before, treatment)) throw fail('변경 전 기준선의 현재 원본 재집계가 달라 비교를 보류합니다.', 'CONTROL_SOURCE_MISMATCH');
  if (!treatment.gsc?.hasData) throw fail('수정 대상 글의 변경 전 GSC 페이지 행이 없어 같은 기준의 대조를 등록할 수 없습니다.', 'TREATMENT_BEFORE_ROWS_MISSING');
  return baselines.metricSnapshot(slug, reports);
}

function indexEntry(text, slug, cache = null) {
  let entries = cache?.get(text);
  if (!entries) {
    entries = inventory.extractObjectBlocks(text).map(({ text: block }) => ({ slug: parseLiteral(block, {})?.slug, block }));
    cache?.set(text, entries);
  }
  const matches = entries.filter(entry => entry.slug === slug);
  if (matches.length !== 1) throw fail('대조 글의 목록 항목을 정확히 확인하지 못했습니다.', 'CONTROL_CONTENT_UNAVAILABLE');
  return normalizedText(matches[0].block);
}

function contentIdentity(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) throw fail('실제 가이드의 대조 글을 선택해 주세요.', 'CONTROL_NOT_FOUND');
  const guide = inventory.getGuide(slug);
  if (!guide) throw fail('대조 글을 찾을 수 없습니다.', 'CONTROL_NOT_FOUND', 404);
  const root = inventory.siteRoot(), relativePath = `pages/guide/${slug}.vue`;
  try {
    const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
    const entry = indexEntry(fs.readFileSync(inventory.guideIndexPath(), 'utf8'), slug);
    return { slug, title: guide.title, relativePath, sourceHash: textHash(source), indexEntryHash: textHash(entry) };
  } catch (error) {
    if (error.code?.startsWith('CONTROL_')) throw error;
    throw fail('대조 글의 현재 원문과 목록 파일을 읽을 수 없습니다.', 'CONTROL_CONTENT_UNAVAILABLE');
  }
}

function git(args) {
  return childProcess.execFileSync(gitExecutable(), args, { cwd: inventory.siteRoot(), windowsHide: true,
    encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 10000, stdio: ['ignore', 'pipe', 'pipe'] });
}

function headCommit() {
  // The usual checkout can identify HEAD without spawning a process on every GET.
  // Worktrees and uncommon ref storage safely fall back to Git's own resolver.
  try {
    const gitDir = path.join(inventory.siteRoot(), '.git');
    const head = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
    if (/^[a-f0-9]{40,64}$/i.test(head)) return head;
    const ref = /^ref: (refs\/[a-zA-Z0-9_./-]+)$/.exec(head)?.[1];
    if (ref && !ref.split('/').includes('..')) {
      const refPath = path.join(gitDir, ref);
      const hash = fs.existsSync(refPath) ? fs.readFileSync(refPath, 'utf8').trim()
        : fs.readFileSync(path.join(gitDir, 'packed-refs'), 'utf8').split(/\r?\n/).find(line => line.endsWith(' ' + ref))?.split(' ')[0];
      if (/^[a-f0-9]{40,64}$/i.test(hash || '')) return hash;
    }
  } catch (_) { /* Resolve with Git when loose refs are unavailable. */ }
  return git(['rev-parse', 'HEAD']).trim();
}

function batchBlobs(specs) {
  const output = childProcess.execFileSync(gitExecutable(), ['cat-file', '--batch'], { cwd: inventory.siteRoot(), windowsHide: true,
    input: Buffer.from(specs.join('\n') + '\n'), maxBuffer: 64 * 1024 * 1024, timeout: 10000, stdio: ['pipe', 'pipe', 'pipe'] });
  let offset = 0;
  const contents = new Map();
  for (const spec of specs) {
    const end = output.indexOf(10, offset);
    if (end < 0) throw new Error('Incomplete Git batch header');
    const header = /^([a-f0-9]{40,64}) blob (\d+)$/.exec(output.subarray(offset, end).toString('ascii'));
    if (!header) throw new Error('Unavailable Git blob');
    const size = Number(header[2]), start = end + 1;
    if (!Number.isSafeInteger(size) || start + size >= output.length || output[start + size] !== 10) throw new Error('Incomplete Git blob');
    // cat-file sizes are bytes, not JS string length (Korean text is multibyte).
    contents.set(spec, output.subarray(start, start + size).toString('utf8'));
    offset = start + size + 1;
  }
  if (offset !== output.length) throw new Error('Unexpected Git batch data');
  return contents;
}

function historyCheck(row, current, treatment) {
  const issues = [];
  try {
    const commit = row.deployment_commit;
    const head = headCommit();
    const subjects = [current, treatment].filter(Boolean);
    const windowEndsAt = ['gsc', 'ga4'].filter(platform => row.before[platform]?.periodDays)
      .map(platform => baselines.observationReadyAt(row.deployed_at, row.before[platform].periodDays, platform === 'gsc' ? 'America/Los_Angeles' : 'Asia/Seoul')).sort().at(-1);
    const windowClosed = Number.isFinite(Date.parse(windowEndsAt)) && Date.now() >= Date.parse(windowEndsAt);
    const cacheKey = sha256(JSON.stringify({ root: inventory.siteRoot(), commit, head, subjects, windowEndsAt, windowClosed }));
    if (historyCache.has(cacheKey)) return structuredClone(historyCache.get(cacheKey));
    git(['merge-base', '--is-ancestor', commit, 'HEAD']);
    const files = [...new Set([...subjects.map(subject => subject.relativePath), 'data/guide-posts.ts'])];
    const revisions = git(['log', '--format=%H%x09%cI', '--max-count=201', `${commit}..${head}`, '--', ...files]).trim().split(/\r?\n/).filter(Boolean)
      .map(line => { const [revision, committedAt] = line.split('\t'); if (!/^[a-f0-9]{40,64}$/i.test(revision) || !Number.isFinite(Date.parse(committedAt))) throw new Error('Invalid Git history date'); return { revision, committedAt }; });
    if (revisions.length > 200) throw new Error('history too large');
    const specs = [...new Set([commit, head, ...revisions.map(row => row.revision)])].flatMap(revision => files.map(file => `${revision}:${file}`));
    const blobs = batchBlobs(specs);
    const entryCache = new Map();
    const at = (revision, file) => blobs.get(`${revision}:${file}`);
    const postWindowChanges = [];
    for (const subject of subjects) {
      const role = subject.slug === row.guide_slug ? 'TREATMENT' : 'CONTROL';
      const label = role === 'TREATMENT' ? '수정 대상 글' : '대조 글';
      const originalSource = textHash(at(commit, subject.relativePath));
      const originalEntry = textHash(indexEntry(at(commit, 'data/guide-posts.ts'), subject.slug, entryCache));
      const headSource = textHash(at(head, subject.relativePath));
      const headEntry = textHash(indexEntry(at(head, 'data/guide-posts.ts'), subject.slug, entryCache));
      if (headSource !== subject.sourceHash || headEntry !== subject.indexEntryHash) issues.push(issue(`${role}_UNCOMMITTED_CHANGE`, `${label}의 현재 파일이 HEAD와 다릅니다. 미커밋 변경의 발생 시각을 확인할 수 없어 비교를 보류합니다.`));
      if (!windowClosed && (originalSource !== subject.sourceHash || originalEntry !== subject.indexEntryHash)) issues.push(issue(`${role}_CHANGED_SINCE_DEPLOYMENT`, `${label}의 원문 또는 목록이 시험 배포 시점과 달라 비교를 보류합니다.`));
      // Compare only the two relevant entries; unrelated new articles do not contaminate the observation.
      let changedDuringWindow = false;
      for (const { revision, committedAt } of revisions) {
        if (textHash(at(revision, subject.relativePath)) !== originalSource
          || textHash(indexEntry(at(revision, 'data/guide-posts.ts'), subject.slug, entryCache)) !== originalEntry) {
          if (windowClosed && Date.parse(committedAt) >= Date.parse(windowEndsAt)) postWindowChanges.push({ role: role.toLowerCase(), commit: revision, committedAt });
          else changedDuringWindow = true;
        }
      }
      if (changedDuringWindow) issues.push(issue(`${role}_CHANGED_IN_HISTORY`, `관찰 기간 안의 Git 이력에 ${label} 변경이 있습니다. 현재 되돌렸더라도 관찰 중 변경 가능성이 있어 비교를 보류합니다.`));
    }
    const result = { headCommit: head, windowEndsAt, windowClosed, postWindowChanges,
      coverage: 'repository_history_and_current_files', issues,
      limitation: '관찰 종료 뒤 커밋된 변경은 과거 창을 무효화하지 않습니다. Git 커밋 시각은 실제 공개 배포 시각의 증명이 아니며, 미커밋 변경 시각은 확인할 수 없습니다.' };
    if (historyCache.size >= HISTORY_CACHE_LIMIT) historyCache.delete(historyCache.keys().next().value);
    historyCache.set(cacheKey, result);
    return structuredClone(result);
  } catch (_) {
    return { headCommit: null, coverage: 'unverified', issues: [issue('CONTROL_HISTORY_UNVERIFIED', '배포 커밋부터 현재까지 대조 글의 원문·목록 이력을 확인할 수 없어 비교를 보류합니다.')] };
  }
}

function periods(row) {
  return Object.fromEntries(['gsc', 'ga4'].map(platform => [platform,
    baselines.firstObservationPeriod(row.deployed_at, row.before[platform]?.periodDays, platform)]));
}

function registrationTiming(expectedPeriods, at, deployedAt) {
  const observed = Object.values(expectedPeriods).filter(Boolean);
  const starts = observed.map(period => Date.parse(baselines.observationReadyAt(deployedAt, 0, period.timeZone)));
  const ends = observed.map(period => Date.parse(baselines.observationReadyAt(deployedAt, period.periodDays, period.timeZone)));
  const instant = Date.parse(at);
  return instant < Math.min(...starts) ? 'before_window' : instant < Math.max(...ends) ? 'during_window' : 'after_window';
}

function previewControl(id, slug) {
  const row = baselineRow(id);
  if (slug === row.guide_slug) throw fail('수정 대상 글을 자기 대조로 선택할 수 없습니다.', 'CONTROL_SELF');
  const control = contentIdentity(slug), treatment = contentIdentity(row.guide_slug), expectedPeriods = periods(row);
  const issues = [];
  let before = null;
  try {
    before = verifiedBefore(row, slug);
    if (!before.gsc?.hasData) issues.push(issue('CONTROL_BEFORE_ROWS_MISSING', '대조 글의 변경 전 GSC 페이지 행이 없습니다. 0으로 가정할 수 없으므로 다른 대조 글이나 확인 가능한 기준 자료가 필요합니다.'));
  } catch (error) { issues.push(issue(error.code || 'CONTROL_SOURCE_MISMATCH', error.message)); }
  if (!expectedPeriods.gsc) issues.push(issue('CONTROL_PERIOD_REQUIRED', '변경 전 GSC 기간 길이를 확인할 수 없습니다.'));
  const history = historyCheck(row, control, treatment);
  issues.push(...history.issues);
  return { registered: false, baselineId: row.id, treatment: { ...treatment, deployedAt: row.deployed_at },
    control: { ...control, before }, expectedPeriods,
    registrationTiming: expectedPeriods.gsc ? registrationTiming(expectedPeriods, nowIso(), row.deployed_at) : null,
    history, issues, canRegister: issues.length === 0, limitations };
}

function registerControl(id, input = {}) {
  const row = baselineRow(id);
  if (db.prepare('SELECT baseline_id FROM comparison_controls WHERE baseline_id=?').get(row.id)) throw fail('대조 글과 기준선은 이미 등록되어 있으며 덮어쓰지 않습니다.', 'CONTROL_ALREADY_REGISTERED', 409);
  const reason = String(input.selectionReason || '').trim();
  if (reason.length < 20 || reason.length > 2000) throw fail('대조 글 선정 이유와 두 글의 차이를 20~2000자로 기록해 주세요.', 'CONTROL_REASON_REQUIRED');
  const preview = previewControl(id, input.controlSlug);
  if (!preview.canRegister) throw fail(preview.issues.map(item => item.message).join(' '), 'CONTROL_NOT_ELIGIBLE');
  if (input.expectedSourceHash !== preview.control.sourceHash || input.expectedIndexEntryHash !== preview.control.indexEntryHash) throw fail('미리보기 이후 대조 글이 바뀌었습니다. 최신 원문·목록을 확인해 주세요.', 'CONTROL_STALE_PREVIEW', 409);
  const registeredAt = nowIso();
  const snapshot = { version: 1, baselineFingerprint: baselineFingerprint(row), expectedPeriods: preview.expectedPeriods,
    treatmentIdentity: preview.treatment,
    controlIdentity: { ...preview.control, before: undefined }, controlBefore: preview.control.before,
    controlBeforeFingerprint: snapshotHash(preview.control.before), history: preview.history };
  db.prepare(`INSERT INTO comparison_controls(baseline_id,control_slug,selection_reason,registered_at,registration_timing,snapshot_json)
    VALUES(?,?,?,?,?,?)`).run(row.id, input.controlSlug, reason, registeredAt, registrationTiming(preview.expectedPeriods, registeredAt, row.deployed_at), JSON.stringify(snapshot));
  return getControl(row.id);
}

function change(before, after, key) {
  const a = before?.[key], b = after?.[key];
  return a == null || b == null ? null : { before: a, after: b, change: b - a, rate: a === 0 ? null : (b - a) / Math.abs(a) };
}
function changes(before, after) {
  return { ...Object.fromEntries(['clicks', 'impressions', 'ctr', 'position'].map(key => [key, change(before?.gsc, after?.gsc, key)])),
    ...Object.fromEntries(['views', 'activeUsers', 'bounceRate'].map(key => [key, change(before?.ga4, after?.ga4, key)])) };
}
function periodMetadata(value) {
  return value ? { importId: value.importId, fileHash: value.fileHash || null, periodStart: value.periodStart, periodEnd: value.periodEnd,
    periodDays: value.periodDays, timeZone: value.timeZone, timeZoneAssumed: value.timeZoneAssumed,
    property: value.sourceScope?.property || null, searchType: value.sourceScope?.searchType || null } : null;
}

function getControl(id) {
  const saved = db.prepare('SELECT * FROM comparison_controls WHERE baseline_id=?').get(Number(id));
  if (!saved) return { registered: false, baselineId: Number(id) };
  const row = baselineRow(id), frozen = JSON.parse(saved.snapshot_json), issues = [];
  if (frozen.baselineFingerprint !== baselineFingerprint(row)) issues.push(issue('CONTROL_BASELINE_CHANGED', '등록 당시의 시험 기준선 또는 배포 기록이 바뀌어 비교를 보류합니다.'));
  let current = null, history = null;
  try {
    current = contentIdentity(saved.control_slug);
    const treatment = contentIdentity(row.guide_slug);
    history = historyCheck(row, current, treatment);
    if (!history.windowClosed && (current.sourceHash !== frozen.controlIdentity.sourceHash || current.indexEntryHash !== frozen.controlIdentity.indexEntryHash)) issues.push(issue('CONTROL_CONTENT_CHANGED', '등록 이후 대조 글의 원문 또는 목록이 바뀌어 비교를 보류합니다.'));
    if (!history.windowClosed && (treatment.sourceHash !== frozen.treatmentIdentity?.sourceHash || treatment.indexEntryHash !== frozen.treatmentIdentity?.indexEntryHash)) issues.push(issue('TREATMENT_CONTENT_CHANGED', '시험 배포 이후 수정 대상 글의 원문 또는 목록이 다시 바뀌어 단일 수정의 비교를 보류합니다.'));
    issues.push(...history.issues);
  } catch (error) { issues.push(issue(error.code || 'CONTROL_CONTENT_UNAVAILABLE', error.message)); }
  try {
    const reread = verifiedBefore(row, saved.control_slug);
    if (snapshotHash(reread) !== frozen.controlBeforeFingerprint) issues.push(issue('CONTROL_SOURCE_MISMATCH', '대조 글의 변경 전 수치 또는 원본 식별자가 등록 당시와 달라 비교를 보류합니다.'));
  } catch (error) { issues.push(issue(error.code || 'CONTROL_SOURCE_MISMATCH', error.message)); }
  if (saved.registration_timing !== 'before_window') issues.push(issue('CONTROL_LATE_REGISTRATION', '관찰 기간이 시작된 뒤 대조 글을 선정했습니다. 사후 선정 편향을 배제할 수 없어 자동 비교를 보류합니다.'));
  let treatmentAfter = null, controlAfter = null;
  if (!issues.length) {
    const performance = baselines.eligibleImport(row.before.gsc, 'gsc_performance', row.deployed_at, row.guide_slug, { expectedPeriod: frozen.expectedPeriods.gsc });
    const ga4 = row.before.ga4 && frozen.expectedPeriods.ga4
      ? baselines.eligibleImport(row.before.ga4, ['ga4_path_device', 'ga4_overview'], row.deployed_at, row.guide_slug, { expectedPeriod: frozen.expectedPeriods.ga4 }) : null;
    if (performance || ga4) {
      // Both sides receive the very same source objects, never independent latest selections.
      treatmentAfter = baselines.metricSnapshot(row.guide_slug, { performance, ga4 });
      controlAfter = baselines.metricSnapshot(saved.control_slug, { performance, ga4 });
    }
  }
  const sourceMismatch = issues.some(item => /SOURCE|BASELINE/.test(item.code));
  const hasComparableGsc = row.before.gsc?.hasData !== false && frozen.controlBefore.gsc?.hasData
    && treatmentAfter?.gsc?.hasData && controlAfter?.gsc?.hasData;
  const status = issues.length ? sourceMismatch ? 'source_mismatch' : 'confounded' : hasComparableGsc ? 'comparable' : 'waiting';
  return { registered: true, baselineId: row.id,
    treatment: { slug: row.guide_slug, title: row.topic, before: row.before, after: treatmentAfter, deployedAt: row.deployed_at },
    control: { ...frozen.controlIdentity, before: frozen.controlBefore, after: controlAfter },
    registeredAt: saved.registered_at, selectionReason: saved.selection_reason, registrationTiming: saved.registration_timing,
    expectedPeriods: frozen.expectedPeriods, status, issues, history,
    changes: issues.length || !hasComparableGsc ? null : { treatment: changes(row.before, treatmentAfter), control: changes(frozen.controlBefore, controlAfter) },
    measurementPeriods: Object.fromEntries(['gsc', 'ga4'].map(platform => [platform, { before: periodMetadata(row.before[platform]), after: periodMetadata(treatmentAfter?.[platform]) }])),
    dataIssues: !issues.length && treatmentAfter?.gsc && !hasComparableGsc ? [issue('CONTROL_ROWS_MISSING', '선택한 같은 GSC 보고서에서 두 글의 전후 행을 모두 확인하지 못했습니다. 누락은 0이 아니므로 변화 비교를 보류합니다.')] : [],
    limitations };
}

function listControls() {
  return db.prepare('SELECT baseline_id FROM comparison_controls ORDER BY registered_at DESC').all().map(row => getControl(row.baseline_id));
}

module.exports = { previewControl, registerControl, getControl, listControls };
