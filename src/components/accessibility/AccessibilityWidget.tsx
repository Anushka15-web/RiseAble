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
          </div>
        );
