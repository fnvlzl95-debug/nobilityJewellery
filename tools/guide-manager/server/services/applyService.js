const fs = require('fs');
const path = require('path');
const { execFileSync, spawn } = require('child_process');
const { diffLines } = require('diff');
const { db } = require('../lib/db');
const { config } = require('../lib/config');
const { fileHash, nowIso, sha256 } = require('../lib/utils');
const { gitExecutable, nodeExecutable, npmCliPath } = require('../lib/executables');
const { siteRoot, guideIndexPath, getGuide, scanInventory, PROTECTED_SLUGS, parseGuidePosts } = require('./inventoryService');
const { getGeneration, updateGeneration, assertDraftImages, assertSelectedEvidence } = require('./generationService');
const { renderNewGuide, patchExistingGuide, patchGuideIndex } = require('./rendererService');
const { lintDraft } = require('./lintService');
const { reconcileGa4Mappings } = require('./analyticsService');
const { metricSnapshot, recordBaseline } = require('./baselineService');
const { clusterFilePath, buildClusterChange, assertNewGuideConnection } = require('./clusterService');

function atomicWrite(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temp = `${filePath}.guide-manager-${process.pid}.tmp`;
  fs.writeFileSync(temp, content);
  fs.renameSync(temp, filePath);
}

function managedHash(filePath) {
  return db.prepare('SELECT managed_hash AS managedHash FROM file_states WHERE file_path=?').get(filePath)?.managedHash || null;
}

function gitStatus(filePath) {
  const relative = path.relative(siteRoot(), filePath).replace(/\\/g, '/');
  try { return execFileSync(gitExecutable(), ['status', '--porcelain', '--', relative], { cwd: siteRoot(), encoding: 'utf8', windowsHide: true }).trim(); }
  catch (cause) { throw Object.assign(new Error('Git 상태를 확인하지 못해 반영을 중단했습니다'), { status: 503, cause }); }
}

function assertNoExternalDirty(filePath, { allowMissing = false } = {}) {
  if (allowMissing && !fs.existsSync(filePath)) return;
  const status = gitStatus(filePath);
  if (!status) return;
  const current = fileHash(filePath);
  if (managedHash(filePath) === current) return;
  const error = new Error(`사용자가 수정한 파일과 겹칩니다: ${path.relative(siteRoot(), filePath)} (${status})`);
  error.status = 409;
  throw error;
}

