const items = [
  "25-Year Import Specialists",
  "Auction-Verified Sourcing",
  "Full Documentation & Compliance",
  "Texas-Based, Nationwide Delivery",
];

// Repeated enough times that one "half" of the track (for the -50% loop
// point) is always wider than the viewport, even on ultra-wide screens —
// otherwise the seam would show a gap instead of looping seamlessly.
const half = [...items, ...items, ...items, ...items];
const track = [...half, ...half];

export function TrustStrip() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-accent py-3">
      <div className="animate-marquee flex w-max items-center">
        {track.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-cream whitespace-nowrap">
              {label}
            </span>
            <span aria-hidden="true" className="text-cream/50">
              ▲
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
