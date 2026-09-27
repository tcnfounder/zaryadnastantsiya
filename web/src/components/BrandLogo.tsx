export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup brand-lockup-mark-only ${className}`.trim()}>
      <svg
        className="brand-mark-svg"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ZaryadnaStantsiya"
      >
        {/* Outer Z frame */}
        <path
          d="M20 22H76V34H42L70 62V74H20V62H54L26 34V22Z"
          fill="#1A2330"
        />
        {/* Amber filament through the station core */}
        <path
          d="M48 28V68"
          stroke="#C47A1A"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M39 38H57"
          stroke="#C47A1A"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
