const { db } = require('../lib/db');
const { clamp, normalizeUrl } = require('../lib/utils');
const { latestImport, latestGa4PagesImport } = require('./analyticsService');

function expectedCtr(position) {
  const p = Number(position || 100);
  if (p <= 3) return 0.1;
  if (p <= 5) return 0.06;
  if (p <= 10) return 0.03;
  if (p <= 20) return 0.015;
  return 0.01;
}

function normalizedTokens(value) {
  return new Set(String(value || '').toLowerCase().replace(/[^a-z0-9가-힣]+/g, ' ').split(/\s+/).filter((x) => x.length > 1));
}

function jaccard(a, b) {
  const left = normalizedTokens(a);
  const right = normalizedTokens(b);
  if (!left.size && !right.size) return 1;
  let common = 0;
  for (const token of left) if (right.has(token)) common++;
  return common / Math.max(1, new Set([...left, ...right]).size);
}

function businessScore(keyword, category) {
  const value = `${keyword || ''} ${category || ''}`;
  if (/(예물|결혼|커플링|주문제작|수리|매입|돌반지)/.test(value)) return 85;
  if (/(가격|비용|기간|사이즈|목걸이|반지)/.test(value)) return 72;
  if (/(관리|보석|다이아|진주|사파이어|루비)/.test(value)) return 58;
  return 50;
}

function latestRankMap() {
  const rows = db.prepare(`
    SELECT rk.guide_slug AS slug, rs.rank, rs.found, rs.available, rs.checked_at AS checkedAt,
      rs.competing_rank AS competingRank, rs.competing_url AS competingUrl,
      rs.trend_ratio AS trendRatio, rs.trend_direction AS trendDirection
    FROM rank_keywords rk
    JOIN rank_snapshots rs ON rs.id = (
      SELECT id FROM rank_snapshots WHERE keyword_id = rk.id ORDER BY checked_at DESC, id DESC LIMIT 1
    )
  `).all();
  return new Map(rows.map((row) => [row.slug, row]));
}

