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
// A solid (unblurred) ring just outside the shape's own edge, used on both
// the dot and the box outline below. Invisible against light sections — the
// ink fill/border underneath already reads there — but it's what keeps the
// cursor visible on dark sections, where ink-on-ink would otherwise
// disappear outright. Doing this with a real halo color instead of
// mix-blend-mode is deliberate: the earlier white + mix-blend-difference
// cursor went invisible over the site's own light sections in practice, so
// this cursor doesn't lean on blend modes for visibility at all. Dropped
// entirely on hover so red reads as fully red, nothing white mixed in.
const HALO_SHADOW = "0 0 0 1.5px rgba(255,255,255,0.65)";
const NO_HALO_SHADOW = "0 0 0 0px rgba(255,255,255,0)";

// Hover traces a short red segment around the box's perimeter on a loop,
// rather than mixing red with the ink/white idle look — the perimeter of
// the traced rect below (52x52, 2px inset from the 56px hover size) is
// 4*52 = 208, so a dash pattern that sums to 208 and an offset animation of
// exactly -208 loops seamlessly (the pattern at -208 is pixel-identical to
// the one at 0, so the reset each cycle is invisible).
const TRACE_PERIMETER = 208;
const TRACE_DASH = "40 168";

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
        className="pointer-events-none fixed left-0 top-0 z-[250] h-1.5 w-1.5"
        style={{ x, y, translate: "-50% -50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          rotate: pressed ? 45 : 0,
          backgroundColor: hover ? FULL_RED : INK,
          // No halo on hover — fully red then, nothing white mixed in.
          boxShadow: hover ? NO_HALO_SHADOW : HALO_SHADOW,
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
        {/* Diamond at rest, square on hover — the one shape in the cursor
            that isn't a plain circle, matching the sharp, uncut corners used
            on buttons and cards everywhere else. Stays visible through the
            hover transition instead of fading out, so hovering something
            clickable still reads as a solid box; the traced segment below
            rides on top of it for motion. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border"
          animate={{
            rotate: hover ? 0 : 45,
            borderColor: hover ? FULL_RED : INK,
            boxShadow: hover ? NO_HALO_SHADOW : HALO_SHADOW,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 240 }}
        />

        {/* Hover: a brighter red segment chases around the box's edge on a
            loop, layered on top of the solid outline above — its 2px stroke
            reads as a pulse against the 1px border beneath it, so the
            motion stays visible even though both are the same fully-red
            color with no white mixed in. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 56 56"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="2"
            y="2"
            width="52"
            height="52"
            fill="none"
            stroke={FULL_RED}
            strokeWidth="2"
            strokeDasharray={TRACE_DASH}
            animate={
              hover
                ? { opacity: 1, strokeDashoffset: -TRACE_PERIMETER }
                : { opacity: 0 }
            }
            transition={
              hover
                ? {
                    opacity: { duration: 0.15 },
                    strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" },
                  }
                : { duration: 0.15 }
            }
          />
        </svg>

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
