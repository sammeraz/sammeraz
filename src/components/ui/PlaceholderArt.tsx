type Variant = "hero" | "card" | "panel";

interface PlaceholderArtProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

/**
 * Stand-in for real photography. Leans on gradient "lighting" (a soft
 * diagonal glare + dark vignette, the way a studio car photo is lit) plus
 * grain, rather than flat abstract shapes, so it reads closer to a moody
 * photo than to generated graphic art. Real photos can drop in later
 * without any layout changes.
 */
export function PlaceholderArt({ variant = "card", label, className = "" }: PlaceholderArtProps) {
  const showFrame = variant !== "hero";

  return (
    <div
      className={`bg-grain relative h-full w-full overflow-hidden bg-gradient-to-br from-ink-soft via-ink to-black ${className}`}
    >
      {/* Diagonal glare, the way light catches a body panel in a studio shot */}
      <div className="absolute -inset-y-1/4 -left-1/3 w-2/3 rotate-12 bg-gradient-to-r from-transparent via-cream/[0.06] to-transparent" />

      {/* Dark vignette to pull focus inward like a lens falloff */}
      <div className="absolute inset-0 bg-radial-vignette" />

      {variant === "hero" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
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
