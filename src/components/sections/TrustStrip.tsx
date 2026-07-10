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
    // grid-rows animates the row track itself from 1fr to 0fr, collapsing
    // this bar's real layout height (not just its opacity) — Hero is the
    // flex-1 sibling in the wrapper below it, so as this shrinks, Hero's
    // video grows to cover the freed space instead of leaving it blank.
    <div
      className={`grid bg-ink transition-[grid-template-rows,opacity] duration-700 ease-out ${
        focused ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      }`}
    >
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center py-3">
          {track.map((label, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display px-7 text-sm text-cream whitespace-nowrap">{label}</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
