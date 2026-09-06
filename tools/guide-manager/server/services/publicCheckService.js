const fs = require('fs');
const { db } = require('../lib/db');
const { sha256, nowIso, fileHash } = require('../lib/utils');
const inventory = require('./inventoryService');
const { extractGuideContent } = require('./contentExtractorService');
const robotsParser = require('robots-parser');
const { XMLParser, XMLValidator } = require('fast-xml-parser');

const ORIGIN = 'https://noblessegold.com';
const LIMITS = { html: 3 * 1024 * 1024, robots: 500 * 1024, sitemap: 3 * 1024 * 1024 };
const NOTE = '현재 시점의 공개 응답·제목·크롤링 설정을 확인한 기록입니다. 본문 전체 일치, 과거 커밋의 실제 배포 시각, Google 색인·순위·검색 효과를 증명하지 않습니다.';
const LABELS = { http: '공개 HTTP 응답', html: 'HTML 응답', title: '현재 원고 제목과 H1', canonical: '자기 canonical', indexing: '색인 차단 지시', robots: 'robots.txt Googlebot 접근', sitemap: 'sitemap.xml 수록' };
const check = (key, status, detail) => ({ key, label: LABELS[key], status, detail });
const normalizeText = value => String(value || '').normalize('NFC').replace(/\s+/g, ' ').trim();
const failure = (message, code, status = 422) => Object.assign(new Error(message), { code, status });

db.exec(`CREATE TABLE IF NOT EXISTS public_page_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT, guide_slug TEXT NOT NULL, url TEXT NOT NULL,
  checked_at TEXT NOT NULL, state TEXT NOT NULL, source_hash TEXT NOT NULL,
  checks_json TEXT NOT NULL, note TEXT NOT NULL
); CREATE INDEX IF NOT EXISTS public_page_checks_slug ON public_page_checks(guide_slug,id);`);

async function fetchText(url, limit, { fetchImpl, timeoutMs }) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      (async () => {
        const response = await fetchImpl(url, { redirect: 'manual', signal: controller.signal,
          headers: { Accept: 'text/html, application/xml, text/plain;q=0.9', 'User-Agent': 'NoblesseGuideManager-PublicCheck/1.0' } });
        // No redirect is followed, including same-host redirects whose targets
        // might differ from the exact public URL the operator is checking.
        if (response.redirected || response.url && response.url !== url) throw failure('예상 URL과 다른 응답을 받았습니다.', 'PUBLIC_RESPONSE_URL');
        if (response.status >= 300 && response.status < 400) {
          response.body?.cancel().catch(() => {});
          return { status: response.status, headers: response.headers, text: '', redirect: true };
        }
        if (Number(response.headers.get('content-length')) > limit) throw failure('응답 크기 제한을 초과했습니다.', 'PUBLIC_RESPONSE_TOO_LARGE');
        const chunks = [];
        let bytes = 0;
        const reader = response.body?.getReader();
        if (reader) {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            bytes += value.byteLength;
            if (bytes > limit) throw failure('응답 크기 제한을 초과했습니다.', 'PUBLIC_RESPONSE_TOO_LARGE');
            chunks.push(Buffer.from(value));
          }
        }
        return { status: response.status, headers: response.headers, text: Buffer.concat(chunks).toString('utf8'), redirect: false };
      })(),
      new Promise((resolve, reject) => { timer = setTimeout(() => {
        controller.abort(); reject(failure('응답 본문까지 읽는 시간 제한을 초과했습니다.', 'PUBLIC_RESPONSE_TIMEOUT'));
      }, timeoutMs); }),
    ]);
  } finally { clearTimeout(timer); controller.abort(); }
}

function nodesOf(document) {
  const result = [], pending = [document];
  while (pending.length) {
    const node = pending.pop(); result.push(node);
    // Template contents are inert, so they do not declare the live page's H1 or metadata.
    pending.push(...(node.childNodes || []).slice().reverse());
  }
  return result;
}
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value || '';
function textOf(node) {
  return nodesOf(node).filter(item => item.nodeName === '#text' && !['script', 'style'].includes(item.parentNode?.tagName)).map(item => item.value).join('');
}
function isSelfCanonical(value, url, base = url) {
  try { const parsed = new URL(value, base); return !!value.trim() && parsed.href === url; } catch { return false; }
}

function hasBlockingDirective(value) {
  return String(value || '').split(',').some(part => {
    // Parameter values (notably max-image-preview: none) are not standalone
    // indexing rules. The same grammar applies after an HTTP bot prefix.
    if (/^\s*(?:unavailable_after|max-snippet|max-image-preview|max-video-preview)\s*:/i.test(part)) return false;
    return /(?:^|\s)(?:noindex|none)(?:\s|$)/i.test(part.trim());
  });
}

