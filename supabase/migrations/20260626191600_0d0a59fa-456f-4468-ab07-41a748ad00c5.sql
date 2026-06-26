DROP VIEW IF EXISTS public.public_products;

CREATE OR REPLACE VIEW public.public_products AS
SELECT
  id,
  name,
  slug,
  brand,
  price,
  category,
  is_new,
  is_featured,
  description,
  details,
  sizes,
  colors,
  material,
  sku,
  original_price,
  discount_percentage,
  save_amount,
  created_at,
  updated_at
FROM public.products;

-- Public roles can only read the public view
GRANT SELECT ON public.public_products TO anon, authenticated;
GRANT ALL ON public.public_products TO service_role;

-- Revoke table-level SELECT on the underlying table
REVOKE SELECT ON public.products FROM anon, authenticated;

-- Grant column-level SELECT on all product columns except cost_price
GRANT SELECT (
  id,
  name,
  slug,
  brand,
  price,
  category,
  is_new,
  is_featured,
  description,
  details,
  sizes,
  colors,
  material,
  sku,
  original_price,
  discount_percentage,
  save_amount,
  created_at,
  updated_at
) ON public.products TO anon, authenticated;

-- service_role retains full table access for edge functions / admin
GRANT ALL ON public.products TO service_role;
