# Sneaker Zone — Website Info Summary

## Live URL
https://sneaker-zone.lovable.app

## Status
Published

## Recent changes
- Updated project branding to **Sneaker Zone**.
- Live URL slug set to **sneaker-zone**.
- Aligned SEO metadata (title, Open Graph, JSON-LD), sitemap and robots.txt to the new Lovable URL.
- Secured storefront product queries: the internal `cost_price` column is no longer accessible to public users; products are served through the `get_public_products()` security-definer RPC.
- Locked down order creation: `orders` and `order_items` are now only inserted by the `create-razorpay-order` edge function using `service_role`.

## Pages
- Home `/`
- Shop `/shop`
- About `/about`
- Contact `/contact`
- Product detail `/product/:id`
- Cart `/cart`
- Wishlist `/wishlist`
- Orders `/orders`
- Checkout `/checkout`
- Payment status `/payment/:orderId`
- Admin `/admin` (admin only)
- Admin login `/admin/login`
- Admin reset `/admin/reset-password`
