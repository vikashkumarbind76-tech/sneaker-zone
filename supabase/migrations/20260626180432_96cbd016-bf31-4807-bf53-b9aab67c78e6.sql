
-- 1) New columns (price stays as the selling price for cart/order compatibility)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS cost_price integer,
  ADD COLUMN IF NOT EXISTS original_price integer,
  ADD COLUMN IF NOT EXISTS discount_percentage integer,
  ADD COLUMN IF NOT EXISTS save_amount integer;

-- 2) Sale price ladder (psychological pricing — every tier ends in 99 or 49)
CREATE OR REPLACE FUNCTION public.compute_sale_price(cost integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  ladder integer[] := ARRAY[1499,1799,1999,2299,2499,2799,2999,3299,3799,4299,4799,5499,5999,6499,7499,8499,9499,10499,11499,12999,14999,16999,19999,24999,29999,34999,39999];
  v integer;
BEGIN
  IF cost IS NULL OR cost <= 0 THEN
    RETURN 1499;
  END IF;
  IF cost <= 1500 THEN
    RETURN 1499;
  END IF;
  FOREACH v IN ARRAY ladder LOOP
    IF v > cost THEN
      RETURN v;
    END IF;
  END LOOP;
  -- Fallback for very expensive items: round up to next x499/x999
  RETURN ((cost / 500) + 1) * 500 - 1;
END;
$$;

-- 3) Strikethrough MRP mapping (looks believable, ~20-25% off)
CREATE OR REPLACE FUNCTION public.compute_original_price(sale integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  RETURN CASE sale
    WHEN 1499  THEN 1999
    WHEN 1799  THEN 2499
    WHEN 1999  THEN 2499
    WHEN 2299  THEN 2999
    WHEN 2499  THEN 2999
    WHEN 2799  THEN 3499
    WHEN 2999  THEN 3499
    WHEN 3299  THEN 3999
    WHEN 3799  THEN 4499
    WHEN 4299  THEN 4999
    WHEN 4799  THEN 5499
    WHEN 5499  THEN 6499
    WHEN 5999  THEN 6999
    WHEN 6499  THEN 7499
    WHEN 7499  THEN 8499
    WHEN 8499  THEN 9999
    WHEN 9499  THEN 10999
    WHEN 10499 THEN 11999
    WHEN 11499 THEN 12999
    WHEN 12999 THEN 14999
    WHEN 14999 THEN 16999
    WHEN 16999 THEN 19999
    WHEN 19999 THEN 22999
    WHEN 24999 THEN 28999
    WHEN 29999 THEN 34999
    WHEN 34999 THEN 39999
    WHEN 39999 THEN 44999
    ELSE ((sale * 130 / 100 / 500) + 1) * 500 - 1
  END;
END;
$$;

-- 4) Trigger: recompute pricing automatically on insert/update
CREATE OR REPLACE FUNCTION public.apply_pricing_strategy()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base integer;
  sale integer;
  mrp  integer;
BEGIN
  -- The "true" cost is whichever the admin entered: cost_price (preferred) or price
  base := COALESCE(NEW.cost_price, NEW.price);
  IF base IS NULL OR base <= 0 THEN
    RETURN NEW;
  END IF;

  NEW.cost_price := base;
  sale := public.compute_sale_price(base);
  mrp  := public.compute_original_price(sale);

  IF mrp <= sale THEN
    mrp := sale + 500;
  END IF;

  NEW.price               := sale;
  NEW.original_price      := mrp;
  NEW.save_amount         := mrp - sale;
  NEW.discount_percentage := ROUND(((mrp - sale)::numeric / mrp) * 100)::integer;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_apply_pricing ON public.products;
CREATE TRIGGER products_apply_pricing
  BEFORE INSERT OR UPDATE OF price, cost_price
  ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.apply_pricing_strategy();

-- 5) Backfill: seed cost_price from the original price and let the trigger recompute
UPDATE public.products
SET cost_price = price
WHERE cost_price IS NULL;

-- Force trigger to run on every row (touch price = current price)
UPDATE public.products SET price = price;
