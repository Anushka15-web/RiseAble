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

  const useRecentTranslation = (text: string) => {
    setSourceText(text);
  };

  const usePhrase = (phrase: string) => {
    setSourceText(phrase);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary/80 to-blue-500 text-transparent bg-clip-text">
          {language === "en" ? "Language Support" : "भाषा समर्थन"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Break language barriers with real-time translation tools."
            : "रीयल-टाइम अनुवाद उपकरणों के साथ भाषा की बाधाओं को तोड़ें।"}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-muted/40 overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 -mb-8 -ml-8 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {language === "en" ? "Translator" : "अनुवादक"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Translate between Hindi and English with our powerful translation tool."
                : "हमारे शक्तिशाली अनुवाद उपकरण के साथ हिंदी और अंग्रेजी के बीच अनुवाद करें।"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {translateDirection === "enToHi" ? "English" : "हिंदी"}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleVoiceInput}
                    className="transition-all hover:bg-primary/20"
                  >
                    <Mic className="h-4 w-4" />
                    <span className="ml-2 text-xs">
                      {language === "en" ? "Voice" : "आवाज़"}
                    </span>
                  </Button>
                </div>
                <Textarea
                  id="source-textarea"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder={translateDirection === "enToHi" 
                    ? "Enter text in English..." 
                    : "हिंदी में टेक्स्ट दर्ज करें..."}
                  className="h-40 resize-none transition-all border-2 focus:border-primary/50"
                />
                
                {/* Quick phrases section */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "en" ? "Quick Phrases:" : "त्वरित वाक्यांश:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(translateDirection === "enToHi" ? commonPhrases.en : commonPhrases.hi)
                      .slice(0, 3)
                      .map((phrase, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          onClick={() => usePhrase(phrase)}
                          className="text-xs"
                        >
                          {phrase.length > 20 ? phrase.substring(0, 20) + "..." : phrase}
                        </Button>
                      ))
                    }
                    {recentTranslations.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => document.getElementById("recent-translations")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-primary text-xs"
                      >
                        {language === "en" ? "View history" : "इतिहास देखें"} →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {translateDirection === "enToHi" ? "हिंदी" : "English"}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={copyTranslation}
                      disabled={!translatedText}
                      className="h-8 w-8"
                    >
                      {copySuccess ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      }
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => speakText(translatedText)}
                      disabled={!translatedText}
                      className="h-8 w-8"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    value={translatedText}
                    readOnly
                    placeholder={translateDirection === "enToHi"
                      ? "अनुवादित टेक्स्ट यहां दिखाई देगा..."
                      : "Translated text will appear here..."}
                    className="h-40 resize-none bg-muted/20 border-2"
                  />
                  {isTranslating && (
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-md">
                      <div className="flex flex-col items-center">
                        <div className="relative h-10 w-10 mb-2">
                          <div className="absolute animate-ping h-full w-full rounded-full bg-primary/30"></div>
                          <div className="relative flex items-center justify-center h-full w-full rounded-full bg-primary/40">
                            <Globe className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <p className="text-sm font-medium animate-pulse">
                          {language === "en" ? "Translating..." : "अनुवाद कर रहा है..."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 rounded-lg bg-muted/20 p-3 border border-muted">
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Tip: Click the swap button below to reverse the translation direction."
                      : "टिप: अनुवाद दिशा को उलटने के लिए नीचे स्वैप बटन पर क्लिक करें।"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Button 
                  onClick={swapLanguages}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-background shadow-md border-2 hover:border-primary hover:shadow-lg transition-all"
                  disabled={isTranslating}
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-4 border-t">
                <div className="flex gap-2">
                  <Button 
                    onClick={handleTranslate}
                    disabled={!sourceText.trim() || isTranslating}
                    className="flex-1 relative overflow-hidden group"
                  >
                    {isTranslating ? (
                      <>
                        <span className="opacity-0">{language === "en" ? "Translating..." : "अनुवाद हो रहा है..."}</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        {language === "en" ? "Translate" : "अनुवाद करें"}
                      </>
                    )}
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  onClick={clearText}
                  disabled={!sourceText && !translatedText}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  {language === "en" ? "Clear All" : "सभी साफ़ करें"}
                </Button>
              </div>
            </div>
            
            {/* Recent translations section */}
            {recentTranslations.length > 0 && (
              <div id="recent-translations" className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-3">
                  {language === "en" ? "Recent Translations:" : "हाल के अनुवाद:"}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 pb-2">
                  {recentTranslations.map((text, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="truncate flex-1 pr-2">{text}</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => useRecentTranslation(text)}
                        className="shrink-0"
                      >
                        {language === "en" ? "Use" : "उपयोग करें"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md border-2 border-muted/40 hover:border-primary/20 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {language === "en" ? "Language Learning Resources" : "भाषा सीखने के संसाधन"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {language === "en" ? "Hindi for Beginners" : "शुरुआती लोगों के लिए अंग्रेजी"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Learn basic Hindi vocabulary and phrases."
                      : "बुनियादी अंग्रेजी शब्दावली और वाक्यांश सीखें।"}
                  </p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {language === "en" ? "English Grammar Guide" : "हिंदी व्याकरण गाइड"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? "Master English grammar rules and usage."
                      : "हिंदी व्याकरण नियमों और उपयोग पर महारत हासिल करें।"}
                  </p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {language === "en" ? "Conversational Practice" : "वार्तालाप अभ्यास"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? "Practice everyday conversations in both languages."
                      : "दोनों भाषाओं में रोजमर्रा की बातचीत का अभ्यास करें।"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-2 border-muted/40 hover:border-primary/20 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {language === "en" ? "Multi-Language Support" : "बहु-भाषा समर्थन"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  {language === "en"
                    ? "Our platform supports multiple languages to ensure accessibility for all users."
                    : "हमारा प्लेटफॉर्म सभी उपयोगकर्ताओं के लिए पहुंच सुनिश्चित करने के लिए कई भाषाओं का समर्थन करता है।"}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇮🇳</span> हिंदी
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇬🇧</span> English
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇮🇳</span> मराठी
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇮🇳</span> తెలుగు
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇮🇳</span> தமிழ்
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start hover:bg-primary/10 hover:text-primary transition-colors">
                    <span className="mr-2">🇮🇳</span> বাংলা
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Button className="w-full relative overflow-hidden group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {language === "en" ? "Request a Language" : "भाषा का अनुरोध करें"}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LanguageSupport;
