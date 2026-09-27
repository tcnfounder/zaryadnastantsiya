export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`.trim()}>
      <span className="brand-wordmark-lead">Zaryadna</span>
      <span className="brand-wordmark-tail">Stantsiya</span>
    </span>
  );
}
