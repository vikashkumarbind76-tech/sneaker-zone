-- Lock down has_role(): only authenticated + service_role may execute
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Tighten client_errors insert
DROP POLICY "Anyone can report errors" ON public.client_errors;
CREATE POLICY "Anyone can report own errors"
  ON public.client_errors FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());