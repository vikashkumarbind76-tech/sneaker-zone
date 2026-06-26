import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, ShoppingBag, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  id: string;
  name: string;
  image_url: string | null;
  size: string | null;
  quantity: number;
  price: number;
  product_id: number;
}
interface Order {
  id: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  payment_method: string;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const methodLabel: Record<string, string> = {
  credit: 'Credit Card', debit: 'Debit Card', upi: 'UPI', qr: 'Scan & Pay (QR)',
};

const OrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/auth'); return; }

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setOrders(data as unknown as Order[]);
      setLoading(false);
    };

    setLoading(true);
    fetchOrders();

    // Realtime: refetch whenever this user's orders or items change
    const channel = supabase
      .channel(`orders-${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` }, fetchOrders)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, fetchOrders)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, authLoading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Orders — Sneaker Zone</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar onCartClick={() => setCartOpen(true)} />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-7 h-7 text-accent" />
          <h1 className="font-display text-4xl md:text-5xl">MY ORDERS</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading your orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-border bg-card">
            <ShoppingBag className="w-14 h-14 mx-auto text-muted-foreground/60 mb-4" />
            <h2 className="font-display text-2xl mb-2">NO ORDERS YET</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't bought anything. Time to step up!</p>
            <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(order => (
              <div key={order.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-border bg-secondary/30">
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold capitalize">{order.status}</span>
                      <span className="text-muted-foreground">· {methodLabel[order.payment_method] ?? order.payment_method}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Order #{order.id.slice(0, 8).toUpperCase()} · {formatDate(order.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl">₹{Number(order.total).toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{order.order_items.length} item(s)</div>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {order.order_items.map(item => (
                    <Link
                      key={item.id}
                      to={`/product/${item.product_id}`}
                      className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
                    >
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-secondary" loading="lazy" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-secondary" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty {item.quantity}{item.size ? ` · UK ${item.size}` : ''}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{(Number(item.price) * item.quantity).toFixed(2)}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default OrdersPage;
