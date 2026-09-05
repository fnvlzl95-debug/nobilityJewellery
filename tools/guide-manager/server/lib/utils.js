const crypto = require('crypto');
const fs = require('fs');

function nowIso() {
  return new Date().toISOString();
}

function koreaDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function sha256(input) {
  const value = Buffer.isBuffer(input) ? input : Buffer.from(String(input || ''), 'utf8');
  return crypto.createHash('sha256').update(value).digest('hex');
}

function fileHash(filePath) {
  return fs.existsSync(filePath) ? sha256(fs.readFileSync(filePath)) : null;
}

function normalizeUrl(value) {
  try {
    const url = new URL(String(value || '').trim());
    const pathname = url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
    return `${url.protocol}//${url.host}${pathname}${url.search}`;
  } catch (_) {
    const raw = String(value || '').trim();
    return raw === '/' ? '/' : raw.replace(/\/+$/, '');
  }
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function parseNumber(value) {
  const n = Number(String(value == null ? '' : value).replace(/,/g, '').replace(/%$/, ''));
  return Number.isFinite(n) ? n : null;
}

function safeJson(value, fallback = null) {
  try { return JSON.parse(value); } catch (_) { return fallback; }
}

function maskSecret(value) {
  const raw = String(value || '');
  if (!raw) return '';
  if (raw.length <= 6) return `${raw.slice(0, 1)}***${raw.slice(-1)}`;
  return `${raw.slice(0, 3)}••••${raw.slice(-4)}`;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

module.exports = { nowIso, koreaDate, sha256, fileHash, normalizeUrl, stripHtml, clamp, parseNumber, safeJson, maskSecret, slugify };
