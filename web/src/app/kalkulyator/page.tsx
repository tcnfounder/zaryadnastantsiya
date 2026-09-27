import type { Metadata } from "next";
import Link from "next/link";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Калькулятор зарядної станції, інвертора й генератора",
  description:
    "Онлайн-калькулятор резервного живлення для квартири й будинку в Україні: підберіть зарядну станцію, інвертор або генератор за годинами відключень, навантаженням і бюджетом.",
  keywords: [
    "калькулятор зарядної станції",
    "калькулятор інвертора",
    "яку зарядну станцію вибрати",
    "який інвертор вибрати",
    "резервне живлення калькулятор",
    "генератор для будинку",
  ],
  alternates: {
    canonical: `${site.url}/kalkulyator`,
  },
  openGraph: {
    title: "Калькулятор резервного живлення",
    description:
      "Живий підбір: станція, інвертор або генератор під ваш сценарій блекауту.",
    url: `${site.url}/kalkulyator`,
    locale: "uk_UA",
    type: "website",
  },
};

const calcFaq = [
  {
    question: "Чим калькулятор відрізняється від звичайного каталогу?",
    answer:
      "Ви вказуєте житло, години відключень і критичні прилади — алгоритм одразу показує сценарій: зарядна станція, інвертор + АКБ або генератор, з орієнтиром W/Wh і моделями.",
  },
  {
    question: "Яку зарядну станцію вибрати для квартири?",
    answer:
      "Для роутера, світла й ноутбука часто вистачає компактної станції. Якщо потрібен холодильник на кілька годин — дивіться моделі від ~1000 Wh або інвертор з АКБ. Калькулятор рахує орієнтир під ваш сценарій.",
  },
  {
    question: "Коли потрібен генератор, а не станція?",
    answer:
      "Генератор має сенс у приватному будинку з місцем на вулиці, довгими відключеннями й важкими споживачами (насос, більша частина будинку). У квартирі безпечніші станція або інвертор.",
  },
  {
    question: "Чи можна одразу замовити монтаж?",
    answer:
      "Так. Якщо сценарій потребує підключення до щита, у блоці результату залиште контакт — підберемо бригаду у вашому місті.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Як підібрати резервне живлення для дому",
  description:
    "Кроки калькулятора ZaryadnaStantsiya: сценарій відключень → рекомендація станції, інвертора або генератора.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      name: "Вкажіть тип житла",
      text: "Оберіть квартиру або приватний будинок — від цього залежить, чи можливий генератор.",
    },
    {
      "@type": "HowToStep",
      name: "Задайте години й навантаження",
      text: "Скільки тривають відключення і які прилади мають працювати обов’язково.",
    },
    {
      "@type": "HowToStep",
      name: "Отримайте підбір",
      text: "Калькулятор покаже рекомендоване джерело, орієнтир W/Wh, моделі та чи потрібен монтаж.",
    },
  ],
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
      <JsonLd data={faqJsonLd(calcFaq)} />
      <JsonLd data={howToJsonLd} />

      <div className="section-head">
        <p className="eyebrow">Калькулятор резервного живлення</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Підберіть станцію, інвертор або генератор
        </h1>
        <p>
          Ліва колонка — ваш сценарій блекауту. Права одразу показує рекомендацію,
          орієнтир потужності й моделі. Без порожнього екрану: змінюєте відповідь —
          оновлюється підбір.
        </p>
      </div>

      <EnergyCalculator />

      <nav className="calc-seo-links" aria-label="Пов’язані гіди">
        <h2>Корисні гіди після підбору</h2>
        <ul>
          <li>
            <Link href="/gid/zaryadna-stantsiya-dlya-kvartyry">
              Зарядна станція для квартири
            </Link>
          </li>
          <li>
            <Link href="/gid/zaryadni-stantsii-dlya-domu">
              Зарядні станції для дому
            </Link>
          </li>
          <li>
            <Link href="/gid/invertor-dlya-domu">Інвертор для дому</Link>
          </li>
          <li>
            <Link href="/gid/hibrydnyy-invertor">Гібридний інвертор</Link>
          </li>
          <li>
            <Link href="/gid/pidklyuchennya-invertora">Підключення інвертора</Link>
          </li>
          <li>
            <Link href="/gid/generator-dlya-domu">Генератор для дому</Link>
          </li>
          <li>
            <Link href="/gid/invertornyy-generator">Інверторний генератор</Link>
          </li>
          <li>
            <Link href="/gid/generator-3-kvt">Генератор 3 кВт</Link>
          </li>
          <li>
            <Link href="/gid/generator-5-kvt">Генератор 5 кВт</Link>
          </li>
          <li>
            <Link href="/gid/kupyty-generator">Купити генератор</Link>
          </li>
          <li>
            <Link href="/gid/kupyty-invertor">Купити інвертор</Link>
          </li>
          <li>
            <Link href="/misto">Резерв по містах</Link>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: "2.5rem" }}>
        <FaqSection
          items={calcFaq}
          title="Питання про калькулятор"
          intro="Коротко: як працює підбір станції, інвертора й генератора під блекаут."
        />
      </div>
    </div>
  );
}
