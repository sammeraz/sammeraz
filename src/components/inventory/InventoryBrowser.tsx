"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import { RevealOnLoad } from "@/components/motion/Reveal";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import type { Vehicle, VehicleStatus } from "@/lib/types";

interface InventoryBrowserProps {
  vehicles: Vehicle[];
  placeholderCount?: number;
}

type StatusFilter = "all" | VehicleStatus;

const tabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "incoming", label: "Incoming" },
  { value: "sold", label: "Sold" },
];

function matchesQuery(vehicle: Vehicle, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim ?? ""}`.toLowerCase();
  return haystack.includes(q);
}

/** Search + status tabs live in their own component (rather than inline on
 * the page) so the filtering state doesn't force the whole page client-side
 * — just this bar and the grid beneath it. Mirrors the header's nav-link
 * underline motif for the tabs and the contact form's underline input style,
 * so it reads as the same site rather than a bolted-on widget. */
export function InventoryBrowser({ vehicles, placeholderCount = 3 }: InventoryBrowserProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const searchMatches = useMemo(
    () => vehicles.filter((vehicle) => matchesQuery(vehicle, query)),
    [vehicles, query],
  );

  const counts = useMemo(() => {
    const result: Record<StatusFilter, number> = { all: 0, available: 0, incoming: 0, sold: 0 };
    for (const vehicle of searchMatches) {
      result.all += 1;
      result[vehicle.status] += 1;
    }
    return result;
  }, [searchMatches]);

  const filtered =
    statusFilter === "all" ? searchMatches : searchMatches.filter((vehicle) => vehicle.status === statusFilter);

  // Nothing posted yet at all — skip the search/filter chrome entirely and
  // fall straight through to InventoryGrid's own honest "coming soon" state,
  // rather than offering controls for a catalog that doesn't exist.
  if (vehicles.length === 0) {
    return <InventoryGrid vehicles={[]} placeholderCount={placeholderCount} />;
  }

  const hasNoMatches = filtered.length === 0;

  return (
    <div>
      <RevealOnLoad>
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search inventory"
              placeholder="Search make, model, year…"
              className="w-full border-b border-ink/20 bg-transparent py-3 pl-6 pr-6 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-accent"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/40 transition-colors hover:text-accent"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {tabs.map((tab) => {
              const isActive = statusFilter === tab.value;
              return (
                <motion.button
                  key={tab.value}
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setStatusFilter(tab.value)}
                  aria-pressed={isActive}
                  className={`group relative font-display text-xs uppercase tracking-[0.08em] transition-opacity hover:opacity-100 ${
                    isActive ? "text-ink opacity-100" : "text-ink opacity-55"
                  }`}
                >
                  {tab.label} <span className="text-ink/40">({counts[tab.value]})</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </RevealOnLoad>

      {hasNoMatches ? (
        <div className="py-16 text-center">
          <p className="font-display text-xl text-ink/70">No vehicles match your search</p>
          <p className="mt-2 text-sm text-ink/50">Try a different term, or clear the filters below.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
            }}
            className="font-display mt-6 text-xs uppercase tracking-[0.1em] text-accent underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <InventoryGrid vehicles={filtered} placeholderCount={placeholderCount} />
        </div>
      )}
    </div>
  );
}
