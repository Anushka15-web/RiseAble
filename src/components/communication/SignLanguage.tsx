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

  const clearRecognizedText = () => setRecognizedText("");

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
            {cameraEnabled && (
              <div className="absolute bottom-2 right-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {}}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  {language === "en" ? "Stop" : "रोकें"}
                </Button>
              </div>
            )}
          </div>
          <Button className="w-full gap-2">
            {language === "en" ? "Enable Camera" : "कैमरा सक्षम करें"}
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
