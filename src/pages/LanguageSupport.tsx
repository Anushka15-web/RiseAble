import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Globe, ArrowRight, Mic, Volume2, RotateCw, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const translationDictionary = {
  englishToHindi: {
    "hello": "नमस्ते",
    "good morning": "सुप्रभात",
    "how are you": "आप कैसे हैं",
    "thank you": "धन्यवाद",
    "welcome": "स्वागत है",
    "goodbye": "अलविदा",
    "yes": "हां",
    "no": "नहीं",
    "please": "कृपया",
    "sorry": "क्षमा करें",
    "help": "मदद",
    "i need help": "मुझे मदद चाहिए",
    "what is your name": "आपका नाम क्या है",
    "my name is": "मेरा नाम है",
    "i don't understand": "मैं समझ नहीं पा रहा हूँ",
    "can you help me": "क्या आप मेरी मदद कर सकते हैं",
    "where is": "कहाँ है",
    "i want to learn": "मैं सीखना चाहता हूं",
    "how much does it cost": "इसकी कीमत कितनी है",
    "excuse me": "क्षमा करें",
    "good night": "शुभ रात्रि",
    "good afternoon": "नमस्कार",
    "i am from": "मैं से हूं",
    "do you speak english": "क्या आप अंग्रेजी बोलते हैं",
    "i love india": "मुझे भारत पसंद है",
    "how to use this app": "इस ऐप का उपयोग कैसे करें",
    "accessibility features": "पहुंच सुविधाएं",
    "sign language": "सांकेतिक भाषा",
    "text to speech": "टेक्स्ट टू स्पीच",
    "job opportunities": "रोजगार के अवसर",
    "courses available": "उपलब्ध पाठ्यक्रम",
    "contact us": "हमसे संपर्क करें",
    "translation services": "अनुवाद सेवाएं",
    "communication tools": "संचार उपकरण",
    "learn more": "और अधिक जानें",
    "sign up": "साइन अप करें",
    "login": "लॉगिन करें",
    "settings": "सेटिंग्स",
    "profile": "प्रोफ़ाइल",
    "notifications": "सूचनाएं",
    "about us": "हमारे बारे में",
    "home": "होम",
    "language": "भाषा",
    "dark mode": "डार्क मोड",
    "light mode": "लाइट मोड",
    "search": "खोज",
    "filter": "फ़िल्टर",
    "sort": "क्रमबद्ध करें",
    "apply": "आवेदन करें",
    "enroll": "नामांकन करें",
    "website": "वेबसाइट",
    "application": "आवेदन",
    "translate": "अनुवाद करें",
    "speak": "बोलें",
    "listen": "सुनें",
    "microphone": "माइक्रोफोन",
    "camera": "कैमरा"
  },
};

const translationDictionaryReverse = {
  hindiToEnglish: Object.entries(translationDictionary.englishToHindi).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>),
};

const allTranslations = {
  ...translationDictionary,
  ...translationDictionaryReverse,
};

const commonPhrases = {
  en: [
    "Hello, how are you?",
    "Thank you for your help",
    "What is your name?",
    "I don't understand",
    "Where is the nearest hospital?",
    "How much does it cost?",
    "I need help",
  ],
  hi: [
    "नमस्ते, आप कैसे हैं?",
    "आपकी सहायता के लिए धन्यवाद",
    "आपका नाम क्या है?",
    "मैं समझ नहीं पा रहा हूँ",
    "निकटतम अस्पताल कहां है?",
    "इसकी कीमत कितनी है?",
    "मुझे मदद चाहिए",
  ]
};

