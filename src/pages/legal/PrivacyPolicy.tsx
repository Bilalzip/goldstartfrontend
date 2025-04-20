import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. INFORMATION WE COLLECT
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Business Info: Name, email, business name, contact info,
                  payment details
                </li>
                <li>Review Data: Ratings, feedback, submission timestamps</li>
                <li>
                  Sales Info: Name, contact, referrals, commission records
                </li>
                <li>Technical Info: IP, browser, cookies, session analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. HOW WE USE YOUR INFORMATION
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To manage and improve the platform</li>
                <li>To process billing and subscriptions</li>
                <li>To track commissions and referrals</li>
                <li>To meet legal and tax obligations</li>
                <li>To ensure fraud protection and security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. DATA SHARING & THIRD-PARTY PROVIDERS
              </h2>
              <p>We share data only with:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Stripe or payment processors for secure billing</li>
                <li>Email systems for support and account notices</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p className="mt-4">We never sell personal or business data.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. DATA SECURITY</h2>
              <p>
                We use industry-standard security protocols and limit internal
                access. However, no digital system is 100% secure. Users are
                responsible for account confidentiality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. YOUR RIGHTS UNDER PIPEDA
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Access your personal data</li>
                <li>Request corrections</li>
                <li>
                  Withdraw consent (unless required to fulfill a contract)
                </li>
                <li>Request deletion where applicable</li>
              </ul>
              <p className="mt-4">
                Requests can be submitted to: thejulianlucic@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. COOKIES & TRACKING</h2>
              <p>Cookies are used for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Site analytics (Google Analytics, etc.)</li>
                <li>Functional improvement and tracking interactions</li>
              </ul>
              <p className="mt-4">
                You can disable cookies via browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. SUBSCRIBER CONSENT</h2>
              <p>Subscribers agree to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>This Privacy Policy</li>
                <li>Our Terms of Service</li>
                <li>Recurring billing and secure data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                8. CHANGES TO THIS POLICY
              </h2>
              <p>
                We may update this policy with notice. Users who do not accept
                changes may cancel their subscription.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                9. CONTACT INFORMATION
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

export default PrivacyPolicy;
