const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

function loadEnv(filePath = path.join(ROOT, '.env')) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

loadEnv();

const config = {
  root: ROOT,
  dataDir: path.resolve(process.env.GUIDE_MANAGER_DATA_DIR || path.join(ROOT, 'data')),
  host: '127.0.0.1',
  port: Number(process.env.PORT || 8788),
  siteRoot: path.resolve(process.env.SITE_ROOT || 'C:/Users/dbvision10/Documents/귀족/nobilityJewellery'),
  referenceAppPath: path.resolve(process.env.REFERENCE_APP_PATH || 'C:/Users/dbvision10/청소업체블로그관리'),
  downloadsDir: path.resolve(process.env.DOWNLOADS_DIR || 'C:/Users/dbvision10/Downloads'),
  humanizerDir: path.resolve(process.env.HUMANIZER_DIR || 'C:/Users/dbvision10/Documents/당근대학생/Backend'),
  humanizerUrl: process.env.HUMANIZER_URL || 'http://127.0.0.1:5055',
  openaiApiBase: process.env.OPENAI_API_BASE || 'https://api.openai.com/v1',
  defaultModel: 'gpt-5.6-luna',
  fallbackModel: 'gpt-5.6-terra',
  imageModel: 'gpt-image-2',
};

for (const dir of [config.dataDir, path.join(config.dataDir, 'logs'), path.join(config.dataDir, 'imports'), path.join(config.dataDir, 'images'), path.join(config.dataDir, 'applies'), path.join(config.dataDir, 'backups')]) {
  fs.mkdirSync(dir, { recursive: true });
}

module.exports = { config, loadEnv };
