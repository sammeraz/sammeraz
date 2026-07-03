"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Matches Tailwind's md: breakpoint — for the rare case a component needs to
 * pick between two different implementations per breakpoint, where CSS
 * alone (hidden/md:block) can't do it because the two sides are different
 * behaviors (e.g. scroll-triggered vs mount-triggered animation), not just
 * different styles on the same element. */
export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
