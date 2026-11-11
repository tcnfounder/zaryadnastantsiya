import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Manrope, Teko, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AppHeader } from "@/components/AppHeader";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import WebMcpRegister from "@/components/WebMcpRegister";
import { site } from "@/data/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f0ebe3",
};

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const brand = Teko({
  variable: "--font-brand",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — підбір резервного живлення в Україні`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/logo-mark.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: `${site.url}/`,
  },
  openGraph: {
    title: `${site.name} — підбір резервного живлення`,
    description: site.tagline,
    url: `${site.url}/`,
    siteName: site.name,
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/og-zaryadna.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — резервне живлення`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${unbounded.variable} ${manrope.variable} ${brand.variable} h-full`}
    >
      <body className="site-shell min-h-full flex flex-col antialiased">
        <GoogleAnalytics />
        {/* Cookieless Vercel Web Analytics: second counter to cross-check GA4. */}
        <Analytics />
        <WebMcpRegister />
        <AppHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-cols">
            <nav aria-label="Розділи">
              <p className="site-footer-heading">Розділи</p>
              <ul>
                <li><Link href="/zaryadni-stantsii">Зарядні станції</Link></li>
                <li><Link href="/invertory">Інвертори</Link></li>
                <li><Link href="/generatory">Генератори</Link></li>
                <li><Link href="/kalkulyator">Калькулятор резерву</Link></li>
                <li><Link href="/gid">Усі гіди</Link></li>
              </ul>
            </nav>
            <nav aria-label="Популярні гіди">
              <p className="site-footer-heading">Популярне взимку</p>
              <ul>
                <li><Link href="/gid/zyma-bez-svitla">Зима без світла: чекліст</Link></li>
                <li><Link href="/gid/zaryadna-stantsiya-dlya-kotla">Станція для котла</Link></li>
                <li><Link href="/gid/zaryadna-stantsiya-dlya-kvartyry">Станція для квартири</Link></li>
                <li><Link href="/gid/dbzh-dlya-routera">ДБЖ для роутера</Link></li>
                <li><Link href="/gid/paverbank">Павербанк</Link></li>
              </ul>
            </nav>
            <nav aria-label="Міста">
              <p className="site-footer-heading">Міста</p>
              <ul>
                <li><Link href="/misto/kyiv">Київ</Link></li>
                <li><Link href="/misto/lviv">Львів</Link></li>
                <li><Link href="/misto/odesa">Одеса</Link></li>
                <li><Link href="/misto/kharkiv">Харків</Link></li>
                <li><Link href="/misto/dnipro">Дніпро</Link></li>
              </ul>
            </nav>
            <nav aria-label="Про проєкт">
              <p className="site-footer-heading">Про проєкт</p>
              <ul>
                <li><Link href="/pro-nas">Про нас</Link></li>
                <li><Link href="/yak-my-rakhuyemo">Як ми рахуємо</Link></li>
                <li><Link href="/claim">Для монтажних компаній</Link></li>
                <li><a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a></li>
              </ul>
            </nav>
          </div>
          <p>
            {site.name} · незалежний гід по {site.domain}. Дані оновлюються для
            сценаріїв квартири, будинку й бізнесу в Україні.
          </p>
          <p>
            Оцінки моделей — редакційні: за ємністю, потужністю, ціною в ₴ і
            сервісом в Україні. Кнопки «Дивитись
            пропозиції» — партнерські посилання: ми можемо отримати комісію, ціна
            для вас не змінюється. Монтажні компанії з позначкою «Реклама»
            оплатили розміщення.{" "}
            <a href="/pro-nas">Про нас</a> ·{" "}
            <a href="/yak-my-rakhuyemo">Як ми рахуємо</a> ·{" "}
            <a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a>
          </p>
          <p className="site-footer-credit">
            <a
              href="https://www.jettfy.com/uk"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-credit-link"
            >
              <span>Розробка:</span>
              <img
                src="/brand/jettfy-logo.svg"
                alt="Jettfy"
                width={75}
                height={30}
                className="site-footer-credit-logo"
              />
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
