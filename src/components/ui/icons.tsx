type IconProps = { className?: string };

const base = "stroke-current fill-none";

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function DocumentCheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M7 3.5h6.5L18 8v12.5H7z" />
      <path d="M9.5 13l2 2 3.5-4" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 3.5l6.5 2.5v5.5c0 4.2-2.8 7-6.5 8.5-3.7-1.5-6.5-4.3-6.5-8.5V6z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function MapPinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 20.5s6.5-6.8 6.5-11.3a6.5 6.5 0 10-13 0c0 4.5 6.5 11.3 6.5 11.3z" />
      <circle cx="12" cy="9.2" r="2.3" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M20 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}
