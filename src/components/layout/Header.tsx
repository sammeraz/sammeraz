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
  const [leftLinks, rightLinks] = [navLinks.slice(0, 2), navLinks.slice(2)];

  function NavLink({ href, label }: { href: string; label: string }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`group relative font-display text-base transition-opacity hover:opacity-100 ${
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
      <div className="hidden border-b border-cream/10 md:block">
        <Container className="flex h-9 items-center justify-between text-[11px] uppercase tracking-[0.14em] text-cream/45">
          <span>{site.location} &mdash; Nationwide Delivery</span>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream/80">
            {site.email}
          </a>
        </Container>
      </div>

      <Container className="grid h-20 grid-cols-[1fr_auto_1fr] items-center text-cream md:h-24">
        <nav className="hidden items-center gap-8 md:flex">
          {leftLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <Logo className="md:justify-self-center" />

        <div className="flex items-center justify-end gap-7">
          <nav className="hidden items-center gap-8 md:flex">
            {rightLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
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
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easing }}
            className="overflow-hidden border-t border-cream/10 bg-ink md:hidden"
          >
            <nav className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: easing }}
                >
                  <Link href={link.href} className="font-display text-2xl text-cream">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/contact" variant="light" className="mt-2 w-full">
                {site.inquiryCta}
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
