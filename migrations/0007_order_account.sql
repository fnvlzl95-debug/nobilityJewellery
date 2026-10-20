-- 주문서마다 입금받을 계좌 (config/site.ts의 order.accounts id). 기존 주문서는 토스뱅크 그대로.
ALTER TABLE orders ADD COLUMN account TEXT NOT NULL DEFAULT 'toss';
