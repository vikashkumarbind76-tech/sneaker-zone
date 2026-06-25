
CREATE TABLE public.admin_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip text,
  success boolean NOT NULL DEFAULT false,
  reason text,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_admin_login_attempts_email_time
  ON public.admin_login_attempts (lower(email), attempted_at DESC);

GRANT ALL ON public.admin_login_attempts TO service_role;

ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- No policies: clients cannot read or write this table. Only the
-- service_role (edge function) accesses it.
