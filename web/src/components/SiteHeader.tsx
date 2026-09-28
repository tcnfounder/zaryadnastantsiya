"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoVariant = onHome && !scrolled ? "light" : "dark";

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-bar">
        <Link
          href="/"
          className="brand-home"
          aria-label="ZaryadnaStantsiya — на головну"
        >
          <BrandLogo variant={logoVariant} />
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
