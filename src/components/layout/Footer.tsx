import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-cream/65">{site.description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/45">
            Navigate
          </span>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-cream/75 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/45">
            Contact
          </span>
          <div className="flex flex-col gap-3 text-sm text-cream/75">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
              {site.email}
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-cream/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-cream/45 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center md:justify-start">
            <span>&copy; {year} AIM Imports. All rights reserved.</span>
            <span aria-hidden="true">&middot;</span>
            <Link href="/privacy" className="transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms" className="transition-colors hover:text-cream">
              Terms of Service
            </Link>
          </div>
          <span>JDM import specialists &middot; Leander, Texas</span>
        </Container>
      </div>
    </footer>
  );
}
