"use client";

import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns on the server (SSR has no layout to measure before
// paint) — fall back to a plain effect there and reserve the synchronous,
// pre-paint variant for the browser, where it matters: it runs before the
// first paint, so a state correction made inside it (e.g. reading the real
// scroll position) is never visible as a flash of the wrong initial state.
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
