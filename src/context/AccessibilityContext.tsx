import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type Language = 'en' | 'hi';
type ColorBlindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  colorBlindMode: ColorBlindMode;
  setColorBlindMode: (mode: ColorBlindMode) => void;
  screenReader: boolean;
  toggleScreenReader: () => void;
  voiceCommandsEnabled: boolean;
  toggleVoiceCommands: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  toggleHighContrast: () => {},
  largeText: false,
  toggleLargeText: () => {},
  dyslexicFont: false,
  toggleDyslexicFont: () => {},
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  reduceMotion: false,
  toggleReduceMotion: () => {},
  colorBlindMode: 'normal',
  setColorBlindMode: () => {},
  screenReader: false,
  toggleScreenReader: () => {},
  voiceCommandsEnabled: false,
  toggleVoiceCommands: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('en');
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [colorBlindMode, setColorBlindModeState] = useState<ColorBlindMode>('normal');
  const [screenReader, setScreenReader] = useState<boolean>(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState<boolean>(false);
  const { toast } = useToast();

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedHighContrast = localStorage.getItem('highContrast');
    const storedLargeText = localStorage.getItem('largeText');
    const storedDyslexicFont = localStorage.getItem('dyslexicFont');
    const storedLanguage = localStorage.getItem('language') as Language;
    const storedReduceMotion = localStorage.getItem('reduceMotion');
    const storedColorBlindMode = localStorage.getItem('colorBlindMode') as ColorBlindMode;
    const storedScreenReader = localStorage.getItem('screenReader');
    const storedVoiceCommands = localStorage.getItem('voiceCommands');

    if (storedHighContrast) setHighContrast(storedHighContrast === 'true');
    if (storedLargeText) setLargeText(storedLargeText === 'true');
    if (storedDyslexicFont) setDyslexicFont(storedDyslexicFont === 'true');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'hi')) setLanguageState(storedLanguage);
    if (storedReduceMotion) setReduceMotion(storedReduceMotion === 'true');
    if (storedColorBlindMode && ['normal', 'protanopia', 'deuteranopia', 'tritanopia'].includes(storedColorBlindMode)) {
      setColorBlindModeState(storedColorBlindMode as ColorBlindMode);
    }
    if (storedScreenReader) setScreenReader(storedScreenReader === 'true');
    if (storedVoiceCommands) setVoiceCommandsEnabled(storedVoiceCommands === 'true');
  }, []);

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  // Apply large text
  useEffect(() => {
    if (largeText) {
      document.documentElement.style.fontSize = '120%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
    localStorage.setItem('largeText', largeText.toString());
  }, [largeText]);

  // Apply dyslexic font
  useEffect(() => {
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    localStorage.setItem('dyslexicFont', dyslexicFont.toString());
  }, [dyslexicFont]);

  // Set language attribute on document
  useEffect(() => {
    document.documentElement.setAttribute('data-language', language);
    localStorage.setItem('language', language);
  }, [language]);

  // Apply reduced motion
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('reduceMotion', reduceMotion.toString());
  }, [reduceMotion]);

  // Apply color blind mode
  useEffect(() => {
    // Remove any existing color blind mode classes
    document.documentElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    
    if (colorBlindMode !== 'normal') {
      document.documentElement.classList.add(colorBlindMode);
    }
    
    localStorage.setItem('colorBlindMode', colorBlindMode);
  }, [colorBlindMode]);

  // Save screen reader preference
  useEffect(() => {
    localStorage.setItem('screenReader', screenReader.toString());
    // Additional logic for screen reader implementation would go here
  }, [screenReader]);

  // Save voice commands preference
  useEffect(() => {
    localStorage.setItem('voiceCommands', voiceCommandsEnabled.toString());
    // Additional logic for voice commands implementation would go here
  }, [voiceCommandsEnabled]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    toast({
      title: !highContrast 
        ? (language === 'en' ? "High Contrast Mode Enabled" : "हाई कॉन्ट्रास्ट मोड सक्षम")
        : (language === 'en' ? "High Contrast Mode Disabled" : "हाई कॉन्ट्रास्ट मोड अक्षम"),
      description: !highContrast
        ? (language === 'en' ? "Higher color contrast for better visibility." : "बेहतर दृश्यता के लिए उच्च रंग कंट्रास्ट।")
        : (language === 'en' ? "Standard color contrast restored." : "मानक रंग कंट्रास्ट बहाल किया गया।"),
    });
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    toast({
      title: !largeText 
        ? (language === 'en' ? "Large Text Mode Enabled" : "बड़े टेक्स्ट मोड सक्षम") 
        : (language === 'en' ? "Large Text Mode Disabled" : "बड़े टेक्स्ट मोड अक्षम"),
      description: !largeText
        ? (language === 'en' ? "Text size increased for better readability." : "बेहतर पठनीयता के लिए टेक्स्ट आकार बढ़ाया गया।")
        : (language === 'en' ? "Standard text size restored." : "मानक टेक्स्ट आकार बहाल किया गया।"),
    });
  };

  const toggleDyslexicFont = () => {
    setDyslexicFont(!dyslexicFont);
    toast({
      title: !dyslexicFont 
        ? (language === 'en' ? "Dyslexia-Friendly Font Enabled" : "डिस्लेक्सिया-अनुकूल फ़ॉन्ट सक्षम") 
        : (language === 'en' ? "Standard Font Restored" : "मानक फ़ॉन्ट बहाल"),
      description: !dyslexicFont
        ? (language === 'en' ? "Font changed to improve readability for dyslexic users." : "डिस्लेक्सिक उपयोगकर्ताओं के लिए पठनीयता में सुधार के लिए फ़ॉन्ट बदला गया।")
        : (language === 'en' ? "Default font style restored." : "डिफ़ॉल्ट फ़ॉन्ट स्टाइल बहाल किया गया।"),
    });
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguageState(newLanguage);
    
    toast({
      title: newLanguage === 'en' ? "Language Changed to English" : "भाषा हिंदी में बदली गई",
      description: newLanguage === 'en' 
        ? "The interface language has been changed to English." 
        : "इंटरफेस की भाषा हिंदी में बदल दी गई है।",
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
    toast({
      title: !reduceMotion 
        ? (language === 'en' ? "Reduced Motion Mode Enabled" : "कम मोशन मोड सक्षम") 
        : (language === 'en' ? "Standard Motion Restored" : "मानक मोशन बहाल"),
      description: !reduceMotion
        ? (language === 'en' ? "Animations and transitions reduced for better accessibility." : "बेहतर पहुंच के लिए एनिमेशन और ट्रांजिशन कम किए गए।")
        : (language === 'en' ? "Standard animations and transitions restored." : "मानक एनिमेशन और ट्रांजिशन बहाल किए गए।"),
    });
  };

  const setColorBlindMode = (mode: ColorBlindMode) => {
    setColorBlindModeState(mode);
    toast({
      title: language === 'en' ? "Color Mode Changed" : "रंग मोड बदला गया",
      description: language === 'en' 
        ? `Color mode set to ${mode}` 
        : `रंग मोड ${mode} पर सेट किया गया`,
    });
  };

  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    toast({
      title: !screenReader 
        ? (language === 'en' ? "Screen Reader Enabled" : "स्क्रीन रीडर सक्षम") 
        : (language === 'en' ? "Screen Reader Disabled" : "स्क्रीन रीडर अक्षम"),
      description: !screenReader
        ? (language === 'en' ? "Screen reader functionality is now active." : "स्क्रीन रीडर फंक्शनैलिटी अब सक्रिय है।")
        : (language === 'en' ? "Screen reader functionality has been turned off." : "स्क्रीन रीडर फंक्शनैलिटी बंद कर दी गई है।"),
    });
  };

  const toggleVoiceCommands = () => {
    setVoiceCommandsEnabled(!voiceCommandsEnabled);
    toast({
      title: !voiceCommandsEnabled 
        ? (language === 'en' ? "Voice Commands Enabled" : "वॉइस कमांड सक्षम") 
        : (language === 'en' ? "Voice Commands Disabled" : "वॉइस कमांड अक्षम"),
      description: !voiceCommandsEnabled
        ? (language === 'en' ? "You can now navigate using voice commands." : "अब आप वॉइस कमांड का उपयोग करके नेविगेट कर सकते हैं।")
        : (language === 'en' ? "Voice command navigation has been turned off." : "वॉइस कमांड नेविगेशन बंद कर दिया गया है।"),
    });
  };

  const value = {
    highContrast,
    toggleHighContrast,
    largeText,
    toggleLargeText,
    dyslexicFont,
    toggleDyslexicFont,
    language,
    toggleLanguage,
    setLanguage,
    reduceMotion,
    toggleReduceMotion,
    colorBlindMode,
    setColorBlindMode,
    screenReader,
    toggleScreenReader,
    voiceCommandsEnabled,
    toggleVoiceCommands,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
