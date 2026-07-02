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
// DEMO DATA — temporary, so the quick-view/sold-ribbon/incoming-teaser
// treatments are visible and clickable on the live preview before any real
// vehicles are posted. Remove this block (back to an empty array) once real
// inventory is ready, or ask Claude to swap it out.
export const inventory: Vehicle[] = [
  {
    slug: "demo-1999-nissan-skyline-gtr",
    make: "Nissan",
    model: "Skyline GT-R",
    year: 1999,
    trim: "V-Spec (BNR34)",
    price: 124500,
    status: "available",
    mileage: 42000,
    highlights: ["Demo Listing", "Auction grade 4.5", "One owner"],
    specs: {
      chassisCode: "BNR34",
      engine: "RB26DETT 2.6L Twin-Turbo I6",
      drivetrain: "AWD (ATTESA E-TS)",
      transmission: "6-Speed Manual",
      exteriorColor: "Bayside Blue",
      auctionGrade: "4.5",
    },
  },
  {
    slug: "demo-1998-toyota-chaser",
    make: "Toyota",
    model: "Chaser",
    year: 1998,
    trim: "Tourer V (JZX100)",
    price: 45000,
    status: "sold",
    mileage: 88000,
    highlights: ["Demo Listing"],
    specs: {
      chassisCode: "JZX100",
      engine: "1JZ-GTE 2.5L Twin-Turbo I6",
      drivetrain: "RWD",
      transmission: "5-Speed Manual",
      exteriorColor: "Black Mica",
      auctionGrade: "4",
    },
  },
  {
    slug: "demo-1995-honda-nsx",
    make: "Honda",
    model: "NSX",
    year: 1995,
    status: "incoming",
    price: 89000,
    specs: {
      chassisCode: "NA1",
      engine: "C30A 3.0L V6 VTEC",
      drivetrain: "RWD",
      transmission: "5-Speed Manual",
      exteriorColor: "Formula Red",
      auctionGrade: "4.5",
    },
  },
];
