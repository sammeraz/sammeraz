"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor]";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";

// A constantly-visible saturated color following the mouse everywhere reads
// as fatiguing over time — that held true even muted to accent-soft, so the
// reticle carries no red at all by default. Ink (matches --color-ink) reads
// clearly on light sections the same way body text does; the halo below is
// what carries it on dark ones. Red is reserved entirely for hover, as a
// deliberate "this is clickable" signal rather than a constant presence.
const INK = "#0d0d0d";
const FULL_RED = "#d3261a";
// A solid (unblurred) ring just outside the shape's own edge, same in every
// state. Invisible against light sections — the ink fill/border underneath
// already reads there — but it's what keeps the cursor visible on dark
// sections, where ink-on-ink would otherwise disappear outright. Doing this
// with a real halo color instead of mix-blend-mode is deliberate: the
// earlier white + mix-blend-difference cursor went invisible over the
// site's own light sections in practice, so this cursor doesn't lean on
// blend modes for visibility at all.
const HALO = "shadow-[0_0_0_1.5px_rgba(255,255,255,0.65)]";

// Four L-shaped ticks that fan out from the frame on hover, like a camera
// autofocus reticle locking on — reinforces "this is clickable" instead of
// just scaling the same shape bigger.
const CORNERS = [
  { key: "tl", pos: "-left-2 -top-2", border: "border-l border-t" },
  { key: "tr", pos: "-right-2 -top-2", border: "border-r border-t" },
  { key: "br", pos: "-right-2 -bottom-2", border: "border-r border-b" },
  { key: "bl", pos: "-left-2 -bottom-2", border: "border-l border-b" },
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
  const ringSize = hover ? 56 : pressed ? 16 : 26;

  return (
    <>
      {/* z-[250] beats every overlay in the app (CartDrawer's backdrop is
          z-[100], same as this used to be — with equal z-index the later
          element in the DOM wins, so the drawer's backdrop was painting
          over the cursor and hiding it completely any time the cart was
          open). Also above Preloader's z-[200] so the cursor never
          vanishes for the moment the intro is still on screen. */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[250] h-1.5 w-1.5 ${HALO}`}
        style={{ x, y, translate: "-50% -50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          rotate: pressed ? 45 : 0,
          backgroundColor: hover ? FULL_RED : INK,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[250] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translate: "-50% -50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          // Solid dark fill only while showing a text label — the label
          // needs a guaranteed-dark backdrop to stay legible no matter what
          // it's hovering over; the plain reticle (no label) stays an
          // outline so it never blocks the button/link text underneath.
          backgroundColor: label ? "rgba(13, 13, 13, 0.95)" : "rgba(13, 13, 13, 0)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      >
        {/* Diamond by default, squares up on hover — the one shape in the
            cursor that isn't a plain circle, matching the sharp, uncut
            corners used on buttons and cards everywhere else. */}
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 border ${HALO}`}
          animate={{ rotate: hover ? 0 : 45, borderColor: hover ? FULL_RED : INK }}
          transition={{ type: "spring", damping: 20, stiffness: 240 }}
        />

        {CORNERS.map((corner) => (
          <motion.span
            key={corner.key}
            aria-hidden="true"
            className={`absolute h-2.5 w-2.5 border-accent ${HALO} ${corner.pos} ${corner.border}`}
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        ))}

        {label ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] text-white"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </>
  );
}
