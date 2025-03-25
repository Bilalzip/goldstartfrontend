
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  delay?: number;
};

const TestimonialCard = ({
  name,
  role,
  company,
  testimonial,
  delay = 0
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="#FFD700" 
                stroke="#FFD700"
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mr-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ))}
          </div>
          <blockquote className="text-lg mb-4 italic">"{testimonial}"</blockquote>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-muted-foreground text-sm">{role}, {company}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
