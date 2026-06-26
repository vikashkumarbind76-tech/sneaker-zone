CREATE OR REPLACE VIEW public.public_products WITH (security_invoker = false) AS
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

GRANT SELECT ON public.public_products TO anon, authenticated;
GRANT ALL ON public.public_products TO service_role;

REVOKE SELECT ON public.products FROM anon, authenticated;