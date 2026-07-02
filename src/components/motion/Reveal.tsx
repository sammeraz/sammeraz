"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

export const revealEase = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: revealEase } },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades/slides a single block in once it scrolls into view. */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a grid/row; each RevealItem child staggers in behind it. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

/** Same fade/slide as Reveal, but plays on mount instead of waiting for
 * scroll — for content that must never sit at opacity:0 before a visitor
 * scrolls (e.g. a detail page's hero and spec table, both usually already
 * on screen at load). */
export function RevealOnLoad({ children, delay = 0, y = 26, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Mount-triggered counterpart to RevealGroup — pair with RevealItem. */
export function RevealOnLoadGroup({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
