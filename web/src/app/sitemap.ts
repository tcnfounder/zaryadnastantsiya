import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = ["", "/zaryadni-stantsii", "/generatory", "/invertory", "/claim"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