function buildDesiredFiles(generation) {
  const draft = generation.humanized || generation.draft;
  if (!draft) throw new Error('반영할 원고가 없습니다');
  if (PROTECTED_SLUGS.has(draft.slug) || generation.target_slug && getGuide(generation.target_slug)?.isCustom) throw new Error('커스텀 가이드는 자동 반영할 수 없습니다');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug || '')) throw new Error('안전하지 않은 가이드 slug입니다');
  if (generation.kind === 'update' && draft.slug !== generation.target_slug) throw new Error('수정 대상 slug는 변경할 수 없습니다');
  const root = siteRoot();
  const pagePath = path.join(root, 'pages', 'guide', `${draft.slug}.vue`);
  const indexPath = guideIndexPath();
  const isNew = generation.kind === 'new';
  const currentPage = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : '';
  if (isNew && currentPage) throw new Error(`이미 존재하는 slug입니다: ${draft.slug}`);
  if (!isNew && !currentPage) throw new Error(`수정할 페이지 파일이 없습니다: ${pagePath}`);
  const pageContent = isNew ? renderNewGuide(draft) : patchExistingGuide(currentPage, draft, { policy: require('./updatePolicyService').policyFor(generation) });
  const currentIndex = fs.readFileSync(indexPath, 'utf8');
  const indexContent = patchGuideIndex(currentIndex, draft, { isNew });
  const clusterChange = isNew ? buildClusterChange(draft, generation.input?.topicDecision) : null;
  const usedImages = new Set([draft.heroImage, ...(draft.sections || []).map(section => section.image)].filter(Boolean).map(image => image.path));
  const images = db.prepare(`
    SELECT slot, local_path AS localPath, public_path AS publicPath FROM image_assets
    WHERE generation_id=? AND status='active' ORDER BY id
  `).all(generation.id).filter(row => usedImages.has(row.publicPath)).map((row) => ({ ...row, targetPath: path.join(root, 'public', row.publicPath.replace(/^\//, '').replace(/\//g, path.sep)) }));
  for (const image of images) {
    if (!/^\/Image\/guide\/[a-zA-Z0-9_-]+\.webp$/.test(image.publicPath || '')) throw new Error('이미지 경로가 허용 범위를 벗어났습니다');
    const relative = path.relative(path.join(config.dataDir, 'images'), image.localPath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('이미지 원본 경로가 허용 범위를 벗어났습니다');
  }
  return {
    draft,
    isNew,
    textFiles: [
      { path: pagePath, before: currentPage, after: pageContent },
      { path: indexPath, before: currentIndex, after: indexContent },
      ...(clusterChange ? [clusterChange] : []),
    ],
    images,
    clusterSuggestion: clusterChange?.proposal || null,
  };
}

function preview(id) {
  const generation = getGeneration(id);
  if (!generation) throw new Error('생성 작업을 찾을 수 없습니다');
  const desired = buildDesiredFiles(generation);
  return {
    files: desired.textFiles.map((file) => ({
      path: path.relative(siteRoot(), file.path).replace(/\\/g, '/'),
      added: !file.before,
      changes: diffLines(file.before, file.after).map((part) => ({ added: !!part.added, removed: !!part.removed, value: part.value })),
    })),
    images: desired.images.map((image) => ({ slot: image.slot, path: path.relative(siteRoot(), image.targetPath).replace(/\\/g, '/') })),
    clusterSuggestion: desired.clusterSuggestion,
  };
}

function validateHashes(generation, desired) {
  const indexPath = guideIndexPath();
  const entry = generation.target_slug ? parseGuidePosts(fs.readFileSync(indexPath, 'utf8')).find(post => post.slug === generation.target_slug) : null;
  const unchangedEntry = generation.input.baseIndexEntryHash && entry && sha256(entry.block) === generation.input.baseIndexEntryHash;
  // A new page is inserted into the current index, not an old whole-file snapshot.
  // Unrelated manager publications therefore do not invalidate its paid draft/images.
  // Existing slug collisions and uncommitted external edits are checked separately.
  if (!desired.isNew && fileHash(indexPath) !== generation.input.baseIndexHash && !unchangedEntry) {
    const error = new Error('가이드 목록이 작업 시작 후 변경됐습니다. 새 작업을 만들어 최신 목록 기준으로 다시 검토해 주세요');
    error.status = 409;
    throw error;
  }
  if (!desired.isNew && desired.clusterSuggestion && generation.input.baseClusterHash && fileHash(clusterFilePath()) !== generation.input.baseClusterHash) {
    const error = new Error('가이드 클러스터가 작업 시작 후 변경됐습니다. 최신 클러스터 기준으로 새 작업을 만들어 주세요');
    error.status = 409;
    throw error;
  }
  if (!desired.isNew && fileHash(desired.textFiles[0].path) !== generation.base_source_hash) {
    const error = new Error('대상 가이드가 작업 시작 후 변경됐습니다. 덮어쓰지 않고 중단합니다');
    error.status = 409;
    throw error;
  }
}

function backupFiles(applyId, desired) {
  const backupDir = path.join(config.dataDir, 'applies', String(applyId), 'backup');
  fs.mkdirSync(backupDir, { recursive: true });
  const manifest = [];
  for (const file of [...desired.textFiles.map((item) => item.path), ...desired.images.map((item) => item.targetPath)]) {
    const relative = path.relative(siteRoot(), file);
    const existed = fs.existsSync(file);
    const backupPath = path.join(backupDir, relative);
    if (existed) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(file, backupPath);
    }
    const text = desired.textFiles.find(item => item.path === file);
    const image = desired.images.find(item => item.targetPath === file);
    manifest.push({ file, relative, existed, beforeHash: fileHash(file), writtenHash: text ? sha256(text.after) : fileHash(image.localPath), backupPath: existed ? backupPath : null });
  }
  fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  return { backupDir, manifest };
}

function restore(manifest) {
  for (const item of manifest) {
    const current = fileHash(item.file);
    if (!item.writtenHash || (current !== item.writtenHash && current !== item.beforeHash)) throw Object.assign(new Error(`반영 중 외부에서 변경된 파일이 있어 자동 복원을 멈췄습니다: ${item.relative}`), { status: 409 });
  }
  for (const item of manifest) {
    if (item.existed) {
      fs.mkdirSync(path.dirname(item.file), { recursive: true });
      fs.copyFileSync(item.backupPath, item.file);
    } else if (fs.existsSync(item.file)) {
      fs.unlinkSync(item.file);
    }
  }
}

function runValidation(command) {
  // Windows 셸/ComSpec 문자열이 손상돼도 npm CLI를 Node로 직접 실행해 검증을 보장한다.
  const npmCli = npmCliPath();
  const executable = npmCli ? nodeExecutable() : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const args = npmCli ? [npmCli, 'run', command] : ['run', command];
  return new Promise((resolve) => {
    let stdout = '', stderr = '', failure = null;
    const child = spawn(executable, args, { cwd: siteRoot(), windowsHide: true, shell: false });
    child.stdout.on('data', chunk => { stdout = (stdout + chunk).slice(-12000); });
    child.stderr.on('data', chunk => { stderr = (stderr + chunk).slice(-12000); });
    const timeout = setTimeout(() => {
      failure = '검증 제한 시간 12분 초과';
      if (process.platform === 'win32') spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true });
      else child.kill('SIGKILL');
    }, 12 * 60 * 1000);
    child.on('error', error => { failure = error.message; });
    child.on('close', status => { clearTimeout(timeout); resolve({ command, ok: status === 0 && !failure, status, stdout, stderr, error: failure }); });
  });
}

function recordManaged(filePath) {
  const hash = fileHash(filePath);
  db.prepare(`
    INSERT INTO file_states (file_path, observed_hash, managed_hash, observed_at, managed_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(file_path) DO UPDATE SET observed_hash=excluded.observed_hash, managed_hash=excluded.managed_hash,
      observed_at=excluded.observed_at, managed_at=excluded.managed_at
  `).run(filePath, hash, hash, nowIso(), nowIso());
}

async function apply(id) {
  if (db.prepare("SELECT id FROM applies WHERE state IN ('running','recovery_required') LIMIT 1").get()) throw Object.assign(new Error('다른 반영 작업이 진행 중이거나 중단되었습니다. 반영 이력을 확인해 주세요'), { status: 409 });
  const generation = getGeneration(id);
  if (!generation) throw new Error('생성 작업을 찾을 수 없습니다');
  if (generation.status !== 'approved') throw new Error('먼저 원고와 이미지를 검수하고 승인해 주세요');
  const draft = generation.humanized || generation.draft;
  require('./updatePolicyService').assertUpdatePolicy(generation, { draft, phase: 'apply' });
  assertSelectedEvidence(generation, draft);
  assertNewGuideConnection(generation, draft);
  const lint = lintDraft(draft, { targetSlug: generation.target_slug, generationId: generation.id, requireImage: true, allowWithoutOfficial: !!generation.input?.allowWithoutOfficial });
  if (lint.blocking) throw new Error('차단 검사가 남아 있어 반영할 수 없습니다');
  assertDraftImages(generation);
  const baseline = metricSnapshot(draft.slug);
  const desired = buildDesiredFiles(generation);
  validateHashes(generation, desired);
  for (const file of desired.textFiles) assertNoExternalDirty(file.path, { allowMissing: desired.isNew && file === desired.textFiles[0] });
  for (const image of desired.images) assertNoExternalDirty(image.targetPath, { allowMissing: true });
  const stamp = nowIso();
  const previewData = preview(id);
  const applyRow = db.prepare(`
    INSERT INTO applies (generation_id, state, files_json, diff_json, created_at)
    VALUES (?, 'running', ?, ?, ?)
  `).run(id, JSON.stringify([...desired.textFiles.map((f) => f.path), ...desired.images.map((i) => i.targetPath)]), JSON.stringify(previewData), stamp);
  const applyId = Number(applyRow.lastInsertRowid);
  let backup;
  try {
    backup = backupFiles(applyId, desired);
    db.prepare('UPDATE applies SET backup_dir=? WHERE id=?').run(backup.backupDir, applyId);
    for (const file of desired.textFiles) atomicWrite(file.path, file.after);
    for (const image of desired.images) {
      if (!fs.existsSync(image.localPath)) throw new Error(`생성 이미지 원본이 없습니다: ${image.localPath}`);
      fs.mkdirSync(path.dirname(image.targetPath), { recursive: true });
      atomicWrite(image.targetPath, fs.readFileSync(image.localPath));
    }
    const validation = [];
    for (const command of ['typecheck', 'build', 'verify:seo']) {
      const result = await runValidation(command);
      db.prepare('UPDATE applies SET validation_json=? WHERE id=?').run(JSON.stringify([...validation, result]), applyId);
      validation.push(result);
      if (!result.ok) throw Object.assign(new Error(`${command} 검사 실패`), { validation });
    }
    for (const item of backup.manifest) if (fileHash(item.file) !== item.writtenHash) throw new Error(`검증 중 파일이 변경됐습니다: ${item.relative}`);
    for (const file of [...desired.textFiles.map((item) => item.path), ...desired.images.map((item) => item.targetPath)]) recordManaged(file);
    db.prepare(`UPDATE applies SET state='done', validation_json=?, finished_at=? WHERE id=?`).run(JSON.stringify(validation), nowIso(), applyId);
    updateGeneration(id, { status: 'applied', error: null });
    scanInventory();
    reconcileGa4Mappings();
    recordBaseline(id, draft.slug, baseline);
    return { applyId, state: 'done', validation, files: previewData.files.map((file) => file.path), images: previewData.images };
  } catch (error) {
    try { if (backup) restore(backup.manifest); }
    catch (recoveryError) {
      db.prepare("UPDATE applies SET state='recovery_required', error=?, finished_at=? WHERE id=?").run(recoveryError.message, nowIso(), applyId);
      updateGeneration(id, { status: 'review', error: recoveryError.message });
      throw recoveryError;
    }
    db.prepare(`UPDATE applies SET state='rolled_back', validation_json=?, error=?, finished_at=? WHERE id=?`)
      .run(JSON.stringify(error.validation || []), error.message, nowIso(), applyId);
    updateGeneration(id, { status: 'approved', error: `반영 실패 후 복원됨: ${error.message}` });
    throw error;
  }
}

function listApplies() {
  return db.prepare(`
    SELECT a.id, a.generation_id AS generationId, a.state, a.files_json AS filesJson,
      a.validation_json AS validationJson, a.error, a.created_at AS createdAt, a.finished_at AS finishedAt,
      g.topic, g.target_slug AS targetSlug
    FROM applies a JOIN generations g ON g.id=a.generation_id ORDER BY a.id DESC LIMIT 50
  `).all().map((row) => ({ ...row, files: JSON.parse(row.filesJson || '[]'), validation: JSON.parse(row.validationJson || '[]'), filesJson: undefined, validationJson: undefined }));
}

function recoverApply(id) {
  const row = db.prepare("SELECT * FROM applies WHERE id=? AND state='recovery_required'").get(id);
  if (!row) throw Object.assign(new Error('복구 대기 중인 반영을 찾을 수 없습니다'), { status: 404 });
  const manifestPath = path.join(row.backup_dir || '', 'manifest.json');
  if (!row.backup_dir || !fs.existsSync(manifestPath)) throw Object.assign(new Error('백업 정보가 없습니다. 원본 파일을 직접 확인해야 합니다'), { status: 409 });
  restore(JSON.parse(fs.readFileSync(manifestPath, 'utf8')));
  db.prepare("UPDATE applies SET state='rolled_back', error=NULL, finished_at=? WHERE id=?").run(nowIso(), id);
  updateGeneration(row.generation_id, { status: 'approved', error: null });
  scanInventory();
  return { ok: true };
}

module.exports = { recoverApply, restore, preview, apply, listApplies, buildDesiredFiles, validateHashes, assertNoExternalDirty, runValidation };
