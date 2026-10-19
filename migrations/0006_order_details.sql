-- 주문서에 적는 추가 항목. 모두 기본값이 있어 기존 주문서는 그대로 보인다.
ALTER TABLE orders ADD COLUMN vat_included INTEGER NOT NULL DEFAULT 0; -- 1이면 amount는 공급가액에 부가세 10%를 더한 총금액
ALTER TABLE orders ADD COLUMN deposit INTEGER NOT NULL DEFAULT 0;      -- 계약금 (원). 0이면 완불로 한 번에 받는다
ALTER TABLE orders ADD COLUMN spec TEXT NOT NULL DEFAULT '';           -- 제작 사양
ALTER TABLE orders ADD COLUMN due_date TEXT NOT NULL DEFAULT '';       -- 수령 예정일 (자유 입력, 예: 10월 30일 ~ 11월 2일)
-- 계약금 주문의 잔금 입금 확인 시각. 계약금 입금은 기존 paid_at(status = 'paid')에 남는다.
ALTER TABLE orders ADD COLUMN balance_paid_at TEXT;
