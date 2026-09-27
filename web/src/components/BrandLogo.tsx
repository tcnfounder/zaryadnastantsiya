import { site } from "@/data/site";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`.trim()} aria-hidden="true">
      <span className="brand-wordmark-lead">Zaryadna</span>
      <span className="brand-wordmark-tail">Stantsiya</span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
