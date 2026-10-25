import Link from "next/link";

export type ScenarioLink = { href: string; title: string; text: string };

/** Category-page hub: routes a visitor to the guide for their exact scenario. */
export function ScenarioLinks({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: ScenarioLink[];
}) {
  return (
    <section className="scenario-links" aria-labelledby="scenario-links-title">
      <h2 id="scenario-links-title">{title}</h2>
      <p>{intro}</p>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.title}</Link>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
