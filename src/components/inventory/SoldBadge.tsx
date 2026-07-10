type SoldBadgeSize = "sm" | "md" | "lg";

const sizeClasses: Record<SoldBadgeSize, string> = {
  sm: "left-2 top-2 px-2.5 py-1 text-[10px] tracking-[0.1em]",
  md: "left-3 top-3 px-3.5 py-1.5 text-xs tracking-[0.14em]",
  lg: "left-4 top-4 px-4 py-1.5 text-xs tracking-[0.14em] md:px-5 md:py-2 md:text-sm",
};

/** Straight label, inset from the corner rather than flush against it —
 * enough separation from the edge to read as a deliberate placement, not a
 * tilted ribbon. */
export function SoldBadge({ size = "md" }: { size?: SoldBadgeSize }) {
  return (
    <span
      className={`font-display absolute whitespace-nowrap bg-accent text-cream shadow-[0_4px_14px_rgba(0,0,0,0.4)] ${sizeClasses[size]}`}
    >
      Sold
    </span>
  );
}
