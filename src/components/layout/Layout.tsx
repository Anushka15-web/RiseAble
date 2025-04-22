import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AccessibilityWidget from "../accessibility/AccessibilityWidget";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // Simulate page load with a progress indicator
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      
      // Simulate page loading for demonstration
      const timer = setTimeout(() => {
        setLoading(false);
        // Welcome toast when navigating to home page
        if (location.pathname === "/" && !sessionStorage.getItem("welcomed")) {
          toast({
            title: "Welcome to RiseAble",
            description: "Breaking barriers and building bridges for everyone.",
            duration: 5000,
          });
          sessionStorage.setItem("welcomed", "true");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    };
    
    handleRouteChange();
  }, [location.pathname, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            className="flex-grow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      )}
      
      <AccessibilityWidget />
      <Footer />
    </div>
  );
};

export default Layout;
