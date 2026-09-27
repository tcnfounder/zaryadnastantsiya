import type { Metadata, Viewport } from "next";
import { Manrope, Teko, Unbounded } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  keywords: [
    "зарядна станція",
    "портативна зарядна станція",
    "генератор",
    "інвертор",
    "резервне живлення",
    "EcoFlow",
    "Україна",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: `${site.name} — підбір резервного живлення`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/hero-power-station.jpg",
        width: 1920,
        height: 1080,
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
        <AppHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="site-footer">
          <p>
            {site.name} · незалежний гід по {site.domain}. Дані оновлюються для
            сценаріїв квартири, будинку й бізнесу в Україні.
          </p>
        </footer>
      </body>
    </html>
  );
}
