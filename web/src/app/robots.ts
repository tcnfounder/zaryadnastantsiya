import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Fallback robots for Next metadata. Middleware serves /robots.txt with
 * Content-Signal + AI bot groups so CDN caches cannot strip agent directives.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/go/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.domain,
  };
}
