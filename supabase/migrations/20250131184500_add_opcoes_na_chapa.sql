DO $$
DECLARE
    v_category_id INTEGER;
BEGIN
    -- Check if category exists, if not create it
    SELECT id INTO v_category_id FROM categories WHERE slug = 'opcoes-na-chapa';
    
    IF v_category_id IS NULL THEN
        INSERT INTO categories (name, slug, display_order, icon_name)
        VALUES ('Opções na Chapa (Para compartilhar)', 'opcoes-na-chapa', 5, 'utensils')
        RETURNING id INTO v_category_id;
    END IF;

    -- Insert Items
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Trio de Grelhados na Chapa (Serve 3 pessoas)', 'O que vem: 2 Fatias de Picanha, 2 toscanas, 2 filés de frango. Acompanhamentos: Legumes, arroz, fritas, farofa e vinagrete.', 292.00, v_category_id, true, false, null),
    ('Picanha na Chapa', 'O que vem: 4 fatias de picanha. Acompanhamentos: Legumes, arroz, fritas, farofa, vinagrete e pão de alho.', 323.00, v_category_id, true, false, null),
    ('Contra Filé na Chapa (Serve 2 pessoas)', 'O que vem: Contra filé. Acompanhamentos: Legumes, arroz, fritas, farofa e vinagrete.', 182.00, v_category_id, true, false, null),
    ('Trio na Chapa (Serve 2 pessoas)', 'O que vem: 1 Fatia de picanha, 1 toscana, 1 filé de frango. Acompanhamentos: Legumes, arroz, fritas, farofa e vinagrete.', 204.99, v_category_id, true, false, null);

END $$;
