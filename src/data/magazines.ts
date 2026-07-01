import type { Magazine } from "@/lib/types";

/**
 * Store catalog of resold JDM magazine back-issues.
 *
 * Empty until real stock is ready to list — the store grid renders an honest
 * "coming soon" state when this array is empty, instead of placeholder
 * listings. Add real entries here once details are confirmed:
 *
 * {
 *   slug: "option2-1998-03",
 *   title: "Option2",
 *   issue: "March 1998",
 *   price: 28,
 *   condition: "good",
 *   description: "Drift-focused issue, JZX90 feature spread intact.",
 *   images: ["/store/option2-1998-03-1.jpg"],
 * }
 */
export const magazines: Magazine[] = [];
