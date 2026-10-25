import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { guidesByVolume } from "@/data/guides";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Гіди з резервного живлення для квартири й будинку",
  description:
    "Практичні гіди: інвертор 2/3/5/6 кВт, Deye 6 кВт, гібридний інвертор, портативна зарядна станція, генератор в Україні.",
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
        <p className="eyebrow">Гіди</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Гіди з підбору резервного живлення
        </h1>
        <p>
          Як обрати станцію, інвертор чи генератор: ціни в гривнях, Wh і W,
          типові сценарії відключень. Кожен гід містить розрахунок, який можна
          перевірити, і веде в калькулятор для точного підбору.
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
            <strong>{new Date(guide.dateModified).toLocaleDateString("uk-UA")}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
