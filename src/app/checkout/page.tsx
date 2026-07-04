import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckoutForm } from "@/components/store/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your AIM Imports store order.",
};

export default function CheckoutPage() {
  return (
    <>
      <div className="snap-section">
        <PageHeader eyebrow="Checkout" title="Complete Your Order" />
      </div>

      <section className="snap-section border-t border-ink/15 bg-cream pb-24 pt-12 md:pb-28">
        <Container>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}
