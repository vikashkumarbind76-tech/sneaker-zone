CREATE OR REPLACE FUNCTION public.get_customer_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::int FROM public.profiles;
$$;
REVOKE EXECUTE ON FUNCTION public.get_customer_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_customer_count() TO anon, authenticated;

ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;