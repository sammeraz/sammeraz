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

export function BagIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M6.5 8h11l1 12.5h-13z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ExpandIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L20 20" />
    </svg>
  );
}

export function SlidersIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  );
}

export function GridIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </svg>
  );
}

export function ListIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function SunIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

export function MoonIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M20 13.5A8 8 0 1110.5 4a6.5 6.5 0 009.5 9.5z" />
    </svg>
  );
}
