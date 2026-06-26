ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';
DROP POLICY "Users create own orders" ON public.orders;
CREATE POLICY "Users create own orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending');