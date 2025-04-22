import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccessibility } from "@/context/AccessibilityContext";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, User, Globe, Accessibility, Briefcase, BookOpen, Info, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const { largeText, highContrast, toggleHighContrast, language, toggleLanguage } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    
    toast({
      title: darkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: darkMode 
        ? "The interface has been switched to light mode." 
        : "The interface has been switched to dark mode.",
    });
  };

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      title: language === "en" ? "Accessibility Tools" : "पहुंच टूल", 
      path: "/accessibility-tools",
      icon: <Accessibility className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "Communication Hub" : "संचार केंद्र", 
      path: "/communication-hub",
      icon: <Globe className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "Language Support" : "भाषा समर्थन", 
      path: "/language-support",
      icon: <Globe className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "Jobs" : "नौकरियां", 
      path: "/jobs",
      icon: <Briefcase className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "Courses" : "पाठ्यक्रम", 
      path: "/courses",
      icon: <BookOpen className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "About Us" : "हमारे बारे में", 
      path: "/about",
      icon: <Info className="h-4 w-4" />,
    },
    { 
      title: language === "en" ? "Contact" : "संपर्क", 
      path: "/contact",
      icon: <Phone className="h-4 w-4" />,
    }
  ];

  return (
    <header 
      className={cn(
        "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300",
        scrolled && "shadow-md"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              RiseAble
            </span>
            {/* Accessibility indicator dots */}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted transition-colors",
                        isActive(item.path) && "bg-muted font-medium text-primary"
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
              className="relative"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute bottom-0.5 right-0.5 text-xs font-bold">
                {language === "en" ? "EN" : "HI"}
              </span>
              <span className="sr-only">{language === "en" ? "Switch to Hindi" : "Switch to English"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleHighContrast} 
              aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
              className="relative font-bold"
            >
              {highContrast ? "A" : "a"}
              <span className="sr-only">Toggle high contrast</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="relative"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
              <span className="sr-only">Toggle dark mode</span>
            </Button>
            
            <Button variant="outline" size="sm" asChild className="ml-2">
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                {language === "en" ? "Sign In" : "साइन इन करें"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage}
            aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
            className="relative"
          >
            <Globe className="h-5 w-5" />
            <span className="absolute bottom-0.5 right-0.5 text-xs font-bold">
              {language === "en" ? "EN" : "HI"}
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleHighContrast} 
            aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
            className="relative font-bold"
          >
            {highContrast ? "A" : "a"}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle menu"
            className="relative z-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: mobileMenuOpen ? -45 : 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: mobileMenuOpen ? 45 : -45 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 fixed inset-0 pt-16 z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="h-full overflow-y-auto px-4 py-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mb-6 flex justify-center"
              >
                <Button variant="outline" className="w-full max-w-xs" asChild>
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    {language === "en" ? "Sign In" : "साइन इन करें"}
                  </Link>
                </Button>
              </motion.div>
              
              <ul className="space-y-4 flex flex-col items-center text-lg">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="w-full max-w-xs"
                  >
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center justify-center gap-2 p-3 rounded-md hover:bg-muted transition-colors",
                        isActive(item.path) && "bg-muted font-medium text-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
