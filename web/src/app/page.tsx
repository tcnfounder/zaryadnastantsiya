import Link from "next/link";
import { ClaimForm } from "@/components/ClaimForm";
import { FeaturedBand } from "@/components/FeaturedBand";
import { ProductList } from "@/components/ProductList";
import { SiloLinks } from "@/components/SiloLinks";
import { featuredProducts } from "@/data/products";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="hero-masthead">
        <div className="hero-masthead-visual" aria-hidden="true">
          <div className="hero-masthead-grid" />
          <div className="hero-masthead-sun" />
          <div className="hero-masthead-panel">
            <span className="hero-masthead-cell" />
            <span className="hero-masthead-cell" />
            <span className="hero-masthead-cell" />
            <span className="hero-masthead-cell" />
            <span className="hero-masthead-stand" />
          </div>
        </div>
        <div className="hero-masthead-copy">
          <p className="eyebrow">Незалежний гід для України</p>
          <h1>Резервне живлення без хаосу</h1>
          <p className="hero-lead">{site.tagline}</p>
          <div className="hero-actions">
            <Link href="/#dobirky" className="btn btn-primary">
              Переглянути добірки
            </Link>
            <Link href="/claim" className="btn btn-secondary">
              Для монтажних компаній
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

      <FeaturedBand />

      <section className="section" style={{ paddingTop: 0 }}>
        <ClaimForm />
      </section>
    </>
  );
}
