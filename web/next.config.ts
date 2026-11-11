import type { NextConfig } from "next";

/**
 * Thin near-duplicate guides consolidated into stronger pages (Nov 2026).
 * Google had most of these as "Discovered/Unknown – not indexed"; a permanent
 * redirect keeps any link equity and sends users to the page that covers it.
 */
const consolidatedGuides: Record<string, string> = {
  "invertor-6-kvt": "invertor-dlya-domu",
  "invertor-8-kvt": "invertor-dlya-domu",
  "invertor-10-kvt": "invertor-dlya-domu",
  "pidklyuchennya-invertora": "invertor-dlya-domu",
  "hibrydnyy-invertor-5-kvt": "hibrydnyy-invertor",
  "hibrydnyy-invertor-6-kvt": "hibrydnyy-invertor",
  "generator-5-kvt": "generator-dlya-domu",
  "generator-dlya-kvartyry": "zaryadna-stantsiya-dlya-kvartyry",
  "komplekt-rezervnogo-zhyvlennya-kvartyra": "zaryadna-stantsiya-dlya-kvartyry",
  "rezervne-zhyvlennya": "zyma-bez-svitla",
};

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return Object.entries(consolidatedGuides).map(([from, to]) => ({
      source: `/gid/${from}`,
      destination: `/gid/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
