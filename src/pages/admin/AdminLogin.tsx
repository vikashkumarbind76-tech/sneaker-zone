import { useState, useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Loader2, Eye, EyeOff, AlertCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters').max(128),
});

type FieldErrors = Partial<Record<'email' | 'password', string>>;

const LOCKOUT_STORAGE_KEY = 'sz_admin_lockout_until';

const AdminLogin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCKOUT_STORAGE_KEY) : null;
    const ts = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(ts) && ts > Date.now() ? ts : null;
  });
  const [now, setNow] = useState(Date.now());

  // Live validation — runs once a field has been blurred/submitted.
  const fieldErrors: FieldErrors = useMemo(() => {
    const parsed = schema.safeParse({ email, password });
    if (parsed.success) return {};
    const errs: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as 'email' | 'password' | undefined;
      if (key && !errs[key]) errs[key] = issue.message;
    }
    return errs;
  }, [email, password]);

  const showEmailError = touched.email && fieldErrors.email;
  const showPasswordError = touched.password && fieldErrors.password;
  const formValid = !fieldErrors.email && !fieldErrors.password;

  useEffect(() => {
    if (authLoading || roleLoading) return;
    if (user && isAdmin) navigate('/admin', { replace: true });
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  // Live countdown tick while locked out.
  useEffect(() => {
    if (!lockoutUntil) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [lockoutUntil]);

  // Clear lockout when it expires.
  useEffect(() => {
    if (lockoutUntil && now >= lockoutUntil) {
      setLockoutUntil(null);
      localStorage.removeItem(LOCKOUT_STORAGE_KEY);
    }
  }, [now, lockoutUntil]);

  const secondsRemaining = lockoutUntil
    ? Math.max(0, Math.ceil((lockoutUntil - now) / 1000))
    : 0;
  const isLockedOut = lockoutUntil !== null && secondsRemaining > 0;

  const applyLockout = (untilIso: string) => {
    const ts = new Date(untilIso).getTime();
    if (Number.isFinite(ts)) {
      setLockoutUntil(ts);
      localStorage.setItem(LOCKOUT_STORAGE_KEY, String(ts));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFormError(null);

    if (isLockedOut) return;

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setFormError('Please fix the errors above and try again.');
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('admin-login', {
        body: { email: parsed.data.email, password: parsed.data.password },
      });

      // supabase.functions.invoke returns the parsed body in `data` for
      // non-2xx responses too when the function returns JSON.
      const payload = (data ?? (invokeError as { context?: { json?: unknown } } | null)?.context?.json) as
        | {
            ok?: boolean;
            error?: string;
            message?: string;
            attemptsRemaining?: number;
            retryAt?: string;
            session?: { access_token: string; refresh_token: string };
          }
        | null;

      if (payload?.error === 'locked' && payload.retryAt) {
        applyLockout(payload.retryAt);
        setFormError(payload.message ?? 'Too many failed attempts. Try again later.');
        setSubmitting(false);
        return;
      }

      if (payload?.error === 'invalid_credentials') {
        setAttemptsRemaining(payload.attemptsRemaining ?? null);
        setFormError(
          payload.attemptsRemaining !== undefined && payload.attemptsRemaining <= 2
            ? `Incorrect email or password. ${payload.attemptsRemaining} attempt${payload.attemptsRemaining === 1 ? '' : 's'} remaining before lockout.`
            : 'Incorrect email or password. Please try again.'
        );
        setSubmitting(false);
        return;
      }

      if (payload?.error === 'not_admin') {
        setFormError(payload.message ?? 'This account does not have admin access.');
        setSubmitting(false);
        return;
      }

      if (!payload?.ok || !payload.session) {
        setFormError(payload?.message ?? 'Sign in failed. Please try again.');
        setSubmitting(false);
        return;
      }

      // Install the session locally so the rest of the app sees the admin user.
      const { error: setErr } = await supabase.auth.setSession({
        access_token: payload.session.access_token,
        refresh_token: payload.session.refresh_token,
      });
      if (setErr) {
        setFormError('Session error. Please try signing in again.');
        setSubmitting(false);
        return;
      }

      setAttemptsRemaining(null);
      setSubmitting(false);
      toast.success('Welcome back, admin.');
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('admin-login invoke failed', err);
      setFormError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const isLoading = authLoading || roleLoading;
  const signedInNonAdmin = !isLoading && user && !isAdmin;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Helmet>
        <title>Admin Login | Sneaker Zone</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <ShieldCheck className="w-7 h-7 text-accent transition-transform group-hover:scale-110" />
          <span className="font-display text-2xl tracking-wider">ADMIN PORTAL</span>
        </Link>

        <div className="bg-card p-8 rounded-lg shadow-soft-md border border-border">
          <h1 className="font-display text-xl mb-2">Restricted access</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with an account that has admin privileges. Customer accounts
            should use the{' '}
            <Link to="/auth" className="text-accent underline underline-offset-2">
              main sign-in
            </Link>{' '}
            instead.
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span className="text-sm">Checking session…</span>
            </div>
          ) : signedInNonAdmin ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Not an admin account</AlertTitle>
                <AlertDescription>
                  You are signed in as <span className="font-medium">{user!.email}</span>, but
                  this account does not have admin access.
                </AlertDescription>
              </Alert>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await signOut();
                  toast.success('Signed out. Use an admin account to continue.');
                }}
              >
                Sign out and use a different account
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {isLockedOut && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Account temporarily locked</AlertTitle>
                  <AlertDescription>
                    Too many failed sign-in attempts. Try again in{' '}
                    <span className="font-mono font-semibold">
                      {Math.floor(secondsRemaining / 60)}:
                      {String(secondsRemaining % 60).padStart(2, '0')}
                    </span>
                    .
                  </AlertDescription>
                </Alert>
              )}

              {!isLockedOut && formError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={!!showEmailError}
                  aria-describedby={showEmailError ? 'admin-email-error' : undefined}
                  className={cn(showEmailError && 'border-destructive focus-visible:ring-destructive')}
                  disabled={submitting || isLockedOut}
                />
                {showEmailError && (
                  <p id="admin-email-error" className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    aria-invalid={!!showPasswordError}
                    aria-describedby={showPasswordError ? 'admin-password-error' : undefined}
                    className={cn(
                      'pr-10',
                      showPasswordError && 'border-destructive focus-visible:ring-destructive'
                    )}
                    disabled={submitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {showPasswordError && (
                  <p id="admin-password-error" className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitting || (touched.email && touched.password && !formValid)}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying admin access…
                  </>
                ) : (
                  'Sign in to Admin'
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center pt-2">
                Access attempts are verified server-side. Unauthorized accounts are signed out automatically.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
