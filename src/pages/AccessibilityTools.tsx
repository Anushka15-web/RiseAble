import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Volume2, Palette, Hand } from "lucide-react";
import AudioTest from "@/components/accessibility/AudioTest";

const AccessibilityTools: React.FC = () => {
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
    language
  } = useAccessibility();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "Accessibility Tools" : "एक्सेसिबिलिटी टूल्स"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Customize your browsing experience with our range of accessibility features."
            : "हमारी विभिन्न एक्सेसिबिलिटी सुविधाओं के साथ अपने ब्राउज़िंग अनुभव को अनुकूलित करें।"}
        </p>
      </div>

      <Tabs defaultValue="vision" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="vision">
            <Eye className="mr-2 h-4 w-4" />
            {language === "en" ? "Vision" : "दृष्टि"}
          </TabsTrigger>
          <TabsTrigger value="hearing">
            <Volume2 className="mr-2 h-4 w-4" />
            {language === "en" ? "Hearing" : "सुनना"}
          </TabsTrigger>
          <TabsTrigger value="color">
            <Palette className="mr-2 h-4 w-4" />
            {language === "en" ? "Color" : "रंग"}
          </TabsTrigger>
          <TabsTrigger value="sign" id="sign-language">
            <Hand className="mr-2 h-4 w-4" />
            {language === "en" ? "Sign Language" : "सांकेतिक भाषा"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Vision Accessibility" : "दृष्टि पहुँच"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Adjust the display to better suit your visual needs."
                  : "अपनी दृश्य आवश्यकताओं के अनुसार डिस्प्ले को समायोजित करें।"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "High Contrast Mode" : "हाई कंट्रास्ट मोड"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Increase contrast to make text more readable."
                      : "पाठ को अधिक पठनीय बनाने के लिए कंट्रास्ट बढ़ाएं।"}
                  </p>
                  <Button
                    variant={highContrast ? "default" : "outline"}
                    onClick={toggleHighContrast}
                  >
                    {highContrast 
                      ? (language === "en" ? "Turn Off" : "बंद करें") 
                      : (language === "en" ? "Turn On" : "चालू करें")}
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Large Text" : "बड़ा टेक्स्ट"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Increase text size for better readability."
                      : "बेहतर पठनीयता के लिए टेक्स्ट का आकार बढ़ाएँ।"}
                  </p>
                  <Button
                    variant={largeText ? "default" : "outline"}
                    onClick={toggleLargeText}
                  >
                    {largeText 
                      ? (language === "en" ? "Turn Off" : "बंद करें") 
                      : (language === "en" ? "Turn On" : "चालू करें")}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Reduced Motion" : "कम मोशन"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Minimize animations for those with vestibular disorders."
                      : "वेस्टिबुलर विकारों वाले लोगों के लिए एनिमेशन को कम करें।"}
                  </p>
                  <Button
                    variant={reduceMotion ? "default" : "outline"}
                    onClick={toggleReduceMotion}
                  >
                    {reduceMotion 
                      ? (language === "en" ? "Turn Off" : "बंद करें") 
                      : (language === "en" ? "Turn On" : "चालू करें")}
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Screen Reader" : "स्क्रीन रीडर"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Enable screen reader compatibility."
                      : "स्क्रीन रीडर संगतता सक्षम करें।"}
                  </p>
                  <Button
                    variant={screenReader ? "default" : "outline"}
                    onClick={toggleScreenReader}
                  >
                    {screenReader 
                      ? (language === "en" ? "Turn Off" : "बंद करें") 
                      : (language === "en" ? "Turn On" : "चालू करें")}
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">
                  {language === "en" ? "Try It Out" : "इसे आज़माएँ"}
                </h3>
                <div className={`p-4 rounded-lg border ${highContrast ? 'bg-black text-white border-white' : 'bg-white text-black border-gray-200'}`}>
                  <p className={`${largeText ? 'text-xl' : 'text-base'}`}>
                    {language === "en"
                      ? "This is a sample text to demonstrate how the accessibility features affect the display."
                      : "यह एक नमूना टेक्स्ट है जो दिखाता है कि एक्सेसिबिलिटी सुविधाएँ डिस्प्ले को कैसे प्रभावित करती हैं।"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
