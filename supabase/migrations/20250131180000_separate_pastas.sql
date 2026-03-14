-- Create Massas category
INSERT INTO categories (name, slug, icon_name, display_order)
VALUES ('Massas', 'massas', 'utensils', 2)
ON CONFLICT (slug) DO NOTHING;

-- Reorder categories to make space for Massas (put it after Carnes)
-- Carnes is 1. Peixes is 2. Let's push Peixes and others down.
UPDATE categories SET display_order = 3 WHERE slug = 'peixes-trutas-salmao';
UPDATE categories SET display_order = 4 WHERE slug = 'acompanhamentos';
UPDATE categories SET display_order = 5 WHERE slug = 'carta-vinhos';
UPDATE categories SET display_order = 6 WHERE slug = 'cervejas';
UPDATE categories SET display_order = 7 WHERE slug = 'bebidas-coqueteis';
UPDATE categories SET display_order = 8 WHERE slug = 'bebidas-sem-alcool';
UPDATE categories SET display_order = 9 WHERE slug = 'sobremesas';

-- Move Pasta dishes to Massas category
UPDATE dishes 
SET category_id = (SELECT id FROM categories WHERE slug = 'massas')
WHERE name ILIKE '%Espaguete%' 
   OR name ILIKE '%Fettuccine%' 
   OR name ILIKE '%Ravioli%';
