import type { Metadata } from "next";
import Link from "next/link";
import { EnergyCalculator } from "@/components/EnergyCalculator";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  calculatorWebAppJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Калькулятор зарядної станції, інвертора й генератора",
  description:
    "Онлайн-калькулятор резервного живлення для квартири й будинку в Україні: вкажіть години відключень і прилади — отримаєте сценарій (станція, інвертор або генератор) з орієнтиром W/Wh і моделями.",
  keywords: [
    "калькулятор зарядної станції",
    "калькулятор інвертора",
    "яку зарядну станцію вибрати",
    "який інвертор вибрати",
    "резервне живлення калькулятор",
    "генератор для будинку",
    "відключення світла калькулятор",
  ],
  alternates: {
    canonical: `${site.url}/kalkulyator`,
  },
  openGraph: {
    title: "Калькулятор резервного живлення",
    description:
      "Години відключень → сценарій + моделі: станція, інвертор або генератор під блекаут.",
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
      <JsonLd data={calculatorWebAppJsonLd()} />

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
          Години відключень → станція, інвертор або генератор
        </h1>
        <p>
          Вкажіть житло, години блекауту й критичні прилади — одразу побачите
          сценарій, орієнтир W/Wh і моделі в ₴. Без порожнього екрану: змінюєте
          відповідь — оновлюється підбір. Результат можна зберегти як посилання
          на цю сторінку й повернутись до каталогу.
        </p>
        <p style={{ marginTop: "0.85rem" }}>
          Каталоги:{" "}
          <Link href="/zaryadni-stantsii">зарядні станції</Link>
          {" · "}
          <Link href="/invertory">інвертори</Link>
          {" · "}
          <Link href="/generatory">генератори</Link>
        </p>
      </div>

      <EnergyCalculator />

      <nav className="calc-seo-links" aria-label="Пов’язані гіди">
        <h2>Спочатку гіди з найбільшим попитом</h2>
        <ul>
          <li>
            <Link href="/gid/vidklyuchennya-svitla">Відключення світла</Link>
          </li>
          <li>
            <Link href="/gid/zaryadna-stantsiya">Зарядна станція</Link>
          </li>
          <li>
            <Link href="/gid/invertor">Інвертор</Link>
          </li>
          <li>
            <Link href="/gid/generator">Генератор</Link>
          </li>
          <li>
            <Link href="/gid/ecoflow">EcoFlow</Link>
          </li>
          <li>
            <Link href="/gid/stantsiya-chy-invertor-chy-generator">
              Станція, інвертор чи генератор
            </Link>
          </li>
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
            <Link href="/gid/kupyty-zaryadnu-stantsiyu">Купити зарядну станцію</Link>
          </li>
          <li>
            <Link href="/gid/kupyty-invertor">Купити інвертор</Link>
          </li>
          <li>
            <Link href="/gid/kupyty-generator">Купити генератор</Link>
          </li>
          <li>
            <Link href="/gid/bluetti">Bluetti</Link>
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
