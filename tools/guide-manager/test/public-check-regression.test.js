const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-public-check-'));
process.env.GUIDE_MANAGER_DATA_DIR = path.join(temp, 'data');
process.env.SITE_ROOT = path.join(temp, 'site');
const { db } = require('../server/lib/db');
const { createPublicCheckService } = require('../server/services/publicCheckService');
const ORIGIN = 'https://noblessegold.com';
const TITLE = '금 & 은 비교';
let counter = 0;
function guide(slug = 'public-check-' + (++counter)) {
  const sourcePath = path.join(temp, slug + '.vue');
  fs.writeFileSync(sourcePath, `<script setup>\nconst gmArticleTitle = ${JSON.stringify(TITLE)};\n</script><template><div /></template>`);
  db.prepare('INSERT INTO guides(slug,path,title,source_path,source_hash,scanned_at) VALUES(?,?,?,?,?,?)')
    .run(slug, '/guide/' + slug, '오래된 목록 제목', sourcePath, 'deliberately-old-inventory-hash', new Date().toISOString());
  return { slug, sourcePath, url: ORIGIN + '/guide/' + slug };
}
function html(url, { head = '', body = '', canonical = `<link rel="canonical" href="${url}">`, h1 = '<h1>금 &amp; <span>은 비교</span></h1>' } = {}) {
  return `<!doctype html><html><head>${canonical}${head}</head><body>${h1}${body}</body></html>`;
}
function response(body, { status = 200, headers = {} } = {}) { return new Response(body, { status, headers }); }
function network(overrides = {}) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    assert.equal(new URL(url).origin, ORIGIN);
    assert.equal(options.redirect, 'manual');
    const key = url.endsWith('/robots.txt') ? 'robots' : url.endsWith('/sitemap.xml') ? 'sitemap' : 'page';
    if (overrides[key]) return overrides[key](url, options);
    if (key === 'robots') return response('User-agent: *\nAllow: /\n', { headers: { 'Content-Type': 'text/plain' } });
    if (key === 'sitemap') return response('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + db.prepare('SELECT path FROM guides').all().map(row => `<url><loc>${ORIGIN + row.path}</loc></url>`).join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
    return response(html(url), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  };
  return { calls, fetchImpl };
}
const item = (result, key) => result.checks.find(row => row.key === key);
const count = () => db.prepare('SELECT COUNT(*) AS n FROM public_page_checks').get().n;
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };

test.after(() => db.close());

test('checks current source title with an HTML parser and persists only independent snapshots; GET makes no requests', async () => {
  const g = guide(), net = network({ page: url => response(html(url, {
    head: '<template><link rel="canonical" href="https://example.com"><meta name="robots" content="noindex"></template>',
    body: '<script>"<h1>fake</h1>"</script><template><h1>inert</h1></template>',
  }), { headers: { 'Content-Type': 'TEXT/HTML; charset=UTF-8' } }) });
  const service = createPublicCheckService(net), source = fs.readFileSync(g.sourcePath, 'utf8');
  const stamp = new Date().toISOString();
  const generationId = Number(db.prepare('INSERT INTO generations(topic,status,created_at,updated_at) VALUES(?,?,?,?)').run('보존할 과거 원고', 'applied', stamp, stamp).lastInsertRowid);
  db.prepare('INSERT INTO content_baselines(generation_id,guide_slug,snapshot_json,applied_at,created_at,deployed_at,deployment_commit) VALUES(?,?,?,?,?,?,?)')
    .run(generationId, g.slug, '{"keep":true}', stamp, stamp, stamp, 'a'.repeat(40));
  const oldGeneration = db.prepare('SELECT * FROM generations').all(), oldBaseline = db.prepare('SELECT * FROM content_baselines').all();
  const result = await service.checkGuide(g.slug);
  assert.equal(result.state, 'pass');
  assert.equal(result.stale, false);
  assert.equal(result.staleReason, null);
  assert.deepEqual(result.checks.map(row => row.key), ['http', 'html', 'title', 'canonical', 'indexing', 'robots', 'sitemap']);
  assert.ok(result.checks.every(row => row.status === 'pass'));
  assert.match(result.note, /본문 전체 일치.*증명하지 않습니다/);
  assert.equal(net.calls.length, 3);
  assert.deepEqual(service.listLatest().find(row => row.guideSlug === g.slug), result);
  assert.equal(net.calls.length, 3);
  assert.equal(fs.readFileSync(g.sourcePath, 'utf8'), source);
  assert.deepEqual(db.prepare('SELECT * FROM generations').all(), oldGeneration);
  assert.deepEqual(db.prepare('SELECT * FROM content_baselines').all(), oldBaseline);
});

