import type { Vehicle } from "@/lib/types";

/**
 * Public inventory feed.
 *
 * Empty until real vehicles are ready to list — the inventory grid renders
 * an honest "coming soon" state when this array is empty, instead of
 * placeholder cars. Add real entries here once details are confirmed:
 *
 * {
 *   slug: "1999-nissan-skyline-gtr-v-spec",
 *   make: "Nissan",
 *   model: "Skyline GT-R",
 *   year: 1999,
 *   trim: "V-Spec (BNR34)",
 *   price: 124500,
 *   status: "available",
 *   mileage: 42000,
 *   highlights: ["Auction grade 4.5", "One owner", "Unmodified"],
 *   images: ["/inventory/bnr34-v-spec-1.jpg"],
 *   specs: {
 *     chassisCode: "BNR34",
 *     engine: "RB26DETT 2.6L Twin-Turbo I6",
 *     drivetrain: "AWD (ATTESA E-TS)",
 *     transmission: "6-Speed Manual",
 *     exteriorColor: "Bayside Blue",
 *     auctionGrade: "4.5",
 *   },
 * }
 */
export const inventory: Vehicle[] = [];
