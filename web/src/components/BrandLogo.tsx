import Image from "next/image";

export function BrandLogo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <Image
        src="/logo-mark.png"
        alt=""
        width={96}
        height={96}
        className="brand-mark-icon-img"
        aria-hidden
        priority
      />
      {showWordmark ? (
        <span className="brand-mark-text">
          Zaryadna
          <span>Stantsiya</span>
        </span>
      ) : (
        <span className="sr-only">ZaryadnaStantsiya</span>
      )}
    </span>
  );
}
