import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";

/**
 * Wrap the shop URL in a partner-network deeplink when configured.
 * Each retailer program has its own link token, so templates are per shop host:
 *   AFFILIATE_TEMPLATES='{"foxtrot.com.ua":"https://ad.admitad.com/g/AAAA/?ulp={url}",
 *                         "moyo.ua":"https://ad.admitad.com/g/BBBB/?ulp={url}"}'
 * AFFILIATE_DEEPLINK_TEMPLATE (single template) still works as a catch-all.
 * Without a match, visitors still land on the shop but no commission is tracked.
 */
function affiliateTemplates(): Record<string, string> {
  try {
    const parsed = JSON.parse(process.env.AFFILIATE_TEMPLATES?.trim() || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    console.error("[affiliate-config-error] AFFILIATE_TEMPLATES is not valid JSON");
    return {};
  }
}

function withAffiliate(url: string) {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
  const byHost = affiliateTemplates();
  const template =
    byHost[host] ??
    Object.entries(byHost).find(([h]) => host.endsWith(`.${h}`))?.[1] ??
    process.env.AFFILIATE_DEEPLINK_TEMPLATE?.trim();
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
