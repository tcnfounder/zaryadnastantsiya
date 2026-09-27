export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`.trim()} aria-label="ZaryadnaStantsiya">
      <span className="brand-wordmark-lead">Zaryadna</span>
      <span className="brand-wordmark-tail">Stantsiya</span>
    </span>
  );
}
