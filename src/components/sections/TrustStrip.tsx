import { Container } from "@/components/ui/Container";
import { ClockIcon, DocumentCheckIcon, ShieldCheckIcon, MapPinIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DiagonalEdge } from "@/components/ui/DiagonalEdge";

const items = [
  { icon: ClockIcon, label: "25-Year Import Specialists" },
  { icon: DocumentCheckIcon, label: "Auction-Verified Sourcing" },
  { icon: ShieldCheckIcon, label: "Full Documentation & Compliance" },
  { icon: MapPinIcon, label: "Texas-Based, Nationwide Delivery" },
];

export function TrustStrip() {
  return (
    <DiagonalEdge size={28} direction="rising" className="border-b border-ink/10 bg-cream">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:gap-8 md:py-8">
          {items.map(({ icon: Icon, label }) => (
            <RevealItem key={label} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-accent" />
              <span className="text-[13px] font-medium leading-tight text-ink/80">{label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </DiagonalEdge>
  );
}
