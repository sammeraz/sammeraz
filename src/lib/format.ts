const MILES_TO_KM = 1.609344;

/** JDM odometers read in km — stored `mileage` is miles only because that's
 * the unit the rest of the app was first built around; km is derived here
 * rather than duplicated on the data model. */
export function milesToKm(miles: number) {
  return Math.round(miles * MILES_TO_KM);
}

export function kmToMiles(km: number) {
  return Math.round(km / MILES_TO_KM);
}

export function formatKm(miles: number) {
  return `${milesToKm(miles).toLocaleString()} km`;
}

export function formatMiles(miles: number) {
  return `${miles.toLocaleString()} mi`;
}

/** Derives the common listing shorthand from a free-text transmission spec
 * (e.g. "6-Speed Manual" -> "MT") — cards show just the abbreviation next
 * to the trim; the full spec text stays on the detail page's spec table. */
export function transmissionAbbreviation(transmission?: string): "MT" | "AT" | null {
  if (!transmission) return null;
  const lower = transmission.toLowerCase();
  if (lower.includes("manual")) return "MT";
  if (lower.includes("automatic")) return "AT";
  return null;
}
