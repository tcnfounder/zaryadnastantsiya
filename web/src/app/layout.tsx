import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Unbounded } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

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

const brand = Bricolage_Grotesque({
  variable: "--font-brand",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
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
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
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
    images: [{ url: "/logo.png", width: 512, height: 512, alt: site.name }],
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
        <SiteHeader />
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