const LanguageSupport: React.FC = () => {
  const { language } = useAccessibility();
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateDirection, setTranslateDirection] = useState<"enToHi" | "hiToEn">(
    language === "en" ? "enToHi" : "hiToEn"
  );
  const [recentTranslations, setRecentTranslations] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setTranslateDirection(language === "en" ? "enToHi" : "hiToEn");
  }, [language]);

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast({
        title: language === "en" ? "Empty Text" : "खाली टेक्स्ट",
        description: language === "en" ? "Please enter some text to translate." : "कृपया अनुवाद के लिए कुछ टेक्स्ट दर्ज करें।",
        variant: "destructive",
      });
      return;
    }
    
    setIsTranslating(true);
    
    setTimeout(() => {
   
      const lowerCaseText = sourceText.toLowerCase().trim();
      
      let result = "";
      
      if (translateDirection === "enToHi") {
      
        const words = lowerCaseText.split(" ");
        const translatedWords = words.map(word => {
          
          if (allTranslations.englishToHindi[word]) {
            return allTranslations.englishToHindi[word];
          }
          
          for (const [phrase, translation] of Object.entries(allTranslations.englishToHindi)) {
            if (lowerCaseText.includes(phrase)) {
              return lowerCaseText.replace(phrase, translation);
            }
          }
          
          return word;
        });
        
        result = translatedWords.join(" ");
        
        if (allTranslations.englishToHindi[lowerCaseText]) {
          result = allTranslations.englishToHindi[lowerCaseText];
        }
        
        if (result === lowerCaseText) {
          result = "हिंदी अनुवाद यहां दिखाई देगा। यह एक डेमो है।";
        }
      } else {
        
        const words = lowerCaseText.split(" ");
        const translatedWords = words.map(word => {
          if (allTranslations.hindiToEnglish[word]) {
            return allTranslations.hindiToEnglish[word];
          }
          return word;
        });
        
        result = translatedWords.join(" ");
        
        if (allTranslations.hindiToEnglish[lowerCaseText]) {
          result = allTranslations.hindiToEnglish[lowerCaseText];
        }
        
        if (result === lowerCaseText) {
          result = "English translation would appear here. This is a demo.";
        }
      }
      
      setTranslatedText(result);
      setIsTranslating(false);
      
      if (!recentTranslations.includes(sourceText)) {
        setRecentTranslations(prev => [sourceText, ...prev].slice(0, 5));
      }
      
      toast({
        title: language === "en" ? "Translation Complete" : "अनुवाद पूरा हुआ",
        description: language === "en" ? "Your text has been translated." : "आपके टेक्स्ट का अनुवाद किया गया है।",
      });
    }, 1000);
  };

  const swapLanguages = () => {
    setTranslateDirection(prev => prev === "enToHi" ? "hiToEn" : "enToHi");
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const clearText = () => {
    setSourceText("");
    setTranslatedText("");
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: language === "en" ? "Not Supported" : "समर्थित नहीं है",
        description: language === "en" ? "Voice input is not supported in your browser." : "आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।",
        variant: "destructive",
      });
      return;
    }
    
    setIsListening(true);
    
    toast({
      title: language === "en" ? "Voice Input" : "वॉइस इनपुट",
      description: language === "en" ? "Speaking... (This is a demo)" : "बोल रहा है... (यह एक डेमो है)",
    });
    
    setTimeout(() => {
      const demoTexts = translateDirection === "enToHi" 
        ? ["Hello, how are you?", "Thank you for your help", "I need assistance"] 
        : ["नमस्ते, आप कैसे हैं?", "आपकी मदद के लिए धन्यवाद", "मुझे सहायता की आवश्यकता है"];
      
      const randomText = demoTexts[Math.floor(Math.random() * demoTexts.length)];
      setSourceText(randomText);
      setIsListening(false);
      
      toast({
        title: language === "en" ? "Voice Captured" : "आवाज़ कैप्चर की गई",
        description: language === "en" ? "We've converted your speech to text." : "हमने आपके भाषण को टेक्स्ट में परिवर्तित कर दिया है।",
      });
    }, 2000);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: language === "en" ? "Not Supported" : "समर्थित नहीं है",
        description: language === "en" ? "Text-to-speech is not supported in your browser." : "आपके ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (translateDirection === "enToHi") {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-US";
    }
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel();
    
    // Start speech synthesis
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: language === "en" ? "Speaking" : "बोल रहा है",
      description: language === "en" ? "Reading text aloud..." : "टेक्स्ट को जोर से पढ़ रहा है...",
    });
  };

  const copyTranslation = () => {
    if (!translatedText) return;
    
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopySuccess(true);
      toast({
        title: language === "en" ? "Copied!" : "कॉपी किया गया!",
        description: language === "en" ? "Translation copied to clipboard." : "अनुवाद क्लिपबोर्ड पर कॉपी किया गया।",
      });
      
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      toast({
        title: language === "en" ? "Copy Failed" : "कॉपी विफल",
        description: language === "en" ? "Could not copy to clipboard." : "क्लिपबोर्ड पर कॉपी नहीं कर सका।",
        variant: "destructive",
      });
    });
  };
