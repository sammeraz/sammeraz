"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "@/components/contact/InquiryForm";

/** Reading the URL's ?vehicle= param has to happen client-side to keep
 * /contact statically prerendered — a Server Component reading it via the
 * page's searchParams prop would force the whole route to render dynamically
 * per-request just to prefill one field. Suspense boundary is required by
 * Next.js for any static route using useSearchParams; the fallback is the
 * plain InquiryForm itself so there's no layout shift when this swaps in. */
export function InquiryFormWithVehicleParam() {
  const searchParams = useSearchParams();
  return <InquiryForm defaultVehicleInterest={searchParams.get("vehicle") ?? undefined} />;
}
