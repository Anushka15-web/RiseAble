import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "./button";

interface SuccessMessageProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  buttonText = "Continue",
  onButtonClick,
  autoHide = false,
  autoHideDelay = 5000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onButtonClick) {
          setTimeout(onButtonClick, 500); // Give animation time to complete
        }
      }, autoHideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, onButtonClick]);

  return visible ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-background rounded-xl shadow-lg p-8 border-2 border-muted/40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mt-16 -mr-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full -mb-16 -ml-16 blur-2xl"></div>
      
      <div className="flex flex-col items-center text-center space-y-4 relative">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2 
            }}
          >
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground mt-2">{message}</p>
        </motion.div>
        
        {onButtonClick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-4"
          >
            <Button 
              onClick={() => {
                setVisible(false);
                setTimeout(onButtonClick, 300);
              }}
              className="w-full"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  ) : null;
};

export default SuccessMessage;
