import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

type ProductListProps = {
  products: Product[];
  ctaLabel?: string;
};

export function ProductList({
  products,
  ctaLabel = "Переглянути пропозицію",
}: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <article key={product.id} className="product-row">
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.45rem" }}>
              {product.brand}
              {product.featured ? " · Featured" : ""}
            </p>
            <h3>{product.name}</h3>
          </div>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            {product.bestFor}
          </p>
          <div className="product-meta">
            {product.capacityWh > 0 ? (
              <span>
                Ємність: <strong>{product.capacityWh} Wh</strong>
              </span>
            ) : null}
            <span>
              Потужність: <strong>{product.outputW} W</strong>
            </span>
            <span>
              Рейтинг: <strong>{product.rating.toFixed(1)}</strong>
            </span>
            <span>
              Ціна: <strong>{formatPrice(product.priceUah)}</strong>
            </span>
          </div>
          <Link href={product.affiliateUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </Link>
        </article>
      ))}
    </div>
  );
}
