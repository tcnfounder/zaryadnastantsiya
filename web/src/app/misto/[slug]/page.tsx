import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/FaqSection";
import { InstallerList } from "@/components/InstallerList";
import { JsonLd } from "@/components/JsonLd";
import { cities, getCity } from "@/data/cities";
import { installers } from "@/data/installers";
import { site } from "@/data/site";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: city.title,
    description: city.description,
    keywords: [
      `резервне живлення ${city.name}`,
      `зарядна станція ${city.name}`,
      `інвертор ${city.name}`,
      `генератор ${city.name}`,
      `монтаж інвертора ${city.name}`,
    ],
    alternates: {
      canonical: `${site.url}/misto/${city.slug}`,
    },
    openGraph: {
      title: city.h1,
      description: city.description,
      url: `${site.url}/misto/${city.slug}`,
      locale: "uk_UA",
      type: "article",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const localInstallers = installers.filter(
    (item) => item.city === city.name || item.featured,
  );
  const dateModified = "2026-09-27";

  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Міста", path: "/misto" },
          { name: city.name, path: `/misto/${city.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(city.faqs)} />
      <JsonLd
        data={articleJsonLd({
          title: city.title,
          description: city.description,
          path: `/misto/${city.slug}`,
          dateModified,
          keywords: [
            `резервне живлення ${city.name}`,
            `монтаж ${city.name}`,
            "блекаут",
          ],
        })}
      />

      <article className="guide-article">
        <div className="section-head">
          <p className="eyebrow">Місто · {city.name}</p>
          <h1
            className="font-display"
            style={{
              margin: "0 0 0.75rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {city.h1}
          </h1>
          <p>{city.intro}</p>
        </div>

        <div className="guide-actions">
          <Link href="/kalkulyator" className="btn btn-primary">
            Калькулятор сценарію
          </Link>
          <Link href="/claim" className="btn btn-ghost-ink">
            Для монтажних компаній
          </Link>
        </div>

        {city.sections.map((section) => (
          <section key={section.heading} className="guide-block">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="guide-block">
          <h2>Каталоги обладнання</h2>
          <p>
            Порівняйте{" "}
            <Link href="/zaryadni-stantsii" style={{ color: "var(--amber)", fontWeight: 600 }}>
              зарядні станції
            </Link>
            ,{" "}
            <Link href="/invertory" style={{ color: "var(--amber)", fontWeight: 600 }}>
              інвертори
            </Link>{" "}
            та{" "}
            <Link href="/generatory" style={{ color: "var(--amber)", fontWeight: 600 }}>
              генератори
            </Link>
            {" "}— потім поверніться до монтажу в {city.genitive}.
          </p>
        </section>

        <div className="section-head" style={{ marginTop: "2rem" }}>
          <p className="eyebrow">Монтаж</p>
          <h2>Бригади в {city.genitive}</h2>
          <p>
            Featured-профілі бачать ліди з калькулятора вже зі сценарієм. Немає
            вашого міста в списку —{" "}
            <Link href="/claim" style={{ color: "var(--amber)", fontWeight: 600 }}>
              заберіть профіль
            </Link>
            .
          </p>
        </div>
        <InstallerList items={localInstallers} />

        <FaqSection
          items={city.faqs}
          title="Часті питання"
          intro={`Коротко про резерв у ${city.genitive}.`}
        />
      </article>
    </div>
  );
}
