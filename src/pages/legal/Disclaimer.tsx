import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Disclaimer = () => {
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
            General Disclaimer
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <p>
                The information, content, and services provided by The Gold Star
                ("Company", "we", "us") are made available on an "as-is" and
                "as-available" basis. While we strive for accuracy and
                performance, we do not guarantee that our platform will meet
                every business's expectations or generate guaranteed outcomes
                such as increased revenue or public reviews.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Platforms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The Gold Star integrates with third-party services, including
                  but not limited to Google Reviews, Stripe, and email
                  providers.
                </li>
                <li>
                  We do not control or accept liability for actions taken by
                  third-party platforms (e.g., Google removing or filtering
                  reviews, Stripe rejecting a payment).
                </li>
                <li>
                  Users are responsible for complying with the terms and
                  policies of any third-party platforms they interact with.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Review Filtering Disclaimer
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The Gold Star's platform allows customers to submit reviews.
                </li>
                <li>
                  Only reviews rated 4 stars and above are redirected to Google
                  at the user's discretion.
                </li>
                <li>
                  Reviews below 4 stars are sent privately to the business.
                </li>
                <li>
                  The Company makes no guarantees regarding how review content
                  is interpreted, handled, or displayed on third-party review
                  sites.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                No Legal or Professional Advice
              </h2>
              <p>
                Nothing on our platform constitutes legal, marketing, or
                professional business advice. Users should consult appropriate
                licensed professionals before making decisions based on review
                data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Limitation of Liability
              </h2>
              <p>To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>We disclaim all warranties, express or implied.</li>
                <li>
                  We shall not be liable for any indirect, incidental, or
                  consequential damages resulting from use of the platform.
                </li>
                <li>
                  Users accept full responsibility for actions taken based on
                  the feedback received via the platform.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">External Links</h2>
              <p>
                Our platform may contain links to external websites that are not
                operated by us. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices
                of any third-party websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Changes to This Disclaimer
              </h2>
              <p>
                We may update this disclaimer from time to time. We encourage
                users to frequently check this page for any changes. Your
                continued use of the platform following the posting of changes
                constitutes your acceptance of such changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                If you have any questions about this Disclaimer or other legal
                policies:
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

export default Disclaimer;
