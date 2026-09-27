import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { featuredBandCopy } from "@/data/copy";
import { inverterFaq } from "@/data/faq";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Інвертори для дому — тихий резерв під блекаут",
  description:
    "Порівняння інверторів для тихого резервного живлення квартири й будинку в Україні: Must, Growatt, сценарії з АКБ без генератора.",
  keywords: [
    "інвертор",
    "інвертор для дому",
    "інвертор з АКБ",
    "гібридний інвертор",
    "резервне живлення",
    "Growatt",
    "Must",
  ],
  alternates: {
    canonical: `${site.url}/invertory`,
  },
  openGraph: {
    title: "Інвертори для дому — тихий резерв",
    description:
      "Інверторні рішення з АКБ для квартир і будинків без шуму генератора.",
    url: `${site.url}/invertory`,
    locale: "uk_UA",
  },
};

export default function InvertersPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Інвертори", path: "/invertory" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Інвертори</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Інвертори для дому з АКБ під блекаут
        </h1>
        <p>
          Тихий резерв для квартири й будинку: інвертор + акумулятор без вихлопу.
          Спочатку прочитайте{" "}
          <Link
            href="/gid/invertor-dlya-domu"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            гід «інвертор для дому»
          </Link>{" "}
          або{" "}
          <Link
            href="/gid/hibrydnyy-invertor"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            гібридний інвертор
          </Link>
          ; для портативного сценарію —{" "}
          <Link href="/zaryadni-stantsii" style={{ color: "var(--amber)", fontWeight: 600 }}>
            зарядні станції
          </Link>
          , для довгих відключень на вулиці —{" "}
          <Link href="/gid/generator-dlya-domu" style={{ color: "var(--amber)", fontWeight: 600 }}>
            генератор для дому
          </Link>
          .
        </p>
      </div>
      <ProductList products={productsByCategory("inverter")} />
      <div style={{ marginTop: "3rem" }}>
        <FaqSection
          items={inverterFaq}
          title="Як обрати інвертор"
          intro="Тихий резерв і ємність АКБ під ваші години відключень."
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
