import Link from "next/link";

const silos = [
  {
    href: "/zaryadni-stantsii",
    label: "Зарядні станції",
    copy: "Портативні станції для квартири, будинку й офісу під реальні години відключень.",
  },
  {
    href: "/generatory",
    label: "Генератори",
    copy: "Дизельні та бензинові рішення для довгих блекаутів і бізнесу.",
  },
  {
    href: "/invertory",
    label: "Інвертори",
    copy: "Інвертор + АКБ для тихого резерву без шуму генератора.",
  },
];

export function SiloLinks() {
  return (
    <div className="silo-grid">
      {silos.map((silo) => (
        <Link key={silo.href} href={silo.href} className="silo-link">
          <span>Категорія</span>
          <h3>{silo.label}</h3>
          <p>{silo.copy}</p>
        </Link>
      ))}
    </div>
  );
}
