"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CartButton } from "@/components/store/CartButton";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { useHeroFocus } from "@/lib/hero-focus-context";
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
  const { focused } = useHeroFocus();
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Layout effect, not a plain one: a regular effect runs after the browser
  // has already painted, so the solid default above is visible for at least
  // one real frame even when we're actually at the top of the page — its
  // bottom shadow line sitting flush against the Hero badge below reads as
  // the header overlapping it. Correcting the state before paint (which is
  // what a layout effect buys here) means that frame is never shown at all;
  // the "start solid, correct once we know better" logic is unchanged.
  useIsomorphicLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when navigation occurs, without an effect. This
  // used to also force the header solid for a moment to cover the entering
  // page's fade-in (see PageTransition.tsx), back when a transparent header
  // briefly sat over a plain white <body> during that window — body's
  // background is dark now (see globals.css), specifically so fading content
  // never uncovers a light gap, which made that forced-solid window
  // redundant: it only added a second, disconnected-looking fade of its own
  // once the timer ran out, on top of a page transition that had already
  // finished settling.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const solid = scrolled || menuOpen;

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
      inert={focused}
      // Plain bg-ink, not the translucent/blurred fill this used to have:
      // that read as a visibly distinct panel (rather than blending into
      // whatever's behind it) any time it sat over another already-dark
      // surface at less than full opacity — most noticeably the mobile
      // menu's own solid bg-ink dropdown, where the mismatch showed up as a
      // clearly separate lighter band across the header's own height. Flat,
      // fully opaque ink matches that dropdown (and every other dark
      // surface on the site) exactly, so there's no tone left to clash.
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,opacity] duration-500 ${
        solid ? "bg-ink" : "bg-transparent"
      } ${focused ? "pointer-events-none opacity-0" : "opacity-100"}`}
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
          <ThemeToggle />
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
