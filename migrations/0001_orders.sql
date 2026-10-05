-- 1대1 주문서. 시각은 모두 ISO 8601 UTC 문자열이다.
CREATE TABLE orders (
  id TEXT PRIMARY KEY,                 -- 접수번호 ORD-YYYYMMDD-XXXXXXXX
  token TEXT NOT NULL UNIQUE,          -- 고객 링크 /order/{token}
  product TEXT NOT NULL,
  amount INTEGER NOT NULL,             -- 원
  memo TEXT NOT NULL DEFAULT '',       -- 내부 메모, 고객에게 보이지 않는다
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'submitted', 'paid', 'cancelled')),
  customer_name TEXT,
  customer_phone TEXT,
  customer_address TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,            -- 지나면 고객이 더 이상 작성할 수 없다
  submitted_at TEXT,
  paid_at TEXT,
  cancelled_at TEXT
);

CREATE INDEX orders_created_at ON orders (created_at);

-- 관리자 로그인: 이메일로 보낸 인증번호
CREATE TABLE admin_login_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_hash TEXT NOT NULL,          -- 인증번호를 요청한 브라우저의 쿠키 값 SHA-256
  code_hash TEXT NOT NULL,
  ip TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0, -- 입력 시도 횟수, 5번까지만 받는다
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT
);

CREATE INDEX admin_login_codes_created_at ON admin_login_codes (created_at);

-- 관리자 세션. 쿠키에는 무작위 토큰을, 여기에는 그 SHA-256만 둔다.
CREATE TABLE admin_sessions (
  token_hash TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
