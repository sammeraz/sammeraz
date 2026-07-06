import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";
import { FAQAccordion, type FAQItem } from "@/components/faq/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about importing a Japanese-market vehicle with AIM Imports — eligibility, timelines, pricing, and delivery.",
};

const faqs: FAQItem[] = [
  {
    question: "Which vehicles can actually be imported to the U.S.?",
    answer:
      "Federal law generally requires a vehicle to be 25 years old before it can be imported without meeting current U.S. crash and emissions standards — that's why JDM classics become available as they age past that mark. We check import eligibility on anything we source before it's ever offered to you.",
  },
  {
    question: "How long does the process take?",
    answer:
      "It varies by vehicle — auction timing, ocean freight schedules, and customs all play a part. Once we've identified a specific car for you, we'll give you a realistic timeline for that vehicle rather than a generic estimate.",
  },
  {
    question: "What's included in the price you quote?",
    answer:
      "Sourcing, auction purchase, shipping, and the documentation required for U.S. entry and state registration are all coordinated on your behalf. Ask us for a full breakdown on any specific vehicle before you commit — nothing should be a surprise at delivery.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Not yet — imported vehicles don't fit standard auto loans, so we're working on a lending partnership built for that. In the meantime, reach out and we'll help you figure out what's realistic.",
  },
  {
    question: "I don't see what I want in current inventory — can you still help?",
    answer:
      "Most of what we source never makes it to a public listing in the first place — it's matched to a buyer during the search itself. Tell us the make, model, spec, and budget you're after and we'll let you know what's realistic to find.",
  },
  {
    question: "What do the auction grades and condition reports actually mean?",
    answer:
      "Japanese auction houses grade a vehicle's exterior, interior, and mechanical condition on a standardized scale, plus note any accident history or repairs. We review that sheet line by line and share the same report with you — not a summary, the real thing.",
  },
  {
    question: "Do you only deliver locally, or nationwide?",
    answer:
      "Nationwide. We're based in Leander, Texas, but that's where cars land and get prepped, not where they stay — delivery is coordinated anywhere in the U.S.",
  },
  {
    question: "Are the magazines in the Store original issues?",
    answer:
      "Yes — original back-issues sourced alongside our vehicle shipments, not reprints. Each listing shows its actual condition grade (new, like-new, good, or fair) so you know exactly what you're getting.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions We Hear Before Someone Buys"
        description="The honest answers, upfront — if something's missing, ask us directly."
      />

      <section className="border-t border-ink/15 bg-cream pb-24 pt-12 dark:border-cream/15 dark:bg-ink md:pb-28">
        <Container>
          <Reveal className="reveal-instant">
            <FAQAccordion items={faqs} />
          </Reveal>
        </Container>
      </section>

      <CTABanner
        title="Still have a question?"
        description="Whatever it is, ask us directly — we'd rather answer it now than have it come up after you've committed."
      />
    </>
  );
}
