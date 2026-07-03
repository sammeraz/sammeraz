import { formatKm, formatMiles } from "@/lib/format";

interface MileageProps {
  miles: number;
  className?: string;
  /** Detail page has room (and touch visitors need it too), so the mile
   * equivalent stays inline instead of hidden behind a hover popup. */
  showParenthetical?: boolean;
}

/** Km is the primary figure everywhere (JDM odometers read in km). Card and
 * list rows are tight on space, so the mile equivalent for US buyers surfaces
 * as a small hover popup instead — gated to real :hover devices so it can't
 * get stuck open on touch. */
export function Mileage({ miles, className = "", showParenthetical = false }: MileageProps) {
  if (showParenthetical) {
    return (
      <span className={className}>
        {formatKm(miles)} <span className="text-ink/40">({formatMiles(miles)})</span>
      </span>
    );
  }

  return (
    <span
      className={`group/mileage relative inline-block cursor-help underline decoration-dotted decoration-1 underline-offset-2 decoration-ink/25 ${className}`}
    >
      {formatKm(miles)}
      <span className="pointer-events-none absolute -top-1.5 right-0 -translate-y-full whitespace-nowrap rounded-sm bg-ink px-2 py-1 text-[10px] leading-none text-cream opacity-0 shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-opacity duration-150 [@media(hover:hover)]:group-hover/mileage:opacity-100">
        {formatMiles(miles)}
      </span>
    </span>
  );
}
