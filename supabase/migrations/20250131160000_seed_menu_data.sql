
-- Insert Categories
INSERT INTO categories (name, slug, icon_name, display_order) VALUES
('Pratos Principais (Carnes)', 'pratos-principais-carnes', 'utensils', 1),
('Peixes (Trutas e Salmão)', 'peixes-trutas-salmao', 'utensils', 2),
('Acompanhamentos Extras', 'acompanhamentos', 'salad', 3),
('Carta de Vinhos', 'carta-vinhos', 'wine', 4),
('Bebidas e Coquetéis', 'bebidas-coqueteis', 'cup-soda', 5),
('Sobremesas', 'sobremesas', 'ice-cream', 6)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order;

-- Helper function to get category id
CREATE OR REPLACE FUNCTION get_cat_id(slug_name text) RETURNS int AS $$
    SELECT id FROM categories WHERE slug = slug_name LIMIT 1;
$$ LANGUAGE SQL;

-- Insert Dishes
-- Pratos Principais (Carnes)
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Strogonoff de Carne (Alcatra)', 'Acompanha arroz e fritas', 73.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1574969884448-fe5bce3d0d51?auto=format&fit=crop&q=80&w=800', true),
('Contrafilé Grelhado', 'Acompanha arroz, fritas, farofa e vinagrete', 73.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800', true),
('Parmegiana de Alcatra', 'Acompanha arroz e fritas', 74.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800', false),
('Escalope de Filé Mignon ao Molho de Ervas', 'Acompanha purê de batatas e legumes', 74.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800', false),
('Costela Bovina ao Molho Barbecue', 'Acompanha molho, purê de batatas com queijos e cebolas caramelizadas', 83.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', true),
('Picanha Grelhada', 'Acompanha arroz, fritas, farofa e vinagrete', 86.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80&w=800', true),
('Parmegiana de Filé Mignon', 'Acompanha arroz e fritas', 86.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800', false),
('Medalhão de Filé Mignon', 'Acompanha arroz à piamontese, brócolis salteados e molho Daniel com lâminas de alho', 87.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=800', false),
('Parmegiana Frango', 'Acompanha arroz e fritas', 38.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1612137882258-39c4244e896c?auto=format&fit=crop&q=80&w=800', false),
('Filé de Frango', 'Grelhado ou à Milanesa. Acompanha arroz e legumes', 43.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800', false),
('Parmegiana Carne', 'Acompanha arroz e fritas', 51.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800', false),
('Espaguete', 'Opção de molhos: Sugo ou Bolonhesa', 53.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800', false),
('Fettuccine', 'Opção de molhos: Sugo ou Bolonhesa', 58.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800', false),
('Ravioli', 'Opção de molhos: Sugo ou Bolonhesa', 64.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1587740986335-9917fe2fb38e?auto=format&fit=crop&q=80&w=800', false),
('Costela Bovina', 'Acompanha batatas/purê', 69.99, get_cat_id('pratos-principais-carnes'), 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', false);

-- Peixes (Trutas e Salmão)
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Salmão Grelhado ao Molho de Alcaparras', 'Acompanha purê de batatas e legumes', 98.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800', true),
('Truta ao Molho de Alcaparras', 'Acompanha arroz e batata sauté', 99.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800', false),
('Truta ao Molho de Amêndoas', 'Acompanha arroz e legumes', 99.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800', false),
('Truta ao Molho de Ervas Finas', 'Acompanha fettuccine ao molho da casa', 99.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800', false),
('Truta ao Molho de Maracujá', 'Acompanha risoto de alho-poró', 123.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800', false),
('Truta ao Molho de Frutas Vermelhas', 'Acompanha risoto de alho-poró', 123.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&q=80&w=800', false),
('Salmão Grelhado', 'Simples', 71.99, get_cat_id('peixes-trutas-salmao'), 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800', false);

-- Acompanhamentos Extras
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Farofa', 'Porção extra', 10.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1626509653295-829d5930263f?auto=format&fit=crop&q=80&w=800', false),
('Vinagrete', 'Porção extra', 10.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800', false),
('Pão de Alho', 'Unidade', 14.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1573145126343-41c304d9c02d?auto=format&fit=crop&q=80&w=800', false),
('Feijão', 'Porção extra', 24.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=800', false),
('Arroz', 'Porção extra', 28.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800', false),
('Purê de Batatas', 'Porção extra', 31.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1618449845562-34fb4d147413?auto=format&fit=crop&q=80&w=800', false),
('Legumes Salteados', 'Porção extra', 36.00, get_cat_id('acompanhamentos'), 'https://images.unsplash.com/photo-1592119747782-d8c12c2ea267?auto=format&fit=crop&q=80&w=800', false);

-- Carta de Vinhos
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Tinto Chileno Magnifico (Cabernet Sauvignon)', 'Aromas de cereja preta, amora, groselha e notas de especiarias', 120.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Tinto Santa Helena Reservado (Cabernet-Merlot)', 'Vermelho intenso, aromas de ameixas, especiarias e menta', 130.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Chileno Molinero Varietal (Carmenere)', 'Notas especiais e muito particulares, toque de baunilha e madeira', 135.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Tinto Chileno Molinero (Pinot Noir)', 'Macio com taninos suaves e notas de frutas vermelhas maduras', 140.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Santa Alicia Reserva (Pinot Noir)', 'Coloração rubi, aroma complexo de cereja seca, ameixas e morangos', 140.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Santa Alicia (Chardonnay)', 'Toque de leveza, cultivadas no Valle Central', 150.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Casa Valduga Naturelle (Malvasia)', 'Resgate do belo e simples, raízes profundas, inspiração doce', 180.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Tinto Espanhol Abadia de Aragon (Crianza)', 'Aromas de frutas maduras como morango, cassis e amora, notas de baunilha e café', 180.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Tinto Santa Helena Reservado (Cabernet Sauvignon)', 'Variedade de uvas, aromas de ameixas e especiarias', 185.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Aragon Cariñena (Tempranillo)', 'Aromas de frutas vermelhas e notas de frutas negras', 190.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Branco Santa Helena Reservado (Chardonnay)', 'Notas cítricas, sabor com excelente acidez', 190.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false),
('Tinto Italiano Collegiata (Montepulciano D Abruzzo)', 'Aromas de frutas negras frescas, amora silvestre e cereja', 190.00, get_cat_id('carta-vinhos'), 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', false);

-- Bebidas e Coquetéis
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Heineken / Budweiser (330ml)', 'Cerveja Long Neck', 15.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1618183479302-1e0aa7cfcc85?auto=format&fit=crop&q=80&w=800', false),
('Baden Baden (600ml)', 'Opções: Cristal, IPA Maracujá, Peach Pêssego, Witbier, Golden', 38.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1618183479302-1e0aa7cfcc85?auto=format&fit=crop&q=80&w=800', false),
('Caipirinha (Velho Barreiro) - Abacaxi', 'Clássica', 31.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipirinha (Velho Barreiro) - Limão ou Morango', 'Clássica', 33.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipirinha (Velho Barreiro) - Maracujá', 'Clássica', 36.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipirinha (Velho Barreiro) - Frutas Vermelhas', 'Clássica', 38.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipiroska (Vodka Smirnoff) - Abacaxi', 'Com Vodka', 37.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipiroska (Vodka Smirnoff) - Limão ou Morango', 'Com Vodka', 38.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipiroska (Vodka Smirnoff) - Maracujá', 'Com Vodka', 41.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Caipiroska (Vodka Smirnoff) - Frutas Vermelhas', 'Com Vodka', 43.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', false),
('Água natural (510ml)', 'Sem gás', 7.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80&w=800', false),
('Água com gás (510ml)', 'Com gás', 8.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80&w=800', false),
('Refrigerantes (Lata 350ml)', 'Coca, Fanta, Guaraná, Schweppes', 11.00, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', false),
('Sucos Dell Vale (290ml)', 'Pêssego, Uva, Maracujá', 11.00, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800', false),
('Sucos Naturais - Clássicos', 'Amora, Limão, Abacaxi', 22.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800', false),
('Sucos Naturais - Especiais', 'Morango, Laranja, Maracujá', 24.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800', false),
('Suco Natural - Frutas Vermelhas', 'Especial da casa', 28.99, get_cat_id('bebidas-coqueteis'), 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800', false);

-- Sobremesas
INSERT INTO dishes (name, description, price, category_id, image_url, is_featured) VALUES
('Sorvete de Creme na Taça', 'Clássico', 23.99, get_cat_id('sobremesas'), 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&q=80&w=800', false),
('Banana Flambada', 'Com canela', 29.99, get_cat_id('sobremesas'), 'https://images.unsplash.com/photo-1528641638259-2f2117565dd5?auto=format&fit=crop&q=80&w=800', false),
('Abacaxi com raspas de limão', 'Refrescante', 29.99, get_cat_id('sobremesas'), 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?auto=format&fit=crop&q=80&w=800', false),
('Strudel de Maçã', 'Sobremesa alemã', 36.99, get_cat_id('sobremesas'), 'https://images.unsplash.com/photo-1568466650422-723528f86d40?auto=format&fit=crop&q=80&w=800', false),
('Petit Gateau', 'Bolo de chocolate com recheio cremoso e sorvete', 38.99, get_cat_id('sobremesas'), 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800', true);

-- Drop helper function
DROP FUNCTION get_cat_id(text);
