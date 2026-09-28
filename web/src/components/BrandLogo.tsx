import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  /** Dark wordmark for cream bars; light for transparent hero header */
  variant?: "dark" | "light";
};

export function BrandLogo({
  className = "",
  variant = "dark",
}: BrandLogoProps) {
  const src =
    variant === "light"
      ? "/brand/logo-wordmark-light.png"
      : "/brand/logo-wordmark.png";

  return (
    <Image
      src={src}
      alt="ZaryadnaStantsiya"
      width={552}
      height={288}
      className={`brand-logo-img ${className}`.trim()}
      priority
    />
  );
}
