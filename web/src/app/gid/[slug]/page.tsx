import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { MidCalcCta } from "@/components/MidCalcCta";
import { ProductList } from "@/components/ProductList";
import { getGuide, guides, relatedGuides, MONEY_GUIDE_SLUGS } from "@/data/guides";
import { productsForMoneyGuide } from "@/data/products";
import { site } from "@/data/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  guideHowToJsonLd,
} from "@/lib/seo";

const ctaHref = {
  calculator: "/kalkulyator",
  claim: "/claim",
  stations: "/zaryadni-stantsii",
  inverters: "/invertory",
  generators: "/generatory",
} as const;

const ctaLabel = {
  calculator: "Підібрати в калькуляторі",
  claim: "Для монтажних компаній",
  stations: "Дивитись станції",
  inverters: "Дивитись інвертори",
  generators: "Дивитись генератори",
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  // Absolute title keeps SERP length ≤ ~60 (template would push money guides over limit).
  const fullTitle = `${guide.title} · ${site.name}`;
  return {
    title: { absolute: fullTitle.length > 60 ? `${guide.h1} · ${site.name}` : fullTitle },
    description: guide.description,
    alternates: {
      canonical: `${site.url}/gid/${guide.slug}`,
    },
    openGraph: {
      title: guide.h1,
      description: guide.description,
      url: `${site.url}/gid/${guide.slug}`,
      locale: "uk_UA",
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = relatedGuides(guide);
  const isMoneyGuide = MONEY_GUIDE_SLUGS.has(guide.slug);
  const midAfterIndex = 0;
  const models = isMoneyGuide ? productsForMoneyGuide(guide.slug, 3) : [];

  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Гіди", path: "/gid" },
          { name: guide.h1, path: `/gid/${guide.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(guide.faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/gid/${guide.slug}`,
          dateModified: guide.dateModified,
          keywords: [guide.keyword, "резервне живлення", "Україна"],
        })}
      />
      {isMoneyGuide ? (
        <JsonLd
          data={guideHowToJsonLd({
            name: `Як обрати: ${guide.keyword}`,
            description: guide.description,
            path: `/gid/${guide.slug}`,
          })}
        />
      ) : null}

      <article className="guide-article">
        <div className="section-head">
          <p className="eyebrow">
            Гід · ~{guide.searchVolume.toLocaleString("uk-UA")}/міс · оновлено{" "}
            {new Date(guide.dateModified).toLocaleDateString("uk-UA")}
          </p>
          <h1
            className="font-display"
            style={{
              margin: "0 0 0.75rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {guide.h1}
          </h1>
          <p>{guide.intro}</p>
        </div>

        <div className="guide-actions">
          <Link href={ctaHref[guide.cta]} className="btn btn-primary">
            {ctaLabel[guide.cta]}
          </Link>
          <Link href="/kalkulyator" className="btn btn-ghost-ink">
            Калькулятор сценарію
          </Link>
        </div>

        {guide.tables?.map((table) => (
          <figure key={table.caption} className="guide-table-wrap">
            <figcaption>{table.caption}</figcaption>
            <div className="guide-table-scroll">
              <table className="guide-table">
                <thead>
                  <tr>
                    {table.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        ))}

        {guide.sections.map((section, index) => (
          <div key={section.heading}>
            <section className="guide-block">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
            {isMoneyGuide && index === midAfterIndex ? (
              <MidCalcCta
                title={
                  guide.midCta?.title ?? `Підібрати під «${guide.keyword}»`
                }
                text={
                  guide.midCta?.text ??
                  "Зберіть години блекауту й критичні прилади — калькулятор покаже клас резерву та моделі в ₴."
                }
              />
            ) : null}
          </div>
        ))}

        <FaqSection
          items={guide.faqs}
          title="Часті питання"
          intro={`Коротко по запиту «${guide.keyword}».`}
        />

        {models.length > 0 ? (
          <section className="guide-models">
            <h2>Моделі для старту</h2>
            <p>
              Орієнтовні ціни в ₴, Wh і W — звіряйте наявність у магазині перед
              оплатою. Точніший підбір — у калькуляторі.
            </p>
            <ProductList products={models} />
            <p style={{ marginTop: "1.25rem" }}>
              <Link href="/kalkulyator" className="btn btn-primary">
                Порахувати свій сценарій
              </Link>
            </p>
          </section>
        ) : null}

        {related.length > 0 ? (
          <aside className="guide-related">
            <h2>Читайте також</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/gid/${item.slug}`}>{item.h1}</Link>
                  <span>~{item.searchVolume.toLocaleString("uk-UA")}/міс</span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </div>
  );
}
