INSERT INTO categories (name, slug, display_order, icon_name) VALUES
('Bebidas s/ Álcool', 'bebidas-sem-alcool', 7, 'cup-soda')
ON CONFLICT (slug) DO NOTHING;
