"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems } from "@/data/site";

type SiteHeaderProps = {
  /** When true, header is positioned inside the hero instead of the viewport shell. */
  embedded?: boolean;
};

export function SiteHeader({ embedded = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${embedded ? " is-embedded" : ""}${scrolled ? " is-scrolled" : ""}`}
    >
      <div className="site-header-bar">
        <Link
          href="/"
          className="brand-home"
          aria-label="ZaryadnaStantsiya — на головну"
        >
          <BrandLogo />
        </Link>

        <nav className="site-nav" aria-label="Основна навігація">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/claim" className="site-header-cta">
          Для бізнесу
        </Link>
      </div>
    </header>
  );
}
