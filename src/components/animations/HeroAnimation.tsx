import React, { useRef, useEffect } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { motion } from "framer-motion";

const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();

  const animatedElements = [
    { emoji: "♿", label: "Accessibility", delay: 0.3, position: { top: "20%", left: "15%" } },
    { emoji: "💬", label: "Communication", delay: 0.7, position: { top: "30%", right: "20%" } },
    { emoji: "📚", label: "Education", delay: 0.5, position: { bottom: "25%", right: "30%" } },
    { emoji: "🌏", label: "Global Access", delay: 0.9, position: { bottom: "35%", left: "25%" } },
    { emoji: "💼", label: "Career", delay: 1.1, position: { top: "40%", left: "40%" } },
  ];
  
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

      {!reduceMotion && (
        <>
          {animatedElements.map((element, index) => (
            <motion.div
              key={index}
              className="floating-element absolute z-10"
              style={element.position}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: element.delay,
                  duration: 0.5 
                }
              }}
            >
              <motion.div 
                className="glass rounded-full p-4 shadow-lg border border-white/20"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2 + index * 0.5,
                  ease: "easeInOut",
                }}
              >
                <span role="img" aria-label={element.label} className="text-3xl">{element.emoji}</span>
              </motion.div>
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
};

export default HeroAnimation;
