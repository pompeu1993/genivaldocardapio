INSERT INTO storage.buckets (id, name, public) VALUES ('dishes', 'dishes', true) ON CONFLICT (id) DO NOTHING;

-- RLS for storage
-- Drop existing policies to avoid errors on re-run
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'dishes' );
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'dishes' );