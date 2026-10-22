export const site = {
  name: "ZaryadnaStantsiya",
  shortName: "Zaryadna",
  domain: "zaryadnastantsiya.com.ua",
  tagline: "Підберіть зарядну станцію, інвертор або генератор під ваш сценарій відключень.",
  description:
    "Незалежний гід і порівняння зарядних станцій, інверторів та генераторів для квартири, будинку й бізнесу в Україні.",
  url: "https://zaryadnastantsiya.com.ua",
  /** B2B / claim — always project domain, never another brand mailbox */
  salesEmail: "info@zaryadnastantsiya.com.ua",
  /**
   * Last real update of catalog, city and static pages (prices, specs, copy).
   * Bump this when that content changes — the sitemap uses it as lastmod.
   */
  contentUpdatedAt: "2026-10-15",
};

export const navItems = [
  { href: "/zaryadni-stantsii", label: "Станції" },
  { href: "/generatory", label: "Генератори" },
  { href: "/invertory", label: "Інвертори" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/gid", label: "Гіди" },
  { href: "/misto", label: "Міста" },
  { href: "/claim", label: "Для бізнесу" },
];
