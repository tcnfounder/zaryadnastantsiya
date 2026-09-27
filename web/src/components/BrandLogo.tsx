export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <svg
        className="brand-mark"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="11" fill="#1A2330" />
        <circle cx="20" cy="15" r="7.5" fill="#C47A1A" opacity="0.35" />
        <circle cx="20" cy="15" r="4.6" fill="#E09A2E" />
        <rect x="11" y="20" width="18" height="11" rx="2.5" fill="#F3F6F9" />
        <rect x="14" y="23" width="4.2" height="5" rx="1" fill="#1A2330" />
        <rect x="18.9" y="23" width="4.2" height="5" rx="1" fill="#1A2330" />
        <rect x="23.8" y="23" width="4.2" height="5" rx="1" fill="#1A2330" />
        <path
          d="M17 31.5h6"
          stroke="#C47A1A"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <span className="brand-wordmark" aria-label="ZaryadnaStantsiya">
        <span className="brand-wordmark-lead">Zaryadna</span>
        <span className="brand-wordmark-tail">Stantsiya</span>
      </span>
    </span>
  );
}
