ALTER TABLE public.orders
  ADD COLUMN shipping_full_name text,
  ADD COLUMN shipping_phone text,
  ADD COLUMN shipping_address_line1 text,
  ADD COLUMN shipping_address_line2 text,
  ADD COLUMN shipping_city text,
  ADD COLUMN shipping_state text,
  ADD COLUMN shipping_postal_code text,
  ADD COLUMN shipping_country text DEFAULT 'India';