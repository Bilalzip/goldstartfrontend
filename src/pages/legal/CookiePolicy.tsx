import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CookiePolicy = () => {
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
            Cookie & Tracking Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground italic mb-6">
              Last updated: April 19, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p>
                We use cookies to improve user experience, monitor platform
                usage, and support analytics. This policy explains how The Gold
                Star uses cookies and similar technologies to recognize you when
                you visit our website and platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for core site
                  functionality.
                  <p className="mt-2">
                    These cookies enable basic functions like page navigation
                    and access to secure areas of the website. The website
                    cannot function properly without these cookies.
                  </p>
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help track user behavior
                  and traffic via tools like Google Analytics.
                  <p className="mt-2">
                    These cookies allow us to count visits and traffic sources
                    so we can measure and improve the performance of our site.
                    They help us know which pages are the most and least
                    popular.
                  </p>
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> May be used for
                  retargeting campaigns.
                  <p className="mt-2">
                    These cookies track your online activity to help advertisers
                    deliver more relevant advertising or to limit how many times
                    you see an ad.
                  </p>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
              <p>Cookies are used for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Track user interactions</li>
                <li>Monitor session analytics</li>
                <li>Improve website performance</li>
                <li>Remember user preferences</li>
                <li>Enhance the overall user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>By using our site, you consent to the use of cookies.</li>
                <li>
                  You may disable cookies in your browser settings, though some
                  features may not function as intended.
                </li>
                <li>
                  Most web browsers allow control of cookies through the browser
                  settings.
                </li>
              </ul>
              <p className="mt-4">
                To opt out of being tracked by Google Analytics across all
                websites, visit:
                <a
                  href="http://tools.google.com/dlpage/gaoptout"
                  className="text-brand-600 ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://tools.google.com/dlpage/gaoptout
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various
                third-party cookies to report usage statistics, deliver
                advertisements, and so on.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Changes to this Cookie Policy
              </h2>
              <p>
                We may update this policy from time to time. Please check this
                page regularly to ensure you are familiar with the current
                version.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p>
                If you have questions about our cookie policy, please contact us
                at:
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

export default CookiePolicy;
