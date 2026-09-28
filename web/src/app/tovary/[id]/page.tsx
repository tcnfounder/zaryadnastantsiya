import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductList } from "@/components/ProductList";
import { guidesForProduct } from "@/data/guides";
import {
  formatPrice,
  getProduct,
  products,
  relatedProducts,
} from "@/data/products";
import { site } from "@/data/site";
import {
  affiliatePath,
  breadcrumbJsonLd,
  categoryLabels,
  categoryPaths,
  productJsonLd,
  productPath,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};

  const title = `${product.brand} ${product.name} — огляд і ціна`;
  const description = product.seoDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}${productPath(product)}`,
    },
    openGraph: {
      title: `${product.brand} ${product.name}`,
      description,
      url: `${site.url}${productPath(product)}`,
      locale: "uk_UA",
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const categoryHref = categoryPaths[product.category];
  const related = relatedProducts(product);
  const relatedGuides = guidesForProduct(product);

  return (
    <div className="page-section">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: categoryLabels[product.category], path: categoryHref },
          { name: `${product.brand} ${product.name}`, path: productPath(product) },
        ])}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Головна</Link>
        <span aria-hidden="true">/</span>
        <Link href={categoryHref}>{categoryLabels[product.category]}</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-hero">
        <div>
          <p className="eyebrow">
            {product.brand}
            {product.featured ? " · Featured" : ""}
          </p>
          <h1>
            {product.brand} {product.name}
          </h1>
          <p className="hero-lead" style={{ marginBottom: "1.25rem" }}>
            {product.seoDescription}
          </p>
          <div className="product-meta" style={{ marginBottom: "1.5rem" }}>
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
              Ціна від: <strong>{formatPrice(product.priceUah)}</strong>
            </span>
          </div>
          <div className="hero-actions">
            <Link
              href={affiliatePath(product)}
              className="btn btn-primary"
              rel="sponsored noopener noreferrer"
            >
              Дивитись ціни в магазинах
            </Link>
            <Link href={categoryHref} className="btn btn-secondary">
              Усі {categoryLabels[product.category].toLowerCase()}
            </Link>
          </div>
        </div>
        <aside className="product-aside">
          <p className="eyebrow">Для кого</p>
          <h2>{product.bestFor}</h2>
          <p>{product.guide}</p>
          <p className="form-note">
            Ціни орієнтовні. Партнерські посилання можуть оновлюватись; перед
            покупкою перевіряйте наявність і комплектацію.
          </p>
        </aside>
      </div>

      {relatedGuides.length > 0 ? (
        <nav className="calc-seo-links" style={{ marginTop: "2.5rem" }} aria-label="Гіди">
          <h2>Корисні гіди перед покупкою</h2>
          <ul>
            {relatedGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/gid/${guide.slug}`}>{guide.h1}</Link>
              </li>
            ))}
            <li>
              <Link href="/kalkulyator">Калькулятор сценарію</Link>
            </li>
          </ul>
        </nav>
      ) : null}

      <section style={{ marginTop: "3rem" }}>
        <div className="section-head">
          <p className="eyebrow">Поруч у категорії</p>
          <h2>Схожі моделі для порівняння</h2>
          <p>
            Внутрішні посилання допомагають швидко порівняти ємність, потужність і
            сценарій використання.
          </p>
        </div>
        <ProductList products={related} />
      </section>

      <div className="featured-band" style={{ marginTop: "2.5rem" }}>
        <div>
          <p className="eyebrow" style={{ color: "var(--amber-bright)" }}>
            Для бізнесу
          </p>
          <h2>Монтажні компанії — у пріоритетних блоках</h2>
          <p>
            Підтвердіть профіль і оберіть пакет Featured або City Priority, щоб
            з’являтись поруч із популярними моделями.
          </p>
        </div>
        <Link href="/claim" className="btn btn-primary">
          Пакети розміщення
        </Link>
      </div>
    </div>
  );
}
