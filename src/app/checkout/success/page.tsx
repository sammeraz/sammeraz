import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckoutSuccess } from "@/components/store/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your AIM Imports store order is confirmed.",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Order Confirmation" />

      <section className="border-t border-ink/15 bg-cream pb-24 pt-12 md:pb-28">
        <Container className="mx-auto max-w-xl">
          <Suspense fallback={<div className="border border-ink/10 bg-white px-8 py-12 text-center" />}>
            <CheckoutSuccess />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
