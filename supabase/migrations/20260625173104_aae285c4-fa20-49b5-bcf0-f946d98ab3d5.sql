REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

REVOKE EXECUTE ON FUNCTION public.get_customer_count() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_customer_count() TO service_role;