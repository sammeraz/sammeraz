import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start an inquiry with AIM Imports about sourcing a Japanese-market vehicle.",
};

const nextSteps = [
  {
    title: "You tell us what you're after",
    description: "Make, model, spec, condition, budget — as much or as little as you know.",
  },
  {
    title: "We reply with feasibility",
    description: "What's realistic to source, roughly what it costs landed in Texas, and timeline.",
  },
  {
    title: "We start the search",
    description: "If it's a good fit, sourcing begins and you hear from us at every stage.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start an Inquiry"
        description="Tell us what you're looking for. We'll let you know what's realistic to source and what it costs to get it here."
      />

      <section className="bg-cream py-24 md:py-28">
        <Container className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
          <Reveal>
            <InquiryForm />
          </Reveal>

          <RevealGroup className="flex flex-col gap-12">
            <div className="flex flex-col gap-7">
              <RevealItem>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  What Happens Next
                </span>
              </RevealItem>
              {nextSteps.map((step, index) => (
                <RevealItem key={step.title} className="flex gap-4">
                  <span className="font-serif text-lg text-ink/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-ink">{step.title}</h3>
                    <p className="font-body mt-1 text-sm leading-relaxed text-ink/60">{step.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>

            <RevealItem className="flex flex-col gap-3 border-t border-ink/10 pt-8">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/45">
                Direct
              </span>
              <a
                href={`mailto:${site.email}`}
                className="text-base text-ink underline underline-offset-4 hover:text-accent"
              >
                {site.email}
              </a>
              <span className="text-sm text-ink/60">{site.location} &middot; nationwide delivery</span>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
