"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/95 backdrop-blur-sm shadow-[0_1px_0_0] shadow-cream/10" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between text-cream">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[13px] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-100 ${
                  isActive ? "opacity-100" : "opacity-75"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-current transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="light">
            {site.inquiryCta}
          </Button>
        </div>

        <button
          type="button"
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
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-cream/10 bg-ink px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium uppercase tracking-[0.08em] text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="light" className="mt-2 w-full">
              {site.inquiryCta}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
