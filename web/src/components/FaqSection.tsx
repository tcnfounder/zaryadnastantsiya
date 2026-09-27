import type { FaqItem } from "@/data/faq";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  intro?: string;
};

export function FaqSection({
  items,
  title = "Часті запитання",
  intro = "Короткі відповіді перед вибором моделі або пакета розміщення.",
}: FaqSectionProps) {
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(items)} />
      <div className="section-head">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading">{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
