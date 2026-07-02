"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor]";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";

// Four L-shaped ticks that fan out from the frame on hover, like a camera
// autofocus reticle locking on — reinforces "this is clickable" instead of
// just scaling the same shape bigger.
const CORNERS = [
  { key: "tl", pos: "-left-2.5 -top-2.5", border: "border-l border-t" },
  { key: "tr", pos: "-right-2.5 -top-2.5", border: "border-r border-t" },
  { key: "br", pos: "-right-2.5 -bottom-2.5", border: "border-r border-b" },
  { key: "bl", pos: "-left-2.5 -bottom-2.5", border: "border-l border-b" },
] as const;

export function Cursor() {
  const isFinePointer = useIsFinePointer();
  const reducedMotion = useSafeReducedMotion();
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [overText, setOverText] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.4 });

  const active = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("cursor-none-custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(TEXT_INPUT_SELECTOR)) {
        setOverText(true);
        return;
      }
      const interactive = target.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (interactive) {
        setHover(true);
        setLabel(interactive.getAttribute("data-cursor-text"));
      }
    };

    const out = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(TEXT_INPUT_SELECTOR)) {
        setOverText(false);
      }
      if (target.closest?.(INTERACTIVE_SELECTOR)) {
        setHover(false);
        setLabel(null);
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over, true);
    document.addEventListener("mouseout", out, true);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.classList.remove("cursor-none-custom");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over, true);
      document.removeEventListener("mouseout", out, true);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [active, x, y]);

  if (!active) return null;

  const visible = !overText;
  const ringSize = hover ? 72 : pressed ? 20 : 32;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 bg-white mix-blend-difference"
        style={{ x, y, translate: "-50% -50%" }}
        animate={{ opacity: visible ? 1 : 0, rotate: pressed ? 45 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translate: "-50% -50%" }}
        animate={{ width: ringSize, height: ringSize, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      >
        {/* Diamond by default, squares up on hover — the one shape in the
            cursor that isn't a plain circle, matching the sharp, uncut
            corners used on buttons and cards everywhere else. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border border-white mix-blend-difference"
          animate={{ rotate: hover ? 0 : 45 }}
          transition={{ type: "spring", damping: 20, stiffness: 240 }}
        />

        {CORNERS.map((corner) => (
          <motion.span
            key={corner.key}
            aria-hidden="true"
            className={`absolute h-3 w-3 border-white mix-blend-difference ${corner.pos} ${corner.border}`}
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        ))}

        {label ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] text-white mix-blend-difference"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </>
  );
}
