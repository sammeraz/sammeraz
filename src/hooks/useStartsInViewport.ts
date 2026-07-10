"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/** Whether this element already sits inside the viewport the instant it
 * mounts — read synchronously before paint so a visitor never sees it sit
 * at opacity:0 waiting on a scroll that may never come (whileInView's own
 * viewport margin can otherwise leave content that's genuinely on screen
 * without scrolling stuck un-revealed until a small scroll nudges it past
 * that margin). Content already on screen should always animate in
 * immediately; only content actually below the fold should wait for the
 * user to scroll to it. */
export function useStartsInViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [startsInViewport, setStartsInViewport] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setStartsInViewport(rect.top < window.innerHeight && rect.bottom > 0);
  }, []);

  return [ref, startsInViewport] as const;
}
