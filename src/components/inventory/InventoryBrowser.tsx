"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import { InventoryList } from "@/components/inventory/InventoryList";
import { MileageRangeSlider } from "@/components/inventory/MileageRangeSlider";
import { RevealOnLoad, revealEase } from "@/components/motion/Reveal";
import { ChevronDownIcon, CloseIcon, GridIcon, ListIcon, SearchIcon, SlidersIcon } from "@/components/ui/icons";
import { milesToKm } from "@/lib/format";
import type { Vehicle, VehicleStatus } from "@/lib/types";

interface InventoryBrowserProps {
  vehicles: Vehicle[];
  placeholderCount?: number;
}

type StatusFilter = "all" | VehicleStatus;
type ViewMode = "grid" | "list";
type SortOption = "default" | "price-asc" | "price-desc" | "mileage-asc" | "mileage-desc" | "year-desc" | "year-asc";

const tabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "incoming", label: "Incoming" },
  { value: "sold", label: "Sold" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "mileage-desc", label: "Mileage: High to Low" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "year-asc", label: "Year: Oldest First" },
];

/** Vehicles missing the sorted-on field (an incoming car with no price yet,
 * a sold car with mileage hidden) always sink to the end of their group
 * rather than being placed arbitrarily by a NaN comparison. */
function compareOptional(getValue: (vehicle: Vehicle) => number | undefined, direction: "asc" | "desc") {
  return (a: Vehicle, b: Vehicle) => {
    const aValue = getValue(a);
    const bValue = getValue(b);
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    return direction === "asc" ? aValue - bValue : bValue - aValue;
  };
}

function secondaryComparator(sortBy: SortOption): (a: Vehicle, b: Vehicle) => number {
  switch (sortBy) {
    case "price-asc":
      return compareOptional((v) => v.price, "asc");
    case "price-desc":
      return compareOptional((v) => v.price, "desc");
    case "mileage-asc":
      return compareOptional((v) => v.mileage, "asc");
    case "mileage-desc":
      return compareOptional((v) => v.mileage, "desc");
    case "year-asc":
      return compareOptional((v) => v.year, "asc");
    case "year-desc":
      return compareOptional((v) => v.year, "desc");
    default:
      return () => 0;
  }
}

const MILEAGE_MIN = 0;
const MILEAGE_MAX = 200000;
const MILEAGE_STEP = 5000;

// On the "All" tab, group by status instead of leaving vehicles in whatever
// order they were added to the data file — for-sale cars are what buyers
// come to see, so they lead, then incoming, then sold.
const statusOrder: Record<VehicleStatus, number> = { available: 0, incoming: 1, sold: 2 };

