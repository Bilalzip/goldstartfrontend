import { QrCode, Star, Users, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <QrCode className="h-10 w-10" />,
    title: "Scan the QR Code",
    description:
      "Your customer scans your custom Gold Star QR code using their phone — quick and easy, no app needed.",
    delay: 0.1,
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "Rate the Experience",
    description:
      "They choose a rating from 1 to 5 stars to reflect their experience.",
    delay: 0.2,
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Share Publicly or Privately",
    description:
      "After selecting a rating, customers can choose to post their review publicly on Google, or submit it privately to the business. Happy customers are more likely to go public — while others often choose to leave their feedback privately.",
    delay: 0.3,
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Build Trust and Reputation",
    description:
      "Public reviews help boost your online visibility, while private feedback gives you a chance to improve behind the scenes — all through one simple system.",
    delay: 0.4,
  },
];

const HowItWorks = () => {
  return (
    <section className="section container text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ⭐ How It Works – The Gold Star in 4 Simple Steps
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Our transparent system gives customers the choice to share their
          feedback publicly or privately — building trust and improving your
          business.
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
        A simple, transparent system that respects customer choice while helping
        your business grow.
      </p>
    </section>
  );
};

export default HowItWorks;
