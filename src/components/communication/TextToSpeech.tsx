
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Volume2, Play, Pause, MessageSquare } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech: React.FC = () => {
  const { language } = useAccessibility();
  const [textToSpeak, setTextToSpeak] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeVoice, setActiveVoice] = useState("female");
  const [voiceRate, setVoiceRate] = useState(1);
  const { toast } = useToast();

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTextToSpeech = () => {
    if (!textToSpeak.trim()) {
      toast({
        title: language === "en" ? "Empty Text" : "खाली टेक्स्ट",
        description: language === "en" ? "Please enter some text to speak." : "कृपया बोलने के लिए कुछ टेक्स्ट दर्ज करें।",
        variant: "destructive",
      });
      return;
    }

    if (!('speechSynthesis' in window)) {
      toast({
        title: language === "en" ? "Not Supported" : "समर्थित नहीं है",
        description: language === "en" ? "Text-to-speech is not supported in your browser." : "आपके ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।",
        variant: "destructive",
      });
      return;
    }
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    
    // Create a SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure language based on current app language
    utterance.lang = language === "en" ? "en-US" : "hi-IN";
    
    // Set speech rate
    utterance.rate = voiceRate;
    
    // Try to select an appropriate voice based on user selection
    if (window.speechSynthesis.getVoices().length > 0) {
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice;
      
      // Find a voice matching gender and language preferences
      if (activeVoice === "female") {
        selectedVoice = voices.find(v => v.name.includes("Female") && v.lang.includes(language === "en" ? "en" : "hi"));
      } else if (activeVoice === "male") {
        selectedVoice = voices.find(v => v.name.includes("Male") && v.lang.includes(language === "en" ? "en" : "hi"));
      }
      
      // If no matching voice, try just by language
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.includes(language === "en" ? "en" : "hi"));
      }
      
      // If we found a suitable voice, use it
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    // Event listener for when speech ends
    utterance.onend = () => {
      setIsSpeaking(false);
      toast({
        title: language === "en" ? "Finished Speaking" : "बोलना समाप्त",
        description: language === "en" ? "Text has been read aloud." : "टेक्स्ट को जोर से पढ़ा गया है।",
      });
    };
    
    // Start speech synthesis
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: language === "en" ? "Speaking" : "बोल रहा है",
      description: language === "en" 
        ? `Reading text with ${activeVoice} voice at ${voiceRate}x speed` 
        : `${activeVoice === "female" ? "महिला" : activeVoice === "male" ? "पुरुष" : "तटस्थ"} आवाज़ में ${voiceRate}x गति से टेक्स्ट पढ़ रहा है`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Textarea
          value={textToSpeak}
          onChange={(e) => setTextToSpeak(e.target.value)}
          placeholder={language === "en" ? "Enter text to be spoken..." : "बोले जाने वाला टेक्स्ट दर्ज करें..."}
          className="mb-4 h-40 resize-none border-2 focus:border-primary/50"
        />
        
        {isSpeaking && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-md">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Volume2 className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    className="text-muted-foreground/20"
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="50" 
                    className="text-primary animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium">
              {language === "en" ? "Speaking..." : "बोल रहा है..."}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }}
