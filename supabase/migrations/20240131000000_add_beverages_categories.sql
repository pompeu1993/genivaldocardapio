INSERT INTO categories (name, slug, display_order, icon_name) VALUES
('Bebidas - Destilados', 'bebidas-destilados', 5, 'glass-water'),
('Bebidas - Vinhos', 'bebidas-vinhos', 6, 'wine')
ON CONFLICT (slug) DO NOTHING;
