import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, CheckCircle2, XCircle, Package, ArrowRight, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { logClientError } from "@/lib/logError";

type Status = "loading" | "success" | "failure";

interface RzpResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  size: string | null;
  quantity: number;
  unit_price: number;
  image_url: string | null;
}

interface OrderRow {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  razorpay_payment_id: string | null;
  created_at: string;
  shipping_full_name: string | null;
  shipping_address_line1: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_postal_code: string | null;
}

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const PaymentStatusPage = () => {
  const { orderId: orderIdParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const state = (location.state ?? {}) as {
    razorpay?: RzpResponse;
    initialStatus?: Status;
    reason?: string;
  };

  const [status, setStatus] = useState<Status>(state.initialStatus ?? "loading");
  const [reason, setReason] = useState<string>(state.reason ?? "");
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const verifiedRef = useRef(false);

  // Run verification (idempotent) if Razorpay response was passed via navigation state
  useEffect(() => {
    const run = async () => {
      if (verifiedRef.current) return;
      verifiedRef.current = true;
      try {
        if (state.razorpay) {
          const { error } = await supabase.functions.invoke("verify-razorpay-payment", {
            body: state.razorpay,
          });
          if (error) {
            setReason("Payment signature could not be verified.");
            setStatus("failure");
            return;
          }
          clearCart();
          setStatus("success");
        } else if (state.initialStatus === "failure") {
          setStatus("failure");
        } else if (orderIdParam) {
          // Direct visit with order id — derive status from DB
          setStatus("loading");
        } else {
          setStatus("failure");
          setReason("No payment information was provided.");
        }
      } catch (e) {
        void logClientError(e, { route: "/payment/status" });
        setStatus("failure");
        setReason("Unexpected error while verifying payment.");
      }
    };
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load order details once we have an orderId and we're not in a hard failure pre-verify
  useEffect(() => {
    const load = async () => {
      if (!orderIdParam) return;
      const { data: ord } = await supabase
        .from("orders")
        .select(
          "id,status,total_amount,currency,razorpay_payment_id,created_at,shipping_full_name,shipping_address_line1,shipping_city,shipping_state,shipping_postal_code"
        )
        .eq("id", orderIdParam)
        .maybeSingle();
      if (ord) {
        setOrder(ord as OrderRow);
        if (status === "loading" && !state.razorpay) {
          setStatus(ord.status === "confirmed" || ord.status === "paid" ? "success" : "failure");
        }
        const { data: its } = await supabase
          .from("order_items")
          .select("id,product_name,size,quantity,unit_price,image_url")
          .eq("order_id", orderIdParam);
        setItems((its as OrderItem[]) ?? []);
      }
    };
    void load();
  }, [orderIdParam, status, state.razorpay]);

  const title =
    status === "loading"
      ? "Processing payment…"
      : status === "success"
      ? "Payment successful"
      : "Payment failed";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title} — Sneaker Zone</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          {status === "loading" && (
            <div className="flex flex-col items-center text-center py-8">
              <Loader2 className="h-14 w-14 text-primary animate-spin mb-4" />
              <h1 className="text-2xl font-display tracking-wide mb-2">VERIFYING YOUR PAYMENT</h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                Please don't refresh or close this tab. We're confirming your payment with Razorpay.
              </p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-500/10 grid place-items-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-display tracking-wide mb-1">ORDER CONFIRMED</h1>
                <p className="text-sm text-muted-foreground">
                  Thank you! A confirmation has been recorded for your order.
                </p>
              </div>

              {order && (
                <div className="mt-8 space-y-4">
                  <div className="rounded-xl border border-border p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID</span>
                      <span className="font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    {order.razorpay_payment_id && (
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Payment ID</span>
                        <span className="font-mono text-xs">{order.razorpay_payment_id}</span>
                      </div>
                    )}
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Date</span>
                      <span>{new Date(order.created_at).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between mt-1 pt-2 border-t border-border">
                      <span className="font-medium">Total Paid</span>
                      <span className="font-display text-lg">{formatINR(Number(order.total_amount))}</span>
                    </div>
                  </div>

                  {items.length > 0 && (
                    <div className="rounded-xl border border-border p-4">
                      <h2 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Package className="h-4 w-4" /> Items ({items.length})
                      </h2>
                      <ul className="divide-y divide-border">
                        {items.map((it) => (
                          <li key={it.id} className="flex gap-3 py-2">
                            {it.image_url ? (
                              <img
                                src={it.image_url}
                                alt={it.product_name}
                                className="h-14 w-14 rounded-md object-cover bg-muted"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-14 w-14 rounded-md bg-muted" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{it.product_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {it.size ? `Size ${it.size} · ` : ""}Qty {it.quantity}
                              </p>
                            </div>
                            <span className="text-sm">{formatINR(Number(it.unit_price) * it.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {order.shipping_full_name && (
                    <div className="rounded-xl border border-border p-4 text-sm">
                      <h2 className="font-medium mb-1">Shipping to</h2>
                      <p>{order.shipping_full_name}</p>
                      <p className="text-muted-foreground">
                        {order.shipping_address_line1}, {order.shipping_city}, {order.shipping_state} -{" "}
                        {order.shipping_postal_code}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/orders">
                    View all orders <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/shop">Continue shopping</Link>
                </Button>
              </div>
            </div>
          )}

          {status === "failure" && (
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-destructive/10 grid place-items-center mb-4">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <h1 className="text-3xl font-display tracking-wide mb-1">PAYMENT FAILED</h1>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {reason || "Your payment could not be completed. No amount was deducted, or it will be refunded automatically within 5–7 business days."}
                </p>
              </div>

              {orderIdParam && (
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Reference: <span className="font-mono">#{orderIdParam.slice(0, 8).toUpperCase()}</span>
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate("/checkout")} className="flex-1">
                  <RotateCw className="mr-2 h-4 w-4" /> Try again
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/shop">Back to shop</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
