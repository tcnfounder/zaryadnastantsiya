import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/ProductList";
import { featuredBandCopy } from "@/data/copy";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Інвертори та АКБ для резерву",
  description:
    "Порівняння інверторів для тихого резервного живлення квартири й будинку в Україні.",
  alternates: {
    canonical: `${site.url}/invertory`,
  },
};

export default function InvertersPage() {
  return (
    <div className="page-section">
      <div className="section-head">
        <p className="eyebrow">Інвертори</p>
        <h2>Тихий резерв без шуму генератора</h2>
        <p>
          Інверторні рішення для квартир і будинків, де важливі стабільність,
          автономність і акустичний комфорт.
        </p>
      </div>
      <ProductList products={productsByCategory("inverter")} />
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
