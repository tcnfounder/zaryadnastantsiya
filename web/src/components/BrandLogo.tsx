export function BrandLogo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <svg
        className="brand-mark-icon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="#E8EEF4" />
        <rect
          x="11"
          y="9"
          width="26"
          height="30"
          rx="3.5"
          stroke="#1A2330"
          strokeWidth="2.2"
        />
        <path
          d="M24 14.5V33.5"
          stroke="#C47A1A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M20.5 18.5H27.5"
          stroke="#C47A1A"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M21.5 33.5H26.5"
          stroke="#1A2330"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark ? (
        <span className="brand-mark-text">
          Zaryadna
          <span>Stantsiya</span>
        </span>
      ) : null}
    </span>
  );
}
