import Link from "next/link";
import {
  claimPackages,
  formatPackagePrice,
  type ClaimPackageId,
} from "@/data/packages";

type PricingPackagesProps = {
  selectedId?: ClaimPackageId;
};

export function PricingPackages({ selectedId = "featured" }: PricingPackagesProps) {
  return (
    <div className="pricing-grid">
      {claimPackages.map((pkg) => {
        const active = pkg.id === selectedId;
        return (
          <article
            key={pkg.id}
            className={`pricing-card${pkg.highlight ? " pricing-card-hot" : ""}${active ? " pricing-card-active" : ""}`}
          >
            <p className="eyebrow">{pkg.highlight ? "Найпопулярніший" : "Пакет"}</p>
            <h3>{pkg.name}</h3>
            <p className="pricing-price">
              {formatPackagePrice(pkg.priceUah)}
              <span>{pkg.period}</span>
            </p>
            <p className="pricing-copy">{pkg.description}</p>
            <ul className="pricing-features">
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link
              href={`/claim?package=${pkg.id}#claim-form`}
              className={`btn ${active || pkg.highlight ? "btn-primary" : "btn-secondary"}`}
            >
              Обрати {pkg.name}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
