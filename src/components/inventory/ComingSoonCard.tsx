import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function ComingSoonCard() {
  return (
    <div className="flex h-full flex-col border border-dashed border-ink/25 bg-white/50">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Coming Soon" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-display text-xl leading-none text-ink/35">Vehicle Details</h3>
        <p className="text-xs uppercase tracking-[0.08em] text-ink/35">To be announced</p>
      </div>
    </div>
  );
}
