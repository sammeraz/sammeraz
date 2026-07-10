import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to using ${site.name}'s website and Store.`,
};

const sections = [
  {
    title: "Vehicle Listings",
    body: "Inventory listings are informational and subject to change — a vehicle can sell, or its price and details can be updated, before a listing is refreshed. A listing isn't an offer or a binding agreement; that happens separately, in writing, once we've confirmed specifics with you directly.",
  },
  {
    title: "Store Purchases",
    body: "Magazines are sold as-is, in the condition stated on their listing. Payment is processed by Stripe; by placing an order, you also agree to Stripe's own terms governing that payment.",
  },
  {
    title: "Site Content",
    body: "We do our best to keep vehicle details, pricing, and condition notes accurate, but we can't guarantee the site is always complete or error-free. Site content is provided as-is, without warranty.",
  },
  {
    title: "Acceptable Use",
    body: "Don't misuse this site — that includes attempting to access it in ways it wasn't intended to be accessed, or interfering with how it works for other visitors.",
  },
  {
    title: "Limitation of Liability",
    body: `To the extent permitted by law, ${site.name} isn't liable for indirect or consequential damages arising from your use of this site.`,
  },
  {
    title: "Changes to These Terms",
    body: "We may update these terms as the site changes. The version posted here is always the current one.",
  },
  {
    title: "Contact",
    body: `Questions about these terms? Reach us at ${site.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated July 10, 2026." />

      <section className="border-t border-ink/15 bg-cream pb-24 pt-12 dark:border-cream/15 dark:bg-ink md:pb-28">
        <Container>
          <Reveal className="reveal-instant max-w-2xl">
            <div className="flex flex-col gap-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-lg text-ink dark:text-cream">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-cream/65">{section.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
