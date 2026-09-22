-- create table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_order INTEGER DEFAULT 0,
    icon_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(display_order);

-- init data (check if empty first to avoid duplicates on re-run)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM categories) THEN
        INSERT INTO categories (name, slug, display_order, icon_name) VALUES
        ('Entradas', 'entradas', 1, 'salad'),
        ('Pratos Principais', 'pratos-principais', 2, 'utensils'),
        ('Sobremesas', 'sobremesas', 3, 'ice-cream'),
        ('Bebidas', 'bebidas', 4, 'wine');
    END IF;
END $$;

-- create table
CREATE TABLE IF NOT EXISTS dishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category_id INTEGER REFERENCES categories(id),
    ingredients TEXT,
    preparation_time INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category_id);
CREATE INDEX IF NOT EXISTS idx_dishes_featured ON dishes(is_featured);
CREATE INDEX IF NOT EXISTS idx_dishes_available ON dishes(is_available);

-- init data example
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM dishes) THEN
        INSERT INTO dishes (name, description, price, image_url, category_id, ingredients, preparation_time, is_featured) VALUES
        ('Bruschetta Tradizionale', 'Pão italiano grelhado com tomates frescos, manjericão e azeite extra virgem', 28.90, '/images/bruschetta.jpg', 1, 'Pão italiano, tomates cereja, manjericão, azeite', 15, true),
        ('Linguine alle Vongole', 'Massa linguine com molho de marisco e lascas de parmesão', 89.90, '/images/linguine-vongole.jpg', 2, 'Linguine, vongole, alho, vinho branco, parmesão', 25, true);
    END IF;
END $$;

-- Supabase Row Level Security (RLS) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

-- Grant access
GRANT SELECT ON categories TO anon;
GRANT SELECT ON dishes TO anon;
GRANT ALL ON categories TO authenticated;
GRANT ALL ON dishes TO authenticated;

-- RLS Policies
-- Drop existing policies if any to avoid errors on re-run
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view available dishes" ON dishes;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage dishes" ON dishes;

CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view available dishes" ON dishes FOR SELECT USING (is_available = true);
CREATE POLICY "Authenticated users can manage categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage dishes" ON dishes FOR ALL TO authenticated USING (true) WITH CHECK (true);