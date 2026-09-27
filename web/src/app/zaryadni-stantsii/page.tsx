import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { featuredBandCopy } from "@/data/copy";
import { stationFaq } from "@/data/faq";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Зарядні станції для дому та квартири",
  description:
    "Порівняння портативних зарядних станцій в Україні: ємність Wh, потужність W, сценарії відключень, ціни та огляди моделей EcoFlow, Bluetti, Jackery.",
  keywords: [
    "зарядна станція",
    "портативна зарядна станція",
    "EcoFlow",
    "Bluetti",
    "резервне живлення квартира",
  ],
  alternates: {
    canonical: `${site.url}/zaryadni-stantsii`,
  },
  openGraph: {
    title: "Зарядні станції — порівняння для України",
    description:
      "Добірка портативних станцій під реальні години блекауту в квартирі й будинку.",
    url: `${site.url}/zaryadni-stantsii`,
    locale: "uk_UA",
  },
};

export default function StationsPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Зарядні станції", path: "/zaryadni-stantsii" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Зарядні станції</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Портативні станції під реальні години блекауту
        </h1>
        <p>
          Порівнюйте ємність (Wh), вихідну потужність (W) і орієнтовну ціну в ₴.
          Відкрийте картку моделі для SEO-огляду або одразу перейдіть до актуальних
          пропозицій магазинів.
        </p>
      </div>
      <ProductList products={productsByCategory("station")} />
      <div style={{ marginTop: "3rem" }}>
        <FaqSection
          items={stationFaq}
          title="Як обрати зарядну станцію"
          intro="Короткі відповіді по ємності, потужності та сценаріях квартири."
        />
      </div>
      <div className="featured-band" style={{ marginTop: "2rem" }}>
        <div>
          <p className="eyebrow" style={{ color: "var(--amber-bright)" }}>
            Featured
          </p>
          <h2>{featuredBandCopy.title}</h2>
          <p>{featuredBandCopy.body}</p>
        </div>
        <Link href="/claim" className="btn btn-primary">
          Забрати профіль
        </Link>
      </div>
    </div>
  );
}
