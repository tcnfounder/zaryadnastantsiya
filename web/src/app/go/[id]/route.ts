import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";

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

  const res = NextResponse.redirect(product.affiliateUrl, 302);
  Object.entries(noindex).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
