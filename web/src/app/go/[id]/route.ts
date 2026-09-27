import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = getProduct(id);

  if (!product) {
    return NextResponse.redirect(new URL("/", request.url), 302);
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

  return NextResponse.redirect(product.affiliateUrl, 302);
}
