import Image from "next/image";
import Link from "next/link";

/**
 * Mark is pre-processed to drop its black backing (see public/brand), so it
 * only reads cleanly over dark surfaces — which is every surface this sits
 * on today (Header and Footer are both on ink). If a section ever needs the
 * logo on a light background, a separate light-safe export will be needed;
 * this file should not be reused there as-is.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/aim-imports-mark.png"
        alt="AIM Imports"
        width={96}
        height={96}
        priority
        className="h-10 w-10 object-contain md:h-11 md:w-11"
      />
      <span className="hidden text-[10px] font-medium uppercase tracking-[0.32em] opacity-60 sm:inline">
        Japan &middot; USA
      </span>
    </Link>
  );
}
