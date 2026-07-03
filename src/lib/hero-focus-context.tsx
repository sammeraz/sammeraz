"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface HeroFocusContextValue {
  focused: boolean;
  toggle: () => void;
}

const HeroFocusContext = createContext<HeroFocusContextValue | null>(null);

/** Lets the Hero video's click-to-focus toggle (see Hero.tsx) also fade out
 * the site header, which lives in a separate component higher up the tree. */
export function HeroFocusProvider({ children }: { children: ReactNode }) {
  const [focused, setFocused] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Leaving the page while focused would otherwise strand the header
  // hidden on whatever page comes next, with no way back short of a
  // refresh — reset alongside Header's own per-navigation state, not in an
  // effect, so it clears in the same render as the route change.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setFocused(false);
  }

  const value: HeroFocusContextValue = {
    focused,
    toggle: () => setFocused((prev) => !prev),
  };

  return <HeroFocusContext.Provider value={value}>{children}</HeroFocusContext.Provider>;
}

export function useHeroFocus() {
  const ctx = useContext(HeroFocusContext);
  if (!ctx) throw new Error("useHeroFocus must be used within a HeroFocusProvider");
  return ctx;
}
