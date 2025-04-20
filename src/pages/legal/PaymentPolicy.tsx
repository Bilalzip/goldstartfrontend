import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PaymentPolicy = () => {
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
            Payment & Billing Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Subscription Pricing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Standard subscription fee: CAD $349/month per business
                  location.
                </li>
                <li>Equivalent to approximately $11.63/day.</li>
                <li>
                  Payments are processed via Stripe using a secure and encrypted
                  connection.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Billing Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Subscriptions are billed monthly on a recurring basis until
                  canceled.
                </li>
                <li>
                  You must authorize recurring billing during account
                  registration.
                </li>
                <li>
                  By creating an account, you agree to pay all fees associated
                  with your subscription plan.
                </li>
                <li>All charges are in Canadian dollars (CAD).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Failed Payments</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  If a payment is declined, we will notify you and retry
                  automatically.
                </li>
                <li>
                  If payment is not received within 5 days, your account may be
                  temporarily suspended.
                </li>
                <li>
                  To reactivate a suspended account, you will need to update
                  your payment information and settle any outstanding balances.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Receipts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Invoices and payment confirmations will be emailed to your
                  registered address.
                </li>
                <li>
                  You can access your billing history through your account
                  dashboard.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
              <p>
                We currently accept the following payment methods through our
                Stripe integration:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Credit Cards (Visa, Mastercard, American Express)</li>
                <li>Debit Cards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                If you have questions about billing or payments, please contact
                us at:
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

export default PaymentPolicy;