function matchesQuery(vehicle: Vehicle, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim ?? ""}`.toLowerCase();
  return haystack.includes(q);
}

/** Specs store free-text like "6-Speed Manual" or "5-Speed Auto" — buyers
 * only care about the two broad categories, so collapse to that instead of
 * listing every raw spec string as its own filter pill. */
function transmissionType(transmission: string): "Manual" | "Automatic" | null {
  const t = transmission.toLowerCase();
  if (t.includes("manual")) return "Manual";
  if (t.includes("auto")) return "Automatic";
  return null;
}

/** Search + status tabs + the more detailed make/transmission/mileage panel
 * all live in their own component (rather than inline on the page) so the
 * filtering state doesn't force the whole page client-side — just this bar
 * and the grid beneath it. Styled to match the existing system throughout:
 * the search input reuses the contact form's underline-input treatment, the
 * status tabs reuse the header nav-link's animated underline, and the panel
 * fades/slides in via RevealOnLoad (mount-triggered, not scroll — consistent
 * with the no-invisible-above-the-fold rule already applied to this page). */
export function InventoryBrowser({ vehicles, placeholderCount = 3 }: InventoryBrowserProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [mileageRange, setMileageRange] = useState<[number, number]>([MILEAGE_MIN, MILEAGE_MAX]);
  const [mileageUnit, setMileageUnit] = useState<"km" | "mi">("km");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const allMakes = useMemo(() => [...new Set(vehicles.map((v) => v.make))].sort(), [vehicles]);
  const allTransmissions = useMemo(() => {
    const types = vehicles
      .map((v) => (v.specs?.transmission ? transmissionType(v.specs.transmission) : null))
      .filter((t): t is "Manual" | "Automatic" => t !== null);
    return [...new Set(types)].sort();
  }, [vehicles]);

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

  const filtered = useMemo(
    () =>
      searchMatches
        .filter((vehicle) => statusFilter === "all" || vehicle.status === statusFilter)
        .filter((vehicle) => selectedMake === "" || vehicle.make === selectedMake)
        .filter((vehicle) => {
          if (selectedTransmission === "") return true;
          const type = vehicle.specs?.transmission ? transmissionType(vehicle.specs.transmission) : null;
          return type === selectedTransmission;
        })
        .filter((vehicle) => {
          if (mileageRange[0] === MILEAGE_MIN && mileageRange[1] === MILEAGE_MAX) return true;
          if (vehicle.mileage === undefined) return false;
          const km = milesToKm(vehicle.mileage);
          return km >= mileageRange[0] && km <= mileageRange[1];
        })
        .sort((a, b) => {
          const statusDiff = statusOrder[a.status] - statusOrder[b.status];
          return statusDiff !== 0 ? statusDiff : secondaryComparator(sortBy)(a, b);
        }),
    [searchMatches, statusFilter, selectedMake, selectedTransmission, mileageRange, sortBy],
  );

  const mileageFilterActive = mileageRange[0] !== MILEAGE_MIN || mileageRange[1] !== MILEAGE_MAX;
  const activeFilterCount =
    (selectedMake ? 1 : 0) + (selectedTransmission ? 1 : 0) + (mileageFilterActive ? 1 : 0);

  function clearAllFilters() {
    setQuery("");
    setStatusFilter("all");
    setSelectedMake("");
    setSelectedTransmission("");
    setMileageRange([MILEAGE_MIN, MILEAGE_MAX]);
    setSortBy("default");
  }

  // Scoped to just the Make/Transmission/Mileage panel — leaves the search
  // query and status tab alone, since those live outside the panel and
  // resetting them here would be surprising.
  function resetAdvancedFilters() {
    setSelectedMake("");
    setSelectedTransmission("");
    setMileageRange([MILEAGE_MIN, MILEAGE_MAX]);
  }

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
          <div className="flex items-center gap-3 sm:max-w-md sm:flex-1">
            <div className="relative min-w-0 flex-1">
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

            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              className={`flex shrink-0 items-center gap-1.5 border px-3 py-2.5 text-xs uppercase tracking-[0.08em] transition-colors ${
                filtersOpen || activeFilterCount > 0
                  ? "border-ink text-ink"
                  : "border-ink/20 text-ink/65 hover:border-ink/40"
              }`}
            >
              <SlidersIcon className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold leading-none text-cream">
                  {activeFilterCount}
                </span>
              ) : null}
            </motion.button>
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
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-[width] duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: revealEase }}
              className="overflow-hidden"
            >
              <div className="border-b border-ink/15 py-6">
                {activeFilterCount > 0 ? (
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={resetAdvancedFilters}
                      className="font-display text-xs uppercase tracking-[0.1em] text-accent underline underline-offset-4"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : null}

                <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
                  {allMakes.length > 1 ? (
                    <div>
                      <label htmlFor="make-filter" className="text-xs font-medium uppercase tracking-[0.14em] text-ink/50">
                        Make
                      </label>
                      <div className="relative mt-3 sm:w-40">
                        <select
                          id="make-filter"
                          value={selectedMake}
                          onChange={(event) => setSelectedMake(event.target.value)}
                          className="w-full appearance-none border border-ink/20 bg-transparent py-2 pl-3 pr-7 text-xs uppercase tracking-[0.06em] text-ink/65 outline-none transition-colors hover:border-ink/40 focus:border-ink"
                        >
                          <option value="">All Makes</option>
                          {allMakes.map((make) => (
                            <option key={make} value={make}>
                              {make}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/40" />
                      </div>
                    </div>
                  ) : null}

                  {allTransmissions.length > 1 ? (
                    <div>
                      <label
                        htmlFor="transmission-filter"
                        className="text-xs font-medium uppercase tracking-[0.14em] text-ink/50"
                      >
                        Transmission
                      </label>
                      <div className="relative mt-3 sm:w-40">
                        <select
                          id="transmission-filter"
                          value={selectedTransmission}
                          onChange={(event) => setSelectedTransmission(event.target.value)}
                          className="w-full appearance-none border border-ink/20 bg-transparent py-2 pl-3 pr-7 text-xs uppercase tracking-[0.06em] text-ink/65 outline-none transition-colors hover:border-ink/40 focus:border-ink"
                        >
                          <option value="">All Transmissions</option>
                          {allTransmissions.map((transmission) => (
                            <option key={transmission} value={transmission}>
                              {transmission}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/40" />
                      </div>
                    </div>
                  ) : null}

                  <div className="sm:w-72">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink/50">Mileage</p>
                      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.04em]">
                        <button
                          type="button"
                          onClick={() => setMileageUnit("km")}
                          aria-pressed={mileageUnit === "km"}
                          className={mileageUnit === "km" ? "text-accent" : "text-ink/35 hover:text-ink/60"}
                        >
                          Km
                        </button>
                        <span className="text-ink/25">/</span>
                        <button
                          type="button"
                          onClick={() => setMileageUnit("mi")}
                          aria-pressed={mileageUnit === "mi"}
                          className={mileageUnit === "mi" ? "text-accent" : "text-ink/35 hover:text-ink/60"}
                        >
                          Mi
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <MileageRangeSlider
                        min={MILEAGE_MIN}
                        max={MILEAGE_MAX}
                        step={MILEAGE_STEP}
                        value={mileageRange}
                        onChange={setMileageRange}
                        unit={mileageUnit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </RevealOnLoad>

      {hasNoMatches ? (
        <div className="py-16 text-center">
          <p className="font-display text-xl text-ink/70">No vehicles match your search</p>
          <p className="mt-2 text-sm text-ink/50">Try a different term, or clear the filters below.</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="font-display mt-6 text-xs uppercase tracking-[0.1em] text-accent underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.08em] text-ink/40">
              {filtered.length} vehicle{filtered.length === 1 ? "" : "s"}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-xs uppercase tracking-[0.08em] text-ink/40">
                  Sort
                </label>
                <div className="relative">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="appearance-none border border-ink/20 bg-transparent py-2 pl-3 pr-7 text-xs uppercase tracking-[0.06em] text-ink/65 outline-none transition-colors hover:border-ink/40 focus:border-ink"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/40" />
                </div>
              </div>

              <div className="flex items-center border border-ink/15">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`flex h-8 w-9 items-center justify-center transition-colors ${
                    viewMode === "grid" ? "bg-ink text-cream" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  <GridIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`flex h-8 w-9 items-center justify-center border-l border-ink/15 transition-colors ${
                    viewMode === "list" ? "bg-ink text-cream" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <InventoryGrid vehicles={filtered} placeholderCount={placeholderCount} />
          ) : (
            <InventoryList vehicles={filtered} />
          )}
        </div>
      )}
    </div>
  );
}
