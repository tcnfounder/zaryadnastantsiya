"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems } from "@/data/site";

/** Consumer sections only — the B2B page lives in the menu footer and site footer. */
const primaryNav = navItems.filter((item) => item.href !== "/claim");

const winterLinks = [
  { href: "/gid/zyma-bez-svitla", label: "Зима без світла: чекліст" },
  { href: "/gid/zaryadna-stantsiya-dlya-kotla", label: "Станція для котла" },
  { href: "/gid/dbzh-dlya-routera", label: "ДБЖ для роутера" },
  { href: "/gid/zaryadna-stantsiya-dlya-kvartyry", label: "Станція для квартири" },
  { href: "/gid/paverbank", label: "Павербанк" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes; lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`site-header${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <div className="site-header-bar">
        <Link href="/" className="brand-home" aria-label="ZaryadnaStantsiya — на головну">
          <BrandLogo />
        </Link>

        <nav className="site-nav" aria-label="Основна навігація">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link${isActive(pathname, item.href) ? " is-active" : ""}`}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <Link href="/kalkulyator" className="site-header-cta">
            <span className="site-header-cta-long">Підібрати резерв</span>
            <span className="site-header-cta-short">Підібрати</span>
          </Link>
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="site-menu-icon" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="site-menu" className="site-menu" hidden={!open}>
        <nav aria-label="Меню розділів" className="site-menu-grid">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-menu-link${isActive(pathname, item.href) ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="site-menu-heading">Популярне взимку</p>
        <ul className="site-menu-list">
          {winterLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="site-menu-footer">
          <Link href="/kalkulyator" className="btn btn-primary" onClick={() => setOpen(false)}>
            Порахувати свій сценарій
          </Link>
          <Link href="/claim" className="site-menu-b2b" onClick={() => setOpen(false)}>
            Для монтажних компаній
          </Link>
        </div>
      </div>
    </header>
  );
}
