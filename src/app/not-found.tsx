import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center bg-ink text-cream">
      <Container className="flex flex-col items-start gap-6 py-24">
        <span className="font-display text-7xl text-accent md:text-8xl">404</span>
        <h1 className="font-display max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
          That page took a wrong turn somewhere.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-cream/65">
          The vehicle, issue, or page you&apos;re after isn&apos;t here — it may have sold, sold
          out, or never existed at this address.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/" variant="light">
            Back to Home
          </Button>
          <Button href="/inventory" variant="outline-light">
            View Inventory
          </Button>
        </div>
      </Container>
    </section>
  );
}
