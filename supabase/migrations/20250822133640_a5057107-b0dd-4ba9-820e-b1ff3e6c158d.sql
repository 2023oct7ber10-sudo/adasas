-- تنظيف البيانات: إزالة المسافات الزائدة من الأسماء
UPDATE results 
SET name = TRIM(name) 
WHERE name != TRIM(name);

-- إنشاء index لتحسين أداء البحث
CREATE INDEX IF NOT EXISTS idx_results_name_search 
ON results USING gin (to_tsvector('arabic', name));

-- إنشاء index إضافي للبحث النصي
CREATE INDEX IF NOT EXISTS idx_results_name_lower 
ON results (LOWER(TRIM(name)));