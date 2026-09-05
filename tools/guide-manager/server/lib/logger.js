const fs = require('fs');
const path = require('path');
const { config } = require('./config');

function sanitize(value) {
  return String(value == null ? '' : value)
    .replace(/sk-[A-Za-z0-9_-]{12,}/g, 'sk-***')
    .replace(/(secret|api[_-]?key|authorization)["'\s:=]+[^\s,}\]]+/gi, '$1=***');
}

function write(level, scope, message, error) {
  const stamp = new Date().toISOString();
  const detail = error ? ` | ${sanitize(error.stack || error.message || error)}` : '';
  const line = `[${stamp}] ${level.toUpperCase()} ${scope}: ${sanitize(message)}${detail}`;
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
  try {
    fs.appendFileSync(path.join(config.dataDir, 'logs', 'app.log'), `${line}\n`, 'utf8');
  } catch (_) { /* 로깅 실패는 서비스 중단 사유가 아니다. */ }
}

module.exports = {
  info: (scope, message) => write('info', scope, message),
  warn: (scope, message, error) => write('warn', scope, message, error),
  error: (scope, message, error) => write('error', scope, message, error),
  sanitize,
};
