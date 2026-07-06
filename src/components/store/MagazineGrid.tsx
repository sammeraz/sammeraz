import Link from "next/link";
import type { Magazine } from "@/lib/types";
import { MagazineCard } from "@/components/store/MagazineCard";
import { ComingSoonMagazineCard } from "@/components/store/ComingSoonMagazineCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface MagazineGridProps {
  magazines: Magazine[];
  placeholderCount?: number;
}

export function MagazineGrid({ magazines, placeholderCount = 3 }: MagazineGridProps) {
  if (magazines.length === 0) {
    return (
      <div>
        <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <RevealItem key={index}>
              <ComingSoonMagazineCard />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-sm text-ink/55 dark:text-cream/55">
            Looking for a specific issue?{" "}
            <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-accent dark:text-cream">
              Start an inquiry
            </Link>{" "}
            and we&apos;ll let you know what we can track down.
          </p>
        </Reveal>
      </div>
    );
  }

  return (
    <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {magazines.map((magazine) => (
        <RevealItem key={magazine.slug}>
          <MagazineCard magazine={magazine} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
