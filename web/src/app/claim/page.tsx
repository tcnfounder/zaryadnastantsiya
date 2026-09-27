import type { Metadata } from "next";
import { ClaimForm } from "@/components/ClaimForm";
import { FaqSection } from "@/components/FaqSection";
import { InstallerList } from "@/components/InstallerList";
import { JsonLd } from "@/components/JsonLd";
import { PricingPackages } from "@/components/PricingPackages";
import { claimFaq } from "@/data/faq";
import { claimPackages, type ClaimPackageId } from "@/data/packages";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Claim і featured для монтажних компаній",
  description:
    "Підтвердіть профіль компанії, оберіть пакет Basic / Featured / City Priority та отримайте пріоритет у добірках ZaryadnaStantsiya.",
  alternates: {
    canonical: `${site.url}/claim`,
  },
};

type PageProps = {
  searchParams: Promise<{ package?: string }>;
};

function resolvePackage(value?: string): ClaimPackageId {
  const match = claimPackages.find((item) => item.id === value);
  return match?.id ?? "featured";
}

export default async function ClaimPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const packageId = resolvePackage(params.package);

  return (
    <div className="page-section">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Головна", path: "/" },
          { name: "Для бізнесу", path: "/claim" },
        ])}
      />
      <div className="section-head">
        <p className="eyebrow">Для бізнесу</p>
        <h1
          className="font-display"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Пакети розміщення для монтажних компаній
        </h1>
        <p>
          Підтвердіть профіль, оберіть пакет і виходьте в пріоритетні блоки поруч
          із зарядними станціями, генераторами й інверторами. Без холодних
          розсилок — лише заявки від бізнесу.
        </p>
      </div>

      <PricingPackages selectedId={packageId} />

      <div style={{ marginTop: "2.5rem" }}>
        <ClaimForm initialPackageId={packageId} />
      </div>

      <div className="section-head" style={{ marginTop: "3rem" }}>
        <p className="eyebrow">Приклади профілів</p>
        <h2>Монтажні компанії вже в добірках</h2>
        <p>
          Після підтвердження профілю компанія з’являється в регіональних блоках
          поруч із релевантними категоріями.
        </p>
      </div>
      <InstallerList />

      <div style={{ marginTop: "3rem" }}>
        <FaqSection
          items={claimFaq}
          title="Оплата й claim"
          intro="Як працює підтвердження профілю, пакети та поява у featured-блоках."
        />
      </div>
    </div>
  );
}
