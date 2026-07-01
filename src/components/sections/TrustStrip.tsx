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
    <div className="overflow-hidden border-y border-ink/15 bg-cream-deep/50 py-4">
      <div className="animate-marquee flex w-max items-center">
        {track.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-7 text-lg italic text-ink/70 whitespace-nowrap">
              {label}
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
