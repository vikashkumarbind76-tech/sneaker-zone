import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Smartphone, QrCode, Wallet, Building2, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: (r: unknown) => void) => void };
  }
}

const supportedMethods = [
  { icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa · Mastercard · Amex · Rupay' },
  { icon: Smartphone, label: 'UPI', desc: 'GPay · PhonePe · Paytm · BHIM' },
  { icon: QrCode, label: 'QR Code', desc: 'Scan with any UPI app' },
  { icon: Building2, label: 'Net Banking', desc: '50+ Indian banks' },
  { icon: Wallet, label: 'Wallets & EMI', desc: 'Paytm · Mobikwik · EMI options' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const shipping = totalPrice > 2000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0 && !processing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-4xl mb-3">YOUR CART IS EMPTY</h1>
          <p className="text-muted-foreground mb-6">Add some sneakers before checking out.</p>
          <Button onClick={() => navigate('/shop')}>Browse Shop</Button>
        </div>
        <Footer />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    );
  }

  const handlePay = async () => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      toast.error('Payment library failed to load. Please refresh.');
      return;
    }
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          items: items.map(i => ({
            id: i.id, name: i.name, price: i.price, quantity: i.quantity,
            size: i.size ?? null, image: i.image ?? null,
          })),
          paymentMethod: 'razorpay',
        },
      });
      if (error || !data?.razorpayOrderId) {
        toast.error(error?.message || data?.error || 'Could not start payment');
        setProcessing(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        name: 'Sneaker Zone',
        description: `Order #${String(data.orderId).slice(0, 8)}`,
        prefill: {
          email: user.email ?? '',
          name: user.user_metadata?.display_name ?? '',
        },
        theme: { color: '#FF784E' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const { error: verifyErr } = await supabase.functions.invoke('verify-razorpay-payment', {
            body: response,
          });
          if (verifyErr) {
            toast.error('Payment verification failed. Contact support.');
            setProcessing(false);
            return;
          }
          toast.success('Payment successful!');
          clearCart();
          setProcessing(false);
          navigate('/orders');
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
            setProcessing(false);
          },
        },
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout — Sneaker Zone</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-4xl md:text-5xl mb-8">CHECKOUT</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl mb-1">SECURE PAYMENT</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Powered by Razorpay — choose your preferred method on the next screen.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {supportedMethods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-secondary/30">
                      <Icon className="w-5 h-5 mt-0.5 text-accent" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{m.label}</div>
                        <div className="text-xs text-muted-foreground">{m.desc}</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent" />
                256-bit SSL encrypted · PCI-DSS Level 1 compliant · Powered by Razorpay
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-display text-2xl mb-4">ORDER SUMMARY</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4 pr-1">
              {items.map(i => (
                <div key={`${i.id}|${i.size ?? ''}`} className="flex justify-between text-sm">
                  <span className="truncate pr-2">
                    {i.name} <span className="text-muted-foreground">× {i.quantity}</span>
                    {i.size && <span className="text-muted-foreground"> · UK {i.size}</span>}
                  </span>
                  <span>₹{(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (5% GST)</span><span>₹{tax}</span></div>
              <div className="flex justify-between pt-2 border-t border-border font-display text-xl">
                <span>TOTAL</span><span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="w-full mt-5"
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
              ) : (
                `Pay ₹${grandTotal.toFixed(2)}`
              )}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-3">
              By paying you agree to our terms. Orders are confirmed after payment.
            </p>
          </aside>
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default CheckoutPage;
