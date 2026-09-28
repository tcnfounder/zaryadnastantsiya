import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { guidesByVolume } from "@/data/guides";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Гіди з резервного живлення для квартири й будинку",
  description:
    "Практичні гіди: відключення світла, портативна зарядна станція, інвертор 12 220, акумулятор для інвертора, бензиновий і дизельний генератор в Україні.",
  alternates: {
    canonical: `${site.url}/gid`,
  },
};

export default function GuidesIndexPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Гіди", path: "/gid" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">SEO-гіди</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Підбір під реальні запити українців
        </h1>
        <p>
          Сторінки зібрані навколо попиту на станції, інвертори й генератори.
          Кожен гід веде в калькулятор або до монтажної компанії.
        </p>
      </div>

      <ol className="guide-index">
        {guidesByVolume.map((guide, index) => (
          <li key={guide.slug}>
            <span className="guide-index-rank">{index + 1}</span>
            <div>
              <Link href={`/gid/${guide.slug}`}>{guide.h1}</Link>
              <p>{guide.description}</p>
            </div>
            <strong>~{guide.searchVolume.toLocaleString("uk-UA")}/міс</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
