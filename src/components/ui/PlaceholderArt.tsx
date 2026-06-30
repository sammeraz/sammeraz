type Variant = "hero" | "card" | "panel";

interface PlaceholderArtProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

/**
 * Stand-in for real photography. Renders an intentional, branded "image slot"
 * (gradient + horizon motif + grain) rather than a broken image or stock photo,
 * so real photos can be dropped in later without any layout changes.
 */
export function PlaceholderArt({ variant = "card", label, className = "" }: PlaceholderArtProps) {
  const showFrame = variant !== "hero";

  return (
    <div
      className={`bg-grain relative h-full w-full overflow-hidden bg-gradient-to-br from-ink via-ink-soft to-ink ${className}`}
    >
      {/* Warm glow, subtle nod to a low sun */}
      <div className="absolute -bottom-1/4 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      {/* Horizon + sun line-art motif */}
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full text-cream/[0.16]"
        aria-hidden="true"
      >
        <circle cx="200" cy="150" r="52" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="1" />
      </svg>

      {variant === "hero" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
      ) : null}

      {showFrame ? (
        <>
          <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-cream/25" />
          <span className="absolute right-3 top-3 h-5 w-5 border-r border-t border-cream/25" />
          <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-cream/25" />
          <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-cream/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/45">
              {label ?? "Photo coming soon"}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
