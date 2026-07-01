"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Module-level, not state: persists for the tab's lifetime so the intro only
// plays once per visit. Root layout stays mounted across client-side nav in
// the App Router, so this naturally never re-triggers on internal links.
let hasPlayed = false;

type Phase = "loading" | "exiting" | "done";

const LOAD_DURATION = 900;
const EXIT_DURATION = 650;

export function Preloader() {
  const reducedMotion = useSafeReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => (hasPlayed ? "done" : "loading"));

  // Skip the animated intro when the OS asks for reduced motion. Adjusted
  // during render (React's documented pattern for this) rather than in an
  // effect — the phase !== "loading" check keeps it a one-shot transition.
  if (phase === "loading" && reducedMotion) {
    setPhase("done");
  }

  useEffect(() => {
    if (phase === "done") {
      hasPlayed = true;
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    hasPlayed = true;
    const timer = setTimeout(() => setPhase("exiting"), LOAD_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = setTimeout(() => setPhase("done"), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/brand/aim-imports-mark.png"
              alt="AIM Imports"
              width={72}
              height={72}
              priority
              className="h-14 w-14 object-contain md:h-[72px] md:w-[72px]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