test('HTTP failure, non-HTML and mismatching or multiple H1s never pass', async () => {
  const g = guide();
  const cases = [
    { status: 404, key: 'http' }, { status: 503, key: 'http' },
    { mime: 'application/json', key: 'html' },
    { h1: '<h1>오래된 공개 제목</h1>', key: 'title' },
    { h1: '<h1>금 &amp; 은 비교</h1><h1>또 하나</h1>', key: 'title' },
    { h1: '', key: 'title' },
  ];
  for (const fixture of cases) {
    const net = network({ page: url => response(html(url, fixture), { status: fixture.status || 200, headers: { 'Content-Type': fixture.mime || 'text/html' } }) });
    const result = await createPublicCheckService(net).checkGuide(g.slug);
    assert.equal(result.state, 'attention');
    assert.equal(item(result, fixture.key).status, 'fail');
  }
});

test('canonical requires one exact self link and notices conflicting HTTP Link or HTML base', async () => {
  const g = guide();
  const fixtures = [
    { canonical: '' },
    { canonical: `<link rel="canonical" href="${g.url}"><link rel="canonical" href="${g.url}">` },
    { canonical: '<link rel="canonical" href="https://example.com/guide/wrong">' },
    { canonical: `<link rel="canonical" href="${g.url}/">` },
    { canonical: '<link rel="canonical" href="relative">', head: '<base href="https://example.com/">' },
    { headers: { Link: '<https://example.com>; rel="canonical"' } },
  ];
  for (const fixture of fixtures) {
    const result = await createPublicCheckService(network({ page: url => response(html(url, fixture), { headers: { 'Content-Type': 'text/html', ...fixture.headers } }) })).checkGuide(g.slug);
    assert.equal(item(result, 'canonical').status, 'fail', JSON.stringify(fixture));
    assert.equal(result.state, 'attention');
  }
  const ambiguous = await createPublicCheckService(network({ page: url => response(html(url), { headers: { 'Content-Type': 'text/html', Link: 'unsupported canonical' } }) })).checkGuide(g.slug);
  assert.equal(item(ambiguous, 'canonical').status, 'unknown');
});

test('Google noindex and none block while parameter values and unrelated bot instructions do not', async () => {
  const g = guide();
  const fixtures = [
    { head: '<meta name="robots" content="noindex, follow">', expected: 'fail' },
    { head: '<meta name="GoogleBot" content="none">', expected: 'fail' },
    { head: '<meta name="robots" content="max-image-preview: none">', expected: 'pass' },
    { head: '<meta name="robots" content="max-image-preview: none, noindex">', expected: 'fail' },
    { header: 'noindex', expected: 'fail' },
    { header: 'googlebot: noindex, nofollow', expected: 'fail' },
    { header: 'max-image-preview: none', expected: 'pass' },
    { header: 'googlebot: max-image-preview: none', expected: 'pass' },
    { header: 'otherbot: noindex', expected: 'pass' },
    // Fetch combines repeated fields, so a global second field cannot safely
    // inherit the first field's unrelated crawler scope.
    { header: ['otherbot: nofollow', 'noindex'], expected: 'unknown' },
    { header: 'otherbot: noindex, googlebot: noindex', expected: 'fail' },
  ];
  for (const fixture of fixtures) {
    const headers = new Headers({ 'Content-Type': 'text/html' });
    for (const value of [fixture.header].flat().filter(Boolean)) headers.append('X-Robots-Tag', value);
    const result = await createPublicCheckService(network({ page: url => response(html(url, fixture), { headers }) })).checkGuide(g.slug);
    assert.equal(item(result, 'indexing').status, fixture.expected, JSON.stringify(fixture));
    assert.equal(result.state, fixture.expected === 'pass' ? 'pass' : 'attention');
  }
});

