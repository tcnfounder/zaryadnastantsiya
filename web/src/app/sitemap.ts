import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { productPath } from "@/lib/seo";

const staticRoutes = [
  { path: "", changeFrequency: "daily" as const, priority: 1 },
  { path: "/zaryadni-stantsii", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/generatory", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/invertory", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/kalkulyator", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/gid", changeFrequency: "weekly" as const, priority: 0.92 },
  { path: "/misto", changeFrequency: "weekly" as const, priority: 0.88 },
  { path: "/claim", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/llms.txt", changeFrequency: "weekly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const fallbackDate = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: fallbackDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${site.url}/gid/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: "weekly" as const,
    priority:
      guide.searchVolume >= 50000 ? 0.95 : guide.searchVolume >= 3000 ? 0.9 : 0.8,
  }));

  const cityPages = cities.map((city) => ({
    url: `${site.url}/misto/${city.slug}`,
    lastModified: fallbackDate,
    changeFrequency: "weekly" as const,
    priority: 0.86,
  }));

  const productPages = products.map((product) => ({
    url: `${site.url}${productPath(product)}`,
    lastModified: fallbackDate,
    changeFrequency: "weekly" as const,
    priority: product.featured ? 0.85 : 0.75,
  }));

  return [...pages, ...guidePages, ...cityPages, ...productPages];
}
