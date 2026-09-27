import Image from "next/image";

export function BrandLogo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  if (showWordmark) {
    return (
      <span className={`brand-lockup brand-lockup-image ${className}`.trim()}>
        <Image
          src="/logo-wordmark.png"
          alt="ZaryadnaStantsiya"
          width={320}
          height={72}
          className="brand-wordmark-img"
          priority
        />
      </span>
    );
  }

  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <Image
        src="/logo-mark.png"
        alt=""
        width={48}
        height={48}
        className="brand-mark-icon-img"
        aria-hidden
      />
    </span>
  );
}
