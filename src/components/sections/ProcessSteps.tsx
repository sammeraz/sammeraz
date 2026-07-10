"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useStartsInViewport } from "@/hooks/useStartsInViewport";
import { processSteps } from "@/data/site";

interface ProcessStepsProps {
  heading?: string;
  /** Tighter padding for when this follows another already-padded content
   * section (e.g. on About) instead of a full-bleed hero/carousel, where the
   * two sections' padding would otherwise stack into a much bigger gap than
   * the rest of the page uses. */
  tightTop?: boolean;
}

const easing = [0.16, 1, 0.3, 1] as const;

/** Own component (not inlined in the .map below) so each row gets its own
 * useStartsInViewport hook instance — steps above the fold animate in
 * immediately on mount, the rest still reveal as the user scrolls to them. */
function ProcessStepRow({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const [ref, startsInViewport] = useStartsInViewport<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={startsInViewport ? { opacity: 1, x: 0 } : undefined}
      whileInView={startsInViewport ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: easing }}
      className="group relative flex items-start gap-5 border-b border-ink/15 py-7 dark:border-cream/15 md:gap-10"
    >
      <span className="font-display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-cream-deep text-lg text-ink transition-[transform,border-color,color,box-shadow] duration-300 group-hover:scale-110 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_0_6px_rgba(211,38,26,0.12)] dark:border-cream/15 dark:bg-sand dark:text-cream">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-center md:gap-10">
        <h3 className="font-display shrink-0 text-2xl leading-none text-ink dark:text-cream md:w-56">
          {step.title}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-ink/60 dark:text-cream/60">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function ProcessSteps({ heading = "How It Works", tightTop = false }: ProcessStepsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className={`bg-cream-deep dark:bg-sand ${tightTop ? "pb-16 pt-12 md:pb-20" : "pb-24 pt-24 md:pb-32 md:pt-32"}`}>
      <Container>
        <Reveal className="flex items-center gap-5">
          <h2 className="font-display shrink-0 text-3xl text-ink dark:text-cream md:text-4xl">{heading}</h2>
          <span className="h-1 flex-1 bg-accent" />
        </Reveal>

        <div ref={trackRef} className="relative mt-14 border-t border-ink/15 dark:border-cream/15">
          {/* Static track behind the markers, plus a scroll-filled accent
              line on top of it — the line reads as "progress" down the
              steps as the section scrolls through view, echoing the actual
              step-by-step process it's illustrating. */}
          <div aria-hidden="true" className="absolute bottom-14 left-7 top-14 w-px bg-ink/15 dark:bg-cream/15" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-14 left-7 top-14 w-px origin-top bg-accent"
          />

          {processSteps.map((step, index) => (
            <ProcessStepRow key={step.title} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
