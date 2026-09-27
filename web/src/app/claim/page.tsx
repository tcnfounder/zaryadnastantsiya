import type { Metadata } from "next";
import { ClaimForm } from "@/components/ClaimForm";
import { InstallerList } from "@/components/InstallerList";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Claim і featured для монтажних компаній",
  description:
    "Підтвердіть профіль компанії, отримайте лист claim-доступу та запустіть featured-розміщення.",
  alternates: {
    canonical: `${site.url}/claim`,
  },
};

export default function ClaimPage() {
  return (
    <div className="page-section">
      <div className="section-head">
        <p className="eyebrow">Mailing claim</p>
        <h2>Один лист — і компанія підтверджує профіль</h2>
        <p>
          Збираємо лише заявки від бізнесу, який хоче керувати своїм розміщенням і
          виходити в пріоритетні блоки. Без масових холодних розсилок.
        </p>
      </div>
      <ClaimForm />
      <div className="section-head" style={{ marginTop: "3rem" }}>
        <p className="eyebrow">Приклади профілів</p>
        <h2>Монтажні компанії вже в добірках</h2>
        <p>
          Після підтвердження профілю компанія з’являється в регіональних блоках
          поруч із релевантними категоріями.
        </p>
      </div>
      <InstallerList />
    </div>
  );
}
