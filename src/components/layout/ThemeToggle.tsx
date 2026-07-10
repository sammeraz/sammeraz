"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme-context";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex h-10 w-10 items-center justify-center text-cream/85 transition-colors hover:text-cream ${className}`}
    >
      {/* Own clipping box just for the icon crossfade, not the whole button —
          the underline below sits at -bottom-1, just outside the button's
          box, and needs the button itself to stay overflow-visible or it
          gets clipped away along with the rotating icon. */}
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Same underline language as the desktop nav links and cart icon (see
          NavLink in Header, CartButton) — ties this into the header's
          existing hover motif instead of a one-off effect. */}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-[width] duration-300 ease-out group-hover:w-5"
      />
    </motion.button>
  );
}
