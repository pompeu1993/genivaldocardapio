-- Create Cervejas category
INSERT INTO categories (name, slug, icon_name, display_order)
VALUES ('Cervejas', 'cervejas', 'beer', 5)
ON CONFLICT (slug) DO NOTHING;

-- Update Category Names and Orders to organize the menu
UPDATE categories SET display_order = 4 WHERE slug = 'carta-vinhos';
UPDATE categories SET display_order = 5 WHERE slug = 'cervejas';
UPDATE categories SET name = 'Drinks e Coquetéis', display_order = 6 WHERE slug = 'bebidas-coqueteis';
UPDATE categories SET display_order = 7 WHERE slug = 'bebidas-sem-alcool';
UPDATE categories SET display_order = 8 WHERE slug = 'sobremesas';

-- Move Beers to Cervejas category
UPDATE dishes 
SET category_id = (SELECT id FROM categories WHERE slug = 'cervejas')
WHERE name ILIKE '%Heineken%' 
   OR name ILIKE '%Baden Baden%';

-- Move Non-Alcoholic items to Bebidas s/ Álcool
UPDATE dishes 
SET category_id = (SELECT id FROM categories WHERE slug = 'bebidas-sem-alcool')
WHERE name ILIKE '%Água%' 
   OR name ILIKE '%Refrigerante%' 
   OR name ILIKE '%Suco%';

-- Clean up unused categories if they have no dishes
DELETE FROM categories 
WHERE slug IN ('bebidas-destilados', 'bebidas-vinhos')
AND NOT EXISTS (SELECT 1 FROM dishes WHERE category_id = categories.id);
