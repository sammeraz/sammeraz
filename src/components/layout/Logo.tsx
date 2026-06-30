import Link from "next/link";

/**
 * Text wordmark used until a real logo file is supplied. Swap the markup
 * below for an <Image src="/logo.svg" .../> when artwork is ready — the
 * surrounding header/footer layout will not need to change.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-xl tracking-[0.02em]">AIM Imports</span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.32em] opacity-60">
        Japan &middot; USA
      </span>
    </Link>
  );
}
