import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { runtimeHints } from "@/lib/runtime";
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
      {products.map((product) => {
        const hints = runtimeHints(product);
        return (
          <article key={product.id} className="product-row">
            <div className="product-row-head">
              <p className="eyebrow" style={{ marginBottom: "0.35rem" }}>
                {product.brand}
                {product.featured ? " · Вибір редакції" : ""}
              </p>
              <h3>
                <Link href={productPath(product)} className="product-title-link">
                  {product.name}
                </Link>
              </h3>
              <p className="product-best">{product.bestFor}</p>
            </div>

            <dl className="product-specs">
              {product.capacityWh > 0 ? (
                <div>
                  <dt>Ємність</dt>
                  <dd>{product.capacityWh.toLocaleString("uk-UA")} Вт·год</dd>
                </div>
              ) : null}
              <div>
                <dt>Потужність</dt>
                <dd>{product.outputW.toLocaleString("uk-UA")} Вт</dd>
              </div>
              <div>
                <dt>Оцінка</dt>
                <dd>{product.rating.toFixed(1)} / 5</dd>
              </div>
            </dl>

            {hints.length > 0 ? (
              <ul className="product-runtime" aria-label="Скільки протримає (орієнтовно)">
                {hints.map((hint) => (
                  <li key={hint.key}>
                    <span>{hint.label}</span>
                    <strong>≈ {hint.hours} год</strong>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="product-row-foot">
              <p className="product-price">
                <span>від</span> {formatPrice(product.priceUah)}
              </p>
              <Link
                href={affiliatePath(product)}
                className="btn btn-primary"
                rel="sponsored noopener noreferrer"
              >
                {ctaLabel}
              </Link>
              <Link href={productPath(product)} className="product-more">
                Огляд моделі →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
