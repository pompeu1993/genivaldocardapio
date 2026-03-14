DO $$
DECLARE
    v_category_id INTEGER;
BEGIN
    -- Check if category exists, if not create it
    SELECT id INTO v_category_id FROM categories WHERE slug = 'carta-de-vinhos';
    
    IF v_category_id IS NULL THEN
        INSERT INTO categories (name, slug, display_order, icon_name)
        VALUES ('Carta de Vinhos', 'carta-de-vinhos', 20, 'wine')
        RETURNING id INTO v_category_id;
    END IF;

    -- Brancos
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Pucon Sauvignon Blanc', 'Vinho Branco (Chile)', 42.90, v_category_id, true, false, null);

    -- Tintos - Brasil
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Delaso Suave Premium', 'Vinho Tinto Suave (Brasil)', 24.90, v_category_id, true, false, null),
    ('Arturo Cabernet Suave', 'Vinho Tinto Suave (Brasil)', 39.90, v_category_id, true, false, null),
    ('Arbo Tannat', 'Vinho Tinto (Brasil)', 42.90, v_category_id, true, false, null);

    -- Tintos - Chile
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Ribeira Del Maipo Cabernet', 'Vinho Tinto (Chile)', 33.90, v_category_id, true, false, null),
    ('Side Ways Cabernet/Carmenere', 'Vinho Tinto (Chile)', 42.90, v_category_id, true, false, null),
    ('Pucon Reserva Merlot', 'Vinho Tinto (Chile)', 52.50, v_category_id, true, false, null);

    -- Tintos - Argentina
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Sin Palabras Malbec', 'Vinho Tinto (Argentina)', 52.50, v_category_id, true, false, null),
    ('Arbol Roble Malbec', 'Vinho Tinto (Argentina)', 58.00, v_category_id, true, false, null);

    -- Tintos - Portugal
    INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url) VALUES
    ('Regresso Dão', 'Vinho Tinto (Portugal)', 45.90, v_category_id, true, false, null);

END $$;
