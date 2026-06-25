import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().trim().email('Invalid email').max(255),
  password: z.string().min(1, 'Password required').max(128),
});

const AdminLogin = () => {
  const { user, signIn, signOut, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // After auth state resolves, redirect admins straight to /admin.
  useEffect(() => {
    if (authLoading || roleLoading) return;
    if (user && isAdmin) navigate('/admin', { replace: true });
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid input');
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    if (error) {
      setSubmitting(false);
      toast.error('Sign in failed. Check your credentials.');
      return;
    }

    // Verify admin role server-side before redirecting.
    const { data: sessionData } = await supabase.auth.getUser();
    const uid = sessionData.user?.id;
    if (!uid) {
      setSubmitting(false);
      toast.error('Session error. Please try again.');
      return;
    }
    const { data: roleRow } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', uid)
      .eq('role', 'admin')
      .maybeSingle();

    setSubmitting(false);
    if (!roleRow) {
      await supabase.auth.signOut();
      toast.error('This account does not have admin access.');
      return;
    }
    toast.success('Welcome, admin.');
    navigate('/admin', { replace: true });
  };

  const isLoading = authLoading || roleLoading;
  const signedInNonAdmin = !isLoading && user && !isAdmin;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Helmet>
        <title>Admin Login | Sneaker Zone</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <ShieldCheck className="w-7 h-7 text-accent" />
          <span className="font-display text-2xl tracking-wider">ADMIN PORTAL</span>
        </Link>

        <div className="bg-card p-8 rounded-lg shadow-soft-md border border-border">
          <h1 className="font-display text-xl mb-2">Restricted access</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with an account that has admin privileges. Customer accounts
            should use the <Link to="/auth" className="text-accent underline">main sign-in</Link> instead.
          </p>

          {signedInNonAdmin ? (
            <div className="space-y-4">
              <p className="text-sm">
                You are signed in as <span className="font-medium">{user!.email}</span>, but this
                account does not have admin access.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await signOut();
                  toast.success('Signed out. Use an admin account.');
                }}
              >
                Sign out and use a different account
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting || isLoading}>
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in…</>
                ) : (
                  'Sign in to Admin'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
