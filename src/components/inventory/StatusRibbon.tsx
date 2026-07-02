type RibbonStatus = "available" | "sold";

const ribbon: Record<RibbonStatus, { label: string; className: string }> = {
  // Ink rather than a second red — sold already owns red as the "look at
  // this" color, so available stays in the site's other primary tone
  // instead of two competing red ribbons on the same grid.
  available: { label: "AVAILABLE", className: "bg-ink" },
  sold: { label: "SOLD", className: "bg-accent" },
};

/**
 * Diagonal corner banner, shared between available and sold — the same
 * shape/size reads as one consistent status system instead of a flat badge
 * for one state and a banner for the other.
 */
export function StatusRibbon({ status }: { status: RibbonStatus }) {
  const { label, className } = ribbon[status];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -right-14 top-6 w-52 -rotate-45 py-1.5 text-center shadow-lg ${className}`}
      >
        <span className="font-display text-sm font-bold tracking-[0.2em] text-cream">{label}</span>
      </div>
    </div>
  );
}
