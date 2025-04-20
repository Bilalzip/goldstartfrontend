import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const ReviewSubmitter = () => {
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
            Review Submitter Disclaimer
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                For Customers Submitting Reviews
              </h2>
              <p>
                This disclaimer applies to any individual who submits a review
                through The Gold Star's platform, whether via QR code scan or
                email link. Please read this information carefully before
                submitting your feedback.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Voluntary Submission</h2>
              <p>
                By using our review submission system, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Your review is submitted voluntarily.</li>
                <li>
                  You are providing truthful and accurate feedback based on your
                  actual experience.
                </li>
                <li>
                  You have the right to submit feedback about the business in
                  question.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Review Routing Process
              </h2>
              <p>Please be aware of how your review will be handled:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  If you provide a 4 or 5 star review, you will be given the
                  option to redirect to the business's Google review page to
                  share your positive feedback publicly.
                </li>
                <li>
                  If you provide a 1, 2, or 3 star review, your feedback will be
                  shared privately with the business owner only and will not be
                  posted publicly.
                </li>
                <li>
                  The redirection to Google is optional. You may choose not to
                  proceed with publishing your review on Google, even after
                  submitting a positive review through our system.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Privacy of Your Feedback
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The Gold Star does not publicly display, sell, or share your
                  feedback with anyone other than the business you are
                  reviewing.
                </li>
                <li>
                  If you choose to proceed to Google, your review will be
                  subject to Google's own terms, policies, and moderation
                  systems.
                </li>
                <li>
                  Any personal information you provide (such as your name or
                  email) will be handled according to our Privacy Policy.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Business Response</h2>
              <p>The Gold Star is not responsible for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  How the business chooses to respond to your review, whether
                  it's positive or negative.
                </li>
                <li>
                  Any actions the business may take based on your feedback.
                </li>
                <li>
                  Ensuring the business addresses concerns raised in your
                  feedback.
                </li>
              </ul>
              <p className="mt-4">
                We encourage businesses to respond professionally to all
                feedback, but we do not have control over their actions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Appropriate Content</h2>
              <p>When submitting reviews, please refrain from including:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Profane, abusive, or threatening language</li>
                <li>False or defamatory statements</li>
                <li>Confidential or sensitive personal information</li>
                <li>Content that violates any laws or regulations</li>
                <li>Spam, advertisements, or irrelevant content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                If you have questions about the review process or need
                assistance, please contact:
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

export default ReviewSubmitter;
