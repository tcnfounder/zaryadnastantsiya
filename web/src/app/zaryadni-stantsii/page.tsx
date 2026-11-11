import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { ScenarioLinks } from "@/components/ScenarioLinks";
import { stationFaq } from "@/data/faq";
import { formatPrice, productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Зарядні станції: ціни й порівняння",
  description:
    "Зарядні станції EcoFlow, Bluetti, Jackery: таблиця ємності Wh, потужності W і цін у ₴, ціна за 1 Вт·год, для яких приладів і скільки годин вистачить. Купити з порівнянням.",
  alternates: {
    canonical: `${site.url}/zaryadni-stantsii`,
  },
  openGraph: {
    title: "Зарядні станції: ціни й порівняння моделей",
    description:
      "Таблиця Wh, W і цін у ₴ для популярних зарядних станцій в Україні.",
    url: `${site.url}/zaryadni-stantsii`,
    locale: "uk_UA",
  },
};

export default function StationsPage() {
  const stations = [...productsByCategory("station")].sort((a, b) => a.priceUah - b.priceUah);
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
          Зарядні станції: ціни й порівняння
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
      <aside className="guide-table-wrap" style={{ padding: "1rem 1.25rem", borderLeft: "4px solid var(--amber)" }}>
        <strong>Обираєте станцію для квартири?</strong>{" "}
        Ми розібрали це окремо: скільки Вт·год потрібно на 4–8 годин без світла, чи
        потягне станція холодильник і що встигне зарядитися між відключеннями —{" "}
        <Link href="/gid/zaryadna-stantsiya-dlya-kvartyry" style={{ color: "var(--amber)", fontWeight: 600 }}>
          зарядна станція для квартири: розрахунок і моделі
        </Link>
        .
      </aside>
      <figure className="guide-table-wrap">
        <figcaption>Порівняння зарядних станцій: ємність, потужність і ціна</figcaption>
        <div className="guide-table-scroll">
          <table className="guide-table">
            <thead>
              <tr>
                <th scope="col">Модель</th>
                <th scope="col">Ємність</th>
                <th scope="col">Потужність</th>
                <th scope="col">Ціна від</th>
                <th scope="col">₴ за 1 Вт·год</th>
                <th scope="col">Роутер 25 Вт</th>
                <th scope="col">Для чого</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/tovary/${p.id}`} style={{ fontWeight: 600 }}>
                      {p.brand} {p.name}
                    </Link>
                  </td>
                  <td>{p.capacityWh.toLocaleString("uk-UA")} Вт·год</td>
                  <td>{p.outputW.toLocaleString("uk-UA")} Вт</td>
                  <td>{formatPrice(p.priceUah)}</td>
                  <td>{(p.priceUah / p.capacityWh).toFixed(0)} ₴</td>
                  {/* 0.85 = typical inverter losses + reserve, same factor as the calculator guide */}
                  <td>≈ {Math.floor((p.capacityWh * 0.85) / 25)} год</td>
                  <td>{p.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted, #5e574e)", margin: "0.5rem 0 0" }}>
          Ціни орієнтовні, перевіряйте актуальну вартість у магазині. Час роботи роутера —
          з урахуванням ~15 % втрат інвертора; точний розрахунок під ваші прилади — у{" "}
          <Link href="/kalkulyator">калькуляторі</Link>.
        </p>
      </figure>
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
