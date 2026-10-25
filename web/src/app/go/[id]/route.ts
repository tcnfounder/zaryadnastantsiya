import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";

/**
 * Wrap the shop URL in a partner-network deeplink when configured, e.g.
 * AFFILIATE_DEEPLINK_TEMPLATE="https://ad.admitad.com/g/XXXX/?ulp={url}"
 * Without it, visitors still land on the shop but no commission is tracked.
 */
function withAffiliate(url: string) {
  const template = process.env.AFFILIATE_DEEPLINK_TEMPLATE?.trim();
  if (!template || !template.includes("{url}")) return url;
  return template.replace("{url}", encodeURIComponent(url));
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = getProduct(id);

  const noindex = { "X-Robots-Tag": "noindex, nofollow" };

  if (!product) {
    const res = NextResponse.redirect(new URL("/", request.url), 302);
    Object.entries(noindex).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }

  console.info(
    "[affiliate-click]",
    JSON.stringify({
      id: product.id,
      brand: product.brand,
      category: product.category,
      at: new Date().toISOString(),
    }),
  );

  const res = NextResponse.redirect(withAffiliate(product.affiliateUrl), 302);
  Object.entries(noindex).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
