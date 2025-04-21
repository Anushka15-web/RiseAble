
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Hand, MessageSquare, XIcon } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useToast } from "@/hooks/use-toast";

const SignLanguage: React.FC = () => {
  const { language } = useAccessibility();
  const { toast } = useToast();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const enableCamera = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      // Store the stream reference for cleanup
      streamRef.current = stream;
      
      // Set the video source to the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraEnabled(true);
      
      // Simulate sign language recognition after a delay
      setTimeout(() => {
        simulateSignRecognition();
      }, 3000);
      
      toast({
        title: language === "en" ? "Camera Enabled" : "कैमरा सक्षम",
        description: language === "en" 
          ? "Sign language recognition is now active." 
          : "सांकेतिक भाषा पहचान अब सक्रिय है।",
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: language === "en" ? "Camera Access Failed" : "कैमरा एक्सेस विफल",
        description: language === "en" 
          ? "Could not access your camera. Please check permissions." 
          : "आपके कैमरे तक पहुंच नहीं हो सकी। कृपया अनुमतियां जांचें।",
        variant: "destructive",
      });
    }
  };

  const disableCamera = () => {
    // Stop all video tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraEnabled(false);
    toast({
      title: language === "en" ? "Camera Disabled" : "कैमरा अक्षम",
      description: language === "en" 
        ? "Sign language recognition has stopped." 
        : "सांकेतिक भाषा पहचान रुक गई है।",
    });
  };

  const simulateSignRecognition = () => {
    if (!cameraEnabled) return;
    
    // Randomly select phrases for demonstration
    const demoRecognitionPhrases = [
      "Hello, nice to meet you.",
      "I need help with accessibility options.",
      "Thank you for your assistance.",
      "Where can I find more information?",
      "I would like to learn sign language."
    ];
    
    const demoHindiPhrases = [
      "नमस्ते, आपसे मिलकर अच्छा लगा।",
      "मुझे एक्सेसिबिलिटी विकल्पों के साथ मदद चाहिए।",
      "आपकी सहायता के लिए धन्यवाद।",
      "मुझे अधिक जानकारी कहां मिल सकती है?",
      "मैं सांकेतिक भाषा सीखना चाहूंगा।"
    ];
    
    const phrases = language === "en" ? demoRecognitionPhrases : demoHindiPhrases;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    setRecognizedText(prev => prev ? `${prev}\n${randomPhrase}` : randomPhrase);
  };

  const clearRecognizedText = () => {
    setRecognizedText("");
  };

  const copyRecognizedText = () => {
    if (!recognizedText) return;
    
    navigator.clipboard.writeText(recognizedText)
      .then(() => {
        toast({
          title: language === "en" ? "Copied!" : "कॉपी किया गया!",
          description: language === "en" 
            ? "Text copied to clipboard." 
            : "टेक्स्ट क्लिपबोर्ड पर कॉपी किया गया।",
        });
      })
      .catch(() => {
        toast({
          title: language === "en" ? "Copy Failed" : "कॉपी विफल",
          description: language === "en" 
            ? "Could not copy to clipboard." 
            : "क्लिपबोर्ड पर कॉपी नहीं कर सका।",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Hand className="h-4 w-4 text-primary" />
            {language === "en" ? "Sign Language Camera" : "सांकेतिक भाषा कैमरा"}
          </h3>
          <div className="rounded-lg aspect-video flex flex-col items-center justify-center border-2 border-dashed border-muted p-0 relative overflow-hidden">
            {cameraEnabled ? (
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="space-y-4 text-center p-6">
                <div className="w-16 h-16 mx-auto bg-muted/40 rounded-full flex items-center justify-center">
                  <Hand className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {language === "en"
                      ? "Enable camera to use sign language recognition."
                      : "सांकेतिक भाषा पहचान का उपयोग करने के लिए कैमरा सक्षम करें।"}
                  </p>
                </div>
              </div>
            )}
            
            {/* Camera controls overlay */}
            {cameraEnabled && (
              <div className="absolute bottom-2 right-2">
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={disableCamera}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {language === "en" ? "Stop" : "रोकें"}
                </Button>
              </div>
            )}
          </div>
          <Button 
            className={`w-full gap-2 ${cameraEnabled ? "bg-destructive hover:bg-destructive/90" : ""}`}
            onClick={cameraEnabled ? disableCamera : enableCamera}
          >
            {cameraEnabled 
              ? (language === "en" ? "Disable Camera" : "कैमरा अक्षम करें") 
              : (language === "en" ? "Enable Camera" : "कैमरा सक्षम करें")}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            {language === "en" ? "Text Output" : "टेक्स्ट आउटपुट"}
          </h3>
          <div className="bg-muted/10 border-2 border-muted/40 rounded-lg h-[200px] p-4 space-y-4 overflow-y-auto shadow-inner">
            {recognizedText ? (
              <p className="whitespace-pre-line">{recognizedText}</p>
            ) : (
              <p className="text-muted-foreground text-center py-10">
                {language === "en"
                  ? "Interpreted text from sign language will appear here."
                  : "सांकेतिक भाषा से व्याख्या किया गया टेक्स्ट यहां दिखाई देगा।"}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={clearRecognizedText}
              disabled={!recognizedText}
            >
              <XIcon className="h-4 w-4" />
              {language === "en" ? "Clear" : "साफ करें"}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={copyRecognizedText}
              disabled={!recognizedText}
            >
              <MessageSquare className="h-4 w-4" />
              {language === "en" ? "Copy Text" : "टेक्स्ट कॉपी करें"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-muted">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          {language === "en" ? "How to Use" : "उपयोग कैसे करें"}
        </h3>
        <ol className="list-decimal pl-8 space-y-3">
          <li className="text-base">
            <span className="font-medium">
              {language === "en" ? "Enable camera access" : "कैमरा एक्सेस सक्षम करें"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "en" 
                ? "Click the Enable Camera button to give permission." 
                : "अनुमति देने के लिए कैमरा सक्षम करें बटन पर क्लिक करें।"}
            </p>
          </li>
          <li className="text-base">
            <span className="font-medium">
              {language === "en" ? "Position yourself in front of the camera" : "कैमरे के सामने खुद को स्थित करें"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "en" 
                ? "Make sure your hands are clearly visible in the frame." 
                : "सुनिश्चित करें कि आपके हाथ फ्रेम में स्पष्ट रूप से दिखाई दे रहे हैं।"}
            </p>
          </li>
          <li className="text-base">
            <span className="font-medium">
              {language === "en" ? "Use sign language to communicate" : "संवाद करने के लिए सांकेतिक भाषा का उपयोग करें"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "en" 
                ? "Make deliberate gestures for better recognition." 
                : "बेहतर पहचान के लिए जानबूझकर इशारे करें।"}
            </p>
          </li>
          <li className="text-base">
            <span className="font-medium">
              {language === "en" ? "Text interpretation will appear in real-time" : "टेक्स्ट व्याख्या रीयल-टाइम में दिखाई देगी"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "en" 
                ? "The system continuously interprets your signs into text." 
                : "सिस्टम लगातार आपके संकेतों को टेक्स्ट में व्याख्या करता है।"}
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SignLanguage;
