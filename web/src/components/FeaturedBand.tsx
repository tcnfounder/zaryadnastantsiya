import Link from "next/link";

export function FeaturedBand() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="featured-band">
        <div>
          <p className="eyebrow" style={{ color: "var(--amber-bright)" }}>
            Featured
          </p>
          <h2>Виведіть компанію в перші позиції видачі</h2>
          <p>
            Підтвердіть профіль монтажної компанії, оновіть кейси й отримайте
            пріоритет у добірках Kyiv, Lviv та Odesa.
          </p>
        </div>
        <Link href="/claim" className="btn btn-primary">
          Запустити featured
        </Link>
      </div>
    </section>
  );
}
