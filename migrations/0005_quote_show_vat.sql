-- 부가세 포함 견적서의 표에 공급가액과 부가세를 따로 적을지 (1이면 두 칸과 합계 줄을 넣는다).
ALTER TABLE quotes ADD COLUMN show_vat INTEGER NOT NULL DEFAULT 0;
