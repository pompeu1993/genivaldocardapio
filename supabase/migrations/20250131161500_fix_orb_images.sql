
-- Update problematic image URLs that are causing ORB errors

-- Update Salmão Grelhado images
UPDATE dishes 
SET image_url = 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800'
WHERE image_url LIKE '%photo-1467003909585-2f8a7270028d%';

-- Update Truta images
UPDATE dishes 
SET image_url = 'https://images.unsplash.com/photo-1580476262798-bddd9dd90d3e?auto=format&fit=crop&q=80&w=800'
WHERE image_url LIKE '%photo-1519708227418-c8fd9a3a2720%';
