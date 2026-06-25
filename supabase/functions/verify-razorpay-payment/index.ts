// Verifies a Razorpay payment signature and marks the order paid.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { createHmac } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!RAZORPAY_KEY_SECRET) {
      return new Response(JSON.stringify({ error: "Razorpay not configured" }), {
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
    const { data: userData } = await userClient.auth.getUser();
    if (!userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expected = createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch existing order for idempotency check
    const { data: existing, error: fetchErr } = await admin.from("orders")
      .select("id, status, razorpay_payment_id")
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", userData.user.id)
      .maybeSingle();

    if (fetchErr || !existing) {
      console.error(JSON.stringify({ fn: "verify-razorpay-payment", event: "order_not_found", code: fetchErr?.code ?? null }));
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (expected !== razorpay_signature) {
      if (existing.status !== "confirmed" && existing.status !== "failed") {
        await admin.from("orders").update({ status: "failed" })
          .eq("id", existing.id)
          .eq("status", existing.status);
      }
      console.error(JSON.stringify({ fn: "verify-razorpay-payment", event: "signature_mismatch" }));
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Idempotent: already confirmed with same payment_id → return success without re-updating
    if (existing.status === "confirmed" && existing.razorpay_payment_id === razorpay_payment_id) {
      return new Response(JSON.stringify({ success: true, orderId: existing.id, idempotent: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existing.status === "confirmed") {
      console.error(JSON.stringify({ fn: "verify-razorpay-payment", event: "payment_id_conflict" }));
      return new Response(JSON.stringify({ error: "Order already confirmed with a different payment" }), {
        status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existing.status === "failed") {
      return new Response(JSON.stringify({ error: "Order is marked failed" }), {
        status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Conditional update: only transition if still in current status and no payment id yet
    const { data, error } = await admin.from("orders").update({
      status: "confirmed",
      razorpay_payment_id,
      razorpay_signature,
    })
      .eq("id", existing.id)
      .eq("status", existing.status)
      .is("razorpay_payment_id", null)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      // Lost a race — re-read and return idempotent success if another request already confirmed it
      const { data: after } = await admin.from("orders")
        .select("id, status, razorpay_payment_id")
        .eq("id", existing.id)
        .maybeSingle();
      if (after?.status === "confirmed" && after.razorpay_payment_id === razorpay_payment_id) {
        return new Response(JSON.stringify({ success: true, orderId: after.id, idempotent: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error(JSON.stringify({ fn: "verify-razorpay-payment", event: "order_update_failed", code: error?.code ?? null }));
      return new Response(JSON.stringify({ error: "Order could not be updated" }), {
        status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, orderId: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error(JSON.stringify({ fn: "verify-razorpay-payment", event: "unhandled_exception", name: err.name, message: err.message }));
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
