import type { Metadata } from "next";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Калькулятор резервного живлення для квартири й будинку",
  description:
    "Підберіть зарядну станцію, інвертор, генератор або гібридну СЕС під години відключень, навантаження й бюджет в Україні.",
  alternates: {
    canonical: `${site.url}/kalkulyator`,
  },
};

export default function CalculatorPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Калькулятор", path: "/kalkulyator" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Калькулятор</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Яке джерело енергії підійде вашому дому
        </h1>
        <p>
          Відповісте на кілька питань — отримаєте сценарій: станція, інвертор +
          АКБ, генератор або гібридна СЕС. Якщо потрібен монтаж, залишите контакт
          для бригади у вашому місті.
        </p>
      </div>

      <EnergyCalculator />
    </div>
  );
}
