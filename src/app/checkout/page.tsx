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
      <PageHeader eyebrow="Checkout" title="Complete Your Order" />

      <section className="border-t border-ink/15 bg-cream pb-24 pt-12 dark:border-cream/15 dark:bg-ink md:pb-28">
        <Container>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}
