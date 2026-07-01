"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { site } from "@/data/site";

const easing = [0.16, 1, 0.3, 1] as const;
const words = site.tagline.split(" ");

export function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[620px] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <PlaceholderArt variant="hero" />
      </div>

      {/* Bold diagonal accent — motorsport-stripe treatment, kept clear of the text column */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-24 top-0 h-full w-[28%] origin-top bg-gradient-to-b from-accent/0 via-accent/35 to-accent/0"
          style={{ transform: "skewX(-14deg)" }}
        />
        <div
          className="absolute -right-8 top-0 h-full w-12 origin-top bg-gradient-to-b from-cream/0 via-cream/[0.08] to-cream/0"
          style={{ transform: "skewX(-14deg)" }}
        />
      </div>

      <Container className="relative z-10 pb-24 pt-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="block text-xs font-medium uppercase tracking-[0.25em] text-accent-soft"
          >
            AIM Imports &middot; Texas, USA
          </motion.span>

          <h1 className="mt-5 font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.06, ease: easing }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easing }}
            className="font-body mt-6 max-w-lg text-base leading-relaxed text-cream/75 md:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easing }}
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
    </section>
  );
}
