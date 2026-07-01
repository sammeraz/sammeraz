"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { CartButton } from "@/components/store/CartButton";
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
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when navigation occurs, without an effect.
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
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easing }}
            className="fixed inset-x-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-sand"
          >
            <nav className="flex flex-col">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: easing }}
                  className="border-b border-cream/10"
                >
                  <Link
                    href={link.href}
                    className="font-display block px-6 py-6 text-center text-2xl text-cream transition-colors hover:text-accent-soft sm:text-3xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
