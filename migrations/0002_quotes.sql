-- 견적서. 관리 페이지에서 만들고, 고객은 /quote/{token}에서 보고 이미지로 저장한다.
CREATE TABLE quotes (
  id TEXT PRIMARY KEY,                 -- 견적번호 QUO-YYYYMMDD-XXXXXXXX
  token TEXT NOT NULL UNIQUE,          -- 고객 링크 /quote/{token}
  recipient TEXT NOT NULL,             -- 받는 분 (화면에는 '귀하'를 붙인다)
  quote_date TEXT NOT NULL,            -- 견적일 YYYY-MM-DD
  vat_included INTEGER NOT NULL DEFAULT 0,
  round_down INTEGER NOT NULL DEFAULT 0, -- 총시세의 천 원 미만 버림
  items TEXT NOT NULL,                 -- 품목 JSON (utils/quote.ts의 QuoteItem[])
  note TEXT NOT NULL DEFAULT '',       -- 비고, 견적서에 인쇄된다
  memo TEXT NOT NULL DEFAULT '',       -- 내부 메모, 고객에게 보이지 않는다
  total INTEGER NOT NULL,              -- 합계금액 (원)
  image_width INTEGER NOT NULL,
  image_height INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
  created_at TEXT NOT NULL,            -- ISO 8601 UTC
  cancelled_at TEXT
);

CREATE INDEX quotes_created_at ON quotes (created_at);

-- 견적서 이미지(PNG). 관리 화면에서 그린 그대로를 저장해 고객 기기와 상관없이 같은 모양으로 내려준다.
-- 목록 조회가 무거워지지 않게 본문과 표를 나눈다.
CREATE TABLE quote_images (
  quote_id TEXT PRIMARY KEY REFERENCES quotes (id),
  png BLOB NOT NULL
);
