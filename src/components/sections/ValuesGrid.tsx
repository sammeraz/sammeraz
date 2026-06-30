import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/data/site";

export function ValuesGrid() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="What We Believe"
          title="The standard we hold every vehicle to"
          description="None of this is exotic — it's just easy to skip when a car is thousands of miles away. We don't skip it."
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-3">
              <span className="block h-px w-10 bg-accent" />
              <h3 className="font-serif text-xl text-ink">{value.title}</h3>
              <p className="text-sm leading-relaxed text-ink/65">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
