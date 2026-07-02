"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { CartButton } from "@/components/store/CartButton";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { navLinks, site } from "@/data/site";

const easing = [0.16, 1, 0.3, 1] as const;
const menuLinks = [{ label: "Home", href: "/" }, ...navLinks];

// Collapsed to a small rectangle near the trigger button (top-right), then
// expands to fill the screen — an aperture "locking on" open, echoing the
// camera-focus brackets the custom cursor already uses on hover.
const CLOSED_CLIP = "inset(0% 0% 100% 55%)";
const OPEN_CLIP = "inset(0% 0% 0% 0%)";

export function Header() {
  // Default to the solid/dark state, not transparent. The logo has no dark
  // backing (see Logo.tsx), so it only reads correctly over a dark surface.
  // Browsers commonly restore scroll position on a hard refresh, and this
  // component can't know the real scroll position during SSR or its first
  // client paint — defaulting to transparent risked the header (and its
  // white-on-nothing logo) briefly sitting over a light section before the
  // scroll effect below corrects it. Solid is always safe; transparent is
  // only safe once we've confirmed we're actually at the top.
  const [scrolled, setScrolled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useSafeReducedMotion();
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  // True for a moment right after navigation, covering the page-transition
  // fade (see PageTransition.tsx). The entering page's hero/dark background
  // fades in from opacity 0, so a transparent header briefly sits over the
  // plain white <body> during that window — forcing solid here avoids the
  // white-on-nothing logo flashing illegible mid-transition.
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu and start the transition-solid window when
  // navigation occurs, without an effect.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setTransitioning(true);
  }

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => setTransitioning(false), 550);
    return () => clearTimeout(timer);
  }, [transitioning]);

  const solid = scrolled || menuOpen || transitioning;

  function NavLink({ href, label }: { href: string; label: string }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`group relative font-display text-sm transition-opacity hover:opacity-100 ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
      >
        {label}
        <span
          className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ease-out ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/95 backdrop-blur-sm shadow-[0_1px_0_0] shadow-cream/10" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between text-cream">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden lg:block">
            <Button href="/contact" variant="light">
              {site.inquiryCta}
            </Button>
          </div>
          <CartButton />

          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            {/* Corner brackets "lock on" to the button while open — the same
                camera-focus language the custom cursor uses on hover, given
                to touch users who never see that cursor effect. */}
            {[
              "-left-2 -top-2 border-l border-t",
              "-right-2 -top-2 border-r border-t",
              "-bottom-2 -left-2 border-b border-l",
              "-bottom-2 -right-2 border-b border-r",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute h-2 w-2 border-accent transition-[transform,opacity] duration-300 ${pos} ${
                  menuOpen ? "opacity-100" : "scale-50 opacity-0"
                }`}
              />
            ))}
            <span
              className={`h-px w-6 bg-cream transition-transform duration-200 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-cream transition-transform duration-200 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </motion.button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ clipPath: reducedMotion ? OPEN_CLIP : CLOSED_CLIP, opacity: reducedMotion ? 0 : 1 }}
            animate={{ clipPath: OPEN_CLIP, opacity: 1 }}
            exit={{ clipPath: reducedMotion ? OPEN_CLIP : CLOSED_CLIP, opacity: reducedMotion ? 0 : 1 }}
            transition={
              reducedMotion
                ? { duration: 0.2, ease: "linear" }
                : { duration: 0.65, ease: easing }
            }
            className="fixed inset-x-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-sand"
          >
            {/* Corner frame, revealed as the clip-path opens over it — same
                motif as PlaceholderArt's photo frame and the cursor's hover
                brackets, tying the menu into the rest of the site's system. */}
            {[
              "left-4 top-4 border-l border-t",
              "right-4 top-4 border-r border-t",
              "bottom-4 left-4 border-b border-l",
              "bottom-4 right-4 border-b border-r",
            ].map((pos) => (
              <motion.span
                key={pos}
                aria-hidden="true"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.4, ease: easing }}
                className={`pointer-events-none absolute h-6 w-6 border-cream/25 ${pos}`}
              />
            ))}

            <div className="bg-grain relative flex min-h-full flex-col px-6 pb-10 pt-10 sm:px-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.1, ease: easing }}
                className="flex items-center gap-4"
              >
                <span className="font-display text-sm text-accent-soft">Menu</span>
                <span className="h-px flex-1 bg-cream/15" />
              </motion.div>

              <nav className="mt-6 flex flex-col">
                {menuLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: reducedMotion ? 0 : 0.2 + index * 0.06,
                        ease: easing,
                      }}
                      className="border-b border-cream/10"
                    >
                      <Link href={link.href} className="group relative flex items-baseline gap-4 py-4">
                        <span className="font-display text-xs text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-3xl transition-colors duration-200 sm:text-4xl ${
                            isActive ? "text-accent-soft" : "text-cream group-hover:text-accent-soft"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-px left-0 h-px bg-accent transition-all duration-300 ease-out ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.55, ease: easing }}
                className="font-display mt-auto pt-10 text-xs text-cream/35"
              >
                {site.tagline}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
