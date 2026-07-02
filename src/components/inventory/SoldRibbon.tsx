/**
 * Diagonal corner banner for sold vehicles — deliberately louder than the
 * flat status badge used elsewhere (available/incoming), since "sold" is
 * meant to read at a glance even in a grid of thumbnails, the way a real
 * dealer photo gets stamped.
 */
export function SoldRibbon() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-11 top-5 w-40 -rotate-45 bg-accent py-1 text-center shadow-md">
        <span className="font-display text-xs font-bold tracking-[0.2em] text-cream">SOLD</span>
      </div>
    </div>
  );
}
