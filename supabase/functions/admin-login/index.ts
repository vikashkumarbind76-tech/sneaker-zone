// Admin login with server-enforced rate limiting and temporary lockouts.
// Flow:
//   1. Read recent attempts for this email.
//   2. If >= MAX_FAILURES in the WINDOW with no successful login since,
//      reject with 429 and tell the client when to retry.
//   3. Otherwise attempt password sign-in via the anon client.
//   4. Verify the user has the 'admin' role; if not, sign out + record failure.
//   5. On success, return the session for the client to set locally.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;
const LOCKOUT_MINUTES = 15;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getClientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password || email.length > 255 || password.length > 128) {
    return json({ error: "Invalid credentials" }, 400);
  }

  const ip = getClientIp(req);
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Lockout check — look at attempts in the WINDOW for this email.
  const windowStart = new Date(
    Date.now() - WINDOW_MINUTES * 60 * 1000,
  ).toISOString();

  const { data: recent, error: recentErr } = await admin
    .from("admin_login_attempts")
    .select("success, attempted_at")
    .eq("email", email)
    .gte("attempted_at", windowStart)
    .order("attempted_at", { ascending: false })
    .limit(50);

  if (recentErr) {
    console.error("attempt lookup failed", recentErr);
    return json({ error: "Service unavailable" }, 503);
  }

  // Count failures since the most recent success (if any).
  let failuresSinceSuccess = 0;
  let lastFailureAt: string | null = null;
  for (const a of recent ?? []) {
    if (a.success) break;
    failuresSinceSuccess++;
    if (!lastFailureAt) lastFailureAt = a.attempted_at as string;
  }

  if (failuresSinceSuccess >= MAX_FAILURES && lastFailureAt) {
    const unlockAt = new Date(
      new Date(lastFailureAt).getTime() + LOCKOUT_MINUTES * 60 * 1000,
    );
    if (unlockAt.getTime() > Date.now()) {
      const retryAfter = Math.ceil((unlockAt.getTime() - Date.now()) / 1000);
      return new Response(
        JSON.stringify({
          error: "locked",
          message:
            "Too many failed attempts. This account is temporarily locked.",
          retryAt: unlockAt.toISOString(),
          retryAfterSeconds: retryAfter,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
          },
        },
      );
    }
  }

  // Helper to log an attempt. Fire-and-await so the record exists before reply.
  const logAttempt = async (success: boolean, reason: string) => {
    const { error } = await admin.from("admin_login_attempts").insert({
      email,
      ip,
      success,
      reason,
    });
    if (error) console.error("attempt log failed", error);
  };

  // 2. Attempt password sign-in.
  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });

  const { data: signInData, error: signInError } =
    await anon.auth.signInWithPassword({ email, password });

  if (signInError || !signInData.session || !signInData.user) {
    await logAttempt(false, "bad_credentials");
    const remaining = Math.max(0, MAX_FAILURES - (failuresSinceSuccess + 1));
    return json(
      {
        error: "invalid_credentials",
        message: "Incorrect email or password.",
        attemptsRemaining: remaining,
      },
      401,
    );
  }

  // 3. Confirm the user is an admin.
  const { data: roleRow, error: roleErr } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", signInData.user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (roleErr) {
    console.error("role lookup failed", roleErr);
    await logAttempt(false, "role_lookup_error");
    return json({ error: "Service unavailable" }, 503);
  }

  if (!roleRow) {
    await logAttempt(false, "not_admin");
    return json(
      {
        error: "not_admin",
        message: "This account does not have admin access.",
      },
      403,
    );
  }

  // 4. Success — record it and return the session for the client to install.
  await logAttempt(true, "ok");

  return json({
    ok: true,
    session: {
      access_token: signInData.session.access_token,
      refresh_token: signInData.session.refresh_token,
    },
    user: { id: signInData.user.id, email: signInData.user.email },
  });
});
