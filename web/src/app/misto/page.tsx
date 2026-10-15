import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Купити зарядну станцію по містах",
  description:
    "Купити зарядну станцію в Києві, Львові, Одесі, Харкові й Дніпрі: ціна, вати, кому підходить модель, далі калькулятор і монтаж.",
  alternates: {
    canonical: `${site.url}/misto`,
  },
};

export default function CitiesIndexPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Міста", path: "/misto" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Міста</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Купити зарядну станцію по містах
        </h1>
        <p>
          Київ, Львів, Одеса, Харків, Дніпро: на кожній сторінці ціна, вати і
          кому підходить модель. Далі — калькулятор і монтаж, якщо резерв іде в
          щит.
        </p>
      </div>

      <ol className="guide-index">
        {cities.map((city, index) => (
          <li key={city.slug}>
            <span className="guide-index-rank">{index + 1}</span>
            <div>
              <Link href={`/misto/${city.slug}`}>{city.h1}</Link>
              <p>{city.description}</p>
            </div>
            <strong>{city.name}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
