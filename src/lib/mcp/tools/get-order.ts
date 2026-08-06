import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_order",
  title: "Get order",
  description: "Get one of the signed-in customer's Sneaker Zone orders by order id, with line items.",
  inputSchema: { order_id: z.string().uuid().describe("The order UUID.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ order_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, created_at, status, payment_method, subtotal, tax, shipping, total, shipping_full_name, shipping_phone, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_postal_code, shipping_country, order_items(name, size, quantity, price, image_url)",
      )
      .eq("user_id", ctx.getUserId()!)
      .eq("id", order_id)
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: "Order not found." }], isError: true };

    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { order: data },
    };
  },
});
