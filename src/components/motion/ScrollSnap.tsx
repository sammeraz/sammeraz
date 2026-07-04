"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Roughly how long a native smooth-scroll takes to cover a section-sized
// jump — long enough that the animation has actually finished before the
// next wheel tick is allowed to trigger another one, short enough that a
// deliberate second scroll right after doesn't feel ignored.
const COOLDOWN_MS = 800;

interface Section {
  top: number;
  bottom: number;
  scrollable: boolean;
}

/** Mounted once, sitewide, in the root layout — every page opts in just by
 * wrapping its top-level blocks in a `.snap-section` div, same as the home
 * page did originally.
 *
 * This is a full paginated jump, not a gentle pull: every wheel tick
 * commits to the next or previous section outright, with the underlying
 * scroll fully prevented so there's no free-scrolling in between — chosen
 * over "catch it if it's already close" (an earlier version of this
 * component), since that still let you scroll freely through the middle of
 * a section.
 *
 * The one exception is a section explicitly marked `.snap-scrollable` (the
 * Inventory/Store grids, which grow with the catalog and can't be jumped
 * past wholesale without hiding whatever doesn't fit on the first screen) —
 * wheel events inside one scroll it natively until its far edge, and only
 * *that* boundary gets hard-snapped, exactly like every other section edge.
 * This is opt-in rather than "whatever's taller than the viewport right
 * now": a section can end up a little taller than the viewport on some
 * window size purely from ordinary reflow (e.g. the home page's carousel
 * section, depending on exact height), and auto-detecting would let a
 * viewport-dependent sliver of free scrolling back in on pages that never
 * needed it.
 *
 * Native scroll-snap-type isn't used here at all: it evaluates snapping
 * against each discrete wheel event instead of waiting for a gesture to
 * finish, so it kept yanking the page back mid-scroll rather than
 * advancing with it — confirmed under both `proximity` and `mandatory`.
 */
export function ScrollSnap() {
  const reducedMotion = useSafeReducedMotion();
  const locked = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    function getSections(): Section[] {
      // Tops are clamped to what's actually reachable: a section's own top
      // can land past the document's true max scroll if it (plus whatever
      // follows, e.g. the Footer) is shorter than one viewport — window.
      // scrollTo silently clamps to that max rather than erroring, so an
      // un-clamped target here would never actually be reached, throwing
      // off which index "currentIndex" below thinks it last landed on.
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return [...document.querySelectorAll<HTMLElement>(".snap-section")].map((el) => {
        const rect = el.getBoundingClientRect();
        const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const top = Math.min(Math.max(rect.top + window.scrollY - marginTop, 0), maxScroll);
        return { top, bottom: rect.bottom + window.scrollY, scrollable: el.classList.contains("snap-scrollable") };
      });
    }

    // Index of the section currently at/above the scroll position — the
    // one "snap" last landed on, or whichever the page loaded into view of.
    function currentIndex(sections: Section[], y: number) {
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (y >= sections[i].top - 2) idx = i;
      }
      return idx;
    }

    // Arriving at a `.snap-scrollable` section from below should reveal its
    // tail end, not jump back to its top — everywhere else this is just
    // `top`, matching what every section already did before that class
    // existed.
    function landingTarget(section: Section, fromBelow: boolean) {
      if (!fromBelow || !section.scrollable) return section.top;
      return Math.max(section.top, section.bottom - window.innerHeight);
    }

    function onWheel(event: WheelEvent) {
      if (locked.current) {
        event.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length === 0) return;

      const y = window.scrollY;
      const direction = event.deltaY > 0 ? 1 : -1;
      const lastSection = sections[sections.length - 1];

      let nextTarget: number;
      if (y > lastSection.top + 2) {
        // Past the last section, in the Footer/free-scroll zone below it.
        if (direction < 0) {
          nextTarget = landingTarget(lastSection, true); // land back on it first, don't skip past it
        } else {
          return; // scrolling further down here is just the Footer — let it scroll normally
        }
      } else {
        const index = currentIndex(sections, y);
        const section = sections[index];

        if (section.scrollable) {
          // Still inside a scrollable section, with more of it left to
          // reveal in this direction — let the wheel event through instead
          // of jumping past unread content.
          const viewportBottom = y + window.innerHeight;
          if (direction > 0 && viewportBottom < section.bottom - 2) return;
          if (direction < 0 && y > section.top + 2) return;
        }

        const nextIndex = index + direction;
        // At a genuine boundary (top of the page, or past the last section)
        // — nothing to snap to, let native scrolling take over instead of
        // trapping the page here.
        if (nextIndex < 0 || nextIndex > sections.length - 1) return;
        nextTarget = landingTarget(sections[nextIndex], direction < 0);
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
