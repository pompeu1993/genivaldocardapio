
-- Update problematic image URLs that are causing ORB errors with SAFE alternatives

-- Update Parmegiana Frango image
UPDATE dishes 
SET image_url = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800'
WHERE image_url LIKE '%photo-1612137882258-39c4244e896c%';

-- Update Ravioli image
UPDATE dishes 
SET image_url = 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800'
WHERE image_url LIKE '%photo-1587740986335-9917fe2fb38e%';
