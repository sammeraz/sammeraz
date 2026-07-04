"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Roughly how long a native smooth-scroll takes to cover the hero-sized
// jump — long enough that the animation has actually finished before
// another wheel tick is allowed to trigger a second one.
const COOLDOWN_MS = 800;

/** Home-page only, and one-directional: scrolling down while the hero/video
 * block (`.snap-hero`) is still on screen commits a single clean jump to
 * whatever comes right after it, so the video never ends up scrolled
 * awkwardly half-past. That's the only thing this does — scrolling up, or
 * any scrolling once you're past the hero block, is always left completely
 * native. An earlier version of this generalized into a fully paginated,
 * every-section-snaps mechanism (both home-page-wide and later sitewide),
 * but that traded away normal scrolling everywhere for a flourish that was
 * only ever wanted on this one transition.
 */
export function HomeScrollSnap() {
  const reducedMotion = useSafeReducedMotion();
  const locked = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    function onWheel(event: WheelEvent) {
      if (event.deltaY <= 0 || locked.current) return;

      const hero = document.querySelector<HTMLElement>(".snap-hero");
      const next = hero?.nextElementSibling as HTMLElement | null;
      if (!hero || !next) return;

      // Already scrolled past the hero block — nothing left to snap, behave
      // completely normally from here on.
      if (hero.getBoundingClientRect().bottom <= 0) return;

      // Measured live rather than assumed, so this stays correct if the
      // fixed header's height ever changes.
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const target = next.getBoundingClientRect().top + window.scrollY - headerHeight;
      if (target - window.scrollY < 2) return;

      event.preventDefault();
      locked.current = true;
      window.scrollTo({ top: target, behavior: "smooth" });
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
