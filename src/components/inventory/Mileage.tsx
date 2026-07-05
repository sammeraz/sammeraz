"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { formatKm, formatMiles } from "@/lib/format";

interface MileageProps {
  miles: number;
  className?: string;
  /** Detail page has room (and touch visitors need it too), so the mile
   * equivalent stays inline instead of hidden behind a hover popup. */
  showParenthetical?: boolean;
}

/** Km is the primary figure everywhere (JDM odometers read in km). Card and
 * list rows are tight on space, so the mile equivalent for US buyers surfaces
 * as a small popup instead: real :hover devices get it on hover, and it's
 * also a tap target (this sits inside a card/row that's itself a link, so
 * the tap has to stop that link's navigation to work as a peek rather than
 * a click-through). */
export function Mileage({ miles, className = "", showParenthetical = false }: MileageProps) {
  const [revealed, setRevealed] = useState(false);

  if (showParenthetical) {
    return (
      <span className={className}>
        {formatKm(miles)} <span className="text-ink/40">({formatMiles(miles)})</span>
      </span>
    );
  }

  function toggle(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    setRevealed((prev) => !prev);
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-expanded={revealed}
      aria-label={`${formatKm(miles)} (${formatMiles(miles)})`}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") toggle(event);
      }}
      className={`group/mileage relative inline-block cursor-help underline decoration-dotted decoration-1 underline-offset-2 decoration-ink/25 ${className}`}
    >
      {formatKm(miles)}
      <span
        className={`pointer-events-none absolute -top-1.5 right-0 -translate-y-full whitespace-nowrap rounded-sm bg-ink px-2 py-1 text-[10px] leading-none text-cream shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-opacity duration-150 [@media(hover:hover)]:group-hover/mileage:opacity-100 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {formatMiles(miles)}
      </span>
    </span>
  );
}
