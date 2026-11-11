import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/FaqSection";
import { GuideBody } from "@/components/GuideBody";
import { JsonLd } from "@/components/JsonLd";
import { MidCalcCta } from "@/components/MidCalcCta";
import { GuideToc, type TocItem } from "@/components/GuideToc";
import { ProductList } from "@/components/ProductList";
import { getGuide, guides, relatedGuides, MONEY_GUIDE_SLUGS } from "@/data/guides";
import { productsForMoneyGuide } from "@/data/products";
import { site } from "@/data/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
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
  // Absolute title keeps SERP length ≤ ~60: add the brand only when it fits,
  // otherwise ship the short SERP title alone. (The old fallback used the longer
  // h1 + brand, so 26 of 55 guides had 70–96 char titles truncated in Google.)
  const fullTitle = `${guide.title} · ${site.name}`;
  return {
    title: { absolute: fullTitle.length > 60 ? guide.title : fullTitle },
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
  const toc: TocItem[] = [
    ...guide.sections.map((section, i) => ({ id: `r${i + 1}`, label: section.heading })),
    ...(guide.faqs.length > 0 ? [{ id: "faq", label: "Часті питання" }] : []),
    ...(models.length > 0 ? [{ id: "modeli", label: "Моделі для старту" }] : []),
  ];

  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Гіди", path: "/gid" },
          { name: guide.h1, path: `/gid/${guide.slug}` },
        ])}
      />
      {/* FAQPage JSON-LD comes from FaqSection once — avoid duplicate schema. */}
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/gid/${guide.slug}`,
          dateModified: guide.dateModified,
          datePublished: guide.datePublished,
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

      <div className="guide-layout">
      <article className="guide-article" id="top">
        <div className="section-head">
          <p className="eyebrow">
            Гід · оновлено{" "}
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
          <div className="guide-intro">
            <GuideBody text={guide.intro} />
          </div>
          <p className="guide-byline">
            Автор: <Link href="/pro-nas">Редакція {site.name}</Link> · Перевірено{" "}
            {new Date(guide.dateModified).toLocaleDateString("uk-UA")} ·{" "}
            <Link href="/yak-my-rakhuyemo">Як ми рахуємо</Link>
          </p>
        </div>

        <GuideToc items={toc} variant="inline" />

        <div className="guide-actions">
          <Link href={ctaHref[guide.cta]} className="btn btn-primary">
            {ctaLabel[guide.cta]}
          </Link>
          <Link href="/kalkulyator" className="btn btn-ghost-ink">
            Калькулятор сценарію
          </Link>
        </div>

        {guide.slug !== "zyma-bez-svitla" ? (
          <p style={{ margin: "1.25rem 0 0", padding: "0.75rem 1rem", borderLeft: "3px solid var(--amber)", fontSize: "0.95rem" }}>
            <strong>Зима 2026/27:</strong> котел, інтернет, холодні акумулятори й заряд між
            відключеннями — у чеклісті{" "}
            <Link href="/gid/zyma-bez-svitla" style={{ color: "var(--amber)", fontWeight: 600 }}>
              «Зима без світла: як підготуватися»
            </Link>
            .
          </p>
        ) : null}

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
                        <td key={`${row[0]}-${cellIndex}`} data-label={table.headers[cellIndex]}>
                          {cell}
                        </td>
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
            <section className="guide-block" id={`r${index + 1}`}>
              <h2>{section.heading}</h2>
              <GuideBody text={section.body} />
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

        <div id="faq" className="guide-anchor" />
        <FaqSection
          items={guide.faqs}
          title="Часті питання"
          intro={`Коротко по запиту «${guide.keyword}».`}
        />

        {models.length > 0 ? (
          <section className="guide-models" id="modeli">
            <h2>Моделі для старту</h2>
            <p>
              Орієнтовні ціни в ₴, Wh і W — звіряйте наявність у магазині перед
              оплатою. Точніший підбір — у калькуляторі.
            </p>
            <ProductList products={models} />
            <p style={{ fontSize: "0.85rem", margin: "0.75rem 0 0", opacity: 0.8 }}>
              Частина посилань «Дивитись пропозиції» може бути партнерською — ціна для вас не
              змінюється, а рекомендація не залежить від комісії.{" "}
              <Link href="/pro-nas#yak-my-zaroblyayemo">Як ми заробляємо</Link>
            </p>
            <p style={{ marginTop: "1.25rem" }}>
              <Link href="/kalkulyator" className="btn btn-primary">
                Порахувати свій сценарій
              </Link>
            </p>
          </section>
        ) : null}

        {guide.extraLinks && guide.extraLinks.length > 0 ? (
          <section className="guide-block">
            <h2>Купити у своєму місті</h2>
            <ul>
              {guide.extraLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length > 0 ? (
          <aside className="guide-related">
            <h2>Читайте також</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/gid/${item.slug}`}>{item.h1}</Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
      <aside className="guide-side">
        <GuideToc items={toc} variant="side" />
      </aside>
      </div>
    </div>
  );
}
