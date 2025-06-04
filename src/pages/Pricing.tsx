import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  "Custom QR code & link for customers",
  "Automated review filtering",
  "Private feedback inbox",
  "Google review redirection",
  "Analytics dashboard",
  "Email notifications",
  "Unlimited reviews",
  "Custom branding",
  "Dedicated support",
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-brand-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              One comprehensive plan with everything you need to boost your
              Google reviews and manage your online reputation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden border-2 border-brand-200 shadow-xl relative">
            {/* Add a "Special Offer" banner */}
            <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
              Save $50 Today!
            </div>

            <div className="bg-brand-600 text-white py-6 px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                Review Management Service
              </h2>
              <p className="text-white/80 mt-2">
                Everything you need to boost your online reputation
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-2xl text-gray-400 line-through">
                      CAD $75
                    </span>
                    <span className="ml-2 text-red-500 font-semibold">
                      Limited Time Offer
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-5xl font-bold text-brand-600">
                      CAD $44.99
                    </span>
                    <span className="text-xl text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    That's only about $1.50/day
                  </p>
                  <p className="text-sm text-red-500 font-medium mt-1">
                    *Offer ends soon
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 bg-brand-600 hover:bg-brand-700 transition-colors"
                  asChild
                >
                  <Link to="/signup">
                    Start building your 5-star reputation today for just
                    $1.50/day!
                  </Link>
                </Button>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-red-500 font-medium">
                    Save $50 when you sign up today!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why Choose The Gold Star?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Here's how our service compares to traditional review management
              approaches.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-5 text-left">Feature</th>
                  <th className="p-5 text-center text-brand-600">
                    The Gold Star
                  </th>
                  <th className="p-5 text-center">Traditional Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-5">
                    Customer choice for public or private feedback
                  </td>
                  <td className="p-5 text-center text-brand-600">✓</td>
                  <td className="p-5 text-center">✗</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5">Easy QR code system for customers</td>
                  <td className="p-5 text-center text-brand-600">✓</td>
                  <td className="p-5 text-center">✗</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5">
                    Transparent feedback collection process
                  </td>
                  <td className="p-5 text-center text-brand-600">✓</td>
                  <td className="p-5 text-center">✗</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5">Private feedback channel</td>
                  <td className="p-5 text-center text-brand-600">✓</td>
                  <td className="p-5 text-center">✗</td>
                </tr>
                <tr>
                  <td className="p-5">No technical setup required</td>
                  <td className="p-5 text-center text-brand-600">✓</td>
                  <td className="p-5 text-center">✗</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section container">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Get answers to common questions about our pricing and service.
          </motion.p>
        </div>

        <Faq />
      </section>

      {/* Call to Action */}
      <section className="section container">
        <CallToAction />
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
