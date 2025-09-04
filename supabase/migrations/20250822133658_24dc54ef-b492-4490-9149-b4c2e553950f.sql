-- إضافة RLS policy للقراءة لجدول results (لأنه لا يوجد policies حالياً)
-- هذا آمن لأن النتائج يجب أن تكون متاحة للقراءة للجميع

CREATE POLICY "Allow public read access to results" 
ON results 
FOR SELECT 
USING (true);