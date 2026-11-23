import Link from "next/link";
import { installers, type Installer } from "@/data/installers";

type InstallerListProps = {
  items?: Installer[];
  /** e.g. "Києві" — used in the empty state ("у Києві"). */
  cityLocative?: string;
};

export function InstallerList({ items = installers, cityLocative }: InstallerListProps) {
  if (items.length === 0) {
    const where = cityLocative ? ` у ${cityLocative}` : "";
    return (
      <div className="product-list">
        <article className="product-row">
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.45rem" }}>
              Каталог монтажників
            </p>
            <h3>Перевірених бригад{where} ще немає в каталозі</h3>
          </div>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            Ми додаємо лише компанії, які підтвердили профіль. Потрібен монтаж зараз — залиште
            заявку в <Link href="/kalkulyator">калькуляторі</Link>, і ми підберемо бригаду під ваш
            сценарій.
          </p>
          <div className="product-meta">
            <span>
              Ви монтажник? <Link href="/claim">Додайте компанію</Link> — перше місце{where} вільне.
            </span>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="product-list">
      {items.map((installer) => (
        <article key={installer.id} className="product-row">
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.45rem" }}>
              {installer.city}
              {installer.featured ? " · Реклама" : ""}
            </p>
            <h3>{installer.name}</h3>
          </div>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            {installer.specialties.join(" · ")}
          </p>
          <div className="product-meta">
            <span>
              Рейтинг: <strong>{installer.rating.toFixed(1)}</strong>
            </span>
            <span>
              Проєктів: <strong>{installer.projects}</strong>
            </span>
            <span>
              Контакт: <strong>{installer.phone}</strong>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
