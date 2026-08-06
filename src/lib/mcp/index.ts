import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchProductsTool from "./tools/search-products";
import getProductTool from "./tools/get-product";
import listMyOrdersTool from "./tools/list-my-orders";
import getOrderTool from "./tools/get-order";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "sneaker-zone",
  title: "Sneaker Zone",
  version: "0.1.0",
  instructions:
    "Tools for Sneaker Zone, a premium sneaker and streetwear store. Use `search_products` to browse the catalog, `get_product` for full details of one sneaker, and `list_my_orders` / `get_order` to check the signed-in customer's orders.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchProductsTool, getProductTool, listMyOrdersTool, getOrderTool],
});