function pageOpportunities() {
  const performance = latestImport('gsc_performance');
  const ga4 = latestGa4PagesImport();
  const naverWebImport = latestImport('naver_web_performance');
  const guides = db.prepare('SELECT slug, path, title, page_title AS pageTitle, keyword, category, is_custom AS isCustom FROM guides').all();
  if (!performance) return [];
  const gscRows = db.prepare(`
    SELECT normalized_url AS normalizedUrl, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions) > 0 THEN CAST(SUM(clicks) AS REAL) / SUM(impressions) ELSE 0 END AS ctr,
      CASE WHEN SUM(impressions) > 0 THEN SUM(position * impressions) / SUM(impressions) ELSE AVG(position) END AS position,
      COUNT(*) AS variants
    FROM gsc_pages WHERE import_id = ? GROUP BY normalized_url
  `).all(performance.id);
  const gscMap = new Map(gscRows.map((row) => [row.normalizedUrl, row]));
  const ga4Rows = ga4 ? db.prepare(`
    SELECT guide_slug AS slug, SUM(views) AS views, SUM(active_users) AS activeUsers,
      SUM(events) AS events, CASE WHEN COUNT(*)=1 THEN MAX(bounce_rate) ELSE NULL END AS bounceRate
    FROM ga4_pages WHERE import_id = ? AND guide_slug IS NOT NULL GROUP BY guide_slug
  `).all(ga4.id) : [];
  const ga4Map = new Map(ga4Rows.map((row) => [row.slug, row]));
  const naverWebRows = naverWebImport ? db.prepare(`
    SELECT normalized_url AS normalizedUrl, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
      CASE WHEN SUM(impressions)>0 THEN CAST(SUM(clicks) AS REAL)/SUM(impressions) ELSE AVG(ctr) END AS ctr
    FROM naver_web_pages WHERE import_id=? GROUP BY normalized_url
  `).all(naverWebImport.id) : [];
  const naverWebMap = new Map(naverWebRows.map((row) => [row.normalizedUrl, row]));
  const rankMap = latestRankMap();
  const maxImpressions = Math.max(1, ...gscRows.map((row) => row.impressions || 0));
  const maxViews = Math.max(1, ...ga4Rows.map((row) => row.views || 0));
  const maxNaverImpressions = Math.max(1, ...naverWebRows.map((row) => row.impressions || 0));

  return guides.map((guide) => {
    const url = normalizeUrl(`https://noblessegold.com${guide.path}`);
    const gsc = gscMap.get(url) || { clicks: 0, impressions: 0, ctr: 0, position: null, variants: 0 };
    const ga = ga4Map.get(guide.slug) || { views: 0, activeUsers: 0, events: 0, bounceRate: null };
    const rank = rankMap.get(guide.slug) || null;
    const naverWeb = naverWebMap.get(url) || null;
    const expected = expectedCtr(gsc.position);
    const ctrGap = expected > 0 ? clamp((expected - gsc.ctr) / expected, 0, 1) : 0;
    const impressionScale = Math.log1p(gsc.impressions) / Math.log1p(maxImpressions) * 100;
    const gscScore = clamp(impressionScale * (0.4 + 0.6 * ctrGap), 0, 100);
    const positionScore = gsc.position >= 3 && gsc.position <= 10 ? 100 : gsc.position != null && gsc.position <= 20 ? 70 : gsc.position ? 25 : 0;
    const viewScale = Math.log1p(ga.views) / Math.log1p(maxViews) * 100;
    const bounceFactor = ga.bounceRate == null ? 0.4 : clamp(ga.bounceRate, 0, 1);
    const gaScore = clamp(viewScale * (0.4 + 0.6 * bounceFactor), 0, 100);
    const rankScore = rank && rank.available !== 0 ? (rank.found ? clamp(110 - rank.rank * 5, 0, 100) : 70) : 50;
    const naverOverallCtr = Number(naverWebImport?.summary?.overallCtr || 0);
    const naverCtrGap = naverWeb && naverOverallCtr > 0 ? clamp((naverOverallCtr - naverWeb.ctr) / naverOverallCtr, 0, 1) : 0;
    const naverWebScale = naverWeb ? Math.log1p(naverWeb.impressions) / Math.log1p(maxNaverImpressions) * 100 : 0;
    const naverWebScore = naverWeb ? clamp(naverWebScale * (0.45 + 0.55 * naverCtrGap), 0, 100) : null;
    const naverScore = naverWebScore == null ? rankScore : rankScore * 0.6 + naverWebScore * 0.4;
    const bizScore = businessScore(guide.keyword, guide.category);
    const score = Math.round(gscScore * 0.45 + positionScore * 0.2 + gaScore * 0.15 + naverScore * 0.1 + bizScore * 0.1);
    let type = '내부링크 강화';
    let reason = '콘텐츠 반응과 검색 노출을 함께 확인하세요.';
    if (gsc.impressions >= 40 && gsc.ctr < 0.02 && gsc.position >= 3 && gsc.position <= 20) {
      type = 'CTR 개선';
      reason = `노출 ${gsc.impressions.toLocaleString()}회, CTR ${(gsc.ctr * 100).toFixed(2)}%, 평균 ${Number(gsc.position).toFixed(1)}위입니다.`;
    } else if (naverWeb && naverWeb.impressions >= 100 && naverOverallCtr > 0 && naverWeb.ctr < naverOverallCtr) {
      type = 'CTR 개선';
      reason = `Naver 웹검색 TOP 30 노출 ${naverWeb.impressions.toLocaleString()}회, CTR ${(naverWeb.ctr * 100).toFixed(1)}%입니다.`;
    } else if (ga.views >= 10 && ga.bounceRate >= 0.35) {
      type = '본문 보강';
      reason = `조회 ${ga.views.toLocaleString()}회, 이탈률 ${(ga.bounceRate * 100).toFixed(1)}%입니다.`;
    } else if (ga.views >= 5 && gsc.impressions < 40) {
      type = '내부링크 강화';
      reason = '사이트 내 소비는 있으나 검색 노출이 아직 적습니다.';
    }
    return {
      slug: guide.slug,
      path: guide.path,
      title: guide.title,
      keyword: guide.keyword,
      category: guide.category,
      isCustom: !!guide.isCustom,
      type,
      score,
      reason,
      metrics: {
        gsc: { clicks: gsc.clicks, impressions: gsc.impressions, ctr: gsc.ctr, position: gsc.position, variants: gsc.variants, expectedCtr: expected },
        ga4: ga,
        naver: rank,
        naverWeb: naverWeb ? { ...naverWeb, listed: true, top30Only: true, overallCtr: naverOverallCtr } : { listed: false, top30Only: true, overallCtr: naverOverallCtr },
      },
      breakdown: { gsc: Math.round(gscScore), position: Math.round(positionScore), ga4: Math.round(gaScore), naver: Math.round(naverScore), business: bizScore },
    };
  }).filter((row) => row.metrics.gsc.impressions || row.metrics.ga4.views || row.metrics.naverWeb.listed)
    .sort((a, b) => b.score - a.score || b.metrics.gsc.impressions - a.metrics.gsc.impressions);
}

function newTopicOpportunities() {
  const performance = latestImport('gsc_performance');
  if (!performance) return [];
  const guides = db.prepare('SELECT slug, title, keyword FROM guides').all();
  const rows = db.prepare(`
    SELECT query, clicks, impressions, ctr, position FROM gsc_queries
    WHERE import_id = ? AND impressions >= 10 ORDER BY impressions DESC
  `).all(performance.id);
  return rows.map((row) => {
    const nearest = guides.map((guide) => ({ guide, similarity: Math.max(jaccard(row.query, guide.keyword), jaccard(row.query, guide.title)) }))
      .sort((a, b) => b.similarity - a.similarity)[0];
    return {
      type: nearest && nearest.similarity >= 0.65 ? '중복 검토' : '신규 주제',
      query: row.query,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position,
      nearestGuide: nearest ? { slug: nearest.guide.slug, title: nearest.guide.title, similarity: Number(nearest.similarity.toFixed(2)) } : null,
    };
  }).filter((row) => row.type === '신규 주제' || row.impressions >= 20).slice(0, 30);
}

function summary() {
  const pageRows = pageOpportunities();
  const counts = Object.fromEntries(['CTR 개선', '본문 보강', '내부링크 강화', '기술 우선'].map((type) => [type, pageRows.filter((row) => row.type === type).length]));
  return { pageRows, newTopics: newTopicOpportunities(), counts };
}

module.exports = { expectedCtr, jaccard, businessScore, pageOpportunities, newTopicOpportunities, summary };
