-- 견적서 품목 표에서 뺄 칸 (utils/quote.ts의 QUOTE_OPTIONAL_COLUMNS 중 일부, JSON 배열).
-- 이미 만든 견적서는 모든 칸을 넣은 것으로 둔다.
ALTER TABLE quotes ADD COLUMN hidden_columns TEXT NOT NULL DEFAULT '[]';
