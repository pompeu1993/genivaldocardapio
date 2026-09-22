-- Ensure beverage categories appear at the end
-- We add 1000 to their display_order to push them to the bottom
UPDATE categories 
SET display_order = display_order + 1000 
WHERE (slug LIKE '%bebida%' OR slug LIKE '%vinho%' OR slug LIKE '%destilado%' OR slug LIKE '%suco%')
AND display_order < 1000;
