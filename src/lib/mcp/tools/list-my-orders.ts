import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_my_orders",
  title: "List my orders",
  description: "List the signed-in customer's Sneaker Zone orders with items and status.",
  inputSchema: {
    status: z.string().trim().optional().describe("Filter by order status, e.g. confirmed, pending."),
    limit: z.number().int().min(1).max(50).optional().describe("Max orders to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("orders")
      .select(
        "id, created_at, status, payment_method, subtotal, tax, shipping, total, shipping_full_name, shipping_city, shipping_state, order_items(name, size, quantity, price)",
      )
      .eq("user_id", ctx.getUserId()!)
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { count: data?.length ?? 0, orders: data ?? [] },
    };
  },
});
