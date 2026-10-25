import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Про нас і методологія",
  description:
    "Хто готує гіди ZaryadnaStantsiya, як ми рахуємо Вт і Вт·год, як оцінюємо моделі, як заробляємо на партнерських посиланнях і як з нами зв’язатися.",
  alternates: {
    canonical: `${site.url}/pro-nas`,
  },
};

const headingStyle = {
  margin: "0 0 0.55rem",
} as const;

export default function AboutPage() {
  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Про нас", path: "/pro-nas" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `Про ${site.name}`,
          url: `${site.url}/pro-nas`,
          inLanguage: "uk-UA",
          about: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.salesEmail,
          },
        }}
      />

      <article className="guide-article">
        <div className="section-head">
          <p className="eyebrow">Про проєкт</p>
          <h1
            className="font-display"
            style={{
              margin: "0 0 0.75rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Про {site.name} і як ми працюємо
          </h1>
          <p>
            {site.name} — незалежний український гід із резервного живлення:
            зарядні станції, інвертори з акумуляторами, ДБЖ і генератори. Ми
            допомагаємо підібрати рішення під реальний сценарій відключень —
            квартиру, будинок, котел чи невеликий офіс — без маркетингових
            обіцянок виробників.
          </p>
        </div>

        <section className="guide-block">
          <h2 style={headingStyle}>Хто ми</h2>
          <p>
            Гіди пише й оновлює редакція {site.name}. Ми не є магазином і не
            продаємо техніку напряму. Наше завдання — пояснити, скільки
            енергії вам потрібно, що реально потягне обране обладнання і де
            найчастіше помиляються покупці.
          </p>
        </section>

        <section className="guide-block" id="metodolohiya">
          <h2 style={headingStyle}>Методологія: як ми готуємо гіди</h2>
          <ul className="guide-list">
            <li>
              Рахуємо від навантаження: потужність приладів у ватах (Вт),
              тривалість відключення в годинах і запас енергії у ват-годинах
              (Вт·год). Кожен гід містить розрахунок, який ви можете
              перевірити самостійно.
            </li>
            <li>
              Враховуємо втрати: ККД інвертора (типово 85–93 %), корисну
              глибину розряду акумулятора (свинцево-кислотні ≈ 50 %, LiFePO4
              80–95 %) і пускові струми холодильників, насосів і котлів.
            </li>
            <li>
              Характеристики моделей беремо з офіційних специфікацій
              виробників. Ціни в гривнях — орієнтовні на дату оновлення гіда;
              перед покупкою звіряйте їх у магазині.
            </li>
            <li>
              Ми не проводимо лабораторних тестів і прямо про це пишемо.
              Оцінки моделей — редакційні: співвідношення ціни до ємності,
              вихідна потужність, хімія акумулятора, ресурс і наявність
              сервісу в Україні.
            </li>
            <li>
              Безпека понад усе: генератори — тільки надворі, підключення до
              щитка — тільки через перемикач або АВР і лише кваліфікованим
              електриком.
            </li>
          </ul>
        </section>

        <section className="guide-block">
          <h2 style={headingStyle}>Як ми оновлюємо матеріали</h2>
          <p>
            Дата «Перевірено» на кожному гіді означає, коли редакція востаннє
            звірила розрахунки, ціни та посилання. Під час сезону відключень
            ми переглядаємо ключові гіди щонайменше раз на місяць. Знайшли
            помилку чи застарілу ціну — напишіть нам, виправимо.
          </p>
        </section>

        <section className="guide-block" id="yak-my-zaroblyayemo">
          <h2 style={headingStyle}>Як ми заробляємо</h2>
          <p>
            Сайт безкоштовний для читачів. Частина кнопок «Дивитись
            пропозиції» — партнерські посилання: якщо ви купите товар після
            переходу, магазин може виплатити нам комісію. Ціна для вас від
            цього не змінюється, а наявність партнерської програми не впливає
            на те, яку модель ми рекомендуємо під ваш сценарій.
          </p>
          <p>
            Монтажні компанії можуть платно розмістити профіль у розділі
            міст; такі блоки завжди позначені як реклама.
          </p>
        </section>

        <section className="guide-block">
          <h2 style={headingStyle}>Контакти</h2>
          <p>
            Пошта редакції:{" "}
            <a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a>.
            Запити від медіа, пропозиції співпраці та виправлення —
            туди ж. Для монтажних компаній —{" "}
            <Link href="/claim">сторінка для бізнесу</Link>.
          </p>
          <p>
            Почати підбір можна з <Link href="/kalkulyator">калькулятора
            резервного живлення</Link> або з{" "}
            <Link href="/gid">гідів</Link>.
          </p>
        </section>
      </article>
    </div>
  );
}
