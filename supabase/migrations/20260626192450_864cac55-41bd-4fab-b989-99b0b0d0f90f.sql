-- Recreate public_products as a security-definer view (public should only see this, not the raw products table)
DROP VIEW IF EXISTS public.public_products;

CREATE OR REPLACE VIEW public.public_products
WITH (security_invoker = false)
AS
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

-- Grant public read access on the storefront view
GRANT SELECT ON public.public_products TO anon, authenticated;

-- Revoke direct public access to the raw products table so internal columns like cost_price are unreachable
REVOKE ALL ON public.products FROM anon, authenticated;
GRANT ALL ON public.products TO service_role;

-- Drop the broad public read policies on the raw products table
DROP POLICY IF EXISTS "Visitors can view products" ON public.products;
DROP POLICY IF EXISTS "Signed-in users can view products" ON public.products;

-- Update product_images policies to use the safe public_products view instead of the raw products table
DROP POLICY IF EXISTS "Visitors can view product images" ON public.product_images;
DROP POLICY IF EXISTS "Signed-in users can view product images" ON public.product_images;

CREATE POLICY "Visitors can view product images"
  ON public.product_images
  FOR SELECT
  TO anon
  USING (EXISTS (SELECT 1 FROM public.public_products p WHERE p.id = product_images.product_id));

CREATE POLICY "Signed-in users can view product images"
  ON public.product_images
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.public_products p WHERE p.id = product_images.product_id));

-- Remove client-side INSERT on orders; only the create-razorpay-order edge function (service_role) can create orders
DROP POLICY IF EXISTS "Users create own orders" ON public.orders;

-- Remove client-side INSERT on order_items; only the edge function (service_role) can populate line items
DROP POLICY IF EXISTS "Users create own order items" ON public.order_items;