test('robots applies Googlebot-specific rules and does not interpret 429, 503 or invalid HTML as allowed', async () => {
  const g = guide();
  const fixtures = [
    { text: 'User-agent: *\nAllow: /\nUser-agent: Googlebot\nDisallow: /guide/', expected: 'fail' },
    { text: 'User-agent: *\nDisallow: /\nUser-agent: Googlebot\nAllow: /guide/', expected: 'pass' },
    { text: '', status: 404, expected: 'pass' }, { text: '', status: 410, expected: 'pass' },
    { text: '', status: 429, expected: 'unknown' }, { text: '', status: 503, expected: 'unknown' },
    { text: '<html><body>upstream failure</body></html>', expected: 'unknown' },
    { text: 'this is not a robots file', expected: 'unknown' },
  ];
  for (const fixture of fixtures) {
    const result = await createPublicCheckService(network({ robots: () => response(fixture.text, { status: fixture.status || 200 }) })).checkGuide(g.slug);
    assert.equal(item(result, 'robots').status, fixture.expected, JSON.stringify(fixture));
    assert.equal(result.state, fixture.expected === 'pass' ? 'pass' : 'attention');
  }
});

test('sitemap only accepts a safe flat urlset and never reads referenced indexes or entities', async () => {
  const g = guide();
  const fixtures = [
    { xml: '<urlset><url><loc>https://noblessegold.com/guide/elsewhere</loc></url></urlset>', expected: 'fail' },
    { xml: '<sitemapindex><sitemap><loc>https://127.0.0.1/private.xml</loc></sitemap></sitemapindex>', expected: 'unknown' },
    { xml: '<urlset><url></urlset>', expected: 'unknown' },
    { xml: '<!DOCTYPE urlset [<!ENTITY evil SYSTEM "file:///private">]><urlset><url><loc>&evil;</loc></url></urlset>', expected: 'unknown' },
    { xml: '<urlset><url><loc>&undefined;</loc></url></urlset>', expected: 'unknown' },
    { xml: '<html><body>not sitemap</body></html>', expected: 'unknown' },
  ];
  for (const fixture of fixtures) {
    const net = network({ sitemap: () => response(fixture.xml) });
    const result = await createPublicCheckService(net).checkGuide(g.slug);
    assert.equal(item(result, 'sitemap').status, fixture.expected);
    assert.equal(result.state, 'attention');
    assert.equal(net.calls.length, 3);
  }
});

