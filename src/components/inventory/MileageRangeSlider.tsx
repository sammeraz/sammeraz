interface MileageRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

// Both inputs stack on the same track. Each input's own body/track is made
// invisible and non-interactive (pointer-events-none) — only its thumb
// pseudo-element re-enables pointer-events, so a click anywhere on the rail
// falls through to whichever thumb is on top instead of always grabbing
// the last input in the DOM.
const thumbClass =
  "absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent " +
  "pointer-events-none " +
  "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent " +
  "[&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-cream [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.35)] " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-cream [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.35)]";

/** Drag-between-two-numbers mileage filter, replacing the old preset pill
 * buttons. Two native range inputs overlaid on one visual track — keyboard
 * and touch dragging come for free this way, which a from-scratch custom
 * drag implementation would have to rebuild by hand. */
export function MileageRangeSlider({ min, max, step, value, onChange }: MileageRangeSliderProps) {
  const [low, high] = value;
  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;
  // Whichever handle is more likely to be approached from "outside" (i.e.
  // sitting past the midpoint) gets top priority so it never gets stuck
  // underneath the other when they're close together.
  const lowOnTop = low > min + (max - min) / 2;

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between text-xs tabular-nums text-ink/60">
        <span>{low.toLocaleString()} km</span>
        <span>{high >= max ? `${max.toLocaleString()}+ km` : `${high.toLocaleString()} km`}</span>
      </div>
      <div className="relative mt-3 h-4">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-ink/15" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-accent"
          style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(event) => onChange([Math.min(Number(event.target.value), high - step), high])}
          aria-label="Minimum mileage in kilometers"
          className={thumbClass}
          style={{ zIndex: lowOnTop ? 3 : 2 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(event) => onChange([low, Math.max(Number(event.target.value), low + step)])}
          aria-label="Maximum mileage in kilometers"
          className={thumbClass}
          style={{ zIndex: lowOnTop ? 2 : 3 }}
        />
      </div>
    </div>
  );
}
