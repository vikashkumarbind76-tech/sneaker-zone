import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { lovable } from '@/integrations/lovable';
import sneakerZoneLogo from '@/assets/sneaker-zone-logo.png';

const signInSchema = z.object({
  email: z.string().trim().email('Invalid email').max(255),
  password: z.string().min(1, 'Password required').max(128),
});
const signUpSchema = z.object({
  email: z.string().trim().email('Invalid email').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  displayName: z.string().trim().min(1, 'Name required').max(80),
});

const GoogleButton = ({ loading, onClick }: { loading: boolean; onClick: () => void }) => (
  <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={onClick}>
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
    Continue with Google
  </Button>
);

const AuthPage = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? 'Invalid input'); return; }
    setLoading(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setLoading(false);
    if (error) {
      toast.error('Sign in failed. Check your credentials.');
    } else {
      toast.success('Welcome back!');
      navigate('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse({ email, password, displayName });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? 'Invalid input'); return; }
    setLoading(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.displayName);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Check your email to confirm.');
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || 'Google sign-in failed');
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      toast.success('Welcome!');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const Divider = () => (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">or</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Helmet>
        <title>Sign In | Sneaker Zone</title>
        <meta name="description" content="Sign in or create your Sneaker Zone account to shop authentic sneakers and streetwear, save favorites, and track orders." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/auth" />
        <meta property="og:title" content="Sign In | Sneaker Zone" />
        <meta property="og:description" content="Sign in to Sneaker Zone — your online destination for authentic sneakers and streetwear." />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/auth" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img src={sneakerZoneLogo} alt="Sneaker Zone" width={32} height={32} loading="lazy" className="w-8 h-8 object-contain" />
          <span className="font-display text-2xl tracking-wider">SNEAKER ZONE</span>
        </Link>

        <Tabs defaultValue="signin" className="bg-card p-8 rounded-lg shadow-soft-md">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <GoogleButton loading={loading} onClick={handleGoogle} />
            <Divider />
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <GoogleButton loading={loading} onClick={handleGoogle} />
            <Divider />
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Display Name</Label>
                <Input id="signup-name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
