import Link from "next/link";
import { navItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark rise-in">
        Zaryadna
        <span>Stantsiya</span>
      </Link>
      <nav className="nav-links rise-in-delay" aria-label="Основна навігація">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/claim" className="btn btn-primary rise-in-delay-2">
        Отримати лідерство
      </Link>
    </header>
  );
}
