import { supabase } from "@/integrations/supabase/client";

/**
 * Best-effort client error logger. Writes to public.client_errors.
 * Never throws — logging failures must not crash the app.
 */
export async function logClientError(
  error: unknown,
  context?: { route?: string }
): Promise<void> {
  try {
    const err = error instanceof Error ? error : new Error(String(error));
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("client_errors").insert({
      user_id: user?.id ?? null,
      message: err.message.slice(0, 2000),
      stack: err.stack?.slice(0, 8000) ?? null,
      route: (context?.route ?? (typeof window !== "undefined" ? window.location.pathname : null))?.slice(0, 500) ?? null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
  } catch {
    // swallow — logger must never throw
  }
}
