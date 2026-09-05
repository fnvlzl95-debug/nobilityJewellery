// Run only after a successful site deployment and live verification.
// Explicit generation IDs prevent accidental relabeling of historical baselines.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { gitExecutable } = require('../server/lib/executables');

async function main() {
  const arg = name => process.argv[process.argv.indexOf(name) + 1];
  if (!process.argv.includes('--generation-ids') || !process.argv.includes('--commit')) throw new Error('Usage: node scripts/record-deployment.js --generation-ids 123,124 --commit <git-sha> --site-root <repository>');
  const ids = arg('--generation-ids').split(',').map(Number);
  const commit = arg('--commit');
  if (!ids.length || ids.some(id => !Number.isSafeInteger(id) || id < 1) || !/^[a-f0-9]{7,40}$/i.test(commit)) throw new Error('Valid generation IDs and commit are required');
  const root = path.resolve(process.argv.includes('--site-root') ? arg('--site-root') : path.join(__dirname, '..', '..', '..'));
  const base = 'http://127.0.0.1:8788/api';
  const read = async url => { const response = await fetch(url, { signal: AbortSignal.timeout(15000) }); if (!response.ok) throw new Error(`${url}: ${response.status}`); return response.json(); };
  const comparisons = await read(base + '/analytics/comparisons');
  const selected = ids.map(id => {
    const row = comparisons.find(item => item.generationId === id);
    if (!row) throw new Error(`No applied baseline for generation ${id}`);
    return row;
  });
  const digest = value => crypto.createHash('sha256').update(value).digest('hex');
  for (const row of selected) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.guideSlug)) throw new Error('Invalid guide slug');
    const relative = `pages/guide/${row.guideSlug}.vue`;
    const committed = execFileSync(gitExecutable(), ['show', `${commit}:${relative}`], { cwd: root, windowsHide: true });
    if (digest(committed) !== digest(fs.readFileSync(path.join(root, relative)))) throw new Error(`Uncommitted article: ${relative}`);
    const url = `https://noblessegold.com/guide/${row.guideSlug}`;
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    if (response.status !== 200 || !html.includes(url) || !html.includes('<h1') || /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) throw new Error(`Published canonical article not verified: ${url}`);
  }
  const session = await read(base + '/session');
  const deployedAt = new Date().toISOString();
  for (const row of selected) {
    const response = await fetch(`${base}/analytics/comparisons/${row.id}/deployment`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Guide-Manager-Token': session.token },
      body: JSON.stringify({ deployedAt, commit }), signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Deployment record failed (${response.status}): ${await response.text()}`);
    console.log(JSON.stringify({ generationId: row.generationId, slug: row.guideSlug, commit, deploymentVerifiedAt: deployedAt }));
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
