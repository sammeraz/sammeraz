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
          className={`absolute -bottom-1 left-0 h-px bg-current transition-[width] duration-300 ease-out ${
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
          <>
            {/* Tap anywhere outside the panel to dismiss — a compact dropdown
                shouldn't require hunting for the close button. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-x-0 bottom-0 top-20 z-40 bg-ink/50 lg:hidden"
            />

            {/* Sized to its content, not the full viewport — a quick dropdown
                to glance at and dismiss, not a takeover you have to escape. */}
            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.25, ease: easing }}
              className="fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b-2 border-accent bg-ink lg:hidden"
            >
              <nav className="flex flex-col px-6 sm:px-10">
                {menuLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-4 border-b border-cream/10 py-4 first:pt-6 last:border-b-0 last:pb-6"
                    >
                      <span className="font-display text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-xl transition-colors duration-200 ${
                          isActive ? "text-accent-soft" : "text-cream group-hover:text-accent-soft"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
