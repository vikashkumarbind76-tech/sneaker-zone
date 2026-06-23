GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.product_images TO anon;

CREATE POLICY "Visitors can view products"
ON public.products
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Visitors can view product images"
ON public.product_images
FOR SELECT
TO anon
USING (
  EXISTS (
    SELECT 1
    FROM public.products p
    WHERE p.id = product_images.product_id
  )
);