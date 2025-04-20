import { QrCode, Star, ArrowUpRight, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <QrCode className="h-10 w-10" />,
    title: "Customer scans a QR code or receives a link by email",
    description:
      "Customers access your review form through a custom QR code you place at your business or via email links you send.",
    delay: 0.1,
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "They leave a 1-5 star review",
    description:
      "Customers provide honest feedback by rating their experience from 1 to 5 stars on a simple, user-friendly form.",
    delay: 0.2,
  },
  {
    icon: <ArrowUpRight className="h-10 w-10" />,
    title:
      "If they give 4 stars or more, they're redirected to your Google review page",
    description:
      "Satisfied customers are automatically guided to leave their positive feedback on your public Google Business profile.",
    delay: 0.3,
  },
  {
    icon: <Mail className="h-10 w-10" />,
    title:
      "If they give below 4 stars, their feedback is sent to you privately",
    description:
      "Less than glowing reviews come directly to you, allowing you to address concerns without harming your public reputation.",
    delay: 0.4,
  },
];

const HowItWorks = () => {
  return (
    <section className="section container text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ How It Works</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Our simple 4-step process helps you collect more positive reviews
          while keeping negative feedback private.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
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
            <h3 className="text-xl font-bold mb-3">
              {index + 1}. {step.title}
            </h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-lg mt-8 font-medium text-center max-w-2xl mx-auto">
        It's the easiest way to grow your 5-star reviews and handle complaints
        in private.
      </p>
    </section>
  );
};

export default HowItWorks;
