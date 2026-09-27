export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <span className="brand-logo-main">Zaryadna</span>
      <span className="brand-logo-sub">
        <span className="brand-logo-rule" aria-hidden="true" />
        <span className="brand-logo-subtext">Stantsiya</span>
      </span>
    </span>
  );
}
