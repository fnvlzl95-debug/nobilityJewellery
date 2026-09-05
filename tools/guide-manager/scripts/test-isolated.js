const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

// Never let a test open the operator's app.db, even when started from the desktop app.
process.env.GUIDE_MANAGER_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-manager-test-'));
const candidate = path.resolve(__dirname, '../../..');
if (fs.existsSync(path.join(candidate, 'nuxt.config.ts'))) process.env.SITE_ROOT = candidate;
const { config } = require('../server/lib/config');
const { db } = require('../server/lib/db');
require('../server/services/inventoryService').scanInventory();
require('../server/services/analyticsService').initialImport();
fs.mkdirSync(path.join(config.dataDir, 'manual-imports'), { recursive: true });
fs.copyFileSync(path.join(__dirname, '../test/fixtures/gsc-indexing-2026-08-21.csv'), path.join(config.dataDir, 'manual-imports/gsc-indexing-2026-08-21.csv'));
db.close();
const tests = fs.readdirSync(path.join(__dirname, '../test')).filter(file => file.endsWith('.test.js')).map(file => path.join(__dirname, '../test', file));
const result = spawnSync(process.execPath, ['--test', '--test-concurrency=1', ...tests], { env: process.env, stdio: 'inherit', windowsHide: true });
process.exitCode = result.status ?? 1;
