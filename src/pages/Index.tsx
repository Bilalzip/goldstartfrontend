import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import CallToAction from "@/components/CallToAction";
import TestimonialCard from "@/components/TestimonialCard";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle, ArrowRight, MessageCircle, Play } from "lucide-react";
import { useRef, useState } from "react";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-brand-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
                  Boost Your Business's Google Reviews – The Smart Way!
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Handle tough criticism privately & send happy customers to
                  your Google Reviews.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {/* Primary Button */}
                <Button
                  size="lg"
                  asChild
                  className="bg-brand-600 hover:bg-brand-700 transition-colors"
                >
                  <Link to="/signup" className="flex items-center gap-2">
                    Get Started - $349/month
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Secondary Button */}
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Contact Sales
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel Anytime</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-brand-200/30 to-brand-500/30 rounded-lg transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop"
                  alt="Dashboard preview"
                  className="rounded-lg shadow-xl w-full object-cover animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explainer Video Section - Added directly below the fold */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch our quick video to learn how The Gold Star can transform
              your business's online reputation.
            </p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              {/* Video poster overlay with play button (for better performance) */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/5 flex items-center justify-center cursor-pointer z-10"
                  onClick={toggleVideo}
                >
                  <div className="bg-brand-600 rounded-full p-5 shadow-lg">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
              )}

              {/* Actual video element - using preload="metadata" for better page load speed */}
              <video
                ref={videoRef}
                className="w-full rounded-xl aspect-video"
                controls={isPlaying}
                preload="metadata"
                onClick={toggleVideo}
                poster="/video-thumbnail.jpg" // Optional: Add a thumbnail image for the video
              >
                <source src="/Instructional_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="section container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Take Control of Your Online Reputation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our smart review management system helps you build a stellar online
            presence while addressing customer concerns privately.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection
            delay={0.1}
            className="bg-white p-8 rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Strategically Filter Reviews
                </h3>
                <p className="text-muted-foreground">
                  Automatically direct satisfied customers to leave public
                  Google reviews while channeling constructive feedback
                  privately to your team.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.2}
            className="bg-white p-8 rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom QR Codes</h3>
                <p className="text-muted-foreground">
                  Get branded QR codes that you can place on receipts, at
                  checkout, or in-store to make reviewing your business
                  effortless for customers.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.3}
            className="bg-white p-8 rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Instant Notifications
                </h3>
                <p className="text-muted-foreground">
                  Receive real-time alerts when customers leave feedback,
                  allowing you to respond quickly to concerns and thank
                  promoters.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.4}
            className="bg-white p-8 rounded-xl shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Review Analytics</h3>
                <p className="text-muted-foreground">
                  Track your review performance over time with
                  easy-to-understand metrics and insights to improve your
                  business strategy.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <section className="section container">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Businesses just like yours are seeing remarkable results with our
            review management system.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="Owner"
            company="Riverdale Cafe"
            testimonial="Since using The Gold Star, our Google rating has gone from 3.8 to 4.7 stars! The automatic review routing has been a game-changer for our business."
            delay={0.1}
          />

          <TestimonialCard
            name="Michael Chen"
            role="Manager"
            company="Elite Auto Repair"
            testimonial="The QR code system makes it incredibly easy for our customers to leave reviews. We've seen a 300% increase in our Google review count in just 3 months."
            delay={0.2}
          />

          <TestimonialCard
            name="Jessica Williams"
            role="Director"
            company="Wellness Spa"
            testimonial="Not only are we getting more positive Google reviews, but the private feedback has helped us improve our services. It's been worth every penny."
            delay={0.3}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section container">
        <AnimatedSection className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our review management service.
          </p>
        </AnimatedSection>

        <Faq />
      </section>

      {/* Chat Widget Preview */}
      <section className="section container">
        <div className="bg-brand-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Have questions? We're here to help!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our team is ready to answer any questions you have about our
                review management service and how it can benefit your business.
              </p>
              <Button className="flex items-center gap-2" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-4 w-4" /> Contact Us
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white shadow-lg rounded-lg p-5 max-w-sm ml-auto">
                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                  <div className="bg-brand-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    RR
                  </div>
                  <div>
                    <p className="font-semibold">The Gold Star</p>
                    <p className="text-sm text-muted-foreground">Online now</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="bg-brand-100 text-brand-800 p-3 rounded-lg inline-block">
                    <p>
                      Hi there! How can I help you boost your online reputation
                      today?
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg inline-block ml-auto">
                    <p>
                      I'm interested in learning more about your review
                      management system.
                    </p>
                  </div>
                  <div className="bg-brand-100 text-brand-800 p-3 rounded-lg inline-block">
                    <p>
                      Great! I'd be happy to explain how our system works and
                      how it can help your business get more positive reviews.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 pr-10 border rounded-lg"
                    placeholder="Type your message..."
                  />
                  <Button size="sm" className="absolute right-1 top-1">
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section container">
        <CallToAction />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
