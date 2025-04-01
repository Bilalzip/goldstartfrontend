
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type CallToActionProps = {
  className?: string;
};

const CallToAction = ({ className = "" }: CallToActionProps) => {
  return (
    <div className={`bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-xl py-12 px-8 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to improve your online reputation?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
        >
          Join businesses that are strategically managing their reviews and building a stronger online presence.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-brand-800 hover:bg-white/90"
            asChild
          >
            <Link to="/signup">
              Get Started – $349/month
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
