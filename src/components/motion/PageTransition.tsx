"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useSafeReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  // No AnimatePresence/exit here on purpose: measured with real timestamps,
  // it never actually kept the outgoing page mounted for its exit animation
  // — Next.js swaps `children` to the new route in the same render pass
  // that `pathname` changes, so by the time AnimatePresence's key diffing
  // ran, the "exiting" element already contained the new page's content.
  // The visible result was the new page appearing near-instantly and then
  // doing a full opacity dip-and-recover on top of itself, not a clean
  // crossfade — which read as "the fade doesn't actually mean anything."
  // A plain mount-triggered fade-in is simpler and, unlike the
  // AnimatePresence version, reliably does what it says: key changing
  // forces a genuine unmount of the old content and mount of the new, and
  // Motion always animates a freshly mounted element from `initial` to
  // `animate`.
  //
  // This also runs on the very first page load, but that's not worth
  // special-casing: the Preloader's opaque curtain covers the screen for
  // ~1.55s (900ms load + 650ms exit) start to finish, well past this fade's
  // 0.5s, so the first run always finishes hidden behind it.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
