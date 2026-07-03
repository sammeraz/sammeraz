type SoldBadgeSize = "sm" | "md" | "lg";

const sizeClasses: Record<SoldBadgeSize, string> = {
  sm: "-left-1 top-2 px-2.5 py-1 text-[10px] tracking-[0.1em]",
  md: "-left-1.5 top-3 px-3.5 py-1.5 text-xs tracking-[0.14em]",
  lg: "-left-2 top-4 px-4 py-1.5 text-xs tracking-[0.14em] md:px-5 md:py-2 md:text-sm",
};

/** A flat inline label read as just another tag rather than a clear status
 * — this tilts slightly off the corner instead, like a ribbon pinned to the
 * photo, so "sold" registers before anything else on the card does. */
export function SoldBadge({ size = "md" }: { size?: SoldBadgeSize }) {
  return (
    <span
      className={`font-display absolute -rotate-6 whitespace-nowrap bg-accent text-cream shadow-[0_4px_14px_rgba(0,0,0,0.4)] ${sizeClasses[size]}`}
    >
      Sold
    </span>
  );
}
