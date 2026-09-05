const crypto = require('crypto');

// A loopback listener alone does not prevent a malicious website from submitting forms.
function localSecurity() {
  const token = crypto.randomBytes(32).toString('hex');
  return (req, res, next) => {
    let host;
    try { host = new URL(`http://${req.headers.host || ''}`); } catch { /* reject below */ }
    if (!host || !['localhost', '127.0.0.1', '[::1]'].includes(host.hostname)) {
      return res.status(403).json({ error: '이 관리도구는 이 PC에서만 사용할 수 있습니다' });
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    if (req.path.startsWith('/api')) res.setHeader('Cache-Control', 'no-store');
    const origin = req.headers.origin;
    if ((origin && origin !== host.origin) || req.headers['sec-fetch-site'] === 'cross-site') {
      return res.status(403).json({ error: '관리 화면과 같은 주소에서 요청해 주세요' });
    }
    if (req.method === 'GET' && req.path === '/api/session') return res.json({ token });
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      const supplied = String(req.headers['x-guide-manager-token'] || '');
      if (!/^[a-f0-9]{64}$/.test(supplied) || !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(token))) {
        return res.status(403).json({ error: '관리 화면을 새로고침한 뒤 다시 시도해 주세요', code: 'SESSION_REQUIRED' });
      }
    }
    next();
  };
}

module.exports = { localSecurity };
