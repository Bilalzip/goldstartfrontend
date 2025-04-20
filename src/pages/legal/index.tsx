import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Legal Documents
          </h1>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              <TabsTrigger value="terms">
                <Link
                  to="/legal/terms"
                  className="w-full h-full flex items-center justify-center"
                >
                  Terms of Service
                </Link>
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Link
                  to="/legal/privacy"
                  className="w-full h-full flex items-center justify-center"
                >
                  Privacy Policy
                </Link>
              </TabsTrigger>
              <TabsTrigger value="refund">
                <Link
                  to="/legal/refund"
                  className="w-full h-full flex items-center justify-center"
                >
                  Refund Policy
                </Link>
              </TabsTrigger>
              <TabsTrigger value="payment">
                <Link
                  to="/legal/payment"
                  className="w-full h-full flex items-center justify-center"
                >
                  Payment Policy
                </Link>
              </TabsTrigger>
              <TabsTrigger value="cookie">
                <Link
                  to="/legal/cookie"
                  className="w-full h-full flex items-center justify-center"
                >
                  Cookie Policy
                </Link>
              </TabsTrigger>
              <TabsTrigger value="disclaimer">
                <Link
                  to="/legal/disclaimer"
                  className="w-full h-full flex items-center justify-center"
                >
                  Disclaimer
                </Link>
              </TabsTrigger>
              <TabsTrigger value="review-submitter">
                <Link
                  to="/legal/review-submitter"
                  className="w-full h-full flex items-center justify-center"
                >
                  Review Submitter
                </Link>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white p-8 rounded-lg border">
              <p className="text-lg">
                Please select a legal document from the tabs above.
              </p>
              <p className="mt-4">
                These documents outline the terms, policies, and guidelines that
                govern the use of The Gold Star services. We encourage all users
                to read these documents carefully to understand their rights and
                responsibilities.
              </p>
              <p className="mt-4">
                If you have any questions about our legal policies, please
                contact us at:
              </p>
              <p className="mt-2">
                Email: thejulianlucic@gmail.com
                <br />
                Phone: +1 226 457 4447 ext 800
              </p>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
