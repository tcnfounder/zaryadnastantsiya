import { site } from "@/data/site";
import type { Product } from "@/data/products";

export const categoryPaths = {
  station: "/zaryadni-stantsii",
  generator: "/generatory",
  inverter: "/invertory",
} as const;

export const categoryLabels = {
  station: "Зарядні станції",
  generator: "Генератори",
  inverter: "Інвертори",
} as const;

export function productPath(product: Pick<Product, "id">) {
  return `/tovary/${product.id}`;
}

export function affiliatePath(product: Pick<Product, "id">) {
  return `/go/${product.id}`;
}

export function absoluteUrl(path = "") {
  if (!path) return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    description: site.description,
    areaServed: "UA",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "uk-UA",
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    description: product.seoDescription,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: categoryLabels[product.category],
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: product.priceUah,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(productPath(product)),
    },
    // No aggregateRating until we have real review counts — fake ratings hurt trust/SEO.
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    dateModified: input.dateModified,
    datePublished: input.dateModified,
    inLanguage: "uk-UA",
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    keywords: input.keywords?.join(", "),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
