DO $$
DECLARE
    v_category_id INTEGER;
BEGIN
    -- Check if category exists, if not create it
    SELECT id INTO v_category_id FROM categories WHERE slug = 'bebidas-sucos-naturais';
    
    IF v_category_id IS NULL THEN
        INSERT INTO categories (name, slug, display_order, icon_name)
        VALUES ('Bebidas - Sucos Naturais', 'bebidas-sucos-naturais', 15, 'cup-soda')
        RETURNING id INTO v_category_id;
    END IF;

    -- Insert R$ 22,99 items
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Abacaxi', 'Suco Natural de Abacaxi (300 ml)', 22.99, v_category_id, true, false, null),
    ('Abacaxi com hortelã', 'Suco Natural de Abacaxi com hortelã (300 ml)', 22.99, v_category_id, true, false, null),
    ('Amora', 'Suco Natural de Amora (300 ml)', 22.99, v_category_id, true, false, null),
    ('Limão', 'Suco Natural de Limão (300 ml)', 22.99, v_category_id, true, false, null);

    -- Insert R$ 24,99 items
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Laranja', 'Suco Natural de Laranja (300 ml)', 24.99, v_category_id, true, false, null),
    ('Maracujá', 'Suco Natural de Maracujá (300 ml)', 24.99, v_category_id, true, false, null),
    ('Morango', 'Suco Natural de Morango (300 ml)', 24.99, v_category_id, true, false, null);

    -- Insert R$ 28,99 items
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Frutas Vermelhas', 'Suco Natural de Frutas Vermelhas (300 ml)', 28.99, v_category_id, true, false, null),
    ('Laranja com Morango', 'Suco Natural de Laranja com Morango (300 ml)', 28.99, v_category_id, true, false, null);

END $$;