function headerIndexing(value) {
  let scope = '*', ambiguous = false;
  for (const part of String(value || '').split(',')) {
    const scoped = /^\s*([a-z0-9_-]+)\s*:\s*(.*)$/i.exec(part);
    if (scoped && ['unavailable_after', 'max-snippet', 'max-image-preview', 'max-video-preview'].includes(scoped[1].toLowerCase())) continue;
    if (scoped) scope = scoped[1].toLowerCase();
    const rules = scoped ? scoped[2] : part;
    if (!hasBlockingDirective(rules)) continue;
    if (['*', 'googlebot'].includes(scope)) return 'fail';
    // Fetch combines repeated fields with commas. An unprefixed directive after
    // another bot's field may belong to a separate global header: never pass it.
    if (!scoped) ambiguous = true;
  }
  return ambiguous ? 'unknown' : 'pass';
}

async function pageChecks(response, expectedTitle, url) {
  const checks = [check('http', response.status === 200 && !response.redirect ? 'pass' : 'fail', response.redirect
    ? `HTTP ${response.status}: 리디렉션을 따라가지 않았습니다. 공개 주소를 직접 확인해 주세요.` : `HTTP ${response.status}`)];
  const contentType = response.headers.get('content-type') || '';
  const isHtml = /^text\/html(?:\s*;|\s*$)/i.test(contentType);
  checks.push(check('html', isHtml && !response.redirect ? 'pass' : 'fail', isHtml ? 'text/html 응답입니다.' : `HTML 응답이 아닙니다: ${contentType || 'Content-Type 없음'}`));
  if (!isHtml || response.redirect) return checks.concat(['title', 'canonical', 'indexing'].map(key => check(key, 'unknown', '공개 HTML을 확인하지 못해 판정하지 않았습니다.')));
  const { parse } = await import('parse5');
  const nodes = nodesOf(parse(response.text));
  const headings = nodes.filter(node => node.tagName === 'h1');
  const title = headings.length === 1 ? normalizeText(textOf(headings[0])) : '';
  checks.push(check('title', headings.length === 1 && !!expectedTitle && title === expectedTitle ? 'pass' : 'fail', headings.length !== 1
    ? `H1이 ${headings.length}개입니다. 현재 원고 제목과 단일 H1을 대조해야 합니다.`
    : title === expectedTitle ? '단일 H1이 현재 원고 제목과 일치합니다. 본문 전체 비교는 아닙니다.' : `공개 H1: ${title.slice(0, 240)} · 현재 원고: ${expectedTitle.slice(0, 240)}`));
  const headNodes = nodes.filter(node => node.tagName === 'head').flatMap(nodesOf);
  const canonical = headNodes.filter(node => node.tagName === 'link' && attr(node, 'rel').toLowerCase().split(/\s+/).includes('canonical'));
  const baseHref = headNodes.find(node => node.tagName === 'base' && attr(node, 'href'));
  let base = url;
  try { if (baseHref) base = new URL(attr(baseHref, 'href'), url).href; } catch { base = 'invalid:'; }
  let canonicalStatus = canonical.length === 1 && isSelfCanonical(attr(canonical[0], 'href'), url, base) ? 'pass' : 'fail';
  let canonicalDetail = canonicalStatus === 'pass' ? 'head 안의 canonical 1개가 정확한 공개 URL을 가리킵니다.' : `canonical ${canonical.length}개: 자기 공개 URL 1개가 필요합니다.`;
  const linkHeader = response.headers.get('link') || '';
  if (/\bcanonical\b/i.test(linkHeader)) {
    const declarations = [...linkHeader.matchAll(/<([^>]+)>\s*;[^,]*?\brel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s,;]+))/gi)]
      .filter(match => (match[2] || match[3] || match[4]).toLowerCase().split(/\s+/).includes('canonical'));
    if (!declarations.length) { if (canonicalStatus === 'pass') canonicalStatus = 'unknown'; canonicalDetail += ' HTTP Link canonical 형식을 확인하지 못했습니다.'; }
    else if (declarations.some(match => !isSelfCanonical(match[1], url))) { canonicalStatus = 'fail'; canonicalDetail += ' HTTP Link canonical이 자기 URL과 충돌합니다.'; }
  }
  checks.push(check('canonical', canonicalStatus, canonicalDetail));
  const directives = nodes.filter(node => node.tagName === 'meta' && ['robots', 'googlebot'].includes(attr(node, 'name').toLowerCase()))
    .map(node => attr(node, 'content'));
  const metaBlocked = directives.some(hasBlockingDirective);
  const headerStatus = headerIndexing(response.headers.get('x-robots-tag'));
  const headerBlocked = headerStatus === 'fail';
  checks.push(check('indexing', metaBlocked ? 'fail' : headerStatus, metaBlocked || headerBlocked
    ? `${metaBlocked ? 'meta robots/googlebot' : 'X-Robots-Tag'}에 Google 색인 차단 지시가 있습니다.`
    : headerStatus === 'unknown' ? '합쳐진 X-Robots-Tag의 noindex·none 적용 대상을 구분할 수 없어 보류합니다.'
      : 'robots/googlebot meta와 적용되는 X-Robots-Tag에서 noindex·none을 찾지 못했습니다. 색인 완료를 뜻하지 않습니다.'));
  return checks;
}

