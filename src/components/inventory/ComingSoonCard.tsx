import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function ComingSoonCard() {
  return (
    <div className="flex flex-col overflow-hidden border border-dashed border-ink/15 bg-white/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Coming Soon" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-serif text-lg text-ink/35">Vehicle details</h3>
        <p className="text-sm text-ink/35">To be announced</p>
      </div>
    </div>
  );
}
