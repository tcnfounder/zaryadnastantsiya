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
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="36" height="36" rx="9" fill="#243848" />
        <path
          d="M12 8.5h16c1.1 0 2 .9 2 2v19c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2v-19c0-1.1.9-2 2-2Z"
          fill="#3D5A73"
        />
        <path d="M15 11h10v4H15V11Z" fill="#1A2330" opacity="0.35" />
        <path
          d="M21.8 14.2 17.1 22h3.2l-1.1 6.6 6.2-9.4h-3.4l1.8-5.2Z"
          fill="#E09A2E"
        />
        <path d="M18 30.5h4v2.2h-4v-2.2Z" fill="#C47A1A" />
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
