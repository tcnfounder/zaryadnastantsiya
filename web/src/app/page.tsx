import Image from "next/image";
import Link from "next/link";
import { ClaimForm } from "@/components/ClaimForm";
import { FaqSection } from "@/components/FaqSection";
import { FeaturedBand } from "@/components/FeaturedBand";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { SiloLinks } from "@/components/SiloLinks";
import { homeFaq } from "@/data/faq";
import { cities } from "@/data/cities";
import { guidesByVolume } from "@/data/guides";
import { featuredProducts } from "@/data/products";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="hero-masthead">
        <div className="hero-masthead-media">
          <Image
            src="/hero-power-station.jpg"
            alt="Портативна зарядна станція для резерву під час відключення світла в Україні"
            fill
            priority
            sizes="100vw"
            className="hero-masthead-photo"
          />
          <div className="hero-masthead-veil" aria-hidden="true" />
        </div>
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
        </div>
      </section>

      <section className="section" id="dobirky">
        <div className="section-head">
          <p className="eyebrow">Категорії</p>
          <h2>Один маршрут під ваш сценарій відключень</h2>
          <p>
            Порівнюйте станції, генератори й інвертори за ємністю, потужністю та
            реальною ціною в Україні.
          </p>
        </div>
        <SiloLinks />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">Добірка тижня</p>
          <h2>Перевірені рішення з високим рейтингом</h2>
          <p>
            Короткий список моделей, які найкраще закривають типові сценарії
            блекауту в квартирі, будинку й малому бізнесі.
          </p>
        </div>
        <ProductList products={featuredProducts()} />
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="gidy">
        <div className="section-head">
          <p className="eyebrow">Попит у пошуку</p>
          <h2>Гіди під запити, де вже є гроші</h2>
          <p>
            Від «відключення світла» й EcoFlow до генератора та інвертора для
            дому — гіди ведуть у калькулятор і до моделей.
          </p>
        </div>
        <ol className="guide-index guide-index-home">
          {guidesByVolume.slice(0, 8).map((guide, index) => (
            <li key={guide.slug}>
              <span className="guide-index-rank">{index + 1}</span>
              <div>
                <Link href={`/gid/${guide.slug}`}>{guide.h1}</Link>
                <p>{guide.keyword}</p>
              </div>
              <strong>~{guide.searchVolume.toLocaleString("uk-UA")}/міс</strong>
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
          <p className="eyebrow">Локальний попит</p>
          <h2>Резерв по містах</h2>
          <p>
            Київ, Львів, Одеса, Харків, Дніпро — сценарій у калькуляторі й
            монтажні бригади поруч.
          </p>
        </div>
        <ol className="guide-index guide-index-home">
          {cities.map((city, index) => (
            <li key={city.slug}>
              <span className="guide-index-rank">{index + 1}</span>
              <div>
                <Link href={`/misto/${city.slug}`}>{city.h1}</Link>
                <p>{city.name}</p>
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

      <FeaturedBand />

      <section className="section" style={{ paddingTop: 0 }}>
        <FaqSection
          items={homeFaq}
          title="Швидкі відповіді перед вибором"
          intro="Станція, генератор чи інвертор — коротко, щоб не витрачати час на хаос у пошуку."
        />
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <ClaimForm />
      </section>
    </>
  );
}
