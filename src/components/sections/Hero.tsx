"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CloseIcon, ExpandIcon } from "@/components/ui/icons";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { useHeroFocus } from "@/lib/hero-focus-context";
import { site } from "@/data/site";

const easing = [0.16, 1, 0.3, 1] as const;
const words = site.tagline.split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSafeReducedMotion();
  const { focused, toggle } = useHeroFocus();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Background drifts a little slower than the page scrolls past it — the
  // wrapper below is oversized (extends past the section's own top/bottom
  // edges) so the drift never uncovers empty space; the section's own
  // overflow-hidden clips it back down to the hero's actual bounds.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // <video autoPlay> only fires once at mount, before reducedMotion's real
  // value is known (useSafeReducedMotion reports false until hydrated) —
  // this corrects it afterward, freezing on the poster frame for anyone who
  // asked the OS for reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
    } else {
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end overflow-hidden bg-ink text-cream md:min-h-[640px] md:flex-1"
    >
      <motion.div
        className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
        style={{ y: reducedMotion ? "0%" : parallaxY }}
      >
        {/* No background at all on mobile for now — just the section's
            plain bg-ink showing through. hidden (not just sourceless) so
            the poster frame doesn't render as a fallback image either. */}
        <video
          ref={videoRef}
          className="hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero-desktop.webm" type="video/webm" media="(min-width: 768px)" />
          <source src="/video/hero-desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
        </video>
        {/* Same bottom-anchored darkening the old PlaceholderArt hero variant
            used, so the light headline stays legible over whatever's
            underneath — footage brightness varies by frame, static art didn't.
            Fades out in focus mode along with the text it exists to serve. */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent transition-opacity duration-700 ${
            focused ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.div>

      <Container className="relative z-10 pb-16 pt-20 md:pb-24 md:pt-32">
        {/* inert (not just opacity/pointer-events) so a keyboard user tabbing
            through can't land on the View Inventory / Start an Inquiry links
            while they're invisible and un-clickable. */}
        <div
          inert={focused}
          className={`max-w-3xl transition-opacity duration-700 ${focused ? "opacity-0" : "opacity-100"}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="inline-flex items-center border border-cream px-4 py-1.5"
          >
            <span className="font-display text-xs text-cream">AIM Imports — Leander, Texas</span>
          </motion.div>

          <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02]">
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, delay: 0.15 + i * 0.06, ease: easing }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
                {/* Force "done right." onto its own line rather than letting
                    "done" wrap alone with "imports," above it. */}
                {i === 1 ? <br /> : null}
              </Fragment>
            ))}
          </h1>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easing }}
            className="mt-5 block h-1 w-20 origin-left bg-accent"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easing }}
            className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 md:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: easing }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/inventory" variant="light">
              View Inventory
            </Button>
            <Button href="/contact" variant="outline-light">
              {site.inquiryCta}
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Hidden on mobile — there's no video there to fullscreen right now.
          Outside the inert wrapper above so it stays clickable in both
          states on desktop — it's the only way back once the rest of the
          hero has faded out. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={focused ? "Exit fullscreen video" : "Fullscreen video"}
        className="absolute bottom-6 right-6 z-20 hidden h-9 w-9 items-center justify-center border border-cream/40 bg-ink/30 text-cream backdrop-blur-sm transition-colors duration-200 hover:border-cream md:flex md:bottom-8 md:right-8"
      >
        {focused ? <CloseIcon className="h-4 w-4" /> : <ExpandIcon className="h-4 w-4" />}
      </button>
    </section>
  );
}
