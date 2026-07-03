"use client";

import { useHeroFocus } from "@/lib/hero-focus-context";

const items = [
  "Direct Sourcing From Japan's Auction Houses",
  "Every Car Auction-Verified, No Exceptions",
  "Paperwork Handled Right, Every Time",
  "Based in Leander, Texas — Nationwide Delivery",
];

// Repeated enough times that one "half" of the track (for the -50% loop
// point) is always wider than the viewport, even on ultra-wide screens —
// otherwise the seam would show a gap instead of looping seamlessly.
const half = [...items, ...items, ...items, ...items];
const track = [...half, ...half];

export function TrustStrip() {
  const { focused } = useHeroFocus();

  return (
    <div
      className={`overflow-hidden bg-ink py-3 transition-opacity duration-700 ${
        focused ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-marquee flex w-max items-center">
        {track.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-7 text-sm text-cream whitespace-nowrap">{label}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
