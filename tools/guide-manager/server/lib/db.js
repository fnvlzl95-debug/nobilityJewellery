const fs = require('fs');
const path = require('path');
const { config } = require('./config');
const { nowIso } = require('./utils');

const dbPath = path.join(config.dataDir, 'app.db');
let db;
try {
  const Database = require('better-sqlite3');
  db = new Database(dbPath);
} catch (_) {
  const { DatabaseSync } = require('node:sqlite');
  const raw = new DatabaseSync(dbPath);
  db = {
    exec: (sql) => raw.exec(sql),
    pragma: (value) => raw.exec(`PRAGMA ${value}`),
    prepare(sql) {
      const statement = raw.prepare(sql);
      return {
        run: (...args) => statement.run(...args),
        get: (...args) => statement.get(...args),
        all: (...args) => statement.all(...args),
      };
    },
    transaction(fn) {
      return (...args) => {
        const savepoint = `tx_${require('crypto').randomBytes(6).toString('hex')}`;
        raw.exec(`SAVEPOINT ${savepoint}`);
        try {
          const result = fn(...args);
          raw.exec(`RELEASE ${savepoint}`);
          return result;
        } catch (error) {
          raw.exec(`ROLLBACK TO ${savepoint}`);
          raw.exec(`RELEASE ${savepoint}`);
          throw error;
        }
      };
    },
    backup: null,
    close: () => raw.close(),
  };
}

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8'));

function ensureColumn(table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!columns.some((item) => item.name === column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

// 기존 로컬 DB도 새 진단 필드를 잃지 않고 점진적으로 확장한다.
ensureColumn('rank_snapshots', 'available', 'INTEGER DEFAULT 1');
ensureColumn('rank_snapshots', 'competing_rank', 'INTEGER');
ensureColumn('rank_snapshots', 'competing_url', 'TEXT');
// 반영 이력이 걸린 작업은 지울 수 없으므로 목록에서만 숨긴다.
ensureColumn('generations', 'archived_at', 'TEXT');
ensureColumn('generations', 'revision', 'INTEGER NOT NULL DEFAULT 0');
// GA4 페이지 경로×기기 보고서를 제목 보고서와 함께 보존한다.
ensureColumn('ga4_pages', 'page_path', 'TEXT');
ensureColumn('ga4_pages', 'device', 'TEXT');
// 문서 표기일뿐 아니라 실제 저장소 최종 변경일도 D+31 관찰 기준으로 사용한다.
ensureColumn('guides', 'repository_changed_at', 'TEXT');
// 이미지 장면 다양성과 캐시 안전성을 기존 DB에서도 추적한다.
ensureColumn('image_assets', 'archetype', 'TEXT');
ensureColumn('image_assets', 'content_hash', 'TEXT');
ensureColumn('image_assets', 'width', 'INTEGER');
ensureColumn('image_assets', 'height', 'INTEGER');

ensureColumn('content_baselines', 'deployed_at', 'TEXT');
ensureColumn('content_baselines', 'deployment_commit', 'TEXT');

const getStmt = db.prepare('SELECT value FROM settings WHERE key = ?');
const setStmt = db.prepare(`
  INSERT INTO settings (key, value, secret, updated_at) VALUES (?, ?, ?, ?)
  ON CONFLICT(key) DO UPDATE SET value = excluded.value, secret = excluded.secret, updated_at = excluded.updated_at
`);

function getSetting(key, fallback = null) {
  const row = getStmt.get(key);
  return row ? row.value : fallback;
}

function setSetting(key, value, { secret = false } = {}) {
  setStmt.run(key, String(value), secret ? 1 : 0, nowIso());
}

module.exports = { db, dbPath, getSetting, setSetting };
