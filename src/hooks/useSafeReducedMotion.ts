"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const noopSubscribe = () => () => {};

/** True only once the client has hydrated; false (matching SSR) before that. */
function useIsHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Wraps motion's useReducedMotion for hydration safety. That hook reads
 * matchMedia synchronously on the client's first render (see motion-dom's
 * initPrefersReducedMotion), which returns `null` during SSR but can
 * immediately return `true`/`false` on the client — a structural mismatch
 * if that value gates what gets rendered. This reports `false` until after
 * hydration (matching the server's assumption), then the real value.
 */
export function useSafeReducedMotion() {
  const raw = useReducedMotion();
  const isHydrated = useIsHydrated();
  return isHydrated ? Boolean(raw) : false;
}
