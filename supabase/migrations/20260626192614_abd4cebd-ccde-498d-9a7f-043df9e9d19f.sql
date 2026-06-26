-- Drop the policies that depend on the old view before dropping the view
DROP POLICY IF EXISTS "Visitors can view product images" ON public.product_images;
DROP POLICY IF EXISTS "Signed-in users can view product images" ON public.product_images;

-- Now drop the security-definer view (the linter flags definer views; definer functions are the approved pattern)
DROP VIEW IF EXISTS public.public_products;

-- Secure storefront product list: excludes cost_price and runs with owner privileges so public users never need access to the raw products table
CREATE OR REPLACE FUNCTION public.get_public_products()
RETURNS TABLE (
  id integer,
  name text,
  slug text,
  brand text,
  price integer,
  category text,
  is_new boolean,
  is_featured boolean,
  description text,
  details text[],
  sizes text[],
  colors text[],
  material text,
  sku text,
  original_price integer,
  discount_percentage integer,
  save_amount integer,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

GRANT EXECUTE ON FUNCTION public.get_public_products() TO anon, authenticated;

-- Helper used by product_images RLS policies so they can verify a product without touching the raw products table directly
CREATE OR REPLACE FUNCTION public.is_product_public(_product_id integer)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.products WHERE id = _product_id);
$$;

GRANT EXECUTE ON FUNCTION public.is_product_public(integer) TO anon, authenticated;

-- Make sure public users cannot read the raw products table at all
REVOKE ALL ON public.products FROM anon, authenticated;
GRANT ALL ON public.products TO service_role;

-- Ensure no public policies remain on the raw products table
DROP POLICY IF EXISTS "Visitors can view products" ON public.products;
DROP POLICY IF EXISTS "Signed-in users can view products" ON public.products;

-- Update product_images policies to use the secure helper function
CREATE POLICY "Visitors can view product images"
  ON public.product_images
  FOR SELECT
  TO anon
  USING (public.is_product_public(product_images.product_id));

CREATE POLICY "Signed-in users can view product images"
  ON public.product_images
  FOR SELECT
  TO authenticated
  USING (public.is_product_public(product_images.product_id));
