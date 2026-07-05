"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";
import { formatKm, formatMiles } from "@/lib/format";

interface MileageProps {
  miles: number;
  className?: string;
  /** Detail page has room (and touch visitors need it too), so the mile
   * equivalent stays inline instead of hidden behind a hover popup. */
  showParenthetical?: boolean;
}

// Only one mileage popup should ever be open at once — module-scoped so
// opening one instance can close whichever other instance (on this or
// another vehicle) is currently revealed, without prop-drilling shared
// state through every card/row that renders a Mileage.
let openId: string | null = null;
const listeners = new Set<() => void>();

function setOpenId(id: string | null) {
  openId = id;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return openId;
}

function getServerSnapshot() {
  return null;
}

/** Km is the primary figure everywhere (JDM odometers read in km). Card and
 * list rows are tight on space, so the mile equivalent for US buyers surfaces
 * as a small popup instead: real :hover devices get it on hover, and it's
 * also a tap target (this sits inside a card/row that's itself a link, so
 * the tap has to stop that link's navigation to work as a peek rather than
 * a click-through). */
export function Mileage({ miles, className = "", showParenthetical = false }: MileageProps) {
  const id = useId();
  const activeId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const revealed = activeId === id;
  const ref = useRef<HTMLSpanElement>(null);

  // Capture phase so this still fires even though the toggle below calls
  // stopPropagation — otherwise a tap on another mileage (or anywhere else)
  // would never reach a plain bubble-phase document listener.
  useEffect(() => {
    if (!revealed) return;
    function handleClick(event: globalThis.MouseEvent) {
      if (ref.current?.contains(event.target as Node)) return;
      setOpenId(null);
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [revealed]);

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
    setOpenId(revealed ? null : id);
  }

  return (
    <span
      ref={ref}
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
