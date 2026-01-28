import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../Hooks/useInView';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isInView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
