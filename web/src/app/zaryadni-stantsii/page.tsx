import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/ProductList";
import { featuredBandCopy } from "@/data/copy";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Зарядні станції для дому та квартири",
  description:
    "Порівняння портативних зарядних станцій в Україні: ємність, потужність, сценарії відключень і ціни.",
  alternates: {
    canonical: `${site.url}/zaryadni-stantsii`,
  },
};

export default function StationsPage() {
  return (
    <div className="section" style={{ paddingTop: "2rem" }}>
      <div className="section-head">
        <p className="eyebrow">Зарядні станції</p>
        <h2>Портативні станції під реальні години блекауту</h2>
        <p>
          Добірка моделей для квартири й будинку з прозорим порівнянням ємності,
          потужності та ціни.
        </p>
      </div>
      <ProductList products={productsByCategory("station")} />
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
