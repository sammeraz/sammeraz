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
  const [percent, setPercent] = useState(0);

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

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setPercent(Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100)));
      if (elapsed < LOAD_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("exiting");
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-ink"
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
          <span className="font-sans text-xs tracking-[0.3em] text-cream/45 tabular-nums">
            {percent.toString().padStart(3, "0")}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
