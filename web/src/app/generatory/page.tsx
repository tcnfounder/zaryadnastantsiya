import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/ProductList";
import { featuredBandCopy } from "@/data/copy";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Генератори для дому та бізнесу",
  description:
    "Порівняння дизельних і бензинових генераторів для довгих відключень в Україні.",
  alternates: {
    canonical: `${site.url}/generatory`,
  },
};

export default function GeneratorsPage() {
  return (
    <div className="page-section">
      <div className="section-head">
        <p className="eyebrow">Генератори</p>
        <h2>Потужність для довгих відключень</h2>
        <p>
          Добірка рішень для приватного будинку, ОСББ і малого бізнесу з
          прозорими орієнтирами по потужності.
        </p>
      </div>
      <ProductList products={productsByCategory("generator")} />
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
