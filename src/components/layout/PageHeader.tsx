"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

const easing = [0.16, 1, 0.3, 1] as const;

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <PlaceholderArt variant="hero" />
      </div>
      <Container className="relative z-10 pb-14 pt-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="font-display block text-sm italic text-accent-soft"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easing }}
          className="font-display mt-4 max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: easing }}
            className="mt-4 max-w-xl text-base leading-relaxed text-cream/70"
          >
            {description}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}
