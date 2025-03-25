
import { QrCode, Star, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <QrCode className="h-10 w-10" />,
    title: "Customers Scan & Review",
    description: "Customers scan your custom QR code and leave their honest feedback in seconds on a user-friendly form.",
    delay: 0.1,
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "Smart Feedback Routing",
    description: "Positive reviews automatically go to Google for public visibility, while improvement opportunities come directly to you.",
    delay: 0.2,
  },
  {
    icon: <ArrowUpRight className="h-10 w-10" />,
    title: "Watch Your Reputation Grow",
    description: "Your online reputation improves as excellent reviews boost your Google ratings and visibility to potential customers.",
    delay: 0.3,
  },
];

const HowItWorks = () => {
  return (
    <section className="section container text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Our simple 3-step process helps you collect more positive reviews while keeping negative feedback private.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: step.delay }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm border border-border"
          >
            <div className="inline-flex items-center justify-center p-3 bg-brand-50 text-brand-600 rounded-lg mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
