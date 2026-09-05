const fs = require('fs');
const path = require('path');

function normalizeLocalPath(value) {
  const input = String(value || '');
  if (!input) return '';
  if (process.platform !== 'win32') return path.normalize(input);
  const unc = input.startsWith('\\\\');
  const body = unc ? input.slice(2) : input;
  return `${unc ? '\\\\' : ''}${body.replace(/[\\/]+/g, '\\')}`;
}

function firstExisting(candidates) {
  for (const candidate of candidates.map(normalizeLocalPath).filter(Boolean)) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function gitExecutable() {
  if (process.platform !== 'win32') return 'git';
  return firstExisting([
    path.join(process.env.ProgramFiles || 'C:/Program Files', 'Git', 'cmd', 'git.exe'),
    path.join(process.env.ProgramFiles || 'C:/Program Files', 'Git', 'bin', 'git.exe'),
    'C:/Program Files/Git/cmd/git.exe',
  ]) || 'git';
}

function nodeExecutable() {
  return firstExisting([
    process.execPath,
    process.platform === 'win32' ? 'C:/Program Files/nodejs/node.exe' : '',
  ]) || (process.platform === 'win32' ? 'node.exe' : 'node');
}

function npmCliPath() {
  const node = nodeExecutable();
  const candidates = [
    path.join(path.dirname(node), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    process.platform === 'win32' ? 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' : '',
  ];
  try { candidates.push(require.resolve('npm/bin/npm-cli.js')); } catch (_) { /* 시스템 npm 경로를 우선 사용한다. */ }
  return firstExisting(candidates);
}

module.exports = { normalizeLocalPath, gitExecutable, nodeExecutable, npmCliPath };
