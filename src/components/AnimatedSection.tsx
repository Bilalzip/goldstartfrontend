
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0.1 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
