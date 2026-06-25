import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Smartphone, QrCode, Wallet, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

type PaymentMethod = 'credit' | 'debit' | 'upi' | 'qr';

const methods: { id: PaymentMethod; label: string; desc: string; icon: typeof CreditCard }[] = [
  { id: 'credit', label: 'Credit Card', desc: 'Visa, Mastercard, Amex, Rupay', icon: CreditCard },
  { id: 'debit', label: 'Debit Card', desc: 'All major Indian banks', icon: Wallet },
  { id: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm, BHIM', icon: Smartphone },
  { id: 'qr', label: 'Scan & Pay (QR)', desc: 'Scan with any UPI app', icon: QrCode },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [processing, setProcessing] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  // UPI
  const [upiId, setUpiId] = useState('');

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0 && !processing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-4xl mb-3">YOUR CART IS EMPTY</h1>
          <p className="text-muted-foreground mb-6">Add some sneakers before checking out.</p>
          <Button onClick={() => navigate('/shop')}>Browse Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const shipping = totalPrice > 2000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shipping + tax;

  const validate = (): string | null => {
    if (method === 'credit' || method === 'debit') {
      const digits = cardNumber.replace(/\s/g, '');
      if (digits.length < 13 || digits.length > 19) return 'Enter a valid card number';
      if (!cardName.trim()) return 'Enter the name on the card';
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) return 'Expiry must be MM/YY';
      if (!/^\d{3,4}$/.test(cardCvv)) return 'Enter a valid CVV';
    }
    if (method === 'upi') {
      if (!/^[\w.\-]{2,}@[\w]{2,}$/.test(upiId)) return 'Enter a valid UPI ID (e.g. name@bank)';
    }
    return null;
  };

  const handlePay = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setProcessing(true);
    // Simulated payment processing
    await new Promise(r => setTimeout(r, 1600));
    toast.success(`Payment successful via ${methods.find(m => m.id === method)?.label}`);
    clearCart();
    setProcessing(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout — Sneaker Zone</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-4xl md:text-5xl mb-8">CHECKOUT</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left: Payment methods */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl mb-4">PAYMENT METHOD</h2>

              <RadioGroup value={method} onValueChange={(v) => setMethod(v as PaymentMethod)} className="grid sm:grid-cols-2 gap-3">
                {methods.map(m => {
                  const Icon = m.icon;
                  const active = method === m.id;
                  return (
                    <label
                      key={m.id}
                      htmlFor={`pm-${m.id}`}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        active ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40'
                      }`}
                    >
                      <RadioGroupItem id={`pm-${m.id}`} value={m.id} className="mt-1" />
                      <Icon className={`w-5 h-5 mt-0.5 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{m.label}</div>
                        <div className="text-xs text-muted-foreground">{m.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>

              {/* Forms */}
              <div className="mt-6">
                {(method === 'credit' || method === 'debit') && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        maxLength={23}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 19);
                          setCardNumber(v.replace(/(.{4})/g, '$1 ').trim());
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" value={cardName} onChange={e => setCardName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="exp">Expiry (MM/YY)</Label>
                      <Input
                        id="exp"
                        placeholder="08/28"
                        value={cardExpiry}
                        maxLength={5}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                          setCardExpiry(v);
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        inputMode="numeric"
                        placeholder="•••"
                        value={cardCvv}
                        maxLength={4}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>
                )}

                {method === 'upi' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="upi">UPI ID</Label>
                      <Input
                        id="upi"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap text-xs text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-secondary">GPay</span>
                      <span className="px-2 py-1 rounded bg-secondary">PhonePe</span>
                      <span className="px-2 py-1 rounded bg-secondary">Paytm</span>
                      <span className="px-2 py-1 rounded bg-secondary">BHIM</span>
                    </div>
                  </div>
                )}

                {method === 'qr' && (
                  <div className="flex flex-col items-center text-center gap-3 py-4">
                    <div className="w-48 h-48 rounded-xl bg-white p-3 grid grid-cols-8 gap-0.5">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-[1px] ${
                            // Deterministic pseudo-QR pattern
                            ((i * 7 + (i % 5)) % 3 === 0 || i % 9 === 0) ? 'bg-black' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium">Scan with any UPI app</p>
                    <p className="text-xs text-muted-foreground">
                      Amount: ₹{grandTotal.toFixed(2)} · Press "Pay Now" once you complete the scan.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Payments are encrypted and PCI-DSS compliant. This is a demo checkout.
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
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
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
