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
    <section className="relative flex min-h-[max(80vh,560px)] items-end overflow-hidden bg-ink text-cream md:min-h-[max(92vh,640px)]">
      <div className="absolute inset-0">
        <PlaceholderArt variant="hero" />
      </div>

      <Container className="relative z-10 pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="inline-flex items-center border border-accent px-4 py-1.5"
          >
            <span className="font-display text-xs text-accent-soft">AIM Imports — Leander, Texas</span>
          </motion.div>

          <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02]">
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
    </section>
  );
}
