import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";

const ThankYou = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 flex items-center justify-center">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20, 
                  delay: 0.2 
                }}
                className="mx-auto mb-6 bg-green-100 w-24 h-24 rounded-full flex items-center justify-center"
              >
                <CheckCircle size={60} className="text-green-600" />
              </motion.div>

              <AnimatedSection delay={0.3}>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Thank You for Your Feedback!
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="text-lg text-gray-600 mb-8">
                  We appreciate your input and are committed to improving our services. Your feedback helps us serve you better.
                </p>
              </AnimatedSection>

            

              <AnimatedSection className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" delay={0.6}>
      
                <Button variant="outline" asChild>
                  <Link to="/">
                    Return to Homepage
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection className="mt-8 text-sm text-gray-500" delay={0.7}>
                <p>
                  Need help? Contact our support team at{" "}
                  <a href="mailto:support@reputationrocket.com" className="text-brand-600 hover:underline">
                    support@reputationrocket.com
                  </a>
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
