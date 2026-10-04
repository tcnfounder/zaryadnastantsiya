import { cities } from "@/data/cities";
import { guides, HOME_MONEY_GUIDE_SLUGS } from "@/data/guides";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { productPath } from "@/lib/seo";

/** Public IndexNow ownership key (also hosted at /{key}.txt). */
export const INDEXNOW_KEY = "3b8c52078c06493597e733bef4820a74";

export const INDEXNOW_HOST = site.domain;

export function indexNowKeyLocation() {
  return `${site.url}/${INDEXNOW_KEY}.txt`;
}

/** Collect indexable absolute URLs (same set as sitemap, minus low-value noise). */
export function collectIndexNowUrls(): string[] {
  const urls = new Set<string>();

  urls.add(`${site.url}/`);
  for (const path of [
    "/zaryadni-stantsii",
    "/generatory",
    "/invertory",
    "/kalkulyator",
    "/gid",
    "/misto",
    "/claim",
  ]) {
    urls.add(`${site.url}${path}`);
  }

  for (const guide of guides) {
    urls.add(`${site.url}/gid/${guide.slug}`);
  }
  for (const city of cities) {
    urls.add(`${site.url}/misto/${city.slug}`);
  }
  for (const product of products) {
    urls.add(`${site.url}${productPath(product)}`);
  }

  return [...urls];
}

/** Priority money URLs for post-deploy / manual IndexNow pings. */
export function collectPriorityIndexNowUrls(): string[] {
  const urls = [
    `${site.url}/`,
    `${site.url}/kalkulyator`,
    ...HOME_MONEY_GUIDE_SLUGS.map((slug) => `${site.url}/gid/${slug}`),
  ];
  return [...new Set(urls)];
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  statusText: string;
  submitted: number;
  body: string;
};

/**
 * Submit URLs to IndexNow (Bing + other engines).
 * Max 10_000 URLs per request — we chunk automatically.
 */
export async function submitToIndexNow(
  urls: string | string[],
): Promise<IndexNowResult[]> {
  const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
  if (list.length === 0) {
    return [
      {
        ok: false,
        status: 400,
        statusText: "No URLs",
        submitted: 0,
        body: "urlList empty",
      },
    ];
  }

  const chunks: string[][] = [];
  for (let i = 0; i < list.length; i += 10_000) {
    chunks.push(list.slice(i, i + 10_000));
  }

  const results: IndexNowResult[] = [];
  for (const urlList of chunks) {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: indexNowKeyLocation(),
        urlList,
      }),
    });
    const body = await response.text().catch(() => "");
    results.push({
      ok: response.ok || response.status === 202,
      status: response.status,
      statusText: response.statusText,
      submitted: urlList.length,
      body,
    });
  }
  return results;
}
