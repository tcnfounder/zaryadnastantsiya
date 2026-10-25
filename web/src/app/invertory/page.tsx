import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { ScenarioLinks } from "@/components/ScenarioLinks";
import { inverterFaq } from "@/data/faq";
import { productsByCategory } from "@/data/products";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Інвертори для дому — тихий резерв під блекаут",
  description:
    "Порівняння інверторів для тихого резервного живлення квартири й будинку в Україні: Must, Growatt, сценарії з АКБ без генератора.",
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
          <Link href="/gid/invertor" style={{ color: "var(--amber)", fontWeight: 600 }}>
            гід «інвертор»
          </Link>
          ,{" "}
          <Link
            href="/gid/invertor-dlya-domu"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            для дому
          </Link>{" "}
          або{" "}
          <Link
            href="/gid/hibrydnyy-invertor"
            style={{ color: "var(--amber)", fontWeight: 600 }}
          >
            гібридний
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
      <ScenarioLinks
        title="Підбір інвертора за сценарієм"
        intro="Інвертор з акумулятором — тихий резерв на довгі відключення. Почніть із гіда під вашу ситуацію."
        items={[
            { href: "/gid/invertor-dlya-kvartyry", title: "Для квартири", text: "Де розмістити, LiFePO4 чи AGM, яку потужність брати." },
            { href: "/gid/invertor-dlya-domu", title: "Для будинку", text: "Окрема лінія резерву в щитку, розрахунок АКБ." },
            { href: "/gid/invertor-dlya-kotla", title: "ДБЖ для котла", text: "Чиста синусоїда й акумулятор на 8–24 години роботи котла." },
            { href: "/gid/hibrydnyy-invertor", title: "Гібридний інвертор", text: "Мережа, АКБ і сонячні панелі в одному пристрої." },
            { href: "/gid/akumulyator-dlya-invertora", title: "Акумулятор", text: "12/24/48 В, А·год у Вт·год, LiFePO4 проти AGM і GEL." },
            { href: "/gid/dbzh", title: "ДБЖ (безперебійник)", text: "Типи ДБЖ, ВА проти Вт, коли краще інвертор." },
            { href: "/gid/invertor-2-kvt", title: "Інвертор 2 кВт", text: "Що потягне, 12 чи 24 В, перетин кабелю." },
            { href: "/gid/kupyty-invertor", title: "Як купити", text: "Чекліст перед оплатою й типові пастки в характеристиках." },
          ]}
      />
    </div>
  );
}
