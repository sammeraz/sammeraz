"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

const IDLE_MS = 150;
// Roughly how long a native smooth-scroll takes to cover a section-sized
// distance — long enough that its own scroll events (ignored below) have
// finished firing before this re-arms, short enough to feel responsive to
// input that starts again right after it lands.
const SETTLE_MS = 500;

/** Section-snap scrolling is opt-in per page, not global — this only runs
 * while the home page is mounted, so other pages keep plain scroll.
 *
 * CSS scroll-snap-type (the first attempt here) turned out to fight
 * trackpad input rather than help it: Chromium evaluates snapping against
 * each discrete wheel event instead of waiting for the whole gesture to
 * finish, so mid-scroll the page kept getting yanked back toward whatever
 * snap point was nearest at that instant — verified this happens under
 * both `proximity` and `mandatory`, so it wasn't a strictness tuning
 * problem. Driving it from JS instead means the "where should this land"
 * decision only runs once scrolling has genuinely gone idle, matching how
 * a trackpad gesture actually ends rather than how the browser samples it.
 */
export function HomeScrollSnap() {
  const reducedMotion = useSafeReducedMotion();
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settling = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    function nearestSectionTop(currentY: number) {
      const targets = [...document.querySelectorAll<HTMLElement>(".snap-section")].map((el) => {
        const rect = el.getBoundingClientRect();
        const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        return rect.top + currentY - marginTop;
      });
      return targets.reduce((best, t) => (Math.abs(t - currentY) < Math.abs(best - currentY) ? t : best));
    }

    function onScroll() {
      // Ignore the scroll events our own corrective scrollTo below produces
      // — otherwise every one of them would reset the idle timer and this
      // would never consider itself "settled".
      if (settling.current) return;

      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        const current = window.scrollY;
        const target = nearestSectionTop(current);
        const distance = Math.abs(target - current);
        if (distance < 2) return;
        // Only catch scrolling that's already near a boundary — these
        // sections run taller than a viewport often enough that snapping
        // unconditionally to "nearest" would yank anyone reading through
        // the middle of one back to its top the instant they stopped.
        if (distance > window.innerHeight * 0.4) return;

        settling.current = true;
        window.scrollTo({ top: target, behavior: "smooth" });
        setTimeout(() => {
          settling.current = false;
        }, SETTLE_MS);
      }, IDLE_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [reducedMotion]);

  return null;
}
