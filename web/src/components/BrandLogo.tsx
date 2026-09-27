import Image from "next/image";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <Image
        src="/logo-mark.png"
        alt="ZaryadnaStantsiya"
        width={168}
        height={192}
        className="brand-mark-icon-img"
        priority
        unoptimized
      />
    </span>
  );
}
