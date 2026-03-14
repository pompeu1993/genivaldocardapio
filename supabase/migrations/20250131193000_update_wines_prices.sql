DO $$
DECLARE
    v_category_id INTEGER;
BEGIN
    -- Get category id
    SELECT id INTO v_category_id FROM categories WHERE slug = 'carta-de-vinhos';

    -- Update existing wines with new prices
    
    -- Brancos
    UPDATE dishes SET price = 128.99 WHERE name = 'Pucon Sauvignon Blanc' AND category_id = v_category_id;
    
    -- Tintos Brasil
    UPDATE dishes SET price = 74.99 WHERE name = 'Delaso Suave Premium' AND category_id = v_category_id;
    UPDATE dishes SET price = 98.99 WHERE name = 'Arturo Cabernet Suave' AND category_id = v_category_id;
    UPDATE dishes SET price = 128.99 WHERE name = 'Arbo Tannat' AND category_id = v_category_id;

    -- Tintos Chile
    UPDATE dishes SET price = 134.99 WHERE name = 'Ribeira Del Maipo Cabernet' AND category_id = v_category_id;
    UPDATE dishes SET price = 172.00 WHERE name = 'Side Ways Cabernet/Carmenere' AND category_id = v_category_id;
    UPDATE dishes SET price = 144.99 WHERE name = 'Pucon Reserva Merlot' AND category_id = v_category_id;

    -- Tintos Argentina
    UPDATE dishes SET price = 144.99 WHERE name = 'Sin Palabras Malbec' AND category_id = v_category_id;
    UPDATE dishes SET price = 188.99 WHERE name = 'Arbol Roble Malbec' AND category_id = v_category_id;

    -- Tintos Portugal
    UPDATE dishes SET price = 137.99 WHERE name = 'Regresso Dão' AND category_id = v_category_id;

    -- Add "Vinhos em taça da casa" if not exists
    IF NOT EXISTS (SELECT 1 FROM dishes WHERE name = 'Vinhos em taça da casa 200ml' AND category_id = v_category_id) THEN
        INSERT INTO dishes (name, description, price, category_id, is_available, is_featured, image_url)
        VALUES ('Vinhos em taça da casa 200ml', 'Consulte a disponibilidade', 0.00, v_category_id, true, false, null);
    END IF;

END $$;
