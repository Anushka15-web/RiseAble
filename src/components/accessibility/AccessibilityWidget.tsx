import React, { useState, useEffect } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Eye, Type, Sun, Volume2, Globe, VolumeX, X, MessageSquare, ZoomIn, Check, Settings, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const AccessibilityWidget: React.FC = () => {
  const {
    highContrast,
    toggleHighContrast,
    largeText,
    toggleLargeText,
    reduceMotion,
    toggleReduceMotion,
    colorBlindMode,
    setColorBlindMode,
    screenReader,
    toggleScreenReader,
    language,
    setLanguage,
    voiceCommandsEnabled,
    toggleVoiceCommands,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [activeTab, setActiveTab] = useState<"display" | "language" | "reading" | "info">("display");

  // Prompt the user about accessibility options on first load
  useEffect(() => {
    if (isFirstLoad) {
      setTimeout(() => {
        toast({
          title: "Accessibility Options Available",
          description: "Click the accessibility button in the bottom right to customize your experience.",
          duration: 8000,
        });
        setIsFirstLoad(false);
      }, 3000);
    }
  }, [isFirstLoad]);

  const handleChangeLanguage = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    toast({
      title: "Language Changed",
      description: lang === "en" ? "Language set to English" : "भाषा हिंदी में सेट की गई",
    });
  };

  const handleChangeColorBlindMode = (mode: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia') => {
    setColorBlindMode(mode);
    toast({
      title: "Color Mode Changed",
      description: `Color mode set to ${mode}`,
    });
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };

  // Apply the zoom level
  useEffect(() => {
    if (largeText) {
      setFontSize(120);
      document.documentElement.style.fontSize = "120%";
    } else {
      setFontSize(100);
      document.documentElement.style.fontSize = "100%";
    }
  }, [largeText]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "display":
        return (
          <div className="space-y-5 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <ZoomIn className="mr-2 h-4 w-4 text-primary" />
                Text Size
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs">A</span>
                <Slider
                  value={[fontSize]}
                  min={80}
                  max={200}
                  step={10}
                  onValueChange={handleFontSizeChange}
                  aria-label="Adjust text size"
                  className="flex-1"
                />
                <span className="text-base font-bold">A</span>
              </div>
              <p className="text-xs text-muted-foreground">Current size: {fontSize}%</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Sun className="mr-2 h-4 w-4 text-primary" />
                Display Options
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={toggleHighContrast}
                  className="justify-start text-left relative overflow-hidden group"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div>High Contrast</div>
                    <div className="text-xs text-muted-foreground">Enhances text visibility</div>
                  </div>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {highContrast && <Check className="h-4 w-4" />}
                  </span>
                </Button>
                <Button
                  variant={largeText ? "default" : "outline"}
                  size="sm"
                  onClick={toggleLargeText}
                  className="justify-start text-left relative overflow-hidden group"
                >
                  <Type className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div>Large Text</div>
                    <div className="text-xs text-muted-foreground">Increases all text size</div>
                  </div>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {largeText && <Check className="h-4 w-4" />}
                  </span>
                </Button>
                <Button
                  variant={reduceMotion ? "default" : "outline"}
                  size="sm"
                  onClick={toggleReduceMotion}
                  className="justify-start text-left relative overflow-hidden group"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div>Reduced Motion</div>
                    <div className="text-xs text-muted-foreground">Minimizes animations</div>
                  </div>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {reduceMotion && <Check className="h-4 w-4" />}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Eye className="mr-2 h-4 w-4 text-primary" />
                Color Vision
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={colorBlindMode === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeColorBlindMode("normal")}
                  className="relative group"
                >
                  <span className="transition-transform group-hover:scale-105">Normal</span>
                  {colorBlindMode === "normal" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </Button>
                <Button
                  variant={colorBlindMode === "protanopia" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeColorBlindMode("protanopia")}
                  className="relative group"
                >
                  <span className="transition-transform group-hover:scale-105">Protanopia</span>
                  {colorBlindMode === "protanopia" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </Button>
                <Button
                  variant={colorBlindMode === "deuteranopia" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeColorBlindMode("deuteranopia")}
                  className="relative group"
                >
                  <span className="transition-transform group-hover:scale-105">Deuteranopia</span>
                  {colorBlindMode === "deuteranopia" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </Button>
                <Button
                  variant={colorBlindMode === "tritanopia" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeColorBlindMode("tritanopia")}
                  className="relative group"
                >
                  <span className="transition-transform group-hover:scale-105">Tritanopia</span>
                  {colorBlindMode === "tritanopia" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      case "reading":
        return (
          <div className="space-y-5 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Volume2 className="mr-2 h-4 w-4 text-primary" />
                Reading & Hearing
              </h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant={screenReader ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleScreenReader();
                    toast({
                      title: screenReader ? "Screen Reader Disabled" : "Screen Reader Enabled",
                      description: screenReader 
                        ? "The screen reader functionality has been turned off." 
                        : "The screen reader will now read content aloud as you navigate.",
                    });
                  }}
                  className="justify-start text-left relative overflow-hidden group"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div>Screen Reader</div>
                    <div className="text-xs text-muted-foreground">Reads content aloud</div>
                  </div>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {screenReader && <Check className="h-4 w-4" />}
                  </span>
                </Button>
                <Button
                  variant={voiceCommandsEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleVoiceCommands();
                    toast({
                      title: voiceCommandsEnabled ? "Voice Commands Disabled" : "Voice Commands Enabled",
                      description: voiceCommandsEnabled 
                        ? "Voice command controls have been turned off." 
                        : "You can now control the site using voice commands. Try saying 'Go to home'.",
                    });
                  }}
                  className="justify-start text-left relative overflow-hidden group"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div>Voice Commands</div>
                    <div className="text-xs text-muted-foreground">Control by speaking</div>
                  </div>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {voiceCommandsEnabled && <Check className="h-4 w-4" />}
                  </span>
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
              <h4 className="font-medium text-sm">Voice Command Examples:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="bg-muted px-2 py-0.5 rounded text-xs">"Go to home"</span>
                  <span className="text-xs">- Navigate to homepage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-muted px-2 py-0.5 rounded text-xs">"Increase text size"</span>
                  <span className="text-xs">- Make text larger</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-muted px-2 py-0.5 rounded text-xs">"Enable high contrast"</span>
                  <span className="text-xs">- Toggle high contrast mode</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">Voice commands are a demonstration feature and may have limited functionality.</p>
            </div>

            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 mt-4"
                onClick={() => {
                  window.location.href = "/accessibility-tools";
                }}
              >
                <Settings className="h-4 w-4" />
                Advanced Accessibility Settings
              </Button>
            </div>
          </div>
        );
      case "language":
        return (
          <div className="space-y-5 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Globe className="mr-2 h-4 w-4 text-primary" />
                Language Settings
              </h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeLanguage("en")}
                  className="justify-between items-center group"
                >
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="group-hover:scale-105 transition-transform">English</span>
                  </div>
                  {language === "en" && <Check className="h-4 w-4 ml-2" />}
                </Button>
                <Button
                  variant={language === "hi" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChangeLanguage("hi")}
                  className="justify-between items-center group"
                >
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span className="group-hover:scale-105 transition-transform">हिंदी</span>
                  </div>
                  {language === "hi" && <Check className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                Translation Tools
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left gap-2 relative overflow-hidden group"
                  onClick={() => {
                    window.location.href = "/language-support";
                  }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{language === "en" ? "Text Translator" : "टेक्स्ट अनुवादक"}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === "en" ? "Translate between languages" : "भाषाओं के बीच अनुवाद करें"}
                    </div>
                  </div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left gap-2 relative overflow-hidden group"
                  onClick={() => {
                    window.location.href = "/communication-hub";
                  }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{language === "en" ? "Sign Language" : "सांकेतिक भाषा"}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === "en" ? "Visual communication tools" : "दृश्य संचार उपकरण"}
                    </div>
                  </div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        );
      case "info":
        return (
          <div className="space-y-5 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Info className="mr-2 h-4 w-4 text-primary" />
                About Accessibility Features
              </h3>
              <div className="p-4 bg-muted/30 rounded-lg space-y-3 text-sm">
                <p>RiseAble is designed to be accessible to all users, including those with disabilities. Our accessibility features help customize your experience to meet your specific needs.</p>
                <p>These tools are designed to comply with WCAG 2.2 guidelines to ensure the best possible experience for all users.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Accessibility Statement</h3>
              <p className="text-sm text-muted-foreground">
                We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                Learn More About Our Mission
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  window.location.href = "/contact";
                }}
              >
                <MessageSquare className="h-4 w-4" />
                Contact Accessibility Support
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0"
          >
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
              aria-label="Open accessibility tools"
            >
              <span className="sr-only">Accessibility Options</span>
              <Eye size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-80 overflow-hidden border border-border"
            >
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-primary" />
                  Accessibility Tools
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close accessibility tools">
                  <X size={18} />
                </Button>
              </div>
              
              <div className="flex border-b border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${activeTab === "display" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("display")}
                >
                  <Sun className="h-4 w-4 mr-1" />
                  <span className="text-xs">Display</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${activeTab === "reading" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("reading")}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  <span className="text-xs">Reading</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${activeTab === "language" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("language")}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="text-xs">Language</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${activeTab === "info" ? "border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab("info")}
                >
                  <Info className="h-4 w-4 mr-1" />
                  <span className="text-xs">Info</span>
                </Button>
              </div>
              
              <CollapsibleContent className="p-4 max-h-[70vh] overflow-y-auto">
                {renderTabContent()}
              </CollapsibleContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
};

export default AccessibilityWidget;

// Helper component for animations
const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

