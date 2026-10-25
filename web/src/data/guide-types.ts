export type GuideTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type Guide = {
  /** Optional ISO date of first publication (falls back to dateModified). */
  datePublished?: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  searchVolume: number;
  dateModified: string;
  intro: string;
  sections: { heading: string; body: string }[];
  /** Optional comparison / Wh-W matrices for rank-ready money pages. */
  tables?: GuideTable[];
  faqs: { question: string; answer: string }[];
  cta: "calculator" | "claim" | "stations" | "inverters" | "generators";
  relatedSlugs: string[];
  /** Unique mid-article calculator CTA (money guides). Avoid identical copy across pages. */
  midCta?: { title: string; text: string };
  /** Extra in-article links (city buy pages, etc.) that are not other guides. */
  extraLinks?: { href: string; label: string }[];
};

