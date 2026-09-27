import type { MetadataRoute } from "next";
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
  { path: "/claim", changeFrequency: "weekly" as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${site.url}/gid/${guide.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: guide.searchVolume >= 3000 ? 0.9 : 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${site.url}${productPath(product)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: product.featured ? 0.85 : 0.75,
  }));

  return [...pages, ...guidePages, ...productPages];
}
