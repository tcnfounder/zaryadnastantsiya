import Image from "next/image";
import Link from "next/link";

const silos = [
  {
    href: "/kalkulyator",
    label: "Калькулятор",
    copy: "Яке джерело підійде: станція, інвертор чи генератор — за хвилину.",
    image: "/hero-power-station.jpg",
    position: "center",
  },
  {
    href: "/zaryadni-stantsii",
    label: "Зарядні станції",
    copy: "Портативні станції для квартири, будинку й офісу під реальні години відключень.",
    image: "/hero-power-station.jpg",
    position: "72% center",
  },
  {
    href: "/generatory",
    label: "Генератори",
    copy: "Дизельні та бензинові рішення для довгих блекаутів і бізнесу.",
    image: "/claim-installer-work.jpg",
    position: "center",
  },
  {
    href: "/invertory",
    label: "Інвертори",
    copy: "Інвертор + АКБ для тихого резерву без шуму генератора.",
    image: "/claim-installer-work.jpg",
    position: "30% center",
  },
];

export function SiloLinks() {
  return (
    <div className="silo-grid">
      {silos.map((silo) => (
        <Link key={silo.href} href={silo.href} className="silo-link silo-link-media">
          <span className="silo-link-photo" aria-hidden="true">
            <Image
              src={silo.image}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 25vw"
              style={{ objectFit: "cover", objectPosition: silo.position }}
            />
          </span>
          <span className="silo-link-body">
            <span>Категорія</span>
            <h3>{silo.label}</h3>
            <p>{silo.copy}</p>
          </span>
        </Link>
      ))}
    </div>
  );
}
