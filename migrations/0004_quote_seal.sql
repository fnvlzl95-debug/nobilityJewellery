-- 견적서에 직인을 넣을지 (1이면 대표자 이름 옆 '(인)' 자리에 직인을 찍는다).
ALTER TABLE quotes ADD COLUMN seal INTEGER NOT NULL DEFAULT 0;

-- 관리자가 올린 이미지. 지금은 직인(name = 'seal') 하나다.
-- 직인은 공개 저장소나 공개 경로에 두지 않고, 로그인한 관리 화면에만 내려준다.
CREATE TABLE admin_assets (
  name TEXT PRIMARY KEY,
  png BLOB NOT NULL,
  updated_at TEXT NOT NULL
);
