// Creates a Razorpay order and a pending row in our DB.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  image?: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return new Response(JSON.stringify({ error: "Razorpay keys not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const user = userData.user;

    const body = await req.json();
    const items: CartItem[] = body.items ?? [];
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const paymentMethod: string = body.paymentMethod ?? "razorpay";
    const shipping_address = body.shipping_address ?? {};
    const required = ["full_name", "phone", "address_line1", "city", "state", "postal_code"];
    for (const k of required) {
      if (!shipping_address[k] || String(shipping_address[k]).trim().length < 2) {
        return new Response(JSON.stringify({ error: `Missing shipping field: ${k}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (!/^\d{6}$/.test(String(shipping_address.postal_code))) {
      return new Response(JSON.stringify({ error: "Invalid postal code (must be 6 digits)" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!/^[6-9]\d{9}$/.test(String(shipping_address.phone).replace(/\D/g, ""))) {
      return new Response(JSON.stringify({ error: "Invalid Indian phone number" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Recompute totals server-side (never trust client)
    const subtotal = items.reduce((s, i) => s + Number(i.price) * Number(i.quantity), 0);
    const shipping = subtotal > 2000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;
    const amountPaise = Math.round(total * 100);

    // 1. Create Razorpay order
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`),
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `rcpt_${user.id.slice(0, 8)}_${Date.now()}`,
        notes: { user_id: user.id },
      }),
    });
    const rzpOrder = await rzpRes.json();
    if (!rzpRes.ok) {
      console.error("Razorpay error", rzpOrder);
      return new Response(JSON.stringify({ error: rzpOrder.error?.description ?? "Razorpay order failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Save pending order with service role
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: orderRow, error: orderErr } = await admin.from("orders").insert({
      user_id: user.id,
      subtotal, shipping, tax, total,
      payment_method: paymentMethod,
      status: "pending",
      razorpay_order_id: rzpOrder.id,
    }).select("id").single();

    if (orderErr || !orderRow) {
      console.error(orderErr);
      return new Response(JSON.stringify({ error: "Failed to save order" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await admin.from("order_items").insert(items.map((i) => ({
      order_id: orderRow.id,
      product_id: i.id,
      name: i.name,
      image_url: i.image ?? null,
      size: i.size ?? null,
      quantity: i.quantity,
      price: i.price,
    })));

    return new Response(JSON.stringify({
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
      orderId: orderRow.id,
      totals: { subtotal, shipping, tax, total },
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
