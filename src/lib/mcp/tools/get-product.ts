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
  save_amount: number | null;
  material: string | null;
  sku: string;
  sizes: string[];
  colors: string[];
  details: string[];
  description: string;
  is_new: boolean;
  is_featured: boolean;
};

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description: "Get full details and images for one Sneaker Zone product by id or slug.",
  inputSchema: {
    id: z.number().int().positive().optional().describe("Numeric product id."),
    slug: z.string().trim().optional().describe("Product slug."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (id === undefined && !slug) {
      return { content: [{ type: "text", text: "Provide either id or slug." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.rpc("get_public_products");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const product = ((data ?? []) as ProductRow[]).find(
      (p) => (id !== undefined && p.id === id) || (slug && p.slug === slug),
    );
    if (!product) {
      return { content: [{ type: "text", text: "Product not found." }], isError: true };
    }

    const { data: images } = await supabase
      .from("product_images")
      .select("url, alt, sort_order")
      .eq("product_id", product.id)
      .order("sort_order");

    const result = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      price_inr: product.price,
      mrp_inr: product.original_price,
      discount_percentage: product.discount_percentage,
      save_amount_inr: product.save_amount,
      sku: product.sku,
      material: product.material,
      sizes: product.sizes,
      colors: product.colors,
      details: product.details,
      description: product.description,
      is_new: product.is_new,
      is_featured: product.is_featured,
      images: images ?? [],
      url: `https://sneaker-zone.lovable.app/product/${product.id}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: { product: result },
    };
  },
});
