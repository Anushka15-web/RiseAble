import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

        <TabsContent value="hearing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Hearing Accessibility" : "श्रवण पहुँच"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Tools to assist with audio content and communication."
                  : "ऑडियो सामग्री और संचार में सहायता के लिए उपकरण।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Captions & Transcripts" : "कैप्शन और ट्रांसक्रिप्ट"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "All videos on RiseAble include captions and transcripts."
                      : "RiseAble पर सभी वीडियो में कैप्शन और ट्रांसक्रिप्ट शामिल हैं।"}
                  </p>
                  <div className="p-4 bg-muted rounded-lg flex items-center justify-center h-48">
                    <p className="text-center">
                      {language === "en"
                        ? "Video player with caption controls would be displayed here."
                        : "कैप्शन नियंत्रणों के साथ वीडियो प्लेयर यहां प्रदर्शित किया जाएगा।"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Volume & Sound Controls" : "वॉल्यूम और साउंड कंट्रोल"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Adjust sound levels and notifications to suit your needs."
                      : "अपनी आवश्यकताओं के अनुसार ध्वनि स्तर और सूचनाएं समायोजित करें।"}
                  </p>
                  <AudioTest />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="color" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Color Vision Settings" : "रंग दृष्टि सेटिंग्स"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Adjust colors to accommodate different types of color vision deficiencies."
                  : "विभिन्न प्रकार की रंग दृष्टि कमियों को समायोजित करने के लिए रंगों को समायोजित करें।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      variant={colorBlindMode === "normal" ? "default" : "outline"}
                      onClick={() => setColorBlindMode("normal")}
                    >
                      {language === "en" ? "Normal" : "सामान्य"}
                    </Button>
                    <div className="flex h-8">
                      <div className="w-1/4 bg-red-500" />
                      <div className="w-1/4 bg-green-500" />
                      <div className="w-1/4 bg-blue-500" />
                      <div className="w-1/4 bg-yellow-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      variant={colorBlindMode === "protanopia" ? "default" : "outline"}
                      onClick={() => setColorBlindMode("protanopia")}
                    >
                      {language === "en" ? "Protanopia" : "प्रोटैनोपिया"}
                    </Button>
                    <div className="flex h-8">
                      <div className="w-1/4 bg-yellow-500" />
                      <div className="w-1/4 bg-yellow-700" />
                      <div className="w-1/4 bg-blue-500" />
                      <div className="w-1/4 bg-yellow-300" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      variant={colorBlindMode === "deuteranopia" ? "default" : "outline"}
                      onClick={() => setColorBlindMode("deuteranopia")}
                    >
                      {language === "en" ? "Deuteranopia" : "ड्यूटरैनोपिया"}
                    </Button>
                    <div className="flex h-8">
                      <div className="w-1/4 bg-yellow-400" />
                      <div className="w-1/4 bg-yellow-600" />
                      <div className="w-1/4 bg-blue-500" />
                      <div className="w-1/4 bg-yellow-200" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      variant={colorBlindMode === "tritanopia" ? "default" : "outline"}
                      onClick={() => setColorBlindMode("tritanopia")}
                    >
                      {language === "en" ? "Tritanopia" : "ट्राइटैनोपिया"}
                    </Button>
                    <div className="flex h-8">
                      <div className="w-1/4 bg-red-500" />
                      <div className="w-1/4 bg-blue-300" />
                      <div className="w-1/4 bg-blue-600" />
                      <div className="w-1/4 bg-red-300" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">
                    {language === "en" ? "Color Contrast Demo" : "रंग कंट्रास्ट डेमो"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                      <h4 className="text-xl font-bold mb-2">
                        {language === "en" ? "Primary Colors" : "प्राइमरी कलर्स"}
                      </h4>
                      <p>
                        {language === "en"
                          ? "This text is displayed using the primary color scheme."
                          : "यह टेक्स्ट प्राइमरी कलर स्कीम का उपयोग करके प्रदर्शित किया गया है।"}
                      </p>
                    </div>
                    <div className="p-6 bg-secondary text-secondary-foreground rounded-lg">
                      <h4 className="text-xl font-bold mb-2">
                        {language === "en" ? "Secondary Colors" : "सेकेंडरी कलर्स"}
                      </h4>
                      <p>
                        {language === "en"
                          ? "This text is displayed using the secondary color scheme."
                          : "यह टेक्स्ट सेकेंडरी कलर स्कीम का उपयोग करके प्रदर्शित किया गया है।"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sign" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Sign Language Support" : "सांकेतिक भाषा समर्थन"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Access content in sign language and communicate using sign language."
                  : "सांकेतिक भाषा में सामग्री तक पहुंचें और सांकेतिक भाषा का उपयोग करके संवाद करें।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Sign Language Interpreter" : "सांकेतिक भाषा दुभाषिया"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Activate sign language interpretation for website content."
                      : "वेबसाइट सामग्री के लिए सांकेतिक भाषा व्याख्या सक्रिय करें।"}
                  </p>
                  <Button>
                    {language === "en" ? "Activate Interpreter" : "दुभाषिया सक्रिय करें"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en" ? "Sign Language Dictionary" : "सांकेतिक भाषा शब्दकोश"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "en"
                        ? "Learn common signs with our interactive dictionary."
                        : "हमारे इंटरैक्टिव शब्दकोश के साथ सामान्य संकेत सीखें।"}
                    </p>
                    <div className="p-4 bg-muted rounded-lg h-40 flex items-center justify-center">
                      <p className="text-center">
                        {language === "en"
                          ? "Interactive sign language dictionary would be displayed here."
                          : "इंटरैक्टिव सांकेतिक भाषा शब्दकोश यहां प्रदर्शित किया जाएगा।"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en" ? "Sign Language Resources" : "सांकेतिक भाषा संसाधन"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "en"
                        ? "Access courses and materials to learn sign language."
                        : "सांकेतिक भाषा सीखने के लिए पाठ्यक्रम और सामग्री तक पहुंचें।"}
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        {language === "en" ? "Beginner's Guide to Sign Language" : "सांकेतिक भाषा के लिए प्रारंभिक गाइड"}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        {language === "en" ? "Advanced Sign Language Course" : "उन्नत सांकेतिक भाषा पाठ्यक्रम"}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        {language === "en" ? "Sign Language Practice Videos" : "सांकेतिक भाषा अभ्यास वीडियो"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilityTools;

