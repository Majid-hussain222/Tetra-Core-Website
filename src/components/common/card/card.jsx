import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
