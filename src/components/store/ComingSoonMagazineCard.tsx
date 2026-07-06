import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function ComingSoonMagazineCard() {
  return (
    <div className="flex h-full flex-col border border-dashed border-ink/25 bg-white/50 dark:border-cream/25 dark:bg-ink-soft/50">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Coming Soon" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5 sm:p-7">
        <h3 className="font-display text-base leading-none text-ink/35 dark:text-cream/35 sm:text-xl">
          Issue Details
        </h3>
        <p className="text-[10px] uppercase tracking-[0.08em] text-ink/35 dark:text-cream/35 sm:text-xs">
          To be announced
        </p>
      </div>
    </div>
  );
}
