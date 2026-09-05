const fs = require('fs');
const path = require('path');
const express = require('express');
const { config } = require('./lib/config');
const { db, dbPath } = require('./lib/db');
const log = require('./lib/logger');
const settings = require('./services/settingsService');
const inventory = require('./services/inventoryService');
const analytics = require('./services/analyticsService');
const humanizer = require('./services/humanizerService');
const api = require('./routes/api');

function initialize() {
  require('./services/jobService').recoverInterrupted();
  db.prepare("UPDATE applies SET state='recovery_required', error='서버 재시작으로 반영이 중단됐습니다. 백업 복구 후 다시 반영해 주세요' WHERE state='running'").run();
  db.prepare("UPDATE generations SET status='review', approved_at=NULL, error='서버 재시작으로 작업이 중단됐습니다. 내용을 확인한 뒤 다시 실행해 주세요' WHERE status IN ('generating','humanizing')").run();
  db.prepare("UPDATE image_assets SET status='error', error='서버 재시작으로 이미지 생성이 중단됐습니다' WHERE status='generating'").run();
  db.prepare("UPDATE content_audits SET status='stale', error='서버 재시작으로 분석이 중단됐습니다' WHERE status='analyzing'").run();
  if (process.env.GUIDE_MANAGER_SKIP_EXTERNAL_BOOTSTRAP !== '1') settings.importReferenceCredentials();
  const inventoryResult = inventory.scanInventory();
  const imported = analytics.initialImport();
  analytics.reconcileGa4Mappings();
  log.info('startup', `가이드 ${inventoryResult.total}개 확인, 분석 파일 ${imported.length}개 확인`);
}

function backupDb() {
  try {
    const stamp = new Date().toISOString().slice(0, 10);
    const target = path.join(config.dataDir, 'backups', `app-${stamp}.db`);
    if (!fs.existsSync(target)) {
      if (typeof db.backup === 'function') db.backup(target).catch((error) => log.warn('backup', 'DB 백업 실패', error));
      else db.exec("VACUUM INTO '" + target.replace(/'/g, "''") + "'");
    }
  } catch (error) { log.warn('backup', 'DB 백업 실패', error); }
}

initialize();
backupDb();
setInterval(backupDb, 24 * 60 * 60 * 1000).unref();
if (process.env.GUIDE_MANAGER_SKIP_EXTERNAL_BOOTSTRAP !== '1') humanizer.ensureUp().then(() => log.info('humanizer', 'Humanizing Engine 준비 완료')).catch((error) => log.warn('humanizer', '자동 시작 보류', error));

const app = express();
app.disable('x-powered-by');
app.use(require('./lib/localSecurity').localSecurity());
app.use(express.json({ limit: '8mb' }));
app.use('/api', api);
app.use('/generated-images', express.static(path.join(config.dataDir, 'images'), { fallthrough: false, immutable: false, maxAge: 0 }));

const dist = path.join(config.root, 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api|\/generated-images).*/, (req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('/', (req, res) => res.status(503).send('관리 화면이 아직 빌드되지 않았습니다. npm run build를 실행해 주세요.'));
}

app.use((error, req, res, next) => {
  log.error('api', `${req.method} ${req.path} 실패`, error);
  res.status(error.status || 500).json({ error: log.sanitize(error.message || '처리 중 오류가 발생했습니다'), code: error.code });
});

const server = app.listen(config.port, config.host, () => log.info('server', `http://${config.host}:${config.port} 실행 중`));
// 긴 작업은 실행 ID를 반환하므로 HTTP 요청 자체는 제한합니다.
server.requestTimeout = 60 * 1000;
server.keepAliveTimeout = 75 * 1000;
server.headersTimeout = 80 * 1000;
server.on('error', (error) => {
  log.error('server', `포트 ${config.port}를 열 수 없습니다`, error);
  process.exitCode = 1;
});

process.on('unhandledRejection', (error) => log.error('process', '처리되지 않은 Promise 오류', error));
process.on('uncaughtException', (error) => log.error('process', '처리되지 않은 예외', error));

module.exports = app;
