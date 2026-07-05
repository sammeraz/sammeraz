"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CloseIcon } from "@/components/ui/icons";
import { values } from "@/data/site";

interface ValuesGridProps {
  heading?: string;
}

const easing = [0.16, 1, 0.3, 1] as const;

export function ValuesGrid({ heading = "What We Believe" }: ValuesGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? values[activeIndex] : null;
  const activeNumber = activeIndex !== null ? String(activeIndex + 1).padStart(2, "0") : "";

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="bg-cream-deep pb-16 pt-12 md:pb-20">
      <Container>
        <Reveal className="flex items-center gap-5">
          <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">{heading}</h2>
          <span className="h-1 flex-1 bg-accent" />
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <RevealItem key={value.title}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full flex-col gap-3 overflow-hidden border border-ink/10 bg-white p-6 text-left transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-ink/25"
              >
                <span
                  aria-hidden="true"
                  className="font-display absolute -right-2 -top-5 text-7xl text-ink/[0.06] transition-colors duration-300 group-hover:text-accent/10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative h-1 w-8 bg-accent" />
                <h3 className="font-display relative text-xl leading-none text-ink">
                  {value.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-ink/60">{value.description}</p>
                <span className="relative mt-1 text-xs font-medium uppercase tracking-[0.08em] text-ink/40 transition-colors duration-300 group-hover:text-accent">
                  Read More
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: easing }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="grid max-h-[88vh] w-full max-w-5xl overflow-y-auto bg-white shadow-2xl sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto">
                <PlaceholderArt variant="panel" label={active.title} />
              </div>
              <div className="flex flex-col p-8 md:p-12">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-6xl leading-none text-ink/10">
                    {activeNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    aria-label="Close"
                    className="flex h-9 w-9 shrink-0 items-center justify-center text-ink/50 transition-colors hover:text-ink"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>
                <span className="mt-2 block h-1 w-10 bg-accent" />
                <h3 className="font-display mt-4 text-4xl leading-none text-ink">
                  {active.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/65">{active.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
