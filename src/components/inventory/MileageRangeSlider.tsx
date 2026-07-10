import { useState } from "react";
import { kmToMiles, milesToKm } from "@/lib/format";

interface MileageRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  /** Track/thumbs and the min/max/step bounds stay in km always — only the
   * two number labels (and what a typed value is interpreted as) convert,
   * so switching units never moves the handles. */
  unit?: "km" | "mi";
}

function kmToDisplay(km: number, unit: "km" | "mi") {
  return unit === "mi" ? kmToMiles(km) : km;
}

function displayToKm(displayValue: number, unit: "km" | "mi") {
  return unit === "mi" ? milesToKm(displayValue) : Math.round(displayValue);
}

/** Editable number field for one end of the range — sits right where the
 * plain text label used to, so dragging and typing both work on the same
 * value. Shows the live km/mi-converted number; while focused it drops the
 * "+"/comma formatting so the raw digits are easy to overtype. */
function BoundInput({
  km,
  unit,
  showPlus,
  onCommit,
  ariaLabel,
}: {
  km: number;
  unit: "km" | "mi";
  showPlus: boolean;
  onCommit: (displayValue: number) => void;
  ariaLabel: string;
}) {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(() => String(kmToDisplay(km, unit)));
  // Tracks the (km, unit) pair `text` was last synced from, so a drag or
  // unit-toggle change updates the field but active typing is never
  // clobbered by a re-render — React's documented alternative to a
  // setState-in-effect for "adjust state when a prop changes".
  const [syncedKm, setSyncedKm] = useState(km);
  const [syncedUnit, setSyncedUnit] = useState(unit);

  if (!focused && (km !== syncedKm || unit !== syncedUnit)) {
    setSyncedKm(km);
    setSyncedUnit(unit);
    setText(String(kmToDisplay(km, unit)));
  }

  function commit() {
    setFocused(false);
    const parsed = Number(text.replace(/[^0-9]/g, ""));
    if (text.trim() !== "" && Number.isFinite(parsed)) {
      onCommit(parsed);
    } else {
      setText(String(kmToDisplay(km, unit)));
    }
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      value={focused ? text : `${Number(text).toLocaleString()}${showPlus ? "+" : ""}`}
      onFocus={(event) => {
        setFocused(true);
        setText(String(kmToDisplay(km, unit)));
        event.target.select();
      }}
      onChange={(event) => setText(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
      }}
      aria-label={ariaLabel}
      className="w-16 border-b border-transparent bg-transparent tabular-nums text-ink/60 outline-none transition-colors focus:border-accent focus:text-ink dark:text-cream/60 dark:focus:text-cream"
    />
  );
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
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-cream [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.35)] dark:[&::-webkit-slider-thumb]:border-cream dark:[&::-webkit-slider-thumb]:bg-ink " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-cream [&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.35)] dark:[&::-moz-range-thumb]:border-cream dark:[&::-moz-range-thumb]:bg-ink";

/** Drag-between-two-numbers mileage filter, replacing the old preset pill
 * buttons. Two native range inputs overlaid on one visual track — keyboard
 * and touch dragging come for free this way, which a from-scratch custom
 * drag implementation would have to rebuild by hand. */
export function MileageRangeSlider({ min, max, step, value, onChange, unit = "km" }: MileageRangeSliderProps) {
  const [low, high] = value;
  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;
  // Whichever handle is more likely to be approached from "outside" (i.e.
  // sitting past the midpoint) gets top priority so it never gets stuck
  // underneath the other when they're close together.
  const lowOnTop = low > min + (max - min) / 2;

  function commitLow(displayValue: number) {
    const km = Math.min(Math.max(displayToKm(displayValue, unit), min), max);
    onChange([Math.max(Math.min(km, high - step), min), high]);
  }

  function commitHigh(displayValue: number) {
    const km = Math.min(Math.max(displayToKm(displayValue, unit), min), max);
    onChange([low, Math.min(Math.max(km, low + step), max)]);
  }

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-baseline gap-1">
          <BoundInput
            km={low}
            unit={unit}
            showPlus={false}
            onCommit={commitLow}
            ariaLabel={`Minimum mileage in ${unit === "mi" ? "miles" : "kilometers"}`}
          />
          <span className="text-ink/40 dark:text-cream/40">{unit}</span>
        </span>
        <span className="inline-flex items-baseline gap-1">
          <BoundInput
            km={high}
            unit={unit}
            showPlus={high >= max}
            onCommit={commitHigh}
            ariaLabel={`Maximum mileage in ${unit === "mi" ? "miles" : "kilometers"}`}
          />
          <span className="text-ink/40 dark:text-cream/40">{unit}</span>
        </span>
      </div>
      <div className="relative mt-3 h-4">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-ink/15 dark:bg-cream/15" />
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
