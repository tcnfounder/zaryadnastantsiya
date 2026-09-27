import { installers, type Installer } from "@/data/installers";

type InstallerListProps = {
  items?: Installer[];
};

export function InstallerList({ items = installers }: InstallerListProps) {
  return (
    <div className="product-list">
      {items.map((installer) => (
        <article key={installer.id} className="product-row">
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.45rem" }}>
              {installer.city}
              {installer.featured ? " · Featured" : ""}
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
