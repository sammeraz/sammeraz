import { type ReactNode } from "react";

interface DiagonalEdgeProps {
  children: ReactNode;
  className?: string;
  /** Height of the diagonal cut, in px. */
  size?: number;
  /** "rising" = cut climbs left-to-right; "falling" = cut drops left-to-right. */
  direction?: "rising" | "falling";
}

/**
 * Wraps a section and gives its TOP edge a diagonal cut, revealing whatever
 * sits immediately above it (that element must be a plain, uncut rectangle
 * for this to read correctly — clip-path removes pixels rather than
 * painting over them, and DOM order means this element already paints on
 * top of its predecessor, so only the later element needs clipping).
 *
 * Pulls itself up by `size` via negative margin to close the gap, then adds
 * that same amount back as inner padding so content never sits near the cut.
 */
export function DiagonalEdge({
  children,
  className = "",
  size = 48,
  direction = "rising",
}: DiagonalEdgeProps) {
  const clipPath =
    direction === "rising"
      ? `polygon(0 ${size}px, 100% 0, 100% 100%, 0 100%)`
      : `polygon(0 0, 100% ${size}px, 100% 100%, 0 100%)`;

  return (
    <div style={{ marginTop: `-${size}px`, clipPath }}>
      <div className={className} style={{ paddingTop: size }}>
        {children}
      </div>
    </div>
  );
}
