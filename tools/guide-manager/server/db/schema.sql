PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  secret INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS guides (
  slug TEXT PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  page_title TEXT,
  description TEXT,
  keyword TEXT,
  image TEXT,
  category TEXT,
  published_at TEXT,
  updated_at TEXT,
  repository_changed_at TEXT,
  source_path TEXT NOT NULL,
  source_hash TEXT,
  is_custom INTEGER DEFAULT 0,
  source_json TEXT,
  scanned_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category, published_at DESC);

CREATE TABLE IF NOT EXISTS file_states (
  file_path TEXT PRIMARY KEY,
  observed_hash TEXT,
  managed_hash TEXT,
  observed_at TEXT NOT NULL,
  managed_at TEXT
);

CREATE TABLE IF NOT EXISTS analytics_imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_hash TEXT NOT NULL UNIQUE,
  period_start TEXT,
  period_end TEXT,
  parser_version TEXT NOT NULL,
  raw_path TEXT,
  summary_json TEXT,
  imported_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gsc_daily (
  import_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_gsc_daily_import ON gsc_daily(import_id, date);

CREATE TABLE IF NOT EXISTS gsc_queries (
  import_id INTEGER NOT NULL,
  query TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_gsc_queries_import ON gsc_queries(import_id, impressions DESC);

CREATE TABLE IF NOT EXISTS gsc_pages (
  import_id INTEGER NOT NULL,
  original_url TEXT NOT NULL,
  normalized_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_gsc_pages_normalized ON gsc_pages(import_id, normalized_url);

CREATE TABLE IF NOT EXISTS gsc_devices (
  import_id INTEGER NOT NULL,
  device TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gsc_coverage (
  import_id INTEGER NOT NULL,
  reason TEXT NOT NULL,
  source TEXT,
  validation TEXT,
  page_count INTEGER DEFAULT 0,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ga4_pages (
  import_id INTEGER NOT NULL,
  page_title TEXT NOT NULL,
  page_path TEXT,
  device TEXT,
  guide_slug TEXT,
  views INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  events INTEGER DEFAULT 0,
  bounce_rate REAL,
  mapping_state TEXT DEFAULT 'unmatched',
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ga4_pages_import ON ga4_pages(import_id, views DESC);

CREATE TABLE IF NOT EXISTS ga4_organic_pages (
  import_id INTEGER NOT NULL,
  page_path TEXT NOT NULL,
  guide_slug TEXT,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  active_users INTEGER DEFAULT 0,
  engaged_sessions INTEGER DEFAULT 0,
  engagement_rate REAL,
  avg_engagement_seconds REAL,
  events INTEGER DEFAULT 0,
  key_events REAL DEFAULT 0,
  mapping_state TEXT DEFAULT 'unmatched',
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ga4_organic_pages_import ON ga4_organic_pages(import_id, impressions DESC);
CREATE INDEX IF NOT EXISTS idx_ga4_organic_pages_slug ON ga4_organic_pages(import_id, guide_slug);

CREATE TABLE IF NOT EXISTS ga4_sources (
  import_id INTEGER NOT NULL,
  dimension TEXT NOT NULL,
  source_medium TEXT NOT NULL,
  value INTEGER DEFAULT 0,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ga4_retention (
  import_id INTEGER NOT NULL,
  day_index INTEGER NOT NULL,
  new_users INTEGER DEFAULT 0,
  returning_users INTEGER DEFAULT 0,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS naver_web_queries (
  import_id INTEGER NOT NULL,
  query TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_naver_web_queries_import ON naver_web_queries(import_id, impressions DESC);

CREATE TABLE IF NOT EXISTS naver_web_pages (
  import_id INTEGER NOT NULL,
  original_url TEXT NOT NULL,
  normalized_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  FOREIGN KEY(import_id) REFERENCES analytics_imports(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_naver_web_pages_import ON naver_web_pages(import_id, normalized_url);

CREATE TABLE IF NOT EXISTS generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  target_slug TEXT,
  kind TEXT NOT NULL DEFAULT 'new',
  topic TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'idea',
  input_json TEXT DEFAULT '{}',
  research_json TEXT,
  draft_json TEXT,
  humanized_json TEXT,
  lint_json TEXT,
  base_source_hash TEXT,
  error TEXT,
  approved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_generations_status ON generations(status, updated_at DESC);

CREATE TABLE IF NOT EXISTS model_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id INTEGER,
  stage TEXT NOT NULL,
  requested_model TEXT NOT NULL,
  effective_model TEXT,
  reasoning_effort TEXT,
  fallback_reason TEXT,
  status TEXT NOT NULL,
  usage_json TEXT,
  latency_ms INTEGER,
  error TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(generation_id) REFERENCES generations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS humanize_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id INTEGER NOT NULL,
  engine_profile TEXT NOT NULL,
  engine_version TEXT,
  status TEXT NOT NULL,
  before_text TEXT,
  after_text TEXT,
  facts_json TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(generation_id) REFERENCES generations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS image_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id INTEGER NOT NULL,
  slot TEXT NOT NULL,
  section_index INTEGER,
  prompt TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  local_path TEXT,
  public_path TEXT,
  model TEXT,
  usage_json TEXT,
  archetype TEXT,
  content_hash TEXT,
  width INTEGER,
  height INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(generation_id) REFERENCES generations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rank_keywords (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guide_slug TEXT,
  keyword TEXT NOT NULL,
  active INTEGER DEFAULT 1,
  last_checked_at TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(guide_slug, keyword)
);

CREATE TABLE IF NOT EXISTS rank_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword_id INTEGER NOT NULL,
  checked_at TEXT NOT NULL,
  available INTEGER DEFAULT 1,
  found INTEGER DEFAULT 0,
  rank INTEGER,
  total_results INTEGER,
  result_title TEXT,
  result_url TEXT,
  competing_rank INTEGER,
  competing_url TEXT,
  depth INTEGER DEFAULT 100,
  trend_ratio REAL,
  trend_direction TEXT,
  FOREIGN KEY(keyword_id) REFERENCES rank_keywords(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guide_slug TEXT NOT NULL,
  source_hash TEXT NOT NULL,
  gsc_import_id INTEGER NOT NULL DEFAULT 0,
  ga4_import_id INTEGER NOT NULL DEFAULT 0,
  coverage_import_id INTEGER NOT NULL DEFAULT 0,
  snapshot_json TEXT NOT NULL,
  ai_analysis_json TEXT,
  plan_json TEXT,
  plan_status TEXT NOT NULL DEFAULT 'suggested',
  status TEXT NOT NULL DEFAULT 'measured',
  model TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(guide_slug, source_hash, gsc_import_id, ga4_import_id, coverage_import_id),
  FOREIGN KEY(guide_slug) REFERENCES guides(slug) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_content_audits_latest ON content_audits(guide_slug, updated_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_content_audits_status ON content_audits(status, updated_at DESC);

CREATE TABLE IF NOT EXISTS applies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id INTEGER NOT NULL,
  state TEXT NOT NULL,
  files_json TEXT,
  backup_dir TEXT,
  diff_json TEXT,
  validation_json TEXT,
  error TEXT,
  created_at TEXT NOT NULL,
  finished_at TEXT,
  FOREIGN KEY(generation_id) REFERENCES generations(id)
);

CREATE TABLE IF NOT EXISTS content_baselines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id INTEGER NOT NULL UNIQUE,
  guide_slug TEXT NOT NULL,
  snapshot_json TEXT NOT NULL,
  applied_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(generation_id) REFERENCES generations(id)
);
CREATE INDEX IF NOT EXISTS idx_content_baselines_slug ON content_baselines(guide_slug, applied_at DESC);

CREATE TABLE IF NOT EXISTS model_evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_id TEXT NOT NULL,
  guide_slug TEXT NOT NULL,
  topic TEXT NOT NULL,
  model TEXT NOT NULL,
  schema_ok INTEGER DEFAULT 0,
  quality_score INTEGER DEFAULT 0,
  response_json TEXT,
  usage_json TEXT,
  latency_ms INTEGER,
  error TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_model_evaluations_batch ON model_evaluations(batch_id, model);
