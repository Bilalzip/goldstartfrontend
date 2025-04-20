import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/legal"
            className="flex items-center gap-1 text-brand-600 hover:underline mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Legal Documents
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Refund & Cancellation Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All payments for subscriptions are non-refundable, except in
                  cases of:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Verified system failure caused by The Gold Star.</li>
                    <li>Duplicate charges proven to be our error.</li>
                  </ul>
                </li>
                <li>
                  We do not offer partial or prorated refunds for unused
                  subscription time.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cancellations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You may cancel your subscription at any time through your
                  business dashboard or by contacting us.
                </li>
                <li>
                  Your service will remain active until the end of the current
                  billing cycle.
                </li>
                <li>
                  No additional charges will be made after cancellation, but
                  previously paid amounts are non-refundable.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Disputes & Chargebacks
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Please contact us first if you believe there was a billing
                  error.
                </li>
                <li>
                  Filing a chargeback without first attempting resolution may
                  result in account termination and service suspension.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                If you have questions about our refund policy or need to discuss
                billing concerns, please contact us at:
              </p>
              <p className="mt-4">
                Email: thejulianlucic@gmail.com
                <br />
                Phone: +1 226 457 4447 ext 800
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
