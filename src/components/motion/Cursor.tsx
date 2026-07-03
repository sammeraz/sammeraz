"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { useHeroFocus } from "@/lib/hero-focus-context";

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
// A solid (unblurred) ring just outside the shape's own edge. Invisible
// against light sections — the ink fill/border underneath already reads
// there — but it's what keeps the cursor visible on dark sections, where
// ink-on-ink would otherwise disappear outright. Doing this with a real
// halo color instead of mix-blend-mode is deliberate: the earlier white +
// mix-blend-difference cursor went invisible over the site's own light
// sections in practice, so this cursor doesn't lean on blend modes for
// visibility at all.
const HALO = "shadow-[0_0_0_1.5px_rgba(255,255,255,0.65)]";
const HALO_SHADOW = "0 0 0 1.5px rgba(255,255,255,0.65)";
const NO_HALO_SHADOW = "0 0 0 0px rgba(255,255,255,0)";

// Four corner brackets "lock on" to the box on hover — the same camera-focus
// language the mobile menu button borrows for touch users who never see
// this cursor. Independent marks rather than a connected border, so hover
// reads as a clean red frame instead of a solid line or a moving dash.
const BRACKET_POSITIONS = [
  "-left-2 -top-2 border-l border-t",
  "-right-2 -top-2 border-r border-t",
  "-bottom-2 -left-2 border-b border-l",
  "-bottom-2 -right-2 border-b border-r",
];

// useLayoutEffect warns on the server (SSR has no layout to measure before
// paint) — this component is client-only in practice, so fall back to a
// plain effect there and reserve the synchronous, pre-paint variant for the
// browser, where it's needed below to read the DOM before it can paint.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Cursor() {
  const isFinePointer = useIsFinePointer();
  const reducedMotion = useSafeReducedMotion();
  const { focused } = useHeroFocus();
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [overText, setOverText] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pathname = usePathname();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.4 });

  const active = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("cursor-none-custom");

    // Deriving hover fresh from every real mousemove's own target, rather
    // than tracking it via paired mouseover/mouseout listeners, sidesteps a
    // whole class of ordering bugs: mouseover/mouseout can fire out of sync
    // with mousemove (browsers don't guarantee which comes first for a
    // given movement, and a fast flick across several elements can deliver
    // them in an order that leaves hover stuck true), and they can also
    // fire on their own with no real movement at all — e.g. a nav link's
    // own classes change the instant its route becomes active (see
    // NavLink's isActive), which alone can make a browser re-fire
    // mouseover for whatever's still stationary underneath. mousemove has
    // neither problem: it only ever fires on genuine pointer movement, and
    // its target always reflects exactly what's under the pointer at that
    // moment, so recomputing hover/label from it every time is always
    // correct and never stale — no event-order assumptions required.
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest?.(TEXT_INPUT_SELECTOR)) {
        setOverText(true);
        return;
      }
      setOverText(false);

      const interactive = target.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (interactive) {
        setHover(true);
        setLabel(interactive.getAttribute("data-cursor-text"));
      } else {
        setHover(false);
        setLabel(null);
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.classList.remove("cursor-none-custom");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [active, x, y]);

  // Clicking a nav link and landing on its own page leaves it still
  // physically under the pointer — hover should stay red for exactly that
  // reason, not get force-cleared just because the route changed. Re-check
  // what's actually at the last known pointer position rather than
  // assuming either way, so this is correct whether the click landed on a
  // still-hovered link or moved on to something else entirely.
  //
  // This has to run in a layout effect, not during render: render computes
  // the new page but doesn't commit it to the real DOM until after this
  // function returns, so reading elementFromPoint synchronously here would
  // still see the outgoing page. Reading it here, guaranteed to run only
  // after that commit, is what makes it match what's actually now on
  // screen — the sometimes-stale-sometimes-right symptom came from that
  // pre-commit read finding a leftover element that the new page doesn't
  // actually have at that position.
  const syncHoverToPointer = () => {
    if (typeof document === "undefined") return;
    const elementAtPoint = document.elementFromPoint(x.get(), y.get()) as HTMLElement | null;
    const interactive = elementAtPoint?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
    if (interactive) {
      setHover(true);
      setLabel(interactive.getAttribute("data-cursor-text"));
    } else {
      setHover(false);
      setLabel(null);
    }
  };

  useIsomorphicLayoutEffect(syncHoverToPointer, [pathname, focused, x, y]);

  // The Hero fullscreen toggle is the same class of bug: clicking it
  // collapses TrustStrip's real layout height (see TrustStrip.tsx), and
  // Hero grows to fill that space, so the button itself — bottom-anchored
  // inside Hero — drifts down and out from under a pointer that never
  // moved. Unlike a route change, that drift plays out over TrustStrip's
  // own 700ms transition rather than landing in its final spot right away,
  // so the immediate check above only catches the very start of it. Catch
  // the end of it too, or hover stays stale for most of the animation.
  useEffect(() => {
    const timeout = setTimeout(syncHoverToPointer, 750);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

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
        {/* Diamond at rest — the one shape in the cursor that isn't a plain
            circle, matching the sharp, uncut corners used on buttons and
            cards everywhere else. Fades out entirely on hover, since the
            corner brackets below take over as the "clickable" signal. */}
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 border ${HALO}`}
          style={{ borderColor: INK }}
          animate={{ rotate: hover ? 0 : 45, opacity: hover ? 0 : 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 240 }}
        />

        {/* Hover: four corner brackets lock onto the box — fully red, no
            white halo mixed in. */}
        {BRACKET_POSITIONS.map((pos) => (
          <motion.span
            key={pos}
            aria-hidden="true"
            className={`absolute h-2 w-2 ${pos}`}
            style={{ borderColor: FULL_RED }}
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.5 }}
            transition={{ type: "spring", damping: 20, stiffness: 240 }}
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
