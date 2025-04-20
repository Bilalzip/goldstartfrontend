import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. SERVICE OVERVIEW</h2>
              <p>
                The Gold Star provides a digital platform that enables
                businesses to collect and manage customer feedback. Customers
                can submit star-rated reviews via QR codes or email links.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  Reviews rated 4 stars and above are redirected to the
                  business's Google review page.
                </li>
                <li>
                  Reviews below 4 stars are privately shared with the business
                  owner for internal resolution.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. ELIGIBILITY & SUBSCRIBER ACKNOWLEDGEMENT
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be 18 years or older to use this service.</li>
                <li>
                  You represent that you have the legal authority to enter into
                  binding contracts on behalf of the business you represent.
                </li>
                <li>
                  By subscribing, you agree to these Terms of Service, our
                  Privacy Policy, and the Subscription Agreement.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. SUBSCRIPTION, PAYMENTS & BILLING POLICY
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Subscription fee: CAD $349/month per business location
                  (subject to change).
                </li>
                <li>Payments are securely processed via Stripe.</li>
                <li>
                  Payments are non-refundable, except in cases of service
                  failure caused by us.
                </li>
                <li>
                  Subscriptions auto-renew monthly unless canceled before the
                  next billing cycle.
                </li>
                <li>
                  Mid-cycle cancellations remain active until the billing period
                  ends.
                </li>
                <li>
                  Users must consent to recurring billing and payment policies
                  via checkbox upon registration.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                4. COMMISSION FOR SALES ASSOCIATES
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Sales reps earn CAD $75 per successful, paid business signup.
                </li>
                <li>
                  Commissions are paid only after the client completes their
                  first full payment.
                </li>
                <li>
                  Sales reps are independent contractors and must sign a
                  contractor agreement.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. ACCEPTABLE USE POLICY
              </h2>
              <p>Users agree not to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Submit fake or misleading reviews.</li>
                <li>Misuse or manipulate platform features.</li>
                <li>
                  Reverse-engineer or interfere with platform integrations
                  (e.g., Google Reviews, Stripe).
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                6. PRIVACY & DATA HANDLING
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is processed under Canada's PIPEDA.</li>
                <li>
                  Customer reviews are private unless redirected to Google by
                  the user.
                </li>
                <li>
                  Payment info is managed by third-party secure processors
                  (e.g., Stripe).
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                7. DISCLAIMERS & LIMITATION OF LIABILITY
              </h2>
              <p>
                Platform is provided "as is" with no guarantee of results or
                uptime.
              </p>
              <p className="mt-4">We are not responsible for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Google's review moderation or removal actions</li>
                <li>Revenue loss or reputational harm</li>
                <li>User misuse or external service errors</li>
              </ul>

              <p className="mt-4">Waterfall Disclaimer Structure:</p>
              <ol className="list-decimal pl-6 mt-2 space-y-2">
                <li>Disclaimer of Warranties</li>
                <li>Limitation of Liability</li>
                <li>
                  Indemnification – Users indemnify The Gold Star against claims
                  from misuse
                </li>
                <li>
                  Dispute Resolution – All legal matters resolved via binding
                  arbitration in Toronto
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                8. TERMINATION & ACCOUNT SUSPENSION
              </h2>
              <p>We may suspend or terminate accounts for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Non-payment or chargeback</li>
                <li>Violation of these Terms or associated policies</li>
                <li>Fraudulent, deceptive, or unethical activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                9. GOVERNING LAW & JURISDICTION
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  These Terms are governed by the laws of Ontario, Canada.
                </li>
                <li>
                  Legal disputes shall be resolved in Toronto through
                  arbitration.
                </li>
                <li>Users waive rights to class-action participation.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                10. MODIFICATIONS TO TERMS
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may revise these Terms from time to time.</li>
                <li>Continued use implies acceptance of changes.</li>
                <li>
                  Users may cancel if they do not agree with updated terms.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                11. CONTACT INFORMATION
              </h2>
              <p>
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

export default TermsOfService;
