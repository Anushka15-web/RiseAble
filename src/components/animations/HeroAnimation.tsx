import React, { useRef, useEffect } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { motion } from "framer-motion";

const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="parallax-bg absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
        style={{ willChange: 'transform' }}
      >
        <img 
          src="/lovable-uploads/a7665a6d-7d6c-4f60-8ec4-84ed7161e42c.png" 
          alt="Diverse people interacting with technology" 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent rounded-xl" />
    </motion.div>
  );
};

export default HeroAnimation;
