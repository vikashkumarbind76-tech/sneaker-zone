import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  original_price: number | null;
  discount_percentage: number | null;
  is_new: boolean;
  is_featured: boolean;
  sizes: string[];
  colors: string[];
  description: string;
};

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search the Sneaker Zone catalog by keyword, brand, category, price range or featured/new flags.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text match on product name or description."),
    brand: z.string().trim().optional().describe("Brand name, e.g. PUMA, Red Tape, Adidas."),
    category: z.string().trim().optional().describe("Product category."),
    max_price: z.number().positive().optional().describe("Maximum sale price in INR."),
    min_price: z.number().nonnegative().optional().describe("Minimum sale price in INR."),
    featured_only: z.boolean().optional().describe("Only return featured products."),
    new_only: z.boolean().optional().describe("Only return newly added products."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.rpc("get_public_products");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const q = input.query?.toLowerCase();
    const rows = ((data ?? []) as ProductRow[]).filter((p) => {
      if (q && !`${p.name} ${p.description} ${p.brand}`.toLowerCase().includes(q)) return false;
      if (input.brand && p.brand.toLowerCase() !== input.brand.toLowerCase()) return false;
      if (input.category && p.category.toLowerCase() !== input.category.toLowerCase()) return false;
      if (input.max_price !== undefined && p.price > input.max_price) return false;
      if (input.min_price !== undefined && p.price < input.min_price) return false;
      if (input.featured_only && !p.is_featured) return false;
      if (input.new_only && !p.is_new) return false;
      return true;
    }).slice(0, input.limit ?? 20);

    const products = rows.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price_inr: p.price,
      mrp_inr: p.original_price,
      discount_percentage: p.discount_percentage,
      sizes: p.sizes,
      colors: p.colors,
      url: `https://sneaker-zone.lovable.app/product/${p.id}`,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
      structuredContent: { count: products.length, products },
    };
  },
});
