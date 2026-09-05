const { db } = require('../lib/db');

function numeric(row, camel, snake = camel) {
  const value = row[camel] ?? row[snake];
  return value == null || !Number.isFinite(Number(value)) ? null : Number(value);
}

// Users are not additive across devices/pages. These exports contain no session
// denominator, so a multi-row bounce/engagement rate cannot be reconstructed.
function aggregateGa4Rows(rows = []) {
  const single = rows.length === 1 ? rows[0] : null;
  const sum = (camel, snake) => rows.reduce((total, row) => total + (numeric(row, camel, snake) || 0), 0);
  return {
    views: sum('views'), events: sum('events'),
    activeUsers: single ? numeric(single, 'activeUsers', 'active_users') : null,
    bounceRate: single ? numeric(single, 'bounceRate', 'bounce_rate') : null,
    engagedSessions: sum('engagedSessions', 'engaged_sessions'),
    engagementRate: single ? numeric(single, 'engagementRate', 'engagement_rate') : null,
    avgEngagementSeconds: single ? numeric(single, 'avgEngagementSeconds', 'avg_engagement_seconds') : null,
    keyEvents: sum('keyEvents', 'key_events'),
    rows: rows.length,
    aggregationNote: rows.length > 1 ? '사용자 중복과 세션 분모를 확인할 수 없어 사용자 수·비율·평균은 합산하지 않았습니다.' : null,
  };
}

function groupGa4BySlug(rows = []) {
  const grouped = new Map();
  for (const row of rows) {
    const slug = row.slug ?? row.guide_slug ?? row.guideSlug;
    if (!slug) continue;
    if (!grouped.has(slug)) grouped.set(slug, []);
    grouped.get(slug).push(row);
  }
  return new Map([...grouped].map(([slug, values]) => [slug, { slug, ...aggregateGa4Rows(values) }]));
}

function loadGa4Metrics(importId) {
  return groupGa4BySlug(importId ? db.prepare('SELECT * FROM ga4_pages WHERE import_id=? AND guide_slug IS NOT NULL').all(importId) : []);
}

module.exports = { aggregateGa4Rows, groupGa4BySlug, loadGa4Metrics };
