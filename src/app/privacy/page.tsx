import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you submit an inquiry, we collect your name, email, and whatever else you choose to share — phone, budget, vehicle of interest, and your message. When you order from the Store, we collect your name, email, and shipping address to fulfill that order.",
  },
  {
    title: "Payment Processing",
    body: "Store purchases are processed by Stripe. Your card details are entered directly into Stripe's own checkout page and never pass through our servers — we never see or store your full card number.",
  },
  {
    title: "How We Use Your Information",
    body: "Inquiry details are used to respond to you and, if it moves forward, to source and quote a vehicle. Order details are used to fulfill and ship that order. We don't sell your information, and we don't send marketing email unless you've asked us a question first.",
  },
  {
    title: "Cookies & Local Storage",
    body: "We don't use advertising or tracking cookies. Your light/dark mode preference and shopping cart contents are saved in your browser's local storage only — that data stays on your device and isn't sent to us.",
  },
  {
    title: "Sharing",
    body: "We share information only with the services required to do business: Stripe for payment processing, and our email provider for delivering inquiry notifications. We don't sell or rent your information to anyone else.",
  },
  {
    title: "Your Choices",
    body: `You can ask us what information we have about you, or ask us to delete it, at any time — just email ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated July 10, 2026." />

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
            <p className="mt-12 text-xs leading-relaxed text-ink/40 dark:text-cream/40">
              This is a plain-language summary of our privacy practices, not an exhaustive legal document.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
