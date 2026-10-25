import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { ScenarioLinks } from "@/components/ScenarioLinks";
import { generatorFaq } from "@/data/faq";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Генератори для дому та бізнесу",
  description:
    "Порівняння бензинових і дизельних генераторів для довгих відключень в Україні: потужність кВт, сценарії будинку, ОСББ і бізнесу.",
  alternates: {
    canonical: `${site.url}/generatory`,
  },
  openGraph: {
    title: "Генератори — порівняння для України",
    description:
      "Добірка генераторів для приватного будинку, ОСББ і малого бізнесу.",
    url: `${site.url}/generatory`,
    locale: "uk_UA",
  },
};

export default function GeneratorsPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Генератори", path: "/generatory" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Генератори</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Генератори для дому й бізнесу в Україні
        </h1>
        <p>
          Порівняння бензинових, дизельних та інверторних генераторів 3–5 кВт+
          для довгих відключень. Лише для відкритих майданчиків; для квартири
          дивіться{" "}
          <Link href="/zaryadni-stantsii" style={{ color: "var(--amber)", fontWeight: 600 }}>
            зарядні станції
          </Link>{" "}
          або{" "}
          <Link href="/invertory" style={{ color: "var(--amber)", fontWeight: 600 }}>
            інвертори
          </Link>
          . Спочатку{" "}
          <Link href="/gid/generator" style={{ color: "var(--amber)", fontWeight: 600 }}>
            гід «генератор»
          </Link>
          ,{" "}
          <Link href="/gid/generator-dlya-domu" style={{ color: "var(--amber)", fontWeight: 600 }}>
            для дому
          </Link>{" "}
          або{" "}
          <Link href="/kalkulyator" style={{ color: "var(--amber)", fontWeight: 600 }}>
            калькулятор
          </Link>
          .
        </p>
      </div>
      <ProductList products={productsByCategory("generator")} />
      <div style={{ marginTop: "3rem" }}>
        <FaqSection
          items={generatorFaq}
          title="Як обрати генератор"
          intro="Потужність, паливо й безпека встановлення — коротко перед порівнянням моделей."
        />
      </div>
      <ScenarioLinks
        title="Підбір генератора за сценарієм"
        intro="Генератор дає найбільше годин на важких навантаженнях — але тільки надворі й з правильним підключенням."
        items={[
            { href: "/gid/invertornyy-generator", title: "Інверторний", text: "Чиста синусоїда для котла й електроніки, тиха робота." },
            { href: "/gid/benzynovyy-generator", title: "Бензиновий", text: "Як порахувати потужність і витрату пального." },
            { href: "/gid/dyzelnyy-generator", title: "Дизельний", text: "Економніший під навантаженням, нюанси зимового пуску." },
            { href: "/gid/hazovyy-generator", title: "Газовий", text: "Магістральний газ чи балон, вимоги до підключення." },
            { href: "/gid/generator-3-kvt", title: "Генератор 3 кВт", text: "Що реально потягне і чого не варто вмикати разом." },
            { href: "/gid/generator-dlya-domu", title: "Для будинку", text: "План навантажень, АВР, гібрид із акумуляторами." },
            { href: "/gid/avr-dlya-generatora", title: "АВР і автозапуск", text: "Безпечне підключення до щитка без зворотного живлення мережі." },
            { href: "/gid/kupyty-generator", title: "Як купити", text: "Номінальна чи максимальна потужність, сервіс, гарантія." },
          ]}
      />
    </div>
  );
}
