import type { Magazine } from "@/lib/types";

/**
 * Store catalog of resold JDM magazine back-issues.
 *
 * Real entries look like this once details are confirmed:
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
// DEMO DATA — temporary, so the store grid and multi-photo gallery page are
// visible and clickable on the live preview before any real magazines are
// listed. Remove this block (back to an empty array) once real stock is
// ready, or ask Claude to swap it out.
export const magazines: Magazine[] = [
  {
    slug: "demo-option2-1998-03",
    title: "Option2",
    issue: "March 1998",
    price: 28,
    condition: "good",
    description: "Drift-focused issue, JZX90 feature spread intact.",
  },
  {
    slug: "demo-best-motoring-112",
    title: "Best Motoring",
    issue: "Vol. 112",
    price: 35,
    condition: "like-new",
    description: "Tsukuba battle royale issue, fold-out poster still attached.",
  },
  {
    slug: "demo-hyper-rev-r34",
    title: "Hyper Rev",
    issue: "Skyline GT-R R34 No. 32",
    price: 45,
    condition: "new",
    description: "Full technical teardown of the RB26DETT and ATTESA E-TS drivetrain.",
  },
  {
    slug: "demo-young-version-8",
    title: "Young Version",
    issue: "Vol. 8",
    price: 18,
    condition: "fair",
    description: "Early EK9 and AE86 street culture issue, some cover wear.",
  },
  {
    slug: "demo-drift-tengoku-45",
    title: "Drift Tengoku",
    issue: "Issue 45",
    price: 22,
    condition: "good",
    description: "Touge and drift-park coverage from the peak drift boom era.",
  },
];
