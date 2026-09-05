const fs = require('fs');
const path = require('path');
const { config } = require('../lib/config');
const { db, getSetting, setSetting } = require('../lib/db');
const { maskSecret, nowIso } = require('../lib/utils');
const log = require('../lib/logger');

const ALLOWED_MODELS = new Set(['gpt-5.6-luna', 'gpt-5.6-terra']);

function parseEnv(filePath) {
  const result = {};
  if (!fs.existsSync(filePath)) return result;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    result[match[1]] = value;
  }
  return result;
}

function readReferenceSetting(key) {
  const sourceDb = path.join(config.referenceAppPath, 'data', 'app.db');
  if (!fs.existsSync(sourceDb)) return null;
  try {
    let source;
    try {
      const Database = require('better-sqlite3');
      source = new Database(sourceDb, { readonly: true });
      const row = source.prepare('SELECT value FROM settings WHERE key = ?').get(key);
      source.close();
      return row ? row.value : null;
    } catch (_) {
      const { DatabaseSync } = require('node:sqlite');
      source = new DatabaseSync(sourceDb, { readOnly: true });
      const row = source.prepare('SELECT value FROM settings WHERE key = ?').get(key);
      source.close();
      return row ? row.value : null;
    }
  } catch (error) {
    log.warn('settings', `참고 프로젝트 설정 '${key}' 읽기 실패`, error);
    return null;
  }
}

function importReferenceCredentials({ force = false } = {}) {
  const imported = [];
  const refEnv = parseEnv(path.join(config.referenceAppPath, '.env'));
  const mappings = [
    ['openai_api_key', refEnv.OPENAI_API_KEY, true],
    ['openai_api_base', refEnv.OPENAI_API_BASE || config.openaiApiBase, false],
    ['naver_client_id', readReferenceSetting('naver_api_hub_client_id'), true],
    ['naver_client_secret', readReferenceSetting('naver_api_hub_client_secret'), true],
    ['humanizer_profile', readReferenceSetting('humanizer_profile') || 'v6_engine', false],
  ];
  for (const [key, value, secret] of mappings) {
    if (!value || (!force && getSetting(key))) continue;
    setSetting(key, value, { secret });
    imported.push(key);
  }
  if (!getSetting('openai_model')) setSetting('openai_model', config.defaultModel);
  if (!getSetting('openai_fallback_model')) setSetting('openai_fallback_model', config.fallbackModel);
  if (!getSetting('openai_image_model')) setSetting('openai_image_model', config.imageModel);
  if (!getSetting('site_root')) setSetting('site_root', config.siteRoot);
  if (!getSetting('humanizer_dir')) setSetting('humanizer_dir', config.humanizerDir);
  if (!getSetting('humanizer_url')) setSetting('humanizer_url', config.humanizerUrl);
  if (!getSetting('credentials_imported_at')) setSetting('credentials_imported_at', nowIso());
  if (imported.length) log.info('settings', `참고 프로젝트에서 ${imported.length}개 설정을 가져왔습니다`);
  return { imported };
}

function getCredentials() {
  return {
    openaiKey: getSetting('openai_api_key', process.env.OPENAI_API_KEY || ''),
    openaiBase: getSetting('openai_api_base', process.env.OPENAI_API_BASE || config.openaiApiBase),
    naverId: getSetting('naver_client_id', ''),
    naverSecret: getSetting('naver_client_secret', ''),
  };
}

function settingsStatus() {
  const credentials = getCredentials();
  const model = ALLOWED_MODELS.has(getSetting('openai_model')) ? getSetting('openai_model') : config.defaultModel;
  const fallback = ALLOWED_MODELS.has(getSetting('openai_fallback_model')) ? getSetting('openai_fallback_model') : config.fallbackModel;
  return {
    openai: { configured: !!credentials.openaiKey, masked: maskSecret(credentials.openaiKey), base: credentials.openaiBase },
    naver: { configured: !!(credentials.naverId && credentials.naverSecret), clientId: maskSecret(credentials.naverId), secret: maskSecret(credentials.naverSecret) },
    models: { default: model, fallback, image: getSetting('openai_image_model', config.imageModel), allowed: [...ALLOWED_MODELS] },
    paths: {
      siteRoot: getSetting('site_root', config.siteRoot),
      referenceApp: config.referenceAppPath,
      humanizerDir: getSetting('humanizer_dir', config.humanizerDir),
      humanizerUrl: getSetting('humanizer_url', config.humanizerUrl),
    },
    importedAt: getSetting('credentials_imported_at'),
  };
}

function updateSettings(input = {}) {
  if (input.humanizerUrl) {
    let url; try { url = new URL(input.humanizerUrl); } catch { /* checked below */ }
    if (!url || url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw Object.assign(new Error('Humanizer 주소는 이 PC의 HTTP 주소와 포트만 허용합니다'), { status: 422 });
  }
  if (input.siteRoot && (!fs.existsSync(path.join(path.resolve(input.siteRoot), 'data', 'guide-posts.ts')) || !fs.existsSync(path.join(path.resolve(input.siteRoot), 'nuxt.config.ts')))) throw Object.assign(new Error('귀족 사이트 저장소 폴더를 선택해 주세요'), { status: 422 });
  if (input.defaultModel) {
    if (!ALLOWED_MODELS.has(input.defaultModel)) throw new Error('원고 모델은 gpt-5.6-luna 또는 gpt-5.6-terra만 사용할 수 있습니다');
    setSetting('openai_model', input.defaultModel);
  }
  if (input.fallbackModel) {
    if (!ALLOWED_MODELS.has(input.fallbackModel)) throw new Error('보완 모델은 gpt-5.6-luna 또는 gpt-5.6-terra만 사용할 수 있습니다');
    setSetting('openai_fallback_model', input.fallbackModel);
  }
  if (input.openaiKey) setSetting('openai_api_key', input.openaiKey.trim(), { secret: true });
  if (input.naverId) setSetting('naver_client_id', input.naverId.trim(), { secret: true });
  if (input.naverSecret) setSetting('naver_client_secret', input.naverSecret.trim(), { secret: true });
  if (input.siteRoot) setSetting('site_root', path.resolve(input.siteRoot));
  if (input.humanizerDir) setSetting('humanizer_dir', path.resolve(input.humanizerDir));
  if (input.humanizerUrl) setSetting('humanizer_url', input.humanizerUrl.replace(/\/$/, ''));
  return settingsStatus();
}

function publicSettingsRows() {
  return db.prepare('SELECT key, secret, updated_at FROM settings ORDER BY key').all();
}

module.exports = { ALLOWED_MODELS, importReferenceCredentials, getCredentials, settingsStatus, updateSettings, publicSettingsRows, parseEnv };
