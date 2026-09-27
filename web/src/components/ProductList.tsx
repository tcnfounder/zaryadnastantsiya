import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { affiliatePath, productPath } from "@/lib/seo";

type ProductListProps = {
  products: Product[];
  ctaLabel?: string;
};

export function ProductList({
  products,
  ctaLabel = "Дивитись пропозиції",
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
            <h3>
              <Link href={productPath(product)} className="product-title-link">
                {product.name}
              </Link>
            </h3>
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
          <div className="product-actions">
            <Link href={productPath(product)} className="btn btn-secondary">
              Огляд моделі
            </Link>
            <Link
              href={affiliatePath(product)}
              className="btn btn-primary"
              rel="sponsored noopener noreferrer"
            >
              {ctaLabel}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