test('Nuxt sitemap XML stylesheet instructions are inert and do not obscure urlset entries', async () => {
  const g = guide();
  // Structure captured from the live Nuxt sitemap on 2026-09-06, including
  // its stylesheet PI, namespace/schema attributes and nested image metadata.
  // Keep the fixture self-contained; tests never read the live site or .tmp.
  for (const stylesheet of ['/__sitemap__/style.xsl', 'https://example.com/style.xsl', 'http://127.0.0.1/private.xsl']) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${stylesheet}"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://noblessegold.com/</loc><lastmod>2026-09-05</lastmod><image:image><image:loc>https://noblessegold.com/_ipx/f_webp&amp;amp;q_80&amp;amp;s_3072x2048/Image/ring/NS0102.webp</image:loc></image:image></url>
  <url><loc>${g.url}</loc><lastmod>2026-09-06</lastmod></url>
</urlset>`;
    const net = network({ sitemap: () => response(xml, { headers: { 'Content-Type': 'application/xml' } }) });
    const result = await createPublicCheckService(net).checkGuide(g.slug);
    assert.equal(item(result, 'sitemap').status, 'pass', stylesheet);
    assert.equal(result.state, 'pass');
    assert.deepEqual(net.calls.map(call => call.url), [g.url, ORIGIN + '/robots.txt', ORIGIN + '/sitemap.xml']);
  }
});

test('redirects to foreign, private and same-host URLs are never followed for any resource', async () => {
  const g = guide();
  for (const location of ['https://example.com/a', 'http://127.0.0.1/private', 'http://169.254.169.254/metadata', ORIGIN + '/guide/redirected']) {
    for (const key of ['page', 'robots', 'sitemap']) {
      const net = network({ [key]: () => response('', { status: 302, headers: { Location: location } }) });
      const result = await createPublicCheckService(net).checkGuide(g.slug);
      assert.equal(result.state, 'attention');
      assert.equal(item(result, key === 'page' ? 'http' : key).status, key === 'page' ? 'fail' : 'unknown');
      assert.equal(net.calls.length, 3);
      assert.ok(net.calls.every(call => !call.url.includes('redirected') && new URL(call.url).origin === ORIGIN));
    }
  }
});

test('body-size bounds apply both to advertised and streamed bytes for all three resources', async () => {
  const g = guide();
  for (const [key, limit] of [['page', 3 * 1024 * 1024], ['robots', 500 * 1024], ['sitemap', 3 * 1024 * 1024]]) {
    for (const advertised of [true, false]) {
      const net = network({ [key]: () => response(advertised ? '' : 'x'.repeat(limit + 1), { headers: advertised ? { 'Content-Length': String(limit + 1) } : {} }) });
      const result = await createPublicCheckService(net).checkGuide(g.slug);
      assert.equal(result.state, key === 'page' ? 'unreachable' : 'attention');
      const checked = item(result, key === 'page' ? 'http' : key);
      assert.equal(checked.status, 'unknown');
      assert.match(checked.detail, /크기 제한/);
    }
  }
});

test('timeout covers a stalled body and a subsequent failure replaces the latest successful observation', async () => {
  const g = guide();
  const good = await createPublicCheckService(network()).checkGuide(g.slug);
  const net = network({ page: () => response(new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode('<html>')); } }), { headers: { 'Content-Type': 'text/html' } }) });
  const service = createPublicCheckService({ ...net, timeoutMs: 35 });
  const start = Date.now(), failed = await service.checkGuide(g.slug);
  assert.ok(Date.now() - start < 2000);
  assert.equal(failed.state, 'unreachable');
  assert.match(item(failed, 'http').detail, /시간 제한/);
  assert.ok(failed.id > good.id);
  assert.equal(service.listLatest().find(row => row.guideSlug === g.slug).id, failed.id);
  assert.equal(net.calls.length, 3);
});

test('same slug shares one promise and snapshot while three active slugs bound concurrency', async () => {
  const gs = [guide(), guide(), guide(), guide()], gate = deferred();
  const net = network({ page: async url => { await gate.promise; return response(html(url), { headers: { 'Content-Type': 'text/html' } }); } });
  const service = createPublicCheckService(net), before = count();
  const first = service.checkGuide(gs[0].slug), same = service.checkGuide(gs[0].slug);
  assert.equal(same, first);
  const rest = [service.checkGuide(gs[1].slug), service.checkGuide(gs[2].slug)];
  await assert.rejects(service.checkGuide(gs[3].slug), { code: 'PUBLIC_CHECK_BUSY', status: 429 });
  assert.equal(net.calls.length, 3);
  gate.resolve();
  const results = await Promise.all([first, same, ...rest]);
  assert.equal(results[0].id, results[1].id);
  assert.ok(results.every(row => row.state === 'pass'));
  assert.equal(count(), before + 3);
  assert.equal(net.calls.length, 9);
  assert.equal((await service.checkGuide(gs[3].slug)).state, 'pass');
});

test('freshness reflects source changes during POST, unreadable source and observations older than 24 hours', async () => {
  const g = guide(), gate = deferred();
  const net = network({ page: async url => { await gate.promise; return response(html(url), { headers: { 'Content-Type': 'text/html' } }); } });
  const service = createPublicCheckService(net), checking = service.checkGuide(g.slug);
  fs.appendFileSync(g.sourcePath, '\n<!-- concurrent source update -->');
  gate.resolve();
  const stale = await checking;
  assert.equal(stale.state, 'pass');
  assert.equal(stale.stale, true);
  assert.match(stale.staleReason, /원문/);
  const fresh = await service.checkGuide(g.slug);
  assert.equal(fresh.stale, false);
  db.prepare('UPDATE public_page_checks SET checked_at=? WHERE id=?').run(new Date(Date.now() - 24 * 60 * 60 * 1000 - 1000).toISOString(), fresh.id);
  assert.match(service.listLatest().find(row => row.id === fresh.id).staleReason, /24시간/);
  fs.unlinkSync(g.sourcePath);
  assert.match(service.listLatest().find(row => row.id === fresh.id).staleReason, /원문/);
  assert.equal(net.calls.length, 6);
});

test('unregistered and unsafe slugs or mismatched inventory paths make no outbound calls or snapshots', async () => {
  const g = guide(), net = network(), service = createPublicCheckService(net), before = count();
  for (const slug of ['../private', 'https://example.com', 'UPPERCASE', 'a/b', 'not-registered', 'a%2fb']) {
    await assert.rejects(service.checkGuide(slug), error => ['PUBLIC_GUIDE_INVALID', 'PUBLIC_GUIDE_NOT_FOUND'].includes(error.code));
  }
  db.prepare('UPDATE guides SET path=? WHERE slug=?').run('https://127.0.0.1/private', g.slug);
  await assert.rejects(service.checkGuide(g.slug), { code: 'PUBLIC_GUIDE_NOT_FOUND' });
  assert.equal(net.calls.length, 0);
  assert.equal(count(), before);
});

test('real API GET is read-only and POST requires the local session while preserving existing generation/baseline records', async () => {
  const express = require('express'), originalFetch = globalThis.fetch, g = guide(), net = network();
  const app = express();
  app.use(require('../server/lib/localSecurity').localSecurity());
  app.use(express.json());
  app.use('/api', require('../server/routes/api'));
  app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message, code: error.code }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + server.address().port + '/api';
  globalThis.fetch = (url, options) => String(url).startsWith(ORIGIN) ? net.fetchImpl(url, options) : originalFetch(url, options);
  const generations = db.prepare('SELECT * FROM generations').all(), baselines = db.prepare('SELECT * FROM content_baselines').all();
  try {
    assert.equal((await originalFetch(base + '/public-checks')).status, 200);
    assert.equal(net.calls.length, 0);
    assert.equal((await originalFetch(base + `/guides/${g.slug}/public-check`, { method: 'POST' })).status, 403);
    const token = (await (await originalFetch(base + '/session')).json()).token;
    const res = await originalFetch(base + `/guides/${g.slug}/public-check`, { method: 'POST', headers: { 'X-Guide-Manager-Token': token, 'Content-Type': 'application/json' }, body: JSON.stringify({ url: 'http://127.0.0.1/private', fetchImpl: 'ignored', timeoutMs: 1 }) });
    assert.equal(res.status, 200);
    const result = await res.json();
    assert.equal(result.state, 'pass');
    assert.equal(result.url, g.url);
    const latest = await (await originalFetch(base + '/public-checks')).json();
    assert.deepEqual(latest.find(row => row.guideSlug === g.slug), result);
    assert.equal(net.calls.length, 3);
    assert.deepEqual(db.prepare('SELECT * FROM generations').all(), generations);
    assert.deepEqual(db.prepare('SELECT * FROM content_baselines').all(), baselines);
  } finally {
    globalThis.fetch = originalFetch;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
