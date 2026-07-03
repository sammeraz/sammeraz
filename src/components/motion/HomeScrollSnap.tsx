"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Roughly how long a native smooth-scroll takes to cover a section-sized
// jump — long enough that the animation has actually finished before the
// next wheel tick is allowed to trigger another one, short enough that a
// deliberate second scroll right after doesn't feel ignored.
const COOLDOWN_MS = 800;

/** Section-snap scrolling is opt-in per page, not global — this only runs
 * while the home page is mounted, so other pages keep plain scroll.
 *
 * This is a full paginated jump, not a gentle pull: every wheel tick
 * commits to the next or previous section outright, with the underlying
 * scroll fully prevented so there's no free-scrolling in between — cars
 * this by pattern rather than "catch it if it's already close" (an
 * earlier version of this component), since that still let you scroll
 * freely through the middle of a section.
 *
 * Native scroll-snap-type isn't used here at all: it evaluates snapping
 * against each discrete wheel event instead of waiting for a gesture to
 * finish, so it kept yanking the page back mid-scroll rather than
 * advancing with it — confirmed under both `proximity` and `mandatory`.
 */
export function HomeScrollSnap() {
  const reducedMotion = useSafeReducedMotion();
  const locked = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    function getSectionTargets() {
      // Clamped to what's actually reachable: the last section's own top
      // can land past the document's true max scroll if it (plus whatever
      // follows, e.g. the Footer) is shorter than one viewport — window.
      // scrollTo silently clamps to that max rather than erroring, so an
      // un-clamped target here would never actually be reached, throwing
      // off which index "currentIndex" below thinks it last landed on.
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return [...document.querySelectorAll<HTMLElement>(".snap-section")].map((el) => {
        const rect = el.getBoundingClientRect();
        const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        return Math.min(rect.top + window.scrollY - marginTop, maxScroll);
      });
    }

    // Index of the section currently at/above the scroll position — the
    // one "snap" last landed on, or whichever the page loaded into view of.
    function currentIndex(targets: number[], y: number) {
      let idx = 0;
      for (let i = 0; i < targets.length; i++) {
        if (y >= targets[i] - 2) idx = i;
      }
      return idx;
    }

    function onWheel(event: WheelEvent) {
      if (locked.current) {
        event.preventDefault();
        return;
      }

      const targets = getSectionTargets();
      const y = window.scrollY;
      const direction = event.deltaY > 0 ? 1 : -1;
      const lastTarget = targets[targets.length - 1];

      let nextTarget: number;
      if (y > lastTarget + 2) {
        // Past the last section, in the Footer/free-scroll zone below it.
        if (direction < 0) {
          nextTarget = lastTarget; // scrolling up: land back on it first, don't skip past it
        } else {
          return; // scrolling further down here is just the Footer — let it scroll normally
        }
      } else {
        const nextIdx = currentIndex(targets, y) + direction;
        // At a genuine boundary (top of the page, or past the last section)
        // — nothing to snap to, let native scrolling take over instead of
        // trapping the page here.
        if (nextIdx < 0 || nextIdx > targets.length - 1) return;
        nextTarget = targets[nextIdx];
      }

      if (Math.abs(nextTarget - y) < 2) return;

      event.preventDefault();
      locked.current = true;
      window.scrollTo({ top: nextTarget, behavior: "smooth" });
      setTimeout(() => {
        locked.current = false;
      }, COOLDOWN_MS);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [reducedMotion]);

  return null;
}
