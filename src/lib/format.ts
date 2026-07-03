const MILES_TO_KM = 1.609344;

/** JDM odometers read in km — stored `mileage` is miles only because that's
 * the unit the rest of the app was first built around; km is derived here
 * rather than duplicated on the data model. */
export function milesToKm(miles: number) {
  return Math.round(miles * MILES_TO_KM);
}

export function formatKm(miles: number) {
  return `${milesToKm(miles).toLocaleString()} km`;
}

export function formatMiles(miles: number) {
  return `${miles.toLocaleString()} mi`;
}
