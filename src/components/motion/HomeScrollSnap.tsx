"use client";

import { useEffect } from "react";

/** Section-snap scrolling is opt-in per page, not global — the class this
 * toggles only exists while the home page is mounted, and comes off again
 * on unmount/navigation. Applying scroll-snap-type globally on <html>
 * would force it onto every other page too, whose sections weren't
 * designed around snapping to full-section boundaries. */
export function HomeScrollSnap() {
  useEffect(() => {
    document.documentElement.classList.add("snap-y-home");
    return () => {
      document.documentElement.classList.remove("snap-y-home");
    };
  }, []);

  return null;
}
