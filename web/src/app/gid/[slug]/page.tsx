import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides, relatedGuides } from "@/data/guides";
import { site } from "@/data/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

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
  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.keyword, "Україна", "резервне живлення", "блекаут"],
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

      <article className="guide-article">
        <div className="section-head">
          <p className="eyebrow">Гід · ~{guide.searchVolume.toLocaleString("uk-UA")}/міс</p>
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

        {guide.sections.map((section) => (
          <section key={section.heading} className="guide-block">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <FaqSection
          items={guide.faqs}
          title="Часті питання"
          intro={`Коротко по запиту «${guide.keyword}».`}
        />

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