function robotsCheck(response, url) {
  if ([404, 410].includes(response.status)) return check('robots', 'pass', `robots.txt HTTP ${response.status}: 파일이 없어 robots 규칙에 따른 접근 제한이 없는 것으로 해석합니다.`);
  if (response.status !== 200 || response.redirect) return check('robots', 'unknown', `robots.txt HTTP ${response.status}: 접근 허용으로 판정하지 않았습니다.`);
  const text = response.text.replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).map(line => line.replace(/#.*/, '').trim()).filter(Boolean);
  if (/<(?:!doctype|html|head|body)\b/i.test(text) || lines.some(line => !/^[a-z-]+\s*:/i.test(line))) return check('robots', 'unknown', 'robots.txt의 지원 가능한 텍스트 형식을 확인하지 못했습니다.');
  const allowed = robotsParser(ORIGIN + '/robots.txt', text).isAllowed(url, 'Googlebot');
  return check('robots', allowed === true ? 'pass' : allowed === false ? 'fail' : 'unknown', allowed === true
    ? '현재 robots.txt의 Googlebot 규칙이 이 URL 접근을 허용합니다.' : allowed === false ? '현재 robots.txt의 Googlebot 규칙이 이 URL 접근을 차단합니다.' : 'Googlebot 접근 규칙을 확인하지 못했습니다.');
}

function sitemapCheck(response, url) {
  if (response.status !== 200 || response.redirect) return check('sitemap', 'unknown', `sitemap.xml HTTP ${response.status}: 수록 여부를 확인하지 못했습니다.`);
  const xml = response.text;
  if (/<!DOCTYPE|<!ENTITY/i.test(xml) || /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[a-f\d]+);)/i.test(xml) || XMLValidator.validate(xml) !== true) return check('sitemap', 'unknown', '안전한 단일 사이트맵 XML 형식을 확인하지 못했습니다. DTD·외부 엔터티는 처리하지 않습니다.');
  let parsed;
  // Nuxt emits an xml-stylesheet processing instruction before urlset. It is
  // display metadata, so ignore it without fetching or executing its target.
  try { parsed = new XMLParser({ ignoreAttributes: false, ignoreDeclaration: true, ignorePiTags: true, parseTagValue: false, processEntities: true }).parse(xml); }
  catch { return check('sitemap', 'unknown', '사이트맵 XML을 해석하지 못했습니다.'); }
  if (parsed.sitemapindex) return check('sitemap', 'unknown', '사이트맵 인덱스는 이 검사에서 따라가지 않습니다. 개별 사이트맵 확인이 필요합니다.');
  if (!Object.hasOwn(parsed, 'urlset') || Object.keys(parsed).some(key => key !== 'urlset')
    || parsed.urlset?.['@_xmlns'] && parsed.urlset['@_xmlns'] !== 'http://www.sitemaps.org/schemas/sitemap/0.9') return check('sitemap', 'unknown', '지원하는 urlset 사이트맵 형식이 아닙니다.');
  const entries = parsed.urlset?.url == null ? [] : Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
  if (entries.some(entry => typeof entry.loc !== 'string' || !/^https?:\/\//.test(entry.loc))) return check('sitemap', 'unknown', '사이트맵의 URL 항목 형식을 확인하지 못했습니다.');
  const present = entries.some(entry => entry.loc.trim() === url);
  return check('sitemap', present ? 'pass' : 'fail', present ? 'sitemap.xml의 loc에 정확한 공개 URL이 수록돼 있습니다.' : '이 sitemap.xml에 정확한 공개 URL이 없습니다. 이것만으로 색인 여부를 판단하지 않습니다.');
}

function createPublicCheckService({ fetchImpl = (...args) => globalThis.fetch(...args), timeoutMs = 8000 } = {}) {
  const pending = new Map();
  function withFreshness(row) {
    const sourcePath = row.sourcePath ?? inventory.getGuide(row.guideSlug)?.sourcePath;
    let currentHash = null;
    try { currentHash = sourcePath ? fileHash(sourcePath) : null; } catch { /* Missing/unreadable source remains stale. */ }
    const changed = !currentHash || currentHash !== row.sourceHash;
    const aged = !Number.isFinite(Date.parse(row.checkedAt)) || Date.now() - Date.parse(row.checkedAt) >= 24 * 60 * 60 * 1000;
    const { sourcePath: ignored, ...result } = row;
    return { ...result, stale: changed || aged, staleReason: changed ? '확인한 원문이 바뀌었거나 현재 파일을 읽을 수 없습니다.' : aged ? '확인 후 24시간이 지났습니다. 현재 공개 상태를 다시 확인해 주세요.' : null };
  }
  function listLatest() {
    return db.prepare(`SELECT p.id,p.guide_slug AS guideSlug,p.url,p.checked_at AS checkedAt,p.state,p.source_hash AS sourceHash,
      p.checks_json AS checksJson,p.note,g.source_path AS sourcePath FROM public_page_checks p
      LEFT JOIN guides g ON g.slug=p.guide_slug WHERE p.id IN (SELECT MAX(id) FROM public_page_checks GROUP BY guide_slug) ORDER BY p.id DESC`).all()
      .map(({ checksJson, ...row }) => withFreshness({ ...row, checks: JSON.parse(checksJson) }));
  }
  async function execute(guide, source, sourceHash) {
    const url = ORIGIN + guide.path;
    const expectedTitle = normalizeText(extractGuideContent(guide, source).title);
    let checks = [], unreachable = false;
    try { checks = await pageChecks(await fetchText(url, LIMITS.html, { fetchImpl, timeoutMs }), expectedTitle, url); }
    catch (error) {
      unreachable = true;
      const detail = error.code?.startsWith('PUBLIC_') ? error.message : '공개 페이지의 응답 본문을 읽지 못했습니다. 네트워크 상태를 확인해 주세요.';
      checks = ['http', 'html', 'title', 'canonical', 'indexing'].map(key => check(key, 'unknown', detail));
    }
    for (const [key, parse] of [['robots', robotsCheck], ['sitemap', sitemapCheck]]) {
      try { checks.push(parse(await fetchText(ORIGIN + (key === 'robots' ? '/robots.txt' : '/sitemap.xml'), LIMITS[key], { fetchImpl, timeoutMs }), url)); }
      catch (error) { checks.push(check(key, 'unknown', error.code?.startsWith('PUBLIC_') ? error.message : `${LABELS[key]} 응답을 확인하지 못했습니다.`)); }
    }
    const checkedAt = nowIso(), state = unreachable ? 'unreachable' : checks.every(item => item.status === 'pass') ? 'pass' : 'attention';
    const id = Number(db.prepare(`INSERT INTO public_page_checks(guide_slug,url,checked_at,state,source_hash,checks_json,note) VALUES(?,?,?,?,?,?,?)`)
      .run(guide.slug, url, checkedAt, state, sourceHash, JSON.stringify(checks), NOTE).lastInsertRowid);
    return withFreshness({ id, guideSlug: guide.slug, url, checkedAt, state, sourceHash, checks, note: NOTE });
  }
  function checkGuide(slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) return Promise.reject(failure('등록된 가이드 주소를 선택해 주세요.', 'PUBLIC_GUIDE_INVALID'));
    if (pending.has(slug)) return pending.get(slug);
    const guide = inventory.getGuide(slug);
    if (!guide || guide.path !== '/guide/' + slug) return Promise.reject(failure('정상 가이드 목록에 있는 페이지만 확인할 수 있습니다.', 'PUBLIC_GUIDE_NOT_FOUND', 404));
    if (pending.size >= 3) return Promise.reject(failure('공개 확인 3건이 진행 중입니다. 완료 후 다시 실행해 주세요.', 'PUBLIC_CHECK_BUSY', 429));
    let source;
    try { source = fs.readFileSync(guide.sourcePath); }
    catch { return Promise.reject(failure('현재 가이드 원문을 읽을 수 없습니다.', 'PUBLIC_SOURCE_UNAVAILABLE')); }
    const promise = execute(guide, source.toString('utf8'), sha256(source)).finally(() => pending.delete(slug));
    pending.set(slug, promise);
    return promise;
  }
  return { checkGuide, listLatest };
}

module.exports = { ...createPublicCheckService(), createPublicCheckService };
