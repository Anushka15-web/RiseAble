import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/AccessibilityContext";
import { 
  Volume2, Globe, Eye, ArrowRight, 
  Accessibility, Briefcase, GraduationCap, Sparkles
} from "lucide-react";
import HeroAnimation from "@/components/animations/HeroAnimation";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import { motion } from "framer-motion";
return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/10">
        <div className="absolute inset-0 section-pattern opacity-30"></div>
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
          <motion.div 
            className="w-full lg:w-1/2 mb-12 lg:mb-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {language === "en" ? (
                "Breaking Barriers, Building Bridges — for Everyone."
              ) : (
                "बाधाओं को तोड़ना, पुल बनाना — सभी के लिए।"
              )}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              {language === "en" ? (
                "Empowering individuals with disabilities through accessible technology and inclusive opportunities."
              ) : (
                "सुलभ प्रौद्योगिकी और समावेशी अवसरों के माध्यम से दिव्यांग व्यक्तियों को सशक्त बनाना।"
              )}
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <motion.div variants={item}>
                <Button asChild size="lg" className="btn-gradient rounded-full">
                  <Link to="/accessibility-tools" className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    {language === "en" ? "Explore Tools" : "उपकरण देखें"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={item}>
                <Button variant="outline" asChild size="lg" className="btn-outline-gradient rounded-full">
                  <Link to="/jobs" className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {language === "en" ? "Browse Jobs" : "नौकरियां देखें"}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button variant="secondary" size="sm" asChild className="rounded-full hover:shadow-md transition-shadow">
                <Link to="/accessibility-tools#sign-language" className="flex items-center gap-2">
                  <Accessibility className="h-4 w-4" />
                  {language === "en" ? "Sign Language" : "सांकेतिक भाषा"}
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full hover:shadow-md transition-shadow flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                {language === "en" ? "Read Aloud" : "बोलकर सुनाएं"}
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full hover:shadow-md transition-shadow flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {language === "en" ? "Translate" : "अनुवाद करें"}
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <HeroAnimation />
          </motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" className="absolute bottom-0 w-full h-16 fill-background">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className="glass-card py-6 px-4 rounded-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">
                {language === "en" ? "Accessibility Tools" : "पहुंच टूल्स"}
              </p>
            </motion.div>
            <motion.div 
              className="glass-card py-6 px-4 rounded-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</h3>
              <p className="text-muted-foreground">
                {language === "en" ? "Job Opportunities" : "नौकरी के अवसर"}
              </p>
            </motion.div>
            <motion.div 
              className="glass-card py-6 px-4 rounded-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">25K+</h3>
              <p className="text-muted-foreground">
                {language === "en" ? "Active Users" : "सक्रिय उपयोगकर्ता"}
              </p>
            </motion.div>
            <motion.div 
              className="glass-card py-6 px-4 rounded-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</h3>
              <p className="text-muted-foreground">
                {language === "en" ? "Partner Organizations" : "साझेदार संगठन"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
        <div className="absolute inset-0 opacity-10 section-pattern"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            );
};

export default Home;
