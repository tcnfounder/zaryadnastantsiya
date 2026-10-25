import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { ScenarioLinks } from "@/components/ScenarioLinks";
import { stationFaq } from "@/data/faq";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Зарядні станції для дому та квартири",
  description:
    "Порівняння портативних зарядних станцій в Україні: ємність Wh, потужність W, сценарії відключень, ціни та огляди моделей EcoFlow, Bluetti, Jackery.",
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
          Зарядні станції для квартири й дому
        </h1>
        <p>
          Порівнюйте ємність (Wh), вихідну потужність (W) і орієнтовну ціну в ₴.
          Читайте{" "}
          <Link href="/gid/zaryadna-stantsiya" style={{ color: "var(--amber)", fontWeight: 600 }}>
            гід «зарядна станція»
          </Link>
          ,{" "}
          <Link
            href="/gid/portatyvna-zaryadna-stantsiya"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            портативну
          </Link>
          ,{" "}
          <Link
            href="/gid/kupyty-zaryadnu-stantsiyu"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            як купити
          </Link>
          ,{" "}
          <Link href="/gid/ecoflow" style={{ color: "var(--amber)", fontWeight: 600 }}>
            EcoFlow
          </Link>{" "}
          /{" "}
          <Link href="/gid/bluetti" style={{ color: "var(--amber)", fontWeight: 600 }}>
            Bluetti
          </Link>{" "}
          або{" "}
          <Link href="/kalkulyator" style={{ color: "var(--amber)", fontWeight: 600 }}>
            калькулятор
          </Link>
          .
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
      <ScenarioLinks
        title="Підбір станції за сценарієм"
        intro="Оберіть свою ситуацію — у кожному гіді є розрахунок Вт·год під ваші прилади й години відключень."
        items={[
            { href: "/gid/zaryadna-stantsiya-dlya-kvartyry", title: "Для квартири", text: "Роутер, світло, холодильник: скільки Вт·год потрібно на 4–12 годин." },
            { href: "/gid/zaryadni-stantsii-dlya-domu", title: "Для приватного будинку", text: "Що реально покриє станція, а де потрібен інвертор чи генератор." },
            { href: "/gid/zaryadna-stantsiya-dlya-kotla", title: "Для газового котла", text: "Чиста синусоїда, споживання котла й насоса, години роботи." },
            { href: "/gid/dbzh-dlya-routera", title: "Тільки інтернет", text: "ДБЖ або повербанк для роутера й оптичного терміналу." },
            { href: "/gid/zaryadna-stantsiya-300-vt", title: "Компактна 300 Вт", text: "Телефони, ноутбук, роутер — і чого вона не потягне." },
            { href: "/gid/zaryadna-stantsiya-2-kvt", title: "Потужна 2 кВт", text: "Холодильник, мікрохвильовка, чайник короткочасно." },
            { href: "/gid/reytynh-zaryadnykh-stantsiy", title: "Рейтинг 2026", text: "Порівняння моделей за ціною за Вт·год і потужністю." },
            { href: "/gid/zaryadna-stantsiya-z-sonyachnoyu-panellyu", title: "З сонячною панеллю", text: "Скільки реально дасть панель восени й узимку." },
          ]}
      />
    </div>
  );
}
