import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { HeroEstimator } from "@/components/HeroEstimator";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { SiloLinks } from "@/components/SiloLinks";
import { homeFaq } from "@/data/faq";
import { cities } from "@/data/cities";
import { homeGuidePicks } from "@/data/guides";
import { featuredProducts } from "@/data/products";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="hero-masthead">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-layout">
        <div className="hero-masthead-copy">
          <p className="eyebrow">{site.name} · Україна</p>
          <h1>Зарядна станція, інвертор чи генератор під блекаут</h1>
          <p className="hero-lead">{site.tagline}</p>
          <div className="hero-actions">
            <Link href="/kalkulyator" className="btn btn-primary">
              Підібрати джерело енергії
            </Link>
            <Link href="/gid" className="btn btn-ghost">
              Гіди під запити
            </Link>
          </div>
          <nav className="hero-scenarios" aria-label="Швидкий вибір сценарію">
            <p>Що потрібно живити?</p>
            <ul>
              <li>
                <Link href="/gid/zaryadna-stantsiya-dlya-kvartyry">
                  <strong>Квартира</strong>
                  <span>роутер, світло, холодильник</span>
                </Link>
              </li>
              <li>
                <Link href="/gid/zaryadna-stantsiya-dlya-kotla">
                  <strong>Газовий котел</strong>
                  <span>опалення без світла</span>
                </Link>
              </li>
              <li>
                <Link href="/gid/dbzh-dlya-routera">
                  <strong>Тільки інтернет</strong>
                  <span>роутер і термінал</span>
                </Link>
              </li>
              <li>
                <Link href="/gid/invertor-dlya-domu">
                  <strong>Весь будинок</strong>
                  <span>інвертор + АКБ</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <HeroEstimator />
        </div>
      </section>

      <section className="section winter-section" id="zyma">
        <aside className="winter-callout">
          <div>
            <p className="winter-callout-kicker">Зима 2026/27</p>
            <h2>Підготуйтеся до відключень до морозів</h2>
            <p>Котел, інтернет і холодильник — що потрібно саме вам і скільки годин це протримає.</p>
          </div>
          <ul>
            <li><Link href="/gid/zyma-bez-svitla">Чекліст: зима без світла</Link></li>
            <li><Link href="/gid/zaryadna-stantsiya-dlya-kotla">Станція для котла</Link></li>
            <li><Link href="/gid/dbzh-dlya-routera">ДБЖ для роутера</Link></li>
            <li><Link href="/gid/paverbank">Павербанк</Link></li>
          </ul>
        </aside>
      </section>

      <section className="section trust-section" aria-label="Чому нам можна довіряти">
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "0.75rem 1.5rem",
            fontSize: "0.95rem",
          }}
        >
          <li>
            <strong>Незалежні.</strong> Не продаємо техніку і не беремо гроші за місце моделі
            в підборі.
          </li>
          <li>
            <strong>Відкриті формули.</strong> Кожен розрахунок можна перевірити —{" "}
            <Link href="/yak-my-rakhuyemo" style={{ color: "var(--amber)", fontWeight: 600 }}>
              як ми рахуємо
            </Link>
            .
          </li>
          <li>
            <strong>Дата перевірки.</strong> На кожному гіді видно, коли редакція востаннє
            звірила ціни й цифри.
          </li>
          <li>
            <strong>Безпека першою.</strong> Генератор — тільки надворі, щиток — тільки через
            АВР і електрика.{" "}
            <Link href="/pro-nas" style={{ color: "var(--amber)", fontWeight: 600 }}>
              Про нас
            </Link>
          </li>
        </ul>
      </section>

      <section className="section" id="dobirky">
        <div className="section-head">
          <h2>Станція, інвертор чи генератор?</h2>
          <p>
            Порівнюйте за ємністю, потужністю та реальною ціною в Україні — або
            дайте калькулятору вибрати за вас.
          </p>
        </div>
        <SiloLinks />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Моделі, які ми радимо найчастіше</h2>
          <p>
            Під типові сценарії квартири, будинку й малого бізнесу. Години роботи
            пораховані за нашою{" "}
            <Link href="/yak-my-rakhuyemo">методологією</Link>.
          </p>
        </div>
        <ProductList products={featuredProducts()} />
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="gidy">
        <div className="section-head">
          <p className="eyebrow">Гіди з підбору</p>
          <h2>Гіди з ціною, ватами і тим, кому підходить</h2>
          <p>
            Портативні станції, Bluetti, EcoFlow, інвертори й зарядка для
            електромобіля — у кожному гіді є орієнтир у гривнях, клас потужності
            й те, кому модель підходить.
          </p>
        </div>
        <ol className="guide-index guide-index-home">
          {homeGuidePicks(8).map((guide, index) => (
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
        <p style={{ marginTop: "1.25rem" }}>
          <Link href="/gid" className="btn btn-ghost-ink">
            Усі гіди
          </Link>
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="mista">
        <div className="section-head">
          <p className="eyebrow">Місто і «купити»</p>
          <h2>Купити зарядну станцію у своєму місті</h2>
          <p>
            Київ, Львів, Одеса, Харків, Дніпро — та сама таблиця ціни й ват,
            плюс монтаж, якщо коробки вже мало.
          </p>
        </div>
        <ol className="guide-index guide-index-home">
          {cities.map((city, index) => (
            <li key={city.slug}>
              <span className="guide-index-rank">{index + 1}</span>
              <div>
                <Link href={`/misto/${city.slug}`}>{city.h1}</Link>
              </div>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: "1.25rem" }}>
          <Link href="/misto" className="btn btn-ghost-ink">
            Усі міста
          </Link>
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">Як ми працюємо</p>
          <h2 className="font-display">Розрахунок, який можна перевірити</h2>
          <p>
            Кожен гід показує формулу: потужність приладів у Вт × години
            відключення = потрібні Вт·год, з поправкою на ККД інвертора й
            корисну ємність акумулятора. Характеристики — з офіційних
            специфікацій, ціни — орієнтовні на дату оновлення. Ми не магазин і
            прямо позначаємо партнерські посилання.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/pro-nas" className="btn btn-ghost-ink">
              Про нас і методологія
            </Link>
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <FaqSection
          items={homeFaq}
          title="Швидкі відповіді перед вибором"
          intro="Станція, генератор чи інвертор — коротко, щоб не витрачати час на хаос у пошуку."
        />
      </section>

    </>
  );
}
