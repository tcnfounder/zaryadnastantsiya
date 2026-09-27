import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-home rise-in" aria-label="ZaryadnaStantsiya — на головну">
        <BrandLogo />
      </Link>
      <nav className="nav-links rise-in-delay" aria-label="Основна навігація">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/claim" className="btn btn-primary header-cta rise-in-delay-2">
        Для бізнесу
      </Link>
    </header>
  );
}
