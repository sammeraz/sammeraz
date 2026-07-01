export type VehicleStatus = "available" | "incoming" | "sold";

export interface Vehicle {
  /** Stable identifier, also used as the URL slug for a future detail page. */
  slug: string;
  make: string;
  model: string;
  /** Japanese model year may differ from chassis year; keep as a display string. */
  year: number;
  /** Trim or chassis code, e.g. "GT-R V-Spec (BNR34)". Optional flourish line under the title. */
  trim?: string;
  price: number;
  status: VehicleStatus;
  mileage?: number;
  /** Short auction-style highlights, shown as a few tags on the card. */
  highlights?: string[];
  /** Left empty until real photography exists — UI falls back to placeholder art. */
  images?: string[];
}

export type MagazineCondition = "new" | "like-new" | "good" | "fair";

export interface Magazine {
  /** Stable identifier, also used as the URL slug for a future detail page. */
  slug: string;
  title: string;
  /** Issue line, e.g. "Option2 — March 1998" or "Best Motoring, Vol. 112". */
  issue: string;
  price: number;
  condition: MagazineCondition;
  description?: string;
  /** Left empty until real photography exists — UI falls back to placeholder art. */
  images?: string[];
}
