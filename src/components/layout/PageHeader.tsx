import { Container } from "@/components/ui/Container";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <PlaceholderArt variant="hero" />
      </div>
      <Container className="relative z-10 pb-14 pt-32">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent-soft">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
