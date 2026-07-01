"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine)";

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

/** True for mouse/trackpad input; false for touch — gates cursor/magnetic effects. */
export function useIsFinePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
