import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function ComingSoonCard() {
  return (
    <div className="flex h-full flex-col border border-dashed border-ink/25 bg-white/50">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Coming Soon" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-5">
        <h3 className="font-display text-base leading-none text-ink/35 sm:text-xl">
          Vehicle Details
        </h3>
        <p className="text-[10px] uppercase tracking-[0.08em] text-ink/35 sm:text-xs">
          To be announced
        </p>
      </div>
    </div>
  );
}
